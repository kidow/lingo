from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2]
FULL='docs/hanja-goal-glyphwiki-batch1027-2026-10-13/engine-whole-u8585-ue0102.json';b=(R/FULL).read_bytes();assert hashlib.sha256(b).hexdigest()=='0e3c057ae9641b610c89ec602558fe1ac7510278306b3dcb6f55f0ff6279ccd5';f=json.loads(b,parse_float=F)
UTIL='docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';ub=(R/UTIL).read_bytes();assert hashlib.sha256(ub).hexdigest()=='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76'
wanted={'vec','det','value','union_row','events'};nodes=[n for n in ast.parse(ub).body if isinstance(n,ast.FunctionDef)and n.name in wanted];assert {n.name for n in nodes}==wanted
exec(compile(ast.Module(body=nodes,type_ignores=[]),str(R/UTIL),'exec'),globals())
assert set(f)=={'engineRevision','engineHashes','groups','trace','defaults'} and len(f['groups'])==len(f['trace'])==19
assert sum(len(t)for t in f['trace'])==21 and sum(len(g['polygons'])for g in f['groups'])==42
for group,trace in zip(f['groups'],f['trace']):assert group['polygons']==[p for call in trace for p in call['polygons']]
def polygons(raw):
 out=[]
 for p in f['groups'][raw-1]['polygons']:
  assert all(set(v)=={'x','y','off'}and v['off']==0 for v in p)
  out.append([(F(v['x']),F(v['y']))for v in p])
 return out
def endpoint(raw,last):
 c=f['trace'][raw-1][-1 if last else 0];a=c['args']
 if not last:return list(map(F,a[:2]))
 assert c['kind']in('cdDrawLine','cdDrawCurve')
 return list(map(F,a[2:4]if c['kind']=='cdDrawLine'else a[4:6]))
def check(a,b):
 P,Q=polygons(a),polygons(b);ys=events(P+Q,min(v[1]for p in P+Q for v in p),max(v[1]for p in P+Q for v in p));area=F(0);cells=[]
 for lo,hi in zip(ys,ys[1:]):
  mid=(lo+hi)/2
  for l1,r1 in union_row(P,mid):
   for l2,r2 in union_row(Q,mid):
    left=max([l1,l2],key=lambda x:value(x,mid));right=min([r1,r2],key=lambda x:value(x,mid))
    width=value(right,mid)-value(left,mid)
    if width<=0:continue
    wlo=value(right,lo)-value(left,lo);whi=value(right,hi)-value(left,hi);assert wlo>=0 and whi>=0
    exact=(wlo+whi)*(hi-lo)/2;assert exact>0;area+=exact
    q1=(3*lo+hi)/4;q3=(lo+3*hi)/4;minimum=min(value(right,y)-value(left,y)for y in[q1,q3]);assert minimum>0
    cells.append({'ySlab':[lo,hi],'leftBoundaryAffine':left,'rightBoundaryAffine':right,'interiorWitness':[(value(left,mid)+value(right,mid))/2,mid],'centralHalfMinimumWidth':minimum,'positiveAreaLowerBound':minimum*(hi-lo)/2,'wholeCellArea':exact})
 ae,bs=endpoint(a,True),endpoint(b,False)
 return{'rawPair':[a,b],'originalPCounts':[len(P),len(Q)],'originalCallKinds':[[c['kind']for c in f['trace'][a-1]],[c['kind']for c in f['trace'][b-1]]],'QEnd':ae,'QNextStart':bs,'QExact':ae==bs,'QDelta':[bs[i]-ae[i]for i in[0,1]],'positiveAreaIntersection':area>0,'exactIntersectionArea':area,'positiveSlabCells':len(cells),'firstPositiveWitnessCertificate':cells[0]if cells else None,'nativeMergeApproved':False}
text=b.decode();match=re.search(r'"trace"\s*:\s*',text);assert match
traceValue,traceStop=json.JSONDecoder(parse_float=F).raw_decode(text,match.end());assert traceValue==f['trace'];traceBytes=text[match.end():traceStop].encode();assert hashlib.sha256(traceBytes).hexdigest()=='eae1f13587b051e4a6cf116fb7b89d4ed50a0db989af6588343da8d44da31fa2'
assert f['engineRevision']=='49232bac0348fe815f4200d4116ab7917e0db47f' and len(f['engineHashes'])==8
results=[check(5,6),check(13,14)]
def enc(x):
 if isinstance(x,F):return str(x)
 if isinstance(x,list):return[enc(v)for v in x]
 if isinstance(x,tuple):return[enc(v)for v in x]
 if isinstance(x,dict):return{k:enc(v)for k,v in x.items()}
 return x
output={'schema':'hanja-original-public-contact-candidates/v1','date':'2026-10-26','glyph':'薅','root':'u8585-ue0102','sourceFull5':{'path':FULL,'SHA256':hashlib.sha256(b).hexdigest()},'utility':{'path':UTIL,'SHA256':hashlib.sha256(ub).hexdigest(),'importedFunctions':sorted(wanted),'oldTargetLoopsExecuted':0},'traceOriginalJSON':{'SHA256':'eae1f13587b051e4a6cf116fb7b89d4ed50a0db989af6588343da8d44da31fa2','bytes':36647,'scope':'Exact original trace JSON byte slice in the same pinned whole file; no separate header/body combination.'},'sameWholeTraceRawPolygonsAsserted':True,'sourceCapsule':{'path':'docs/hanja-goal-glyphwiki-batch1027-2026-10-13/sources.json','SHA256':'880f96f454180b248b26ceb65d694c603ff02f613e390ccae27a558cca212ea4'},'sourceWholeEngineReplayed':False,'coordinates':'Unchanged original 200-unit polygon coordinates; exact decimal source tokens parsed as rational. No normalization or endpoint tolerance.','sourceCounts':{'raw':19,'calls':21,'P':42},'results':results,'method':'All original vertices and exact segment intersections partition y into open slabs. Each original P is filled by nonzero winding independently, then united per raw. Exact row-interval intersections integrate positive affine widths. Central-half lower bounds certify positive area, not just coincident edges.','limits':['Positive original-P overlap alone does not approve a domestic pen boundary, 19-to17 grouping, temporal direction or clipping policy.','This proof does not replace whole/native evidence, and does not add, remove, reverse, merge or translate any P/Q/source row.'],'sourcePOrQChanged':False,'engine':0,'projection':0,'oldWholeReplayed':False,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(enc(output),ensure_ascii=False))
