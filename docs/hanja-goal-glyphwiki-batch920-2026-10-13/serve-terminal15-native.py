# Separate terminal15 source-only native review. Private dictionary geometry stays in process RAM.
import sys
sys.dont_write_bytecode=True
import json,os,html,hashlib,subprocess,importlib.util,argparse
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"candidate-compile-analysis.json":"80b9f4634c0652eb4c89644d29cc528be1e080741b0bfce30a09066286d22caa","engine-proof.json":"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b","engine-whole-u9a56-ue0100.json":"ee473013365a1e031ee3aca46d8799cfac598f15715c74092f02174c6a78f658","engine-whole-u9a56-ue0101.json":"ee473013365a1e031ee3aca46d8799cfac598f15715c74092f02174c6a78f658","engine-whole-u9a56-ue0102.json":"049f71d5e4cb56da611cd8ef9ad229d1d4d3dde0ccb18ae1255149f6b33e43a3","engine-whole-u9a56-ue0103.json":"82fa185ad6aa8c1bad72d543bdc3f2c409ec47725e128e2b76e17c48d1696c2e","engine-whole-u9a56-var-001.json":"fab74a16af5a77bd801fbee2d4f7322422dbba891bf6bdd7e72638e72eac8e78","engine-whole-u9a56.json":"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b","metadata.json":"5add58fe9bd311255eaa959a234a54a528c8befc82b9a9684823d546bef74f95","native-preflight-source-analysis.json":"b98197493f7d492819ac73bed6170cacd7dae0f53fb5f1588fbcb08bcd291bd9","native-server-preparation-source-analysis.json":"40a3570dc28b037a538e6fc3796b20a00f09b4d94af385150ab5cdc55611cd05","native-server-validation.json":"802a1e84bb05d496bd6100d924cb25ebe565087adaccd304483b33ae965f51b7","progressive-terminal15-candidate.mjs":"20c6bc65cb215271c65ea60f62081f81f4cc6ed06d2fc9b47ce7cf6a735fbb07","progressive.mjs":"e3f1d33ca3766f5577eacfe0ad130aa0f6f7d8aeead8e7d31d7d4a22dc1280d1","serve-progressive.py":"90344fdaf013d16cde2f1d805761ddf8b1df414d89a38981bab88396e17ac827","serve-whole.py":"4a8f7ae046d703adfb98301549539e834e34557fe52209c9b7ece3b470991cb0","source-analysis.json":"22da2321277702d2448bec52dc0341d8574dc277a5132a4ecdea261aebb91a29","source-join-analysis.json":"b22530a723dda10848a476c1ad38ce435300f46d0b253374a1cbd639573b47a9","sources.json":"b289d6daf994b28e45d4da498bd1a00690a87cc2d8091cfa041950b4ea442cd3","terminal15-candidate-adapter.mjs":"38a122b56a00d1c7c1257d08c1d742b0c5ee6bfad1d33fb04f5a9d6f3330bfad","terminal15-candidate-validation.json":"13311b72c1a16dae718ced5c4a0cfbfa5dc0bf195174e56639a16e271680f674","verify-source.mjs":"c7d56d21772945b181f2996e086d884ba7e687b5420e20138414ba994c3a6786"}
NAMES=['u9a56','u9a56-ue0100','u9a56-ue0101','u9a56-ue0102','u9a56-ue0103','u9a56-var-001']
SCRIPT="import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';const d=\"/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch920-2026-10-13\",sha=x=>createHash('sha256').update(x).digest('hex');const pins={\"candidate-compile-analysis.json\":\"80b9f4634c0652eb4c89644d29cc528be1e080741b0bfce30a09066286d22caa\",\"engine-proof.json\":\"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b\",\"engine-whole-u9a56-ue0100.json\":\"ee473013365a1e031ee3aca46d8799cfac598f15715c74092f02174c6a78f658\",\"engine-whole-u9a56-ue0101.json\":\"ee473013365a1e031ee3aca46d8799cfac598f15715c74092f02174c6a78f658\",\"engine-whole-u9a56-ue0102.json\":\"049f71d5e4cb56da611cd8ef9ad229d1d4d3dde0ccb18ae1255149f6b33e43a3\",\"engine-whole-u9a56-ue0103.json\":\"82fa185ad6aa8c1bad72d543bdc3f2c409ec47725e128e2b76e17c48d1696c2e\",\"engine-whole-u9a56-var-001.json\":\"fab74a16af5a77bd801fbee2d4f7322422dbba891bf6bdd7e72638e72eac8e78\",\"engine-whole-u9a56.json\":\"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b\",\"metadata.json\":\"5add58fe9bd311255eaa959a234a54a528c8befc82b9a9684823d546bef74f95\",\"native-preflight-source-analysis.json\":\"b98197493f7d492819ac73bed6170cacd7dae0f53fb5f1588fbcb08bcd291bd9\",\"native-server-preparation-source-analysis.json\":\"40a3570dc28b037a538e6fc3796b20a00f09b4d94af385150ab5cdc55611cd05\",\"native-server-validation.json\":\"802a1e84bb05d496bd6100d924cb25ebe565087adaccd304483b33ae965f51b7\",\"progressive-terminal15-candidate.mjs\":\"20c6bc65cb215271c65ea60f62081f81f4cc6ed06d2fc9b47ce7cf6a735fbb07\",\"progressive.mjs\":\"e3f1d33ca3766f5577eacfe0ad130aa0f6f7d8aeead8e7d31d7d4a22dc1280d1\",\"serve-progressive.py\":\"90344fdaf013d16cde2f1d805761ddf8b1df414d89a38981bab88396e17ac827\",\"serve-whole.py\":\"4a8f7ae046d703adfb98301549539e834e34557fe52209c9b7ece3b470991cb0\",\"source-analysis.json\":\"22da2321277702d2448bec52dc0341d8574dc277a5132a4ecdea261aebb91a29\",\"source-join-analysis.json\":\"b22530a723dda10848a476c1ad38ce435300f46d0b253374a1cbd639573b47a9\",\"sources.json\":\"b289d6daf994b28e45d4da498bd1a00690a87cc2d8091cfa041950b4ea442cd3\",\"terminal15-candidate-adapter.mjs\":\"38a122b56a00d1c7c1257d08c1d742b0c5ee6bfad1d33fb04f5a9d6f3330bfad\",\"terminal15-candidate-validation.json\":\"13311b72c1a16dae718ced5c4a0cfbfa5dc0bf195174e56639a16e271680f674\",\"verify-source.mjs\":\"c7d56d21772945b181f2996e086d884ba7e687b5420e20138414ba994c3a6786\"};for(const[f,h]of Object.entries(pins))assert.equal(sha(readFileSync(d+'/'+f)),h,'Frozen input '+f);const m=await import(d+'/terminal15-candidate-adapter.mjs'),id=m.selectedProofIdentity;assert.deepEqual(id,{\"sourceRoot\":\"u9a56\",\"sourceProofFile\":\"engine-whole-u9a56.json\",\"sourceProofFileSHA256\":\"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b\",\"sourceHeaderFile\":\"engine-proof.json\",\"sourceHeaderFileSHA256\":\"38c68cb076f0aa56ecaf183f881740f8770c1946730c56e203ea96f5fc072e2b\"});const proof=m.buildSourceProof(id);assert.equal(sha(JSON.stringify(proof)),\"bae8dd6bfc0f2da711235784ad4d45f57328bf300b80351c652edb2d27289a77\");assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);const before=JSON.stringify(proof),strokes=m.compileSourceWhole(id.sourceRoot,proof.trace,proof,id);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,23);assert.equal(strokes.flat().length,25);assert.equal(sha(JSON.stringify(strokes)),\"6a5110d09873e0d83dda15b185641ca78f886c8b6ab442b97672191b53ee5759\");console.log(JSON.stringify({strokes,render:m.renderProgressive.toString(),sourceRoot:id.sourceRoot,identity:id,sourceGroups:m.sourceGroups,compiledSHA256:sha(JSON.stringify(strokes)),fullProofSHA256:sha(JSON.stringify(proof)),pens:23,masks:25,nativeApproval:false}));"
def check_pins():
    for file,pin in PINS.items():
        assert hashlib.sha256((HERE/file).read_bytes()).hexdigest()==pin,'Frozen public/source input changed: '+file
