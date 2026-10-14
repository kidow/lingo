import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
const read = (n) => readFileSync(new URL(n, import.meta.url)), obj = (n) => JSON.parse(read(n).toString()), sha = (b) => createHash('sha256').update(b).digest('hex');
const source = obj('sources.json'), proof = obj('engine-proof.json'), meta = obj('metadata.json'), analysis = obj('source-analysis.json'), joins = obj('source-join-analysis.json');
const SPEC = {"batch": 938, "glyph": "柷", "root": "u67f7", "catalog": 9, "clips": 9};
assert.equal(source.glyph, SPEC.glyph);
assert.equal(source.root, SPEC.root);
assert.deepEqual(source.missing, []);
for(const a of source.aliases)assert.equal(source.records[a.name].data,'[['+a.target+']]' );
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

const closureMissing=(name,seen=new Set())=>{if(seen.has(name))return [];seen.add(name);const r=source.records[name];if(!r){assert.equal(map.has(name),false,'Missing fixed source must not exist in pinned dump');return [name];}const a=r.data.match(/^\[\[([^\]]+)\]\]$/),ns=a?[a[1]]:r.data.split('$').map(l=>l.split(':')).filter(p=>p[0]==='99').map(p=>p[7]);return [...new Set(ns.flatMap(n=>closureMissing(n,seen)))].sort();};
for(const w of joins.wholeRoots){const missing=closureMissing(w.root);assert.deepEqual(missing,w.missingDependencies);assert.equal(w.sourceComplete,missing.length===0);}
assert.equal(analysis.selectedRootDependencyComplete,closureMissing(joins.selectedRoot).length===0);assert.deepEqual([...new Set(source.wholeNames.flatMap(n=>closureMissing(n)))].sort(),source.missing);
assert.equal(analysis.records,Object.keys(source.records).length);

