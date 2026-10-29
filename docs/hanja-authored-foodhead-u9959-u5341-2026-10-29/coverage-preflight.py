#!/usr/bin/env python3
# Reuse existing bounded coverage functions; no source/width/renderer modification.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
from fractions import Fraction as F
import importlib.util,json,hashlib
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
BASE='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/coverage-preflight.py'
assert hashlib.sha256((ROOT/BASE).read_bytes()).hexdigest()=='b11ec7c430d57ea00325e7ea0ba13b99bc852624a6874d5cd597c870bd2282a6'
s=importlib.util.spec_from_file_location('u9959_existing_coverage',ROOT/BASE);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
def run():
 fixture=json.loads((HERE/'fixtures-execution-draft.json').read_text());check=json.loads((HERE/'execution-draft-check.json').read_text());rows=[]
 old_fixture_path=ROOT/'docs/hanja-authored-foodhead-u9917-u5341-2026-10-28/fixtures-execution-draft.json';old_coverage_path=ROOT/'docs/hanja-authored-foodhead-u9917-u5341-2026-10-28/coverage-preflight.json'
 assert hashlib.sha256(old_fixture_path.read_bytes()).hexdigest()=='32450a1d27099ef7377b8ab546cf731ae2e731cd1e2ac6622806f044e48c658d'
 assert hashlib.sha256(old_coverage_path.read_bytes()).hexdigest()=='a6c5015ff848fd905b406002b65398015278eedf8827a4572cdc3adfa4f66bd6'
 oldfixture=json.loads(old_fixture_path.read_text());oldcoverage=json.loads(old_coverage_path.read_text())
 for pen,row in enumerate(fixture['strokes'],1):
  for mask,stroke in enumerate(row,1):
   if stroke['direction']!='curve':continue
   if pen in(1,2,3):
    assert stroke==oldfixture['strokes'][pen-1][mask-1]
    prior=next(x for x in oldcoverage['units']if x['pen']==pen and x['mask']==mask);assert prior['status']=='PASS-CONSERVATIVE-COVERAGE'
    rows.append(dict(prior,reusedUnchangedPriorSuccess=True,sourceFieldSHA256=hashlib.sha256(json.dumps(stroke,ensure_ascii=False,separators=(',',':')).encode()).hexdigest()));continue
   radius=stroke['revealWidth']/2;gs,_=b.parse(stroke['revealPath']);guide=[[tuple(float(v)for v in p)for p in seg]for seg in gs];witnesses=[]
   if pen!=3:
    assert len(guide)==2 and len(guide[0])==2 and len(guide[1])==3;line,q=guide;distance=lambda p:b.q_upper(p,line,q);_,polys=b.parse(stroke['outline']);triangles=[(p[0],p[i],p[i+1])for p in polys for i in range(1,len(p)-1)]
    for p in[p for poly in polys for p in poly]:
     p=tuple(map(float,p));lower=b.q_outside(p,line,q,radius)
     if lower is not None:witnesses.append({'originalFilledVertex':p,'distanceLower':lower,'distanceUpper':distance(p),'necessaryWidthGreaterThan':2*lower})
    coverage=b.cover(triangles,distance,radius);region='Original P fan superset; possible concave exterior can leave coverage unproved.'
   else:
    fact=next(f for f in check['facts']if f['logical']==3);segments,polys=b.parse(fact['sourceOriginalD']);norm=lambda p:(p[0]/10,(F(900)-p[1])/10);segments=[[norm(p)for p in seg]for seg in segments];polys=[[norm(p)for p in poly]for poly in polys];assert len(polys)==1 and all(len(seg)==2 for seg in guide);distance=lambda p:min(b.line_dist(p,*line)for line in guide);triangles=[];error=None
    try:
     triangles=b.earclip(polys[0])
     for seg in segments:
      if len(seg)>2:triangles+=b.hull(seg)
    except AssertionError as e:error=str(e)
    for seg in segments:
     for j in range(257):
      p=tuple(map(float,b.bezier(seg,F(j,256))));value=distance(p)
      if value-b.EPS>radius:witnesses.append({'originalFilledBoundarySample':p,'segmentDegree':len(seg)-1,'t':j/256,'distanceLower':value-b.EPS,'distanceUpper':value+b.EPS,'necessaryWidthGreaterThan':2*(value-b.EPS)});break
    coverage={'covered':False,'reason':error}if error else b.cover(triangles,distance,radius);region='Exact endpoint-chord polygon ear triangles plus originalQ/C control hulls; source-local mask frame with already exact affine binding. No product/source path flattening.'
   state='OUTLIER-CONFIRMED'if witnesses else'PASS-CONSERVATIVE-COVERAGE'if coverage['covered']else'UNPROVED';rows.append({'pen':pen,'mask':mask,'source':'OriginalMM十H source-affine'if pen==3 else'Original retained KAGE P/Q','radiusInGuideFrame':radius,'revealWidth':stroke['revealWidth'],'revealTransform':stroke.get('revealTransform'),'status':state,'coverage':coverage,'coverageRegion':region,'outliers':witnesses[:4],'outlierWitnessCount':len(witnesses),'nativeApproval':False})
 assert len(rows)==5
 return{'schema':'hanja-public-mixed-filled-coverage-preflight/v1','date':'2026-10-29','glyph':'饙','scope':'Full round guide only, dash/start clip removed; bounded public numerical coverage, not temporal/raster/native approval.','inputSHA256':{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest()for p in[HERE/'fixtures-execution-draft.json',HERE/'execution-draft-check.json',Path(__file__).resolve(),ROOT/BASE,old_fixture_path,old_coverage_path]},'numerics':{'margin':b.EPS,'triangleDepthLimit':16,'triangleNodeLimit':60000,'QOutsideControlBoxDepthLimit':20,'MMBoundarySamplesPerCurve':257,'formalIntervalProof':False},'counts':{'masks':5,'pass':sum(r['status']=='PASS-CONSERVATIVE-COVERAGE'for r in rows),'outlier':sum(r['status']=='OUTLIER-CONFIRMED'for r in rows),'unproved':sum(r['status']=='UNPROVED'for r in rows)},'units':rows,'limits':['KAGE fan supersets may leave conservative unproved cases; unproved is not insufficient width.','Only actual source vertices/boundary witnesses count as concrete outliers.','Source-local donor coverage transports through the pinned exact affine but does not establish original microclock or native start/transition behavior.','Native whole/22strokes/compound4,17/endings/residuals/replay remain required.'],'nativeApproval':False,'runtimeApplied':False,'serverStarts':0,'buildRun':False}
if __name__=='__main__':print(json.dumps(run(),ensure_ascii=False))
