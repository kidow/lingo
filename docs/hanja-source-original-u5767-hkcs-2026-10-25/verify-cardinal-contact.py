from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib,re
R=Path('/Users/kidow/Documents/dev/kidow/lingo')
fixture='docs/hanja-source-original-u5767-hkcs-2026-10-25/fixtures.json'
f=json.loads((R/fixture).read_bytes())['hkcs_m5767']
old='docs/hanja-source-original-u846f-hkcs-2026-10-25/initial-feasibility.py'
raw=(R/old).read_bytes();assert hashlib.sha256(raw).hexdigest()=='91670b2c888fd7cd691e4a19c9e43a498b0b964695ba2a7c975ab46bb958926e'
tree=ast.parse(raw);N={};exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,(ast.Import,ast.ImportFrom,ast.FunctionDef))],type_ignores=[]),old,'exec'),N)
polys,ears,cross=N['polys'],N['ears'],N['cross']
prior=f['strokes'][6][0];own=f['strokes'][6][1]
assert prior['direction']=='right' and own['direction']=='down' and 'revealPath'not in own
assert prior['bounds']==[53,48,82,50] and own['bounds']==[79,45.5,87.5,92]
x,y,delta=F(80),F(49),F(1,200)
square=[(x-delta,y-delta),(x+delta,y-delta),(x+delta,y+delta),(x-delta,y+delta)]
def contains(p,q):
 signed=N['area'](p);v=[cross(p[i],p[(i+1)%len(p)],q)for i in range(len(p))]
 return all(t>0 for t in v)if signed>0 else all(t<0 for t in v)
assert all(contains(polys(prior['outline'])[0],q)for q in square)
witness=None
for pi,p in enumerate(polys(own['outline'])):
 for ti,t in enumerate(ears(p)):
  margin=min(cross(t[i],t[(i+1)%3],q)for i in range(3)for q in square)
  if margin>0:witness={'polygon':pi,'triangle':ti,'strictCrossMargin':str(margin)};break
 if witness:break
assert witness
# Compare only the previously verified head and predecessor coverage; the new
# shaft/extent still has its own seven-mask slab facts in the independent proof.
old_module='lib/hanja-stroke-cardinal-contact-u5ebe.ts';template=(R/old_module).read_bytes();target=json.loads(re.search(r'^const TARGETS=freeze\((.+) as const\)$',template.decode(),re.M)[1])[0]
oldhead=polys(target['segment']['outline'])[1];newhead=polys(own['outline'])[1]
assert [[a+F(9,10),b+17]for a,b in oldhead]==[[a,b]for a,b in newhead]
origin,negative,positive=F(49),F(7,2),F(43)
assert origin-negative==F(str(own['bounds'][1])) and origin+positive==F(str(own['bounds'][3]))
proof={'schema':'hanja-source-cardinal-contact/v1','date':'2026-10-25','glyph':'坧','root':'hkcs_m5767','pen':7,'mask':2,'fixture':fixture,'fixtureSHA256':hashlib.sha256((R/fixture).read_bytes()).hexdigest(),'priorSegmentSHA256':hashlib.sha256(json.dumps(prior,separators=(',',':')).encode()).hexdigest(),'ownSegmentSHA256':hashlib.sha256(json.dumps(own,separators=(',',':')).encode()).hexdigest(),'contactSquare':{'center':[str(x),str(y)],'halfSide':str(delta),'square':[[str(a),str(b)]for a,b in square],'strictlyInsidePriorH':True,'ownEar':witness},'band':{'axis':'y','origin':str(origin),'negativeExtent':str(negative),'positiveExtent':str(positive),'emptyAt0':True,'fullBoundsAt1':True,'positiveSourceContactForPositiveP':'For p>0 choose epsilon=min(1/200,(7/2)*p/2,43*p/2); its square lies in the fixed common-interior square and the original-P band.','allTimeRasterClaimed':False,'actualOpaquePriorStillRequired':True},'reuseConditions':{'priorModule':old_module,'priorModuleSHA256':hashlib.sha256(template).hexdigest(),'headTranslation':['9/10','17'],'originalHeadExactlyTranslated':True,'newShaftSlabFactsAreIndependent':True},'sourcePGuideWidthWeightChanged':False,'newGuideOrBridge':False,'oldTargetExecution':0,'engine':0,'projection':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(proof,ensure_ascii=False,separators=(',',':')))
