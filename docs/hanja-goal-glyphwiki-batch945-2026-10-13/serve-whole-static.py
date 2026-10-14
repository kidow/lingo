# Source-only fixed whole comparison. Missing variants remain null; existing compiler is not activated.
import sys
sys.dont_write_bytecode = True
import json, os, hashlib, html, importlib.util
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs
HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
PINS = {"candidate-compile-analysis.json":"7891de6ef7c16b18f74ce88b01d6a6041c1aa34b56629aa6d248c74651be8d66","engine-proof.json":"eb088456611ca9e72a68d109a6c042953ed712a4a0493f6fe8b3aa6155306764","engine-whole-u5bd8-itaiji-001.json":"4a799ec861c9be4872954cdba9d0e1c2a7b28d94e43be7399f6a2a803e9f2f2c","engine-whole-u5bd8-ue0100.json":"744423f5dbf1535d69577f25ba5e0259bfa1f217c364fbfd89288c103af95346","engine-whole-u5bd8-ufe00.json":"c52b510ed762a9b1f3c2f18eb504f619196ec59f1fc2acd8954840ea676a39b0","engine-whole-u5bd8.json":"134db921bc3b0fa327e103cf8b8ef7859400c102e12236bbe1d9430fcee558d2","metadata.json":"aef184b3c488d9c34cedb81f1348d703fd98a216ccb398289ef8c39622c9c44c","native-server-preflight-hold.json":"772bc7ea403726314335f54bc397b596b2402d4281ac69c34685f4dc6f361959","progressive.mjs":"f654d2e6422fc66d54a06e7c434b9c8bf7eca523742072a7a329bc8839c66376","source-analysis.json":"ac365b5f9b4d85fe5f86a6634b54729aeda460581b86f23a7429b1673fb3f92e","source-join-analysis.json":"428e92ed1e470e9d31b2e8b65b87a11fc8f84f8e7d8c30886c04e95c73a786f9","sources.json":"7423c53527af04f8f8a6adac54a1d2610e9c6d02358f1503a679c9f911916688","verify-source.mjs":"1b1726de87ba95260f499ecbb59a3c9841685f34e4fd233f3f5b3ca8502d8538"}
WHOLE = "u5bd8-itaiji-001"
MISSING_ROOTS = ["u5bd8", "u5bd8-ue0100", "u5bd8-ufe00"]
def check_inputs():
    for name, pin in PINS.items():
        assert hashlib.sha256((HERE/name).read_bytes()).hexdigest() == pin, "Frozen source input changed: " + name
    hold = json.loads((HERE/"native-server-preflight-hold.json").read_text())
    evidence = next(v for v in hold["sourceVerified"]["results"] if v.get("glyph") == "寘")
    assert evidence["sourcePassed"] is True and evidence["engineFiles"] == 8
    assert hold["selectedWhole"] is None and hold["compilerCandidate"] is None
    assert hold["sourceMissing"] is True and hold["wholeEligibilityKnown"] is False
    header = json.loads((HERE/"engine-proof.json").read_text())
    assert sorted(header) == ["defaults","engineHashes","engineRevision","groups","missing","root","status","trace"]
    assert header["missing"] == ["u76ee-j"]
    assert header["groups"] is None and header["trace"] is None and header["defaults"] is None
    assert len(header["engineHashes"]) == 8
    proof = json.loads((HERE/("engine-whole-"+WHOLE+".json")).read_text())
    assert sorted(proof) == ["defaults","groups","trace"]
    assert len(proof["groups"]) == 15 and sum(len(g["polygons"]) for g in proof["groups"]) == 25
    for row, group in zip(proof["trace"],proof["groups"]):
        assert [poly for call in row for poly in call["polygons"]] == group["polygons"]
    for name in MISSING_ROOTS:
        blocked = json.loads((HERE/("engine-whole-"+name+".json")).read_text())
        assert blocked["missing"] == ["u76ee-j"]
        assert blocked["groups"] is None and blocked["trace"] is None and blocked["defaults"] is None
