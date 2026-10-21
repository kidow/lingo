# -*- coding: utf-8 -*-
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,json,math,re,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse,urlencode
from urllib.request import build_opener,HTTPRedirectHandler
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
import xml.etree.ElementTree as ET
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
CONFIG=json.loads((HERE/'config.json').read_text(encoding='utf-8'))
NS='{http://www.w3.org/2000/svg}'
FETCH_COUNT=0
def digest(b):return hashlib.sha256(b).hexdigest()
def guards():
 v=json.loads((HERE/'validation.json').read_text(encoding='utf-8'))
 assert digest((HERE/'config.json').read_bytes())==v['configSHA256'],'config pin changed'
 for p,h in CONFIG['inputSHA256'].items():assert digest((ROOT/p).read_bytes())==h,'original input changed'
 for p,h in v['ownSHA256'].items():assert digest((HERE/p).read_bytes())==h,'helper changed'
def load_sources():
 assert CONFIG['glyph']=='俓' and CONFIG['root']=='u4fd3' and set(CONFIG['sourceRoots'])=={'base'}and CONFIG['sourceGroups']==[] and CONFIG['staticOnly']and not CONFIG['nativeApproval']and not CONFIG['partialAnimation'],'single static base only'
 out={}
 for key,s in CONFIG['sourceRoots'].items():
  raw=(ROOT/s['file']).read_bytes();assert digest(raw)==s['fileSHA256'],'actual full5 changed';p=json.loads(raw)
  assert sorted(p)==s['proofKeys']==['defaults','engineHashes','engineRevision','groups','trace'],'actual full5 keys'
  assert s['sourceProofIdentity']=={'sourceRoot':s['root'],'sourceProofFile':'./'+Path(s['file']).name,'sourceProofFileSHA256':digest(raw)},'selected actual full5 identity'
  b=s['selectedBody3'];bb=(ROOT/b['file']).read_bytes();assert digest(bb)==b['fileSHA256'],'body3 changed';body=json.loads(bb);assert sorted(body)==b['keys']==['defaults','groups','trace'],'body3 shape';assert all(p[k]==body[k]for k in body),'full5/body3 differ'
  assert len(p['groups'])==len(p['trace'])==s['rawGroups']==12
  assert sum(len(r)for r in p['trace'])==s['drawingCalls']==12
  assert [g['polygons']for g in p['groups']]==[[q for c in row for q in c['polygons']]for row in p['trace']],'group/trace mismatch'
  assert [len(g['polygons'])for g in p['groups']]==s['polygonCounts']
  assert sum(len(g['polygons'])for g in p['groups'])==s['polygons']==27
  for g in p['groups']:
   assert sorted(g)==['polygons','raw']
   for poly in g['polygons']:
    assert len(poly)>=3
    for q in poly:assert sorted(q)==['off','x','y']and q['off']==0 and all(type(q[k])in[int,float]and math.isfinite(q[k])for k in['x','y'])
  out[key]=p
 return out
def polygon_path(poly):
 def point(q):return json.dumps(q['x'],allow_nan=False,separators=(',',':'))+' '+json.dumps(q['y'],allow_nan=False,separators=(',',':'))
 return 'M'+point(poly[0])+''.join(' L'+point(q)for q in poly[1:])+' Z'
def source_svg(p,n=None,prefix=False):
 ids=range(12)if n is None else range(n)if prefix else[n-1]
 out=['<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="'+CONFIG['sourceViewBox']+'"><g fill="#222">']
 for i in ids:
  out.append('<g data-original-raw="'+str(i+1)+'">')
  for poly in p['groups'][i]['polygons']:out.append('<path d="'+html.escape(polygon_path(poly),quote=True)+'"/>')
  out.append('</g>')
 return ''.join(out)+'</g></svg>'
