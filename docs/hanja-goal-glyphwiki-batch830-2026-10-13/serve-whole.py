import sys
sys.dont_write_bytecode=True
import json,importlib.util,os,html,hashlib
from pathlib import Path
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
from urllib.parse import parse_qs,urlparse
HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('a830_progressive',HERE/'serve-progressive.py')
p=importlib.util.module_from_spec(spec);spec.loader.exec_module(p)
names=json.loads((HERE/'sources.json').read_text())['wholeNames']
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            q=parse_qs(urlparse(self.path).query);root=q.get('id',['u7cbb'])[0]
            compiled=p.load_candidate(root)
            idfile=compiled['sourceProofFile']
            raw=(HERE/idfile).read_bytes()
            assert hashlib.sha256(raw).hexdigest()==compiled['sourceWholeFileSHA256']
            proof=json.loads(raw);assert proof['sourceRoot']==root and proof['sourceProofFile']==idfile
            groups=json.loads((HERE/'source-join-analysis.json').read_text())['groupCandidates']
            indices=next(g['numericPathCoverGroups'] for g in groups if g['root']==root)
            pairs=[tuple(map(int,v.split(':'))) for v in q.get('pairs',[''])[0].split(',') if v]
            def candidate(end=None):
                rawids=indices if end is None else indices[:end]
                polygons=[polygon for rows in rawids for i in rows for polygon in proof['groups'][i]['polygons']]
                return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in polygon)+'"/>' for polygon in polygons)+'</g></svg>'
            parts=['<!doctype html><meta charset="utf-8"><title>粻 whole · 미검토</title><style>body{font:16px system-ui;width:1100px;margin:12px}.pair{display:flex}svg{width:420px;height:420px}a{margin:8px}</style><h1>粻 · '+html.escape(root)+' · 원본 14획 후보 / 국내 미검토</h1><p>원본 raw11 끝(109,169) → raw12 시작(88,182), gap[-21,13]. 연결을 추가하지 않았습니다. 후보7획과12획의 국내 대응을 별도로 검토하세요.</p>']
            parts+=['<a href="?id='+n+'">'+n+'</a>' for n in names]
            parts+=['<a href="?id='+root+'&pairs=7:7,12:12">長 gap 대응 7·12획</a>','<a href="?id='+root+'&pairs='+','.join(str(i)+':'+str(i) for i in range(1,15))+'">14획 대응</a>']
            if pairs:
                for left,right in pairs:
                    assert 1<=left<=14 and 1<=right<=14
                    parts+=['<h2>국내 '+str(left)+' / 후보 '+str(right)+'</h2><div class="pair">'+p.r.base.renderer.dictionary_svg('粻',left,True,root+str(left))+candidate(right)+'</div>']
            else:parts+=['<div class="pair">'+p.r.base.full_dictionary('粻')+candidate()+'</div>']
            parts+=['<p>매 요청 원본 SHA·명시 header·compiler identity 확인. 국내 SVG RAM-only; native 승인 없음.</p>']
            body=''.join(parts).encode()
            self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as e:self.send_error(500,str(e))
if __name__=='__main__':
    server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
    print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(names),'nativeApproved':False}),flush=True)
    server.serve_forever()
