# Separate source-only native review. Original metadata, geometry and all other helpers are immutable.
import sys
sys.dont_write_bytecode=True
import json,os,html,hashlib,subprocess,importlib.util,argparse
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
CFG=json.loads("{\"glyph\":\"驒\",\"count\":22,\"defaultRoot\":\"u9a52\",\"wholeNames\":[\"u9a52\",\"u9a52-ue0100\"],\"supportedRoots\":[\"u9a52\"],\"pins\":{\"NOTICE.md\":\"04df10ffab52ac1d5c9c95c688a8c5e5c39c83273612dfbc7ffb43122a4601d2\",\"candidate-compile-analysis.json\":\"0093dc66a81a41e882d4fe29c617c2fffcedad8c7331af770a80cf481a492f02\",\"engine-proof.json\":\"dc653e47f2e31c8e9d247512bea5e42bb00ae61dedba3549cba5fe8854cd8ec0\",\"engine-whole-u9a52-ue0100.json\":\"27f21dcdd526e3b52a7c410a8e567e19415ac06356f27f27b8393390f35ffd19\",\"engine-whole-u9a52.json\":\"dc653e47f2e31c8e9d247512bea5e42bb00ae61dedba3549cba5fe8854cd8ec0\",\"metadata.json\":\"83f70519db3dd7f6057e8a11aecd332d59f0a4782f416c96ac71ece240759fa7\",\"native-server-preparation-source-analysis.json\":\"0a881dee44c8e4f96a85ec370be1af1bb6e60d653a9feb964a0d76613a94c37f\",\"native-server-validation.json\":\"376d99060f1436fe82e0505f589aab622b4bf2b84297908489f5d6ab7c8d7426\",\"progressive.mjs\":\"441a899527e22fdf3c53aa5caa9f784a348b70797610d699e3b0d53b96b64e21\",\"serve-progressive.py\":\"d1c73c303418aeed1963b52b6ae5d54b87b85e44e86181180bc2cfe95052aece\",\"serve-whole.py\":\"b9ca0878722c3b9fc4fbf7fdd73fca166b94df98f7dbf2100c319723fc3b924b\",\"server-compile.mjs\":\"051d37e42b0294fc292ad02af97325f013fce7f0fe580e8db6e5cf248fb925cc\",\"source-analysis.json\":\"7f2d99a94a5e0a48ba9535c9e01eb5ee2816109db7a7554c449331b3f3021ec4\",\"source-join-analysis.json\":\"3085e2339d8df310a3f3dbfbcb7b84739be43662f36c99bbe3ad6621668f71fa\",\"source-preservation-audit.json\":\"26520509baaab56d4ccaef31feaddb5ccefd37969aa9ae2446228e2ff5fbb128\",\"sources.json\":\"db555b09dbdb6663e9356092fb8f6938adf8044576bd9187ec601d51c27e51af\",\"verify-source.mjs\":\"ea4770c856e716b092f4cbe6e24d66d9b62c87dbbfc1bab7795f368ac1793453\"},\"script\":\"import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{execFileSync}from'node:child_process';const d=\\\"/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch959-2026-10-13\\\",sha=x=>createHash('sha256').update(x).digest('hex'),pins={\\\"NOTICE.md\\\":\\\"04df10ffab52ac1d5c9c95c688a8c5e5c39c83273612dfbc7ffb43122a4601d2\\\",\\\"candidate-compile-analysis.json\\\":\\\"0093dc66a81a41e882d4fe29c617c2fffcedad8c7331af770a80cf481a492f02\\\",\\\"engine-proof.json\\\":\\\"dc653e47f2e31c8e9d247512bea5e42bb00ae61dedba3549cba5fe8854cd8ec0\\\",\\\"engine-whole-u9a52-ue0100.json\\\":\\\"27f21dcdd526e3b52a7c410a8e567e19415ac06356f27f27b8393390f35ffd19\\\",\\\"engine-whole-u9a52.json\\\":\\\"dc653e47f2e31c8e9d247512bea5e42bb00ae61dedba3549cba5fe8854cd8ec0\\\",\\\"metadata.json\\\":\\\"83f70519db3dd7f6057e8a11aecd332d59f0a4782f416c96ac71ece240759fa7\\\",\\\"native-server-preparation-source-analysis.json\\\":\\\"0a881dee44c8e4f96a85ec370be1af1bb6e60d653a9feb964a0d76613a94c37f\\\",\\\"native-server-validation.json\\\":\\\"376d99060f1436fe82e0505f589aab622b4bf2b84297908489f5d6ab7c8d7426\\\",\\\"progressive.mjs\\\":\\\"441a899527e22fdf3c53aa5caa9f784a348b70797610d699e3b0d53b96b64e21\\\",\\\"serve-progressive.py\\\":\\\"d1c73c303418aeed1963b52b6ae5d54b87b85e44e86181180bc2cfe95052aece\\\",\\\"serve-whole.py\\\":\\\"b9ca0878722c3b9fc4fbf7fdd73fca166b94df98f7dbf2100c319723fc3b924b\\\",\\\"server-compile.mjs\\\":\\\"051d37e42b0294fc292ad02af97325f013fce7f0fe580e8db6e5cf248fb925cc\\\",\\\"source-analysis.json\\\":\\\"7f2d99a94a5e0a48ba9535c9e01eb5ee2816109db7a7554c449331b3f3021ec4\\\",\\\"source-join-analysis.json\\\":\\\"3085e2339d8df310a3f3dbfbcb7b84739be43662f36c99bbe3ad6621668f71fa\\\",\\\"source-preservation-audit.json\\\":\\\"26520509baaab56d4ccaef31feaddb5ccefd37969aa9ae2446228e2ff5fbb128\\\",\\\"sources.json\\\":\\\"db555b09dbdb6663e9356092fb8f6938adf8044576bd9187ec601d51c27e51af\\\",\\\"verify-source.mjs\\\":\\\"ea4770c856e716b092f4cbe6e24d66d9b62c87dbbfc1bab7795f368ac1793453\\\"},id={\\\"root\\\":\\\"u9a52\\\",\\\"file\\\":\\\"engine-whole-u9a52.json\\\",\\\"fileSHA256\\\":\\\"dc653e47f2e31c8e9d247512bea5e42bb00ae61dedba3549cba5fe8854cd8ec0\\\"};for(const[f,h]of Object.entries(pins))assert.equal(sha(readFileSync(d+'/'+f)),h,'Frozen original input '+f);const root=process.argv[1];assert.equal(root,id.root,'Explicit original base caller only');const header=JSON.parse(readFileSync(d+'/engine-proof.json')),body=JSON.parse(readFileSync(d+'/'+id.file)),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256};assert.deepEqual(Object.keys(proof).sort(),[\\\"defaults\\\",\\\"engineHashes\\\",\\\"engineRevision\\\",\\\"groups\\\",\\\"sourceProofFile\\\",\\\"sourceProofFileSHA256\\\",\\\"sourceRoot\\\",\\\"trace\\\"]);assert.equal(sha(JSON.stringify(proof)),\\\"7dc6356e60e854e8e873ff6f9e1c8b4ea9c2b18913d87516926f0ba3fb1acdec\\\");const out=JSON.parse(execFileSync('rtk',['proxy','node',d+'/server-compile.mjs',root],{encoding:'utf8'}));assert.equal(out.sourceRoot,root);assert.equal(sha(JSON.stringify(out.strokes)),\\\"91715f4bf60b85031d89824d0cbcec51f389a87b523bc250b770dfee9fa4c6f9\\\");assert.deepEqual(out.strokes.map(p=>sha(JSON.stringify(p))),[\\\"e21eb749cd2d48511c4d5b2828b4a85299a78514d5ff95c015af1e7a78c8b5e0\\\",\\\"e1517fbfe264f34401f4150a8dfbaa14fce22ae5150c370aca9136fafc8bbb56\\\",\\\"7108d247b6c3fa08f6c85245007ef59ae8198909703bea4646133cf7fde1cc96\\\",\\\"c69bbd5dd4eebd8eee184639fa36830d292dbafd0d080752ce7b44e7b1011aec\\\",\\\"2a9fb1e3d19a1042b80bf9c9b92723c83dd59417847f878684ba73848d35a935\\\",\\\"67c75ed34a45db77733d98870cfbc1ed75733af1ee8992972309fb7289360731\\\",\\\"fcb1d875b5988c19a34398518b0b24da1aa9383a70a1a97362356ba24559a6b2\\\",\\\"d9badb888722f35ee57ef5419a4268f4a21743dcef30a7f5e5cce640fba1eb9e\\\",\\\"dbec7ffea82b199ba2bd3e60b8cd9cec9f8a7addf64ee779413aeb50590873b5\\\",\\\"e3c36ca715754ea944976836184b4c1c1276ca57657d6e351a13d23e3b9b514a\\\",\\\"0bf01f01ab33c6dc549def593f10ad55f9b2f501d49090ff9c9caab123f8794f\\\",\\\"a2c6e698f2caf5eb1265272491c3f455f2ad7ff01b67f33d642761004637231f\\\",\\\"018f3a980caa086e4a83b050d1d01766e06b2188456cb51efc721bd9b24e429d\\\",\\\"269f3c25a0a30768e152ecdc36bc84d63b2f85e9eaa026357e1d5c5e9a71d8a6\\\",\\\"7c6e62c1359a6c386c64f370d037797c7bbd54e16582d9ec56f1a5244df4802b\\\",\\\"2e6e8bf440da65d89007712450f0cb846b145cfa28bba8873cf02b2945ab2b9e\\\",\\\"7e768107504f66a5cba65736eab6b6a52c121b32696dd63faa19f1c77608824d\\\",\\\"b24bd7c1b99400da02093eb533fabcdd07c0653a335e9417b2d75082469234d3\\\",\\\"0c38729d5caae423fc24dc86edfd1d76cfb89a7f6b14baa847caf2ff265088f8\\\",\\\"94d2e5a2344720758e735a50e08bf04775f68c175c1ee6467617931204e813e2\\\",\\\"68f75243be81dd7dc7333ed3a48bab3d1472b0072868f019e5b59fb7b9b97a16\\\",\\\"644038f4646bfedc32078d8f341fd8990a8cd0f9529a3c80583463cbba01744d\\\"]);assert.equal(out.strokes.length,22);assert.equal(out.strokes.flat().length,23);console.log(JSON.stringify({...out,identity:id,compiledSHA256:sha(JSON.stringify(out.strokes)),fullProofSHA256:sha(JSON.stringify(proof)),pens:22,masks:23,nativeApproval:false}));\",\"tailPen\":6}")
GLYPH=CFG['glyph'];COUNT=CFG['count'];NAMES=CFG['wholeNames'];SUPPORTED=CFG['supportedRoots'];DEFAULT=CFG['defaultRoot']
def check_pins():
    for file,pin in CFG['pins'].items():
        assert hashlib.sha256((HERE/file).read_bytes()).hexdigest()==pin,'Frozen original input changed: '+file
