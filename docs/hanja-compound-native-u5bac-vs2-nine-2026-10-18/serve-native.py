# -*- coding: utf-8 -*-
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,importlib.util,json,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
P_BYTES=(HERE/'validation.json').read_bytes();P_SHA=hashlib.sha256(P_BYTES).hexdigest();P=json.loads(P_BYTES)
C_BYTES=(HERE/'config.json').read_bytes();C_SHA=hashlib.sha256(C_BYTES).hexdigest();C=json.loads(C_BYTES)
def digest(data):return hashlib.sha256(data).hexdigest()
def load_fixture(read):
    data=read(HERE/C['fixtureFile']);assert digest(data)==C['fixtureFileSHA256'],'fixture byte pin'
    f=json.loads(data);assert f['sourceRoot']==C['selectedWhole'],'selected whole'
    assert f['publicSourceOnly'] is True
    assert f['compiledSHA256']==C['compiledSHA256']
    strokes=f['strokes'];assert len(strokes)==C['pens'];assert sum(map(len,strokes))==C['masks']
    assert sum(m['outline'].count('M')for p in strokes for m in p)==C['polygons']
    return f
def guards(read=None):
    if read is None:read=lambda p:p.read_bytes()
    assert digest(read(HERE/'validation.json'))==P_SHA,'validation changed'
    assert digest(read(HERE/'config.json'))==C_SHA==P['configSHA256'],'config changed'
    for p,h in C['inputFilesSHA256'].items():assert digest(read(ROOT/p))==h,'input changed: '+p
    for p,h in P['helperFilesSHA256'].items():assert digest(read(HERE/p))==h,'helper changed: '+p
    return load_fixture(read)
def boundaries(strokes):
    return {i+1:[sum(m['weight']for m in masks[:j])/sum(m['weight']for m in masks)for j in range(1,len(masks))]for i,masks in enumerate(strokes)if len(masks)>1}
def browser_js(strokes,pen):
    text=(ROOT/'docs/hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs').read_text()
    render=text[text.index('export function renderProgressive'):].replace('export function renderProgressive','function renderProgressive',1)
    return render+';const strokes='+json.dumps(strokes)+';const stroke='+str(pen)+';const show=p=>{candidate.innerHTML=renderProgressive(strokes,stroke,p,"new");progress.value=p*100;value.textContent=(p*100).toFixed(8)+"%"};progress.oninput=()=>show(+progress.value/100);play.onclick=()=>{const start=performance.now();function tick(t){const p=Math.min(1,(t-start)/8000);show(p);if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)};'
def main():
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args();f=guards()
    strokes=f['strokes'];all_bounds=boundaries(strokes)
    if args.check_only:
        print(json.dumps({'guardsPassed':True,'inputPins':len(C['inputFilesSHA256']),'sourceCompiles':0,'engineRuns':0,'serverStarts':0,'HTTP':0,'allMultiMaskBoundaries':all_bounds}));return
    spec=importlib.util.spec_from_file_location('u5bac_native_domestic',ROOT/'docs/hanja-special2-direction-review-2026-09-21/serve.py');review=importlib.util.module_from_spec(spec);spec.loader.exec_module(review)
    review.renderer.ENTRIES={C['glyph']:{'strokes':C['domesticClips'],'dictionary':C['dictionary']}};review.renderer.source(C['glyph'])
    class Handler(BaseHTTPRequestHandler):
        def log_message(self,*args):pass
        def do_GET(self):
            try:
                guards();u=urlparse(self.path);q=parse_qs(u.query);route=u.path
                if route=='/checks':out=json.dumps({'root':C['selectedWhole'],'pens':len(strokes),'masks':sum(map(len,strokes)),'inputPins':len(C['inputFilesSHA256']),'startupCompilations':0,'requestCompilations':0,'allMultiMaskBoundaries':all_bounds,'nativeApproval':False,'runtimeApplied':False}).encode();kind='application/json'
                else:
                    assert route in ['/','/whole','/pairs','/progressive']
                    pen=int(q.get('stroke',[str(C['defaultPen'])])[0]);assert 1<=pen<=C['pens']
                    domestic=review.renderer.dictionary_svg(C['glyph'],pen,True,'dom')
                    if route in ['/','/whole']:
                        d=review.renderer.source(C['glyph']);domestic='<svg viewBox="0 0 1024 1024"><g transform="'+d['transform']+'">'+''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in d['strokes'])+'</g></svg>'
                    body='<!doctype html><meta charset="utf-8"><title>宬 VS2 cached9 native review</title><style>body{font:16px system-ui;margin:16px;width:1150px}.pair{display:flex;gap:25px}.pair svg{width:520px;height:520px}button,a{margin:5px;display:inline-block}.coarse{display:grid;grid-template-columns:repeat(3,1fr)}.coarse svg{width:220px;height:220px}</style><h1>宬 VS2 source-only · native 미승인/runtime 미적용</h1><p>배정10/국내9 보존. LEFT 국내/RIGHT 후보 2SVG520. baseline없음·과거승인승계없음. 고정fixture cache만표시하며source/enginecompile0.</p><a href="/whole">전체</a><a href="/pairs">방향</a><a href="/progressive">progressive</a><div class="pair">'+domestic+'<div id="candidate"></div></div>'
                    body+=''.join('<a href="/progressive?stroke='+str(i)+'">'+str(i)+'</a>'for i in range(1,C['pens']+1))
                    body+='<p>모든실제복수mask경계 '+html.escape(repr(all_bounds))+'</p>'
                    body+=''.join('<button onclick="show('+repr(p)+')">'+label+'</button>'for label,p in [('0',0),('epsilon .0001%',.000001),('50%',.5),('95%',.95),('99.99%',.9999),('100%',1)])
                    body+=''.join('<button onclick="show('+repr(p)+')">boundary'+str(j+1)+'-'+label+'</button>'for j,b in enumerate(all_bounds.get(pen,[]))for label,p in [('before',b-1e-10),('at',b),('after',b+1e-10)])
                    body+='<button id="play">8초 재생</button><input id="progress" type="range" min="0" max="100" step=".0001" value="0" aria-label="진행률"><output id="value"></output><div id="coarse" class="coarse"></div><script>'+browser_js(strokes,pen)
                    if route in ['/','/whole']:body+='candidate.innerHTML=renderProgressive(strokes,strokes.length,1,"whole");'
                    else:body+='show('+('.75'if route=='/pairs'else'0')+');'
                    if 'coarse'in q:body+='[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>coarse.innerHTML+="<div>"+(p*100)+"%"+renderProgressive(strokes,stroke,p,"co"+i)+"</div>");'
                    out=(body+'</script>').encode();kind='text/html'
                self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(out)
            except Exception as e:self.send_response(409);self.end_headers();self.wfile.write(str(e).encode())
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler);print(json.dumps({'pid':os.getpid(),'port':server.server_address[1],'startupSourceCompiles':0,'requestSourceCompiles':0,'engineRuns':0,'cachedPublicFixture':True,'privateMediaSaved':False,'nativeApproval':False,'runtimeApplied':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
if __name__=='__main__':main()
