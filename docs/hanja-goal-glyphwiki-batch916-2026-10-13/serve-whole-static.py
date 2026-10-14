# Original-source static review only: no compiler, invented join, native approval or runtime registration.
import sys
sys.dont_write_bytecode = True
import json, os, html, hashlib, importlib.util
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"candidate-compile-analysis.json":"3d3494faebf0951ef1cef667c0efdb014fd22c7d6b2eb79c6ebf233fe3ffbac7","engine-proof.json":"90785abdd737ba3f460b6cf47cc8caf2a1762458a7579a72e3a12c7915f7ff3e","engine-whole-u9044-g.json":"aed6a1bc33a801ece8446e391e58ee5c7120f37ebe505bccf3340fe485975db8","engine-whole-u9044-ue0100.json":"9a3fcaa01e94211fc9059fa4dc920a9c99f72527be37b3796917019b42c05fe7","engine-whole-u9044-ue0101.json":"9a3fcaa01e94211fc9059fa4dc920a9c99f72527be37b3796917019b42c05fe7","engine-whole-u9044-ue0102.json":"0ff48efc0c3f870089aa7c430714b018595bef67b3ee00827470f3a4625c5923","engine-whole-u9044-var-001.json":"500e0e944b1295b1509c4da572234b0e9ec43b1a7932ccd5be49be0d1ada9aa4","engine-whole-u9044.json":"90785abdd737ba3f460b6cf47cc8caf2a1762458a7579a72e3a12c7915f7ff3e","metadata.json":"f2ebf7b21a98ab56bc2acc145eb7e283be867f172ab18382d7bf811d4038d6a6","native-server-preflight-hold.json":"4f8bf18de34fca955cac18447339e3bacf627f595f59c4d476dba1819736095d","source-analysis.json":"d1c6fb1d7fc09e6fa878b09f4c557dcb0f3c55f3aa32f47f4fce62f62428e6fa","source-join-analysis.json":"80a7347cab2fcac219c01cc65f7a1e7ed2500862b0d2fb5203fa5e3bcda1d303","sources.json":"a6b6abe81c46bf276cbcc3d75b66bbf4184cd95737bae831caccb5c514f6e79e","verify-source.mjs":"d4dd09382180a64aa9038d686d858eda73302e8bcbdb168f06363d78a7b180cd"}
NAMES=["u9044","u9044-g","u9044-ue0100","u9044-ue0101","u9044-ue0102","u9044-var-001"]
FACTS=json.loads("{\"u9044\":{\"raw\":17,\"minimum\":14,\"gap\":{\"from\":4,\"to\":5,\"end\":[55,154],\"start\":[53,152],\"delta\":[-2,-2],\"exact\":false,\"joined\":false}},\"u9044-g\":{\"raw\":16,\"minimum\":13,\"gap\":{\"from\":3,\"to\":4,\"end\":[52,151],\"start\":[50,149],\"delta\":[-2,-2],\"exact\":false,\"joined\":false}},\"u9044-ue0100\":{\"raw\":17,\"minimum\":14,\"gap\":{\"from\":4,\"to\":5,\"end\":[55,154],\"start\":[53,152],\"delta\":[-2,-2],\"exact\":false,\"joined\":false}},\"u9044-ue0101\":{\"raw\":17,\"minimum\":14,\"gap\":{\"from\":4,\"to\":5,\"end\":[55,154],\"start\":[53,152],\"delta\":[-2,-2],\"exact\":false,\"joined\":false}},\"u9044-ue0102\":{\"raw\":16,\"minimum\":13,\"gap\":{\"from\":3,\"to\":4,\"end\":[55,151],\"start\":[53,149],\"delta\":[-2,-2],\"exact\":false,\"joined\":false}},\"u9044-var-001\":{\"raw\":16,\"minimum\":13,\"gap\":{\"from\":3,\"to\":4,\"end\":[55,151],\"start\":[53,149],\"delta\":[-2,-2],\"exact\":false,\"joined\":false}}}")
def endpoint(call):
    args=call["args"];kind=call["kind"]
    return args[2:4] if kind=="cdDrawLine" else args[4:6] if kind=="cdDrawCurve" else args[6:8]
def check_inputs():
    for filename,pin in PINS.items():
        assert hashlib.sha256((HERE/filename).read_bytes()).hexdigest()==pin,"Frozen source input changed: "+filename
    evidence=json.loads((HERE/"native-server-preflight-hold.json").read_text())
    assert evidence["sourceVerified"]["sourcePassed"] is True and evidence["sourceVerified"]["engineFiles"]==8
    assert evidence["compilerCandidate"] is None and evidence["selectedWhole"] is None
    header=json.loads((HERE/"engine-proof.json").read_text())
    assert sorted(header)==["defaults","engineHashes","engineRevision","groups","trace"] and len(header["engineHashes"])==8
    for name in NAMES:
        proof=json.loads((HERE/("engine-whole-"+name+".json")).read_text())
        assert sorted(proof)==["defaults","engineHashes","engineRevision","groups","trace"]
        assert proof["engineRevision"]==header["engineRevision"] and proof["engineHashes"]==header["engineHashes"] and proof["defaults"]==header["defaults"]
        assert len(proof["groups"])==FACTS[name]["raw"]
        assert [list(poly for call in row for poly in call["polygons"]) for row in proof["trace"]]==[g["polygons"] for g in proof["groups"]]
        gap=FACTS[name]["gap"];end=endpoint(proof["trace"][gap["from"]][-1]);start=proof["trace"][gap["to"]][0]["args"][:2]
        assert end==gap["end"] and start==gap["start"] and [start[i]-end[i] for i in range(2)]==[-2,-2]
