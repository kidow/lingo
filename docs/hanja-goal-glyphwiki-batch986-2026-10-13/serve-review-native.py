import sys
sys.dont_write_bytecode=True
import json,os,html,hashlib,importlib.util,subprocess,argparse
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
CFG=json.loads((HERE/'native-server-input-pins.json').read_text())
PREP=json.loads((HERE/'isolated-native-preparation.json').read_text())
assert PREP['originalPins']=={"NOTICE.md":"6dc72add0a15f5100cafe8124b344fd6b6febb28a4589d3c79743f8b8354fa25","candidate-compile-analysis.json":"1f07b48189be17e84623f76393f72e94a1d46fd522b44a701b06bd201b6d6933","engine-proof.json":"f00703bb86224068e9b1811dfcbb868e27be0152c4e0bc873b77f6179bce8ae8","engine-whole-u70b0-ue0100.json":"f00703bb86224068e9b1811dfcbb868e27be0152c4e0bc873b77f6179bce8ae8","engine-whole-u70b0.json":"f00703bb86224068e9b1811dfcbb868e27be0152c4e0bc873b77f6179bce8ae8","metadata.json":"64011b6ce401bbc1351885610a3d70d6404ba6949cfe4566a4550c1e6d0b3bc8","native-server-input-pins.json":"092d78c890b1184c3b3f6c96d270e202f36242c842ed1aa34d8ddbbecca2b76f","progressive.mjs":"f9e82549e16dcfd93c79489affc2c675fa93388800e91c6457fd9b6dca23d178","serve-native.py":"4a814e1d7934ed0525162710044d066be1200ef2d066fa51513729e92b990dfe","source-analysis.json":"9a0b1e4d23f3b730dc951eef68ca6f551ab47e9462cc4a2153c16ffc05494d85","source-join-analysis.json":"1e01ae2120562594690ab63f164f886a0871dab2ac60149c7c212615ec2a35bc","source-only-helper-readiness.json":"8320d0ddfbe89c5413bc6b432bf6a32695b371c4c9c843191765145668c2ff8e","source-preservation-audit.json":"06f9663ac0aefe83093479b421f8906f78fe28626cb4ef00d063e9d6ab036977","sources.json":"df773dcb5fc448d5fe2fa88aa2eec180a0de333de8c17e22d1ac1a4d72d98ab2","strict-native-adapter.mjs":"bb7259660aeca12cfa2a2cb4bdfb7d6ad9733a863fc7d3fce401e8dbab0f0379","strict-native-server-preflight.json":"ab7d6e7bf5cc8723e7e41df67d808fb1e1b2d533e1c40a6aba4a97681eed3888","verify-source.mjs":"8f63d29ed2e2ad0bff373a1cee3faa23011ef9495e017b227e383abf5716017e"}
PORT=CFG['port']; GLYPH=CFG['glyph']; NAMES=CFG['wholeNames']; PINS=CFG['pins']
def check_pins():
    for f,pin in {**PINS,**PREP['originalPins'],**PREP['additionalProtectedPins'],**PREP['newFilesSHA256']}.items():assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==pin,'Source pin changed: '+f
