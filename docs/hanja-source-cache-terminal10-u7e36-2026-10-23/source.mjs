import assert from 'node:assert/strict'
import {readFileSync,existsSync} from 'node:fs'
import {createHash} from 'node:crypto'
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v))
const ROOT=new URL('../../',import.meta.url),CONFIG_SHA='3f6d749b9069589bb669b76f62ea852a0571a15872d0344e798c0d8f07bce2d5',CACHE_SHA='37b4dfeb8de7afeaa131da2b7fb73404d679909f83bf182d83f86ed55fadece0'
const C=JSON.parse(readFileSync(new URL('./config.json',import.meta.url))),read=p=>readFileSync(new URL(p,ROOT))
export const selectedProofIdentity=Object.freeze(C.identity)
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');assert.equal(Object.getPrototypeOf(v),Array.isArray(v)?Array.prototype:Object.prototype);const keys=Reflect.ownKeys(v);assert.equal(keys.length,Object.keys(v).length+(Array.isArray(v)?1:0));for(const k of keys){if(Array.isArray(v)&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}if(Array.isArray(v))for(let i=0;i<v.length;i++)assert(Object.hasOwn(v,i))}
function binding(proof,identity){strictJSON(proof);strictJSON(identity);assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),CONFIG_SHA);for(const[p,h]of Object.entries(C.inputSHA256))assert.equal(sha(read(p)),h,p);assert.deepEqual(identity,C.identity);assert.deepEqual(proof,JSON.parse(read(C.actualFull5File)));assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])}
let projectionRuns=0,cachedCalls=0
export function captureProjection(proof,identity){
 assert(!existsSync(new URL('./fixture.json',import.meta.url)),'cache exists; source partition disabled');assert.equal(projectionRuns,0);binding(proof,identity)
 const baseline=JSON.parse(read(C.baselineFixture)),strokes=clone(baseline.strokes),original=strokes[9][1],p=C.partition
 assert.equal(strokes[9].length,2);assert(original.outline.endsWith(' '+p.terminalOriginalP));assert.equal((original.outline.match(/M/g)||[]).length,4);assert.equal(original.revealPath,p.bodyGuide);assert.equal(original.revealWidth,p.bodyWidth);assert.equal(original.weight,p.bodyWeight)
 const body={...original,outline:original.outline.slice(0,-(' '+p.terminalOriginalP).length)}
 const terminal={outline:p.terminalOriginalP,bounds:clone(p.terminalBounds),direction:p.terminalDirection,weight:p.terminalWeight}
 strokes[9]=[strokes[9][0],body,terminal];assert.equal(strokes.length,17);assert.equal(strokes.flat().length,21);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),46);projectionRuns++
 return{...baseline,strokes,geometrySHA256:digest(strokes),counts:clone(C.newCounts),preparation:{successfulPureSourcePartitionProjectionOperations:1,engineRuns:0,existingFactoryCalls:0,originalCompilerCalls:0},sourcePreservation:{original46PolygonsExactlyOnce:true,original46PolygonUnionPreserved:true,original20RawPreserved:true,bodyGuideWidthWeightUnchanged:true,terminalOriginalPExact:true,terminalNewGuide:false,noNewInk:true,noConnector:true,sourcePartition:true,onlyPen10Changed:true},partition:clone(p),originalGeometrySHA256:baseline.geometrySHA256,originalFixtureSHA256:C.inputSHA256[C.baselineFixture],newInternalMicroclock:true,originalMicroclockClaim:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false}
}
export function compileProgressive(trace,proof,identity){binding(proof,identity);strictJSON(trace);assert.deepEqual(trace,proof.trace);const b=readFileSync(new URL('./fixture.json',import.meta.url));assert.equal(sha(b),CACHE_SHA);const f=JSON.parse(b);assert.equal(digest(f.strokes),f.geometrySHA256);assert.deepEqual(f.identity,identity);cachedCalls++;return f.strokes}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(root,'u7e36');return compileProgressive(trace,proof,identity)}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls,nativeApproval=false,runtimeApplied=false
