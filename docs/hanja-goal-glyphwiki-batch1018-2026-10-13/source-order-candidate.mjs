import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as source from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalPenOrder=Object.freeze([1,2,3,4,5,6,8,7,9,10,11,12,13,14,15])
export const originalSourceGroups=Object.freeze(source.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze(originalPenOrder.map(i=>originalSourceGroups[i-1]))
const ORIGINAL_SHA='e12373113ee4e8fb89e99b627a161f20a95fcf55aca4d440b28ea9b0b17418a8',FINAL_SHA='05c58cd2644ae762d5f58a68448a37c585091687b796d5fe946df0e9f7d5fc5a',PEN_SHA=["76f7244e4a25fd2538a5844211a21592ec25013109d7575a3b192af879f5da7a","298ce035d438226cc4eb43d6c0bb8ea346c2ec57edaf14b7a5f65f1a0d827863","7182a7043d338bbfc223d0a8c61a06bf2b1131b8efc68edd6964e120d6aa4366","4292d3d64d19a2b00015778c61709b75a42edf8692956facb1ceab51a6ab0e9a","9e60b99076bbbee23a744163a7580a40aab221189c45e34611f4d535d2947f13","dfd920a1d2422801489ae7b23ec11f11b21340d5a2d7232104f02fdf3c323e35","7fc726d50fbaede64ae153113c1e7fba1d0dc16fbf6997bef75e365b1473efe9","4a1ec4c590e80d0a5b6e73ddcd4e9b9ce417883b1cfea24f47822978b54ab125","3683028c95531d97f34eeb6b66e8501d32698884973ab0b1383af4053c2d1b5b","5c9227d4a32076976407af0b70787472cbfba1f4136886ac820033f162d9225d","2d678b6ff19962d8fca9a0caa88bbc2e098039dc61aacb3398ebc278955229d7","51284a95a45d3b52ed62e6fb3c967d3e75bc261516b1f15bc2d0d806bb2cbc43","71aa7c38ba8617e420d1b48aa2777832f6ac500e550177769da870722a94aac2","878034c74118d26c8087bdf6923cf6f4c6e5d2805838afc3ac65d660c79778c5","ad5d92b389969ea8272b2a28a7a8e3c5beb6edc421393c5e241fe292e6400e50"]
function pins(){const p=JSON.parse(read('source-order-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.originalPenOrder,originalPenOrder);assert.deepEqual(p.sourceGroups,sourceGroups)}
function reorder(out){assert.equal(sha(JSON.stringify(out)),ORIGINAL_SHA);assert.equal(out.length,15);assert.equal(out.flat().length,15);assert.deepEqual(out.map(p=>sha(JSON.stringify(p))),PEN_SHA);const result=originalPenOrder.map(i=>out[i-1]);assert.equal(sha(JSON.stringify(result)),FINAL_SHA);return result}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);pins();return reorder(source.compileProgressive(trace,proof,identity))}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,source.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
