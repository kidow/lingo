#!/usr/bin/env python3
"""Print two pinned temporal configurations; HTTP bodies stay in RAM, server and media files are never created."""
import sys
sys.dont_write_bytecode = True
import hashlib, importlib.util, json, re
from pathlib import Path
import xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[2]
def sha(b):return hashlib.sha256(b).hexdigest()
def load(name,rel):
 spec=importlib.util.spec_from_file_location(name,ROOT/rel);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
launcher='scripts/hanja-official-media-compare.py'; shared='scripts/hanja-official-media-review.py'
expected=json.loads((ROOT/'docs/hanja-official-media-compare-u61f0-2026-10-23/config.json').read_text())
assert sha((ROOT/launcher).read_bytes())==expected['launcherSHA256']
assert sha((ROOT/shared).read_bytes())==expected['shared']['SHA256']
L=load('u7c67_u8627_temporal_launcher',launcher);M=load('u7c67_u8627_pinned_fetch',shared)
css=M.fetch_asset(L.CSS)
results=[]
for batch,code,glyph,source_root,pens in [(414,'u7c67','籧','u7c67',23),(415,'u8627','蘧','u8627-ue0102',21)]:
 original=f'docs/hanja-goal-glyphwiki-batch{batch}-2026-10-09'
 old_path=original+'/metadata.json';old_bytes=(ROOT/old_path).read_bytes();old=json.loads(old_bytes)
 pin={k:old['dictionary'][k]for k in ['url','bytes','sha256']}
 svg=M.fetch_asset(pin);root=ET.fromstring(svg);rows=[]
 for node in root.iter(L.NS+'path'):
  if not node.get('clip-path'):continue
  style=node.get('style','');d=re.search(r'--d:\s*(\d+)ms',style);t=re.search(r'--t:\s*(\d+)ms',style)
  assert d and t
  geometry=json.dumps([[k,node.get(k)]for k in L.GEOMETRY],separators=(',',':'),ensure_ascii=False).encode()
  rows.append({'id':node.get('id'),'class':node.get('class'),'clipPath':node.get('clip-path'),'delayMs':int(d[1]),'durationMs':int(t[1]),'pathLength':node.get('pathLength'),'inlineStyle':style,'geometrySHA256':sha(geometry)})
 rows.sort(key=lambda r:r['delayMs']);timed=[dict(stroke=i,**row)for i,row in enumerate(rows,1)]
 assert len(timed)==pens==old['candidate']['strokes']
 folder=f'docs/hanja-official-media-compare-{code}-2026-10-23'
 hold_path=original+'/review.json';hold_bytes=(ROOT/hold_path).read_bytes();hold=json.loads(hold_bytes)
 metadata={'schema':'hanja-official-media-preparation/v1','glyph':glyph,'date':'2026-10-23','candidate':old['candidate'],'dictionary':dict(pin,clips=pens),'existingMetadataFile':old_path,'existingMetadataSHA256':sha(old_bytes),'scope':'Original full timeline pinned for future browser direction review; no old cumulative observation is promoted to direction PASS.','oldCumulativeEvidence':{'path':hold_path,'SHA256':sha(hold_bytes),'reportedDomesticPens':hold['domesticStrokesReviewed'],'oldHOLDRetained':True,'temporalDirectionApproved':False,'examBodyApproval':False},'sourceContextRoot':source_root,'originalTimeline':timed,'reviewPlan':{'firstAllowlist':list(range(1,17)),'remainingStrokes':list(range(17,pens+1)),'remainderRequiresNewPinnedConfig':True,'changedIndependentQBLogicalPen':pens,'oldDirectionScopesReused':0},'originalSourceGate':{'svgRequestsThisCandidate':1,'sharedCSSFetchesThisPair':1,'pairTotalHTTPRequests':3,'mediaBytesStored':0,'scriptsExecuted':0,'nativeDirectionReviewed':False,'nativeApproval':False,'runtimeApplied':False}}
 metadata_text=json.dumps(metadata,ensure_ascii=False,indent=2)+'\n'
 config={'schema':'hanja-pinned-original-media-compare/v1','glyph':glyph,'sourceRoot':source_root,'domesticClips':pens,'allowedStrokes':list(range(1,17)),'defaultStroke':1,'media':{'svg':pin,'css':L.CSS},'svgRoot':dict(root.attrib),'timedPaths':timed,'metadataFile':folder+'/metadata.json','metadataSHA256':sha(metadata_text.encode()),'shared':{'path':shared,'SHA256':sha((ROOT/shared).read_bytes())},'launcherSHA256':sha((ROOT/launcher).read_bytes()),'inertOriginalScripts':[L.INERT_SCRIPT],'scope':'controlled-original-media-only/no-temporal-approval','nativeApproval':False,'runtimeApplied':False}
 L.validate(config);L.validate_media(svg,config)
 config_text=json.dumps(config,ensure_ascii=False,indent=2)+'\n'
 results.append({'folder':folder,'metadataText':metadata_text,'configText':config_text,'configSHA256':sha(config_text.encode()),'metadataSHA256':sha(metadata_text.encode()),'svg':pin,'timelineCount':len(timed),'selectedStrokes':config['allowedStrokes']})
assert M.FETCH_COUNT==3
print(json.dumps({'results':results,'HTTPRequests':M.FETCH_COUNT,'mediaBytesStored':0,'server':0,'SSR':0,'nativeDirectionReviewed':False},ensure_ascii=False))
