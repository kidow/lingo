import copy,hashlib,json
from pathlib import Path
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
SOURCE='docs/hanja-actual-engine-capture-u6715-hkcs-2026-10-26/engine-whole-hkcs_m6715.json';SOURCE_SHA='8154f8f413dc5b027aceec1a2d3219106ed4cda4404a1866ae740205fb91f73c'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def box(p):
    x=[F(str(q['x']))for q in p];y=[F(str(q['y']))for q in p];return[min(x),min(y),max(x),max(y)]
def separation(a,b):
    return max(F(0),a[0]-b[2],b[0]-a[2],a[1]-b[3],b[1]-a[3])
def load_candidate():
    assert sha(ROOT/SOURCE)==SOURCE_SHA
    source=json.loads((ROOT/SOURCE).read_bytes());groups=copy.deepcopy(source['groups'])
    for raw in[3,4]:
        assert groups[raw]['raw'][0]==2
        for p in groups[raw]['polygons']:
            for q in p:q['x']=float(F(str(q['x']))+F(23,10))
        for i in[3,5,7]:groups[raw]['raw'][i]=float(F(str(groups[raw]['raw'][i]))+F(23,10))
    assert all(groups[i]==source['groups'][i]for i in range(12)if i not in[3,4])
    return groups
def verify():
    source=json.loads((ROOT/SOURCE).read_bytes());groups=load_candidate();details=[]
    assert len(groups)==12 and sum(len(g['polygons'])for g in groups)==29
    assert all(q['off']==0 for g in groups for p in g['polygons']for q in p)
    for raw in[3,4]:
        old=source['groups'][raw];new=groups[raw];assert old['raw'][:3]==new['raw'][:3]
        assert [new['raw'][i]-old['raw'][i]for i in[4,6,8]]==[0,0,0]
        assert new['polygons']==[[{**q,'x':float(F(str(q['x']))+F(23,10))}for q in p]for p in old['polygons']]
        own=[box(p)for p in new['polygons']];gaps=[]
        for other,g in enumerate(groups):
            if other==raw:continue
            gaps.append({'otherRawOneBased':other+1,'lowerBoundBySeparatingAxisExact':str(min(separation(a,box(p))for a in own for p in g['polygons']))})
        assert all(F(g['lowerBoundBySeparatingAxisExact'])>0 for g in gaps)
        details.append({'sourceRawOneBased':raw+1,'mappedLogicalHypothesis':raw,'sourceQWholeTranslated':True,'polygons':len(new['polygons']),'leftVerticalGapLowerExact':next(g['lowerBoundBySeparatingAxisExact']for g in gaps if g['otherRawOneBased']==1),'rightVerticalGapLowerExact':next(g['lowerBoundBySeparatingAxisExact']for g in gaps if g['otherRawOneBased']==3),'allOtherRawStrictSeparatedByBoundingBoxes':True,'otherRawSeparationLowerBounds':gaps})
    return {'schema':'hanja-public-positive-translation-point-separation-check/v1','date':'2026-10-29','glyph':'朕','status':'PASS-source-math-only-unapproved-author-candidate','source':{'path':SOURCE,'SHA256':SOURCE_SHA},'changedRawOneBased':[4,5],'positiveMatrixExact':['1','0','0','1','23/10','0'],'determinantExact':'1','authorRule':'Translate each complete original dotP/Q+guide right23/10 public200units. Explicit minimum public right-shaft gap1; no domestic coordinates fitted, no compression or changed individual controls.','counts':{'raw':12,'sourceCalls':15,'polygons':29},'other10RawGroupsExact':True,'originalSourceFilesUnchanged':True,'originalPrimitiveFlagsPreserved':True,'originalDotShapesAndWidthsPreserved':True,'bridgePaths':0,'addedPaths':0,'engineRuns':0,'privateCoordinatesCopied':False,'dots':details,'nativeApproval':False,'canonicalMappingApproved':False,'sourceTemporalApproval':False,'runtimeApplied':False,'limits':['Positive exact separating-axis bounds on each original polygon bbox prove filled source disjointness; no claim to exact closest distance or private-pixel gap.','Directmacro-role record supports the proposed logical10 groups only; new dot placement/current/prefix4/whole needs ROOT direct review.','Source group6 has guide endpoint154,28 then next144,28; no continuous-guide or microclock-equivalence claim.','Original touching-dot HKCS HOLD remains preserved. All sourceP and Q remain unchanged in original capture.']}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
