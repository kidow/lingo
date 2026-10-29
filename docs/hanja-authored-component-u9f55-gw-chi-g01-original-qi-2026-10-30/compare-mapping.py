"""Closed explicit complete-g01 mixed 齕 whole comparison; original private media stays shared server RAM."""
import argparse,hashlib,html,importlib.util,json,sys,xml.etree.ElementTree as ET
from urllib.parse import parse_qs
from pathlib import Path
sys.dont_write_bytecode=True
ET.register_namespace('','http://www.w3.org/2000/svg')
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config-mapping.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,m):
 if not x:raise ValueError(m)
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--port',type=int,default=0);ap.add_argument('--check-only',action='store_true');args=ap.parse_args();require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted loopback only');c=json.loads(CONFIG.read_bytes())
 def guards():
  require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==c['adapterSHA256'],'adapter/config pin');require(sha(ROOT/SHARED)==SHARED_SHA,'shared renderer pin')
  for p,h in c['inputSHA256'].items():require(sha(ROOT/p)==h,'fixed input '+p)
  meta=json.loads((ROOT/"docs/hanja-goal-glyphwiki-batch1057-2026-10-13/metadata.json").read_bytes());require(c['glyph']=='齕' and c['catalogStrokes']==18 and c['host']=='127.0.0.1' and c['sourceViewBox']=='0 0 200 200','exact original target');require(c['domestic']==meta['dictionary'],'original media metadata');require(c['sourceRoots']=={'original':{'root':'u9f55','rawGroups':21,'proofKind':'original-full5-fixed-source'},'author':{'root':'authored-u9f55-complete-u9f52-g01-originalQi','rawGroups':21,'proofKind':'explicit-original-whole-donor-affine-assembly-not-engine-capture'}} and c['defaultSource']=='author','exact two public roots');require(c['noPartialAnimation'] and not c['nativeApproval'] and not c['sourceGroupingApproved'] and not c['runtimeApplied'] and c['sourceGeometryChanged'],'whole only unapproved')
 guards();sources={k:json.loads((ROOT/ref['path']).read_bytes())for k,ref in c['sources'].items()};require(set(sources['original'])=={'groups','trace','defaults','engineRevision','engineHashes'},'old original source fields');require(set(sources['author'])=={'groups','trace','defaults'},'authored assembly separate from original engine proof')
 for k,counts in [('original',(21,22,47)),('author',(21,22,48))]:
  s=sources[k];require((len(s['groups']),sum(map(len,s['trace'])),sum(len(g['polygons'])for g in s['groups']))==counts,'source counts');require([sum((x['polygons']for x in row),[])for row in s['trace']]==[g['polygons']for g in s['groups']],'original P/call binding');require(all(p['off']==0 for g in s['groups']for poly in g['polygons']for p in poly),'original off0');
 recipe=json.loads((ROOT/c['recipe']['path']).read_bytes());require(c['recipe']['SHA256']=='3d4742c53bb5788fed2c7065f6936c5dca8d852dfabad72bfab4da574422535f' and recipe['mixedParts'] and recipe['locallyAuthoredRoot'] and not recipe['originalWhole'] and not recipe['authorWholeEngineCapture'] and not recipe['nativeStaticApproved'] and not recipe['mappingApproved'],'explicit unapproved whole author recipe')
 donor=json.loads((ROOT/recipe['donor']['path']).read_bytes());require(set(donor)=={'groups','trace','defaults','engineRevision','engineHashes'} and len(donor['groups'])==16 and len(donor['engineHashes'])==8,'independent original donor proof')
 retain=[17,18,19,20,21];require(all(sources['original']['groups'][n-1]==sources['author']['groups'][n-1] and sources['original']['trace'][n-1]==sources['author']['trace'][n-1] for n in retain),'raw17empty and all original Qi P/calls exact')
 require(sources['author']['groups'][16]['polygons']==[] and sources['author']['trace'][16]==[],'empty17 retained not painted')
 spec=importlib.util.spec_from_file_location('he_g01_shared_static',ROOT/SHARED);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);shared.CONFIG=c;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
 def selection(route,query):
  require(route in('/','/whole') and not query,'exact whole-only route');return None
 shared.selection=selection

 mapping=json.loads((ROOT/c['mapping']['path']).read_bytes());require(c['mapping']['SHA256']=='de0452e68745d04f7d22bfb30b0447bee13653ff667478fec766065e57b2319e' and mapping['fixture']==c['sources']['author'] and not mapping['mappingApproved'],'exact mapping hypothesis')
 groups=mapping['logicalSourceGroupsOneBased'];require(groups==[[1],[2],[3],[4],[8],[9],[10],[11],[7],[12],[13],[14],[15],[5,16],[6],[18],[19],[21,20]] and sorted(x for g in groups for x in g)==list(range(1,17))+list(range(18,22)),'every painted raw once; empty17 separate')
 source_candidate=shared.source_svg(sources['author']);old_page=shared.page
 def subset(indices):
  root=ET.fromstring(source_candidate);wanted=set(indices)
  for g in list(root[0]):
   if int(g.get('data-original-raw'))not in wanted:root[0].remove(g)
  require(len(root[0])==len(wanted),'selected original raw groups exact')
  expectedP=sum(len(sources['author']['groups'][n-1]['polygons'])for n in wanted);actualP=root.findall('.//{http://www.w3.org/2000/svg}path');require(expectedP>0 and len(actualP)==expectedP and all(p.get('d','').strip() for p in actualP),'nonempty public P exactly once')
  svg=ET.tostring(root,encoding='unicode');require(svg.startswith('<svg ') and '<ns0:'not in svg,'HTML SVG default namespace');return svg
 def select_mapping(route,query):
  if route in('/','/whole'):require(not query,'whole query');return None
  require(route=='/compare','exact comparison route');q=parse_qs(query,keep_blank_values=True);require(set(q)=={'pen','view'} and all(len(v)==1 for v in q.values()),'explicit selection');p=q['pen'][0];view=q['view'][0];require(p.isdecimal() and str(int(p))==p and 1<=int(p)<=18 and view in('current','prefix'),'selection range');return int(p),view
 def page_mapping(route,selection,sources,domestic):
  if selection is None:return old_page(route,selection,sources,domestic)
  pen,view=selection;prefix=view=='prefix';wanted=[n for g in(groups[:pen]if prefix else[groups[pen-1]])for n in g]
  panels=[('Publisher '+str(pen)+' '+view+'; RAM only',shared.domestic_svg(domestic,pen,prefix)),('Explicit g01 mixed author '+str(pen)+' '+view+'; mapping unapproved',subset(wanted))]
  form='<form action="/compare"><select name="pen">'+''.join('<option>'+str(i)+'</option>'for i in range(1,19))+'</select><select name="view"><option>current</option><option>prefix</option></select><button>Compare</button></form>'
  return '<!doctype html><meta charset="utf-8"><title>齕 source mapping hypothesis</title><style>body{font:16px system-ui;margin:16px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}svg{display:block;width:520px;height:520px}</style><h1>齕 source mapping hypothesis; unapproved</h1><a href="/whole">Whole</a>'+form+'<p>Original P/guide/flags preserved. 14 V→NE exact source joint; 18 original H→fold. Source413 foot and UP decoration retained; no bridge or microclock claim.</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
 shared.selection=select_mapping;shared.page=page_mapping
 for pen in range(1,19):
  for view in('current','prefix'):
   sel=select_mapping('/compare','pen='+str(pen)+'&view='+view);rendered=page_mapping('/compare',sel,sources,{'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(18)]});require(rendered.count('<section>')==2 and rendered.count('<svg ')==2 and rendered.count('</svg>')==2 and '<ns0:'not in rendered,'two actual HTML SVGs including nonempty source P')
 for q in('pen=0&view=current','pen=19&view=current','pen=1&view=current&extra=1'):
  rejected=False
  try:select_mapping('/compare',q)
  except ValueError:rejected=True
  require(rejected,'invalid mapping selection accepted')
 if args.check_only:
  dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(18)]};selection('/whole','');page=shared.page('/whole',None,sources,dummy);require(page.count('<section class="panel">')==3,'three whole panels')
  for route,query in[('/compare',''),('/checks',''),('/whole','pen=1')]:
   reject=False
   try:selection(route,query)
   except ValueError:reject=True
   require(reject,'foreign selection accepted')
  for key,P in [('original',47),('author',48)]:require(len(ET.fromstring(shared.source_svg(sources[key])).findall('.//{http://www.w3.org/2000/svg}path'))==P,'original source painted once per P')
  require(shared.FETCH_COUNT==0,'no private preparation fetch');print(json.dumps({'status':'PASS-CODE-ONLY','wholePanels':3,'currentPrefixSelections':36,'mappingApproved':False,'authorRaw':21,'authorCalls':22,'authorP':48,'oldOriginalRaw':21,'oldOriginalP':47,'sourceGeometryChanged':True,'sourceGroupingApproved':False,'nativeApproval':False,'HTTP':0,'engine':0,'server':0}));return
 old=sys.argv
 try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
 finally:sys.argv=old
if __name__=='__main__':main()
