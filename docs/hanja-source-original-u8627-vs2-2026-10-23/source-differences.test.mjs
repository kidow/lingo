import assert from 'node:assert/strict'
import test from 'node:test'
import {ORIGINAL_U7C67 as a} from '../hanja-source-original-u7c67-2026-10-23/source-context.mjs'
import {ORIGINAL_U8627 as b,originalU8627SourceContext as select,SOURCE_PREPARATION as p} from './source-context.mjs'
test('蘧 own header4 and trace differ from 籧 whole source despite the exact same final QB data',()=>{
 assert.equal(select(b.trace,b.fullProof,b.identity),b)
 assert.deepEqual(b.counts,{logicalPens:21,rawGroups:24,traceCalls:28,polygons:54})
 assert.equal(b.sourceFamily.selectedPrimaryClosureCount,6);assert.equal(b.sourceFamily.capturedRecordCount,6)
 assert.deepEqual(b.fullProof.engineHashes,a.fullProof.engineHashes);assert.equal(Object.keys(b.fullProof.engineHashes).length,8)
 assert.deepEqual(b.fullProof.engineRevision,a.fullProof.engineRevision);assert.deepEqual(b.fullProof.defaults,a.fullProof.defaults)
 assert.deepEqual(b.sourceGroups.at(-1),[8,9]);assert.deepEqual(a.sourceGroups.at(-1),[10,11])
 assert.deepEqual(b.trace[8],a.trace[10]);assert.deepEqual(b.trace[9],a.trace[11])
 assert.notDeepEqual(b.fullProof,a.fullProof);assert.notDeepEqual(b.identity,a.identity)
 assert.deepEqual(b.sourceGroups.slice(0,4),[[0],[1],[3],[2]]);assert.deepEqual(a.sourceGroups.slice(0,4),[[0],[1],[2],[3]])
 let negatives=0
 for(const args of[[a.trace,b.fullProof,b.identity],[b.trace,a.fullProof,b.identity],[b.trace,b.fullProof,a.identity],[b.trace,b.header4,b.identity]]){assert.equal(select(...args),null);negatives++}
 let reads=0;const accessor=JSON.parse(JSON.stringify(b.fullProof));Object.defineProperty(accessor,'groups',{enumerable:true,get(){reads++;return b.fullProof.groups}});assert.equal(select(b.trace,accessor,b.identity),null);assert.equal(reads,0);negatives++
 assert.equal(b.identity.root,'u8627-ue0102');assert.equal(Object.keys(b.identity).length,7)
 for(const k of['nativeApproval','runtimeApplied','registered'])assert.equal(b[k],false)
 assert.equal(p.compilerRuns,0);assert.equal(p.engineRuns,0);assert.equal(p.projectionRuns,0);assert.equal(p.alternateWholeClosureApproved,false)
 console.log(JSON.stringify({differentWholeContexts:true,sameOriginalFinalQAndCIncludingPolygons:true,engineHashPins:8,identityFields:7,primaryClosure:6,pens:21,rawGroups:24,calls:28,polygons:54,newContextPositive:1,negativeCases:negatives,accessorReads:reads,compiler:0,engine:0,nativeApproval:false}))
})
