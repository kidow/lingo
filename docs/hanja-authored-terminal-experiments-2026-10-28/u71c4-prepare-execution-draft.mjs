import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import {outlineStartClip} from '../../lib/hanja-stroke-outline.ts'
const base=new URL('../../',import.meta.url),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=p=>fs.readFileSync(new URL(p,base))
const inputs={"docs/hanja-source-raw-compare-u71c4-terminal0-2026-10-28/config.json":"1f73afba825dcf56153d24564916a71faf2dd9630ccc2a41619e6f46482f3766","docs/hanja-goal-glyphwiki-batch725-2026-10-12/review.json":"ffde0a0898d7690da79d6efc7c26674ad8926f60b1f4d86b8c6d4aa98292e0b4","docs/hanja-goal-glyphwiki-batch725-2026-10-12/engine-whole-u71c4.json":"6063cd871c6e08b229f0140032ebebf54e16abd7c5e76369a7f4730819c4acb4","docs/hanja-goal-glyphwiki-batch725-2026-10-12/engine-proof.json":"fd974459c33b0ee6b7b7de7281843d9dd9f11265b84f330ce25660a048d182c8","docs/hanja-source-full5-three-candidates-2026-10-28/engine-whole-u71c4.json":"0c217263017c7fa574185ab550dac4b16aa561bb5a63cf77a24625a57a65f30d","docs/hanja-authored-terminal-experiments-2026-10-28/engine-whole-local_u71c4_terminal0_20261028.json":"fff82a46568c51ba1ea2f4b0d4ba179ced0d927dca086368513a3bc7a156a025","docs/hanja-authored-terminal-experiments-2026-10-28/sources-local-u71c4-terminal0.json":"553c2f118f345f1fafcdee82345fcfd24e115f3014c45182745343d1549f765a","docs/hanja-source-raw-compare-u71c4-terminal0-2026-10-28/native-static-review.json":"193d4ef0223f5db6192db56b6293b57e74913b5dcb6fd149a45df01589c11054","docs/hanja-authored-donor-u97b9-u7f96-2026-10-28/prepare-execution-draft.mjs":"e8bef330ac9b0d1fb207c2d6a1320cbf1d4712afb79398ad32dfa0334b14a2ab","lib/hanja-stroke-outline.ts":"b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40"}
for(const [p,h] of Object.entries(inputs))assert.equal(sha(read(p)),h,p)
const config=JSON.parse(read("docs/hanja-source-raw-compare-u71c4-terminal0-2026-10-28/config.json")),review=JSON.parse(read("docs/hanja-goal-glyphwiki-batch725-2026-10-12/review.json")),original=JSON.parse(read(config.sourceRoots.original.file)),authored=JSON.parse(read(config.sourceRoots.authored.file)),oldWhole=JSON.parse(read("docs/hanja-goal-glyphwiki-batch725-2026-10-12/engine-whole-u71c4.json")),oldProof=JSON.parse(read("docs/hanja-goal-glyphwiki-batch725-2026-10-12/engine-proof.json"))
const CHANGED_RAW=2,PENS=16,RAW_COUNT=18,CHANGED_LOGICAL=2
assert.deepEqual(original.groups,oldWhole.groups);assert.deepEqual(original.trace,oldWhole.trace);assert.deepEqual(original.defaults,oldWhole.defaults)
for(const k of ['engineRevision','engineHashes','defaults'])assert.deepEqual(original[k],oldProof[k])
for(const k of ['engineRevision','engineHashes','defaults'])assert.deepEqual(authored[k],original[k])
assert.equal(authored.groups.length,RAW_COUNT);assert.equal(authored.trace.length,RAW_COUNT)
const mapping=review.sourceGroupsZeroBased
assert.equal(mapping.length,PENS);assert.deepEqual(mapping.flat().sort((a,b)=>a-b),Array.from({length:RAW_COUNT},(_,i)=>i))
const changed=Array.from({length:RAW_COUNT},(_,i)=>i).filter(i=>JSON.stringify(original.groups[i])!==JSON.stringify(authored.groups[i])||JSON.stringify(original.trace[i])!==JSON.stringify(authored.trace[i]))
assert.deepEqual(changed,[CHANGED_RAW]);assert(mapping[CHANGED_LOGICAL-1].includes(CHANGED_RAW))
assert.deepEqual(review.approvedStaticDirections,Array.from({length:PENS},(_,i)=>i+1).filter(i=>i!==CHANGED_LOGICAL))
assert.equal(review.progressiveFramesApproved,0);assert.equal(review.allStrokesReviewed,false)
for(let i=0;i<RAW_COUNT;i++){assert.deepEqual(authored.trace[i].flatMap(c=>c.polygons),authored.groups[i].polygons);if(i!==CHANGED_RAW){assert.deepEqual(authored.groups[i],original.groups[i]);assert.deepEqual(authored.trace[i],original.trace[i])}}
function segment(polygons,direction,weight){
 assert(polygons.length);const points=polygons.flat();assert(points.every(p=>p.off===0&&Number.isFinite(p.x)&&Number.isFinite(p.y)))
 const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
 const xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
 return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
}

