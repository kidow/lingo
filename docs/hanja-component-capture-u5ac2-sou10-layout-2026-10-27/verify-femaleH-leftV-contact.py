from pathlib import Path
from fractions import Fraction as F
import json,hashlib,ast
R=Path(__file__).resolve().parents[2];D=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
FP=D/'engine-whole-lingo-u5ac2-sou10-layout-v1.json';CP=D/'capture.json'
assert sha(FP)=='d43fa364bcb57fd802611d36a255340366c4ada995199f510a1c9bac3bcecf87'
assert sha(CP)=='f618a96eddfa4efa9457003529e3287fae3c22304efd78b783f63da8ff097c3f'
data=json.loads(FP.read_text());cap=json.loads(CP.read_text())
helper=R/'docs/hanja-component-capture-u995b-2026-10-27/verify-compound-contact-facts.py'
assert sha(helper)=='bb3f78ad4a38857a699a0c3a48b42c0e241ee1a7b5ce51dbb3aa5e063a47d9d5'
needed={'cross','area','edges','on','meet','poly','triangles','half_clip','intersect','contact'}
tree=ast.parse(helper.read_text());nodes=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in needed];assert {n.name for n in nodes}==needed
exec(compile(ast.Module(body=nodes,type_ignores=[]),str(helper),'exec'),globals())
assert len(data['groups'])==16 and cap['raw']==16 and cap['makeGlyphCalls']==1
bindings=[]
for raw,child,row,literal in [(4,'u5973-01',4,'1:0:2:15:61:79:61'),(6,'u53df',2,'1:12:13:39:39:39:101')]:
 b=cap['sourceBindings'][raw-1];assert b['rawOneBased']==raw and b['child']==child and b['rowOneBased']==row and b['originalRow']==literal
 actual=data['groups'][raw-1]['raw'];call=data['trace'][raw-1];assert len(call)==1 and call[0]['kind']=='cdDrawLine'
 assert actual[:2]==b['sourceParserRaw'][:2] and actual[2]%100==b['sourceParserRaw'][2]%100
 assert actual[3:7]==b['sourceParserRaw'][3:7]==call[0]['args'][:4] and actual[1:3]==call[0]['args'][-2:]
 assert data['groups'][raw-1]['polygons']==call[0]['polygons']
 bindings.append({'rawOneBased':raw,'child':child,'sourceRowOneBased':row,'literal':literal,'parentRect':b['parentRect'],'sourceParserRaw':b['sourceParserRaw'],'actualAdjustedRawFlags':actual[:3],'actualCall':{'kind':call[0]['kind'],'args':call[0]['args']},'rawCallPBindingExact':True})
polys=[[poly(p)for p in data['groups'][raw-1]['polygons']]for raw in [4,6]]
pairs=[{'femalePolygonOneBased':i+1,'leftVPolygonOneBased':j+1,'intersectionArea':str(ar),'positiveArea':ar>0}for i,a in enumerate(polys[0])for j,b in enumerate(polys[1])for ar in[contact(a,b)]]
positive=any(x['positiveArea']for x in pairs)
def bb(q):return [min(p[0]for p in q),max(p[0]for p in q),min(p[1]for p in q),max(p[1]for p in q)]
boxes=[[bb(p)for p in group]for group in polys]
strict_x_gap=min(b[0]-a[1]for a in boxes[0]for b in boxes[1]);assert strict_x_gap==F(21,2)
output={'schema':'hanja-authored-sao-exact-femaleH-leftV-contact/v1','glyph':'嫂','date':'2026-10-27','inputs':{'full5SHA256':sha(FP),'captureSHA256':sha(CP),'verifierSHA256':sha(Path(__file__)),'reusedExactFunctionsSHA256':sha(helper)},'originalCoordinates':'Captured original200-unit source P; decimal literals converted exactly to Fraction, no approximate curve replacement.','rawBinding':bindings,'polygonCounts':[len(p)for p in polys],'allPolygonPairs':pairs,'positiveFilledIntersection':positive,'strictGap':strict_x_gap>0,'strictXGap':str(strict_x_gap),'filledPolygonBounds':[[[str(v)for v in b]for b in group]for group in boxes],'method':'Original off0 simple positive polygon validation; exact ear triangulation and exact triangle clipping. Only selected new raw4/raw6 are evaluated; old glyph proof bodies are not executed.','nativeObservationProvidedByROOT':'Fresh whole has femaleH righthead apparently touching right臼leftV; this record tests only public captured filled P.','v2Proposal':{'onlyIfPositive':True,'proposedRightParentRow':'99:0:0:61:0:198:200:u53df','authoredHorizontalShift':3,'sameParentWidth137':True,'parentYUnchanged':[0,200],'primitiveRowsFlagsCoordinatesUnchanged':True,'oldPTranslationGuarantee':False,'freshWholeRequired':True,'globalAdjustmentsMayChangeP':True,'shapeOrGapApproval':False}if positive else None,'PChanged':False,'engineRuns':0,'privatePublisherSVGRead':False,'wholeFitApproved':False,'playback13Approved':False,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(output,ensure_ascii=False,indent=2))
