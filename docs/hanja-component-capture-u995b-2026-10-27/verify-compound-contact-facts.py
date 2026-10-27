from pathlib import Path
from fractions import Fraction as F
from itertools import combinations
import hashlib,json
R=Path(__file__).resolve().parents[2];D=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
FP=D/'engine-whole-lingo-u995b-no-extra-v1.json'
CP=D/'capture.json'
RP=R/'docs/hanja-component-recipe-u995b-2026-10-27/recipe.json'
assert sha(FP)=='23b1486cda54e965465732a5bcb15b6421c40617a8ab5d3beba37a8943e12d5d'
assert sha(CP)=='8dd8b4dae17bc81a41b9257824dd9d12b42de1e1f1f6e604fb72a913e0959740'
assert sha(RP)=='eaefeb0fc260ffd31857297168753b0e2803d8f50b9c8d8a1a3342a8aff107b8'
data=json.loads(FP.read_text());cap=json.loads(CP.read_text());recipe=json.loads(RP.read_text())
assert data['engineHashes']==cap['engine']['actualLoadedHashes']
assert cap['captureFacts']['actualVMContexts']==cap['captureFacts']['makeGlyphCalls']==1
assert len(data['groups'])==25 and sum(len(g['polygons'])for g in data['groups'])==46
assert [g['polygons']for g in data['groups']]==[[p for c in row for p in c['polygons']]for row in data['trace']]
records={**recipe['originalChildren'],**recipe['localRecords']}
assert len(records)==9
flat=[]
def expand(name,aff=(F(1),F(0),F(1),F(0)),chain=()):
 assert name not in [c['record']for c in chain]
 for n,line in enumerate(records[name]['data'].split('$'),1):
  a=line.split(':')
  if a[0]=='99':
   box=list(map(F,a[3:7]));sx,tx,sy,ty=aff
   child_aff=(sx*(box[2]-box[0])/200,tx+sx*box[0],sy*(box[3]-box[1])/200,ty+sy*box[1])
   expand(a[7],child_aff,chain+({'record':name,'rowOneBased':n,'literal':line,'child':a[7]},))
  else:flat.append({'record':name,'sourceRowOneBased':n,'literal':line,'affine':aff,'chain':chain})
expand(recipe['virtualRoot']['name'])
assert len(flat)==25
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def area(q):return sum(a[0]*b[1]-a[1]*b[0]for a,b in zip(q,q[1:]+q[:1]))/2 if len(q)>=3 else F(0)
def edges(q):return list(zip(q,q[1:]+q[:1]))
def on(a,b,p):return cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
def meet(a,b,c,d):return(cross(a,b,c)*cross(a,b,d)<0 and cross(c,d,a)*cross(c,d,b)<0)or on(a,b,c)or on(a,b,d)or on(c,d,a)or on(c,d,b)
def poly(points):
 assert all(p['off']==0 for p in points)
 q=[(F(str(p['x'])),F(str(p['y'])))for p in points]
 assert len(set(q))==len(q)and area(q)>0
 for i,(a,b)in enumerate(edges(q)):
  for j,(c,d)in enumerate(edges(q)):
   if j>i+1 and not(i==0 and j==len(q)-1):assert not meet(a,b,c,d)
 return q
def inside(q,p):
 if any(on(a,b,p)for a,b in edges(q)):return False
 hits=0
 for a,b in edges(q):
  if(a[1]>p[1])!=(b[1]>p[1])and a[0]+(p[1]-a[1])*(b[0]-a[0])/(b[1]-a[1])>p[0]:hits+=1
 return hits%2==1
def triangles(q):
 v=q[:];out=[]
 while len(v)>3:
  for i in range(len(v)):
   a,b,c=v[i-1],v[i],v[(i+1)%len(v)]
   if cross(a,b,c)==0 and on(a,c,b):v.pop(i);break
   if cross(a,b,c)<=0:continue
   others=[p for j,p in enumerate(v)if j not in[(i-1)%len(v),i,(i+1)%len(v)]]
   if any(all(cross(u,w,p)>=0 for u,w in[(a,b),(b,c),(c,a)])for p in others):continue
   out.append([a,b,c]);v.pop(i);break
  else:raise AssertionError('No exact ear')
 out.append(v);assert sum(area(t)for t in out)==area(q)
 return out
