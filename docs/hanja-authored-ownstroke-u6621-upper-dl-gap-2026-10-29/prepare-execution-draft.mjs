import fs from'node:fs'
import crypto from'node:crypto'
import assert from'node:assert/strict'
import{outlineStartClip}from'../../lib/hanja-stroke-outline.ts'
import{rat,apply,num}from'../hanja-authored-mm-u850c-components-2026-10-28/prepare-execution-draft.mjs'
const root=new URL('../../',import.meta.url),F='docs/hanja-authored-ownstroke-u6621-upper-dl-gap-2026-10-29/',read=p=>fs.readFileSync(new URL(p,root)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),json=p=>JSON.parse(read(p))
const SOURCE='docs/hanja-goal-glyphwiki-batch1015-2026-10-13/engine-whole-u6621.json',FIXED={
  "docs/hanja-goal-glyphwiki-batch1015-2026-10-13/engine-whole-u6621.json": "129fe1e6b53f88b552a50c346f2fa22c379cc268a7e658972e405aea00072016",
  "docs/hanja-goal-glyphwiki-batch1015-2026-10-13/engine-proof.json": "ca57bdf4e2bde1cb6ed97d9e880324d06de13040287ee3f12afab287cee1f1c4",
  "docs/hanja-goal-glyphwiki-batch1015-2026-10-13/sources.json": "00c8bf9fbeaad04fdeb63481808352a8613f1a30d73bc202cc619550055d1038",
  "docs/hanja-authored-ownstroke-u6621-upper-dl-gap-2026-10-29/fixtures-static-draft.json": "c2a2ace44ab0e6805e788ba7a010959af8ba95fdab923248f29d7ec8a9350471",
  "docs/hanja-authored-ownstroke-u6621-upper-dl-gap-2026-10-29/recipe.json": "e4d0f1155f94532ce481d0d828d50bb34384aa28336d8f680aef64f338830c04",
  "docs/hanja-authored-ownstroke-u6621-upper-dl-gap-2026-10-29/mapping-hypothesis.json": "336fbe32cb753d071bfba8fe14908cd38ffc5221195f2acc19ab2353bdc45342",
  "docs/hanja-authored-ownstroke-u6621-upper-dl-gap-2026-10-29/public-math.json": "aa1294e62dc660aba2ca3a61b24fd6ebac98bd8833578d0c5b1065a3bd1f4da3",
  "docs/hanja-authored-ownstroke-u6621-upper-dl-gap-2026-10-29/materialize-draft.py": "90b891252efe3a7e9fde6a30a26f16d6bc9f0ff304d9aa8094f2b0c42d915866",
  "docs/hanja-authored-ownstroke-u6621-upper-dl-gap-2026-10-29/native-mapping-role-review.json": "1da04f71e3bc17f24f36b44eb4a1a5d13be66a44c4b2552023b8bde5a83f93d4",
  "docs/hanja-authored-ownstroke-u6621-upper-dl-gap-2026-10-29/native-static-whole-review.json": "7f9ff58d6dcce54d8c56cbfdc1ee2f75bb884a11a402155d1fdb0975597567e1",
  "docs/hanja-official-media-compare-u6621-2026-10-29/native-clock-review.json": "0218d23418ebf0c014181c300aa1863fe4b902b2e8be57d24fd308294ff8bf35",
  "lib/hanja-stroke-outline.ts": "b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40",
  "components/hanja/stroke-outlines.tsx": "cb4d80f57dbd8ad9815b5b90128ece5171a678a3b1c24e94956c2ac9fff91f88"
}
function build(){
 for(const[p,h]of Object.entries(FIXED))assert.equal(sha(read(p)),h,p)
 const original=json(SOURCE),candidate=json(F+'fixtures-static-draft.json'),recipe=json(F+'recipe.json'),staticReview=json(F+'native-mapping-role-review.json')
 assert.equal(FIXED[F+'native-mapping-role-review.json'],'1da04f71e3bc17f24f36b44eb4a1a5d13be66a44c4b2552023b8bde5a83f93d4')
 const mapping=json(F+'mapping-hypothesis.json'),groups=[[1],[2,3],[4],[5],[6],[7],[8,9],[10,11],[12]]
 assert.deepEqual(mapping.oneBasedLogicalRawGroups,groups);assert.equal(candidate.canonical9MappingApproved,false)
 assert.deepEqual(original.trace.map(row=>row.flatMap(c=>c.polygons)),original.groups.map(g=>g.polygons));assert.equal(original.groups.length,12);assert.equal(original.trace.flat().length,12)
 const facts=[],coverage=[],strokes=[],pairProgress=[]
 function segment(polys,direction,weight){
  assert(polys.length&&polys.every(p=>p.every(q=>q.off===0&&Number.isFinite(q.x)&&Number.isFinite(q.y))))
  const normalized=polys.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
  const ps=polys.flat(),xs=ps.map(q=>q.x/2),ys=ps.map(q=>q.y/2)
  return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
 }
 for(let logical=0;logical<9;logical++){
  const row=[]
  for(const rawOneBased of groups[logical]){
   const raw=rawOneBased-1,changed=raw===7,M=(changed?['1','0','0','89/93','0','130/31']:['1','0','0','1','0','0']).map(rat),transform=p=>apply(M,p).map(num)
   const calls=original.trace[raw].map(c=>({...c,polygons:c.polygons.map(p=>p.map(q=>{const[x,y]=transform([q.x,q.y]);return{x,y,off:q.off}}))}))
   assert.deepEqual(calls.flatMap(c=>c.polygons),candidate.groups[raw].polygons)
   for(let primitive=0;primitive<calls.length;primitive++){
    const c=calls[primitive],sourceCall=original.trace[raw][primitive],n={cdDrawLine:2,cdDrawCurve:3,cdDrawBezier:4}[c.kind];assert(n)
    const points=Array.from({length:n},(_,i)=>transform(sourceCall.args.slice(2*i,2*i+2)).map(v=>v/2)),[s,...rest]=points,e=points.at(-1),mask=row.length+1
    const fact={logical:logical+1,mask,sourceRawOneBased:rawOneBased,primitiveOneBased:primitive+1,kind:c.kind,sourceFlags:sourceCall.args.slice(n*2),originalSourcePAndQPreserved:true,declaredWholeFinalStrokePositiveYAffineOnly:changed,matrixExact:changed?['1','0','0','89/93','0','130/31']:['1','0','0','1','0','0'],guide100:points};facts.push(fact)
    if(n===2){const direction=s[0]===e[0]?(e[1]>s[1]?'down':'up'):(e[0]>s[0]?'right':'left');fact.cardinalPolicy=direction;row.push(segment(c.polygons,direction,Math.hypot(e[0]-s[0],e[1]-s[1])));continue}
    const next=rest.find(p=>p[0]!==s[0]||p[1]!==s[1]);assert(next);const len=Math.hypot(next[0]-s[0],next[1]-s[1]),unit=[(next[0]-s[0])/len,(next[1]-s[1])/len],padding=7,width=14,padded=s.map((v,i)=>v-padding*unit[i]),controlLength=points.slice(1).reduce((v,p,i)=>v+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0),weight=padding+controlLength+1e-9,revealPath='M'+padded.join(' ')+' L'+s.join(' ')+(n===3?' Q':' C')+rest.map(p=>p.join(' ')).join(' ')
    const out={...segment(c.polygons,'curve',weight),revealPath,revealWidth:width},all=c.polygons.flat().map(q=>[q.x/2,q.y/2]);out.revealStartGate={unit,minProjection:Math.min(...all.map(p=>p[0]*unit[0]+p[1]*unit[1])),firstProjection:s[0]*unit[0]+s[1]*unit[1],padding,until:padding/weight,bounds:out.bounds}
    for(const p of[0,1e-6,out.revealStartGate.until-1e-8]){const clip=outlineStartClip(out,p);assert.equal(typeof clip,'string');assert(!clip.includes('NaN')&&!clip.includes('Infinity'))}assert.equal(outlineStartClip(out,out.revealStartGate.until),undefined)
    fact.curvePolicy={width,padding,controlLength,weight,until:padding/weight,sourceMicroclockEquivalent:false};coverage.push({logical:logical+1,mask,polygons:c.polygons.map(p=>p.map(q=>[q.x/2,q.y/2])),points,padded,radius:7});row.push(out)
   }
  }
  strokes.push(row);const sum=row.reduce((n,s)=>n+s.weight,0);let before=0;for(let m=0;m<row.length-1;m++){before+=row[m].weight;pairProgress.push({pen:logical+1,boundary:before/sum,nextMask:m+2})}
 }
 assert.equal(strokes.length,9);assert.deepEqual(strokes.map(r=>r.length),[1,2,1,1,1,1,2,2,1]);assert.equal(strokes.flat().length,12);assert.equal(strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),23);assert.equal(coverage.length,5);assert.equal(pairProgress.length,3)
 const inputSHA256={...FIXED,[F+'prepare-execution-draft.mjs']:sha(read(F+'prepare-execution-draft.mjs'))}
 const fixture={schema:'hanja-ownstroke-actual-R-execution-draft/v1',date:'2026-10-29',glyph:'昡',variantId:'u6621-original12-raw8-headgap-v1-execution-draft',locallyAuthoredRoot:true,mixedParts:false,originalWhole:false,isOriginalEngineCapture:false,sourceTraceDescribesReplacement:false,inputSHA256,logicalRawGroupsOneBased:groups,normalization:{from:200,to:100,applications:1,yFlip:false,winding:'legacy positive same-primitive compound traversal; only whole source upperDLraw8 receives positiveYaffine before/2'},sourceIdentity:{original:SOURCE,originalSHA256:FIXED[SOURCE],authorChangesRawOneBased:[8],matrixExact:['1','0','0','89/93','0','130/31']},sourceMacroEvidence:{static:{path:F+'native-mapping-role-review.json',SHA256:FIXED[F+'native-mapping-role-review.json']},clock:{path:'docs/hanja-official-media-compare-u6621-2026-10-29/native-clock-review.json',SHA256:FIXED['docs/hanja-official-media-compare-u6621-2026-10-29/native-clock-review.json']}},temporalPolicy:'same-source-whole-upperDLYaffine-padded7-width14-start-draft',strokes,approval:{mapping:false,sourceAnimation:false,initial:false,transitions:false,ending:false,native:false,runtime:false},policyStatus:'Source wholeP/Q and original primitive order remain exact except declared raw8 positiveYaffine. Cardinal and Q14/7+gate are author display proposals, not original CSS or source microclock identity.'}
 const check={schema:'hanja-ownstroke-R-draft-code-check/v1',date:'2026-10-29',glyph:'昡',status:'PASS-source-positive-affine-and-guide-code-only',inputSHA256,logicalPens:9,segments:12,polygons:23,curves:5,cardinals:7,expectedMaskCounts:strokes.map(r=>r.length),compoundPens:[2,7,8],pairProgress,facts,sourceOriginalPAndQControlPointsPreserved:true,wholeUpperDLRaw8PositiveYAffineOnly:true,other11RawGroupsExact:true,rawSourceGuideFlagsPreserved:true,sourceEngineRuns:0,sourceMicroclockEquivalent:false,curveFullroundCoveragePending:true,nativeApproval:false,runtimeApplied:false,remainingNativeRisks:['Compound2H/V sourceendpoint exact. Compound7raw8Q→9Q and8raw10Q→11Q retain original guidegaps; no bridge/retracing/microclock claim.','Whole raw8positiveYaffine preserves3P/Q; other11raw andfinalDR12 unchanged. Actualgate/start/end/whole/contact stillunreviewed.','Original9clock27frames and9staticroles supportmacro-only; runtime/native approvals remainfalse.']}
 return{fixture,check,coverage}
}
export{build}
