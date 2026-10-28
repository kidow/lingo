import fs from'node:fs';import crypto from'node:crypto';import assert from'node:assert/strict'
import{outlineStartClip}from'../../lib/hanja-stroke-outline.ts'
const F='docs/hanja-authored-ownstroke-u67d6-point-separated-2026-10-29/',SOURCE='docs/hanja-actual-engine-capture-u67d6-hkcs-2026-10-25/engine-whole-hkcs_m67d6.json',root=new URL('../../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root)),sha=s=>crypto.createHash('sha256').update(s).digest('hex'),json=p=>JSON.parse(read(p)),FIXED={
  "docs/hanja-actual-engine-capture-u67d6-hkcs-2026-10-25/engine-whole-hkcs_m67d6.json": "3294f58e470428ffe54ae2d9d17ec7a022eca2006f8bc5dd7b6d371165098271",
  "docs/hanja-authored-ownstroke-u67d6-point-separated-2026-10-29/fixtures-draft.json": "5e69882deb5ecebaf2d7b7e9dacdf572adae33dc32ebbcbb6b95ee1bf90865fc",
  "docs/hanja-authored-ownstroke-u67d6-point-separated-2026-10-29/recipe.json": "f19f3b153e8f3f78a605d46c7334f728cfdc35daea25e2a0e88355ae80795153",
  "docs/hanja-authored-ownstroke-u67d6-point-separated-2026-10-29/materialize-draft.py": "088c971473b950d1bf926a41bd15afa77861246e5da617f9813ad632dbff2cce",
  "docs/hanja-authored-ownstroke-u67d6-point-separated-2026-10-29/native-static-review.json": "b6f53519bc6e6a070dbc0acc9154013d9320d86a3f2ec53dee88d5569ac782d0",
  "docs/hanja-authored-ownstroke-u67d6-point-separated-2026-10-29/native-clock-review.json": "16e3a9b73ba23bf13f29327c53a24b0d9f9e507fa7cce2578447c42fede76274",
  "docs/hanja-authored-ownstroke-u67d6-point-separated-2026-10-29/native-mapping-role-review.json": "44b8560aeab54c7416a40d30a0cf57689ab72368f8fa994ec7e63af45bea4ad1",
  "lib/hanja-stroke-outline.ts": "b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40",
  "components/hanja/stroke-outlines.tsx": "cb4d80f57dbd8ad9815b5b90128ece5171a678a3b1c24e94956c2ac9fff91f88"
}
const WIDTHS={"5:3":22}
export function build(){
 for(const[p,h]of Object.entries(FIXED))assert.equal(sha(read(p)),h,p)
 const original=json(SOURCE),candidate=json(F+'fixtures-draft.json'),recipe=json(F+'recipe.json'),roles=json(F+'native-mapping-role-review.json'),groups=[[1],[2],[3],[4],[5,6],[7],[8],[9,10],[11]]
 assert.equal(roles.result,'PASS-static-macro-mapping-and-declared-guide-direction');assert.deepEqual(roles.logicalRawGroups,groups);assert.equal(json(F+'native-static-review.json').result,'PASS-static-authored-whole-and-point-shape-only')
 assert.deepEqual(groups.flat().slice().sort((a,b)=>a-b),Array.from({length:11},(_,i)=>i+1));assert.equal(candidate.groups.length,11);assert.equal(candidate.trace.flat().length,12);assert.deepEqual(candidate.groups.map(g=>g.polygons),candidate.trace.map(row=>row.flatMap(c=>c.polygons)));assert.deepEqual(candidate.matrixExact,['1208/1383','0','0','1','3024/461','0']);assert.deepEqual(recipe.matrixExact,candidate.matrixExact)
 for(let i=0;i<11;i++)if(i!==3){assert.deepEqual(candidate.groups[i],original.groups[i]);assert.deepEqual(candidate.trace[i],original.trace[i])}
 const strokes=[],facts=[],pairProgress=[]
 function segment(polys,direction,weight){
  const ps=polys.flat();assert(ps.length&&ps.every(p=>p.off===0&&Number.isFinite(p.x)&&Number.isFinite(p.y)))
  const normalized=polys.map(p=>{const area=p.reduce((v,q,i)=>{const n=p[(i+1)%p.length];return v+q.x*n.y-n.x*q.y},0);assert.notEqual(area,0);return area<0?[p[0],...p.slice(1).reverse()]:p}),xs=ps.map(p=>p.x/2),ys=ps.map(p=>p.y/2)
  return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
 }
 for(let logical=0;logical<9;logical++){
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
 assert.equal(strokes.flat().length,12);assert.equal(facts.reduce((v,f)=>v+candidate.trace[f.sourceRawOneBased-1][f.primitiveOneBased-1].polygons.length,0),18);assert.deepEqual(strokes.map(r=>r.length),[1,1,1,1,3,1,1,2,1]);assert.equal(strokes.flat().filter(s=>s.direction==='curve').length,5)
 const inputSHA256={...FIXED,[F+'prepare-execution-draft.mjs']:sha(read(F+'prepare-execution-draft.mjs'))},fixture={schema:'hanja-ownstroke-curve-cardinal-execution-draft/v1',date:'2026-10-29',glyph:'柖',variantId:'u67d6-hkcs-whole-point4-affine9logical-pen5mask3-width22-start-draft',locallyAuthoredRoot:true,mixedParts:false,originalWhole:false,isOriginalEngineCapture:false,sourceTraceDescribesReplacement:false,inputSHA256,logicalRawGroupsOneBased:groups,normalization:{from:200,to:100,applications:1,yFlip:false,winding:'Per-original-P positive traversal preserves independently painted polygon union, including original negative terminal triangle; no all-P nonzero cancellation.'},sourceIdentity:{original:SOURCE,SHA256:FIXED[SOURCE],authorChangesRawOneBased:[4],matrixExact:candidate.matrixExact,other10RawExact:true},sourceMacroEvidence:{clock:{path:F+'native-clock-review.json',SHA256:FIXED[F+'native-clock-review.json']},static:{path:F+'native-static-review.json',SHA256:FIXED[F+'native-static-review.json']},roles:{path:F+'native-mapping-role-review.json',SHA256:FIXED[F+'native-mapping-role-review.json']}},temporalPolicy:'same-source-point-positiveXaffine-padded7-except-pen5mask3-width22-pad11-source-start-draft',strokes,approval:{initial:false,transitions:false,ending:false,native:false,runtime:false},policyStatus:'Original11raw/12calls/18P preserved except declared complete raw4 positiveXaffine. Five Q masks have authored round width/padding/gates and control-length display weights, not publisher CSS timing. Compound5 H/Q/Q and8 H/V keep exact original joins without bridge or source control edits.'}
 const check={schema:'hanja-ownstroke-execution-draft-code-check/v1',date:'2026-10-29',glyph:'柖',inputSHA256,geometrySHA256:sha(JSON.stringify(strokes)),logicalPens:9,rawGroups:11,segments:12,polygons:18,curves:5,cardinals:7,expectedMaskCounts:strokes.map(r=>r.length),compoundPens:[5,8],pairProgress,facts,other10RawExact:true,rawFlagsPreserved:true,wholePointPAndQSamePositiveXAffine:true,newBridgePolygons:0,newOriginalGuideControls:0,sourceEngineRuns:0,curveFullroundCoveragePending:true,nativeApproval:false,runtimeApplied:false}
 return{fixture,check}
}
