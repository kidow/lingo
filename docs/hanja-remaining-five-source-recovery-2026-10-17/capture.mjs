import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

// Only public glyph/root/version requests leave this process. No domestic SVG is fetched.
const dir = new URL('./', import.meta.url);
const json = x => JSON.stringify(x, null, 2) + '\n';
const sha = x => createHash('sha256').update(x).digest('hex');
const read = p => readFile(new URL(p, dir), 'utf8');
const fresh = (p, x) => writeFile(new URL(p, dir), x, { flag: 'wx' });
const seven = JSON.parse(await read('../hanja-remaining-seven-sources-2026-10-17/source-checks.json'));
const specs = [
  ['鼐', 'u9f10', 15, 1070, '5669687895506aaf2ddc25e6692931fcfe13d3fdb054421f6fbf1bbb666970e9'],
  ['纆', 'u7e86', 21, 1073, '60819413bdf3bc11cc39d2bba04360b5eed7de8baceabde3a573e6c5796898e0'],
  ['樲', 'u6a32', 16, 807, 'ec2204aa210c374413e829ca24839ff54f57c2f8991bf26534a5982f58983568'],
  ['邅', 'u9085', 17, 843, '773c1308a3588d1a36d0dbe082805db5b9e4ddfcf76c45f3c8cb11e0f5393b13'],
  ['絰', 'u7d70', 12, 897, '0667e10a4131fa74e5df5ba7455788dd5a1c1f5d7b2266d6ba8672fdacc7cf63'],
];
const cache = new Map();
async function publicText(url) {
  if (!cache.has(url)) cache.set(url, (async () => {
    const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
    assert(r.ok, 'Public source HTTP ' + r.status);
    return r.text();
  })());
  return cache.get(url);
}
const engineCodes = await Promise.all(Object.entries(seven.engineHashes).map(async ([name, hash]) => {
  const t = await publicText('https://raw.githubusercontent.com/kamichikoichi/kage-engine/' + seven.engineRevision + '/' + name);
  assert.equal(sha(t), hash); return t;
}));
const apiCache = new Map();
async function fixedDefinition(lookupName) {
  if (!apiCache.has(lookupName)) apiCache.set(lookupName, (async () => {
    const request = async name => {
      const apiUrl = 'https://glyphwiki.org/api/glyph?name=' + encodeURIComponent(name);
      const responseText = await publicText(apiUrl), d = JSON.parse(responseText);
      assert.equal(d.name, name.split('@')[0]);
      assert.match(String(d.version), /^\d+$/);
      assert.equal(typeof d.data, 'string'); assert.equal(typeof d.related, 'string');
      if (/@\d+$/.test(name)) assert.equal(String(d.version), name.split('@').at(-1));
      return { apiUrl, responseText, d };
    };
    const initial = await request(lookupName), fixedName = initial.d.name + '@' + initial.d.version;
    const exact = /@\d+$/.test(lookupName) ? initial : await request(fixedName);
    // The discovery endpoint returns numeric versions; exact @version returns strings.
    assert.equal(exact.d.name, initial.d.name);
    assert.equal(String(exact.d.version), String(initial.d.version));
    assert.equal(exact.d.data, initial.d.data);
    assert.equal(exact.d.related, initial.d.related);
    return {
      lookupName, fixedName, apiUrl: exact.apiUrl, responseIdentity: exact.d,
      responseText: exact.responseText, responseSha256: sha(exact.responseText),
      dataSha256: sha(exact.d.data), record: { name: lookupName, related: exact.d.related, data: exact.d.data },
    };
  })());
  return apiCache.get(lookupName);
}
const deps = r => {
  const a = r.data.match(/^\[\[([^\]]+)\]\]$/);
  return a ? [a[1]] : r.data.split('$').map(s => s.split(':')).filter(a => a[0] === '99').map(a => a[7]);
};
const instrument = `const resolve=(n,seen=new Set())=>{if(seen.has(n))throw Error('alias cycle '+n);seen.add(n);const r=records[n];if(!r)throw Error('missing '+n);const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],seen):r.data;};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`;
const eq = (a, b) => a[0] === b[0] && a[1] === b[1];
const end = c => c.args.slice(c.kind === 'cdDrawLine' ? 2 : c.kind === 'cdDrawCurve' ? 4 : 6, c.kind === 'cdDrawLine' ? 4 : c.kind === 'cdDrawCurve' ? 6 : 8);
function sourceFacts(p) {
  const drawing = p.groups.map((g, i) => g.polygons.length ? i : null).filter(x => x !== null);
  const emptyRows = p.groups.map((g, i) => g.polygons.length ? null : i + 1).filter(x => x !== null);
  const internalGaps = [];
  for (const i of drawing) for (let j = 1; j < p.trace[i].length; j++) if (!eq(end(p.trace[i][j - 1]), p.trace[i][j].args.slice(0, 2))) internalGaps.push({ rawRow: i + 1, call: j + 1 });
  const joins = drawing.slice(1).filter((i, j) => {
    const a = p.trace[drawing[j]], b = p.trace[i];
    return a.length && b.length && eq(end(a.at(-1)), b[0].args.slice(0, 2));
  }).length;
  return { rawGroups: p.groups.length, drawingGroups: drawing.length, polygons: p.groups.reduce((n, g) => n + g.polygons.length, 0), emptyRows, internalGaps, exactConsecutiveJoinCount: joins, exactConsecutiveMinimum: drawing.length - joins };
}
const report = [];
for (const [glyph, base, catalogStrokes, batch, parentSHA] of specs) {
  const parentSourceFile = '../hanja-goal-glyphwiki-batch' + batch + '-2026-10-13/sources.json';
  const parentBytes = await read(parentSourceFile); assert.equal(sha(parentBytes), parentSHA);
  const parent = JSON.parse(parentBytes); assert.equal(parent.glyph, glyph); assert.equal(parent.root, base);
  const item = { glyph, root: base, catalogStrokes, parentSourceFile, parentSourceFileSha256: parentSHA, whole: [] };
  const currentNames = [...new Set([...parent.wholeNames, base + '-j'])];
  for (const mode of ['archive-recovered', 'current-fixed']) {
    for (const lookup of mode === 'archive-recovered' ? parent.wholeNames : currentNames) {
      const records = {}, providers = [], inheritedNames = [], seen = new Set();
      const root = lookup;
      let stage = 'closure';
      try {
        async function collect(name) {
          if (seen.has(name)) return; seen.add(name);
          let r = mode === 'archive-recovered' ? parent.records[name] : undefined;
          if (r) { inheritedNames.push(name); }
          else { const p = await fixedDefinition(name); r = p.record; providers.push(p); }
          records[name] = r;
          for (const dep of deps(r)) await collect(dep);
        }
        await collect(root);
        const source = {
          glyph, root, mode, archive: mode === 'archive-recovered' ? parent.archive : null,
          parentSourceFile, parentSourceFileSha256: parentSHA,
          dependencyPolicy: mode === 'archive-recovered'
            ? 'Every archived/historical record stays exact. Only absent dependency names are supplied by separately recorded exact public API versions; this fixed mixed-date closure is not the original archive identity.'
            : 'Every whole and dependency lookup is independently pinned to an exact public API name@version. This is a fixed mixed-date closure; API latest discovery is not claimed to be a single upstream snapshot.',
          records, inheritedNames, providers,
        };
        const sourceFile = mode + '-' + lookup + '-sources.json', sourceBytes = json(source);
        await fresh(sourceFile, sourceBytes);
        stage = 'engine';
        const ctx = vm.createContext({ records, root });
        for (const c of engineCodes) vm.runInContext(c, ctx, { timeout: 1000 });
        const actual = JSON.parse(vm.runInContext(instrument, ctx, { timeout: 5000 }));
        const proof = { engineRevision: seven.engineRevision, engineHashes: seven.engineHashes, ...actual };
        const proofFile = 'engine-' + mode + '-' + lookup + '.json', proofBytes = json(proof);
        await fresh(proofFile, proofBytes);
        item.whole.push({ root, mode, sourceFile, sourceFileSha256: sha(sourceBytes), proofFile, proofFileSha256: sha(proofBytes), sourceComplete: true, records: Object.keys(records).length, inheritedNames, fixedProviders: providers.map(p => ({ lookupName: p.lookupName, fixedName: p.fixedName, apiUrl: p.apiUrl, dataSha256: p.dataSha256 })), ...sourceFacts(actual), nativeReviewed: false, runtimeApplied: false });
      } catch (e) {
        item.whole.push({ root, mode, sourceComplete: false, failedStage: stage, error: e.message, nativeReviewed: false, runtimeApplied: false });
      }
    }
  }
  report.push(item);
}
const licenseBytes = await read('../hanja-remaining-seven-sources-2026-10-17/archive-LICENSE.txt');
assert.equal(sha(licenseBytes), seven.license.sha256);
try { assert.equal(await read('archive-LICENSE.txt'), licenseBytes); }
catch (e) { if (e.code !== 'ENOENT') throw e; await fresh('archive-LICENSE.txt', licenseBytes); }
const result = {
  capturedAt: '2026-10-17', engineRevision: seven.engineRevision, engineHashes: seven.engineHashes,
  archive: seven.archive, license: seven.license,
  currentLicenseOriginalFixedURL: 'https://glyphwiki.org/wiki/GlyphWiki:%E3%83%87%E3%83%BC%E3%82%BF%E3%83%BB%E8%A8%98%E4%BA%8B%E3%81%AE%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9@18',
  glyphs: report, nativeReviewCount: 0, runtimeApplied: false, canonicalHoldCreated: false,
  newHoldCount: 0, resumeCreated: false, privateMediaSaved: false, serversStarted: 0, buildRun: false,
};
await fresh('manifest.json', json(result));
console.log(JSON.stringify({ ok: true, glyphs: report.map(g => ({ glyph: g.glyph, complete: g.whole.filter(w => w.sourceComplete).length, failed: g.whole.filter(w => !w.sourceComplete), counts: g.whole.filter(w => w.sourceComplete).map(w => ({ root: w.root, mode: w.mode, raw: w.rawGroups, minimum: w.exactConsecutiveMinimum, internalGaps: w.internalGaps.length })) })), engineFilesVerified: engineCodes.length, nativeReviewCount: 0, runtimeApplied: false }));
