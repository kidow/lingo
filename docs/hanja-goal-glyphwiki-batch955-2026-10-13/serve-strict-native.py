# Separate source-only native review. Original metadata, geometry and all other helpers are immutable.
import sys
sys.dont_write_bytecode=True
import json,os,html,hashlib,subprocess,importlib.util,argparse
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
CFG=json.loads("{\"glyph\":\"鮀\",\"count\":16,\"defaultRoot\":\"u9b80\",\"wholeNames\":[\"u9b80\",\"u9b80-ue0100\"],\"supportedRoots\":[\"u9b80\"],\"pins\":{\"NOTICE.md\":\"7cf6b006773e42699b2b0384b95ebb8858a6ff46aecd5e6dd2bd852c0831c147\",\"candidate-compile-analysis.json\":\"6c1e6866b24eb44e4ed8d2c6509febb6bd8b53933ceae64ff5a5bd2230b0730a\",\"engine-proof.json\":\"1b437b21aa800079c7bcc358c5df3f8d01abf5ab1df51cfd6697ad8ee3ab2c28\",\"engine-whole-u9b80-ue0100.json\":\"274e54de6aec8e18debcc1a22063d57e644c42993a31f8e7724aea1cc1ed72ea\",\"engine-whole-u9b80.json\":\"1b437b21aa800079c7bcc358c5df3f8d01abf5ab1df51cfd6697ad8ee3ab2c28\",\"metadata.json\":\"6375caeaf284dc02038c6adf7878fd17d1fc992c161dff3590d6ddac555794cc\",\"native-server-preparation-source-analysis.json\":\"aa425f13c601347c7bf2d26ff70ee4bc237da597f78e954c6cc1f2965581b1aa\",\"native-server-validation.json\":\"fe2378444eca99fbc17662a9ad2b8331c674bcd0307b9c9411aa8499ddfe42c3\",\"progressive.mjs\":\"c49463b1c789661392e575e4dd46b86e6819178d33abfec6aa43a409307c1956\",\"serve-progressive.py\":\"4c1ac1652b9eb044f7448bbb3a7afcc71caa3fed77feedbbc5acbb4a3cb6076b\",\"serve-whole.py\":\"04dec9def9a3131a26efd2d8d331e58dfdf2c71b2dcbbc7bbe03eaaa8225955a\",\"server-compile.mjs\":\"c4c6fbb09c7a771934adf89342e8c74c4b1f97a5cdf19cb1a7435e8f5823a6ba\",\"source-analysis.json\":\"c77cf2173cba941ab4d2907f566bc9281715650b1ba983c312967a8ce426ea36\",\"source-join-analysis.json\":\"a951b98917c168721975c4ca307b465d463541a6da6d0ab3ed0a0a502a88547a\",\"source-preservation-audit.json\":\"0a8f44a2c52bf869f83c5164e004f0aea49f68ba0c0a39dcc733dc114430076f\",\"sources.json\":\"cb9c1f38cec14051673e420259c6e361183538d54dae88ee451966b39f41efd3\",\"verify-source.mjs\":\"a808691d6dc3675de580460df408f22f97e33003865952d45698685027cb3148\"},\"script\":\"import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{execFileSync}from'node:child_process';const d=\\\"/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch955-2026-10-13\\\",sha=x=>createHash('sha256').update(x).digest('hex'),pins={\\\"NOTICE.md\\\":\\\"7cf6b006773e42699b2b0384b95ebb8858a6ff46aecd5e6dd2bd852c0831c147\\\",\\\"candidate-compile-analysis.json\\\":\\\"6c1e6866b24eb44e4ed8d2c6509febb6bd8b53933ceae64ff5a5bd2230b0730a\\\",\\\"engine-proof.json\\\":\\\"1b437b21aa800079c7bcc358c5df3f8d01abf5ab1df51cfd6697ad8ee3ab2c28\\\",\\\"engine-whole-u9b80-ue0100.json\\\":\\\"274e54de6aec8e18debcc1a22063d57e644c42993a31f8e7724aea1cc1ed72ea\\\",\\\"engine-whole-u9b80.json\\\":\\\"1b437b21aa800079c7bcc358c5df3f8d01abf5ab1df51cfd6697ad8ee3ab2c28\\\",\\\"metadata.json\\\":\\\"6375caeaf284dc02038c6adf7878fd17d1fc992c161dff3590d6ddac555794cc\\\",\\\"native-server-preparation-source-analysis.json\\\":\\\"aa425f13c601347c7bf2d26ff70ee4bc237da597f78e954c6cc1f2965581b1aa\\\",\\\"native-server-validation.json\\\":\\\"fe2378444eca99fbc17662a9ad2b8331c674bcd0307b9c9411aa8499ddfe42c3\\\",\\\"progressive.mjs\\\":\\\"c49463b1c789661392e575e4dd46b86e6819178d33abfec6aa43a409307c1956\\\",\\\"serve-progressive.py\\\":\\\"4c1ac1652b9eb044f7448bbb3a7afcc71caa3fed77feedbbc5acbb4a3cb6076b\\\",\\\"serve-whole.py\\\":\\\"04dec9def9a3131a26efd2d8d331e58dfdf2c71b2dcbbc7bbe03eaaa8225955a\\\",\\\"server-compile.mjs\\\":\\\"c4c6fbb09c7a771934adf89342e8c74c4b1f97a5cdf19cb1a7435e8f5823a6ba\\\",\\\"source-analysis.json\\\":\\\"c77cf2173cba941ab4d2907f566bc9281715650b1ba983c312967a8ce426ea36\\\",\\\"source-join-analysis.json\\\":\\\"a951b98917c168721975c4ca307b465d463541a6da6d0ab3ed0a0a502a88547a\\\",\\\"source-preservation-audit.json\\\":\\\"0a8f44a2c52bf869f83c5164e004f0aea49f68ba0c0a39dcc733dc114430076f\\\",\\\"sources.json\\\":\\\"cb9c1f38cec14051673e420259c6e361183538d54dae88ee451966b39f41efd3\\\",\\\"verify-source.mjs\\\":\\\"a808691d6dc3675de580460df408f22f97e33003865952d45698685027cb3148\\\"},id={\\\"root\\\":\\\"u9b80\\\",\\\"file\\\":\\\"engine-whole-u9b80.json\\\",\\\"fileSHA256\\\":\\\"1b437b21aa800079c7bcc358c5df3f8d01abf5ab1df51cfd6697ad8ee3ab2c28\\\"};for(const[f,h]of Object.entries(pins))assert.equal(sha(readFileSync(d+'/'+f)),h,'Frozen original input '+f);const root=process.argv[1];assert.equal(root,id.root,'Explicit base caller only');const header=JSON.parse(readFileSync(d+'/engine-proof.json')),body=JSON.parse(readFileSync(d+'/'+id.file)),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256};assert.deepEqual(Object.keys(proof).sort(),[\\\"defaults\\\",\\\"engineHashes\\\",\\\"engineRevision\\\",\\\"groups\\\",\\\"sourceProofFile\\\",\\\"sourceProofFileSHA256\\\",\\\"sourceRoot\\\",\\\"trace\\\"]);assert.equal(sha(JSON.stringify(proof)),\\\"23abb80728e4ed9dffb1b4b69e9dca546e48ad751ec73fea295e86707d9ed4f4\\\");const out=JSON.parse(execFileSync('rtk',['proxy','node',d+'/server-compile.mjs',root],{encoding:'utf8'}));assert.equal(out.sourceRoot,root);assert.equal(sha(JSON.stringify(out.strokes)),\\\"ce36e01616bb18b305574eccf89de4f787c5f346c780405fcaf4feb092ebd9f0\\\");assert.deepEqual(out.strokes.map(p=>sha(JSON.stringify(p))),[\\\"fe57655b94787f20f7afa314ee0582aa073511fb7e612aece8a91cbbc850a4fd\\\",\\\"cf286676a8cc28163cbb429a5a33028aaee43e0c8878cd09b28d83cb2e67cae8\\\",\\\"9adf5de8210f65d8a20d1e63c3c5acb559d461e9bd3a0403a4b3ea6a93e152bc\\\",\\\"b77a7cce2cbd2a6f763f530ce790fdd1312eaffce43ecb239dd2dbee8703ba09\\\",\\\"f01f16b0c8109aa740fecf982ffdc23556c8a5aabd33e9306a136732ae1d1a5c\\\",\\\"e71c3fb1c3d72e0346756ce1a824aebd6adec292b83ad87f57a7e448c10ab819\\\",\\\"10991ca03a3648c215883d99e68124f19d481263dec9fefa58699be2dd61ccf9\\\",\\\"1610c28c71126b8572879228c985cd4f081784c53e2cf7fc7f0d35b34e76f1c3\\\",\\\"04243ff64f97b81c8776a2fcbb227231edb42801f453d5a6df4fc40a0417d73a\\\",\\\"d324d3efefbd4e182133be259b2f3fb076e52c4227d271c49555809533a230cb\\\",\\\"50e1a81ee9a093b3fc86b2c7f6ed0e8afd85270c9594c40b7bd37e2b806441ab\\\",\\\"879c612675b750a52643ef879ae0c2f9eaf08136c612c4f241d31330c18817e4\\\",\\\"aa22a6fe4cc01d327626a29de0527508906437a4162bf98c9fcb5cc8deefc032\\\",\\\"8a60ef7915669f150afee73b5709cff7fb1088a6b5faa4e29840b7fa743afe29\\\",\\\"b0522fa664e67bfc7e079629c7764f6ec8156409741fd84c1978c038f83d0581\\\",\\\"ea5917ee01a196cfc251a1aefea3f38da107748eb456ed2356b6da6ccabc7457\\\"]);assert.equal(out.strokes.length,16);assert.equal(out.strokes.flat().length,17);console.log(JSON.stringify({...out,identity:id,compiledSHA256:sha(JSON.stringify(out.strokes)),fullProofSHA256:sha(JSON.stringify(proof)),pens:16,masks:17,nativeApproval:false}));\",\"tailPen\":16}")
GLYPH=CFG['glyph'];COUNT=CFG['count'];NAMES=CFG['wholeNames'];SUPPORTED=CFG['supportedRoots'];DEFAULT=CFG['defaultRoot']
def check_pins():
    for file,pin in CFG['pins'].items():
        assert hashlib.sha256((HERE/file).read_bytes()).hexdigest()==pin,'Frozen original input changed: '+file
check_pins()
meta=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('own_955_strict_native_ram',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
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
    return '<nav><a href="/whole?id='+encoded+'">전체</a><a href="/whole?id='+encoded+'&amp;all=1">'+str(len(NAMES))+' whole</a><a href="/pairs?id='+encoded+'">전'+str(COUNT)+'방향</a><a href="/progressive?id='+encoded+'&amp;stroke='+str(CFG['tailPen'])+'&amp;enlarged=1&amp;samples=1">16획 fine·경계</a></nav>'
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

