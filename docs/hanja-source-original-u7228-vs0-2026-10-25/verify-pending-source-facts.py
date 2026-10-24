from pathlib import Path
from fractions import Fraction as F
import hashlib,json,re

ROOT=Path(__file__).resolve().parents[2]
BASE=Path(__file__).resolve().parent
FIXTURE=BASE/'fixtures.json'
f=json.loads(FIXTURE.read_text())['u7228_ue0100']
CAPS={(1,1),(11,2),(14,1),(15,2),(18,1),(19,1),(22,1),(23,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1)}

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
  assert found,'원P ear 분할 실패'
 t=tuple(p[k]for k in ids);assert cross(*t)>0;out.append(t);assert sum(area(list(t))for t in out)==abs(area(original));return out
def polys(s):
 out=[]
 for q in s.split(' Z'):
  if not q.strip():continue
  n=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',q)));out.append([tuple(n[i:i+2])for i in range(0,len(n),2)])
 return out
def section(triangles,axis,c):
 intervals=[]
 for triangle in triangles:
  points=[]
  for a,b in zip(triangle,triangle[1:]+triangle[:1]):
   if a[axis]==b[axis]:
    if c==a[axis]:points.extend([a[1-axis],b[1-axis]])
   elif min(a[axis],b[axis])<=c<=max(a[axis],b[axis]):points.append(a[1-axis]+(c-a[axis])*(b[1-axis]-a[1-axis])/(b[axis]-a[axis]))
  if points:intervals.append((min(points),max(points)))
 merged=[]
 for lo,hi in sorted(intervals):
  if merged and lo<=merged[-1][1]:merged[-1]=(merged[-1][0],max(hi,merged[-1][1]))
  else:merged.append((lo,hi))
 return merged
def cardinal(pen,mask,s):
 ps=polys(s['outline']);triangles=[list(t)for p in ps for t in ears(p)];axis=0 if s['direction']=='right'else 1
 cuts={v[axis]for p in ps for v in p};edges=[]
 for t in triangles:
  for a,b in zip(t,t[1:]+t[:1]):
   if a[axis]==b[axis]:continue
   m=(b[1-axis]-a[1-axis])/(b[axis]-a[axis]);edges.append((m,a[1-axis]-m*a[axis],min(a[axis],b[axis]),max(a[axis],b[axis])))
 for i,(m,b,lo,hi) in enumerate(edges):
  for n,d,ll,hh in edges[i+1:]:
   if m!=n:
    c=(d-b)/(m-n)
    if max(lo,ll)<c<min(hi,hh):cuts.add(c)
 cuts=sorted(cuts);probes=sorted(set(cuts[1:-1]+[(a+b)/2 for a,b in zip(cuts,cuts[1:])]))
 rows=[]
 for c in probes:
  intervals=section(triangles,axis,c);rows.append({'coordinate':str(c),'intervals':[[str(x)for x in v]for v in intervals]})
 single=all(len(r['intervals'])==1 and F(r['intervals'][0][1])>F(r['intervals'][0][0])for r in rows)
 bound=list(map(lambda v:F(str(v)),s['bounds']));span=bound[axis+2]-bound[axis];other=bound[3-axis]-bound[1-axis]
 assert cuts[0]==bound[axis] and cuts[-1]==bound[axis+2] and span>0 and other>0
 return {'pen':pen,'mask':mask,'direction':s['direction'],'rawIndex0':f['sourceGroups'][pen-1][mask-1],'axis':'xy'[axis],'cuts':list(map(str,cuts)),'arrangementProbes':rows,'singlePositiveFrontierAllInterior':single,'prefixAreaBoundCoefficient':str(span*other),'zeroAreaAtProgress0':True,'completeOriginalPUnchanged':True,'argument':'모든 원P ear의 선형 경계 교차 좌표와 원P 꼭짓점을 분할점으로 사용. 각 열린 구간에서 끝점 선형식의 순서가 일정하므로 단일 양수단면 판정이 전구간에 유지된다. 원 bounds 축 prefix 면적은 bounds면적*p 이하이며 p→0에서0. 실제 prior접촉은 별도.'}

