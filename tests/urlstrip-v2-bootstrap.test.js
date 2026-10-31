const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const trust = JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/rule-feed-keys.json')));
const root = path.join(__dirname,'../static/urlstrip/rules');
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const version = '2026.10.31.5';
for (const channel of ['stable','beta']) {
 const dir=path.join(root,'v2',channel), immutable=path.join(dir,version);
 const raw=fs.readFileSync(path.join(dir,'manifest.json')), sigraw=fs.readFileSync(path.join(dir,'manifest.sig'));
 assert.deepEqual(raw,fs.readFileSync(path.join(immutable,'manifest.json')));
 assert.deepEqual(sigraw,fs.readFileSync(path.join(immutable,'manifest.sig')));
 const sig=JSON.parse(sigraw), m=JSON.parse(raw);
 assert.equal(m.schemaVersion,2);assert.equal(m.channel,channel);assert.equal(m.currentVersion,version);
 assert.deepEqual(Object.keys(sig).sort(),['algorithm','keyID','signature']);assert.equal(sig.algorithm,'Ed25519');
 const pub=crypto.createPublicKey({key:Buffer.concat([Buffer.from('302a300506032b6570032100','hex'),Buffer.from(trust[sig.keyID],'base64')]),format:'der',type:'spki'});
 assert(crypto.verify(null,Buffer.concat([Buffer.from('URLStrip rule-manifest v2\n'),raw]),pub,Buffer.from(sig.signature,'base64')));
 assert(!crypto.verify(null,Buffer.concat([Buffer.from('URLStrip rule-manifest v1\n'),raw]),pub,Buffer.from(sig.signature,'base64')));
 assert(!crypto.verify(null,Buffer.concat([Buffer.from('URLStrip rule-manifest v2\n'),raw,Buffer.from(' ')]),pub,Buffer.from(sig.signature,'base64')));
 assert.deepEqual(m.files.map(x=>x.path).sort(),['data.min.json','urlstrip-supplementary.json']);
 for(const file of m.files) {
  assert.equal(file.url,`https://www.tacitalabs.com/urlstrip/rules/v2/${channel}/${version}/${file.path}`);
  const bytes=fs.readFileSync(path.join(immutable,file.path));assert.equal(bytes.length,file.bytes);assert.equal(sha(bytes),file.sha256);
  const doc=JSON.parse(bytes), baseline=JSON.parse(fs.readFileSync(path.join(root,'2026.10.29.1',file.path))).providers;
  assert.equal(doc.schemaVersion,2);assert.equal(doc.rules.length,Object.keys(baseline).length);
  assert(!bytes.toString().toLowerCase().includes('rockchasing'));
  assert.deepEqual(doc.rules.map(r=>r.id).sort(),Object.keys(baseline).sort());
  for(const rule of doc.rules) {
   const old=baseline[rule.id]; assert.equal(rule.type,'provider');assert.deepEqual(rule.dependsOn,[]);
   assert.deepEqual(rule.requires,['provider.regex.v1','query.raw.v1','authority.strict.v1']);
   assert.deepEqual(rule.match,{urlPattern:old.urlPattern,exceptions:old.exceptions||[]});
   for(const field of ['rules','rawRules','referralMarketing','redirections']) assert.deepEqual(rule.action[field],old[field]||[]);
   for(const field of ['completeProvider','forceRedirection']) assert.equal(rule.action[field],old[field]||false);
   const unknown=Object.fromEntries(Object.entries(old).filter(([key])=>!['urlPattern','exceptions','rules','rawRules','referralMarketing','redirections','completeProvider','forceRedirection'].includes(key)));
   assert.deepEqual(rule.unknownLegacySemantics||{},unknown);
  }
 }
 console.log(`ok - v2 ${channel}: production signature, immutable pointers, exact reviewed baseline content, no provisional rules`);
}
