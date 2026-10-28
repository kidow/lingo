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
def load_candidate():
    assert sha(ROOT/SOURCE)==SOURCE_SHA
    source=json.loads((ROOT/SOURCE).read_bytes());groups=copy.deepcopy(source['groups']);g=copy.deepcopy(source['groups'][20]);assert g['raw'][0]==1 and len(g['polygons'])==1
    for p in g['polygons']:
        for q in p:q['x'],q['y']=map(float,transform([q['x'],q['y']]))
    for i in[3,5]:g['raw'][i]=float(F(str(g['raw'][i]))+TX)
    for i in[4,6]:g['raw'][i]=float(D*F(str(g['raw'][i]))+TY)
    groups[14]=g;assert all(groups[i]==source['groups'][i]for i in range(25)if i!=14)
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
    source=json.loads((ROOT/SOURCE).read_bytes());groups=load_candidate();assert len(groups)==25 and len(sum(source['trace'],[]))==25 and sum(len(g['polygons'])for g in source['groups'])==45 and sum(len(g['polygons'])for g in groups)==44
    assert [sum((c['polygons']for c in calls),[])for calls in source['trace']]==[g['polygons']for g in source['groups']]
    old=[poly(p)for p in source['groups'][14]['polygons']];donor=[poly(p)for p in source['groups'][20]['polygons']];new=[[(x+TX,D*y+TY)for x,y in p]for p in donor]
    dr=source['groups'][20]['raw'];targetstart=transform(dr[3:5]);targetend=transform(dr[5:7]);assert targetstart==[F(2821,20),F(556,25)]and targetend==[F(2821,20),F(904,25)]
    originalTarget=source['groups'][14]['raw'];firstH=source['groups'][15]['raw'];assert(F(str(originalTarget[3]))+F(str(originalTarget[5])))/2==targetstart[0]and F(str(originalTarget[4]))==targetstart[1]and F(str(firstH[4]))==targetend[1]
    results=[]
    for i,g in enumerate(source['groups']):
        if i==14:continue
        states=[]
        for label,polys in [('originalTargetH',old),('authoredV21',new)]:
            areas=[];distances=[];hard=0
            for a in polys:
                for b in map(poly,g['polygons']):
                    lower=bboxdist(box(a),box(b))
                    if lower>0:area=F(0)
                    else:hard+=1;area=intersection(a,b);lower=boundarydist(a,b)
                    areas.append(area);distances.append(lower)
            states.append({'state':label,'sumPairIntersectionAreaExact':str(sum(areas)),'anyPositiveOverlap':any(a>0 for a in areas),'anyBoundaryTouch':any(d==0 for d in distances),'minSquaredBoundaryOrBBoxLowerExact':str(min(distances))if distances else None,'nonBBoxPairs':hard})
        results.append({'otherRawOneBased':i+1,'original':states[0],'authored':states[1],'newPositiveContact':not states[0]['anyPositiveOverlap']and states[1]['anyPositiveOverlap'],'lostPositiveContact':states[0]['anyPositiveOverlap']and not states[1]['anyPositiveOverlap']})
    assert [r['otherRawOneBased']for r in results if r['newPositiveContact']]==[16]
    return {'schema':'hanja-public-sameglyph-mixedparts-contact-check/v1','glyph':'孼','date':'2026-10-29','status':'source-math-only-unapproved','matrixExact':['1','0','0','2/7','17/10','692/175'],'determinantExact':'2/7','recipientRawOneBased':15,'donorRawOneBased':21,'sameGlyph':True,'mixedParts':True,'placementRule':'Map ownraw21wholeVguide to ownraw15H midpoint/topguide level and firstH16guide level. Explicit publicsource authoranchors, not privateplacement.','targetStartExact':[str(v)for v in targetstart],'targetEndExact':[str(v)for v in targetend],'counts':{'originalRaw':25,'originalCalls':25,'originalP':45,'authoredRaw':25,'authoredP':44,'sourceDonorP':1,'removedTargetP':2},'contacts':results,'allOther24GroupsExact':all(groups[i]==source['groups'][i]for i in range(25)if i!=14),'donorRaw21ItselfExact':groups[20]==source['groups'][20],'emptyRawRowsPreserved':[i+1 for i,g in enumerate(groups)if not g['polygons']],'wholeDonorPAndGuideSamePositiveAffine':True,'newBridge':0,'sourceGeometryEdited':False,'engineRuns':0,'nativeApproval':False,'mappingApproved':False,'runtimeApplied':False,'limits':['Sameglyph mixedparts authoredsubstitution, not originalwhole/enginecapture or mere ownstrokeaffine.','Positivecontact withfirstH16 is desiredauthorcandidate; actualshape/direction/othercontacts need ROOTnative review.','Allother24raw includingoriginaldonor21 preserved; no countforcing/omission ofsourceemptyrows.','Pairwise exactrational nonzero-fill intersection; areas arepairsums notunion.']}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
