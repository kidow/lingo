# Separate terminal15 source-only native review. Private dictionary geometry stays in process RAM.
import sys
sys.dont_write_bytecode=True
import json,os,html,hashlib,subprocess,importlib.util,argparse
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"candidate-compile-analysis.json":"21703431fe9f4a7b17168e705b2a33f53c101a9c391d79cdaeb61a59aa70a593","engine-proof.json":"076ad58e25b82730a854e0b1f6e13aabdc4617362eada69cadf118ce428724bb","engine-whole-u8337-k.json":"a4ad5aefc57b0d01147b4172db038a25a93596ff80b18cb49a07766da4f8738d","engine-whole-u8337-ue0100.json":"ff14b5e3223455a9a9c361529ec5a785b9352022231a6afcc4b78588cfbf2b8b","engine-whole-u8337-ue0101.json":"ff14b5e3223455a9a9c361529ec5a785b9352022231a6afcc4b78588cfbf2b8b","engine-whole-u8337-ue0102.json":"a4ad5aefc57b0d01147b4172db038a25a93596ff80b18cb49a07766da4f8738d","engine-whole-u8337.json":"ff14b5e3223455a9a9c361529ec5a785b9352022231a6afcc4b78588cfbf2b8b","metadata.json":"f7ee871aecd92ceef8eb52c6e94158b4861b4863078db2e5813bcfc2d0915463","native-server-compile.mjs":"b31e49cff7958ee0dadb73c0e0d81ec67805d26374730272fcfbf001d4f0b543","native-server-source-audit.json":"6cb1c363365585fde34de58d0bf959b7d50be3acc40a9012af484e1c0d9881d9","native-server-validation.json":"683ea778697edb1f2e06131aae80b13f1d05974ed737b63d6d5bd85efdd1602e","progressive-terminal15-candidate.mjs":"94026c85f62937e2414ad474c04efe7ddbdbf63e833b73a5d4d0f5abfa094d70","progressive.mjs":"6f41c102a97bfc8248035536ec5925a13b1175602803aabe8727a23d567ab057","serve-native.py":"6a714d256da6c69d9d81c709a4f88797285008115e418ad3eeded066ca488b4b","source-analysis.json":"e29eb24b8023a7a2606ccfaa01bee4245dd27125a707100e414f1917b86ed5dc","source-join-analysis.json":"d1193f445a7262a29db66251a390dad6b32ed5b314c093e7b7ae3a32b5e2c236","source-only-helper-readiness-2026-10-14.json":"075ead658cc30b34c35d5bcf4af91ec56bd15ba84f43dcfcc28fce04423603ae","sources.json":"4784c96912d2f98000c6d9ad41fc5e4f17f832ff3e8a8c114eac6a0650bcd253","terminal15-candidate-adapter.mjs":"40ff587e0e53e3ff398aeb20dec87f73b3e0a4cde8a588db07e7db2ac6f8fd33","terminal15-candidate-validation.json":"10e4d3719b3d2e9ace24f84a0208b211073dac5fa34e71106091c52197e5cc9a","verify-source.mjs":"7913996d2d810a77fbfdffa974a79a2e67816871809daf372374475fb3bd8af6"}
NAMES=['u8337','u8337-k','u8337-ue0100','u8337-ue0101','u8337-ue0102']
SUPPORTED=['u8337-k','u8337-ue0102']
SCRIPT="import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';const d=\"/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch979-2026-10-13\",sha=x=>createHash('sha256').update(x).digest('hex'),pins={\"candidate-compile-analysis.json\":\"21703431fe9f4a7b17168e705b2a33f53c101a9c391d79cdaeb61a59aa70a593\",\"engine-proof.json\":\"076ad58e25b82730a854e0b1f6e13aabdc4617362eada69cadf118ce428724bb\",\"engine-whole-u8337-k.json\":\"a4ad5aefc57b0d01147b4172db038a25a93596ff80b18cb49a07766da4f8738d\",\"engine-whole-u8337-ue0100.json\":\"ff14b5e3223455a9a9c361529ec5a785b9352022231a6afcc4b78588cfbf2b8b\",\"engine-whole-u8337-ue0101.json\":\"ff14b5e3223455a9a9c361529ec5a785b9352022231a6afcc4b78588cfbf2b8b\",\"engine-whole-u8337-ue0102.json\":\"a4ad5aefc57b0d01147b4172db038a25a93596ff80b18cb49a07766da4f8738d\",\"engine-whole-u8337.json\":\"ff14b5e3223455a9a9c361529ec5a785b9352022231a6afcc4b78588cfbf2b8b\",\"metadata.json\":\"f7ee871aecd92ceef8eb52c6e94158b4861b4863078db2e5813bcfc2d0915463\",\"native-server-compile.mjs\":\"b31e49cff7958ee0dadb73c0e0d81ec67805d26374730272fcfbf001d4f0b543\",\"native-server-source-audit.json\":\"6cb1c363365585fde34de58d0bf959b7d50be3acc40a9012af484e1c0d9881d9\",\"native-server-validation.json\":\"683ea778697edb1f2e06131aae80b13f1d05974ed737b63d6d5bd85efdd1602e\",\"progressive-terminal15-candidate.mjs\":\"94026c85f62937e2414ad474c04efe7ddbdbf63e833b73a5d4d0f5abfa094d70\",\"progressive.mjs\":\"6f41c102a97bfc8248035536ec5925a13b1175602803aabe8727a23d567ab057\",\"serve-native.py\":\"6a714d256da6c69d9d81c709a4f88797285008115e418ad3eeded066ca488b4b\",\"source-analysis.json\":\"e29eb24b8023a7a2606ccfaa01bee4245dd27125a707100e414f1917b86ed5dc\",\"source-join-analysis.json\":\"d1193f445a7262a29db66251a390dad6b32ed5b314c093e7b7ae3a32b5e2c236\",\"source-only-helper-readiness-2026-10-14.json\":\"075ead658cc30b34c35d5bcf4af91ec56bd15ba84f43dcfcc28fce04423603ae\",\"sources.json\":\"4784c96912d2f98000c6d9ad41fc5e4f17f832ff3e8a8c114eac6a0650bcd253\",\"terminal15-candidate-adapter.mjs\":\"40ff587e0e53e3ff398aeb20dec87f73b3e0a4cde8a588db07e7db2ac6f8fd33\",\"terminal15-candidate-validation.json\":\"10e4d3719b3d2e9ace24f84a0208b211073dac5fa34e71106091c52197e5cc9a\",\"verify-source.mjs\":\"7913996d2d810a77fbfdffa974a79a2e67816871809daf372374475fb3bd8af6\"},EXPECTED={\"u8337-k\":{\"identity\":{\"sourceRoot\":\"u8337-k\",\"sourceProofFile\":\"./engine-whole-u8337-k.json\",\"sourceProofFileSHA256\":\"a4ad5aefc57b0d01147b4172db038a25a93596ff80b18cb49a07766da4f8738d\",\"sourceHeaderFile\":\"./engine-proof.json\",\"sourceHeaderFileSHA256\":\"076ad58e25b82730a854e0b1f6e13aabdc4617362eada69cadf118ce428724bb\"},\"pens\":10,\"masks\":11,\"compiledSHA256\":\"e5d28cf49259607467dca1923daefeecfe1e3fd707cf615f58ac581fde63f2c2\",\"finePens\":[5,7,8,9,10],\"transitions\":[{\"pen\":8,\"mask\":2,\"start\":0.8427380804869272,\"weights\":[66.985231,12.5]}],\"fullProofSHA256\":\"002f27932f32230d17bcf8f9d711df57f021273d4bb62dd385e7f38196ca2b0d\",\"sourceGroups\":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]]},\"u8337-ue0102\":{\"identity\":{\"sourceRoot\":\"u8337-ue0102\",\"sourceProofFile\":\"./engine-whole-u8337-ue0102.json\",\"sourceProofFileSHA256\":\"a4ad5aefc57b0d01147b4172db038a25a93596ff80b18cb49a07766da4f8738d\",\"sourceHeaderFile\":\"./engine-proof.json\",\"sourceHeaderFileSHA256\":\"076ad58e25b82730a854e0b1f6e13aabdc4617362eada69cadf118ce428724bb\"},\"pens\":10,\"masks\":11,\"compiledSHA256\":\"e5d28cf49259607467dca1923daefeecfe1e3fd707cf615f58ac581fde63f2c2\",\"finePens\":[5,7,8,9,10],\"transitions\":[{\"pen\":8,\"mask\":2,\"start\":0.8427380804869272,\"weights\":[66.985231,12.5]}],\"fullProofSHA256\":\"002f27932f32230d17bcf8f9d711df57f021273d4bb62dd385e7f38196ca2b0d\",\"sourceGroups\":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]]}};for(const[f,h]of Object.entries(pins))assert.equal(sha(readFileSync(d+'/'+f)),h,'Frozen input '+f);const root=process.argv[1];assert(Object.hasOwn(EXPECTED,root),'Only K and VS2 explicit original candidate profiles supported');const m=await import(d+'/terminal15-candidate-adapter.mjs'),selected=m.candidateWholeProofs.find(p=>p.identity.sourceRoot===root),id=selected.identity;assert.deepEqual(id,EXPECTED[root].identity);const proof=m.buildSourceProof(id);assert.equal(sha(JSON.stringify(proof)),EXPECTED[root].fullProofSHA256);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);const before=JSON.stringify(proof),strokes=m.compileSourceWhole(root,proof.trace,proof,id);assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,10);assert.equal(strokes.flat().length,11);assert.equal(sha(JSON.stringify(strokes)),EXPECTED[root].compiledSHA256);console.log(JSON.stringify({strokes,render:m.renderProgressive.toString(),sourceRoot:root,identity:id,sourceGroups:selected.sourceGroups,compiledSHA256:sha(JSON.stringify(strokes)),fullProofSHA256:sha(JSON.stringify(proof)),pens:10,masks:11,nativeApproval:false}));"
def check_pins():
    for file,pin in PINS.items():
        assert hashlib.sha256((HERE/file).read_bytes()).hexdigest()==pin,'Frozen public/source input changed: '+file
