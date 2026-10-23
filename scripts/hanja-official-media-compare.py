#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Explicitly pinned original SVG/CSS clock review; never the publisher's parent UI."""
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, importlib.util, json, re
from pathlib import Path
from urllib.parse import urlparse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
SHARED = 'scripts/hanja-official-media-review.py'
SHARED_SHA = '76d075a03beb017dc2fa88a9534bc87cd2e936635d27e73ad3b7ac45cb6cce48'
CSS = {'url':'http://img.e-hanja.kr/hanjaSvg/aniSVG/libs/opmGna.svg.ani.min.css','bytes':804,'sha256':'5c427b5157bb10b0f03e2b42207c55cb2149098044c3a254cd6d0a8d22f8af18'}
INERT_SCRIPT = {'attributes':{'{http://www.w3.org/1999/xlink}href':'../libs/gna.lib.svg.ani.min.js'},'bodyBytes':0,'bodySHA256':'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855','observedExternalURL':'http://img.e-hanja.kr/hanjaSvg/aniSVG/libs/gna.lib.svg.ani.min.js','observedExternalBytes':3865,'observedExternalSHA256':'e807c25571b8c0c46a80a37d86ff7b982822303dfb28d7464e35dfdffb2d2690','executionPolicy':'script-src-none-and-no-script-route'}
NS = '{http://www.w3.org/2000/svg}'
GEOMETRY = ['d','clip-path','stroke-width','stroke-dasharray','stroke-dashoffset','transform','pathLength']

def require(value, message):
    if not value:
        raise ValueError(message)

def sha(raw):
    return hashlib.sha256(raw).hexdigest()

def pinned_path(name):
    require(type(name) is str and not Path(name).is_absolute() and '..' not in Path(name).parts, 'Repository relative path required')
    path = (ROOT/name).resolve()
    require(path.is_relative_to(ROOT) and path == ROOT/name and path.is_file(), 'Fixed repository file required')
    return path

def validate_script_config(config):
    require(config.get('inertOriginalScripts') == [INERT_SCRIPT], 'Exact inert publisher script pin required')

