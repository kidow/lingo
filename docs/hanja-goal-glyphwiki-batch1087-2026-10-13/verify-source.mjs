import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
const read = (n) => readFileSync(new URL(n, import.meta.url)), obj = (n) => JSON.parse(read(n).toString()), sha = (b) => createHash('sha256').update(b).digest('hex');
const source = obj('sources.json'), proof = obj('engine-proof.json'), meta = obj('metadata.json'), analysis = obj('source-join-analysis.json');
const SPEC = {"glyph":"湺","root":"u6e7a","catalog":12,"clips":12,"title":"湺","dictionaryStatus":200,"missing":[]};
assert.equal(source.glyph, SPEC.glyph);
assert.equal(source.root, SPEC.root);
assert.deepEqual(source.missing, SPEC.missing);
assert.deepEqual(source.aliases, Object.entries(source.records).filter(([name, r])=>/^\[\[([^\]]+)\]\]$/.test(r.data)).map(([name])=>name).sort());assert.equal(source.latestSubstitution,false);assert.equal(source.supplementalUsedForWholeReplay,false);
assert.equal(meta.candidate.strokes, SPEC.catalog);
assert.equal(meta.dictionaryStrokes, SPEC.clips);
assert.equal(analysis.catalogStrokes, SPEC.catalog);
assert.equal(analysis.domesticClips, SPEC.clips);
const ram = globalThis;
const texts = ram.__hanjaVerifierPublicText ??= new Map(), archives = ram.__hanjaVerifierArchive ??= new Map();
const publicText = (url) => { let p = texts.get(url); if (!p) {
    p = (async () => { const r = await fetch(url); assert(r.ok, 'Public source HTTP success'); return r.text(); })();
    texts.set(url, p);
} return p; };
const archiveKey = source.archive.url + '#' + source.archive.sha256;
let archivePromise = archives.get(archiveKey);
if (!archivePromise) {
    archivePromise = (async () => { const text = await publicText(source.archive.url); assert.equal(sha(text), source.archive.sha256); const rows = text.split('\n').map(l => l.split('|').map(s => s.trim())).filter(a => a.length >= 3); return new Map(rows.map(a => [a[0], { name: a[0], related: a[1], data: a[2] }])); })();
    archives.set(archiveKey, archivePromise);
}
const map = await archivePromise;
for (const [name, record] of Object.entries(source.records)) {
    if (/@\d+$/.test(name)) {
        const v = source.providerVersions.find((r) => r.name === name);
        assert(v);
        const actual = JSON.parse(await publicText(v.apiUrl));
        assert.equal(actual.name, name.split('@')[0]);
        assert.equal(Number(actual.version), Number(v.version));
        assert.equal(actual.related, record.related);
        assert.equal(actual.data, record.data);
        assert.equal(sha(actual.data), v.sha256);
    }
    else
        assert.deepEqual(map.get(name), record);
}
assert.equal(analysis.records, Object.keys(source.records).length);
assert.deepEqual(analysis.historicalNames, Object.keys(source.records).filter(n => n.includes('@')));
assert.equal(analysis.recordHashes.length, Object.keys(source.records).length);
assert.deepEqual(analysis.recordHashes, Object.keys(source.records).map(name => ({name, sourceSha256: sha(source.records[name].data), related: source.records[name].related})));

for (const r of source.supplementalLatest ?? []) { assert.equal(r.usedInPinnedReproduction, false); assert(source.missing.includes(r.name)); assert(!Object.hasOwn(source.records, r.name)); }
for (const name of source.missing.filter(n => !n.includes('@'))) assert(!map.has(name), 'Bare missing dependency must really be absent from fixed archive');
const expectedFamily = [...map.keys()].filter(n => n === SPEC.root || n.startsWith(SPEC.root + '-')).sort(); if(!expectedFamily.length)expectedFamily.push(SPEC.root); else if(!expectedFamily.includes(SPEC.root))expectedFamily.unshift(SPEC.root);assert.deepEqual(source.wholeNames, expectedFamily);
const codes = [];
assert.equal(Object.keys(proof.engineHashes).length, 8);
for (const [file, hash] of Object.entries(proof.engineHashes)) {
    const code = await publicText('https://raw.githubusercontent.com/kamichikoichi/kage-engine/' + proof.engineRevision + '/' + file);
    assert.equal(sha(code), hash);
    codes.push(code);
}
const engineScript = "const resolve=(n)=>{const r=records[n];const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1]):r.data;};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})";
const reproduce = (root) => { const ctx = vm.createContext({ records: source.records, root }); for (const code of codes)
    vm.runInContext(code, ctx, { timeout: 1000 }); return JSON.parse(vm.runInContext(engineScript, ctx, { timeout: 2000 })); };
const endpoint = (c) => c.args.slice(c.kind === 'cdDrawLine' ? 2 : c.kind === 'cdDrawBezier' ? 6 : 4, c.kind === 'cdDrawLine' ? 4 : c.kind === 'cdDrawBezier' ? 8 : 6);
assert.deepEqual(analysis.wholeRoots.map((w) => w.root), source.wholeNames);

