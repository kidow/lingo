from pathlib import Path
from fractions import Fraction as F
import json,hashlib,ast
R=Path(__file__).resolve().parents[2]
P=R/'docs/hanja-actual-engine-capture-u8609-hkcs-2026-10-26/engine-whole-hkcs_m8609.json';b=P.read_bytes();assert hashlib.sha256(b).hexdigest()=='3fe1b0adf00c88fe9bda882c583cb6bc1189fa13b4f377386fcceabe22ebf7f7'
f=json.loads(b)
T=R/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';b=T.read_bytes();assert hashlib.sha256(b).hexdigest()=='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76'
for n in ast.parse(b.decode()).body:
 if isinstance(n,ast.FunctionDef)and n.name in {'vec','det','value','union_row','events'}:exec(compile(ast.Module(body=[n],type_ignores=[]),str(T),'exec'))
groups=[[[(F(str(v['x']))/2,F(str(v['y']))/2)for v in p]for p in g['polygons']]for g in f['groups']]
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
def sg(v):return '+'if v>0 else'-'if v<0 else'0'
calls=[]
for i,ts in enumerate(f['trace']):
 assert len(ts)==1;t=ts[0];a=[F(str(v))/2 for v in t['args'][:(6 if t['kind']=='cdDrawCurve'else 4)]]
 q=[a[j:j+2]for j in range(0,len(a),2)];d=[[sg(q[k+1][j]-q[k][j])for j in range(2)]for k in range(len(q)-1)]
 calls.append(dict(raw=i+1,kind=t['kind'],Q=[[str(v)for v in p]for p in q],controlLegDirectionSigns=d,polygonCount=len(groups[i]),offZero=all(v.get('off',0)==0 for p in f['groups'][i]['polygons']for v in p)))
pairs=[dict(raw=[i+1,i+2],**positive(groups[i],groups[i+1]))for i in range(24)]
print(json.dumps(dict(schema='hanja-public-source-adjacent-contact/v1',glyph='蘉',root='hkcs_m8609',rootVersion=2,rawCount=25,polygonCount=sum(map(len,groups)),sourceFullSHA256=hashlib.sha256(P.read_bytes()).hexdigest(),predicateSHA256=hashlib.sha256(b).hexdigest(),rawCalls=calls,adjacentPairs=pairs,scope='Exact authored Q control legs and positive-area adjacency of complete original nonzero-fill P unions only. Not logical mapping, original temporal direction, moving clip connectivity or runtime approval.',sourceEngineReplay=0,sourceProjection=0,sourceGeometryChanged=False,mappingApproved=False,nativeApproval=False,runtimeApplied=False),ensure_ascii=False))