def validate(config):
    fields = {'schema','glyph','sourceRoot','domesticClips','allowedStrokes','defaultStroke','media','svgRoot','timedPaths','metadataFile','metadataSHA256','shared','launcherSHA256','scope','nativeApproval','runtimeApplied','inertOriginalScripts'}
    require(type(config) is dict and set(config) == fields, 'Exact config fields required')
    require(config['schema'] == 'hanja-pinned-original-media-compare/v1' and type(config['glyph']) is str and len(config['glyph']) == 1, 'Review identity changed')
    require(re.fullmatch(r'u[0-9a-f]{4,6}(?:-[a-z0-9-]+)?', config['sourceRoot']) is not None, 'Source context identity required')
    require(config['sourceRoot'].split('-')[0] == 'u'+format(ord(config['glyph']),'x'), 'Source context/glyph mismatch')
    require(type(config['domesticClips']) is int and 1 <= config['domesticClips'] <= 128, 'Domestic count required')
    selected = config['allowedStrokes']
    require(type(selected) is list and 1 <= len(selected) <= 16 and len(set(selected)) == len(selected) and all(type(n) is int and 1 <= n <= config['domesticClips'] for n in selected) and config['defaultStroke'] in selected, 'Explicit selected stroke allowlist required')
    require(config['scope'] == 'controlled-original-media-only/no-temporal-approval' and config['nativeApproval'] is False and config['runtimeApplied'] is False, 'Unapproved media-only scope required')
    require(config['shared'] == {'path':SHARED,'SHA256':SHARED_SHA} and re.fullmatch('[0-9a-f]{64}', config['launcherSHA256']), 'Adapter/shared identity required')
    require(set(config['media']) == {'svg','css'} and config['media']['css'] == CSS, 'Exact CSS allowlist required')
    svg = config['media']['svg']
    require(set(svg) == {'url','bytes','sha256'} and re.fullmatch(r'http://img\.e-hanja\.kr/hanjaSvg/aniSVG/[0-9A-Fa-f]{4}/[0-9A-Fa-f]{4,6}\.svg', svg['url']) and svg['url'].rsplit('/',1)[1].lower() == format(ord(config['glyph']),'x')+'.svg', 'Exact official SVG URL required')
    require(type(svg['bytes']) is int and 0 < svg['bytes'] <= 1048576 and re.fullmatch('[0-9a-f]{64}', svg['sha256']), 'SVG byte pin required')
    require(type(config['svgRoot']) is dict and set(config['svgRoot']) == {'id','class','viewBox','version'}, 'Original SVG root attributes required')
    rows = config['timedPaths']
    require(type(rows) is list and len(rows) == config['domesticClips'], 'Exact timed path list required')
    keys = {'stroke','id','clipPath','class','delayMs','durationMs','pathLength','inlineStyle','geometrySHA256'}
    for i, row in enumerate(rows, 1):
        require(type(row) is dict and set(row) == keys and row['stroke'] == i, 'Exact path pin fields required')
        require(type(row['delayMs']) is int and row['delayMs'] >= 0 and type(row['durationMs']) is int and row['durationMs'] > 0, 'Original timing required')
        require(type(row['clipPath']) is str and re.fullmatch(r'url\(#[A-Za-z0-9_-]+\)',row['clipPath']) and re.fullmatch('[0-9a-f]{64}',row['geometrySHA256']), 'Original clip/geometry pin required')
        require(type(row['inlineStyle']) is str and type(row['pathLength']) is str and (row['id'] is None or type(row['id']) is str) and (row['class'] is None or type(row['class']) is str), 'Original path attributes required')
        require(i == 1 or row['delayMs'] >= rows[i-2]['delayMs'] + rows[i-2]['durationMs'], 'Original path order overlaps')
    require(len({r['clipPath'] for r in rows}) == len(rows), 'Original clip references must be unique')
    validate_script_config(config)

def load_config(name, expected_sha):
    require(re.fullmatch('[0-9a-f]{64}', expected_sha), 'Config SHA required')
    path = pinned_path(name)
    terminal16 = path == ROOT/'docs/hanja-official-media-compare-u802d-2026-10-24/config-16.json'
    terminal17 = path == ROOT/'docs/hanja-official-media-compare-u99fe-2026-10-24/config-17.json'
    require(terminal16 or terminal17 or (path.name == 'config.json' and path.parent.parent == ROOT/'docs' and re.fullmatch(r'hanja-official-media-compare-u[0-9a-f]{4,6}-\d{4}-\d{2}-\d{2}',path.parent.name)), 'Explicit official-media config location required')
    raw = path.read_bytes()
    require(len(raw) <= 65536 and sha(raw) == expected_sha, 'Config changed')
    config = json.loads(raw)
    validate(config)
    if terminal16:
        require(config['sourceRoot'] == 'u802d-k' and config['allowedStrokes'] == [16] and config['defaultStroke'] == 16 and config['metadataFile'] == 'docs/hanja-official-media-compare-u802d-2026-10-24/metadata-16.json', 'Exact 耭16 terminal-only config required')
    if terminal17:
        require(config['sourceRoot'] == 'u99fe' and config['allowedStrokes'] == [17] and config['defaultStroke'] == 17 and config['metadataFile'] == 'docs/hanja-official-media-compare-u99fe-2026-10-24/metadata.json', 'Exact 駾17 terminal-only config required')
    require(path.parent.name.startswith('hanja-official-media-compare-u'+format(ord(config['glyph']),'x')+'-'), 'Glyph/config path mismatch')
    require(sha(Path(__file__).read_bytes()) == config['launcherSHA256'], 'Adapter changed')
    require(sha(pinned_path(SHARED).read_bytes()) == SHARED_SHA, 'Original fixed media helper changed')
    metadata_raw = pinned_path(config['metadataFile']).read_bytes()
    require(sha(metadata_raw) == config['metadataSHA256'], 'Original metadata changed')
    metadata = json.loads(metadata_raw)
    require(metadata['glyph'] == config['glyph'] and metadata['candidate']['strokes'] == config['domesticClips'] == metadata['dictionary']['clips'], 'Domestic/catalog identity mismatch')
    require({k:metadata['dictionary'][k] for k in ['url','bytes','sha256']} == config['media']['svg'], 'Original dictionary pin mismatch')
    return config

