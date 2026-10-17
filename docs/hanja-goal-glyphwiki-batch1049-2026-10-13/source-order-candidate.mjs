import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as source from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalPenOrder=Object.freeze([1,3,2,4,5,6,7,8,9,10,11,12,13])
export const originalSourceGroups=Object.freeze(source.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze(originalPenOrder.map(i=>originalSourceGroups[i-1]))
const ORIGINAL_SHA='2ba1c2236fc701472808ddd2d46f05415ac1f679fd717ca15f3be2f3af178ad8',FINAL_SHA='e4faa5755b872901bc829824728db0cf44855cd08332921f331362ccd4f58d4f',PEN_SHA=["abf6e664cb48585bb3b609154834df7ea9f6a54934131c90bc2bb7c899ae9442","c7901cc531ea7614bced048a4f4b670d12deeda7a0428f14178e338f5c8885ef","6f063aaaa85f823852d84b1b5590ed13603e7c168874ec056c62e328905293fe","5fd7b28bcd18f1a8e4b58afe9f1fff56bef496ab6dde9239caa4418d0dff2190","5db452e949b9aada517b33714b446c7cc4a08349333e56b5d5d2e7271429e3a4","235c49f34c6b33f47e58c094ae5b55ad7848cf521fc4a9ba83485e46e929ca0f","572ebcd4834a4969f6e712ccd2040b021460379dcf1e2fa9e230c0be05d83402","3199dcff474f229f5d28b3a89d0d937c8c8124d7134123027f60a06a4be75312","c2a072232239eeae895a20c29cffc8211593a13ae5f222d18281cd524afcbd1c","90efaf15e50e6c4498624dc450427d9df37ccfbd36176fb7d424e32177b8395e","7317bcbcc3e983abcf6ef6e4bcc2f1b9709230f9485044479097eff8b058c251","01d47b49414486a16395b90c2cb38c846260eb6b714f95069b60c7a23c873341","1ff17254d49b7a321d56f50f07f3e25094547038c5ba71921f8fc60d0c5605d6"]
function pins(){const p=JSON.parse(read('source-order-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.originalPenOrder,originalPenOrder);assert.deepEqual(p.sourceGroups,sourceGroups)}
function reorder(out){assert.equal(sha(JSON.stringify(out)),ORIGINAL_SHA);assert.equal(out.length,13);assert.equal(out.flat().length,14);assert.deepEqual(out.map(p=>sha(JSON.stringify(p))),PEN_SHA);const result=originalPenOrder.map(i=>out[i-1]);assert.equal(sha(JSON.stringify(result)),FINAL_SHA);return result}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);pins();return reorder(source.compileProgressive(trace,proof,identity))}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,source.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
