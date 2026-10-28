import{build}from'./prepare-execution-rising-v2.mjs'
import fs from'node:fs';import crypto from'node:crypto'
const F='docs/hanja-authored-ownstroke-u5e77-upper-h-2026-10-28/',root=new URL('../../',import.meta.url),sha=s=>crypto.createHash('sha256').update(s).digest('hex'),read=p=>fs.readFileSync(new URL(p,root))
const norm=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]),mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2]
function line(p,a,b){const d=[b[0]-a[0],b[1]-a[1]],s=d[0]*d[0]+d[1]*d[1],t=s?Math.max(0,Math.min(1,((p[0]-a[0])*d[0]+(p[1]-a[1])*d[1])/s)):0;return norm(p,[a[0]+t*d[0],a[1]+t*d[1]])}
function run(){
 const{coverage}=build(),units=[]
 for(const c of coverage){
  const q=c.points,samples=Array.from({length:4097},(_,i)=>{const t=i/4096,u=1-t;return[u*u*q[0][0]+2*u*t*q[1][0]+t*t*q[2][0],u*u*q[0][1]+2*u*t*q[1][1]+t*t*q[2][1]]})
  const distance=p=>{let v=line(p,c.padded,q[0]);for(const x of samples)v=Math.min(v,norm(p,x));return v}
  const stack=c.polygons.flatMap(p=>p.slice(1,-1).map((x,i)=>({tri:[p[0],x,p[i+2]],depth:0})));let nodes=0,maxDepth=0,maxUpper=0,unresolved=false
  while(stack.length){const{tri,depth}=stack.pop();nodes++;maxDepth=Math.max(maxDepth,depth);const center=[0,1].map(i=>tri.reduce((s,p)=>s+p[i],0)/3),bound=distance(center)+Math.max(...tri.map(p=>norm(p,center)))+1e-8;if(bound<=c.radius){maxUpper=Math.max(maxUpper,bound);continue}if(depth>=16||nodes>=60000){unresolved=true;break}const[a,b,d]=tri,ab=mid(a,b),bd=mid(b,d),da=mid(d,a);for(const t of[[a,ab,da],[ab,b,bd],[da,bd,d],[ab,bd,da]])stack.push({tri:t,depth:depth+1})}
  units.push({logical:c.logical,mask:c.mask,status:unresolved?'UNPROVED':'PASS-CONSERVATIVE-COVERAGE',radius:7,width:14,padding:7,nodes,maxDepth,maxAcceptedUpperDistance:maxUpper,sourceOutlinePreserved:true,sourceQGuidePreserved:true,nativeApproval:false})
 }
 return{schema:'hanja-public-source-curve-coverage-preflight/v1',date:'2026-10-29',glyph:'幷',scope:'Unchanged Q primitive masks1/4m2/5 only. Generic cardinal masks are not round-guide policies. No start/release/native approval.',inputSHA256:Object.fromEntries(['prepare-execution-rising-v2.mjs','fixtures-execution-rising-v2-draft.json','execution-rising-v2-check.json','coverage-rising-v2.mjs'].map(p=>[F+p,sha(read(F+p))])),method:'Polygon fan triangles conservatively cover each original finite filled polygon. At each triangle center distance to actual padded line segment and4097 evaluated original Q points gives an upper distance bound; plus triangle radius (1-Lipschitz) proves every triangle point within full round guide radius7. No original P/Q flattening. Concave fan may include outside ink and unresolved is not insufficient width.',numerics:{margin:1e-8,formalIntervalProof:false,depthLimit:16,nodeLimitPerMask:60000,QEvaluationsPerMask:4097},counts:{curveMasks:units.length,pass:units.filter(u=>u.status==='PASS-CONSERVATIVE-COVERAGE').length,unproved:units.filter(u=>u.status==='UNPROVED').length},units,cardinalPolicy:{masks:6,source2And3PositiveAffinesPreserved:true,source3RisingOutlineUsesRightwardGenericClip:true,nativeStartContactAndEndingReviewRequired:true},nativeApproval:false,runtimeApplied:false,sharedFilesChanged:false,serverStarts:0,buildRun:false}
}
export{run}
