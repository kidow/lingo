/** Raster experiment only. Inputs are immutable public polygons, not authored trajectories. */
export class UnreachableDomainError extends Error {
  constructor(diagnostics) { super('Original vector component or sampled raster domain is unrepresented/unreachable; rendering rejected'); this.name='UnreachableDomainError'; this.diagnostics=diagnostics }
}
const now=()=>globalThis.performance?.now()??Date.now()
function inside(point,polygon){
  let odd=false
  for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
    const a=polygon[j],b=polygon[i]
    const cross=(b.x-a.x)*(point.y-a.y)-(b.y-a.y)*(point.x-a.x)
    if(cross===0&&point.x>=Math.min(a.x,b.x)&&point.x<=Math.max(a.x,b.x)&&point.y>=Math.min(a.y,b.y)&&point.y<=Math.max(a.y,b.y))return true
    if((a.y>point.y)!==(b.y>point.y)&&point.x<(b.x-a.x)*(point.y-a.y)/(b.y-a.y)+a.x)odd=!odd
  }
  return odd
}
function checkPolygons(polygons,label){
  if(!Array.isArray(polygons)||!polygons.length)throw new TypeError(label+' polygons required')
  for(const p of polygons){
    if(!Array.isArray(p)||p.length<3)throw new TypeError(label+' polygon needs at least3 vertices')
    for(const v of p)if(!Number.isFinite(v.x)||!Number.isFinite(v.y)||v.off!==undefined&&v.off!==0)throw new TypeError('Finite straight original vertices required')
  }
}

function segmentInsideUnion(a,b,polygons){
  const rx=b.x-a.x,ry=b.y-a.y,times=[0,1],cross=(x,y,u,v)=>x*v-y*u
  for(const polygon of polygons)for(let i=0;i<polygon.length;i++){
    const c=polygon[i],d=polygon[(i+1)%polygon.length],sx=d.x-c.x,sy=d.y-c.y,qx=c.x-a.x,qy=c.y-a.y,den=cross(rx,ry,sx,sy)
    if(den!==0){const t=cross(qx,qy,sx,sy)/den,u=cross(qx,qy,rx,ry)/den;if(t>0&&t<1&&u>=0&&u<=1)times.push(t)}
    else if(cross(qx,qy,rx,ry)===0){for(const p of[c,d]){const t=Math.abs(rx)>=Math.abs(ry)?(p.x-a.x)/rx:(p.y-a.y)/ry;if(t>0&&t<1)times.push(t)}}
  }
  const sorted=[...new Set(times)].sort((x,y)=>x-y)
  for(let i=1;i<sorted.length;i++){const t=(sorted[i-1]+sorted[i])/2,point={x:a.x+t*rx,y:a.y+t*ry};if(!polygons.some(p=>inside(point,p)))return false}
  return true
}


