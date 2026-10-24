import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
function freeze(x){if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.freeze(x);for(const v of Object.values(x))freeze(v)}return x}
function sameJSON(a,b){if(Object.is(a,b))return true;if(!b||typeof b!=='object'||!a||typeof a!=='object')return false;if(Array.isArray(b)){if(!Array.isArray(a)||Object.getPrototypeOf(a)!==Array.prototype||a.length!==b.length||Reflect.ownKeys(a).length!==b.length+1)return false;return b.every((v,i)=>{const d=Object.getOwnPropertyDescriptor(a,String(i));return!!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,v)})}if(Array.isArray(a)||Object.getPrototypeOf(a)!==Object.prototype)return false;const keys=Object.keys(b);return Reflect.ownKeys(a).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(a,k);return!!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,b[k])})}
const bytes=readFileSync(new URL('./fixtures.json',import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),'12c56b58dde4b1f3238f69b6828f7d1700e7fab366ec30615d94db962b639d6a','Exact once-projected fixture bytes');const FIXED=freeze(JSON.parse(bytes)['koseki-368300'])
export const selectedProofIdentity=FIXED.identity
export const sourceGroups=FIXED.sourceGroups
export const sourceProposal=FIXED.sourceProposal
export const geometrySHA256='f25d42690a65ed52b9bb924649adb9e9b0ff2fac972fb9e482661650275b0e05'
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);assert(sameJSON(identity,selectedProofIdentity),'Exact selected seven-field source identity');assert(sameJSON(proof,FIXED.fullProof)&&sameJSON(trace,FIXED.fullProof.trace),'Exact original full5/trace; no reconstructed header');for(const[f,h]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),h);return FIXED.strokes}
export const nativeApproved=false
export const runtimeApplied=false
