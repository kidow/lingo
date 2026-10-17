import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as source from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalPenOrder=Object.freeze([1,2,4,3,5,6,7,8,9,10,11,12,13,14,15,16])
export const originalSourceGroups=Object.freeze(source.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze(originalPenOrder.map(i=>originalSourceGroups[i-1]))
function pins(){const p=JSON.parse(read('source-order-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.originalPenOrder,originalPenOrder);assert.deepEqual(p.sourceGroups,sourceGroups)}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);pins();const out=source.compileProgressive(trace,proof,identity);assert.equal(sha(JSON.stringify(out)),'ba9892b2c4eae121eb75098e1e3c28bf95ca5baff389c4bb31ac9010cd544cf1');assert.equal(out.length,16);assert.equal(out.flat().length,17);const result=originalPenOrder.map(i=>out[i-1]);for(let i=0;i<16;i++)assert.strictEqual(result[i],out[originalPenOrder[i]-1]);return result}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,source.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
