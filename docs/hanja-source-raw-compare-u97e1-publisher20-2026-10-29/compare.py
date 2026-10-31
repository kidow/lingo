#!/usr/bin/env python3
# Original full whole sources only. Independent raw selectors never imply logical order.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
from urllib.parse import parse_qs
import argparse,hashlib,html,importlib.util,json,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json';NS='{http://www.w3.org/2000/svg}'
def sha(b):return hashlib.sha256(b).hexdigest()
def require(v,m):
 if not v:raise ValueError(m)
def subset(svg,raws):
 root=ET.fromstring(svg);wanted=set(raws)
 for g in list(root[0]):
  if int(g.get('data-original-raw'))not in wanted:root[0].remove(g)
 require(len(root[0])==len(wanted),'original raw subset exact');return ET.tostring(root,encoding='unicode')
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--check-only',action='store_true');ap.add_argument('--port',type=int,default=0);a=ap.parse_args();raw=CONFIG.read_bytes();require(sha(raw)==a.config_sha,'config changed');c=json.loads(raw)
 def guards():
  require(sha(CONFIG.read_bytes())==a.config_sha and sha(Path(__file__).read_bytes())==c['adapter']['SHA256'],'config/adapter pin')
  for p,h in c['inputSHA256'].items():require(sha((ROOT/p).read_bytes())==h,'fixed input changed')
  require(sha((ROOT/c['sharedServe']['path']).read_bytes())==c['sharedServe']['SHA256'],'shared renderer pin')
 guards();sources={k:json.loads((ROOT/v['path']).read_text())for k,v in c['sources'].items()};mapping=json.loads((HERE/'mapping-hypothesis.json').read_text());groups=mapping['VS3']['logicalRawGroupsOneBased'];require(sorted(x for r in groups for x in r)==list(range(1,25)),'all24 source raw once')
 for key,source in sources.items():
  require(sorted(source)==['defaults','groups','trace'],'fixed original three-key capture; no fabricated engine header')
  for g,t in zip(source['groups'],source['trace']):require([p for call in t for p in call['polygons']]==g['polygons'],'original trace/P exact')
 spec=importlib.util.spec_from_file_location('wei_original_static',ROOT/c['sharedServe']['path']);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared)
 # Renderer parser expects the original media count. This RAM-only override is not catalog metadata mutation.
 shared.CONFIG=dict(c,catalogStrokes=c['publisherPlaybackClips']);shared.ROOT=ROOT;svgs={k:shared.source_svg(v)for k,v in sources.items()}
 def selection(route,query):
  if route in('/','/whole'):require(not query,'whole query');return None
  q=parse_qs(query,keep_blank_values=True)
  if route=='/mapping':
   require(set(q)=={'pen','view'}and all(len(v)==1 for v in q.values()),'mapping keys');p=q['pen'][0];view=q['view'][0];require(p.isdecimal()and str(int(p))==p and 1<=int(p)<=20 and view in('current','prefix'),'publisher20 mapping selection');return('mapping',int(p),view)
  require(route=='/raw'and set(q)=={'source','raw','pen','view'}and all(len(v)==1 for v in q.values()),'independent raw keys');key=q['source'][0];r=q['raw'][0];p=q['pen'][0];view=q['view'][0];require(key in sources and r.isdecimal()and p.isdecimal()and str(int(r))==r and str(int(p))==p and 1<=int(r)<=len(sources[key]['groups'])and 1<=int(p)<=20 and view in('current','prefix'),'raw selection');return('raw',key,int(r),int(p),view)
 def page(route,s,sourcesIgnored,domestic):
  if s is None:panels=[('Publisher20 original whole; catalog21 retained',shared.domestic_svg(domestic))]+[(key+' complete original whole, font difference retained',svgs[key])for key in['default','VS3']]
  elif s[0]=='mapping':
   _,p,v=s;prefix=v=='prefix';raws=[x for row in(groups[:p]if prefix else[groups[p-1]])for x in row];panels=[('Publisher20 stroke '+str(p)+' '+v,shared.domestic_svg(domestic,p,prefix)),('VS3 unapproved original raw role hypothesis '+str(raws),subset(svgs['VS3'],raws))]
  else:
   _,key,r,p,v=s;prefix=v=='prefix';panels=[('Publisher20 independent selected stroke '+str(p)+' '+v,shared.domestic_svg(domestic,p,prefix)),(key+' original raw '+str(r)+' '+v+'; raw index is not logical pen',subset(svgs[key],range(1,r+1)if prefix else[r]))]
  opts=lambda n:''.join('<option>'+str(i)+'</option>'for i in range(1,n+1));forms='<form action="/raw"><select name="source"><option>default</option><option>VS3</option></select><select name="raw">'+opts(24)+'</select><select name="pen">'+opts(20)+'</select><select name="view"><option>current</option><option>prefix</option></select><button>Independent raw compare</button></form><form action="/mapping"><select name="pen">'+opts(20)+'</select><select name="view"><option>current</option><option>prefix</option></select><button>VS3 role hypothesis</button></form>'
  return '<!doctype html><meta charset="utf-8"><title>韡 original whole/publisher20 diagnostic</title><style>body{font:16px system-ui;margin:16px}h1{font-size:24px}h2{font-size:17px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}svg{display:block;width:520px;height:520px}</style><h1>韡 catalog21 / publisher20 diagnostic</h1><a href="/whole">Whole</a>'+forms+'<p>Original public P/guide unchanged. No new engine, no source split, no mixed components. Default grass3 cannot be forced into publisher grass4. VS3 mapping remains unapproved; original21 canonical identity is not claimed.</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
 shared.guards=guards;shared.load_sources=lambda:sources;shared.selection=selection;shared.page=page
 for p in range(1,21):
  for v in['current','prefix']:
   selection('/mapping','pen='+str(p)+'&view='+v);subset(svgs['VS3'],[x for row in(groups[:p]if v=='prefix'else[groups[p-1]])for x in row])
 for key,source in sources.items():
  for r in range(1,len(source['groups'])+1):
   for v in['current','prefix']:selection('/raw','source='+key+'&raw='+str(r)+'&pen=1&view='+v);subset(svgs[key],range(1,r+1)if v=='prefix'else[r])
 require(shared.FETCH_COUNT==0,'check-only no media fetch')
 if a.check_only:print(json.dumps({'codeCheck':'PASS','catalog':21,'publisher':20,'wholeSources':2,'VS3RawExactlyOnce':24,'VS3MappingSelections':40,'rawSelections':92,'sourcePointsChanged':False,'engine':0,'HTTP':0,'server':0,'nativeApproval':False}));return
 old=sys.argv
 try:sys.argv=[str(ROOT/c['sharedServe']['path']),'--port',str(a.port)];shared.main()
 finally:sys.argv=old
if __name__=='__main__':main()
