import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os,subprocess,argparse
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
SERVER_SHA=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
WRAPPER_SHA=hashlib.sha256((HERE/'native-terminal15-server-compile.mjs').read_bytes()).hexdigest()
A_BYTES=(HERE/'native-terminal15-server-audit.json').read_bytes()
A_SHA=hashlib.sha256(A_BYTES).hexdigest()
A=json.loads(A_BYTES)
spec=importlib.util.spec_from_file_location('domestic_review_'+str(A['batch']),ROOT/'docs/hanja-special2-direction-review-2026-09-21/serve.py')
review=importlib.util.module_from_spec(spec);spec.loader.exec_module(review)
review.renderer.ENTRIES={A['glyph']:{'strokes':A['catalogStrokes'],'dictionary':A['dictionary']}}
def guards():
    assert hashlib.sha256(Path(__file__).read_bytes()).hexdigest()==SERVER_SHA,'server code changed'
    assert hashlib.sha256((HERE/'native-terminal15-server-compile.mjs').read_bytes()).hexdigest()==WRAPPER_SHA,'compiler wrapper changed'
    assert hashlib.sha256((HERE/'native-terminal15-server-audit.json').read_bytes()).hexdigest()==A_SHA,'audit identity changed'
    for f,sha in A['inputSHA256'].items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==sha,'pinned input changed: '+f
def compiled(root=None):
    guards()
    env={**os.environ,'REVIEW_DIR':str(HERE),'WHOLE_ROOT':root or A['selectedWhole']}
    return json.loads(subprocess.check_output(['rtk','proxy','node',str(HERE/'native-terminal15-server-compile.mjs')],env=env))
def full_domestic():
    data=review.renderer.source(A['glyph'])
    assert len(data['strokes'])==A['dictionary']['clips']
    paths=''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])
    return '<svg viewBox="0 0 1024 1024"><g transform="'+data['transform']+'">'+paths+'</g></svg>'
def public_whole(root):
    guards();s=json.loads((HERE/'sources.json').read_bytes());assert root in s['wholeNames'],'unsupported whole'
    f='engine-whole-'+root+'.json';assert f in A['inputSHA256'],'whole file not pinned'
    p=json.loads((HERE/f).read_bytes());assert sorted(p) in (['defaults','groups','trace'],['defaults','engineHashes','engineRevision','groups','trace']);header=json.loads((HERE/'engine-proof.json').read_bytes());assert sorted(header)==['defaults','engineHashes','engineRevision','groups','trace'];assert 'engineRevision' not in p or p['engineRevision']==header['engineRevision'];assert 'engineHashes' not in p or p['engineHashes']==header['engineHashes']
    for i,row in enumerate(p['trace']):assert [poly for call in row for poly in call['polygons']]==p['groups'][i]['polygons']
    polygons=[]
    for g in p['groups']:
        for poly in g['polygons']:
            assert all(v['off']==0 for v in poly)
            polygons.append('<polygon points="'+' '.join(str(v['x'])+','+str(v['y'])for v in poly)+'"/>')
    return '<svg viewBox="0 0 200 200">'+''.join(polygons)+'</svg>'
