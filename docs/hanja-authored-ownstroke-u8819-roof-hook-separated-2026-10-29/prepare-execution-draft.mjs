import{execFileSync}from'node:child_process'
import fs from'node:fs'
import crypto from'node:crypto'
import assert from'node:assert/strict'
import{outlineStartClip}from'../../lib/hanja-stroke-outline.ts'
import{rat,apply,num}from'../hanja-authored-mm-u850c-components-2026-10-28/prepare-execution-draft.mjs'
const root=new URL('../../',import.meta.url),F='docs/hanja-authored-ownstroke-u8819-roof-hook-separated-2026-10-29/',read=p=>fs.readFileSync(new URL(p,root)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),json=p=>JSON.parse(read(p))
const SOURCE="docs/hanja-actual-engine-capture-u8819-hkcs-2026-10-26/engine-whole-hkcs_m8819.json",FIXED={
  "docs/hanja-actual-engine-capture-u8819-hkcs-2026-10-26/engine-whole-hkcs_m8819.json": "1b6efbd56add0a361572755488eb27f54fab06c4e74394bd2e9cc47a934d5da4",
  "docs/hanja-authored-ownstroke-u8819-roof-hook-separated-2026-10-29/recipe.json": "d357a3a6b7e81ffb29cb3c7fc717267675af4c23a2e93c7140af2abb061b4fe6",
  "docs/hanja-authored-ownstroke-u8819-roof-hook-separated-2026-10-29/mapping-hypothesis.json": "a3b48b9896bd31d2fb7b52fa68332b2724416cabf9a664ac21a155584a35aef8",
  "docs/hanja-authored-ownstroke-u8819-roof-hook-separated-2026-10-29/public-contact-math.json": "f03b7f2482185d187e9297141bbed227821d4f1e60963ab74c90bb889e06e577",
  "docs/hanja-authored-ownstroke-u8819-roof-hook-separated-2026-10-29/materialize-draft.py": "3332fdd6c0ea2d2191543c0fa93e4b160f38bd018a8d9a92539464b5d92b7bb5",
  "docs/hanja-authored-ownstroke-u8819-roof-hook-separated-2026-10-29/native-mapping-review.json": "64df18c5df6de9de3280b0805359ed5062f6ec402b9e3bc4f892e161c9bb51d4",
  "docs/hanja-authored-ownstroke-u8819-roof-hook-separated-2026-10-29/native-static-review.json": "3a878c4d8971bd5d1aa2cc3de1cc345908ea7cf0c2a8615518d6f3873aaf8ca6",
  "docs/hanja-official-media-compare-u8819-2026-10-29/native-clock-review.json": "31f687be172285ba7d9f6ec5ed801dafdc3f098bb8dc7b94b41cc21b863eef39",
  "lib/hanja-stroke-outline.ts": "b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40",
  "components/hanja/stroke-outlines.tsx": "55db76b01618110165dd5f22d512428550512feb180757814b734e80ffa304d1"
}

