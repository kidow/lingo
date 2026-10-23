# Focused new u727c launcher exception only. No HTTP/server, board or engine execution.
from pathlib import Path
import json,hashlib,re,copy
R=Path(__file__).resolve().parents[2]
launcher=R/'scripts/hanja-raw-static-compare.py'
source=launcher.read_text()
assert hashlib.sha256(source.encode()).hexdigest()=='17e77f57900f45e6561976bcb0bcd14ccb81f7da07046645e1bdad3e45ca83f0'
patch=(Path(__file__).parent/'launcher-u727c-zero-row.patch').read_text().splitlines(True)
i=2;future=source
while i<len(patch):
 assert patch[i].startswith('@@');i+=1;old=[];new=[]
 while i<len(patch) and not patch[i].startswith('@@'):
  line=patch[i];i+=1
  if line[0] in ' -':old.append(line[1:])
  if line[0] in ' +':new.append(line[1:])
 a=''.join(old);b=''.join(new);assert future.count(a)==1;future=future.replace(a,b,1)
assert hashlib.sha256(future.encode()).hexdigest()=='c7f2ffb34eefbdc889a1016ece7c756258542655c662d45ffa84f822d0c7387f'
env={'__file__':str(launcher),'__name__':'hanja_u727c_guard_only'}
exec(compile(future,str(launcher),'exec'),env)
config=json.loads((Path(__file__).parent/'config.json').read_text())
def check(c):
 spec=c['sourceRoots']['selected']
 env['validate_original_full5_u727c'](c,'selected',spec,R/spec['file'])
check(config)
mutations=[
 lambda c:c.update(glyph='硜'),
 lambda c:c.update(catalogStrokes=12),
 lambda c:c['sourceRoots'].update(extra=copy.deepcopy(c['sourceRoots']['selected'])),
 lambda c:c['sourceRoots']['selected'].update(root='u785c'),
 lambda c:c['sourceRoots']['selected'].update(file='docs/other/engine-whole-u727c.json'),
 lambda c:c['sourceRoots']['selected'].update(fileSHA256='0'*64),
 lambda c:c['sourceRoots']['selected'].update(proofKeys=['defaults','groups','trace']),
 lambda c:c['sourceRoots']['selected'].update(proofKind='body3-bound-to-existing-exact-full5'),
 lambda c:c['sourceRoots']['selected']['sourceProofIdentity'].update(sourceRoot='u785c'),
 lambda c:c['sourceRoots']['selected'].update(rawGroups=14),
 lambda c:c['sourceRoots']['selected'].update(drawingCalls=15),
 lambda c:c['sourceRoots']['selected'].update(polygons=31),
 lambda c:c['sourceRoots']['selected']['polygonCounts'].__setitem__(3,0),
 lambda c:c['sourceRoots']['selected'].update(nonDrawingRawRows=[{'raw':5,'sourceKind':0,'calls':0,'polygons':0}]),
 lambda c:c['inputSHA256'].update({'docs/hanja-source-raw-compare-u727c-2026-10-23/engine-whole-u727c.json':'0'*64}),
 lambda c:c['inputSHA256'].pop('docs/hanja-source-original-full-u727c-2026-10-23/engine-proof.json')
]
for mutate in mutations:
 c=copy.deepcopy(config);mutate(c)
 try:check(c)
 except (ValueError,KeyError):pass
 else:raise AssertionError('new narrowed exception accepted mutation')
line=next(l for l in future.splitlines() if "'raw/call counts required'" in l)
condition=line.split('require(',1)[1].rsplit(",'raw/call counts required')",1)[0]
base={'rawGroups':15,'drawingCalls':14}
assert eval(condition,{'spec':base,'bound_body':False,'original_u727c':True})
assert not eval(condition,{'spec':base,'bound_body':False,'original_u727c':False})
assert eval(condition,{'spec':{'rawGroups':15,'drawingCalls':15},'bound_body':False,'original_u727c':False})
assert eval(condition,{'spec':{'rawGroups':24,'drawingCalls':23},'bound_body':True,'original_u727c':False})
print(json.dumps({'focusedNewGuardFIRST1':'PASS','positivePinnedSource':1,'negativeMutations':len(mutations),'changedCountExpressionCases':4,'sourceAndAliasBytePin':'89859c169dac0332017f79e4c1b39424063e39caa95f3306d972318e0f0702db','sourceCounts':[15,14,32],'zeroRawIndex':4,'actualLauncherModified':False,'HTTP':0,'server':0,'sourceProjection':0,'engine':0}))