check_inputs()
meta=json.loads((HERE/"metadata.json").read_text())
spec=importlib.util.spec_from_file_location("b916_static_ram_renderer",ROOT/"docs/hanja-special2-alternatives-2026-09-21/serve.py")
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES["遄"]={"strokes":13,"dictionary":meta["dictionary"]}
def original_svg(name,raws=None,colors=None):
    assert name in NAMES
    proof=json.loads((HERE/("engine-whole-"+name+".json")).read_text())
    indices=list(range(len(proof["groups"]))) if raws is None else raws
    parts=[]
    for position,index in enumerate(indices):
        assert 0<=index<len(proof["groups"])
        fill=colors[position%len(colors)] if colors else "#222"
        polygons=proof["groups"][index]["polygons"]
        assert all(v["off"]==0 for polygon in polygons for v in polygon)
        parts.extend('<polygon fill="'+fill+'" points="'+' '.join(str(v["x"])+','+str(v["y"]) for v in polygon)+'"/>' for polygon in polygons)
    return '<svg viewBox="0 0 200 200" aria-label="'+html.escape(name)+'">'+''.join(parts)+'</svg>'
def checks():
    return {"batch":916,"glyph":"遄","wholeNames":NAMES,"wholeFacts":FACTS,"sourceActualPassedReused":True,"engineFiles":8,"sourceInputPinsVerified":len(PINS),"selectedWhole":None,"compilerCandidate":None,"compilerPresent":False,"compiledPens":0,"compiledMasks":0,"frames":0,"replay":0,"nativeApproval":False,"runtimeApplied":False,"privateMediaSaved":False}
def page(body):
    return '<!doctype html><meta charset="utf-8"><title>遄 static original review</title><style>body{font:16px system-ui;margin:20px;width:1112px}a{margin:6px}.grid{display:grid;grid-template-columns:556px 556px}.pair{display:flex;gap:24px}svg{width:480px;height:480px}.grid svg{width:420px;height:420px}</style><nav><a href="/whole">원본 전체6종</a>'+''.join('<a href="/whole?root='+n+'">'+n+'</a>' for n in NAMES)+'</nav>'+body
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            check_inputs();u=urlparse(self.path);q=parse_qs(u.query);root=q.get("root",q.get("id",["u9044"]))[0]
            assert root in NAMES,"Unsupported fixed original whole"
            if u.path=="/checks" or q.get("view")==["checks"]:
                body=json.dumps(checks(),ensure_ascii=False).encode();mime="application/json"
            elif u.path in ["/","/whole"]:
                variants=[root] if "root" in q or "id" in q else NAMES
                body=page('<h1>遄 · 국내13 / 원본 whole6 · native 미검토</h1><p>기본·VS0·VS1 최소14. G·VS2·var001 숫자13은 one-dot 자형·국내 경계 미검토. 모든 원본 Q/B 접속 delta[-2,-2] 유지.</p>'+r.base.full_dictionary("遄")+'<div class="grid">'+''.join('<section><h2>'+n+' · 원본 최소'+str(FACTS[n]["minimum"])+'</h2>'+original_svg(n)+'</section>' for n in variants)+'</div><p>원본 전체 polygon만 표시 · private 사전 RAM-only · compiler 비활성</p>').encode();mime="text/html; charset=utf-8"
            elif u.path in ["/pairs","/joint"]:
                domestic=int(q.get("domestic",["13"])[0]);assert 1<=domestic<=13
                proof=json.loads((HERE/("engine-whole-"+root+".json")).read_text())
                if u.path=="/pairs":
                    raw=int(q.get("raw",["1"])[0]);assert 1<=raw<=len(proof["groups"])
                    indices=list(range(raw)) if q.get("cumulative",["0"])[0]=="1" else [raw-1]
                    info='<h1>遄 · 국내'+str(domestic)+' / 원본 raw'+str(raw)+'(1-based) · '+root+'</h1><p>raw는 compiled pen이나 국내 순서가 아닙니다.</p>'
                    svg=original_svg(root,indices)
                else:
                    gap=FACTS[root]["gap"];indices=[gap["from"],gap["to"]]
                    info='<h1>遄 · '+root+' · Q/B 원본 접속 비교</h1><p>raw0-based '+str(indices)+' · gap '+html.escape(str(gap["delta"]))+' · 앞Q endpoint '+html.escape(str(gap["end"]))+' / 뒤B start '+html.escape(str(gap["start"]))+' · 보간·connector 없음</p>'
                    svg=original_svg(root,indices,["#2867aa","#ab503f"])
                body=page(info+'<div class="pair">'+r.base.renderer.dictionary_svg("遄",domestic,True,"domestic"+str(domestic))+svg+'</div><p>원본 다각형은 그대로 표시하며 one-pen 결합을 승인하지 않습니다. native 미검토, frames0/replay0.</p>').encode();mime="text/html; charset=utf-8"
            elif u.path=="/progressive":
                body=page('<h1>遄 · source candidate 보류</h1><p>compiledPens0 / compiledMasks0 / frames0 / replay0. No compiler is created. Whole form and original disconnected Q/B boundary require review.</p>').encode();mime="text/html; charset=utf-8"
            else:self.send_error(404);return
            self.send_response(200);self.send_header("Content-Type",mime);self.send_header("Cache-Control","no-store");self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(409,str(exc))
if __name__=="__main__":
    server=ThreadingHTTPServer(("127.0.0.1",0),Handler)
    print(json.dumps({"port":server.server_address[1],"pid":os.getpid(),**checks()}),flush=True)
    server.serve_forever()

