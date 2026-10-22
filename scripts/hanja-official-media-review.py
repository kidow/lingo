#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Controlled original-media review, not the publisher's parent player."""
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, json, re
from pathlib import Path
from urllib.request import build_opener, HTTPRedirectHandler
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

ROOT = Path(__file__).resolve().parent.parent
SVG_URL = 'http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/928D.svg'
CSS_URL = 'http://img.e-hanja.kr/hanjaSvg/aniSVG/libs/opmGna.svg.ani.min.css'
SVG_SHA = 'a825b19bf56027716f27513367be4cf61a8dcbb258cbc8b746743f8ba022cc9e'
CSS_SHA = '5c427b5157bb10b0f03e2b42207c55cb2149098044c3a254cd6d0a8d22f8af18'
SVG_ROUTE = '/media/9200/928D.svg'
CSS_ROUTE = '/media/libs/opmGna.svg.ani.min.css'
FETCH_COUNT = 0

def require(value, message):
    if not value:
        raise ValueError(message)

def sha(raw):
    return hashlib.sha256(raw).hexdigest()

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        raise ValueError('Redirect rejected')

def fetch_asset(pin):
    global FETCH_COUNT
    with build_opener(NoRedirect()).open(pin['url'], timeout=20) as response:
        require(response.status == 200 and response.geturl() == pin['url'], 'Asset URL/status changed')
        raw = response.read(pin['bytes'] + 1)
    require(len(raw) == pin['bytes'] and sha(raw) == pin['sha256'], 'Asset bytes changed')
    raw.decode('utf-8', errors='strict')
    FETCH_COUNT += 1
    return raw

BROWSER = r'''
const media=document.querySelector('#original'), status=document.querySelector('#status');
let selected=null, original=null, doc=null, mode='loading', requested=null, duration=null, errors=[];
const geometryNames=['d','clip-path','stroke-width','stroke-dasharray','stroke-dashoffset','transform'];
function geometry(p){return JSON.stringify(geometryNames.map(k=>[k,p.getAttribute(k)]));}
function verify(){
 if(!selected||!selected.isConnected||selected.ownerDocument!==doc||geometry(selected)!==original)throw Error('Original path attributes changed');
}
function report(){
 try{verify();const c=doc.defaultView.getComputedStyle(selected);
 status.textContent=JSON.stringify({ready:true,mode,requestedFraction:requested,selectedStroke:10,
 originalDurationMs:duration,animationName:c.animationName,animationDuration:c.animationDuration,
 animationDelay:c.animationDelay,animationPlayState:c.animationPlayState,computedStrokeDashoffset:c.strokeDashoffset,
 class:selected.getAttribute('class'),originalPathAttributesUnchanged:true,errors},null,2);
 }catch(e){errors.push(String(e));status.textContent=JSON.stringify({ready:false,errors},null,2);}
}
function reset(){
 verify();selected.classList.remove('stroke-normal','stroke-radical','immediate');
 selected.style.removeProperty('animation-delay');selected.style.removeProperty('animation-play-state');
 void doc.documentElement.getBoundingClientRect();
}
function play(){try{reset();requested=null;mode='playing-original-css';selected.classList.add('stroke-normal','immediate');verify();report();}catch(e){errors.push(String(e));report();}}
function at(f){try{
 if(![0,.05,.1,.25,.5,.75,1].includes(f))throw Error('Unlisted clock fraction');
 reset();selected.classList.add('stroke-normal','immediate');
 selected.style.animationPlayState='paused';selected.style.animationDelay=String(-f*duration)+'ms';
 requested=f;mode='paused-original-css';verify();report();
 }catch(e){errors.push(String(e));report();}}
media.addEventListener('load',()=>{try{
 doc=media.contentDocument;if(!doc||doc.documentElement.localName!=='svg')throw Error('Original SVG missing');
 const paths=[...doc.querySelectorAll('path[clip-path]')];
 const timed=paths.map(p=>({p,d:p.style.getPropertyValue('--d').trim(),t:p.style.getPropertyValue('--t').trim()}));
 if(timed.length!==14||timed.some(x=>!/^\d+ms$/.test(x.d)||!/^\d+ms$/.test(x.t)))throw Error('Original timed path list changed');
 timed.sort((a,b)=>parseInt(a.d)-parseInt(b.d));selected=timed[9].p;duration=parseInt(timed[9].t);
 if(timed[9].d!=='7861ms'||timed[9].t!=='1082ms')throw Error('Selected original timing changed');
 original=geometry(selected);mode='original-static';report();
 document.querySelectorAll('button').forEach(b=>b.disabled=false);
 }catch(e){errors.push(String(e));status.textContent=JSON.stringify({ready:false,errors});}});
document.querySelector('#play').addEventListener('click',play);
document.querySelectorAll('[data-fraction]').forEach(b=>b.addEventListener('click',()=>at(Number(b.dataset.fraction))));
setInterval(()=>{if(selected)report();},100);
'''

