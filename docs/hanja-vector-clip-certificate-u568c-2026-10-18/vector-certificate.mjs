/** Bounded derived-display mesh experiment. Never a stroke trajectory or approval. */
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b){const t=a%b;a=b;b=t}return a}
const Q=(n,d=1n)=>{if(d===0n)throw Error('zero denominator');if(d<0n){n=-n;d=-d}const g=gcd(n,d);return[n/g,d/g]}
const add=(a,b)=>Q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),neg=a=>[-a[0],a[1]],sub=(a,b)=>add(a,neg(b)),mul=(a,b)=>Q(a[0]*b[0],a[1]*b[1]),div=(a,b)=>Q(a[0]*b[1],a[1]*b[0]),cmp=(a,b)=>{const n=a[0]*b[1]-b[0]*a[1];return n<0n?-1:n>0n?1:0},zero=Q(0n),one=Q(1n)
const number=a=>Number(a[0])/Number(a[1]),key=a=>a[0]+'/'+a[1],pointKey=p=>key(p.x)+','+key(p.y)
function rational(n,coordinate=false){
 if(typeof n!=='number'||!Number.isFinite(n))throw Error('finite numeric input required')
 const s=String(n),m=s.match(/^(-?)(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/i)
 if(!m||coordinate&&(m[4]!==undefined||(m[3]?.length??0)>12||Math.abs(n)>1e6))throw Error('coordinate precision/range unsupported')
 const fractional=m[3]??'',power=Number(m[4]??0)-fractional.length,v=BigInt(m[2]+fractional)*(m[1]?-1n:1n)
 return power>=0?Q(v*10n**BigInt(power)):Q(v,10n**BigInt(-power))
}
const P=(x,y)=>({x,y}),same=(a,b)=>cmp(a.x,b.x)===0&&cmp(a.y,b.y)===0,vec=(a,b)=>P(sub(b.x,a.x),sub(b.y,a.y)),cross=(a,b)=>sub(mul(a.x,b.y),mul(a.y,b.x)),orient=(a,b,c)=>cross(vec(a,b),vec(a,c)),dot=(a,b)=>add(mul(a.x,b.x),mul(a.y,b.y)),mix=(a,b,t)=>P(add(a.x,mul(sub(b.x,a.x),t)),add(a.y,mul(sub(b.y,a.y),t)))
const between=(v,a,b)=>cmp(v,cmp(a,b)<0?a:b)>=0&&cmp(v,cmp(a,b)>0?a:b)<=0
const on=(a,b,p)=>cmp(orient(a,b,p),zero)===0&&between(p.x,a.x,b.x)&&between(p.y,a.y,b.y)
const area2=p=>p.reduce((s,a,i)=>add(s,cross(a,p[(i+1)%p.length])),zero)
const signedArea=p=>div(area2(p),Q(2n)),abs=a=>cmp(a,zero)<0?neg(a):a
const unique=values=>[...new Map(values.map(v=>[key(v),v])).values()].sort(cmp)
function intersections(a,b,c,d){
 const r=vec(a,b),s=vec(c,d),den=cross(r,s),v=vec(a,c)
 if(cmp(den,zero)!==0){const t=div(cross(v,s),den),u=div(cross(v,r),den);return between(t,zero,one)&&between(u,zero,one)?[t]:[]}
 if(cmp(cross(v,r),zero)!==0)return[]
 const axis=cmp(r.x,zero)!==0?'x':'y';return[c,d].map(p=>div(sub(p[axis],a[axis]),r[axis])).filter(t=>between(t,zero,one))
}
function location(p,polygon){
 let odd=false
 for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
  const a=polygon[j],b=polygon[i];if(on(a,b,p))return 0
  if((cmp(a.y,p.y)>0)!==(cmp(b.y,p.y)>0)){const x=add(a.x,div(mul(sub(p.y,a.y),sub(b.x,a.x)),sub(b.y,a.y)));if(cmp(p.x,x)<0)odd=!odd}
 }return odd?1:-1
}
const edges=p=>p.map((a,i)=>[a,p[(i+1)%p.length]])
function normalize(polygons,label){
 if(!Array.isArray(polygons)||!polygons.length)throw Error(label+' polygon array required')
 return polygons.map(poly=>{
  if(!Array.isArray(poly)||poly.length<3)throw Error('degenerate polygon')
  const p=poly.map(v=>{if(v.off!==undefined&&v.off!==0)throw Error('curved outline unsupported');return P(rational(v.x,true),rational(v.y,true))})
  if(cmp(area2(p),zero)===0)throw Error('degenerate polygon')
  const e=edges(p)
  for(let i=0;i<e.length;i++){
   if(same(...e[i]))throw Error('zero-length edge')
   const c=p[(i+2)%p.length];if(cmp(orient(...e[i],c),zero)===0&&(on(...e[i],c)||on(e[i][1],c,e[i][0])))throw Error('backtracking edge')
   for(let j=i+1;j<e.length;j++)if(j!==i+1&&!(i===0&&j===e.length-1)&&intersections(...e[i],...e[j]).length)throw Error('self-intersection unsupported')
  }
  return cmp(area2(p),zero)>0?p:[...p].reverse()
 })
}
function atoms(segments){
 const out=[]
 for(const[a,b]of segments){const ts=[zero,one];for(const[c,d]of segments)ts.push(...intersections(a,b,c,d));const sorted=unique(ts);for(let i=1;i<sorted.length;i++)out.push([mix(a,b,sorted[i-1]),mix(a,b,sorted[i])])}
 return out
}
const directedKey=([a,b])=>pointKey(a)+'>'+pointKey(b),undirectedKey=([a,b])=>[pointKey(a),pointKey(b)].sort().join('~')
function unionBoundary(polygons){
 const all=polygons.flatMap(edges),result=new Map()
 for(const[a,b]of atoms(all)){
  const mid=mix(a,b,Q(1n,2n));let left=false,right=false
  for(const p of polygons){const loc=location(mid,p);if(loc===1){left=right=true;break}if(loc===0)for(const[c,d]of edges(p))if(on(c,d,mid)){if(cmp(dot(vec(a,b),vec(c,d)),zero)>0)left=true;else right=true}}
  if(left!==right){const edge=left?[a,b]:[b,a];result.set(directedKey(edge),edge)}
 }
 const boundary=[...result.values()],incoming=new Map(),outgoing=new Map()
 for(const[a,b]of boundary){const ak=pointKey(a),bk=pointKey(b);if(outgoing.has(ak)||incoming.has(bk))throw Error('self-touch/nonmanifold union unsupported');outgoing.set(ak,[a,b]);incoming.set(bk,[a,b])}
 if(!boundary.length||incoming.size!==outgoing.size||[...outgoing.keys()].some(k=>!incoming.has(k)))throw Error('open union boundary')
 const seen=new Set(),loops=[]
 for(const first of boundary){if(seen.has(directedKey(first)))continue;const loop=[];let e=first;while(!seen.has(directedKey(e))){seen.add(directedKey(e));loop.push(e[0]);e=outgoing.get(pointKey(e[1]));if(!e)throw Error('open union boundary')}
  if(!same(e[0],first[0]))throw Error('nonmanifold boundary cycle');if(cmp(signedArea(loop),zero)<=0)throw Error('holes unsupported');loops.push(loop)
 }
 return{edges:boundary,loops,area:loops.reduce((s,p)=>add(s,signedArea(p)),zero)}
}
const edgeY=(edge,x)=>{const[a,b]=edge;return add(a.y,div(mul(sub(x,a.x),sub(b.y,a.y)),sub(b.x,a.x)))}
function intervalsAt(polygons,x){
 const intervals=[]
 for(const p of polygons){const crossed=edges(p).filter(([a,b])=>cmp(x,cmp(a.x,b.x)<0?a.x:b.x)>0&&cmp(x,cmp(a.x,b.x)>0?a.x:b.x)<0).map(edge=>({edge,y:edgeY(edge,x)})).sort((a,b)=>cmp(a.y,b.y));if(crossed.length%2)throw Error('unpaired vertical crossing');for(let i=0;i<crossed.length;i+=2)intervals.push({lo:crossed[i].edge,hi:crossed[i+1].edge,l:crossed[i].y,h:crossed[i+1].y})}
 intervals.sort((a,b)=>cmp(a.l,b.l));const merged=[]
 for(const v of intervals){const last=merged.at(-1);if(last&&cmp(v.l,last.h)<=0){if(cmp(v.h,last.h)>0){last.h=v.h;last.hi=v.hi}}else merged.push({...v})}return merged
}
const floor=a=>a[0]>=0n?a[0]/a[1]:-((-a[0]+a[1]-1n)/a[1])
const ceil=a=>-floor(neg(a))
function clean(poly){return poly.filter((p,i)=>!same(p,poly[(i+poly.length-1)%poly.length]))}
function convexClip(subject,clip){
 let out=subject
 for(const[a,b]of edges(clip)){const input=out;out=[];if(!input.length)break
  for(let i=0;i<input.length;i++){const p=input[i],q=input[(i+1)%input.length],sp=orient(a,b,p),sq=orient(a,b,q),ip=cmp(sp,zero)>=0,iq=cmp(sq,zero)>=0;if(ip)out.push(p);if(ip!==iq)out.push(mix(p,q,div(sp,sub(sp,sq))))}out=clean(out)
 }return out
}
function equalBoundary(a,b){
 const all=[...a,...b],points=[...new Map(all.flat().map(p=>[pointKey(p),p])).values()]
 const split=segments=>{const out=new Map();for(const[p,q]of segments){const axis=cmp(p.x,q.x)!==0?'x':'y',direction=sub(q[axis],p[axis]),ts=unique([zero,one,...points.filter(v=>on(p,q,v)).map(v=>div(sub(v[axis],p[axis]),direction))]);for(let i=1;i<ts.length;i++){const e=[mix(p,q,ts[i-1]),mix(p,q,ts[i])],k=directedKey(e);if(out.has(k))throw Error('duplicate oriented boundary');out.set(k,e)}}return out}
 const x=split(a),y=split(b);if(x.size!==y.size||[...x.keys()].some(k=>!y.has(k)))throw Error('derived/source boundary mismatch');return x.size
}
export function buildMesh({domain,seed,size=200,viewBox=[0,0,100,100]}){
 if(domain.length>3||domain.reduce((n,p)=>n+p.length,0)>28)throw Error('bounded to at most3 domain polygons/28 original vertices')
 if(seed.length!==1||seed[0].length!==4)throw Error('one completed-V quad required')
 if(!Number.isInteger(size)||size<4||size>200)throw Error('bounded grid4..200')
 const D=normalize(domain,'domain'),V=normalize(seed,'seed')[0],box=viewBox.map(v=>rational(v,true));if(box.length!==4||cmp(box[2],zero)<=0||cmp(box[3],zero)<=0)throw Error('viewBox required')
 for(const[a,b]of edges(V))if(V.some(v=>cmp(orient(a,b,v),zero)<0))throw Error('convex completed-V required')
 const [x0,y0,w,h]=box,sx=div(w,Q(BigInt(size))),sy=div(h,Q(BigInt(size))),x1=add(x0,w),y1=add(y0,h)
 for(const p of D.flat())if(!between(p.x,x0,x1)||!between(p.y,y0,y1))throw Error('domain outside viewBox')
 const boundary=unionBoundary(D),allEdges=D.flatMap(edges),xs=D.flat().map(p=>p.x)
 for(const[a,b]of atoms(allEdges))xs.push(a.x,b.x)
 for(let i=0;i<=size;i++){const x=add(x0,mul(sx,Q(BigInt(i)))),y=add(y0,mul(sy,Q(BigInt(i))));xs.push(x);for(const[a,b]of allEdges)if(cmp(a.y,b.y)!==0&&between(y,a.y,b.y))xs.push(mix(a,b,div(sub(y,a.y),sub(b.y,a.y))).x)}
 const minX=D.flat().map(p=>p.x).sort(cmp)[0],maxX=D.flat().map(p=>p.x).sort(cmp).at(-1),events=unique(xs).filter(x=>between(x,minX,maxX));if(events.length>512)throw Error('slab limit exceeded')
 const pieces=[]
 for(let i=1;i<events.length;i++){
  const l=events[i-1],r=events[i],mid=div(add(l,r),Q(2n)),cellX=Number(floor(div(sub(mid,x0),sx)))
  for(const interval of intervalsAt(D,mid)){
   const lowBand=Number(floor(div(sub(interval.l,y0),sy))),highBand=Number(ceil(div(sub(interval.h,y0),sy)))
   for(let row=lowBand;row<highBand;row++){if(row<0||row>=size)throw Error('band outside viewBox');const bottom=add(y0,mul(sy,Q(BigInt(row)))),top=add(bottom,sy),lo=cmp(interval.l,bottom)>0?x=>edgeY(interval.lo,x):()=>bottom,hi=cmp(interval.h,top)<0?x=>edgeY(interval.hi,x):()=>top;if(cmp(lo(mid),hi(mid))>=0)continue
    const polygon=clean([P(l,lo(l)),P(r,lo(r)),P(r,hi(r)),P(l,hi(l))]);if(polygon.length<3||cmp(signedArea(polygon),zero)<=0)throw Error('invalid derived piece');pieces.push({polygon,cell:[cellX,row]})
   }
  }
 }if(pieces.length>4096)throw Error('piece limit exceeded')
 const cuts=new Map();for(const piece of pieces)for(const p of piece.polygon){const k=key(p.x);if(!cuts.has(k))cuts.set(k,new Map());cuts.get(k).set(key(p.y),p.y)}
 const vertices=[],ids=new Map(),vertex=p=>{const k=pointKey(p);if(!ids.has(k)){ids.set(k,vertices.length);vertices.push(p)}return ids.get(k)},triangles=[]
 pieces.forEach((piece,pieceId)=>{const outline=[];for(const[a,b]of edges(piece.polygon)){outline.push(a);if(cmp(a.x,b.x)===0){let ys=[...cuts.get(key(a.x)).values()].filter(y=>between(y,a.y,b.y)&&cmp(y,a.y)!==0&&cmp(y,b.y)!==0).sort(cmp);if(cmp(a.y,b.y)>0)ys.reverse();outline.push(...ys.map(y=>P(a.x,y)))}}
  const center=piece.polygon.reduce((s,p)=>P(add(s.x,p.x),add(s.y,p.y)),P(zero,zero)),c=P(div(center.x,Q(BigInt(piece.polygon.length))),div(center.y,Q(BigInt(piece.polygon.length)))),ci=vertex(c)
  for(const[a,b]of edges(outline)){if(cmp(orient(c,a,b),zero)<=0)throw Error('degenerate fan triangle');triangles.push({v:[ci,vertex(a),vertex(b)],cell:piece.cell,piece:pieceId})}
 });if(triangles.length>32768)throw Error('triangle limit exceeded')
 return{D,V,box,size,sx,sy,vertices,triangles,pieces,boundary}
}
export function certifyMesh(mesh){
 const{vertices,triangles,D,V,boundary,size,sx,sy,box}=mesh,edgeMap=new Map(),cells=new Map();let total=zero
 for(let index=0;index<triangles.length;index++){
  const t=triangles[index],p=t.v.map(i=>vertices[i]),a=signedArea(p);if(cmp(a,zero)<=0)throw Error('nonpositive triangle');total=add(total,a)
  const[x,y]=t.cell;if(x<0||y<0||x>=size||y>=size)throw Error('invalid cell');const lo=P(add(box[0],mul(sx,Q(BigInt(x)))),add(box[1],mul(sy,Q(BigInt(y))))),hi=P(add(lo.x,sx),add(lo.y,sy));if(p.some(v=>!between(v.x,lo.x,hi.x)||!between(v.y,lo.y,hi.y)))throw Error('triangle crosses assigned cell')
  const ck=x+','+y;if(!cells.has(ck))cells.set(ck,[]);cells.get(ck).push(index)
  for(let j=0;j<3;j++){const va=t.v[j],vb=t.v[(j+1)%3],e=[vertices[va],vertices[vb]],k=undirectedKey(e);if(!edgeMap.has(k))edgeMap.set(k,[]);edgeMap.get(k).push({triangle:index,edge:e,ids:[va,vb]})}
 }
 let pairChecks=0;for(const list of cells.values())for(let i=0;i<list.length;i++)for(let j=i+1;j<list.length;j++){const a=triangles[list[i]].v.map(i=>vertices[i]),b=triangles[list[j]].v.map(i=>vertices[i]);pairChecks++;const overlap=convexClip(a,b);if(overlap.length>=3&&cmp(abs(signedArea(overlap)),zero)>0)throw Error('positive-area triangle overlap')}
 const meshBoundary=[],adj=triangles.map(()=>[])
 for(const entries of edgeMap.values()){if(entries.length===1)meshBoundary.push(entries[0].edge);else if(entries.length===2){if(!same(entries[0].edge[0],entries[1].edge[1])||!same(entries[0].edge[1],entries[1].edge[0]))throw Error('inconsistent shared edge');adj[entries[0].triangle].push(entries[1].triangle);adj[entries[1].triangle].push(entries[0].triangle)}else throw Error('nonmanifold derived edge')}
 const boundaryAtoms=equalBoundary(boundary.edges,meshBoundary);if(cmp(total,boundary.area)!==0)throw Error('triangle/source union area mismatch')
 const seedVertices=new Set(),seedTriangles=new Set();for(let i=0;i<triangles.length;i++){const t=triangles[i],[x,y]=t.cell,lo=P(add(box[0],mul(sx,Q(BigInt(x)))),add(box[1],mul(sy,Q(BigInt(y))))),hi=P(add(lo.x,sx),add(lo.y,sy));if([lo,P(hi.x,lo.y),hi,P(lo.x,hi.y)].every(p=>location(p,V)>=0)){t.v.forEach(v=>seedVertices.add(v));seedTriangles.add(i)}}
 const seen=new Set(),components=[];for(let i=0;i<triangles.length;i++){if(seen.has(i))continue;const queue=[i];seen.add(i);let seeded=0;for(let j=0;j<queue.length;j++){const t=queue[j];if(seedTriangles.has(t))seeded++;for(const n of adj[t])if(!seen.has(n)){seen.add(n);queue.push(n)}}components.push({triangles:queue.length,seedTriangles:seeded});if(!seeded)throw Error('positive-interface component has no full-cell V seed')}
 const local=[];for(const[ck,list]of cells){const allowed=new Set(list),done=new Set();let count=0;for(const i of list){if(done.has(i))continue;count++;const queue=[i];done.add(i);for(let j=0;j<queue.length;j++)for(const n of adj[queue[j]])if(allowed.has(n)&&!done.has(n)){done.add(n);queue.push(n)}}local.push({cell:ck,components:count})}
 return{edgeMap,adj,seedVertices,seedTriangles,diagnostics:{vertices:vertices.length,triangles:triangles.length,derivedPieces:mesh.pieces.length,positiveAreaCells:cells.size,localPiecesByCell:local,sourceUnionArea:number(boundary.area),sourceUnionAreaExact:key(boundary.area),triangleAreaExact:key(total),coverageAreaDifferenceExact:'0/1',boundaryAtomicSegments:boundaryAtoms,positiveInterfaceComponents:components,fullCellSeedVertices:seedVertices.size,fullCellSeedTriangles:seedTriangles.size,triangleIntersectionPairsChecked:pairChecks,sourceHoles:0,nonmanifold:false}}
}
export function assertNoPlateau(mesh,values){
 let seedPlateaus=0,minSpan=Infinity
 for(const t of mesh.triangles){const d=t.v.map(i=>values[i]);if(d.some(v=>!Number.isFinite(v)))throw Error('unreachable scalar vertex');const lo=Math.min(...d),hi=Math.max(...d),inside=t.v.every(i=>location(mesh.vertices[i],mesh.V)>=0);if(hi===lo){if(lo!==0||!inside)throw Error('nonseed positive-area plateau');seedPlateaus++}else minSpan=Math.min(minSpan,hi-lo);if(lo===0&&hi===0&&!inside)throw Error('zero plateau outside V')}
 return{seedPlateaus,nonseedPlateaus:0,minimumPositiveTriangleSpan:minSpan===Infinity?null:minSpan}
}
export function buildField(mesh,certificate=certifyMesh(mesh)){
 const graph=mesh.vertices.map(()=>new Map());for(const entries of certificate.edgeMap.values()){const[a,b]=entries[0].ids,p=mesh.vertices[a],q=mesh.vertices[b],length=Math.hypot(number(sub(p.x,q.x)),number(sub(p.y,q.y)));if(!(length>0&&Number.isFinite(length)))throw Error('invalid numeric graph edge');graph[a].set(b,length);graph[b].set(a,length)}
 const values=mesh.vertices.map((_,i)=>certificate.seedVertices.has(i)?0:Infinity),done=new Set(),parent=values.map(()=>-1)
 for(let count=0;count<values.length;count++){let current=-1;for(let i=0;i<values.length;i++)if(!done.has(i)&&(current===-1||values[i]<values[current]))current=i;if(current===-1||!Number.isFinite(values[current]))break;done.add(current);for(const[n,w]of graph[current])if(values[current]+w<values[n]){values[n]=values[current]+w;parent[n]=current}}
 for(let i=0;i<values.length;i++)if(!certificate.seedVertices.has(i)&&(parent[i]<0||!(values[parent[i]]<values[i])))throw Error('nonseed vertex lacks a strictly lower valid mesh-edge predecessor')
 const plateau=assertNoPlateau(mesh,values),maximum=Math.max(...values);return{values,maximum,parent,certificate,diagnostics:{...plateau,maximum,normalizedMinimumSpan:maximum&&plateau.minimumPositiveTriangleSpan!==null?plateau.minimumPositiveTriangleSpan/maximum:null,arithmetic:'Exact rational geometry and stored-scalar sublevel clipping; mesh-edge Euclidean weights/Dijkstra use IEEE754, not exact geodesic distance.',sharedVertexScalars:true,strictlyLowerNonseedPredecessors:true}}
}
function clippedParts(mesh,values,threshold){
 const level=Array.isArray(threshold)?threshold:rational(threshold),areas=[]
 for(const t of mesh.triangles){const polygon=t.v.map(i=>({...mesh.vertices[i],tau:rational(values[i])})),out=[];for(let i=0;i<3;i++){const a=polygon[i],b=polygon[(i+1)%3],ia=cmp(a.tau,level)<=0,ib=cmp(b.tau,level)<=0;if(ia)out.push(a);if(ia!==ib)out.push(mix(a,b,div(sub(level,a.tau),sub(b.tau,a.tau))))}areas.push(out.length>=3?abs(signedArea(out)):zero)}return areas
}
export function clippedArea(mesh,values,threshold){
 return clippedParts(mesh,values,threshold).reduce(add,zero)
}
export function summarize(mesh,field){
 const area=mesh.boundary.area,scale=Q(1n<<48n),levels=[0,.95,.9999,1].map(p=>{const threshold=mul(rational(p),rational(field.maximum)),parts=clippedParts(mesh,field.values,threshold);let low=0n,high=0n;for(const a of parts){const units=mul(a,scale);low+=floor(units);high+=ceil(units)}const visibleLow=div(Q(low),scale),visibleHigh=div(Q(high),scale),missingLow=cmp(sub(area,visibleHigh),zero)>0?sub(area,visibleHigh):zero,missingHigh=sub(area,visibleLow),exactMissing=p===1?sub(area,parts.reduce(add,zero)):null;return{progress:p,threshold:number(threshold),thresholdExact:key(threshold),visibleArea:number(div(add(visibleLow,visibleHigh),Q(2n))),visibleAreaBoundsExact:[key(visibleLow),key(visibleHigh)],missingArea:number(div(add(missingLow,missingHigh),Q(2n))),missingAreaBoundsExact:[key(missingLow),key(missingHigh)],missingAreaExact:exactMissing?key(exactMissing):null,areaReport:'Exact rational clipping per triangle; outward48-bit reporting bounds, no scalar/geometry perturbation.'}})
 if(levels.at(-1).missingAreaExact!=='0/1')throw Error('p1 coverage incomplete; no fallback')
 return{...field.certificate.diagnostics,field:field.diagnostics,levels,p0Meaning:'Only completed-V zero plateau may have positive area; no new geometric ink outside V. Pixel/AA effects are not certified.',p1MissingAreaExact:'0/1',sourceGeometryAuthored:false,originalTrajectoryApproved:false,nativeApproval:false,runtimeApplied:false}
}
export const exact={Q,rational,number,key,area:poly=>signedArea(normalize([poly],'area')[0])}
