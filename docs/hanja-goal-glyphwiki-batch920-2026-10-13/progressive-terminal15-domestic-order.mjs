import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as preserved from './terminal15-candidate-adapter.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
const PINS={"NOTICE.md":"abd1095cd57c6064aa876e8373bd33142ef4f0150299fd1c9cdabdad5ecc6126","candidate-compile-analysis.json":"80b9f4634c0652eb4c89644d29cc528be1e080741b0bfce30a09066286d22caa","engine-proof.json":"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b","engine-whole-u9a56-ue0100.json":"ee473013365a1e031ee3aca46d8799cfac598f15715c74092f02174c6a78f658","engine-whole-u9a56-ue0101.json":"ee473013365a1e031ee3aca46d8799cfac598f15715c74092f02174c6a78f658","engine-whole-u9a56-ue0102.json":"049f71d5e4cb56da611cd8ef9ad229d1d4d3dde0ccb18ae1255149f6b33e43a3","engine-whole-u9a56-ue0103.json":"82fa185ad6aa8c1bad72d543bdc3f2c409ec47725e128e2b76e17c48d1696c2e","engine-whole-u9a56-var-001.json":"fab74a16af5a77bd801fbee2d4f7322422dbba891bf6bdd7e72638e72eac8e78","engine-whole-u9a56.json":"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b","metadata.json":"5add58fe9bd311255eaa959a234a54a528c8befc82b9a9684823d546bef74f95","native-preflight-source-analysis.json":"b98197493f7d492819ac73bed6170cacd7dae0f53fb5f1588fbcb08bcd291bd9","native-server-preparation-source-analysis.json":"40a3570dc28b037a538e6fc3796b20a00f09b4d94af385150ab5cdc55611cd05","native-server-validation.json":"802a1e84bb05d496bd6100d924cb25ebe565087adaccd304483b33ae965f51b7","progressive-terminal15-candidate.mjs":"20c6bc65cb215271c65ea60f62081f81f4cc6ed06d2fc9b47ce7cf6a735fbb07","progressive.mjs":"e3f1d33ca3766f5577eacfe0ad130aa0f6f7d8aeead8e7d31d7d4a22dc1280d1","serve-progressive.py":"90344fdaf013d16cde2f1d805761ddf8b1df414d89a38981bab88396e17ac827","serve-terminal15-native.py":"ebc31a95cee92fb0f8052dc343fe310b9bf40b4a2703524e8374c6e7bb86890a","serve-whole.py":"4a8f7ae046d703adfb98301549539e834e34557fe52209c9b7ece3b470991cb0","source-analysis.json":"22da2321277702d2448bec52dc0341d8574dc277a5132a4ecdea261aebb91a29","source-join-analysis.json":"b22530a723dda10848a476c1ad38ce435300f46d0b253374a1cbd639573b47a9","sources.json":"b289d6daf994b28e45d4da498bd1a00690a87cc2d8091cfa041950b4ea442cd3","terminal15-candidate-adapter.mjs":"38a122b56a00d1c7c1257d08c1d742b0c5ee6bfad1d33fb04f5a9d6f3330bfad","terminal15-candidate-validation.json":"13311b72c1a16dae718ced5c4a0cfbfa5dc0bf195174e56639a16e271680f674","verify-source.mjs":"c7d56d21772945b181f2996e086d884ba7e687b5420e20138414ba994c3a6786"}
export const domesticToOriginalPen=Object.freeze([1,2,3,4,5,6,7,8,9,10,11,12,13,17,18,19,20,21,23,22,14,15,16])
const OLD_GROUPS=[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18,19],[20],[21],[22],[23],[24]]
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[17],[18,19],[20],[21],[22],[24],[23],[14],[15],[16]].map(g=>Object.freeze(g)))
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u9a56","sourceProofFile":"engine-whole-u9a56.json","sourceProofFileSHA256":"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSHA256":"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceProofFile=selectedProofIdentity.sourceProofFile
export const sourceWholeFileSHA256=selectedProofIdentity.sourceProofFileSHA256
export const candidateWholeProofs=Object.freeze([Object.freeze({identity:selectedProofIdentity,sourceGroups})])
export const nativeApproval=false
export const runtimeApplied=false
export const status='isolated-complete-mask-domestic-order-candidate-native-pending'
const OLD_PEN_SHA=["b009f2392ae8107ba0442e8a971f86a6cce8512d65ad1861a3a59cb6609d5db1","22f72b45053c9750e508216414393241863942c9afc0ca0185fd8ba441e0fdfb","f3ce6c14ff5c1241d9e2d5f6d4a27d73a8d77fe8d31414e6fbadbaaaedb2b690","f2915c7b3ac3ae699024c792916215b1d49ef68bbe04c6e890a33ec69c2458e3","35f30efd64d63d11569ffb829a862c164363abbb4721963c3e7667f12966e3d3","c7f4b254197aa6af927bc945dfc093e241a07a3fd57a2ecb0f1ca303c95cc6f7","6afb37e80779d3751c7236808d143ace41ee1145874121110e99a66858873d45","2ce11a0fa187987d796920ce4d7d4c864290eaab38d92ca4c078f588f523c048","d59a9dfec03434204d52b810592fe815db50967735140d6109b8461e635a4823","6225fba4524341bc6bef3263a0a73c67b72c2c12c3dc4a2172a8907aec8a07a6","15320e39ef3d914ef5914a3b8a1fae3136221dbce83437d0bfac9ae140d64fdd","551c20dbc6c3a1bf3939974cc3a5976b64c20903e237d257ecc324385acddd39","380066589f0c3369c9fc2178ea87c80271f04de5e0a5da1489d8d869c6c1ad3e","e68cf6d84198fd5e4da767282b6e10a7f8fcf91a85079084996374fc8808997c","3a7128432e33808ccce2194afe6030ecc179e9828cb8367a4504003070e564f4","41955d7653602024d2cc2d2957cf922a72865899c9ab79d278c24df00a8f7390","57bb6ba5a9b93e04be92cba4a993f460fc732abc320f4d341d25589fa0a31245","d206a76779b8a299325f6ca1c1a4ebd4cafb13fd1db71368f1f909bc9b4d0d50","20d1ac3c0274ef0c8c1a8fb2aefedb013440aaf833fd10349ebccb4011b9c83e","fa0c4de4b15fbc7214ca11a6e4bcad0b6eff8a2ba1db2e4ddb3fb1da4f010c1b","cf8e356f0b57fc7952d0e194bacddf9e74b759adeffc8faa85a1cc1420100df1","7b5c4cb8c282498bd2d6ac1ef50bcf5d6b1399beaeed0132981f09ad5b2fad0b","1a63b45f26a111f7b0cf4c51f155a6e9c7b9d0b7051a2185981bbd5725dc0e28"]
function identityGuard(identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit original whole/header five-key identity')
 for(const[f,pin]of Object.entries(PINS))assert.equal(hash(readFileSync(new URL(f,import.meta.url))),pin,'Frozen original byte pin '+f)
}
export function buildSourceProof(identity){
 identityGuard(identity)
 return preserved.buildSourceProof(identity)
}
export function compileProgressive(trace,proof,identity){
 identityGuard(identity)
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"],'Full unchanged five-key proof')
 assert.deepEqual(proof,buildSourceProof(identity),'Exact original full proof/header')
 assert.deepEqual(trace,proof.trace,'Exact full original trace')
 assert.equal(hash(JSON.stringify(proof)),"bae8dd6bfc0f2da711235784ad4d45f57328bf300b80351c652edb2d27289a77",'Full original proof SHA')
 const before=JSON.stringify(proof)
 assert.deepEqual(preserved.sourceGroups,OLD_GROUPS,'Original authored source groups')
 const old=preserved.compileSourceWhole(identity.sourceRoot,trace,proof,identity)
 assert.equal(old.length,23);assert.equal(old.flat().length,25)
 assert.deepEqual(old.map(p=>hash(JSON.stringify(p))),OLD_PEN_SHA,'Every entire original pen/mask/path/width/weight')
 const result=domesticToOriginalPen.map(n=>old[n-1])
 assert.deepEqual([...domesticToOriginalPen].sort((a,b)=>a-b),Array.from({length:23},(_,i)=>i+1),'All original pens exactly once')
 assert.deepEqual(result.map(p=>hash(JSON.stringify(p))),domesticToOriginalPen.map(n=>OLD_PEN_SHA[n-1]),'Only complete-mask permutation')
 const polygons=pens=>pens.flat().flatMap(mask=>mask.outline.match(/M[^Z]+Z/g)||[]).sort()
 assert.deepEqual(polygons(result),polygons(old),'Exact outline polygon bytes preserved once')
 assert.deepEqual(result.flat().map(m=>JSON.stringify(m)).sort(),old.flat().map(m=>JSON.stringify(m)).sort(),'Complete masks preserved once')
 assert.equal(JSON.stringify(proof),before,'Original proof immutable')
 return result
}
export function compileSourceWhole(root,trace,proof,identity){
 assert(identity&&root===identity.sourceRoot,'Explicit original root and identity required')
 return compileProgressive(trace,proof,identity)
}

