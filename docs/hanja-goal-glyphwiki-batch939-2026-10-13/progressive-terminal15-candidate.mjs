
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import * as original from './progressive.mjs'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const hash=value=>createHash('sha256').update(value).digest('hex')
const CONFIG = {"batch":939,"glyph":"顣","engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"filePins":{"sources.json":"d8665f1cce78f43b7ca62891d7a40f2f28d6535538610dd9b11c95e567fbf75f","engine-whole-u9863-ue0100.json":"c861abb87dcd9bc4ac41c51e34bf152b80cff9254ba2c767c9f97c50dfc10455","engine-whole-u9863.json":"6f5b0ab9c483aa2273f31ee89069c4512dab5e2957a2d892593f248f5174ba19","engine-proof.json":"6f5b0ab9c483aa2273f31ee89069c4512dab5e2957a2d892593f248f5174ba19","metadata.json":"415a59795ed13c8b038d4c8787a38f26fd0ca3929accb9d2cf79cf74c6ad3b0d","source-analysis.json":"06a222bc1b8453173943f0f5d8010a24c37744ac9635941809bccd18fc862fe7","progressive.mjs":"8cf465576b9aff6e044d5ddaaf788a20979c1199f0cdd62a792a9a8948e6d0cd","source-join-analysis.json":"189b8a88d95831a65d8c7080793f94a39e904bf0f19776e3417c4c4178292075","../hanja-goal-glyphwiki-batch826-2026-10-13/native-terminal15-source-analysis.json":"28f2900138d21ae92221863a69bf7ff4737b605682d5d84570ae57156f6bb145"},"profiles":[{"identity":{"sourceRoot":"u9863","sourceProofFile":"engine-whole-u9863.json","sourceProofFileSHA256":"6f5b0ab9c483aa2273f31ee89069c4512dab5e2957a2d892593f248f5174ba19","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSHA256":"6f5b0ab9c483aa2273f31ee89069c4512dab5e2957a2d892593f248f5174ba19"},"originalIdentity":null,"originalIdentityBridge":false,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20]],"fullProofSHA256":"8705571cb4c73f291cd0dc784a9b8554a6802c47e522e23e5865569fc8206b44","originalCompiledSHA256":"8e43c3079899baf9e01b1c8132953d0d7f57004085a19a3904fd44c5487aa4f2","terminals":[{"raw":2,"call":0,"pen":3,"maskIndex":0,"originalPenMasks":1,"args":[78.97,14,86.53,178,118.66,178,0,15],"kind":"cdDrawCurve"}]}],"sourceEvidencePolicy":"Reuse prior actually verified same8engine formula; current online0/native0"}
const deepFreeze=value=>{if(value&&typeof value==='object'){Object.freeze(value);for(const v of Object.values(value))deepFreeze(v)}return value}
deepFreeze(CONFIG)
const profiles=new Map(CONFIG.profiles.map(p=>[p.identity.sourceRoot,p]))
export const selectedProofIdentity=CONFIG.profiles[0].identity
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceProofFile=selectedProofIdentity.sourceProofFile
export const sourceWholeFileSHA256=selectedProofIdentity.sourceProofFileSHA256
export const sourceGroups=CONFIG.profiles[0].sourceGroups
export const candidateWholeProofs=deepFreeze(CONFIG.profiles.map(p=>({identity:p.identity,sourceGroups:p.sourceGroups})))
export const nativeApproval=false
export const runtimeApplied=false
export const status='isolated-original-terminal15-source-candidate-native-review-pending'
function checkPins(){
 for(const [f,pin]of Object.entries(CONFIG.filePins))assert.equal(hash(readFileSync(new URL(f,import.meta.url))),pin,'Frozen original byte pin '+f)
}
function profileFor(identity){
 assert(identity&&typeof identity.sourceRoot==='string','Explicit whole/header identity required')
 const p=profiles.get(identity.sourceRoot)
 assert(p,'Unsupported whole profile; no inferred replacement')
 assert.deepEqual(identity,p.identity,'Exact original whole and header file identity')
 return p
}
export function buildSourceProof(identity){
 const p=profileFor(identity);checkPins()
 const body=JSON.parse(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),header=JSON.parse(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url)))
 return {engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body,...(p.originalIdentityBridge?{sourceRoot:identity.sourceRoot,sourceProofFile:p.originalIdentity.file,sourceProofFileSHA256:p.originalIdentity.fileSHA256}:{})}
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
export function compileProgressive(trace,proof,identity){
 const p=profileFor(identity),expected=buildSourceProof(identity)
 assert.deepEqual(proof,expected,'Exact unchanged whole body and engine header')
 assert.deepEqual(trace,proof.trace)
 assert.equal(hash(JSON.stringify(proof)),p.fullProofSHA256)
 assert.equal(proof.engineRevision,CONFIG.engineRevision)
 assert.deepEqual(proof.engineHashes,CONFIG.engineHashes)
 const before=JSON.stringify(proof)
 const baseline=typeof original.compileSourceWhole==='function'?original.compileSourceWhole(identity.sourceRoot,trace,proof,p.originalIdentity):original.compileProgressive(trace,proof,p.originalIdentity)
 assert.equal(hash(JSON.stringify(baseline)),p.originalCompiledSHA256,'Every original mask and source path is fixed')
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
export function compileSourceWhole(root,trace,proof,identity){
 assert(identity&&identity.sourceRoot===root,'Explicit root/header identity must agree')
 return compileProgressive(trace,proof,identity)
}