function build(){
 for(const[p,h]of Object.entries(FIXED))assert.equal(sha(read(p)),h,p)
 const original=json(SOURCE),recipe=json(F+'recipe.json'),staticReview=json(F+'native-mapping-review.json');assert.equal(staticReview.status,'pass-bounded-twenty-stroke-role-mapping');assert.equal(staticReview.runtimeApplied,false)
 const candidate=JSON.parse(execFileSync('python3',['-c',"import importlib.util,json,sys;sys.dont_write_bytecode=True;s=importlib.util.spec_from_file_location('b',sys.argv[1]);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);r,d=m.load_candidate();print(json.dumps(d['actual'],separators=(',',':')))",new URL(F+'materialize-draft.py',root).pathname],{encoding:'utf8',maxBuffer:2000000}))
 const mapping=json(F+'mapping-hypothesis.json'),groups=[[1],[2,3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15],[17],[18,19],[20],[21],[22],[23],[24]];assert.deepEqual(mapping.oneBasedLogicalRawGroups,groups);assert.deepEqual(groups.flat(),Array.from({length:24},(_,i)=>i+1).filter(n=>n!==16));assert.equal(original.groups[15].polygons.length,0)
 assert.deepEqual(original.trace.map(row=>row.flatMap(c=>c.polygons)),original.groups.map(g=>g.polygons));assert.equal(original.groups.length,24);assert.equal(original.trace.flat().length,24)
 const facts=[],coverage=[],strokes=[],pairProgress=[]
 function segment(polys,direction,weight){
  assert(polys.length&&polys.every(p=>p.every(q=>q.off===0&&Number.isFinite(q.x)&&Number.isFinite(q.y))))
  const normalized=polys.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
  const ps=polys.flat(),xs=ps.map(q=>q.x/2),ys=ps.map(q=>q.y/2)
  return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
 }
 for(let logical=0;logical<20;logical++){
  const row=[]
  for(const rawOneBased of groups[logical]){
   const raw=rawOneBased-1,changed=raw===10,M=(changed?['1','0','0','2465/4096','0','1498889/102400']:['1','0','0','1','0','0']).map(rat),transform=p=>apply(M,p).map(num)
   const calls=original.trace[raw].map(c=>({...c,polygons:c.polygons.map(p=>p.map(q=>{const[x,y]=transform([q.x,q.y]);return{x,y,off:q.off}}))}))
   assert.deepEqual(calls.flatMap(c=>c.polygons),candidate.groups[raw].polygons)
   for(let primitive=0;primitive<calls.length;primitive++){
    const c=calls[primitive],sourceCall=original.trace[raw][primitive],n={cdDrawLine:2,cdDrawCurve:3,cdDrawBezier:4}[c.kind];assert(n)
    const points=Array.from({length:n},(_,i)=>transform(sourceCall.args.slice(2*i,2*i+2)).map(v=>v/2)),[s,...rest]=points,e=points.at(-1),mask=row.length+1
    const fact={logical:logical+1,mask,sourceRawOneBased:rawOneBased,primitiveOneBased:primitive+1,kind:c.kind,sourceFlags:sourceCall.args.slice(n*2),originalSourcePAndQPreserved:true,declaredWholeRaw11PositiveYAffineOnly:changed,matrixExact:changed?['1','0','0','2465/4096','0','1498889/102400']:['1','0','0','1','0','0'],guide100:points};facts.push(fact)
    if(n===2){const direction=s[0]===e[0]?(e[1]>s[1]?'down':'up'):(e[0]>s[0]?'right':'left');fact.cardinalPolicy=direction;row.push(segment(c.polygons,direction,Math.hypot(e[0]-s[0],e[1]-s[1])));continue}
    const next=rest.find(p=>p[0]!==s[0]||p[1]!==s[1]);assert(next);const len=Math.hypot(next[0]-s[0],next[1]-s[1]),unit=[(next[0]-s[0])/len,(next[1]-s[1])/len],padding=7,width=14,padded=s.map((v,i)=>v-padding*unit[i]),controlLength=points.slice(1).reduce((v,p,i)=>v+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0),weight=padding+controlLength+1e-9,revealPath='M'+padded.join(' ')+' L'+s.join(' ')+(n===3?' Q':' C')+rest.map(p=>p.join(' ')).join(' ')
    const out={...segment(c.polygons,'curve',weight),revealPath,revealWidth:width},all=c.polygons.flat().map(q=>[q.x/2,q.y/2]);out.revealStartGate={unit,minProjection:Math.min(...all.map(p=>p[0]*unit[0]+p[1]*unit[1])),firstProjection:s[0]*unit[0]+s[1]*unit[1],padding,until:padding/weight,bounds:out.bounds}
    for(const p of[0,1e-6,out.revealStartGate.until-1e-8]){const clip=outlineStartClip(out,p);assert.equal(typeof clip,'string');assert(!clip.includes('NaN')&&!clip.includes('Infinity'))}assert.equal(outlineStartClip(out,out.revealStartGate.until),undefined)
    fact.curvePolicy={width,padding,controlLength,weight,until:padding/weight,sourceMicroclockEquivalent:false};coverage.push({logical:logical+1,mask,polygons:c.polygons.map(p=>p.map(q=>[q.x/2,q.y/2])),points,padded,radius:7});row.push(out)
   }
  }
  strokes.push(row);const sum=row.reduce((n,s)=>n+s.weight,0);let before=0;for(let m=0;m<row.length-1;m++){before+=row[m].weight;pairProgress.push({pen:logical+1,boundary:before/sum,nextMask:m+2})}
 }
 assert.equal(strokes.length,20);assert.deepEqual(strokes.map(r=>r.length),[1,2,1,1,1,1,1,1,2,1,2,1,1,1,2,1,1,1,1,1]);assert.equal(strokes.flat().length,24);assert.equal(strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),43);assert.equal(coverage.length,9);assert.equal(pairProgress.length,4)
 const inputSHA256={...FIXED,[F+'prepare-execution-draft.mjs']:sha(read(F+'prepare-execution-draft.mjs'))}
 const fixture={schema:'hanja-ownstroke-actual-R-execution-draft/v1',date:'2026-10-29',glyph:'蠙',variantId:'u8819-roof-hook-actualP-gap1-execution-draft',locallyAuthoredRoot:true,mixedParts:false,originalWhole:false,isOriginalEngineCapture:false,sourceTraceDescribesReplacement:false,inputSHA256,logicalRawGroupsOneBased:groups,emptyRawMetadataPreserved:[16],normalization:{from:200,to:100,applications:1,yFlip:false,winding:'legacy positive same-primitive compound traversal; whole raw11 positiveYaffine before/2'},sourceIdentity:{original:SOURCE,originalSHA256:FIXED[SOURCE],authorChangesRawOneBased:[11],matrixExact:['1','0','0','2465/4096','0','1498889/102400']},sourceMacroEvidence:{static:{path:F+'native-mapping-review.json',SHA256:FIXED[F+'native-mapping-review.json']},clock:{path:"docs/hanja-official-media-compare-u8819-2026-10-29/native-clock-review.json",SHA256:FIXED["docs/hanja-official-media-compare-u8819-2026-10-29/native-clock-review.json"]}},temporalPolicy:'same-source-whole-raw11-Yaffine-padded7-width14-start-draft',strokes,approval:{mapping:false,sourceAnimation:false,initial:false,transitions:false,ending:false,native:false,runtime:false},policyStatus:'원문20역할/정적매핑 검토 완료. 원P/Q는 raw11 양의배치만 제외하고 보존. cardinal/Q14·7+gate는 저자 표시 제안이며 원문 microclock 또는 실제앱 승인이 아님.'}
 const check={schema:'hanja-ownstroke-R-draft-code-check/v1',date:'2026-10-29',glyph:'蠙',status:'PASS-source-positive-affine-and-guide-code-only',inputSHA256,logicalPens:20,drawingRaw:23,rawMetadata:24,emptyRawPreserved:[16],segments:24,polygons:43,curves:9,cardinals:15,expectedMaskCounts:strokes.map(r=>r.length),compoundPens:[2,9,11,15],pairProgress,facts,sourceOriginalPAndQControlPointsPreserved:true,wholeRaw11PositiveYAffineOnly:true,other23RawGroupsExact:true,rawSourceGuideFlagsPreserved:true,sourceEngineRuns:0,sourceMicroclockEquivalent:false,curveFullroundCoveragePending:true,nativeApproval:false,runtimeApplied:false,remainingNativeRisks:['복합2/9/11/15의 시작·전환·완료를 실제R로 검토해야 함.','raw11 저자배치 후 hook과 다음H의 간격을 실제R로 재확인해야 함.','원문60프레임·정적40뷰는 실제재생 시간·source handoff·runtime 승인을 뜻하지 않음.']}
 return{fixture,check,coverage}
}
export{build}
