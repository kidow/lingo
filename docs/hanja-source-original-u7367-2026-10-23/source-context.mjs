/** 獧 original header4 plus separate trace context only. No compiler, renderer or geometry execution. */
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const sha=b=>createHash('sha256').update(b).digest('hex')
const path='../hanja-goal-glyphwiki-batch423-2026-10-09/'
export const INPUT_SHA256=Object.freeze({
 [path+'engine-proof.json']:'7601c801264eecde876ba7309b59d108edb0448fb16b37aefb3952de97763de3',
 [path+'draw-trace.json']:'41431055dba8a2ca0682e9b13886158ab119524dcba48eefe892681a9825a946',
 [path+'sources.json']:'e48f6b33a76e34dcda3a0fc9e33f0c1f7108f18ee88b84b9ba8ba593d66eacf4',
 [path+'review.json']:'678991121426a97640369d9df73fd2d51ab7a3396bd3bdce6ffe921066856966',
 [path+'progressive.mjs']:'0228288bf2eadf5a5596f0d374e3167e0e46cbb5a75b1800e72befdb31cf3478'
})
const readPinned=p=>{const b=readFileSync(new URL(p,import.meta.url));assert.equal(sha(b),INPUT_SHA256[p],p);return b}
function freeze(v){if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)freeze(d.value)}Object.freeze(v)}return v}
function same(a,b){if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&same(ad.value,bd.value)})}
const header=JSON.parse(readPinned(path+'engine-proof.json')),trace=JSON.parse(readPinned(path+'draw-trace.json')),sources=JSON.parse(readPinned(path+'sources.json')),oldHold=JSON.parse(readPinned(path+'review.json'))
assert.deepEqual(Object.keys(header),['engineRevision','engineHashes','groups','defaults'])
assert.equal(Object.keys(header.engineHashes).length,8)
assert.deepEqual([header.groups.length,trace.length,trace.flat().length,header.groups.flatMap(g=>g.polygons).length],[19,19,20,34])
const table=readPinned(path+'progressive.mjs').toString().match(/export const sourceGroups\s*=\s*(\[[^\n]+\])/)
assert(table);const sourceGroups=JSON.parse(table[1])
assert.equal(sourceGroups.length,16);assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:19},(_,i)=>i))
const seen=new Set(),queue=[sources.root]
while(queue.length){const name=queue.pop();if(seen.has(name))continue;const rec=sources.records[name];assert(rec&&typeof rec.data==='string','Complete original primary closure');seen.add(name);for(const row of rec.data.split('$')){const f=row.split(':');if(f[0]==='99'&&f[7])queue.push(f[7])}}
assert.equal(sources.root,'u7367');assert.equal(seen.size,3);assert.equal(Object.keys(sources.records).length,3)
const full5={...header,trace}
assert.equal(sha(JSON.stringify(full5)),'7602d0e414ab8373b3254f1d280a100df595d025d3d4fc56202c8c4e91e26392')
const identity={root:'u7367',headerFile:path+'engine-proof.json',headerFileSHA256:INPUT_SHA256[path+'engine-proof.json'],traceFile:path+'draw-trace.json',traceFileSHA256:INPUT_SHA256[path+'draw-trace.json'],sourceFile:path+'sources.json',sourceFileSHA256:INPUT_SHA256[path+'sources.json']}
const context=freeze({root:'u7367',fullProof:full5,header4:header,trace,identity,sourceGroups,sourceFamily:{sourceRoot:sources.root,selectedPrimaryClosureNames:[...seen].sort(),selectedPrimaryClosureCount:3,capturedRecordCount:3,records:sources.records},counts:{logicalPens:16,rawGroups:19,traceCalls:20,polygons:34},legacyHold:oldHold.failure,nativeApproval:false,runtimeApplied:false,registered:false,compilerRuns:0,engineRuns:0,projectionRuns:0})
export const ORIGINAL_U7367= context
export function originalU7367SourceContext(providedTrace,providedFull5,providedIdentity){return same(providedTrace,trace)&&same(providedFull5,full5)&&same(providedIdentity,identity)?context:null}
export const SOURCE_PREPARATION=freeze({schema:'hanja-explicit-header4-separate-trace-source-context/v1',root:'u7367',canonicalFull5SHA256:'7602d0e414ab8373b3254f1d280a100df595d025d3d4fc56202c8c4e91e26392',archiveFull5FileCreated:false,explicitRAMHeader4PlusTrace:true,engineHashesPreserved:8,identityFields:7,all19OriginalRowsPreserved:true,all20OriginalCallsPreserved:true,all34OriginalPolygonsPreserved:true,originalCoordinatesWidthsDefaultsUnchanged:true,legacyDiscontinuousLQHoldRetained:true,selectedPrimaryClosureOnly:true,alternateWholeClosureApproved:false,primitiveDirectionApproval:false,nativeApproval:false,runtimeApplied:false,registered:false,compilerRuns:0,engineRuns:0,projectionRuns:0})

