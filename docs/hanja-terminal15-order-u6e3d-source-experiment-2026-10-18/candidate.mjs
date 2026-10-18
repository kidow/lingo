import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
export{renderProgressive}from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),hash=v=>createHash('sha256').update(v).digest('hex'),CONFIG=obj('config.json'),T=CONFIG.targets.u6e3d
export const SELECTED_PROOF_IDENTITY=Object.freeze({...T.identity})
export const nativeApproval=false,runtimeApplied=false
export const sourceGroups=T.candidateSourceGroups
let derivations=0,cachedCalls=0
export const geometryDerivationCallCount=()=>derivations
export const cachedPositiveCallCount=()=>cachedCalls
export const sourceCompileCallCount=()=>0
function validate(trace,proof,identity){
 assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),T.proofKeys)
 assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(Object.keys(identity).sort(),Object.keys(SELECTED_PROOF_IDENTITY).sort());assert.deepEqual(identity,SELECTED_PROOF_IDENTITY)
 assert.equal(hash(read(T.sourceDirectory+'/'+identity.file)),identity.fileSHA256);assert.deepEqual(trace,proof.trace);assert.equal(hash(JSON.stringify(proof)),T.fullProofSHA256)
 for(const[f,h]of Object.entries(T.inputSHA256))assert.equal(hash(read(f)),h,f)
}
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
function derive(trace,proof,p,baseline){
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
 const canonicalPolys=v=>v.flat().flatMap(mask=>contourPolygons(mask.outline)).map(c=>canonical(c.points)).sort()
 assert.deepEqual(canonicalPolys(result),canonicalPolys(baseline));assert.deepEqual(canonicalPolys(result),proof.groups.flatMap(g=>g.polygons).map(canonical).sort())
 assert.deepEqual([...p.originalPenOrder].sort((a,b)=>a-b),Array.from({length:12},(_,i)=>i+1))
 const strokes=p.originalPenOrder.map(i=>result[i-1]);assert.equal(strokes.length,12);assert.equal(strokes.flat().length,14)
 return strokes
}
export function captureGeometry(trace,proof,identity){assert.equal(arguments.length,3);validate(trace,proof,identity);assert.equal(derivations,0);derivations++;const baseline=obj(T.baselineDirectory+'/fixtures.json').u6e3d.strokes;assert.equal(hash(JSON.stringify(baseline)),T.baselineSHA256);return{baseline,strokes:derive(trace,proof,T,baseline)}}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);validate(trace,proof,identity);const f=obj('fixtures.json').u6e3d;assert.equal(hash(JSON.stringify(f.strokes)),T.derivedSHA256);cachedCalls++;return f.strokes}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,T.root);return compileProgressive(trace,proof,identity)}
