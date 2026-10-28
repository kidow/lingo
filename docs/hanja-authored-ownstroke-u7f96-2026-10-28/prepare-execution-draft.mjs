import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import {outlineStartClip} from '../../lib/hanja-stroke-outline.ts'
const base=new URL('../../',import.meta.url),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=p=>fs.readFileSync(new URL(p,base))
const FOLDER='docs/hanja-authored-ownstroke-u7f96-2026-10-28/'
const recipe=JSON.parse(read(FOLDER+'fixtures-draft.json')),proof=JSON.parse(read(recipe.sourceProofPath)),trace=JSON.parse(read(recipe.sourceTracePath))
assert.equal(sha(read(recipe.sourceProofPath)),recipe.sourceProofSHA256);assert.equal(sha(read(recipe.sourceTracePath)),recipe.sourceTraceSHA256)
assert.equal(sha(read(FOLDER+'hypothesis.json')),recipe.hypothesisSHA256)
assert.deepEqual(recipe.logicalRawGroupsZeroBased.flat().sort((a,b)=>a-b),Array.from({length:13},(_,i)=>i))
const inputFiles=[FOLDER+'fixtures-draft.json',FOLDER+'hypothesis.json',FOLDER+'materialize-draft.py',recipe.sourceProofPath,recipe.sourceTracePath,'docs/hanja-goal-glyphwiki-batch297-2026-10-05/progressive.mjs','scripts/hanja-component-geometry.ts','lib/hanja-stroke-outline.ts']
const inputs=Object.fromEntries(inputFiles.map(p=>[p,sha(read(p))]))
function segment(polygons,direction,weight){
 assert(polygons.length);const points=polygons.flat();assert(points.every(p=>p.off===0&&Number.isFinite(p.x)&&Number.isFinite(p.y)))
 const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
 const xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
 return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
}
const facts=[],strokes=recipe.logicalRawGroupsZeroBased.map((indices,logical)=>indices.flatMap(raw=>{
 if(raw===5){const g=recipe.replacementAuthorGuide,s=g.start.map(x=>x/2),e=g.end.map(x=>x/2);assert.equal(s[1],e[1]);assert(e[0]>s[0]);const out=segment(recipe.replacementPolygons,'right',Math.hypot(e[0]-s[0],e[1]-s[1]));facts.push({logical:logical+1,raw,authored:true,guide100:[s,e],originalTraceUsed:false,cardinal:'right'});return[out]}
 assert.deepEqual(trace[raw].flatMap(c=>c.polygons),proof.groups[raw].polygons)
 return trace[raw].map((call,primitive)=>{
 const n={cdDrawLine:2,cdDrawCurve:3,cdDrawBezier:4}[call.kind];assert(n);const points=Array.from({length:n},(_,i)=>[call.args[i*2]/2,call.args[i*2+1]/2]),[s,...rest]=points,e=points.at(-1)
 facts.push({logical:logical+1,raw,primitive,kind:call.kind,sourceControlPoints100:points,flags:call.args.slice(n*2),authored:false})
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
assert.equal(strokes.length,10);assert.equal(strokes[4].length,1);assert.equal(strokes[4][0].direction,'right');assert.equal(trace[6].length,0);assert.equal(proof.groups[6].polygons.length,0)
const fixture={schema:'hanja-ownstroke-actual-R-execution-draft/v1',date:'2026-10-28',glyph:'羖',variantId:'author-donorH-replacement5-legacy14-padded7-start-gate-draft',locallyAuthoredRoot:true,mixedParts:true,originalWhole:false,isOriginalEngineCapture:false,sourceTraceDescribesReplacement:false,inputSHA256:inputs,logicalRawGroupsZeroBased:recipe.logicalRawGroupsZeroBased,normalization:{from:200,to:100,applications:1,yFlip:false,winding:'legacy per-polygon positive area before same-primitive compound; no coordinate change'},strokes,approval:{whole:false,mapping:false,direction:false,timing:false,native:false,runtime:false},policyStatus:'Executable schema draft only. Public KAGE calls determine source facts; curve width14, padding7 and start gate are author proposals. No registration authority.'}
const check={schema:'hanja-ownstroke-R-draft-code-check/v1',status:'PASS-limited-code-only',inputSHA256:inputs,logicalPens:10,segments:strokes.flat().length,nonDrawingRawPreserved:[6],changedRaw:[5],otherRawGeometryPreserved:12,otherLogicalPensPreserved:9,facts,policies:{cardinal5:'right; actual replacement filled H and author guide',curveWidth14:'legacy proposal, not reviewed approval',curvePadding7:'one radius source-start extension with original remaining Q/C controls preserved',startClipHelper:'outlineStartClip reused unchanged',guideLength:'padding7 + source control-polygon upper bound +1e-9 numeric margin; display weight differs from original clock and exact arc length',singleMOpenContinuousGuide:true,releaseSupport:'until=7/weight is no later than actual guide arrival at source first point under normalized arclength dash semantics; native and numerical behavior still unapproved',originalMicroTimingEquivalent:false},nativeApproval:false,runtimeApplied:false,requiredNativeReview:['whole with donor4 and replacement5','all starts, curve cap release, transitions and completion','cardinal/compound decoration onset','mapping and source contacts; original microtiming is not claimed']}
export {fixture,check}
console.log(JSON.stringify({pens:10,segments:strokes.flat().length,curves:strokes.flat().filter(x=>x.direction==='curve').length,nativeApproval:false}))