assert.equal(sha(read('sources.json')),analysis.sourcesSha256);assert.equal(sha(read('engine-proof.json')),analysis.proofSha256);
assert.deepEqual(analysis.wholeNames,source.wholeNames);assert.deepEqual(joins.wholeRoots.map(w=>w.root),source.wholeNames);
assert.deepEqual(analysis.historicalNames,Object.keys(source.records).filter(n=>n.includes('@')));
assert.deepEqual(analysis.recordHashes,Object.entries(source.records).map(([name,r])=>({name,sourceSha256:sha(r.data),related:r.related})));
const wholeByRoot=new Map();
for(const root of source.wholeNames){
 const filename='engine-whole-'+root+'.json',saved=obj(filename),actual=reproduce(root),w=joins.wholeRoots.find(x=>x.root===root);assert(w);
 assert.equal(saved.engineRevision,proof.engineRevision);assert.deepEqual(saved.engineHashes,proof.engineHashes);assert.deepEqual(actual.groups,saved.groups);assert.deepEqual(actual.trace,saved.trace);assert.deepEqual(actual.defaults,saved.defaults);
 assert.equal(sha(read(filename)),w.proofFileSha256);if(root===source.root){assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,proof.trace);assert.deepEqual(actual.defaults,proof.defaults);}
 wholeByRoot.set(root,actual);assert.equal(w.rawGroups,actual.groups.length);assert.equal(w.drawingCalls,actual.trace.flat().length);assert.equal(w.originalPolygons,actual.groups.reduce((s,g)=>s+g.polygons.length,0));
 const rows=actual.trace.map((calls,raw)=>({raw,sourceKind:actual.groups[raw].raw[0],start:calls.length?calls[0].args.slice(0,2):null,end:calls.length?endpoint(calls.at(-1)):null}));assert.deepEqual(rows,w.endpoints);
 const edges=[];for(const a of rows)for(const b of rows)if(a.raw!==b.raw&&a.end&&b.start&&a.end.every((x,i)=>x===b.start[i]))edges.push([a.raw,b.raw]);assert.deepEqual(edges,w.exactDirectedJoins);
 const gaps=[];for(let i=0;i<actual.trace.length;i++){const calls=actual.trace[i];assert.deepEqual(calls.flatMap(c=>c.polygons),actual.groups[i].polygons);for(let k=1;k<calls.length;k++){const end=endpoint(calls[k-1]),start=calls[k].args.slice(0,2);if(!end.every((x,j)=>x===start[j]))gaps.push({raw:i,end,start,delta:start.map((x,j)=>x-end[j])});}}assert.deepEqual(gaps,w.internalGaps);
 for(const q of w.requiredJoins){const [a,b]=q.raw,end=endpoint(actual.trace[a].at(-1)),start=actual.trace[b][0].args.slice(0,2),delta=start.map((x,i)=>x-end[i]);assert.deepEqual(end,q.end);assert.deepEqual(start,q.start);assert.deepEqual(delta,q.delta);assert.equal(Math.hypot(...delta),q.distance);assert.equal(end.every((x,i)=>x===start[i]),q.exact);}
 for(const term of w.terminalOriginals){const c=actual.trace[term.raw][term.call];assert.equal(c.kind,term.kind);assert.deepEqual(c.args,term.args);assert.equal(c.args.at(-1),term.terminal);assert.deepEqual(c.polygons.at(-1),term.finalOriginalPolygon);}
 const active=rows.filter(x=>x.start),adj=new Map(active.map(x=>[x.raw,edges.filter(e=>e[0]===x.raw).map(e=>e[1])])),matching=new Map();
 const aug=(u,seen)=>{for(const v of adj.get(u)){if(seen.has(v))continue;seen.add(v);if(!matching.has(v)||aug(matching.get(v),seen)){matching.set(v,u);return true;}}return false;};for(const r of active)aug(r.raw,new Set());assert.equal(active.length-matching.size,w.minimumCompleteCenterlinePaths);
}
const selected=wholeByRoot.get(joins.selectedRoot),groups=joins.numericGroupingCandidate,flat=groups.flat();assert.deepEqual([...flat].sort((a,b)=>a-b),selected.groups.map((_,i)=>i));assert.equal(new Set(flat).size,flat.length);
assert.equal(groups.length,joins.candidateCount);assert.equal(joins.coverage.raw,selected.groups.length);assert.equal(joins.coverage.draw,selected.trace.flat().length);assert.equal(joins.coverage.polygons,selected.groups.reduce((s,g)=>s+g.polygons.length,0));
for(const q of joins.requiredJoins){const [a,b]=q.raw,end=endpoint(selected.trace[a].at(-1)),start=selected.trace[b][0].args.slice(0,2);assert.deepEqual(end,q.end);assert.deepEqual(start,q.start);assert.equal(end.every((x,i)=>x===start[i]),q.exact);}
assert.equal(joins.candidateJoinsExact,joins.requiredJoins.every(x=>x.exact));assert.equal(analysis.approved,false);assert.equal(joins.approved,false);assert.equal(analysis.nativeReviewed,false);assert.equal(joins.nativeReviewed,false);

const emptyRaw=selected.trace.flatMap((cs,i)=>cs.length?[]:[i]);assert.deepEqual(joins.nonDrawingInstructionRetention.map(x=>x.raw),emptyRaw);for(const x of joins.nonDrawingInstructionRetention){assert.deepEqual(x.source,selected.groups[x.raw].raw);assert.equal(selected.trace[x.raw].length,0);assert.equal(selected.groups[x.raw].polygons.length,0);assert.equal(x.drawingCalls,0);assert.equal(x.polygons,0);assert.equal(x.notAGeometricJoin,true);assert(groups[x.groupIndex].includes(x.raw));}
const domestic=await fetch(meta.dictionary.url);assert(domestic.ok);const bytes=Buffer.from(await domestic.arrayBuffer()),svg=bytes.toString();
assert.equal(bytes.length,meta.dictionary.bytes);assert.equal(sha(bytes),meta.dictionary.sha256);const clips=(svg.match(/clip-path="url\(#/g)||[]).length;assert.equal(clips,SPEC.clips);assert(svg.includes('<title>'+SPEC.glyph+'</title>'));assert.equal(meta.dictionary.glyph,SPEC.glyph);assert.equal(meta.dictionary.clips,clips);
console.log(JSON.stringify({batch:SPEC.batch,glyph:SPEC.glyph,sourcePassed:true,records:Object.keys(source.records).length,wholeRoots:source.wholeNames.length,historicalDependencies:source.providerVersions.length,engineFiles:8,catalogStrokes:SPEC.catalog,domesticClips:clips,candidateCount:groups.length,candidateExact:joins.candidateJoinsExact,nativeApprovalAsserted:false,privateMediaSaved:false}));
