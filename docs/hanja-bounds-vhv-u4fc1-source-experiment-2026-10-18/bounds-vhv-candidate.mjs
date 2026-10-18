import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
export{renderProgressive}from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),sha=v=>createHash('sha256').update(v).digest('hex'),config=obj('config.json'),counts=new Map(),last=new Map()
export const nativeApproval=false,runtimeApplied=false
export function fixedTargets(){return structuredClone(config.targets)}
export function sourceCompileCallCount(){return 0}
export function candidateDerivationCount(k){return counts.get(String(k))??0}
export function lastCompilation(k){return last.get(String(k))}
export function guards(){const p=obj('preparation.json');assert.equal(sha(read('config.json')),p.configSHA256);for(const t of Object.values(config.targets))for(const[f,h]of Object.entries(t.inputSHA256))assert.equal(sha(read(f)),h,f);for(const[f,h]of Object.entries(p.newFilesSHA256))assert.equal(sha(read(f)),h,f)}
const round=x=>Math.round(x*1e6)/1e6
const bounds=polys=>{const a=polys.flat();assert(a.length);return[Math.min(...a.map(q=>q.x/2)),Math.min(...a.map(q=>q.y/2)),Math.max(...a.map(q=>q.x/2)),Math.max(...a.map(q=>q.y/2))]}
function boundedVhv(t,baseline,proof){
 const s=t.vhv;assert.equal(s.pen,6);assert.deepEqual(s.rawIndices,[6,7,8]);assert.deepEqual(t.sourceGroups[s.pen-1],s.rawIndices)
 const calls=s.rawIndices.flatMap(i=>proof.trace[i]);assert.equal(calls.length,3);assert.deepEqual(calls.map(c=>({kind:c.kind,args:c.args})),s.exactCalls)
 assert(calls.every(c=>c.kind==='cdDrawLine'));assert.deepEqual(calls.map(c=>c.polygons.length),[2,1,2]);assert.deepEqual(calls.map(c=>sha(JSON.stringify(c.polygons))),s.polygonsSHA256)
 const[v,h,w]=calls;for(let i=1;i<calls.length;i++)assert.deepEqual(calls[i-1].args.slice(2,4),calls[i].args.slice(0,2),'Exact original endpoint join only')
 assert.equal(v.args[0],v.args[2]);assert(v.args[3]>v.args[1]);assert.deepEqual(v.args.slice(4),[0,13]);assert.equal(h.args[1],h.args[3]);assert(h.args[2]>h.args[0]);assert.deepEqual(h.args.slice(4),[2,2]);assert.equal(w.args[0],w.args[2]);assert(w.args[3]>w.args[1]);assert.deepEqual(w.args.slice(4),[22,32])
 assert.deepEqual(calls.map(c=>c.polygons.length),s.polygonsCounts);assert.deepEqual(calls.map(c=>c.polygons.map(p=>p.length)),[[4,3],[4],[4,5]])
 for(const c of calls)for(const p of c.polygons){assert(p.every(q=>q.off===0&&Number.isFinite(q.x)&&Number.isFinite(q.y)&&Number.isInteger(q.x*10)&&Number.isInteger(q.y*10)));assert(p.length>=3)}
 const old=baseline[5];assert.equal(old.length,1);const mask=old[0],chunks=mask.outline.match(/M[^Z]* Z/g);assert.equal(chunks.length,5);assert.equal(mask.direction,'curve');assert.equal(mask.revealWidth,14);assert.equal(mask.revealPath,'M42.22 15 L42.22 47.5 L82.18 47.5 L82.18 66')
 const outline=polygons=>polygons.map(p=>{const area=p.reduce((a,v,i)=>{const z=p[(i+1)%p.length];return a+v.x*z.y-z.x*v.y},0);assert(area!==0);const a=area<0?[p[0],...p.slice(1).reverse()]:p;return a.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z'}).join(' ')
 const ranges=[[0,2],[2,3],[3,5]],weights=calls.map(c=>round(Math.hypot(c.args[2]-c.args[0],c.args[3]-c.args[1])/2));assert.deepEqual(weights,s.weights);assert.equal(round(weights.reduce((a,b)=>a+b,0)),mask.weight);assert.deepEqual(mask.bounds,bounds(calls.flatMap(c=>c.polygons)))
 const pieces=calls.map((c,i)=>{const chunk=chunks.slice(...ranges[i]).join(' ');assert.equal(chunk,outline(c.polygons));return{outline:chunk,bounds:bounds(c.polygons),direction:s.directions[i],weight:weights[i]}})
 assert.deepEqual(pieces.map(m=>m.direction),['down','right','down']);assert.deepEqual(pieces.map(m=>m.bounds),s.bounds);assert.equal(pieces.map(m=>m.outline).join(' '),mask.outline)
 const out=baseline.slice();out[5]=pieces;for(let i=0;i<out.length;i++)if(i!==5)assert.equal(out[i],baseline[i]);return out
}
export function compileProgressive(...args){
 assert.equal(args.length,3,'Exactly3 explicit arguments');guards();const[trace,proof,id]=args,t=config.targets['755'];assert(id&&id.root===t.root,'Exact selected root required');assert.deepEqual(id,t.identity);assert.deepEqual(Object.keys(proof).sort(),t.proofKeys);assert.equal(sha(JSON.stringify(proof)),t.fullProofSHA256);assert.deepEqual(trace,proof.trace)
 const header=obj(t.sourceDirectory+'/'+t.headerFile),body=obj(t.sourceDirectory+'/'+t.proofFile);assert.equal(sha(read(t.sourceDirectory+'/'+t.proofFile)),id.fileSHA256);assert.deepEqual(Object.keys(header).sort(),t.headerKeys);assert.deepEqual(Object.keys(body).sort(),t.bodyKeys);assert.deepEqual({...header,...body},proof);for(const k of ['defaults','groups','trace'])assert.deepEqual(header[k],body[k]);assert.deepEqual(obj(t.sourceDirectory+'/'+t.traceFile),proof.trace)
 const before=JSON.stringify(proof),baseline=obj(t.cachedBaseline.file)[t.key].baseline;assert.equal(sha(JSON.stringify(baseline)),t.cachedBaseline.baselineSHA256);assert.equal(baseline.length,t.pens);assert.equal(baseline.flat().length,t.masks);const beforeBaseline=JSON.stringify(baseline)
 const strokes=boundedVhv(t,baseline,proof);assert.equal(strokes.length,t.pens);assert.equal(strokes.flat().length,t.masks+2);assert.equal(strokes.flat().reduce((s,m)=>s+(m.outline.match(/M/g)||[]).length,0),t.polygons);assert.equal(JSON.stringify(proof),before);assert.equal(JSON.stringify(baseline),beforeBaseline);counts.set(t.key,candidateDerivationCount(t.key)+1)
 last.set(t.key,{baseline,strokes,sourceCompilations:0,displayPolicyChanged:true});return strokes
}
export function compileSourceWhole(...args){assert.equal(args.length,4,'Exactly4 explicit arguments');const[root,trace,proof,id]=args;assert.equal(root,id?.root);return compileProgressive(trace,proof,id)}
