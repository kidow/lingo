import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
const PINS={"NOTICE.md":"07b21bdb2584d70873cb86fde5deac87d818940b3d69f637e45c61b6bb16e9b2","candidate-compile-analysis.json":"7494b8c74c57668c4095cba20ce63dc0ee43d0c63c7db97332863d60a92d7fc1","engine-proof.json":"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf","engine-whole-u9902-ue0100.json":"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf","engine-whole-u9902-ue0101.json":"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf","engine-whole-u9902-ue0102.json":"4d21621fb5144d016900a4837ff2b543b6c5722b09a6e65314365103b87cf638","engine-whole-u9902-var-001.json":"4d21621fb5144d016900a4837ff2b543b6c5722b09a6e65314365103b87cf638","engine-whole-u9902.json":"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf","metadata.json":"a31f484a7d4ba376f40558907dc781a6a190d53c5e533880097f1e8f6e7535a2","native-preflight-source-analysis.json":"9c4ee85bb9101aef5f85e253038208d431235e9431b24c0d76c2f0e577899ed1","native-server-preparation-source-analysis.json":"b924ff6f86ff5c37777428dbdea8a53eb04eeb281e23363801a652ae00948f52","native-server-validation.json":"61f6ec5eb5433b5c1a794b352c2e5772ce579aeedd75f83824f79802ec5f8ef9","progressive.mjs":"8270ea9025542558f1470b78a14f20be12068c459591f80a8e499a976a6a90e9","serve-progressive.py":"ec515ab6766c0d3045519a4123e336cf9c95f24a5eb75d0dfad9a1792474385d","serve-whole.py":"7f719eb7f7c03edc6128d7d14e3a3deb4665b76929b443e5f69b4d22e4d1638d","source-analysis.json":"21db2299458fabb0d3efdf40baafb186e8cada4283a9a966ea4eab5c92bf2ffb","source-join-analysis.json":"9eb0d508ad1f6f3a16f2ea05febe5f5f18062545533f31c49c5b0df7dab25841","sources.json":"f081f07ea1490201e87a596ec3fba9a2380e2c760e3a081355d59429f20efd5d","verify-source.mjs":"e902a351abaea63575a50bccb9d6fd8959115fd58567b529bdf3d40cbd7744ac"}
export const domesticToOriginalPen=Object.freeze([1,2,3,5,6,7,4,8,9,10,11,12,13,14,15])
export const sourceGroups=Object.freeze([[0],[1],[2],[4,5],[6],[7],[3],[8],[9],[10],[11],[12],[13],[14,15],[16]].map(g=>Object.freeze(g)))
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u9902","sourceProofFile":"engine-whole-u9902.json","sourceProofFileSHA256":"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSHA256":"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceProofFile=selectedProofIdentity.sourceProofFile
export const sourceWholeFileSHA256=selectedProofIdentity.sourceProofFileSHA256
export const candidateWholeProofs=Object.freeze([Object.freeze({identity:selectedProofIdentity,sourceGroups})])
export const nativeApproval=false
export const runtimeApplied=false
export const status='isolated-original-complete-mask-domestic-order-native-pending'
const OLD_GROUPS=[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16]]
const OLD_PEN_SHA=["355f2bd7d29adb5886e059f6b2eddb9786676f7aa039c9c0a6c6820e28221ace","9479c884a44e5585f2a3eb3be8fa1c54f3dfe340b39b1bb30f4dbf62eebea1fb","ebd1c198a609613d3c0098cb1f044bca30a8d98af22a40eb85b4dedfca7f4078","075ff90a7899e087ff801956cc1d39185ed2986ec483e8ff3f924918154d9941","c415176b2e40f6a94830660d97b5259d482bb2e5dc74c4373bbc428b000dd090","e913c00bdad4824ab30d28c948c35b1dd70ce59b380690d613d10bc7b30d456b","abbd2cd34d292be230b2df9cb9922e6cb75e343d7997424c6142b8c3676bbfd1","e8d5ed71d8f7f9789e9fca1af8350737bb757f2126fa2e0eeb236347ff74329c","152474e869a669dcf61591137217aadd0e13113ca42a9a7062cd15bd19ee1dac","97f794f5e04aa5bfdb49ef50ff44aa72bf4e43cc6a1c58084a266452f61638f8","e5d58d39c1ed61175b6e23db7969e2979fb1e6c91474518bdb572616549e3c82","b141f8d76433960466f984644de4b8b356e4c405322b4a168d132353c66854c7","2891c79d4e23d8738848bb088745f44999e3c6d691eb81a27d50af380a3eeb09","ce3b4e7bcc08ef796eecc736ae2bee4da8be7d0c98a002d764da3b5033147163","e9c7907893c81158d04d433a1e45f6c578cb0037a7a835f89794f9278222e557"]
function identityGuard(identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit original whole/header five-key identity')
 for(const[f,pin]of Object.entries(PINS))assert.equal(hash(readFileSync(new URL(f,import.meta.url))),pin,'Frozen original byte pin '+f)
}
export function buildSourceProof(identity){
 identityGuard(identity)
 const body=JSON.parse(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),header=JSON.parse(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url)))
 return {engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}
}
export function compileProgressive(trace,proof,identity){
 identityGuard(identity)
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.deepEqual(proof,buildSourceProof(identity),'Exact original full proof/header')
 assert.deepEqual(trace,proof.trace,'Full original raw trace')
 assert.equal(hash(JSON.stringify(proof)),"93a2f7537b2c36a3f27081c22cc727b7f06a5a47b0e69307525e5e835622c79b")
 assert.deepEqual(original.sourceGroups,OLD_GROUPS)
 const before=JSON.stringify(proof),old=original.compileProgressive(trace,proof)
 assert.equal(old.length,15);assert.equal(old.flat().length,15)
 assert.deepEqual(old.map(p=>hash(JSON.stringify(p))),OLD_PEN_SHA,'Every original mask/path/width/weight')
 const result=domesticToOriginalPen.map(n=>old[n-1])
 assert.deepEqual([...domesticToOriginalPen].sort((a,b)=>a-b),Array.from({length:15},(_,i)=>i+1))
 assert.deepEqual(result.map(p=>hash(JSON.stringify(p))),domesticToOriginalPen.map(n=>OLD_PEN_SHA[n-1]))
 const polygons=pens=>pens.flat().flatMap(mask=>mask.outline.match(/M[^Z]+Z/g)||[]).sort()
 assert.deepEqual(polygons(result),polygons(old),'Original outline polygon bytes exactly once')
 assert.deepEqual(result.flat().map(m=>JSON.stringify(m)).sort(),old.flat().map(m=>JSON.stringify(m)).sort(),'Complete unchanged masks exactly once')
 assert.equal(JSON.stringify(proof),before)
 return result
}
export function compileSourceWhole(root,trace,proof,identity){
 assert(identity&&root===identity.sourceRoot,'Explicit root and identity must agree')
 return compileProgressive(trace,proof,identity)
}