// Exact component topology for the supported simple straight-polygon input model.
// Numbers are interpreted as their canonical decimal strings, never rounded or repaired.
const gcd=(a,b)=>{while(b){const r=a%b;a=b;b=r}return a}
const lcm=(a,b)=>a/gcd(a,b)*b
function decimal(value){
  const s=String(value)
  if(typeof value!=='number'||!Number.isFinite(value)||!/^[-]?\d+(?:\.\d{1,12})?$/.test(s)||Math.abs(value)>1e6)throw new TypeError('Exact component guard supports finite non-exponent decimals with at most12 fractional digits and magnitude<=1e6')
  const negative=s.startsWith('-'),parts=(negative?s.slice(1):s).split('.'),fraction=parts[1]??'',d=10n**BigInt(fraction.length),n=BigInt(parts[0]+fraction)*(negative?-1n:1n)
  return {n,d}
}
const icross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x)
const ion=(a,b,p)=>icross(a,b,p)===0n&&p.x>=(a.x<b.x?a.x:b.x)&&p.x<=(a.x>b.x?a.x:b.x)&&p.y>=(a.y<b.y?a.y:b.y)&&p.y<=(a.y>b.y?a.y:b.y)
const opposite=(a,b)=>a>0n&&b<0n||a<0n&&b>0n
function ihit(a,b,c,d){
 const x=icross(a,b,c),y=icross(a,b,d),z=icross(c,d,a),w=icross(c,d,b)
 return opposite(x,y)&&opposite(z,w)||x===0n&&ion(a,b,c)||y===0n&&ion(a,b,d)||z===0n&&ion(c,d,a)||w===0n&&ion(c,d,b)
}
function iinside(p,polygon){
 let odd=false
 for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
  const a=polygon[j],b=polygon[i]
  if(ion(a,b,p))return true
  if((a.y>p.y)!==(b.y>p.y)){const left=(b.x-a.x)*(p.y-a.y),right=(p.x-a.x)*(b.y-a.y);if(b.y>a.y?left>right:left<right)odd=!odd}
 }
 return odd
}
function simplePolygon(p){
 const area=p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a.x*b.y-b.x*a.y},0n)
 if(area===0n)throw new TypeError('Degenerate polygon is unsupported')
 for(let i=0;i<p.length;i++){
  const a=p[i],b=p[(i+1)%p.length],c=p[(i+2)%p.length]
  if(a.x===b.x&&a.y===b.y)throw new TypeError('Degenerate zero-length polygon edge is unsupported')
  if(icross(a,b,c)===0n&&(ion(a,b,c)||ion(b,c,a)))throw new TypeError('Self-overlapping adjacent polygon edges are unsupported')
  for(let j=i+1;j<p.length;j++)if(j!==i+1&&!(i===0&&j===p.length-1)&&ihit(a,b,p[j],p[(j+1)%p.length]))throw new TypeError('Self-intersecting polygon is unsupported')
 }
}
function polygonsTouch(a,b){
 for(let i=0;i<a.length;i++)for(let j=0;j<b.length;j++)if(ihit(a[i],a[(i+1)%a.length],b[j],b[(j+1)%b.length]))return true
 return iinside(a[0],b)||iinside(b[0],a)
}
function iconvex(p){
 const area=p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a.x*b.y-b.x*a.y},0n)
 const sign=area>0n?1n:-1n
 return area!==0n&&p.every((a,i)=>p.every(v=>sign*icross(a,p[(i+1)%p.length],v)>=0n))
}
function vectorComponents(domain,seed,viewBox,size){
 if(domain.length>64||domain.reduce((n,p)=>n+p.length,0)>4096)throw new TypeError('Component guard is limited to64 polygons/4096 vertices')
 const raw=[...domain,...seed].map(p=>p.map(v=>({x:decimal(v.x),y:decimal(v.y)}))),box=viewBox.map(decimal)
 let scale=1n
 for(const p of raw)for(const v of p)scale=lcm(lcm(scale,v.x.d),v.y.d)
 for(const v of box)scale=lcm(scale,v.d)
 scale=lcm(scale,box[2].d*2n*BigInt(size));scale=lcm(scale,box[3].d*2n*BigInt(size))
 const integer=v=>v.n*(scale/v.d),polygons=raw.map(p=>p.map(v=>({x:integer(v.x),y:integer(v.y)}))),D=polygons.slice(0,domain.length),V=polygons[domain.length]
 for(const p of polygons)simplePolygon(p)
 if(!iconvex(V))throw new TypeError('Experiment requires one exact-convex completed-V seed polygon')
 const parent=D.map((_,i)=>i),find=i=>{while(parent[i]!==i){parent[i]=parent[parent[i]];i=parent[i]}return i}
 for(let i=0;i<D.length;i++)for(let j=i+1;j<D.length;j++)if(polygonsTouch(D[i],D[j]))parent[find(j)]=find(i)
 const ids=new Map(),polygonLabels=D.map((_,i)=>{const r=find(i);if(!ids.has(r))ids.set(r,ids.size+1);return ids.get(r)})
 const details=Array.from({length:ids.size},(_,i)=>({id:i+1,polygons:[],sampledCells:0,seedCells:0,reachedCells:0,hasExactSampleWitness:false,hasExactSeedWitness:false}))
 polygonLabels.forEach((id,i)=>details[id-1].polygons.push(i))
 const x0=integer(box[0]),y0=integer(box[1]),w=integer(box[2]),h=integer(box[3]),den=BigInt(size)
 const center=(x,y)=>({x:x0+w*BigInt(2*x+1)/(2n*den),y:y0+h*BigInt(2*y+1)/(2n*den)})
 const member=(x,y)=>{const p=center(x,y);for(let i=0;i<D.length;i++)if(iinside(p,D[i]))return polygonLabels[i];return 0}
 const fullSeed=(x,y)=>[[x,y],[x+1,y],[x,y+1],[x+1,y+1]].every(([ix,iy])=>iinside({x:x0+w*BigInt(ix)/den,y:y0+h*BigInt(iy)/den},V))
 return {details,member,fullSeed}
}

