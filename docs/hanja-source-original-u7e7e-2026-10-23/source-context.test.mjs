import assert from 'node:assert/strict'
import test from 'node:test'
import {ORIGINAL_U7E7E as s,originalU7e7eSourceContext as select,SOURCE_PREPARATION as p} from './source-context.mjs'
const clone=x=>JSON.parse(JSON.stringify(x))
test('繾 exact original header4 plus separate trace context preserves all source fields',()=>{
 assert.equal(select(s.trace,s.fullProof,s.identity),s)
 assert.equal(select(s.trace,s.header4,s.identity),null)
 let negatives=1
 for(const mutate of[x=>{delete x.proof.trace},x=>{delete x.proof.engineHashes['curve.js']},x=>{x.proof.engineHashes['curve.js']='bad'},x=>{x.proof.groups[0].extra=true},x=>{x.proof.defaults.extra=true},x=>{x.trace[0][0].args[0]+=.01},x=>{x.identity.root='u8627'},x=>{x.identity.headerFileSHA256='bad'},x=>{delete x.identity.traceFile},x=>{x.proof.trace[11][0].args[0]+=.01}]){
  const x={trace:clone(s.trace),proof:clone(s.fullProof),identity:clone(s.identity)};mutate(x);assert.equal(select(x.trace,x.proof,x.identity),null);negatives++
 }
 let reads=0;const accessor=clone(s.fullProof);Object.defineProperty(accessor,'groups',{enumerable:true,get(){reads++;return s.fullProof.groups}});assert.equal(select(s.trace,accessor,s.identity),null);assert.equal(reads,0);negatives++
 assert.deepEqual(Object.keys(s.fullProof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(Object.keys(s.fullProof.engineHashes).length,8);assert.equal(Object.keys(s.identity).length,7)
 assert.deepEqual(s.counts,{logicalPens:20,rawGroups:27,traceCalls:27,polygons:49})
 assert.deepEqual(s.sourceGroups[19],[12,13]);assert.equal(s.trace[12][0].kind,'cdDrawCurve');assert.equal(s.trace[13][0].kind,'cdDrawBezier')
 assert.deepEqual(s.trace[12][0].args.slice(4,6),[100.2,154]);assert.deepEqual(s.trace[13][0].args.slice(0,2),[98.92,152])
 assert.equal(s.sourceFamily.selectedPrimaryClosureCount,5);assert.equal(s.sourceFamily.capturedRecordCount,5)
 assert(Object.isFrozen(s.fullProof.groups[0].polygons));assert(Object.isFrozen(s.trace[0][0].args))
 for(const k of['nativeApproval','runtimeApplied','registered']){assert.equal(s[k],false);assert.equal(p[k],false)}
 assert.equal(p.explicitRAMHeader4PlusTrace,true);assert.equal(p.archiveFull5FileCreated,false);assert.equal(p.engineRuns,0);assert.equal(p.projectionRuns,0)
 console.log(JSON.stringify({sourceContextPass:true,negativeCases:negatives,accessorReads:reads,primaryClosure:5,header4:true,separateTrace:true,engineHashes:8,identityFields:7,rawGroups:27,calls:27,polygons:49,compiler:0,engine:0,projection:0,oldHoldRetained:true,nativeApproval:false}))
})

