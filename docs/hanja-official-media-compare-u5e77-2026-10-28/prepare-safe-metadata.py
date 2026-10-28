import importlib.util,json,re,copy,hashlib,xml.etree.ElementTree as ET
from pathlib import Path
R=Path.cwd();p=R/'scripts/hanja-official-media-compare-mm-grass.py';s=importlib.util.spec_from_file_location('g',p);g=importlib.util.module_from_spec(s);s.loader.exec_module(g)
m=json.loads((R/'docs/hanja-goal-glyphwiki-batch124-2026-09-27/metadata.json').read_bytes());spec={k:m['dictionary'][k] for k in ['url','bytes','sha256']};shared=g.load_module('fetch',g.pinned(g.BASE.SHARED));svg=shared.fetch_asset(spec);css=shared.fetch_asset(g.BASE.CSS);root=ET.fromstring(svg);rows=[]
for path in root.iter(g.BASE.NS+'path'):
 if not path.get('clip-path'):continue
 style=path.get('style','');d=re.search(r'--d:\s*(\d+)ms',style);t=re.search(r'--t:\s*(\d+)ms',style);assert d and t
 geometry=json.dumps([[k,path.get(k)]for k in g.BASE.GEOMETRY],separators=(',',':'),ensure_ascii=False).encode();rows.append({'id':path.get('id'),'class':path.get('class'),'clipPath':path.get('clip-path'),'delayMs':int(d[1]),'durationMs':int(t[1]),'pathLength':path.get('pathLength'),'inlineStyle':style,'geometrySHA256':g.sha(geometry)})
rows.sort(key=lambda r:r['delayMs']);rows=[dict(stroke=i,**v)for i,v in enumerate(rows,1)];assert len(rows)==8
safe=copy.deepcopy(rows)
for row in safe:row['inlineStyleSHA256']=g.sha(row.pop('inlineStyle').encode())
cfg={'schema':'hanja-pinned-original-media-compare/v1','glyph':'幷','sourceRoot':'u5e77-source-original','domesticClips':8,'allowedStrokes':list(range(1,9)),'defaultStroke':4,'media':{'svg':spec,'css':g.BASE.CSS},'svgRoot':dict(root.attrib),'timedPaths':rows,'metadataFile':'docs/hanja-goal-glyphwiki-batch124-2026-09-27/metadata.json','metadataSHA256':g.sha((R/'docs/hanja-goal-glyphwiki-batch124-2026-09-27/metadata.json').read_bytes()),'shared':{'path':g.BASE.SHARED,'SHA256':g.BASE.SHARED_SHA},'launcherSHA256':'0'*64,'scope':'controlled-original-media-only/no-temporal-approval','nativeApproval':False,'runtimeApplied':False,'inertOriginalScripts':[g.BASE.INERT_SCRIPT]};g.BASE.validate(cfg);g.BASE.validate_media(svg,cfg);cfg['timedPaths']=safe;print(json.dumps({'config':cfg,'safe':{'glyph':'幷','svg':spec,'svgRoot':dict(root.attrib),'timedPaths':safe,'privateSVGStylesOrCSSSaved':False,'RAMFetches':shared.FETCH_COUNT}},ensure_ascii=False))
