import argparse,copy,hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config-logical.json'
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py';SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
OLD_CONFIG='docs/hanja-authored-ownstroke-u7e98-hook-separated-2026-10-29/config.json';OLD_CONFIG_SHA='9f58a2accb1d8fe4abfdd6d414ba23be3bd7b5e73aff3c0880af506f42020a85'
SOURCE='docs/hanja-actual-engine-capture-u7e98-hkcs-m-2026-10-26/engine-whole-hkcs_m7e98.json';SOURCE_SHA='1d05a3718cfc27b49fe3b6a009ed03537280a1a3b2d2d8bdd4c485d90fca8503'
FIXTURE='docs/hanja-authored-ownstroke-u7e98-hook-separated-2026-10-29/fixtures-draft.json';FIXTURE_SHA='a8475b569494c09daa311fed1c7585e211cb364d75758c7032ce022b65ded57b'
MAPPING=[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20],[22],[23,24],[25],[26],[27],[28],[29]]
ROOTS={"original":{"root":"hkcs_m7e98","rawGroups":25,"originalRawGroups":30,"polygons":62,"proofKind":"Logical25 hypothesis viewing alias of fixed original30raw31call full5"},"authored":{"root":"local_u7e98_hkcs_raw21_x4499over3403_20261029","rawGroups":25,"originalRawGroups":30,"polygons":62,"proofKind":"Logical25 hypothesis viewing alias of authored whole raw21 affine; not engine capture"}}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(v,m):
 if not v:raise ValueError(m)
def main():
 p=argparse.ArgumentParser();p.add_argument('--config-sha',required=True);p.add_argument('--check-only',action='store_true');p.add_argument('--port',type=int);args=p.parse_args();config=json.loads(CONFIG.read_bytes())
 def guards():
  require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config['adapterSHA256'],'exact mapping config/adapter changed')
  require(config['schema']=='hanja-original-clock-supported-logical-static-compare/v1'and config['glyph']=='纘'and config['catalogStrokes']==25 and config['host']=='127.0.0.1'and config['sourceViewBox']=='0 0 200 200','exact local25 context')
  require(config['logicalRawGroupsZeroBased']==MAPPING and config['viewIsLogicalAliasOf30OriginalRawGroups']is True and sorted(i for row in MAPPING for i in row)==[i for i in range(30)if i!=21],'25-role view of all29 drawing rows; raw22 nondrawing retained')
  require(config['sourceRoots']==ROOTS,'exact original/authored renderer dictionaries')
  require(sha(ROOT/OLD_CONFIG)==OLD_CONFIG_SHA and config['domestic']==json.loads((ROOT/OLD_CONFIG).read_bytes())['domestic'],'existing controlled domestic25 RAM reference')
  require(config['sourceMappingApproved']is False and config['nativeApproval']is False and config['runtimeApplied']is False and config['noPartialAnimation']is True,'mapping hypothesis only')
  require(config['sharedServe']=={'path':SHARED,'SHA256':SHARED_SHA}and sha(ROOT/SHARED)==SHARED_SHA and sha(ROOT/SOURCE)==SOURCE_SHA and sha(ROOT/FIXTURE)==FIXTURE_SHA,'unchanged geometry and shared static shell')
  for f,h in config['inputSHA256'].items():require(sha(ROOT/f)==h,'input changed: '+f)
 guards();original=json.loads((ROOT/SOURCE).read_bytes());candidate=json.loads((ROOT/FIXTURE).read_bytes());require(len(original['groups'])==len(candidate['groups'])==30 and sum(len(g['polygons'])for g in candidate['groups'])==62,'fixed30raw62P')
 require(original['groups'][21]['polygons']==candidate['groups'][21]['polygons']==[]and original['trace'][21]==candidate['trace'][21]==[],'literal raw22 nondrawing only');sources={'original':original,'authored':candidate};spec=importlib.util.spec_from_file_location('shao_logical_shared_static',ROOT/SHARED);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);require(shared.FETCH_COUNT==0,'private media fetched only by ROOT server')
 shared.CONFIG=config;shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
 original_svg,original_page,original_selection=shared.source_svg,shared.page,shared.selection
 def source_svg(proof,count=None,prefix=False):
  indexes=list(range(30))if count is None else[i for row in MAPPING[:count]for i in row]if prefix else MAPPING[count-1]
  value=original_svg({'groups':[proof['groups'][i]for i in indexes]})
  for local,index in enumerate(indexes):value=value.replace('data-original-raw="'+str(local+1)+'"','data-source-original-raw="'+str(index+1)+'"')
  return value.replace('<svg ','<svg data-logical-view="'+('whole'if count is None else str(count))+'" ',1)
 def page(*params):
  value=original_page(*params).replace(' raw ',' logical ').replace('원raw','원논리가설').replace('원proof exact','fixed original source or authored whole raw21 correction;25-role viewing hypothesis, not mapping approval')
  return value.replace('<nav>','<p>원25획 시계75화면과 공개guide 경계에 근거한 미승인 보기 가설입니다. 전체25 current/prefix를 직접 대조해야 합니다. 새 geometry/engine/guide bridge는 없습니다.</p><nav>',1)
 def selection(route,query):
  require(route!='/checks','legacy checks do not approve logical mapping');return original_selection(route,query)
 shared.source_svg=source_svg;shared.page=page;shared.selection=selection
 if args.check_only:
  old_domestic=shared.domestic_svg;shared.domestic_svg=lambda*unused:'<svg data-contract-placeholder="no-private-media"/>'
  try:
   require(shared.page('/whole',shared.selection('/whole',''),sources,{}).count('<section class="panel">')==3,'whole three-panel contract')
   for pen in range(1,26):
    for mode in['single','prefix']:
     selected=shared.selection('/compare','source=authored&domestic='+str(pen)+'&raw='+str(pen)+'&dview='+mode+'&rview='+mode);require(shared.page('/compare',selected,sources,{}).count('<section class="panel">')==2,'actual logical current/prefix page')
   for pen,ids,paths in[(1,[1,2],5),(2,[3,4],6),(12,[14,15],4),(18,[21],7),(20,[24,25],3)]:
    value=shared.source_svg(candidate,pen,False);require(value.count('<path')==paths and all('data-source-original-raw="'+str(n)+'"'in value for n in ids),'compound original membership')
   require(shared.FETCH_COUNT==0,'pure mapping contract cannot fetch')
  finally:shared.domestic_svg=old_domestic
  print(json.dumps({'glyph':'纘','logicalPens':25,'sourceRawGroups':30,'sourceDrawingCalls':31,'sourcePolygons':62,'all29DrawingRawUsedExactlyOnce':True,'nonDrawingRaw22Preserved':True,'singleAndPrefixPages':50,'compoundPens':[1,2,12,20],'newGeometry':False,'privateHTTP':0,'server':0,'mappingApproved':False,'runtimeApplied':False},ensure_ascii=False));return
 require(args.port is not None and 0<=args.port<=65535,'explicit local port');old=sys.argv
 try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
 finally:sys.argv=old
if __name__=='__main__':main()
