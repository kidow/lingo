import sys
sys.dont_write_bytecode=True
import json,os
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import parse_qs,urlparse
ROOT=Path(__file__).resolve().parent.parent.parent
rows=[]
for batch in [43,44,45,47,50,57]:
 data=json.loads((ROOT/f'public/hanja-strokes/dictionary-reviewed-glyphwiki-batch{batch}.json').read_text())[0]
 rows.append({'batch':batch,'glyph':data['glyph'],'outlines':data['outlines']})
class Handler(BaseHTTPRequestHandler):
 def log_message(self,*args):pass
 def do_GET(self):
  query=parse_qs(urlparse(self.path).query)
  glyph=query.get('glyph',['芭'])[0]
  row=next(r for r in rows if r['glyph']==glyph)
  script="""
const row=DATA;
const parts=s=>s.split(' Z').map(x=>x.trim()).filter(Boolean);
const norm=s=>parts(s).map(path=>{
 const p=[...path.matchAll(/[ML](-?[0-9.]+) (-?[0-9.]+)/g)].map(m=>[+m[1],+m[2]]);
 const a=p.reduce((v,q,i)=>{const n=p[(i+1)%p.length];return v+q[0]*n[1]-n[0]*q[1]},0);
 const out=a<0?[p[0],...p.slice(1).reverse()]:p;
 return out.map((p,i)=>(i?'L':'M')+p.join(' ')).join(' ')+' Z';
}).join(' ');
const svg=(paths,view='0 0 100 100')=>'<svg viewBox="'+view+'"><g fill="#171717">'+paths.map(d=>'<path d="'+d+'"/>').join('')+'</g></svg>';
const all=row.outlines.flat();
document.getElementById('forms').innerHTML=svg(all.flatMap(s=>parts(s.outline).map(p=>p+' Z')))+svg(all.map(s=>s.outline))+svg(all.map(s=>norm(s.outline)));
row.outlines.forEach((stroke,i)=>stroke.forEach((s,j)=>{
 if(norm(s.outline)===s.outline)return;
 const[x,y,r,b]=s.bounds,view=[x-3,y-3,r-x+6,b-y+6].join(' ');
 document.getElementById('details').innerHTML+='<h2>Stroke '+(i+1)+' / segment '+(j+1)+'</h2><div class="row">'+svg(parts(s.outline).map(p=>p+' Z'),view)+svg([s.outline],view)+svg([norm(s.outline)],view)+'</div>';
}));
""".replace('DATA',json.dumps(row,ensure_ascii=False))
  body=('<!doctype html><meta charset="utf-8"><style>body{font:16px system-ui;width:900px;margin:20px}.row{display:grid;grid-template-columns:repeat(3,300px)}svg{width:280px;height:240px}h2{font-size:16px}</style><h1>'+glyph+' filled-outline comparison</h1><p>Original independent source polygons | current combined path | normalized candidate</p><nav>'+''.join('<a href="?glyph='+r['glyph']+'">'+r['glyph']+'</a> ' for r in rows)+'</nav><div class="row" id="forms"></div><div id="details"></div><script>'+script+'</script>').encode()
  self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
print(json.dumps({'port':51934,'pid':os.getpid(),'glyphs':[r['glyph'] for r in rows]}),flush=True)
ThreadingHTTPServer(('127.0.0.1',51934),Handler).serve_forever()
