import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './strict-native-adapter.mjs'
export {renderProgressive} from './strict-native-adapter.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
const pins={"candidate-compile-analysis.json":"743e94622531135e168c1fad889558c84f1e1e8b314a9072887253f5e91284ac","capture-sources.mjs":"4fab69dd9bdd1a08551c1719fbbf0cea9edfa1e6c54578eb56aa6e5fc1e66a80","engine-proof.json":"e30b55dc30468f629e284424ae43a72bbf0b20128daa433cbe1967d168ace545","engine-whole-u9b2b-ue0100.json":"d05be83808174bacac26099fb578a4a5338ba814ac0965b8866e72ebfc2aa70f","engine-whole-u9b2b.json":"e30b55dc30468f629e284424ae43a72bbf0b20128daa433cbe1967d168ace545","metadata.json":"f020cbe100388e7884f0fb6ac029e1cc67ad88f91a42b9a13867ea598efe4fef","native-server-input-pins.json":"c382e7f35eb1c408e6a5ec21f8cbce333a21b050d2e0d2be295b7cc356c6e402","progressive.mjs":"3add0ddfdea02277855d33c18a50c17e27cbdc38e6a01d5682950c52a084444b","serve-native.py":"b357fcf92913b2241b90215e5f4c7f4a160e4a8abe304a558753b6101f3b701b","source-analysis.json":"3ecbbf8aed9dcb7f81855c248b62c9c4e107576c4e82a4c2f83ae7af4e688167","source-join-analysis.json":"8b50ed6b09761d2259c5109d53cbc741957c6d1c01bb95aa69d885677b29cbb8","source-only-helper-readiness-2026-10-14.json":"79e1b1c5776d20a11b04ecf1e21ca02065008ee01e3864972d43cc3b09d5cfda","source-preservation-audit.json":"98dabdf6e0495204d81d55c9b972d75a31a502649b0277c23944870d43252867","source-verification.json":"402f3d8ce2c820420acab2090ea9910fac2566976927a27c948e1e3fc72fdfa6","sources.json":"a12f88fbe05158f0b95376a48a6e7a013b6e9ced254f8cc9a3e27cefb38378bc","strict-native-adapter.mjs":"3c996f3ddf5007a3e114b617122e571b654c0910598197defe07e8bf9304fbb0","strict-native-server-preflight.json":"d99f9ee4290e0dac0d10972683541ef70491d944099a057ab71229f78ba7f325","verify-candidates.mjs":"4a29a79f697c1949a290eaf78448e9a1dae4c092a32a76b59ec66e7fa7cb2071","verify-source.mjs":"43653983ffa6abeb5958472a35ee894c4d3c4df76c10957ef1791228e0e92b8d"}
export const selectedProofIdentity=original.selectedProofIdentity
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceOrderPermutation=Object.freeze([1,2,4,3,5,6,8,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>Object.freeze([...original.sourceGroups[n-1]])))
export const nativeApproval=false
export const runtimeApplied=false
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Exactly three explicit arguments required')
 assert.deepEqual(identity,selectedProofIdentity,'Exact original unprefixed identity5 required')
 for(const[f,s]of Object.entries(pins))assert.equal(sha(readFileSync(new URL(f,import.meta.url))),s,'Original byte pin '+f)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),'a0463a89ec1b8119b370deec9417a7bd1a46b618f84c8641efd385e0ba34f255')
 assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),out=original.compileProgressive(trace,proof,identity)
 assert.equal(JSON.stringify(proof),before);assert.equal(out.length,22);assert.equal(sha(JSON.stringify(out)),'177d3f6455e329c7a6b6750641ce8d1d07c459e8aac5519698ed049e503e32cc')
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:22},(_,i)=>i+1))
 return sourceOrderPermutation.map(n=>out[n-1])
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
