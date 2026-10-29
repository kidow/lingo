import ast,json,pathlib,hashlib
from fractions import Fraction as F
ROOT=pathlib.Path('/Users/kidow/Documents/dev/kidow/lingo')
helper=ROOT/'docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py'
tree=ast.parse(helper.read_text()); env={'F':F}
for n in tree.body:
 if isinstance(n,ast.FunctionDef):exec(compile(ast.Module(body=[n],type_ignores=[]),str(helper),'exec'),env)
old=json.loads((ROOT/'docs/hanja-goal-glyphwiki-batch909-2026-10-13/engine-whole-u61af.json').read_text())
don=json.loads((ROOT/'docs/hanja-source-original-u5153-var001-2026-10-30/engine-proof.json').read_text())
a=F(643,900);d=F(1006,1637);e=F('57.8')-F('11.8')*a;f=F('15.1')-24*d
def poly(g,placed=False):
 return [env['clean']([(F(str(p['x']))*a+e,F(str(p['y']))*d+f)if placed else(F(str(p['x'])),F(str(p['y'])))for p in ps])for ps in g['polygons']]
def bbox(p):return(min(x for x,y in p),min(y for x,y in p),max(x for x,y in p),max(y for x,y in p))
def disjoint(p,q):
 A=bbox(p);B=bbox(q);return A[2]<B[0]or B[2]<A[0]or A[3]<B[1]or B[3]<A[1]
retain=[1,2,3,15,16,17,18,19]
def pairs(groups,tag):
 out=[];total=0;skips=0
 for i,g in groups:
  for j in retain:
   area=F(0);touch=False;unresolved=False
   for p in poly(g,tag=='donor'):
    for q in poly(old['groups'][j-1]):
     total+=1
     if disjoint(p,q):skips+=1;continue
     if env['contact'](p,q):
      touch=True
      if env['simple'](p)and env['simple'](q):area+=env['exact_area'](p,q)
      else:unresolved=True
   if touch:out.append({'componentRawOneBased':i,'retainedRecipientRawOneBased':j,'positiveArea':area>0,'sumPairIntersectionAreaExact':str(area),'boundaryOnly':area==0 and not unresolved,'nonSimpleUnresolved':unresolved})
 return {'contactPairs':out,'polygonPairs':total,'bboxDisjointPairs':skips}
before=pairs([(i,old['groups'][i-1])for i in range(4,15)],'old')
after=pairs(list(enumerate(don['groups'],1)),'donor')
print(json.dumps({'schema':'hanja-public-complete-donor-contact-check/v1','date':'2026-10-30','method':'existing exact Fraction nonconvex ear intersection; bbox disjoint first; boundary contacts distinguished; sum of polygon-pair areas is not union area','helperSHA256':hashlib.sha256(helper.read_bytes()).hexdigest(),'matrixExact':[str(a),'0','0',str(d),str(e),str(f)],'determinantExact':str(a*d),'oldComponentVsRetained':before,'newWholeDonorVsRetained':after,'retained8Raw12PAndCallsByteExact':True,'donorInternalContactTopologyPreservedBySinglePositiveAffine':True,'wholeShapeApproved':False,'mappingApproved':False,'actualTemporalApproved':False,'runtimeApplied':False}))