def page(config):
    buttons = ''.join('<button disabled data-fraction="'+str(f)+'">시계 '+str(f)+'</button>' for f in [0,.05,.1,.25,.5,.75,1])
    return ('<!doctype html><html lang="ko"><meta charset="utf-8"><title>銍 원미디어 10획 검토</title>'
        '<style>body{font:15px system-ui;margin:12px;max-width:540px}button{margin:3px;padding:8px}pre{height:210px;overflow:auto;white-space:pre;font:12px monospace}object{display:block;width:520px;height:520px;max-width:none}</style>'
        '<h1>銍 원미디어 · 10획</h1><p>공식 부모 UI가 아닌 통제된 원미디어 검토. 원SVG·CSS 바이트를 그대로 전달하고 선택 path의 공식 클래스와 CSS 시계만 조절합니다. 다른 획·필순·연속성·런타임 승인은 없습니다.</p>'
        '<button id="play" disabled>선택 10획 재생 · 공식 CSS</button>'+buttons+
        '<p>시계 0~1은 원 --t의 비율입니다. 공식 keyframes는 .75에 dashoffset 0에 도달합니다. 자체 경로 보간은 없습니다.</p>'
        '<pre id="status">loading</pre><object id="original" type="image/svg+xml" data="'+SVG_ROUTE+'" aria-label="銍 공식 원SVG 10획 통제 검토"></object>'
        '<script>'+BROWSER+'</script></html>').encode('utf-8')

def main():
    parser = argparse.ArgumentParser(description='Pinned original SVG/CSS RAM-only controlled media review')
    parser.add_argument('--config', required=True)
    parser.add_argument('--config-sha', required=True)
    parser.add_argument('--port', type=int, default=0)
    parser.add_argument('--check-only', action='store_true')
    args = parser.parse_args()
    require(re.fullmatch('[0-9a-f]{64}', args.config_sha) and 0 <= args.port <= 65535, 'Invalid config SHA/port')
    relative = Path(args.config)
    require(not relative.is_absolute() and '..' not in relative.parts, 'Repository config required')
    config_path = (ROOT / relative).resolve()
    require(config_path == ROOT/'docs/hanja-official-media-review-u928d-2026-10-22/config.json', 'Config path rejected')
    raw = config_path.read_bytes()
    require(sha(raw) == args.config_sha, 'Config changed')
    config = json.loads(raw)
    require(set(config) == {'schema','glyph','selectedStroke','media','metadataFile','metadataSHA256','scope'}, 'Config fields changed')
    require(config['schema'] == 'hanja-controlled-original-media/v1' and config['glyph'] == '銍' and config['selectedStroke'] == 10, 'Review target changed')
    expected = {'svg':{'url':SVG_URL,'bytes':6601,'sha256':SVG_SHA},'css':{'url':CSS_URL,'bytes':804,'sha256':CSS_SHA}}
    require(config['media'] == expected, 'Exact official media allowlist changed')
    require(config['scope'] == 'controlled-original-media-only/no-temporal-approval', 'Scope changed')
    require(config['metadataFile'] == 'docs/hanja-goal-glyphwiki-batch898-2026-10-13/metadata.json' and config['metadataSHA256'] == 'cf5c3a2ae20e8aa19cfd4ab6d4cef0de9a84c7b88cafa99f7ec35efcda5caddc', 'Original metadata binding changed')
    metadata_raw = (ROOT/config['metadataFile']).read_bytes()
    require(sha(metadata_raw) == config['metadataSHA256'], 'Original metadata bytes changed')
    require({k:json.loads(metadata_raw)['dictionary'][k] for k in ['url','bytes','sha256']} == expected['svg'], 'Dictionary binding changed')
    if args.check_only:
        print(json.dumps({'guardPass':True,'fetchCount':FETCH_COUNT,'serverStarts':0,'originalMediaOnly':True}));return
    svg = fetch_asset(expected['svg'])
    css = fetch_asset(expected['css'])
    markup = page(config)
    routes = {'/':(markup,'text/html; charset=utf-8'),SVG_ROUTE:(svg,'image/svg+xml; charset=utf-8'),CSS_ROUTE:(css,'text/css; charset=utf-8')}
    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):
            if self.path not in routes:
                self.send_error(404, 'Fixed route only');return
            body, mime = routes[self.path]
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Content-Length',str(len(body)))
            self.send_header('Cache-Control','no-store')
            self.send_header('Content-Security-Policy',"default-src 'self'; script-src 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'self'; connect-src 'none'")
            self.end_headers();self.wfile.write(body)
        def log_message(self, *args):
            pass
    server = ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'pid':__import__('os').getpid(),'port':server.server_address[1],'RAMFetchCount':FETCH_COUNT,'SVG_SHA256':sha(svg),'CSS_SHA256':sha(css)}),flush=True)
    server.serve_forever()

if __name__ == '__main__':
    main()
