import ast,copy,hashlib,json
from pathlib import Path
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
SOURCE='docs/hanja-actual-engine-capture-u9c49-hkcs-m-2026-10-25/engine-whole-hkcs_m9c49.json';SOURCE_SHA='d6c0c87e387968e2af0f41ecd4a8f02007dd712b6d7f1dcd4a6188fb20cfcb6c'
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
def load_candidate():
    assert sha(ROOT/SOURCE)==SOURCE_SHA
    source=json.loads((ROOT/SOURCE).read_bytes());groups=copy.deepcopy(source['groups']);g=groups[1];assert g['raw'][0]==2
    for p in g['polygons']:
        for q in p:q['y']=float(F(str(q['y']))-4)
    for i in[4,6,8]:g['raw'][i]=float(F(str(g['raw'][i]))-4)
    assert all(groups[i]==source['groups'][i]for i in range(25)if i!=1)
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
    source=json.loads((ROOT/SOURCE).read_bytes());groups=load_candidate();assert len(groups)==25 and len(sum(source['trace'],[]))==26 and sum(len(g['polygons'])for g in groups)==48
    assert [sum((c['polygons']for c in calls),[])for calls in source['trace']]==[g['polygons']for g in source['groups']]
    dot=[poly(p)for p in groups[1]['polygons']];assert len(dot)==2
    bbox=[min(x for p in dot for x,y in p),min(y for p in dot for x,y in p),max(x for p in dot for x,y in p),max(y for p in dot for x,y in p)]
    roof=min(y for p in map(poly,source['groups'][4]['polygons'])for x,y in p);assert roof-bbox[3]==F(6,5);assert roof-(bbox[3]+1)==F(1,5)
    results=[];hardPairs=0
    for i,g in enumerate(groups):
        if i==1:continue
        pairs=[]
        for di,a in enumerate(dot,1):
            for pi,b in enumerate(map(poly,g['polygons']),1):
                lower=bboxdist(box(a),box(b))
                if lower>0:area=F(0);method='strict-exact-AABB-distance-lower-bound'
                else:hardPairs+=1;area=intersection(a,b);lower=boundarydist(a,b);method='exact-nonzero-fill-event-area-and-segment-distance'
                assert area==0 and lower>0,('new contact or overlap',i+1,di,pi,str(area),str(lower))
                pairs.append({'dotP':di,'otherP':pi,'intersectionAreaExact':str(area),'squaredDistanceLowerBoundExact':str(lower),'method':method})
        results.append({'otherRawOneBased':i+1,'allFilledPolygonsStrictlyDisjoint':True,'minimumSquaredDistanceLowerBoundExact':str(min(F(p['squaredDistanceLowerBoundExact'])for p in pairs)),'pairs':pairs if i in[3,4,8,10]else None})
    assert groups[1]['raw'][:4]==source['groups'][1]['raw'][:4]and all(groups[1]['raw'][i]==source['groups'][1]['raw'][i]for i in[3,5,7])
    return {'schema':'hanja-public-source-positive-dot-translation-separation/v1','date':'2026-10-29','glyph':'鱉','status':'PASS-source-math-only-new-native-pending','source':{'path':SOURCE,'SHA256':SOURCE_SHA},'exactGeometryHelper':{'path':HELP,'SHA256':HELP_SHA,'ASTFunctionsOnly':sorted(names),'oldTargetLoopsExecuted':0},'positiveMatrixExact':['1','0','0','1','0','-4'],'determinantExact':'1','changedRawOneBased':[2],'sourceDotOriginalPolygons':2,'authorRule':'Translate complete original dot raw2 P and Q guide upward4 public200 units. This explicitly targets conservative roofV5 gap>=1, rather than private coordinates. Translation-3 would leave bboxgap1/5 only; selected-4 gives6/5.','newDotBoundsExact':[str(x)for x in bbox],'roofV5ExactBBoxGap':'6/5','translationMinus3RejectedBBoxGap':'1/5','counts':{'raw':25,'calls':26,'polygons':48,'otherRawGroupsStrictlyDisjoint':24,'nonBBoxPolygonPairsCheckedExactly':hardPairs},'other24GroupsExact':True,'rawFlagsPreserved':True,'originalPAndQShapeWidthDirectionPreserved':True,'noNewPolygonContactWithAnyOtherRaw':True,'results':results,'geometryEditedInOriginalSource':False,'bridgePaths':0,'addedPaths':0,'engineRuns':0,'privateCoordinatesCopied':False,'canonical22MappingApproved':False,'sourceMicroclockEquivalent':False,'nativeApproval':False,'runtimeApplied':False,'limits':['Rational public fixed-coordinate geometry only; exact segment-distance result is reported for overlapping-box pairs and AABB lower bounds for other pairs. No private contour or pixel fitting.','Whole/current/roof contact and canonical22 source mapping await ROOT direct review; originalHKCS-m HOLD preserved.','SourceP/Q are not cut, redrawn, or independently control-adjusted; whole dot and its guide receive the same positive translation.']}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