def validate_script_structure(root, config):
    validate_script_config(config)
    scripts = []
    for node in root.iter():
        require(not any(k.rsplit('}',1)[-1].lower().startswith('on') for k in node.attrib), 'Original inline event handler rejected')
        if node.tag.rsplit('}',1)[-1] == 'script':
            require(node.tag == NS+'script' and not list(node), 'Unexpected script namespace/children')
            body = (node.text or '').encode('utf-8')
            scripts.append({'attributes':dict(node.attrib),'bodyBytes':len(body),'bodySHA256':sha(body)})
    expected = [{k:pin[k] for k in ['attributes','bodyBytes','bodySHA256']} for pin in config['inertOriginalScripts']]
    require(scripts == expected, 'Original inert script structure changed')

def validate_media_tail(root, svg, config):
    validate_script_structure(root, config)
    rows = []
    for path in root.iter(NS+'path'):
        if not path.get('clip-path'):
            continue
        style = path.get('style','')
        d, t = re.search(r'--d:\s*(\d+)ms',style), re.search(r'--t:\s*(\d+)ms',style)
        require(d and t, 'Original timing missing')
        geometry = json.dumps([[k,path.get(k)] for k in GEOMETRY], separators=(',',':'), ensure_ascii=False).encode()
        rows.append({'id':path.get('id'),'class':path.get('class'),'clipPath':path.get('clip-path'),'delayMs':int(d[1]),'durationMs':int(t[1]),'pathLength':path.get('pathLength'),'inlineStyle':style,'geometrySHA256':sha(geometry)})
    rows.sort(key=lambda r:r['delayMs'])
    actual = [dict(stroke=i, **r) for i,r in enumerate(rows,1)]
    require(actual == config['timedPaths'], 'Original path/timing list changed')
    require(CSS['url'].rsplit('/',1)[1] in svg.decode('utf-8'), 'Original CSS resource reference missing')

def validate_media(svg, config):
    root = ET.fromstring(svg)
    require(root.tag == NS+'svg' and dict(root.attrib) == config['svgRoot'], 'Original SVG root changed')
    validate_media_tail(root, svg, config)

