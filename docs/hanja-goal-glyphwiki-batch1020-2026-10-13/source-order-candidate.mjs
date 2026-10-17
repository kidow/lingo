import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as source from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalPenOrder=Object.freeze([2,3,1,4,5,6,7,8,9,10,11,12,13,14,15])
export const originalSourceGroups=Object.freeze(source.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze(originalPenOrder.map(i=>originalSourceGroups[i-1]))
const ORIGINAL_SHA='8581d9665ccaf21b97101d8abd2f2b13dd1f6de5ed16a57171be66325b45600f',FINAL_SHA='0a3f288fa388bcc6a15886d7b26ea55402da4b9459b85324e2a6cf355c918dd0',PEN_SHA=["e420bb1ba16bdc5b710130de69dea20f3e6f4e0dfef85b09af4a874d1c6044e0","133277051876e82dc724a8bfb678234fe8885e135621b73692c84f4052a3d814","40593e5684b268e9c1e1ae3a0330c24d40ccc8a1d0d965ddedb5e40a863249ed","54024e6d0a76ed4e3775132600ae35bc34a3255409e065fdbbd463a3fd6d6072","e58c4ae322a2dcba1e97d84970ef29da04cf8920f4199b92404ec03a11643bfb","099a72affdd44fb007e19a58f8a056a9baf41a1fcb34143b6c15595f3a424293","00a06f30baf81a827cf88998801d8d57014cd027f5aead912d008db658072ca7","0ced0a64c1df84541fa712aa78943b6a91b0946ed1fd6dfae072623d465df86e","eff1efd4386465f4650b0176289ab29ba1742068a40ddf80ab63651dc24b6e73","42b73ac2d9485797b42956c359c9d72bcf8d9510bb6cdb04ce1b9dd8de83ef56","40902bb46f39ca650f7a4670ab8d5227e723f083ced430ab86c7344028056400","242da806a08c8c2a68bfa31655fc40c760df6db9ff58b830619a1cab5247606c","0fa06f5fa7ee411ddeab6db1e1b6a54466df04c47ebcbd81c7303d383e68b8e4","cc1a857ba1b1eaacf088a4a9557d967063f7d481b7a326d8ddfc917c5ab86cf8","16baf8fc1abd5a6730d5b4573a762aef57ca9ae2d1846e40c661ac86c654b4e8"]
function pins(){const p=JSON.parse(read('source-order-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.originalPenOrder,originalPenOrder);assert.deepEqual(p.sourceGroups,sourceGroups)}
function reorder(out){assert.equal(sha(JSON.stringify(out)),ORIGINAL_SHA);assert.equal(out.length,15);assert.equal(out.flat().length,16);assert.deepEqual(out.map(p=>sha(JSON.stringify(p))),PEN_SHA);const result=originalPenOrder.map(i=>out[i-1]);assert.equal(sha(JSON.stringify(result)),FINAL_SHA);return result}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);pins();return reorder(source.compileProgressive(trace,proof,identity))}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,source.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
