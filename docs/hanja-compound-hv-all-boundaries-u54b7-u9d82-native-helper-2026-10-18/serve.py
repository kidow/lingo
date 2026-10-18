"""咷1101·鶂1105의 원cardinal fixture를 보존한 모든mask경계 UI wrapper."""
import ast,hashlib,json,math,sys,types
from pathlib import Path
HERE=Path(__file__).resolve().parent
V_BYTES=(HERE/'validation.json').read_bytes();V_SHA=hashlib.sha256(V_BYTES).hexdigest();V=json.loads(V_BYTES)
OLD=(HERE/V['delegateFolder']).resolve()
def own_guards():
 assert hashlib.sha256((HERE/'validation.json').read_bytes()).hexdigest()==V_SHA,'validation changed'
 for name,digest in V['ownFilesSHA256'].items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==digest,'wrapper file changed: '+name
 for name,digest in V['delegateFilesSHA256'].items():assert hashlib.sha256((OLD/name).read_bytes()).hexdigest()==digest,'cardinal delegate changed: '+name
def all_boundaries(strokes):
 result={}
 for pen,masks in enumerate(strokes,1):
  if len(masks)<2:continue
  weights=[m['weight']for m in masks]
  assert all(type(w)in(int,float)and math.isfinite(w)and w>0 for w in weights),'invalid mask weight'
  total=sum(weights);cumulative=0;values=[]
  for weight in weights[:-1]:cumulative+=weight;values.append(cumulative/total)
  result[pen]=values
 return result
def load_delegate():
 own_guards();source=(OLD/'serve.py').read_text()
 for pair in V['replacementPairs']:
  assert source.count(pair['old'])==1,'pinned cardinal UI pattern missing or ambiguous'
  source=source.replace(pair['old'],pair['new'],1)
 ast.parse(source,filename=str(OLD/'serve.py'))
 module=types.ModuleType('cardinal1101_1105_all_boundaries_delegate');module.__file__=str(OLD/'serve.py');module.__dict__['_all_boundaries']=all_boundaries
 sys.modules[module.__name__]=module;exec(compile(source,module.__file__,'exec'),module.__dict__)
 original_guards=module.guards
 def combined_guards():own_guards();original_guards()
 module.guards=combined_guards
 return module
def main():
 module=load_delegate()
 if '--check-only'in sys.argv[1:]:
  module.guards();fixtures=json.loads((OLD/'fixtures.json').read_bytes());maps={key:all_boundaries(fixtures[key]['strokes'])for key in V['allowedTargets']}
  assert V['allowedTargets']==['1101','1105']
  assert maps=={'1101':{2:[.28311234154159987],7:[.8839649470915434]},'1105':{7:[.874627941176784],15:[.2391773075284366],19:[.7846074189338144]}}
  for key,expected in [('1101',(9,11,27)),('1105',(19,22,43))]:
   strokes=fixtures[key]['strokes'];actual=(len(strokes),sum(map(len,strokes)),sum(m['outline'].count('M')for pen in strokes for m in pen));assert actual==expected
   assert module.CONFIG['targets'][key]['dictionary']['clips']==expected[0]
  assert module.__file__==str(OLD/'serve.py')and module.HERE==OLD
  negative_rejections=0
  for field in ['ownFilesSHA256','delegateFilesSHA256']:
   saved=V[field];mutated=dict(saved);first=next(iter(mutated));mutated[first]='0'*64;V[field]=mutated
   try:
    own_guards()
   except AssertionError:negative_rejections+=1
   else:raise AssertionError('in-memory pin drift accepted')
   finally:V[field]=saved
  assert negative_rejections==2
  module.guards()
  print(json.dumps({'passed':True,'targets':V['allowedTargets'],'allBoundaries':maps,'wrapperPythonAST':1,'transformedDelegatePythonAST':1,'staticGuardExecutions':1,'inMemoryPinDriftRejections':negative_rejections,'delegatePins':8,'ownPins':2,'originalFileAnchorPreserved':True,'requestGuardsIncludeOwnAndOriginal':True,'sourceCompiles':0,'engineRuns':0,'HTTP':0,'serverStarts':0,'nativeApproval':False,'runtimeApplied':False}));return
 module.main()
if __name__=='__main__':main()
