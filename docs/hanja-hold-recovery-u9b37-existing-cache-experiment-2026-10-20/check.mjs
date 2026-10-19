import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../..');
const read = path => readFileSync(resolve(repo, path));
const hash = value => createHash('sha256').update(value).digest('hex');
const json = path => JSON.parse(read(path));
const configBytes = readFileSync(resolve(here, 'config.json'));
const config = JSON.parse(configBytes);
const server = readFileSync(resolve(here, 'server.py'), 'utf8');
const browser = readFileSync(resolve(here, 'browser.mjs'), 'utf8');
assert.ok(server.includes("CONFIG_SHA = '" + hash(configBytes) + "'"));
assert.equal(hash(browser), config.browserSHA256);
for (const [path, expected] of Object.entries(config.inputSHA256)) assert.equal(hash(read(path)), expected, path);
assert.deepEqual(config.roots, ['u9b37', 'u9b37-ue0100']);
assert.deepEqual(config.domesticPens, [11, 12, 13, 14]);
assert.deepEqual(config.originalRawIndices, [12, 14, 13, 15, 16]);
assert.deepEqual(config.originalLiteralGroups, { 11: [12, 14], 12: [13], 13: [15], 14: [16] });
const source = json(config.sourceFolder + 'sources.json');
assert.deepEqual(Object.keys(source.records).sort(), config.closure.map(x => x.name).sort());
assert.deepEqual(source.wholeNames, config.roots);
assert.deepEqual(source.aliases, []);
assert.deepEqual(source.providerVersions.map(x => x.name), config.providerNames);
function recordValid(actual, expected) {
  assert.equal(actual.name, expected.name);
  assert.equal(actual.related, expected.related);
  assert.equal(hash(actual.data), expected.sourceSha256);
}
for (const expected of config.closure) recordValid(source.records[expected.name], expected);
const reached = new Set();
function visit(name) {
  if (reached.has(name)) return;
  assert.ok(Object.hasOwn(source.records, name), 'missing exact source reference');
  reached.add(name);
  for (const instruction of source.records[name].data.split('$')) {
    const fields = instruction.split(':');
    if (fields[0] === '99') visit(fields[7]);
  }
}
config.roots.forEach(visit);
assert.deepEqual([...reached].sort(), Object.keys(source.records).sort());
function proofValid(proof) {
  assert.deepEqual(Object.keys(proof).sort(), config.full5Keys);
  for (const key of ['engineRevision', 'engineHashes', 'defaults']) assert.deepEqual(proof[key], config[key]);
  assert.equal(proof.groups.length, 23);
  assert.equal(proof.trace.length, 23);
  assert.equal(proof.groups.reduce((sum, g) => sum + g.polygons.length, 0), 53);
  for (let i = 0; i < proof.groups.length; i++) {
    assert.deepEqual(proof.trace[i].flatMap(call => call.polygons), proof.groups[i].polygons);
    assert.ok(proof.groups[i].polygons.every(poly => poly.every(v => v.off === 0)));
  }
}
for (const root of config.roots) proofValid(json(config.sourceFolder + 'engine-whole-' + root + '.json'));
proofValid(json(config.sourceFolder + 'engine-proof.json'));
const originalRenderer = read('docs/hanja-g2-batch10-2026-09-16/serve.py').toString();
function functionText(source, name) {
  const start = source.indexOf('def ' + name + '(');
  assert.ok(start >= 0);
  const after = source.indexOf('\ndef ', start + 2);
  return source.slice(start, after < 0 ? undefined : after).trimEnd() + '\n';
}
for (const name of ['source', 'dictionary_svg']) {
  const oldText = functionText(originalRenderer, name);
  const newText = functionText(server, name);
  assert.equal(newText, oldText, 'original domestic function changed');
  assert.equal(hash(newText), config.originalRendererFunctions[name]);
}
assert.ok(!/importlib|subprocess|compileProgressive|C=compiled\(\)|exec\(/.test(server));
assert.ok(server.includes("if __name__ == '__main__':"));
assert.ok(server.includes("ThreadingHTTPServer(('127.0.0.1', args.port), Handler)"));
assert.ok(server.includes("dictionary_svg('鬷', pen, True, 'domestic-' + str(pen))"));
assert.ok(!server.includes("ENTRIES[root]"));
for (const pen of config.domesticPens) assert.ok(server.includes('id="domestic-' + pen + '"'));
for (const raw of config.originalRawIndices) assert.ok(server.includes('id="raw-' + raw + '"'));
assert.ok(browser.includes("getSVG('/api/raw?root=' + root + '&raw=12', q('raw12'))"));
assert.ok(browser.includes("getSVG('/api/raw?root=' + root + '&raw=14', q('raw14'))"));
assert.ok(!/localStorage|sessionStorage|POST|PUT|DELETE|sendBeacon/.test(browser));
assert.ok(!/\b(?:writeFile|appendFile|unlink|mkdir)\b/.test(server + browser));
let negatives = 0;
function rejects(fn) { assert.throws(fn); negatives++; }
const proof = json(config.sourceFolder + 'engine-proof.json');
const changedHeader = structuredClone(proof); changedHeader.defaults.kWidth += 1;
rejects(() => proofValid(changedHeader));
const changedTrace = structuredClone(proof); changedTrace.trace[0][0].polygons[0][0].x += 1;
rejects(() => proofValid(changedTrace));
const missingKey = structuredClone(proof); delete missingKey.engineHashes;
rejects(() => proofValid(missingKey));
rejects(() => assert.equal(hash(Buffer.concat([read(config.sourceFolder + 'sources.json'), Buffer.from(' ')])), config.inputSHA256[config.sourceFolder + 'sources.json']));
const expected = config.closure[0];
rejects(() => recordValid({ ...source.records[expected.name], data: source.records[expected.name].data + '$0' }, expected));
rejects(() => assert.ok(config.roots.includes('u9b37-ue0101')));
rejects(() => assert.ok(config.originalRawIndices.includes(0)));
rejects(() => assert.equal(config.dictionary.url + '?root=u9b37', config.dictionary.url));
console.log(JSON.stringify({ focused: 'PASS', sourcePins: Object.keys(config.inputSHA256).length, roots: config.roots.length, closureRecords: reached.size, originalRawPerRoot: 23, originalPolygonsPerRoot: 53, unchangedDomesticFunctions: 2, negatives, compilerExecutions: 0, engineExecutions: 0, HTTPRequests: 0, serverStarted: false, nativeApproval: false }));
