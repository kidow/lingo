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
CONFIG_SHA="c4592d7feb5d086d7d6949fd2ac0cc53843c03a2892af3f912871baa07b4c562"
CFG=json.loads(CONFIG_BYTES)
VALIDATION_BYTES=(HERE/'validation.json').read_bytes()
VALIDATION_SHA=hashlib.sha256(VALIDATION_BYTES).hexdigest()
VALIDATION=json.loads(VALIDATION_BYTES)
EXPECTED_ID=json.loads("{\"root\":\"u6faf\",\"file\":\"../hanja-goal-glyphwiki-batch904-2026-10-13/engine-whole-u6faf.json\",\"fileSHA256\":\"11b5c2190fc244be637b93c04029d63a6158c1c85b89d682b5766170495e355f\"}")
INPUT_PINS=json.loads("{\"../hanja-goal-glyphwiki-batch904-2026-10-13/NOTICE.md\":\"4b9df5a87400b66003be3e6d83ae97945c5f753ef8834b08b76455230056349d\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/README.md\":\"da480a291ed779fd72b4a72c25d3c8ad2be92b44f5802bf29783336dba68125d\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/blocked-source-contract.mjs\":\"0704ab365dee6fc00ccfbb8ec6734affbf937e7fe15cac889a410edb6b25f204\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/candidate-compile-analysis.json\":\"b52ecd33ad71e8b474b5373bdb5e9a4f6575039c507b418e0f66c5c8992f1694\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/engine-proof.json\":\"11b5c2190fc244be637b93c04029d63a6158c1c85b89d682b5766170495e355f\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/engine-whole-u6faf-k.json\":\"028b52248ef798c67a18daa367827f7f9d203b99266def85175185f35b3cecd4\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/engine-whole-u6faf-ue0100.json\":\"028b52248ef798c67a18daa367827f7f9d203b99266def85175185f35b3cecd4\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/engine-whole-u6faf-ue0101.json\":\"028b52248ef798c67a18daa367827f7f9d203b99266def85175185f35b3cecd4\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/engine-whole-u6faf-ue0102.json\":\"09c56ee1a4695e8ed206eef891b738805dd7a546c9e4fbcc3547a6db1caf193c\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/engine-whole-u6faf.json\":\"11b5c2190fc244be637b93c04029d63a6158c1c85b89d682b5766170495e355f\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/metadata.json\":\"2b866f2f559ffb56e3d1243d2739f68a8f78c5803558afbc97706347c8eb06ef\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/native-server-input-pins.json\":\"e5bb72256b7ea98929a449f513037b680af7f7794df6ef8fcce35b9187db18c6\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/resume.json\":\"08e8b164fa2ea684130b280c685828cd857b235cbdaa9947a3937c86a69e443b\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/review.json\":\"f20f5e9bba7e956ca78959f6463b007776c9c727a2068d897264429397cecb1b\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/serve-native.py\":\"503a866ddb4fba33ee2ffb724ed12c4c7881eae7ac4b52dfe9527aab9e8729ba\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/source-analysis.json\":\"f2af74e169eb6250d19e4dfc8b26ac66879dab3f429e5650f038a5a35e55edde\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/source-join-analysis.json\":\"4d4caecc6693b5db6267059f1b80e3588f51ff7734c55feb78ed45108f3a7e3d\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/sources.json\":\"d68c59d2f9c3e8b440c5e81852854dbd51b615fbc62c17254e990bec0003048c\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/strict-native-server-preflight.json\":\"b568bbe087b353ec6cf07827a5f7cad04261d7de671f355b3ef7d7809e27dee0\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/validation.json\":\"5d36dcd5d199736c99493c1dfb9fc4bc17115a27cf5d4962c5504b227b7efa46\",\"../hanja-goal-glyphwiki-batch904-2026-10-13/verify-source.mjs\":\"4ad10ad05d8ce1b95e40b0d4490c40a788341b18f0e904a43a423fc6447d0bd9\",\"../hanja-g2-batch10-2026-09-16/serve.py\":\"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47\"}")
PROOF_BYTES=(HERE/EXPECTED_ID['file']).read_bytes()
assert hashlib.sha256(PROOF_BYTES).hexdigest()==EXPECTED_ID['fileSHA256'],'public proof changed'
PUBLIC_PROOF=json.loads(PROOF_BYTES)
NS='{http://www.w3.org/2000/svg}'
CACHE={}
LOCK=threading.Lock()
ENTRIES={CFG['glyph']:{'dictionary':CFG['dictionary'],'strokes':16}}

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
    header=json.loads((HERE/config['proofHeaderFile']).read_bytes())
    assert proof==header,'existing selected full5/header must match without recombination'
    assert len(proof['groups'])==len(proof['trace'])==19
    assert sum(map(len,proof['trace']))==19
    assert sum(len(g['polygons'])for g in proof['groups'])==36
    for row,group in zip(proof['trace'],proof['groups']):
        assert [p for c in row for p in c['polygons']]==group['polygons']
        assert all(v['off']==0 for p in group['polygons']for v in p)
    strict=config['originalStrictContinuousGroups']
    assert len(strict)==17 and sorted(i for g in strict for i in g)==list(range(19))
    assert config['originalFullDomesticMapping'] is None and config['newProvisionalMapping'] is None
    assert config['knownDomesticEvidence']['observedPens']==[3]
    assert config['knownDomesticEvidence']['pen3Raw']==[2,3]
    for a,b in config['exactSourceAdjacency']:
        assert endpoint(proof['trace'][a][-1])==proof['trace'][b][0]['args'][:2]
    assert config['nativeApproval'] is False and config['runtimeApplied'] is False
    assert config['full16PenCompiler'] is False and config['animation'] is False

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
    return '<svg role="img" aria-label="국내16획'+(' 전체' if number is None else ' 현재'+str(number))+'" viewBox="0 0 1024 1024"><g transform="'+html.escape(data['transform'])+'">'+''.join(pieces)+'</g></svg>'

