#!/usr/bin/env python3
# Static whole-Q-affine diagnostic only; no engine, publisher bytes RAM-only.
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,importlib.util,json,xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json';NS='{http://www.w3.org/2000/svg}';ET.register_namespace('',NS[1:-1])
def require(ok,msg):
 if not ok:raise ValueError(msg)
def sha(b):return hashlib.sha256(b).hexdigest()
def pinned(ref):
 raw=(ROOT/ref['path']).read_bytes();require(sha(raw)==ref['SHA256'],'fixed public input');return json.loads(raw)
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--check-only',action='store_true');ap.add_argument('--port',type=int,default=0);a=ap.parse_args();raw=CONFIG.read_bytes();require(sha(raw)==a.config_sha,'config pin');c=json.loads(raw)
 def guards():
  require(sha(CONFIG.read_bytes())==a.config_sha and sha(Path(__file__).read_bytes())==c['adapter']['SHA256'],'config/adapter pin')
  for p,h in c['inputSHA256'].items():require(sha((ROOT/p).read_bytes())==h,'public input pin')
  require(sha((ROOT/c['sharedServe']['path']).read_bytes())==c['sharedServe']['SHA256'],'shared static pin')
 guards();src={k:pinned(v)for k,v in c['sources'].items()};mappingDoc=pinned(c['mapping'])
 expected=[[2],[3],[1],[4],[9,5],[6],[7,8],[10],[14,11],[12],[13],[15],[16,17],[18],[19]]
 require(c['glyph']=='憯' and c['catalogStrokes']==15 and not c['nativeApproval'] and not c['runtimeApplied'],'candidate only15')
 require(c['logicalRawGroupsOneBased']==mappingDoc['mappingsOneBased']['default']==expected and sorted(x for g in expected for x in g)==list(range(1,20)),'exact15 logical/19raw mapping')
 require(list(src)==['original','author'],'two fixed public wholes')
 for key,v in src.items():
  require(sorted(v)==['defaults','groups','trace'] and len(v['groups'])==len(v['trace'])==19,'body3 only; no fake original header')
  require(sum(len(g['polygons'])for g in v['groups'])==41 and sum(map(len,v['trace']))==21,'19raw21calls41P')
  require(all(g['polygons']==[p for call in t for p in call['polygons']]for g,t in zip(v['groups'],v['trace'])),'all original call P retained')
  require(all(p['off']==0 for g in v['groups']for ps in g['polygons']for p in ps),'off0')
 require(src['original']['defaults']==src['author']['defaults'],'original defaults')
 for i in range(19):
  o,n=src['original']['groups'][i],src['author']['groups'][i]
  if i not in(5,11):require(o==n and src['original']['trace'][i]==src['author']['trace'][i],'17 unaffected rows exact')
  else:
   require(len(o['polygons'])==len(n['polygons'])==3 and [len(p)for p in o['polygons']]==[len(p)for p in n['polygons']],'whole threeP topology')
   require(o['raw'][:3]==n['raw'][:3] and o['raw'][3::2]==n['raw'][3::2],'same flags and X')
   require(len(src['original']['trace'][i])==len(src['author']['trace'][i])==1 and src['author']['trace'][i][0]['kind']=='cdDrawCurve','one original Q call')
   ot,nt=src['original']['trace'][i][0],src['author']['trace'][i][0]
   require(ot['args'][-2:]==nt['args'][-2:] and ot['args'][:-2:2]==nt['args'][:-2:2],'Q flags and X')
   require(all(op['x']==np['x'] for oldp,newp in zip(o['polygons'],n['polygons'])for op,np in zip(oldp,newp)),'whole P X unchanged')
 spec=importlib.util.spec_from_file_location('u61af_authored_Q_static',ROOT/c['sharedServe']['path']);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);shared.CONFIG=c;shared.ROOT=ROOT
 whole={k:shared.source_svg(v)for k,v in src.items()}
 for key,s in whole.items():
  n=ET.fromstring(s);require(n.get('viewBox')=='0 0 200 200' and len(list(n.iter(NS+'path')))==41,'whole41 original P once')
  require(not list(n.iter(NS+'clipPath')) and not list(n.iter(NS+'mask')),'whole no trim/clip')
 def subset(key,indices):
  n=ET.fromstring(whole[key]);wanted=set(indices)
  for g in list(n[0]):
   if int(g.get('data-original-raw'))not in wanted:n[0].remove(g)
  require({int(g.get('data-original-raw'))for g in n[0]}==wanted and len(list(n.iter(NS+'path')))==sum(len(src[key]['groups'][j-1]['polygons'])for j in wanted),'source raw/P exactly once')
  return ET.tostring(n,encoding='unicode')
 def selection(route,q):
  if route in('/','/whole','/checks'):require(not q,'whole query');return None
  require(route=='/compare','closed route');d=parse_qs(q,keep_blank_values=True);require(set(d)=={'pen','view'} and all(len(v)==1 for v in d.values()),'closed query')
  p=d['pen'][0];v=d['view'][0];require(p.isdecimal() and str(int(p))==p and 1<=int(p)<=15 and v in('current','prefix'),'finite15');return int(p),v
 def page(route,selected,sources,domestic):
  if selected is None:require(route in('/','/whole'),'whole route');panels=[('국내15 원문 · RAM',shared.domestic_svg(domestic)),('공개 default 원형41P · 기존HOLD',whole['original']),('raw6/12 whole-Q 양의Yaffine · 저자후보',whole['author'])]
  else:
   require(route=='/compare','selection route');pen,view=selected;prefix=view=='prefix';ids=[i for g in(expected[:pen]if prefix else[expected[pen-1]])for i in g]
   panels=[('국내 '+str(pen)+' '+view,shared.domestic_svg(domestic,pen,prefix)),('원형 raw'+str(ids),subset('original',ids)),('저자후보 raw'+str(ids),subset('author',ids))]
  form='<form action="/compare"><select name="pen">'+''.join('<option>'+str(i)+'</option>'for i in range(1,16))+'</select><select name="view"><option>current</option><option>prefix</option></select><button>비교</button></form>'
  return '<!doctype html><meta charset="utf-8"><title>憯 whole-Q author 비교</title><style>body{font:16px system-ui;margin:16px}.panels{display:grid;grid-template-columns:repeat(3,540px);gap:16px;width:max-content}svg{display:block;width:520px;height:520px;min-width:520px;min-height:520px}</style><h1>憯 · 원형/whole-Q 후보 · 정적 미승인</h1><a href="/whole">whole</a>'+form+'<p>원P41 전체보존. raw6/12의 모든P와Q guide만 각 단일 양의Yaffine; 다른17raw P/trace exact. source flags/X변경0, 엔진0, 원publisher font/시간동일성·등록승인0. 논리7 원guidegap은새bridge없이보존.</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+s+'</section>'for label,s in panels)+'</div>'
 shared.guards=guards;shared.load_sources=lambda:src;shared.selection=selection;shared.page=page
 saved=shared.domestic_svg;shared.domestic_svg=lambda *args:'<svg xmlns="http://www.w3.org/2000/svg"></svg>'
 try:
  require(page('/whole',selection('/whole',''),src,None).count('<svg')==3,'three whole panels')
  for p in range(1,16):
   for v in('current','prefix'):require(page('/compare',selection('/compare','pen='+str(p)+'&view='+v),src,None).count('<svg')==3,'three selected panels')
 finally:shared.domestic_svg=saved
 for route,q in[('/foreign',''),('/whole','pen=1'),('/compare','pen=0&view=current'),('/compare','pen=16&view=current'),('/compare','pen=1&view=current&extra=1')]:
  rejected=False
  try:selection(route,q)
  except ValueError:rejected=True
  require(rejected,'foreign selection rejected')
 require(shared.FETCH_COUNT==0,'check-only HTTP0')
 if a.check_only:print(json.dumps({'status':'PASS-code-only','wholePanels':3,'logicalSelections':30,'selectedPanelsEach':3,'actualSelectionAndPageExecuted':True,'sourceRaw':19,'sourceCalls':21,'P':41,'unaffectedRowsExact':17,'sourceProperties3Only':True,'routeNegatives':5,'engine':0,'HTTP':0,'server':0,'nativeApproval':False}));return
 savedargv=sys.argv
 try:sys.argv=[str(ROOT/c['sharedServe']['path']),'--port',str(a.port)];shared.main()
 finally:sys.argv=savedargv
if __name__=='__main__':main()
