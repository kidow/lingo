# -*- coding: utf-8 -*-
"""Static raw mapping review only. Domestic SVG remains in RAM; no compiler or animation."""
import sys
sys.dont_write_bytecode=True
import argparse,ast,copy,hashlib,html,json,os,re,threading,urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
CONFIG_BYTES=(HERE/'config.json').read_bytes()
CONFIG_SHA="5074912b29e40e9c55de417b4a6a47c7c120d4216a7a46f74dd3f6c10f799f63"
CFG=json.loads(CONFIG_BYTES)
VALIDATION_BYTES=(HERE/'validation.json').read_bytes()
VALIDATION_SHA=hashlib.sha256(VALIDATION_BYTES).hexdigest()
VALIDATION=json.loads(VALIDATION_BYTES)
EXPECTED_ID=json.loads("{\"root\":\"u8fed-k\",\"file\":\"../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-k.json\",\"fileSHA256\":\"682a63e93461ab37a5e167980654f993709b4ff042fd5cc633a6dea31a54327a\"}")
INPUT_PINS=json.loads("{\"../hanja-goal-glyphwiki-batch896-2026-10-13/NOTICE.md\":\"284f0f550ba33b1de75b8b38a6a74a11788d62b03e932d69eddd9c03c0c618ae\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/README.md\":\"8cf3a013581d17ee1574ff3ad2e2fc449f9488189db9317ea6db2f3aa48fe2dc\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/blocked-source-contract.mjs\":\"1b1a7090c08ca3bcdc7859d8f8041ff8fce0fe984809944c1707320d4ba90e6a\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/candidate-compile-analysis.json\":\"01e9f475d306f136b83e9c28df0da099df278098ef3435f0024fa0e67c4b9807\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/engine-proof.json\":\"7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-k.json\":\"682a63e93461ab37a5e167980654f993709b4ff042fd5cc633a6dea31a54327a\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-ue0100.json\":\"7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-ue0101.json\":\"682a63e93461ab37a5e167980654f993709b4ff042fd5cc633a6dea31a54327a\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-ue0102.json\":\"7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-ue0103.json\":\"c29839afd07f2b6cf836beb90b31392c065ed77905519965f8dc69bf6f5e1338\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-v.json\":\"c29839afd07f2b6cf836beb90b31392c065ed77905519965f8dc69bf6f5e1338\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed.json\":\"7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/metadata.json\":\"401c8ceac17569123644dba7e3537378e3850170bad874815644fa8e13ef3200\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/native-preflight-source-analysis.json\":\"092aae90e53f7c7dc9e75c0a98b5adbe14095ab3f6f51be8e01eaf6259b9e7c7\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/native-server-preflight-source-analysis.json\":\"20074adb41b0d5e212685010b66d39c4ef834a940f6bc58b9a88965494e78b81\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/resume.json\":\"6fa5d597f73930932d8fa92e2c0aef4cb7072ea284eb0fd82f15b697b9d0bf45\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/review.json\":\"8a05eb63dd23a8a2f462a62635c6cbd1aad3c834824014cf381cec18aca86e6b\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/serve-progressive.py\":\"07f0b8f0e6bfec751ef1c06fb8e12341f0ac2465380fa377804b092c7c1f4137\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/serve-whole.py\":\"94657659a4b42ebe5d32866e5e63d69a7f2a9ff99fbb06bf37ced96e8d991b21\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/source-analysis.json\":\"e50d02b98ae67d7cf604ad148409c30247f0dbbb459f5157ac6ae3695f383947\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/source-join-analysis.json\":\"817eba699a46f627debe6232edfb64c6f5a4ce05f6480c975a9d6f1c293375fa\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/sources.json\":\"d0c0da93c7735e47ae3d4f8b308bdcdf051ca9d6b36fe9338f350713b7bb0f8f\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/validation.json\":\"3bcb132a5ea9b21ec529173479dece6b921c39a42355e4ccf2e2f8b3305d84cd\",\"../hanja-goal-glyphwiki-batch896-2026-10-13/verify-source.mjs\":\"8a80d8f75119ea3eabc8676198c8b9f8cf49cdf5331d2bece63a75c817f5494a\",\"../hanja-goal-glyphwiki-batch162-2026-10-03/NOTICE.md\":\"45b6f50a61dd7b5dd4527618d3bd7f6007098010b63ae3bc2d24cc729c6d03ca\",\"../hanja-goal-glyphwiki-batch162-2026-10-03/README.md\":\"3bda596833dfd9d9dbde3894289a499f6ac36203d721259f3b88196dec8f5af7\",\"../hanja-goal-glyphwiki-batch162-2026-10-03/engine-trace.json\":\"22105f6f695f9d11214398b8da11ff0d6307e2d38767bf7f3457d1fac17c4251\",\"../hanja-goal-glyphwiki-batch162-2026-10-03/findings.json\":\"575ae6c60b851eb683c25ffb1b4b7a78332c76a9adfdcf5296a7fd88683aac5c\",\"../hanja-goal-glyphwiki-batch162-2026-10-03/next.json\":\"2c37545aefcd37fee4ec6e9cb72dcf0398050c899313abba0ce93438a60ecfe0\",\"../hanja-goal-glyphwiki-batch162-2026-10-03/sources.json\":\"0d7687fccef28f7ba4671ae32b34976011906f0d425e9fc1f1235133d21329eb\",\"../hanja-goal-glyphwiki-batch162-2026-10-03/verify.mjs\":\"63a9b379f65d3558685f4a3e45b11386a13c7b4e0fb074ddfc10fa294cca9425\",\"../hanja-source-mapping-u6faf-experiment-2026-10-19/README.md\":\"42a9857610ab9cfeea4a792bdd393182774af118a619cef008577d594e40cf0e\",\"../hanja-source-mapping-u6faf-experiment-2026-10-19/config.json\":\"c4592d7feb5d086d7d6949fd2ac0cc53843c03a2892af3f912871baa07b4c562\",\"../hanja-source-mapping-u6faf-experiment-2026-10-19/serve.py\":\"91a39b35d9832285a213f9fc32b60e33ecca979c1c286fd1637009885f4ce0e1\",\"../hanja-source-mapping-u6faf-experiment-2026-10-19/validation.json\":\"156b5fc17dce0794791df2e66b9e1909d6974c641dc936fddf9daaf58e2a7d23\",\"../hanja-g2-batch10-2026-09-16/serve.py\":\"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47\"}")
PROOF_BYTES=(HERE/EXPECTED_ID['file']).read_bytes()
assert hashlib.sha256(PROOF_BYTES).hexdigest()==EXPECTED_ID['fileSHA256'],'public proof changed'
PUBLIC_PROOF=json.loads(PROOF_BYTES)
NS='{http://www.w3.org/2000/svg}'
CACHE={}
LOCK=threading.Lock()
ENTRIES={CFG['glyph']:{'dictionary':CFG['dictionary'],'strokes':9}}

