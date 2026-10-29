import fs from'node:fs';import crypto from'node:crypto';import assert from'node:assert/strict'
import{outlineStartClip}from'../../lib/hanja-stroke-outline.ts'
const F="docs/hanja-authored-ownstroke-u6a96-hook-sweep-gap-v4-2026-10-29/",SOURCE="docs/hanja-goal-glyphwiki-batch672-2026-10-11/engine-whole-u6a96.json",root=new URL('../../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root)),sha=s=>crypto.createHash('sha256').update(s).digest('hex'),json=p=>JSON.parse(read(p)),FIXED={
  "docs/hanja-goal-glyphwiki-batch672-2026-10-11/engine-whole-u6a96.json": "4d80b42a99238926942a87a33a5af38c3f5838a04a3fd350a73aa54101523a4d",
  "docs/hanja-authored-ownstroke-u6a96-hook-sweep-gap-v4-2026-10-29/fixture.pending.json": "0165e36e65bbd342e3c128f03d0c3cd204377eecdddc1237346c5cf243273bfd",
  "docs/hanja-authored-ownstroke-u6a96-hook-sweep-gap-v4-2026-10-29/recipe.pending.json": "f65645ec37be0ab63558a02d9d1edde8d1c9f676a457fe96e529c0daaeeb7921",
  "docs/hanja-authored-ownstroke-u6a96-hook-sweep-gap-v4-2026-10-29/materialize.py": "9a317b14defd3b404d42752ec8adb78d0b78dab5551de4e5de1d9c2513c3d014",
  "docs/hanja-authored-ownstroke-u6a96-hook-sweep-gap-v4-2026-10-29/native-static-review.json": "6db1b73dc375f12e960e264d497acd5534e0945df526fa1fbc8c097b5cc312c5",
  "docs/hanja-authored-ownstroke-u6a96-dot-h-gap-2026-10-29/native-mapping-v3-review.json": "c47a7e58c6ce184e3bf51f2c7e0dd35f9089e1699c32f2b8bc81fbd97fb499eb",
  "docs/hanja-official-media-compare-u6a96-2026-10-29/native-clock-review.json": "8a8bd3a7f54a500fee27edf4df01b41770a4d11fd1d5eb7a098591f422b0f682",
  "lib/hanja-stroke-outline.ts": "b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40"
};
const WIDTHS={};
export function build(){
for(const[p,h]of Object.entries(FIXED))assert.equal(sha(read(p)),h,p);
const original=json(SOURCE),candidate=json(F+'fixture.pending.json'),recipe=json(F+'recipe.pending.json'),roles=json("docs/hanja-authored-ownstroke-u6a96-dot-h-gap-2026-10-29/native-mapping-v3-review.json"),groups=[[1],[2],[3],[4],[7],[5,6],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17,18],[19,20]];
assert(roles.roleMappingApproved);assert.deepEqual(roles.sourceGroupsOneBased,groups);assert.equal(json(F+'native-static-review.json').status,'pass-bounded-whole-hook-correction-static');assert(json(F+'native-static-review.json').wholeStaticApproved);
assert.deepEqual(groups.flat().slice().sort((a,b)=>a-b),Array.from({length:20},(_,i)=>i+1));assert.equal(new Set(groups.flat()).size,20);assert.equal(candidate.groups.length,20);assert.equal(candidate.trace.flat().length,21);assert.deepEqual(candidate.groups.map(g=>g.polygons),candidate.trace.map(row=>row.flatMap(c=>c.polygons)));assert.deepEqual(recipe.matrixExact,['1','0','0','8749/9215','0','6990/1843']);
for(let i=0;i<20;i++)if(![9,16].includes(i)){assert.deepEqual(candidate.groups[i],original.groups[i]);assert.deepEqual(candidate.trace[i],original.trace[i]);}
 const strokes=[],facts=[],pairProgress=[]
 function segment(polys,direction,weight){
  const ps=polys.flat();assert(ps.length&&ps.every(p=>p.off===0&&Number.isFinite(p.x)&&Number.isFinite(p.y)))
  const normalized=polys.map(p=>{const area=p.reduce((v,q,i)=>{const n=p[(i+1)%p.length];return v+q.x*n.y-n.x*q.y},0);assert.notEqual(area,0);return area<0?[p[0],...p.slice(1).reverse()]:p}),xs=ps.map(p=>p.x/2),ys=ps.map(p=>p.y/2)
  return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
 }
 for(let logical=0;logical<17;logical++){
  const row=[]
  for(const rawOneBased of groups[logical]){
   const i=rawOneBased-1,g=candidate.groups[i];assert.deepEqual(g.raw.slice(0,3),original.groups[i].raw.slice(0,3))
   for(let ci=0;ci<candidate.trace[i].length;ci++){
    const c=candidate.trace[i][ci],args=c.args;assert.deepEqual(args.slice(-2),original.trace[i][ci].args.slice(-2));const mask=row.length+1,fact={logical:logical+1,mask,sourceRawOneBased:rawOneBased,primitiveOneBased:ci+1,kind:c.kind,sourceFlags:args.slice(-2),originalSourcePAndGuideOrDeclaredWholeAffineOnly:true}
    if(c.kind==='cdDrawLine'){
     const p=args.slice(0,4).map(v=>v/2),dx=p[2]-p[0],dy=p[3]-p[1],direction=dy===0&&dx>0?'right':dx===0&&dy>0?'down':null;assert(direction);row.push(segment(c.polygons,direction,Math.hypot(dx,dy)));fact.guide100=[p.slice(0,2),p.slice(2,4)];fact.cardinalPolicy=direction
    }else{
     assert(['cdDrawCurve','cdDrawBezier'].includes(c.kind));const coords=args.slice(0,-2);assert.equal(coords.length,c.kind==='cdDrawCurve'?6:8);const points=Array.from({length:coords.length/2},(_,i)=>coords.slice(i*2,i*2+2).map(v=>v/2)),start=points[0],next=points.slice(1).find(p=>p[0]!==start[0]||p[1]!==start[1]);assert(next);const d=Math.hypot(next[0]-start[0],next[1]-start[1]),unit=[(next[0]-start[0])/d,(next[1]-start[1])/d],width=WIDTHS[(logical+1)+':'+mask]??14,padding=width/2,padded=start.map((v,i)=>v-padding*unit[i]),controlLength=points.slice(1).reduce((v,p,i)=>v+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0),weight=padding+controlLength+1e-9,revealPath='M'+padded.join(' ')+' L'+start.join(' ')+(points.length===3?' Q':' C')+points.slice(1).map(p=>p.join(' ')).join(' ')
     const s={...segment(c.polygons,'curve',weight),revealPath,revealWidth:width},all=c.polygons.flat().map(p=>[p.x/2,p.y/2]);s.revealStartGate={unit,minProjection:Math.min(...all.map(p=>p[0]*unit[0]+p[1]*unit[1])),firstProjection:start[0]*unit[0]+start[1]*unit[1],padding,until:padding/weight,bounds:s.bounds}
     for(const t of[0,1e-6,s.revealStartGate.until-1e-8]){const clip=outlineStartClip(s,t);assert.equal(typeof clip,'string');assert(!clip.includes('NaN')&&!clip.includes('Infinity'))}assert.equal(outlineStartClip(s,s.revealStartGate.until),undefined);row.push(s);fact.guide100=points;fact.curvePolicy={width,padding,controlLength,weight,until:padding/weight,originalMicroclockEquivalent:false}
    }
    facts.push(fact)
   }
  }
  strokes.push(row);const sum=row.reduce((v,s)=>v+s.weight,0);let before=0;row.slice(0,-1).forEach((s,i)=>{before+=s.weight;pairProgress.push({pen:logical+1,boundary:before/sum,nextMask:i+2})})
 }