def raw_svg(raw=None):
    assert raw is None or type(raw)is int and 0<=raw<19
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
    return '<svg role="img" aria-label="원u6faf '+('전체' if raw is None else 'raw'+str(raw))+'" viewBox="0 0 200 200">'+''.join(chunks)+'</svg>'

def parse_mapping(query):
    assert set(query)<= {'domestic','raw'},'only domestic/raw query keys'
    for v in query.values():assert len(v)==1 and re.fullmatch(r'[0-9]+',v[0]),'single decimal index required'
    number=int(query.get('domestic',['1'])[0])
    raw=int(query.get('raw',['0'])[0])
    assert 1<=number<=16 and 0<=raw<19,'mapping index out of range'
    return number,raw

def page_html(domestic_markup,number=None,raw=None):
    whole=number is None
    label='국내 전체 16획' if whole else '국내 '+str(number)+'획 (1-based)'
    public='원 u6faf 전체 19raw' if whole else '원 raw'+str(raw)+' (0-based), 빨강=선택 원polygon'
    head='<!doctype html><meta charset="utf-8"><title>澯 static source mapping</title><style>body{font:16px system-ui;margin:18px;width:1100px}.pair{display:flex;gap:24px}.pair section{width:520px;flex:none}.pair svg{display:block;width:520px;height:520px;min-width:520px}a,select,button{margin:5px}pre{white-space:pre-wrap}</style>'
    nav='<a href="/whole">전체</a><a href="/mapping?domestic=3&amp;raw=2">기존 국내3 / raw2</a><a href="/mapping?domestic=3&amp;raw=3">기존 국내3 / raw3</a><a href="/mapping">단계별 mapping</a>'
    note='<p>mapping 전용·native/runtime 미승인. 기존 국내방향 관찰은3획뿐입니다. 원 strict17그룹은 정확접점 분석이며 국내16 전체mapping이 아닙니다. exact raw7/8·10/11을 국내same-pen으로 자동승인하지 않습니다. compiler·animation·connector·원polygon변경0.</p>'
    body=head+'<h1>澯 · static mapping only</h1>'+nav+note
    if not whole:
        body+='<form action="/mapping" method="get"><label>국내획<select name="domestic">'+''.join('<option value="'+str(i)+'"'+(' selected'if i==number else'')+'>'+str(i)+'</option>'for i in range(1,17))+'</select></label><label>원raw<select name="raw">'+''.join('<option value="'+str(i)+'"'+(' selected'if i==raw else'')+'>'+str(i)+'</option>'for i in range(19))+'</select></label><button>정적대조</button></form>'
    body+='<div class="pair"><section><h2>'+label+'</h2>'+domestic_markup+'</section><section><h2>'+public+'</h2>'+raw_svg(raw)+'</section></div>'
    body+='<p>국내·원본 모두 전체배경 회색/선택polygon 빨강. 원raw의 S(파랑)/E(초록)는 원call args 시작/끝 위치의 검토표시이며 새 glyph path가 아닙니다.</p>'
    if not whole:
        calls=[{'kind':c['kind'],'args':c['args'],'start':c['args'][:2],'end':endpoint(c)}for c in PUBLIC_PROOF['trace'][raw]]
        body+='<pre>'+html.escape(json.dumps({'selectedRaw':raw,'originalCallsOnly':calls},ensure_ascii=False,indent=2))+'</pre>'
    body+='<details><summary>기존 strict17그룹(국내전체배열아님)</summary><pre>'+html.escape(json.dumps(CFG['originalStrictContinuousGroups']))+'</pre></details>'
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
    for query in [{'domestic':['0']},{'domestic':['17']},{'raw':['19']},{'raw':['-1']},{'raw':['0','1']},{'progress':['1']}]:
        reject(parse_mapping,query)
    assert parse_mapping({'domestic':['3'],'raw':['2']})==(3,2)
    mock='<svg role="img" viewBox="0 0 1024 1024"></svg>'
    body=page_html(mock,3,2)
    assert body.count('<svg ')==2 and '<script'not in body
    assert 'width:520px;height:520px' in body and 'data-raw="2"'in body
    assert body.count('<polygon ')==36
    assert 'originalCallsOnly'in body and '국내 3획'in body and '원 raw2'in body
    assert CFG['sourceGeometryGenerations']==CFG['sourceCompilerCalls']==CFG['engineRuns']==0
    text=Path(__file__).read_text()
    encoded=text.encode();start=encoded.index(b'def source(glyph):')
    copied=encoded[start:start+2227]
    assert hashlib.sha256(copied).hexdigest()==CFG['dictionaryRAMLoader']['sourceFunctionSHA256']
    return {'passed':True,'positive':1,'negative':negative,'raw':19,'calls':19,'polygons':36,'strictOriginalGroups':17,'domesticMapping':None,'mockPairSVGs':2,'CSSPixels':[520,520],'sourceGeometry':0,'sourceCompiler':0,'engine':0,'HTTP':0,'servers':0,'nativeApproval':False,'runtimeApplied':False}

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
                    out=json.dumps({'glyph':'澯','raw':19,'polygons':36,'strictOriginalGroups':17,'fullDomesticMapping':None,'sourceCompiles':0,'engineRuns':0,'nativeApproval':False,'runtimeApplied':False}).encode();kind='application/json'
                else:raise AssertionError('only static whole/mapping/checks routes; no compiler/animation')
                self.send_response(200);self.send_header('Content-Type',kind+'; charset=utf-8')
                self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(out)));self.end_headers();self.wfile.write(out)
            except Exception as error:
                out=str(error).encode();self.send_response(409);self.send_header('Content-Type','text/plain; charset=utf-8');self.end_headers();self.wfile.write(out)
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'glyph':'澯','pid':os.getpid(),'port':server.server_address[1],'raw':19,'polygons':36,'startupSourceCompiles':0,'requestSourceCompiles':0,'engineRuns':0,'privateMediaSaved':False,'mappingOnly':True,'nativeApproval':False,'runtimeApplied':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
if __name__=='__main__':main()
