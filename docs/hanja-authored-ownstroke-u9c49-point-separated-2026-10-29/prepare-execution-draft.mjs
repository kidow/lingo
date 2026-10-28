import fs from'node:fs'
import crypto from'node:crypto'
import assert from'node:assert/strict'
import{outlineStartClip}from'../../lib/hanja-stroke-outline.ts'
import{rat,apply,num}from'../hanja-authored-mm-u850c-components-2026-10-28/prepare-execution-draft.mjs'
const root=new URL('../../',import.meta.url),F='docs/hanja-authored-ownstroke-u9c49-point-separated-2026-10-29/',read=p=>fs.readFileSync(new URL(p,root)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),json=p=>JSON.parse(read(p))
const SOURCE='docs/hanja-actual-engine-capture-u9c49-hkcs-m-2026-10-25/engine-whole-hkcs_m9c49.json',FIXED={
  "docs/hanja-actual-engine-capture-u9c49-hkcs-m-2026-10-25/engine-whole-hkcs_m9c49.json": "d6c0c87e387968e2af0f41ecd4a8f02007dd712b6d7f1dcd4a6188fb20cfcb6c",
  "docs/hanja-authored-ownstroke-u9c49-point-separated-2026-10-29/fixtures-draft.json": "1190e3c1df2a6b47161993916a6bbf2debd10fb80d580c46515dd9a2c7b2f77d",
  "docs/hanja-authored-ownstroke-u9c49-point-separated-2026-10-29/recipe.json": "20f02e38e0bc92a9e899aabd26cbf6983bf9cfaf3f0aa194ac60116fae47745e",
  "docs/hanja-authored-ownstroke-u9c49-point-separated-2026-10-29/mapping-hypothesis.json": "ceae90decb222c20d14ad0d73cdccccf75159c9e34944248564d7d5cb7c76324",
  "docs/hanja-authored-ownstroke-u9c49-point-separated-2026-10-29/point-separation-check.json": "74e24a85a2956d139ee547b345232aa2f96d65f3f71d6ac29df2b3f921a5edeb",
  "docs/hanja-authored-ownstroke-u9c49-point-separated-2026-10-29/materialize-draft.py": "6be2147e83f0eb7f0f6e4077d2c4e9c6b645db8d6d25fc46837d0038b589428e",
  "docs/hanja-authored-ownstroke-u9c49-point-separated-2026-10-29/native-mapping-role-review.json": "a2a2dd342cf0ae1765366ab005a70f53df5927152db5dc9e860f47c6d138ba51",
  "docs/hanja-authored-ownstroke-u9c49-point-separated-2026-10-29/native-whole-contact-review.json": "798cc93aee75b80b1f7842b6ad939f802b8ad89e4c0ac07ab991584351cba673",
  "docs/hanja-official-media-compare-u9c49-2026-10-29/native-clock-review.json": "269c88bc7eb998fc543ec66d021028e51048023dffe87ae06523219c40658394",
  "lib/hanja-stroke-outline.ts": "b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40",
  "components/hanja/stroke-outlines.tsx": "cb4d80f57dbd8ad9815b5b90128ece5171a678a3b1c24e94956c2ac9fff91f88"
}
function build(){
 for(const[p,h]of Object.entries(FIXED))assert.equal(sha(read(p)),h,p)
 const original=json(SOURCE),candidate=json(F+'fixtures-draft.json'),recipe=json(F+'recipe.json'),staticReview=json(F+'native-mapping-role-review.json')
 assert.equal(FIXED[F+'native-mapping-role-review.json'],'a2a2dd342cf0ae1765366ab005a70f53df5927152db5dc9e860f47c6d138ba51')
 const mapping=json(F+'mapping-hypothesis.json'),groups=[[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17,18],[19],[20],[21],[22],[23],[24],[25]]
 assert.deepEqual(mapping.oneBasedLogicalRawGroups,groups);assert.equal(candidate.canonical22MappingApproved,false)
 assert.deepEqual(original.trace.map(row=>row.flatMap(c=>c.polygons)),original.groups.map(g=>g.polygons));assert.equal(original.groups.length,25);assert.equal(original.trace.flat().length,26)
 const facts=[],coverage=[],strokes=[],pairProgress=[]
 function segment(polys,direction,weight){
  assert(polys.length&&polys.every(p=>p.every(q=>q.off===0&&Number.isFinite(q.x)&&Number.isFinite(q.y))))
  const normalized=polys.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
  const ps=polys.flat(),xs=ps.map(q=>q.x/2),ys=ps.map(q=>q.y/2)
  return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
 }
 for(let logical=0;logical<22;logical++){
  const row=[]
  for(const rawOneBased of groups[logical]){
   const raw=rawOneBased-1,changed=raw===1,M=(changed?['1','0','0','1','0','-4']:['1','0','0','1','0','0']).map(rat),transform=p=>apply(M,p).map(num)
   const calls=original.trace[raw].map(c=>({...c,polygons:c.polygons.map(p=>p.map(q=>{const[x,y]=transform([q.x,q.y]);return{x,y,off:q.off}}))}))
   assert.deepEqual(calls.flatMap(c=>c.polygons),candidate.groups[raw].polygons)
   for(let primitive=0;primitive<calls.length;primitive++){
    const c=calls[primitive],sourceCall=original.trace[raw][primitive],n={cdDrawLine:2,cdDrawCurve:3,cdDrawBezier:4}[c.kind];assert(n)
    const points=Array.from({length:n},(_,i)=>transform(sourceCall.args.slice(2*i,2*i+2)).map(v=>v/2)),[s,...rest]=points,e=points.at(-1),mask=row.length+1
    const fact={logical:logical+1,mask,sourceRawOneBased:rawOneBased,primitiveOneBased:primitive+1,kind:c.kind,sourceFlags:sourceCall.args.slice(n*2),originalSourcePAndQPreserved:true,declaredWholeDotTranslationOnly:changed,matrixExact:changed?['1','0','0','1','0','-4']:['1','0','0','1','0','0'],guide100:points};facts.push(fact)
    if(n===2){const direction=s[0]===e[0]?(e[1]>s[1]?'down':'up'):(e[0]>s[0]?'right':'left');fact.cardinalPolicy=direction;row.push(segment(c.polygons,direction,Math.hypot(e[0]-s[0],e[1]-s[1])));continue}
    const next=rest.find(p=>p[0]!==s[0]||p[1]!==s[1]);assert(next);const len=Math.hypot(next[0]-s[0],next[1]-s[1]),unit=[(next[0]-s[0])/len,(next[1]-s[1])/len],padding=7,width=14,padded=s.map((v,i)=>v-padding*unit[i]),controlLength=points.slice(1).reduce((v,p,i)=>v+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0),weight=padding+controlLength+1e-9,revealPath='M'+padded.join(' ')+' L'+s.join(' ')+(n===3?' Q':' C')+rest.map(p=>p.join(' ')).join(' ')
    const out={...segment(c.polygons,'curve',weight),revealPath,revealWidth:width},all=c.polygons.flat().map(q=>[q.x/2,q.y/2]);out.revealStartGate={unit,minProjection:Math.min(...all.map(p=>p[0]*unit[0]+p[1]*unit[1])),firstProjection:s[0]*unit[0]+s[1]*unit[1],padding,until:padding/weight,bounds:out.bounds}
    for(const p of[0,1e-6,out.revealStartGate.until-1e-8]){const clip=outlineStartClip(out,p);assert.equal(typeof clip,'string');assert(!clip.includes('NaN')&&!clip.includes('Infinity'))}assert.equal(outlineStartClip(out,out.revealStartGate.until),undefined)
    fact.curvePolicy={width,padding,controlLength,weight,until:padding/weight,sourceMicroclockEquivalent:false};coverage.push({logical:logical+1,mask,polygons:c.polygons.map(p=>p.map(q=>[q.x/2,q.y/2])),points,padded,radius:7});row.push(out)
   }
  }
  strokes.push(row);const sum=row.reduce((n,s)=>n+s.weight,0);let before=0;for(let m=0;m<row.length-1;m++){before+=row[m].weight;pairProgress.push({pen:logical+1,boundary:before/sum,nextMask:m+2})}
 }
 assert.equal(strokes.length,22);assert.deepEqual(strokes.map(r=>r.length),[1,1,1,3,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1]);assert.equal(strokes.flat().length,26);assert.equal(strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),48);assert.equal(coverage.length,14);assert.equal(pairProgress.length,4)
 const inputSHA256={...FIXED,[F+'prepare-execution-draft.mjs']:sha(read(F+'prepare-execution-draft.mjs'))}
 const fixture={schema:'hanja-ownstroke-actual-R-execution-draft/v1',date:'2026-10-29',glyph:'鱉',variantId:'u9c49-hkcs-whole-dot-translated-up4-v1-execution-draft',locallyAuthoredRoot:true,mixedParts:false,originalWhole:false,isOriginalEngineCapture:false,sourceTraceDescribesReplacement:false,inputSHA256,logicalRawGroupsOneBased:groups,normalization:{from:200,to:100,applications:1,yFlip:false,winding:'legacy positive same-primitive compound traversal; only whole source dot2 receives translationYminus4 before/2'},sourceIdentity:{original:SOURCE,originalSHA256:FIXED[SOURCE],authorChangesRawOneBased:[2],matrixExact:['1','0','0','1','0','-4']},sourceMacroEvidence:{static:{path:F+'native-mapping-role-review.json',SHA256:FIXED[F+'native-mapping-role-review.json']},clock:{path:'docs/hanja-official-media-compare-u9c49-2026-10-29/native-clock-review.json',SHA256:FIXED['docs/hanja-official-media-compare-u9c49-2026-10-29/native-clock-review.json']}},temporalPolicy:'same-source-whole-dot-translation-padded7-width14-start-draft',strokes,approval:{mapping:false,sourceAnimation:false,initial:false,transitions:false,ending:false,native:false,runtime:false},policyStatus:'Source wholeP/Q and original primitive order remain exact except declared raw2 whole translation. Cardinal and Q14/7+gate are author display proposals, not original CSS or source microclock identity.'}
 const check={schema:'hanja-ownstroke-R-draft-code-check/v1',date:'2026-10-29',glyph:'鱉',status:'PASS-source-translation-and-guide-code-only',inputSHA256,logicalPens:22,segments:26,polygons:48,curves:14,cardinals:12,expectedMaskCounts:strokes.map(r=>r.length),compoundPens:[4,13,15],pairProgress,facts,sourceOriginalPAndQControlPointsPreserved:true,wholeDot2TranslateOnly:true,other24RawGroupsExact:true,rawSourceGuideFlagsPreserved:true,sourceEngineRuns:0,sourceMicroclockEquivalent:false,curveFullroundCoveragePending:true,nativeApproval:false,runtimeApplied:false,remainingNativeRisks:['Compound4,13,15 primitive transitions and original raw4 H/raw5 V-hook source seam; no sourceclock match or AA cause claimed.','Head13 shortDL ends96,121; body17 starts102,121 and remains separate. No invented continuation, bridge or crop.','Original roofhook4, head13, body15 and cubic11 preserve originalP/Q/C; fullround coverage/startgate/release/residual remain separate checks.','Point2 source shape/width unchanged under translationYminus4; actualR starts, endings, white gap and natural replay unreviewed.']}
 return{fixture,check,coverage}
}
export{build}
