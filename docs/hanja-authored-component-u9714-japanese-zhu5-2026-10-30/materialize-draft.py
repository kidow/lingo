import ast,copy,hashlib,json
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
HERE=Path(__file__).resolve().parent
SOURCE="docs/hanja-goal-glyphwiki-batch885-2026-10-13/engine-proof.json"
DONOR="docs/hanja-actual-engine-capture-u59b5-g-2026-10-25/engine-whole-u59b5-g.json"
HELPER='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py'
def load(p):return json.loads((ROOT/p).read_bytes())
def sha(p):return hashlib.sha256((ROOT/p).read_bytes()).hexdigest()
def build():
 recipe=json.loads((HERE/'recipe.pending.json').read_bytes());original=load(SOURCE);donor=load(DONOR)
 assert sha(SOURCE)==recipe['recipient']['SHA256'] and sha(DONOR)==recipe['donor']['SHA256']
 assert len(original['groups'])==18 and len(original['trace'])==18 and sum(map(len,original['trace']))==18
 assert len(donor['groups'])==9 and sum(map(len,donor['trace']))==9
 assert [c['kind'] for row in donor['trace'][4:9] for c in row]==['cdDrawCurve','cdDrawLine','cdDrawLine','cdDrawLine','cdDrawLine']
 a,b,c,d,e,f=map(F,recipe['matrixExact200']);assert a*d-b*c>0 and b==c==0
 def point(p):return {'x':float(a*F(str(p['x']))+c*F(str(p['y']))+e),'y':float(b*F(str(p['x']))+d*F(str(p['y']))+f),'off':p['off']}
 def xy(args,first,last):
  out=copy.deepcopy(args)
  for k in range(first,last,2):
   x,y=F(str(args[k])),F(str(args[k+1]));out[k]=float(a*x+c*y+e);out[k+1]=float(b*x+d*y+f)
  return out
 groups=copy.deepcopy(original['groups'][:13]);trace=copy.deepcopy(original['trace'][:13])
 for gi in range(4,9):
  group=copy.deepcopy(donor['groups'][gi]);end=7 if group['raw'][0]==1 else 9;group['raw']=xy(group['raw'],3,end);group['polygons']=[[point(p)for p in poly]for poly in group['polygons']];groups.append(group)
  row=[]
  for call in donor['trace'][gi]:
   cc=copy.deepcopy(call);end=4 if cc['kind']=='cdDrawLine'else 6;cc['args']=xy(cc['args'],0,end);cc['polygons']=[[point(p)for p in poly]for poly in cc['polygons']];row.append(cc)
  trace.append(row)
 assert groups[:13]==original['groups'][:13] and trace[:13]==original['trace'][:13]
 assert [g['polygons']for g in groups]==[[p for cc in row for p in cc['polygons']]for row in trace]
 return {'schema':'hanja-locally-authored-public-component-payload/v1','glyph':'霔','locallyAuthored':True,'mixedParts':True,'isOriginalEngineCapture':False,'originalWhole':False,'groups':groups,'trace':trace,'defaults':copy.deepcopy(original['defaults']),'recipe':'recipe.pending.json','approval':{'whole':False,'mapping':False,'temporal':False,'runtime':False}}
def verify(candidate):
 source=load(SOURCE);tree=ast.parse((ROOT/HELPER).read_text());ns={'F':F};exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,(ast.Import,ast.ImportFrom,ast.FunctionDef))],type_ignores=[]),HELPER,'exec'),ns)
 def poly(p):return [(F(str(v['x'])),F(str(v['y'])))for v in p]
 def pair(g,h):
  total=F(0);touch=False;unknown=0
  for pp in g['polygons']:
   for qq in h['polygons']:
    p,q=poly(pp),poly(qq)
    if max(v[0]for v in p)<min(v[0]for v in q)or max(v[0]for v in q)<min(v[0]for v in p)or max(v[1]for v in p)<min(v[1]for v in q)or max(v[1]for v in q)<min(v[1]for v in p):continue
    p,q=ns['clean'](p),ns['clean'](q)
    if not ns['simple'](p)or not ns['simple'](q):unknown+=1;continue
    area=ns['exact_area'](p,q);total+=area;touch=touch or bool(ns['contact'](p,q))
  return {'positiveArea':str(total),'contact':touch,'unresolvedPairs':unknown}
 cross=[]
 for i in range(13):
  for j in range(13,18):
   before=pair(source['groups'][i],source['groups'][j]);after=pair(candidate['groups'][i],candidate['groups'][j])
   if before['contact']or after['contact']or before['unresolvedPairs']or after['unresolvedPairs']:cross.append({'retainedRaw':i+1,'replacementSlot':j+1,'old':before,'candidate':after})
 return {'schema':'hanja-public-component-contact-feasibility/v1','glyph':'霔','sourceRaw':18,'sourceCalls':18,'sourceP':33,'candidateRaw':len(candidate['groups']),'candidateCalls':sum(map(len,candidate['trace'])),'candidateP':sum(len(g['polygons'])for g in candidate['groups']),'recipientOther13RawExact':candidate['groups'][:13]==source['groups'][:13]and candidate['trace'][:13]==source['trace'][:13],'donorWholeComponentRaw':[5,6,7,8,9],'matrixExact200':['113/107','0','0','113/200','-1093/107','80'],'determinant':'12769/21400','matrixInverseExists':True,'privateFit':False,'newP':0,'newBridge':0,'newEngine':0,'crossComponentPairCount':65,'crossContacts':cross,'rain3to4':pair(candidate['groups'][2],candidate['groups'][3]),'water12to13':pair(candidate['groups'][11],candidate['groups'][12]),'sourceMin17Limit':'Endpoint-only original graph is not approval of water grouping or a lower bound on all explicitly authored display policies','nativeApproval':False,'runtimeApplied':False}