def half_clip(q,a,b):
 if not q:return[]
 out=[]
 for p,n in edges(q):
  u,v=cross(a,b,p),cross(a,b,n);pi=u>=0;ni=v>=0
  if pi:out.append(p)
  if pi!=ni:
   t=u/(u-v);out.append((p[0]+t*(n[0]-p[0]),p[1]+t*(n[1]-p[1])))
 clean=[]
 for p in out:
  if not clean or p!=clean[-1]:clean.append(p)
 if len(clean)>1 and clean[0]==clean[-1]:clean.pop()
 return clean
def intersect(a,b):
 q=a
 for p,n in edges(b):q=half_clip(q,p,n)
 return q
def contact(a,b):
 total=F(0)
 for ta in triangles(a):
  for tb in triangles(b):total+=abs(area(intersect(ta,tb)))
 return total
def bounds(q):return[min(p[0]for p in q),max(p[0]for p in q),min(p[1]for p in q),max(p[1]for p in q)]
def boxgap(a,b):return max(b[0]-a[1],a[0]-b[1],b[2]-a[3],a[2]-b[3])
def kernel(q):
 b=bounds(q);k=[(b[0],b[2]),(b[1],b[2]),(b[1],b[3]),(b[0],b[3])]
 for a,z in edges(q):k=half_clip(k,a,z)
 return k
def qpoint(args,t,kind):
 a=[F(str(v))for v in args]
 if kind=='cdDrawLine':return(a[0]+(a[2]-a[0])*t,a[1]+(a[3]-a[1])*t)
 assert kind=='cdDrawCurve'
 return tuple((1-t)**2*a[i]+2*(1-t)*t*a[2+i]+t*t*a[4+i]for i in[0,1])
