#!/usr/bin/env python3
"""Independent public-P contact audit; no engine, renderer, private media, or writes."""
import argparse,ast,copy,hashlib,json,math,re
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
SOURCE='docs/hanja-goal-glyphwiki-batch909-2026-10-13/engine-whole-u61af.json'
SOURCE_SHA='60313eb6e3c2a2a7344a803535ea87439311ae9e9171bae6f6a1ad2acae6f11c'
HELPER='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py'
HELPER_SHA='945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea'
MATRICES={6:(F(40,49),F(1035,49)),12:(F(37,46),F(981,46))}
def need(v,m):
 if not v:raise ValueError(m)
def sha(b):return hashlib.sha256(b).hexdigest()
def load(p,h):
 b=p.read_bytes();need(sha(b)==h,'fixed input hash '+str(p));return json.loads(b)
def canonical(v):return json.dumps(v,separators=(',',':'),ensure_ascii=False)
def y(value,raw):
 num,shift,den=(40,1035,49)if raw==6 else(37,981,46);return(num*float(value)+shift)/den
def expected_candidate(source):
 out=copy.deepcopy(source)
 for raw in MATRICES:
  g=out['groups'][raw-1];g['raw']=[y(v,raw)if i>=3 and i%2==0 and v is not None else v for i,v in enumerate(g['raw'])]
  for poly in g['polygons']:
   for p in poly:p['y']=y(p['y'],raw)
  for c in out['trace'][raw-1]:
   c['args']=[y(v,raw)if i<len(c['args'])-2 and i%2==1 else v for i,v in enumerate(c['args'])]
   for poly in c['polygons']:
    for p in poly:p['y']=y(p['y'],raw)
 return out

