import json,urllib.request,hashlib,re,xml.etree.ElementTree as ET,concurrent.futures
from pathlib import Path
root=Path(__file__).resolve().parents[2]
source=json.loads((root/'docs/hanja-goal-alternative-corpora-batch16-2026-09-22/sources.json').read_text())
paths=source['fallback']['matchingPaths']
repos=[('Connum/hanzivg','55ecef6a881d5120cd261587d668e1b6af843ec2'),('KanjiVG/kanjivg','422b5538595676da918c288a4230cb5e22a1ee7e')]
def receive(repo,rev,path):
 url='https://raw.githubusercontent.com/'+repo+'/'+rev+'/'+path
 with urllib.request.urlopen(url,timeout=25) as r:raw=r.read()
 xml=ET.fromstring(raw);paths=[p.attrib['d'] for p in xml.iter('{http://www.w3.org/2000/svg}path') if '-s' in p.attrib.get('id','')]
 return {'url':url,'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'strokes':len(paths)},paths
def tokens(path):
 return [float(v) if re.match(r'^[+\-.\d]',v) else v for v in re.findall(r'[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?',path)]
def one(path):
 try:
  old,op=receive(*repos[0],path);new,np=receive(*repos[1],path)
  different=[i+1 for i in range(max(len(op),len(np))) if i>=len(op) or i>=len(np) or tokens(op[i])!=tokens(np[i])]
  return {'glyph':chr(int(path.split('/')[-1].split('-')[0].split('.')[0],16)),'path':path,'hanziVG':old,'kanjiVG':new,'changedStrokes':different,'tokenIdentical':not different}
 except Exception as exc:return {'path':path,'error':str(exc)}
entries=list(concurrent.futures.ThreadPoolExecutor(max_workers=8).map(one,paths))
print(json.dumps({'date':'2026-09-22','files':len(entries),'tokenIdentical':sum(e.get('tokenIdentical',False) for e in entries),'errors':[e for e in entries if 'error' in e],'changed':[e for e in entries if not e.get('tokenIdentical',True)]},ensure_ascii=False))
