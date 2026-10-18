import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
export{renderProgressive}from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),sha=x=>createHash('sha256').update(x).digest('hex'),config=obj('config.json'),t=config.targets['599'];let calls=0,last
export const nativeApproval=false,runtimeApplied=false
export function fixedTargets(){return structuredClone(config.targets)}
export function sourceCompileCallCount(){return 0}
export function candidateDerivationCount(){return calls}
export function lastCompilation(){return last}
export function guards(){const p=obj('preparation.json');assert.equal(sha(read('config.json')),p.configSHA256);for(const[f,h]of Object.entries(t.inputSHA256))assert.equal(sha(read(f)),h,f);for(const[f,h]of Object.entries(p.newFilesSHA256))assert.equal(sha(read(f)),h,f)}
const round=x=>Math.round(x*1e6)/1e6
const bounds=polys=>{const a=polys.flat();assert(a.length);return[Math.min(...a.map(q=>q.x/2)),Math.min(...a.map(q=>q.y/2)),Math.max(...a.map(q=>q.x/2)),Math.max(...a.map(q=>q.y/2))]}
function boundedVh(t,baseline,proof){
 const s=t.vh;assert.equal(s.pen,5);assert.deepEqual(s.rawIndices,[4,5]);assert.deepEqual(t.sourceGroups[s.pen-1],s.rawIndices)
 const calls=s.rawIndices.flatMap(i=>proof.trace[i]);assert.equal(calls.length,2);assert.deepEqual(calls.map(c=>({kind:c.kind,args:c.args})),s.exactCalls)
 const[v,h]=calls;assert.equal(v.kind,'cdDrawLine');assert.equal(h.kind,'cdDrawLine');assert.deepEqual([v.polygons.length,h.polygons.length],s.polygonsCounts);assert.deepEqual([v,h].map(c=>sha(JSON.stringify(c.polygons))),s.polygonsSHA256)
 assert.deepEqual(v.args.slice(2,4),h.args.slice(0,2));assert.equal(v.args[2],v.args[0]);assert(v.args[3]>v.args[1]);assert.equal(v.args[4],0);assert.equal(v.args[5],13);assert.equal(h.args[1],h.args[3]);assert(h.args[0]<h.args[2]);assert.equal(h.args[4],2);assert.equal(h.args[5],2)
 const q=v.polygons[0];assert.equal(q.length,4);assert(q.every(p=>p.off===0&&Number.isInteger(p.x*10)&&Number.isInteger(p.y*10)))
 const cross=(a,b,p)=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]),qi=q.map(p=>[Math.round(p.x*10),Math.round(p.y*10)])
 const turns=qi.map((a,i)=>cross(a,qi[(i+1)%4],qi[(i+2)%4]));assert(turns.every(n=>n>0)||turns.every(n=>n<0),'Only pinned convex V quadrilateral')
 const bodyH=h.polygons[0];assert.equal(bodyH.length,4);const leftEdge=[bodyH[0],bodyH[3]];assert.equal(leftEdge[0].x,leftEdge[1].x)
 for(const p of leftEdge){const point=[Math.round(p.x*10),Math.round(p.y*10)],c=qi.map((a,i)=>cross(a,qi[(i+1)%4],point));assert(c.every(n=>n>0)||c.every(n=>n<0),'H initial edge strictly inside completed V')}
 assert.equal(v.polygons.length,2);assert.equal(v.polygons[1].length,3);assert.equal(h.polygons.length,1)
 const old=baseline[s.pen-1];assert.equal(old.length,1);const mask=old[0],chunks=mask.outline.match(/M[^Z]* Z/g);assert.equal(chunks.length,3);assert.equal(mask.direction,'curve');assert.equal(mask.revealWidth,14)
 const outline=polygons=>polygons.map(p=>{const area=p.reduce((a,v,i)=>{const z=p[(i+1)%p.length];return a+v.x*z.y-z.x*v.y},0);assert(area!==0);const a=area<0?[p[0],...p.slice(1).reverse()]:p;return a.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z'}).join(' ')
 assert.equal(chunks.slice(0,2).join(' '),outline(v.polygons));assert.equal(chunks[2],outline(h.polygons));assert.deepEqual(mask.bounds,bounds(calls.flatMap(c=>c.polygons)))
 const weights=calls.map(c=>round(Math.hypot(c.args[2]-c.args[0],c.args[3]-c.args[1])/2));assert.deepEqual(weights,s.weights);assert.equal(round(weights[0]+weights[1]),mask.weight,'Original per-call weights sum to old pen weight')
 const pieces=[{outline:chunks.slice(0,2).join(' '),bounds:bounds(v.polygons),direction:'down',weight:weights[0]},{outline:chunks[2],bounds:bounds(h.polygons),direction:'right',weight:weights[1]}]
 assert.deepEqual(pieces.map(m=>m.bounds),s.bounds);assert.deepEqual(pieces.map(m=>m.direction),s.directions);assert.equal(pieces.map(m=>m.outline).join(' '),mask.outline)
 const out=baseline.slice();out[s.pen-1]=pieces;for(let i=0;i<out.length;i++)if(i!==s.pen-1)assert.equal(out[i],baseline[i]);return out
}
export function compileProgressive(...args){assert.equal(args.length,3,'New strict wrapper requires exactly3 explicit arguments');guards();const[trace,proof,id]=args;assert.deepEqual(id,t.identity);assert.deepEqual(Object.keys(proof).sort(),t.proofKeys);assert.equal(sha(JSON.stringify(proof)),t.fullProofSHA256);assert.equal(sha(JSON.stringify(trace)),t.traceSHA256);assert.deepEqual(trace,proof.trace);assert.equal(id.root,t.root);assert.equal(sha(read(t.sourceDirectory+'/'+id.file)),id.fileSHA256);assert.deepEqual(proof,obj(t.sourceDirectory+'/'+id.file));const f=obj('fixtures.json').u7f3e,baseline=f.baseline;assert.equal(sha(JSON.stringify(baseline)),t.baselineSHA256);const before=JSON.stringify(proof),baselineBefore=JSON.stringify(baseline),out=boundedVh(t,baseline,proof);assert.equal(out.length,12);assert.equal(out.flat().length,13);assert.equal(out.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),26);assert.equal(JSON.stringify(proof),before);assert.equal(JSON.stringify(baseline),baselineBefore);calls++;last={baseline,strokes:out,sourceCompilations:0,sourceIdentityWasNewBinding:true};return out}
export function compileSourceWhole(...args){assert.equal(args.length,4,'New strict wrapper requires exactly4 explicit arguments');const[root,trace,proof,id]=args;assert.equal(root,t.root);return compileProgressive(trace,proof,id)}
