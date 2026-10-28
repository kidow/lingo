import ast,copy,hashlib,json
from pathlib import Path
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
SOURCE='docs/hanja-actual-engine-capture-u5b7c-hkcs-m-2026-10-25/engine-whole-hkcs_m5b7c.json';SOURCE_SHA='15c216d7e4e468e8f3820026dd76d1cf86e0d3af394256f89d98bbc0e04cf5df'
HELP='docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';HELP_SHA='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def poly(p):
    assert all(q['off']==0 for q in p)
    return[(F(str(q['x'])),F(str(q['y'])))for q in p]
def box(p):
    return[min(x for x,y in p),min(y for x,y in p),max(x for x,y in p),max(y for x,y in p)]
def bboxdist(a,b):
    x=max(F(0),a[0]-b[2],b[0]-a[2]);y=max(F(0),a[1]-b[3],b[1]-a[3]);return x*x+y*y
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def on(a,b,p):return cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
def touch(a,b,c,d):
    u,v,w,z=cross(a,b,c),cross(a,b,d),cross(c,d,a),cross(c,d,b)
    return(u*v<0 and w*z<0)or(u==0 and on(a,b,c))or(v==0 and on(a,b,d))or(w==0 and on(c,d,a))or(z==0 and on(c,d,b))
def pointdist(p,a,b):
    v=(b[0]-a[0],b[1]-a[1]);vv=v[0]*v[0]+v[1]*v[1];t=max(F(0),min(F(1),((p[0]-a[0])*v[0]+(p[1]-a[1])*v[1])/vv))if vv else F(0);return(p[0]-a[0]-t*v[0])**2+(p[1]-a[1]-t*v[1])**2
def boundarydist(a,b):
    ds=[]
    for p,q in zip(a,a[1:]+a[:1]):
        for r,s in zip(b,b[1:]+b[:1]):
            if touch(p,q,r,s):return F(0)
            ds.extend([pointdist(p,r,s),pointdist(q,r,s),pointdist(r,p,q),pointdist(s,p,q)])
    return min(ds)
import importlib.util
BASE='docs/hanja-authored-sameglyph-mixedparts-u5b7c-v2-shortdl-2026-10-29/materialize-draft.py';BASE_SHA='723e844d9532da13582584221198aa4b6dc792c284594da505fbdfa9b1b131c2'
V2_FIXTURE='docs/hanja-authored-sameglyph-mixedparts-u5b7c-v2-shortdl-2026-10-29/fixtures-static-draft.json';V2_FIXTURE_SHA='f42834c068f5a8cd79ad741a708daaaf6e762fe7aa9dc49252dfb7fb28ee7b4b'
HX=F(1707,1819);HTX=F(104692,9095)
def load_candidate():
    assert sha(ROOT/BASE)==BASE_SHA and sha(ROOT/V2_FIXTURE)==V2_FIXTURE_SHA
    spec=importlib.util.spec_from_file_location('fixed_eol_v2_materializer',ROOT/BASE);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    previous=module.load_candidate();assert previous==json.loads((ROOT/V2_FIXTURE).read_bytes())['groups'];groups=copy.deepcopy(previous);g=groups[18];assert g['raw'][0]==1 and len(g['polygons'])==2
    for p in g['polygons']:
        for q in p:q['x']=float(HX*F(str(q['x']))+HTX)
    for i in[3,5]:g['raw'][i]=float(HX*F(str(g['raw'][i]))+HTX)
    assert all(groups[i]==previous[i]for i in range(25)if i!=18)
    return groups