check_inputs()
meta = json.loads((HERE/"metadata.json").read_text())
spec = importlib.util.spec_from_file_location("b945_static_ram_renderer", ROOT/"docs/hanja-special2-alternatives-2026-09-21/serve.py")
r = importlib.util.module_from_spec(spec); spec.loader.exec_module(r)
r.base.renderer.ENTRIES["寘"] = {"strokes":13,"dictionary":meta["dictionary"]}
def original_svg():
    proof = json.loads((HERE/("engine-whole-"+WHOLE+".json")).read_text())
    polygons = [poly for group in proof["groups"] for poly in group["polygons"]]
    assert len(polygons) == 25 and all(v["off"] == 0 for poly in polygons for v in poly)
    return '<svg viewBox="0 0 200 200" aria-label="'+WHOLE+'"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v["x"])+','+str(v["y"]) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
def checks():
    return {"batch":945,"glyph":"寘","renderableWholeRoots":[WHOLE],"blockedWholeRoots":[{"root":n,"missing":["u76ee-j"],"geometry":None,"trace":None,"defaults":None} for n in MISSING_ROOTS],"raw":15,"draw":15,"originalPolygons":25,"domestic":13,"blocked":True,"reason":"missing-fixed-source-and-itaiji-whole-attribution-unverified","wholeEligibilityKnown":False,"selectedWhole":None,"compilerCandidate":None,"compiledPens":0,"compiledMasks":0,"frames":0,"replay":0,"compilerGuardCases":None,"sourceActualPassedReused":True,"engineFiles":8,"sourceInputPinsVerified":len(PINS),"nativeApproval":False,"runtimeApplied":False,"privateMediaSaved":False}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args): pass
    def do_GET(self):
        try:
            check_inputs(); route=urlparse(self.path).path; q=parse_qs(urlparse(self.path).query)
            if route == "/checks" or q.get("view") == ["checks"]:
                body=json.dumps(checks(),ensure_ascii=False).encode();mime="application/json"
            elif route in ["/","/whole"]:
                root=q.get("root",[WHOLE])[0]
                if root in MISSING_ROOTS:
                    body=json.dumps({"root":root,"blocked":True,"missing":["u76ee-j"],"geometry":None,"trace":None,"defaults":None,"nativeApproval":False}).encode();mime="application/json"
                else:
                    assert root == WHOLE, "Unsupported original whole"
                    body=('<!doctype html><meta charset="utf-8"><title>寘 fixed whole source-only</title><style>body{font:16px system-ui;margin:20px;width:1112px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>寘 · itaiji whole 적합성 미검토 · 보류</h1><p>기본형/VS0/FE0는 u76ee-j 누락으로 geometry null을 유지합니다. 아래 고정 itaiji 원본은 대체 승인되지 않았습니다.</p><div class="pair">'+r.base.full_dictionary("寘")+original_svg()+'</div><p>사전 graphics RAM-only · 원본 polygon25개 그대로 표시 · 기존 compiler 비활성 / frames0 / replay0</p>').encode();mime="text/html; charset=utf-8"
            elif route in ["/pairs","/progressive"]:
                body=('<!doctype html><meta charset="utf-8"><title>寘 source blocked</title><h1>寘 · 후보 보류</h1><p>missing-fixed-source-and-itaiji-whole-attribution-unverified</p><p>compiledPens0 / compiledMasks0 / frames0 / replay0. Fixed whole comparison only.</p>').encode();mime="text/html; charset=utf-8"
            else: self.send_error(404);return
            self.send_response(200);self.send_header("Content-Type",mime);self.send_header("Cache-Control","no-store");self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(409,str(exc))
if __name__ == "__main__":
    server=ThreadingHTTPServer(("127.0.0.1",0),Handler)
    print(json.dumps({"port":server.server_address[1],"pid":os.getpid(),**checks()}),flush=True)
    server.serve_forever()

