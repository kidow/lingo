#!/usr/bin/env python3
# Focused source-local complete C10 + original 玉 Q4 full-round coverage only.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
from fractions import Fraction as F
import json,hashlib,importlib.util,math
ROOT=Path.cwd();BASE='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/coverage-preflight.py'
assert hashlib.sha256((ROOT/BASE).read_bytes()).hexdigest()=='b11ec7c430d57ea00325e7ea0ba13b99bc852624a6874d5cd597c870bd2282a6'
s=importlib.util.spec_from_file_location('cang_existing_coverage',ROOT/BASE);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
PINS={'docs/hanja-authored-component-u7472-hans-cang10-2026-10-30/donor-source-record.json':'fefd99037c0d6b54e2a42809634f905b031370099628e6b1d47653d4fec6f155','docs/hanja-authored-component-u7472-hans-cang10-2026-10-30/recipe.json':'9c0e8572a355973c37cd7f4edf4b40ad2700e9ecd6ef25de10bb1cf1abe10b57','docs/hanja-goal-glyphwiki-batch910-2026-10-13/engine-proof.json':'af8725be5086be13abba604572e76bad4ed1abf342557f3287556e9d81462e6e'}
for p,h in PINS.items():assert hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==h
record=json.loads((ROOT/'docs/hanja-authored-component-u7472-hans-cang10-2026-10-30/donor-source-record.json').read_text());source=json.loads((ROOT/'docs/hanja-goal-glyphwiki-batch910-2026-10-13/engine-proof.json').read_text());units=[]
def padded_polyline(d,radius):
 guide,_=b.parse(d);assert guide and all(len(g)==2 for g in guide)and all(a[-1]==z[0]for a,z in zip(guide,guide[1:]));guide=[[(float(p[0])/10,float(p[1])/10)for p in seg]for seg in guide];first,second=guide[0];dx,dy=second[0]-first[0],second[1]-first[1];length=math.hypot(dx,dy);assert length>0;start=(first[0]-radius*dx/length,first[1]-radius*dy/length);return[(start,first)]+guide
for i,p in enumerate(record['filledPaths']):
 segments,polys=b.parse(p['originalD']);segments=[[(p[0]/10,p[1]/10)for p in seg]for seg in segments];polys=[[(p[0]/10,p[1]/10)for p in poly]for poly in polys];guide=padded_polyline(record['guides'][i]['originalD'],6.4);distance=lambda p:min(b.line_dist(p,*g)for g in guide);tri=[];error=None;witness=[]
 try:
  for poly in polys:tri+=b.earclip(poly)
  for seg in segments:
   if len(seg)>2:tri+=b.hull(seg)
 except AssertionError as e:error=str(e)
 for j,seg in enumerate(segments):
  for k in range(257):
   p=tuple(map(float,b.bezier(seg,F(k,256))));v=distance(p)
   if v-b.EPS>6.4:witness.append({'segment':j,'degree':len(seg)-1,'t':str(F(k,256)),'sourcePoint100':p,'distanceLower':v-b.EPS});break
 result={'covered':False,'reason':error}if error else b.cover(tri,distance,6.4);units.append({'logical':i+5,'sourceDonorStroke':i+1,'status':'OUTLIER-CONFIRMED'if witness else'PASS-CONSERVATIVE-COVERAGE'if result['covered']else'UNPROVED','widthSource100':12.8,'paddingSource100':6.4,'coverage':result,'outliers':witness,'sourceDAndGuideChanged':False})
# Original 玉4 raw4 Q: source200 to world100 once, unchanged source P/Q.
q=source['trace'][3][0];assert q['kind']=='cdDrawCurve';a=q['args'];curve=[(F(str(a[i]))/2,F(str(a[i+1]))/2)for i in[0,2,4]];dx=float(curve[1][0]-curve[0][0]);dy=float(curve[1][1]-curve[0][1]);length=math.hypot(dx,dy);start=(float(curve[0][0])-7*dx/length,float(curve[0][1])-7*dy/length);line=(start,tuple(map(float,curve[0])));distance=lambda p:b.q_upper(p,line,curve);polys=[[(F(str(v[0]))/2,F(str(v[1]))/2)if isinstance(v,list)else(F(str(v['x']))/2,F(str(v['y']))/2)for v in poly]for poly in source['groups'][3]['polygons']];tri=[]
for poly in polys:tri+=b.earclip(poly)
result=b.cover(tri,distance,7);witness=[]
for j,poly in enumerate(polys):
 for k,p in enumerate(poly):
  if b.q_outside(p,line,curve,7):witness.append({'P':j,'vertex':k,'sourceWorld100':list(map(float,p))})
units.append({'logical':4,'sourceRecipientRaw':4,'status':'OUTLIER-CONFIRMED'if witness else'PASS-CONSERVATIVE-COVERAGE'if result['covered']else'UNPROVED','widthWorld100':14,'paddingWorld100':7,'coverage':result,'outliers':witness,'sourcePAndQChanged':False})
print(json.dumps({'schema':'hanja-source-local-C-polyline-and-KAGE-Q-coverage/v1','glyph':'瑲','inputs':PINS,'baseVerifier':{'path':BASE,'SHA256':'b11ec7c430d57ea00325e7ea0ba13b99bc852624a6874d5cd597c870bd2282a6'},'counts':{'masks':11,'pass':sum(u['status']=='PASS-CONSERVATIVE-COVERAGE'for u in units),'outlier':sum(u['status']=='OUTLIER-CONFIRMED'for u in units),'unproved':sum(u['status']=='UNPROVED'for u in units)},'units':units,'numerics':{'margin':b.EPS,'triangleDepthLimit':16,'nodeLimit':60000,'boundarySamplesPerCubic':257,'formalIntervalProof':False},'limits':['Conservative C-control hull regions may extend outside actual source fill; UNPROVED is not insufficient width.','Full-round coverage with dash/start clipping removed only; no early-head, transition, final-clock or native temporal approval.','Source SVG128 width uses authored backward pad64 in SVG source units; not original publisher timing.','One exact whole-donor positive affine transports source coverage only if filled and guide/linewidth use the same frame.'],'nativeApproved':False,'actualTemporalApproved':False,'runtimeApplied':False,'sharedFilesChanged':False}))
