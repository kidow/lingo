/** 蘧 original header4 plus separate trace context only. No compiler, renderer or geometry execution. */
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const sha=b=>createHash('sha256').update(b).digest('hex')
const path='../hanja-goal-glyphwiki-batch415-2026-10-09/'
export const INPUT_SHA256=Object.freeze({
 [path+'engine-proof.json']:'aa29ba5e174aa57616709ec8dd7d62b8af2e731a854084ae831a3e8c3fdbdfd5',
 [path+'draw-trace.json']:'64c50cb850168ac94738bc88756a1298003a19bb6a96c8670cbb082bec3575d9',
 [path+'sources.json']:'ff62bc1d5437031f528a16a4e168af6cf5516337aebb44555209ce1ba4f70cca',
 [path+'review.json']:'5973a5cebc3389bf086c87c4a23f0aaf37b72c412f71100f7d50a69da455310c',
 [path+'progressive.mjs']:'476f2aea54ac94885865066beebc3339553f8efbcc19aaf45034da8feef8ac93'
})
const readPinned=p=>{const b=readFileSync(new URL(p,import.meta.url));assert.equal(sha(b),INPUT_SHA256[p],p);return b}
function freeze(v){if(v&&typeof v==='object'){for(const k of Reflect.ownKeys(v)){const d=Object.getOwnPropertyDescriptor(v,k);if(d&&'value'in d)freeze(d.value)}Object.freeze(v)}return v}
function same(a,b){if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&same(ad.value,bd.value)})}
const header=JSON.parse(readPinned(path+'engine-proof.json')),trace=JSON.parse(readPinned(path+'draw-trace.json')),sources=JSON.parse(readPinned(path+'sources.json')),oldHold=JSON.parse(readPinned(path+'review.json'))
assert.deepEqual(Object.keys(header),['engineRevision','engineHashes','groups','defaults'])
assert.equal(Object.keys(header.engineHashes).length,8)
assert.deepEqual([header.groups.length,trace.length,trace.flat().length,header.groups.flatMap(g=>g.polygons).length],[24,24,28,54])
const table=readPinned(path+'progressive.mjs').toString().match(/export const sourceGroups\s*=\s*(\[[^\n]+\])/)
assert(table);const sourceGroups=JSON.parse(table[1])
assert.equal(sourceGroups.length,21);assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:24},(_,i)=>i))
const seen=new Set(),queue=[sources.root]
while(queue.length){const name=queue.pop();if(seen.has(name))continue;const rec=sources.records[name];assert(rec&&typeof rec.data==='string','Complete original primary closure');seen.add(name);for(const row of rec.data.split('$')){const f=row.split(':');if(f[0]==='99'&&f[7])queue.push(f[7])}}
assert.equal(sources.root,'u8627-ue0102');assert.equal(seen.size,6);assert.equal(Object.keys(sources.records).length,6)
const full5={...header,trace}
assert.equal(sha(JSON.stringify(full5)),'b5e0d776491c42a711537e12fb54290d591a6140de143397e2ce865f3b5ea2e8')
const identity={root:'u8627-ue0102',headerFile:path+'engine-proof.json',headerFileSHA256:INPUT_SHA256[path+'engine-proof.json'],traceFile:path+'draw-trace.json',traceFileSHA256:INPUT_SHA256[path+'draw-trace.json'],sourceFile:path+'sources.json',sourceFileSHA256:INPUT_SHA256[path+'sources.json']}
const context=freeze({root:'u8627-ue0102',fullProof:full5,header4:header,trace,identity,sourceGroups,sourceFamily:{sourceRoot:sources.root,selectedPrimaryClosureNames:[...seen].sort(),selectedPrimaryClosureCount:6,capturedRecordCount:6,records:sources.records},counts:{logicalPens:21,rawGroups:24,traceCalls:28,polygons:54},legacyHold:oldHold.failure,nativeApproval:false,runtimeApplied:false,registered:false,compilerRuns:0,engineRuns:0,projectionRuns:0})
export const ORIGINAL_U8627= context
export function originalU8627SourceContext(providedTrace,providedFull5,providedIdentity){return same(providedTrace,trace)&&same(providedFull5,full5)&&same(providedIdentity,identity)?context:null}
export const SOURCE_PREPARATION=freeze({schema:'hanja-explicit-header4-separate-trace-source-context/v1',root:'u8627-ue0102',canonicalFull5SHA256:'b5e0d776491c42a711537e12fb54290d591a6140de143397e2ce865f3b5ea2e8',archiveFull5FileCreated:false,explicitRAMHeader4PlusTrace:true,engineHashesPreserved:8,identityFields:7,all24OriginalRowsPreserved:true,all28OriginalCallsPreserved:true,all54OriginalPolygonsPreserved:true,originalCoordinatesWidthsDefaultsUnchanged:true,legacyDiscontinuousQBHoldRetained:true,selectedPrimaryClosureOnly:true,alternateWholeClosureApproved:false,primitiveDirectionApproval:false,nativeApproval:false,runtimeApplied:false,registered:false,compilerRuns:0,engineRuns:0,projectionRuns:0})
