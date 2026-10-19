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
CONFIG=json.loads((HERE/'config.json').read_text())
NS='{http://www.w3.org/2000/svg}'
FETCH_COUNT=0
def digest(b):return hashlib.sha256(b).hexdigest()
def guards():
    validation=json.loads((HERE/'validation.json').read_text())
    assert digest((HERE/'config.json').read_bytes())==validation['configSHA256'],'config pin changed'
    for path,pin in CONFIG['inputSHA256'].items():assert digest((ROOT/path).read_bytes())==pin,'original input changed'
    for name,pin in validation['ownSHA256'].items():assert digest((HERE/name).read_bytes())==pin,'harness input changed'
def load_sources():
    out={}
    for key,spec in CONFIG['sourceRoots'].items():
        raw=(ROOT/spec['file']).read_bytes();assert digest(raw)==spec['fileSHA256'],'whole proof pin changed'
        proof=json.loads(raw);assert sorted(proof)==spec['proofKeys'],'proof shape changed'
        assert len(proof['groups'])==len(proof['trace'])==10,'raw count changed'
        assert spec['sourceProofIdentity']=={'root':spec['root'],'file':Path(spec['file']).name,'fileSHA256':digest(raw)},'proof identity changed'
        assert [g['polygons']for g in proof['groups']]==[[p for call in row for p in call['polygons']]for row in proof['trace']],'group/trace polygons differ'
        assert [len(g['polygons'])for g in proof['groups']]==spec['polygonCounts']
        assert sum(len(g['polygons'])for g in proof['groups'])==24
        for group in proof['groups']:
            assert sorted(group)==['polygons','raw']
            for poly in group['polygons']:
                assert len(poly)>=3
                for p in poly:assert sorted(p)==['off','x','y']and p['off']==0 and all(type(p[k])in[int,float]and math.isfinite(p[k])for k in['x','y']),'only original finite off0 polygons'
        out[key]=proof
    return out
def polygon_path(poly):
    def point(p):return json.dumps(p['x'],allow_nan=False,separators=(',',':'))+' '+json.dumps(p['y'],allow_nan=False,separators=(',',':'))
    return 'M'+point(poly[0])+''.join(' L'+point(p)for p in poly[1:])+' Z'
def source_svg(proof,count=None,prefix=False):
    indexes=list(range(10))if count is None else list(range(count))if prefix else[count-1]
    out=['<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="'+CONFIG['sourceViewBox']+'"><g fill="#222">']
    for index in indexes:
        group=proof['groups'][index]
        out.append('<g data-original-raw="'+str(index+1)+'" data-polygons="'+str(len(group['polygons']))+'">')
        for poly in group['polygons']:out.append('<path d="'+html.escape(polygon_path(poly),quote=True)+'"/>')
        out.append('</g>')
    return ''.join(out)+'</g></svg>'
def parse_dictionary_xml(raw):
    root=ET.fromstring(raw);title=root.find(NS+'title');assert title is not None and title.text==CONFIG['glyph'],'dictionary title changed'
    groups=list(root.iter(NS+'g'));assert len(groups)==1,'dictionary group count changed'
    transform=groups[0].get('transform','');assert re.fullmatch(r'scale\(1,-1\) translate\(-?\d+, -\d+\)',transform),'dictionary transform changed'
    paths={p.get('id'):p for p in root.iter(NS+'path')if p.get('id')};clips={}
    for clip in root.iter(NS+'clipPath'):
        children=list(clip);assert len(children)==1;ref=children[0].get('{http://www.w3.org/1999/xlink}href','');assert ref.startswith('#')and ref[1:]in paths
        assert clip.get('id')not in clips;clips[clip.get('id')]=ref[1:]
    strokes=[]
    for animated in root.iter(NS+'path'):
        if not animated.get('clip-path'):continue
        m=re.fullmatch(r'url\(#([^)]*)\)',animated.get('clip-path'));assert m and m.group(1)in clips
        outline=paths[clips[m.group(1)]];style=animated.get('style','');delay=re.search(r'--d:\s*(\d+)ms',style);duration=re.search(r'--t:\s*(\d+)ms',style);assert delay and duration and outline.get('d')
        strokes.append({'d':outline.get('d'),'id':outline.get('id'),'delay':int(delay.group(1)),'duration':int(duration.group(1))})
    strokes.sort(key=lambda s:s['delay']);assert len(clips)==len(strokes)==CONFIG['catalogStrokes']==9 and len({s['id']for s in strokes})==9,'dictionary clip count changed'
    assert all(not i or s['delay']>=strokes[i-1]['delay']+strokes[i-1]['duration']for i,s in enumerate(strokes)),'overlapping domestic order'
    return {'transform':transform,'strokes':strokes}
class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs):raise ValueError('Dictionary redirect rejected')
def fetch_dictionary_once():
    global FETCH_COUNT
    assert FETCH_COUNT==0,'dictionary fetch already used';FETCH_COUNT+=1
    pin=CONFIG['domestic']
    with build_opener(NoRedirect()).open(pin['url'],timeout=20)as response:
        assert response.status==200 and response.geturl()==pin['url'],'dictionary URL/status changed';raw=response.read(pin['bytes']+1)
    assert len(raw)==pin['bytes']and digest(raw)==pin['sha256'],'dictionary pin changed'
    return parse_dictionary_xml(raw)
