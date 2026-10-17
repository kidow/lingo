# Separate source-only native review. Original metadata, geometry and all other helpers are immutable.
import sys
sys.dont_write_bytecode=True
import json,os,html,hashlib,subprocess,importlib.util,argparse
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PREPARATION=json.loads((HERE/'source-order-candidate-validation.json').read_text())
CFG=PREPARATION['nativeConfig']
assert PREPARATION['originalPins']==json.loads("{\"candidate-compile-analysis.json\":\"4ba57388321fb3d9d39c5718c240c293ebbc2da5bb16a691e524f34ba13dc926\",\"engine-proof.json\":\"56b85a3e1630c785812dfb31fe16cef16815d075fc227070b353e257102bf2a6\",\"engine-whole-u7cba-ue0100.json\":\"a19ba8acdecb926494743b63408eac407f71b892a577c719b37994a8e4b1626e\",\"engine-whole-u7cba.json\":\"a19ba8acdecb926494743b63408eac407f71b892a577c719b37994a8e4b1626e\",\"metadata.json\":\"986448e3bd2e0b37f35e83bdecc64ceed0ce0521c0e5311bbe3077e7a1ebe4a8\",\"progressive.mjs\":\"204c62e750f69adcf37bec4352bcfd94c5a581274cf98485575a9802b5592d39\",\"source-analysis.json\":\"8dd33068fab07f33d04cc11c4dd708432d226974384853df5b0117aecd35b9c5\",\"source-join-analysis.json\":\"d5e3a4c884a717fcbb92098c878bfd8c1e3c12ac6a6e11085547c1736c3c3666\",\"sources.json\":\"744e14da6ee8492f8e6037076c475cbfaf25fb19df40bbb5f1be1bea1ef420ec\",\"verify-source.mjs\":\"4ca5e49e49cd75c1a3a2d7787f5a33befd1532e44409838856732fd2e42936de\",\"serve-native.py\":\"6a714d256da6c69d9d81c709a4f88797285008115e418ad3eeded066ca488b4b\",\"native-server-compile.mjs\":\"b31e49cff7958ee0dadb73c0e0d81ec67805d26374730272fcfbf001d4f0b543\"}")
assert CFG['defaultRoot']=='u7cba' and CFG['supportedRoots']==['u7cba'] and CFG['count']==14
GLYPH=CFG['glyph'];COUNT=CFG['count'];NAMES=CFG['wholeNames'];SUPPORTED=CFG['supportedRoots'];DEFAULT=CFG['defaultRoot']
def check_pins():
    for file,pin in CFG['pins'].items():
        assert hashlib.sha256((HERE/file).read_bytes()).hexdigest()==pin,'Frozen original input changed: '+file
