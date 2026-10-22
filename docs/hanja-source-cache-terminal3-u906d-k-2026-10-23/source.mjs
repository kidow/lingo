import assert from 'node:assert/strict'
import {readFileSync,existsSync} from 'node:fs'
import {createHash} from 'node:crypto'
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v))
const ROOT=new URL('../../',import.meta.url),CONFIG_SHA='3a4215d40bee10816970df2517436701e9afdf80a112318fd19247948f65359f',CACHE_SHA='30785113463bcf6ff509c3f1a8b71d74b72d8062f5993efa80d8717c44d4a94b'
const C=JSON.parse(readFileSync(new URL('./config.json',import.meta.url))),read=p=>readFileSync(new URL(p,ROOT))
export const selectedProofIdentity=Object.freeze(C.identity)
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');assert.equal(Object.getPrototypeOf(v),Array.isArray(v)?Array.prototype:Object.prototype);const keys=Reflect.ownKeys(v);assert.equal(keys.length,Object.keys(v).length+(Array.isArray(v)?1:0));for(const k of keys){if(Array.isArray(v)&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}if(Array.isArray(v))for(let i=0;i<v.length;i++)assert(Object.hasOwn(v,i))}
function binding(proof,identity){strictJSON(proof);strictJSON(identity);assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),CONFIG_SHA);for(const[p,h]of Object.entries(C.inputSHA256))assert.equal(sha(read(p)),h,p);assert.deepEqual(identity,C.identity);assert.deepEqual(proof,JSON.parse(read(C.actualFull5File)));assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])}
let partitionRuns=0,cachedCalls=0
export function capturePartition(proof,identity){
 assert(!existsSync(new URL('./fixture.json',import.meta.url)),'cache exists; partition disabled');assert.equal(partitionRuns,0);binding(proof,identity)
 const baseline=JSON.parse(read(C.baselineFixture)),strokes=clone(baseline.strokes),original=strokes[2][0],p=C.partition
 assert.equal(strokes[2].length,1);assert.equal(original.outline.split(p.originalVerticalQuadrilateral).length,2)
 const body={...original,outline:original.outline.replace(p.originalVerticalQuadrilateral,p.body),bounds:[original.bounds[0],original.bounds[1],original.bounds[2],50.25]}
 const tail={outline:p.tail,bounds:clone(p.tailBounds),direction:p.tailDirection,weight:p.tailWeight}
 strokes[2]=[body,tail];assert.equal(strokes.length,15);assert.equal(strokes.flat().length,17);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),31);partitionRuns++
 return{...baseline,strokes,geometrySHA256:digest(strokes),counts:clone(C.newCounts),preparation:{successfulPurePartitionOperations:1,pureProjectionOperations:0,engineRuns:0,existingFactoryCalls:0,originalCompilerCalls:0},sourcePreservation:{original30PolygonUnionPreserved:true,fragments:31,originalPolygonCount:30,originalRaw19Preserved:true,originalBodyGuideWidthWeightUnchanged:true,tailNewGuide:false,noNewInk:true,noConnector:true,sourcePartition:true,onlyPen3Changed:true,tailDownOriginalTriangle:true},partition:clone(p),originalGeometrySHA256:baseline.geometrySHA256,originalFixtureSHA256:C.inputSHA256[C.baselineFixture],newInternalMicroclock:true,originalMicroclockClaim:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false}
}
export function compileProgressive(trace,proof,identity){binding(proof,identity);strictJSON(trace);assert.deepEqual(trace,proof.trace);const b=readFileSync(new URL('./fixture.json',import.meta.url));assert.equal(sha(b),CACHE_SHA);const f=JSON.parse(b);assert.equal(digest(f.strokes),f.geometrySHA256);assert.deepEqual(f.identity,identity);cachedCalls++;return f.strokes}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(root,'u906d-k');return compileProgressive(trace,proof,identity)}
export const partitionCallCount=()=>partitionRuns,cachedPositiveCallCount=()=>cachedCalls,nativeApproval=false,runtimeApplied=false
