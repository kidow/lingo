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
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })
const round=x=>Math.round(x*1e6)/1e6
function eligible(t,proof){const indices=t.sourceGroups[t.pen-1];assert.deepEqual(indices,t.rawIndices);assert.equal(indices.length,2);const calls=indices.flatMap(i=>proof.trace[i]);assert.equal(calls.length,2);assert.deepEqual(calls.map(c=>({kind:c.kind,args:c.args})),t.exactCalls);const[h,v]=calls;assert.equal(h.kind,'cdDrawLine');assert.equal(v.kind,'cdDrawLine');assert.equal(h.args.length,6);assert.equal(v.args.length,6);assert.equal(h.args[1],h.args[3]);assert(h.args[2]>h.args[0]);assert.deepEqual(h.args.slice(2,4),v.args.slice(0,2));assert.equal(v.args[0],v.args[2]);assert(v.args[3]>v.args[1]);assert.equal(h.args[5]%100,2);assert.equal(v.args[4]%100,22);assert.equal(v.args[5]%100,23);assert.equal(h.polygons.length,1);assert.equal(v.polygons.length,2);for(const c of calls)for(const p of c.polygons){assert(p.length>=3);assert(p.every(q=>q.off===0&&Number.isFinite(q.x)&&Number.isFinite(q.y)));assert.notEqual(p.reduce((a,q,i)=>{const r=p[(i+1)%p.length];return a+q.x*r.y-r.x*q.y},0),0)}return calls}
function derive(t,baseline,proof){const[h,v]=eligible(t,proof),old=baseline[t.pen-1];assert.equal(old.length,1);const body=old[0],chunks=body.outline.match(/M[^Z]* Z/g);assert.equal(chunks.length,3);assert.equal(body.direction,'curve');assert.equal(body.revealWidth,14);const path='M'+h.args[0]/2+' '+h.args[1]/2+' L'+h.args[2]/2+' '+h.args[3]/2+' L'+v.args[2]/2+' '+v.args[3]/2;assert.equal(body.revealPath,path,'Only exact existing threepoint H then V guide is eligible');const segment=(c,outline,direction)=>{const p=c.polygons.flat(),xs=p.map(q=>q.x/2),ys=p.map(q=>q.y/2);return{outline,bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:round(Math.hypot(c.args[2]-c.args[0],c.args[3]-c.args[1])/2)}};const horizontal=segment(h,chunks[0],'right'),vertical=segment(v,chunks.slice(1).join(' '),'down');assert(horizontal.weight>0&&vertical.weight>0);assert.equal(round(horizontal.weight+vertical.weight),body.weight);assert.equal(horizontal.outline+' '+vertical.outline,body.outline);const result=baseline.slice();result[t.pen-1]=[horizontal,vertical];for(let i=0;i<baseline.length;i++)if(i!==t.pen-1)assert.equal(result[i],baseline[i]);assert.equal(result.length,t.pens);assert.equal(result.flat().length,t.masks+1);assert.equal(result.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),t.polygons);return result}
const curve15Derive=(()=>{
const contourPolygons=outline=>(outline.match(/M[^Z]+Z/g)||[]).map(path=>{
 const values=path.match(/-?\d+(?:\.\d+)?/g).map(Number)
 return {path,points:Array.from({length:values.length/2},(_,i)=>({x:values[i*2]*2,y:values[i*2+1]*2,off:0}))}
})
const canonical=points=>{
 const p=points.map(v=>[v.x,v.y]),choices=[]
 for(const o of[p,[...p].reverse()])for(let i=0;i<o.length;i++)choices.push(JSON.stringify([...o.slice(i),...o.slice(0,i)]))
 return choices.sort()[0]
}
const bounds=points=>[Math.min(...points.map(p=>p.x/2)),Math.min(...points.map(p=>p.y/2)),Math.max(...points.map(p=>p.x/2)),Math.max(...points.map(p=>p.y/2))]
function derive(p,baseline,proof){
 const trace=proof.trace,before=JSON.stringify(proof)
 const result=baseline.map(pen=>pen.map(mask=>({...mask,bounds:[...mask.bounds]})))
 for(const fixture of p.terminals){
  const {raw,call,pen,maskIndex,args,kind}=fixture
  assert.equal(p.sourceGroups[pen-1].at(-1),raw,'Terminal must be last authored raw of this same pen')
  assert.equal(trace[raw].length-1,call,'No following authored call may be silently delayed')
  const terminal=trace[raw][call]
  assert.equal(terminal.kind,kind);assert.deepEqual(terminal.args,args)
  assert(kind==='cdDrawCurve'||kind==='cdDrawBezier')
  const endpoint=terminal.args.slice(kind==='cdDrawCurve'?4:6,kind==='cdDrawCurve'?6:8),[x2,y2]=endpoint
  const ta1=terminal.args.at(-2),ta2=terminal.args.at(-1)
  assert.equal(ta2,15);assert(terminal.args[1]<y2)
  const opt1=Math.floor((ta1%10000)/1000),width=proof.defaults.kMinWidthT-opt1/2,jump=proof.defaults.kWidth*5
  const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
  const expectedTail=[point(x2,y2-width+1),point(x2+2,y2-width-jump),point(x2,y2-width-jump),point(x2-width,y2-width+1)]
  const tailPolygon=terminal.polygons.at(-1)
  assert.deepEqual(tailPolygon,expectedTail,'Separate last original terminal15 quad, unchanged')
  assert.equal(baseline[pen-1].length,fixture.originalPenMasks)
  const oldMask=baseline[pen-1][maskIndex]
  assert.equal(maskIndex,baseline[pen-1].length-1)
  assert.equal(oldMask.direction,'curve')
  const contours=contourPolygons(oldMask.outline),target=canonical(tailPolygon),matched=contours.flatMap((c,i)=>canonical(c.points)===target?[i]:[])
  assert.equal(matched.length,1,'Original quad appears exactly once in current curve mask')
  const ti=matched[0],bodyContours=contours.filter((_,i)=>i!==ti)
  assert(bodyContours.length>0)
  assert.deepEqual(bounds(bodyContours.flatMap(c=>c.points)),oldMask.bounds,'Body bounds must already equal original mask bounds; otherwise hold')
  const body={...oldMask,bounds:[...oldMask.bounds],outline:bodyContours.map(c=>c.path).join(' ')}
  const tail={outline:contours[ti].path,bounds:bounds(tailPolygon),direction:'up',weight:jump/2}
  assert.equal(tail.weight,12.5,'Fixed original jump, never bbox-height weight')
  result[pen-1].splice(maskIndex,1,body,tail)
 }
 const sourcePolygons=proof.groups.flatMap(g=>g.polygons).map(canonical).sort()
 const rendered=result.flatMap(pen=>pen.flatMap(mask=>contourPolygons(mask.outline).map(c=>canonical(c.points)))).sort()
 assert.deepEqual(rendered,sourcePolygons,'Every unchanged original polygon exactly once')
 assert.equal(result.length,baseline.length,'Same pens/order/count')
 assert.equal(JSON.stringify(proof),before,'Source input is immutable')
 return result
}
return derive
})();
export function compileProgressive(...args){
 assert.equal(args.length,3,'Exactly3 explicit arguments');guards();const[trace,proof,id]=args,t=Object.values(config.targets).find(v=>v.root===id?.root);assert(t,'Exact selected root required');assert.deepEqual(id,t.identity);assert.deepEqual(Object.keys(proof).sort(),t.proofKeys);assert.equal(sha(JSON.stringify(proof)),t.fullProofSHA256);assert.deepEqual(trace,proof.trace);
 const header=obj(t.sourceDirectory+'/'+t.headerFile),b=obj(t.sourceDirectory+'/'+t.proofFile);assert.equal(sha(read(t.sourceDirectory+'/'+t.proofFile)),id.fileSHA256);assert.deepEqual(Object.keys(header).sort(),t.headerKeys);assert.deepEqual(Object.keys(b).sort(),t.proofKeys);for(const k of t.headerBodyComparisonKeys)assert.deepEqual(header[k],b[k]);assert.deepEqual(proof,b);assert.deepEqual(obj(t.sourceDirectory+'/'+t.traceFile),proof.trace);
 const baseline=obj(t.cachedBaseline.file)[t.cachedBaseline.key].baseline;assert.equal(sha(JSON.stringify(baseline)),t.cachedBaseline.baselineSHA256);assert.deepEqual([baseline.length,baseline.flat().length],[15,15]);assert.deepEqual([t.cardinal.pen,t.pen],[13,10]);const before=JSON.stringify(proof),beforeBaseline=JSON.stringify(baseline);counts.set(t.key,candidateDerivationCount(t.key)+1);
 const hv=derive({...t,...t.cardinal},baseline,proof),q15=curve15Derive(t,baseline,proof),strokes=baseline.slice();assert.equal(sha(JSON.stringify(q15)),t.cachedBaseline.q15OnlySHA256);strokes[12]=hv[12];strokes[9]=q15[9];for(let i=0;i<strokes.length;i++)if(![9,12].includes(i))assert.equal(strokes[i],baseline[i]);assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0)],[15,17,41]);assert.equal(JSON.stringify(proof),before);assert.equal(JSON.stringify(baseline),beforeBaseline);last.set(t.key,{baseline,strokes,independent:[hv,q15],q15Only:q15,sourceCompilations:0});return strokes
}
export function compileSourceWhole(...args){assert.equal(args.length,4,'Exactly4 explicit arguments');const[root,trace,proof,id]=args;assert.equal(root,id?.root);return compileProgressive(trace,proof,id)}