check_pins()
meta=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('own_978_order_native_ram',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES[GLYPH]={'strokes':COUNT,'dictionary':meta['dictionary']}
dictionary=r.base.renderer.source(GLYPH)
assert len(dictionary['strokes'])==COUNT
def compiled(root=DEFAULT):
    assert root in SUPPORTED,'Only explicit terminal candidate whole profiles are supported'
    check_pins()
    return json.loads(subprocess.check_output(['rtk','proxy','node',str(HERE/'server-compile-order-candidate.mjs'),root],cwd=ROOT))
def transitions(c):
    result=[]
    for pen,masks in enumerate(c['strokes'],1):
        total=sum(m['weight'] for m in masks);prior=0
        for maskIndex,mask in enumerate(masks[:-1],1):
            prior+=mask['weight'];result.append({'pen':pen,'mask':maskIndex+1,'start':prior/total,'weights':[m['weight'] for m in masks]})
    return result
def whole_svg(root):
    assert root in NAMES
    p=json.loads((HERE/('engine-whole-'+root+'.json')).read_text())
    assert p['groups'] is not None and p['trace'] is not None
    polygons=[v for group in p['groups'] for v in group['polygons']]
    assert all(v['off']==0 for poly in polygons for v in poly)
    return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
def nav(root):
    encoded=html.escape(root)
    return '<nav><a href="/whole?id='+encoded+'">전체</a><a href="/whole?id='+encoded+'&amp;all=1">'+str(len(NAMES))+' whole</a><a href="/pairs?id='+encoded+'">전'+str(COUNT)+'방향</a><a href="/progressive?id='+encoded+'&amp;stroke='+str(CFG['tailPen'])+'&amp;enlarged=1&amp;samples=1">14획 fine</a></nav>'
def base(c):
    return '<!doctype html><meta charset="utf-8"><title>'+GLYPH+' strict original review</title><style>body{font:16px system-ui;margin:16px;width:1112px;background:white;color:#111}h1{font-size:23px;margin:10px 0}a,button,input{margin:5px}svg{width:420px;height:420px}.pair{display:flex;gap:20px}.directions,.whole-list{display:grid;grid-template-columns:556px 556px}.directions section{width:550px;border-bottom:1px solid #ddd}.directions svg{width:200px;height:210px}.samples{display:grid;grid-template-columns:repeat(3,180px);gap:4px}.samples svg{width:170px;height:170px}.samples div{font-size:13px}</style>'+nav(c['sourceRoot'])+'<h1>'+GLYPH+' · '+html.escape(c['sourceRoot'])+' · '+str(COUNT)+'획/'+str(c['masks'])+'mask</h1><p>원본 좌표·폭 보존 · 전체 획 순서 후보 · 국내 native 미승인 · 사전 RAM-only</p>'+' '.join('<a href="/whole?id='+root+'">'+root+'</a>' for root in SUPPORTED)
def script(c):
    return '<script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';'
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            parsed=urlparse(self.path);q=parse_qs(parsed.query);route=parsed.path;root=q.get('id',[DEFAULT])[0]
            assert root in SUPPORTED,'Unsupported explicit whole'
            c=compiled(root)
            if route=='/checks' or q.get('view')==['checks']:
                body=json.dumps({k:v for k,v in c.items() if k not in ['strokes','render']}|{'wholeNames':NAMES,'supportedProfiles':SUPPORTED,'finePens':[i+1 for i,pen in enumerate(c['strokes']) if any(m['direction']=='curve' for m in pen)],'maskTransitions':transitions(c),'privateDictionarySHA256':meta['dictionary']['sha256'],'privateDictionaryClips':len(dictionary['strokes']),'privateGraphicsSaved':False,'nativeApproval':False}).encode();mime='application/json'
            elif route in ['/','/whole'] and 'stroke' not in q:
                content=base(c)+'<div class="pair">'+r.base.full_dictionary(GLYPH)+whole_svg(root)+'</div>'
                if q.get('all')==['1']:content+='<div class="whole-list">'+''.join('<section><h2>'+n+'</h2>'+whole_svg(n)+'</section>' for n in NAMES)+'</div>'
                body=content.encode();mime='text/html; charset=utf-8'
            elif route=='/pairs':
                pairs=[tuple(map(int,value.split(':'))) for value in q.get('pairs',[''])[0].split(',') if value] or [(n,n) for n in range(1,COUNT+1)]
                assert all(1<=left<=COUNT and 1<=right<=COUNT for left,right in pairs)
                content=base(c)+'<p>왼쪽: 국내 자료 · 오른쪽: 순서 보정된 compiled candidate</p><div class="directions">'
                for i,(left,right) in enumerate(pairs):
                    content+='<section><h2>국내 '+str(left)+' / candidate '+str(right)+' · 원raw '+html.escape(str(c['sourceGroups'][right-1]))+'</h2><div class="pair">'+r.base.renderer.dictionary_svg(GLYPH,left,True,'dom'+str(i))+'<div id="candidate'+str(i)+'"></div></div></section>'
                content+='</div>'+script(c)+'const pens='+json.dumps([right for _,right in pairs])+';pens.forEach((pen,i)=>document.getElementById("candidate"+i).innerHTML=render(strokes,pen,1,"pair"+i));</script>'
                body=content.encode();mime='text/html; charset=utf-8'
            elif route=='/progressive' or (route=='/' and 'stroke' in q):
                n=int(q.get('stroke',['1'])[0]);assert 1<=n<=COUNT
                masks=c['strokes'][n-1];total=sum(mask['weight'] for mask in masks);prior=0;controls=[]
                for k,mask in enumerate(masks[:-1],1):
                    prior+=mask['weight'];t=prior/total
                    controls.append('<button onclick="show('+repr(max(0,t-1e-10))+')">mask'+str(k+1)+' 직전</button><button onclick="show('+repr(t)+')">mask'+str(k+1)+' 경계</button><button onclick="show('+repr(min(1,t+1e-10))+')">mask'+str(k+1)+' 직후</button>')
                large=q.get('enlarged')==['1'];samples=q.get('samples')==['1'] or not large
                content=base(c)+'<h2>'+str(n)+'/'+str(COUNT)+' · 원raw'+html.escape(str(c['sourceGroups'][n-1]))+'</h2>'+''.join('<a href="/progressive?id='+html.escape(root)+'&amp;stroke='+str(i)+'&amp;samples=1">'+str(i)+'</a>' for i in range(1,COUNT+1))
                if large:content+='<style>.live svg{width:520px;height:520px}</style>'
                content+='<div class="pair live">'+r.base.renderer.dictionary_svg(GLYPH,n,True,'domestic'+str(n))+'<div id="candidate"></div></div>'
                content+=''.join('<button onclick="show('+repr(value)+')">'+label+'</button>' for value,label in [(0,'0%'),(.25,'25%'),(.5,'50%'),(.75,'75%'),(.99,'99%'),(.9999,'99.99%'),(1,'100%')])+''.join(controls)
                content+='<button id="play">재생</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" step="0.0001" value="0"><output id="value">0%</output><div class="samples" id="samples"></div>'+script(c)+'const stroke='+str(n)+';const show=p=>{candidate.innerHTML=render(strokes,stroke,p,"live");progress.value=p*100;value.textContent=(p*100).toFixed(4)+"%"};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};'
                if samples:content+='[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{document.getElementById("samples").innerHTML+="<div>"+(p*100)+"%"+render(strokes,stroke,p,"sample"+i)+"</div>";});'
                content+='show(0);</script>'
                body=content.encode();mime='text/html; charset=utf-8'
            else:self.send_error(404);return
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(body)));self.end_headers();self.wfile.write(body)
        except Exception as error:self.send_error(500,str(error))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
    c=compiled();server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'supportedProfiles':SUPPORTED,'pens':c['pens'],'masks':c['masks'],'compiledSHA256':c['compiledSHA256'],'fullProofSHA256':c['fullProofSHA256'],'dictionaryClips':len(dictionary['strokes']),'dictionarySHA256':meta['dictionary']['sha256'],'privateMediaSaved':False,'nativeApproval':False}),flush=True)
    server.serve_forever()
