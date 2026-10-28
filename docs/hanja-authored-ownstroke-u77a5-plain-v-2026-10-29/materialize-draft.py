import copy,hashlib,json
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
BASE=Path(__file__).resolve().parent
SOURCE="docs/hanja-actual-engine-capture-u77a5-2026-10-24/engine-whole-u77a5.json"
SOURCE_SHA="774030b77f6e8433e97fad37cd69a504dd461e52a2cfce6d1e4e749d640e6889"
RECIPE_SHA="0b35d96f28b05f3751d9e5ac7c62705469fb75e9d05911064c9bf8a59919349f"
FIXTURE_SHA="290a501cdeb4c84bcc6ed0ebaa541239303c40e3f8a880abf0e99e7fafd142da"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load_candidate():
    assert sha(ROOT/SOURCE)==SOURCE_SHA and sha(BASE/'recipe.json')==RECIPE_SHA and sha(BASE/'fixtures-draft.json')==FIXTURE_SHA
    source=json.loads((ROOT/SOURCE).read_bytes());c=json.loads((BASE/'fixtures-draft.json').read_bytes());expected=copy.deepcopy(source['groups']);new=copy.deepcopy(source['groups'][1])
    for p in new['polygons']:
        for q in p:q['x']+=68;q['y']=float((55*F(str(q['y']))+322)/62)
    for i in(3,5):new['raw'][i]+=68
    for i in(4,6):new['raw'][i]=float((55*F(str(new['raw'][i]))+322)/62)
    expected[3]=new
    assert c['groups']==expected and [i for i,g in enumerate(expected)if g!=source['groups'][i]]==[3] and c['groups'][1]==source['groups'][1]
    assert len(expected)==18 and sum(len(g['polygons'])for g in expected)==32 and all(q['off']==0 for g in expected for p in g['polygons']for q in p)
    assert sorted(i for row in c['logicalRawGroupsZeroBased']for i in row)==list(range(18)) and len(c['logicalRawGroupsZeroBased'])==16
    assert c['originalRoot']is False and c['isOriginalEngineCapture']is False and not any(c['approval'].values())
    return c
def clip_rect(points,rect):
    pts=points
    for axis,bound,sign in [(0,rect[0],1),(0,rect[1],-1),(1,rect[2],1),(1,rect[3],-1)]:
        out=[]
        for a,b in zip(pts,pts[1:]+pts[:1]):
            ia=(a[axis]-bound)*sign>=0;ib=(b[axis]-bound)*sign>=0
            if ia:out.append(a)
            if ia!=ib:
                t=(bound-a[axis])/(b[axis]-a[axis]);out.append((a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])))
        pts=out
        if not pts:break
    return pts
def area(p):return abs(sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(p,p[1:]+p[:1])))/2
def verify(c=None):
    if c is None:c=load_candidate()
    source=json.loads((ROOT/SOURCE).read_bytes());d=source['groups'][1];assert len(d['polygons'])==1 and d['raw'][3:7]==[31,46,31,108]
    assert source['groups'][3]['raw'][3:7]==[99,46,99,101] and c['groups'][3]['raw'][3:7]==[99,46,99,101]
    pts=[(F(str(p['x']))+68,(55*F(str(p['y']))+322)/62)for p in d['polygons'][0]]
    assert F(55,62)>0 and (F(55,62)*46+F(161,31),F(55,62)*108+F(161,31))==(46,101)
    h=source['groups'][2]['polygons'][0];assert h==[{'x':31,'y':44,'off':0},{'x':99,'y':44,'off':0},{'x':99,'y':48,'off':0},{'x':31,'y':48,'off':0}]
    contact=clip_rect(pts,[F(31),F(99),F(44),F(48)]);assert area(contact)==24;assert area(pts)==F(22110,31)
    return {'glyph':'瞥','logicalPens':16,'rawGroups':18,'originalPolygons':36,'authoredPolygons':32,'changedRawZeroBased':[3],'donorRawZeroBased':1,'positiveDeterminant':'55/62','guideEndpointsExact':True,'donorPWholePreservedViaAffine':True,'H3ToV4PositiveIntersectionArea':'24','newVAreaExact':'22110/31','nativeApproval':False,'runtimeApplied':False,'engineRuns':0,'privateCoordinates':False}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