BROWSER = r'''
const CFG=__CONFIG__, media=document.querySelector('#original'),status=document.querySelector('#status');
const geometryNames=['d','clip-path','stroke-width','stroke-dasharray','stroke-dashoffset','stroke-linecap','stroke-linejoin','fill','transform','pathLength','viewBox','id','href','xlink:href','points'];
const geometryStyles=['--d','--t','stroke-width','stroke-dasharray','stroke-dashoffset','stroke-linecap','stroke-linejoin','fill','clip-path','transform'];
let doc=null,paths=[],snapshots=[],allGeometry=[],selected=null,selectedStroke=null,mode='loading',requested=null,errors=[],loadDiagnostics={cspViolations:[]};
document.addEventListener('securitypolicyviolation',e=>{loadDiagnostics.cspViolations.push({directive:e.effectiveDirective,blockedURI:e.blockedURI,disposition:e.disposition});if(!selected)status.textContent=JSON.stringify({ready:false,errors,loadDiagnostics});});
const fail=e=>{const text=String(e);if(!errors.includes(text)&&errors.length<10)errors.push(text);};
function geometry(p){return JSON.stringify([geometryNames.map(k=>[k,p.getAttribute(k)]),geometryStyles.map(k=>[k,p.style.getPropertyValue(k)])]);}
function verify(){
 if(!selected||!selected.isConnected||selected.ownerDocument!==doc)throw Error('Original selected path missing');
 for(const [node,value]of allGeometry)if(!node.isConnected||node.ownerDocument!==doc||geometry(node)!==value)throw Error('Original path/clip geometry changed');
 for(let i=0;i<paths.length;i++)if(paths[i]!==selected&&(paths[i].getAttribute('class')!==snapshots[i].class||paths[i].style.getPropertyValue('animation-delay')!==snapshots[i].delay||paths[i].style.getPropertyValue('animation-play-state')!==snapshots[i].state))throw Error('Unselected original animation changed');
}
function report(){try{
 verify();const c=doc.defaultView.getComputedStyle(selected),pin=CFG.timedPaths[selectedStroke-1];
 status.textContent=JSON.stringify({ready:errors.length===0,selectedStroke,allowedStrokes:CFG.allowedStrokes,sourceContext:CFG.sourceRoot,mode,requestedFraction:requested,originalDelayMs:pin.delayMs,originalDurationMs:pin.durationMs,
 animationName:c.animationName,animationDuration:c.animationDuration,animationDelay:c.animationDelay,animationPlayState:c.animationPlayState,computedStrokeDashoffset:c.strokeDashoffset,computedStrokeWidth:c.strokeWidth,computedLinecap:c.strokeLinecap,
 class:selected.getAttribute('class'),originalAllPathClipAttributesUnchanged:true,onlyOneSelection:true,configuredPublisherScriptPolicy:'script-src-none-and-no-script-route',expectedPublisherScriptCSPRejection:true,officialPublisherParentUI:false,temporalApproval:false,errors},null,2);
 }catch(e){fail(e);status.textContent=JSON.stringify({ready:false,selectedStroke,errors});}}
function restore(p){const i=paths.indexOf(p),s=snapshots[i];if(s.class===null)p.removeAttribute('class');else p.setAttribute('class',s.class);
 for(const [key,value]of [['animation-delay',s.delay],['animation-play-state',s.state]])if(value)p.style.setProperty(key,value);else p.style.removeProperty(key);}
function reset(){verify();restore(selected);void doc.documentElement.getBoundingClientRect();}
function at(f){try{
 if(![0,.05,.1,.25,.5,.75,1].includes(f)&&!(CFG.terminal16===true&&[.9,.99].includes(f)))throw Error('Unlisted original clock fraction');
 reset();selected.classList.add('stroke-normal','immediate');selected.style.animationPlayState='paused';selected.style.animationDelay=String(-f*CFG.timedPaths[selectedStroke-1].durationMs)+'ms';
 requested=f;mode='paused-original-css';const css=doc.defaultView.getComputedStyle(selected);
 if(css.animationName!=='framesNormal'||!Number.isFinite(parseFloat(css.animationDuration))||Math.abs(parseFloat(css.animationDuration)*1000-CFG.timedPaths[selectedStroke-1].durationMs)>1e-6)throw Error('Original CSS clock initialization failed');
 verify();report();
 }catch(e){fail(e);report();}}
function choose(n){try{
 if(!CFG.allowedStrokes.includes(n))throw Error('Unlisted original stroke');
 if(selected){verify();restore(selected);}selected=paths[n-1];selectedStroke=n;at(0);
 }catch(e){fail(e);report();}}
function play(){try{reset();selected.classList.add('stroke-normal','immediate');requested=null;mode='playing-original-css';verify();report();}catch(e){fail(e);report();}}
async function digest(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');}
media.addEventListener('load',async()=>{try{
 doc=media.contentDocument;if(!doc||doc.documentElement.localName!=='svg')throw Error('Original SVG document missing');
 for(const[k,v]of Object.entries(CFG.svgRoot))if(doc.documentElement.getAttribute(k)!==v)throw Error('Original root attribute changed');
 const scripts=[...doc.querySelectorAll('script')],inert=CFG.inertOriginalScripts[0];
 if(scripts.length!==1||scripts[0].namespaceURI!=='http://www.w3.org/2000/svg'||scripts[0].attributes.length!==1||scripts[0].getAttributeNS('http://www.w3.org/1999/xlink','href')!==inert.attributes['{http://www.w3.org/1999/xlink}href']||scripts[0].textContent!==''||scripts[0].children.length)throw Error('Original inert script DOM changed');
 paths=[...doc.querySelectorAll('path[clip-path]')].sort((a,b)=>parseInt(a.style.getPropertyValue('--d'))-parseInt(b.style.getPropertyValue('--d')));
 if(paths.length!==CFG.domesticClips)throw Error('Original timed path count changed');
 for(let i=0;i<paths.length;i++){const p=paths[i],pin=CFG.timedPaths[i],g=['d','clip-path','stroke-width','stroke-dasharray','stroke-dashoffset','transform','pathLength'].map(k=>[k,p.getAttribute(k)]);
 if(await digest(JSON.stringify(g))!==pin.geometrySHA256||p.getAttribute('style')!==pin.inlineStyle||p.getAttribute('class')!==pin.class)throw Error('Original path bytes changed');
 snapshots.push({class:p.getAttribute('class'),delay:p.style.getPropertyValue('animation-delay'),state:p.style.getPropertyValue('animation-play-state')});}
 allGeometry=[...doc.querySelectorAll('svg,g,path,clipPath,use')].map(p=>[p,geometry(p)]);
 choose(CFG.defaultStroke);if(errors.length)throw Error('Original media selection failed');document.querySelectorAll('button').forEach(b=>b.disabled=false);
 }catch(e){fail(e);status.textContent=JSON.stringify({ready:false,errors});}});
media.addEventListener('error',e=>{loadDiagnostics.objectError={targetIsObject:e.target===media,targetTag:e.target?.localName||null,eventPhase:e.eventPhase,bubbles:e.bubbles,documentPresent:!!media.contentDocument,data:media.getAttribute('data')};fail('Original SVG object load failed');status.textContent=JSON.stringify({ready:false,errors,loadDiagnostics});});
document.querySelector('#play').addEventListener('click',play);
document.querySelectorAll('[data-stroke]').forEach(b=>b.addEventListener('click',()=>choose(Number(b.dataset.stroke))));
document.querySelectorAll('[data-fraction]').forEach(b=>b.addEventListener('click',()=>at(Number(b.dataset.fraction))));
setInterval(()=>{if(selected)report();},100);
'''