def parse_dictionary_xml(raw):
 root=ET.fromstring(raw);assert root.tag==NS+'svg';title=root.find(NS+'title');assert title is not None and title.text==CONFIG['glyph'],'dictionary title'
 viewBox=root.get('viewBox','');v=viewBox.split();assert len(v)==4 and all(math.isfinite(float(x))for x in v)and 0<float(v[2])<1000000 and 0<float(v[3])<1000000,'original finite viewBox'
 groups=list(root.iter(NS+'g'));assert len(groups)==1,'one original glyph group';transform=groups[0].get('transform','');assert re.fullmatch(r'scale\(1,-1\) translate\(-?\d+,\s*-\d+\)',transform),'original transform syntax'
 paths={p.get('id'):p for p in root.iter(NS+'path')if p.get('id')};clips={}
 for clip in root.iter(NS+'clipPath'):
  children=list(clip);assert len(children)==1;ref=children[0].get('{http://www.w3.org/1999/xlink}href','');assert ref.startswith('#')and ref[1:]in paths and clip.get('id')not in clips;clips[clip.get('id')]=ref[1:]
 strokes=[]
 for p in root.iter(NS+'path'):
  if not p.get('clip-path'):continue
  m=re.fullmatch(r'url\(#([^)]*)\)',p.get('clip-path'));assert m and m.group(1)in clips;outline=paths[clips[m.group(1)]];delay=re.search(r'--d:\s*(\d+)ms',p.get('style',''));duration=re.search(r'--t:\s*(\d+)ms',p.get('style',''));assert delay and duration and outline.get('d');strokes.append({'id':outline.get('id'),'d':outline.get('d'),'delay':int(delay.group(1)),'duration':int(duration.group(1))})
 strokes.sort(key=lambda s:s['delay']);assert len(clips)==len(strokes)==CONFIG['catalogStrokes']==9 and len({s['id']for s in strokes})==9,'exact9 original clips'
 assert all(not i or s['delay']>=strokes[i-1]['delay']+strokes[i-1]['duration']for i,s in enumerate(strokes)),'original ordered intervals'
 return {'viewBox':viewBox,'transform':transform,'strokes':strokes,'rootAttributes':dict(root.attrib),'groupAttributes':dict(groups[0].attrib),'pathCount':len(list(root.iter(NS+'path')))}
class NoRedirect(HTTPRedirectHandler):
 def redirect_request(self,*args,**kwargs):raise ValueError('redirect rejected')
def fetch_dictionary_once():
 global FETCH_COUNT
 assert FETCH_COUNT==0;FETCH_COUNT+=1;pin=CONFIG['domestic']
 with build_opener(NoRedirect()).open(pin['url'],timeout=20)as r:
  assert r.status==200 and r.geturl()==pin['url'];raw=r.read(pin['bytes']+1)
 assert len(raw)==pin['bytes']and digest(raw)==pin['sha256'],'exact original XML bytes/SHA'
 return parse_dictionary_xml(raw)
def domestic_svg(d,n=None,prefix=False):
 ids=range(9)if n is None else range(n)if prefix else[n-1]
 return '<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="'+html.escape(d['viewBox'],quote=True)+'"><g fill="#222" transform="'+html.escape(d['transform'],quote=True)+'">'+''.join('<path data-domestic-stroke="'+str(i+1)+'" d="'+html.escape(d['strokes'][i]['d'],quote=True)+'"/>'for i in ids)+'</g></svg>'
def selection(route,query):
 assert route in['/','/whole','/compare','/checks']
 q={}if not query else parse_qs(query,keep_blank_values=True,strict_parsing=True);assert all(len(v)==1 and v[0]for v in q.values())
 if route!='/compare':assert not q;return None
 assert set(q)<=set(['source','domestic','raw','dview','rview']);source=q.get('source',['base'])[0];assert source=='base'
 ds=q.get('domestic',['1'])[0];rs=q.get('raw',['1'])[0];assert re.fullmatch('[1-9]',ds)and re.fullmatch('(?:[1-9]|1[0-2])',rs)
 dv=q.get('dview',['single'])[0];rv=q.get('rview',['single'])[0];assert dv in['single','prefix']and rv in['single','prefix'];return{'source':source,'domestic':int(ds),'raw':int(rs),'dview':dv,'rview':rv}
