# Source-only whole comparison. No compiler, generated path, native approval or runtime registration.
import sys
sys.dont_write_bytecode = True
import json, os, hashlib, html, importlib.util
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs
HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
PINS = {"candidate-compile-analysis.json":"aadb03e00f994a59ffdb1766da722d6efd24b097cd800ec255d306a1eac9afc1","engine-proof.json":"9b2aac1b87f1e5a1d0a58cc2ecde53f267ccadce42cfbfff1cd21d1778011d39","engine-whole-u7e10-ue0100.json":"9b2aac1b87f1e5a1d0a58cc2ecde53f267ccadce42cfbfff1cd21d1778011d39","engine-whole-u7e10.json":"9b2aac1b87f1e5a1d0a58cc2ecde53f267ccadce42cfbfff1cd21d1778011d39","metadata.json":"0296e10a9b5f689f365d0fd9a98b5e1f090e8e6c5a8cf2ac5418fbeb631ae836","native-server-preflight-hold.json":"425a5d101605b51e1b4d67de3ce834fd58c18ce71aa1a812e1606109b7812b96","source-analysis.json":"3c981c1ef7f656dc63b280ae97ea8cb177de1309340d306f081bec139acf8ecf","source-join-analysis.json":"3cc90737e1051f51c6b0035e9796c9ca09e58867b3d865919076afb5cab1bd6f","source-preservation-audit.json":"339a85f3585ba8d232f90c318fb8b964b61b9fe858d3b96f363c8de31e802009","sources.json":"0a6a9f3af9a3ead7cddd5cf757b6253dd66d1e0898e234e29d6a0a4aff7dc7cf","verify-source.mjs":"44c3bf9b04b68c99ff5b12dcc740e085e723dc985c30d2d1a5c34ab1c3387201"}
NAMES = ["u7e10", "u7e10-ue0100"]
def check_inputs():
    for name, pin in PINS.items():
        assert hashlib.sha256((HERE/name).read_bytes()).hexdigest() == pin, "Frozen source input changed: " + name
    evidence = json.loads((HERE/"native-server-preflight-hold.json").read_text())
    assert evidence["sourceVerified"]["sourcePassed"] is True
    assert evidence["sourceVerified"]["engineFiles"] == 8
    assert evidence["selectedWhole"] is None and evidence["compilerCandidate"] is None
    header = json.loads((HERE/"engine-proof.json").read_text())
    assert len(header["engineHashes"]) == 8
    for name in NAMES:
        proof = json.loads((HERE/("engine-whole-"+name+".json")).read_text())
        assert proof["engineRevision"] == header["engineRevision"]
        assert proof["engineHashes"] == header["engineHashes"] and proof["defaults"] == header["defaults"]
        assert len(proof["groups"]) == 22
        assert sum(len(g["polygons"]) for g in proof["groups"]) == 53
check_inputs()
meta = json.loads((HERE/"metadata.json").read_text())
spec = importlib.util.spec_from_file_location("b936_static_ram_renderer", ROOT/"docs/hanja-special2-alternatives-2026-09-21/serve.py")
r = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r)
r.base.renderer.ENTRIES["縐"] = {"strokes":16,"dictionary":meta["dictionary"]}
def original_svg(name):
    assert name in NAMES
    proof = json.loads((HERE/("engine-whole-"+name+".json")).read_text())
    polygons = [poly for group in proof["groups"] for poly in group["polygons"]]
    assert len(polygons) == 53 and all(v["off"] == 0 for poly in polygons for v in poly)
    return '<svg viewBox="0 0 200 200" aria-label="'+html.escape(name)+'"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v["x"])+','+str(v["y"]) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
def checks():
    return {"batch":936,"glyph":"縐","wholeNames":NAMES,"rawPerWhole":22,"drawPerWhole":26,"originalPolygonsPerWhole":53,"minimumOriginalPens":18,"domestic":16,"blocked":True,"reason":"minimum-original-pens18-exceeds-domestic16","compiledPens":0,"compiledMasks":0,"frames":0,"replay":0,"compilerGuardCases":None,"sourceActualPassedReused":True,"engineFiles":8,"sourceInputPinsVerified":len(PINS),"nativeApproval":False,"runtimeApplied":False,"privateMediaSaved":False}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args): pass
    def do_GET(self):
        try:
            check_inputs()
            route=urlparse(self.path).path
            q=parse_qs(urlparse(self.path).query)
            if route == "/checks" or q.get("view") == ["checks"]:
                body=json.dumps(checks(),ensure_ascii=False).encode(); mime="application/json"
            elif route in ["/","/whole"]:
                body=('<!doctype html><meta charset="utf-8"><title>縐 fixed whole source-only</title><style>body{font:16px system-ui;margin:20px;width:1112px}.whole{display:grid;grid-template-columns:556px 556px}svg{width:420px;height:420px}</style><h1>縐 · 국내16 / 원본최소18 · 보류</h1><p>두 고정 원본은 동일 geometry이며 전체 자형 비교만 제공합니다. 필순·native 승인은 미검토입니다.</p>'+r.base.full_dictionary("縐")+'<div class="whole">'+''.join('<section><h2>'+name+'</h2>'+original_svg(name)+'</section>' for name in NAMES)+'</div><p>사전 graphics RAM-only · 원본 polygon53개씩 그대로 표시 · compiler/frames/replay 없음</p>').encode();mime="text/html; charset=utf-8"
            elif route in ["/pairs","/progressive"]:
                body=('<!doctype html><meta charset="utf-8"><title>縐 source blocked</title><h1>縐 · 후보 보류</h1><p>minimum-original-pens18-exceeds-domestic16</p><p>compiledPens0 / compiledMasks0 / frames0 / replay0. Original whole comparison only.</p>').encode();mime="text/html; charset=utf-8"
            else:
                self.send_error(404);return
            self.send_response(200);self.send_header("Content-Type",mime);self.send_header("Cache-Control","no-store");self.end_headers();self.wfile.write(body)
        except Exception as exc: self.send_error(500,str(exc))
if __name__ == "__main__":
    server=ThreadingHTTPServer(("127.0.0.1",0),Handler)
    print(json.dumps({"port":server.server_address[1],"pid":os.getpid(),**checks()}),flush=True)
    server.serve_forever()

