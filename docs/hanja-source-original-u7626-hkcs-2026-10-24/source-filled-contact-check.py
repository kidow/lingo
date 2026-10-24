import sys
sys.dont_write_bytecode=True
import json,hashlib
from pathlib import Path
from fractions import Fraction as F
HERE=Path(__file__).resolve().parent;ROOT=HERE.parent.parent
j=json.loads((HERE/'source-filled-contact-facts.json').read_text())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(ROOT/j['source']['path'])==j['source']['SHA256']
assert sha(ROOT/j['fixture']['path'])==j['fixture']['SHA256']
assert sha(Path(__file__))==j['checker']['SHA256']
full=json.loads((ROOT/j['source']['path']).read_text())
def poly(row,i):return[(F(str(v['x'])),F(str(v['y'])))for v in full['groups'][row-1]['polygons'][i-1]]
def cross(a,b,q):return(b[0]-a[0])*(q[1]-a[1])-(b[1]-a[1])*(q[0]-a[0])
def on(a,b,q):return cross(a,b,q)==0 and min(a[0],b[0])<=q[0]<=max(a[0],b[0])and min(a[1],b[1])<=q[1]<=max(a[1],b[1])
def inside(q,p):
 w=0
 for a,b in zip(p,p[1:]+p[:1]):
  if on(a,b,q):return False
  c=cross(a,b,q)
  if a[1]<=q[1]<b[1]and c>0:w+=1
  if b[1]<=q[1]<a[1]and c<0:w-=1
 return w!=0
count=0;starts=0
for case in j['cases']:
 ra,rb=case['rawOneBased']
 for item in case['positiveFilledIntersections']:
  ia,ib=item['PpairOneBased'];a,b=poly(ra,ia),poly(rb,ib);w=item['witness'];kind=w['kind']
  if kind=='proper-edge-crossing':
   x,y=a[w['edgeAZeroBased']],a[(w['edgeAZeroBased']+1)%len(a)];z,t=b[w['edgeBZeroBased']],b[(w['edgeBZeroBased']+1)%len(b)]
   values=[cross(x,y,z),cross(x,y,t),cross(z,t,x),cross(z,t,y)]
   assert values==list(map(F,w['crossProducts']))and values[0]*values[1]<0 and values[2]*values[3]<0
  else:
   q=tuple(map(F,w['point']))
   src,other=(a,b)if kind=='A-vertex-strict-inside-B'else(b,a)
   assert src[w['vertexZeroBased']]==q and inside(q,other)
  count+=1
 if 'guideStartFact'in case:
  f=case['guideStartFact'];q=tuple(map(F,f['point']));actual=tuple(F(str(v))for v in full['trace'][f['currentRawOneBased']-1][0]['args'][:2]);assert q==actual
  if 'strictInsidePreviousPOneBased'in f:assert inside(q,poly(ra,f['strictInsidePreviousPOneBased']))
  else:
   pp=poly(ra,f['onPreviousPOneBased']);i=f['onPreviousPEdgeZeroBased'];assert on(pp[i],pp[(i+1)%len(pp)],q)and not inside(q,pp)
  starts+=1
assert count==5 and starts==3
assert j['catalogStrokes']==14 and j['dictionaryPlaybackStrokes']==15
assert j['limits']['allPrefixConnectivityNotProved']and j['limits']['growingMaskPIntersectionNotProved']and not j['limits']['nativeReuseApproved']
print(json.dumps({'newContactWitnessArtifactFIRSTPASS':True,'cases':len(j['cases']),'positivePpairWitnesses':count,'strictOrBoundaryGuideStarts':starts,'fullPairSearchReplay':0,'engineReplay':0,'sourceProjectionReplay':0,'nativeApproval':False}))
