# New exact wrapper exception and actual future --check-only path. No HTTP/engine/server.
from pathlib import Path
import json,hashlib,copy,sys,contextlib,io
R=Path(__file__).resolve().parents[2];HERE=Path(__file__).parent;target=R/'scripts/hanja-raw-static-board.py'
source=target.read_text();assert hashlib.sha256(source.encode()).hexdigest()=='216010a6a245deac329f8737de8e5644d90872dac8af95f20c2056af3b6e63b3'
patch=(HERE/'board-u727c-new-launcher.patch').read_text().splitlines(True);i=2;future=source
while i<len(patch):
 assert patch[i].startswith('@@');i+=1;old=[];new=[]
 while i<len(patch)and not patch[i].startswith('@@'):
  line=patch[i];i+=1
  if line[0]in' -':old.append(line[1:])
  if line[0]in' +':new.append(line[1:])
 a=''.join(old);b=''.join(new);assert future.count(a)==1;future=future.replace(a,b,1)
futureSHA=hashlib.sha256(future.encode()).hexdigest();assert futureSHA=='45135b691f4807dd8277571ac069fe7bb8e64495a1f7b2285d983c8d62634933'
env={'__file__':str(target),'__name__':'hanja_u727c_future_wrapper_only'};exec(compile(future,str(target),'exec'),env)
cp=HERE/'board-config.json';c=json.loads(cp.read_text());b=json.loads((R/c['baseConfig']['path']).read_text());fn=env['exact_u727c_new_launcher'];assert fn(c,b)
mutations=[
 lambda c,b:c['launcher'].update(SHA256='0'*64),
 lambda c,b:c['launcher'].update(path='scripts/other.py'),
 lambda c,b:c['baseConfig'].update(SHA256='0'*64),
 lambda c,b:c['baseConfig'].update(path='docs/other/config.json'),
 lambda c,b:b.update(glyph='硜'),
 lambda c,b:b.update(catalogStrokes=12),
 lambda c,b:b['sourceRoots'].update(extra=copy.deepcopy(b['sourceRoots']['selected'])),
 lambda c,b:b['sourceRoots']['selected'].update(root='u785c'),
 lambda c,b:b['sourceRoots']['selected'].update(file='docs/other/engine-whole-u727c.json'),
 lambda c,b:b['sourceRoots']['selected'].update(fileSHA256='0'*64),
 lambda c,b:b['sourceRoots']['selected'].update(proofKind='body3-bound-to-existing-exact-full5'),
 lambda c,b:b['sourceRoots']['selected'].update(proofKeys=['defaults','groups','trace']),
 lambda c,b:b['sourceRoots']['selected'].update(rawGroups=14),
 lambda c,b:b['sourceRoots']['selected'].update(drawingCalls=15),
 lambda c,b:b['sourceRoots']['selected'].update(polygons=31),
 lambda c,b:b['sourceRoots']['selected']['polygonCounts'].__setitem__(3,0),
 lambda c,b:b.update(launcherSHA256='0'*64)
]
for mutate in mutations:
 cc,bb=copy.deepcopy(c),copy.deepcopy(b);mutate(cc,bb);assert fn(cc,bb)is False
assert env['LAUNCHER_SHA']=='17e77f57900f45e6561976bcb0bcd14ccb81f7da07046645e1bdad3e45ca83f0'
# Only the not-yet-applied wrapper bytes are supplied from RAM. All launcher/base/shared/source pins use actual files.
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
records=[json.loads(line)for line in capture.getvalue().splitlines()if line.strip()]
assert len(records)==2 and all(x.get('server')==0 and x.get('HTTP')==0 and x.get('engine',0)==0 for x in records)
assert records[0]['raw']=={'selected':15} and records[0]['sourceCompiler']==0
assert records[1]['nativeApproval']is False
print(json.dumps({'newWrapperGuardFIRST1':'PASS','newExceptionPositive':1,'negativeMutations':len(mutations),'legacyHashUnchanged':True,'actualFutureWrapperMainCheckOnly':1,'actualLauncherMainCheckOnly':1,'allNestedPinsPASS':True,'futureWrapperBytesFromRAMOnly':True,'actualWrapperModified':False,'actualLauncherSHA256':hashlib.sha256((R/'scripts/hanja-raw-static-compare.py').read_bytes()).hexdigest(),'records':records,'HTTP':0,'server':0,'engine':0,'projection':0}))
