const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

// Production trust shipped in URLStrip desktop and iOS. Never use fixture signing keys.
const trust = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/rule-feed-keys.json')));
const root = path.join(__dirname, '../static/urlstrip/rules');
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function verify(raw, sidecar) {
  const e = JSON.parse(sidecar);
  assert.deepEqual(Object.keys(e).sort(), ['algorithm', 'keyID', 'signature']);
  assert.equal(e.algorithm, 'Ed25519');
  assert.ok(Object.hasOwn(trust, e.keyID));
  assert.equal(sidecar.toString(), JSON.stringify({algorithm:e.algorithm,keyID:e.keyID,signature:e.signature}));
  const signature = Buffer.from(e.signature, 'base64');
  assert.equal(signature.length, 64);
  assert.equal(signature.toString('base64'), e.signature);
  const key = crypto.createPublicKey({key:Buffer.concat([Buffer.from('302a300506032b6570032100','hex'),Buffer.from(trust[e.keyID],'base64')]),format:'der',type:'spki'});
  assert.ok(crypto.verify(null, Buffer.concat([Buffer.from('URLStrip rule-manifest v1\n'),raw]), key, signature), 'channel signature must authenticate exact manifest bytes');
}
for (const channel of ['', 'beta']) {
  const dir = path.join(root, channel);
  const raw = fs.readFileSync(path.join(dir, 'manifest.json'));
  const sidecar = fs.readFileSync(path.join(dir, 'manifest.sig'));
  verify(raw, sidecar);
  const m = JSON.parse(raw);
  assert.equal(m.product, 'URLStrip');
  assert.equal(m.kind, 'rules');
  assert.equal(m.schemaVersion, 1);
  assert.match(m.currentVersion, /^[0-9]{4}\.[0-9]{2}\.[0-9]{2}\.[1-9][0-9]{0,5}$/);
  const immutable = path.join(root, m.currentVersion);
  assert.deepEqual(raw, fs.readFileSync(path.join(immutable, 'manifest.json')));
  assert.deepEqual(sidecar, fs.readFileSync(path.join(immutable, 'manifest.sig')));
  assert.deepEqual(m.files.map(f => f.kind).sort(), ['clearurls', 'urlstrip-supplementary']);
  for (const f of m.files) {
    assert.equal(f.path, f.kind === 'clearurls' ? 'data.min.json' : 'urlstrip-supplementary.json');
    assert.equal(f.url, `https://www.tacitalabs.com/urlstrip/rules/${m.currentVersion}/${f.path}`);
    const bytes = fs.readFileSync(path.join(immutable, f.path));
    assert.equal(bytes.length, f.bytes);
    assert.equal(hash(bytes), f.sha256);
    JSON.parse(bytes);
  }
  assert.throws(() => verify(Buffer.concat([raw, Buffer.from('\n')]), sidecar));
  console.log(`ok - ${channel || 'stable'} ${m.currentVersion}: production signature, immutable parity, assets, tamper rejection`);
}
const stableSig = fs.readFileSync(path.join(root, 'manifest.sig'));
const betaRaw = fs.readFileSync(path.join(root, 'beta/manifest.json'));
if (!betaRaw.equals(fs.readFileSync(path.join(root, 'manifest.json')))) {
  assert.throws(() => verify(betaRaw, stableSig));
  console.log('ok - stale previous-channel signature rejected');
}
