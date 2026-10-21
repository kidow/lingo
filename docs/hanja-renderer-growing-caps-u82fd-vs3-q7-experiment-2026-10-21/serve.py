import sys
sys.dont_write_bytecode=True
import argparse,ast,hashlib,html,importlib.util,json
from pathlib import Path
from urllib.parse import urlparse,parse_qs
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
CONFIG=json.loads((HERE/'config.json').read_text())
BROWSER="import{renderOriginal,renderGrowingCaps,renderWhole,targetMask,targetCoverageResidual,browserMetrics}from'/render.mjs';\nconst data=await(await fetch('/fixture.json')).json(),S=data['u82fd-ue0103'].strokes,C=await(await fetch('/config.json')).json(),$=s=>document.querySelector(s),m=targetMask(),b=C.boundary,W=S[6].reduce((a,x)=>a+x.weight,0);let pen=7,p=0,serial=0;\nfunction paint(){document.querySelector('#reference').innerHTML=renderOriginal(S,pen,p,'ref');document.querySelector('#candidate').innerHTML=renderGrowingCaps(S,pen,p,'new');$('#status').textContent=JSON.stringify({pen,global:p,requestedLocal:$('#local').value,frame:browserMetrics(),nativeApproval:false});$('#progress').value=p*100;$('#percent').textContent=(p*100).toFixed(10)+'%'}\nfunction sample(global,label,width=520,reference=true){const d=document.createElement('section');d.className='sample';d.innerHTML='<h3>'+label+'</h3>'+(reference?'<div class=\"sample-ref\">'+renderOriginal(S,pen,global,'sample-ref-'+serial)+'</div>':'<p>후보만 표시 · reference 숨김</p>')+'<div class=\"sample-new\">'+renderGrowingCaps(S,pen,global,'sample-new-'+serial++)+'</div>';for(const svg of d.querySelectorAll('svg')){svg.style.width=width+'px';svg.style.height=width+'px'}$('#samples').appendChild(d);d.scrollIntoView({block:'start'});return d}\nfunction local(v,label='local'){pen=7;$('#local').value=v;p=v===1?1:b+(1-b)*v;paint();sample(p,label+' '+v)}\n$('#progress').oninput=e=>{p=Number(e.target.value)/100;paint()};$('#pen').onchange=e=>{pen=Number(e.target.value);p=0;paint()};$('#local').onchange=e=>local(Number(e.target.value));\nfor(const v of C.localSamples){const x=document.createElement('button');x.textContent='Q7m2 local '+v;x.onclick=()=>local(v);$('#locals').appendChild(x)}\nfor(const v of C.earlyLocals){const x=document.createElement('button');x.textContent='연결위험 local '+v;x.onclick=()=>local(v,'연결위험');$('#early').appendChild(x)}\nfor(const delta of [-1e-10,0,1e-10]){const x=document.createElement('button');x.textContent='원7 V→Q 경계 '+delta;x.onclick=()=>{pen=7;p=b+delta;paint();sample(p,'global boundary '+p)};$('#boundary').appendChild(x)}\n$('#rho').onclick=()=>{pen=7;const L=(()=>{p=b+(1-b)*.5;paint();return browserMetrics().L})();for(const e of [-1e-10,0,1e-10])local(7/L+e,'rho 경계')};\n$('#coverage').onclick=()=>{const d=document.createElement('section');d.className='sample';d.innerHTML='<h3>Q7m2 P-minus-fullround · 연결성 승인 아님</h3>'+targetCoverageResidual(m,'coverage-'+serial++);$('#samples').appendChild(d);d.scrollIntoView({block:'start'})};\n$('#whole').onclick=()=>{$('#candidate').innerHTML=renderWhole(S,'whole-'+serial++);$('#reference').innerHTML=renderOriginal(S,9,1,'whole-ref');$('#status').textContent='exact whole: Q7m2 full round 유지'};\n$('#coarse').onclick=()=>{const compact=$('#compact').checked,width=Number($('#size').value);$('#samples').innerHTML='';$('#samples').className=compact?'compact':'';for(const v of C.coarseSamples)sample(v,'pen '+pen+' global '+v,compact?150:width,!compact);$('#samples').scrollIntoView({block:'start'})};\n$('#clear').onclick=()=>{$('#samples').innerHTML='';$('#samples').className=''};$('#play').onclick=()=>{pen=7;const start=performance.now();function tick(now){p=Math.min(1,(now-start)/8000);paint();if(p<1)requestAnimationFrame(tick);else $('#status').dataset.natural='complete'}requestAnimationFrame(tick)};paint();window.guaDiagnostics=()=>({pen,global:p,frame:browserMetrics(),samples:serial});"
def sha(b):return hashlib.sha256(b).hexdigest()
def guards():
    validation=json.loads((HERE/'validation.json').read_text())
    assert sha((HERE/'config.json').read_bytes())==validation['ownSHA256']['config.json'],'config changed'
    for path,pin in CONFIG['inputSHA256'].items():assert sha((ROOT/path).read_bytes())==pin,'input changed: '+path
    for name,pin in validation['ownSHA256'].items():assert sha((HERE/name).read_bytes())==pin,'own changed: '+name
    raw=(ROOT/CONFIG['sourceFixture']).read_bytes();assert sha(raw)==CONFIG['fixtureSHA256']
    return raw
