#!/usr/bin/env python3
# Existing conservative Q coverage only; source and reveal policy unchanged.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
import importlib.util,json,hashlib
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
BASE='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/coverage-preflight.py'
assert hashlib.sha256((ROOT/BASE).read_bytes()).hexdigest()=='b11ec7c430d57ea00325e7ea0ba13b99bc852624a6874d5cd597c870bd2282a6'
s=importlib.util.spec_from_file_location('xu_existing_coverage',ROOT/BASE);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
def run():
 fixture=json.loads((HERE/'fixtures-execution-draft.json').read_text());rows=[]
 for pen,row in enumerate(fixture['strokes'],1):
  for mask,stroke in enumerate(row,1):
   if stroke['direction']!='curve':continue
   radius=stroke['revealWidth']/2;gs,_=b.parse(stroke['revealPath']);guide=[[tuple(float(v)for v in p)for p in seg]for seg in gs];assert len(guide)==2 and len(guide[0])==2 and len(guide[1])==3
   line,q=guide;distance=lambda p:b.q_upper(p,line,q);_,polys=b.parse(stroke['outline']);triangles=[(p[0],p[i],p[i+1])for p in polys for i in range(1,len(p)-1)];witnesses=[]
   for p in[p for poly in polys for p in poly]:
    p=tuple(map(float,p));lower=b.q_outside(p,line,q,radius)
    if lower is not None:witnesses.append({'originalFilledVertex':p,'distanceLower':lower,'distanceUpper':distance(p)})
   coverage=b.cover(triangles,distance,radius);state='OUTLIER-CONFIRMED'if witnesses else'PASS-CONSERVATIVE-COVERAGE'if coverage['covered']else'UNPROVED'
   rows.append({'pen':pen,'mask':mask,'radius':radius,'revealWidth':stroke['revealWidth'],'status':state,'coverage':coverage,'coverageRegion':'Original P fan superset; possible concave exterior can leave coverage unproved.','outliers':witnesses,'nativeApproval':False})
 assert[(r['pen'],r['mask'])for r in rows]==[(18,1),(19,1)]
 return{'schema':'hanja-public-original-component-filled-coverage-preflight/v1','date':'2026-10-29','glyph':'藚','scope':'Full round guide only; dash/start gate removed. Bounded public numerical coverage, not native temporal approval.','inputSHA256':{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest()for p in[HERE/'fixtures-execution-draft.json',HERE/'execution-draft-check.json',Path(__file__).resolve(),ROOT/BASE]},'numerics':{'margin':b.EPS,'triangleDepthLimit':16,'triangleNodeLimit':60000,'QOutsideControlBoxDepthLimit':20,'formalIntervalProof':False},'counts':{'masks':2,'pass':sum(r['status']=='PASS-CONSERVATIVE-COVERAGE'for r in rows),'outlier':sum(r['status']=='OUTLIER-CONFIRMED'for r in rows),'unproved':sum(r['status']=='UNPROVED'for r in rows)},'units':rows,'limits':['Unproved fan coverage is not insufficient width.','Start/compound boundaries/endings and replay require fresh root native review.','Public source point preservation does not establish original publisher microclock identity.'],'nativeApproval':False,'runtimeApplied':False,'serverStarts':0,'buildRun':False}
if __name__=='__main__':print(json.dumps(run(),ensure_ascii=False))
