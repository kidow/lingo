import assert from 'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{compileProgressive as originalCompile,selectedProofIdentity as originalIdentity,sourceGroups as originalGroups}from'../progressive.mjs';
export{renderProgressive}from'../progressive.mjs';
const sha=b=>createHash('sha256').update(b).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url));
export const selectedProofIdentity=originalIdentity;
export const sourceMaskOrder=Object.freeze([1,2,3,4,5,6,7,8,9,10,12,11,13,14,15]);
export const sourceGroups=Object.freeze(sourceMaskOrder.map(n=>originalGroups[n-1]));
export const nativeApproved=false;export const runtimeApplied=false;
let baselineCompiles=0;export function sourceCompileCallCount(){return baselineCompiles}
export function compileProgressive(...args){
 assert.equal(args.length,3,'Exactly3 recovered-source arguments');const[trace,proof,identity]=args;
 const p=JSON.parse(read('./source-order-preparation.json'));for(const[f,h]of Object.entries({...p.sourceInputBytePins,...p.newFilesSHA256}))assert.equal(sha(read(f)),h,f);
 assert.deepEqual(identity,selectedProofIdentity,'Exact recovered proof/capsule/manifest identity7');assert(proof&&typeof proof==='object','Full5 original proof required');assert.deepEqual(Object.keys(proof).sort(),p.fullProofKeys,'Exact full5 keys');assert.equal(sha(JSON.stringify(proof)),p.fullProofSHA256,'Exact full5 bytes');assert.deepEqual(trace,proof.trace,'Original trace');
 assert.deepEqual(originalGroups,p.originalSourceGroupsZeroBased);assert.deepEqual(sourceGroups,p.finalSourceGroupsZeroBased);const before=JSON.stringify(proof);baselineCompiles++;const baseline=originalCompile(trace,proof,identity);assert.equal(JSON.stringify(proof),before);assert.equal(sha(JSON.stringify(baseline)),p.baselineCompiledSHA256);assert.equal(baseline.length,15);assert.equal(baseline.flat().length,16);
 const result=sourceMaskOrder.map(n=>baseline[n-1]);assert.equal(new Set(sourceMaskOrder).size,15);assert.deepEqual([...sourceMaskOrder].sort((a,b)=>a-b),Array.from({length:15},(_,i)=>i+1));result.forEach((pen,i)=>assert.equal(pen,baseline[sourceMaskOrder[i]-1],'Same whole-mask array reference only'));assert.equal(new Set(result.flat()).size,new Set(baseline.flat()).size);assert.equal(result.flat().length,16);if(p.expectedCompiledSHA256!==null)assert.equal(sha(JSON.stringify(result)),p.expectedCompiledSHA256);return result;
}