rows=[]
for pi,masks in enumerate(f['strokes']):
 for mi,s in enumerate(masks):
  if (pi+1,mi+1)not in CAPS and s['direction']!='curve':rows.append(cardinal(pi+1,mi+1,s))
assert len(rows)==19

def clip_y(p,limit):
 out=[]
 for a,b in zip(p,p[1:]+p[:1]):
  aa,bb=a[1]<=limit,b[1]<=limit
  if aa:out.append(a)
  if aa!=bb:out.append((a[0]+(limit-a[1])*(b[0]-a[0])/(b[1]-a[1]),limit))
 return out
foot=[]
for pen in [6,9]:
 a,b=f['strokes'][pen-1];ps=polys(b['outline']);bound=list(map(lambda v:F(str(v)),b['bounds']));prior_min=F(str(a['bounds'][1]));samples=[]
 for progress in [F(1,1000000),F(1,100),F(3,100)]:
  y=bound[1]+(bound[3]-bound[1])*progress;pieces=[clip_y(p,y)for p in ps];positive=sum(abs(area(p))for p in pieces if len(p)>=3);assert y<prior_min and positive>0
  samples.append({'progress':str(progress),'frontierY':str(y),'newPositiveArea':str(positive),'verticalGapToActualPriorH':str(prior_min-y),'actualPriorContact':False})
 foot.append({'pen':pen,'mask':2,'status':'HOLD: 새 양수 원P prefix가 실제 완료H와 분리됨','samples':samples,'beforeExactAfterAreaJumpClaimed':False,'completedOriginalPUnchanged':True})

s=f['strokes'][1][0];poly=polys(s['outline'])[0];poly=poly if area(poly)>0 else poly[::-1];nums=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])));q0=nums[:2]
square=[(F(63,4),F(79,4)),(F(65,4),F(79,4)),(F(65,4),F(81,4)),(F(63,4),F(81,4))]
assert all(all(cross(a,b,v)>0 for a,b in zip(poly,poly[1:]+poly[:1]))for v in square)
margin=49-max(sum((v[i]-q0[i])**2 for i in [0,1])for v in square);assert margin>0
prior_max=max(F(str(s['bounds'][3]))for s in f['strokes'][0]);assert min(v[1]for v in square)>prior_max
curve={'pen':2,'mask':1,'status':'HOLD: 고정 radius7 시작cap의 새 잉크 양수면적','syntax':'ML','guide':s['revealPath'],'originalSquare':[[str(v)for v in q]for q in square],'positiveArea':str(abs(area(square))),'strictDiskSquaredMargin':str(margin),'completedPriorPen':1,'completedPriorMaxY':str(prior_max),'disjointVerticalGap':str(min(v[1]for v in square)-prior_max),'p0EmptyButPositiveLimitContainsSquare':True,'notBrowserRasterClaim':True}

OUT={'schema':'hanja-u7228-pending-source-facts/v1','fixture':'docs/hanja-source-original-u7228-vs0-2026-10-25/fixtures.json','fixtureSHA256':hashlib.sha256(FIXTURE.read_bytes()).hexdigest(),'nativeReference':'ordinary-native-review.json','pendingNativeSamples':66,'cardinalMasks':rows,'ordinaryMLCurve':curve,'actualPriorContactHolds':foot,'sampleClassification':{'newSourceFactHOLD':9,'cardinalSourcePrefixEligibleForNativeReuse':51,'boundaryPending':6,'nativePASSAsserted':0},'originalPGuideWeightChanged':False,'nativeReplayed':0,'engineRuns':0,'sourceProjection':0,'runtimeApplied':False,'allTimeGrowingPConnectivityProved':False}
if __name__=='__main__':
 fixed=json.loads((BASE/'pending-source-facts.json').read_text());assert fixed==OUT
 assert all(r['singlePositiveFrontierAllInterior']for r in rows)
 print('爨 pending66 exact source facts: cardinal19단면/9추가HOLD/51재사용후보/경계6보류; native재생0')