def guards(config,proof,identity):
    assert type(config) is dict and type(proof) is dict and type(identity) is dict
    assert config==json.loads(CONFIG_BYTES),'config object changed'
    assert identity==EXPECTED_ID and config['identity']==EXPECTED_ID,'exact root/file/SHA identity required'
    assert set(proof)=={'defaults','engineHashes','engineRevision','groups','trace'}
    assert proof==json.loads(PROOF_BYTES),'every original proof field required'
    assert hashlib.sha256((HERE/'config.json').read_bytes()).hexdigest()==CONFIG_SHA==VALIDATION['configSHA256']
    assert hashlib.sha256((HERE/'validation.json').read_bytes()).hexdigest()==VALIDATION_SHA
    assert config['inputSHA256']==INPUT_PINS
    for f,h in INPUT_PINS.items():
        assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==h,'input changed: '+f
    for f,h in VALIDATION['ownFilesSHA256'].items():
        assert hashlib.sha256((HERE/f).read_bytes()).hexdigest()==h,'helper changed: '+f
    selected=json.loads((HERE/config['selectedFull5File']).read_bytes())
    assert proof==selected,'existing selected full5 must match without recombination'
    legacy=json.loads((HERE/config['old162TraceFile']).read_bytes())
    assert legacy['engineRevision']==proof['engineRevision'] and legacy['hashes']==proof['engineHashes']
    assert all(legacy[k]==proof[k] for k in ['defaults','groups','trace']),'old162 selectedK fields changed'
    assert len(proof['groups'])==len(proof['trace'])==11
    assert sum(map(len,proof['trace']))==12
    assert sum(len(g['polygons'])for g in proof['groups'])==25
    for row,group in zip(proof['trace'],proof['groups']):
        assert [p for c in row for p in c['polygons']]==group['polygons']
        assert all(v['off']==0 for p in group['polygons']for v in p)
    strict=config['originalStrictContinuousGroups']
    assert len(strict)==10 and sorted(i for g in strict for i in g)==list(range(11))
    assert config['originalFullDomesticMapping'] is None and config['newProvisionalMapping'] is None
    assert config['knownDomesticEvidence']['observedPens']==[9]
    assert config['knownDomesticEvidence']['pen9Raw']==[4,5]
    for a,b in config['exactSourceAdjacency']:
        assert endpoint(proof['trace'][a][-1])==proof['trace'][b][0]['args'][:2]
    assert config['nativeApproval'] is False and config['runtimeApplied'] is False
    assert config['full9PenCompiler'] is False and config['animation'] is False

