import fs from'node:fs'
import crypto from'node:crypto'
import assert from'node:assert/strict'
import{outlineStartClip}from'../../lib/hanja-stroke-outline.ts'
import{rat,apply,num}from'../hanja-authored-mm-u850c-components-2026-10-28/prepare-execution-draft.mjs'
const root=new URL('../../',import.meta.url),F='docs/hanja-authored-ownstroke-u709a-final-head-up-2026-10-29/',read=p=>fs.readFileSync(new URL(p,root)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),json=p=>JSON.parse(read(p))
const SOURCE='docs/hanja-actual-engine-capture-u709a-hkcs-u-2026-10-25/engine-whole-hkcs_u709a.json',FIXED={
  "docs/hanja-actual-engine-capture-u709a-hkcs-u-2026-10-25/engine-whole-hkcs_u709a.json": "cd7b53e28babc7db1d2e6be1878ab395c8096308b108fd1148af82df19174b46",
  "docs/hanja-authored-ownstroke-u709a-final-head-up-2026-10-29/fixtures-draft.json": "f3bc3f49eaeb3b99acfdfc4edb0af85d5aece50f84ca1b89a524ea5951929333",
  "docs/hanja-authored-ownstroke-u709a-final-head-up-2026-10-29/recipe.json": "6b782438d4a285fb98a6f31402cd84abe1ab95ef926481faa8d5a96017869c06",
  "docs/hanja-authored-ownstroke-u709a-final-head-up-2026-10-29/mapping-hypothesis.json": "f5058df338f3c7030f44f8cf7e33740ead3c4f627a8da48292cd0c67c158940a",
  "docs/hanja-authored-ownstroke-u709a-final-head-up-2026-10-29/contact-diff-check.json": "95d3e9267c1254789ffcfea4135746c9d48316c1e4571d2f01274affb08b8a3e",
  "docs/hanja-authored-ownstroke-u709a-final-head-up-2026-10-29/materialize-draft.py": "8d065dec1af42acc527e7d0bddee67f5cc580e56fe17c20fcb7557477e8ce4ae",
  "docs/hanja-authored-ownstroke-u709a-final-head-up-2026-10-29/native-mapping-role-review.json": "0d97fa5edda9e260197373a7c207d5a79d1ee236e8cfa7d29191d5839786b6ce",
  "docs/hanja-authored-ownstroke-u709a-final-head-up-2026-10-29/native-static-review.json": "8d762b2d9e97bed205c64ab7537f4f0cd0a15e994702b4a434e75f63d6149f91",
  "docs/hanja-official-media-compare-u709a-2026-10-29/native-clock-all-review.json": "f7dc4f5f4e47eca9042e798d5292b047089c1d3e5aa2c31b698b8625e5a3609c",
  "lib/hanja-stroke-outline.ts": "b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40",
  "components/hanja/stroke-outlines.tsx": "cb4d80f57dbd8ad9815b5b90128ece5171a678a3b1c24e94956c2ac9fff91f88"
}
function build(){
 for(const[p,h]of Object.entries(FIXED))assert.equal(sha(read(p)),h,p)
 const original=json(SOURCE),candidate=json(F+'fixtures-draft.json'),recipe=json(F+'recipe.json'),staticReview=json(F+'native-mapping-role-review.json')
 assert.equal(FIXED[F+'native-mapping-role-review.json'],'0d97fa5edda9e260197373a7c207d5a79d1ee236e8cfa7d29191d5839786b6ce')
 const mapping=json(F+'mapping-hypothesis.json'),groups=[[1],[2,3],[4],[5],[6],[7],[8],[9]]
 assert.deepEqual(mapping.oneBasedLogicalRawGroups,groups);assert.equal(candidate.canonical8MappingApproved,false)
 assert.deepEqual(original.trace.map(row=>row.flatMap(c=>c.polygons)),original.groups.map(g=>g.polygons));assert.equal(original.groups.length,9);assert.equal(original.trace.flat().length,10)
 const facts=[],coverage=[],strokes=[],pairProgress=[]
 function segment(polys,direction,weight){
  assert(polys.length&&polys.every(p=>p.every(q=>q.off===0&&Number.isFinite(q.x)&&Number.isFinite(q.y))))
  const normalized=polys.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
  const ps=polys.flat(),xs=ps.map(q=>q.x/2),ys=ps.map(q=>q.y/2)
  return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
 }
 for(let logical=0;logical<8;logical++){
  const row=[]
  for(const rawOneBased of groups[logical]){
   const raw=rawOneBased-1,changed=raw===8,M=(changed?['1','0','0','96/91','0','-1873/182']:['1','0','0','1','0','0']).map(rat),transform=p=>apply(M,p).map(num)
   const calls=original.trace[raw].map(c=>({...c,polygons:c.polygons.map(p=>p.map(q=>{const[x,y]=transform([q.x,q.y]);return{x,y,off:q.off}}))}))
   assert.deepEqual(calls.flatMap(c=>c.polygons),candidate.groups[raw].polygons)
   for(let primitive=0;primitive<calls.length;primitive++){
    const c=calls[primitive],sourceCall=original.trace[raw][primitive],n={cdDrawLine:2,cdDrawCurve:3,cdDrawBezier:4}[c.kind];assert(n)
    const points=Array.from({length:n},(_,i)=>transform(sourceCall.args.slice(2*i,2*i+2)).map(v=>v/2)),[s,...rest]=points,e=points.at(-1),mask=row.length+1
    const fact={logical:logical+1,mask,sourceRawOneBased:rawOneBased,primitiveOneBased:primitive+1,kind:c.kind,sourceFlags:sourceCall.args.slice(n*2),originalSourcePAndQPreserved:true,declaredWholeFinalStrokePositiveYAffineOnly:changed,matrixExact:changed?['1','0','0','96/91','0','-1873/182']:['1','0','0','1','0','0'],guide100:points};facts.push(fact)
    if(n===2){const direction=s[0]===e[0]?(e[1]>s[1]?'down':'up'):(e[0]>s[0]?'right':'left');fact.cardinalPolicy=direction;row.push(segment(c.polygons,direction,Math.hypot(e[0]-s[0],e[1]-s[1])));continue}
    const next=rest.find(p=>p[0]!==s[0]||p[1]!==s[1]);assert(next);const len=Math.hypot(next[0]-s[0],next[1]-s[1]),unit=[(next[0]-s[0])/len,(next[1]-s[1])/len],padding=7,width=14,padded=s.map((v,i)=>v-padding*unit[i]),controlLength=points.slice(1).reduce((v,p,i)=>v+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0),weight=padding+controlLength+1e-9,revealPath='M'+padded.join(' ')+' L'+s.join(' ')+(n===3?' Q':' C')+rest.map(p=>p.join(' ')).join(' ')
    const out={...segment(c.polygons,'curve',weight),revealPath,revealWidth:width},all=c.polygons.flat().map(q=>[q.x/2,q.y/2]);out.revealStartGate={unit,minProjection:Math.min(...all.map(p=>p[0]*unit[0]+p[1]*unit[1])),firstProjection:s[0]*unit[0]+s[1]*unit[1],padding,until:padding/weight,bounds:out.bounds}
    for(const p of[0,1e-6,out.revealStartGate.until-1e-8]){const clip=outlineStartClip(out,p);assert.equal(typeof clip,'string');assert(!clip.includes('NaN')&&!clip.includes('Infinity'))}assert.equal(outlineStartClip(out,out.revealStartGate.until),undefined)
    fact.curvePolicy={width,padding,controlLength,weight,until:padding/weight,sourceMicroclockEquivalent:false};coverage.push({logical:logical+1,mask,polygons:c.polygons.map(p=>p.map(q=>[q.x/2,q.y/2])),points,padded,radius:7});row.push(out)
   }
  }
  strokes.push(row);const sum=row.reduce((n,s)=>n+s.weight,0);let before=0;for(let m=0;m<row.length-1;m++){before+=row[m].weight;pairProgress.push({pen:logical+1,boundary:before/sum,nextMask:m+2})}
 }
 assert.equal(strokes.length,8);assert.deepEqual(strokes.map(r=>r.length),[1,2,1,1,1,1,2,1]);assert.equal(strokes.flat().length,10);assert.equal(strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),17);assert.equal(coverage.length,4);assert.equal(pairProgress.length,2)
 const inputSHA256={...FIXED,[F+'prepare-execution-draft.mjs']:sha(read(F+'prepare-execution-draft.mjs'))}
 const fixture={schema:'hanja-ownstroke-actual-R-execution-draft/v1',date:'2026-10-29',glyph:'炚',variantId:'u709a-hkcs-final-head-up-v1-execution-draft',locallyAuthoredRoot:true,mixedParts:false,originalWhole:false,isOriginalEngineCapture:false,sourceTraceDescribesReplacement:false,inputSHA256,logicalRawGroupsOneBased:groups,normalization:{from:200,to:100,applications:1,yFlip:false,winding:'legacy positive same-primitive compound traversal; only whole source final raw9 receives positiveYaffine before/2'},sourceIdentity:{original:SOURCE,originalSHA256:FIXED[SOURCE],authorChangesRawOneBased:[9],matrixExact:['1','0','0','96/91','0','-1873/182']},sourceMacroEvidence:{static:{path:F+'native-mapping-role-review.json',SHA256:FIXED[F+'native-mapping-role-review.json']},clock:{path:'docs/hanja-official-media-compare-u709a-2026-10-29/native-clock-all-review.json',SHA256:FIXED['docs/hanja-official-media-compare-u709a-2026-10-29/native-clock-all-review.json']}},temporalPolicy:'same-source-whole-finalYaffine-padded7-width14-start-draft',strokes,approval:{mapping:false,sourceAnimation:false,initial:false,transitions:false,ending:false,native:false,runtime:false},policyStatus:'Source wholeP/Q and original primitive order remain exact except declared raw9 positiveYaffine. Cardinal and Q14/7+gate are author display proposals, not original CSS or source microclock identity.'}
 const check={schema:'hanja-ownstroke-R-draft-code-check/v1',date:'2026-10-29',glyph:'炚',status:'PASS-source-positive-affine-and-guide-code-only',inputSHA256,logicalPens:8,segments:10,polygons:17,curves:4,cardinals:6,expectedMaskCounts:strokes.map(r=>r.length),compoundPens:[2,7],pairProgress,facts,sourceOriginalPAndQControlPointsPreserved:true,wholeFinalRaw9PositiveYAffineOnly:true,other8RawGroupsExact:true,rawSourceGuideFlagsPreserved:true,sourceEngineRuns:0,sourceMicroclockEquivalent:false,curveFullroundCoveragePending:true,nativeApproval:false,runtimeApplied:false,remainingNativeRisks:['Compound2 topH/rightV source boundary and compound7 vertical/longDL source transition require actualR review.','Whole raw9 positiveYaffine preserves original2P and guide; headheight/contact finite actualR validation pending.','Original8clock/static8role observations do not imply original microclock or appUI/runtime approval.']}
 return{fixture,check,coverage}
}
export{build}
