/** 繾 original header4 plus separate trace context only. No compiler, renderer or geometry execution. */
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const sha=b=>createHash('sha256').update(b).digest('hex')
const path='../hanja-goal-glyphwiki-batch424-2026-10-09/'
export const INPUT_SHA256=Object.freeze({
 [path+'engine-proof.json']:'c24a1587e90ceb25ed3e680de2aa177b87cf77ee46820c9b5b6be3d9beae1892',
 [path+'draw-trace.json']:'210052a82ce59ebb13945623809788ad396787e6422250b776f6b5104694f7bf',
 [path+'sources.json']:'fc1ab36d2d30e4466d04972b46b08cdfadc95e770ba526cc2b7450afabc52eec',
 [path+'review.json']:'ea44e01c97cba4c35398b2755c6041300b22f8b59389089ac76b56b83bde1541',
 [path+'progressive.mjs']:'7eefa948414cb9bfae1e6a98802c5d4b88ae2cfd6d903c9146dd5f4ed51b338e'
})
const readPinned=p=>{const b=readFileSync(new URL(p,import.meta.url));assert.equal(sha(b),INPUT_SHA256[p],p);return b}
function freeze(v){if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)freeze(d.value)}Object.freeze(v)}return v}
function same(a,b){if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&same(ad.value,bd.value)})}
const header=JSON.parse(readPinned(path+'engine-proof.json')),trace=JSON.parse(readPinned(path+'draw-trace.json')),sources=JSON.parse(readPinned(path+'sources.json')),oldHold=JSON.parse(readPinned(path+'review.json'))
assert.deepEqual(Object.keys(header),['engineRevision','engineHashes','groups','defaults'])
assert.equal(Object.keys(header.engineHashes).length,8)
assert.deepEqual([header.groups.length,trace.length,trace.flat().length,header.groups.flatMap(g=>g.polygons).length],[27,27,27,49])
const table=readPinned(path+'progressive.mjs').toString().match(/export const sourceGroups\s*=\s*(\[[^\n]+\])/)
assert(table);const sourceGroups=JSON.parse(table[1])
assert.equal(sourceGroups.length,20);assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:27},(_,i)=>i))
const seen=new Set(),queue=[sources.root]
while(queue.length){const name=queue.pop();if(seen.has(name))continue;const rec=sources.records[name];assert(rec&&typeof rec.data==='string','Complete original primary closure');seen.add(name);for(const row of rec.data.split('$')){const f=row.split(':');if(f[0]==='99'&&f[7])queue.push(f[7])}}
assert.equal(sources.root,'u7e7e');assert.equal(seen.size,5);assert.equal(Object.keys(sources.records).length,5)
const full5={...header,trace}
assert.equal(sha(JSON.stringify(full5)),'12f19a4d1d372871cfd182ba18b8d6943ce17c319f5cf8c044e25b6d6e45d6b6')
const identity={root:'u7e7e',headerFile:path+'engine-proof.json',headerFileSHA256:INPUT_SHA256[path+'engine-proof.json'],traceFile:path+'draw-trace.json',traceFileSHA256:INPUT_SHA256[path+'draw-trace.json'],sourceFile:path+'sources.json',sourceFileSHA256:INPUT_SHA256[path+'sources.json']}
const context=freeze({root:'u7e7e',fullProof:full5,header4:header,trace,identity,sourceGroups,sourceFamily:{sourceRoot:sources.root,selectedPrimaryClosureNames:[...seen].sort(),selectedPrimaryClosureCount:5,capturedRecordCount:5,records:sources.records},counts:{logicalPens:20,rawGroups:27,traceCalls:27,polygons:49},legacyHold:oldHold.failure,nativeApproval:false,runtimeApplied:false,registered:false,compilerRuns:0,engineRuns:0,projectionRuns:0})
export const ORIGINAL_U7E7E= context
export function originalU7e7eSourceContext(providedTrace,providedFull5,providedIdentity){return same(providedTrace,trace)&&same(providedFull5,full5)&&same(providedIdentity,identity)?context:null}
export const SOURCE_PREPARATION=freeze({schema:'hanja-explicit-header4-separate-trace-source-context/v1',root:'u7e7e',canonicalFull5SHA256:'12f19a4d1d372871cfd182ba18b8d6943ce17c319f5cf8c044e25b6d6e45d6b6',archiveFull5FileCreated:false,explicitRAMHeader4PlusTrace:true,engineHashesPreserved:8,identityFields:7,all27OriginalRowsPreserved:true,all27OriginalCallsPreserved:true,all49OriginalPolygonsPreserved:true,originalCoordinatesWidthsDefaultsUnchanged:true,legacyDiscontinuousQQHoldRetained:true,selectedPrimaryClosureOnly:true,alternateWholeClosureApproved:false,primitiveDirectionApproval:false,nativeApproval:false,runtimeApplied:false,registered:false,compilerRuns:0,engineRuns:0,projectionRuns:0})

