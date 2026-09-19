import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash, createPublicKey, verify} from 'node:crypto';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
test('static catalog manifest binds exact reviewed signed production bytes', () => {
    const raw = readFileSync(path.join(root, 'static/privacy-services/current.json'));
    const manifest = JSON.parse(raw);
    assert.equal(manifest.product, 'URLStrip');
    assert.equal(manifest.kind, 'privacy-services-update');
    assert.equal(manifest.schema, 1);
    const bytes = {};
    for (const [name, suffix, max] of [['payload','json',32768],['signature','sig',2048]]) {
        const asset = manifest[name];
        assert.equal(asset.url, `https://www.tacitalabs.com/privacy-services/versions/${manifest.version}/privacy-services.${suffix}`);
        const data = readFileSync(path.join(root, 'static', new URL(asset.url).pathname));
        assert.equal(data.length, asset.bytes);
        assert.ok(data.length <= max);
        assert.equal(createHash('sha256').update(data).digest('hex'), asset.sha256);
        bytes[name] = data;
    }
    const catalog = JSON.parse(bytes.payload);
    assert.equal(catalog.version, manifest.version);
    assert.equal(catalog.generated, manifest.generated);
    const envelope = JSON.parse(bytes.signature);
    const keys = JSON.parse(readFileSync(path.join(root, 'tests/fixtures/privacy-services-keys.json')));
    const key = createPublicKey({key: Buffer.concat([Buffer.from('302a300506032b6570032100','hex'), Buffer.from(keys[envelope.keyID], 'base64')]), format:'der', type:'spki'});
    assert.equal(envelope.algorithm, 'Ed25519');
    assert.ok(verify(null, bytes.payload, key, Buffer.from(envelope.signature, 'base64')));
    assert.equal(createHash('sha256').update(bytes.payload).digest('hex'), readFileSync(path.join(root, 'tests/fixtures/privacy-services.sha256'),'utf8').trim());
    assert.equal(catalog.services.find(s => s.id === 'nitter-click').state, 'active');
    assert.equal(catalog.services.find(s => s.id === 'xcancel').state, 'paused');
});
