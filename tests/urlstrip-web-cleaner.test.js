const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const URLStrip = require('../static/urlstrip/cleaner.js');

const root = path.resolve(__dirname, '..');
const clearRules = JSON.parse(fs.readFileSync(path.join(root, 'static/urlstrip/rules/2026.08.23.3/data.min.json'), 'utf8'));
const supplementaryRules = JSON.parse(fs.readFileSync(path.join(root, 'static/urlstrip/rules/2026.08.23.3/urlstrip-supplementary.json'), 'utf8'));
const betaClearRules = JSON.parse(fs.readFileSync(path.join(root, 'static/urlstrip/rules/2026.08.23.3/data.min.json'), 'utf8'));
const betaSupplementaryRules = JSON.parse(fs.readFileSync(path.join(root, 'static/urlstrip/rules/2026.08.23.3/urlstrip-supplementary.json'), 'utf8'));
const stableManifest = JSON.parse(fs.readFileSync(path.join(root, 'static/urlstrip/rules/manifest.json'), 'utf8'));
const betaManifest = JSON.parse(fs.readFileSync(path.join(root, 'static/urlstrip/rules/beta/manifest.json'), 'utf8'));
const engine = URLStrip.createEngine(clearRules, supplementaryRules);
const betaEngine = URLStrip.createEngine(betaClearRules, betaSupplementaryRules);

function clean(input) {
  return URLStrip.cleanUrl(engine, input);
}

function cleanBeta(input) {
  return URLStrip.cleanUrl(betaEngine, input);
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

test('public rule manifests remain compatible with released iOS builds', () => {
  const supportedFileKinds = new Set(['clearurls', 'urlstrip-supplementary']);
  for (const [channel, manifest] of [['stable', stableManifest], ['beta', betaManifest]]) {
    assert.deepEqual(
      manifest.files.map(file => file.kind),
      ['clearurls', 'urlstrip-supplementary'],
      `${channel} must not publish file kinds the released iOS decoder cannot read`
    );
    assert.ok(
      manifest.files.every(file => supportedFileKinds.has(file.kind)),
      `${channel} contains an unsupported public rule file kind`
    );
  }
});

test('stable and beta publish the promoted global and scoped audited tracker batches', () => {
  assert.equal(stableManifest.currentVersion, '2026.08.23.3');
  assert.equal(betaManifest.currentVersion, '2026.08.23.3');

  const result = cleanBeta('https://example.com/deal?at_recipient_id=5336&adjust_campaign=summer&mt_campaign=launch&ranMID=13275&sfmc_id=subscriber&tgclid=click&keep=1');
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://example.com/deal?keep=1');
  assert.deepEqual(result.removedQueryParameters, [
    'at_recipient_id',
    'adjust_campaign',
    'mt_campaign',
    'ranMID',
    'sfmc_id',
    'tgclid',
  ]);

  const deferred = cleanBeta('https://example.com/article?_bhlid=keep&sms_click=keep&oft_id=keep&sc_uid=keep&external_click_id=keep');
  assert.equal(deferred.status, 'unchanged');

  const temu = cleanBeta('https://www.temu.com/item.html?_x_ads_account=acct&_x_ads_id=ad&_x_ns_source=g&_x_campaign=sale&goods_id=123&sku_id=keep&g_region=US');
  assert.equal(temu.status, 'cleaned');
  assert.equal(temu.cleanedUrl, 'https://www.temu.com/item.html?goods_id=123&sku_id=keep&g_region=US');
  assert.deepEqual(temu.removedQueryParameters, ['_x_ads_account', '_x_ads_id', '_x_ns_source', '_x_campaign']);

  const aws = cleanBeta('https://pages.awscloud.com/event?trk=campaign&keep=1');
  assert.equal(aws.cleanedUrl, 'https://pages.awscloud.com/event?keep=1');

  const wikipedia = cleanBeta('https://en.wikipedia.org/wiki/Privacy?wprov=sfti1&oldid=123');
  assert.equal(wikipedia.cleanedUrl, 'https://en.wikipedia.org/wiki/Privacy?oldid=123');

  const unrelated = cleanBeta('https://example.com/?_x_ads_account=keep&trk=keep&wprov=keep');
  assert.equal(unrelated.status, 'unchanged');
});

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

test('Google search client and local-result fragment cleanup', () => {
  const result = clean('https://www.google.com/search?q=mk+trucking+reviews&client=ms-android-cricket-us-rvc3#lkt=LocalPoiPhotos&lpg=cid:CgIgAQ%3D%3D,ik:CAoSHENJQUJJaEJKZXFCemdDQmRVWEh3ZUVYZ2E5TDg%3D&trex=m_t:lcl_akp,rc_f:nav,rc_ludocids:12964900451710185810,rc_q:MK%2520Trucking,ru_q:MK%2520Trucking,trex_id:LpesYc');
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://www.google.com/search?q=mk+trucking+reviews');
  assert.deepEqual(result.removedQueryParameters, ['client']);
  assert.ok(result.matchedRuleIds.includes('Analytics:google_search:local_fragment'));

  const preserved = clean('https://www.google.com/search?q=swift#section');
  assert.equal(preserved.status, 'unchanged');
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

test('Instagram igsi cleanup stays scoped to Instagram', () => {
  const result = clean('https://www.instagram.com/p/example/?igsi=abc123&keep=1');
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://www.instagram.com/p/example/?keep=1');
  assert.deepEqual(result.removedQueryParameters, ['igsi']);

  const unrelated = clean('https://example.com/article?igsi=keep');
  assert.equal(unrelated.status, 'unchanged');
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

test('retired X/Twitter privacy settings are ignored while tracker stripping remains active', () => {
  const result = cleanWithPrivacyRewrites('https://twitter.com/tacitalabs/status/123?utm_source=news', {
    xRedirectEnabled: true,
    xFrontendBaseURL: 'https://retired.invalid',
  });
  assert.equal(result.status, 'cleaned');
  assert.equal(result.cleanedUrl, 'https://twitter.com/tacitalabs/status/123');
  assert.deepEqual(result.removedQueryParameters, ['utm_source']);
  assert.equal(result.privacyRedirect, null);
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
