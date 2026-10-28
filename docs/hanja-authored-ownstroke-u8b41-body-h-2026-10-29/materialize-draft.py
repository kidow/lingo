import copy,hashlib,json
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];BASE=Path(__file__).resolve().parent
SOURCE='docs/hanja-goal-glyphwiki-batch1032-2026-10-13/engine-whole-u8b41-ue0103.json';SOURCE_SHA='774ae3a6caa83ad1e5bbba7f88386a414e8d1ef249c555c2cd4f29c14f279d86'
FIXTURE_SHA='a7c2777f1292cbc0616cd8a3916c3561257ff641ad32e389e8661321e9f2b5a7';RECIPE_SHA='97380e2c6d5a355bc4d55378294d981992b3a778d1a7246181ddf351ba2d2534'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def tx(x):return float(F(224,163)*F(str(x))-F(21472,815))
def load_candidate():
 assert sha(ROOT/SOURCE)==SOURCE_SHA and sha(BASE/'fixtures-draft.json')==FIXTURE_SHA and sha(BASE/'recipe.json')==RECIPE_SHA
 source=json.loads((ROOT/SOURCE).read_bytes());c=json.loads((BASE/'fixtures-draft.json').read_bytes());groups=copy.deepcopy(source['groups']);trace=copy.deepcopy(source['trace'])
 for p in groups[15]['polygons']:
  for q in p:q['x']=tx(q['x'])
 for i in [3,5]:groups[15]['raw'][i]=tx(groups[15]['raw'][i])
 for call in trace[15]:
  for i in [0,2]:call['args'][i]=tx(call['args'][i])
  for p in call['polygons']:
   for q in p:q['x']=tx(q['x'])
 assert c['groups']==groups and c['trace']==trace
 assert [i for i in range(20)if groups[i]!=source['groups'][i]]==[15] and [i for i in range(20)if trace[i]!=source['trace'][i]]==[15]
 assert c['matrixExact']==['224/163','0','0','1','-21472/815','0'] and c['originalRoot']is False and c['isOriginalEngineCapture']is False and not any(c['approval'].values())
 assert len(groups)==20 and sum(len(g['polygons'])for g in groups)==36
 return c
def hypothesis(c):
 groups=c['logicalHypothesisRawOneBased'];assert sorted(n for row in groups for n in row)==list(range(1,21)) and len(groups)==18
 h=copy.deepcopy(c);h['root']='local_u8b41_18logical_mapping_hypothesis';h['groups']=[{'raw':copy.deepcopy(c['groups'][row[0]-1]['raw']),'sourceRawOneBased':row,'polygons':[copy.deepcopy(p)for n in row for p in c['groups'][n-1]['polygons']]}for row in groups];h['sourceOrderIdentity']=False;return h
P=lambda p:[(F(str(q['x'])),F(str(q['y'])))for q in p]
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def area(p):return abs(sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(p,p[1:]+p[:1])))/2 if p else F(0)
def clip(p,q):
 turns=[cross(q[i-1],q[i],q[(i+1)%len(q)])for i in range(len(q))];assert all(v>=0 for v in turns)or all(v<=0 for v in turns)
 sign=1 if sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(q,q[1:]+q[:1]))>0 else -1
 for c,d in zip(q,q[1:]+q[:1]):
  out=[]
  for a,b in zip(p,p[1:]+p[:1]):
   u=sign*cross(c,d,a);v=sign*cross(c,d,b)
   if u>=0:out.append(a)
   if(u>=0)!=(v>=0):
    t=u/(u-v);out.append((a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])))
  p=out
  if not p:break
 return p
def verify():
 c=load_candidate();source=json.loads((ROOT/SOURCE).read_bytes());exact=copy.deepcopy(source['groups'][15]['polygons'])
 for p in exact:
  for q in p:q['x']=F(224,163)*F(str(q['x']))-F(21472,815)
 rows=[]
 for i in range(20):
  if i==15:continue
  old=sum(area(clip(P(a),P(b)))for a in source['groups'][15]['polygons']for b in source['groups'][i]['polygons']);new=sum(area(clip(P(a),P(b)))for a in exact for b in source['groups'][i]['polygons'])
  if old or new:rows.append({'otherRaw':i+1,'oldPairwiseArea':str(old),'newPairwiseArea':str(new),'newPositiveContact':old==0 and new>0})
 assert [x['otherRaw']for x in rows if x['newPositiveContact']]==[18,20]
 shaft=clip(P(exact[0]),P(source['groups'][19]['polygons'][0]));assert area(shaft)==4
 extra=clip(P(exact[1]),P(source['groups'][19]['polygons'][0]));assert all(F('136.6')<=x<=F('137.6')and F(97)<=y<=F(101)for x,y in extra)
 assert min(F(str(q['x']))for q in source['groups'][19]['polygons'][1])>max(F(str(q['x']))for p in exact for q in p)
 h=hypothesis(c);assert sum(len(g['polygons'])for g in h['groups'])==36
 return{'glyph':'譁','groups':20,'polygons':36,'changedRawZeroBased':[15],'positiveDeterminant':'224/163','exactRaw16Raw20UnionContactArea':'4','allOther19RawExact':True,'wholePAndGuideSameAffine':True,'pairwiseContacts':rows,'newCentralVRaw18ContactAccepted':False,'noNewCrossingsClaim':False,'hypothesisPens':18,'logicalMappingApproved':False,'privateCoordinates':False,'engineRuns':0,'nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
