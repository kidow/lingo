import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as source from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalPenOrder=Object.freeze([1,2,3,4,5,6,7,9,8,10,11,12,13,14,15,19,20,16,17,18])
export const originalSourceGroups=Object.freeze(source.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze(originalPenOrder.map(i=>originalSourceGroups[i-1]))
const ORIGINAL_SHA='d717105d7226668a38b87661745eeb9131e89151bd1e6be658457e907efb77f1'
function pins(){const p=JSON.parse(read('source-order-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.originalPenOrder,originalPenOrder);assert.deepEqual(p.sourceGroups,sourceGroups);assert.deepEqual([...originalPenOrder].sort((a,b)=>a-b),Array.from({length:20},(_,i)=>i+1))}
function reorder(out){assert.equal(sha(JSON.stringify(out)),ORIGINAL_SHA,'고정원형20획 결과');assert.equal(out.length,20);assert.equal(out.flat().length,23);const result=originalPenOrder.map(i=>out[i-1]);for(let i=0;i<20;i++){assert.strictEqual(result[i],out[originalPenOrder[i]-1]);for(let j=0;j<result[i].length;j++)assert.strictEqual(result[i][j],out[originalPenOrder[i]-1][j])}assert.equal(new Set(result).size,20);return result}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);pins();return reorder(source.compileProgressive(trace,proof,identity))}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,source.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
