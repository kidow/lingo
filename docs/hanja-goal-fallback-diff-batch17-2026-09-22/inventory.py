import json,urllib.request,subprocess,gzip,hashlib,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).resolve().parents[2];rev='7a74e442c4130cccc226a7e7c2b683ac94c0cccb'
url='https://api.github.com/repos/tegaki/tegaki/git/trees/'+rev+'?recursive=1'
with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'lingo-review'})) as r:raw=r.read()
tree=json.loads(raw);assert not tree['truncated']
applied=set(json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {HANJA_STROKES} from './lib/hanja-strokes.ts';console.log(JSON.stringify(HANJA_STROKES.map(e=>e.glyph)))"],cwd=root)))
chars=[c for p in (root/'content/hanja/characters').glob('*.json') for c in json.loads(p.read_text())['characters']];missing={c['glyph']:c for c in chars if c['glyph'] not in applied}
groups={};selected=[]
for e in tree['tree']:
 p=e['path']
 if not p.startswith('tegaki-lab/data/') or not(p.endswith('.xml') or p.endswith('.xml.gz')):continue
 group='/'.join(p.split('/')[:4]);groups[group]=groups.get(group,0)+1
 try:g=chr(int(p.split('/')[-1].split('.')[0]))
 except ValueError:continue
 if g in missing:selected.append({'glyph':g,'grade':missing[g]['readingGrade'],'catalogStrokes':missing[g]['strokes'],'path':p,'bytes':e['size'],'blobSha1':e['sha']})
print(json.dumps({'date':'2026-09-22','revision':rev,'treeUrl':url,'treeSha256':hashlib.sha256(raw).hexdigest(),'groups':groups,'matchingFiles':len(selected),'matchingGlyphs':len(set(e['glyph'] for e in selected)),'first':selected[:10],'licenseFiles':[e['path'] for e in tree['tree'] if any(s in e['path'] for s in ['COPYRIGHT','COPYING','README','LGPL']) and ('tegaki-lab' in e['path'] or 'tegaki-models' in e['path'])]},ensure_ascii=False))