check_pins()
meta=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('b986_immutable_ram_renderer',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES[GLYPH]={'strokes':CFG['domestic'],'dictionary':meta['dictionary']}
def compiled():
    check_pins()
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',CFG['nodeCode']],cwd=ROOT))
def original_svg(name,end=None):
    assert name in NAMES
    p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
    if not isinstance(p.get('groups'),list):
        return '<p>Blocked missing fixed source: '+html.escape(', '.join(p.get('missing',[])))+' · original groups/trace/defaults remain null · no SVG</p>'
    groups=p['groups'] if end is None else p['groups'][:end]
    polygons=[v for g in groups for v in g['polygons']]
    assert all(v['off']==0 for p in polygons for v in p)
    paths=' '.join(' '.join(('M' if i==0 else 'L')+str(v['x']/2)+' '+str(v['y']/2) for i,v in enumerate(p))+' Z' for p in polygons)
    return '<svg viewBox="0 0 100 100" aria-label="'+html.escape(name)+'"><path fill="#242422" d="'+paths+'"/></svg>'
def nav():
    return '<nav><a href="/whole">전체 원본</a> <a href="/pairs">방향 대조</a> <a href="/progressive?stroke=1&amp;enlarged=1&amp;samples=1">획 후보 검토</a></nav>'
def script(c):
    return '<script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';'
def blocked_page(c):
    return '<!doctype html><meta charset="utf-8"><title>'+GLYPH+' source blocked</title>'+nav()+'<h1>'+GLYPH+' · 재생 후보 보류</h1><p>원본 자료는 유지하며 창작 연결·펜 수 맞춤을 하지 않습니다.</p><pre>'+html.escape(json.dumps(c,ensure_ascii=False,indent=2))+'</pre>'
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*a):pass
    def do_GET(self):
        try:
            c=compiled();parsed=urlparse(self.path);q=parse_qs(parsed.query);route=parsed.path
            if q.get('view')==['checks']:
                body=json.dumps({k:v for k,v in c.items() if k not in ['strokes','render']}|{'wholeNames':NAMES,'wholeEvidence':CFG['wholeEvidence'],'sourceInputPinsVerified':len(PINS),'catalog':CFG['catalog'],'domestic':CFG['domestic'],'nativeApproval':False}).encode();mime='application/json'
            elif route in ['/','/whole']:
                body=('<!doctype html><meta charset="utf-8"><title>'+GLYPH+' whole review</title><style>body{font:16px system-ui;margin:20px;width:980px}.wholes{display:grid;grid-template-columns:repeat(2,1fr)}svg{width:420px;height:420px}a{margin:8px}</style>'+nav()+'<h1>'+GLYPH+' · catalog '+str(CFG['catalog'])+' / domestic '+str(CFG['domestic'])+' · whole '+str(len(NAMES))+'</h1>'+r.base.full_dictionary(GLYPH)+'<div class="wholes">'+''.join('<section><h2>'+n+'</h2>'+original_svg(n)+'</section>' for n in NAMES)+'</div><p>사전 SVG RAM-only · 전체자형과 필순 native 미승인</p>').encode();mime='text/html; charset=utf-8'
            elif route=='/pairs' and c.get('blocked'):
                name=q.get('id',[CFG['identity']['sourceRoot']])[0];assert name in NAMES
                source=json.loads((HERE/('engine-whole-'+name+'.json')).read_text());assert isinstance(source.get('groups'),list),'Missing fixed source geometry; no implicit sibling substitution';draw=int(q.get('domestic',['1'])[0]);raw=int(q.get('raw',['1'])[0]);assert 1<=draw<=CFG['domestic'] and 1<=raw<=len(source['groups'])
                body=('<!doctype html><meta charset="utf-8"><title>'+GLYPH+' raw pair</title><style>body{font:16px system-ui;margin:20px}.pair{display:flex;gap:20px}svg{width:520px;height:520px}</style>'+nav()+'<h1>'+GLYPH+' · 국내 '+str(draw)+' / 원본 raw cumulative '+str(raw)+' · '+name+'</h1><p>Raw 순서는 국내 필순으로 승인되지 않았습니다.</p><div class="pair">'+r.base.renderer.dictionary_svg(GLYPH,draw,True,'dom'+str(draw))+original_svg(name,raw)+'</div><p>원본 blocked: '+html.escape(c['reason'])+'</p>').encode();mime='text/html; charset=utf-8'
            elif route=='/pairs':
                count=c['compiledPens'];blocks=''.join('<section><h2>'+str(n)+'획 · raw'+html.escape(str(c['sourceGroups'][n-1]))+'</h2><div class="pair">'+r.base.renderer.dictionary_svg(GLYPH,n,True,'dom'+str(n))+'<div id="candidate'+str(n)+'"></div></div></section>' for n in range(1,count+1))
                body=('<!doctype html><meta charset="utf-8"><title>'+GLYPH+' direction pairs</title><style>body{font:16px system-ui;margin:20px;width:900px}.pair{display:grid;grid-template-columns:200px 200px;gap:16px}svg{width:200px;height:210px}a{margin:8px}</style>'+nav()+'<h1>'+GLYPH+' · '+str(count)+'방향 · original 후보</h1>'+blocks+script(c)+'for(let n=1;n<=strokes.length;n++)document.getElementById("candidate"+n).innerHTML=render(strokes,n,1,"pair"+n);</script>').encode();mime='text/html; charset=utf-8'
            elif route=='/progressive' and c.get('blocked'):
                body=blocked_page(c).encode();mime='text/html; charset=utf-8'
            elif route=='/progressive':
                count=c['compiledPens'];n=int(q.get('stroke',['1'])[0]);assert 1<=n<=count
                masks=c['strokes'][n-1];total=sum(m['weight'] for m in masks);cumulative=0;controls=[]
                for index,m in enumerate(masks[:-1],1):
                    cumulative+=m['weight'];bound=cumulative/total
                    controls.append('<button onclick="show('+repr(max(0,bound-1e-10))+')">마스크 '+str(index+1)+' 경계 직전</button><button onclick="show('+repr(bound)+')">마스크 '+str(index+1)+' 경계</button><button onclick="show('+repr(min(1,bound+1e-10))+')">마스크 '+str(index+1)+' 경계 직후</button>')
                large=q.get('enlarged')==['1'];samples=not large or q.get('samples')==['1']
                body=('<!doctype html><meta charset="utf-8"><title>'+GLYPH+' progressive review</title><style>body{font:16px system-ui;margin:20px;width:1200px}.pair{display:flex;gap:30px}svg{width:'+('520' if large else '300')+'px;height:'+('520' if large else '300')+'px}.samples{display:flex;flex-wrap:wrap}.samples svg{width:170px;height:170px}a,button,input{margin:8px}</style>'+nav()+'<h1>'+GLYPH+' · '+str(n)+'/'+str(count)+' · 원본 후보</h1>'+''.join('<a href="/progressive?stroke='+str(i)+'&amp;samples=1">'+str(i)+'획</a>' for i in range(1,count+1))+'<div class="pair">'+r.base.renderer.dictionary_svg(GLYPH,n,True,'domestic'+str(n))+'<div id="candidate"></div></div><button onclick="show(0)">0%</button><button onclick="show(.25)">25%</button><button onclick="show(.5)">50%</button><button onclick="show(.75)">75%</button><button onclick="show(.99)">99%</button><button onclick="show(.9999)">99.99%</button><button onclick="show(1)">100%</button>'+''.join(controls)+'<button id="play">재생</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" step="0.0001" value="0"><output id="value">0%</output><div class="samples" id="samples"></div><p>원본 좌표·폭·다각형 보존 · 사전 RAM-only · native0</p>'+script(c)+'const stroke='+str(n)+';const show=p=>{candidate.innerHTML=render(strokes,stroke,p,"live");progress.value=p*100;value.textContent=(p*100).toFixed(4)+"%"};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};'+('[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{samples.innerHTML+="<div>"+(p*100)+"%"+render(strokes,stroke,p,"sample"+i)+"</div>"});' if samples else '')+'show(0);</script>').encode();mime='text/html; charset=utf-8'
            else:self.send_error(404);return
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as e:self.send_error(500,str(e))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    PORT=server.server_address[1]
    c=compiled();print(json.dumps({'port':PORT,'pid':os.getpid(),'wholeVariants':len(NAMES),'compiledPens':c['compiledPens'],'compiledMasks':c['compiledMasks'],'blocked':c.get('blocked',False),'reason':c.get('reason'),'sourceRoot':CFG['identity']['sourceRoot'],'sourceInputPinsVerified':len(PINS),'nativeApproval':False}),flush=True)
    server.serve_forever()
