import json,re,hashlib
from pathlib import Path
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2]
source_file=ROOT/'docs/hanja-source-original-u7c67-2026-10-23/fixtures.json'
source_bytes=source_file.read_bytes();assert hashlib.sha256(source_bytes).hexdigest()=='ac326e4aa2bf4036cc23049bd84b02948e1e9b296ad4498f5fce9e55575e345d'
fixed=json.loads(source_bytes)['u7c67'];s=fixed['strokes'][17][0]
assert hashlib.sha256(json.dumps(s,separators=(',',':'),ensure_ascii=False).encode()).hexdigest()=='424037413381ed1fbfc5f57c4144d68033f7668528370594ecac5ed9633c9515'
polys=[]
for text in s['outline'].split('M')[1:]:
 n=re.findall(r'-?\d+(?:\.\d+)?',text);polys.append([(F(n[i]),F(n[i+1])) for i in range(0,len(n),2)])
assert len(polys)==3
P,T,U=polys
assert len(P)==22 and len(T)==len(U)==3
def sub(a,b):return(a[0]-b[0],a[1]-b[1])
def cross(a,b):return a[0]*b[1]-a[1]*b[0]
def edges(p):return list(zip(p,p[1:]+p[:1]))
def on(p,a,b):return cross(sub(p,a),sub(b,a))==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0]) and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
def intersect(a,b,c,d):
 v,w,o=sub(b,a),sub(d,c),sub(c,a);den=cross(v,w)
 if den==0:return any(on(p,a,b) and on(p,c,d) for p in (a,b,c,d))
 t,h=cross(o,w)/den,cross(o,v)/den
 return 0<=t<=1 and 0<=h<=1
def simple(p):
 e=edges(p)
 return all(not intersect(a,b,c,d) for i,(a,b) in enumerate(e) for j,(c,d) in enumerate(e) if j>i+1 and (i,j)!=(0,len(e)-1))
def convex(p):
 signs=[cross(sub(p[(i+1)%len(p)],p[i]),sub(p[(i+2)%len(p)],p[(i+1)%len(p)])) for i in range(len(p))]
 return all(x>0 for x in signs) or all(x<0 for x in signs)
def convex_contains(q,p):
 cs=[cross(sub(b,a),sub(q,a)) for a,b in edges(p)]
 return all(x>=0 for x in cs) or all(x<=0 for x in cs)
assert all(simple(p) for p in polys)
assert convex(T) and convex(U)
assert P[0]==(F('87.8'),F('62.3')) and P[11]==(F('71.3'),F('66.95'))
forward=P[:12];backward=[P[0]]+list(reversed(P[11:]))
assert forward[-1]==backward[-1]==P[11]
assert all(a[0]>=b[0] for chain in (forward,backward) for a,b in zip(chain,chain[1:]))
rootP=P[0];rootT=max(T,key=lambda p:p[0]);rootU=max(U,key=lambda p:p[0])
assert rootT==(F('87.95'),F('62.2')) and rootT in U
assert rootU==(F(88),F('63.95'))
assert convex_contains(rootP,U) and convex_contains(rootT,U)
assert rootP[0]<rootT[0]<rootU[0]
assert min(p[0] for poly in polys for p in poly)==F('71.3')
assert max(p[0] for poly in polys for p in poly)==88
assert min(p[1] for poly in polys for p in poly)==F('57.4')
assert max(p[1] for poly in polys for p in poly)==F('67.8')
q0=(F('86.5'),F('59.575'));d2=sum((a-b)**2 for a,b in zip(rootU,q0));assert d2==(F(37)/8)**2
# Every nonempty P-prefix is connected by the two verified x-monotone chains.
# Every nonempty T/U-prefix is convex. Whenever P or T appears, its rightmost
# source root is already inside U-prefix, so their union is connected for ALL
# real cuts, not merely a finite sample. At p=0 the zero-area source root is hidden.
result={'schema':'hanja-original-3p-x-prefix-connected-proof/v1','glyph':'籧','root':'u7c67','pen':18,'mask':1,'segmentSHA256':'424037413381ed1fbfc5f57c4144d68033f7668528370594ecac5ed9633c9515','sourcePolygons':3,'sourceVertices':[22,3,3],'allSourcePolygonsSimple':True,'bodyXMonotoneChains':[len(forward),len(backward)],'trianglesConvex':True,'roots':{'body':[str(v) for v in rootP],'headTriangle':[str(v) for v in rootT],'rootTriangle':[str(v) for v in rootU]},'bodyRootInsideRootTriangle':True,'headRootIsRootTriangleVertex':True,'prefix':{'halfPlane':'x >= 88 - (167/10)*progress','rectY':'287/5','rectHeight':'52/5','allRealProgressConnected':True,'proof':'Each nonempty source polygon prefix is connected and contains its rightmost root. The body/head roots are in the root triangle prefix at first appearance. The root triangle prefix is convex. Union is connected.','zeroAreaAtProgress0Hidden':True,'fullProgressCoversAllOriginalP':True},'changedDisplayStart':{'originalGuideQ0':[str(v) for v in q0],'prefixRoot':[str(v) for v in rootU],'distanceExact':'37/8','distance':4.625,'mustCompareOfficialStartAndEarlyDirection':True},'sourceGuideUnchanged':s['revealPath'],'sourceWeightUnchanged':s['weight'],'sourceInkChanges':0,'sourceGuideChanges':0,'newDisplayPolicy':True,'wholeBoundariesSeparate':True,'mathComputations':1,'engine':0,'projector':0,'SSR':0,'nativeApproval':False,'officialStartApproval':False,'runtimeApplied':False,'registered':False}
print(json.dumps(result,ensure_ascii=False,separators=(',',':')))
