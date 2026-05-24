const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const URLStrip = require('../static/urlstrip/cleaner.js');

const root = path.resolve(__dirname, '..');
const clearRules = JSON.parse(fs.readFileSync(path.join(root, 'static/urlstrip/rules/2026.05.04.2/data.min.json'), 'utf8'));
const supplementaryRules = JSON.parse(fs.readFileSync(path.join(root, 'static/urlstrip/rules/2026.05.04.2/urlstrip-supplementary.json'), 'utf8'));
const engine = URLStrip.createEngine(clearRules, supplementaryRules);

function clean(input) {
  return URLStrip.cleanUrl(engine, input);
}

function cleanWithPrivacyRewrites(input, settings) {
  return URLStrip.cleanUrl(engine, input, { privacyRedirectSettings: settings });
}

function test(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

console.log(`compiled providers: ${engine.providers.length}; skipped: ${engine.skippedProviders.length}`);
assert.ok(engine.providers.length > 200, 'should compile the bundled provider set');

test('generic UTM and fbclid cleanup', () => {
  const result = clean('https://example.com/article?page=1&utm_source=twitter&utm_medium=social&utm_campaign=spring&fbclid=abc123');
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://example.com/article?page=1');
  assert.deepEqual(result.removedQueryParameters, ['utm_source', 'utm_medium', 'utm_campaign', 'fbclid']);
});

test('unchanged clean URL', () => {
  const result = clean('https://example.com/page?id=42&lang=en');
  assert.equal(result.status, 'unchanged');
});

test('invalid and unsupported URL inputs', () => {
  assert.equal(clean('not a url').status, 'invalid');
  assert.equal(clean('ftp://example.com/file').status, 'invalid');
});

test('Amazon query and raw path cleanup', () => {
  const result = clean('https://www.amazon.com/dp/B08N5WRWNW/ref=sr_1_1?qid=123&tag=affiliate-20&keep=1');
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://www.amazon.com/dp/B08N5WRWNW?keep=1');
  assert.ok(result.removedQueryParameters.includes('qid'));
  assert.ok(result.removedQueryParameters.includes('tag'));
});

test('Google redirect unwrapping and inner cleanup', () => {
  const result = clean('https://www.google.com/url?q=https%3A%2F%2Fexample.com%2Fpage%3Futm_source%3Dnews%26id%3D7&sa=D&source=web');
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://example.com/page?id=7');
  assert.equal(result.redirectUnwrapped, true);
});

test('Facebook redirect unwrapping', () => {
  const result = clean('https://l.facebook.com/l.php?u=https%3A%2F%2Fexample.com%2Farticle&h=abc123');
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://example.com/article');
});

test('YouTube shared link cleanup', () => {
  const result = clean('https://www.youtube.com/watch?v=dQw4w9WgXcQ&si=abc123tracking&feature=shared');
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});

test('Substack r is stripped while post_id is kept', () => {
  const result = clean('https://heathercoxrichardson.substack.com/p/april-5-2026?post_id=193322318&r=6q25e');
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://heathercoxrichardson.substack.com/p/april-5-2026?post_id=193322318');
  assert.deepEqual(result.removedQueryParameters, ['r']);
});

test('Reddit JS challenge artifacts strip only in challenge context', () => {
  const result = clean('https://www.reddit.com/r/AskReddit/comments/1t2by9k/title/?solution=a2297558c581a9de&js_challenge=1&token=bbbe4bf1&jsc_orig_r=&context=keep');
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://www.reddit.com/r/AskReddit/comments/1t2by9k/title/?context=keep');
  assert.deepEqual(result.removedQueryParameters, ['solution', 'js_challenge', 'token', 'jsc_orig_r']);

  const unchanged = clean('https://www.reddit.com/settings/privacy?token=keepme&context=keep');
  assert.equal(unchanged.status, 'unchanged');
});

test('diagnostic hosted rules update parameter is loaded', () => {
  const result = clean('https://example.com/?urlstrip_update_test=1&keep=1');
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://example.com/?keep=1');
});

test('privacy rewrites are disabled by default', () => {
  const result = clean('https://x.com/tacitalabs/status/123');
  assert.equal(result.status, 'unchanged');
});

test('X/Twitter privacy rewrite uses XCancel and preserves path', () => {
  const result = cleanWithPrivacyRewrites('https://twitter.com/tacitalabs/status/123?utm_source=news', {
    xRedirectEnabled: true,
  });
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://xcancel.com/tacitalabs/status/123');
  assert.deepEqual(result.removedQueryParameters, ['utm_source']);
  assert.deepEqual(result.privacyRedirect, {
    service: 'xTwitter',
    originalHost: 'twitter.com',
    frontendHost: 'xcancel.com',
  });
});

test('Reddit privacy rewrite uses Redlib and skips redd.it shortlinks', () => {
  const result = cleanWithPrivacyRewrites('https://old.reddit.com/r/privacy/comments/abc/example/?context=3', {
    redditRedirectEnabled: true,
  });
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://redlib.catsarch.com/r/privacy/comments/abc/example/?context=3');
  assert.deepEqual(result.privacyRedirect, {
    service: 'reddit',
    originalHost: 'old.reddit.com',
    frontendHost: 'redlib.catsarch.com',
  });

  const shortlink = cleanWithPrivacyRewrites('https://redd.it/abc123', {
    redditRedirectEnabled: true,
  });
  assert.equal(shortlink.status, 'unchanged');
});
