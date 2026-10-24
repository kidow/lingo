import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import * as caps from './hanja-stroke-start-caps-u8596-ue0100.ts'
import * as foot from './hanja-stroke-source-foot-u8596-ue0100.ts'
import * as card from './hanja-stroke-cardinal-contact-u8596-ue0100.ts'
import * as term from './hanja-stroke-original-terminal-u8596-ue0100.ts'

const fixture=JSON.parse(fs.readFileSync(new URL('../docs/hanja-source-original-u8596-ue0100-2026-10-24/fixtures.json',import.meta.url),'utf8'))['u8596-ue0100']
const makers=[caps.makeReviewedU8596Ue0100SourceContext,foot.makeReviewedU8596Ue0100FootSourceContext,card.makeReviewedU8596Ue0100CardinalSourceContext,term.makeReviewedU8596Ue0100TerminalSourceContext]

test('薖 private policies bind the unchanged captured full5 and logical17 source',()=>{
 for(const make of makers)assert(make(fixture.fullProof,fixture.identity,fixture.strokes))
 for(const[path,hash]of Object.entries(caps.REVIEWED_U8596_UE0100_INPUT_SHA256))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),hash)
 assert.equal(fixture.sourceProposal.originalFinalGuideGap.sourceUnits,2.5737909783041824)
})

test('薖 guards reject source-field changes and foreign identities',()=>{
 for(const[index,make]of makers.entries()){
  const changed=structuredClone(fixture.strokes);changed[16][1].outline+=' '
  if(index===3){assert.throws(()=>make(fixture.fullProof,fixture.identity,changed));assert.throws(()=>make(fixture.fullProof,{...fixture.identity,sourceRoot:'foreign'},fixture.strokes))}
  else{assert.equal(make(fixture.fullProof,fixture.identity,changed),null);assert.equal(make(fixture.fullProof,{...fixture.identity,sourceRoot:'foreign'},fixture.strokes),null)}
 }
})

test('薖 three initial-arc certificates retain original precision and explicit proof limits',()=>{
 const context=caps.reviewedU8596Ue0100Context(fixture.strokes)
 assert(context)
 assert.deepEqual(caps.REVIEWED_U8596_UE0100_PROOFS.map(x=>x.pen),[14,15,17])
 for(const p of caps.REVIEWED_U8596_UE0100_PROOFS){
  assert.equal(p.guide,fixture.strokes[p.pen-1][0].revealPath)
  assert.equal(p.initialArcMax,7);assert.equal(p.notFullSweepProof,true);assert.equal(p.PIntersectionConnectivityNotProved,true)
  const policy=caps.reviewedU8596Ue0100Policy(context,p.pen-1,0);assert(policy);assert.deepEqual(policy.segment,fixture.strokes[p.pen-1][0])
 }
 assert.equal(caps.reviewedU8596Ue0100Policy(context,0,0),null)
})

test('薖 source-P cardinal bands require an opaque original predecessor and no path measurement',()=>{
 const context=card.reviewedU8596Ue0100CardinalContext(fixture.strokes);assert(context)
 for(const pen of [6,10,12,16]){
  const policy=card.reviewedU8596Ue0100CardinalPolicy(context,pen-1,1);assert(policy)
  assert.equal(Object.hasOwn(policy.segment,'revealPath'),false)
  for(const p of [0,.000001,.5,1]){const frame=card.sampleReviewedU8596Ue0100CardinalFrame(policy,policy.segment,p,1);assert.equal(frame.UARead,false);assert.equal(frame.originalPDirect,p===1)}
  assert.throws(()=>card.sampleReviewedU8596Ue0100CardinalFrame(policy,policy.segment,.1,0))
 }
})

test('薖 Y-body/LEFT-tail uses the exact two original subpaths and keeps its mask at completion',()=>{
 const context=term.reviewedU8596Ue0100TerminalContext(fixture.strokes);assert(context)
 const policy=term.reviewedU8596Ue0100TerminalPolicy(context,9,2);assert(policy)
 assert.equal(policy.bodyPath+' '+policy.tailPath,policy.segment.outline)
 assert.equal(policy.phaseShare,8/17);assert.equal(policy.bodyAxis,'y-positive');assert.equal(policy.tailAxis,'x-negative')
 for(const p of [0,.000001,.03,policy.phaseShare-1e-10,policy.phaseShare,policy.phaseShare+1e-10,.9,1]){
  const frame=term.sampleReviewedU8596Ue0100TerminalFrame(policy,policy.segment,p,1)
  assert.equal(frame.UARead,false);assert.equal(frame.originalPDirect,false);assert.equal(frame.originalSourceFull,p===1)
  for(const clip of [frame.bodyClip,frame.tailClip])assert(Object.values(clip).every(Number.isFinite))
 }
 const full=term.sampleReviewedU8596Ue0100TerminalFrame(policy,policy.segment,1,1)
 for(const [k,v]of Object.entries({x:82.8,y:78.7,width:8,height:8}))assert(Math.abs(full.bodyClip[k as keyof typeof full.bodyClip]-v)<1e-8)
 for(const [k,v]of Object.entries({x:73.8,y:80.7,width:9,height:3}))assert(Math.abs(full.tailClip[k as keyof typeof full.tailClip]-v)<1e-8)
 assert.throws(()=>term.sampleReviewedU8596Ue0100TerminalFrame(policy,policy.segment,.1,0))
 assert.throws(()=>term.sampleReviewedU8596Ue0100TerminalFrame(policy,policy.segment,NaN,1))
})

test('薖 source-foot certificate uses the actual prior P and preserves the original guide gap',()=>{
 const context=foot.reviewedU8596Ue0100FootContext(fixture.strokes);assert(context)
 const policy=foot.reviewedU8596Ue0100FootPolicy(context,16,1);assert(policy)
 const source=foot.REVIEWED_U8596_UE0100_FOOT_SOURCE,info=source.feet[0]
 assert.equal(info.phaseShare,36936077/909646579);assert(Number.isFinite(info.phaseShare)&&info.phaseShare>0&&info.phaseShare<1)
 assert.equal(info.actualPreviousPContact.rootInsideOriginalPriorP,true);assert.equal(info.triangleCount,5)
 assert.equal(source.sourceGuideGapPreserved,2.5737909783041824)
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(source.triangulations)).digest('hex'),source.footGeometrySHA256)
 assert.deepEqual(policy.segment,fixture.strokes[16][1]);assert.equal(foot.reviewedU8596Ue0100FootPolicy(context,16,0),null)
})
