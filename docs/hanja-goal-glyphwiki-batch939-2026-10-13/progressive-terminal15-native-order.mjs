import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './terminal15-candidate-adapter.mjs'
export {renderProgressive} from './terminal15-candidate-adapter.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex')
export const originalInputSHA256=Object.freeze({"sources.json":"d8665f1cce78f43b7ca62891d7a40f2f28d6535538610dd9b11c95e567fbf75f","engine-whole-u9863-ue0100.json":"c861abb87dcd9bc4ac41c51e34bf152b80cff9254ba2c767c9f97c50dfc10455","engine-whole-u9863.json":"6f5b0ab9c483aa2273f31ee89069c4512dab5e2957a2d892593f248f5174ba19","engine-proof.json":"6f5b0ab9c483aa2273f31ee89069c4512dab5e2957a2d892593f248f5174ba19","metadata.json":"415a59795ed13c8b038d4c8787a38f26fd0ca3929accb9d2cf79cf74c6ad3b0d","source-analysis.json":"06a222bc1b8453173943f0f5d8010a24c37744ac9635941809bccd18fc862fe7","progressive.mjs":"8cf465576b9aff6e044d5ddaaf788a20979c1199f0cdd62a792a9a8948e6d0cd","source-join-analysis.json":"189b8a88d95831a65d8c7080793f94a39e904bf0f19776e3417c4c4178292075","../hanja-goal-glyphwiki-batch826-2026-10-13/native-terminal15-source-analysis.json":"28f2900138d21ae92221863a69bf7ff4737b605682d5d84570ae57156f6bb145","progressive-terminal15-candidate.mjs":"6efbe93671e7c8c0154714f5f665259f45c5003b0ee7c819cc25937ce177ef85","terminal15-candidate-adapter.mjs":"b18232512a1f2eb692f318b0aac6dae630c7aaf51207bb3824b23022c2633b25","terminal15-candidate-validation.json":"5a8dbc06cf48a8753553863144308b4c9239c4c11061f0060fb78e120c9bb369","native-server-source-audit.json":"e6b001ca02685b51603344339b9775336f3a5456db2395a163b776a0e3416643","native-server-validation.json":"52d7e3241c15de356ee188f0c3b56b00de8685c16cb3f255d2d81b41cf0f59af","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","native-terminal15-server-compile.mjs":"533e6ea848e8368246a792a336428ea2e493d46d9dacbd27d633dcf01abda954","native-terminal15-server-audit.json":"cdd2dcfb5c2acae18dbdcb7be36d0036913b7eb157aa9d70c9774d907be0a02c","serve-terminal15-native.py":"dfce32851fb2c35a7a708ed6dea5a70ea2a7605f9ee4a5a45bc6d86f1e39e264"})
export const sourceRoot='u9863'
export const sourceProofFile='engine-whole-u9863.json'
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u9863","sourceProofFile":"engine-whole-u9863.json","sourceProofFileSHA256":"6f5b0ab9c483aa2273f31ee89069c4512dab5e2957a2d892593f248f5174ba19","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSHA256":"6f5b0ab9c483aa2273f31ee89069c4512dab5e2957a2d892593f248f5174ba19"})
export const DOMESTIC_TO_AUTHORED_PEN=Object.freeze([1,2,7,6,8,9,10,11,3,4,5,12,13,14,15,16,17,18,19,20])
export const AUTHORED_SOURCE_GROUPS=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20]].map(Object.freeze))
export const sourceGroups=Object.freeze(DOMESTIC_TO_AUTHORED_PEN.map(n=>AUTHORED_SOURCE_GROUPS[n-1]))
export const nativeApproval=false
export const runtimeApplied=false
export const sourceOnly=true
export function assertOriginalPins(){
 for(const[f,h]of Object.entries(originalInputSHA256))assert.equal(sha(readFileSync(new URL(f,import.meta.url))),h,'Unchanged original/candidate byte pin '+f)
}
export function buildSourceProof(identity){
 assertOriginalPins();assert.deepEqual(identity,selectedProofIdentity)
 const proof=original.buildSourceProof(identity)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"8705571cb4c73f291cd0dc784a9b8554a6802c47e522e23e5865569fc8206b44")
 return proof
}
export function compileSourceWhole(root,trace,proof,identity){
 assertOriginalPins();assert.equal(root,sourceRoot);assert.deepEqual(identity,selectedProofIdentity)
 const before=JSON.stringify(proof)
 const authored=original.compileSourceWhole(root,trace,proof,identity)
 assert.equal(sha(JSON.stringify(authored)),"66471ae61492b6da9c2c6f7b1fc486c5cdbe07c08c877139b53839d16ed99a64")
 assert.deepEqual(original.sourceGroups,AUTHORED_SOURCE_GROUPS)
 const out=DOMESTIC_TO_AUTHORED_PEN.map(n=>authored[n-1])
 assert.equal(JSON.stringify(proof),before);assert.equal(out.length,20);assert.equal(out.flat().length,22)
 assert.equal(new Set(DOMESTIC_TO_AUTHORED_PEN).size,20)
 out.forEach((pen,i)=>assert.deepEqual(pen,authored[DOMESTIC_TO_AUTHORED_PEN[i]-1],'Complete original candidate masks unchanged'))
 return out
}
export function compileProgressive(trace,proof,identity){return compileSourceWhole(sourceRoot,trace,proof,identity)}
