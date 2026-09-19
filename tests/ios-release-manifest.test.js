const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
test('public iOS feed advertises only verified App Store 1.3, never TestFlight', () => {
 const m = JSON.parse(fs.readFileSync('static/urlstrip/releases/ios.json', 'utf8'));
 assert.deepEqual(m, {schema:1, product:'URLStrip', channel:'app-store', version:'1.3', url:'https://apps.apple.com/us/app/urlstrip/id6763483845'});
 assert.ok(!('build' in m));
});

test('public policy discloses automatic defaults and public-only iOS app metadata', () => {
 const policy = fs.readFileSync('content/privacy.md','utf8');
 assert.match(policy,/Automatic checks are on by default/);
 assert.match(policy,/public App Store releases/);
 assert.match(policy,/never enables privacy redirects/);
});
