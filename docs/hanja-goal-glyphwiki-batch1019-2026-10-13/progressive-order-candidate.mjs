import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './strict-source-candidate.mjs'
export {renderProgressive} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
const pins={"NOTICE.md":"c4161c9a106755b5f73576cabaa5d64e3e461bce2557ffdc5baffbcc92ba4773","candidate-compile-analysis.json":"5f45408abcdcb5bbecce9754538d9df8f9878d133d1f0d577ec80846fd07f59d","engine-proof.json":"718f558a4b519a58bacb41b29017972b9297b88ecfede8d9e98d60d76be8ce87","engine-whole-u5612-ue0100.json":"d1e51a49b8e2079837a3f3fd9a44c9e07578ba483975fe346f70bd50cb611482","engine-whole-u5612.json":"d1e51a49b8e2079837a3f3fd9a44c9e07578ba483975fe346f70bd50cb611482","metadata.json":"17b9363e48600a94fd4b98f15120a5a74a9f61ac9a6c3a55ec162fd29f789b1a","native-server-preparation-source-analysis.json":"e0824b1dc6259d1af731d6ec0716e13062409ef2f1f1f3af4b47137dd3c92185","native-server-validation.json":"576eec3079e08c26f36378910fe6eee959940d9b00931a59554b7fec2dc65fc4","progressive.mjs":"c44999855fa4ca45ceb674c5926dd33da6f34b8f2313f87ee3edd5d5274ced4b","serve-progressive.py":"5a9fb92188a1d3cba752cd2308c9b858e755455d0f53c07099a3ccf85a9cbe3b","serve-whole.py":"0cae2e63728d81d95d3a3584e711181c70f965aac482b546325891cae7539b0a","server-compile.mjs":"cfdb5f7baec13b7b976d0b5552458ab91e153a8842a8a45856dfe98d98a97fd5","source-analysis.json":"eab8cc9428fb14ab76bee94e5285d143b143deb987e6fd6f271b810b6e91cbe7","source-join-analysis.json":"dc0dd0705e36e7ed871fe8eb4171708e62209b8d95f8beb15361b1cc53e105da","source-only-helper-readiness-2026-10-14.json":"e50229419cee40fc53f269d4f8d3dda7dd0bd51430609354f59cd1131704ad50","source-preservation-audit.json":"9980f5370efe32635ba5344096ffe53b707c32a821d6a372cee9fd6b7418db22","sources.json":"a4198d1aba582c3bb099b3bbad6cfc94b1e86ff5df1f9a278452fa83b06564af","verify-source.mjs":"b83fdef3e5abf1cf2dfc1627220677bd8e5e8508425b78a352bbac11ae960b54","strict-source-candidate.mjs":"156464ce7011825b860f8846901900daa7d00437000b4d9ff39f6c1f47139623","strict-source-candidate.d.mts":"1c099833bbf79092f704f9e723e4c1df027584f385153aea74c1f9d778817a03","server-compile-strict-candidate.mjs":"92c7b107a8d7a279f806e5bd4ca01a66832b97a3a64bba6f6eabf02fde45d8bd","strict-source-preparation.json":"c4991113c3b3b7959c1bf87f8274b515689fe965900d661a7b03f8597707ea17","serve-combined-native.py":"ca555dd138377d1c062712b2c6f70e70af691594decba9b0398a595918c464d7","combined-native-source-pins.json":"4b01ff52131bee651c3d415fb79eb079ad7495a46cc47829e63c241a89600f92","../hanja-special2-alternatives-2026-09-21/serve.py":"d5d85c7304efef4b9546bd4d8414282d97757568af89dd97c2ad7701392e6532","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"}
export const selectedProofIdentity=original.selectedProofIdentity
export const sourceRoot=original.sourceRoot
export const sourceOrderPermutation=Object.freeze([1,2,3,4,5,9,6,7,8,14,10,11,13,12])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>Object.freeze([...original.sourceGroups[n-1]])))
export const nativeApproval=false
export const runtimeApplied=false
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Exactly three explicit arguments required')
 assert.deepEqual(identity,selectedProofIdentity,'Exact original identity7 including ./ prefixes and source*Sha256 casing required')
 for(const[f,h]of Object.entries(pins))assert.equal(sha(readFileSync(new URL(f,import.meta.url))),h,'Preserved original/strict/combined/shared pin '+f)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"5ca364516affab1d6c32f0ceeb032ebae3c0d928be2435d92e7f350b594c2137",'Exact original full5 proof')
 assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),out=original.compileProgressive(trace,proof,identity)
 assert.equal(JSON.stringify(proof),before);assert.equal(out.length,14);assert.equal(out.flat().length,14)
 assert.equal(sha(JSON.stringify(out)),"78911fd1964383b17ddd9fdca7024402f9b7dfb06b25a7fb20bc85cc95864c2d",'Every complete original mask stays byte-identical before permutation')
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:14},(_,i)=>i+1))
 return sourceOrderPermutation.map(n=>out[n-1])
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