def page(route,s,sources,domestic):
 def link(label,v):return '<a href="/compare?'+html.escape(urlencode(v),quote=True)+'">'+label+'</a>'
 links='<a href="/whole">국내+원base 전체</a><a href="/compare">선택 single/prefix</a>'
 if s is None:panels=[('국내 전체1–9',domestic_svg(domestic)),('base 원raw1–12',source_svg(sources['base']))]
 else:
  links+='<br>국내번호: '+''.join(link(str(i),{**s,'domestic':i})for i in range(1,10))+'<br>원raw번호: '+''.join(link(str(i),{**s,'raw':i})for i in range(1,13))
  links+='<br>국내표시: '+''.join(link(v,{**s,'dview':v})for v in['single','prefix'])+' 원raw표시: '+''.join(link(v,{**s,'rview':v})for v in['single','prefix'])
  dl=('1–'if s['dview']=='prefix'else'')+str(s['domestic']);rl=('1–'if s['rview']=='prefix'else'')+str(s['raw']);panels=[('국내 '+dl,domestic_svg(domestic,s['domestic'],s['dview']=='prefix')),('base 원raw '+rl,source_svg(sources['base'],s['raw'],s['rview']=='prefix'))]
 return '<!doctype html><meta charset="utf-8"><title>俓 원raw 정적 비교</title><style>body{font:16px system-ui;margin:12px}a{display:inline-block;margin:4px}.grid{display:grid;grid-template-columns:repeat(2,540px);gap:10px;width:max-content}svg{display:block;width:520px;height:520px;min-width:520px;min-height:520px}</style><h1>俓 · 국내9 / 원raw12 · 27polygon</h1><p>고정 base actualfull5 engine-proof 원polygon만 표시합니다. 원min12&gt;국내9 HOLD/sourceGroups=[] 불변. 새9그룹·합병·guide·애니메이션·방향·시간승인false. K/VS0는이helper에서혼합/표시하지않습니다.</p><nav>'+links+'</nav><div class="grid">'+''.join('<section><h2>'+h+'</h2>'+v+'</section>'for h,v in panels)+'</div>'
def main():
 p=argparse.ArgumentParser();p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');a=p.parse_args();assert 0<=a.port<=65535;guards();sources=load_sources()
 if a.check_only:print(json.dumps({'staticGuards':True,'raw':12,'polygons':27,'HTTP':0,'server':0,'compiler':0,'engine':0}));return
 domestic=fetch_dictionary_once()
 class Handler(BaseHTTPRequestHandler):
  def log_message(self,*args):pass
  def do_GET(self):
   try:
    guards();assert self.headers.get('Host')=='127.0.0.1:'+str(self.server.server_port);u=urlparse(self.path);assert not u.scheme and not u.netloc and not u.fragment;s=selection(u.path,u.query)
    if u.path=='/checks':raw=json.dumps({'staticOnly':True,'sourceGroups':[],'nativeApproval':False,'compiler':0,'engine':0,'domesticViewBox':domestic['viewBox'],'domesticRootAttributes':domestic['rootAttributes'],'domesticGroupAttributes':domestic['groupAttributes']}).encode();kind='application/json'
    else:raw=page(u.path,s,sources,domestic).encode();kind='text/html; charset=utf-8'
    self.send_response(200);self.send_header('Content-Type',kind);self.send_header('Content-Length',str(len(raw)));self.send_header('Cache-Control','no-store');self.send_header('Content-Security-Policy',"default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; object-src 'none'");self.end_headers();self.wfile.write(raw)
   except Exception:self.send_error(409,'Exact static contract mismatch')
 server=ThreadingHTTPServer(('127.0.0.1',a.port),Handler);print(json.dumps({'pid':os.getpid(),'port':server.server_port,'host':'127.0.0.1','staticOnly':True,'domesticViewBox':domestic['viewBox'],'sourceCompiler':0,'factory':0,'projection':0,'engine':0,'nativeApproval':False}),flush=True)
 try:server.serve_forever()
 finally:server.server_close()
if __name__=='__main__':main()
