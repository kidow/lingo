import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
const dir = new URL('./', import.meta.url);
const sha = b => createHash('sha256').update(b).digest('hex');
const read = p => readFile(new URL(p, dir), 'utf8');
const manifest = JSON.parse(await read('manifest.json'));
const cache = new Map();
async function publicText(url) {
  if (!cache.has(url)) cache.set(url, (async () => {
    const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
    assert(r.ok, 'Public verification HTTP ' + r.status); return r.text();
  })());
  return cache.get(url);
}
const codes = await Promise.all(Object.entries(manifest.engineHashes).map(async ([name, hash]) => {
  const text = await publicText('https://raw.githubusercontent.com/kamichikoichi/kage-engine/' + manifest.engineRevision + '/' + name);
  assert.equal(sha(text), hash); return text;
}));
const instrument = `const resolve=(n,seen=new Set())=>{if(seen.has(n))throw Error('alias cycle '+n);seen.add(n);const r=records[n];if(!r)throw Error('missing '+n);const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],seen):r.data;};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`;
const dependencyNames = r => {
  const a = r.data.match(/^\[\[([^\]]+)\]\]$/);
  return a ? [a[1]] : r.data.split('$').map(s => s.split(':')).filter(a => a[0] === '99').map(a => a[7]);
};
const eq = (a, b) => a[0] === b[0] && a[1] === b[1];
const end = c => c.args.slice(c.kind === 'cdDrawLine' ? 2 : c.kind === 'cdDrawCurve' ? 4 : 6, c.kind === 'cdDrawLine' ? 4 : c.kind === 'cdDrawCurve' ? 6 : 8);
let proofs = 0, archivedRecords = 0, publicDefinitions = 0;
const verifiedProviders = new Set();
for (const g of manifest.glyphs) {
  const parentBytes = await read(g.parentSourceFile); assert.equal(sha(parentBytes), g.parentSourceFileSha256);
  const parent = JSON.parse(parentBytes);
  assert.equal(parent.glyph, g.glyph); assert.equal(parent.root, g.root);
  for (const w of g.whole) {
    assert.equal(w.sourceComplete, true, 'Partial captures need explicit handling');
    const sourceBytes = await read(w.sourceFile); assert.equal(sha(sourceBytes), w.sourceFileSha256);
    const s = JSON.parse(sourceBytes);
    assert.equal(s.glyph, g.glyph); assert.equal(s.root, w.root); assert.equal(s.mode, w.mode);
    assert.equal(s.parentSourceFile, g.parentSourceFile); assert.equal(s.parentSourceFileSha256, g.parentSourceFileSha256);
    for (const name of s.inheritedNames) {
      assert.equal(w.mode, 'archive-recovered'); assert.deepEqual(s.records[name], parent.records[name]); archivedRecords++;
    }
    assert.equal(s.inheritedNames.length + s.providers.length, Object.keys(s.records).length);
    for (const p of s.providers) {
      assert.equal(sha(p.responseText), p.responseSha256);
      assert.deepEqual(JSON.parse(p.responseText), p.responseIdentity);
      assert.equal(p.responseIdentity.name + '@' + p.responseIdentity.version, p.fixedName);
      assert.equal(sha(p.responseIdentity.data), p.dataSha256);
      assert.equal(p.apiUrl, 'https://glyphwiki.org/api/glyph?name=' + encodeURIComponent(p.fixedName));
      assert.deepEqual(s.records[p.lookupName], { name: p.lookupName, related: p.responseIdentity.related, data: p.responseIdentity.data });
      const exact = JSON.parse(await publicText(p.apiUrl));
      assert.equal(exact.name, p.responseIdentity.name); assert.equal(String(exact.version), String(p.responseIdentity.version));
      assert.equal(exact.data, p.responseIdentity.data); assert.equal(exact.related, p.responseIdentity.related);
      verifiedProviders.add(p.fixedName); publicDefinitions++;
    }
    const seen = new Set();
    const walk = n => { if (seen.has(n)) return; seen.add(n); assert(s.records[n], 'missing ' + n); for (const d of dependencyNames(s.records[n])) walk(d); };
    walk(s.root); assert.equal(seen.size, Object.keys(s.records).length);
    const proofBytes = await read(w.proofFile); assert.equal(sha(proofBytes), w.proofFileSha256);
    const p = JSON.parse(proofBytes); assert.equal(p.engineRevision, manifest.engineRevision); assert.deepEqual(p.engineHashes, manifest.engineHashes);
    const ctx = vm.createContext({ records: s.records, root: s.root });
    for (const code of codes) vm.runInContext(code, ctx, { timeout: 1000 });
    const actual = JSON.parse(vm.runInContext(instrument, ctx, { timeout: 5000 }));
    assert.deepEqual(actual.groups, p.groups); assert.deepEqual(actual.trace, p.trace); assert.deepEqual(actual.defaults, p.defaults);
    assert.equal(p.groups.length, w.rawGroups);
    const drawn = p.groups.map((x, i) => x.polygons.length ? i : null).filter(x => x !== null);
    assert.equal(drawn.length, w.drawingGroups);
    assert.equal(p.groups.reduce((n, x) => n + x.polygons.length, 0), w.polygons);
    assert.deepEqual(p.groups.map((x, i) => x.polygons.length ? null : i + 1).filter(x => x !== null), w.emptyRows);
    const gaps = [];
    for (const i of drawn) for (let j = 1; j < p.trace[i].length; j++) if (!eq(end(p.trace[i][j - 1]), p.trace[i][j].args.slice(0, 2))) gaps.push({ rawRow: i + 1, call: j + 1 });
    assert.deepEqual(gaps, w.internalGaps);
    const joins = drawn.slice(1).filter((i, j) => { const a = p.trace[drawn[j]], b = p.trace[i]; return a.length && b.length && eq(end(a.at(-1)), b[0].args.slice(0, 2)); }).length;
    assert.equal(joins, w.exactConsecutiveJoinCount); assert.equal(drawn.length - joins, w.exactConsecutiveMinimum);
    assert.equal(w.nativeReviewed, false); assert.equal(w.runtimeApplied, false); proofs++;
  }
}
const license = await read(manifest.license.file); assert.equal(sha(license), manifest.license.sha256);
assert.equal(await publicText(manifest.license.url), license);
assert.equal(manifest.nativeReviewCount, 0); assert.equal(manifest.runtimeApplied, false); assert.equal(manifest.newHoldCount, 0);
assert.equal(manifest.canonicalHoldCreated, false); assert.equal(manifest.resumeCreated, false); assert.equal(manifest.serversStarted, 0); assert.equal(manifest.buildRun, false);
console.log(JSON.stringify({ ok: true, glyphs: manifest.glyphs.length, wholeProofsReproduced: proofs, engineFilesVerified: codes.length, inheritedRecordsChecked: archivedRecords, publicProviderInstancesChecked: publicDefinitions, uniqueFixedDefinitionsRefetched: verifiedProviders.size, licenseSha256: sha(license), nativeReviewCount: 0, runtimeApplied: false, newHoldCount: 0, resumeCreated: false, serversStarted: 0, buildRun: false }));