/** Raster shortest paths; exact original component guard; still not vector coverage proof. */
export function buildGeodesicField({domain,seed,size=200,viewBox=[0,0,100,100]}){
  const start=now();checkPolygons(domain,'domain');checkPolygons(seed,'seed');if(seed.length!==1)throw new TypeError('Experiment requires one convex completed-V seed polygon')
  if(!Number.isInteger(size)||size<4||size>512)throw new RangeError('Grid size must be4..512')
  if(viewBox.length!==4||viewBox.some(v=>!Number.isFinite(v))||viewBox[2]<=0||viewBox[3]<=0)throw new RangeError('Finite positive viewBox required')
  const vector=vectorComponents(domain,seed,viewBox,size)
  const [x0,y0,width,height]=viewBox,sx=width/size,sy=height/size,n=size*size
  const occupancy=new Uint8Array(n),seeds=new Uint8Array(n),vectorLabels=new Uint32Array(n),distance=new Float64Array(n).fill(Infinity)
  let domainCells=0,seedCells=0
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const point={x:x0+(x+.5)*sx,y:y0+(y+.5)*sy},i=y*size+x
    if(domain.some(p=>inside(point,p))){const id=vector.member(x,y);if(id){occupancy[i]=1;domainCells++;vectorLabels[i]=id;const detail=vector.details[id-1];detail.sampledCells++;detail.hasExactSampleWitness=true;if(vector.fullSeed(x,y)){seeds[i]=1;seedCells++;detail.seedCells++;detail.hasExactSeedWitness=true}}}
  }
  // Empty sampled domains are rejected below using the still-present vector components.
  const edgeCache=new Map();let blockedAdjacencies=0
  const center=i=>({x:x0+(i%size+.5)*sx,y:y0+(Math.floor(i/size)+.5)*sy})
  const edgeAllowed=(i,j)=>{const key=Math.min(i,j)*n+Math.max(i,j);if(edgeCache.has(key))return edgeCache.get(key);const allowed=vectorLabels[i]===vectorLabels[j]&&segmentInsideUnion(center(i),center(j),domain);edgeCache.set(key,allowed);if(!allowed)blockedAdjacencies++;return allowed}
  const labels=new Uint32Array(n),components=[]
  for(let i=0;i<n;i++)if(occupancy[i]&&!labels[i]){
    const id=components.length+1,queue=[i];labels[i]=id;let count=0,seedCount=0
    for(let q=0;q<queue.length;q++){const at=queue[q],x=at%size,y=Math.floor(at/size);count++;seedCount+=seeds[at]
      for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,j=ny*size+nx;if(nx>=0&&nx<size&&ny>=0&&ny<size&&occupancy[j]&&!labels[j]&&edgeAllowed(at,j)){labels[j]=id;queue.push(j)}}
    }
    components.push({id,cells:count,seedCells:seedCount})
  }
  const heap=[]
  const push=(d,i)=>{let k=heap.length;heap.push([d,i]);while(k){const p=(k-1)>>1;if(heap[p][0]<=d)break;heap[k]=heap[p];k=p}heap[k]=[d,i]}
  const pop=()=>{const out=heap[0],last=heap.pop();if(heap.length){let k=0;while(true){let c=k*2+1;if(c>=heap.length)break;if(c+1<heap.length&&heap[c+1][0]<heap[c][0])c++;if(heap[c][0]>=last[0])break;heap[k]=heap[c];k=c}heap[k]=last}return out}
  for(let i=0;i<n;i++)if(seeds[i]){distance[i]=0;push(0,i)}
  let reachedCells=0,maxDistance=0
  while(heap.length){const [d,i]=pop();if(d!==distance[i])continue;reachedCells++;vector.details[vectorLabels[i]-1].reachedCells++;maxDistance=Math.max(maxDistance,d);const x=i%size,y=Math.floor(i/size)
    for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){
      const nx=x+dx,ny=y+dy,j=ny*size+nx
      if(nx<0||nx>=size||ny<0||ny>=size||!occupancy[j])continue
      if(dx&&dy&&(!occupancy[y*size+nx]||!occupancy[ny*size+x]||!edgeAllowed(i,y*size+nx)||!edgeAllowed(i,ny*size+x)))continue
      if(!edgeAllowed(i,j))continue
      const next=d+Math.hypot(dx*sx,dy*sy)
      if(next<distance[j]){distance[j]=next;push(next,j)}
    }
  }
  const diagnostics={size,domainCells,seedCells,components:components.length,seededComponents:components.filter(c=>c.seedCells>0).length,reachedCells,unreachableCells:domainCells-reachedCells,reachedRatio:domainCells?reachedCells/domainCells:0,maxDistance,preparationMillis:now()-start,blockedAdjacencies,topology:'Original-union segment containment checked for every adjacency; no corner cutting; conservative full-cell convex seed',arithmetic:'Original component graph and grid witnesses: BigInt rational canonical decimals. Adjacency interval checks: IEEE754 approximation',vectorComponents:vector.details.length,vectorComponentDetails:vector.details,unrepresentedVectorComponents:vector.details.filter(c=>!c.hasExactSampleWitness).map(c=>c.id),unseededVectorComponents:vector.details.filter(c=>!c.hasExactSeedWitness).map(c=>c.id),seedRule:'Every seed cell corner must be within the one convex completed-V polygon',coverageMeaning:'Sampled-cell reachability only; not full vector coverage or source-direction approval'}
  if(diagnostics.unreachableCells||!seedCells||diagnostics.unrepresentedVectorComponents.length||diagnostics.unseededVectorComponents.length)throw new UnreachableDomainError(diagnostics)
  return {size,viewBox:[...viewBox],occupancy,seeds,vectorLabels,distance,diagnostics}
}
export function rasterMask(field,progress){
  if(!Number.isFinite(progress))throw new TypeError('Finite progress required')
  const p=Math.max(0,Math.min(1,progress)),threshold=p*field.diagnostics.maxDistance,alpha=new Uint8ClampedArray(field.size*field.size)
  // p=1 uses this exact same threshold. No full-outline, fill or unmask fallback.
  if(p>0)for(let i=0;i<alpha.length;i++)if(field.occupancy[i]&&Number.isFinite(field.distance[i])&&field.distance[i]<=threshold)alpha[i]=255
  return alpha
}
export function maskCoverage(field,progress){
  const alpha=rasterMask(field,progress);let visibleCells=0;for(const a of alpha)if(a)visibleCells++
  return {visibleCells,domainCells:field.diagnostics.domainCells,ratio:visibleCells/field.diagnostics.domainCells,progress:Math.max(0,Math.min(1,progress))}
}
