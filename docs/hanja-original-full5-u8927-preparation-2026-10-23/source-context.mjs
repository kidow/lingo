import {readFileSync} from 'node:fs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url)))
const proof=read('./engine-whole-u8927.json'),candidate=read('./whole-candidate.json')
function deepFreeze(v){if(v&&typeof v==='object'){for(const x of Object.values(v))deepFreeze(x);Object.freeze(v)}}
deepFreeze(proof);deepFreeze(candidate)
const context=Object.freeze({id:'u8927-actual-engine-whole'})
function sameJSON(a,b) {
 if(Object.is(a,b))return true
 if(!b||typeof b!=='object'||!a||typeof a!=='object')return false
 if(Array.isArray(b)){
  if(!Array.isArray(a)||Object.getPrototypeOf(a)!==Array.prototype||a.length!==b.length||Reflect.ownKeys(a).length!==b.length+1)return false
  return b.every((value,index)=>{const d=Object.getOwnPropertyDescriptor(a,String(index));return !!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,value)})
 }
 if(Array.isArray(a)||Object.getPrototypeOf(a)!==Object.prototype)return false
 const keys=Object.keys(b),expected=b
 return Reflect.ownKeys(a).length===keys.length&&keys.every(key=>{const d=Object.getOwnPropertyDescriptor(a,key);return !!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,expected[key])})
}
export function makeOriginalU8927Context(value,identity,records){return arguments.length===3&&sameJSON(value,proof)&&sameJSON(identity,candidate.sourceIdentity)&&sameJSON(records,candidate.sourceFamily.records)?context:null}
export const SOURCE_IDENTITY=candidate.sourceIdentity,nativeApproval=false,runtimeApplied=false
