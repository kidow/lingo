#!/usr/bin/env python3
# Existing source-local polyline / original cubic fill conservative coverage only.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
from fractions import Fraction as F
import json,hashlib,importlib.util
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
BASE='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/coverage-preflight.py'
assert hashlib.sha256((ROOT/BASE).read_bytes()).hexdigest()=='b11ec7c430d57ea00325e7ea0ba13b99bc852624a6874d5cd597c870bd2282a6'
s=importlib.util.spec_from_file_location('ao_existing_coverage',ROOT/BASE);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
def run():
 f=json.loads((HERE/'fixtures-execution-draft.json').read_text());check=json.loads((HERE/'execution-draft-check.json').read_text());units=[]
 for pen in range(1,12):
  seg=f['strokes'][pen-1][0];fact=next(x for x in check['facts']if x['logical']==pen);assert seg['direction']=='curve'and seg['revealWidth']==12.8 and seg['revealStartGate']['padding']==6.4
  originalSegments,polys=b.parse(fact['sourceOriginalD']);norm=lambda p:(p[0]/10,(F(900)-p[1])/10);originalSegments=[[norm(p)for p in s]for s in originalSegments];polys=[[norm(p)for p in poly]for poly in polys];guides,_=b.parse(seg['revealPath']);assert guides and all(len(g)==2 for g in guides)and all(a[-1]==z[0]for a,z in zip(guides,guides[1:]));distance=lambda p:min(b.line_dist(p,*g)for g in guides);radius=6.4;tri=[];error=None;witnesses=[]
  try:
   for poly in polys:tri+=b.earclip(poly)
   for s in originalSegments:
    if len(s)>2:tri+=b.hull(s)
  except AssertionError as e:error=str(e)
  for i,s in enumerate(originalSegments):
   for j in range(257):
    p=tuple(map(float,b.bezier(s,F(j,256))));value=distance(p)
    if value-b.EPS>radius:witnesses.append({'originalBoundarySegment':i,'degree':len(s)-1,'tExact':str(F(j,256)),'pointSource100':p,'distanceLower':value-b.EPS,'distanceUpper':value+b.EPS,'neededRadiusGreaterThan':value-b.EPS});break
  result={'covered':False,'reason':error}if error else b.cover(tri,distance,radius);status='OUTLIER-CONFIRMED'if witnesses else'PASS-CONSERVATIVE-COVERAGE'if result['covered']else'UNPROVED'
  units.append({'pen':pen,'mask':1,'status':status,'width':12.8,'radius':6.4,'guideKind':'Original source median polyline with authored padding6.4','coverage':result,'outliers':witnesses,'nativeApproval':False})
 return{'schema':'hanja-source-polyline-cubic-fill-coverage-preflight/v1','glyph':'嗸','scope':'Original unplaced N100 source frame; completed full-round tube only, dash/start gate removed. Already exact source-affine equivalence transports the result; no timing approval.','inputs':{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest()for p in[HERE/'fixtures-execution-draft.json',HERE/'execution-draft-check.json',Path(__file__).resolve(),ROOT/BASE]},'method':'Existing endpoint-polygon ear triangles plus each original C control convex hull cover filled source; 1-Lipschitz polyline distance bounds. Possible hull exterior may leave UNPROVED. Actual boundary samples only establish concrete outliers.','numerics':{'margin':b.EPS,'triangleDepthLimit':16,'nodeLimit':60000,'boundarySamplesPerSegment':257,'formalIntervalProof':False},'counts':{'masks':11,'pass':sum(x['status']=='PASS-CONSERVATIVE-COVERAGE'for x in units),'outlier':sum(x['status']=='OUTLIER-CONFIRMED'for x in units),'unproved':sum(x['status']=='UNPROVED'for x in units)},'units':units,'limits':['Conservative UNPROVED does not establish insufficient width.','Source width128/12.8 and full-round coverage do not establish initial/transition/final actual reveal.','No new cubic guide, source point edit, mask expansion, renderer or engine.'],'nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(run(),ensure_ascii=False))
