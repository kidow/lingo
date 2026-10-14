# Separate source-only native review. Original metadata, geometry and all other helpers are immutable.
import sys
sys.dont_write_bytecode=True
import json,os,html,hashlib,subprocess,importlib.util,argparse
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
CFG=json.loads("{\"glyph\":\"餂\",\"count\":15,\"defaultRoot\":\"u9902\",\"wholeNames\":[\"u9902-ue0100\",\"u9902-ue0101\",\"u9902-ue0102\",\"u9902-var-001\",\"u9902\"],\"supportedRoots\":[\"u9902\"],\"pins\":{\"NOTICE.md\":\"07b21bdb2584d70873cb86fde5deac87d818940b3d69f637e45c61b6bb16e9b2\",\"candidate-compile-analysis.json\":\"7494b8c74c57668c4095cba20ce63dc0ee43d0c63c7db97332863d60a92d7fc1\",\"engine-proof.json\":\"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf\",\"engine-whole-u9902-ue0100.json\":\"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf\",\"engine-whole-u9902-ue0101.json\":\"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf\",\"engine-whole-u9902-ue0102.json\":\"4d21621fb5144d016900a4837ff2b543b6c5722b09a6e65314365103b87cf638\",\"engine-whole-u9902-var-001.json\":\"4d21621fb5144d016900a4837ff2b543b6c5722b09a6e65314365103b87cf638\",\"engine-whole-u9902.json\":\"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf\",\"metadata.json\":\"a31f484a7d4ba376f40558907dc781a6a190d53c5e533880097f1e8f6e7535a2\",\"native-preflight-source-analysis.json\":\"9c4ee85bb9101aef5f85e253038208d431235e9431b24c0d76c2f0e577899ed1\",\"native-server-preparation-source-analysis.json\":\"b924ff6f86ff5c37777428dbdea8a53eb04eeb281e23363801a652ae00948f52\",\"native-server-validation.json\":\"61f6ec5eb5433b5c1a794b352c2e5772ce579aeedd75f83824f79802ec5f8ef9\",\"progressive.mjs\":\"8270ea9025542558f1470b78a14f20be12068c459591f80a8e499a976a6a90e9\",\"serve-progressive.py\":\"ec515ab6766c0d3045519a4123e336cf9c95f24a5eb75d0dfad9a1792474385d\",\"serve-whole.py\":\"7f719eb7f7c03edc6128d7d14e3a3deb4665b76929b443e5f69b4d22e4d1638d\",\"source-analysis.json\":\"21db2299458fabb0d3efdf40baafb186e8cada4283a9a966ea4eab5c92bf2ffb\",\"source-join-analysis.json\":\"9eb0d508ad1f6f3a16f2ea05febe5f5f18062545533f31c49c5b0df7dab25841\",\"sources.json\":\"f081f07ea1490201e87a596ec3fba9a2380e2c760e3a081355d59429f20efd5d\",\"verify-source.mjs\":\"e902a351abaea63575a50bccb9d6fd8959115fd58567b529bdf3d40cbd7744ac\",\"progressive-domestic-order-candidate.mjs\":\"8a71333bd81632ccddd7cc963c115cf675c699e037873c78b4ae9de58fb17316\",\"domestic-order-candidate-validation.json\":\"c31b798bc5d77599627431fba64dfbfecc9c49a1c4677883b8d6e712b65a6e44\"},\"script\":\"import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';const d=\\\"/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch922-2026-10-13\\\",sha=x=>createHash('sha256').update(x).digest('hex'),pins={\\\"NOTICE.md\\\":\\\"07b21bdb2584d70873cb86fde5deac87d818940b3d69f637e45c61b6bb16e9b2\\\",\\\"candidate-compile-analysis.json\\\":\\\"7494b8c74c57668c4095cba20ce63dc0ee43d0c63c7db97332863d60a92d7fc1\\\",\\\"engine-proof.json\\\":\\\"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf\\\",\\\"engine-whole-u9902-ue0100.json\\\":\\\"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf\\\",\\\"engine-whole-u9902-ue0101.json\\\":\\\"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf\\\",\\\"engine-whole-u9902-ue0102.json\\\":\\\"4d21621fb5144d016900a4837ff2b543b6c5722b09a6e65314365103b87cf638\\\",\\\"engine-whole-u9902-var-001.json\\\":\\\"4d21621fb5144d016900a4837ff2b543b6c5722b09a6e65314365103b87cf638\\\",\\\"engine-whole-u9902.json\\\":\\\"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf\\\",\\\"metadata.json\\\":\\\"a31f484a7d4ba376f40558907dc781a6a190d53c5e533880097f1e8f6e7535a2\\\",\\\"native-preflight-source-analysis.json\\\":\\\"9c4ee85bb9101aef5f85e253038208d431235e9431b24c0d76c2f0e577899ed1\\\",\\\"native-server-preparation-source-analysis.json\\\":\\\"b924ff6f86ff5c37777428dbdea8a53eb04eeb281e23363801a652ae00948f52\\\",\\\"native-server-validation.json\\\":\\\"61f6ec5eb5433b5c1a794b352c2e5772ce579aeedd75f83824f79802ec5f8ef9\\\",\\\"progressive.mjs\\\":\\\"8270ea9025542558f1470b78a14f20be12068c459591f80a8e499a976a6a90e9\\\",\\\"serve-progressive.py\\\":\\\"ec515ab6766c0d3045519a4123e336cf9c95f24a5eb75d0dfad9a1792474385d\\\",\\\"serve-whole.py\\\":\\\"7f719eb7f7c03edc6128d7d14e3a3deb4665b76929b443e5f69b4d22e4d1638d\\\",\\\"source-analysis.json\\\":\\\"21db2299458fabb0d3efdf40baafb186e8cada4283a9a966ea4eab5c92bf2ffb\\\",\\\"source-join-analysis.json\\\":\\\"9eb0d508ad1f6f3a16f2ea05febe5f5f18062545533f31c49c5b0df7dab25841\\\",\\\"sources.json\\\":\\\"f081f07ea1490201e87a596ec3fba9a2380e2c760e3a081355d59429f20efd5d\\\",\\\"verify-source.mjs\\\":\\\"e902a351abaea63575a50bccb9d6fd8959115fd58567b529bdf3d40cbd7744ac\\\",\\\"progressive-domestic-order-candidate.mjs\\\":\\\"8a71333bd81632ccddd7cc963c115cf675c699e037873c78b4ae9de58fb17316\\\",\\\"domestic-order-candidate-validation.json\\\":\\\"c31b798bc5d77599627431fba64dfbfecc9c49a1c4677883b8d6e712b65a6e44\\\"};for(const[f,h]of Object.entries(pins))assert.equal(sha(readFileSync(d+'/'+f)),h,'Frozen input '+f);const root=process.argv[1];assert.equal(root,'u9902');const m=await import(d+'/progressive-domestic-order-candidate.mjs'),id=m.selectedProofIdentity;assert.deepEqual(id,{\\\"sourceRoot\\\":\\\"u9902\\\",\\\"sourceProofFile\\\":\\\"engine-whole-u9902.json\\\",\\\"sourceProofFileSHA256\\\":\\\"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf\\\",\\\"sourceHeaderFile\\\":\\\"engine-proof.json\\\",\\\"sourceHeaderFileSHA256\\\":\\\"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf\\\"});const proof=m.buildSourceProof(id);assert.equal(sha(JSON.stringify(proof)),\\\"93a2f7537b2c36a3f27081c22cc727b7f06a5a47b0e69307525e5e835622c79b\\\");assert.deepEqual(Object.keys(proof).sort(),[\\\"defaults\\\",\\\"engineHashes\\\",\\\"engineRevision\\\",\\\"groups\\\",\\\"trace\\\"]);const before=JSON.stringify(proof),strokes=m.compileSourceWhole(root,proof.trace,proof,id);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,15);assert.equal(strokes.flat().length,15);assert.equal(sha(JSON.stringify(strokes)),\\\"19ad1f423443010f4a37b420ac3044d5d07326fc8a5f0ffff3ac30a32cd059fc\\\");console.log(JSON.stringify({strokes,render:m.renderProgressive.toString(),sourceRoot:root,identity:id,sourceGroups:m.sourceGroups,compiledSHA256:sha(JSON.stringify(strokes)),fullProofSHA256:sha(JSON.stringify(proof)),pens:15,masks:15,nativeApproval:false}));\",\"tailPen\":14}")
GLYPH=CFG['glyph'];COUNT=CFG['count'];NAMES=CFG['wholeNames'];SUPPORTED=CFG['supportedRoots'];DEFAULT=CFG['defaultRoot']
def check_pins():
    for file,pin in CFG['pins'].items():
        assert hashlib.sha256((HERE/file).read_bytes()).hexdigest()==pin,'Frozen original input changed: '+file
check_pins()
meta=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('own_922_domestic_order_ram',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
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
    return '<nav><a href="/whole?id='+encoded+'">전체</a><a href="/whole?id='+encoded+'&amp;all=1">'+str(len(NAMES))+' whole</a><a href="/pairs?id='+encoded+'">전'+str(COUNT)+'방향</a><a href="/progressive?id='+encoded+'&amp;stroke='+str(CFG['tailPen'])+'&amp;enlarged=1&amp;samples=1">14획 fine</a></nav>'
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

