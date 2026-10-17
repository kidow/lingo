import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as source from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalPenOrder=Object.freeze([1,2,3,4,7,5,6,8,9,10,11,12,13,14,15,16])
export const originalSourceGroups=Object.freeze(source.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze(originalPenOrder.map(i=>originalSourceGroups[i-1]))
const ORIGINAL_SHA="47458abe85f1af879daf1f79cea0a8ab1808c1402f984a433b933d6be88431b8",FINAL_SHA="67eb462f0c5867ad90ddb3625d26662b714115715217aa48c8e4b2493e9a5801",PEN_SHA=["b335724efdb7aba2e01b36661732954d7c21cf32ab158f00296e23d797751d5a","b5b1ca18068262145c89ec5307f1d2896e82f6b21a46edbff424d9be53e63e88","f1ec7f3811197b55edf975357da949c570f9b56afd7c0d9020a590eb2b41cbb4","444559b78ab98b40f683f453241e920fbcaa232da14f97cd18638e9d3d4c3709","8def197d9a258e6c257217b7b1fcc17d517cf985112f4dae20c4ec570b614bad","0ea738ab35166bcedbff6c3da37d6458775a9f1eb6688becf634f24ca54355b4","0c0435538877230c58988c42f0366991989bb09ea4db1f11b83e0d09e556bee1","2e09829a48a6faba1ca25e4b770f6107dcb2b9c367890f2c7bae6e11836c03cf","cf3a228a2c634ef2d45743bfdc96635576c89d9511b57bc01bb0acdd5fa5d747","5f8b4ae63dbe3398eaac1abc5b6b056280917e7dabe1ef0dd35ae72e9b2f2996","7296a175971c2a950ef739b264deddee91a57ad197d5e6ea54497ab50be0d1be","6f73afe19b339a57ede3d641be041d9f6a480c496febe63bacf23d24bccc78ef","d15d573d4203cba9d1cb1482a3c3f09883b0f7b63e1e4a71047bf2f5bf481a5d","49b7df5064af6730cf1b81fa32ee400f01e3922b81bacfba9a28b7da368c2dbd","ddd5a1d4fa652b625f23ab21d114ddad35289a97850b718bc5af0b5ec10d4229","b54a3093e3d3371f50d7e508b92f5064cdf809e1075f1fb64ac8361e4e97dc37"]
function pins(){const p=JSON.parse(read('source-order-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.originalPenOrder,originalPenOrder);assert.deepEqual(p.sourceGroups,sourceGroups)}
function reorder(out){assert.equal(sha(JSON.stringify(out)),ORIGINAL_SHA);assert.equal(out.length,16);assert.equal(out.flat().length,17);assert.deepEqual(out.map(p=>sha(JSON.stringify(p))),PEN_SHA);const result=originalPenOrder.map(i=>out[i-1]);assert.equal(sha(JSON.stringify(result)),FINAL_SHA);return result}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);pins();return reorder(source.compileProgressive(trace,proof,identity))}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,source.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
