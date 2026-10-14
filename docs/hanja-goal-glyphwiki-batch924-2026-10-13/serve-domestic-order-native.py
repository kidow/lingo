# Separate source-only native review. Original metadata, geometry and all other helpers are immutable.
import sys
sys.dont_write_bytecode=True
import json,os,html,hashlib,subprocess,importlib.util,argparse
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
CFG=json.loads("{\"glyph\":\"蝃\",\"count\":14,\"defaultRoot\":\"u8743\",\"wholeNames\":[\"u8743-ue0100\",\"u8743\"],\"supportedRoots\":[\"u8743\"],\"pins\":{\"NOTICE.md\":\"7158aa1bc7f8c89a991d952725241cc511c04debdadeecdb747e3294bd5229c8\",\"candidate-compile-analysis.json\":\"4c82fd684decf55d08aa4836fd02da07e97befd59618a3a10e3059e4418ab4ba\",\"engine-proof.json\":\"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd\",\"engine-whole-u8743-ue0100.json\":\"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd\",\"engine-whole-u8743.json\":\"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd\",\"metadata.json\":\"dd7645c0d6ba02e24f9c32c376c200897a77e7115b89c77b2418f06822fc5515\",\"native-preflight-source-analysis.json\":\"be9b81c52915a16e1e2f3de69a5ab227895200a7f2956367f0a66f7ea878affc\",\"native-server-input-pins.json\":\"7a0409832c3c089d828b4c71306edc6354a2fa2002162056a9f6914d5aa10a98\",\"progressive.mjs\":\"ee83c094984201cf44e713ebaa93567e768c54aca6ed87d3f8d0f9757af35aa8\",\"serve-native.py\":\"67520cbc7f60cf9530bb61a489cd8afad94151804875e3e4a90aa5645b8caab2\",\"source-analysis.json\":\"9ad2b219cc9f1e20aa10f49bf55dbb32c295cb8ee0ef81caf5439d7837619670\",\"source-join-analysis.json\":\"3052818246a09f9cbb8977478034b22ca401ddb94f3b815af4404919babedfd3\",\"sources.json\":\"3967b27e1afc7ae0ab698fb15581f506dca08c6eee934347820f15cb88319463\",\"strict-native-adapter.mjs\":\"86fc22638ee490992c55443b392e8098e3d9e20a67fe0dca6202c0ccff403841\",\"strict-native-server-preflight.json\":\"96e59fdcf0bb2174b8dc5a0d51139f12e9e4918823c8935d3ec6bc5a585823a1\",\"verify-source.mjs\":\"090842589f2b8c832bc208d2d894bc0dd66f670e0776c42701d45820c3dc5bf9\",\"progressive-domestic-order-candidate.mjs\":\"1be4b002c49106f5c6acce3ff745724bbc90ea4ead71ef25f2b30ab23383d781\",\"domestic-order-candidate-validation.json\":\"738d5a6dbc9e2b80523db944f4119f01dc9d3dbdcdcd94ff854bba08f07792a0\"},\"script\":\"import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';const d=\\\"/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch924-2026-10-13\\\",sha=x=>createHash('sha256').update(x).digest('hex'),pins={\\\"NOTICE.md\\\":\\\"7158aa1bc7f8c89a991d952725241cc511c04debdadeecdb747e3294bd5229c8\\\",\\\"candidate-compile-analysis.json\\\":\\\"4c82fd684decf55d08aa4836fd02da07e97befd59618a3a10e3059e4418ab4ba\\\",\\\"engine-proof.json\\\":\\\"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd\\\",\\\"engine-whole-u8743-ue0100.json\\\":\\\"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd\\\",\\\"engine-whole-u8743.json\\\":\\\"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd\\\",\\\"metadata.json\\\":\\\"dd7645c0d6ba02e24f9c32c376c200897a77e7115b89c77b2418f06822fc5515\\\",\\\"native-preflight-source-analysis.json\\\":\\\"be9b81c52915a16e1e2f3de69a5ab227895200a7f2956367f0a66f7ea878affc\\\",\\\"native-server-input-pins.json\\\":\\\"7a0409832c3c089d828b4c71306edc6354a2fa2002162056a9f6914d5aa10a98\\\",\\\"progressive.mjs\\\":\\\"ee83c094984201cf44e713ebaa93567e768c54aca6ed87d3f8d0f9757af35aa8\\\",\\\"serve-native.py\\\":\\\"67520cbc7f60cf9530bb61a489cd8afad94151804875e3e4a90aa5645b8caab2\\\",\\\"source-analysis.json\\\":\\\"9ad2b219cc9f1e20aa10f49bf55dbb32c295cb8ee0ef81caf5439d7837619670\\\",\\\"source-join-analysis.json\\\":\\\"3052818246a09f9cbb8977478034b22ca401ddb94f3b815af4404919babedfd3\\\",\\\"sources.json\\\":\\\"3967b27e1afc7ae0ab698fb15581f506dca08c6eee934347820f15cb88319463\\\",\\\"strict-native-adapter.mjs\\\":\\\"86fc22638ee490992c55443b392e8098e3d9e20a67fe0dca6202c0ccff403841\\\",\\\"strict-native-server-preflight.json\\\":\\\"96e59fdcf0bb2174b8dc5a0d51139f12e9e4918823c8935d3ec6bc5a585823a1\\\",\\\"verify-source.mjs\\\":\\\"090842589f2b8c832bc208d2d894bc0dd66f670e0776c42701d45820c3dc5bf9\\\",\\\"progressive-domestic-order-candidate.mjs\\\":\\\"1be4b002c49106f5c6acce3ff745724bbc90ea4ead71ef25f2b30ab23383d781\\\",\\\"domestic-order-candidate-validation.json\\\":\\\"738d5a6dbc9e2b80523db944f4119f01dc9d3dbdcdcd94ff854bba08f07792a0\\\"};for(const[f,h]of Object.entries(pins))assert.equal(sha(readFileSync(d+'/'+f)),h,'Frozen input '+f);const root=process.argv[1];assert.equal(root,'u8743');const m=await import(d+'/progressive-domestic-order-candidate.mjs'),id=m.selectedProofIdentity;assert.deepEqual(id,{\\\"sourceRoot\\\":\\\"u8743\\\",\\\"sourceProofFile\\\":\\\"engine-whole-u8743.json\\\",\\\"sourceProofFileSha256\\\":\\\"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd\\\",\\\"sourceHeaderFile\\\":\\\"engine-proof.json\\\",\\\"sourceHeaderFileSha256\\\":\\\"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd\\\"});const proof=m.buildSourceProof(id);assert.equal(sha(JSON.stringify(proof)),\\\"84634608e382bea1da0938fcaa33276ded246abdfb34e1263d228f51318e1c19\\\");assert.deepEqual(Object.keys(proof).sort(),[\\\"defaults\\\",\\\"engineHashes\\\",\\\"engineRevision\\\",\\\"groups\\\",\\\"trace\\\"]);const before=JSON.stringify(proof),strokes=m.compileProgressive(proof.trace,proof,id);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,14);assert.equal(strokes.flat().length,14);assert.equal(sha(JSON.stringify(strokes)),\\\"874e3ccaca8476f5c06dc33fff8acca441a6fd8b1b810702fd3460880b461792\\\");console.log(JSON.stringify({strokes,render:m.renderProgressive.toString(),sourceRoot:root,identity:id,sourceGroups:m.sourceGroups,compiledSHA256:sha(JSON.stringify(strokes)),fullProofSHA256:sha(JSON.stringify(proof)),pens:14,masks:14,nativeApproval:false}));\",\"tailPen\":2}")
GLYPH=CFG['glyph'];COUNT=CFG['count'];NAMES=CFG['wholeNames'];SUPPORTED=CFG['supportedRoots'];DEFAULT=CFG['defaultRoot']
def check_pins():
    for file,pin in CFG['pins'].items():
        assert hashlib.sha256((HERE/file).read_bytes()).hexdigest()==pin,'Frozen original input changed: '+file