assert.equal(strokes.length,17);assert.equal(strokes.flat().length,21);assert.equal(strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),40);assert.equal(strokes.flat().filter(s=>s.direction==='curve').length,15);assert.deepEqual(strokes.map(r=>r.length),[1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,2,2]);
const inputSHA256={...FIXED,[F+'prepare-execution-draft.mjs']:sha(read(F+'prepare-execution-draft.mjs'))};
const fixture={schema:'hanja-ownstroke-curve-cardinal-execution-draft/v1',date:'2026-10-29',glyph:'檖',variantId:'u6a96-raw17-X-raw10-Y-gap1-v4-logical17-source-start-draft',locallyAuthoredRoot:'lingo-u6a96-raw17-X-raw10-Y-gap1-v4-draft',mixedParts:false,originalWhole:false,isOriginalEngineCapture:false,sourceTraceDescribesReplacement:false,normalization:{from:200,to:100,applications:1,winding:'positive per sourceP preserves independently painted union'},logicalRawGroupsOneBased:groups,sourceIdentity:{original:SOURCE,originalSHA256:FIXED[SOURCE],authorChangesRawOneBased:[10,17],raw10MatrixExact:['1','0','0','8749/9215','0','6990/1843'],raw17MatrixExact:['212/239','0','0','1','12582/1195','0']},sourceMacroEvidence:{clock:{path:"docs/hanja-official-media-compare-u6a96-2026-10-29/native-clock-review.json",SHA256:FIXED["docs/hanja-official-media-compare-u6a96-2026-10-29/native-clock-review.json"]},roles:{path:"docs/hanja-authored-ownstroke-u6a96-dot-h-gap-2026-10-29/native-mapping-v3-review.json",SHA256:FIXED["docs/hanja-authored-ownstroke-u6a96-dot-h-gap-2026-10-29/native-mapping-v3-review.json"]},changedStatic:{path:F+'native-static-review.json',SHA256:FIXED[F+'native-static-review.json']}},temporalPolicy:'same-source-whole-raw17-X-raw10-Y-affines-padded7-width14-start-draft',inputSHA256,strokes,approval:{sourceClock:true,staticWhole:true,staticMapping:true,actualTemporal:false,runtimeApplied:false}};
return{fixture,check:{schema:'hanja-source-primitive-execution-check/v1',glyph:'檖',logical:17,sourceRaw:20,masks:21,P:40,curves:15,cardinal:6,geometrySHA256:sha(JSON.stringify(strokes)),facts,pairProgress,sourcePrimitiveCoordinatesRetained:true,declaredWholeAffineRaws:[10,17],sourceGuideGapsNotBridged:true,newP:0,newGuide:0,sourceEngineRuns:0,privateFetch:0,actualNative:false,runtimeApplied:false,inputSHA256}};
}
if(process.argv[1]&&new URL('file://'+fs.realpathSync(process.argv[1])).href===import.meta.url)console.log(JSON.stringify(build()));
