import copy,hashlib,importlib.util,json
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
OLD=HERE/'materialize-draft.py';OLD_SHA='96df68095b7605d7470bfbba3edc6b0ba86c386cbafe412b1dc4cb5a80990280'
RECIPE_SHA='d8d07e26cc712273fe63e851c7a1b4e823c501ea124e2fc6c3c2b776ad8dce6e'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(OLD)==OLD_SHA
s=importlib.util.spec_from_file_location('bing_original_upper_candidate',OLD);base=importlib.util.module_from_spec(s);s.loader.exec_module(base)
def load_candidate():
    assert sha(HERE/'recipe-rising-v2.json')==RECIPE_SHA
    r=json.loads((HERE/'recipe-rising-v2.json').read_bytes());previous=base.load_candidate();c=copy.deepcopy(previous)
    assert r['risingMatrixExact']==['1','-1/3','0','1','0','86/3'] and r['changedRawZeroBased']==[1,2]
    g=c['groups'][2];assert g['raw'][:3]==[1,0,200] and g['raw'][3:7]==[86,114,140,114]
    for poly in g['polygons']:
        for q in poly:q['y']=float(F(str(q['y']))-(F(str(q['x']))-86)/3)
    for xi,yi in [(3,4),(5,6)]:g['raw'][yi]=float(F(str(g['raw'][yi]))-(F(str(g['raw'][xi]))-86)/3)
    assert all(c['groups'][i]==previous['groups'][i]for i in range(8)if i!=2)
    c.update(candidateId=r['candidateId'],changedRawZeroBased=[1,2],matricesByRawOneBased={'2':previous['matrixExact'],'3':r['risingMatrixExact']},logicalRawGroupsZeroBased=[[i]for i in range(8)])
    assert all(q['off']==0 for g in c['groups']for p in g['polygons']for q in p)
    assert not c['originalRoot']and not c['isOriginalEngineCapture']and not any(c['approval'].values())
    assert sha(HERE/'fixtures-rising-v2.json')=='26639f101987866ebc068662de81d9d576c0ef726d8a0e465672f9ac14a97172' and c==json.loads((HERE/'fixtures-rising-v2.json').read_bytes())
    return c
def verify():
    old=base.verify();c=load_candidate();original=json.loads((ROOT/base.SOURCE).read_bytes())
    assert [i for i in range(8)if c['groups'][i]!=original['groups'][i]]==[1,2]
    assert c['groups'][2]['raw'][3:7]==[86,114,140,96] and c['groups'][2]['raw'][:3]==original['groups'][2]['raw'][:3]
    left=c['groups'][2]['polygons'];right=c['groups'][6]['polygons']
    maxx=max(F(str(q['x']))for p in left for q in p);minx=min(F(str(q['x']))for p in right for q in p);assert minx-maxx==3
    assert len(c['groups'])==8 and sum(len(g['polygons'])for g in c['groups'])==18
    return {**old,'changedRawZeroBased':[1,2],'other6GroupsExact':True,'risingMatrixExact':['1','-1/3','0','1','0','86/3'],'risingDeterminantExact':'1','leftGuideAnchor':[86,114],'rightGuideEnd':[140,96],'lowerPairStrictXGap':'3','logicalOrder':'identity1..8','nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
