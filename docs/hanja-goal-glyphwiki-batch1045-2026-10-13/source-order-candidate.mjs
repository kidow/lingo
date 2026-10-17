import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as source from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalPenOrder=Object.freeze([1,2,3,5,6,7,4,8,9,10,11,12,13,14,15,16,17,18])
export const originalSourceGroups=Object.freeze(source.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze(originalPenOrder.map(i=>originalSourceGroups[i-1]))
const ORIGINAL_SHA='2974c235793a1f0a7901e29143620bd76ce142661e2038098ba97491a0da04da',FINAL_SHA='229eaa7cc50f08fac0ff5d675454c65c07d4e627de88061dbf4a048f2218669a',PEN_SHA=["d42e783e69a4fc523add9b7c69500601728e263e8894ecf04d23627563886733","a24a799e16261e0aae76a572a36dbfb925cf4d906ca8c429aa74e570d71e9242","1d06823b8f36d801520fc10f02730185e9ec87c7587563b8690e79917bedfa8e","1225d7713d8899ae8e6ccac434cd4f68321bb2b1a6f75efb77c966ef28dcaa4a","c9af60e49449101a0e3d38ae65a2d90ce5d9ad93aa1cff329a88bee611e32351","75358c582e9eff7dd732f4d6e8afb344bb47988372b8bbba6b400264eabadc00","f8b1b76bf8af31a6bdffb2cf8e45dca9d2e15b440b2d8d54b3acb6200bc0c38e","5a4804cb75d6abdbfa598851a4d91f56d5552dc072a36f53a32342812d05fe2d","625e91de628f447cc83a6ceef15af5d5a09392d216117f272e72edb2c17ab7e2","9edf02ab2ea9501f298d9db031e6be328681d2cf22c99d0f2bb31595a283e106","6b3b7311880f3915d93b4210040fe9e2cf67291e092aca5fe21249730fae586a","3d9db5b23811c5a0dada0df98dd76d9cf2e8f67a31eb7cbb24faf1b9f1d976c6","07d366d29cb19ffd85f50d51710eba52923946019d7735ce8697052b19a20325","4f6f21c1bb19edac91014ee49991dea054ed356bce1e90bb50d8090d64ea7958","6ecf9ee869da1062261d33e37a7b20699a4bfbb2767f124f470620d7b88ca1c4","2f3a77514b1720720e40cfb1e5bc91a3ed102d4800a4760df927aeaece46384f","4cfbda6b241f7df965affc23984f333fb0db99e646f66cf1916c4b2a8cffca19","8a99b58c44fa0a10985347b3710338ae5a9bfc63a45bc735cf917c48619f4305"]
function pins(){const p=JSON.parse(read('source-order-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.originalPenOrder,originalPenOrder);assert.deepEqual(p.sourceGroups,sourceGroups)}
function reorder(out){assert.equal(sha(JSON.stringify(out)),ORIGINAL_SHA);assert.equal(out.length,18);assert.equal(out.flat().length,18);assert.deepEqual(out.map(p=>sha(JSON.stringify(p))),PEN_SHA);const result=originalPenOrder.map(i=>out[i-1]);assert.equal(sha(JSON.stringify(result)),FINAL_SHA);return result}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);pins();return reorder(source.compileProgressive(trace,proof,identity))}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,source.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
