import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {spawnSync} from 'node:child_process'
import {makeReviewedU7228SourceContext,reviewedU7228Context,reviewedU7228Policy,measureReviewedU7228Frame,commitReviewedU7228Caps,verifyReviewedU7228CapsPrior,REVIEWED_U7228_SOURCE} from './hanja-stroke-start-caps-u7228.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u7228-vs0-2026-10-25/fixtures.json',import.meta.url),'utf8')).u7228_ue0100
const clone=<T>(v:T):T=>JSON.parse(JSON.stringify(v))
const targets=[[1,1],[11,2],[14,1],[15,2],[18,1],[19,1],[22,1],[23,1],[25,1],[26,1],[27,1],[28,1],[29,1],[30,1]]
test('爨 exact body3 selects only fifteen original curve masks and rejects altered inputs',()=>{
 const ctx=makeReviewedU7228SourceContext(f.fullProof,f.identity,f.strokes);assert.ok(ctx);assert.equal(ctx,reviewedU7228Context(f.strokes))
 assert.deepEqual(Object.keys(f.fullProof).sort(),['defaults','groups','trace'])
 for(let p=0;p<30;p++)for(let m=0;m<f.strokes[p].length;m++){const policy=reviewedU7228Policy(ctx,p,m);assert.equal(!!policy,targets.some(([a,b])=>a===p+1&&b===m+1)||(p===1&&m===0));if(policy){assert.deepEqual(policy.segment,f.strokes[p][m]);assert.equal(policy.certificate.initialArcMax,7);assert.equal(policy.certificate.syntax,p===1||p===10?'ML':'MQ')}}
 assert.equal(makeReviewedU7228SourceContext({...f.fullProof,engineRevision:'synthetic'},f.identity,f.strokes),null)
 const identity=clone(f.identity);identity.sourceRoot='foreign';assert.equal(makeReviewedU7228SourceContext(f.fullProof,identity,f.strokes),null)
 const getter=clone(f.fullProof);Object.defineProperty(getter,'groups',{enumerable:true,get(){throw Error('must not invoke getter')}});assert.equal(makeReviewedU7228SourceContext(getter,f.identity,f.strokes),null)
 for(const field of ['outline','revealPath','revealWidth','weight']){const strokes=clone(f.strokes);strokes[10][1][field]=typeof strokes[10][1][field]==='number'?strokes[10][1][field]+1:strokes[10][1][field]+' ';assert.equal(reviewedU7228Context(strokes),null)}
 const elsewhere=clone(f.strokes);elsewhere[1][0].weight+=1;assert.equal(reviewedU7228Context(elsewhere),null)
 assert.equal(REVIEWED_U7228_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U7228_SOURCE.runtimeApplied,false)
})