def verify():
    assert sha(ROOT/HELP)==HELP_SHA
    tree=ast.parse((ROOT/HELP).read_text());names={'vec','det','value','union_row','events'};defs=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in names];assert{n.name for n in defs}==names;ns={};exec(compile(ast.fix_missing_locations(ast.Module(body=defs,type_ignores=[])),HELP,'exec'),ns);events,union_row,value=(ns[n]for n in['events','union_row','value'])
    def intersection(a,b):
        lo=min(y for p in[a,b]for x,y in p);hi=max(y for p in[a,b]for x,y in p);cuts=events([a,b],lo,hi);area=F(0)
        for low,high in zip(cuts,cuts[1:]):
            mid=(low+high)/2
            for al,ar in union_row([a],mid):
                for bl,br in union_row([b],mid):
                    left=max([al,bl],key=lambda fn:value(fn,mid));right=min([ar,br],key=lambda fn:value(fn,mid))
                    if value(right,mid)<=value(left,mid):continue
                    widths=[value(right,y)-value(left,y)for y in[low,high]];assert min(widths)>=0;area+=(high-low)*sum(widths)/2
        return area
    path=ROOT/'docs/hanja-authored-sameglyph-mixedparts-u5b7c-v2-shortdl-2026-10-29/fixtures-static-draft.json';assert sha(path)=='f42834c068f5a8cd79ad741a708daaaf6e762fe7aa9dc49252dfb7fb28ee7b4b';v2=json.loads(path.read_bytes());groups=v2['groups'];assert len(groups)==25 and sum(len(g['polygons'])for g in groups)==43
    boxRows=[6,8,9,10,12,13,14];boxMax=max(F(str(q['x']))for i in boxRows for p in groups[i-1]['polygons']for q in p);oldH=[poly(p)for p in groups[18]['polygons']];left=min(x for p in oldH for x,y in p);R=F(str(groups[18]['raw'][5]));target=boxMax+1;a=(R-target)/(R-left);e=R*(1-a);assert a>0
    newH=[[(a*x+e,y)for x,y in p]for p in oldH];assert min(x for p in newH for x,y in p)==target and a*R+e==R
    results=[]
    for i,g in enumerate(groups):
        if i==18:continue
        other=[poly(p)for p in g['polygons']];states=[]
        for label,polys in [('previousV2',oldH),('authorShortenedH19',newH)]:
            areas=[];ds=[]
            for p in polys:
                for q in other:
                    lower=bboxdist(box(p),box(q))
                    if lower>0:area=F(0)
                    else:area=intersection(p,q);lower=boundarydist(p,q)
                    areas.append(area);ds.append(lower)
            states.append({'state':label,'sumPairIntersectionAreaExact':str(sum(areas)),'positive':any(x>0 for x in areas),'touch':any(x==0 for x in ds),'minSquaredDistanceLowerExact':str(min(ds))if ds else None})
        results.append({'otherRawOneBased':i+1,'previousV2':states[0],'new':states[1],'newContact':not states[0]['positive']and states[1]['positive'],'lostContact':states[0]['positive']and not states[1]['positive']})
    assert [r['otherRawOneBased']for r in results if r['lostContact']]==[9]and not any(r['newContact']for r in results)
    for i in[17,18,21]:
        r=next(r for r in results if r['otherRawOneBased']==i);assert r['previousV2']['positive']and r['new']['positive']
    return {'schema':'hanja-public-whole-H-positive-Xaffine-contact-check/v1','date':'2026-10-29','glyph':'孼','status':'source-math-only-unapproved-v3','previousV2File':'docs/hanja-authored-sameglyph-mixedparts-u5b7c-v2-shortdl-2026-10-29/fixtures-static-draft.json','previousV2SHA256':'f42834c068f5a8cd79ad741a708daaaf6e762fe7aa9dc49252dfb7fb28ee7b4b','changedRawSlot':19,'matrixExact':[str(a),'0','0','1',str(e),'0'],'anchorRightGuideEndXExact':str(R),'oldPLeftXExact':str(left),'newPLeftXExact':str(target),'leftBoxRawSlots':boxRows,'leftBoxMaxXExact':str(boxMax),'publicGlobalBoxXGapExact':'1','oldPFarRightXExact':str(max(x for p in oldH for x,y in p)),'newPFarRightXExact':str(max(x for p in newH for x,y in p)),'contacts':results,'lostContacts':[9],'newContacts':[],'preservedRightPositiveContacts':[17,18,21],'raw20IsSeparateHNotV':True,'counts':{'rawSlots':25,'P':43,'changedH19P':2,'otherPUnchanged':41,'otherRawSlotsUnchanged':24},'PAndWholeLineGuideSamePositiveAffine':True,'sourceOriginalProofUnchanged':True,'noCrop':True,'newP':0,'bridge':0,'newEngineRuns':0,'nativeApproval':False,'mappingApproved':False,'runtimeApplied':False,'limits':['Exactrational geometry ofserializedV2publiccandidateP; V2fixedslots4/5/15 untouched andunchangedpaircontacts reused.','RightGUIDE endpointfixed, not bothguideandfilled-Pmax; far-rightP changesbyreportedaffine rounding.','Newleftboxgap ispubliccoordinateauthorcriterion, notprivatepublisherpixelplacement. Freshwhole/prefix14required.']}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
