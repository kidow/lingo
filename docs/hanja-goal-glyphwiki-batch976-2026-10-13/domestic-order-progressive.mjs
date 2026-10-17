import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive} from './progressive.mjs'
export {renderProgressive}
export const DOMESTIC_ORDER=Object.freeze([1,3,4,5,6,7,8,9,10,11,2,12,13,14,15])
export function compileDomesticOrder(root,trace,proof,identity){
  const input=JSON.stringify(proof),original=compileSourceWhole(root,trace,proof,identity)
  assert.equal(JSON.stringify(proof),input);assert.equal(original.length,15);assert.equal(original.flat().length,16)
  assert.equal(createHash('sha256').update(JSON.stringify(original)).digest('hex'),'ecf7ef06d603fb3875d4b3af36aaa16bc69ff3c939bb5a7cc39a90b8a74c87c7')
  assert.equal(new Set(DOMESTIC_ORDER).size,15)
  const corrected=DOMESTIC_ORDER.map(n=>original[n-1])
  for(let i=0;i<15;i++){assert.equal(corrected[i],original[DOMESTIC_ORDER[i]-1]);assert.equal(JSON.stringify(corrected[i]),JSON.stringify(original[DOMESTIC_ORDER[i]-1]))}
  return corrected
}
