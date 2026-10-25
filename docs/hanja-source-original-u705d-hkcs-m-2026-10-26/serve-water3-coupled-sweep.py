from pathlib import Path
import sys,argparse,json,hashlib,re,copy,runpy
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2]
MANIFEST="docs/hanja-source-original-u705d-hkcs-m-2026-10-26/water3-coupled-sweep-input.json"
def sha(b):return hashlib.sha256(b).hexdigest()
def require(v,m):
 if not v:raise ValueError(m)
def read(p):
 q=Path(p);require(not q.is_absolute()and'..'not in q.parts,'relative repository source only');r=(ROOT/q).resolve();require(r.is_relative_to(ROOT)and r==ROOT/q and r.is_file(),'exact source file only');return r.read_bytes()
p=argparse.ArgumentParser();p.add_argument('--manifest',required=True);p.add_argument('--manifest-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');a=p.parse_args()
require(__debug__ and sys.flags.optimize==0 and a.manifest==MANIFEST and 0<=a.port<=65535,'exact local comparison arguments required')
b=read(a.manifest);require(sha(b)==a.manifest_sha,'manifest changed');M=json.loads(b);require(M['schema']=='hanja-source-original-coupled-sweep-input/v1' and M['glyph']=='灝' and M['nativeApproval']is False and M['runtimeApplied']is False,'unapproved source comparison only')
for f,h in M['inputSHA256'].items():require(sha(read(f))==h,'pinned comparison source changed: '+f)
require(sha(Path(__file__).read_bytes())==M['launcherSHA256'],'launcher changed')
scene=read(M['scene']).decode();styles=re.findall(r'<style>(.*?)</style>',scene,re.S);bodies=re.findall(r'<body>(.*?)</body>',scene,re.S);require(len(styles)==len(bodies)==1,'exact one candidate style/body')
require(scene.count('data-water-source=')==9 and 'fetch('not in scene and 'XMLHttpRequest'not in scene,'fixed public P9/no source requests required')
mod=runpy.run_path(str(ROOT/M['originalHelper']));g=mod['main'].__globals__;old=g['page'];layout='<style>body{max-width:none}#sweep-comparison{display:grid;grid-template-columns:540px 540px;gap:20px;width:max-content}#publisher-side{width:540px}</style>'
def comparison(config,svg_route):
 require(config['glyph']=='灝' and config['sourceRoot']=='u705d-hkcs-m' and config['allowedStrokes']==list(range(1,25)),'exact original24 base required')
 c=copy.deepcopy(config);c['allowedStrokes']=[3];c['defaultStroke']=3;g['validate'](c)
 original=old(c,svg_route).decode();require(original.count('<h1>')==1 and original.count('<script>')==1 and original.endswith('</html>'),'unchanged original page hooks')
 header,tail=original.split('<script>',1);head=header.replace('<h1>','<div id="sweep-comparison"><section id="publisher-side"><h1>',1);head=head.replace('</style>','</style>'+layout+'<style>'+styles[0]+'</style>',1)
 result=head+'</section>'+bodies[0]+'</div><script>'+tail
 inverse=result.replace('</section>'+bodies[0]+'</div><script>','<script>',1).replace('<div id="sweep-comparison"><section id="publisher-side"><h1>','<h1>',1).replace(layout+'<style>'+styles[0]+'</style>','',1)
 require(inverse==original,'candidate wrapper changed original clock/page bytes')
 return result.encode()
g['page']=comparison
print(json.dumps(dict(candidate='灝 single author counter',originalControlSubset=[3],originalClockCopied=False,privateGeometrySaved=False,newEngine=0,sourceProjection=0,serverStarts=0)),flush=True)
sys.argv=[str(ROOT/M['originalHelper']),'--config',M['originalConfig'],'--config-sha',M['originalConfigSHA256'],'--port',str(a.port)]+(['--check-only']if a.check_only else[])
mod['main']()
