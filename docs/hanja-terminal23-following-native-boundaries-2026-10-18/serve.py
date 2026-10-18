"""일곱 고정 terminal23 후보의 선택획별 모든 mask 경계 UI wrapper."""
import argparse,ast,hashlib,json,math,sys,types
from pathlib import Path
sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent
V_BYTES=(HERE/'validation.json').read_bytes();V_SHA=hashlib.sha256(V_BYTES).hexdigest();V=json.loads(V_BYTES)
def own_guards():
 assert hashlib.sha256((HERE/'validation.json').read_bytes()).hexdigest()==V_SHA,'validation changed'
 for name,digest in V['ownFilesSHA256'].items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==digest,'wrapper changed: '+name
 for entry in V['delegates'].values():
  old=(HERE/entry['folder']).resolve()
  for field in ['delegateFilesSHA256','sourceFilesSHA256']:
   for name,digest in entry[field].items():assert hashlib.sha256((old/name).read_bytes()).hexdigest()==digest,'pinned source changed: '+name
def all_boundaries(strokes):
 result={}
 for pen,masks in enumerate(strokes,1):
  if len(masks)<2:continue
  weights=[m['weight']for m in masks]
  assert all(type(w)in(int,float)and math.isfinite(w)and w>0 for w in weights),'invalid mask weight'
  total=sum(weights);assert math.isfinite(total)and total>0,'invalid total weight'
  at=0;values=[]
  for weight in weights[:-1]:
   at+=weight;value=at/total;assert math.isfinite(value)and 0<value<1,'invalid cumulative boundary';values.append(value)
  result[pen]=values
 return result
def choose_delegate(target):
 assert target in V['allowedTargets']and target in V['targets'],'unsupported target'
 key=V['targets'][target]['delegate'];assert target in V['delegates'][key]['allowedTargets'],'target outside selected capsule'
 return key
def load_delegate(key):
 own_guards();entry=V['delegates'][key];old=(HERE/entry['folder']).resolve();source=(old/'serve.py').read_text()
 for pair in entry['replacementPairs']:
  assert source.count(pair['old'])==1,'pinned UI pattern missing or ambiguous'
  source=source.replace(pair['old'],pair['new'],1)
 module=types.ModuleType('terminal23_following_'+key);module.__file__=str(old/'serve.py');module.__dict__['_all_boundaries']=all_boundaries
 sys.modules[module.__name__]=module;exec(compile(source,module.__file__,'exec'),module.__dict__)
 original_guards=module.guards
 def combined_guards():own_guards();original_guards()
 module.guards=combined_guards
 return module,old
def main():
 parser=argparse.ArgumentParser(add_help=False);parser.add_argument('--target',default='1000');known,unused=parser.parse_known_args();key=choose_delegate(known.target)
 if '--check-only'in sys.argv[1:]:
  ast.parse((HERE/'serve.py').read_text(),filename=str(HERE/'serve.py'))
  own_guards();maps={};counts={};original_anchors=True;source_paths=set()
  for delegate_key,entry in V['delegates'].items():
   module,old=load_delegate(delegate_key);module.guards();fixtures=json.loads((old/'fixtures.json').read_bytes())
   assert sorted(module.CONFIG['targets'])==sorted(entry['allowedTargets'])
   original_anchors=original_anchors and module.__file__==str(old/'serve.py')and module.HERE==old
   for name in entry['sourceFilesSHA256']:source_paths.add(str((old/name).resolve()))
   for target in entry['allowedTargets']:
    assert choose_delegate(target)==delegate_key;t=V['targets'][target];raw=module.CONFIG['targets'][target];strokes=fixtures[target]['strokes']
    assert raw['identity']==t['identity']and raw['fullProofSHA256']==t['fullProofSHA256']and raw['proofKeys']==t['proofKeys']
    assert raw['dictionary']['clips']==t['domesticClips']==t['catalogStrokes']
    maps[target]=all_boundaries(strokes);expected={int(p):values for p,values in t['allBoundaries'].items()};assert maps[target]==expected
    counts[target]=[len(strokes),sum(map(len,strokes)),sum(m['outline'].count('M')for pen in strokes for m in pen)];assert counts[target]==t['counts']
  assert original_anchors and len(source_paths)==V['uniqueOriginalSourcePins']
  rejected=0
  def must_reject(fn):
   try:fn()
   except AssertionError:return 1
   raise AssertionError('invalid case accepted')
  rejected+=must_reject(lambda:choose_delegate('unknown'))
  rejected+=must_reject(lambda:all_boundaries([[{'weight':float('nan')},{'weight':1}]]))
  saved=V['ownFilesSHA256'];bad=dict(saved);bad[next(iter(bad))]='0'*64;V['ownFilesSHA256']=bad
  try:rejected+=must_reject(own_guards)
  finally:V['ownFilesSHA256']=saved
  for entry in V['delegates'].values():
   for field in ['delegateFilesSHA256','sourceFilesSHA256']:
    saved=entry[field];bad=dict(saved);bad[next(iter(bad))]='0'*64;entry[field]=bad
    try:rejected+=must_reject(own_guards)
    finally:entry[field]=saved
  assert rejected==7
  own_guards()
  print(json.dumps({'passed':True,'targets':V['allowedTargets'],'allBoundaries':maps,'counts':counts,'wrapperPythonASTExecutions':1,'transformedDelegateLoads':2,'staticGuardExecutions':1,'inMemoryNegativeRejections':rejected,'originalSourcePins':len(source_paths),'delegateCapsulePins':16,'ownPins':2,'originalFileAnchorPreserved':original_anchors,'requestGuardsIncludeOwnAndOriginal':True,'sourceCompiles':0,'engineRuns':0,'HTTP':0,'serverStarts':0,'nativeApproval':False,'runtimeApplied':False}));return
 module,old=load_delegate(key);module.main()
if __name__=='__main__':main()
