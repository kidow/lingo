import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import {outlineStartClip} from '../../lib/hanja-stroke-outline.ts'
const base=new URL('../../',import.meta.url),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=p=>fs.readFileSync(new URL(p,base))
const inputs={"docs/hanja-source-raw-compare-u9dd6-terminal0-2026-10-28/config.json":"b5df756b9ad4e8e596e80126e25384b97e25bb72af8145891e535e8a6e9ddb7d","docs/hanja-goal-glyphwiki-batch736-2026-10-12/review.json":"5d3f719e19d9b585e5c4a41c85a7fb5213abd8fc2b2314eba0e92cbd7fc727d3","docs/hanja-goal-glyphwiki-batch736-2026-10-12/engine-whole-u9dd6.json":"62d7abce8b2d2999ccefbe546620c978bf1fb14a7caf831e001881a81e0fc6a7","docs/hanja-goal-glyphwiki-batch736-2026-10-12/engine-proof.json":"2262b8717207eae1974133593880bb4025e09528511a62af91e9adffdea41f6d","docs/hanja-source-full5-three-candidates-2026-10-28/engine-whole-u9dd6.json":"4bb1b5eaf9d08ebcfe61d82e99f9dadead4ac08bbcb546d60fcbea8d2bbd9bb2","docs/hanja-authored-terminal-experiments-2026-10-28/engine-whole-local_u9dd6_terminal0_20261028.json":"aaece83806e7006a57b453316234a41a29f9645d4e3af00b56ba5be29d2c4781","docs/hanja-authored-terminal-experiments-2026-10-28/sources-local-u9dd6-terminal0.json":"79c86b27120e9e46f12e3f45fc12599d30e6b1c2e0f5d81725b2bce5e42bdb00","docs/hanja-source-raw-compare-u9dd6-terminal0-2026-10-28/native-static-review.json":"1d9cd546ee20b33c4cf9a06828c83f32e6c0b141a51ca202c2db29371871e15c","docs/hanja-authored-donor-u97b9-u7f96-2026-10-28/prepare-execution-draft.mjs":"e8bef330ac9b0d1fb207c2d6a1320cbf1d4712afb79398ad32dfa0334b14a2ab","lib/hanja-stroke-outline.ts":"b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40"}
for(const [p,h] of Object.entries(inputs))assert.equal(sha(read(p)),h,p)
const config=JSON.parse(read("docs/hanja-source-raw-compare-u9dd6-terminal0-2026-10-28/config.json")),review=JSON.parse(read("docs/hanja-goal-glyphwiki-batch736-2026-10-12/review.json")),original=JSON.parse(read(config.sourceRoots.original.file)),authored=JSON.parse(read(config.sourceRoots.authored.file)),oldWhole=JSON.parse(read("docs/hanja-goal-glyphwiki-batch736-2026-10-12/engine-whole-u9dd6.json")),oldProof=JSON.parse(read("docs/hanja-goal-glyphwiki-batch736-2026-10-12/engine-proof.json"))
const CHANGED_RAW=10,PENS=22,RAW_COUNT=27,CHANGED_LOGICAL=9
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
const fixture={schema:'hanja-ownstroke-actual-R-execution-draft/v1',date:'2026-10-28',glyph:"鷖",variantId:"u9dd6-terminal0-padded7-source-start-gate-draft",locallyAuthoredRoot:true,mixedParts:false,originalWhole:false,isOriginalEngineCapture:false,isActualLocallyAuthoredEngineCapture:true,sourceTraceDescribesAuthoredRecipient:true,inputSHA256:inputs,logicalRawGroupsZeroBased:mapping,normalization:{from:200,to:100,applications:1,yFlip:false,winding:'legacy per-polygon positive area before same-primitive compound; no coordinate change'},strokes,approval:{whole:false,mapping:false,direction:false,timing:false,native:false,runtime:false},policyStatus:'Executable draft only. Authored terminal0 public full5 retains its exact source polygons, trace and flags. Existing static direction evidence for unchanged logical pens is reused only at that scope. Cardinal policy, curve width14, padding7 and source start gate remain unapproved display proposals, not publisher microclock equivalence.'}
const check={schema:'hanja-authored-terminal-R-draft-code-check/v1',status:'PASS-limited-code-only',inputSHA256:inputs,logicalPens:PENS,segments:strokes.flat().length,curves:strokes.flat().filter(x=>x.direction==='curve').length,changedRaw:changed,changedLogical:[CHANGED_LOGICAL],otherRawGeometryPreserved:RAW_COUNT-1,otherLogicalPensPreserved:PENS-1,canonicalMappingCoverage:true,priorStaticDirectionsReused:review.approvedStaticDirections,priorProgressiveApproval:false,facts,policies:{curveWidth14:'legacy proposal, not reviewed approval',curvePadding7:'one radius source-start extension; original Q/C controls retained',guideLength:'padding7 + source Bezier control-polygon upper bound +1e-9 numeric margin',startClipHelper:'outlineStartClip unchanged',originalMicroTimingEquivalent:false},nativeApproval:false,runtimeApplied:false,requiredNativeReview:['domestic changed logical pen source clock and authored direction','all actualR starts, gate releases, transitions, contacts and fine endings','whole and replay']}
export {fixture,check}
console.log(JSON.stringify({glyph:fixture.glyph,pens:PENS,segments:check.segments,curves:check.curves,changedRaw:changed,nativeApproval:false}))
