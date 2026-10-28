import json,hashlib,copy
from pathlib import Path
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2]
SOURCE='docs/hanja-actual-engine-capture-u66d9-hkcs-2026-10-26/engine-whole-hkcs_m66d9.json'
SOURCE_SHA='553333a846a8df6196c21940537080efc9f33f02f08414c3d076fa3add555822'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def area(p):return abs(sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(p,p[1:]+p[:1])))/2 if p else F(0)
def clip(poly,rect):
    pts=[(F(str(q['x'])),F(str(q['y'])))for q in poly]
    for axis,bound,sign in [(0,rect[0],1),(0,rect[2],-1),(1,rect[1],1),(1,rect[3],-1)]:
        out=[]
        for a,b in zip(pts,pts[1:]+pts[:1]):
            ia=(a[axis]-bound)*sign>=0;ib=(b[axis]-bound)*sign>=0
            if ia:out.append(a)
            if ia!=ib:
                t=(bound-a[axis])/(b[axis]-a[axis]);out.append((a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])))
        pts=out
        if not pts:break
    return pts
def load_candidate():
    assert sha(ROOT/SOURCE)==SOURCE_SHA
    source=json.loads((ROOT/SOURCE).read_bytes());c=copy.deepcopy(source['groups']);a=F(1213,1160);e=F(-4929,580)
    g=c[13];assert g['raw'][:7]==[1,0,100,70,103,186,103]
    for poly in g['polygons']:
        for q in poly:q['x']=float(a*F(str(q['x']))+e)
    for i in (3,5):g['raw'][i]=float(a*F(str(g['raw'][i]))+e)
    assert g['raw'][3:7]==[64.7,103,186,103]
    assert all(c[i]==source['groups'][i]for i in range(21)if i!=13)
    return c
def verify():
    groups=load_candidate();source=json.loads((ROOT/SOURCE).read_bytes())
    assert source['groups'][2]['polygons'][0]==[{'x':65.7,'y':37,'off':0},{'x':65.7,'y':160,'off':0},{'x':53.7,'y':160,'off':0},{'x':53.7,'y':37,'off':0}]
    assert source['groups'][13]['polygons'][0]==[{'x':70,'y':101,'off':0},{'x':186,'y':101,'off':0},{'x':186,'y':105,'off':0},{'x':70,'y':105,'off':0}]
    rect=list(map(F,['53.7','37','65.7','160']))
    original=sum(area(clip(p,rect))for p in source['groups'][13]['polygons']);new=sum(area(clip(p,rect))for p in groups[13]['polygons'])
    assert original==0 and new==4
    assert all(F(str(q['y']))<37 or F(str(q['y']))>43 for p in groups[13]['polygons']for q in p)
    top=source['groups'][16]['polygons'][0];xs=[F(str(q['x']))for q in top];ys=[F(str(q['y']))for q in top];toprect=[min(xs),min(ys),max(xs),max(ys)]
    assert len(top)==4 and len({(F(str(q['x'])),F(str(q['y'])))for q in top})==4
    dotArea=sum(area(clip(p,toprect))for p in source['groups'][20]['polygons'])
    assert dotArea>0
    return {'schema':'hanja-public-source-author-affine-contact-feasibility/v1','date':'2026-10-29','glyph':'曙','source':{'path':SOURCE,'SHA256':SOURCE_SHA},'sourceRoles':{'leftDayRightVRawOneBased':3,'centralHRawOneBased':14,'lowerDayTopHRawOneBased':17,'separateDotRawOneBased':21},'matrixExact':['1213/1160','0','0','1','-4929/580','0'],'positiveDeterminantExact':'1213/1160','authorRule':'Hold public right guide anchor(186,103). Move complete centralH guide/P left end to65.7-1=64.7 for explicit1-source-unit overlap with original left-day right shaft. No private coordinates, added bridge, cropped path or individual control edit.','originalActualShaftGapExact':'43/10','newShaftOverlapWidthExact':'1','newShaftIntersectionAreaExact':str(new),'originalIntersectionAreaExact':str(original),'originalDotAndLowerDayTopHUnchangedIntersectionAreaExact':str(dotArea),'changedRawZeroBased':[13],'other20GroupsExact':True,'counts':{'raw':21,'calls':len(source['trace']and sum(source['trace'],[])),'polygons':sum(len(g['polygons'])for g in groups)},'allOriginalOffZero':all(q['off']==0 for g in groups for p in g['polygons']for q in p),'engineRuns':0,'HTTP':0,'privateGeometryCopied':False,'nativeWholeReviewed':False,'canonicalLogicalMappingApproved':False,'directionApproved':False,'temporalApproved':False,'runtimeApplied':False,'limitations':['Source raw roles are geometric code facts, not canonical18 logical mapping. Fresh domestic clock/current/static contact and whole review remain required.','Exact positive area proves public contour contact only; no raster/font/style/native timing approval.','Dot fine static/native contact remains unreviewed; original whole had looked connected but no exact domestic-pixel identity claim.','OriginalHKCS whole remains HOLD. DKW gap values and old source corrections are not reused.']}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
