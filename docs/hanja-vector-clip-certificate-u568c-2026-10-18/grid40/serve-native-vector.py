#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Isolated public derived-clip experiment; proprietary dictionary media RAM-only."""
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,importlib.util,json,os,subprocess
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent.parent

def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def source_guard(expected_config_sha=None):
    config_bytes=(HERE/'native-vector-config.json').read_bytes()
    if expected_config_sha is not None:assert hashlib.sha256(config_bytes).hexdigest()==expected_config_sha,'startup config pin changed; restart required'
    cfg=json.loads(config_bytes)
    for f,h in {**cfg['immutablePins'],**cfg['experimentFilePins']}.items():
        path=(ROOT/f).resolve();assert path.is_relative_to(ROOT),'outside workspace';assert sha(path)==h,'pin changed: '+f
    assert cfg['grid']==40 and cfg['certificateSHA256']==sha(HERE/'certificate.json')
    assert cfg['nativeApproval'] is False and cfg['runtimeApplied'] is False and cfg['experimental'] is True
    proof=json.loads((ROOT/cfg['wholeProofFile']).read_text())
    header=json.loads((ROOT/cfg['engineHeaderFile']).read_text())
    assert sorted(proof)==['defaults','groups','trace'] and len(proof['groups'])==len(proof['trace'])==20
    assert sorted(header)==['defaults','engineHashes','engineRevision','groups','trace'] and len(header['engineHashes'])==8
    for i,calls in enumerate(proof['trace']):assert [p for c in calls for p in c['polygons']]==proof['groups'][i]['polygons']
    analysis=json.loads((ROOT/cfg['boundaryAnalysisFile']).read_text())
    assert analysis['originalCalls']['V']['args']==proof['trace'][13][0]['args']
    assert analysis['originalCalls']['rise']['args']==proof['trace'][14][0]['args']
    return cfg,proof,analysis

def outline(polygons):
    parts=[]
    for polygon in polygons:
        assert all(p['off']==0 for p in polygon)
        area=sum(p['x']*polygon[(i+1)%len(polygon)]['y']-polygon[(i+1)%len(polygon)]['x']*p['y'] for i,p in enumerate(polygon))
        p=[polygon[0],*reversed(polygon[1:])] if area<0 else polygon
        parts.append(' '.join(('M' if i==0 else 'L')+str(v['x']/2)+' '+str(v['y']/2) for i,v in enumerate(p))+' Z')
    return ' '.join(parts)

def external_svg(svg):
    assert svg.startswith('<svg '),'expected inline SVG root'
    if 'xmlns=' in svg.partition('>')[0]:return svg
    return svg.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ',1)

def input_data(cfg,proof,analysis):
    normalized=lambda polygons:[[{**v,'x':v['x']/2,'y':v['y']/2}for v in p]for p in polygons]
    v={**analysis['proposedVIndependentMask'],'outline':outline(proof['groups'][13]['polygons'])}
    q_polygons=normalized(proof['groups'][14]['polygons'])
    q_vertices=[vertex for polygon in q_polygons for vertex in polygon]
    q_bounds=[min(v['x'] for v in q_vertices),min(v['y'] for v in q_vertices),max(v['x'] for v in q_vertices),max(v['y'] for v in q_vertices)]
    q={**analysis['proposedRiseIndependentMask'],'bounds':q_bounds,'outline':outline(proof['groups'][14]['polygons'])}
    return {'domain':normalized(proof['groups'][14]['polygons']),'seed':normalized(proof['groups'][13]['polygons']),'Vmask':v,'Qmask':q,'identity':{'glyph':'嚌','pen':12,'mask':2,'wholeProofFile':cfg['wholeProofFile'],'wholeProofSHA256':cfg['immutablePins'][cfg['wholeProofFile']],'existingBoundary':.4648569065497792,'sourceCompile':0,'engine':0,'nativeApproval':False,'runtimeApplied':False,'approximation':'Certified rational vector mesh; stored IEEE754 mesh-edge scalar, affine sublevel clipping. Pixel/native continuity is not certified.'}}

