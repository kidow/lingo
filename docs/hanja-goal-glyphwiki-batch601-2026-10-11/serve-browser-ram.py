import os,json,time,urllib.parse,http.server,hashlib
from pathlib import Path
root=Path("/Users/kidow/.codex/worktrees/hanja-stroke-verification/lingo/out")
content=Path("/Users/kidow/Documents/dev/kidow/lingo/content/hanja/characters")
chars=[c for p in content.glob("*.json") for c in json.loads(p.read_text())["characters"]]
cards={}
for c in chars:
 if c["id"]=="u844d":continue
 for skill in ["recognition","hun-eum"]:
  cards["hanja:char:"+c["id"]+":"+skill]={"rung":1,"streak":4,"fsrs":{"due":4222444800000,"stability":100,"difficulty":1,"elapsed_days":0,"scheduled_days":100,"reps":5,"lapses":0,"state":2,"last_review":int(time.time()*1000)}}
seed=json.dumps({"version":2,"cards":cards,"introducedAt":{}},ensure_ascii=False,separators=(",",":"))
state={"backed":False,"seeded":False,"restored":False,"exact":False}
key="lingo.progress.hanja"
class Handler(http.server.SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(root),**kw)
 def log_message(self,*a):pass
 def reply(self,body,kind="text/html; charset=utf-8"):
  self.send_response(200);self.send_header("Content-Type",kind);self.send_header("Cache-Control","no-store");self.end_headers();self.wfile.write(body.encode())
 def do_POST(self):
  p=urllib.parse.urlsplit(self.path).path
  body=json.loads(self.rfile.read(int(self.headers.get("Content-Length","0"))))
  assert p=="/__hanja_state" and set(body)=={"backed","seeded","restored","exact"} and all(isinstance(v,bool) for v in body.values())
  if body["restored"]:assert body["backed"] and body["exact"]
  state.update(body)
  self.reply(json.dumps(state),"application/json")
 def do_GET(self):
  u=urllib.parse.urlsplit(self.path);p=u.path
  if p=="/__hanja_control":
   ui="""<!doctype html><meta charset="utf-8"><title>허용된 한자 기록 검증</title><h1>52997 한자 기록 검증</h1><p>lingo.progress.hanja 한 항목만 브라우저 RAM 백업·검증·원복</p><button id="backup">허용한 기록 백업</button><button id="seed" disabled>葍 검증 기록 준비</button><button id="restore" disabled>허용한 기록 원복</button><p role="status">백업 전</p><script>(()=>{const key='lingo.progress.hanja';let saved=null,backed=false,seeded=false,restored=false;const report=async exact=>{const r=await fetch('/__hanja_state',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({backed,seeded,restored,exact})});if(!r.ok)throw Error('State report failed');};document.querySelector('#backup').onclick=async()=>{if(backed)throw Error('Already backed');saved=localStorage.getItem(key);backed=true;await report(false);document.querySelector('#backup').disabled=true;document.querySelector('#seed').disabled=false;document.querySelector('#restore').disabled=false;document.querySelector('[role=status]').textContent='브라우저 RAM 백업 완료';};document.querySelector('#seed').onclick=async()=>{if(!backed||seeded||restored)throw Error('Seed unavailable');localStorage.setItem(key,JSON.stringify(TEMPSEED));seeded=true;await report(false);document.querySelector('#seed').disabled=true;document.querySelector('[role=status]').textContent='葍 검증 기록 준비 완료';};document.querySelector('#restore').onclick=async()=>{if(!backed||restored)throw Error('Restore unavailable');if(saved===null)localStorage.removeItem(key);else localStorage.setItem(key,saved);const exact=localStorage.getItem(key)===saved;if(!exact)throw Error('Exact restore failed');restored=true;await report(true);saved=null;document.querySelector('#restore').disabled=true;document.querySelector('[role=status]').textContent='기존 기록 정확히 원복 완료';};})();</script>"""
   self.reply(ui.replace("TEMPSEED",seed));return
  if p=="/__hanja_status":
   self.reply(json.dumps(state),"application/json");return
  if p=="/":
   text=root.joinpath("index.html").read_text()
   if u.query=="__hanja_seed=601001":
    assert state["backed"] and state["seeded"] and not state["restored"]
    inject="<script>Math.random=()=>0;</script>"
    text=text.replace("<head>","<head>"+inject,1);state["seeded"]=True
   self.reply(text);return
  if p=="/sw.js":self.send_error(404);return
  super().do_GET()
print(json.dumps({"pid":os.getpid(),"port":52997,"authorizedKey":key,"backup":"RAM only"}),flush=True)
http.server.ThreadingHTTPServer(("127.0.0.1",52997),Handler).serve_forever()
