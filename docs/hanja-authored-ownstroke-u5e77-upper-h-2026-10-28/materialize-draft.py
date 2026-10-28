import copy,hashlib,json
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
BASE=Path(__file__).resolve().parent
SOURCE="docs/hanja-actual-engine-capture-u5e77-005-2026-10-27/engine-whole-u5e77-02-var-005.json"
SOURCE_SHA="33e5d36c16b0b3c333d462128b234d81a14bf4aa7a788a495113992a352e0d9e"
RECIPE_SHA="0eb7d34a982ecfefe009cf62e7eb43d41e62bd83dc9979680b1a29a5f6ab2785"
FIXTURE_SHA="7f91ddfe11153d4056f7d76d2c7ea712ac443249764958e0130936dc6c5fd1f5"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load_candidate():
    assert sha(ROOT/SOURCE)==SOURCE_SHA and sha(BASE/'recipe.json')==RECIPE_SHA and sha(BASE/'fixtures-draft.json')==FIXTURE_SHA
    source=json.loads((ROOT/SOURCE).read_bytes());candidate=json.loads((BASE/'fixtures-draft.json').read_bytes());expected=copy.deepcopy(source['groups'])
    for poly in expected[1]['polygons']:
        for q in poly:q['x']=float((53*F(str(q['x']))-264)/50)
    for i in (3,5):expected[1]['raw'][i]=float((53*F(str(expected[1]['raw'][i]))-264)/50)
    assert candidate['groups']==expected and [i for i,g in enumerate(expected)if g!=source['groups'][i]]==[1]
    assert len(expected)==8 and sum(len(g['polygons'])for g in expected)==18 and all(q['off']==0 for g in expected for p in g['polygons']for q in p)
    assert candidate['originalRoot']is False and candidate['isOriginalEngineCapture']is False and not any(candidate['approval'].values())
    return candidate
def clip(poly,rect):
    pts=[(F(str(p['x'])),F(str(p['y'])))for p in poly]
    for axis,bound,sign in [(0,F(140),1),(0,F(186),-1),(1,F(55),1),(1,F(59),-1)]:
        out=[]
        for a,b in zip(pts,pts[1:]+pts[:1]):
            ia=(a[axis]-bound)*sign>=0;ib=(b[axis]-bound)*sign>=0
            if ia:out.append(a)
            if ia!=ib:
                t=(bound-a[axis])/(b[axis]-a[axis]);out.append((a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])))
        pts=out
        if not pts:break
    return pts
def verify():
    c=load_candidate();a=c['groups'][1]['polygons'];b=c['groups'][5]['polygons'];assert a[0]==[{'x':88,'y':55,'off':0},{'x':141,'y':55,'off':0},{'x':141,'y':59,'off':0},{'x':88,'y':59,'off':0}]
    assert b[0]==[{'x':140,'y':55,'off':0},{'x':186,'y':55,'off':0},{'x':186,'y':59,'off':0},{'x':140,'y':59,'off':0}]
    # Extra left-serif intersection lies inside the already counted shaft overlap. Right serif starts beyond every transformed left point.
    extra=clip(a[1],b[0]);assert all(F(140)<=x<=F(141)and F(55)<=y<=F(59)for x,y in extra)
    assert min(F(str(p['x']))for p in b[1])>max(F(str(p['x']))for poly in a for p in poly)
    assert F(53,50)>0;area=(F(141)-F(140))*(F(59)-F(55));assert area==4
    return {'glyph':'幷','staticCandidate':True,'groups':8,'polygons':18,'changedRawZeroBased':[1],'positiveDeterminant':'53/50','exactUnionIntersectionArea':'4','privateCoordinates':False,'engineRuns':0,'nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
