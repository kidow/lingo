from pathlib import Path
import hashlib,json
from decimal import Decimal
from fractions import Fraction
ROOT=Path('/Users/kidow/Documents/dev/kidow/lingo')
FULL='docs/hanja-actual-engine-capture-u66d9-dkw-2026-10-27/engine-whole-dkw-14220.json'
CAP='docs/hanja-actual-engine-capture-u66d9-dkw-2026-10-27/capture.json'
SOURCE='docs/hanja-actual-engine-capture-u66d9-dkw-2026-10-27/sources.json'
EXPECTED={FULL:'738ee1e1e05ae1f553a654a36fccd865694624d9a039c9d4820cddbbb438095a',CAP:'1dd3bba13e33a0a7fe985d88fe2eb324f5d6c11d9672ce846ba517bd46135bcd',SOURCE:'0c038d0c885ea4f0e74d484507b02b92901a1529fa1189c55ec9f1781c210afc'}
def digest(b):return hashlib.sha256(b).hexdigest()
for path,pin in EXPECTED.items():assert digest((ROOT/path).read_bytes())==pin
proof=json.loads((ROOT/FULL).read_text(),parse_float=Decimal)
source=json.loads((ROOT/SOURCE).read_text())
cap=json.loads((ROOT/CAP).read_text())
assert source['root']=='dkw-14220' and source['rootVersion']=='3'
assert cap['actual']['actualProviderRoot']=='dkw-14220' and cap['actual']['makeGlyphCalls']==1
assert cap['actual']['diagnostics']['genericGuardPassed'] is True
assert len(proof['groups'])==len(proof['trace'])==21
assert sum(map(len,proof['trace']))==21 and sum(len(g['polygons']) for g in proof['groups'])==31
assert [g['polygons'] for g in proof['groups']]==[[p for c in row for p in c['polygons']] for row in proof['trace']]
expanded=[]
def expand(key,chain=()):
 assert key not in [s[0] for s in chain]
 for i,row in enumerate(source['records'][key]['data'].split('$'),1):
  a=row.split(':');path=chain+((key,i,row),)
  if a[0]=='99':expand(a[7],path)
  else:expanded.append(path)
expand(source['root']);assert len(expanded)==21
roles={'leftRightVertical':(2,'u66f0-01',3,'1:22:23:68:38:68:150'),'middleLongH':(13,'ufa5b-02',3,'1:0:0:72:78:184:78'),'lowerDayTopH':(16,'u65e5-04',2,'1:2:2:44:112:156:112'),'separateDot':(20,'ufa5b-02',6,'2:7:8:135:83:146:89:152:102')}
selected={}
def q(v):return Fraction(v)
def rational(v):return str(v.numerator)+'/'+str(v.denominator)
for role,(i,leaf,row,value) in roles.items():
 assert expanded[i][-1]==(leaf,row,value)
 group=proof['groups'][i];vertices=[v for p in group['polygons'] for v in p]
 assert vertices and all(v['off']==0 for v in vertices)
 bounds={axis:[min(q(v[axis]) for v in vertices),max(q(v[axis]) for v in vertices)] for axis in ['x','y']}
 selected[role]={'rawOneBased':i+1,'originalExpansionPath':[{'reference':k,'rowOneBased':r,'originalRow':d} for k,r,d in expanded[i]],'actualRaw':group['raw'],'actualCalls':[{'kind':c['kind'],'args':c['args']} for c in proof['trace'][i]],'polygonCount':len(group['polygons']),'allOriginalPolygonVerticesOff0':True,'boundsRational':{a:[rational(v) for v in b] for a,b in bounds.items()},'_bounds':bounds}
xgap=selected['middleLongH']['_bounds']['x'][0]-selected['leftRightVertical']['_bounds']['x'][1]
ygap=selected['lowerDayTopH']['_bounds']['y'][0]-selected['separateDot']['_bounds']['y'][1]
assert xgap==Fraction(16,5) and ygap==Fraction(7,5) and min(xgap,ygap)>0
for s in selected.values():del s['_bounds']
result={'schemaVersion':1,'glyph':'曙','root':'dkw-14220','rootVersion':'3','inputs':[{'path':p,'SHA256':h} for p,h in EXPECTED.items()],'verifier':{'path':'docs/hanja-actual-engine-capture-u66d9-dkw-2026-10-27/verify-contact-gaps.py','SHA256':digest(Path(__file__).read_bytes())},'arithmetic':'Exact rational arithmetic on serialized original actual-engine P coordinates. All relevant polygon vertices are off0 straight-line vertices; their entire filled polygons lie within these axis bounds. No pixel/AA claim.','sourceRoles':selected,'conditions':[{'requiredContact':'middleLongH to leftRightVertical','separatingAxis':'x','leftVerticalMax':'337/5','middleHorizontalMin':'353/5','strictPositiveGap':rational(xgap),'gapDecimal':'3.2','filledSetsDisjoint':True,'requiredContactSatisfied':False},{'requiredContact':'separateDot to lowerDayTopH','separatingAxis':'y','dotMax':'626/5','lowerDayHorizontalMin':'633/5','strictPositiveGap':rational(ygap),'gapDecimal':'1.4','filledSetsDisjoint':True,'requiredContactSatisfied':False}],'decision':'HOLD-new-original-dkw-filled-contact-conditions-fail','priorKGapOrPolygonsTransferred':False,'allGeometryFromThisFreshWhole':True,'nativeWholeReviewRecommended':False,'wholeShapeReviewed':False,'orderApproved':False,'directionApproved':False,'contactApproved':False,'componentReuseApproved':False,'runtimeApplied':False,'newEngineExecutionsByVerifier':0,'newAPIRequests':0,'sourceRowsChanged':False,'polygonsEdited':False}
print(json.dumps(result,ensure_ascii=False,indent=2,default=lambda v:str(v) if isinstance(v,Decimal) else v))
