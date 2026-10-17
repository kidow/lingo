#!/usr/bin/env python3
"""Isolated public derived-clip experiment; proprietary dictionary media RAM-only."""
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,importlib.util,json,os
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent

def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def source_guard(expected_config_sha=None):
    config_bytes=(HERE/'config.json').read_bytes()
    if expected_config_sha is not None:assert hashlib.sha256(config_bytes).hexdigest()==expected_config_sha,'startup config pin changed; restart required'
    cfg=json.loads(config_bytes)
    for f,h in {**cfg['immutablePins'],**cfg['experimentFilePins']}.items():
        path=(ROOT/f).resolve();assert path.is_relative_to(ROOT),'outside workspace';assert sha(path)==h,'pin changed: '+f
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
    return {'domain':normalized(proof['groups'][14]['polygons']),'seed':normalized(proof['groups'][13]['polygons']),'Vmask':v,'Qmask':q,'identity':{'glyph':'嚌','pen':12,'mask':2,'wholeProofFile':cfg['wholeProofFile'],'wholeProofSHA256':cfg['immutablePins'][cfg['wholeProofFile']],'existingBoundary':.4648569065497792,'sourceCompile':0,'engine':0,'nativeApproval':False,'runtimeApplied':False,'approximation':'Raster cell-centre domain, conservative whole-cell convex seed, checked adjacency segments. Not vector coverage proof.'}}

PAGE='''<!doctype html><meta charset="utf-8"><title>嚌861 derived-clip experiment</title><style>body{font:15px system-ui;margin:16px;width:1090px}pre{white-space:pre-wrap;overflow-wrap:anywhere}.pair{display:flex;gap:16px}.panel{width:520px;height:520px;position:relative;border:1px solid #ddd}.panel svg,.layer{width:520px;height:520px}.layer{position:absolute;inset:0}.warning{padding:12px;background:#fff0d5}button,select{margin:5px}img{width:520px;height:520px}</style><h1>嚌861 · isolated raster geodesic clip experiment</h1><p class="warning">EXPERIMENT ONLY. Original861 remains HOLD. No new coordinates, connectors, path, width or source polygons are authored. A new derived reveal meaning is being tested; it does not establish Korean direction/order. Raster sampled-cell coverage is NOT complete vector coverage.</p><label>Raster resolution <select id="resolution"><option>200</option><option>400</option></select></label><button id="play">8-second comparison replay</button><div><button data-boundary="-1">old boundary before</button><button data-boundary="0">old boundary at</button><button data-boundary="1">old boundary after</button><button data-p="0">rise0%</button><button data-p="0.00000001">rise epsilon</button><button data-p="0.5">50%</button><button data-p="0.95">95%</button><button data-p="0.9999">99.99%</button><button data-p="1">100%</button></div><input id="progress" aria-label="rise mask progress" type="range" min="0" max="100" step=".0001" value="0"><output id="percent"></output><div class="pair"><section><h2>Existing fixed renderer</h2><div class="panel" id="legacy"></div></section><section><h2>Experimental derived clip</h2><div class="panel" id="experiment"></div></section></div><h2>Grid reachability / preparation time</h2><pre id="diagnostics"></pre><h2>Current sampled-cell coverage / mask paint time</h2><pre id="coverage"></pre><p>p=0 mask is empty. p=1 uses the same distance threshold; no unmask or arbitrary fill fallback. Unreachable components are rejected. Entire seed cells must be inside the completed convex V. Pixel footprints, floating intersections, AA and subpixel topology still limit this experiment.</p><h2>Domestic17 pen12 direction, RAM-only</h2><img src="./domestic.svg" alt="Pinned domestic pen12 direction"><h2>Fixed public identity</h2><pre id="identity"></pre><script type="module" src="./viewer.js"></script>'''

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    startup_config_sha=sha(HERE/'config.json')
    cfg,proof,analysis=source_guard(startup_config_sha)
    if args.check_only:
        print(json.dumps({'sourceGuard':'PASS','immutablePins':len(cfg['immutablePins']),'newFilePins':len(cfg['experimentFilePins']),'sourceCompile':0,'engine':0,'HTTP':0,'server':0,'nativeApproval':False,'runtimeApplied':False}),flush=True);return
    assert 0<=args.port<=65535
    spec=importlib.util.spec_from_file_location('geodesic_dictionary_ram',ROOT/cfg['dictionaryRendererFile']);renderer=importlib.util.module_from_spec(spec);spec.loader.exec_module(renderer)
    renderer.ENTRIES={'嚌':{'strokes':17,'dictionary':cfg['dictionary']}};renderer.CACHE={}
    public_input=json.dumps(input_data(cfg,proof,analysis)).encode()
    code=(ROOT/cfg['legacyRendererFile']).read_text();legacy=code[code.index('export function renderProgressive('):].encode()
    class Handler(BaseHTTPRequestHandler):
        def log_message(self,*args):pass
        def do_GET(self):
            try:
                source_guard(startup_config_sha);route=urlparse(self.path).path
                if route=='/':body=PAGE.encode();mime='text/html; charset=utf-8'
                elif route in ['/viewer.js','/geodesic-field.mjs']:body=(HERE/route[1:]).read_bytes();mime='text/javascript; charset=utf-8'
                elif route=='/legacy.mjs':body=legacy;mime='text/javascript; charset=utf-8'
                elif route=='/input.json':body=public_input;mime='application/json'
                elif route=='/domestic.svg':body=external_svg(renderer.dictionary_svg('嚌',12,True,'geo-domestic12')).encode();mime='image/svg+xml'
                else:self.send_error(404);return
                self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(body)));self.end_headers();self.wfile.write(body)
            except Exception as e:self.send_error(409,str(e))
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'pid':os.getpid(),'port':server.server_port,'sourceCompile':0,'engine':0,'nativeApproval':False,'runtimeApplied':False}),flush=True)
    try:server.serve_forever()
    finally:server.server_close()
if __name__=='__main__':main()
