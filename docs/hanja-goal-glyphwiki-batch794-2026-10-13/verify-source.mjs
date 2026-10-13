import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
const read = (n) => readFileSync(new URL(n, import.meta.url)), obj = (n) => JSON.parse(read(n).toString()), sha = (b) => createHash('sha256').update(b).digest('hex');
const source = obj('sources.json'), proof = obj('engine-proof.json'), meta = obj('metadata.json'), analysis = obj('source-analysis.json'), joins = obj('source-join-analysis.json');
const SPEC = {"batch":794,"glyph":"奫","root":"u596b","catalog":14,"clips":15};
assert.equal(source.glyph, SPEC.glyph);
assert.equal(source.root, SPEC.root);
assert.deepEqual(source.missing, []);
assert.deepEqual(source.aliases, []);
assert.equal(meta.candidate.strokes, SPEC.catalog);
assert.equal(meta.dictionaryStrokes, SPEC.clips);
assert.equal(analysis.catalogStrokes, SPEC.catalog);
assert.equal(analysis.dictionaryStrokes, SPEC.clips);
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

assert.equal(sha(read('sources.json')),analysis.sourcesSha256);
assert.equal(sha(read('engine-proof.json')),analysis.proofSha256);
assert.deepEqual(analysis.wholeNames,source.wholeNames);
assert.deepEqual(joins.roots.map(w=>w.root),source.wholeNames);
const same=(a,b)=>a.every((value,index)=>Math.abs(value-b[index])<=1e-8);
const wholeByRoot=new Map();
for(const root of source.wholeNames){
 const filename='engine-whole-'+root+'.json', original=obj(filename), actual=reproduce(root), record=joins.roots.find(w=>w.root===root);
 assert.deepEqual(actual.groups,original.groups);assert.deepEqual(actual.trace,original.trace);assert.deepEqual(actual.defaults,original.defaults);
 assert.equal(original.engineRevision,proof.engineRevision);assert.deepEqual(original.engineHashes,proof.engineHashes);
 assert.equal(sha(read(filename)),record.fileSha256??record.sha256);
 if(root===source.root){assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,proof.trace);assert.deepEqual(actual.defaults,proof.defaults);}
 wholeByRoot.set(root,actual);
 assert.equal(record.raw,actual.groups.length);assert.equal(record.draw,actual.trace.flat().length);assert.equal(record.polygons,actual.groups.reduce((sum,g)=>sum+g.polygons.length,0));
 const rows=actual.trace.map((calls,raw)=>({raw,start:calls[0].args.slice(0,2),end:endpoint(calls.at(-1))})), edges=[],gaps=[];
 for(const a of rows)for(const b of rows)if(a.raw!==b.raw&&same(a.end,b.start))edges.push([a.raw,b.raw]);
 assert.deepEqual(edges,record.edges);
 for(let raw=0;raw<actual.trace.length;raw++){
  const calls=actual.trace[raw];assert.deepEqual(calls.flatMap(c=>c.polygons),actual.groups[raw].polygons);
  for(let k=1;k<calls.length;k++){const end=endpoint(calls[k-1]),start=calls[k].args.slice(0,2);if(!same(end,start))gaps.push({raw,end,start,delta:start.map((v,i)=>v-end[i])});}
 }
 assert.equal(gaps.length,record.internalGaps.length);
 const terminal=actual.trace.flatMap((calls,raw)=>calls.flatMap((c,k)=>[5,13,14,15].includes(c.args.at(-1)%100)?[[raw,k,c.kind,c.args.at(-1)]]:[]));
 assert.deepEqual(terminal,record.terminal);
 for(const join of record.requiredJoins??[]){
  const [a,b]=join.raw,end=endpoint(actual.trace[a].at(-1)),start=actual.trace[b][0].args.slice(0,2),delta=start.map((v,i)=>v-end[i]);
  assert.deepEqual(end,join.end);assert.deepEqual(start,join.start);assert.deepEqual(delta,join.delta);assert.equal(same(end,start),join.exact);assert.equal(Math.hypot(...delta),join.distance);
 }
 if(record.minimumWholeCenterlinePaths!==undefined){
  const matching=new Map(),adjacency=new Map(rows.map(r=>[r.raw,edges.filter(e=>e[0]===r.raw).map(e=>e[1])]));
  const augment=(u,seen)=>{for(const v of adjacency.get(u)){if(seen.has(v))continue;seen.add(v);if(!matching.has(v)||augment(matching.get(v),seen)){matching.set(v,u);return true;}}return false;};
  for(const r of rows)augment(r.raw,new Set());assert.equal(actual.groups.length-matching.size,record.minimumWholeCenterlinePaths);
 }
}
const selected=wholeByRoot.get(joins.selectedRoot),groups=joins.groupingCandidate??joins.numericGroupingCandidate,flat=groups.flat();
assert.deepEqual([...flat].sort((a,b)=>a-b),selected.groups.map((_,i)=>i));assert.equal(new Set(flat).size,flat.length);
assert.equal(joins.coverage.raw,selected.groups.length);assert.equal(joins.coverage.draw,selected.trace.flat().length);assert.equal(joins.coverage.polygons,selected.groups.reduce((sum,g)=>sum+g.polygons.length,0));
for(const join of joins.requiredJoins??[]){
 const [a,b]=join.raw;assert.deepEqual(endpoint(selected.trace[a].at(-1)),join.end);assert.deepEqual(selected.trace[b][0].args.slice(0,2),join.start);assert.equal(same(join.end,join.start),join.exact);
}
for(const [raw,k,args,polygon] of joins.tailPolygons){assert.deepEqual(selected.trace[raw][k].args,args);assert.deepEqual(selected.trace[raw][k].polygons.at(-1),polygon);}
assert.equal(analysis.approved,false);assert.equal(joins.approved,false);assert.equal(analysis.nativeReviewed,false);assert.equal(joins.nativeReviewed,false);
const dict=await fetch(meta.dictionary.url);assert(dict.ok,'Private domestic source HTTP success');
const bytes=Buffer.from(await dict.arrayBuffer()),svg=bytes.toString();
assert.equal(bytes.length,meta.dictionary.bytes);assert.equal(sha(bytes),meta.dictionary.sha256);
const clips=(svg.match(/clip-path="url\(#/g)||[]).length;assert.equal(clips,SPEC.clips);
assert(svg.includes('<title>'+SPEC.glyph+'</title>'));assert.equal(meta.dictionary.clips,clips);assert.equal(meta.dictionary.glyph,SPEC.glyph);
console.log(JSON.stringify({batch:SPEC.batch,glyph:SPEC.glyph,sourcePassed:true,records:Object.keys(source.records).length,wholeRoots:source.wholeNames.length,historicalVersions:source.providerVersions.length,engineFiles:8,catalogStrokes:SPEC.catalog,domesticClips:clips,boundaryMatches:SPEC.catalog===clips,nativeApprovalAsserted:false}));
