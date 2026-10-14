import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
const PINS={"NOTICE.md":"242991ac35f0cb7d683131f550d2e53e0919ad1b01df52ea4ea39186708833cb","candidate-compile-analysis.json":"cfcf6770d178429be32f7b15e10befc9508037a38758122f6953a64772b35707","engine-proof.json":"33c0ac4268a2717fa1a8a99b2fd5b380388f8d822b2622e6fa17f268e00cd948","engine-whole-u8e27-ue0100.json":"820a1fa2128f0e74914a8a8d906ce11c28eae084c9caf296073bbd6dba437d0d","engine-whole-u8e27.json":"33c0ac4268a2717fa1a8a99b2fd5b380388f8d822b2622e6fa17f268e00cd948","metadata.json":"919b631e31c1dab103d9de16a8a8e77498d2208f70d3c788621c171b7b1e0104","native-server-compile.mjs":"ddd0cb2331ccb0c1c8c8f1c9a8c6e72920c8435166a4b277a0e78f84d65a75f1","native-server-source-audit.json":"7992c9376234dc004fc9c769ff74ccf28cf4040be171a8822fb629da17bf4fcc","native-server-validation.json":"2e65a261cc80fdba5dcb1a6e9c27e707ed12689b3fc3da52d06c60a6dff84e8d","progressive.mjs":"f3f2a109c5cec2f31bfc8fba53f08008c86f56aadab4eb8bda5496dce5959d22","serve-native.py":"6a714d256da6c69d9d81c709a4f88797285008115e418ad3eeded066ca488b4b","source-analysis.json":"e785bc2c2fa00ee59ecc69e54f0a9aed58a44b91a131bf9000fefc30a62af5bb","source-join-analysis.json":"a1baf2e5977ea536c27a619fac44914e0af81efc5926c639ed3661db2bd56e89","source-preservation-audit.json":"2715ba091b5c5102b282d85f4b3659492641a0ffee95fa6d065d68e94b9c0e4d","sources.json":"3d8c5406a4272bb83d29e3ec059badc53aa2619750b88a764da96f5ac5cba372","verify-source.mjs":"9d1b58fdc805d5bb03665c9bbb0787e2f4a9c972f8360d4896404b4351d7b9e1"}
export const selectedProofIdentity=Object.freeze({"root":"u8e27","sourceProofFile":"engine-whole-u8e27.json","sourceProofFileSHA256":"33c0ac4268a2717fa1a8a99b2fd5b380388f8d822b2622e6fa17f268e00cd948","engineHeaderSHA256":"33c0ac4268a2717fa1a8a99b2fd5b380388f8d822b2622e6fa17f268e00cd948","sourceFileSHA256":"3d8c5406a4272bb83d29e3ec059badc53aa2619750b88a764da96f5ac5cba372","compilerFileSHA256":"f3f2a109c5cec2f31bfc8fba53f08008c86f56aadab4eb8bda5496dce5959d22"})
export const sourceRoot=selectedProofIdentity.root
export const sourceProofFile=selectedProofIdentity.sourceProofFile
export const sourceWholeFileSHA256=selectedProofIdentity.sourceProofFileSHA256
export const domesticToOriginalPen=Object.freeze([1,2,3,4,5,6,7,8,9,10,11,13,12,14,15])
export const sourceGroups=Object.freeze([[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[13],[12],[14,15],[16]].map(g=>Object.freeze(g)))
export const candidateWholeProofs=Object.freeze([Object.freeze({identity:selectedProofIdentity,sourceGroups})])
export const nativeApproval=false
export const runtimeApplied=false
export const status='source-only-complete-mask-order-candidate-native-pending'
const OLD_GROUPS=[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16]]
const OLD_PEN_SHA=["4ca678785a498f85b970fa724905f9e4d8256a73fbd8623029b360c48e384371","215033db6fc35a2f6d33839476602bc5e3a72d5927fa902fb2ee52a2ca3702a1","456f8ee1f127a6c7f8c015840c36c3eb13b259da3661271f77902dc3bded1e75","91de4dbdcce8ab94bb1a671bcb09db6062e013e700270b943b844b6f67805040","ff4265da3c57a916c341219d43cd1f028a30ef6a652ac1096ec49081dfa91a30","4027dbf60daeab84339757936d5c7b7faf76185f6c0eeb489abdf0a4bc42eeb6","c38531032ce61466f70cdbdd0623020c353d1daf09aeec514e7cb973ff1dbaa3","39ba979b9a48417d82893ce258e1313fa89b6092067096ebe08d33b63720d3fd","db72ed5ca4f784ef1c93bc4a711b094527e4cece89cd3fb426fb2117530c424f","f05b64624459021651e89ee3963a000599de41ae94c126b86694bc8a83e0ffe0","01beb27b99ea935871e8c27f3ff76eab4e55fc278da249d735cabcf3dd7814d3","8e37f4e9747a1a6995c542335e7d9050bcc0baf457421136f16c02920fcead8c","4260ca7c6bb9559e9430f50a8155ce8416fc7139dccd2ff3a0a7d7e2ebe6bc50","64b58eecfe9c8e5ec3217b6ad708528c9960207fd1d85fd351205ee2886c5280","c55690df39452119516a3e8649efe077c44b0dc61febb7bd15975b6e965ee352"]
function identityGuard(identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact original outer six-key whole/header/source/compiler identity')
 for(const[f,pin]of Object.entries(PINS))assert.equal(hash(readFileSync(new URL(f,import.meta.url))),pin,'Frozen original input '+f)
}
export function buildSourceProof(identity){
 identityGuard(identity)
 const header=JSON.parse(readFileSync(new URL('engine-proof.json',import.meta.url))),body=JSON.parse(readFileSync(new URL(identity.sourceProofFile,import.meta.url)))
 return {engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}
}
export function compileProgressive(trace,proof,identity){
 identityGuard(identity)
 assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"])
 assert.deepEqual(proof,buildSourceProof(identity),'Exact original full five-key proof')
 assert.deepEqual(trace,proof.trace)
 assert.equal(hash(JSON.stringify(proof)),"8ee10ddae584e14950f19d32342e60f8f11cb4c3ab2183e7cc6fa3692c56414a")
 assert.deepEqual(original.sourceGroups,OLD_GROUPS)
 const before=JSON.stringify(proof),old=original.compileProgressive(trace,proof)
 assert.equal(old.length,15);assert.equal(old.flat().length,16)
 assert.deepEqual(old.map(p=>hash(JSON.stringify(p))),OLD_PEN_SHA,'Every original complete mask is byte fixed')
 const result=domesticToOriginalPen.map(n=>old[n-1])
 assert.deepEqual([...domesticToOriginalPen].sort((a,b)=>a-b),Array.from({length:15},(_,i)=>i+1))
 assert.deepEqual(result.map(p=>hash(JSON.stringify(p))),domesticToOriginalPen.map(n=>OLD_PEN_SHA[n-1]))
 const polygons=pens=>pens.flat().flatMap(mask=>mask.outline.match(/M[^Z]+Z/g)||[]).sort()
 assert.deepEqual(polygons(result),polygons(old),'All unchanged original outline polygon bytes exactly once')
 assert.deepEqual(result.flat().map(m=>JSON.stringify(m)).sort(),old.flat().map(m=>JSON.stringify(m)).sort(),'All entire masks preserved once')
 assert.equal(JSON.stringify(proof),before)
 return result
}

