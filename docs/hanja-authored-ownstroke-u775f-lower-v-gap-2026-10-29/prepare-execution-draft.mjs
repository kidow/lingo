import fs from'node:fs';import crypto from'node:crypto';import assert from'node:assert/strict'
import{outlineStartClip}from'../../lib/hanja-stroke-outline.ts'
const F="docs/hanja-authored-ownstroke-u775f-lower-v-gap-2026-10-29/",SOURCE="docs/hanja-goal-glyphwiki-batch670-2026-10-11/engine-whole-u775f-ue0100.json",root=new URL('../../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root)),sha=s=>crypto.createHash('sha256').update(s).digest('hex'),json=p=>JSON.parse(read(p)),FIXED={
  "docs/hanja-goal-glyphwiki-batch670-2026-10-11/engine-whole-u775f-ue0100.json": "347565d7f33cc24a018723c688cc272049ffc4b3255eb9dd25f33c340636d047",
  "docs/hanja-authored-ownstroke-u775f-lower-v-gap-2026-10-29/fixture.pending.json": "736de58fc2ee0045d469359b4c559ee7f2dd38f40c0d18e3d299d4b5a9493ef8",
  "docs/hanja-authored-ownstroke-u775f-lower-v-gap-2026-10-29/recipe.pending.json": "9c4c8094d6a1b4ace90cf074341ef34b5127f4a9ca6cc7be9660cb25132e3f72",
  "docs/hanja-authored-ownstroke-u775f-lower-v-gap-2026-10-29/materialize.py": "f094f1d6216959569385426f73d3dc572af300a4a451660573caf8e18be1ea83",
  "docs/hanja-authored-ownstroke-u775f-lower-v-gap-2026-10-29/native-static-review.json": "2553b5134a277515b5071de0fa90a726290afb01a72930cc09cd30d3d1a81a8e",
  "docs/hanja-authored-ownstroke-u775f-lower-v-gap-2026-10-29/native-mapping-review.json": "dcaaa3344b2c1145c50bc68bb6a19ca53ac798283c547b452a061ce2dad3867b",
  "docs/hanja-official-media-compare-u775f-2026-10-29/native-clock-review.json": "0764e42d9cfa06e7bb4b5fdf46e5627f3174ca12128556d8ef166c916d136a84",
  "lib/hanja-stroke-outline.ts": "b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40"
};
const WIDTHS={};
export function build(){
for(const[p,h]of Object.entries(FIXED))assert.equal(sha(read(p)),h,p);
const original=json(SOURCE),candidate=json(F+'fixture.pending.json'),recipe=json(F+'recipe.pending.json'),roles=json(F+'native-mapping-review.json'),groups=[[1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14]];
assert.equal(roles.status,'pass-bounded-thirteen-stroke-role-mapping');assert.deepEqual(roles.sourceGroupsOneBased,groups);assert.equal(json(F+'native-static-review.json').status,'pass-whole-raw14-affine-static-only');
assert.deepEqual(groups.flat(),Array.from({length:14},(_,i)=>i+1));assert.equal(candidate.groups.length,14);assert.equal(candidate.trace.flat().length,14);assert.deepEqual(candidate.groups.map(g=>g.polygons),candidate.trace.map(row=>row.flatMap(c=>c.polygons)));assert.deepEqual(recipe.candidate.matrixExact,['1','0','0','13/14','0','69/7']);
for(let i=0;i<13;i++){assert.deepEqual(candidate.groups[i],original.groups[i]);assert.deepEqual(candidate.trace[i],original.trace[i]);}
 const strokes=[],facts=[],pairProgress=[]
 function segment(polys,direction,weight){
  const ps=polys.flat();assert(ps.length&&ps.every(p=>p.off===0&&Number.isFinite(p.x)&&Number.isFinite(p.y)))
  const normalized=polys.map(p=>{const area=p.reduce((v,q,i)=>{const n=p[(i+1)%p.length];return v+q.x*n.y-n.x*q.y},0);assert.notEqual(area,0);return area<0?[p[0],...p.slice(1).reverse()]:p}),xs=ps.map(p=>p.x/2),ys=ps.map(p=>p.y/2)
  return{outline:normalized.map(p=>p.map((q,i)=>(i?'L':'M')+q.x/2+' '+q.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
 }
 for(let logical=0;logical<13;logical++){
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

assert.equal(strokes.length,13);assert.equal(strokes.flat().length,14);assert.equal(strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),25);assert.equal(strokes.flat().filter(s=>s.direction==='curve').length,4);assert.deepEqual(strokes.map(r=>r.length),[1,2,1,1,1,1,1,1,1,1,1,1,1]);
const inputSHA256={...FIXED,[F+'prepare-execution-draft.mjs']:sha(read(F+'prepare-execution-draft.mjs'))};
const fixture={schema:'hanja-ownstroke-curve-cardinal-execution-draft/v1',date:'2026-10-29',glyph:'睟',variantId:'u775f-raw14-positiveY-gap1-logical13-source-start-draft',locallyAuthoredRoot:'lingo-u775f-raw14-y13over14-gap1-draft',mixedParts:false,originalWhole:false,isOriginalEngineCapture:false,sourceTraceDescribesReplacement:false,normalization:{from:200,to:100,applications:1,winding:'positive per sourceP preserves independently painted union'},logicalRawGroupsOneBased:groups,sourceIdentity:'Fixed original u775f full5 is provenance only; candidate raw14 P/Q whole positiveY13/14 and69/7, other13raw exact; no new source engine.',temporalPolicy:'source-primitives-cardinal-and-quadratic-width14-pad7-start-gate-unapproved',inputSHA256,strokes,approval:{sourceClock:true,staticWhole:true,staticMapping:true,actualTemporal:false,runtimeApplied:false}};
return{fixture,check:{schema:'hanja-source-primitive-execution-check/v1',glyph:'睟',logical:13,sourceRaw:14,masks:14,P:25,curves:4,cardinal:10,geometrySHA256:sha(JSON.stringify(strokes)),facts,pairProgress,sourcePrimitiveCoordinatesRetained:true,newP:0,newGuide:0,sourceEngineRuns:0,privateFetch:0,actualNative:false,runtimeApplied:false,inputSHA256}};
}
if(process.argv[1]&&new URL('file://'+fs.realpathSync(process.argv[1])).href===import.meta.url)console.log(JSON.stringify(build()));
