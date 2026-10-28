import fs from'node:fs';import crypto from'node:crypto';import assert from'node:assert/strict'
import{outlineStartClip}from'../../lib/hanja-stroke-outline.ts'
const F="docs/hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29/",SOURCE="docs/hanja-actual-engine-capture-u7e98-hkcs-m-2026-10-26/engine-whole-hkcs_m7e98.json",root=new URL('../../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root)),sha=s=>crypto.createHash('sha256').update(s).digest('hex'),json=p=>JSON.parse(read(p)),FIXED={
  "docs/hanja-actual-engine-capture-u7e98-hkcs-m-2026-10-26/engine-whole-hkcs_m7e98.json": "1d05a3718cfc27b49fe3b6a009ed03537280a1a3b2d2d8bdd4c485d90fca8503",
  "docs/hanja-authored-ownstroke-u7e98-hook-separated-2026-10-29/fixtures-draft.json": "a8475b569494c09daa311fed1c7585e211cb364d75758c7032ce022b65ded57b",
  "docs/hanja-authored-ownstroke-u7e98-hook-separated-2026-10-29/logical-mapping-hypothesis.json": "2533660b406d61b84c62447b805e3dc978e17ecfe4643bdf2f24aa2b341ba1ab",
  "docs/hanja-authored-ownstroke-u7e98-hook-separated-2026-10-29/native-logical-mapping-review.json": "14f785467a2ae0f32bde23fa7c3d1712a8031bd1ffb1e68ef452a58bf6e0f4fd",
  "docs/hanja-official-media-compare-u7e98-2026-10-29/native-clock-review.json": "52f95ae027a41f53660f92902f5591faef684e80b8944b21fb96073b9a25ad0a",
  "docs/hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29/fixtures-draft.json": "a4ee3c06f45821c824afd8b8a266d8facc2c7e2b80cdfceb15ac8b6c39223f41",
  "docs/hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29/recipe.json": "cdb5dc7926f692bacc2624cced884045e4a0beb331b130714771a3cc8813fc56",
  "docs/hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29/materialize-draft.py": "086febfbb24ac4d9f13f3cbd770d12861b5a4c8e61040cd73182c8774eb85ebf",
  "docs/hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29/native-static-mapping-review.json": "bffb3b1245c053d9b372fa4824d9849fbffa752552959ba7bfbe30b484624ff1",
  "lib/hanja-stroke-outline.ts": "b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40",
  "components/hanja/stroke-outlines.tsx": "cb4d80f57dbd8ad9815b5b90128ece5171a678a3b1c24e94956c2ac9fff91f88"
}
const WIDTHS={}
export function build(){
 for(const[p,h]of Object.entries(FIXED))assert.equal(sha(read(p)),h,p)
 const original=json(SOURCE),candidate=json(F+'fixtures-draft.json'),recipe=json(F+'recipe.json'),roles=json(F+'native-static-mapping-review.json'),mapping=json("docs/hanja-authored-ownstroke-u7e98-hook-separated-2026-10-29/logical-mapping-hypothesis.json"),groups=mapping.logicalRawGroupsOneBased
 assert.equal(roles.status,'PASS-V2-BOUNDED-STATIC-AND-ROLES');assert.equal(roles.nativeStaticMappingApproved,true);assert.equal(roles.nativeTemporalApproved,false)
 assert.deepEqual(groups,[[1,2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20],[21],[23],[24,25],[26],[27],[28],[29],[30]]);assert.deepEqual(groups.flat().slice().sort((a,b)=>a-b),Array.from({length:30},(_,i)=>i+1).filter(i=>i!==22));assert.equal(candidate.groups.length,30);assert.equal(candidate.trace.flat().length,31);assert.deepEqual(candidate.groups.map(g=>g.polygons),candidate.trace.map(row=>row.flatMap(c=>c.polygons)))
 assert.deepEqual(candidate.groups[21].polygons,[]);assert.deepEqual(candidate.trace[21],[])
 for(let i=0;i<30;i++)if(![12,15,20].includes(i)){assert.deepEqual(candidate.groups[i],original.groups[i]);assert.deepEqual(candidate.trace[i],original.trace[i])}
 const strokes=[],facts=[],pairProgress=[]
 function segment(polys,direction,weight){
  const ps=polys.flat();assert(ps.length&&ps.every(p=>p.off===0&&Number.isFinite(p.x)&&Number.isFinite(p.y)))
  const normalized=polys.map(p=>{const area=p.reduce((v,q,i)=>{const n=p[(i+1)%p.length];return v+q.x*n.y-n.x*q.y},0);assert.notEqual(area,0);return area<0?[p[0],...p.slice(1).reverse()]:p}),xs=ps.map(p=>p.x/2),ys=ps.map(p=>p.y/2)
  return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
 }
 for(let logical=0;logical<25;logical++){
  const row=[]
  for(const rawOneBased of groups[logical]){
   const i=rawOneBased-1,g=candidate.groups[i];assert.deepEqual(g.raw.slice(0,3),original.groups[i].raw.slice(0,3))
   for(let ci=0;ci<candidate.trace[i].length;ci++){
    const c=candidate.trace[i][ci],args=c.args;assert.deepEqual(args.slice(-2),original.trace[i][ci].args.slice(-2));const mask=row.length+1,fact={logical:logical+1,mask,sourceRawOneBased:rawOneBased,primitiveOneBased:ci+1,kind:c.kind,sourceFlags:args.slice(-2),originalSourcePAndGuideOrDeclaredWholeAffineOnly:true}
    if(c.kind==='cdDrawLine'){
     const p=args.slice(0,4).map(v=>v/2),dx=p[2]-p[0],dy=p[3]-p[1],direction=dy===0&&dx>0?'right':dx===0&&dy>0?'down':null;assert(direction);row.push(segment(c.polygons,direction,Math.hypot(dx,dy)));fact.guide100=[p.slice(0,2),p.slice(2,4)];fact.cardinalPolicy=direction
    }else{
     assert.equal(c.kind,'cdDrawCurve');assert.equal(args.length,8);const points=[args.slice(0,2),args.slice(2,4),args.slice(4,6)].map(p=>p.map(v=>v/2)),start=points[0],next=points.slice(1).find(p=>p[0]!==start[0]||p[1]!==start[1]);assert(next);const d=Math.hypot(next[0]-start[0],next[1]-start[1]),unit=[(next[0]-start[0])/d,(next[1]-start[1])/d],width=WIDTHS[(logical+1)+':'+mask]??14,padding=width/2,padded=start.map((v,i)=>v-padding*unit[i]),controlLength=points.slice(1).reduce((v,p,i)=>v+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0),weight=padding+controlLength+1e-9,revealPath='M'+padded.join(' ')+' L'+start.join(' ')+' Q'+points.slice(1).map(p=>p.join(' ')).join(' ')
     const s={...segment(c.polygons,'curve',weight),revealPath,revealWidth:width},all=c.polygons.flat().map(p=>[p.x/2,p.y/2]);s.revealStartGate={unit,minProjection:Math.min(...all.map(p=>p[0]*unit[0]+p[1]*unit[1])),firstProjection:start[0]*unit[0]+start[1]*unit[1],padding,until:padding/weight,bounds:s.bounds}
     for(const t of[0,1e-6,s.revealStartGate.until-1e-8]){const clip=outlineStartClip(s,t);assert.equal(typeof clip,'string');assert(!clip.includes('NaN')&&!clip.includes('Infinity'))}assert.equal(outlineStartClip(s,s.revealStartGate.until),undefined);row.push(s);fact.guide100=points;fact.curvePolicy={width,padding,controlLength,weight,until:padding/weight,originalMicroclockEquivalent:false}
    }
    facts.push(fact)
   }
  }
  strokes.push(row);const sum=row.reduce((v,s)=>v+s.weight,0);let before=0;row.slice(0,-1).forEach((s,i)=>{before+=s.weight;pairProgress.push({pen:logical+1,boundary:before/sum,nextMask:i+2})})
 }
 assert.equal(strokes.length,25);assert.equal(strokes.flat().length,31);assert.equal(facts.reduce((v,f)=>v+candidate.trace[f.sourceRawOneBased-1][f.primitiveOneBased-1].polygons.length,0),62);assert.equal(strokes.flat().filter(s=>s.direction==='curve').length,15);assert.equal(pairProgress.length,6)
 const inputSHA256={...FIXED,[F+'prepare-execution-draft.mjs']:sha(read(F+'prepare-execution-draft.mjs'))},clockPath=Object.keys(FIXED).find(p=>p.includes('official-media-compare-u7e98')&&p.endsWith('native-clock-review.json')),priorRolesPath=Object.keys(FIXED).find(p=>p.endsWith('native-logical-mapping-review.json')),guideGapFacts=mapping.compoundGuideFacts
 assert.deepEqual(guideGapFacts.map(v=>v.logical),[1,2,12,20]);assert.deepEqual(guideGapFacts.map(v=>v.gapSquared),['189949/625','94261/625','474721/2500','0'])
 const fixture={schema:'hanja-ownstroke-curve-cardinal-execution-draft/v1',date:'2026-10-29',glyph:'纘',variantId:'u7e98-v2-whole-affine25logical31mask-source-gap-declared-start-draft',locallyAuthoredRoot:true,mixedParts:false,originalWhole:false,isOriginalEngineCapture:false,sourceTraceDescribesReplacement:false,inputSHA256,logicalRawGroupsOneBased:groups,retainedNonDrawingRawOneBased:[22],normalization:{from:200,to:100,applications:1,yFlip:false,winding:'Each original P is independently filled; positive traversal prevents opposite-orientation subpath cancellation in concatenated compound outline. Point sequence reversals preserve each original polygon boundary.'},sourceIdentity:{original:SOURCE,SHA256:FIXED[SOURCE],authorChangesRawOneBased:[13,16,21],raw13And16MatricesExact:candidate.wholeAffineMatricesExact,raw21RetainedPriorWholeMatrixExact:['4499/3403','0','0','1','-4504697/85075','0'],other27RawExact:true,allRawMetadataPreserved:true},sourceMacroEvidence:{clock:{path:clockPath,SHA256:FIXED[clockPath]},staticAndChangedRoles:{path:F+'native-static-mapping-review.json',SHA256:FIXED[F+'native-static-mapping-review.json']},priorUnchangedRoles:{path:priorRolesPath,SHA256:FIXED[priorRolesPath]}},temporalPolicy:'own-whole-affine-source-padded7-width14-start-gate-with-declared-guide-gaps-unapproved',strokes,compoundGuideGapFacts:guideGapFacts,earlyRiskCompoundPens:[1,2,12],approval:{initial:false,transitions:false,ending:false,native:false,runtime:false},policyStatus:'Original30raw/31calls/62P preserved except three declared whole affines. Fifteen Q masks use authored round width14/padding7/start gates and control-length display weights, not publisher timing. Logical1/2/12 guides have nonzero endpoint gaps although original filled polygons contact. No source guide bridge or forced continuous-Q chain; actual early/transition failure remains possible and must be directly reviewed.'}
 const check={schema:'hanja-ownstroke-execution-draft-code-check/v1',date:'2026-10-29',glyph:'纘',inputSHA256,geometrySHA256:sha(JSON.stringify(strokes)),logicalPens:25,rawGroups:30,drawingRawRows:29,retainedNonDrawingRawOneBased:[22],segments:31,polygons:62,curves:15,cardinals:16,expectedMaskCounts:strokes.map(r=>r.length),compoundPens:[1,2,12,18,20],pairProgress,facts,compoundGuideGapFacts:guideGapFacts,earlyRiskCompoundPens:[1,2,12],other27RawExact:true,rawFlagsPreserved:true,wholeAffinePAndQOnly:true,newBridgePolygons:0,newOriginalGuideControls:0,sourceEngineRuns:0,curveFullroundCoveragePending:true,sourceGapSolutionClaim:false,nativeApproval:false,runtimeApplied:false}
 return{fixture,check}
}
