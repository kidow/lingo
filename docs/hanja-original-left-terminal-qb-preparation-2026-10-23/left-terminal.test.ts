import assert from 'node:assert/strict'
import test from 'node:test'
import a from '../hanja-source-original-u7c67-2026-10-23/fixtures.json' with {type:'json'}
import b from '../hanja-source-original-u8627-vs2-2026-10-23/fixtures.json' with {type:'json'}
import {leftSourceContext,leftWholeContext,leftPolicy,leftFrame,LEFT_PREPARATION as P} from './left-terminal.ts'
const clone=(x:unknown)=>JSON.parse(JSON.stringify(x))
test('two original wholes bind one original LEFT terminal without merging source identities',()=>{
 let negatives=0
 for(const[root,e,pen,masks]of [['u7c67',a.u7c67,15,24],['u8627-ue0102',b['u8627-ue0102'],13,22]] as const){
  const context=leftSourceContext(root,e.fullProof,e.identity,e.strokes);assert(context);assert.equal(leftWholeContext(root,e.strokes),context)
  const policy=leftPolicy(context,pen-1,0);assert(policy)
  const segment=e.strokes[pen-1][0],before=JSON.stringify(segment)
  for(const p of[0,1e-6,.03,P.bodyShare-1e-10,P.bodyShare,P.bodyShare+1e-10,(P.bodyShare+1)/2,.9999,.99999999,1]){
   const f=leftFrame(policy,segment,p);assert.equal(f.originalMaskCount,masks);assert.equal(f.originalOuterWeight,31.053594);assert.equal(f.originalInkOutline,segment.outline);assert.equal(f.paintOriginalInkOnce,true);assert.equal(f.newDisplayMicroclock,true);assert.equal(f.tailRect.y,81.3);assert.equal(f.tailRect.height,3);assert(f.tailRect.x>=53.5&&f.tailRect.x<=63.5);assert(f.tailRect.width>=0&&f.tailRect.width<=10)
   if(p<=P.bodyShare){assert.equal(f.tailProgress,0);assert.equal(f.tailRect.width,0)}else{assert.equal(f.bodyProgress,1);assert(f.tailProgress>0)}
   if(p===1){assert.equal(f.tailProgress,1);assert.equal(f.tailRect.x,53.5);assert.equal(f.tailRect.width,10)}
  }
  assert.equal(JSON.stringify(segment),before)
  for(const key of Object.keys(e.fullProof)){const q=clone(e.fullProof);delete q[key];assert.equal(leftSourceContext(root,q,e.identity,e.strokes),null);negatives++}
  for(const key of Object.keys(e.identity)){const q=clone(e.identity);delete q[key];assert.equal(leftSourceContext(root,e.fullProof,q,e.strokes),null);negatives++}
  let reads=0;const q=clone(e.strokes);Object.defineProperty(q[0][0],'weight',{enumerable:true,get(){reads++;return 1}});assert.equal(leftWholeContext(root,q),null);assert.equal(reads,0);negatives++
  assert.equal(leftPolicy({...context},pen-1,0),null);negatives++
  for(const p of[-1,NaN,Infinity,1.1]){assert.throws(()=>leftFrame(policy,segment,p));negatives++}
  assert.throws(()=>leftFrame({...policy},segment,.5));negatives++
  const qsegment=clone(segment);qsegment.weight+=.01;assert.throws(()=>leftFrame(policy,qsegment,.5));negatives++
 }
 assert.equal(leftSourceContext('u7c67',b['u8627-ue0102'].fullProof,b['u8627-ue0102'].identity,b['u8627-ue0102'].strokes),null);negatives++
 assert.equal(leftSourceContext('u8627-ue0102',a.u7c67.fullProof,a.u7c67.identity,a.u7c67.strokes),null);negatives++
 assert.equal(P.nativeApproval,false)
 console.log(JSON.stringify({wholeBindings:2,negativeCases:negatives,getterReads:0,oldInitialMathReplayed:0,newEngineRuns:0,finiteFrames:20,nativeApproval:false}))
})
test('complete LEFT source-white partition covers exactly the four original ink polygons',()=>{
 for(const[root,e,pen]of [['u7c67',a.u7c67,15],['u8627-ue0102',b['u8627-ue0102'],13]] as const){
  const context=leftSourceContext(root,e.fullProof,e.identity,e.strokes),policy=leftPolicy(context,pen-1,0)!;assert(policy)
  const original=e.strokes[pen-1][0],f=leftFrame(policy,original,1)
  assert.equal(f.bodyOutline+' '+f.tailOutline,original.outline)
  assert.equal((f.bodyOutline.match(/M/g)||[]).length,3)
  assert.equal((f.tailOutline.match(/M/g)||[]).length,1)
  const numbers=f.tailOutline.match(/-?\d+(?:\.\d+)?/g)!.map(Number)
  for(let i=0;i<numbers.length;i+=2){assert(numbers[i]>=f.tailRect.x&&numbers[i]<=f.tailRect.x+f.tailRect.width);assert(numbers[i+1]>=f.tailRect.y&&numbers[i+1]<=f.tailRect.y+f.tailRect.height)}
  assert.equal(f.bodyProgress,1);assert.equal(f.tailProgress,1);assert.equal(f.originalOuterWeight,original.weight)
 }
})
