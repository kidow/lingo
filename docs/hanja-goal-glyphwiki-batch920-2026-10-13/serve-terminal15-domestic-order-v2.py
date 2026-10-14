# Separate source-only native review. Original metadata, geometry and all other helpers are immutable.
import sys
sys.dont_write_bytecode=True
import json,os,html,hashlib,subprocess,importlib.util,argparse
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
CFG=json.loads("{\"glyph\":\"驖\",\"count\":23,\"defaultRoot\":\"u9a56\",\"wholeNames\":[\"u9a56-ue0100\",\"u9a56-ue0101\",\"u9a56-ue0102\",\"u9a56-ue0103\",\"u9a56-var-001\",\"u9a56\"],\"supportedRoots\":[\"u9a56\"],\"pins\":{\"NOTICE.md\":\"abd1095cd57c6064aa876e8373bd33142ef4f0150299fd1c9cdabdad5ecc6126\",\"candidate-compile-analysis.json\":\"80b9f4634c0652eb4c89644d29cc528be1e080741b0bfce30a09066286d22caa\",\"engine-proof.json\":\"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b\",\"engine-whole-u9a56-ue0100.json\":\"ee473013365a1e031ee3aca46d8799cfac598f15715c74092f02174c6a78f658\",\"engine-whole-u9a56-ue0101.json\":\"ee473013365a1e031ee3aca46d8799cfac598f15715c74092f02174c6a78f658\",\"engine-whole-u9a56-ue0102.json\":\"049f71d5e4cb56da611cd8ef9ad229d1d4d3dde0ccb18ae1255149f6b33e43a3\",\"engine-whole-u9a56-ue0103.json\":\"82fa185ad6aa8c1bad72d543bdc3f2c409ec47725e128e2b76e17c48d1696c2e\",\"engine-whole-u9a56-var-001.json\":\"fab74a16af5a77bd801fbee2d4f7322422dbba891bf6bdd7e72638e72eac8e78\",\"engine-whole-u9a56.json\":\"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b\",\"metadata.json\":\"5add58fe9bd311255eaa959a234a54a528c8befc82b9a9684823d546bef74f95\",\"native-preflight-source-analysis.json\":\"b98197493f7d492819ac73bed6170cacd7dae0f53fb5f1588fbcb08bcd291bd9\",\"native-server-preparation-source-analysis.json\":\"40a3570dc28b037a538e6fc3796b20a00f09b4d94af385150ab5cdc55611cd05\",\"native-server-validation.json\":\"802a1e84bb05d496bd6100d924cb25ebe565087adaccd304483b33ae965f51b7\",\"progressive-terminal15-candidate.mjs\":\"20c6bc65cb215271c65ea60f62081f81f4cc6ed06d2fc9b47ce7cf6a735fbb07\",\"progressive.mjs\":\"e3f1d33ca3766f5577eacfe0ad130aa0f6f7d8aeead8e7d31d7d4a22dc1280d1\",\"serve-progressive.py\":\"90344fdaf013d16cde2f1d805761ddf8b1df414d89a38981bab88396e17ac827\",\"serve-terminal15-native.py\":\"ebc31a95cee92fb0f8052dc343fe310b9bf40b4a2703524e8374c6e7bb86890a\",\"serve-whole.py\":\"4a8f7ae046d703adfb98301549539e834e34557fe52209c9b7ece3b470991cb0\",\"source-analysis.json\":\"22da2321277702d2448bec52dc0341d8574dc277a5132a4ecdea261aebb91a29\",\"source-join-analysis.json\":\"b22530a723dda10848a476c1ad38ce435300f46d0b253374a1cbd639573b47a9\",\"sources.json\":\"b289d6daf994b28e45d4da498bd1a00690a87cc2d8091cfa041950b4ea442cd3\",\"terminal15-candidate-adapter.mjs\":\"38a122b56a00d1c7c1257d08c1d742b0c5ee6bfad1d33fb04f5a9d6f3330bfad\",\"terminal15-candidate-validation.json\":\"13311b72c1a16dae718ced5c4a0cfbfa5dc0bf195174e56639a16e271680f674\",\"verify-source.mjs\":\"c7d56d21772945b181f2996e086d884ba7e687b5420e20138414ba994c3a6786\",\"progressive-terminal15-domestic-order.mjs\":\"46f1a36482d0b392a31b903b5756fdd39618206f7c93b6f84e615e3687384678\",\"terminal15-domestic-order-validation.json\":\"0eb41e4e4348f099b51334638e989d28221843e1d651e52b3dd22d50aab15ae4\",\"serve-terminal15-domestic-order.py\":\"76be033dca81786dbf16123eb25a9feba38aab3b9da59ff2eef0d24464762215\",\"progressive-terminal15-domestic-order-v2.mjs\":\"11eb86163d400819c0e1dc4528a9272b7aab9f69c6edc659141bd3a37f432890\",\"terminal15-domestic-order-v2-validation.json\":\"37ff9838df2f5d8af1e3fa02373405f2b1aa228bd744dd08a69d40625a9e2396\"},\"script\":\"import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';const d=\\\"/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch920-2026-10-13\\\",sha=x=>createHash('sha256').update(x).digest('hex'),pins={\\\"NOTICE.md\\\":\\\"abd1095cd57c6064aa876e8373bd33142ef4f0150299fd1c9cdabdad5ecc6126\\\",\\\"candidate-compile-analysis.json\\\":\\\"80b9f4634c0652eb4c89644d29cc528be1e080741b0bfce30a09066286d22caa\\\",\\\"engine-proof.json\\\":\\\"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b\\\",\\\"engine-whole-u9a56-ue0100.json\\\":\\\"ee473013365a1e031ee3aca46d8799cfac598f15715c74092f02174c6a78f658\\\",\\\"engine-whole-u9a56-ue0101.json\\\":\\\"ee473013365a1e031ee3aca46d8799cfac598f15715c74092f02174c6a78f658\\\",\\\"engine-whole-u9a56-ue0102.json\\\":\\\"049f71d5e4cb56da611cd8ef9ad229d1d4d3dde0ccb18ae1255149f6b33e43a3\\\",\\\"engine-whole-u9a56-ue0103.json\\\":\\\"82fa185ad6aa8c1bad72d543bdc3f2c409ec47725e128e2b76e17c48d1696c2e\\\",\\\"engine-whole-u9a56-var-001.json\\\":\\\"fab74a16af5a77bd801fbee2d4f7322422dbba891bf6bdd7e72638e72eac8e78\\\",\\\"engine-whole-u9a56.json\\\":\\\"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b\\\",\\\"metadata.json\\\":\\\"5add58fe9bd311255eaa959a234a54a528c8befc82b9a9684823d546bef74f95\\\",\\\"native-preflight-source-analysis.json\\\":\\\"b98197493f7d492819ac73bed6170cacd7dae0f53fb5f1588fbcb08bcd291bd9\\\",\\\"native-server-preparation-source-analysis.json\\\":\\\"40a3570dc28b037a538e6fc3796b20a00f09b4d94af385150ab5cdc55611cd05\\\",\\\"native-server-validation.json\\\":\\\"802a1e84bb05d496bd6100d924cb25ebe565087adaccd304483b33ae965f51b7\\\",\\\"progressive-terminal15-candidate.mjs\\\":\\\"20c6bc65cb215271c65ea60f62081f81f4cc6ed06d2fc9b47ce7cf6a735fbb07\\\",\\\"progressive.mjs\\\":\\\"e3f1d33ca3766f5577eacfe0ad130aa0f6f7d8aeead8e7d31d7d4a22dc1280d1\\\",\\\"serve-progressive.py\\\":\\\"90344fdaf013d16cde2f1d805761ddf8b1df414d89a38981bab88396e17ac827\\\",\\\"serve-terminal15-native.py\\\":\\\"ebc31a95cee92fb0f8052dc343fe310b9bf40b4a2703524e8374c6e7bb86890a\\\",\\\"serve-whole.py\\\":\\\"4a8f7ae046d703adfb98301549539e834e34557fe52209c9b7ece3b470991cb0\\\",\\\"source-analysis.json\\\":\\\"22da2321277702d2448bec52dc0341d8574dc277a5132a4ecdea261aebb91a29\\\",\\\"source-join-analysis.json\\\":\\\"b22530a723dda10848a476c1ad38ce435300f46d0b253374a1cbd639573b47a9\\\",\\\"sources.json\\\":\\\"b289d6daf994b28e45d4da498bd1a00690a87cc2d8091cfa041950b4ea442cd3\\\",\\\"terminal15-candidate-adapter.mjs\\\":\\\"38a122b56a00d1c7c1257d08c1d742b0c5ee6bfad1d33fb04f5a9d6f3330bfad\\\",\\\"terminal15-candidate-validation.json\\\":\\\"13311b72c1a16dae718ced5c4a0cfbfa5dc0bf195174e56639a16e271680f674\\\",\\\"verify-source.mjs\\\":\\\"c7d56d21772945b181f2996e086d884ba7e687b5420e20138414ba994c3a6786\\\",\\\"progressive-terminal15-domestic-order.mjs\\\":\\\"46f1a36482d0b392a31b903b5756fdd39618206f7c93b6f84e615e3687384678\\\",\\\"terminal15-domestic-order-validation.json\\\":\\\"0eb41e4e4348f099b51334638e989d28221843e1d651e52b3dd22d50aab15ae4\\\",\\\"serve-terminal15-domestic-order.py\\\":\\\"76be033dca81786dbf16123eb25a9feba38aab3b9da59ff2eef0d24464762215\\\",\\\"progressive-terminal15-domestic-order-v2.mjs\\\":\\\"11eb86163d400819c0e1dc4528a9272b7aab9f69c6edc659141bd3a37f432890\\\",\\\"terminal15-domestic-order-v2-validation.json\\\":\\\"37ff9838df2f5d8af1e3fa02373405f2b1aa228bd744dd08a69d40625a9e2396\\\"};for(const[f,h]of Object.entries(pins))assert.equal(sha(readFileSync(d+'/'+f)),h,'Frozen input '+f);const root=process.argv[1];assert.equal(root,'u9a56');const m=await import(d+'/progressive-terminal15-domestic-order-v2.mjs'),id=m.selectedProofIdentity;assert.deepEqual(id,{\\\"sourceRoot\\\":\\\"u9a56\\\",\\\"sourceProofFile\\\":\\\"engine-whole-u9a56.json\\\",\\\"sourceProofFileSHA256\\\":\\\"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b\\\",\\\"sourceHeaderFile\\\":\\\"engine-proof.json\\\",\\\"sourceHeaderFileSHA256\\\":\\\"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b\\\"});const proof=m.buildSourceProof(id);assert.equal(sha(JSON.stringify(proof)),\\\"bae8dd6bfc0f2da711235784ad4d45f57328bf300b80351c652edb2d27289a77\\\");assert.deepEqual(Object.keys(proof).sort(),[\\\"defaults\\\",\\\"engineHashes\\\",\\\"engineRevision\\\",\\\"groups\\\",\\\"trace\\\"]);const before=JSON.stringify(proof),strokes=m.compileSourceWhole(root,proof.trace,proof,id);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,23);assert.equal(strokes.flat().length,25);assert.equal(sha(JSON.stringify(strokes)),\\\"50d9005b485960cc90203857f5bf41c2576062357ee5bec6af87e08f38f4ab1c\\\");console.log(JSON.stringify({strokes,render:m.renderProgressive.toString(),sourceRoot:root,identity:id,sourceGroups:m.sourceGroups,compiledSHA256:sha(JSON.stringify(strokes)),fullProofSHA256:sha(JSON.stringify(proof)),pens:23,masks:25,nativeApproval:false}));\",\"tailPen\":21}")
GLYPH=CFG['glyph'];COUNT=CFG['count'];NAMES=CFG['wholeNames'];SUPPORTED=CFG['supportedRoots'];DEFAULT=CFG['defaultRoot']
def check_pins():
    for file,pin in CFG['pins'].items():
        assert hashlib.sha256((HERE/file).read_bytes()).hexdigest()==pin,'Frozen original input changed: '+file
