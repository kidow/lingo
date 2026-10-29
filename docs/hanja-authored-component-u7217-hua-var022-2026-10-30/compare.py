#!/usr/bin/env python3
# Exact public whole-only comparison. Publisher media remain RAM-only in shared loader.
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,importlib.util,json,xml.etree.ElementTree as ET
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
def require(ok,msg):
 if not ok:raise ValueError(msg)
def sha(b):return hashlib.sha256(b).hexdigest()
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--check-only',action='store_true');ap.add_argument('--port',type=int,default=0);a=ap.parse_args()
 raw=(HERE/'config.json').read_bytes();require(sha(raw)==a.config_sha,'config pin');c=json.loads(raw)
 def guards():
  require(sha((HERE/'config.json').read_bytes())==a.config_sha,'config changed')
  require(sha(Path(__file__).read_bytes())==c['adapter']['SHA256'],'adapter changed')
  for p,h in c['inputSHA256'].items():
   q=Path(p);require(not q.is_absolute() and '..'not in q.parts,'local pinned input');require(sha((ROOT/q).read_bytes())==h,'input changed')
  require(c['glyph']=='爗' and c['catalogStrokes']==c['publisherPlaybackClips']==19 and c['nativeApproval'] is False and c['runtimeApplied'] is False,'pending exact glyph')
 guards()
 spec=importlib.util.spec_from_file_location('fixed_original_static',ROOT/c['sharedServe']['path']);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);shared.ROOT=ROOT;shared.CONFIG=c
 src={k:json.loads((ROOT/v['path']).read_bytes()) for k,v in c['sources'].items()}
 require(list(src)==['recipient','var014','var022'],'three exact public sources')
 for k,v in src.items():
  n=c['sourceRoots'][k];require(len(v['groups'])==n['rawGroups'] and len(v['trace'])==n['rawGroups'] and sum(map(len,v['trace']))==n['calls'] and sum(len(g['polygons'])for g in v['groups'])==n['polygons'],'exact envelope')
  require(all(g['polygons']==[p for call in t for p in call['polygons']]for g,t in zip(v['groups'],v['trace'])),'original call P')
  require(all(p['off']==0 for g in v['groups']for ps in g['polygons']for p in ps),'off0')
 for k in ['var014','var022']:
  require(src[k]['groups'][:9]==src['recipient']['groups'][:9] and src[k]['trace'][:9]==src['recipient']['trace'][:9],'retained fire/day changed')
 originalSVG={k:shared.source_svg(v)for k,v in src.items()}
 for k,s in originalSVG.items():
  node=ET.fromstring(s);require(node.get('viewBox')=='0 0 200 200','source world200')
  require(len(list(node.iter(shared.NS+'path')))==c['sourceRoots'][k]['polygons'],'every original P once')
  require(not list(node.iter(shared.NS+'clipPath')) and not list(node.iter(shared.NS+'mask')),'no clipping')
 def selection(route,q):
  require(route in('/','/whole','/checks') and q=='','whole-only fixed routes');return None
 def page(route,selected,sources,domestic):
  require(selected is None and route in('/','/whole'),'whole route')
  panels=[('국내 전체19 · RAM 원문',shared.domestic_svg(domestic)),('공개 원recipient · 원형',originalSVG['recipient']),('var014 · 새 raw12↔日raw7 접촉 HOLD',originalSVG['var014']),('var022 · 새 교차0 / 정적 미승인',originalSVG['var022'])]
  return '<!doctype html><meta charset="utf-8"><title>爗 공개 華11 후보 비교</title><style>body{font:16px system-ui;margin:16px}.panels{display:grid;grid-template-columns:repeat(2,540px);gap:16px;width:max-content}svg{display:block;width:520px;height:520px;min-width:520px;min-height:520px}</style><h1>爗 · whole 한정 후보 비교</h1><p>완전 華11 교체; 火日9raw17P 보존. 두 후보의 전체bbox fit은 identity. 폰트·필순·시간·등록 미승인.</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
 shared.guards=guards;shared.load_sources=lambda:src;shared.selection=selection;shared.page=page
 for route in('/','/whole','/checks'):selection(route,'')
 for route,q in[('/compare',''),('/whole','pen=1'),('/foreign','')]:
  rejected=False
  try:selection(route,q)
  except ValueError:rejected=True
  require(rejected,'foreign route')
 saved=shared.domestic_svg;shared.domestic_svg=lambda _: '<svg xmlns="http://www.w3.org/2000/svg"></svg>'
 try:require(page('/whole',selection('/whole',''),src,None).count('<svg')==4,'actual page four panels')
 finally:shared.domestic_svg=saved
 require(shared.FETCH_COUNT==0,'check-only HTTP0')
 if a.check_only:print(json.dumps({'status':'PASS','wholePanels':4,'publicP':[c['sourceRoots'][k]['polygons']for k in src],'actualSelectionAndPageExecuted':True,'routeNegative':3,'HTTP':0,'server':0,'nativeApproval':False}));return
 savedargv=sys.argv
 try:sys.argv=[str(ROOT/c['sharedServe']['path']),'--port',str(a.port)];shared.main()
 finally:sys.argv=savedargv
if __name__=='__main__':main()