def endpoint(call):
    a=call['args']
    start=2 if call['kind']=='cdDrawLine' else 4 if call['kind']=='cdDrawCurve' else 6
    return a[start:start+2]

def source(glyph):
    with LOCK:
        if glyph in CACHE:
            return CACHE[glyph]
        pin = ENTRIES[glyph]['dictionary']
        with urllib.request.urlopen(pin['url'], timeout=20) as response:
            if response.status != 200:
                raise ValueError('Dictionary unavailable')
            raw = response.read(100001)
        if len(raw) != pin['bytes'] or hashlib.sha256(raw).hexdigest() != pin['sha256']:
            raise ValueError('Dictionary pin changed')
        root = ET.fromstring(raw)
        if root.find(NS + 'title').text != glyph:
            raise ValueError('Dictionary title changed')
        groups = list(root.iter(NS + 'g'))
        # Preserve the source's horizontal offset; 潭 uses translate(12, -830).
        if len(groups) != 1 or not re.fullmatch(r'scale\(1,-1\) translate\(-?\d+, -\d+\)', groups[0].get('transform', '')):
            raise ValueError('Unrecognized coordinate transform')
        outlines = {p.get('id'): p for p in root.iter(NS + 'path') if p.get('id')}
        clips = {c.get('id'): next(iter(c)).get('{http://www.w3.org/1999/xlink}href').removeprefix('#') for c in root.iter(NS + 'clipPath')}
        animated = [p for p in root.iter(NS + 'path') if p.get('clip-path')]
        strokes = []
        for index, p in enumerate(animated):
            clip = re.fullmatch(r'url\(#([^)]*)\)', p.get('clip-path')).group(1)
            target = clips[clip]
            delay = int(re.search(r'--d:\s*(\d+)ms', p.get('style')).group(1))
            duration = int(re.search(r'--t:\s*(\d+)ms', p.get('style')).group(1))
            strokes.append({'outline': outlines[target], 'animated': p, 'xmlIndex': index + 1, 'delay': delay, 'duration': duration})
        strokes.sort(key=lambda s: s['delay'])
        if len(strokes) != ENTRIES[glyph]['strokes'] or len({s['outline'].get('id') for s in strokes}) != len(strokes):
            raise ValueError('Incomplete clip mapping')
        if any(i and s['delay'] < strokes[i-1]['delay'] + strokes[i-1]['duration'] for i, s in enumerate(strokes)):
            raise ValueError('Overlapping playback')
        CACHE[glyph] = {'strokes': strokes, 'transform': groups[0].get('transform')}
        return CACHE[glyph]

def domestic_svg(number=None):
    data=source(CFG['glyph'])
    pieces=[]
    for i,row in enumerate(data['strokes'],1):
        color='#222' if number is None else '#b42336' if i==number else '#ddd'
        pieces.append('<path fill="'+color+'" d="'+html.escape(row['outline'].get('d'))+'"/>')
    return '<svg role="img" aria-label="국내9획'+(' 전체' if number is None else ' 현재'+str(number))+'" viewBox="0 0 1024 1024"><g transform="'+html.escape(data['transform'])+'">'+''.join(pieces)+'</g></svg>'

