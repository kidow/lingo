import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const ROOT=new URL('../../',import.meta.url),CONFIG_SHA='b2900c6c4df9c504f29c9365ae462e87f10d154c00f557fb34f0ccb0b03a1534',CACHE_SHA='743933e8b6ec78a2acb56c2327936941a081badd27c9248df18ed236b3773455';
const C=JSON.parse(readFileSync(new URL('./config.json',import.meta.url))),read=p=>readFileSync(new URL(p,ROOT));
export const selectedProofIdentity=Object.freeze(C.identity);
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');assert.equal(Object.getPrototypeOf(v),Array.isArray(v)?Array.prototype:Object.prototype);const keys=Reflect.ownKeys(v);assert.equal(keys.length,Object.keys(v).length+(Array.isArray(v)?1:0));for(const k of keys){if(Array.isArray(v)&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}if(Array.isArray(v))for(let i=0;i<v.length;i++)assert(Object.hasOwn(v,i))}
function binding(proof,identity){strictJSON(proof);strictJSON(identity);assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),CONFIG_SHA);for(const[p,h]of Object.entries(C.inputSHA256))assert.equal(sha(read(p)),h,p);assert.deepEqual(identity,C.identity);assert.deepEqual(proof,JSON.parse(read(C.actualFull5File)));assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);}
let projectionRuns=0,cachedCalls=0;
export function captureProjection(proof,identity){
 assert(!existsSync(new URL('./fixture.json',import.meta.url)),'cache exists; source partition disabled');assert.equal(projectionRuns,0);binding(proof,identity);
 const baseline=JSON.parse(read(C.baselineFixture)),strokes=clone(baseline.strokes),atoms=clone(baseline.atomicStrokes);
 for(const p of C.partitions){
  const original=strokes[p.pen-1][p.mask-1];assert.deepEqual(original,p.originalMask);assert.equal(strokes[p.pen-1].length,2);assert.equal(atoms[p.raw-1].length,1);
  assert(original.outline.endsWith(' '+p.originalTerminalPolygon));assert.equal((original.outline.match(/M/g)||[]).length,4);
  const terminalCall=proof.trace[p.raw-1].at(-1);assert.equal(terminalCall.kind,p.terminalCallKind);assert.deepEqual(terminalCall.args.slice(-2),p.terminalFlags);
  assert.equal(original.revealPath,p.bodyGuide);assert.equal(original.revealWidth,p.bodyWidth);assert.equal(original.weight,p.bodyWeight);
  const body={...original,outline:original.outline.slice(0,-(' '+p.originalTerminalPolygon).length)},tail={outline:p.originalTerminalPolygon,bounds:clone(p.terminalBounds),direction:p.terminalDirection,weight:p.terminalWeight};
  assert.equal((body.outline.match(/M/g)||[]).length,3);strokes[p.pen-1]=[strokes[p.pen-1][0],body,tail];atoms[p.raw-1]=[clone(body),clone(tail)];
 }
 assert.deepEqual(strokes,baseline.sourceGroups.map(g=>g.flatMap(i=>atoms[i])));assert.equal(strokes.length,16);assert.equal(strokes.flat().length,24);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),53);projectionRuns++;
 return{...baseline,atomicStrokes:atoms,strokes,geometrySHA256:digest(strokes),counts:clone(C.newCounts),preparation:{successfulPureSourcePartitionOperations:1,engineRuns:0,existingFactoryCalls:0,originalCompilerCalls:0,originalRawProjectionRuns:0},sourcePreservation:{original53PolygonsExactlyOnce:true,original53PolygonUnionPreserved:true,original22RawPreserved:true,original26CallsPreserved:true,bodyGuideWidthWeightBoundsUnchanged:true,terminalOriginalPolygonsExact:true,terminalNewGuide:false,noNewInk:true,noConnector:true,sourcePartition:true,onlyPens8And13Changed:true,initialCapsAndQQ1ContactUnresolved:true},partitions:clone(C.partitions),originalGeometrySHA256:baseline.geometrySHA256,originalFixtureSHA256:C.inputSHA256[C.baselineFixture],newInternalMicroclock:true,originalMicroclockClaim:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false};
}
export function compileProgressive(trace,proof,identity){binding(proof,identity);strictJSON(trace);assert.deepEqual(trace,proof.trace);const b=readFileSync(new URL('./fixture.json',import.meta.url));assert.equal(sha(b),CACHE_SHA);const f=JSON.parse(b);assert.equal(digest(f.strokes),f.geometrySHA256);assert.deepEqual(f.identity,identity);cachedCalls++;return f.strokes;}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(root,'u7e10');return compileProgressive(trace,proof,identity);}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls,nativeApproval=false,runtimeApplied=false;