check_pins()
meta=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('own_959_strict_native_ram',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
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
    return '<nav><a href="/whole?id='+encoded+'">전체</a><a href="/whole?id='+encoded+'&amp;all=1">'+str(len(NAMES))+' whole</a><a href="/pairs?id='+encoded+'">전'+str(COUNT)+'방향</a><a href="/progressive?id='+encoded+'&amp;stroke='+str(CFG['tailPen'])+'&amp;enlarged=1&amp;samples=1">6획 fine·경계</a></nav>'
def base(c):
    return '<!doctype html><meta charset="utf-8"><title>'+GLYPH+' strict original review</title><style>body{font:16px system-ui;margin:16px;width:1112px;background:white;color:#111}h1{font-size:23px;margin:10px 0}a,button,input{margin:5px}svg{width:420px;height:420px}.pair{display:flex;gap:20px}.directions,.whole-list{display:grid;grid-template-columns:556px 556px}.directions section{width:550px;border-bottom:1px solid #ddd}.directions svg{width:200px;height:210px}.samples{display:grid;grid-template-columns:repeat(3,180px);gap:4px}.samples svg{width:170px;height:170px}.samples div{font-size:13px}</style>'+nav(c['sourceRoot'])+'<h1>'+GLYPH+' · '+html.escape(c['sourceRoot'])+' · '+str(COUNT)+'획/'+str(c['masks'])+'mask</h1><p>원본 좌표·순서·폭 보존 · 국내 native 미승인 · 사전 RAM-only</p>'+' '.join('<a href="/whole?id='+root+'">'+root+'</a>' for root in SUPPORTED)
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