def arithmetic_certificate(original,candidate):
 rows=[]
 for raw,(d,f)in MATRICES.items():
  num,shift,den=(40,1035,49)if raw==6 else(37,981,46)
  positions=[]
  positions += [('raw/'+str(i),v,candidate['groups'][raw-1]['raw'][i])for i,v in enumerate(original['groups'][raw-1]['raw'])if i>=3 and i%2==0 and v is not None]
  for pi,p in enumerate(original['groups'][raw-1]['polygons']):
   positions += [('P/'+str(pi)+'/'+str(vi),v['y'],candidate['groups'][raw-1]['polygons'][pi][vi]['y'])for vi,v in enumerate(p)]
  for ci,c in enumerate(original['trace'][raw-1]):
   positions += [('call/'+str(ci)+'/arg/'+str(i),v,candidate['trace'][raw-1][ci]['args'][i])for i,v in enumerate(c['args'])if i<len(c['args'])-2 and i%2==1]
   for pi,p in enumerate(c['polygons']):
    positions += [('call/'+str(ci)+'/P/'+str(pi)+'/'+str(vi),v['y'],candidate['trace'][raw-1][ci]['polygons'][pi][vi]['y'])for vi,v in enumerate(p)]
  diffs=[];max_error=F(0);max_bound=F(0)
  for path,v,stored in positions:
   vf=float(v);mul=num*vf;add=mul+shift;js=add/den;exact=F(str(v))*d+f
   need(float(stored).hex()==js.hex(),'exact declared JS coordinate '+path)
   input_error=abs(F.from_float(vf)-F(str(v)));mul_error=abs(F.from_float(mul)-num*F.from_float(vf));add_error=abs(F.from_float(add)-(F.from_float(mul)+shift));div_error=abs(F.from_float(js)-F.from_float(add)/den)
   need(mul_error<=F.from_float(math.ulp(mul))/2 and add_error<=F.from_float(math.ulp(add))/2 and div_error<=F.from_float(math.ulp(js))/2,'each finite round-to-nearest operation bounded')
   bound=(num*input_error+mul_error+add_error)/den+div_error;error=abs(F.from_float(js)-exact);need(error<=bound,'propagated exact arithmetic bound')
   max_error=max(max_error,error);max_bound=max(max_bound,bound)
   if js!=float(exact):diffs.append({'field':path,'declaredJS':js,'singleRationalRounding':float(exact),'differenceULP':abs(js-float(exact))/math.ulp(js),'absoluteErrorToExactRational':str(error),'perCoordinateErrorBoundExact':str(bound)})
  rows.append({'rawOneBased':raw,'transformedCoordinatesChecked':len(positions),'allStoredNumbersBitEqualDeclaredJS':True,'singleRationalRoundingDifferences':diffs,'maxAbsoluteErrorToExactRational':str(max_error),'maxPropagatedErrorBoundExact':str(max_bound),'maxAbsoluteErrorApprox':float(max_error),'maxBoundApprox':float(max_bound)})
 return {'declaredExpression':'(num*sourceY+shift)/den; binary64 multiply, add, divide in that order','sourceLiteralModel':'Original JSON decimal rational compared separately with its binary64 parse','sameExactAffineDefinition':True,'singleRationalFloatConversionClaim':False,'candidateAcceptanceTolerance':None,'perCoordinateProof':'Stored value bit-equals declared operation order; every multiplication/addition/division error <=its own halfULP and propagated against exact rational map. No blanket epsilon.','units':rows}

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--fixture-sha',required=True);ap.add_argument('--recipe-sha',required=True);args=ap.parse_args()
 need(all(re.fullmatch('[a-f0-9]{64}',x)for x in[args.fixture_sha,args.recipe_sha]),'explicit SHA256 required')
 fixture_path=HERE/'fixtures-authored-whole.json';recipe_path=HERE/'recipe.json'
 original=load(ROOT/SOURCE,SOURCE_SHA);candidate=load(fixture_path,args.fixture_sha);recipe=load(recipe_path,args.recipe_sha)
 for obj in[original,candidate]:
  need(set(obj)=={'groups','trace','defaults'},'original3 fields, no fabricated engine header')
  need((len(obj['groups']),len(obj['trace']),sum(map(len,obj['trace'])),sum(len(g['polygons'])for g in obj['groups']))==(19,19,21,41),'exact19/21/41 envelope')
  need(all(g['polygons']==[p for c in t for p in c['polygons']]for g,t in zip(obj['groups'],obj['trace'])),'groupP/callP binding')
  need(all(set(p)=={'x','y','off'} and p['off']==0 and all(math.isfinite(p[k])for k in['x','y'])for g in obj['groups']for poly in g['polygons']for p in poly),'off0 finite original polygon points')
 unchanged=[n for n in range(1,20)if n not in MATRICES]
 need(all(canonical(original['groups'][n-1])==canonical(candidate['groups'][n-1])and canonical(original['trace'][n-1])==canonical(candidate['trace'][n-1])for n in unchanged),'17 original raw groups/calls canonical JSON unchanged')
 need(original['defaults']==candidate['defaults'],'defaults unchanged')
 for n in MATRICES:need(len(original['trace'][n-1])==1 and original['trace'][n-1][0]['kind']=='cdDrawCurve' and len(original['trace'][n-1][0]['args'])==8,'two whole original Q calls only')
 expected=expected_candidate(original);need(expected==candidate,'candidate equals independent declared JS wholeP/raw/call-guide transform')
 materializer=HERE/'prepare-local-transform.mjs';need(sha(materializer.read_bytes())=='6b0e3840095dde9c5097b0f0484c1b73a8e25f5c17c9016e82c3b53ab115cb08','declared materializer pin');need('const y=v=>(t.num*v+t.shift)/t.den' in materializer.read_text(),'declared JS order');numerics=arithmetic_certificate(original,candidate)
 helper=ROOT/HELPER;need(sha(helper.read_bytes())==HELPER_SHA,'exact existing math helper')
 env={'F':F}
 for n in ast.parse(helper.read_text()).body:
  if isinstance(n,ast.FunctionDef):exec(compile(ast.Module(body=[n],type_ignores=[]),str(helper),'exec'),env)
 def points(g,raw,mode):
  out=[]
  for poly in g['polygons']:
   ps=[]
   for p in poly:
    x=F(str(p['x']));v=F(str(p['y']))
    if mode=='exact-positive-affine'and raw in MATRICES:d,f=MATRICES[raw];v=d*v+f
    ps.append((x,v))
   out.append(env['clean'](ps))
  return out
 def bbox(p):return min(v[0]for v in p),min(v[1]for v in p),max(v[0]for v in p),max(v[1]for v in p)
 def disjoint(p,q):
  a=bbox(p);b=bbox(q);return a[2]<b[0]or b[2]<a[0]or a[3]<b[1]or b[3]<a[1]
 pairs=sorted({tuple(sorted((r,n)))for r in MATRICES for n in range(1,20)if n!=r})
 def graph(obj,mode):
  result=[];stats={'rawPairs':len(pairs),'polygonPairs':0,'bboxDisjointPolygonPairs':0}
  for a,b in pairs:
   area=F(0);touch=False;unresolved=[]
   for pi,p in enumerate(points(obj['groups'][a-1],a,mode),1):
    for qi,q in enumerate(points(obj['groups'][b-1],b,mode),1):
     stats['polygonPairs']+=1
     if disjoint(p,q):stats['bboxDisjointPolygonPairs']+=1;continue
     if env['contact'](p,q):
      touch=True
      if env['simple'](p)and env['simple'](q):area+=env['exact_area'](p,q)
      else:unresolved.append([pi,qi])
   if touch:result.append({'rawPairOneBased':[a,b],'positiveArea':area>0,'sumPairIntersectionAreaExact':str(area),'boundaryOnly':area==0 and not unresolved,'unresolvedNonSimplePolygonPairs':unresolved})
  return {'contacts':result,'stats':stats}
 old=graph(original,'original-decimals');new=graph(original,'exact-positive-affine');stored=graph(candidate,'candidate-decimals')
 def keyed(g):return{tuple(r['rawPairOneBased']):r for r in g['contacts']}
 old_k=keyed(old);new_k=keyed(new);stored_k=keyed(stored)
 status=lambda r:None if r is None else('positive-area'if r['positiveArea']else'unresolved-nonsimple'if r['unresolvedNonSimplePolygonPairs']else'boundary-only')
 disagreements=[{'rawPairOneBased':list(k),'exactAffineStatus':status(new_k.get(k)),'storedDecimalStatus':status(stored_k.get(k))}for k in sorted(set(new_k)|set(stored_k))if status(new_k.get(k))!=status(stored_k.get(k))]
 changed=[{'rawPairOneBased':list(k),'oldStatus':status(old_k.get(k)),'newStatus':status(new_k.get(k))}for k in sorted(set(old_k)|set(new_k))if status(old_k.get(k))!=status(new_k.get(k))]
 cross=lambda p:any(v in[1,2,3,15,16,17,18,19]for v in p)
 new_contacts=[new_k[k]for k in sorted(set(new_k)-set(old_k))];lost_contacts=[old_k[k]for k in sorted(set(old_k)-set(new_k))]
 inputs={SOURCE:SOURCE_SHA,str(fixture_path.relative_to(ROOT)):args.fixture_sha,str(recipe_path.relative_to(ROOT)):args.recipe_sha,HELPER:HELPER_SHA,str(materializer.relative_to(ROOT)):sha(materializer.read_bytes()),str(Path(__file__).relative_to(ROOT)):sha(Path(__file__).read_bytes())}
 report={'schema':'hanja-independent-original-whole-Q-affine-contact-check/v1','date':'2026-10-30','glyph':'憯','inputSHA256':inputs,'counts':{'raw':19,'calls':21,'P':41,'changedWholeQRaw':[6,12],'unchangedRawCount':17},'preservation':{'candidateEqualsIndependentDeclaredJSArithmetic':True,'other17RawGroupsAndCallsCanonicalJSONExact':True,'defaultsExact':True,'allOriginalFlagsOffAndXCoordinatesPreserved':True,'allChangedWholePAndOriginalQControlsSameAffine':True,'newP':0,'newGuide':0,'trim':0,'newBridge':0},'arithmeticCertificate':numerics,'matricesExact':{str(k):['1','0','0',str(d),'0',str(f)]for k,(d,f)in MATRICES.items()},'publicAnchors':{'head6':[96,17],'targetOwnH4Y':35,'end6':[58.4,115],'head12':[157.6,17],'targetOwnH10Y':35,'end12':[118.4,109],'publisherCoordinatesUsed':False},'contactMethod':'Existing exact Fraction polygon-edge contact/nonconvex ear intersection; bbox disjoint first. Areas sum polygon-pair intersections, not union area. Original coordinate decimal rationals and exact matrix rationals; stored-candidate decimal contact classes separately checked. This is not a formal interval rendering proof.','old':old,'newExactAffine':new,'newStoredCandidateDecimals':stored,'contactChanges':changed,'newContacts':new_contacts,'lostContacts':lost_contacts,'newExternal忄日Contacts':[v for v in new_contacts if cross(v['rawPairOneBased'])],'lostExternal忄日Contacts':[v for v in lost_contacts if cross(v['rawPairOneBased'])],'exactVsStoredContactStatusDisagreements':disagreements,'externalScope':'Changed6/12 vs retained忄1..3 and日15..19. Within兓 all changed-to-retained4..14 and changed6/12 pair included; all other pairs unchanged by identity.','sourceConfidenceOrCompatibilityClaim':False,'nativeStaticApproved':False,'mappingApproved':False,'actualTemporalApproved':False,'runtimeApplied':False,'engineInvocations':0,'server':0,'sharedFilesChanged':False}
 print(json.dumps(report,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
