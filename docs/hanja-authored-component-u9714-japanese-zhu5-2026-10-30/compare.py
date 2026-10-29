import argparse,hashlib,importlib.util,json,sys
from pathlib import Path
from urllib.parse import parse_qs
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
CONFIG=HERE/'config.pending.json';SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(v,m):
 if not v:raise ValueError(m)
def main():
 p=argparse.ArgumentParser();p.add_argument('--config-sha',required=True);p.add_argument('--check-only',action='store_true');p.add_argument('--port',type=int);a=p.parse_args();C=json.loads(CONFIG.read_bytes())
 def guards():
  require(sha(CONFIG)==a.config_sha and sha(Path(__file__).resolve())==C['adapterSHA256'],'fixed config/adapter')
  require(C['glyph']=='霔'and C['catalogStrokes']==16 and C['host']=='127.0.0.1'and C['sourceViewBox']=='0 0 200 200','exactcontext')
  require(C['schema']=='hanja-public-whole-component-static-comparison/v1'and C['sourceRootWasAuthored']is True and C['candidateOriginalRoot']is False and C['isOriginalEngineCapture']is False and C['nativeApproval']is False and C['runtimeApplied']is False,'unapprovedmixedcandidate')
  require(C['sourceRoots']=={'original':'u9714','candidate':'local_u9714_japanese_zhu5_caller_affine'}and C['defaultSource']=='candidate','closedtwoSources')
  for path,h in C['inputSHA256'].items():require(sha(ROOT/path)==h,'fixed public input '+path)
 guards();original=json.loads((ROOT/C['original']).read_bytes());candidate=json.loads((HERE/'fixtures-draft.json').read_bytes());sources={'original':original,'candidate':candidate};GROUPS=C['logicalRawGroupsHypothesis']
 require(GROUPS==[[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12,13],[14],[15],[17],[16],[18]],'closed pendingmacrogrouping')
 require(sorted(n for group in GROUPS for n in group)==list(range(1,19))and all(len(s['groups'])==18 for s in sources.values()),'whole18source slots once')
 require(candidate['groups'][:13]==original['groups'][:13]and candidate['trace'][:13]==original['trace'][:13]and candidate['mixedParts']and not candidate['isOriginalEngineCapture'],'retained13sourceexact/mixed')
 spec=importlib.util.spec_from_file_location('zhu_public_shared_static',ROOT/SHARED);g=importlib.util.module_from_spec(spec);spec.loader.exec_module(g);require(g.FETCH_COUNT==0,'no childprivatefetch')
 render={**C,'sourceRoots':{key:{'root':name,'rawGroups':18,'proofKind':'original-public-engine-capture'if key=='original'else'locally-authored-whole5-public-caller-affine-not-engine-capture'}for key,name in C['sourceRoots'].items()}}
 g.CONFIG=render;g.HERE=HERE;g.ROOT=ROOT;g.guards=guards;g.load_sources=lambda:sources;oldsvg,oldselection,oldpage=g.source_svg,g.selection,g.page
 def source_svg(proof,count=None,prefix=False):
  image=oldsvg(proof,count,prefix)
  return image.replace('data-original-raw=','data-authored-slot=')if proof is candidate else image
 g.source_svg=source_svg
 def selection(route,query):
  if route=='/mapping':
   q=parse_qs(query,keep_blank_values=True,strict_parsing=True);require(set(q)=={'pen','mode'}and all(len(v)==1 for v in q.values()),'exactmappingquery');require(q['pen'][0]in[str(i)for i in range(1,17)]and q['mode'][0]in['current','prefix'],'finitemappingbounds');return{'pen':int(q['pen'][0]),'mode':q['mode'][0]}
  require(route!='/checks','originalenginechecksnotauthoredcandidate');return oldselection(route,query)
 g.selection=selection
 def mapped_svg(proof,raws):
  head=None;parts=[]
  for raw in raws:
   image=source_svg(proof,raw,False);require(image.count('<g fill="#222">')==1 and image.endswith('</g></svg>'),'fixedwrapper');head,body=image.split('<g fill="#222">',1);parts.append(body[:-10])
  return head+'<g fill="#222">'+''.join(parts)+'</g></svg>'
 def page(route,selected,sources,domestic):
  if route!='/mapping':return oldpage(route,selected,sources,domestic)
  pen=selected['pen'];prefix=selected['mode']=='prefix';raws=[n for group in GROUPS[:pen]for n in group]if prefix else GROUPS[pen-1];raw=GROUPS[pen-1][0];sel={'source':'candidate','domestic':pen,'raw':raw,'dview':'prefix'if prefix else'single','rview':'single'};out=oldpage('/compare',sel,sources,domestic);single=source_svg(candidate,raw,False);require(out.count(single)==1,'onerightpanel');out=out.replace(single,mapped_svg(candidate,raws),1);return out.replace('<h1>','<p>UNAPPROVED public mixed component hypothesis; canonical '+str(pen)+' '+selected['mode']+' selects authored slots '+str(raws)+'. WholeJapanese主5 caller-affine only. Source rain3/4 andwater12/13 display joins need direct review; no invented bridge or timing approval.</p><h1>',1)
 g.page=page
 if a.check_only:
  domestic={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(16)]};count=0
  require(selection('/whole','')is None and page('/whole',None,sources,domestic).count('<section class="panel">')==3,'actualwhole3panels')
  for pen in range(1,17):
   for mode in['current','prefix']:
    sel=selection('/mapping','pen='+str(pen)+'&mode='+mode);out=page('/mapping',sel,sources,domestic);require(out.count('<section class="panel">')==2,'mappedpair');raws=[n for group in GROUPS[:pen]for n in group]if mode=='prefix'else GROUPS[pen-1];right=mapped_svg(candidate,raws);require(all(right.count('data-authored-slot="'+str(n)+'"')==1 for n in raws),'originalselectedPonce');count+=1
  rejected=0
  for query in['pen=0&mode=current','pen=17&mode=current','pen=01&mode=current','pen=2&mode=other','pen=2&pen=3&mode=current','pen=2&mode=current&raw=3']:
   try:selection('/mapping',query)
   except(ValueError,AssertionError):rejected+=1
   else:raise ValueError('invalidaccepted')
  require(g.FETCH_COUNT==0 and count==32 and rejected==6,'HTTP0finite32');print(json.dumps({'guardPass':True,'wholePanels':3,'actualMappingPairPages':32,'negativeQueriesRejected':6,'selected18slotsOnce':True,'HTTP':0,'server':0,'nativeApproval':False}));return
 require(a.port is not None and 0<=a.port<=65535,'explicitport');old=sys.argv
 try:sys.argv=[str(ROOT/SHARED),'--port',str(a.port)];g.main()
 finally:sys.argv=old
if __name__=='__main__':main()

