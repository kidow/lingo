import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import*as M0 from'../hanja-goal-glyphwiki-batch649-2026-10-11/progressive.mjs'
import*as M1 from'../hanja-goal-glyphwiki-batch687-2026-10-11/progressive.mjs'
import*as M2 from'../hanja-goal-glyphwiki-batch716-2026-10-12/progressive.mjs'
import*as M3 from'../hanja-goal-glyphwiki-batch717-2026-10-12/progressive.mjs'
import*as M4 from'../hanja-goal-glyphwiki-batch719-2026-10-12/progressive.mjs'
import*as M5 from'../hanja-goal-glyphwiki-batch720-2026-10-12/progressive.mjs'
import*as M6 from'../hanja-goal-glyphwiki-batch979-2026-10-13/progressive.mjs'
export{renderProgressive}from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),sha=v=>createHash('sha256').update(v).digest('hex'),config=obj('config.json'),modules={'649':M0,'687':M1,'716':M2,'717':M3,'719':M4,'720':M5,'979':M6},counts=new Map(),last=new Map()
export const nativeApproval=false,runtimeApplied=false
export function fixedTargets(){return structuredClone(config.targets)}
export function sourceCompileCallCount(k){return counts.get(String(k))??0}
export function lastCompilation(k){return last.get(String(k))}
export function guards(){const p=obj('preparation.json');assert.equal(sha(read('config.json')),p.configSHA256);for(const t of Object.values(config.targets))for(const[f,h]of Object.entries(t.inputSHA256))assert.equal(sha(read(f)),h,f);for(const[f,h]of Object.entries(p.newFilesSHA256))assert.equal(sha(read(f)),h,f)}
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

export function compileProgressive(...args){assert.equal(args.length,3,'Exactly3 explicit arguments');guards();const[trace,proof,id]=args,t=Object.values(config.targets).find(t=>t.root===(id?.root??id?.sourceRoot));assert(t,'Exact selected whole identity required');assert.deepEqual(id,t.identity);assert.deepEqual(Object.keys(proof).sort(),t.proofKeys);assert.equal(sha(JSON.stringify(proof)),t.fullProofSHA256);assert.deepEqual(trace,proof.trace);const h=obj(t.sourceDirectory+'/'+t.headerFile),b=obj(t.sourceDirectory+'/'+t.proofFile),expected={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...b};assert.deepEqual(Object.keys(h).sort(),t.headerKeys);assert.deepEqual(proof,expected);for(const k of t.headerBodyComparisonKeys)assert.deepEqual(h[k],proof[k]);if(t.traceFile)assert.deepEqual(obj(t.sourceDirectory+'/'+t.traceFile),b.trace);assert.deepEqual(modules[t.key].sourceGroups,t.sourceGroups);const before=JSON.stringify(proof);counts.set(t.key,sourceCompileCallCount(t.key)+1);const baseline=t.legacyDelegateArgumentCount===2?modules[t.key].compileProgressive(trace,proof):modules[t.key].compileProgressive(trace,proof,t.originalIdentity);assert.equal(baseline.length,t.pens);assert.equal(baseline.flat().length,t.masks);if(t.baselineSHA256!==null)assert.equal(sha(JSON.stringify(baseline)),t.baselineSHA256);const strokes=derive(t,baseline,proof);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.flat().length,t.masks+1);last.set(t.key,{baseline,strokes,tail:{polygon:proof.trace[t.rawIndices.at(-1)].at(-1).polygons.at(-1),jump:proof.defaults.kWidth*5}});return strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4,'Exactly4 explicit arguments');const[root,trace,proof,id]=args;assert.equal(root,id?.root??id?.sourceRoot);return compileProgressive(trace,proof,id)}
