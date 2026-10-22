import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const HERE=fileURLToPath(new URL('.',import.meta.url));
const ROOT=fileURLToPath(new URL('../../',import.meta.url));
const SOURCE='docs/hanja-goal-glyphwiki-batch898-2026-10-13/engine-whole-u928d.json';
const SOURCE_SHA='87cb68cf1f9cb210b49bcaece7c9eb7e5b3f9d56b528c9c331d1b76a4530bd71';
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;};
const r=(n,d=1n)=>{assert(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];};
const add=(a,b)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const sub=(a,b)=>r(a[0]*b[1]-b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>r(a[0]*b[0],a[1]*b[1]);
const div=(a,b)=>r(a[0]*b[1],a[1]*b[0]);
const num=x=>{const s=String(x),m=/^(-?)(\d+)(?:\.(\d+))?$/.exec(s);assert(m,'plain original decimal');const d=10n**BigInt((m[3]||'').length);return r((m[1]?-1n:1n)*BigInt(m[2]+(m[3]||'')),d);};
const eq=(a,b)=>a[0]*b[1]===b[0]*a[1],pe=(a,b)=>eq(a[0],b[0])&&eq(a[1],b[1]);
const vec=(a,b)=>a.map((x,i)=>sub(x,b[i]));
const cross=(a,b)=>sub(mul(a[0],b[1]),mul(a[1],b[0]));
const orient=(a,b,p)=>cross(vec(b,a),vec(p,a));
const abs=a=>[a[0]<0n?-a[0]:a[0],a[1]];
const area=p=>div(abs(p.reduce((s,a,i)=>add(s,cross(a,p[(i+1)%p.length])),r(0n))),r(2n));
const centroid=p=>p[0].map((_,i)=>div(p.reduce((s,q)=>add(s,q[i]),r(0n)),r(BigInt(p.length))));
const hit=(a,b,c,d)=>{const ab=vec(b,a),cd=vec(d,c),t=div(cross(vec(c,a),cd),cross(ab,cd));return a.map((x,i)=>add(x,mul(t,ab[i])));};
const clip=(p,a,b)=>{const out=[];for(let i=0;i<p.length;i++){const u=p[i],v=p[(i+1)%p.length],cu=orient(a,b,u)[0],cv=orient(a,b,v)[0];if(cu>=0n)out.push(u);if(cu<0n&&cv>0n||cu>0n&&cv<0n)out.push(hit(u,v,a,b));}return out.filter((p,i)=>!i||!pe(p,out[i-1])).filter((p,i,a)=>i!==a.length-1||!pe(p,a[0]));};
const signed=p=>p.reduce((s,a,i)=>add(s,cross(a,p[(i+1)%p.length])),r(0n))[0];
const ccw=p=>signed(p)<0n?[...p].reverse():[...p];
const intersect=(a,b)=>{let p=ccw(a);const q=ccw(b);for(let i=0;i<q.length&&p.length;i++)p=clip(p,q[i],q[(i+1)%q.length]);return p;};
const inTri=(p,t)=>t.every((a,i)=>orient(a,t[(i+1)%3],p)[0]>=0n);
const ear=p=>{let v=ccw(p),out=[];while(v.length>3){let found=false;for(let i=0;i<v.length;i++){const a=v[(i+v.length-1)%v.length],b=v[i],c=v[(i+1)%v.length];if(!orient(a,b,c)[0]){v.splice(i,1);found=true;break;}if(orient(a,b,c)[0]<0n)continue;if(v.some((q,j)=>j!==i&&j!==(i+1)%v.length&&j!==(i+v.length-1)%v.length&&inTri(q,[a,b,c])))continue;out.push([a,b,c]);v.splice(i,1);found=true;break;}assert(found,'simple exact ear required');}assert.equal(v.length,3);if(area(v)[0])out.push(v);return out;};
const shared=(a,b)=>{const out=a.filter(p=>b.some(q=>pe(p,q)));return out.length===2&&!pe(out[0],out[1])?out:null;};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function source(){const b=fs.readFileSync(ROOT+SOURCE);assert.equal(hash(b),SOURCE_SHA);const s=JSON.parse(b);assert.deepEqual(Object.keys(s).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(s.groups.length,15);assert.equal(s.groups.reduce((n,g)=>n+g.polygons.length,0),34);return s;}
const polygons=g=>g.polygons.map(p=>p.map(q=>{assert.equal(q.off,0);return[num(q.x),num(q.y)];}));
const encode=x=>JSON.stringify(x,(_,v)=>typeof v==='bigint'?v.toString():v,2)+'\n';
const decode=x=>JSON.parse(x,(_,v)=>Array.isArray(v)&&v.length===2&&v.every(z=>typeof z==='string'&&/^-?\d+$/.test(z))?v.map(BigInt):v);
function derive(){
 const s=source(),p1=polygons(s.groups[9]),p2=polygons(s.groups[10]);
 const intersections=[];
 for(const a of p1)for(const b of p2)for(let i=0;i<a.length;i++)for(let j=0;j<b.length;j++){
  const A=a[i],B=a[(i+1)%a.length],C=b[j],D=b[(j+1)%b.length];
  if(orient(A,B,C)[0]*orient(A,B,D)[0]<0n&&orient(C,D,A)[0]*orient(C,D,B)[0]<0n)intersections.push(hit(A,B,C,D));
 }
 assert(intersections.length);const cut=intersections.reduce((a,b)=>sub(a[0],b[0])[0]>0n?a:b)[0];
 // Exact arrangement of the three pinned original polygons, not a new glyph contour.
 const I=hit(p2[0][20],p2[0][21],p2[2][1],p2[2][2]);
 const union=[...p2[0].slice(0,21),I,p2[2][1],p2[0][21],p2[1][2]];
 const sector=clip(union,[cut,r(0n)],[cut,r(200n)]),triangles=ear(sector),p1Triangles=p1.flatMap(ear);
 let root=-1,overlap=null;
 for(let i=0;i<triangles.length&&root<0;i++)for(const t of p1Triangles){const q=intersect(triangles[i],t);if(q.length>=3&&area(q)[0]>0n){root=i;overlap=q;break;}}
 assert(root>=0,'positive original P1/sector contact required');
 const order=[{triangle:root,parent:null,seed:centroid(overlap),intersection:overlap}],seen=new Set([root]);
 while(order.length<triangles.length){const options=[];for(const parent of order)for(let i=0;i<triangles.length;i++)if(!seen.has(i)){const edge=shared(triangles[parent.triangle],triangles[i]);if(edge)options.push({triangle:i,parent:parent.triangle,seed:centroid(edge),sharedEdge:edge});}
  assert(options.length,'connected shared-edge dual graph required');
  options.sort((a,b)=>{const ca=centroid(triangles[a.triangle]),cb=centroid(triangles[b.triangle]);const x=sub(ca[0],cb[0])[0];return x<0n?-1:x>0n?1:sub(cb[1],ca[1])[0]<0n?-1:1;});
  const next=options[0];seen.add(next.triangle);order.push(next);
 }
 return {schema:'u928d-source-sector-triangulation/v1',glyph:'銍',sourceFile:SOURCE,sourceSHA256:SOURCE_SHA,sourceRoot:'u928d',sourceProofIdentity:{sourceRoot:'u928d',sourceProofFile:'engine-whole-u928d.json',sourceProofFileSha256:SOURCE_SHA},sourcePolygons:34,raw1Based:[10,11],cutX:cut,unionBoundary:union,sector,triangles,p1Triangles,order,areas:triangles.map(area),guideArgsOriginal:[s.groups[9].raw,s.groups[10].raw],derivation:{pureMaskTriangulationCalls:1,engine:0,sourceCompiler:0,sourceFactory:0,sourceProjection:0},scope:{newRevealMaskOnly:true,sourceInkChanged:false,sourceGuideChanged:false,originalTimingPreservedClaim:false,nativeApproval:false,runtimeApplied:false},policy:'Sequential convex homothety: root seed is centroid of exact positive P1 intersection; child seed is original shared-edge midpoint. Completed triangles remain. One nonzero mask path contains all visible triangle subpaths. Foot progress is an explicit diagnostic clock, not the original stroke timing. Q2 body keeps its original guide after the complete foot.'};
}
function check(f){
 const s=source(),p1=polygons(s.groups[9]),p2=polygons(s.groups[10]);
 assert.equal(f.sourceSHA256,SOURCE_SHA);assert.equal(f.sourcePolygons,34);assert.deepEqual(f.guideArgsOriginal,[s.groups[9].raw,s.groups[10].raw]);assert.equal(f.derivation.pureMaskTriangulationCalls,1);
 const originals=p2.flatMap(ear),overlaps=[];let total=p2.reduce((a,p)=>add(a,area(p)),r(0n));
 for(let i=0;i<p2.length;i++)for(let j=i+1;j<p2.length;j++)for(const a of ear(p2[i]))for(const b of ear(p2[j])){const q=intersect(a,b);if(q.length>=3&&area(q)[0]){overlaps.push(q);total=sub(total,area(q));}}
 const triple=intersect(ccw(p2[1]),ccw(p2[2]));assert(!triple.length||area(triple)[0]===0n,'no positive triple area');assert(eq(total,area(f.unionBoundary)),'exact original union area');
 const expectedSector=clip(f.unionBoundary,[f.cutX,r(0n)],[f.cutX,r(200n)]);assert.deepEqual(f.sector,expectedSector);
 assert.deepEqual(f.p1Triangles,p1.flatMap(ear));
 const left=p=>clip(p,[f.cutX,r(0n)],[f.cutX,r(200n)]);let sectorArea=r(0n);for(const t of originals){const q=left(t);if(q.length>=3)sectorArea=add(sectorArea,area(q));}for(const t of overlaps){const q=left(t);if(q.length>=3)sectorArea=sub(sectorArea,area(q));}assert(eq(sectorArea,area(f.sector)),'sector equals original union clipped by source cut');
 let sum=r(0n);for(let i=0;i<f.triangles.length;i++){const t=f.triangles[i];assert.equal(t.length,3);assert(signed(t)>0n);assert(t.every(p=>sub(p[0],f.cutX)[0]<=0n));assert(eq(area(t),f.areas[i]));sum=add(sum,area(t));
  let covered=r(0n);for(const original of originals){const q=intersect(t,original);if(q.length>=3)covered=add(covered,area(q));}for(const original of overlaps){const q=intersect(t,original);if(q.length>=3)covered=sub(covered,area(q));}assert(eq(covered,area(t)),'each triangle wholly covered by original P2 union');
  for(let j=0;j<i;j++){const q=intersect(t,f.triangles[j]);assert(!q.length||area(q)[0]===0n,'disjoint triangle interiors');}
 }assert(eq(sum,area(f.sector)),'exact sector coverage');
 assert.equal(f.order.length,f.triangles.length);const seen=new Set();for(const item of f.order){assert(!seen.has(item.triangle));const t=f.triangles[item.triangle];assert(inTri(item.seed,t),'seed inside convex child');
  if(item.parent===null){assert(!seen.size);assert(item.intersection.length>=3&&area(item.intersection)[0]>0n);assert(pe(item.seed,centroid(item.intersection)));assert(f.p1Triangles.some(p=>inTri(item.seed,ccw(p))));assert(item.intersection.every(p=>inTri(p,t)));}
  else{assert(seen.has(item.parent));const edge=shared(f.triangles[item.parent],t);assert(edge);assert.deepEqual(edge,item.sharedEdge);assert(pe(item.seed,centroid(edge)));}seen.add(item.triangle);
 }
 // Exact convex homothety facts, including zero-area p0, nested edge rays, and p1.
 for(const item of f.order){const t=f.triangles[item.triangle],p=r(1n,2n);const half=t.map(v=>v.map((x,i)=>add(item.seed[i],mul(p,sub(x,item.seed[i])))));assert(eq(area(half),div(area(t),r(4n))));assert(half.every(x=>inTri(x,t)));}
 const bad=structuredClone(f);bad.order[0].seed=[r(1000n),r(1000n)];assert(!inTri(bad.order[0].seed,bad.triangles[bad.order[0].triangle]));
 assert.equal(f.scope.nativeApproval,false);assert.equal(f.scope.sourceInkChanged,false);
 return {cachedFocusedFirstPass:true,sourcePolygons:34,triangles:f.triangles.length,exactSectorArea:area(f.sector).map(String),rootPositiveContact:true,connectedSharedEdgeGraph:true,nestedHomothety:true,newGlyphInk:0,engine:0,sourceCompiler:0};
}
const GEOMETRY_FIELDS=['unionBoundary','sector','triangles','p1Triangles','areas','guideArgsOriginal'];
const PRIOR_GEOMETRY_SHA='3a7d1d1647aeeb1df60dc4a9ee7857386c4d13f0ed1db7451d0968602fff77ae';
const PRIOR_FIXTURE_SHA='5bdc8639d4d6fae1adbb7f743b4419de29aca8a1fefdc806fc81c911ec55d5f6';
function geometryGuard(f){const g={};for(const k of GEOMETRY_FIELDS)g[k]=f[k];assert.equal(hash(encode(g)),PRIOR_GEOMETRY_SHA,'all cached original triangle/source coordinates unchanged');}
function reroot(f){
 geometryGuard(f);const root=3;let overlap=null,p1Triangle=-1;
 for(let i=0;i<f.p1Triangles.length;i++){const q=intersect(f.triangles[root],f.p1Triangles[i]);if(q.length>=3&&area(q)[0]>0n&&(!overlap||sub(area(q),area(overlap))[0]>0n)){overlap=q;p1Triangle=i;}}
 assert(overlap,'broad triangle3 must have positive original P1 overlap');
 const order=[{triangle:root,parent:null,seed:centroid(overlap),intersection:overlap,p1Triangle}],seen=new Set([root]);
 while(order.length<f.triangles.length){const options=[];for(const parent of order)for(let i=0;i<f.triangles.length;i++)if(!seen.has(i)){const edge=shared(f.triangles[parent.triangle],f.triangles[i]);if(edge)options.push({triangle:i,parent:parent.triangle,seed:centroid(edge),sharedEdge:edge});}
  assert(options.length);options.sort((a,b)=>{const d=sub(f.areas[b.triangle],f.areas[a.triangle])[0];return d<0n?-1:d>0n?1:a.triangle-b.triangle;});const next=options[0];seen.add(next.triangle);order.push(next);
 }
 const total=f.areas.reduce(add,r(0n));f.order=order;f.phaseWeights=order.map(item=>div(f.areas[item.triangle],total));
 f.revision={cachedRerootCalls:1,priorFixtureSHA256:PRIOR_FIXTURE_SHA,unchangedGeometrySHA256:PRIOR_GEOMETRY_SHA,triangleDerivationRepeated:false,reason:'ROOT initial compact/foot/body showed no separate large island and coverage blank, but early natural foot showed a faint thin AA line; first root and two early ears were positive-area source slivers. Broad triangle3 positive P1 overlap and source-area weighted diagnostic clock replace equal stages. Native quality approval remains pending.'};
 f.policy+=' Revision1: broad triangle3 root at the centroid of its largest exact P1-triangle intersection; available children visit larger original areas first; diagnostic stage durations are proportional to exact source triangle areas. No epsilon deletion and no triangle removal.';return f;
}
function checkReroot(f){
 geometryGuard(f);assert.equal(f.sourceSHA256,SOURCE_SHA);assert.equal(f.revision.priorFixtureSHA256,PRIOR_FIXTURE_SHA);assert.equal(f.order[0].triangle,3);assert.equal(f.order.length,9);assert.equal(f.phaseWeights.length,9);
 let totalWeight=r(0n);const seen=new Set();const totalArea=f.areas.reduce(add,r(0n));
 for(let i=0;i<f.order.length;i++){const item=f.order[i],t=f.triangles[item.triangle];assert(!seen.has(item.triangle));assert(inTri(item.seed,t));assert(f.phaseWeights[i][0]>0n);assert(eq(f.phaseWeights[i],div(f.areas[item.triangle],totalArea)));totalWeight=add(totalWeight,f.phaseWeights[i]);
  if(i===0){const q=intersect(t,f.p1Triangles[item.p1Triangle]);assert(area(q)[0]>0n);assert.deepEqual(item.intersection,q);assert(pe(item.seed,centroid(q)));assert(inTri(item.seed,f.p1Triangles[item.p1Triangle]));}
  else{assert(seen.has(item.parent));const edge=shared(f.triangles[item.parent],t);assert(edge);assert.deepEqual(item.sharedEdge,edge);assert(pe(item.seed,centroid(edge)));}seen.add(item.triangle);
 }assert(eq(totalWeight,r(1n)));assert.equal(seen.size,9);
 const bad=structuredClone(f);bad.order[1].parent=bad.order[1].triangle;assert(!shared(bad.triangles[bad.order[1].parent],bad.triangles[bad.order[1].triangle]));
 return {changedRerootAndClockFirstPass:true,rootTriangle:3,positiveOriginalP1Intersection:true,trianglesPreserved:9,sourceAreaWeightSum:'1',connectedGraph:true,originalAreaCoverageFocusedRepeated:false,newTriangulationCalls:0,epsilonDeletion:0,nativeApproval:false};
}
const mode=process.argv[2];
if(mode==='--derive-once'){assert(!fs.existsSync(HERE+'fixture.json'),'public fixture already exists; no rederive');process.stdout.write(encode(derive()));}
else if(mode==='--check-cached')console.log(JSON.stringify(check(decode(fs.readFileSync(HERE+'fixture.json','utf8')))));
else if(mode==='--reroot-cached-once'){const b=fs.readFileSync(HERE+'fixture.json');assert.equal(hash(b),PRIOR_FIXTURE_SHA,'reroot only original cached revision once');process.stdout.write(encode(reroot(decode(b.toString('utf8')))));}
else if(mode==='--check-reroot-only')console.log(JSON.stringify(checkReroot(decode(fs.readFileSync(HERE+'fixture.json','utf8')))));
else throw Error('Use explicit first derivation/cached check or authorized reroot-only modes');
