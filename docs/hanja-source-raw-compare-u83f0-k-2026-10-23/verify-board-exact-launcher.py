# 菰 신규 exact variant 분기와 실제 미래 wrapper 경계만 확인합니다.
from pathlib import Path
import json,hashlib,copy,sys,contextlib,io,ast
R=Path(__file__).resolve().parents[2];HERE=Path(__file__).parent;target=R/'scripts/hanja-raw-static-board.py'
source=target.read_text();assert hashlib.sha256(source.encode()).hexdigest()=='0c6263290a31237e87df3ddef4b04fceda7728ff0b2b7199ef23fa238a5a6375'
patch=(HERE/'board-u83f0-k-exact-launcher.patch').read_text().splitlines(True);i=2;future=source
while i<len(patch):
 assert patch[i].startswith('@@');i+=1;old=[];new=[]
 while i<len(patch)and not patch[i].startswith('@@'):
  line=patch[i];i+=1
  if line[0]in' -':old.append(line[1:])
  if line[0]in' +':new.append(line[1:])
 a=''.join(old);b=''.join(new);assert future.count(a)==1;future=future.replace(a,b,1)
assert hashlib.sha256(future.encode()).hexdigest()=='0d58f46b7c98476267eb8a1fe8914736fa088f60adf83eb589ed2bd3d67e770c'
def functions(s):return {n.name:ast.get_source_segment(s,n)for n in ast.parse(s).body if isinstance(n,ast.FunctionDef)}
oldf,newf=functions(source),functions(future)
assert set(newf)==set(oldf)|{'exact_u83f0_k_prepared_launcher'}
assert all(newf[k]==v for k,v in oldf.items()if k!='main')
oldline="    require(legacy_launcher or exact_u727c_new_launcher(config,base) or exact_u6705_prepared_launcher(config,base) or exact_u7c67_prepared_launcher(config,base) or exact_u7d8c_prepared_launcher(config,base) or exact_u8627_vs2_prepared_launcher(config,base), 'original launcher or exact pinned 牼 launcher required')"
newline="    require(legacy_launcher or exact_u727c_new_launcher(config,base) or exact_u6705_prepared_launcher(config,base) or exact_u7c67_prepared_launcher(config,base) or exact_u7d8c_prepared_launcher(config,base) or exact_u8627_vs2_prepared_launcher(config,base) or exact_u83f0_k_prepared_launcher(config,base), 'original launcher or exact pinned 牼 launcher required')"
assert newf['main'].replace(newline,oldline,1)==oldf['main']
env={'__file__':str(target),'__name__':'hanja_u83f0_k_future_wrapper_only'};exec(compile(future,str(target),'exec'),env)
cp=HERE/'board-config.json';c=json.loads(cp.read_text());base=json.loads((R/c['baseConfig']['path']).read_text());fn=env['exact_u83f0_k_prepared_launcher'];assert fn(c,base)
mutations=[
 lambda c,b:c['launcher'].update(SHA256='0'*64),
 lambda c,b:c['baseConfig'].update(SHA256='0'*64),
 lambda c,b:c['baseConfig'].update(path='docs/other/config.json'),
 lambda c,b:b.update(glyph='綌'),
 lambda c,b:b.update(catalogStrokes=13),
 lambda c,b:b['sourceRoots'].update(extra=copy.deepcopy(b['sourceRoots']['selected'])),
 lambda c,b:b['sourceRoots']['selected'].update(root='u83f0'),
 lambda c,b:b['sourceRoots']['selected'].update(file='docs/other/engine-whole-u83f0-k.json'),
 lambda c,b:b['sourceRoots']['selected'].update(fileSHA256='0'*64),
 lambda c,b:b['sourceRoots']['selected'].update(proofKeys=['defaults','groups','trace']),
 lambda c,b:b['sourceRoots']['selected']['sourceProofIdentity'].update(sourceRoot='u83f0'),
 lambda c,b:b['sourceRoots']['selected'].update(drawingCalls=14),
 lambda c,b:b['sourceRoots']['selected']['polygonCounts'].__setitem__(6,4)
]
for mutate in mutations:
 cc,bb=copy.deepcopy(c),copy.deepcopy(base);mutate(cc,bb);assert fn(cc,bb)is False
assert env['LAUNCHER_SHA']=='17e77f57900f45e6561976bcb0bcd14ccb81f7da07046645e1bdad3e45ca83f0'
original_fixed=env['fixed_path']
class FutureWrapperBytes:
 def __init__(self,p):self.path=p
 def read_bytes(self):return future.encode()
def future_fixed(name):
 p=original_fixed(name)
 return FutureWrapperBytes(p)if p==target else p
env['fixed_path']=future_fixed
oldargv=sys.argv[:];capture=io.StringIO()
try:
 sys.argv=[str(target),'--config',str(cp.relative_to(R)),'--config-sha',hashlib.sha256(cp.read_bytes()).hexdigest(),'--check-only']
 with contextlib.redirect_stdout(capture):env['main']()
finally:sys.argv=oldargv
records=[json.loads(l)for l in capture.getvalue().splitlines()if l.strip()]
assert len(records)==2 and records[0]['raw']=={'selected':14}
assert all(x.get('HTTP')==0 and x.get('server')==0 and x.get('engine',0)==0 for x in records)
assert records[1]['nativeApproval']is False
print(json.dumps({'newExactVariantWrapperFIRST':'PASS','newTargetPositive':1,'negativeMutations':len(mutations),'allOldFunctionBytesUnchangedExceptMainCondition':True,'oldExactBranches':sum(k.startswith('exact_')for k in oldf),'legacyPinUnchanged':True,'sharedRendererFunctionCopies':0,'actualFutureWrapperMainCheckOnly':1,'actualLauncherSHA256':hashlib.sha256((R/'scripts/hanja-raw-static-compare.py').read_bytes()).hexdigest(),'allNestedPinsPASS':True,'futureWrapperBytesRAMOnly':True,'actualWrapperModified':False,'records':records,'HTTP':0,'server':0,'sourceEngine':0,'sourceProjection':0}))
