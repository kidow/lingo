import assert from 'node:assert/strict'
import {readFileSync,existsSync} from 'node:fs'
import {createHash} from 'node:crypto'
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v))
const ROOT=new URL('../../',import.meta.url),CONFIG_SHA='d4718ed2bf60de43f1f7a3e3d2d71e157efd0b033b437401687e04b09eed0327',CACHE_SHA='d85734f2a21580114040203372939c7ef2f4a76c43df482e2b63ce52590d1f97'
const C=JSON.parse(readFileSync(new URL('./config.json',import.meta.url))),read=p=>readFileSync(new URL(p,ROOT))
export const selectedProofIdentity=Object.freeze(C.identity)
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');assert.equal(Object.getPrototypeOf(v),Array.isArray(v)?Array.prototype:Object.prototype);const keys=Reflect.ownKeys(v);assert.equal(keys.length,Object.keys(v).length+(Array.isArray(v)?1:0));for(const k of keys){if(Array.isArray(v)&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}if(Array.isArray(v))for(let i=0;i<v.length;i++)assert(Object.hasOwn(v,i))}
function binding(proof,identity){strictJSON(proof);strictJSON(identity);assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),CONFIG_SHA);for(const[p,h]of Object.entries(C.inputSHA256))assert.equal(sha(read(p)),h,p);assert.deepEqual(identity,C.identity);assert.deepEqual(proof,JSON.parse(read(C.actualFull5File)));assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])}
let projectionRuns=0,cachedCalls=0
export function captureProjection(proof,identity){
 assert(!existsSync(new URL('./fixture.json',import.meta.url)),'cache exists; source partition disabled');assert.equal(projectionRuns,0);binding(proof,identity)
 const baseline=JSON.parse(read(C.baselineFixture)),strokes=clone(baseline.strokes),original=strokes[7][0],p=C.partition
 assert.equal(strokes[7].length,1);assert(original.outline.endsWith(' '+p.terminalOriginalP));assert.equal((original.outline.match(/M/g)||[]).length,8);assert.equal(original.revealPath,p.bodyGuide);assert.equal(original.revealWidth,p.bodyWidth);assert.equal(original.weight,p.bodyWeight)
 const body={...original,outline:original.outline.slice(0,-(' '+p.terminalOriginalP).length)}
 const terminal={outline:p.terminalOriginalP,bounds:clone(p.terminalBounds),direction:p.terminalDirection,weight:p.terminalWeight}
 strokes[7]=[body,terminal];assert.equal(strokes.length,18);assert.equal(strokes.flat().length,21);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),45);projectionRuns++
 return{...baseline,strokes,geometrySHA256:digest(strokes),counts:clone(C.newCounts),preparation:{successfulPureSourcePartitionProjectionOperations:1,engineRuns:0,existingFactoryCalls:0,originalCompilerCalls:0},sourcePreservation:{original45PolygonsExactlyOnce:true,original45PolygonUnionPreserved:true,original20RawPreserved:true,bodyGuideWidthWeightUnchanged:true,terminalOriginalPExact:true,terminalNewGuide:false,noNewInk:true,noConnector:true,sourcePartition:true,onlyPen8Changed:true},partition:clone(p),originalGeometrySHA256:baseline.geometrySHA256,originalFixtureSHA256:C.inputSHA256[C.baselineFixture],newInternalMicroclock:true,originalMicroclockClaim:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false}
}
export function compileProgressive(trace,proof,identity){binding(proof,identity);strictJSON(trace);assert.deepEqual(trace,proof.trace);const b=readFileSync(new URL('./fixture.json',import.meta.url));assert.equal(sha(b),CACHE_SHA);const f=JSON.parse(b);assert.equal(digest(f.strokes),f.geometrySHA256);assert.deepEqual(f.identity,identity);cachedCalls++;return f.strokes}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(root,'u9b4b');return compileProgressive(trace,proof,identity)}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls,nativeApproval=false,runtimeApplied=false
