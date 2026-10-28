import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import {fixture as previousFixture,check as previousCheck} from './prepare-execution-draft.mjs'
import {outlineStartClip} from '../../lib/hanja-stroke-outline.ts'
const folder='docs/hanja-authored-donor-u97b9-u7f96-2026-10-28/',base=new URL('../../',import.meta.url),read=p=>fs.readFileSync(new URL(p,base)),sha=b=>crypto.createHash('sha256').update(b).digest('hex')
const preserved={
 [folder+'prepare-execution-draft.mjs']:'e8bef330ac9b0d1fb207c2d6a1320cbf1d4712afb79398ad32dfa0334b14a2ab',
 [folder+'fixtures-execution-draft.json']:'b8a85be0077a8747c7f6339c1a26f10a5d81c6939a14ed19e10620feb3e313ed',
 [folder+'execution-draft-check.json']:'7aa6b3fde49bf503837537064985f3eec2a18ad0faca6a91498e1692e03604d6'
}
for(const [p,h]of Object.entries(preserved))assert.equal(sha(read(p)),h)
assert.deepEqual(previousFixture,JSON.parse(read(folder+'fixtures-execution-draft.json')))
assert.deepEqual(previousCheck,JSON.parse(read(folder+'execution-draft-check.json')))
const fixture=structuredClone(previousFixture),check=structuredClone(previousCheck),s=fixture.strokes[15][1],old=previousFixture.strokes[15][1]
assert.equal(s.revealPath,'M51.85875 78.59 L51.85875 85.59 Q51.85875 90.59 46.85875 90.59')
assert.equal(s.revealWidth,14);assert.equal(s.weight,17.000000001)
s.revealPath='M51.85875 77.59 L51.85875 85.59 Q51.85875 90.59 46.85875 90.59'
s.revealWidth=16;s.weight=8+10+1e-9;s.revealStartGate.padding=8;s.revealStartGate.until=8/s.weight
assert.equal(s.outline,old.outline);assert.deepEqual(s.bounds,old.bounds)
assert.deepEqual(s.revealStartGate.unit,old.revealStartGate.unit)
assert.equal(s.revealStartGate.minProjection,old.revealStartGate.minProjection);assert.equal(s.revealStartGate.firstProjection,old.revealStartGate.firstProjection)
assert.equal(typeof outlineStartClip(s,0),'string');assert.equal(outlineStartClip(s,s.revealStartGate.until),undefined)
for(let p=0;p<20;p++)for(let m=0;m<fixture.strokes[p].length;m++)if(p!==15||m!==1)assert.deepEqual(fixture.strokes[p][m],previousFixture.strokes[p][m])
assert.equal(fixture.strokes.flat().filter(v=>v.direction==='curve'&&v.revealWidth===14).length,5)
fixture.variantId='u97b9-u7f96-up-donor-pen16mask2-width16-pad8-draft'
fixture.inputSHA256={...fixture.inputSHA256,...preserved}
fixture.policyStatus='Only pen16/mask2 uses width16/padding8 with its unchanged original Q and filled polygons; other five source curves remain width14/padding7. All timing, direction, native and runtime approvals remain false.'
check.inputSHA256=fixture.inputSHA256
check.executionVariantDelta={pen:16,mask:2,raw:18,primitive:1,previousWidth:14,width:16,previousPadding:7,padding:8,previousGuide:old.revealPath,newGuide:s.revealPath,weight:s.weight,until:s.revealStartGate.until,originalQControlsPreserved:true,filledPolygonsUnchanged:true,otherLogicalPensUnchanged:19,otherSegmentsUnchanged:25,nativeApproved:false}
check.fullGuideCoverageFacts={scope:'Original two polygons versus full padded line plus original quadratic guide, with dash and start clip removed; not temporal or raster approval',footWitness100:[39.85,87.55],closestQuadraticEndpoint100:[46.85875,90.59],witnessDistance:7.639645054745674,width14Radius7Insufficient:true,boundarySampleStepMax:.002,boundaryDistanceUpper:7.640645054745674,wholePolygonDistanceUpper:7.930168513527987,method:'Distance-to-guide is 1-Lipschitz. Fan triangles recursively subdivided; centroid exact quadratic/line nearest distance plus maximum centroid-to-vertex distance bounds each triangle. Union covers both original polygons.',trianglesVisited:46,maxDepth:3,width16Radius8SufficientForFullGuide:true,width18AlsoSufficientForFullGuide:true,proofReusedFromUnchangedPublicGeometry:true,nativeApproval:false}
const fact=check.facts.find(v=>v.logical===16&&v.primitive===1);assert(fact)
Object.assign(fact.curveCandidatePolicy,{paddedGuidePath:s.revealPath,padding100:8,width100:16,weight:s.weight,until:s.revealStartGate.until,lengthMethod:'padding8 + unchanged source Q control-polygon length10 + explicit numeric upper margin1e-9',releaseSupport:'Padding equals radius8; until8/weight is an unapproved source-start display policy. Fresh actualR gate-release and residual observation required.',approved:false})
check.requiredNativeReview=['Only changed pen16/mask2 compact growth, padding8 gate release and full-guide residual','Pen16 changed compound boundary and natural replay','Other unchanged evidence remains historical and does not approve this changed mask']
for(const v of Object.values(fixture.approval))assert.equal(v,false)
export {fixture,check}
console.log(JSON.stringify({pen:16,mask:2,width:16,padding:8,otherSegmentsUnchanged:25,nativeApproval:false}))
