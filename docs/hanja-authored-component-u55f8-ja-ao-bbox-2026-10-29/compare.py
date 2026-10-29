#!/usr/bin/env python3
# Static-only authored complete donor11 + original recipient mouth; contact HOLD diagnostic.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
from urllib.parse import parse_qs
import argparse,copy,hashlib,html,importlib.util,json,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json';NS='{http://www.w3.org/2000/svg}'
def sha(x):return hashlib.sha256(x).hexdigest()
def require(v,m):
 if not v:raise ValueError(m)
def subset(source,indices):
 root=ET.fromstring(source)
 for g in list(root[0]):
  if int(g.get('data-original-raw'))not in indices:root[0].remove(g)
 return ET.tostring(root,encoding='unicode')
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--check-only',action='store_true');ap.add_argument('--port',type=int,default=0);a=ap.parse_args();raw=CONFIG.read_bytes();require(sha(raw)==a.config_sha,'config pin');c=json.loads(raw)
 def guards():
  require(sha(CONFIG.read_bytes())==a.config_sha and sha(Path(__file__).read_bytes())==c['adapter']['SHA256'],'config/adapter pin')
  for p,h in c['inputSHA256'].items():require(sha((ROOT/p).read_bytes())==h,'fixed input changed')
  require(sha((ROOT/c['sharedServe']['path']).read_bytes())==c['sharedServe']['SHA256'],'static helper pin')
 guards();f=json.loads((HERE/'fixture-static-draft.json').read_text());recipe=json.loads((HERE/'recipe.json').read_text());src=json.loads((ROOT/recipe['sourceRefs']['recipient']['path']).read_text());donor=json.loads((ROOT/recipe['sourceRefs']['donor']['path']).read_text())['record']
 require(len(f['donorParts'])==len(donor['strokes'])==11 and f['retainedMouthGroups']==src['groups'][12:]and f['retainedMouthTrace']==src['trace'][12:],'whole11/originalmouth4')
 for i,p in enumerate(f['donorParts']):require(p['originalD']==donor['strokes'][i]and p['originalMedian']==donor['medians'][i]and p['sourceCommandCount']==p['transformedCommandCount'],'source unchanged/commands preserved')
 spec=importlib.util.spec_from_file_location('ao_public_static',ROOT/c['sharedServe']['path']);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);shared.CONFIG=c;shared.ROOT=ROOT;source=shared.source_svg(src)
 def authored(pens=None):
  take=set(range(1,15)if pens is None else pens);root=ET.Element(NS+'svg',{'viewBox':'0 0 200 200','width':'520','height':'520','data-locally-authored-mixed':'true'});g=ET.SubElement(root,NS+'g',{'fill':'#222'})
  for i,p in enumerate(f['donorParts'],1):
   if i in take:ET.SubElement(g,NS+'path',{'d':p['transformedD'],'data-donor-path':str(i)})
  old=ET.fromstring(source);mouth={12:[13],13:[14,15],14:[16]}
  for pen,raws in mouth.items():
   if pen in take:
    for n in old[0]:
     if int(n.get('data-original-raw'))in raws:
      before=ET.tostring(n);clone=copy.deepcopy(n);require(ET.tostring(clone)==before,'mouth XML unchanged');g.append(clone)
  return ET.tostring(root,encoding='unicode')
 def selection(route,query):
  if route in('/','/whole','/contact'):require(not query,'closed query');return None
  require(route=='/stroke','closed route');q=parse_qs(query,keep_blank_values=True);require(set(q)=={'pen','view'}and all(len(v)==1 for v in q.values()),'stroke keys');p=q['pen'][0];v=q['view'][0];require(p.isdecimal()and str(int(p))==p and 1<=int(p)<=14 and v in('current','prefix'),'14static selections');return int(p),v
 def page(route,s,ignored,domestic):
  if route=='/contact':panels=[('Original public upper6/7 +mouthHraw14; old source untouched',subset(source,{6,7,14})),('Authored donor6 +mouth top/right logical13; new contact HOLD',authored([6,13])),('Authored donor11 +mouth top/right logical13; hull-contact unresolved',authored([11,13]))]
  elif s:
   p,v=s;pre=v=='prefix';panels=[('Publisher original stroke '+str(p)+' '+v,shared.domestic_svg(domestic,p,pre)),('Authored static role hypothesis '+str(p)+' '+v+'; contact HOLD',authored(range(1,p+1)if pre else[p]))]
  else:panels=[('Original publisher14 whole',shared.domestic_svg(domestic)),('Original public KAGE whole, fourth shortV HOLD',source),('Authored complete JaAo11 +original mouth3; new contact HOLD',authored())]
  options=''.join('<option>'+str(i)+'</option>'for i in range(1,15));form='<form action="/stroke"><select name="pen">'+options+'</select><select name="view"><option>current</option><option>prefix</option></select><button>Static compare</button></form>'
  return '<!doctype html><meta charset="utf-8"><title>嗸 authored complete donor bbox-fit HOLD</title><style>body{font:16px system-ui;margin:16px}h1{font-size:24px}h2{font-size:17px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}svg{display:block;width:520px;height:520px}</style><h1>嗸 authored static HOLD diagnostic</h1><p><a href="/whole">Whole</a> <a href="/contact">Contact diagnostic</a></p>'+form+'<p>Explicit public-bbox author placement; original11 D/median retained under one affine. Original mouth P unchanged. Donor6/new mouthH contact HOLD; no original whole,99 transform,engine capture or temporal approval.</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
 shared.guards=guards;shared.load_sources=lambda:{'source':src,'candidate':f};shared.selection=selection;shared.page=page
 full=ET.fromstring(authored());require(len(list(full.iter(NS+'path')))==16,'11donorD+5mouthP')
 for p in range(1,15):
  for v in['current','prefix']:selection('/stroke','pen='+str(p)+'&view='+v);authored(range(1,p+1)if v=='prefix'else[p])
 require(shared.FETCH_COUNT==0,'no check-only private fetch')
 if a.check_only:print(json.dumps({'codeCheck':'PASS','donorPaths':11,'mouthRaw':4,'mouthP':5,'wholePaths':16,'staticSelections':28,'originalSourceUnchanged':True,'newContactHold':True,'HTTP':0,'engine':0,'server':0}));return
 old=sys.argv
 try:sys.argv=[str(ROOT/c['sharedServe']['path']),'--port',str(a.port)];shared.main()
 finally:sys.argv=old
if __name__=='__main__':main()
