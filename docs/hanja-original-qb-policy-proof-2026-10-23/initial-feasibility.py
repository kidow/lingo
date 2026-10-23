#!/usr/bin/env python3
"""New source initial-condition certificates only; no compiler, raster, or native approval."""
import json,re,hashlib
from pathlib import Path
from fractions import Fraction as F
R=Path(__file__).resolve().parents[2]
SOURCES=[('籧','u7c67','docs/hanja-source-original-u7c67-2026-10-23/fixtures.json','ac326e4aa2bf4036cc23049bd84b02948e1e9b296ad4498f5fce9e55575e345d'),('蘧','u8627-ue0102','docs/hanja-source-original-u8627-vs2-2026-10-23/fixtures.json','25ee5175bb428fa2673b95b4aa2bf4ade6acc1ea49c9f52625865a5054fdd216')]
N=r'[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?'
def sha(b):return hashlib.sha256(b).hexdigest()
def add(a,b):return tuple(x+y for x,y in zip(a,b))
def sub(a,b):return tuple(x-y for x,y in zip(a,b))
def scale(a,k):return tuple(x*k for x in a)
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def cross(a,b):return a[0]*b[1]-a[1]*b[0]
def q(a,b,c,t):return add(add(scale(a,(1-t)**2),scale(b,2*t*(1-t))),scale(c,t*t))
def bez(a,b,c,d,t):return add(add(scale(a,(1-t)**3),scale(b,3*t*(1-t)**2)),add(scale(c,3*t*t*(1-t)),scale(d,t**3)))
def parsed(s):return[(k,[F(x)for x in re.findall(N,v)])for k,v in re.findall(r'([MLQC])([^MLQC]*)',s)]
def chunk(v):return[tuple(v[i:i+2])for i in range(0,len(v),2)]
def mq_cert(commands):
 a=tuple(commands[0][1]);b,c=chunk(commands[1][1]);u=sub(b,a);v=add(sub(c,scale(b,2)),a)
 for T in [F(1,4),F(1,3),F(1,2),F(2,3),F(3,4),F(1)]:
  chord=sub(q(a,b,c,T),a)
  for axis in [0,1]:
   for sign in [1,-1]:
    if min(sign*u[axis],sign*(u[axis]+v[axis]))<=0 or sign*chord[axis]<=7:continue
    suffix=[p for k,n in commands[2:]for p in chunk(n)]
    if suffix and min(sign*(p[axis]-a[axis])for p in suffix)<=7:continue
    den=dot(v,v);t=max(F(0),min(T,-dot(u,v)/den))if den else F(0);lam=dot(add(u,scale(v,t)),add(u,scale(v,t)));det=cross(u,v)
    for K in [F(1,100),F(1,75),F(1,50),F(1,40),F(1,30),F(1,25),F(1,20),F(1,15),F(1,12),F(1,10)]:
     if lam>0 and 4*K*K*lam**3>det**2 and dot(chord,chord)>49 and 1-(7*K)**2/2>7*K:
      return{'T':str(T),'K':str(K),'lambdaMinAt':str(t),'lambdaMin':str(lam),'cross':str(det),'chordSquared':str(dot(chord,chord)),'laterNoReturnAxis':'xy'[axis],'laterNoReturnSign':sign,'suffixControlHullOutsideInitialDisk':bool(suffix),'suffixControlHullAxisLower':str(min(sign*(p[axis]-a[axis])for p in suffix))if suffix else None}
 raise AssertionError('No existing sufficient MQ interval for exact source')
def line_cert(commands):
 a=tuple(commands[0][1]);b=tuple(commands[1][1]);v=sub(b,a);sq=dot(v,v);assert sq>49
 axis=0 if v[0] else 1;assert v[1-axis]==0;sign=1 if v[axis]>0 else -1
 rest=[p for k,n in commands[2:]for p in chunk(n)]
 assert rest and min(sign*(p[axis]-a[axis])for p in rest)>7
 return{'T':None,'K':'0','firstLineLength':str(abs(v[axis])),'firstLineLengthSquared':str(sq),'laterNoReturnAxis':'xy'[axis],'laterNoReturnSign':sign,'suffixControlHullAxisLower':str(min(sign*(p[axis]-a[axis])for p in rest)),'laterCornerRegularityApproved':False}