check_pins()
meta=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('own_920_terminal15_ram',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['驖']={'strokes':23,'dictionary':meta['dictionary']}
# Existing renderer verifies the exact original URL/byte count/SHA/title/clip order and caches XML only in RAM.
dictionary=r.base.renderer.source('驖')
assert len(dictionary['strokes'])==23
def compiled():
    check_pins()
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',SCRIPT],cwd=ROOT))
def whole_svg(name):
    assert name in NAMES
    p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
    assert p['groups'] is not None and p['trace'] is not None
    polygons=[v for g in p['groups'] for v in g['polygons']]
    assert all(v['off']==0 for poly in polygons for v in poly)
    return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
def nav():
    return '<nav><a href="/whole">전체</a><a href="/whole?all=1">기존 6 whole</a><a href="/pairs">국내 23방향</a><a href="/progressive?stroke=14&amp;enlarged=1&amp;samples=1">14획 경계·fine</a></nav>'
def base(c):
    return '<!doctype html><meta charset="utf-8"><title>驖 terminal15 original review</title><style>body{font:16px system-ui;margin:16px;width:1112px;color:#111;background:white}h1{font-size:23px;margin:10px 0}a,button,input{margin:5px}svg{width:420px;height:420px}.pair{display:flex;gap:20px}.directions{display:grid;grid-template-columns:556px 556px}.directions section{width:550px;border-bottom:1px solid #ddd}.directions svg{width:200px;height:210px}.samples{display:grid;grid-template-columns:repeat(3,180px);gap:4px}.samples svg{width:170px;height:170px}.samples div{font-size:13px}.whole-list{display:grid;grid-template-columns:556px 556px}.whole-list svg{width:420px;height:420px}</style>'+nav()+'<h1>驖 · 새 terminal15 원본 후보 · base 23획/25mask</h1><p>원본 방향·좌표·폭 보존 · 국내 native 미승인 · 사전 RAM-only</p>'
def script(c):
    return '<script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';'
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            c=compiled();p=urlparse(self.path);q=parse_qs(p.query);route=p.path
            if q.get('view')==['checks'] or route=='/checks':
                body=json.dumps({k:v for k,v in c.items() if k not in ['strokes','render']}|{'wholeNames':NAMES,'finePens':[6,7,8,9,10,14,15,16,18,22],'maskTransitions':[{"pen":6,"mask":2,"start":0.8994543430287164,"weights":[62.620113,7]},{"pen":14,"mask":2,"start":0.8719972028623965,"weights":[85.154116,12.5]}],'privateDictionarySHA256':meta['dictionary']['sha256'],'privateDictionaryClips':len(dictionary['strokes']),'privateGraphicsSaved':False,'nativeApproval':False}).encode();mime='application/json'
            elif route in ['/','/whole'] and 'stroke' not in q:
                name=q.get('id',['u9a56'])[0];assert name in NAMES
                content=base(c)+'<div class="pair">'+r.base.full_dictionary('驖')+whole_svg(name)+'</div>'
                if q.get('all')==['1']:
                    content+='<div class="whole-list">'+''.join('<section><h2>'+html.escape(n)+'</h2>'+whole_svg(n)+'</section>' for n in NAMES)+'</div>'
                content+='<p>선택 '+html.escape(name)+' · 새 compiled 재생은 명시 base u9a56 1profile만 지원.</p>'
                body=content.encode();mime='text/html; charset=utf-8'
            elif route=='/pairs':
                assert q.get('id',['u9a56'])[0]=='u9a56','Only the exact new base candidate can animate'
                pairs=[tuple(map(int,v.split(':'))) for v in q.get('pairs',[''])[0].split(',') if v] or [(n,n) for n in range(1,24)]
                assert all(1<=l<=23 and 1<=rr<=23 for l,rr in pairs)
                content=base(c)+'<div class="directions">'
                for i,(left,right) in enumerate(pairs):
                    content+='<section><h2>국내 '+str(left)+' / candidate '+str(right)+' · raw '+html.escape(str(c['sourceGroups'][right-1]))+'</h2><div class="pair">'+r.base.renderer.dictionary_svg('驖',left,True,'dom'+str(i))+'<div id="candidate'+str(i)+'"></div></div></section>'
                content+='</div>'+script(c)+'const pairs='+json.dumps([rr for _,rr in pairs])+';pairs.forEach((pen,i)=>document.getElementById("candidate"+i).innerHTML=render(strokes,pen,1,"pair"+i));</script>'
                body=content.encode();mime='text/html; charset=utf-8'
            elif route=='/progressive' or (route=='/' and 'stroke' in q):
                assert q.get('id',['u9a56'])[0]=='u9a56','Only the exact new base candidate can animate'
                n=int(q.get('stroke',['1'])[0]);assert 1<=n<=23
                masks=c['strokes'][n-1];total=sum(m['weight'] for m in masks);prior=0;controls=[]
                for k,m in enumerate(masks[:-1],1):
                    prior+=m['weight'];t=prior/total
                    controls.append('<button onclick="show('+repr(max(0,t-1e-10))+')">mask'+str(k+1)+' 직전</button><button onclick="show('+repr(t)+')">mask'+str(k+1)+' 경계</button><button onclick="show('+repr(min(1,t+1e-10))+')">mask'+str(k+1)+' 직후</button>')
                large=q.get('enlarged')==['1'];samples=q.get('samples')==['1'] or not large
                content=base(c)+'<h2>'+str(n)+'/23 · 원source raw'+html.escape(str(c['sourceGroups'][n-1]))+'</h2>'+''.join('<a href="/progressive?stroke='+str(i)+'&amp;samples=1">'+str(i)+'</a>' for i in range(1,24))
                if large:content+='<style>.live svg{width:520px;height:520px}</style>'
                content+='<div class="pair live">'+r.base.renderer.dictionary_svg('驖',n,True,'domestic'+str(n))+'<div id="candidate"></div></div>'
                content+=''.join('<button onclick="show('+repr(v)+')">'+label+'</button>' for v,label in [(0,'0%'),(.25,'25%'),(.5,'50%'),(.75,'75%'),(.99,'99%'),(.9999,'99.99%'),(1,'100%')])+''.join(controls)
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
    print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'pens':23,'masks':25,'compiledSHA256':c['compiledSHA256'],'fullProofSHA256':c['fullProofSHA256'],'dictionaryClips':len(dictionary['strokes']),'dictionarySHA256':meta['dictionary']['sha256'],'privateMediaSaved':False,'nativeApproval':False}),flush=True)
    server.serve_forever()