check_pins()
meta=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('own_979_terminal15_ram',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['茷']={'strokes':10,'dictionary':meta['dictionary']}
# Existing renderer verifies the exact original URL/byte count/SHA/title/clip order and caches XML only in RAM.
dictionary=r.base.renderer.source('茷')
assert len(dictionary['strokes'])==10
def compiled(root='u8337-k'):
    check_pins()
    return json.loads(subprocess.check_output(['rtk','proxy','node','--input-type=module','-e',SCRIPT,root],cwd=ROOT))
def transitions(c):
    result=[]
    for i,pen in enumerate(c['strokes'],1):
        total=sum(mask['weight'] for mask in pen);prior=0
        for k,mask in enumerate(pen[:-1],1):
            prior+=mask['weight'];result.append({'pen':i,'mask':k+1,'start':prior/total,'weights':[m['weight'] for m in pen]})
    return result
def whole_svg(name):
    assert name in NAMES
    p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
    assert p['groups'] is not None and p['trace'] is not None
    polygons=[v for g in p['groups'] for v in g['polygons']]
    assert all(v['off']==0 for poly in polygons for v in poly)
    return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
def nav():
    return '<nav><a href="/whole">전체</a><a href="/whole?all=1">기존 5 whole</a><a href="/pairs?id=u8337-k">K 국내 10방향</a><a href="/pairs?id=u8337-ue0102">VS2 국내 10방향</a><a href="/progressive?id='+html.escape(c['sourceRoot'])+'&amp;stroke=8&amp;enlarged=1&amp;samples=1">8획 경계·fine</a></nav>'
def base(c):
    return '<!doctype html><meta charset="utf-8"><title>茷 terminal15 original review</title><style>body{font:16px system-ui;margin:16px;width:1112px;color:#111;background:white}h1{font-size:10px;margin:10px 0}a,button,input{margin:5px}svg{width:420px;height:420px}.pair{display:flex;gap:20px}.directions{display:grid;grid-template-columns:556px 556px}.directions section{width:550px;border-bottom:1px solid #ddd}.directions svg{width:200px;height:210px}.samples{display:grid;grid-template-columns:repeat(3,180px);gap:4px}.samples svg{width:170px;height:170px}.samples div{font-size:13px}.whole-list{display:grid;grid-template-columns:556px 556px}.whole-list svg{width:420px;height:420px}</style>'+nav()+'<h1>茷 · 새 terminal15 원본 후보 · base K/VS2 10획/11mask</h1><p>원본 방향·좌표·폭 보존 · 국내 native 미승인 · 사전 RAM-only</p>'
def script(c):
    return '<script>const strokes='+json.dumps(c['strokes'])+';const render='+c['render']+';'
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            p=urlparse(self.path);q=parse_qs(p.query);route=p.path;requested=q.get('id',['u8337-k'])[0]
            c=compiled(requested if requested in SUPPORTED else 'u8337-k')
            if q.get('view')==['checks'] or route=='/checks':
                body=json.dumps({k:v for k,v in c.items() if k not in ['strokes','render']}|{'wholeNames':NAMES,'finePens':[i+1 for i,p in enumerate(c['strokes']) if any(m['direction']=='curve' for m in p)],'maskTransitions':transitions(c),'privateDictionarySHA256':meta['dictionary']['sha256'],'privateDictionaryClips':len(dictionary['strokes']),'privateGraphicsSaved':False,'nativeApproval':False}).encode();mime='application/json'
            elif route in ['/','/whole'] and 'stroke' not in q:
                name=q.get('id',['u8337-k'])[0];assert name in NAMES
                content=base(c)+'<div class="pair">'+r.base.full_dictionary('茷')+whole_svg(name)+'</div>'
                if q.get('all')==['1']:
                    content+='<div class="whole-list">'+''.join('<section><h2>'+html.escape(n)+'</h2>'+whole_svg(n)+'</section>' for n in NAMES)+'</div>'
                content+='<p>선택 '+html.escape(name)+' · 새 compiled 재생은 명시 K/VS2 2profile만 지원.</p>'
                body=content.encode();mime='text/html; charset=utf-8'
            elif route=='/pairs':
                assert requested in SUPPORTED,'Only the exact K/VS2 candidate can animate'
                pairs=[tuple(map(int,v.split(':'))) for v in q.get('pairs',[''])[0].split(',') if v] or [(n,n) for n in range(1,11)]
                assert all(1<=l<=10 and 1<=rr<=10 for l,rr in pairs)
                content=base(c)+'<div class="directions">'
                for i,(left,right) in enumerate(pairs):
                    content+='<section><h2>국내 '+str(left)+' / candidate '+str(right)+' · raw '+html.escape(str(c['sourceGroups'][right-1]))+'</h2><div class="pair">'+r.base.renderer.dictionary_svg('茷',left,True,'dom'+str(i))+'<div id="candidate'+str(i)+'"></div></div></section>'
                content+='</div>'+script(c)+'const pairs='+json.dumps([rr for _,rr in pairs])+';pairs.forEach((pen,i)=>document.getElementById("candidate"+i).innerHTML=render(strokes,pen,1,"pair"+i));</script>'
                body=content.encode();mime='text/html; charset=utf-8'
            elif route=='/progressive' or (route=='/' and 'stroke' in q):
                assert requested in SUPPORTED,'Only the exact K/VS2 candidate can animate'
                n=int(q.get('stroke',['1'])[0]);assert 1<=n<=10
                masks=c['strokes'][n-1];total=sum(m['weight'] for m in masks);prior=0;controls=[]
                for k,m in enumerate(masks[:-1],1):
                    prior+=m['weight'];t=prior/total
                    controls.append('<button onclick="show('+repr(max(0,t-1e-10))+')">mask'+str(k+1)+' 직전</button><button onclick="show('+repr(t)+')">mask'+str(k+1)+' 경계</button><button onclick="show('+repr(min(1,t+1e-10))+')">mask'+str(k+1)+' 직후</button>')
                large=q.get('enlarged')==['1'];samples=q.get('samples')==['1'] or not large
                content=base(c)+'<h2>'+html.escape(c['sourceRoot'])+' · '+str(n)+'/10 · 원source raw'+html.escape(str(c['sourceGroups'][n-1]))+'</h2>'+''.join('<a href="/progressive?id='+html.escape(c['sourceRoot'])+'&amp;stroke='+str(i)+'&amp;samples=1">'+str(i)+'</a>' for i in range(1,11))
                if large:content+='<style>.live svg{width:520px;height:520px}</style>'
                content+='<div class="pair live">'+r.base.renderer.dictionary_svg('茷',n,True,'domestic'+str(n))+'<div id="candidate"></div></div>'
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
    print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'pens':10,'masks':11,'compiledSHA256':c['compiledSHA256'],'fullProofSHA256':c['fullProofSHA256'],'dictionaryClips':len(dictionary['strokes']),'dictionarySHA256':meta['dictionary']['sha256'],'privateMediaSaved':False,'nativeApproval':False}),flush=True)
    server.serve_forever()
