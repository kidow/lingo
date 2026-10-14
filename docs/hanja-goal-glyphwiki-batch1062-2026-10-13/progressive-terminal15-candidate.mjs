
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import * as original from './progressive.mjs'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const hash=value=>createHash('sha256').update(value).digest('hex')
const CONFIG = {"batch":1062,"glyph":"餼","engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"filePins":{"sources.json":"2773f4c20b062d05c13cdf1c42656d66f7e251a3510863ed4e2abac410a6d0e2","source-only-helper-readiness.json":"6fea47eda8525ef6d5d6e2ec58cae3e992df5504ec70b80b2e400c2c42f3b905","engine-proof.json":"e9b9ccc73cd6478efed79a50d84ff67a9db1f6c0dbdcc899cfa7d440b20d5509","metadata.json":"d5c4162ac8b1a661c2026ceed0ff2b5b17583ddbb67c11ba0c270d5bfd20c8ad","source-analysis.json":"c8e803d24c88f94123ffea9cf882fb76448cf825ffd8423656e3ad9dfafd5ac2","engine-whole-u993c-ue0102.json":"5464992fc12c35d0b32e6cfd28a65a24637391175651f607741c3ad167acc4d9","progressive.mjs":"b640c8e150b0df8a9f491fa218de58bf4d96f13a8edad0fb9ad797ce8f96410c","engine-whole-u993c-ue0101.json":"0206fc9154c5a23f44dc48c14a2d81e92ba1f8593c6b32c0db30cc962cd6534f","engine-whole-u993c.json":"e9b9ccc73cd6478efed79a50d84ff67a9db1f6c0dbdcc899cfa7d440b20d5509","engine-whole-u993c-ue0100.json":"0206fc9154c5a23f44dc48c14a2d81e92ba1f8593c6b32c0db30cc962cd6534f","source-join-analysis.json":"db8618c8223ab1d342af1b6d3f2b7d580f3f0fbfebd2e4f50ce2febfc41a90ae","../hanja-goal-glyphwiki-batch826-2026-10-13/native-terminal15-source-analysis.json":"28f2900138d21ae92221863a69bf7ff4737b605682d5d84570ae57156f6bb145"},"profiles":[{"identity":{"sourceRoot":"u993c","sourceProofFile":"engine-whole-u993c.json","sourceProofFileSHA256":"e9b9ccc73cd6478efed79a50d84ff67a9db1f6c0dbdcc899cfa7d440b20d5509","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSHA256":"e9b9ccc73cd6478efed79a50d84ff67a9db1f6c0dbdcc899cfa7d440b20d5509"},"originalIdentity":{"root":"u993c","file":"engine-whole-u993c.json","fileSHA256":"e9b9ccc73cd6478efed79a50d84ff67a9db1f6c0dbdcc899cfa7d440b20d5509"},"originalIdentityBridge":false,"sourceGroups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20]],"fullProofSHA256":"86ef1bd5f614f6398a3525281228d9eb2f6496be3b00928b8b4399f68cc2496f","originalCompiledSHA256":"2f10034eb7562af400b0f807f509e7f8e41ab08bd667bf7f77144508bc642fb6","terminals":[{"raw":14,"call":0,"pen":13,"maskIndex":0,"originalPenMasks":1,"args":[162.38,85.725,161.14,171.42,182.84,181.27,22,15],"kind":"cdDrawCurve"}]},{"identity":{"sourceRoot":"u993c-ue0100","sourceProofFile":"engine-whole-u993c-ue0100.json","sourceProofFileSHA256":"0206fc9154c5a23f44dc48c14a2d81e92ba1f8593c6b32c0db30cc962cd6534f","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSHA256":"e9b9ccc73cd6478efed79a50d84ff67a9db1f6c0dbdcc899cfa7d440b20d5509"},"originalIdentity":{"root":"u993c-ue0100","file":"engine-whole-u993c-ue0100.json","fileSHA256":"0206fc9154c5a23f44dc48c14a2d81e92ba1f8593c6b32c0db30cc962cd6534f"},"originalIdentityBridge":false,"sourceGroups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20]],"fullProofSHA256":"06685a36c2fcb5cf73336fb60c42efc6d32f5d5e52a39b139c1610d95e44864c","originalCompiledSHA256":"40227dc8428b3994bd48a360c575850e7a3ae3f17ff29d447d3433570881c4d9","terminals":[{"raw":14,"call":0,"pen":13,"maskIndex":0,"originalPenMasks":1,"args":[162.38,85.725,161.14,171.42,182.84,181.27,22,15],"kind":"cdDrawCurve"}]},{"identity":{"sourceRoot":"u993c-ue0101","sourceProofFile":"engine-whole-u993c-ue0101.json","sourceProofFileSHA256":"0206fc9154c5a23f44dc48c14a2d81e92ba1f8593c6b32c0db30cc962cd6534f","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSHA256":"e9b9ccc73cd6478efed79a50d84ff67a9db1f6c0dbdcc899cfa7d440b20d5509"},"originalIdentity":{"root":"u993c-ue0101","file":"engine-whole-u993c-ue0101.json","fileSHA256":"0206fc9154c5a23f44dc48c14a2d81e92ba1f8593c6b32c0db30cc962cd6534f"},"originalIdentityBridge":false,"sourceGroups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20]],"fullProofSHA256":"06685a36c2fcb5cf73336fb60c42efc6d32f5d5e52a39b139c1610d95e44864c","originalCompiledSHA256":"40227dc8428b3994bd48a360c575850e7a3ae3f17ff29d447d3433570881c4d9","terminals":[{"raw":14,"call":0,"pen":13,"maskIndex":0,"originalPenMasks":1,"args":[162.38,85.725,161.14,171.42,182.84,181.27,22,15],"kind":"cdDrawCurve"}]},{"identity":{"sourceRoot":"u993c-ue0102","sourceProofFile":"engine-whole-u993c-ue0102.json","sourceProofFileSHA256":"5464992fc12c35d0b32e6cfd28a65a24637391175651f607741c3ad167acc4d9","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSHA256":"e9b9ccc73cd6478efed79a50d84ff67a9db1f6c0dbdcc899cfa7d440b20d5509"},"originalIdentity":{"root":"u993c-ue0102","file":"engine-whole-u993c-ue0102.json","fileSHA256":"5464992fc12c35d0b32e6cfd28a65a24637391175651f607741c3ad167acc4d9"},"originalIdentityBridge":false,"sourceGroups":[[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20]],"fullProofSHA256":"3fecfe30cf694b08f04cbd5f43cb6caf15b3be018f231e9ce3970ab6b2975328","originalCompiledSHA256":"1ab93167bd960ecb31312748c8e7ef4ab114f731f4577f417a45b86302f99667","terminals":[{"raw":14,"call":0,"pen":13,"maskIndex":0,"originalPenMasks":1,"args":[162.38,85.725,161.14,171.42,182.84,181.27,22,15],"kind":"cdDrawCurve"}]}],"sourceEvidencePolicy":"Reuse prior actually verified same8engine formula; current online0/native0"}
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

