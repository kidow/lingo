import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './strict-source-candidate.mjs'
export {renderProgressive} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
const pins={"candidate-compile-analysis.json":"789974308cea6a058f5068a6ffe0b1b7062e53e176b6b2f8f50da7a4a2ed9d2f","engine-proof.json":"e274549526f4c0899ff1e46234760891b0775f511cf30271d89d2a2b7d78cade","engine-whole-u8669-ue0100.json":"d1b60d4e077ae7bd8a967bc544085f564e8b6b8859b8891805ecc1f68ce7c92b","engine-whole-u8669-ufe00.json":"b760cde64fb0fbcbfd327249e08dd53c5801815ff44ee2b90bb1f92adfe81c4c","engine-whole-u8669-var-001.json":"89e20bc18c798ff85d8263c3f35c8fcdd244e212a7a78a658ce96c7a80bf1f50","engine-whole-u8669.json":"e274549526f4c0899ff1e46234760891b0775f511cf30271d89d2a2b7d78cade","metadata.json":"afe5809d1dfe3534ac3adbae97e79d89ec0755b1f8159cd3de0eaab3dbce00c0","native-preflight-source-analysis.json":"f47ed6bca0ce3ef57fc58998ef3214401e0cc88fe970e19dc9d5664b431f0c0a","native-server-compile.mjs":"f44d8a48e649a02bebc637bf4bc33a388dc0619fe870012f22b9b8cc001f9b72","native-server-source-audit.json":"1358d596a9ed6b32565ba8f41511431b332db67ea6e34bf5b6d01c21d32e3fd9","native-server-validation.json":"1dc7e3ae88006271b25f5dfe81c5f3f80100ce45c527d4ebedd8f9d5d3235a90","progressive.mjs":"0e2046a873dd5ae8610b4dd5b3fa6809849b50fac5d842cce47de19fe122c008","serve-native.py":"6a714d256da6c69d9d81c709a4f88797285008115e418ad3eeded066ca488b4b","server-compile-strict-candidate.mjs":"b8274d7aad0a6eafc2acb91c826029c96ad11c50864e71519afe46345fb8daf3","source-analysis.json":"2f984e50dcf87bcdc17135145b07b10c12a92861aaa1c3714af134924750df60","source-join-analysis.json":"6896cb904a9251da8ce171632e52822e43a4622bad764283a9dd738d090ffe52","source-only-helper-readiness-2026-10-14.json":"978489d0c0eb7df782db008f16001d05b43cd35e71e30f16635d0e619fa66a6b","source-verification.json":"198200694619dcfec21dc719a87a294f71b6501574caff43ca1bf1ad7e85c5fe","sources.json":"7e9128e5e4dd764a610b1412b12e629534ac4e4d26d1e8843fa386c4732ca090","strict-source-candidate.d.mts":"39630d2f7540f789a337f09efc16f9b5b273db17a9b29044d8fc20dc90f771ce","strict-source-candidate.mjs":"e631ef2f9bb557106a04830aa20de785f9cd0e21eea3a5c25a8da3ec66d06e80","strict-source-preparation.json":"127914d758e0cdc622266fc1200b5ed1fe4c33a391b2b90f7e0a59ca60bfbef4","verify-source.mjs":"55c24cef8ca430f6ec5dc8fa5892b2d8bd5809d67caef0ad52c28c994981569f"}
export const selectedProofIdentity=original.selectedProofIdentity
export const selectedOuterIdentity=original.selectedOuterIdentity
export const sourceRoot=original.sourceRoot
export const sourceOrderPermutation=Object.freeze([1,2,3,4,5,6,7,8,9,10,11,12,14,13,15,16,17,18])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>Object.freeze([...original.sourceGroups[n-1]])))
export const nativeApproval=false
export const runtimeApplied=false
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Exactly three explicit arguments required')
 assert.deepEqual(identity,selectedProofIdentity,'Exact original inner identity3 required')
 for(const[f,s]of Object.entries(pins))assert.equal(sha(readFileSync(new URL(f,import.meta.url))),s,'Original and strict-preparation byte pin '+f)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),'6bf5aa4d0a1905ef3d023b8c7dc82c428b8929abdfea0d95c71e6efa049f819b')
 assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),out=original.compileProgressive(trace,proof,identity)
 assert.equal(JSON.stringify(proof),before);assert.equal(out.length,18);assert.equal(out.flat().length,21);assert.equal(sha(JSON.stringify(out)),'242f58ddd673ad27d40a6d5763ee7ebeb61fff8c71777ca79aabcee3ad7b3b23')
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i+1))
 return sourceOrderPermutation.map(n=>out[n-1])
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function compileWithOuterIdentity(trace,proof,identity){assert.equal(arguments.length,3,'Exactly three explicit outer caller arguments required');assert.deepEqual(identity,selectedOuterIdentity,'Exact original outer6 required');return compileSourceWhole(sourceRoot,trace,proof,selectedProofIdentity)}
