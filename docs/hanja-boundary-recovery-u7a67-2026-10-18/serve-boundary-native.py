import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,importlib.util,json,os,subprocess
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
SERVER_SHA=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
WRAPPER_SHA=hashlib.sha256((HERE/'server-compile-boundary-candidate.mjs').read_bytes()).hexdigest()
A_BYTES=(HERE/'boundary-source-preparation.json').read_bytes()
A_SHA=hashlib.sha256(A_BYTES).hexdigest()
A=json.loads(A_BYTES)
C=None
review=None
def guards():
    assert hashlib.sha256(Path(__file__).read_bytes()).hexdigest()==SERVER_SHA
    assert hashlib.sha256((HERE/'server-compile-boundary-candidate.mjs').read_bytes()).hexdigest()==WRAPPER_SHA
    assert hashlib.sha256((HERE/'boundary-source-preparation.json').read_bytes()).hexdigest()==A_SHA
    for f,sha in A['inputSHA256'].items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==sha,f
def source_guard():
    guards()
    assert A['nativeApproval'] is False and A['runtimeApplied'] is False
    assert A['identity']['sourceRoot']==A['selectedWhole']=='u7a67'
    assert A['sourceBodyKeys']==['defaults','groups','trace']
    assert A['fullProofKeys']==['defaults','engineHashes','engineRevision','groups','trace']
    assert sorted(A['identity'])==['sourceHeaderFile','sourceHeaderFileSha256','sourceProofFile','sourceProofFileSha256','sourceRoot']
    assert sorted(i for g in A['sourceGroups']for i in g)==list(range(21))
    body=json.loads((HERE/A['identity']['sourceProofFile']).read_bytes())
    header=json.loads((HERE/A['identity']['sourceHeaderFile']).read_bytes())
    assert sorted(body)==A['sourceBodyKeys'] and sorted(header)==A['fullProofKeys']
    assert len(header['engineHashes'])==8 and header['engineHashes']==A['engineHashes']
    assert len(body['trace'])==len(body['groups'])==21
    assert sum(len(g['polygons'])for g in body['groups'])==43
    for i,row in enumerate(body['trace']):assert [p for call in row for p in call['polygons']]==body['groups'][i]['polygons']
    assert A['sourceCheck']['executed'] is True and A['sourceCheck']['positiveCompilerRuns']==1
    assert A['dictionary']['glyph']==A['glyph'] and A['dictionary']['clips']==A['catalogStrokes']==19
    return {'ok':True,'glyph':A['glyph'],'pinsVerified':len(A['inputSHA256']),'pens':19,'masks':21,'polygons':43,'sourceCompiles':0,'engineRuns':0,'httpRequests':0,'serversStarted':0,'nativeApproval':False,'runtimeApplied':False}
def compiled(root=None):
    global C
    guards();root=A['selectedWhole']if root is None else root
    assert root==A['selectedWhole'],'Unsupported whole; no alias fallback'
    if C is None:
        env={**os.environ,'WHOLE_ROOT':root};env.pop('CHECK',None)
        C=json.loads(subprocess.check_output(['rtk','proxy','node',str(HERE/'server-compile-boundary-candidate.mjs')],env=env))
    assert C['sourceRoot']==root and C['compiledSHA256']==A['compiledSHA256']
    assert C['pens']==19 and C['masks']==21 and C['polygons']==43
    return C
def full_domestic():
    d=review.renderer.source(A['glyph']);assert len(d['strokes'])==19
    paths=''.join('<path d="'+html.escape(s['outline']['d'])+'"/>'for s in d['strokes'])
    return '<svg viewBox="0 0 1024 1024"><g transform="'+d['transform']+'">'+paths+'</g></svg>'
