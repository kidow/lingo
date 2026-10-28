#!/usr/bin/env python3
# One whole original point, positive similarity only; closed static candidate.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
from fractions import Fraction
import hashlib,importlib.util,json,argparse
ROOT=Path(__file__).resolve().parents[2]
F='docs/hanja-authored-mm-u8517-components-2026-10-28/'
SELF=F+'static-point5-down-v2.py';CONFIG=F+'static-config-point5-down-v2.json'
BASE='scripts/hanja-static-authored-mm-grass.py';BASE_SHA='5ed786b8e1f3edcf0d99cde29b9f83724f3c5d55fde873fa20b901296a27b831'
OLD_CONFIG=F+'static-config.json';OLD_SHA='a1653cde0584f27ba46f09a7f38309c08cabba3d7b49c0240e3d738856ee8790'
RECIPE_SHA='c9a8ce1441bb7d47eff26847b13a00cae63431b3e1379430677272d9d1071c1d';READY_SHA='e83c7991b5e7c3238118006a60fb28e9bc948b73e79c063d5a13f138cba08fb3'
def require(ok,message):
 if not ok:raise ValueError(message)
def sha(raw):return hashlib.sha256(raw).hexdigest()
require(sha((ROOT/BASE).read_bytes())==BASE_SHA,'unchanged source reader required')
spec=importlib.util.spec_from_file_location('hanja_zhe_same_point_static_base',ROOT/BASE);base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
def sources(config,old_config,old):
 r=base.read_pin(config['recipe']);ready=base.read_pin(config['readiness']);previous=old['recipe'];record=old['recipient']
 require(r['previousRecipe']==old_config['recipe']and ready['recipe']==config['recipe']and r['variantId']=='authored15-u8517-samepoint5-down-similarity-v2','separate exact point candidate required')
 require(r['sources']==previous['sources']and len(r['parts'])==15 and all(r['parts'][i]==previous['parts'][i]for i in range(15)if i!=4),'same original documents and other14 parts required')
 require(all(r['placements'][k]==previous['placements'][k]for k in previous['placements']),'unchanged grass matrices required')
 p=r['parts'][4];require((p['logicalOneBased'],p['source'],p['sourceStrokeOneBased'],p['sourceMedianOneBased'])==(5,'recipient',4,4),'same original complete point4 required')
 M=list(map(Fraction,p['matrixExact']));require(M==list(map(Fraction,['253/549','-299/549','299/549','253/549','-68537/1098','341866/549']))and list(map(float,M))==p['matrix'],'fixed exact whole-point similarity')
 require(M[0]==M[3]and M[1]==-M[2]and M[0]*M[3]-M[1]*M[2]>0,'positive similarity only')
 median=record['medians'][3];net=[median[-1][i]-median[0][i]for i in[0,1]];require(M[0]*net[0]+M[2]*net[1]==0 and M[1]*net[0]+M[3]*net[1]<0,'original median net aligned down in MM Y-up frame')
 require(sha(record['strokes'][3].encode())==r['point5Correction']['sourceOriginalDSHA256']and sha(json.dumps(median,separators=(',',':')).encode())==r['point5Correction']['sourceOriginalMedianSHA256'],'original D and all median points unchanged')
 require(r['previousBody11Binding']==previous['body11Binding']and r['body10Binding']['sourceStrokeOneBased']==list(range(5,15)),'restrict identity body claim to unchanged10')
 require(all(v is False for v in ready['approval'].values())and all(r[k]is False for k in['originalWhole','originalMMWhole','mappingApproved','directionApproved','nativeApproval','runtimeApplied']),'all approvals remain false')
 old['recipe']=r;return old