def raw_svg(raw=None):
    assert raw is None or type(raw)is int and 0<=raw<11
    chunks=[]
    for i,group in enumerate(PUBLIC_PROOF['groups']):
        color='#222' if raw is None else '#b42336' if raw==i else '#ddd'
        for j,polygon in enumerate(group['polygons']):
            points=' '.join(str(v['x'])+','+str(v['y'])for v in polygon)
            chunks.append('<polygon data-raw="'+str(i)+'" data-polygon="'+str(j)+'" fill="'+color+'" points="'+points+'"/>')
    if raw is not None:
        row=PUBLIC_PROOF['trace'][raw]
        start=row[0]['args'][:2]
        end=endpoint(row[-1])
        for label,xy,color in [('S',start,'#245ad5'),('E',end,'#168554')]:
            # Review markers only at exact original arguments; never a new glyph trajectory.
            chunks.append('<circle class="review-marker" data-label="'+label+'" cx="'+str(xy[0])+'" cy="'+str(xy[1])+'" r="1.6" fill="none" stroke="'+color+'" stroke-width=".6"><title>'+label+' '+html.escape(str(xy))+'</title></circle>')
    return '<svg role="img" aria-label="원u8fed-k '+('전체' if raw is None else 'raw'+str(raw))+'" viewBox="0 0 200 200">'+''.join(chunks)+'</svg>'

def parse_mapping(query):
    assert set(query)<= {'domestic','raw'},'only domestic/raw query keys'
    for v in query.values():assert len(v)==1 and re.fullmatch(r'[0-9]+',v[0]),'single decimal index required'
    number=int(query.get('domestic',['1'])[0])
    raw=int(query.get('raw',['0'])[0])
    assert 1<=number<=9 and 0<=raw<11,'mapping index out of range'
    return number,raw

def page_html(domestic_markup,number=None,raw=None):
    whole=number is None
    label='국내 전체 9획' if whole else '국내 '+str(number)+'획 (1-based)'
    public='원 u8fed-k 전체 11raw' if whole else '원 raw'+str(raw)+' (0-based), 빨강=선택 원polygon'
    head='<!doctype html><meta charset="utf-8"><title>迭 static source mapping</title><style>body{font:16px system-ui;margin:18px;width:1100px}.pair{display:flex;gap:24px}.pair section{width:520px;flex:none}.pair svg{display:block;width:520px;height:520px;min-width:520px}a,select,button{margin:5px}pre{white-space:pre-wrap}</style>'
    nav='<a href="/whole">전체</a><a href="/mapping?domestic=9&amp;raw=4">기존 국내9 / raw4</a><a href="/mapping?domestic=9&amp;raw=5">기존 국내9 / raw5</a><a href="/mapping">단계별 mapping</a>'
    note='<p>mapping 전용·native/runtime 미승인. 원162의 국내9 Q→B 끝간격[-2,-2] 정적관찰만 보존합니다. 현재K와162의engine/groups/trace/defaults는exact동일하지만전체9mapping은없습니다. 저장된9배열은국내와다른한점辶 root용이며K strict10그룹을전체9로추정하지않습니다. exact raw2/3도국내same-pen자동승인0. compiler·animation·connector·원polygon변경0.</p>'
    body=head+'<h1>迭 · static mapping only</h1>'+nav+note
    if not whole:
        body+='<form action="/mapping" method="get"><label>국내획<select name="domestic">'+''.join('<option value="'+str(i)+'"'+(' selected'if i==number else'')+'>'+str(i)+'</option>'for i in range(1,10))+'</select></label><label>원raw<select name="raw">'+''.join('<option value="'+str(i)+'"'+(' selected'if i==raw else'')+'>'+str(i)+'</option>'for i in range(11))+'</select></label><button>정적대조</button></form>'
    body+='<div class="pair"><section><h2>'+label+'</h2>'+domestic_markup+'</section><section><h2>'+public+'</h2>'+raw_svg(raw)+'</section></div>'
    body+='<p>국내·원본 모두 전체배경 회색/선택polygon 빨강. 원raw의 S(파랑)/E(초록)는 원call args 시작/끝 위치의 검토표시이며 새 glyph path가 아닙니다.</p>'
    if not whole:
        calls=[{'kind':c['kind'],'args':c['args'],'start':c['args'][:2],'end':endpoint(c)}for c in PUBLIC_PROOF['trace'][raw]]
        body+='<pre>'+html.escape(json.dumps({'selectedRaw':raw,'originalCallsOnly':calls},ensure_ascii=False,indent=2))+'</pre>'
    body+='<details><summary>기존 strict10그룹(국내전체배열아님)</summary><pre>'+html.escape(json.dumps(CFG['originalStrictContinuousGroups']))+'</pre></details>'
    return body

