import ast,json,re,math,hashlib
from pathlib import Path
from fractions import Fraction as F
B=Path(__file__).resolve().parents[2]
PINS={"docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py":"945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea","docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-continuous-donor-guide.py":"52317f09f8a1c3eb4a5e762ea3c7a5dd1b31ab968671982e36e12368caf697a6","docs/hanja-authored-ownstroke-u6621-upper-dl-gap-2026-10-29/fixtures-execution-draft.json":"5a2f78c2d025c7bb844e72e5d49a7e0096044616817c8300ad259f4af9b776db","public/hanja-strokes/textbook-reviewed.json":"975d517db71eed058d7e74cfd87447bfc39f495e3dd29fb1568024eeb3b7905d"}
for p,h in PINS.items():assert hashlib.sha256((B/p).read_bytes()).hexdigest()==h
UTILITY="docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py"
AFFINE="docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-continuous-donor-guide.py"
for rel in [UTILITY,AFFINE]:
 tree=ast.parse((B/rel).read_text());keep=[n for n in tree.body if isinstance(n,(ast.FunctionDef,ast.AsyncFunctionDef))];exec(compile(ast.Module(body=keep,type_ignores=[]),rel,'exec'))
fixture=json.loads((B/"docs/hanja-authored-ownstroke-u6621-upper-dl-gap-2026-10-29/fixtures-execution-draft.json").read_text())
registered=json.loads((B/'public/hanja-strokes/textbook-reviewed.json').read_text());donor=next(x for x in registered['characters'] if x['glyph']=='玄');assert donor['geometryCorrection']=='vivasam-g3ii-b10-a-1706-v1'
assert hashlib.sha256(json.dumps(donor['paths'],separators=(',',':')).encode()).hexdigest()=='9c2d79be9d2bdce01ea299eb437b930c5a92101dd3d4e5cff7c84841f7f14725'
def polygons(s):
 assert re.sub(r'[MLZ0-9.eE+ -]','',s)==''
 out=[]
 for chunk in s.split('M')[1:]:
  assert chunk.strip().endswith('Z');ns=[F(v) for v in re.findall(r'-?\d+(?:\.\d+)?(?:e[-+]?\d+)?',chunk)];out.append(clean(list(zip(ns[::2],ns[1::2]))))
 return out
def nums(s):return [F(x) for x in re.findall(r'-?\d+(?:\.\d+)?(?:e[-+]?\d+)?',s)]
def frac(v):return str(v)
rows=[]
for pen,donorStroke in [(7,3),(8,4)]:
 prior,nexts=[polygons(s['outline'])for s in fixture['strokes'][pen-1]];assert all(simple(p)for p in prior+nexts)
 xs={v[0]for poly in nexts for v in poly};es=[e for p in nexts for e in edges(p)]
 for a,b in es:
  for c,d in es:
   x=crossingX(a,b,c,d)
   if x is not None:xs.add(x)
 xs=sorted(xs);testxs=sorted(set(xs+[(a+b)/2 for a,b in zip(xs,xs[1:])]))
 violations=[str(x) for x in testxs if len(merge([i for poly in nexts for i in vertical(poly,x)]))!=1]
 contacts=[]
 for pi,p in enumerate(prior):
  for qi,q in enumerate(nexts):
   for a in ears(p):
    for b in ears(q):
     c=clip(a,b);ar=abs(area2(c))/2
     if ar:contacts.append((ar,c,pi+1,qi+1))
 assert contacts
 ar,c,pi,qi=max(contacts,key=lambda x:x[0]);seed=tuple(sum(v[i]for v in c)/len(c)for i in [0,1]);assert any(relation(seed,p)==1for p in prior)and any(relation(seed,p)==1for p in nexts)
 points=nums(donor['paths'][donorStroke-1]);points=list(zip(points[::2],points[1::2]));assert len(points)==6
 first=nums(fixture['strokes'][pen-1][0]['revealPath']);last=nums(fixture['strokes'][pen-1][1]['revealPath']);start=tuple(first[2:4]);end=tuple(last[-2:]);m=affine([points[0],points[4],points[5]],[start,seed,end]);det=m[0]*m[3]-m[1]*m[2];assert det>0;mapped=[transform(m,p)for p in points]
 targets=prior+nexts if pen==7 else prior
 guide=mapped if pen==7 else mapped[:4];radius=12
 stack=[(t,0)for p in targets for t in ears(p)];nodes=0;boundmax=0;unproved=False
 while stack:
  tri,depth=stack.pop();nodes+=1;center=tuple(sum(p[i]for p in tri)/3for i in[0,1]);d=math.sqrt(float(min(dseg(center,a,b)for a,b in zip(guide,guide[1:]))));bound=d+max(math.sqrt(float(sum((p[i]-center[i])**2for i in[0,1])))for p in tri)+1e-8
  if bound<=radius:boundmax=max(boundmax,bound);continue
  if depth>=16 or nodes>=60000:unproved=True;break
  a,b,c=tri;ab=tuple((a[i]+b[i])/2for i in[0,1]);bc=tuple((b[i]+c[i])/2for i in[0,1]);ca=tuple((c[i]+a[i])/2for i in[0,1]);stack.extend([(t,depth+1)for t in[(a,ab,ca),(ab,b,bc),(ca,bc,c),(ab,bc,ca)]])
 deltas=[tuple(mapped[i+1][j]-mapped[i][j]for j in[0,1])for i in range(5)]
 rows.append(dict(pen=pen,donorStroke=donorStroke,sourcePath=donor['paths'][donorStroke-1],matrixExact=list(map(str,m)),determinantExact=str(det),placedPoints100=[[str(v)for v in p]for p in mapped],contactSeed100=list(map(str,seed)),contactComponent=[pi,qi],contactConvexArea100=str(ar),strictSeed=True,criticalXSlices=len(xs),sliceChecks=len(testxs),nextPXMonotone=not violations,violations=violations,coverage=dict(radius=12,width=24,padding=12,status='UNPROVED'if unproved else'PASS',nodes=nodes,maxAcceptedUpper=boundmax,scope='whole5P'if pen==7 else'prior3P-DL-only'),placedEdgeDeltas=[[float(v)for v in d]for d in deltas],nextBounds=[str(min(v[i]for p in nexts for v in p))for i in[0,1]]+[str(max(v[i]for p in nexts for v in p))for i in[0,1]]))
print(json.dumps({'rows':rows,'nativeApproval':False,'runtimeApplied':False}))