def public_whole(root):
    guards();assert root in A['wholeProofs'],'Unsupported whole'
    f=A['wholeProofs'][root];assert f in A['inputSHA256']
    d=json.loads((HERE/f).read_bytes());assert sorted(d)==A['sourceBodyKeys']
    for i,row in enumerate(d['trace']):assert [p for call in row for p in call['polygons']]==d['groups'][i]['polygons']
    parts=[]
    for g in d['groups']:
        for poly in g['polygons']:
            assert all(v['off']==0 for v in poly)
            parts.append('<polygon points="'+' '.join(str(v['x'])+','+str(v['y'])for v in poly)+'"/>')
    return '<svg viewBox="0 0 200 200">'+''.join(parts)+'</svg>'
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            u=urlparse(self.path);q=parse_qs(u.query);c=compiled(q.get('root',[None])[0]if u.path!='/whole'else None)
            if u.path=='/checks':
                out=json.dumps({k:v for k,v in c.items()if k not in ['strokes','render']},ensure_ascii=False).encode();kind='application/json'
            else:
                body='<!doctype html><meta charset="utf-8"><title>穧 경계 후보</title><style>body{font:16px system-ui;margin:18px;width:1112px}svg{width:320px;height:320px}.pair{display:flex;gap:25px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.grid svg{width:200px;height:210px}button,a{margin:6px}</style><h1>穧 · 국내 경계 검토 전 후보</h1><a href="/whole">whole</a><a href="/pairs">방향</a><a href="/progressive?stroke=14&enlarged=1">14획 경계</a><p>왼쪽 국내 / 오른쪽 compiled 후보. 국내 SVG는 RAM 전용. 기존 보류 유지·native 미승인.</p>'
                if u.path in ['/','/whole']:
                    roots=[q['root'][0]]if 'root'in q else list(A['wholeProofs'])
                    body+='<div class="pair"><div>국내 전체'+full_domestic()+'</div><div id="whole">compiled 전체</div></div><div class="grid">'+''.join('<div>'+html.escape(r)+public_whole(r)+'</div>'for r in roots)+'</div><script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';whole.innerHTML+=render(strokes,19,1,"whole");</script>'
                elif u.path=='/pairs':
                    body+='<div class="grid">'+''.join('<div><a href="/progressive?stroke='+str(n)+'&enlarged=1">'+str(n)+'획</a><div class="pair">'+review.renderer.dictionary_svg(A['glyph'],n,True,'dom'+str(n))+'<div id="candidate'+str(n)+'"></div></div></div>'for n in range(1,20))+'</div><script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';for(let n=1;n<=19;n++)document.getElementById("candidate"+n).innerHTML=render(strokes,n,.75,"pair"+n);</script>'
                elif u.path=='/progressive':
                    n=int(q.get('stroke',['14'])[0]);assert 1<=n<=19
                    masks=c['strokes'][n-1];total=sum(m['weight']for m in masks);prefix=0;buttons=[]
                    for i,m in enumerate(masks[:-1],1):
                        prefix+=m['weight'];b=prefix/total
                        for label,value in [('직전',max(0,b-1e-10)),('경계',b),('직후',min(1,b+1e-10))]:buttons.append('<button onclick="show('+repr(value)+')">마스크 '+str(i+1)+' '+label+'</button>')
                    if q.get('enlarged',['0'])[0]=='1':body+='<style>body{width:1200px}.pair svg{width:520px;height:520px}</style>'
                    body+=''.join('<a href="?stroke='+str(i)+'&enlarged=1">'+str(i)+'</a>'for i in range(1,20))+'<h2>'+str(n)+'획</h2><div class="pair">'+review.renderer.dictionary_svg(A['glyph'],n,True,'dom')+'<div id="candidate"></div></div>'
                    body+=''.join('<button onclick="show('+repr(p)+')">'+label+'</button>'for label,p in [('0%',0),('50%',.5),('75%',.75),('95%',.95),('99.99%',.9999),('100%',1)])+''.join(buttons)+'<button id="play">재생</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0" step=".0001"><output id="value"></output>'
                    body+='<script>const strokes='+json.dumps(c['strokes'])+';const stroke='+str(n)+';const render='+c['render']+';const show=p=>{candidate.innerHTML=render(strokes,stroke,p,"live");progress.value=p*100;value.textContent=(p*100).toFixed(4)+"%"};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};show(0);</script>'
                    if q.get('samples',['0'])[0]=='1':body+='<style>.coarse{display:grid;grid-template-columns:repeat(3,1fr)}.coarse svg{width:170px;height:170px}</style><div class="coarse" id="samples"></div><script>[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{samples.innerHTML+="<div>"+(p*100)+"%"+render(strokes,stroke,p,"sample"+i)+"</div>"});</script>'
                else:raise ValueError('Unsupported route')
                out=body.encode();kind='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',kind);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(out)
        except Exception as e:self.send_error(409,str(e))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    if args.check_only:print(json.dumps(source_guard(),ensure_ascii=False));sys.exit(0)
    source_guard()
    spec=importlib.util.spec_from_file_location('boundary_recovery_859',ROOT/'docs/hanja-special2-direction-review-2026-09-21/serve.py')
    review=importlib.util.module_from_spec(spec);spec.loader.exec_module(review)
    review.renderer.ENTRIES={A['glyph']:{'strokes':19,'dictionary':A['dictionary']}}
    compiled();review.renderer.source(A['glyph'])
    with ThreadingHTTPServer(('127.0.0.1',args.port),Handler)as server:
        print(json.dumps({'glyph':A['glyph'],'port':server.server_address[1],'pid':os.getpid(),'pens':19,'masks':21,'nativeApproval':False,'privateMediaSaved':False}),flush=True)
        server.serve_forever()