results=[]
for first,second,reference_pen,witness in[(5,6,4,(F('68.4'),F(74))),(16,17,15,(F('180.6'),F(57)))]:
 entries=[];calls=[]
 for raw in[first,second]:
  entry=flat[raw-1];a=entry['literal'].split(':');rawvec=data['groups'][raw-1]['raw'];actual=data['trace'][raw-1]
  assert int(a[0])==rawvec[0]and int(a[1])==rawvec[1]and int(a[2])%100==rawvec[2]%100
  nums=list(map(F,a[3:]));sx,tx,sy,ty=entry['affine'];coords=[v for x,y in zip(nums[::2],nums[1::2])for v in(sx*x+tx,sy*y+ty)]
  assert coords==[F(str(v))for v in rawvec[3:3+len(coords)]]
  assert len(actual)==1 and actual[0]['kind']==('cdDrawLine'if rawvec[0]==1 else'cdDrawCurve')
  assert [F(str(v))for v in actual[0]['args'][:-2]]==coords
  assert actual[0]['args'][-2:]==rawvec[1:3]
  entries.append({**entry,'rawOneBased':raw,'actualPrimitiveFlags':rawvec[:3],'originalPrimitiveFlags':list(map(int,a[:3])),'actualCallKind':actual[0]['kind'],'originalCoordsExactlyMapToActual':True})
  calls.append(actual[0])
 end_first=qpoint(calls[0]['args'],F(1),calls[0]['kind']);q0=qpoint(calls[1]['args'],F(0),calls[1]['kind']);assert end_first==q0
 polys=[{'raw':raw,'polygon':j+1,'q':poly(p)}for raw in[first,second]for j,p in enumerate(data['groups'][raw-1]['polygons'])]
 links=[];adj=[set()for _ in polys]
 for i,j in combinations(range(len(polys)),2):
  ar=contact(polys[i]['q'],polys[j]['q'])
  links.append({'a':[polys[i]['raw'],polys[i]['polygon']],'b':[polys[j]['raw'],polys[j]['polygon']],'exactPositiveIntersectionArea':ar,'positiveAreaContact':ar>0})
  if ar>0:adj[i].add(j);adj[j].add(i)
 seen={0};todo=[0]
 while todo:
  for j in adj[todo.pop()]-seen:seen.add(j);todo.append(j)
 connected=len(seen)==len(polys)
 r=F(1,100);wx,wy=witness;box=[(wx-r,wy-r),(wx+r,wy-r),(wx+r,wy+r),(wx-r,wy+r)]
 target=polys[-1]['q']
 strict_inside=all(inside(target,p)for p in box)and all(not meet(a,b,c,d)for a,b in edges(box)for c,d in edges(target))
 prior_raw=[p for g in data['groups'][:second-1]for p in g['polygons']]
 assert all(p and all(v['off']==0 for v in p)for p in prior_raw)
 # Strict AABB exclusion needs finite original vertices, not positive area or a simple contour.
 prior=[[(F(str(v['x'])),F(str(v['y'])))for v in p]for p in prior_raw]
 prior_gaps=[boxgap(bounds(box),bounds(p))for p in prior]
 prior_clear=all(g>0 for g in prior_gaps)
 radius=F(14);maxdist=max((x-q0[0])**2+(y-q0[1])**2 for x,y in box);disk=maxdist<radius**2
 target_kernels=[]
 for p in polys:
  if p['raw']!=second:continue
  target_kernels.append({'raw':second,'polygon':p['polygon'],'visibilityKernelArea':abs(area(kernel(p['q']))),'Q0InClosedIndividualPolygonKernel':all(cross(a,b,q0)>=0 for a,b in edges(p['q'])),'unionKernelClaim':False})
 guides=[{'t':t,'point':qpoint(calls[1]['args'],t,calls[1]['kind'])}for t in[F(0),F(1,8),F(1,4),F(1,2),F(1)]]
 results.append({'referencePenProvidedByROOT':reference_pen,'temporaryRawOneBased':[first,second],'originalSourceBinding':entries,'guideJoint':q0,'guideJointExactlyShared':True,'macroGuideDirection':['R','D'if second==6 else'DL'],'polygonPositiveContactGraph':links,'allThreeOriginalPolygonsPositiveAreaConnected':connected,'allPolygonsAccountedFor':len(polys),'individualContourKernels':target_kernels,'secondGuideDyadicSourceT':guides,'initialRoundCapCondition':{'compiledNormalization':'Original200->100 by/2; existing compiler revealWidth14 means original radius14. Condition confirmed by fixture owner; no fixture read or modification.','originalRadius':radius,'Q0':q0,'newInkWitnessBox':box,'witnessInsideOriginalSecondCallPolygon':[second,2],'strictInside':strict_inside,'outsideEveryEarlierCompletedRawPByStrictAABB':prior_clear,'minimumPriorAABBGap':min(prior_gaps),'maximumSquaredDistanceToQ0':maxdist,'strictInsideRoundDisk':disk,'positiveNewInkAreaLowerBound':4*r*r if strict_inside and prior_clear and disk else F(0),'mathematicalPotentialExposure':strict_inside and prior_clear and disk,'actualBrowserFailureObserved':False,'authorClockOrNewGateSelected':False}})
def serial(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(tuple,list)):return[serial(x)for x in v]
 if isinstance(v,dict):return{k:serial(x)for k,x in v.items()}
 return v
output={'schema':'hanja-local-u995b-exact-compound-contact-facts/v1','glyph':'饛','date':'2026-10-27','inputs':{'full5SHA256':sha(FP),'captureSHA256':sha(CP),'recipeSHA256':sha(RP),'verifierSHA256':sha(Path(__file__))},'coordinateSystem':'Original captured200-unit Kage coordinates; normalized100 facts only as explicit/2 conversion.','originalRawGroups':25,'originalPolygons':46,'scope':'ROOT-provided provisional source pair references4 and15; raw/call/P facts only, no count-based grouping approval.','cases':results,'method':'Exact Fraction source-affine/actual-call binding, simple-positive original polygons, exact ear partitions and triangle clipping for intersection areas; positive-area polygon adjacency certifies connected union.','sourceCoordinatesOrPChanged':False,'sourceEndFlagsHundredsAdjustmentPreserved':True,'oldProofReexecuted':False,'formalLogicalGroupingApproved':False,'sourceMicroclockIdentityApproved':False,'nativeApproval':False,'runtimeApplied':False,'engineRuns':0}
print(json.dumps(serial(output),ensure_ascii=False,indent=2))
