# -*- coding: utf-8 -*-
"""璱 raw8 source-affine view only: same originalP bytes; no engine derivative header."""
import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
from urllib.parse import parse_qs
LOGICAL=[1,3,2,4,5,6,7,8,9,10,12,11,13,14,15,16,17]
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
SHARED="docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py";SHARED_SHA="ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d";SOURCE="docs/hanja-goal-glyphwiki-batch681-2026-10-11/engine-whole-u74b1.json";SOURCE_SHA="f938c54c364a342dac7ab7e99bfff9f57bdf629bc279e4df4ab76f6a066b378a"
MATRIX=[1,0.2263581488933601,0,1,0,-22.318913480885307];ROOTS={"original":{"root":"u74b1","rawGroups":17,"proofKind":"fixed-original-public-full5-raw8-rise-HOLD"},"candidate":{"root":"lingo-u74b1-raw8-public-Yshear-author-view","rawGroups":17,"proofKind":"source-affine-view-only-one-original-Q3P-not-engine-capture"}}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(v,m):
 if not v:raise ValueError(m)
def main():
 p=argparse.ArgumentParser();p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');a=p.parse_args();require(__debug__ and sys.flags.optimize==0 and 0<=a.port<=65535,'loopback asserted port');c=json.loads(CONFIG.read_bytes())
 def guards():
  require(sha(CONFIG)==a.config_sha and sha(Path(__file__).resolve())==c['adapterSHA256'],'fixedconfig/wrapper');require(sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA,'fixedsource/reader');require(c['glyph']=='璱'and c['catalogStrokes']==17 and c['sourceViewBox']=='0 0 200 200'and c['host']=='127.0.0.1'and c['sourceRoots']==ROOTS,'closedcontext');require(c['noPartialAnimation']is True and c['nativeApproval']is False and c['runtimeApplied']is False and c['sourceGroupingApproved']is False,'staticonlypending')
  require(c['logicalMappingHypothesis']==LOGICAL and sorted(LOGICAL)==list(range(1,18)),'exactpendinglogicalpermutation')
  require(c['comparisonScope']==json.loads("{\"candidatePens\":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],\"originalPens\":[8],\"sameDomesticRaw\":true,\"sameViewMode\":true}"),'closed finite paired scope')
  for path,h in c['inputSHA256'].items():require(sha(ROOT/path)==h,'inputchanged:'+path)
 guards();source=json.loads((ROOT/SOURCE).read_bytes());require(set(source)=={'engineRevision','engineHashes','groups','trace','defaults'}and len(source['groups'])==17 and len(sum(source['trace'],[]))==19 and sum(len(g['polygons'])for g in source['groups'])==40,'full5original17/19/40');require(len(source['trace'][7])==1 and source['trace'][7][0]['kind']=='cdDrawCurve'and len(source['trace'][7][0]['polygons'])==3,'raw8original1Q3P');require([sum((t['polygons']for t in row),[])for row in source['trace']]==[g['polygons']for g in source['groups']],'sourcePtrace')
 recipe=json.loads((HERE/'recipe.pending.json').read_bytes());require(recipe['sourceAffines']['numericMatrix200']==MATRIX and recipe['changedOriginalRawOneBased']==8 and recipe['originalControlAndPKeptAsInputs']is True and recipe['identity']['actualEngineCapture']is False,'samewholeQ/Paffineview');candidate={'groups':source['groups'],'sourceAffineViewOnly':True};sources={'original':source,'candidate':candidate};s=importlib.util.spec_from_file_location('se_source_affine_view',ROOT/SHARED);g=importlib.util.module_from_spec(s);s.loader.exec_module(g);require(g.FETCH_COUNT==0,'HTTP0prepare');g.CONFIG=c;g.HERE=HERE;g.ROOT=ROOT;g.guards=guards;g.load_sources=lambda:sources;oldsvg=g.source_svg;token='<g data-original-raw="8" data-polygons="3">';matrix='matrix('+' '.join(str(v)for v in MATRIX)+')';attribute=' transform="'+matrix+'"'
 def source_svg(proof,count=None,prefix=False):
  out=oldsvg(proof,count,prefix);selected=count is None or count==8 or prefix and count>=8
  if proof.get('sourceAffineViewOnly')and selected:require(out.count(token)==1,'exactraw8view');out=out.replace(token,token[:-1]+attribute+'>')
  return out
 g.source_svg=source_svg;oldsel=g.selection
 def selection(route,query):
  if route=='/mapping':
   q=parse_qs(query,keep_blank_values=True,strict_parsing=True);require(set(q)=={'pen','mode'}and all(len(v)==1 for v in q.values()),'exactlogicalmappingquery');pen=q['pen'][0];mode=q['mode'][0];require(pen in[str(i)for i in range(1,18)]and mode in['current','prefix'],'closedlogicalmappingbounds');return{'pen':int(pen),'mode':mode}
  require(route in['/','/whole','/compare'],'closedstaticroutes');v=oldsel(route,query)
  if route=='/compare':require(v['domestic']==v['raw']and v['dview']==v['rview']and((v['source']=='candidate'and 1<=v['domestic']<=17)or(v['source']=='original'and v['domestic']==8)),'exactcandidate1through17/original8 pairs')
  return v
 g.selection=selection
 def mapped_source_svg(proof,raws):
  parts=[];head=None
  for raw in raws:
   image=source_svg(proof,raw,False);require(image.count('<g fill="#222">')==1 and image.endswith('</g></svg>'),'fixed sourceSVG wrapper');prefix,body=image.split('<g fill="#222">',1);head=prefix+'<g fill="#222">';parts.append(body[:-10])
  return head+''.join(parts)+'</g></svg>'
 oldpage=g.page
 def page(route,selected,sources,domestic):
  if route!='/mapping':return oldpage(route,selected,sources,domestic)
  pen=selected['pen'];prefix=selected['mode']=='prefix';raws=LOGICAL[:pen]if prefix else[LOGICAL[pen-1]];raw=LOGICAL[pen-1];base={'source':'candidate','domestic':pen,'raw':raw,'dview':'prefix'if prefix else'single','rview':'single'};out=oldpage('/compare',base,sources,domestic);single=source_svg(sources['candidate'],raw,False);require(out.count(single)==1,'one original rightpanel');out=out.replace(single,mapped_source_svg(sources['candidate'],raws),1);return out.replace('<h1>','<p>Finite logical mapping HYPOTHESIS; canonical '+str(pen)+' '+selected['mode']+' selects original raws '+str(raws)+'. Raw8only matrix retained; no newsource geometry or native approval.</p><h1>',1)
 g.page=page
 if a.check_only:
  dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(17)]};count=0
  for pen in range(1,18):
   for mode in['current','prefix']:
    selected=selection('/mapping','pen='+str(pen)+'&mode='+mode);out=page('/mapping',selected,sources,dummy);require(out.count('<section class="panel">')==2,'actualmappedpairpage');raws=LOGICAL[:pen]if mode=='prefix'else[LOGICAL[pen-1]];right=mapped_source_svg(sources['candidate'],raws);require(all(right.count('data-original-raw="'+str(n)+'"')==1 for n in raws),'selectedsourceindicesonce');require(right.count(attribute)==int(8 in raws),'source8matrixonlywhenincluded');count+=1
  rejected=0
  for query in['pen=0&mode=current','pen=18&mode=current','pen=01&mode=current','pen=2&mode=other','pen=2&pen=3&mode=current','pen=2&mode=current&raw=3']:
   try:selection('/mapping',query)
   except (ValueError,AssertionError):rejected+=1
   else:raise ValueError('out-of-scope mapping accepted')
  require(count==34 and rejected==6 and g.FETCH_COUNT==0,'finite mapping coverage/HTTP0');print(json.dumps({'guardPass':True,'exactMapped17By2Pages':34,'negativeMappingQueriesRejected':6,'original17RawUsedExactlyOnce':True,'raw8MatrixRetainedOnlyAtOriginalIndex8':True,'originalPGuideAndCSSUnchanged':True,'geometryMathNotRerun':True,'HTTP':0,'server':0,'nativeApproval':False}));return
 old=sys.argv
 try:sys.argv=[str(ROOT/SHARED),'--port',str(a.port)];g.main()
 finally:sys.argv=old
if __name__=='__main__':main()
