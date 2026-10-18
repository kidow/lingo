#!/usr/bin/env python3
"""Exact-pinned Q7 delegate with all internal-mask boundary controls only."""
import ast,hashlib,json,sys,types
from pathlib import Path
HERE=Path(__file__).resolve().parent
V_BYTES=(HERE/'validation.json').read_bytes();V_SHA=hashlib.sha256(V_BYTES).hexdigest();V=json.loads(V_BYTES)
OLD=(HERE/V['delegateFolder']).resolve()
def own_guards():
    assert hashlib.sha256((HERE/'validation.json').read_bytes()).hexdigest()==V_SHA,'validation changed'
    for name,digest in V['ownFilesSHA256'].items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==digest,'new helper changed: '+name
    for name,digest in V['delegateFilesSHA256'].items():assert hashlib.sha256((OLD/name).read_bytes()).hexdigest()==digest,'original Q7 changed: '+name
def all_boundaries(strokes):
    result={}
    for i,pen in enumerate(strokes):
        if len(pen)<2:continue
        weights=[m['weight']for m in pen];total=sum(weights)
        assert all(w>0 for w in weights)and total>0,'nonpositive mask weight'
        result[i+1]=[sum(weights[:j])/total for j in range(1,len(weights))]
    return result
def load_delegate():
    own_guards();source=(OLD/'serve.py').read_text()
    for pair in V['replacementPairs']:
        assert source.count(pair['old'])==1,'pinned UI pattern missing or ambiguous'
        source=source.replace(pair['old'],pair['new'],1)
    ast.parse(source)
    module=types.ModuleType('q7_all_boundaries_delegate');module.__file__=str(OLD/'serve.py');module.__dict__['_all_boundaries']=all_boundaries
    sys.modules[module.__name__]=module;exec(compile(source,module.__file__,'exec'),module.__dict__)
    original_guards=module.guards
    def combined_guards():own_guards();original_guards()
    module.guards=combined_guards
    return module
def main():
    module=load_delegate()
    if '--check-only'in sys.argv:
        module.guards();fixtures=json.loads((OLD/'fixtures.json').read_bytes());maps={key:all_boundaries(f['strokes'])for key,f in fixtures.items()}
        assert set(maps['719'])=={3,9};assert set(maps['720'])=={1,2,12}
        assert maps['719'][3]==[.38431032490312805]
        assert maps['720'][1]==[.5367060031053901]and maps['720'][2]==[.5883777707055957]
        print(json.dumps({'staticGuards':True,'allBoundaries':maps,'sourceCompiles':0,'engineRuns':0,'serverStarts':0,'originalFileAnchor':str(OLD/'serve.py'),'nativeApproval':False,'runtimeApplied':False}));return
    module.main()
if __name__=='__main__':main()
