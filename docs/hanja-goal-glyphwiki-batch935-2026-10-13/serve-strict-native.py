# Separate source-only native review. Original metadata, geometry and all other helpers are immutable.
import sys
sys.dont_write_bytecode=True
import json,os,html,hashlib,subprocess,importlib.util,argparse
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
CFG=json.loads("{\"glyph\":\"鵻\",\"count\":19,\"defaultRoot\":\"u9d7b\",\"wholeNames\":[\"u9d7b\",\"u9d7b-ue0100\"],\"supportedRoots\":[\"u9d7b\"],\"pins\":{\"sources.json\":\"cdc17cab8852826b2687489bb070bbcba117e8021e222069aa748f7397fe6ab5\",\"engine-whole-u9d7b.json\":\"aec3e72052ec2a28c6a4d4ed5b626b66553ca650eca9608b900055ed04455afa\",\"serve-whole.py\":\"8b15b703df077c5e7aa277f31d13833420848efc3fd1f5b6f4190c67842f04bf\",\"native-server-validation.json\":\"1a38efa9f19d694a2f95980438f55b8d32546ae382f6c3d1a7f2cae474575e2d\",\"candidate-compile-analysis.json\":\"506ae9310dd22c269bf19f77ff4e7217a8f1eb9f1a7777a04453b1fa58e2af0d\",\"engine-proof.json\":\"aec3e72052ec2a28c6a4d4ed5b626b66553ca650eca9608b900055ed04455afa\",\"engine-whole-u9d7b-ue0100.json\":\"aec3e72052ec2a28c6a4d4ed5b626b66553ca650eca9608b900055ed04455afa\",\"serve-progressive.py\":\"c102bcca5dcc75e64367f3a44992d86f0bdd16654e0ce3b76d7b8df24c00a39b\",\"native-server-preparation-source-analysis.json\":\"a75c35a7d53d176a6c7da8ee5052891c92bb3bad722aae43fbd460d7e4d64a4c\",\"metadata.json\":\"44bc5c43e4ee07b95b4629404e6716aad5b168f13795a917bac799c71f658cc1\",\"verify-source.mjs\":\"83c7a0bdd08ba3ac370dc3938eeae4ae838c46bb72ff60576ac7dbf255f1b4b1\",\"source-analysis.json\":\"dc8bff4b0a7e01f520f1e7f776cb598dba14500dc221150ca9c964dcdb6e9869\",\"progressive.mjs\":\"41bf88a6f0dc6d23f548245776c44d1e2b4e09f2e04401681d55ad3e22565ab2\",\"source-preservation-audit.json\":\"d9ce2ef1288e5e037095768418bbb7d223016932e9a7a205216ab4c015077314\",\"source-join-analysis.json\":\"ed19a8df683beb44b49049362800fb09dc9ac41134fe6c6cb03fe40853bc6001\",\"NOTICE.md\":\"13988b980dbe2653b0c30e609530cbd9b5337a74dda868212a57994728f6d77d\"},\"script\":\"import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';const d=\\\"/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch935-2026-10-13\\\",sha=x=>createHash('sha256').update(x).digest('hex'),pins={\\\"sources.json\\\":\\\"cdc17cab8852826b2687489bb070bbcba117e8021e222069aa748f7397fe6ab5\\\",\\\"engine-whole-u9d7b.json\\\":\\\"aec3e72052ec2a28c6a4d4ed5b626b66553ca650eca9608b900055ed04455afa\\\",\\\"serve-whole.py\\\":\\\"8b15b703df077c5e7aa277f31d13833420848efc3fd1f5b6f4190c67842f04bf\\\",\\\"native-server-validation.json\\\":\\\"1a38efa9f19d694a2f95980438f55b8d32546ae382f6c3d1a7f2cae474575e2d\\\",\\\"candidate-compile-analysis.json\\\":\\\"506ae9310dd22c269bf19f77ff4e7217a8f1eb9f1a7777a04453b1fa58e2af0d\\\",\\\"engine-proof.json\\\":\\\"aec3e72052ec2a28c6a4d4ed5b626b66553ca650eca9608b900055ed04455afa\\\",\\\"engine-whole-u9d7b-ue0100.json\\\":\\\"aec3e72052ec2a28c6a4d4ed5b626b66553ca650eca9608b900055ed04455afa\\\",\\\"serve-progressive.py\\\":\\\"c102bcca5dcc75e64367f3a44992d86f0bdd16654e0ce3b76d7b8df24c00a39b\\\",\\\"native-server-preparation-source-analysis.json\\\":\\\"a75c35a7d53d176a6c7da8ee5052891c92bb3bad722aae43fbd460d7e4d64a4c\\\",\\\"metadata.json\\\":\\\"44bc5c43e4ee07b95b4629404e6716aad5b168f13795a917bac799c71f658cc1\\\",\\\"verify-source.mjs\\\":\\\"83c7a0bdd08ba3ac370dc3938eeae4ae838c46bb72ff60576ac7dbf255f1b4b1\\\",\\\"source-analysis.json\\\":\\\"dc8bff4b0a7e01f520f1e7f776cb598dba14500dc221150ca9c964dcdb6e9869\\\",\\\"progressive.mjs\\\":\\\"41bf88a6f0dc6d23f548245776c44d1e2b4e09f2e04401681d55ad3e22565ab2\\\",\\\"source-preservation-audit.json\\\":\\\"d9ce2ef1288e5e037095768418bbb7d223016932e9a7a205216ab4c015077314\\\",\\\"source-join-analysis.json\\\":\\\"ed19a8df683beb44b49049362800fb09dc9ac41134fe6c6cb03fe40853bc6001\\\",\\\"NOTICE.md\\\":\\\"13988b980dbe2653b0c30e609530cbd9b5337a74dda868212a57994728f6d77d\\\"},identity={\\\"sourceRoot\\\":\\\"u9d7b\\\",\\\"sourceProofFile\\\":\\\"engine-whole-u9d7b.json\\\",\\\"sourceProofFileSHA256\\\":\\\"aec3e72052ec2a28c6a4d4ed5b626b66553ca650eca9608b900055ed04455afa\\\",\\\"sourceHeaderFile\\\":\\\"engine-proof.json\\\",\\\"sourceHeaderFileSHA256\\\":\\\"aec3e72052ec2a28c6a4d4ed5b626b66553ca650eca9608b900055ed04455afa\\\"};for(const[f,h]of Object.entries(pins))assert.equal(sha(readFileSync(d+'/'+f)),h,'Frozen input '+f);const root=process.argv[1];assert.equal(root,identity.sourceRoot,'Only fixed complete base compiler profile');const m=await import(d+'/progressive.mjs');assert.equal(m.sourceRoot,identity.sourceRoot);assert.equal(m.sourceProofFile,identity.sourceProofFile);assert.equal(m.sourceWholeFileSHA256,identity.sourceProofFileSHA256);assert.deepEqual(m.sourceGroups,[[0],[1],[2,3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20]]);const body=JSON.parse(readFileSync(d+'/'+identity.sourceProofFile)),header=JSON.parse(readFileSync(d+'/'+identity.sourceHeaderFile)),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body};assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),\\\"dcff3179c2c1635789b7e56c592ef4b48457c8617071ed61a528bfa6f9de061c\\\");const before=JSON.stringify(proof),strokes=m.compileProgressive(proof.trace,proof);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,19);assert.equal(strokes.flat().length,20);assert.equal(sha(JSON.stringify(strokes)),\\\"fe6bb1a7c7ffb65c6a542be395492f7b7c7f5f21398fa0cb864a052338c15822\\\");console.log(JSON.stringify({strokes,render:m.renderProgressive.toString(),sourceRoot:root,identity,sourceGroups:m.sourceGroups,compiledSHA256:sha(JSON.stringify(strokes)),fullProofSHA256:sha(JSON.stringify(proof)),pens:19,masks:20,nativeApproval:false}));\",\"tailPen\":7}")
GLYPH=CFG['glyph'];COUNT=CFG['count'];NAMES=CFG['wholeNames'];SUPPORTED=CFG['supportedRoots'];DEFAULT=CFG['defaultRoot']
def check_pins():
    for file,pin in CFG['pins'].items():
        assert hashlib.sha256((HERE/file).read_bytes()).hexdigest()==pin,'Frozen original input changed: '+file
check_pins()
meta=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('own_935_strict_native_ram',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
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
    return '<nav><a href="/whole?id='+encoded+'">전체</a><a href="/whole?id='+encoded+'&amp;all=1">'+str(len(NAMES))+' whole</a><a href="/pairs?id='+encoded+'">전'+str(COUNT)+'방향</a><a href="/progressive?id='+encoded+'&amp;stroke='+str(CFG['tailPen'])+'&amp;enlarged=1&amp;samples=1">7획 fine·경계</a></nav>'
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

