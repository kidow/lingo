/** 籧 original header4 plus separate trace context only. No compiler, renderer or geometry execution. */
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const sha=b=>createHash('sha256').update(b).digest('hex')
const path='../hanja-goal-glyphwiki-batch414-2026-10-09/'
export const INPUT_SHA256=Object.freeze({
 [path+'engine-proof.json']:'e39b22b71e665cc542587e82049ee405a80ca8488cef9ab1fe3349f41d75844c',
 [path+'draw-trace.json']:'67c0480f7b19474f2d23c0adc7866591c1b1b1f753d7f07bad661f6177cdce71',
 [path+'sources.json']:'637f5c2f6467aeed655aa5187b3dfbbf25709b37690b95c37e2ed7e44b318693',
 [path+'review.json']:'cbc40795e7de398c3ef680fbf83b3bd7636c4a11284b718e11c8353725854eb5',
 [path+'progressive.mjs']:'983d96ea0c50eb44a3146f51bee452a9f68c870961df38e01fbca7b7990f0182'
})
const readPinned=p=>{const b=readFileSync(new URL(p,import.meta.url));assert.equal(sha(b),INPUT_SHA256[p],p);return b}
function freeze(v){if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)freeze(d.value)}Object.freeze(v)}return v}
function same(a,b){if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&same(ad.value,bd.value)})}
const header=JSON.parse(readPinned(path+'engine-proof.json')),trace=JSON.parse(readPinned(path+'draw-trace.json')),sources=JSON.parse(readPinned(path+'sources.json')),oldHold=JSON.parse(readPinned(path+'review.json'))
assert.deepEqual(Object.keys(header),['engineRevision','engineHashes','groups','defaults'])
assert.equal(Object.keys(header.engineHashes).length,8)
assert.deepEqual([header.groups.length,trace.length,trace.flat().length,header.groups.flatMap(g=>g.polygons).length],[26,26,30,60])
const table=readPinned(path+'progressive.mjs').toString().match(/export const sourceGroups\s*=\s*(\[[^\n]+\])/)
assert(table);const sourceGroups=JSON.parse(table[1])
assert.equal(sourceGroups.length,23);assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:26},(_,i)=>i))
const seen=new Set(),queue=[sources.root]
while(queue.length){const name=queue.pop();if(seen.has(name))continue;const rec=sources.records[name];assert(rec&&typeof rec.data==='string','Complete original primary closure');seen.add(name);for(const row of rec.data.split('$')){const f=row.split(':');if(f[0]==='99'&&f[7])queue.push(f[7])}}
assert.equal(sources.root,'u7c67');assert.equal(seen.size,4);assert.equal(Object.keys(sources.records).length,4)
const full5={...header,trace}
assert.equal(sha(JSON.stringify(full5)),'a3280bf6e81ae6725e92540192491457fd46ce668a06e58639138e31fa7468ff')
const identity={root:'u7c67',headerFile:path+'engine-proof.json',headerFileSHA256:INPUT_SHA256[path+'engine-proof.json'],traceFile:path+'draw-trace.json',traceFileSHA256:INPUT_SHA256[path+'draw-trace.json'],sourceFile:path+'sources.json',sourceFileSHA256:INPUT_SHA256[path+'sources.json']}
const context=freeze({root:'u7c67',fullProof:full5,header4:header,trace,identity,sourceGroups,sourceFamily:{sourceRoot:sources.root,selectedPrimaryClosureNames:[...seen].sort(),selectedPrimaryClosureCount:4,capturedRecordCount:4,records:sources.records},counts:{logicalPens:23,rawGroups:26,traceCalls:30,polygons:60},legacyHold:oldHold.failure,nativeApproval:false,runtimeApplied:false,registered:false,compilerRuns:0,engineRuns:0,projectionRuns:0})
export const ORIGINAL_U7C67= context
export function originalU7c67SourceContext(providedTrace,providedFull5,providedIdentity){return same(providedTrace,trace)&&same(providedFull5,full5)&&same(providedIdentity,identity)?context:null}
export const SOURCE_PREPARATION=freeze({schema:'hanja-explicit-header4-separate-trace-source-context/v1',root:'u7c67',canonicalFull5SHA256:'a3280bf6e81ae6725e92540192491457fd46ce668a06e58639138e31fa7468ff',archiveFull5FileCreated:false,explicitRAMHeader4PlusTrace:true,engineHashesPreserved:8,identityFields:7,all26OriginalRowsPreserved:true,all30OriginalCallsPreserved:true,all60OriginalPolygonsPreserved:true,originalCoordinatesWidthsDefaultsUnchanged:true,legacyDiscontinuousQBHoldRetained:true,selectedPrimaryClosureOnly:true,alternateWholeClosureApproved:false,primitiveDirectionApproval:false,nativeApproval:false,runtimeApplied:false,registered:false,compilerRuns:0,engineRuns:0,projectionRuns:0})
