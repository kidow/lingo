import ast,copy,hashlib,json
from pathlib import Path
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
SOURCE='docs/hanja-actual-engine-capture-u709a-hkcs-u-2026-10-25/engine-whole-hkcs_u709a.json';SOURCE_SHA='cd7b53e28babc7db1d2e6be1878ab395c8096308b108fd1148af82df19174b46'
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
D=F(672,637);TY=-F(13111,1274)
def fy(y):return D*F(str(y))+TY
def load_candidate():
    assert sha(ROOT/SOURCE)==SOURCE_SHA
    source=json.loads((ROOT/SOURCE).read_bytes());groups=copy.deepcopy(source['groups']);g=groups[8];assert g['raw'][0]==2
    for p in g['polygons']:
        for q in p:q['y']=float(fy(q['y']))
    for i in[4,6,8]:g['raw'][i]=float(fy(g['raw'][i]))
    assert all(groups[i]==source['groups'][i]for i in range(9)if i!=8)
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
    source=json.loads((ROOT/SOURCE).read_bytes());groups=load_candidate();assert len(groups)==9 and len(sum(source['trace'],[]))==10 and sum(len(g['polygons'])for g in groups)==17
    assert [sum((c['polygons']for c in calls),[])for calls in source['trace']]==[g['polygons']for g in source['groups']]
    old=[poly(p)for p in source['groups'][8]['polygons']];new=[[(x,D*y+TY)for x,y in p]for p in old]
    assert min(y for p in new for x,y in p)==F(529,10)and max(y for p in new for x,y in p)==F(1873,10)
    assert min(y for p in map(poly,source['groups'][5]['polygons'])for x,y in p)==F(539,10)
    results=[]
    for i,g in enumerate(source['groups']):
        if i==8:continue
        states=[]
        for label,polys in [('original',old),('authored',new)]:
            areas=[];distances=[];hard=0
            for a in polys:
                for b in map(poly,g['polygons']):
                    lower=bboxdist(box(a),box(b))
                    if lower>0:area=F(0)
                    else:hard+=1;area=intersection(a,b);lower=boundarydist(a,b)
                    areas.append(area);distances.append(lower)
            states.append({'state':label,'sumPairIntersectionAreaExact':str(sum(areas)),'anyPositiveOverlap':any(a>0 for a in areas),'anyBoundaryTouch':any(d==0 for d in distances),'minSquaredBoundaryOrBBoxLowerExact':str(min(distances)),'nonBBoxPairs':hard})
        results.append({'otherRawOneBased':i+1,'original':states[0],'authored':states[1],'newPositiveContact':not states[0]['anyPositiveOverlap']and states[1]['anyPositiveOverlap'],'lostPositiveContact':states[0]['anyPositiveOverlap']and not states[1]['anyPositiveOverlap']})
    return {'schema':'hanja-public-source-positive-affine-contact-diff/v1','glyph':'炚','date':'2026-10-29','status':'source-math-only-unapproved','matrixExact':['1','0','0',str(D),'0',str(TY)],'anchor':'original whole-P bottom envelope y1873/10 fixed; not original guide endpoint','oldMinYExact':'599/10','newMinYExact':'529/10','leftDotRaw6MinYExact':'539/10','newHeadAboveLeftDotExact':'1','bottomYExact':'1873/10','oldGuideEndYExact':'182','newGuideEndYExact':str(fy(182)),'counts':{'raw':9,'calls':10,'P':17,'changedRaw':9,'changedP':2,'otherRawExact':8},'contacts':results,'allOtherEightGroupsExact':all(groups[i]==source['groups'][i]for i in range(9)if i!=8),'originalFlagsAndXPreserved':True,'wholePAndGuideSamePositiveAffine':True,'nativeApproval':False,'mappingApproved':False,'runtimeApplied':False,'limits':['Pairwise exact rational nonzero-fill intersection for overlapping AABBs; sums are pair sums, not union area.','Original public fixed coordinates only; public minY52.9 criterion is an authored hypothesis, not private coordinate fitting.','Binary64 JSON materialization rounds exact affine results; original source unchanged.','Whole/current/raw9 and contacts await fresh ROOT native review; 9raw to8canonical mapping pending.']}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
