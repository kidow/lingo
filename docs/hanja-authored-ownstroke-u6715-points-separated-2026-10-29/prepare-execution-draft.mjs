import fs from'node:fs'
import crypto from'node:crypto'
import assert from'node:assert/strict'
import{outlineStartClip}from'../../lib/hanja-stroke-outline.ts'
import{rat,apply,num}from'../hanja-authored-mm-u850c-components-2026-10-28/prepare-execution-draft.mjs'
const root=new URL('../../',import.meta.url),F='docs/hanja-authored-ownstroke-u6715-points-separated-2026-10-29/',read=p=>fs.readFileSync(new URL(p,root)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),json=p=>JSON.parse(read(p))
const SOURCE='docs/hanja-actual-engine-capture-u6715-hkcs-2026-10-26/engine-whole-hkcs_m6715.json',FIXED={
  "docs/hanja-actual-engine-capture-u6715-hkcs-2026-10-26/engine-whole-hkcs_m6715.json": "8154f8f413dc5b027aceec1a2d3219106ed4cda4404a1866ae740205fb91f73c",
  "docs/hanja-authored-ownstroke-u6715-points-separated-2026-10-29/fixtures-draft.json": "a8ce1fa33a05b46cbda727c22dfee5d6ed4f0a7faf7cb016ac8685ab1d40f8bf",
  "docs/hanja-authored-ownstroke-u6715-points-separated-2026-10-29/recipe.json": "ffd6d46c80c19a885bd04e5e5c59f91faf8f349fc3202160aaec8d654eacfd02",
  "docs/hanja-authored-ownstroke-u6715-points-separated-2026-10-29/point-separation-check.json": "e10a66a6bc6d46634b5067b6d7b3638d7aab71b1adc4f24751492d8ced98231f",
  "docs/hanja-authored-ownstroke-u6715-points-separated-2026-10-29/materialize-draft.py": "6662e39e83c56e096906901607b4f90e02585a10c26015615a7dd1b6a74c8651",
  "docs/hanja-authored-ownstroke-u6715-points-separated-2026-10-29/native-static-review.json": "44b1f959d68dbd739de43fff1058072f61c8ed588fef3a801712d90b30ba2407",
  "docs/hanja-official-media-compare-u6715-2026-10-29/native-clock-review.json": "2a959ff2c62b083423472641b858218bb630557319e628618b0974a1485fe9b8",
  "docs/hanja-source-raw-compare-u6715-hkcs-original-2026-10-29/native-mapping-role-review.json": "cd5f1bd670db2e06bdee8ce3be674013db895e53286a89622e72f9cc93cf693f",
  "lib/hanja-stroke-outline.ts": "b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40",
  "components/hanja/stroke-outlines.tsx": "cb4d80f57dbd8ad9815b5b90128ece5171a678a3b1c24e94956c2ac9fff91f88"
}
function build(){
 for(const[p,h]of Object.entries(FIXED))assert.equal(sha(read(p)),h,p)
 const original=json(SOURCE),candidate=json(F+'fixtures-draft.json'),recipe=json(F+'recipe.json'),staticReview=json(F+'native-static-review.json')
 assert.equal(FIXED[F+'native-static-review.json'],'44b1f959d68dbd739de43fff1058072f61c8ed588fef3a801712d90b30ba2407')
 const groups=[[1],[2,3],[4],[5],[6],[7,8],[9],[10],[11],[12]]
 assert.deepEqual(recipe.logicalRawGroupsOneBased,groups);assert.deepEqual(candidate.logicalRawGroupsOneBased,groups)
 assert.deepEqual(original.trace.map(row=>row.flatMap(c=>c.polygons)),original.groups.map(g=>g.polygons));assert.equal(original.groups.length,12);assert.equal(original.trace.flat().length,15)
 const facts=[],coverage=[],strokes=[],pairProgress=[]
 function segment(polys,direction,weight){
  assert(polys.length&&polys.every(p=>p.every(q=>q.off===0&&Number.isFinite(q.x)&&Number.isFinite(q.y))))
  const normalized=polys.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
  const ps=polys.flat(),xs=ps.map(q=>q.x/2),ys=ps.map(q=>q.y/2)
  return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
 }
 for(let logical=0;logical<10;logical++){
  const row=[]
  for(const rawOneBased of groups[logical]){
   const raw=rawOneBased-1,changed=raw===3||raw===4,M=(changed?['1','0','0','1','23/10','0']:['1','0','0','1','0','0']).map(rat),transform=p=>apply(M,p).map(num)
   const calls=original.trace[raw].map(c=>({...c,polygons:c.polygons.map(p=>p.map(q=>{const[x,y]=transform([q.x,q.y]);return{x,y,off:q.off}}))}))
   assert.deepEqual(calls.flatMap(c=>c.polygons),candidate.groups[raw].polygons)
   for(let primitive=0;primitive<calls.length;primitive++){
    const c=calls[primitive],sourceCall=original.trace[raw][primitive],n={cdDrawLine:2,cdDrawCurve:3,cdDrawBezier:4}[c.kind];assert(n)
    const points=Array.from({length:n},(_,i)=>transform(sourceCall.args.slice(2*i,2*i+2)).map(v=>v/2)),[s,...rest]=points,e=points.at(-1),mask=row.length+1
    const fact={logical:logical+1,mask,sourceRawOneBased:rawOneBased,primitiveOneBased:primitive+1,kind:c.kind,sourceFlags:sourceCall.args.slice(n*2),originalSourcePAndQPreserved:true,declaredWholeDotTranslationOnly:changed,matrixExact:changed?['1','0','0','1','23/10','0']:['1','0','0','1','0','0'],guide100:points};facts.push(fact)
    if(n===2){const direction=s[0]===e[0]?(e[1]>s[1]?'down':'up'):(e[0]>s[0]?'right':'left');fact.cardinalPolicy=direction;row.push(segment(c.polygons,direction,Math.hypot(e[0]-s[0],e[1]-s[1])));continue}
    const next=rest.find(p=>p[0]!==s[0]||p[1]!==s[1]);assert(next);const len=Math.hypot(next[0]-s[0],next[1]-s[1]),unit=[(next[0]-s[0])/len,(next[1]-s[1])/len],padding=7,width=14,padded=s.map((v,i)=>v-padding*unit[i]),controlLength=points.slice(1).reduce((v,p,i)=>v+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0),weight=padding+controlLength+1e-9,revealPath='M'+padded.join(' ')+' L'+s.join(' ')+(n===3?' Q':' C')+rest.map(p=>p.join(' ')).join(' ')
    const out={...segment(c.polygons,'curve',weight),revealPath,revealWidth:width},all=c.polygons.flat().map(q=>[q.x/2,q.y/2]);out.revealStartGate={unit,minProjection:Math.min(...all.map(p=>p[0]*unit[0]+p[1]*unit[1])),firstProjection:s[0]*unit[0]+s[1]*unit[1],padding,until:padding/weight,bounds:out.bounds}
    for(const p of[0,1e-6,out.revealStartGate.until-1e-8]){const clip=outlineStartClip(out,p);assert.equal(typeof clip,'string');assert(!clip.includes('NaN')&&!clip.includes('Infinity'))}assert.equal(outlineStartClip(out,out.revealStartGate.until),undefined)
    fact.curvePolicy={width,padding,controlLength,weight,until:padding/weight,sourceMicroclockEquivalent:false};coverage.push({logical:logical+1,mask,polygons:c.polygons.map(p=>p.map(q=>[q.x/2,q.y/2])),points,padded,radius:7});row.push(out)
   }
  }
  strokes.push(row);const sum=row.reduce((n,s)=>n+s.weight,0);let before=0;for(let m=0;m<row.length-1;m++){before+=row[m].weight;pairProgress.push({pen:logical+1,boundary:before/sum,nextMask:m+2})}
 }
 assert.equal(strokes.length,10);assert.deepEqual(strokes.map(r=>r.length),[2,3,1,1,1,2,1,1,2,1]);assert.equal(strokes.flat().length,15);assert.equal(strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),29);assert.equal(coverage.length,8);assert.equal(pairProgress.length,5)
 const inputSHA256={...FIXED,[F+'prepare-execution-draft.mjs']:sha(read(F+'prepare-execution-draft.mjs'))}
 const fixture={schema:'hanja-ownstroke-actual-R-execution-draft/v1',date:'2026-10-29',glyph:'朕',variantId:'u6715-hkcs-whole-dots-translated23over10-v1-execution-draft',locallyAuthoredRoot:true,mixedParts:false,originalWhole:false,isOriginalEngineCapture:false,sourceTraceDescribesReplacement:false,inputSHA256,logicalRawGroupsOneBased:groups,normalization:{from:200,to:100,applications:1,yFlip:false,winding:'legacy positive same-primitive compound traversal; only whole source dots4/5 receive translation23/10 before/2'},sourceIdentity:{original:SOURCE,originalSHA256:FIXED[SOURCE],authorChangesRawOneBased:[4,5],matrixExact:['1','0','0','1','23/10','0']},sourceMacroEvidence:{static:{path:F+'native-static-review.json',SHA256:FIXED[F+'native-static-review.json']},clock:{path:'docs/hanja-official-media-compare-u6715-2026-10-29/native-clock-review.json',SHA256:FIXED['docs/hanja-official-media-compare-u6715-2026-10-29/native-clock-review.json']}},temporalPolicy:'same-source-whole-dot-translation-padded7-width14-start-draft',strokes,approval:{mapping:false,sourceAnimation:false,initial:false,transitions:false,ending:false,native:false,runtime:false},policyStatus:'Source wholeP/Q and original primitive order remain exact except declared2dot translations. Cardinal and Q14/7+gate are author display proposals, not original CSS or source microclock identity.'}
 const check={schema:'hanja-ownstroke-R-draft-code-check/v1',date:'2026-10-29',glyph:'朕',status:'PASS-source-translation-and-guide-code-only',inputSHA256,logicalPens:10,segments:15,polygons:29,curves:8,cardinals:7,expectedMaskCounts:strokes.map(r=>r.length),compoundPens:[1,2,6,9],pairProgress,facts,sourceOriginalPAndQControlPointsPreserved:true,wholeDots4And5TranslateOnly:true,other10RawGroupsExact:true,rawSourceGuideFlagsPreserved:true,sourceEngineRuns:0,sourceMicroclockEquivalent:false,curveFullroundCoveragePending:true,nativeApproval:false,runtimeApplied:false,remainingNativeRisks:['Compound1,2,6,9 primitive transitions and sourceP seam; no sourceclock match claimed.','Group6 H endpoint154,28 differs from nextQstart144,28. No bridge, crop, or continuous-guide rewrite.','Originalhook in2 and longcurve9 preserve originalP; fullround coverage/startgate/release/residual still require separate checks.','Point3/4 source shapes/width unchanged under translation; actualR starts, endings, separate white gaps and natural replay unreviewed.']}
 return{fixture,check,coverage}
}
export{build}
