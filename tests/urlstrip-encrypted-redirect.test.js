const assert = require('node:assert/strict');
const fs = require('node:fs');
const cleaner = require('../static/urlstrip/cleaner.js');
const root = '../static/urlstrip/rules/2026.10.11.1/';
const engine = cleaner.createEngine(require(root+'data.min.json'), require(root+'urlstrip-supplementary.json'));
const input='https://search.brave.com/go/v1#synthetic%FF%2f+%2B?utm_source=payload';
const result=cleaner.cleanUrl(engine,input);
assert.equal(result.status,'unchanged');
assert.equal(result.originalUrl,input);
assert.equal(result.classification,'encrypted_redirect');
assert.equal(result.message,'Open this result, then clean the destination URL.');
const nested = cleaner.cleanUrl(engine, 'https://www.google.com/url?q=' + encodeURIComponent(input));
assert.equal(nested.cleanedUrl, input, 'Outer wrapper removal must not reserialize the encrypted destination');
assert.deepEqual(nested.removedQueryParameters, []);
for(const adjacent of ['https://search.brave.com/go/v1#','http://search.brave.com/go/v1#synthetic','https://search.brave.com:443/go/v1#synthetic','https://search.brave.com/go/v1/?q=x#synthetic','https://search.brave.com.example/go/v1#synthetic','https://search.brave.com@evil.example/go/v1#synthetic','https://www.google.com/goto#synthetic']) {
 assert.notEqual(cleaner.cleanUrl(engine,adjacent).classification,'encrypted_redirect');
}
assert.match(fs.readFileSync(require.resolve('../static/urlstrip/tool.js'),'utf8'), /Encrypted redirect/);
console.log('Encrypted redirect classification, byte preservation, advice and adjacent boundaries passed');