check_pins()
meta=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('own_920_domestic_order_v2_ram',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
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
    return '<nav><a href="/whole?id='+encoded+'">전체</a><a href="/whole?id='+encoded+'&amp;all=1">6 whole</a><a href="/pairs?id='+encoded+'">전'+str(COUNT)+'방향</a><a href="/progressive?id='+encoded+'&amp;stroke='+str(CFG['tailPen'])+'&amp;enlarged=1&amp;samples=1">꼬리 fine·경계</a></nav>'
def base(c):
    return '<!doctype html><meta charset="utf-8"><title>'+GLYPH+' terminal15 original review</title><style>body{font:16px system-ui;margin:16px;width:1112px;background:white;color:#111}h1{font-size:23px;margin:10px 0}a,button,input{margin:5px}svg{width:420px;height:420px}.pair{display:flex;gap:20px}.directions,.whole-list{display:grid;grid-template-columns:556px 556px}.directions section{width:550px;border-bottom:1px solid #ddd}.directions svg{width:200px;height:210px}.samples{display:grid;grid-template-columns:repeat(3,180px);gap:4px}.samples svg{width:170px;height:170px}.samples div{font-size:13px}</style>'+nav(c['sourceRoot'])+'<h1>'+GLYPH+' · '+html.escape(c['sourceRoot'])+' · '+str(COUNT)+'획/'+str(c['masks'])+'mask</h1><p>원본 좌표·마스크·폭 보존 · 국내 순서 v2 후보 · 국내 native 미승인 · 사전 RAM-only</p>'+' '.join('<a href="/whole?id='+root+'">'+root+'</a>' for root in SUPPORTED)
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