check_pins()
meta=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('own_924_domestic_order_ram',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES[GLYPH]={'strokes':COUNT,'dictionary':meta['dictionary']}
dictionary=r.base.renderer.source(GLYPH)
assert len(dictionary['strokes'])==COUNT
def compiled(root=DEFAULT):
    assert root in SUPPORTED,'Only explicit terminal candidate whole profiles are supported'
    check_pins()
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',CFG['script'],root],cwd=ROOT))
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
    return '<nav><a href="/whole?id='+encoded+'">전체</a><a href="/whole?id='+encoded+'&amp;all=1">'+str(len(NAMES))+' whole</a><a href="/pairs?id='+encoded+'">전'+str(COUNT)+'방향</a><a href="/progressive?id='+encoded+'&amp;stroke='+str(CFG['tailPen'])+'&amp;enlarged=1&amp;samples=1">2획 fine</a></nav>'
def base(c):
    return '<!doctype html><meta charset="utf-8"><title>'+GLYPH+' domestic-order original review</title><style>body{font:16px system-ui;margin:16px;width:1112px;background:white;color:#111}h1{font-size:23px;margin:10px 0}a,button,input{margin:5px}svg{width:420px;height:420px}.pair{display:flex;gap:20px}.directions,.whole-list{display:grid;grid-template-columns:556px 556px}.directions section{width:550px;border-bottom:1px solid #ddd}.directions svg{width:200px;height:210px}.samples{display:grid;grid-template-columns:repeat(3,180px);gap:4px}.samples svg{width:170px;height:170px}.samples div{font-size:13px}</style>'+nav(c['sourceRoot'])+'<h1>'+GLYPH+' · '+html.escape(c['sourceRoot'])+' · '+str(COUNT)+'획/'+str(c['masks'])+'mask</h1><p>원본 좌표·마스크·폭 보존 · 국내 순서 후보 · 국내 native 미승인 · 사전 RAM-only</p>'+' '.join('<a href="/whole?id='+root+'">'+root+'</a>' for root in SUPPORTED)
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
                content=base(c)+'<div class="directions">'
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
                content+='<button id="play">재생</button><input id="progress" aria-label="진행률" type="range" min="0" max="100" value="0"><output id="value">0%</output><div class="samples" id="samples"></div>'+script(c)+'const stroke='+str(n)+';const show=p=>{candidate.innerHTML=render(strokes,stroke,p,"live");progress.value=p*100;value.textContent=(p*100).toFixed(4)+"%"};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function frame(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)};'
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

