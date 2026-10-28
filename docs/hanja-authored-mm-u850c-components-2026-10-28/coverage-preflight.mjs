import fs from 'node:fs'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'
import{parse,rat,add,sub,mul,eq,str,num,apply}from'./prepare-execution-draft.mjs'
const base=new URL('../../',import.meta.url),F='docs/hanja-authored-mm-u850c-components-2026-10-28/',EPS=1e-8
const read=p=>fs.readFileSync(new URL(p,base)),json=p=>JSON.parse(read(p)),sha=b=>crypto.createHash('sha256').update(b).digest('hex')
const sign=q=>q.n<0n?-1:q.n>0n?1:0,cmp=(a,b)=>sign(sub(a,b)),same=(a,b)=>eq(a[0],b[0])&&eq(a[1],b[1])
const cross=(a,b,c)=>sub(mul(sub(b[0],a[0]),sub(c[1],a[1])),mul(sub(b[1],a[1]),sub(c[0],a[0])))
const between=(a,b,x)=>cmp(x,a)>=0&&cmp(x,b)<=0||cmp(x,b)>=0&&cmp(x,a)<=0
const on=(a,b,p)=>sign(cross(a,b,p))===0&&between(a[0],b[0],p[0])&&between(a[1],b[1],p[1])
function intersects(a,b,c,d){const x=sign(cross(a,b,c)),y=sign(cross(a,b,d)),u=sign(cross(c,d,a)),v=sign(cross(c,d,b));return x*y<0&&u*v<0||!x&&on(a,b,c)||!y&&on(a,b,d)||!u&&on(c,d,a)||!v&&on(c,d,b)}
function ears(poly){
 let p=poly.slice(),changed=true
 while(changed){changed=false;for(let i=0;i<p.length;i++){const a=p[(i+p.length-1)%p.length],b=p[i],c=p[(i+1)%p.length];if(same(a,b)||same(b,c)||on(a,c,b)){p.splice(i,1);changed=true;break}}}
 assert(p.length>=3,'nondegenerate endpoint polygon required')
 for(let i=0;i<p.length;i++)for(let j=i+1;j<p.length;j++){if(j===i+1||i===0&&j===p.length-1)continue;assert(!intersects(p[i],p[(i+1)%p.length],p[j],p[(j+1)%p.length]),'endpoint polygon not simple')}
 let area=rat(0);for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length];area=add(area,sub(mul(a[0],b[1]),mul(b[0],a[1])))}assert(sign(area)!==0);if(sign(area)<0)p.reverse()
 const out=[];while(p.length>3){let found=false;for(let i=0;i<p.length;i++){const a=p[(i+p.length-1)%p.length],b=p[i],c=p[(i+1)%p.length];if(sign(cross(a,b,c))<=0)continue;let occupied=false;for(let k=0;k<p.length;k++){if([i,(i+p.length-1)%p.length,(i+1)%p.length].includes(k))continue;const q=p[k];if(sign(cross(a,b,q))>=0&&sign(cross(b,c,q))>=0&&sign(cross(c,a,q))>=0){occupied=true;break}}if(occupied)continue;out.push([a,b,c]);p.splice(i,1);found=true;break}assert(found,'exact ear not found')}
 out.push(p);return out
}
function hull(points){
 let p=[...new Map(points.map(p=>[p.map(str).join(','),p])).values()].sort((a,b)=>cmp(a[0],b[0])||cmp(a[1],b[1]));if(p.length<3)return[]
 const lower=[],upper=[];for(const q of p){while(lower.length>1&&sign(cross(lower.at(-2),lower.at(-1),q))<=0)lower.pop();lower.push(q)}for(const q of p.slice().reverse()){while(upper.length>1&&sign(cross(upper.at(-2),upper.at(-1),q))<=0)upper.pop();upper.push(q)}p=lower.slice(0,-1).concat(upper.slice(0,-1));return p.slice(1,-1).map((q,i)=>[p[0],q,p[i+2]])
}
const norm=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]),mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2]
function lineDistance(p,a,b){const x=b[0]-a[0],y=b[1]-a[1],sq=x*x+y*y,t=sq?Math.max(0,Math.min(1,((p[0]-a[0])*x+(p[1]-a[1])*y)/sq)):0;return Math.hypot(p[0]-a[0]-t*x,p[1]-a[1]-t*y)}
function bezier(points,t){let p=points;while(p.length>1)p=p.slice(1).map((q,i)=>[(1-t)*p[i][0]+t*q[0],(1-t)*p[i][1]+t*q[1]]);return p[0]}
function cover(triangles,distance,radius){
 const stack=triangles.map(tri=>({tri:tri.map(p=>p.map(num)),depth:0}));let nodes=0,maxDepth=0,maxAccepted=0
 while(stack.length){const{tri,depth}=stack.pop();nodes++;maxDepth=Math.max(maxDepth,depth);const center=[0,1].map(i=>tri.reduce((n,p)=>n+p[i],0)/3),bound=distance(center)+Math.max(...tri.map(p=>norm(p,center)))+EPS;if(bound<=radius){maxAccepted=Math.max(maxAccepted,bound);continue}if(depth>=16||nodes>=60000)return{covered:false,nodes,maxDepth,reason:'bounded conservative region unresolved; not insufficient-width proof'};const[a,b,c]=tri,ab=mid(a,b),bc=mid(b,c),ca=mid(c,a);for(const t of[[a,ab,ca],[ab,b,bc],[ca,bc,c],[ab,bc,ca]])stack.push({tri:t,depth:depth+1})}
 return{covered:true,nodes,maxDepth,maxAcceptedUpperDistance:maxAccepted}
}
function run(){
 const fixture=json(F+'fixtures-reveal-start-draft.json'),recipe=json(F+'recipe.json'),sources=Object.fromEntries(Object.entries(recipe.sources).map(([key,spec])=>{assert.equal(sha(read(spec.path)),spec.SHA256);return[key,json(spec.path).record]})),N=['1/10',0,0,'-1/10',0,90].map(rat)
 const unique=new Map();for(let i=0;i<recipe.parts.length;i++){const p=recipe.parts[i],key=p.source+':'+p.sourceStrokeOneBased;if(!unique.has(key))unique.set(key,{key,source:p.source,index:p.sourceStrokeOneBased-1,logicalMasks:[]});unique.get(key).logicalMasks.push(i+1)}
 const units=[]
 for(const item of unique.values()){
  const record=sources[item.source],originalD=record.strokes[item.index],rows=parse(originalD),median=record.medians[item.index].map(p=>apply(N,p).map(num)),first=median[0],next=median.find(p=>p[0]!==first[0]||p[1]!==first[1]),length=norm(first,next),unit=[(next[0]-first[0])/length,(next[1]-first[1])/length],padded=first.map((v,i)=>v-10*unit[i]),guide=[padded,...median],distance=p=>Math.min(...guide.slice(1).map((q,i)=>lineDistance(p,guide[i],q)))
  let current,endpoint=[],segments=[];for(const row of rows){const ps=Array.from({length:row.values.length/2},(_,i)=>apply(N,row.values.slice(2*i,2*i+2)));if(row.command==='M'){current=ps[0];endpoint.push(current)}else if(row.command==='Z'){if(!same(current,endpoint[0]))segments.push([current,endpoint[0]])}else{segments.push([current,...ps]);current=ps.at(-1);endpoint.push(current)}}if(same(endpoint[0],endpoint.at(-1)))endpoint.pop()
  let triangles=[],error;try{triangles=ears(endpoint);for(const s of segments)if(s.length>2)triangles.push(...hull(s))}catch(e){error=String(e.message)}
  const outliers=[];for(let segment=0;segment<segments.length;segment++){const controls=segments[segment].map(p=>p.map(num));for(let j=0;j<=256;j++){const p=bezier(controls,j/256),value=distance(p);if(value-EPS>10){outliers.push({sourceBoundarySegment:segment,degree:controls.length-1,t:j/256,originalUnplacedBoundaryPoint100:p,distanceLower:value-EPS,distanceUpper:value+EPS,necessaryWidthGreaterThan:2*(value-EPS)});break}}}
  const coverage=error?{covered:false,reason:error}:cover(triangles,distance,10),status=outliers.length?'OUTLIER-CONFIRMED':coverage.covered?'PASS-CONSERVATIVE-COVERAGE':'UNPROVED'
  for(const logical of item.logicalMasks){const s=fixture.u850c.strokes[logical-1][0];assert.equal(s.revealWidth,20);assert.equal(s.revealStartGate.padding,10);assert.equal(fixture.trace[logical-1].originalDSHA256,sha(originalD));assert.equal(fixture.trace[logical-1].placedAndMaskFramesExactlyEquivalent,true)}
  units.push({...item,sourceOriginalDSHA256:sha(originalD),status,radiusInUnplacedSource100:10,widthInUnplacedSource100:20,coverage,outliers:outliers.slice(0,4),outlierBoundarySegments:outliers.length,positiveAffineContainmentReusedForTheseMasks:true,nativeApproval:false})
 }
 assert.equal(units.length,13)
 return{schema:'hanja-public-MM-source-affine-coverage-preflight/v1',date:'2026-10-28',glyph:'蔌',scope:'Full round unplaced source guide only; source-start clip/dash removed. Exact existing affine equivalence transports containment to each placed mask. No source/renderer/native approval.',inputSHA256:Object.fromEntries([F+'fixtures-reveal-start-draft.json',F+'execution-draft-check.json',F+'recipe.json',F+'coverage-preflight.mjs'].map(p=>[p,sha(read(p))])),method:'Exact rational simple endpoint-polygon ear triangles plus convex hull of every original quadratic/cubic control polygon. The chord replacement changes winding only within that curve hull, so the union conservatively covers original filled D. Triangle distance bound uses distance to actual source polyline plus triangle radius; no product/source path flattening.',numerics:{margin:EPS,triangleDepthLimit:16,triangleNodeLimit:60000,boundarySamplesPerSourceSegment:257,formalIntervalProof:false},counts:{distinctOriginalPaths:13,logicalMasks:15,pass:units.filter(u=>u.status==='PASS-CONSERVATIVE-COVERAGE').length,outlier:units.filter(u=>u.status==='OUTLIER-CONFIRMED').length,unproved:units.filter(u=>u.status==='UNPROVED').length},units,limits:['Unresolved conservative regions do not prove width insufficient. Only actual unchanged contour samples with global polyline-distance lower bounds are counterexamples.','Common donorH/V source coverage may be reused for their separate positive affine placements; font identity, contact and timing approval do not follow.','Head0+, start gate release, polyline joins, ending and actualR replay remain for direct ROOT review.'],nativeApproval:false,runtimeApplied:false,sharedFilesChanged:false,serverStarts:0,buildRun:false}
}
export{run}
if(import.meta.url===new URL(process.argv[1]||'',new URL('file:///')).href)console.log(JSON.stringify(run()))
