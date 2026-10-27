from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re
R=Path(__file__).resolve().parents[2]
FIX='docs/hanja-source-original-u9008-hkcs-2026-10-27/fixtures-draft.json'
PATH='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py'
AXIS='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py'
KERNEL='docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py'
PINS={FIX:'c9fce51a23da581bcd9b25bc7e2f5fbabd765b45c222926fafc2fcdaef92707f',PATH:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',AXIS:'db903056c1375705fd8133ee79dcc3ff5450c519012a3f249881af9abebdbd29',KERNEL:'95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396'}
sha=lambda b:hashlib.sha256(b).hexdigest()
for p,h in PINS.items():assert sha((R/p).read_bytes())==h
fixture=json.loads((R/FIX).read_text())['u9008']
assert fixture['compiledSHA256']=='0ea0ea47896a94ac45a2ebb912d9c2c8f85610ee81d8609cd3706587036d881d'
for p,h in fixture['inputSHA256'].items():assert sha((R/p).read_bytes())==h
before=json.dumps(fixture,sort_keys=True)
def load_pure(path,names,env):
 source=(R/path).read_text()
 for fn in ast.parse(source).body:
  if isinstance(fn,ast.FunctionDef)and fn.name in names:exec(compile(ast.get_source_segment(source,fn),path+'::pure-only','exec'),env)
env={'F':F,'re':re,'fixture':fixture}
load_pure(PATH,{'polygons','cross','state'},env)
load_pure(AXIS,{'section','merge','intersection','audit'},env)
polygons,cross,state=[env[k]for k in['polygons','cross','state']]
ks=(R/KERNEL).read_text();kn=next(n for n in ast.parse(ks).body if isinstance(n,ast.FunctionDef)and n.name=='audit')
original_kernel=ast.get_source_segment(ks,kn);assert chr(10)+' anchor=tuple' in original_kernel
kernel_code=original_kernel.split(chr(10)+' anchor=tuple',1)[0]+chr(10)+' return P,boundary,kernel'
def area(q):return abs(sum(a[0]*b[1]-a[1]*b[0]for a,b in zip(q,q[1:]+q[:1])))/2 if q else F(0)
def encoded(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(tuple,list)):return[encoded(x)for x in v]
 if isinstance(v,dict):return{k:encoded(x)for k,x in v.items()}
 return v
def point_at(points,t):
 if len(points)==3:return tuple((1-t)**2*points[0][k]+2*t*(1-t)*points[1][k]+t*t*points[2][k]for k in[0,1])
 assert len(points)==4
 return tuple((1-t)**3*points[0][k]+3*t*(1-t)**2*points[1][k]+3*t*t*(1-t)*points[2][k]+t**3*points[3][k]for k in[0,1])
results=[]
for pen,mask,hypotheses in[(1,1,[(1,'increasing'),(0,'decreasing')]),(7,1,[(1,'increasing'),(0,'increasing')]),(8,1,[(1,'increasing'),(0,'increasing')]),(10,1,[(1,'decreasing'),(0,'increasing')]),(3,3,[(1,'increasing'),(0,'decreasing')]),(10,2,[(0,'increasing'),(1,'increasing')])]:
 logical=fixture['strokes'][pen-1];segment=logical[mask-1];P=polygons(segment['outline']);nums=list(map(F,re.findall(r'[-+]?(?:[0-9]*[.][0-9]+|[0-9]+)(?:[eE][-+]?[0-9]+)?',segment['revealPath'])));points=list(zip(nums[::2],nums[1::2]));assert len(points)in[3,4]
 source_calls=[(raw+1,ci+1,c)for raw in fixture['sourceGroups'][pen-1]for ci,c in enumerate(fixture['fullProof']['trace'][raw])];raw,ci,call=source_calls[mask-1];assert call['kind']==('cdDrawBezier'if len(points)==4 else'cdDrawCurve');assert all(float(a)==b/2 for a,b in zip(nums,call['args'][:len(nums)]));assert segment['revealWidth']==14
 public={'groups':[{'polygons':[[{'x':2*x,'y':2*y}for x,y in p]for p in P]}]};kns={'F':F,'f':public};exec(compile(kernel_code,KERNEL+'::boundary-kernel-only','exec'),kns);_,boundary,kernel=kns['audit'](1);assert boundary
 previous=[p for s in logical[:mask-1]for p in polygons(s['outline'])];tests=[]
 for t in[F(0),F(1,64),F(1,32),F(1,16),F(1,8),F(1,4)]:
  pt=point_at(points,t);margin=min(cross(a,b,pt)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in boundary if a!=b)
  tests.append({'sourceT':t,'point':pt,'closedTargetKernel':bool(kernel)and margin>=0,'strictTargetKernel':bool(kernel)and margin>0,'minimumKernelMargin':margin,'strictInsideCompletedPriorMaskP':any(state(pt,p)==1 for p in previous),'previousMaskPointStates':[state(pt,p)for p in previous]})
 selected=list(fixture['strokes']);selected[pen-1]=[segment];env['fixture']={'strokes':selected};axes=[]
 for axis,direction in hypotheses:
  item=env['audit'](pen,axis,direction);axes.append({k:v for k,v in item.items()if k!='firstFailures'}|{'firstFailure':item['firstFailures'][:1]})
 results.append({'pen':pen,'mask':mask,'rawOneBased':raw,'callOneBased':ci,'kind':call['kind'],'P':len(P),'sourceGuide':segment['revealPath'],'sourceWidth':14,'sourceWeight':segment['weight'],'visibilityKernelArea':area(kernel),'sourceDyadics':tests,'maskOnlyAxisHypotheses':axes})
env['fixture']=fixture;assert json.dumps(fixture,sort_keys=True)==before
out={'schema':'hanja-u9008-hkcs-confirmed-onset-source-conditions/v1','glyph':'逈','date':'2026-10-27','inputSHA256':PINS,'compiledSHA256':fixture['compiledSHA256'],'results':results,'coordinateFrame':'Exact decimal/rational original compiled100 P and Q/C tokens; no new P/Q/C/flags or coordinate edits.','limits':['Axis audit is a mask-only sufficient section condition, not whole-logical clipping or all-time application proof.','A source dyadic anchor needs target visibility-kernel containment and completed prior-mask contact separately.','No automatic approval or transfer from static positive-area overlap; candidate cubic remains original C.','Author reveal clock is separate from publisher CSS microclock and catalog9.'],'sourceChanged':False,'policyAdopted':False,'nativeApproval':False,'runtimeApplied':False,'engine':0,'server':0,'verifierSHA256':sha(Path(__file__).read_bytes())}
print(json.dumps(encoded(out),ensure_ascii=False,indent=2))
