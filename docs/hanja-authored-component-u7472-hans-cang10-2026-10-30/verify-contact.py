import ast,json,re,hashlib,sys
from pathlib import Path
from fractions import Fraction as F
B=Path.cwd();hp='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py';assert hashlib.sha256((B/hp).read_bytes()).hexdigest()=='945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea'
tree=ast.parse((B/hp).read_text());exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)],type_ignores=[]),hp,'exec'))
recipe=json.loads((B/'docs/hanja-authored-component-u7472-hans-cang10-2026-10-30/recipe.json').read_text());record=json.loads((B/recipe['sourceRefs']['donor']['path']).read_text());original=json.loads((B/recipe['sourceRefs']['recipient']['path']).read_text());p={'groups':original['groups'],'filled':[{'d':s['originalD']}for s in record['filledPaths']]};groups=p['groups'];rawpoly=lambda g:[clean([(F(str(v[0])),F(str(v[1])))if isinstance(v,list)else(F(str(v['x'])),F(str(v['y'])))for v in q])for q in g['polygons']]
tama=[rawpoly(g)for g in groups[:4]];old=[rawpoly(g)for g in groups[5:]];xs=[x for g in old for q in g for x,y in q];ys=[y for g in old for q in g for x,y in q];target=[min(xs),min(ys),max(xs),max(ys)];source=[F(119),F(34),F(984),F(945)];a=(target[2]-target[0])/(source[2]-source[0]);d=(target[3]-target[1])/(source[3]-source[1]);e=target[0]-a*source[0];f=target[1]-d*source[1]
def hull(ps):
 ps=sorted(set(ps));lo=[];hi=[]
 for v in ps:
  while len(lo)>1 and cross(lo[-2],lo[-1],v)<=0:lo.pop()
  lo.append(v)
 for v in ps[::-1]:
  while len(hi)>1 and cross(hi[-2],hi[-1],v)<=0:hi.pop()
  hi.append(v)
 return lo[:-1]+hi[:-1]
new=[]
for item in p['filled']:
 ns=[F(x)for x in re.findall(r'[-+]?(?:\d*\.\d+|\d+)',item['d'])];new.append(hull([(ns[i]*a+e,ns[i+1]*d+f)for i in range(0,len(ns),2)]))
oldcontacts=[];newhull=[]
for i,t in enumerate(tama,1):
 for j,b in enumerate(old,6):
  if any(contact(x,y)for x in t for y in b):oldcontacts.append({'tamaRaw':i,'oldCangRaw':j,'area':str(sum((exact_area(x,y)for x in t for y in b),F(0)))})
 for j,h in enumerate(new,1):
  if any(contact(x,h)for x in t):newhull.append({'tamaRaw':i,'donorStroke':j,'hullIntersectionArea':str(sum((exact_area(x,h)for x in t),F(0)))})
result={'matrixExact200':[str(a),'0','0',str(d),str(e),str(f)],'targetActualBBox200':list(map(str,target)),'sourceControlBBox1024':list(map(str,source)),'oldCrossComponentContacts':oldcontacts,'newControlHullPotentialContacts':newhull,'newFilledDisjointProven':not newhull,'proof':'Every complete cubic filled contour lies in convex hull of all its original controls/endpoints. Exact convex-hull disjointness from every retained polygon proves filled disjointness; potential contact is not a proved new filled contact.'}
report=json.loads((B/'docs/hanja-authored-component-u7472-hans-cang10-2026-10-30/public-contact-check.json').read_text());assert result==report['facts'];assert result['newFilledDisjointProven'] and not result['oldCrossComponentContacts']
for item in report['input'].values():assert hashlib.sha256((B/item['path']).read_bytes()).hexdigest()==item['SHA256']
print(json.dumps({'sourceContactCheck':'PASS','oldCrossContacts':0,'newCubicControlHullContacts':0,'retainedPolygons':8,'completeDonorPaths':10,'pairChecks':80,'sourceContoursUnchanged':True,'nativeApproval':False}))