def mc_cert(commands):
 assert len(commands)==2
 a=tuple(commands[0][1]);b,c,d=chunk(commands[1][1]);u=sub(b,a);v=sub(c,b);w=sub(d,c)
 A=scale(u,3);B=scale(sub(v,u),6);C=scale(add(sub(w,scale(v,2)),u),3);T=F(1,4);K=F(3,35)
 derivative=lambda t:add(add(A,scale(B,t)),scale(C,t*t))
 assert A[0]>0 and B[0]>=0 and C[0]>=0 and derivative(T)[1]>0 and B[1]<0 and C[1]<0
 lam=A[0]**2+derivative(T)[1]**2;z0=cross(A,B);z1=2*cross(A,C);z2=cross(B,C);end=z0+z1*T+z2*T*T
 assert z0<0 and end<0 and z1<0 and z1+2*z2*T<0
 bound=-end;chord=sub(bez(a,b,c,d,T),a)
 assert K*K*lam**3>bound**2 and dot(chord,chord)>49 and 1-(7*K)**2/2>7*K
 assert all(p[0]>0 for p in[u,v,w])and B[1]<0 and B[1]+2*C[1]<0 and d[1]>=bez(a,b,c,d,T)[1]
 return{'T':str(T),'K':str(K),'speedSquaredLowerBound':str(lam),'crossUpperBound':str(bound),'chordSquared':str(dot(chord,chord)),'laterNoReturn':'strictly increasing x and concave-y endpoint lower bound'}
unique={};bindings=[];whole=[]
for glyph,root,p,h in SOURCES:
 raw=(R/p).read_bytes();assert sha(raw)==h;data=json.loads(raw)[root]
 assert set(data['fullProof'])=={'engineRevision','engineHashes','groups','defaults','trace'}and len(data['fullProof']['engineHashes'])==8
 whole.append({'glyph':glyph,'root':root,'fixture':p,'fixtureSHA256':h,'identity':data['identity'],'logicalPens':len(data['strokes'])})
 for pi,row in enumerate(data['strokes'],1):
  for mi,m in enumerate(row,1):
   if not m.get('revealPath'):continue
   assert m['direction']=='curve'and m['revealWidth']==14
   key=sha(json.dumps(m,sort_keys=True,separators=(',',':')).encode())
   bindings.append({'root':root,'pen':pi,'mask':mi,'certificateSourceSHA256':key})
   if key in unique:assert unique[key]['originalSegment']==m;continue
   commands=parsed(m['revealPath']);syntax=''.join(k for k,v in commands);assert commands[0][0]=='M'
   if syntax in ['MQ','MQQ']:cert=mq_cert(commands);kind='single-quadratic'if syntax=='MQ'else'first-quadratic'
   elif syntax in ['MLQ','MLQL','MLL']:cert=line_cert(commands);kind='straight-first-leg'
   else:assert syntax=='MC';cert=mc_cert(commands);kind='single-cubic'
   unique[key]={'syntax':syntax,'initialKind':kind,'originalSegment':m,'initialSevenArcAvailable':True,'certificate':cert,'notRasterProof':True,'notSourcePIntersectionProof':True,'notPreviousMaskContactProof':True,'notTerminalCoverageProof':True,'notFullSweepProof':True}
assert len(bindings)==32 and len(unique)==18
out={'schema':'hanja-exact-original-qb-initial-feasibility/v1','wholeContexts':whole,'maskDigestFormat':'sha256 of Python json.dumps(sort_keys=True,separators comma-colon), full original segment','bindings':bindings,'uniqueCertificates':unique,'uniqueMathComputations':18,'bindingsCount':32,'duplicateMathComputationsAvoided':14,'compiler':0,'engine':0,'projection':0,'SSR':0,'server':0,'nativeApproval':False,'registered':False,'sourceDataChanged':False}
print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