const missingForRoot = (root) => {const absent=new Set(),seen=new Set();const walk=n=>{if(seen.has(n))return;seen.add(n);const record=source.records[n];if(!record){absent.add(n);return;}const alias=record.data.match(/^\[\[([^\]]+)\]\]$/);if(alias)walk(alias[1]);for(const line of record.data.split('$')){const f=line.split(':');if(Number(f[0])===99&&f[7])walk(f[7]);}};walk(root);return [...absent].sort();};
assert.deepEqual([...new Set(source.wholeNames.flatMap(missingForRoot))].sort(), source.missing);
const verifiedWholes = new Map();
for (const root of source.wholeNames) {
    const original = obj('engine-whole-' + root + '.json'), w = analysis.wholeRoots.find((x) => x.root === root);
    if(original.status === 'blockedMissingFixedDependency'){ assert.deepEqual(original.missing, missingForRoot(root)); assert.equal(original.groups, null);assert.equal(original.trace, null);assert.equal(w.rawGroups,null);assert.equal(source.approvalBlocked,true);continue; }
    if(original.status === 'blockedOriginalEngineFailure'){ assert.throws(()=>reproduce(root));assert.equal(original.groups,null);assert.equal(original.trace,null);assert.equal(w.rawGroups,null);assert.equal(source.approvalBlocked,true);continue; }
    assert.deepEqual(missingForRoot(root), []);
    const actual = reproduce(root);
    verifiedWholes.set(root, actual);
    assert(w);
    assert.deepEqual(actual.groups, original.groups);
    assert.deepEqual(actual.trace, original.trace);
    assert.deepEqual(actual.defaults, original.defaults);
    assert.equal(sha(read('engine-whole-' + root + '.json')), w.proofFileSha256);
    if (root === source.root) {
        assert.deepEqual(actual.groups, proof.groups);
        assert.deepEqual(actual.trace, proof.trace);
        assert.deepEqual(actual.defaults, proof.defaults);
    }
    assert.equal(w.rawGroups, actual.groups.length);
    assert.equal(w.drawingCalls, actual.trace.flat().length);
    assert.deepEqual(w.nonDrawingRawGroups, actual.trace.map((cs,raw)=>({raw,calls:cs.length,polygons:actual.groups[raw].polygons.length})).filter(v=>v.calls===0||v.polygons===0).map(v=>v.raw));
    assert.equal(w.nonEmptyRawGroups,actual.trace.filter(cs=>cs.length>0).length);
    assert.equal(w.visibleRawGroups,actual.trace.filter((cs,raw)=>cs.length>0&&actual.groups[raw].polygons.length>0).length);
    assert.equal(w.originalPolygons, actual.groups.reduce((n, g) => n + g.polygons.length, 0));
    assert.equal(w.endpoints.length, actual.trace.length);
    const rows = actual.trace.map((cs, raw) => ({ raw, start: cs[0]?.args.slice(0, 2) ?? null, end: cs.length ? endpoint(cs.at(-1)) : null })), edges = [];
    for (const a of rows)
        for (const b of rows)
            if (a.raw !== b.raw && a.end && b.start && a.end.every((v, k) => v === b.start[k]))
                edges.push([a.raw, b.raw]);
    assert.deepEqual(edges, w.exactDirectedJoins);
    for (let raw = 0; raw < actual.trace.length; raw++) {
        const cs = actual.trace[raw], r = w.endpoints[raw];
        assert.equal(r.sourceKind, actual.groups[raw].raw[0]);
        assert.deepEqual(r.start, rows[raw].start);
        assert.deepEqual(r.end, rows[raw].end);
        assert.deepEqual(r.calls, cs.map((c) => ({ kind: c.kind, start: c.args.slice(0, 2), end: endpoint(c), ta1: c.args.at(-2), ta2: c.args.at(-1) })));
        const gaps = cs.slice(1).flatMap((c, i) => { const e = endpoint(cs[i]), s = c.args.slice(0, 2), delta = s.map((v, k) => v - e[k]); return delta.every((v) => v === 0) ? [] : [{ afterCall: i, end: e, nextStart: s, delta, distance: Math.hypot(...delta) }]; });
        assert.deepEqual(gaps, r.internalGaps);
    }
    const adjacency = rows.map((r) => edges.filter(e => e[0] === r.raw).map(e => e[1])), state = rows.map(() => 0);
    let cyclic = false;
    const visit = (i) => { if (state[i] === 1) {
        cyclic = true;
        return;
    } if (state[i] === 2)
        return; state[i] = 1; for (const j of adjacency[i])
        visit(j); state[i] = 2; };
    for (const r of rows)
        visit(r.raw);
    assert.equal(cyclic, w.directedGraphCyclic);
    const right = rows.map(() => -1);
    const match = (i, seen) => { for (const j of adjacency[i]) {
        if (seen.has(j))
            continue;
        seen.add(j);
        if (right[j] === -1 || match(right[j], seen)) {
            right[j] = i;
            return true;
        }
    } return false; };
    let matching = 0;
    for (const r of rows)
        if (r.start && match(r.raw, new Set()))
            matching++;
    assert.equal(matching, w.maximumEndpointMatching);
    assert.equal(cyclic ? null : rows.filter((r) => r.start).length - matching, w.minimumDirectedPathCoverIfAcyclic);
    const selected = right.flatMap((v, j) => v === -1 ? [] : [[v, j]]), next = new Map(selected), incoming = new Set(selected.map((x) => x[1]));
    const numericPaths = rows.filter((r) => r.start && !incoming.has(r.raw)).map((r) => {
        const path = [r.raw], seen = new Set(path);
        while (next.has(path.at(-1)) && !seen.has(next.get(path.at(-1)))) {
            path.push(next.get(path.at(-1)));
            seen.add(path.at(-1));
        }
        return path;
    });
    assert.deepEqual(cyclic ? null : numericPaths, w.numericPathCoverGroupsIfAcyclic);
    const nearby = rows.flatMap((a) => rows.filter((b) => b.raw !== a.raw && b.start && a.end && a.end[1] === b.start[1] && a.end[0] !== b.start[0] && Math.abs(a.end[0] - b.start[0]) <= 25).map((b) => ({from: a.raw, to: b.raw, end: a.end, start: b.start, delta: b.start.map((v, k) => v - a.end[k]), distance: Math.hypot(...b.start.map((v, k) => v - a.end[k]))})));
    assert.deepEqual(nearby, w.horizontalEndpointGapsBelow25);
    const hooks = actual.trace.flatMap((cs, raw) => cs.flatMap((c, call) => [5, 14, 15].includes(c.args.at(-1) % 100) ? [{ raw, call, kind: c.kind, sourceKind: actual.groups[raw].raw[0], ta1: c.args.at(-2), ta2: c.args.at(-1), end: endpoint(c), meaning: 'original engine terminal; handling and native final reveal remain unreviewed' }] : []));
    assert.deepEqual(hooks, w.originalTerminal5Or14Or15);
}
const jsonSha = (v) => sha(JSON.stringify(v));
const baseRoot = source.wholeNames[0], baseWhole = verifiedWholes.get(baseRoot);
assert.equal(analysis.variantComparisons.length, source.wholeNames.length - 1);
for (const comparison of analysis.variantComparisons) {
    const whole = verifiedWholes.get(comparison.root);
    if(comparison.geometryAvailable === false){assert(!baseWhole || !whole);continue;}
    assert(whole);
    assert.equal(comparison.baseRoot, baseRoot);
    assert.equal(comparison.sameRawCount, baseWhole.groups.length === whole.groups.length);
    assert.equal(comparison.traceExactlyEqual, jsonSha(baseWhole.trace) === jsonSha(whole.trace));
    assert.equal(comparison.polygonsExactlyEqual, jsonSha(baseWhole.groups.map(g => g.polygons)) === jsonSha(whole.groups.map(g => g.polygons)));
    const changed = Array.from({length: Math.max(baseWhole.groups.length, whole.groups.length)}, (_, i) => i).filter(i => jsonSha(baseWhole.groups[i] ?? null) !== jsonSha(whole.groups[i] ?? null) || jsonSha(baseWhole.trace[i] ?? null) !== jsonSha(whole.trace[i] ?? null)).map(raw => ({raw, baselineRawSource: baseWhole.groups[raw]?.raw ?? null, variantRawSource: whole.groups[raw]?.raw ?? null, baselineTraceSha256: jsonSha(baseWhole.trace[raw] ?? null), variantTraceSha256: jsonSha(whole.trace[raw] ?? null), baselinePolygonsSha256: jsonSha(baseWhole.groups[raw]?.polygons ?? null), variantPolygonsSha256: jsonSha(whole.groups[raw]?.polygons ?? null)}));
    assert.deepEqual(comparison.changedRawSlots, changed);
}
// Domestic graphics are kept in RAM only; source/title/count mismatches are captured facts, not approval.
let domesticMetadataVerified=false;
if(SPEC.dictionaryStatus !== null){const dict=await fetch(meta.dictionary.url);assert.equal(dict.status,SPEC.dictionaryStatus);const bytes=Buffer.from(await dict.arrayBuffer());assert.equal(bytes.length,meta.dictionary.bytes);assert.equal(sha(bytes),meta.dictionary.sha256);if(dict.ok){const svg=bytes.toString();const title=svg.match(/<title[^>]*>([^<]*)<\/title>/)?.[1]?.trim()??null;assert.equal(title,SPEC.title);assert.equal((svg.match(/clip-path="url\(#/g)||[]).length,SPEC.clips);}domesticMetadataVerified=true;}
console.log(JSON.stringify({glyph:SPEC.glyph,sourcePassed:true,records:Object.keys(source.records).length,wholeRoots:source.wholeNames.length,engineFiles:8,catalogStrokes:SPEC.catalog,domesticClips:SPEC.clips,domesticMetadataVerified,approvalBlocked:source.approvalBlocked,nativeApprovalAsserted:false}));
