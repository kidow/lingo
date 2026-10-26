from pathlib import Path
from fractions import Fraction as F
import json,hashlib,ast
R=Path('/Users/kidow/Documents/dev/kidow/lingo');P=R/'docs/hanja-actual-engine-capture-u7e98-hkcs-u-2026-10-26/engine-whole-hkcs_u7e98.json';b=P.read_bytes();assert hashlib.sha256(b).hexdigest()=='7328b4b1a1e0e5abcb5d7c11d94288103013e2308b1c84a347672d44377eb718';f=json.loads(b)
T=R/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';tb=T.read_bytes();assert hashlib.sha256(tb).hexdigest()=='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76'
for node in ast.parse(tb.decode()).body:
 if isinstance(node,ast.FunctionDef)and node.name in{'vec','det','value','union_row','events'}:exec(compile(ast.Module(body=[node],type_ignores=[]),str(T),'exec'))
groups=[[[(F(str(v['x'])),F(str(v['y'])))for v in p]for p in g['polygons']]for g in f['groups']]
def positive(A,B):
 lo=max(min(y for p in A for x,y in p),min(y for p in B for x,y in p));hi=min(max(y for p in A for x,y in p),max(y for p in B for x,y in p))
 if lo>=hi:return dict(positiveArea=False,openSlabs=0,witness=None)
 es=events(A+B,lo,hi);count=0;witness=None
 for a,b in zip(es,es[1:]):
  y=(a+b)/2;aa=union_row(A,y);bb=union_row(B,y);count+=1
  for l,r in aa:
   for v,w in bb:
    left=max(value(l,y),value(v,y));right=min(value(r,y),value(w,y))
    if left<right and witness is None:witness=dict(y=str(y),x=str((left+right)/2),width=str(right-left),ySlab=[str(a),str(b)])
 return dict(positiveArea=witness is not None,openSlabs=count,witness=witness)

def segment_contact(a,b,c,d):
 r=vec(b,a);s=vec(d,c);den=det(r,s)
 if den:
  t=det(vec(c,a),s)/den;u=det(vec(c,a),r)/den
  if 0<=t<=1 and 0<=u<=1:return 'point',tuple(a[i]+t*r[i]for i in[0,1])
  return None
 if det(vec(c,a),r):return None
 axis=0 if r[0]else 1
 if not r[axis]:return None
 l=max(min(a[axis],b[axis]),min(c[axis],d[axis]));h=min(max(a[axis],b[axis]),max(c[axis],d[axis]))
 if l>h:return None
 return ('edge'if l<h else'point'),tuple(tuple(a[i]+(v-a[axis])*r[i]/r[axis]for i in[0,1])for v in[l,h])
def boundary(A,B):
 hits=[]
 for p in A:
  for a,b in zip(p,p[1:]+p[:1]):
   for q in B:
    for c,d in zip(q,q[1:]+q[:1]):
     hit=segment_contact(a,b,c,d)
     if hit:hits.append(hit)
 return {'edgeContacts':sum(k=='edge'for k,v in hits),'pointContacts':sum(k=='point'for k,v in hits)}
call=[]
for raw,ts in enumerate(f['trace']):
 for ci,t in enumerate(ts):
  n={'cdDrawLine':4,'cdDrawCurve':6,'cdDrawBezier':8}[t['kind']];a=[F(str(v))for v in t['args']];call.append({'raw':raw+1,'call':ci+1,'start':a[:2],'end':a[n-2:n],'kind':t['kind']})
qexact=[]
for i,a in enumerate(call):
 for j,b in enumerate(call):
  if i!=j and a['end']==b['start']:qexact.append({'from':[a['raw'],a['call']],'to':[b['raw'],b['call']],'adjacentCall':j==i+1,'sameRaw':a['raw']==b['raw'],'point':[str(v)for v in a['end']]})
nonempty=[i for i,ps in enumerate(groups)if ps];contacts=[]
for a,b in zip(nonempty,nonempty[1:]):
 z=positive(groups[a],groups[b]);z.update(boundary(groups[a],groups[b]));contacts.append({'raw':[a+1,b+1],**z})
extra=[]
for raw,a,b in[(22,0,1),(22,1,2)]:
 A=[[(F(str(v['x'])),F(str(v['y'])))for v in poly]for poly in f['trace'][raw-1][a]['polygons']];B=[[(F(str(v['x'])),F(str(v['y'])))for v in poly]for poly in f['trace'][raw-1][b]['polygons']]
 extra.append({'raw':raw,'calls':[a+1,b+1],**positive(A,B),**boundary(A,B)})
extra.append({'raw':[23,28],'noncontiguous':True,**positive(groups[22],groups[27]),**boundary(groups[22],groups[27])})

expected={((15,1),(16,1)),((22,1),(22,2)),((22,2),(22,3)),((23,1),(28,1)),((24,1),(25,1))}
assert {(tuple(e['from']),tuple(e['to']))for e in qexact}==expected
incoming={};outgoing={}
for a,b in expected:
 assert b not in incoming and a not in outgoing;incoming[b]=a;outgoing[a]=b
for n in outgoing:
 seen=set();current=n
 while current in outgoing:
  assert current not in seen;seen.add(current);current=outgoing[current]
adjacent=[e for e in qexact if e['adjacentCall']]
assert len(adjacent)==4 and len(qexact)==5 and len(call)==31
arithmetic={'sourceDrawingRawRows':29,'sourceCalls':31,'requiredJoinsFromCallsForCatalog25':6,'authoredInternalRaw22Joins':2,'crossRawAdjacentExactQJoins':2,'allAdjacentCallExactQJoins':4,'minimumContiguousDirectedQChains':31-4,'noncontiguousExtraExactQJoins':1,'maximumExactDirectedQJoinsAnyOrder':5,'minimumDirectedQChainsAnyOrder':31-5,'catalog25MetByContiguousFamily':False,'catalog25MetEvenWithNoncontiguousExactQFamily':False,'additionalNonexactJoinsNeededBeyondContiguousFamily':2,'additionalNonexactJoinsNeededBeyondAnyOrderExactFamily':1,'edgeGraphNoMultipleIncomingOrOutgoing':True,'edgeGraphAcyclic':True}

def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
print(json.dumps(enc({'schema':'hanja-source-exact-Q-chain-focused-check/v1','glyph':'纘','sourceSHA256':hashlib.sha256(P.read_bytes()).hexdigest(),'exactDirectedQJoins':qexact,'arithmetic':arithmetic,'adjacentDrawingRawCompletePContacts':contacts,'internalAndNoncontiguousCompletePContacts':extra,'engineReplay':0,'sourceProjection':0,'nativeApproval':False}),ensure_ascii=False,separators=(',',':')))
