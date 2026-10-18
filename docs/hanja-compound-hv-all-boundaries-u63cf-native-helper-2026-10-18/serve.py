"""描1082 cardinal fixture의 모든 내부 mask 경계만 추가하는 격리 wrapper."""
import argparse,ast,hashlib,json,math,sys,types
from pathlib import Path
HERE=Path(__file__).resolve().parent
V_BYTES=(HERE/'validation.json').read_bytes()
V_SHA=hashlib.sha256(V_BYTES).hexdigest()
V=json.loads(V_BYTES)
OLD=(HERE/V['delegateFolder']).resolve()
def own_guards():
 assert hashlib.sha256((HERE/'validation.json').read_bytes()).hexdigest()==V_SHA,'validation changed'
 for name,digest in V['ownFilesSHA256'].items():
  assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==digest,'wrapper file changed: '+name
 for name,digest in V['delegateFilesSHA256'].items():
  assert hashlib.sha256((OLD/name).read_bytes()).hexdigest()==digest,'cardinal delegate changed: '+name
def all_boundaries(strokes):
 result={}
 for pen,masks in enumerate(strokes,1):
  if len(masks)<2:continue
  weights=[m['weight'] for m in masks]
  assert all(isinstance(w,(int,float)) and math.isfinite(w) and w>0 for w in weights),'invalid mask weight'
  total=sum(weights);cumulative=0;values=[]
  for weight in weights[:-1]:
   cumulative+=weight;values.append(cumulative/total)
  result[pen]=values
 return result
def load_delegate():
 own_guards()
 source=(OLD/'serve.py').read_text()
 for pair in V['replacementPairs']:
  assert source.count(pair['old'])==1,'pinned cardinal UI pattern missing or ambiguous'
  source=source.replace(pair['old'],pair['new'],1)
 ast.parse(source,filename=str(OLD/'serve.py'))
 module=types.ModuleType('cardinal1082_all_boundaries_delegate')
 module.__file__=str(OLD/'serve.py')
 module.__dict__['_all_boundaries']=all_boundaries
 sys.modules[module.__name__]=module
 exec(compile(source,module.__file__,'exec'),module.__dict__)
 return module
def main():
 module=load_delegate()
 if '--check-only' in sys.argv[1:]:
  module.guards()
  target=module.CONFIG['targets']['1082']
  fixture=json.loads((OLD/'fixtures.json').read_bytes())['1082']
  values=all_boundaries(fixture['strokes'])
  assert target['root']=='u63cf-ue0102' and target['pens']==12
  assert len(fixture['strokes'])==12 and sum(map(len,fixture['strokes']))==14
  assert values=={2:[.9239717736303439],9:[.5180275480864729]}
  assert module.__file__==str(OLD/'serve.py') and module.HERE==OLD
  print(json.dumps({'passed':True,'target':'1082','originalFileAnchorPreserved':True,'delegateFiles':len(V['delegateFilesSHA256']),'ownFiles':len(V['ownFilesSHA256']),'allBoundaries':values,'wrapperPythonAST':1,'transformedDelegatePythonAST':1,'staticGuardExecutions':1,'sourceCompiles':0,'engineRuns':0,'HTTP':0,'serverStarts':0,'nativeApproval':False,'runtimeApplied':False}))
  return
 module.main()
if __name__=='__main__':main()