def main():
 parser=argparse.ArgumentParser(description='蔗 same complete point5 downward similarity: whole/current/prefix static only')
 parser.add_argument('--config',required=True);parser.add_argument('--config-sha',required=True);parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
 require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'assertion-enabled local execution')
 path=base.pinned(args.config);require(path==ROOT/CONFIG and sha(path.read_bytes())==args.config_sha,'one fixed config')
 old_raw=base.pinned(OLD_CONFIG).read_bytes();require(sha(old_raw)==OLD_SHA,'unchanged previous config')
 old_config=json.loads(old_raw);case=base.validate_config(old_config,base.pinned(OLD_CONFIG));old_sources=base.read_sources(old_config,case)
 config=json.loads(path.read_bytes());expected={**old_config,'kind':'authored-mm-zhe-point5-down-v2','root':'lingo-u8517-authored-mm-point5-down-v2','recipe':{'path':F+'recipe-point5-down-v2.json','SHA256':RECIPE_SHA},'readiness':{'path':F+'readiness-point5-down-v2.json','SHA256':READY_SHA},'baseAdapter':{'path':BASE,'SHA256':BASE_SHA},'previousConfig':{'path':OLD_CONFIG,'SHA256':OLD_SHA},'launcherSHA256':sha(base.pinned(SELF).read_bytes())};require(config==expected,'closed exact v2 config')
 def guards():
  require(sha(path.read_bytes())==args.config_sha and sha(base.pinned(SELF).read_bytes())==config['launcherSHA256'],'config/adapter pins')
  require(sha(base.pinned(BASE).read_bytes())==BASE_SHA and sha(base.pinned(base.SHARED).read_bytes())==base.SHARED_SHA,'existing code pins')
  for item in[config['recipe'],config['readiness'],config['publisherMetadata']]:base.read_pin(item)
 guards();data=sources(config,old_config,old_sources);base.check_scene(data)
 for prefix in[False,True]:
  scene=base.ET.fromstring(base.authored_svg(data,5,prefix));parts=data['recipe']['parts'][:5]if prefix else[data['recipe']['parts'][4]]
  require([g[0].get('d')for g in scene[0]]==[data[p['source']]['strokes'][p['sourceStrokeOneBased']-1]for p in parts],'only complete original D paints')
 meta=base.read_pin(config['publisherMetadata']);require(meta['dictionary']==config['domestic']and config['authoredParts']==15,'fixed publisher15')
 if args.check_only:
  require(base.selection('/whole','',15)is None and base.selection('/compare','domestic=5&part=5&dview=single&sview=prefix',15)==(5,5,False,True),'existing bounded selections')
  print(json.dumps({'guardPass':True,'glyph':'蔗','parts':15,'changedLogical':5,'sameOriginalPath':4,'otherPartsUnchanged':14,'positiveSimilarity':True,'DOrMedianEdited':False,'all15SelectorsAvailable':True,'HTTP':0,'server':0,'nativeApproval':False}));return
 shared=base.module('hanja_zhe_same_point_shared',base.pinned(base.SHARED));require(shared.FETCH_COUNT==0,'no preparatory private fetch')
 shared.CONFIG={'glyph':'蔗','catalogStrokes':15,'domestic':config['domestic']};shared.ROOT=ROOT;shared.HERE=path.parent;shared.guards=guards;shared.load_sources=lambda:data;shared.selection=lambda route,query:base.selection(route,query,15)
 def page(route,selected,current,domestic):
  text=base.page(shared,config,route,selected,current,domestic);notice='<p>NEW LOCALLY AUTHORED point5 hypothesis: the same original MM point4 complete D and median receive one positive similarity. Original public control-bbox top/bottom/center are maintained, net median is downward, and all other14 parts are unchanged. No crop, redrawing, private-coordinate fitting or native/runtime approval.</p>'
  require(text.count('</h1>')==1,'existing page hook');return text.replace('</h1>','</h1>'+notice,1)
 shared.page=page;argv=sys.argv
 try:sys.argv=[str(base.pinned(base.SHARED)),'--port',str(args.port)];shared.main()
 finally:sys.argv=argv
if __name__=='__main__':main()
