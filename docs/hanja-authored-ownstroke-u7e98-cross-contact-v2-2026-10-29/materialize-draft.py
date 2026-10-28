import copy,hashlib,json,importlib.util,sys
from fractions import Fraction as F
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
BASE='docs/hanja-authored-ownstroke-u7e98-hook-separated-2026-10-29/fixtures-draft.json'
BASE_SHA='a8475b569494c09daa311fed1c7585e211cb364d75758c7032ce022b65ded57b'
GEO='docs/hanja-authored-ownstroke-u67d6-point-separated-2026-10-29/materialize-draft.py'
GEO_SHA='088c971473b950d1bf926a41bd15afa77861246e5da617f9813ad632dbff2cce'
MATRICES={13:(F(387,622),F(110779,3110),F(1),F(0)),16:(F(2239,2799),F(392266,13995),F(220,343),F(2583,343))}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def build():
 assert sha(ROOT/BASE)==BASE_SHA
 s=json.loads((ROOT/BASE).read_bytes());c=copy.deepcopy(s)
 c.update(root='local_u7e98_cross_contact_v2_20261029',changedRawZeroBased=[12,15,20],matrixExact=None,wholeAffineMatricesExact={str(n):[str(a),'0','0',str(d),str(b),str(f)]for n,(a,b,d,f)in MATRICES.items()},priorRaw21CorrectionExact=True,nativeApproval=False,runtimeApplied=False)
 for n,(a,b,d,f)in MATRICES.items():
  def tx(x):return float(a*F(str(x))+b)
  def ty(y):return float(d*F(str(y))+f)
  for p in c['groups'][n-1]['polygons']:
   for q in p:q['x']=tx(q['x']);q['y']=ty(q['y'])
  for t in c['trace'][n-1]:
   for i in range(0,len(t['args'])-2,2):t['args'][i]=tx(t['args'][i]);t['args'][i+1]=ty(t['args'][i+1])
   for p in t['polygons']:
    for q in p:q['x']=tx(q['x']);q['y']=ty(q['y'])
 return c
def verify():
 c=json.loads((HERE/'fixtures-draft.json').read_bytes());assert c==build()and sha(ROOT/GEO)==GEO_SHA
 s=json.loads((ROOT/BASE).read_bytes());sp=importlib.util.spec_from_file_location('fixed_public_contact',ROOT/GEO);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m)
 ps=[[m.P(p)for p in g['polygons']]for g in s['groups']];new=list(ps);rows=[]
 def box(p):return(min(x for x,y in p),min(y for x,y in p),max(x for x,y in p),max(y for x,y in p))
 def contact(p,q):
  a,b=box(p),box(q)
  return not(a[2]<b[0]or b[2]<a[0]or a[3]<b[1]or b[3]<a[1])and m.contact(p,q)
 for n,(a,b,d,f)in MATRICES.items():new[n-1]=[[(a*x+b,d*y+f)for x,y in p]for p in ps[n-1]]
 for i in range(30):
  assert c['groups'][i]['raw']==s['groups'][i]['raw']
  if i not in[12,15]:assert c['groups'][i]==s['groups'][i]and c['trace'][i]==s['trace'][i]
 for n,(a,b,d,f)in MATRICES.items():
  assert a>0 and d>0
  x=F(str(s['trace'][n-1][0]['args'][0]));assert a*x+b==x
  for old,newcall in zip(s['trace'][n-1],c['trace'][n-1]):
   assert old['kind']==newcall['kind']and old['args'][-2:]==newcall['args'][-2:]
  graph=[]
  for j in range(30):
   if j==n-1 or not ps[j]:continue
   old=any(contact(p,q)for p in ps[n-1]for q in ps[j]);after=any(contact(p,q)for p in new[n-1]for q in new[j])
   if old or after:graph.append([j+1,old,after])
  rows.append({'raw':n,'contacts':graph,'new':[x[0]for x in graph if not x[1]and x[2]],'lost':[x[0]for x in graph if x[1]and not x[2]]})
 assert rows==[{'raw':13,'contacts':[[5,True,False],[11,True,True],[12,True,True]],'new':[],'lost':[5]},{'raw':16,'contacts':[[12,True,False],[17,True,True]],'new':[],'lost':[12]}]
 assert min(x for p in new[12]for x,y in p)-max(x for p in ps[4]for x,y in p)==1
 assert min(x for p in new[15]for x,y in p)-max(x for p in ps[11]for x,y in p)==1
 assert max(y for p in new[15]for x,y in p)==43 and min(y for p in ps[18]for x,y in p)==44
 assert len(c['groups'])==30 and sum(len(t)for t in c['trace'])==31 and sum(len(g['polygons'])for g in c['groups'])==62
 return {'glyph':'纘','matrices':c['wholeAffineMatricesExact'],'sourceCounts':[30,31,62],'contactChanges':rows,'strictXGaps':['1','1'],'other28V1RawAndTraceExact':True,'raw21FixUnchanged':True,'newOwnLowerH19Contact':False,'raw16OwnLowerH19YGap':'1','raw16YAnchor':'21','authorFontHeightNativeReviewRequired':True,'nativeApproval':False,'runtimeApplied':False,'HTTP':0,'server':0}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
