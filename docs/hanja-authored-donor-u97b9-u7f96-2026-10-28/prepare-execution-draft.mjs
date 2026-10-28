import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import {outlineStartClip} from '../../lib/hanja-stroke-outline.ts'
const base=new URL('../../',import.meta.url),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=p=>fs.readFileSync(new URL(p,base))
const FOLDER='docs/hanja-authored-donor-u97b9-u7f96-2026-10-28/'
const composition=JSON.parse(read(FOLDER+'fixtures-draft.json')),materialized=JSON.parse(read(FOLDER+'materialized-source-draft.json'))
assert.equal(sha(read(materialized.materializer.path)),materialized.materializer.SHA256);assert.equal(sha(read(materialized.fixture.path)),materialized.fixture.SHA256)
const recipe={logicalRawGroupsZeroBased:materialized.logicalRawGroupsZeroBased},proof=JSON.parse(read(composition.recipient.proofPath)),trace=JSON.parse(read(composition.recipient.tracePath))
for(const source of [composition.recipient,composition.donor])for(const kind of ['proof','trace'])assert.equal(sha(read(source[kind+'Path'])),source[kind+'SHA256'])
assert.equal(materialized.groups.length,24);assert.equal(materialized.groups[19].authorGuide.kind,'quadratic');assert.equal(materialized.isOriginalEngineCapture,false);assert.equal(materialized.sourceTraceDescribesAuthoredRecipient,false)
assert.deepEqual(recipe.logicalRawGroupsZeroBased.flat().sort((a,b)=>a-b),Array.from({length:24},(_,i)=>i))
const inputFiles=[FOLDER+'fixtures-draft.json',FOLDER+'materialize-draft.py',FOLDER+'materialized-source-draft.json',composition.recipient.proofPath,composition.recipient.tracePath,composition.donor.proofPath,composition.donor.tracePath,'docs/hanja-authored-ownstroke-u7f96-2026-10-28/prepare-execution-draft.mjs','docs/hanja-goal-glyphwiki-batch297-2026-10-05/progressive.mjs','lib/hanja-stroke-outline.ts']
const inputs=Object.fromEntries(inputFiles.map(p=>[p,sha(read(p))]))
function segment(polygons,direction,weight){
 assert(polygons.length);const points=polygons.flat();assert(points.every(p=>p.off===0&&Number.isFinite(p.x)&&Number.isFinite(p.y)))
 const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
 const xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
 return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
}

const facts=[],strokes=recipe.logicalRawGroupsZeroBased.map((indices,logical)=>indices.flatMap(raw=>{
 let calls
 if(raw===19){
  const g=materialized.groups[raw];assert.equal(g.polygons.length,3);assert.equal(g.authorGuide.points.length,3)
  const donorTrace=JSON.parse(read(composition.donor.tracePath))[composition.donor.rawIndexZeroBased];assert.equal(donorTrace.length,1);assert.equal(donorTrace[0].kind,'cdDrawCurve')
  calls=[{kind:'cdDrawCurve',args:[...g.authorGuide.points.flat(),...donorTrace[0].args.slice(6)],polygons:g.polygons}]
 }else{assert.deepEqual(materialized.groups[raw],proof.groups[raw]);assert.deepEqual(trace[raw].flatMap(c=>c.polygons),proof.groups[raw].polygons);calls=trace[raw]}
 return calls.map((call,primitive)=>{
 const n={cdDrawLine:2,cdDrawCurve:3,cdDrawBezier:4}[call.kind];assert(n);const points=Array.from({length:n},(_,i)=>[call.args[i*2]/2,call.args[i*2+1]/2]),[s,...rest]=points,e=points.at(-1)
 facts.push({logical:logical+1,raw,primitive,kind:call.kind,sourceControlPoints100:points,flags:call.args.slice(n*2),authored:raw===19})
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
assert.equal(strokes.length,20);assert.equal(strokes[16].length,1);assert.equal(strokes[16][0].direction,'curve')
assert.equal(facts.filter(x=>x.authored).length,1)
const fixture={schema:'hanja-ownstroke-actual-R-execution-draft/v1',date:'2026-10-28',glyph:'鞹',variantId:'u97b9-u7f96-up-donor-padded7-source-start-gate-draft',locallyAuthoredRoot:true,mixedParts:true,originalWhole:false,isOriginalEngineCapture:false,sourceTraceDescribesAuthoredRecipient:false,inputSHA256:inputs,logicalRawGroupsZeroBased:recipe.logicalRawGroupsZeroBased,normalization:{from:200,to:100,applications:1,yFlip:false,donorAffineAlreadyAppliedByMaterializer:true,winding:'legacy per-polygon positive area before same-primitive compound; no coordinate change'},strokes,approval:{whole:false,mapping:false,direction:false,timing:false,native:false,runtime:false},policyStatus:'Executable schema draft only. Retained recipient public calls and transformed donor public Q guide are source facts; curve width14, padding7 and start gate are author proposals. No registration authority.'}
const check={schema:'hanja-authored-donor-R-draft-code-check/v1',status:'PASS-limited-code-only',inputSHA256:inputs,logicalPens:20,segments:strokes.flat().length,changedRaw:[19],otherRawGeometryPreserved:23,otherLogicalPensPreserved:19,donorPolygons:3,recipientOriginalCaptureEdited:false,sourceTraceDescribesAuthoredRecipient:false,facts,policies:{curveWidth14:'legacy proposal, not reviewed approval',curvePadding7:'one radius source-start extension with all original/transformed Q/C controls preserved',startClipHelper:'outlineStartClip reused unchanged',guideLength:'padding7 + source control-polygon upper bound +1e-9 numeric margin; display weight differs from original clock and exact arc length',singleMOpenContinuousGuide:true,releaseSupport:'until=7/weight is no later than actual guide arrival at source first point under normalized arclength dash semantics; native and numerical behavior still unapproved',originalMicroTimingEquivalent:false},nativeApproval:false,runtimeApplied:false,requiredNativeReview:['whole20 from actualR','all starts, cap release, transitions and completion','donor logical17 left-to-upper-right reveal','all source contacts and compound mask boundaries']}
export {fixture,check}
console.log(JSON.stringify({pens:20,segments:strokes.flat().length,curves:strokes.flat().filter(x=>x.direction==='curve').length,nativeApproval:false}))
