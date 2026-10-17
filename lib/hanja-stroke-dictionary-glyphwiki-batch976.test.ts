import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch976.json' with {type:'json'}
import {loadGlyphWikiBatch976Strokes,HANJA_DICTIONARY_GLYPHWIKI_BATCH976_STROKES} from './hanja-stroke-dictionary-glyphwiki-batch976.ts'
import {compileProgressive,compileSourceWhole,selectedProofIdentity,candidateWholeProofs} from '../docs/hanja-goal-glyphwiki-batch976-2026-10-13/progressive.mjs'
import {compileDomesticOrder,DOMESTIC_ORDER} from '../docs/hanja-goal-glyphwiki-batch976-2026-10-13/domestic-order-progressive.mjs'
const base=new URL('../docs/hanja-goal-glyphwiki-batch976-2026-10-13/',import.meta.url)
const read=(f:string)=>readFileSync(new URL(f,base)),obj=(f:string)=>JSON.parse(read(f).toString()),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex')
const id=selectedProofIdentity,header=obj(id.sourceHeaderFile),body=obj(id.sourceProofFile),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}
const profile=candidateWholeProofs.find(c=>c.identity.sourceRoot==='u615d-ue0102')!,review=obj('native-review.json')
const order=[1,3,4,5,6,7,8,9,10,11,2,12,13,14,15]
test('慝 direct reviewed literal preserves the approved fifteen complete pens',()=>{
  const e=loadGlyphWikiBatch976Strokes(reviewed)[0]
  assert.deepEqual(HANJA_DICTIONARY_GLYPHWIKI_BATCH976_STROKES,reviewed)
  assert.equal(e.glyph,'慝');assert.equal(e.paths.length,15);assert.equal(e.outlines!.flat().length,16)
  assert.deepEqual(e.sourceStrokeIndices,order.map(n=>profile.sourceGroups[n-1][0]+1))
})
test('慝 full5 and exact five-field identity retain all original mask arrays through permutation',()=>{
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(sha(JSON.stringify(proof)),'3fb49ef872184ff426053823946b397397b53e0d5141aaa2780056539a9aa31a')
  assert.deepEqual(Object.keys(id).sort(),['sourceHeaderFile','sourceHeaderFileSha256','sourceProofFile','sourceProofFileSha256','sourceRoot'])
  const before=JSON.stringify(proof),original=compileSourceWhole(id.sourceRoot,proof.trace,proof,id),out=compileDomesticOrder(id.sourceRoot,proof.trace,proof,id)
  assert.equal(JSON.stringify(proof),before);assert.deepEqual(DOMESTIC_ORDER,order)
  assert.equal(sha(JSON.stringify(original)),'ecf7ef06d603fb3875d4b3af36aaa16bc69ff3c939bb5a7cc39a90b8a74c87c7')
  assert.equal(sha(JSON.stringify(out)),'ba67d9cad7d1b18e526fbdc4fbdd811f76abad6f3ceea7b05f22b7aae512b3af')
  assert.deepEqual(out,order.map(n=>original[n-1]));assert.deepEqual(out,reviewed[0].outlines)
  assert.deepEqual(compileProgressive(proof.trace,proof,id),original)
  assert.deepEqual(reviewed[0].paths,out.map(p=>p.map(m=>m.outline).join(' ')))
  assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof]))
  assert.throws(()=>Reflect.apply(compileSourceWhole,null,[id.sourceRoot,proof.trace,proof]))
  assert.throws(()=>Reflect.apply(compileDomesticOrder,null,[id.sourceRoot,proof.trace,proof]))
  for(const key of Object.keys(id))assert.throws(()=>compileDomesticOrder(id.sourceRoot,proof.trace,proof,{...id,[key]:'changed'}))
  assert.throws(()=>compileDomesticOrder(id.sourceRoot,proof.trace,proof,{...id,sourceProofFile:id.sourceProofFile.slice(2)}))
  assert.throws(()=>compileDomesticOrder(id.sourceRoot,proof.trace,proof,{...id,sourceHeaderFile:id.sourceHeaderFile.slice(2)}))
  const{sourceProofFileSha256,...rest}=id
  assert.throws(()=>Reflect.apply(compileDomesticOrder,null,[id.sourceRoot,proof.trace,proof,{...rest,sourceProofFileSHA256:sourceProofFileSha256}]))
})
test('慝 changed reviewed masks, approved order, provenance or raw license are rejected',()=>{
  for(const mutate of [
    (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=999},
    (e:typeof reviewed[number])=>{e.outlines[0][0].direction='left'},
    (e:typeof reviewed[number])=>{e.outlines[0][0].weight+=1},
    (e:typeof reviewed[number])=>{e.geometrySource='0'.repeat(64)},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
    (e:typeof reviewed[number])=>{e.geometryLicense.revision='changed'},
  ]){const b=structuredClone(reviewed);mutate(b[0]);assert.throws(()=>loadGlyphWikiBatch976Strokes(b))}
})
test('慝 actual native evidence distinguishes rejected order, reused fine checks and selected whole approval',()=>{
  for(const[f,h]of Object.entries({...review.originalInputBytePins,...review.additionalProtectedBytePins,...review.candidatePreparationBytePins}))assert.equal(sha(read(f)),h)
  assert.equal(review.evidenceSource,'root-native-IAB');assert.equal(review.wholeVariantsReviewed,7)
  assert.deepEqual(review.compatibleWholeRoots,['u615d-ue0102'])
  assert.equal(review.actualWholeObservations.filter((x:{compatible:boolean|null})=>x.compatible===true).length,1)
  assert.equal(review.initialDirectionComparison.approved,false)
  assert.equal(review.rejectedEarlierRootPermutation.status,'rejected-after-root-native-pairs-comparison')
  assert.deepEqual(review.domesticOrder,order);assert.equal(review.finalDirectionsApproved,15)
  assert.equal(review.progressiveFramesApproved,135)
  assert.deepEqual(review.curveFineChecks.map((x:{pen:number})=>x.pen),[6,8,9,11,12,13,14,15])
  assert(review.curveFineChecks.every((x:{passed:boolean;endpointVisible:boolean;noCompletionPop:boolean;size:number})=>x.passed&&x.endpointVisible&&x.noCompletionPop&&x.size===520))
  assert.deepEqual(review.curveFineChecks.filter((x:{correctedFinalEndpointRechecked:boolean})=>x.correctedFinalEndpointRechecked).map((x:{pen:number})=>x.pen),[9,11])
  assert.equal(review.maskBoundaryObservations[0].start,.8128001786575191)
  assert.equal(review.maskBoundaryObservations[0].additionalProbeObservedAX,'95.0000%')
  assert.equal(review.maskBoundaryObservations[0].prefixPolygonSetUnchanged,true)
  assert.deepEqual(review.actualReplayProgress.map((x:{observedPercent:number})=>x.observedPercent),[3.0487,3.0537])
  assert(review.actualReplayProgress.every((x:{completedAX:number;completedScreenshot:boolean;passed:boolean})=>x.completedAX===100&&x.completedScreenshot&&x.passed))
  assert.equal(review.nativeControlContract.inputDivision,100);assert.equal(review.nativeControlContract.sliderStep,.0001)
  assert.equal(review.sourceOrderChanged,true);assert.equal(review.geometryChanged,false);assert.equal(review.appUIAutoplayVerifiedThisBatch,false)
  const e=reviewed[0],source=obj('sources.json'),bytes=read('../../public/hanja-strokes/glyphwiki/u615d.json'),g=JSON.parse(bytes.toString())
  assert.equal(e.geometrySource,sha(bytes));assert.deepEqual(g.records,source.records);assert.deepEqual(g.providerVersions,source.providerVersions)
  assert.deepEqual(g.drawTrace,proof.trace);assert.deepEqual(g.domesticOrder,order)
  assert.deepEqual(g.sourceGroups,order.map(n=>profile.sourceGroups[n-1]));assert.deepEqual(g.proofAttribution.selectedProofIdentity,id)
  assert.equal(e.geometryLicense.spdx,'LicenseRef-GlyphWiki');assert.equal(e.geometryLicense.sourceUrl,source.archive.url)
  const notice=read('../../public/hanja-strokes/glyphwiki/NOTICE-u615d.md').toString()
  assert(notice.includes(e.geometryLicense.revision));assert(notice.includes(e.geometryLicense.modifications))
  for(const k of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])assert.equal((e.sourceReference as Record<string,string>)[k],sha(read('native-review.json')))
})