def domestic_svg(data,count=None,prefix=False):
    indexes=list(range(9))if count is None else list(range(count))if prefix else[count-1]
    return '<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="'+CONFIG['domesticViewBox']+'"><g fill="#222" transform="'+html.escape(data['transform'],quote=True)+'">'+''.join('<path data-domestic-stroke="'+str(i+1)+'" d="'+html.escape(data['strokes'][i]['d'],quote=True)+'"/>'for i in indexes)+'</g></svg>'
def selection(route,query):
    assert route in['/','/whole','/compare','/checks'],'unknown route'
    q={}if not query else parse_qs(query,keep_blank_values=True,strict_parsing=True)
    assert all(len(v)==1 and v[0]!=''for v in q.values()),'duplicate/blank query'
    if route!='/compare':assert not q,'query forbidden';return None
    assert set(q)<=set(['source','domestic','raw','dview','rview']),'unknown query'
    source=q.get('source',['base'])[0];assert source in CONFIG['sourceRoots'],'unknown source'
    d=q.get('domestic',['1'])[0];raw=q.get('raw',['1'])[0];assert re.fullmatch('[1-9]',d)and re.fullmatch('(?:[1-9]|10)',raw),'out of range'
    dview=q.get('dview',['single'])[0];rview=q.get('rview',['single'])[0];assert dview in['single','prefix']and rview in['single','prefix'],'unknown selection mode'
    return {'source':source,'domestic':int(d),'raw':int(raw),'dview':dview,'rview':rview}
def page(route,selected,sources,domestic):
    def link(label,values):return '<a href="/compare?'+html.escape(urlencode(values),quote=True)+'">'+label+'</a>'
    links='<a href="/whole">전체 원본2종+국내</a> <a href="/compare">선택 비교</a>'
    if selected is None:panels=[('국내 전체1–9',domestic_svg(domestic)),('base 원raw1–10',source_svg(sources['base'])),('VS0 원raw1–10',source_svg(sources['vs0']))]
    else:
        for source in['base','vs0']:links+=link(source,{**selected,'source':source})
        links+='<br>국내번호: '+''.join(link(str(i),{**selected,'domestic':i})for i in range(1,10))
        links+='<br>원raw번호: '+''.join(link(str(i),{**selected,'raw':i})for i in range(1,11))
        links+='<br>국내표시: '+''.join(link(v,{**selected,'dview':v})for v in['single','prefix'])+' 원raw표시: '+''.join(link(v,{**selected,'rview':v})for v in['single','prefix'])
        dl=('1–'if selected['dview']=='prefix'else'')+str(selected['domestic']);rl=('1–'if selected['rview']=='prefix'else'')+str(selected['raw'])
        panels=[('국내 '+dl,domestic_svg(domestic,selected['domestic'],selected['dview']=='prefix')),(selected['source']+' 원raw '+rl,source_svg(sources[selected['source']],selected['raw'],selected['rview']=='prefix'))]
    return '<!doctype html><meta charset="utf-8"><title>挃 원 raw 정적 비교</title><style>body{font:16px system-ui;margin:12px}a{display:inline-block;margin:4px}.grid{display:grid;grid-template-columns:repeat('+str(len(panels))+',540px);gap:10px;width:max-content}.panel{width:540px}svg{display:block;width:520px;height:520px;min-width:520px;min-height:520px}</style><h1>挃 · 국내9 / 원raw10 정적 비교</h1><p>각 자료의 원본번호입니다. 번호대응·방향·합획·필순 승인 아님 / partial animation0 / nativeApproval=false</p><nav>'+links+'</nav><div class="grid">'+''.join('<section class="panel"><h2>'+title+'</h2>'+svg+'</section>'for title,svg in panels)+'</div>'
def main():
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args();assert 0<=args.port<=65535
    guards();sources=load_sources();domestic=fetch_dictionary_once()
    class Handler(BaseHTTPRequestHandler):
        def log_message(self,*args):pass
        def do_GET(self):
            try:
                guards();assert self.headers.get('Host')=='127.0.0.1:'+str(self.server.server_port),'local host required'
                parsed=urlparse(self.path);assert not parsed.fragment and not parsed.netloc and not parsed.scheme,'local route required';selected=selection(parsed.path,parsed.query)
                if parsed.path=='/checks':body=json.dumps({'glyph':'挃','sourceRoots':['base','vs0'],'domesticClips':9,'sourceRawGroupsEach':10,'sourcePolygonsEach':24,'sourceCompilerCalls':0,'engineRuns':0,'partialAnimation':False,'nativeApproval':False,'runtimeApplied':False,'domesticRAMFetches':FETCH_COUNT});kind='application/json'
                else:body=page(parsed.path,selected,sources,domestic);kind='text/html'
                self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('Content-Security-Policy',"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'");self.end_headers();self.wfile.write(body.encode('utf-8'))
            except Exception:
                self.send_response(409,'Comparison contract rejected');self.send_header('Content-Type','text/plain; charset=utf-8');self.end_headers();self.wfile.write(b'Comparison contract rejected')
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'pid':os.getpid(),'port':server.server_port,'host':'127.0.0.1','sourceCompilerCalls':0,'engineRuns':0,'domesticRAMFetches':FETCH_COUNT,'nativeApproval':False}),flush=True)
    server.serve_forever()
if __name__=='__main__':main()
