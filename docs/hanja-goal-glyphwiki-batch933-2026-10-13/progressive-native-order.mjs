import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex')
export const originalInputSHA256=Object.freeze({"sources.json":"da55c35dcddb6daac1eec1869b35f74b285b3a9c7e0eca3915cd38f93d00ea62","metadata.json":"378e7add92a6464a01692e677e4f2bb9d64dac8f2814ae701f28010455010f9a","progressive.mjs":"6ac3a4857533d3f0a7764edba6603b5deabe483cc61798d1d0e7c313f98a8724","engine-proof.json":"801936866eca159104ef90452f4e6d200105f24c4f2d24959fe3723d055fe93c","engine-whole-u68f8.json":"81edbe3109ad910b3f28e1bcfb5e1fb93e041b81a716b1474a84fd5c6956c4a3","engine-whole-u68f8-01.json":"6ae745c705159b111d85860d4dd0bc1a73903ac32db79ddc6ae8a399baf0ed73","engine-whole-u68f8-var-001.json":"ab432c563b96fe94b64435cc3b974ebc0f643fa866c4995e44dc565025631b94","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"})
export const sourceRoot='u68f8'
export const sourceProofFile='engine-whole-u68f8.json'
export const selectedProofIdentity=Object.freeze({"root":"u68f8","file":"engine-whole-u68f8.json","fileSHA256":"81edbe3109ad910b3f28e1bcfb5e1fb93e041b81a716b1474a84fd5c6956c4a3"})
export const DOMESTIC_TO_AUTHORED_PEN=Object.freeze([1,2,4,5,6,3,7,8,9,10,11,12])
export const AUTHORED_SOURCE_GROUPS=Object.freeze([[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12]].map(Object.freeze))
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
 assert.equal(sha(JSON.stringify(proof)),"c6c4d14dd42873e31cdc5a653f3b326aaa7c6cecb049140d038605c4eac01a79")
 return proof
}
export function compileSourceWhole(root,trace,proof,identity){
 assertOriginalPins();assert.equal(root,sourceRoot);assert.deepEqual(identity,selectedProofIdentity)
 const before=JSON.stringify(proof)
 const authored=original.compileSourceWhole(root,trace,proof,identity)
 assert.deepEqual(original.sourceGroupsByWhole[root],AUTHORED_SOURCE_GROUPS)
 const result=DOMESTIC_TO_AUTHORED_PEN.map(n=>authored[n-1])
 assert.equal(JSON.stringify(proof),before);assert.equal(result.length,12)
 assert.equal(new Set(DOMESTIC_TO_AUTHORED_PEN).size,12)
 result.forEach((pen,i)=>assert.deepEqual(pen,authored[DOMESTIC_TO_AUTHORED_PEN[i]-1],'Complete original mask unchanged'))
 return result
}
export function compileProgressive(trace,proof,identity){return compileSourceWhole(sourceRoot,trace,proof,identity)}
