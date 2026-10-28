import fs from 'node:fs'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'
import{outlineStartClip}from'../../lib/hanja-stroke-outline.ts'
import{rat,apply,num}from'../hanja-authored-mm-u850c-components-2026-10-28/prepare-execution-draft.mjs'
const root=new URL('../../',import.meta.url),F='docs/hanja-authored-ownstroke-u5e77-upper-h-2026-10-28/',read=p=>fs.readFileSync(new URL(p,root)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),json=p=>JSON.parse(read(p))
const SOURCE='docs/hanja-actual-engine-capture-u5e77-005-2026-10-27/engine-whole-u5e77-02-var-005.json'
const FIXED={
  "docs/hanja-actual-engine-capture-u5e77-005-2026-10-27/engine-whole-u5e77-02-var-005.json": "33e5d36c16b0b3c333d462128b234d81a14bf4aa7a788a495113992a352e0d9e",
  "docs/hanja-authored-ownstroke-u5e77-upper-h-2026-10-28/recipe-rising-v2.json": "d8d07e26cc712273fe63e851c7a1b4e823c501ea124e2fc6c3c2b776ad8dce6e",
  "docs/hanja-authored-ownstroke-u5e77-upper-h-2026-10-28/fixtures-rising-v2.json": "26639f101987866ebc068662de81d9d576c0ef726d8a0e465672f9ac14a97172",
  "docs/hanja-authored-ownstroke-u5e77-upper-h-2026-10-28/native-static-rising-v2-review.json": "36acae2d0748953e370292e294c75dd5a58f12803bbefb20f5007361bd75c90c",
  "docs/hanja-official-media-compare-u5e77-2026-10-28/native-clock-review.json": "bb62457d0c9aa0f434aefa7930fb79bf265b0a15961da9823c9ed40dec0cd625",
  "lib/hanja-stroke-outline.ts": "b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40",
  "components/hanja/stroke-outlines.tsx": "cb4d80f57dbd8ad9815b5b90128ece5171a678a3b1c24e94956c2ac9fff91f88"
}
function build(){
 for(const[p,h]of Object.entries(FIXED))assert.equal(sha(read(p)),h,p)
 const original=json(SOURCE),candidate=json(F+'fixtures-rising-v2.json'),recipe=json(F+'recipe-rising-v2.json'),staticRecord=json(F+'native-static-rising-v2-review.json'),clock=json('docs/hanja-official-media-compare-u5e77-2026-10-28/native-clock-review.json')
 assert.equal(staticRecord.status,'PASS-finite-static-role-and-placement-only');assert.equal(staticRecord.sourceAnimationApproved,false);assert.equal(clock.result,'PASS-original-order-direction-identification-only');assert.equal(clock.runtimeApproved,false)
 assert.deepEqual(candidate.logicalRawGroupsZeroBased,Array.from({length:8},(_,i)=>[i]));assert.deepEqual(original.trace.map(c=>c.flatMap(x=>x.polygons)),original.groups.map(g=>g.polygons))
 const facts=[],coverage=[],strokes=[],pairBoundaries=[]
 function segment(polys,direction,weight){
  assert(polys.every(p=>p.every(q=>q.off===0&&Number.isFinite(q.x)&&Number.isFinite(q.y))))
  const normalized=polys.map(p=>{const a=p.reduce((s,q,i)=>{const z=p[(i+1)%p.length];return s+q.x*z.y-z.x*q.y},0);assert(a);return a<0?[p[0],...p.slice(1).reverse()]:p})
  const ps=polys.flat(),xs=ps.map(q=>q.x/2),ys=ps.map(q=>q.y/2)
  return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
 }
 for(let raw=0;raw<8;raw++){
  const M=(raw===1?candidate.matricesByRawOneBased['2']:raw===2?recipe.risingMatrixExact:['1','0','0','1','0','0']).map(rat),transform=p=>apply(M,p).map(num)
  const transformed=original.trace[raw].map(call=>({...call,polygons:call.polygons.map(p=>p.map(q=>{const[x,y]=transform([q.x,q.y]);return{x,y,off:q.off}}))}))
  assert.deepEqual(transformed.flatMap(c=>c.polygons),candidate.groups[raw].polygons)
  const row=transformed.map((call,mask)=>{
   const n={cdDrawLine:2,cdDrawCurve:3,cdDrawBezier:4}[call.kind];assert(n)
   const points=Array.from({length:n},(_,i)=>transform(original.trace[raw][mask].args.slice(2*i,2*i+2)).map(x=>x/2)),[s,...rest]=points,e=points.at(-1),fact={logical:raw+1,mask:mask+1,originalKind:call.kind,sourceFlags:call.args.slice(2*n),originalSourcePBytesPreserved:true,declaredAffineOnly:raw===1||raw===2,sourceMatrixExact:M.map(v=>v.d===1n?String(v.n):v.n+'/'+v.d),guide100:points}
   facts.push(fact)
   if(n===2){const direction=s[0]===e[0]?(e[1]>s[1]?'down':'up'):(e[0]>s[0]?'right':'left');fact.cardinalPolicy=direction;return segment(call.polygons,direction,Math.hypot(e[0]-s[0],e[1]-s[1]))}
   const next=rest.find(q=>q[0]!==s[0]||q[1]!==s[1]),length=Math.hypot(next[0]-s[0],next[1]-s[1]),unit=[(next[0]-s[0])/length,(next[1]-s[1])/length],padding=7,width=14,padded=s.map((v,i)=>v-padding*unit[i]),command=n===3?' Q':' C',revealPath='M'+padded.join(' ')+' L'+s.join(' ')+command+rest.map(p=>p.join(' ')).join(' '),weight=padding+points.slice(1).reduce((v,p,i)=>v+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0)+1e-9
   const out={...segment(call.polygons,'curve',weight),revealPath,revealWidth:width},all=call.polygons.flat().map(q=>[q.x/2,q.y/2]);out.revealStartGate={unit,minProjection:Math.min(...all.map(p=>p[0]*unit[0]+p[1]*unit[1])),firstProjection:s[0]*unit[0]+s[1]*unit[1],padding,until:padding/weight,bounds:out.bounds}
   for(const p of[0,1e-6,out.revealStartGate.until-1e-8]){const v=outlineStartClip(out,p);assert.equal(typeof v,'string');assert(!v.includes('NaN')&&!v.includes('Infinity'))}assert.equal(outlineStartClip(out,out.revealStartGate.until),undefined)
   fact.curvePolicy={width,padding,weight,until:padding/weight,originalMicroclockEquivalent:false};coverage.push({logical:raw+1,mask:mask+1,polygons:call.polygons.map(p=>p.map(q=>[q.x/2,q.y/2])),points,padded,radius:7});return out
  });strokes.push(row)
  let total=row.reduce((n,s)=>n+s.weight,0),done=0;for(let mask=0;mask<row.length-1;mask++){done+=row[mask].weight;pairBoundaries.push({logical:raw+1,afterMask:mask+1,logicalProgress:done/total})}
 }
 assert.equal(strokes.length,8);assert.equal(strokes.flat().length,9);assert.equal(coverage.length,3);assert.equal(strokes[2][0].direction,'right');assert.equal(facts[2].guide100[1][1]<facts[2].guide100[0][1],true)
 const inputSHA256={...FIXED,[F+'prepare-execution-rising-v2.mjs']:sha(read(F+'prepare-execution-rising-v2.mjs'))}
 const fixture={schema:'hanja-ownstroke-actual-R-execution-draft/v1',date:'2026-10-29',glyph:'幷',variantId:'u5e77-original005-author-uppercontact-rising3-v2-execution-draft',locallyAuthoredRoot:true,mixedParts:false,originalWhole:false,isOriginalEngineCapture:false,sourceTraceDescribesReplacement:false,inputSHA256,logicalRawGroupsZeroBased:Array.from({length:8},(_,i)=>[i]),normalization:{from:200,to:100,applications:1,yFlip:false,winding:'legacy per-polygon positive winding; same primitive compound; source P coordinates unchanged except declared2/3 positiveaffines'},strokes,approval:{whole:false,mapping:false,direction:false,timing:false,native:false,runtime:false},policyStatus:'Executable draft only. Static finite8 roles and original24clock support macro direction; curve width14/pad7/startgate and genericcardinal reveal remain author display proposals.'}
 const check={schema:'hanja-ownstroke-R-draft-code-check/v1',date:'2026-10-29',glyph:'幷',status:'PASS-limited-source-affine-and-guide-code-only',inputSHA256,logicalPens:8,segments:9,curves:3,sourcePolygons:18,changedRawZeroBased:[1,2],otherSixGroupsExact:true,logicalOrder:'identity1..8',originalSourcePAndTraceUnchanged:true,onlyDeclaredWholePAndGuideAffines:true,pairBoundaries,facts,curveCoverageSeparate:true,nativeApproval:false,runtimeApplied:false}
 return{fixture,check,coverage}
}
export{build}
