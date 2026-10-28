import copy,hashlib,json
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];BASE=Path(__file__).resolve().parent
SOURCE='docs/hanja-actual-engine-capture-u67d6-hkcs-2026-10-25/engine-whole-hkcs_m67d6.json';SOURCE_SHA='3294f58e470428ffe54ae2d9d17ec7a022eca2006f8bc5dd7b6d371165098271'
FIXTURE_SHA='5e69882deb5ecebaf2d7b7e9dacdf572adae33dc32ebbcbb6b95ee1bf90865fc';RECIPE_SHA='f19f3b153e8f3f78a605d46c7334f728cfdc35daea25e2a0e88355ae80795153'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def tx(x):return float(F(1208,1383)*F(str(x))+F(3024,461))
def load_candidate():
 assert sha(ROOT/SOURCE)==SOURCE_SHA and sha(BASE/'fixtures-draft.json')==FIXTURE_SHA and sha(BASE/'recipe.json')==RECIPE_SHA
 s=json.loads((ROOT/SOURCE).read_bytes());c=json.loads((BASE/'fixtures-draft.json').read_bytes());g=copy.deepcopy(s['groups']);t=copy.deepcopy(s['trace'])
 for p in g[3]['polygons']:
  for q in p:q['x']=tx(q['x'])
 for i in [3,5,7]:g[3]['raw'][i]=tx(g[3]['raw'][i])
 for call in t[3]:
  for i in range(0,len(call['args'])-2,2):call['args'][i]=tx(call['args'][i])
  for p in call['polygons']:
   for q in p:q['x']=tx(q['x'])
 assert c['groups']==g and c['trace']==t
 assert [i for i in range(11)if g[i]!=s['groups'][i]]==[3] and [i for i in range(11)if t[i]!=s['trace'][i]]==[3]
 assert len(g)==11 and len([x for row in t for x in row])==12 and sum(len(row['polygons'])for row in g)==18
 assert c['matrixExact']==['1208/1383','0','0','1','3024/461','0'] and c['changedRawZeroBased']==[3]
 assert c['originalRoot']is False and c['isOriginalEngineCapture']is False and not any(c['approval'].values())
 assert g[3]['raw'][:3]==s['groups'][3]['raw'][:3] and [q['y']for p in g[3]['polygons']for q in p]==[q['y']for p in s['groups'][3]['polygons']for q in p]
 assert t[3][0]['kind']=='cdDrawCurve' and t[3][0]['args'][-2:]==s['trace'][3][0]['args'][-2:]
 a=t[3][0]['args'];assert a[0]<a[2]<a[4] and a[1]<a[3]<a[5]
 return c
P=lambda p:[(F(str(q['x'])),F(str(q['y'])))for q in p]
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def on(a,b,p):return cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0]) and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
def edges(a,b,c,d):
 x,y,z,w=cross(a,b,c),cross(a,b,d),cross(c,d,a),cross(c,d,b)
 return(x*y<0 and z*w<0)or any([x==0 and on(a,b,c),y==0 and on(a,b,d),z==0 and on(c,d,a),w==0 and on(c,d,b)])
def inside(p,q):
 wn=0
 for a,b in zip(q,q[1:]+q[:1]):
  if on(a,b,p):return True
  if a[1]<=p[1]<b[1]and cross(a,b,p)>0:wn+=1
  if b[1]<=p[1]<a[1]and cross(a,b,p)<0:wn-=1
 return wn!=0
def contact(a,b):return any(edges(x,y,u,v)for x,y in zip(a,a[1:]+a[:1])for u,v in zip(b,b[1:]+b[:1]))or inside(a[0],b)or inside(b[0],a)
def verify():
 c=load_candidate();s=json.loads((ROOT/SOURCE).read_bytes());exact=copy.deepcopy(s['groups']);a=F(1208,1383);b=F(3024,461)
 for p in exact[3]['polygons']:
  for q in p:q['x']=a*F(str(q['x']))+b
 assert a>0 and a*F('51.84')+b==F('51.84') and F(1383,1208)*a==1 and F(1383,1208)*b-F(1134,151)==0
 assert max(q['x']for p in exact[3]['polygons']for q in p)==76 and min(F(str(q['x']))for p in exact[6]['polygons']for q in p)==77
 rows=[]
 for i in range(11):
  if i==3:continue
  oc=any(contact(P(p),P(q))for p in s['groups'][3]['polygons']for q in s['groups'][i]['polygons']);nc=any(contact(P(p),P(q))for p in exact[3]['polygons']for q in exact[i]['polygons']);rows.append({'otherRaw':i+1,'originalClosedContact':oc,'candidateClosedContact':nc})
 assert [x['otherRaw']for x in rows if x['originalClosedContact']]==[2,7] and [x['otherRaw']for x in rows if x['candidateClosedContact']]==[2]
 return{'glyph':'柖','groups':11,'calls':12,'polygons':18,'changedRawZeroBased':[3],'positiveDeterminant':'1208/1383','inverseMatrixExact':['1383/1208','0','0','1','-1134/151','0'],'exactInverseIdentity':True,'strictWholePBoundingXGap':'1','contactGraphMethod':'Exact Fraction segment intersection plus nonzero-winding containment; closed contact, not a positive-area measurement.','point4ContactGraph':rows,'other10RawAndTraceExact':True,'sourcePointWholePAndGuideSameAffine':True,'YAndSourceDRMonotonicityPreserved':True,'sourceFlagsPreserved':True,'newClosedContacts':[],'domesticClockReviewed':False,'logicalMappingApproved':False,'privateCoordinates':False,'engineRuns':0,'nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
