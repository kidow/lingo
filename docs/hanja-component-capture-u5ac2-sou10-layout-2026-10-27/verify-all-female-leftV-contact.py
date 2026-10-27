from pathlib import Path
from fractions import Fraction as F
import json,hashlib,ast
R=Path(__file__).resolve().parents[2];D=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
FP=D/'engine-whole-lingo-u5ac2-sou10-layout-v1.json';CP=D/'capture.json';prior=D/'femaleH-leftV-contact-proof.json'
assert sha(FP)=='d43fa364bcb57fd802611d36a255340366c4ada995199f510a1c9bac3bcecf87';assert sha(CP)=='f618a96eddfa4efa9457003529e3287fae3c22304efd78b783f63da8ff097c3f';assert sha(prior)=='a8e1cc74e73decb46d63b02f5caba469d22747b402c620157633648edeeefab0'
data=json.loads(FP.read_text());cap=json.loads(CP.read_text());old=json.loads(prior.read_text())
helper=R/'docs/hanja-component-capture-u995b-2026-10-27/verify-compound-contact-facts.py';assert sha(helper)=='bb3f78ad4a38857a699a0c3a48b42c0e241ee1a7b5ce51dbb3aa5e063a47d9d5'
needed={'cross','area','edges','on','meet','poly','triangles','half_clip','intersect','contact'};tree=ast.parse(helper.read_text());nodes=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in needed];assert {n.name for n in nodes}==needed;exec(compile(ast.Module(body=nodes,type_ignores=[]),str(helper),'exec'),globals())
def bb(points):
 q=[(F(str(p['x'])),F(str(p['y'])))for p in points];return [min(x for x,y in q),max(x for x,y in q),min(y for x,y in q),max(y for x,y in q)]
assert len(data['groups'][5]['polygons'])==1;target=poly(data['groups'][5]['polygons'][0]);results=[]
for raw in [1,2,3,4]:
 binding=cap['sourceBindings'][raw-1];actual=data['groups'][raw-1]['raw'];calls=data['trace'][raw-1];assert binding['child']=='u5973-01'and binding['rowOneBased']==raw and binding['rawOneBased']==raw
 assert len(calls)==1 and calls[0]['kind']==('cdDrawLine'if actual[0]==1 else'cdDrawCurve');limit={1:7,2:9}[actual[0]]
 assert actual[3:limit]==binding['sourceParserRaw'][3:limit]==calls[0]['args'][:-2] and actual[1:3]==calls[0]['args'][-2:]
 assert data['groups'][raw-1]['polygons']==calls[0]['polygons']
 pairs=[]
 for index,points in enumerate(data['groups'][raw-1]['polygons']):
  if raw==4:
   ar=F(old['allPolygonPairs'][index]['intersectionArea']);reused=True
  else:ar=contact(poly(points),target);reused=False
  pairs.append({'femalePolygonOneBased':index+1,'bounds':[str(v)for v in bb(points)],'intersectionAreaWithRaw6P1':str(ar),'positiveArea':ar>0,'reusedPriorExactRaw4Result':reused})
 results.append({'rawOneBased':raw,'originalRow':binding['originalRow'],'sourceParserRaw':binding['sourceParserRaw'],'actualAdjustedFlags':actual[:3],'actualCallKind':calls[0]['kind'],'actualArgs':calls[0]['args'],'originalChildAndCallPBindingExact':True,'polygonPairs':pairs})
positive=[{'femaleRawOneBased':r['rawOneBased'],'femalePolygonOneBased':p['femalePolygonOneBased'],'rightRawOneBased':6,'rightPolygonOneBased':1,'area':p['intersectionAreaWithRaw6P1']}for r in results for p in r['polygonPairs']if p['positiveArea']]
output={'schema':'hanja-authored-sao-all-female-leftV-contact/v1','glyph':'嫂','date':'2026-10-27','inputs':{'full5SHA256':sha(FP),'captureSHA256':sha(CP),'priorRaw4ProofSHA256':sha(prior),'verifierSHA256':sha(Path(__file__)),'exactFunctionsSHA256':sha(helper)},'scope':'All four original female raw rows/P against the one original right-leftV raw6 P; no female4-to3 formal grouping assumption.','coordinateSystem':'Original source200 units; off0 original captured polygons, exact Fraction ear partition/triangle clipping.','rightRawOneBased':6,'rightOriginalRow':cap['sourceBindings'][5]['originalRow'],'rightFilledBounds':[str(v)for v in bb(data['groups'][5]['polygons'][0])],'femaleRows':results,'positivePairs':positive,'allFemalePStrictGap':False if positive else None,'raw4IntersectionReexecuted':False,'newContactRawGroups':[1,2,3],'allSourcePChanged':False,'engineRuns':0,'privatePublisherSVGRead':False,'formalFemaleGroupingApproved':False,'wholeFitApproved':False,'playback13Approved':False,'nativeApproval':False,'runtimeApplied':False,'proposal':{'authoredRightParent':'99:0:0:61:0:198:200:u53df','sameWidth137AndY0_200':True,'sourcePrimitivesUnchanged':True,'freshWholeRequired':True,'priorPTranslationGuarantee':False,'contactRemedyApproved':False}if positive else None}
print(json.dumps(output,ensure_ascii=False,indent=2))