def page(domestic):
    options=''.join('<option value="%d" %s>%d</option>'%(i,'selected' if i==7 else '',i)for i in range(1,10))
    return ('<!doctype html><meta charset="utf-8"><title>苽 VS3 Q7m2</title><style>body{font-family:sans-serif;margin:12px}button{margin:4px}svg{width:520px;height:520px;background:white}.grid{display:grid;grid-template-columns:repeat(3,540px);gap:12px;width:1644px}.sample{border:1px solid #ddd;margin:12px 0;padding:8px;width:max-content}.sample>div{display:inline-block}.compact{display:grid;grid-template-columns:repeat(3,166px);gap:4px;width:506px}.compact .sample{width:150px;margin:0;padding:4px}.compact svg{width:150px;height:150px}.compact h3{font-size:11px}.compact p{font-size:9px}pre{white-space:pre-wrap;max-width:800px}</style><h1>苽 VS3 · logical7m2 단독 성장 cap</h1><p>원9p10m22·V7m1 cardinal 그대로. 원cap HOLD 보존. 초기 접촉 가능성은 전체 연결성 승인 아님. 다른curve5/6/8/9는 기존43정책·미검토.</p><label>획<select id="pen">'+options+'</select></label><input id="progress" type="range" min="0" max="100" step="any" value="0"><b id="percent"></b><button id="play">7획 자연 8초</button><button id="whole">exact whole9</button><div id="locals"></div><label>Q7m2 local<input id="local" type="number" min="0" max="1" step="any" value="0"></label><div id="early"></div><div id="boundary"></div><button id="rho">rho=r 전후3</button><button id="coverage">coverage Q7m2</button><label><input id="compact" type="checkbox" checked>compact9 후보150px 3×3/reference숨김</label><select id="size"><option>220</option><option>520</option></select><button id="coarse">선택획 coarse9</button><button id="clear">보드 비우기</button><pre id="status"></pre><div class="grid"><section><h2>국내whole · 시간대응 미승인</h2>'+domestic+'</section><section><h2>원shared43</h2><div id="reference"></div></section><section><h2>후보 Q7m2 only · 520</h2><div id="candidate"></div></section></div><div id="samples"></div><script type="module" src="/browser.js"></script>').encode()
def selection(path,query):
    q=parse_qs(query,strict_parsing=True)if query else {}
    assert not q,'query unsupported'
    assert path in ('/','/progressive','/render.mjs','/browser.js','/fixture.json','/config.json'),'unknown route'
    return path
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            u=urlparse(self.path);route=selection(u.path,u.query)
            if route in ('/','/progressive'):body=PAGE;kind='text/html; charset=utf-8'
            elif route=='/render.mjs':body=(HERE/'render.mjs').read_bytes();kind='text/javascript; charset=utf-8'
            elif route=='/browser.js':body=BROWSER.encode();kind='text/javascript; charset=utf-8'
            elif route=='/config.json':body=(HERE/'config.json').read_bytes();kind='application/json'
            else:body=FIXTURE;kind='application/json'
            self.send_response(200);self.send_header('Content-Type',kind);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception:self.send_error(409,'fixed resource contract failed')
    def log_message(self,*args):pass
def main():
    global FIXTURE,PAGE
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
    FIXTURE=guards()
    helper=ROOT/'docs/hanja-source-raw-compare-u82fd-vs3-2026-10-21/serve.py'
    spec=importlib.util.spec_from_file_location('gua_domestic_fixed',helper);mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
    domestic=mod.fetch_dictionary_once();PAGE=page(mod.domestic_svg(domestic))
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler);print(json.dumps({'port':server.server_port,'glyph':'苽','sourceCompiler':0,'engine':0,'domesticFetch':1}),flush=True);server.serve_forever()
if __name__=='__main__':main()