PAGE="<!doctype html><meta charset=\"utf-8\"><title>嚌861 인증 mesh native 실험</title><style>body{font:15px system-ui;margin:16px;width:1090px}pre{white-space:pre-wrap;overflow-wrap:anywhere}.pair{display:flex;gap:16px}.panel{width:520px;height:520px;position:relative;border:1px solid #ddd}.panel svg,.layer{width:520px;height:520px}.layer{position:absolute;inset:0}.warning{padding:12px;background:#fff0d5}button{margin:5px}img{width:520px;height:520px}</style><h1>嚌861 · 인증 mesh의 affine clip 실험 · grid40 고정</h1><p class=\"warning\">격리 실험입니다. 원861 보류·production 상태는 그대로입니다. 고정된 원 polygon을 인증 mesh의 연속 affine sublevel로 clip합니다. 새 원획 좌표·폭·연결선을 만들지 않습니다. mesh-edge 거리장은 authored 필순·정확한 intrinsic geodesic이 아니며 AA·경계 성장·방향은 아직 native 미승인입니다.</p><button id=\"play\">8초 자연 재생</button><div><button data-boundary=\"-1\">기존 경계 직전</button><button data-boundary=\"0\">기존 경계</button><button data-boundary=\"1\">기존 경계 직후</button><button data-p=\"0\">0%</button><button data-p=\"0.00000001\">epsilon</button><button data-p=\"0.5\">50%</button><button data-p=\"0.95\">95%</button><button data-p=\"0.9999\">99.99%</button><button data-p=\"1\">100%</button></div><input id=\"progress\" aria-label=\"새 rise mask 진행률\" type=\"range\" min=\"0\" max=\"100\" step=\".0001\" value=\"0\"><output id=\"percent\"></output><div class=\"pair\"><section><h2>원형 고정 renderer</h2><div class=\"panel\" id=\"legacy\"></div></section><section><h2>인증 mesh affine clip</h2><div class=\"panel\" id=\"experiment\"></div></section></div><pre id=\"diagnostics\"></pre><p>p0는 빈 새 mask입니다. 기존 완료 V는 원형 별도 레이어입니다. p1도 같은 threshold/clip 규칙이며 unmask fallback이 없습니다. 정점은 rational로 clip한 뒤 SVG 숫자로 표시합니다. 브라우저 AA·공유 edge 경계의 픽셀 결과는 이상적 면적 인증 밖입니다.</p><h2>국내17획의 12획 방향 · RAM 전용</h2><img src=\"./domestic.svg\" alt=\"고정 국내12획 방향\"><h2>인증 바인딩</h2><pre id=\"identity\"></pre><script id=\"expected\" type=\"application/json\">__EXPECTED__</script><script type=\"module\" src=\"./native-vector-viewer.mjs\"></script>"

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    startup_config_sha=sha(HERE/'native-vector-config.json')
    cfg,proof,analysis=source_guard(startup_config_sha)
    if args.check_only:
        print(json.dumps({'sourceGuard':'PASS','immutablePins':len(cfg['immutablePins']),'newFilePins':len(cfg['experimentFilePins']),'meshBuild':0,'fieldBuild':0,'sourceCompile':0,'engine':0,'HTTP':0,'server':0,'nativeApproval':False,'runtimeApplied':False}),flush=True);return
    assert 0<=args.port<=65535
    # 원 engine/source compiler 실행 없이 새 mesh/field만 시작 시 RAM에 생성합니다.
    result=subprocess.run(['node',str(HERE/'native-vector-data.mjs')],cwd=ROOT,stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=60,check=True)
    packet=json.loads(result.stdout)
    binding=packet['binding']
    assert packet['grid']==40
    assert binding['certificateSHA256']==cfg['certificateSHA256']
    assert binding['moduleSHA256']==cfg['immutablePins'][cfg['certificateModuleFile']]
    assert binding['sourceProofSHA256']==cfg['immutablePins'][cfg['wholeProofFile']]
    assert packet['diagnostics']['sourceCompile']==packet['diagnostics']['engine']==0
    expected={**binding,'grid':40}
    public_packet=result.stdout
    public_input=json.dumps(input_data(cfg,proof,analysis)).encode()
    page=PAGE.replace('__EXPECTED__',json.dumps(expected)).encode()
    source_guard(startup_config_sha)
    spec=importlib.util.spec_from_file_location('vector_dictionary_ram',ROOT/cfg['dictionaryRendererFile']);renderer=importlib.util.module_from_spec(spec);spec.loader.exec_module(renderer)
    renderer.ENTRIES={'嚌':{'strokes':17,'dictionary':cfg['dictionary']}};renderer.CACHE={}
    code=(ROOT/cfg['legacyRendererFile']).read_text();legacy=code[code.index('export function renderProgressive('):].encode()
    class Handler(BaseHTTPRequestHandler):
        def log_message(self,*args):pass
        def do_GET(self):
            try:
                source_guard(startup_config_sha);route=urlparse(self.path).path
                if route=='/':body=page;mime='text/html; charset=utf-8'
                elif route=='/native-vector-viewer.mjs':body=(HERE/'native-vector-viewer.mjs').read_bytes();mime='text/javascript; charset=utf-8'
                elif route=='/legacy.mjs':body=legacy;mime='text/javascript; charset=utf-8'
                elif route=='/packet.json':body=public_packet;mime='application/json'
                elif route=='/certificate.json':body=(HERE/'certificate.json').read_bytes();mime='application/json'
                elif route=='/input.json':body=public_input;mime='application/json'
                elif route=='/domestic.svg':body=external_svg(renderer.dictionary_svg('嚌',12,True,'vector-domestic12')).encode();mime='image/svg+xml'
                else:self.send_error(404);return
                self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(body)));self.end_headers();self.wfile.write(body)
            except Exception as e:self.send_error(409,str(e))
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'pid':os.getpid(),'port':server.server_port,'grid':40,'meshBuild':1,'meshCertification':1,'fieldBuild':1,'sourceCompile':0,'engine':0,'requestRebuild':0,'nativeApproval':False,'runtimeApplied':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
if __name__=='__main__':main()
