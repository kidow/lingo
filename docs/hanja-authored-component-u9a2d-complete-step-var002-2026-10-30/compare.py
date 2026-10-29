#!/usr/bin/env python3
# Candidate-only static assembly: original filled data, no engine or temporal policy.
import sys
sys.dont_write_bytecode=True
import argparse,copy,hashlib,html,importlib.util,json,xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
NS='{http://www.w3.org/2000/svg}';ET.register_namespace('',NS[1:-1])
RECIPE_SHA='6ea3429187a7b0183d6a01cef393455c6447bc6f05d1257eac80dc56d0cd9e30'
def require(v,m):
 if not v:raise ValueError(m)
def sha(v):return hashlib.sha256(v).hexdigest()
def pinned(ref):
 p=Path(ref['path']);require(not p.is_absolute() and '..'not in p.parts,'local artifact only');raw=(ROOT/p).read_bytes();require(sha(raw)==ref['SHA256'],'source pin');return json.loads(raw)
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--check-only',action='store_true');ap.add_argument('--port',type=int,default=0);args=ap.parse_args();raw=CONFIG.read_bytes();require(sha(raw)==args.config_sha,'config pin');c=json.loads(raw)
 def guards():
  require(sha(CONFIG.read_bytes())==args.config_sha and sha(Path(__file__).read_bytes())==c['adapter']['SHA256'],'config/adapter changed')
  for p,h in c['inputSHA256'].items():require(sha((ROOT/p).read_bytes())==h,'fixed input changed')
  require(sha((ROOT/c['sharedServe']['path']).read_bytes())==c['sharedServe']['SHA256'],'shared renderer changed')
 guards();r=pinned(c['recipe']);ready=pinned(c['readiness']);proof=pinned(ready['publicContact']);require(c['recipe']['SHA256']==RECIPE_SHA and ready['recipe']==c['recipe'],'closed pending recipe')
 require(r['mixedParts'] and r['locallyAuthoredRoot'] and not r['originalWhole'] and not r['isOriginalEngineCapture'] and r['isActualLocallyAuthoredEngineCapture'] and not any(r['approval'].values()),'unapproved explicit author assembly')
 src={k:pinned(v)for k,v in r['sources'].items()};require(r['glyph']==c['glyph'] and r['publisherLogicalCount']==c['publisherPlaybackClips'],'glyph/count')
 s=importlib.util.spec_from_file_location('candidate_static_original',ROOT/c['sharedServe']['path']);shared=importlib.util.module_from_spec(s);s.loader.exec_module(shared);shared.ROOT=ROOT
 # The persistent catalog count is retained in config; publisher-only validator uses its exact clip count in RAM.
 shared.CONFIG={**c,'catalogStrokes':c['publisherPlaybackClips']}
 originals={};nodes={}
 for k,v in src.items():
  if 'groups'not in v:continue
  require(sorted(v)==r['sourceKeys'][k] and len(v['groups'])==r['sourceCounts'][k]['raw'] and sum(len(g['polygons'])for g in v['groups'])==r['sourceCounts'][k]['P'] and sum(map(len,v['trace']))==r['sourceCounts'][k]['calls'],'source envelope/count')
  require(len(v['groups'])==len(v['trace']) and all(g['polygons']==[p for call in t for p in call['polygons']]for g,t in zip(v['groups'],v['trace'])),'P/call exact')
  require(all(p['off']==0 for g in v['groups']for ps in g['polygons']for p in ps),'off0 only')
  originals[k]=shared.source_svg(v);base=ET.fromstring(originals[k]);require(base.get('viewBox')=='0 0 200 200','source200');nodes[k]=base
 require(all(src['recipient']['groups'][i-1]==src['candidate']['groups'][i-1] and src['recipient']['trace'][i-1]==src['candidate']['trace'][i-1]for i in [1,2,3,4]+list(range(12,23))),'retained阝/馬 changed')
 root=ET.Element(NS+'svg',{'viewBox':'0 0 200 200','width':'200','height':'200','data-explicit-authored-components':'true'});outer=ET.SubElement(root,NS+'g',dict(nodes['recipient'][0].attrib));seen=[]
 for part in r['parts']:
  if part['kind']=='original-KAGE-raw':
   g=list(nodes[part['source']][0])[part['originalRawOneBased']-1];n=copy.deepcopy(g);before=[ET.tostring(x)for x in g];require(n.get('data-original-raw')==str(part['originalRawOneBased']),'raw owner');require([ET.tostring(x)for x in n]==before,'retained P changed')
  else:
   require(part['kind']=='original-MM-filled-D','closed part type');donor=src[part['source']];require(donor['record']==json.loads(donor['originalRecordJSON']) and sha(donor['originalRecordJSON'].encode())==donor['originalRecordSHA256'],'original MM row bytes')
   require(len(donor['record']['strokes'])==11 and len(donor['record']['medians'])==11,'whole donor11');n=ET.Element(NS+'g',{'transform':'matrix('+' '.join(format(x,'.17g')for x in part['displayMatrix'])+')'});ET.SubElement(n,NS+'path',{'d':donor['record']['strokes'][part['originalStrokeOneBased']-1],'fill-rule':'nonzero'})
  n.set('data-canonical',str(part['canonicalOneBased']));outer.append(n);seen.append(part['canonicalOneBased'])
 require(seen==list(range(1,len(r['parts'])+1)) and len(list(root.iter(NS+'path')))==r['counts']['filledPaths'],'complete ordered parts')
 require(not list(root.iter(NS+'use')) and not list(root.iter(NS+'clipPath')) and not list(root.iter(NS+'mask')),'static no clipping')
 expected=r['logicalRawGroupsOneBased'];require(len(expected)==c['publisherPlaybackClips'] and sorted(x for g in expected for x in g)==seen,'every source part used exactly once')
 candidate=ET.tostring(root,encoding='unicode')
 def subset(indices):
  x=ET.fromstring(candidate);wanted=set(indices)
  for g in list(x[0]):
   if int(g.get('data-canonical'))not in wanted:x[0].remove(g)
  require(len(x[0])==len(wanted),'selection complete');return ET.tostring(x,encoding='unicode')
 def select(route,query):
  if route in('/','/whole'):require(not query,'whole query');return None
  require(route=='/compare','closed route');q=parse_qs(query,keep_blank_values=True);require(set(q)=={'pen','view'} and all(len(v)==1 for v in q.values()),'selection keys');p=q['pen'][0];v=q['view'][0];require(p.isdecimal() and str(int(p))==p and 1<=int(p)<=len(expected) and v in('current','prefix'),'selection range');return int(p),v
 def page(route,selection,sources,domestic):
  if selection is None:panels=[('Publisher whole; local RAM only',shared.domestic_svg(domestic)),('Original public recipient whole',originals['recipient']),('Explicit mixed source author candidate; unapproved',candidate)]
  else:
   pen,view=selection;prefix=view=='prefix';idx=[x for g in(expected[:pen]if prefix else[expected[pen-1]])for x in g];panels=[('Publisher '+str(pen)+' '+view,shared.domestic_svg(domestic,pen,prefix)),('Author candidate '+str(pen)+' '+view+'; unapproved',subset(idx))]
  form='<form action="/compare"><select name="pen">'+''.join('<option>'+str(i)+'</option>'for i in range(1,len(expected)+1))+'</select><select name="view"><option>current</option><option>prefix</option></select><button>Compare</button></form>'
  return '<!doctype html><meta charset="utf-8"><title>'+html.escape(c['glyph'])+' static author proposal</title><style>body{font:16px system-ui;margin:16px}h1{font-size:24px}h2{font-size:17px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}svg{display:block;width:520px;height:520px}</style><h1>'+html.escape(c['glyph'])+' · unapproved source assembly</h1><a href="/whole">Whole</a>'+form+'<p>'+html.escape(r['limitationsText'])+'</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
 shared.guards=guards;shared.load_sources=lambda:src;shared.selection=select;shared.page=page
 for p in range(1,len(expected)+1):
  for view in('current','prefix'):
   select('/compare','pen='+str(p)+'&view='+view);subset([x for g in(expected[:p]if view=='prefix'else[expected[p-1]])for x in g])
 for route,q in[('/compare','pen=0&view=current'),('/compare','pen='+str(len(expected)+1)+'&view=current'),('/compare','pen=1&view=current&extra=1'),('/foreign','')]:
  rejected=False
  try:select(route,q)
  except ValueError:rejected=True
  require(rejected,'foreign route accepted')
 require(shared.FETCH_COUNT==0,'check-only no HTTP/private data')
 if args.check_only:print(json.dumps({'status':'PASS','glyph':c['glyph'],'catalog':c['catalogStrokes'],'publisherClips':c['publisherPlaybackClips'],'parts':len(seen),'filledPaths':r['counts']['filledPaths'],'currentPrefixSelections':len(expected)*2,'sourceOriginalDUnchanged':True,'engine':0,'HTTP':0,'server':0,'nativeApproval':False}));return
 saved=sys.argv
 try:sys.argv=[str(ROOT/c['sharedServe']['path']),'--port',str(args.port)];shared.main()
 finally:sys.argv=saved
if __name__=='__main__':main()
