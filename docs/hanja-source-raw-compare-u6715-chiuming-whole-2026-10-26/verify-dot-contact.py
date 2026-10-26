from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2]
FULL='docs/hanja-actual-engine-capture-u6715-chiuming-2026-10-26/engine-whole-chiuming-neko_u6715.json'
HELP='docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py'
fb=(R/FULL).read_bytes();hb=(R/HELP).read_bytes()
assert hashlib.sha256(fb).hexdigest()=='b87e16d47e887b1dd75bd985fda03f4795bee89e5ce4afdc9adc9314cbe16045'
assert hashlib.sha256(hb).hexdigest()=='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76'
tree=ast.parse(hb.decode());names={'vec','det','value','union_row','events'}
defs=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in names]
assert {n.name for n in defs}==names
ns={};exec(compile(ast.fix_missing_locations(ast.Module(body=defs,type_ignores=[])),str(R/HELP),'exec'),ns)
events,union_row,value=(ns[n]for n in['events','union_row','value'])
full=json.loads(fb);groups=full['groups'];trace=full['trace']
assert len(groups)==len(trace)==11 and sum(map(len,trace))==13
assert [g['polygons']for g in groups]==[[p for c in row for p in c['polygons']]for row in trace]
assert groups[0]['raw'][0]==7 and groups[3]['raw'][0]==groups[4]['raw'][0]==2
def poly(p):
 assert all(v['off']==0 for v in p)
 return[(F(str(v['x'])),F(str(v['y'])))for v in p]
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
def intersection(a,b):
 lo=min(y for p in[a,b]for x,y in p);hi=max(y for p in[a,b]for x,y in p)
 cuts=events([a,b],lo,hi);area=F(0);witness=None
 for low,high in zip(cuts,cuts[1:]):
  mid=(low+high)/2
  for al,ar in union_row([a],mid):
   for bl,br in union_row([b],mid):
    left=max([al,bl],key=lambda fn:value(fn,mid));right=min([ar,br],key=lambda fn:value(fn,mid))
    width=value(right,mid)-value(left,mid)
    if width<=0:continue
    endpoint_widths=[value(right,y)-value(left,y)for y in[low,high]]
    assert min(endpoint_widths)>=0
    area+=(high-low)*sum(endpoint_widths)/2
    if witness is None:witness={'point':[(value(left,mid)+value(right,mid))/2,mid],'openYSlab':[low,high],'horizontalWidth':width}
 return area,witness,len(cuts)-1
left=[poly(p)for p in groups[0]['polygons']];results=[]
for raw in[4,5]:
 pairs=[]
 for di,d in enumerate(map(poly,groups[raw-1]['polygons']),1):
  for li,l in enumerate(left,1):
   gap=min(x for x,y in d)-max(x for x,y in l)
   if gap>0:area,witness,slabs=F(0),None,0
   else:area,witness,slabs=intersection(d,l)
   pairs.append({'dotRaw':raw,'dotP':di,'leftRaw':1,'leftP':li,'positiveArea':area>0,'exactIntersectionArea':area,'witness':witness,'slabs':slabs,'horizontalBBoxGap':gap if gap>0 else None})
 results.append({'dotRaw':raw,'positiveContactWithOriginalLeftRaw1':any(p['positiveArea']for p in pairs),'pairs':pairs})
out={'schema':'hanja-public-original-P-contact/v1','date':'2026-10-26','glyph':'朕','root':'chiuming-neko_u6715@1',
 'full5':{'path':FULL,'SHA256':hashlib.sha256(fb).hexdigest()},
 'exactPrimitives':{'path':HELP,'SHA256':hashlib.sha256(hb).hexdigest(),'ASTFunctionsOnly':sorted(names),'oldTargetLoopsExecuted':0},
 'method':'Strict horizontal bounding-box separation proves disjoint pairs first. Remaining pairs use exact rational horizontal event slabs over every original segment vertex and intersection, per-P nonzero-fill intervals and exact linear-width integration. Pair areas are not summed as a union area.',
 'rawMapping':{'leftVertical':1,'leftVerticalOriginalP':3,'firstInteriorDRDot':4,'secondInteriorDRDot':5,'eachDotOriginalP':2},
 'results':results,'sourceCarrierGapNotInkGap':True,'sourcePOrQChanged':False,'widthOrWeightChanged':False,
 'newEngine':0,'projection':0,'privateOriginalFetch':0,'privateMediaSaved':False,'server':0,'nativeObservation':0,
 'temporalOrOrderApproval':False,'runtimeApplied':False}
print(json.dumps(enc(out),separators=(',',':')))