def focused_checks():
    guards(CFG,PUBLIC_PROOF,EXPECTED_ID)
    negative=0
    def reject(fn,*args):
        nonlocal negative
        try:fn(*args)
        except (AssertionError,TypeError,KeyError):negative+=1
        else:raise AssertionError('mutated binding accepted')
    for key in EXPECTED_ID:
        changed=dict(EXPECTED_ID);changed[key]='wrong'
        reject(guards,CFG,PUBLIC_PROOF,changed)
    reject(guards,CFG,PUBLIC_PROOF,{**EXPECTED_ID,'extra':True})
    changed=copy.deepcopy(PUBLIC_PROOF);changed['groups'][0]['polygons'][0][0]['x']+=1
    reject(guards,CFG,changed,EXPECTED_ID)
    changed=copy.deepcopy(PUBLIC_PROOF);changed['trace'][0][0]['args'][0]+=1
    reject(guards,CFG,changed,EXPECTED_ID)
    changed=copy.deepcopy(CFG);changed['originalFullDomesticMapping']=[[0]]
    reject(guards,changed,PUBLIC_PROOF,EXPECTED_ID)
    reject(guards,CFG,PUBLIC_PROOF)
    for query in [{'domestic':['0']},{'domestic':['10']},{'raw':['11']},{'raw':['-1']},{'raw':['0','1']},{'progress':['1']}]:
        reject(parse_mapping,query)
    assert parse_mapping({'domestic':['9'],'raw':['4']})==(9,4)
    mock='<svg role="img" viewBox="0 0 1024 1024"></svg>'
    body=page_html(mock,9,4)
    assert body.count('<svg ')==2 and '<script'not in body
    assert 'width:520px;height:520px' in body and 'data-raw="4"'in body
    assert body.count('<polygon ')==25
    assert 'originalCallsOnly'in body and '국내 9획'in body and '원 raw4'in body
    assert CFG['sourceGeometryGenerations']==CFG['sourceCompilerCalls']==CFG['engineRuns']==0
    text=Path(__file__).read_text()
    encoded=text.encode();start=encoded.index(b'def source(glyph):')
    copied=encoded[start:start+2227]
    assert hashlib.sha256(copied).hexdigest()==CFG['dictionaryRAMLoader']['sourceFunctionSHA256']
    return {'passed':True,'positive':1,'negative':negative,'raw':11,'calls':12,'polygons':25,'strictOriginalGroups':10,'domesticMapping':None,'mockPairSVGs':2,'CSSPixels':[520,520],'sourceGeometry':0,'sourceCompiler':0,'engine':0,'HTTP':0,'servers':0,'nativeApproval':False,'runtimeApplied':False}

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--port',type=int,default=0)
    parser.add_argument('--check-only',action='store_true')
    args=parser.parse_args()
    if args.check_only:
        print(json.dumps(focused_checks(),ensure_ascii=False));return
    guards(CFG,PUBLIC_PROOF,EXPECTED_ID)
    # Only the root's explicit future server launch reaches the pinned domestic RAM loader.
    source(CFG['glyph'])
    class Handler(BaseHTTPRequestHandler):
        def log_message(self,*args):pass
        def do_GET(self):
            try:
                guards(CFG,PUBLIC_PROOF,EXPECTED_ID)
                u=urlparse(self.path);q=parse_qs(u.query)
                if u.path in ['/','/whole']:
                    assert not q,'whole route takes no query'
                    out=page_html(domestic_svg()).encode();kind='text/html'
                elif u.path=='/mapping':
                    n,r=parse_mapping(q)
                    out=page_html(domestic_svg(n),n,r).encode();kind='text/html'
                elif u.path=='/checks':
                    assert not q
                    out=json.dumps({'glyph':'迭','raw':11,'polygons':25,'strictOriginalGroups':10,'fullDomesticMapping':None,'sourceCompiles':0,'engineRuns':0,'nativeApproval':False,'runtimeApplied':False}).encode();kind='application/json'
                else:raise AssertionError('only static whole/mapping/checks routes; no compiler/animation')
                self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8')
                self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(out)));self.end_headers();self.wfile.write(out)
            except Exception as error:
                out=str(error).encode();self.send_response(409);self.send_header('Content-Type','text/plain; charset=utf-8');self.end_headers();self.wfile.write(out)
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'glyph':'迭','pid':os.getpid(),'port':server.server_address[1],'raw':11,'polygons':25,'startupSourceCompiles':0,'requestSourceCompiles':0,'engineRuns':0,'privateMediaSaved':False,'mappingOnly':True,'nativeApproval':False,'runtimeApplied':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
if __name__=='__main__':main()