C=compiled()
review.renderer.source(A['glyph'])
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            u=urlparse(self.path);q=parse_qs(u.query);route=u.path
            root=q.get('root',[A['selectedWhole']])[0]
            c=compiled(root if route!='/whole' else None)
            if route=='/checks':
                out=json.dumps({k:v for k,v in c.items()if k not in ['strokes','render']},ensure_ascii=False).encode()
                kind='application/json'
            else:
                links='<a href="/whole">whole</a> <a href="/pairs">국내 방향 ↔ compiled pen</a> <a href="/progressive?stroke=4&enlarged=1&samples=1">4획 terminal15</a> <a href="/progressive?stroke=8&enlarged=1&samples=1">8획 terminal15</a>'
                body='<!doctype html><meta charset="utf-8"><title>'+A['glyph']+' source-only</title><style>body{font:16px system-ui;margin:18px;width:1112px}svg{width:320px;height:320px}.pair{display:flex;gap:25px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.grid svg{width:200px;height:210px}button,a{margin:6px;display:inline-block}</style><h1>'+A['glyph']+' · 원본 후보 '+str(c['pens'])+'획</h1>'+links+'<p>별도 terminal15 원본 후보 · 기존 native 보류 유지. 국내 SVG RAM-only. 오른쪽은 compiled candidate pen.</p>'
                if route=='/whole' or route=='/':
                    s=json.loads((HERE/'sources.json').read_bytes())
                    if 'root'in q:assert root in s['wholeNames'],'unsupported whole'
                    variants=[root]if 'root'in q else s['wholeNames']
                    body+='<div class="pair"><div>국내 전체'+full_domestic()+'</div><div id="compiledWhole">compiled 전체</div></div>'
                    body+='<div class="grid">'+''.join('<div>'+html.escape(v)+public_whole(v)+'</div>'for v in variants)+'</div>'
                    body+='<script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';compiledWhole.innerHTML+=render(strokes,strokes.length,1,"whole");</script>'
                elif route=='/pairs':
                    body+='<div class="grid">'
                    for n in range(1,c['pens']+1):
                        domestic=review.renderer.dictionary_svg(A['glyph'],n,True,'pair'+str(n))
                        body+='<div><a href="/progressive?stroke='+str(n)+'&enlarged=1">'+str(n)+'획 확대</a><div class="pair">'+domestic+'<div id="candidate'+str(n)+'"></div></div></div>'
                    body+='</div><script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';for(let n=1;n<=strokes.length;n++)document.getElementById("candidate"+n).innerHTML=render(strokes,n,.75,"pair"+n);</script>'
                elif route=='/progressive':
                    n=int(q.get('stroke',['1'])[0]);assert 1<=n<=c['pens'],'unsupported stroke'
                    masks=c['strokes'][n-1];total=sum(m['weight']for m in masks);cumulative=0;boundary=[]
                    for i,m in enumerate(masks[:-1],1):
                        cumulative+=m['weight'];b=cumulative/total
                        for label,value in [('직전',max(0,b-1e-10)),('경계',b),('직후',min(1,b+1e-10))]:boundary.append('<button onclick="show('+repr(value)+')">마스크 '+str(i+1)+' '+label+'</button>')
                    for i,m in enumerate(masks[:-1],1):
                        b=sum(part['weight'] for part in masks[:i])/total
                        for fraction in [.125,.25,.5]:
                            value=b+(1-b)*fraction
                            boundary.append('<button onclick="show('+repr(value)+')">마스크 '+str(i+1)+' 시작+'+str(fraction*100)+'%</button>')
                    body+=''.join('<a href="?stroke='+str(i)+'&enlarged=1">'+str(i)+'</a>'for i in range(1,c['pens']+1))
                    if q.get('enlarged',['0'])[0]=='1':body+='<style>body{width:1200px}.pair svg{width:520px;height:520px}</style>'
                    body+='<h2>'+str(n)+'획 · '+str(len(masks))+' masks</h2><div class="pair">'+review.renderer.dictionary_svg(A['glyph'],n,True,'dom'+str(n))+'<div id="candidate"></div></div>'
                    body+=''.join('<button onclick="show('+repr(p)+')">'+label+'</button>'for label,p in [('0%',0),('50%',.5),('75%',.75),('99%',.99),('99.99%',.9999),('100%',1)])+''.join(boundary)
                    body+='<button id="play">재생</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0" step=".01"><output id="value"></output>'
                    body+='<script>const strokes='+json.dumps(c['strokes'])+';const stroke='+str(n)+';const render='+c['render']+';const show=p=>{candidate.innerHTML=render(strokes,stroke,p,"live");progress.value=p*100;value.textContent=(p*100).toFixed(4)+"%"};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};show(0);</script>'
                    if q.get('samples',['1'])[0]=='1':
                        body+='<style>.coarse{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.coarse svg{width:170px;height:170px}</style><div class="coarse" id="coarseSamples"></div><script>[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{coarseSamples.innerHTML+="<div>"+(p*100)+"%"+render(strokes,stroke,p,"coarse"+i)+"</div>"});</script>'
                else:raise ValueError('unsupported route')
                out=body.encode();kind='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',kind);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(out)
        except Exception as e:self.send_error(409,str(e))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'batch':A['batch'],'glyph':A['glyph'],'port':server.server_address[1],'pid':os.getpid(),'pens':C['pens'],'masks':C['masks'],'privateMediaSaved':False}),flush=True)
    server.serve_forever()


