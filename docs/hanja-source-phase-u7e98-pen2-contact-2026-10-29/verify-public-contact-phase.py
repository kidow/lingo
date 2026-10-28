import ast,json,re,hashlib
from pathlib import Path
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2]
SOURCE='docs/hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29/fixtures-execution-draft.json'
MATH='docs/hanja-authored-guide-u7e98-compounds-2026-10-29/donor-guide-math.json'
UTIL='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py'
PINS={SOURCE:'b6889acd4fdf6234ae8ad4000d088057dd8fb3b1216cd1e71ad10c329e3c8d98',MATH:'9262444e338d4016355198daa0e1f263bc3d2acd97e3ec3da727ce7ece56f7eb',UTIL:'945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea'}
for p,h in PINS.items():assert hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==h
tree=ast.parse((ROOT/UTIL).read_text());exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)],type_ignores=[]),UTIL,'exec'))
def polys(s):
 out=[]
 for c in s.split('M')[1:]:
  assert c.strip().endswith('Z');ns=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?(?:e[-+]?\d+)?',c)];out.append(clean(list(zip(ns[::2],ns[1::2]))))
 return out
f=json.loads((ROOT/SOURCE).read_bytes());a,b=f['strokes'][1];prior,heads=polys(a['outline']),polys(b['outline'])
assert len(prior)==len(heads)==3 and all(simple(p)for p in prior+heads)
donor=next(p for p in json.loads((ROOT/MATH).read_bytes())['plans']if p['logical']==2)
seed=tuple(F(v)for v in donor['recipientAnchorsExact100'][1])
assert any(relation(seed,p)==1for p in prior)and any(relation(seed,p)==1for p in heads)
xs={v[0]for p in heads for v in p}|{seed[0]};es=[e for p in heads for e in edges(p)]
for aa,bb in es:
 for cc,dd in es:
  x=crossingX(aa,bb,cc,dd)
  if x is not None:xs.add(x)
xs=sorted(xs);checks=sorted(set(xs+[(x+y)/2for x,y in zip(xs,xs[1:])]))
sections={x:merge([v for p in heads for v in vertical(p,x)])for x in checks}
violations=[str(x)for x,v in sections.items()if len(v)!=1];assert not violations,'SourceH is not X-monotone'
hcol=merge([v for p in heads for v in vertical(p,seed[0])]);acol=merge([v for p in prior for v in vertical(p,seed[0])])
overlaps=[(max(l,hl),min(r,hr))for l,r in acol for hl,hr in hcol if min(r,hr)>max(l,hl)]
assert overlaps
def sectionLength(x):
 v=merge([v for p in heads for v in vertical(p,x)]);assert len(v)==1
 return v[0][1]-v[0][0]
area=F(0);leftArea=F(0)
for l,r in zip(xs,xs[1:]):
 q1=(3*l+r)/4;q2=(l+3*r)/4
 cell=(sectionLength(q1)+sectionLength(q2))*(r-l)/2
 assert cell>0
 area+=cell
 if r<=seed[0]:leftArea+=cell
assert 0<leftArea<area
boundary=next(v['boundary']for v in json.loads((ROOT/('docs/hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29/execution-draft-check.json')).read_bytes())['pairProgress']if v['pen']==2)
assert boundary==0.5770868086377152
xmin=min(v[0]for p in heads for v in p);xmax=max(v[0]for p in heads for v in p)
assert xmin<seed[0]<xmax
out={'schema':'hanja-public-source-contact-phase-math/v1','glyph':'纘','pen':2,'sourceGeometrySHA256':'aa241350799c5b55d739505e9c873cf2e820b1f65f6ae0c428d79a4dc9575f0f','sourceCounts':[25,31,62],'priorSourceRawOneBased':3,'nextSourceRawOneBased':4,'priorP':3,'nextP':3,'sourceDL':a,'sourceH':b,'sourceDLJSBoundary':boundary,'strictDonorCornerSeedExact100':[str(v)for v in seed],'strictSeedInteriorBothUnions':True,'priorIntervalsAtSeedX':[[str(z)for z in v]for v in acol],'HIntervalAtSeedX':[[str(z)for z in v]for v in hcol],'strictPositiveVerticalContactAtSeed':[[str(z)for z in v]for v in overlaps],'criticalX':len(xs),'criticalAndMidpointChecks':len(checks),'allHSectionsSingleConnectedInterval':True,'HUnionAreaExact100Squared':str(area),'HLeftSeedStripUnionAreaExact100Squared':str(leftArea),'leftHeadAreaShareExact':str(leftArea/area),'HBounds100':[str(min(v[i]for p in heads for v in p))for i in[0,1]]+[str(max(v[i]for p in heads for v in p))for i in[0,1]],'phaseRecipe':'Retain exact original DL source3P/Q14/7 until originalJSboundary; hold completedDL opaque; reveal originalH3P with one cliprect fromstrictseedX towardxmin, then extend same retainedrect right toxmax. No new filledP, no newQ, no separate sourceH paintedpieces.','areaMethod':'Piecewise linear closed-union vertical sections; integrate quarterpoint pairs on exact vertex/edge-crossing/seed critical intervals, so vertical boundary jumps are measurezero and not overcounted.','continuityScope':'Exact closed-set contact/X-monotone strip family; not pixel-AA guarantee, native visual approval or original publisher microclock equivalence.','DLFullRoundCoverage':'REUSED unchanged original2m1 Q14/7 unit from15Q conservative report','originalSourceQUnchanged':True,'sourceHGuideUnusedDuringRectPhase':True,'newSourceP':0,'newSourceEngine':0,'newPrivateFetch':0,'nativeApproval':False,'actualR':False,'runtimeApplied':False,'inputSHA256':PINS}
if __name__=='__main__':print(json.dumps(out,ensure_ascii=False))
