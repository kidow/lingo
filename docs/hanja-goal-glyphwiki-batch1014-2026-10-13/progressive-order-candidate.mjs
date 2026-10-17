import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './strict-source-candidate.mjs'
export {renderProgressive} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
const pins={"candidate-compile-analysis.json":"d4117c2e80a1555f81072369c98c683f988fb774bc7a8b4b124b76e411d51cbc","engine-proof.json":"a615c7e46db0633502accb3f7873a2b71d7fc2c0a28433964541779ca0f23432","engine-whole-u9799-ue0100.json":"a615c7e46db0633502accb3f7873a2b71d7fc2c0a28433964541779ca0f23432","engine-whole-u9799.json":"a615c7e46db0633502accb3f7873a2b71d7fc2c0a28433964541779ca0f23432","metadata.json":"f4bfce50bb889c65a13c48f44eeb934f3cef92f6cf26fc7245a9c3696366d219","native-preflight-source-analysis.json":"d373af2a306860712387818a290dd27abab75335dd945f807ec6689856cfc163","native-server-preparation-source-analysis.json":"fc750cfd12d6ad47a4f24194d1649bb0c086b010da9fae61e10156c6eeac595b","native-server-validation.json":"b4e29ae7a8bf699748728c6c0e0d362210ca57dbdd4578b407e2b4c69aaaa51c","progressive.mjs":"778d4f042f3e6950a7749d1b8be956492fe9d9c28456ec90ad1b3f59c8552853","serve-progressive.py":"01e6e4d76bf33fa9e7a44787fb47bdf9953adeb503e5557d23b961c49f57ee30","serve-whole.py":"9317f4ec78926008d50aeb792ff5eb5454d98d9fd3a05ab0d7b846121acf252c","server-compile.mjs":"3c85e8b6b892f790dfb9261f85f359b204aaa16ce5b7fae7853963465f9dd808","source-analysis.json":"77ccc710a0fdc2297a0e0d19769e801c666bfe247627e9e60a5bd6bc0eadd8fb","source-join-analysis.json":"ca447f2d3bc4f814fd8fd0ae6545b54e74ec09b33f37fc38f3bfe8796117f51c","source-only-helper-readiness-2026-10-14.json":"98e28e591f9873d31aa453e75e49df0cf597e1646214610bfb89e64c6ea31eec","source-verification.json":"5f0b6ea3e49a6039b7de10d5c34502e3d0140fee8a0cb996a7c472550a8fd969","sources.json":"7d1024d66cda006004883d0ce9179ae742178883a40618b114df3f77275edbb6","verify-source.mjs":"baa9214b42c7525f0c067d42c5e22523a7f28ecc207d808b988beb94d537e2aa","strict-source-candidate.mjs":"a857e08b43017e6df513c09f05fa0d7d7af26d381be5a9a011cb4edbc06a69d8","strict-source-candidate.d.mts":"36a006adf376b49c103130362a893192c7c97977df436d8957163fffc6d6b61c","server-compile-strict-candidate.mjs":"829c799d8bae87de2555b9c2fed6e08f9401485288ba20eb47926d5877558fab","strict-source-preparation.json":"54edece982041594023d3e5453286765e8aba7dbd45d43848053c8733da5ed36","serve-combined-native.py":"ca555dd138377d1c062712b2c6f70e70af691594decba9b0398a595918c464d7","combined-native-source-pins.json":"6f25c5d329b606a4e140eece81ddc8bae3361ff207f89114d65dffc936c520a6","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"}
export const selectedProofIdentity=original.selectedProofIdentity
export const sourceRoot=original.sourceRoot
export const sourceOrderPermutation=Object.freeze([1,2,3,4,6,7,8,9,5,10,11,12,13,14,15,16])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>Object.freeze([...original.sourceGroups[n-1]])))
export const nativeApproval=false
export const runtimeApplied=false
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Exactly three explicit arguments required')
 assert.deepEqual(identity,selectedProofIdentity,'Exact original inner identity3 required; no invented outer6')
 for(const[f,h]of Object.entries(pins))assert.equal(sha(readFileSync(new URL(f,import.meta.url))),h,'Preserved original/strict/combined/shared pin '+f)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"e47dc7cfc7349653dba759760bfd65120d770590ef12340da90e769993fe6c21",'Exact original full5 proof')
 assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),out=original.compileProgressive(trace,proof,identity)
 assert.equal(JSON.stringify(proof),before);assert.equal(out.length,16);assert.equal(out.flat().length,17)
 assert.equal(sha(JSON.stringify(out)),"bac68840fabb08909c52bac912a8b75512dfecc57e2ae1383c5cac090b37d733",'Every complete original mask stays byte-identical before permutation')
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:16},(_,i)=>i+1))
 return sourceOrderPermutation.map(n=>out[n-1])
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
