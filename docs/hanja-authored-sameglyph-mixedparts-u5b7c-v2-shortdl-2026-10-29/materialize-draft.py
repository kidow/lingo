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
A=F(1);D=F(2,7);TX=F(17,10);TY=F(692,175)
def transform(p):return[(A*F(str(p[0]))+TX),(D*F(str(p[1]))+TY)]
HEAD_C=-F(1075,3804);HEAD_TX=F(82259,4755);HEAD_D=F(2527,1902);HEAD_TY=-F(19130,951)
def load_candidate():
    assert sha(ROOT/SOURCE)==SOURCE_SHA
    source=json.loads((ROOT/SOURCE).read_bytes());groups=copy.deepcopy(source['groups']);g=copy.deepcopy(source['groups'][20]);assert g['raw'][0]==1 and len(g['polygons'])==1
    for p in g['polygons']:
        for q in p:q['x'],q['y']=map(float,transform([q['x'],q['y']]))
    for i in[3,5]:g['raw'][i]=float(F(str(g['raw'][i]))+TX)
    for i in[4,6]:g['raw'][i]=float(D*F(str(g['raw'][i]))+TY)
    groups[14]=g
    groups[3]['polygons']=copy.deepcopy(source['trace'][3][0]['polygons']);groups[3]['sourceDrawCallsKept']=[1];groups[3]['sourceDrawCallsExcluded']=[2]
    for p in groups[4]['polygons']:
        for q in p:q['x'],q['y']=float(F(str(q['x']))+HEAD_C*F(str(q['y']))+HEAD_TX),float(HEAD_D*F(str(q['y']))+HEAD_TY)
    for i in[3,5,7]:groups[4]['raw'][i]=float(F(str(groups[4]['raw'][i]))+HEAD_C*F(str(groups[4]['raw'][i+1]))+HEAD_TX)
    for i in[4,6,8]:groups[4]['raw'][i]=float(HEAD_D*F(str(groups[4]['raw'][i]))+HEAD_TY)
    assert all(groups[i]==source['groups'][i]for i in range(25)if i not in[3,4,14])
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
    source=json.loads((ROOT/SOURCE).read_bytes());groups=load_candidate();assert len(groups)==25 and len(sum(source['trace'],[]))==25 and sum(len(g['polygons'])for g in source['groups'])==45 and sum(len(g['polygons'])for g in groups)==43
    oldPolys={i:[poly(p)for p in g['polygons']]for i,g in enumerate(source['groups'])};newPolys=copy.deepcopy(oldPolys)
    newPolys[3]=[poly(p)for p in source['trace'][3][0]['polygons']]
    newPolys[4]=[[(x+HEAD_C*y+HEAD_TX,HEAD_D*y+HEAD_TY)for x,y in p]for p in oldPolys[4]]
    newPolys[14]=[[(x+TX,D*y+TY)for x,y in p]for p in oldPolys[20]]
    assert min(y for p in oldPolys[4]for x,y in p)==46 and max(y for p in oldPolys[4]for x,y in p)==F(617,10)
    assert max(y for p in newPolys[3]for x,y in p)==F(421,10)
    assert min(y for p in newPolys[4]for x,y in p)==41
    sourceEnd=tuple(F(str(v))for v in source['trace'][4][0]['args'][4:6]);assert(sourceEnd[0]+HEAD_C*sourceEnd[1]+HEAD_TX,HEAD_D*sourceEnd[1]+HEAD_TY)==sourceEnd
    sourceHead=(F(547,10),F(46));assert(sourceHead[0]+HEAD_C*sourceHead[1]+HEAD_TX,HEAD_D*sourceHead[1]+HEAD_TY)==(F(59),F(41))
    results=[]
    for i in range(25):
        for j in range(i+1,25):
            if i not in[3,4,14]and j not in[3,4,14]:continue
            states=[]
            for label,ps in [('original',oldPolys),('authoredV2',newPolys)]:
                areas=[];ds=[]
                for a in ps[i]:
                    for b in ps[j]:
                        lower=bboxdist(box(a),box(b))
                        if lower>0:area=F(0)
                        else:area=intersection(a,b);lower=boundarydist(a,b)
                        areas.append(area);ds.append(lower)
                states.append({'state':label,'sumPairIntersectionAreaExact':str(sum(areas)),'positive':any(a>0 for a in areas),'touch':any(d==0 for d in ds),'minSquaredDistanceLowerExact':str(min(ds))if ds else None})
            results.append({'raws':[i+1,j+1],'old':states[0],'new':states[1],'newContact':not states[0]['positive']and states[1]['positive'],'lostContact':states[0]['positive']and not states[1]['positive']})
    find=lambda a,b:next(r for r in results if r['raws']==sorted([a,b]))
    assert find(4,5)['new']['positive']and find(5,8)['new']['positive']and find(4,2)['new']['positive']and find(15,16)['new']['positive']
    return {'schema':'hanja-public-mixedparts-whole-call-exclusion-and-positive-affine-contact-check/v1','glyph':'孼','date':'2026-10-29','status':'source-math-only-unapproved-v2','excludedOriginalWholeCalls':[{'raw':4,'call':2,'kind':'cdDrawCurve','P':1,'reason':'Publisherclock1Vonly whileclock4shortDL isindependentraw5; directsource1/4appearance stillROOTpending, no countforcing'}],'retainedRaw4Call1P':3,'raw5PositiveShearAffine':['1','0','-1075/3804','2527/1902','82259/4755','-19130/951'],'raw5OldMinY':'46','raw5NewMinY':'41','raw5GuideBottomFixed':['1033/20','7652/125'],'raw5FilledBottomYExact':str(max(y for p in newPolys[4]for x,y in p)),'publicRaw4VFootMaxY':'421/10','publicHeadExtensionOverlapHeight':'11/10','headSourceVertexExact':['547/10','46'],'headTargetInsideActualVFootExact':['59','41'],'H2TopGapExact':'11/10','uniformShapeOrFontIdentity':False,'topV21To15Matrix':['1','0','0','2/7','17/10','692/175'],'counts':{'originalRaw':25,'originalDrawCalls':25,'originalP':45,'authoredRawSlots':25,'authoredSourcePrimitiveSelections':24,'authoredP':43,'retainedEmptyRawRows':[7,11],'changedRawSlots':[4,5,15],'otherRawExact':22},'contacts':results,'newContacts':[r['raws']for r in results if r['newContact']],'lostContacts':[r['raws']for r in results if r['lostContact']],'targetRaw4To5Restored':find(4,5),'raw5ToBoxH8PositiveRetained':find(5,8),'raw4VToMountainH2PositiveRetained':find(4,2),'topV15ToFirstH16PositiveRetained':find(15,16),'sameGlyphMixedParts':True,'sourceOriginalProofUnchanged':True,'sourceDonor21Unchanged':groups[20]==source['groups'][20],'allOther22RawExact':all(groups[i]==source['groups'][i]for i in range(25)if i not in[3,4,14]),'newP':0,'bridge':0,'crop':0,'engineRuns':0,'nativeApproval':False,'mappingApproved':False,'runtimeApplied':False,'limits':['Exclusion removesonewholeoriginalcallPonly inauthoredartifact; originalHKmfullproof45P preserved.','Raw5wholeP/Q positive shear fixes originalQend exactly and mapsoriginalheadvertex toactualVfootinterior(59,41); not uniformshape/fontidentity. H2newcontact andboxcontact checked.','Exactpairwise contactgraph onlyaffectedslots4/5/15, unchangedotherpairs reusedidentity.','Guideendpoints change underwholeaffine; no continuousbridge/retracing/sourceclockidentity claimed.']}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