const facts=[],strokes=mapping.map((indices,logical)=>indices.flatMap(raw=>{
 const calls=authored.trace[raw]
 return calls.map((call,primitive)=>{
 const n={cdDrawLine:2,cdDrawCurve:3,cdDrawBezier:4}[call.kind];assert(n);const points=Array.from({length:n},(_,i)=>[call.args[i*2]/2,call.args[i*2+1]/2]),[s,...rest]=points,e=points.at(-1)
 facts.push({logical:logical+1,raw,primitive,kind:call.kind,sourceControlPoints100:points,flags:call.args.slice(n*2),authored:raw===CHANGED_RAW})
 if(n===2){const direction=s[0]===e[0]?(e[1]>s[1]?'down':'up'):(e[0]>s[0]?'right':'left');return segment(call.polygons,direction,Math.hypot(e[0]-s[0],e[1]-s[1]))}
 const next=rest.find(q=>q[0]!==s[0]||q[1]!==s[1]);assert(next);const length=Math.hypot(next[0]-s[0],next[1]-s[1]),unit=[(next[0]-s[0])/length,(next[1]-s[1])/length],padded=[s[0]-7*unit[0],s[1]-7*unit[1]]
 const originalPath='M'+s.join(' ')+(n===3?' Q':' C')+rest.map(p=>p.join(' ')).join(' '),path='M'+padded.join(' ')+' L'+s.join(' ')+(n===3?' Q':' C')+rest.map(p=>p.join(' ')).join(' ')
 assert.equal((path.match(/M/g)||[]).length,1);assert(!path.includes('Z'))
 const controlPolygonLength=points.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0),numericUpperMargin=1e-9,weight=7+controlPolygonLength+numericUpperMargin
 const out={...segment(call.polygons,'curve',weight),revealPath:path,revealWidth:14}
 const projection=out.bounds,all=call.polygons.flat().map(p=>[p.x/2,p.y/2]),minProjection=Math.min(...all.map(p=>p[0]*unit[0]+p[1]*unit[1])),firstProjection=s[0]*unit[0]+s[1]*unit[1]
 out.revealStartGate={unit,minProjection,firstProjection,padding:7,until:7/weight,bounds:projection}
 assert(weight>7&&out.revealStartGate.until>0&&out.revealStartGate.until<1);assert.equal(typeof outlineStartClip(out,0),'string');assert.equal(outlineStartClip(out,out.revealStartGate.until),undefined);assert.equal(outlineStartClip(out,1),undefined)
 facts.at(-1).curveCandidatePolicy={originalPath100:originalPath,paddedGuidePath:path,padding100:7,width100:14,lengthMethod:'padding7 + source Bezier control-polygon length + explicit numeric upper margin1e-9',controlPolygonLength,numericUpperMargin,weight,until:7/weight,singleMOpenContinuousPath:true,releaseSupport:'Bezier arc length is at most control-polygon length; at p=7/weight true guide distance is at most7, so its round-cap leading projection is at most firstProjection+7. This supports removing the gate without exposing ink beyond the already reachable cap; author display timing is not publisher timing.',approved:false}
 return out
 })
}))
assert.equal(strokes.length,PENS)
const fixture={schema:'hanja-ownstroke-actual-R-execution-draft/v1',date:'2026-10-28',glyph:"燄",variantId:"u71c4-terminal0-padded7-source-start-gate-draft",locallyAuthoredRoot:true,mixedParts:false,originalWhole:false,isOriginalEngineCapture:false,isActualLocallyAuthoredEngineCapture:true,sourceTraceDescribesAuthoredRecipient:true,inputSHA256:inputs,logicalRawGroupsZeroBased:mapping,normalization:{from:200,to:100,applications:1,yFlip:false,winding:'legacy per-polygon positive area before same-primitive compound; no coordinate change'},strokes,approval:{whole:false,mapping:false,direction:false,timing:false,native:false,runtime:false},policyStatus:'Executable draft only. Authored terminal0 public full5 retains its exact source polygons, trace and flags. Existing static direction evidence for unchanged logical pens is reused only at that scope. Cardinal policy, curve width14, padding7 and source start gate remain unapproved display proposals, not publisher microclock equivalence.'}
const check={schema:'hanja-authored-terminal-R-draft-code-check/v1',status:'PASS-limited-code-only',inputSHA256:inputs,logicalPens:PENS,segments:strokes.flat().length,curves:strokes.flat().filter(x=>x.direction==='curve').length,changedRaw:changed,changedLogical:[CHANGED_LOGICAL],otherRawGeometryPreserved:RAW_COUNT-1,otherLogicalPensPreserved:PENS-1,canonicalMappingCoverage:true,priorStaticDirectionsReused:review.approvedStaticDirections,priorProgressiveApproval:false,facts,policies:{curveWidth14:'legacy proposal, not reviewed approval',curvePadding7:'one radius source-start extension; original Q/C controls retained',guideLength:'padding7 + source Bezier control-polygon upper bound +1e-9 numeric margin',startClipHelper:'outlineStartClip unchanged',originalMicroTimingEquivalent:false},nativeApproval:false,runtimeApplied:false,requiredNativeReview:['domestic changed logical pen source clock and authored direction','all actualR starts, gate releases, transitions, contacts and fine endings','whole and replay']}
export {fixture,check}
console.log(JSON.stringify({glyph:fixture.glyph,pens:PENS,segments:check.segments,curves:check.curves,changedRaw:changed,nativeApproval:false}))