test('爨 added second original ML has a strict full-P capsule and zero initial area',()=>{
 const ctx=makeReviewedU7228SourceContext(f.fullProof,f.identity,f.strokes),policy=reviewedU7228Policy(ctx,1,0)!,s=f.strokes[1][0],none={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 assert.equal(policy.certificate.syntax,'ML');assert.equal(policy.mask,1)
 assert.equal(commitReviewedU7228Caps(policy,s,0,'own',none).status,'empty');assert.equal(commitReviewedU7228Caps(policy,s,1,'own',none).status,'complete')
 for(const p of [Number.EPSILON,1e-15,1e-10,.01,.03]){const d=measurement(policy,p),frame=measureReviewedU7228Frame(policy,s,p,d.guide);assert.equal(frame.rho,Math.min(7,frame.d));if(p<=1e-10)assert(14*frame.d+2*Math.PI*frame.d**2<1.5e-7)}
 const code=String.raw`
from pathlib import Path
from fractions import Fraction as F
import json,re,hashlib
b=Path.cwd();proof=json.loads((b/'docs/hanja-source-original-u7228-vs0-2026-10-25/independent-initial-caps-proof.json').read_text());f=json.loads((b/proof['fixture']).read_text())['u7228_ue0100'];s=f['strokes'][1][0];c=proof['additionalMLCertificate'];cov=proof['additionalMLFullCoverageCertificate'];n=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])));q0,q1=n[:2],n[2:];v=[q1[i]-q0[i]for i in [0,1]];L2=sum(x*x for x in v);assert L2==F(c['lineSquared'])>49
assert hashlib.sha256(json.dumps(s,separators=(',',':')).encode()).hexdigest()==c['maskSHA256']
p=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',s['outline'])));poly=[tuple(p[i:i+2])for i in range(0,len(p),2)]
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
assert all(cross(poly[i],poly[(i+1)%4],poly[(i+2)%4])>0 for i in range(4))
for pt,row in zip(poly,cov['originalVertices']):
 t=max(F(0),min(F(1),sum((pt[i]-q0[i])*v[i]for i in [0,1])/L2));margin=49-sum((pt[i]-q0[i]-t*v[i])**2 for i in [0,1]);assert list(map(str,pt))==row['vertex'] and t==F(row['centerT']) and margin==F(row['radiusSquaredMargin'])>0
assert c['initialSufficientConditions'] and cov['strictFullPContained'] and not proof['nativeApproval']
print('새 원ML 2m1 초기조건·전체 원P capsule 증명 PASS')
`
 const r=spawnSync('python3',['-c',code],{cwd:new URL('..',import.meta.url),encoding:'utf8',timeout:30000});assert.equal(r.status,0,r.stdout+r.stderr)
})
function measurement(policy:NonNullable<ReturnType<typeof reviewedU7228Policy>>,progress:number){
 const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:()=> 'none'}
 const doc={defaultView:{document:null as unknown,getComputedStyle:()=>style}};doc.defaultView.document=doc
 const node=(localName:string,attributes:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,ownerSVGElement:null as unknown,parentElement:null as unknown,children:[] as unknown[],previousElementSibling:null as unknown,nextElementSibling:null as unknown,getAttribute:(k:string)=>attributes[k]??null,setAttribute:(k:string,v:string)=>{attributes[k]=v},removeAttribute:(k:string)=>{delete attributes[k]}})
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':String(policy.pen)}),g=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':policy.kind,'data-u7228-progress':String(progress)}),defs=node('defs')
 const [x,y]=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 const guide=Object.assign(node('path',{d:policy.segment.revealPath!,'data-u7228-measurement':'true'}),{getTotalLength:()=>100,getPointAtLength:(d:number)=>({x:x+d,y})})
 for(const n of [pen,g,defs,guide])n.ownerSVGElement=owner
 pen.parentElement=owner;g.parentElement=pen;defs.parentElement=g;guide.parentElement=defs;owner.children=[pen];g.children=[defs];defs.children=[guide]
 const prev=node('path',{d:policy.previousSegment?.outline??''});prev.ownerSVGElement=owner;prev.parentElement=pen;prev.nextElementSibling=g;g.previousElementSibling=prev;pen.children=policy.mask===2?[prev,g]:[g]
 const ink=node('path');ink.parentElement=g
 return {guide:guide as unknown as SVGPathElement,g:g as unknown as SVGGElement,prev,nodes:{measurement:null,guide:null,startCap:null,endCap:null,ink:ink as unknown as SVGPathElement}}
}
test('爨 epsilon radius tends to zero and compound masks require actual adjacent completed original H',()=>{
 const ctx=makeReviewedU7228SourceContext(f.fullProof,f.identity,f.strokes),none={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const [p,m] of targets){const policy=reviewedU7228Policy(ctx,p-1,m-1)!;const segment=f.strokes[p-1][m-1]
  assert.equal(commitReviewedU7228Caps(policy,segment,0,'own',none).status,'empty')
  for(const progress of [Number.EPSILON,1e-15,1e-10,.01,.03,.5,.99]){const dom=measurement(policy,progress),frame=measureReviewedU7228Frame(policy,segment,progress,dom.guide,m===2?1:0);assert.equal(frame.d,progress*100);assert.equal(frame.rho,Math.min(7,frame.d));if(progress<=1e-10){const bound=14*frame.d+2*Math.PI*frame.d**2;assert(bound<1.5e-7)}}
  const dom=measurement(policy,1);assert.equal(commitReviewedU7228Caps(policy,segment,1,'own',m===2?dom.nodes:none,m===2?1:0).status,'complete')
  assert.equal(commitReviewedU7228Caps({...policy},segment,1,'own',none).status,'hidden')
  if(m===2){assert.equal(verifyReviewedU7228CapsPrior(policy,dom.g,1),true);assert.equal(verifyReviewedU7228CapsPrior(policy,dom.g,.999),false);dom.prev.setAttribute('d',policy.previousSegment!.outline+' ');assert.equal(verifyReviewedU7228CapsPrior(policy,dom.g,1),false);assert.equal(commitReviewedU7228Caps(policy,segment,1,'own',dom.nodes,1).status,'hidden')}
 }
})
test('爨 new exact rational certificates cover original P with full radius7 guide and retain initial margins',()=>{
 const code=String.raw`
from pathlib import Path
from fractions import Fraction as F
import json,re,hashlib
b=Path.cwd();p=json.loads((b/'docs/hanja-source-original-u7228-vs0-2026-10-25/independent-initial-caps-proof.json').read_text());f=json.loads((b/p['fixture']).read_text())['u7228_ue0100']
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def area(p):return sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(p,p[1:]+p[:1]))/2
def contains(t,q):return all(cross(t[i],t[(i+1)%3],q)>=0 for i in range(3))
def ears(original):
 p=list(original);p=p if area(p)>0 else p[::-1];ids=list(range(len(p)));out=[]
 while len(ids)>3:
  found=False
  for j,i in enumerate(ids):
   ia,ib=ids[j-1],ids[(j+1)%len(ids)];t=(p[ia],p[i],p[ib]);turn=cross(*t)
   if turn==0 and all(min(p[ia][k],p[ib][k])<=p[i][k]<=max(p[ia][k],p[ib][k])for k in [0,1]):ids.pop(j);found=True;break
   if turn<=0 or any(contains(t,p[k])for k in ids if k not in [ia,i,ib]):continue
   out.append(t);ids.pop(j);found=True;break
  assert found
 t=tuple(p[k]for k in ids);assert cross(*t)>0;out.append(t);assert sum(area(list(t))for t in out)==abs(area(original));return out
def polys(s):
 out=[]
 for q in s.split(' Z'):
  if not q.strip():continue
  n=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',q)));out.append([tuple(n[i:i+2])for i in range(0,len(n),2)])
 return out
assert hashlib.sha256((b/p['fixture']).read_bytes()).hexdigest()==p['fixtureSHA256']
for c,row,connection in zip(p['initialCertificates'],p['fullQCoverageCertificates'],p['originalPConnectivity']):
 s=f['strokes'][c['pen']-1][c['mask']-1];n=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])));linear=c['syntax']=='ML';assert s['revealWidth']==14 and s['direction']=='curve';assert hashlib.sha256(json.dumps(s,separators=(',',':')).encode()).hexdigest()==c['maskSHA256']
 if linear:assert F(c['lineSquared'])==sum((n[i+2]-n[i])**2 for i in [0,1])>49
 else:
  T,K=F(c['T']),F(c['K']);u=[n[i+2]-n[i]for i in [0,1]];v=[n[i+4]-2*n[i+2]+n[i]for i in [0,1]];vv=sum(x*x for x in v);at=max(F(0),min(T,-sum(u[i]*v[i]for i in [0,1])/vv))if vv else F(0);lam=sum((u[i]+at*v[i])**2 for i in [0,1]);cr=u[0]*v[1]-u[1]*v[0];chord=sum((2*T*u[i]+T*T*v[i])**2 for i in [0,1])-49;cur=4*K*K*lam**3-cr*cr;cos=1-(7*K)**2/2
  assert chord==F(c['chordSquaredMinusRadiusSquared'])>0 and cur==F(c['curvatureMargin'])>0 and cos-7*K==F(c['cosMinusRK'])>0 and any(u[i]*(u[i]+T*v[i])>0 for i in [0,1])
 ps=polys(s['outline']);triangles=[ears(q)for q in ps];stored=[[[tuple(map(F,v))for v in t]for t in tr]for tr in row['originalTriangles']];assert [[list(t)for t in ts]for ts in triangles]==stored
 leaves={x['route']:x for x in row['coverLeaves']};seen=set()
 def cover(t,route):
  if route in leaves:
   leaf=leaves[route];z=F(leaf['centerT']);q=[(1-z)*n[j]+z*n[j+2]if linear else(1-z)**2*n[j]+2*z*(1-z)*n[j+2]+z*z*n[j+4]for j in [0,1]];margin=49-max(sum((v[j]-q[j])**2 for j in [0,1])for v in t);assert margin==F(leaf['radiusSquaredMargin'])>0;seen.add(route);return
  assert len(route.split(':')[-1])<14
  k=max(range(3),key=lambda i:sum((t[i][j]-t[(i+1)%3][j])**2 for j in [0,1]));a,bb,cc=t[k],t[(k+1)%3],t[(k+2)%3];mid=tuple((a[j]+bb[j])/2 for j in [0,1]);cover((a,mid,cc),route+'0');cover((mid,bb,cc),route+'1')
 for pi,ts in enumerate(triangles):
  for ti,t in enumerate(ts):cover(t,f'{pi}:{ti}:')
 assert len(seen)==len(leaves) and not row['unresolved'] and row['strictFullPContained']
 reached={1}
 for e in connection['edges']:
  a,bb=[i-1 for i in e['subpaths']];q=tuple(map(F,e['closedIntersectionWitness']));assert any(contains(t,q)for t in triangles[a]) and any(contains(t,q)for t in triangles[bb])
 for _ in ps:
  for e in connection['edges']:
   if any(i in reached for i in e['subpaths']):reached.update(e['subpaths'])
 assert len(reached)==len(ps) and connection['closedFilledPConnected']
assert len(p['initialCertificates'])==14 and not p['nativeApproval'] and not p['allTimeGrowingPConnectivityProved']
print('new14 exact initial margins/full-guide P coverage/closed original P: PASS')
`
 const r=spawnSync('python3',['-c',code],{cwd:new URL('..',import.meta.url),encoding:'utf8',timeout:30000});assert.equal(r.status,0,r.stdout+r.stderr);assert.match(r.stdout,/new14 exact/)
})
