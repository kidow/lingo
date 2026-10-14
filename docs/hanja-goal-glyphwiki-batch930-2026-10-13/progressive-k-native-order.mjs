import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex')
export const originalInputSHA256=Object.freeze({"sources.json":"188ccc0da9663893b6158086b1b879341975fb28b4722ca9d680b6c4b3af35d8","metadata.json":"c25c398b77c2b414c9cfa3d4893b58f27df0225a4045b2f9828c02ee03a977e7","progressive.mjs":"8cf46f3714ddb579cfeec39b312bebae130cfc223662e8338e383a1779096eb2","engine-proof.json":"e937e387bb9b3923c81fceba944d9a78f5bf73467a93dc4bbc06875a845dff0c","engine-whole-u9139.json":"46a6035e485d29243794a4c94b423054e12bf17ecda3ec0fb8561e679e712241","engine-whole-u9139-k.json":"40f8ca488dee7583af1c27144d72a7850d006ad0427354d389592878ff26ceb7","engine-whole-u9139-ue0100.json":"46a6035e485d29243794a4c94b423054e12bf17ecda3ec0fb8561e679e712241","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"})
export const sourceRoot='u9139-k'
export const sourceProofFile='engine-whole-u9139-k.json'
export const selectedProofIdentity=Object.freeze({"root":"u9139-k","file":"engine-whole-u9139-k.json","fileSHA256":"40f8ca488dee7583af1c27144d72a7850d006ad0427354d389592878ff26ceb7"})
export const DOMESTIC_TO_AUTHORED_PEN=Object.freeze([1,2,4,5,6,3,7,8,9,10,11,12,13,14,15,16,17])
export const AUTHORED_SOURCE_GROUPS=Object.freeze([[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18]].map(Object.freeze))
export const sourceGroups=Object.freeze(DOMESTIC_TO_AUTHORED_PEN.map(n=>AUTHORED_SOURCE_GROUPS[n-1]))
export const nativeApproval=false
export const runtimeApplied=false
export const sourceOnly=true
export function assertOriginalPins(){
 for(const[f,h]of Object.entries(originalInputSHA256))assert.equal(sha(readFileSync(new URL(f,import.meta.url))),h,'Unchanged original byte pin '+f)
}
export function buildSourceProof(identity){
 assertOriginalPins();assert.deepEqual(identity,selectedProofIdentity)
 const header=JSON.parse(readFileSync(new URL('engine-proof.json',import.meta.url))),body=JSON.parse(readFileSync(new URL(identity.file,import.meta.url)))
 assert.deepEqual(Object.keys(header).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace'])
 const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body,sourceRoot:identity.root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
 assert.equal(sha(JSON.stringify(proof)),"b935e8a491385059750705c4ca7c4de7ce4d655836ff5da4ce7445a899e29880")
 return proof
}
export function compileSourceWhole(root,trace,proof,identity){
 assertOriginalPins();assert.equal(root,sourceRoot);assert.deepEqual(identity,selectedProofIdentity)
 const before=JSON.stringify(proof)
 const authored=original.compileSourceWhole(root,trace,proof,identity)
 assert.deepEqual(original.sourceGroupsByWhole[root],AUTHORED_SOURCE_GROUPS)
 const result=DOMESTIC_TO_AUTHORED_PEN.map(n=>authored[n-1])
 assert.equal(JSON.stringify(proof),before);assert.equal(result.length,17)
 assert.equal(new Set(DOMESTIC_TO_AUTHORED_PEN).size,17)
 result.forEach((pen,i)=>assert.deepEqual(pen,authored[DOMESTIC_TO_AUTHORED_PEN[i]-1],'Complete original mask unchanged'))
 return result
}
export function compileProgressive(trace,proof,identity){return compileSourceWhole(sourceRoot,trace,proof,identity)}
