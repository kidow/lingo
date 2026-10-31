import ast,json,hashlib
from pathlib import Path
from fractions import Fraction as F
B=Path(__file__).resolve().parents[2]
HELPER='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py'
assert hashlib.sha256((B/HELPER).read_bytes()).hexdigest()=='945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea'
tree=ast.parse((B/HELPER).read_text());exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)],type_ignores=[]),HELPER,'exec'))
SOURCE="docs/hanja-authored-engine-u9a2d-pen8-terminal0-2026-10-29/engine-authored-pen8-terminal0.json";SOURCE_SHA="e3ff8774511134995a8165ae04f83e1f5a11423c10cc8083ec8f29cd071252e4"
assert hashlib.sha256((B/SOURCE).read_bytes()).hexdigest()==SOURCE_SHA
f=json.loads((B/SOURCE).read_bytes());groups=f['groups'];assert len(groups)==22
polys=lambda group:[clean([(F(str(v['x'])),F(str(v['y'])))for v in p])for p in group['polygons']]
allp=[polys(g)for g in groups];old=allp[8];H=allp[7];Q=allp[9]
assert all(simple(p)for p in old+H+Q)
# Original raw3/P1 is non-simple; exact disjoint bounding boxes avoid triangulating it.
def pairs(a,b):
    aa=bbox(a);bb=bbox(b)
    if aa[2]<bb[0]or bb[2]<aa[0]or aa[3]<bb[1]or bb[3]<aa[1]:return{'contact':False,'sumPIntersectionArea':'0','method':'exact-disjoint-bbox'}
    assert all(simple(p)for p in a+b),'overlapping non-simple original requires separate proof'
    return{'contact':any(contact(p,q)for p in a for q in b),'sumPIntersectionArea':str(sum((exact_area(p,q)for p in a for q in b),F(0))),'method':'exact-simple-polygon-pairs'}
def bbox(ps):return[min(v[0]for p in ps for v in p),min(v[1]for p in ps for v in p),max(v[0]for p in ps for v in p),max(v[1]for p in ps for v in p)]
a=[F(str(v))for v in f['trace'][9][0]['args'][:6]];assert f['trace'][9][0]['kind']=='cdDrawCurve'
seed=((a[0]+2*a[2]+a[4])/4,(a[1]+2*a[3]+a[5])/4);assert any(relation(seed,p)==1 for p in Q),'public Q half-guide must be strict inside'
ob=bbox(old);hb=bbox(H);top=hb[3]+1;bottom=seed[1]+1;assert bottom>top
sy=(bottom-top)/(ob[3]-ob[1]);dy=top-sy*ob[1];dx=seed[0]-F(str(groups[8]['raw'][3]));assert sy>0
new=[[(x+dx,sy*y+dy)for x,y in p]for p in old];assert all(simple(p)for p in new);assert bbox(new)[1]==top and bbox(new)[3]==bottom;seed_inside_new=any(relation(seed,p)==1 for p in new)
oldcontacts={str(i+1):pairs(old,row)for i,row in enumerate(allp)if i!=8};newcontacts={str(i+1):pairs(new,row)for i,row in enumerate(allp)if i!=8}
assert not newcontacts['8']['contact'];assert newcontacts['10']['contact'];assert F(newcontacts['10']['sumPIntersectionArea'])>0
newpairs=[int(i)for i in newcontacts if newcontacts[i]['contact']and not oldcontacts[i]['contact']]
assert newpairs==[10],newpairs
print(json.dumps({'schema':'hanja-public-coordinate-feasibility/v1','glyph':'騭','source':SOURCE,'sourceSHA256':SOURCE_SHA,'originalPairs':{str(i):oldcontacts[str(i)]for i in[5,7,8,10,11]},'publicAuthorHypothesisOnly':True,'anchor':'Exact original raw10 quadratic t=1/2 guide point; strict inside its original filledP','seed':[str(v)for v in seed],'publicSeedStrictInsideNewV':seed_inside_new,'newContactProof':'Exact positive originalP intersection; not inferred from seed placement','constraints':{'topGapFromRaw8H':str(top-hb[3]),'targetBottomPastPublicSeed':str(bottom-seed[1]),'positiveYScale':str(sy),'XWidthUnchanged':True,'newPositiveContactOnlyRaw10':newpairs,'other21GroupsUnmodified':True},'matrix':[str(v)for v in[F(1),F(0),F(0),sy,dx,dy]],'oldBounds':[str(v)for v in ob],'newBounds':[str(v)for v in bbox(new)],'originalAllContactPairs':oldcontacts,'hypothesisAllContactPairs':newcontacts,'nativeApproval':False,'wholeApproval':False,'engineExecutions':0,'newFilledP':0,'guideChangedBySameWholeAffineOnly':True,'officialCoordinateFit':False,'privateInputs':0,'remaining':['Domestic9 original clock and role must be directly checked','This coordinate hypothesis is not a whole-shape or pen8 placement approval','Other canonical mapping remains unapproved; legacy sourceGroups have23raw against current22 and cannot be reused wholesale']},ensure_ascii=False))