def page(config, svg_route):
    selected = ''.join('<button disabled data-stroke="'+str(n)+'">국내 '+str(n)+'획 선택</button>' for n in config['allowedStrokes'])
    terminal16 = config['sourceRoot'] == 'u802d-k' and config['allowedStrokes'] == [16] and config['metadataFile'] == 'docs/hanja-official-media-compare-u802d-2026-10-24/metadata-16.json'
    clocks = ''.join('<button disabled data-fraction="'+str(f)+'">시계 '+str(f)+'</button>' for f in [0,.05,.1,.25,.5,.75,1]+([.9,.99] if terminal16 else []))
    browser_config = {k:config[k] for k in ['glyph','sourceRoot','domesticClips','allowedStrokes','defaultStroke','svgRoot','timedPaths','inertOriginalScripts']}
    browser_config['terminal16'] = terminal16
    script = BROWSER.replace('__CONFIG__',json.dumps(browser_config,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c'),1)
    title = html.escape(config['glyph'])+' 공식 원미디어 시계 검토'
    return ('<!doctype html><html lang="ko"><meta charset="utf-8"><title>'+title+'</title>'
        '<style>body{font:15px system-ui;margin:12px;max-width:540px}button{margin:3px;padding:7px}pre{height:160px;max-height:160px;overflow:auto;white-space:pre;font:12px monospace}object{display:block;width:520px;height:520px;max-width:none}</style>'
        '<h1>'+title+'</h1><p>공식 부모 player가 아닌 통제된 원미디어 검토입니다. 원SVG·CSS 바이트와 path·clip을 유지하고, 한 번에 한 획의 공식 CSS 클래스와 시계만 조절합니다. 필순·합획·시간 방향·런타임 승인이 아닙니다.</p>'
        '<p>원 publisher script 태그는 보존하되 CSP script-src none과 JS route 미제공으로 실행하지 않습니다. 해당 CSP 차단 로그는 예상하며, 초기화 status의 오류는 별도로 확인해야 합니다.</p>'
        '<div>'+selected+'</div><button id="play" disabled>선택 획 재생 · 공식 CSS</button>'+clocks
        +'<p>시계는 원 --t의 비율입니다. 고정 공식 CSS는 .75에 dashoffset 0에 도달하며, 재생은 원 immediate 클래스의 .5초 지연을 사용합니다.</p>'
        '<pre id="status">loading</pre><object id="original" type="image/svg+xml" data="'+html.escape(svg_route,quote=True)+'" aria-label="'+title+'"></object>'
        '<script>'+script+'</script></html>').encode('utf-8')

def main():
    parser = argparse.ArgumentParser(description='Pinned original media clock comparison; ROOT starts HTTP')
    parser.add_argument('--config',required=True);parser.add_argument('--config-sha',required=True)
    parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true')
    args = parser.parse_args()
    require(__debug__ and sys.flags.optimize == 0 and 0 <= args.port <= 65535, 'Assertion-enabled local execution required')
    config = load_config(args.config,args.config_sha)
    spec = importlib.util.spec_from_file_location('hanja_fixed_media_primitives',pinned_path(SHARED))
    shared = importlib.util.module_from_spec(spec);spec.loader.exec_module(shared)
    require(shared.FETCH_COUNT == 0 and callable(shared.fetch_asset), 'Original RAM fetch primitive changed')
    svg_route,css_route = urlparse(config['media']['svg']['url']).path,urlparse(CSS['url']).path
    markup = page(config,svg_route)
    if args.check_only:
        print(json.dumps({'guardPass':True,'allowedStrokes':config['allowedStrokes'],'domesticClips':config['domesticClips'],'sharedFetchFunctionCopies':0,'fetchCount':0,'serverStarts':0,'originalMediaOnly':True}));return
    svg,css = shared.fetch_asset(config['media']['svg']),shared.fetch_asset(config['media']['css'])
    validate_media(svg,config)
    require(shared.FETCH_COUNT == 2, 'Exactly two RAM assets required')
    routes = {'/':(markup,'text/html; charset=utf-8'),svg_route:(svg,'image/svg+xml; charset=utf-8'),css_route:(css,'text/css; charset=utf-8')}
    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):
            if self.headers.get('Host') != '127.0.0.1:'+str(self.server.server_port) or self.path not in routes:
                print(json.dumps({'mediaRequest':{'pinnedRoute':self.path in routes,'hostMatches':self.headers.get('Host') == '127.0.0.1:'+str(self.server.server_port),'status':404}}),flush=True)
                self.send_error(404,'Pinned local route only');return
            body,mime = routes[self.path]
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Content-Length',str(len(body)));self.send_header('Cache-Control','no-store')
            policy = "default-src 'none'; style-src 'self' 'unsafe-inline'; script-src 'none'; connect-src 'none'" if self.path != '/' else "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; object-src 'self'; frame-src http://127.0.0.1:"+str(self.server.server_port)+svg_route+"; connect-src 'none'; base-uri 'none'; form-action 'none'"
            self.send_header('Content-Security-Policy',policy);self.end_headers();self.wfile.write(body)
            print(json.dumps({'mediaRequest':{'path':self.path,'status':200,'mime':mime,'bytes':len(body),'csp':policy}}),flush=True)
        def log_message(self,*args):
            pass
    server = ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'pid':__import__('os').getpid(),'port':server.server_address[1],'RAMFetchCount':shared.FETCH_COUNT,'allowedStrokes':config['allowedStrokes'],'SVG_SHA256':sha(svg),'CSS_SHA256':sha(css)}),flush=True)
    server.serve_forever()

if __name__ == '__main__':
    main()
