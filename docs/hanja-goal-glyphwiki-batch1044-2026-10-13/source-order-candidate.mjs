import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as source from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalPenOrder=Object.freeze([9,10,1,2,4,3,5,6,7,8])
export const originalSourceGroups=Object.freeze(source.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze(originalPenOrder.map(i=>originalSourceGroups[i-1]))
const ORIGINAL_SHA='3a8062647a1eb167f4cf942bd37f8844606dae1c9ab5a390a0fa43303429862a',FINAL_SHA='e2682ea8ce7a858e535a6befc6b66d1b8b99bb0c66197ddf73f1cb6ac2240772',PEN_SHA=["a26a65b6f104e92225d7bc63b04d282fd92545e3ed00398ff131377764874e1d","601c03955191abba3a4c119adfde67e1cf0b1deabef629c0d893b5f369bc93df","afe4cc0c4242c2b8b771f937617e371889a1124d26dd41a7cc54df1983509840","9cf1fe3db480e4176aa769748d30e6212533ea50a8440f1c4cab133969e3debc","3c4bf040026ec1c88026d6d7a7514dc06bb8123da5897d32e301c9abe12c99bc","6c31e3cf8e1fdaeabecb6efb20d409c92cd5873241f4299b5a8a9cc3a95335a6","6b06cc755692dcac6086f5895f6bef385f1963d172358f3c3cea98cc950b7cf7","817852cc47b668ff310e626055ef7f35248dae400b2927d1fe60952de02d6a78","30afcabc8c6fdecd3c13bc6a4146baf18772c59d3c221cc81b0a6f415963cf9f","c8b9960794a6c8ef20344480b465c0b14dfd70dedadd637a01629c2cbc2bd582"]
function pins(){const p=JSON.parse(read('source-order-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.originalPenOrder,originalPenOrder);assert.deepEqual(p.sourceGroups,sourceGroups)}
function reorder(out){assert.equal(sha(JSON.stringify(out)),ORIGINAL_SHA);assert.equal(out.length,10);assert.equal(out.flat().length,13);assert.deepEqual(out.map(p=>sha(JSON.stringify(p))),PEN_SHA);const result=originalPenOrder.map(i=>out[i-1]);assert.equal(sha(JSON.stringify(result)),FINAL_SHA);return result}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);pins();return reorder(source.compileProgressive(trace,proof,identity))}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,source.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
