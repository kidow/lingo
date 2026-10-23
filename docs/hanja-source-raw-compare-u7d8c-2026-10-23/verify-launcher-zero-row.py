# Focused new original u7d8c sparse full5 guard only; no source engine/HTTP/server.
from pathlib import Path
import json,hashlib,copy
R=Path(__file__).resolve().parents[2];HERE=Path(__file__).parent
launcher=R/'scripts/hanja-raw-static-compare.py'
source=launcher.read_text();assert hashlib.sha256(source.encode()).hexdigest()=='c7f2ffb34eefbdc889a1016ece7c756258542655c662d45ffa84f822d0c7387f'
patch=(HERE/'launcher-u7d8c-zero-row.patch').read_text().splitlines(True)
i=2;future=source
while i<len(patch):
 assert patch[i].startswith('@@');i+=1;old=[];new=[]
 while i<len(patch)and not patch[i].startswith('@@'):
  line=patch[i];i+=1
  if line[0]in' -':old.append(line[1:])
  if line[0]in' +':new.append(line[1:])
 a=''.join(old);b=''.join(new);assert future.count(a)==1;future=future.replace(a,b,1)
assert hashlib.sha256(future.encode()).hexdigest()=='bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2'
env={'__file__':str(launcher),'__name__':'hanja_u7d8c_new_guard_only'};exec(compile(future,str(launcher),'exec'),env)
config=json.loads((HERE/'config.json').read_text())
assert hashlib.sha256((HERE/'config.json').read_bytes()).hexdigest()=='fcc0ef1aec732f5fb3bf0b71ca806d9cb5fd3ee7b54032fe2127b0d52e3a99d3'
def check(c):
 s=c['sourceRoots']['selected'];env['validate_original_full5_u7d8c'](c,'selected',s,R/s['file'])
check(config)
mutations=[
 lambda c:c.update(glyph='牼'),
 lambda c:c.update(catalogStrokes=11),
 lambda c:c['sourceRoots'].update(extra=copy.deepcopy(c['sourceRoots']['selected'])),
 lambda c:c['sourceRoots']['selected'].update(root='u7d8c-ue0100'),
 lambda c:c['sourceRoots']['selected'].update(file='docs/other/engine-whole-u7d8c.json'),
 lambda c:c['sourceRoots']['selected'].update(fileSHA256='0'*64),
 lambda c:c['sourceRoots']['selected'].update(proofKeys=['defaults','groups','trace']),
 lambda c:c['sourceRoots']['selected'].update(proofKind='body3-bound-to-existing-exact-full5'),
 lambda c:c['sourceRoots']['selected']['sourceProofIdentity'].update(sourceRoot='u727c'),
 lambda c:c['sourceRoots']['selected'].update(rawGroups=16),
 lambda c:c['sourceRoots']['selected'].update(drawingCalls=17),
 lambda c:c['sourceRoots']['selected'].update(polygons=33),
 lambda c:c['sourceRoots']['selected']['polygonCounts'].__setitem__(8,1),
 lambda c:c['sourceRoots']['selected'].update(nonDrawingRawRows=[{'raw':9,'sourceKind':0,'calls':0,'polygons':0}]),
 lambda c:c['inputSHA256'].update({'docs/hanja-source-raw-compare-u7d8c-2026-10-23/engine-whole-u7d8c.json':'0'*64}),
 lambda c:c['inputSHA256'].pop('docs/hanja-source-original-full-u7d8c-2026-10-23/engine-proof.json')
]
for mutate in mutations:
 c=copy.deepcopy(config);mutate(c)
 try:check(c)
 except (ValueError,KeyError):pass
 else:raise AssertionError('new exact sparse guard accepted mutation')
line=next(l for l in future.splitlines()if "'raw/call counts required'"in l)
condition=line.split('require(',1)[1].rsplit(",'raw/call counts required')",1)[0]
def allowed(spec,**kw):return eval(condition,{'spec':spec,'bound_body':False,'original_u727c':False,'original_u7d8c':False,**kw})
assert allowed({'rawGroups':17,'drawingCalls':16},original_u7d8c=True)
assert not allowed({'rawGroups':17,'drawingCalls':16})
assert allowed({'rawGroups':17,'drawingCalls':17})
assert allowed({'rawGroups':15,'drawingCalls':14},original_u727c=True)
assert allowed({'rawGroups':24,'drawingCalls':23},bound_body=True)
assert not allowed({'rawGroups':24,'drawingCalls':22},bound_body=True)
# Newly prepared original-media metadata only, without replaying or refetching source media.
od=R/'docs/hanja-official-media-compare-u7d8c-2026-10-23'
c=json.loads((od/'config.json').read_text());m=json.loads((od/'metadata.json').read_text())
assert c['metadataSHA256']==hashlib.sha256((od/'metadata.json').read_bytes()).hexdigest()
assert c['domesticClips']==13 and c['allowedStrokes']==list(range(1,14)) and len(c['timedPaths'])==13
assert all(c['timedPaths'][i]['stroke']==i+1 for i in range(13))
assert [p['clipPath']for p in c['timedPaths']]==m['originalTimeline']['delayOrderedClipOrder']
assert c['media']['svg']['sha256']=='0dec56e3b11aed01c6a949d0b0b99a4abe8dcc3b7d439789b8d7820525b2e82f'
assert c['shared']['SHA256']==hashlib.sha256((R/c['shared']['path']).read_bytes()).hexdigest()
assert c['launcherSHA256']==hashlib.sha256((R/'scripts/hanja-official-media-compare.py').read_bytes()).hexdigest()
assert c['nativeApproval']is False and m['nativeApproval']is False
print(json.dumps({'newGuardFIRST1':'PASS','positivePinnedFull5':1,'negativeMutations':len(mutations),'countExpressionCases':6,'officialMetadata13':True,'futureLauncherSHA256':'bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2','baseConfigSHA256':'fcc0ef1aec732f5fb3bf0b71ca806d9cb5fd3ee7b54032fe2127b0d52e3a99d3','actualLauncherModified':False,'sourceCounts':[17,16,34],'zeroRawIndex':8,'actualWrapperCheckPending':True,'HTTP':0,'server':0,'engine':0,'sourceProjection':0,'nativeScreens':0}))
