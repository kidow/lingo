#!/usr/bin/env python3
# Narrow same-glyph own17-to11 static variant; shared grass adapter unchanged.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
from fractions import Fraction
import hashlib,importlib.util,json,argparse
ROOT=Path(__file__).resolve().parents[2]
F='docs/hanja-authored-mm-u85aa-components-2026-10-28/'
SELF=F+'static-own17-to11-v2.py'
CONFIG=F+'static-config-own17-to11-v2.json'
BASE='scripts/hanja-static-authored-mm-grass.py'
BASE_SHA='5ed786b8e1f3edcf0d99cde29b9f83724f3c5d55fde873fa20b901296a27b831'
OLD_CONFIG=F+'static-config.json'
OLD_CONFIG_SHA='4dc3d01e3aae7e3464b366291749b2b0baa1bdb12a8cbae7318c7eafe5e5f25e'
RECIPE_SHA='804631f48eb91d581fad8b0222811391e760c564dac39d02e4ebf7de924487db'
READY_SHA='f0354e214d0454ad99d2b498c1e8e2432b5b68390e76dedd536d10696a3e934e'
def require(ok,message):
 if not ok:raise ValueError(message)
def sha(raw):return hashlib.sha256(raw).hexdigest()
require(sha((ROOT/BASE).read_bytes())==BASE_SHA,'unchanged three-grass source reader required')
spec=importlib.util.spec_from_file_location('hanja_xin_own_vertical_base',ROOT/BASE)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
def original_sources():
 raw=base.pinned(OLD_CONFIG).read_bytes();require(sha(raw)==OLD_CONFIG_SHA,'unchanged previous config required')
 config=json.loads(raw);case=base.validate_config(config,base.pinned(OLD_CONFIG));return config,base.read_sources(config,case)
def new_sources(config):
 previous,old=original_sources();r=base.read_pin(config['recipe']);ready=base.read_pin(config['readiness']);original=old['recipe'];record=old['recipient']
 require(config['recipe']=={'path':F+'recipe-own17-to11-v2.json','SHA256':RECIPE_SHA}and config['readiness']=={'path':F+'readiness-own17-to11-v2.json','SHA256':READY_SHA},'one exact own-vertical candidate required')
 require(r['variantId']=='authored17-u85aa-grass4-ownlogical17-to11-vertical-v2'and r['previousRecipe']==previous['recipe']and ready['recipe']==config['recipe'],'separate v2 recipe required')
 require(r['sources']==original['sources']and len(r['parts'])==17 and all(r['parts'][i]==original['parts'][i]for i in range(17)if i!=10),'all other16 parts and original source documents unchanged')
 require(all(r['placements'][k]==original['placements'][k]for k in original['placements']),'grass4 matrices and their source facts unchanged')
 p=r['parts'][10];require((p['logicalOneBased'],p['source'],p['sourceStrokeOneBased'],p['sourceMedianOneBased'])==(11,'recipient',16,16),'same-glyph originalpath16 from logical17 only')
 require(r['parts'][16]==original['parts'][16]and original['parts'][10]['sourceStrokeOneBased']==10,'original logical17 unchanged and target originalpath10 retained historically')
 M=list(map(Fraction,p['matrixExact']));require(M==list(map(Fraction,['1','0','1/411','260/411','-162706/411','47524/411']))and list(map(float,M))==p['matrix'],'one prescribed positive affine required')
 def point(q):return[M[0]*q[0]+M[2]*q[1]+M[4],M[1]*q[0]+M[3]*q[1]+M[5]]
 require(point(record['medians'][15][2])==list(map(Fraction,record['medians'][9][1]))and point(record['medians'][15][3])==list(map(Fraction,record['medians'][9][3])),'public trunk anchor binding required')
 require(M[0]*M[3]-M[1]*M[2]>0 and p['authoredPlacement']is True,'positive complete-path placement only')
 require(r['previousBody13Binding']==original['body13Binding']and len(r['body12Binding']['sourceStrokeOneBased'])==12,'body identity claim restricted to unchanged12')
 require(sha(record['strokes'][15].encode())==r['ownStrokeReplacement']['donorOriginalDSHA256']and sha(json.dumps(record['medians'][15],separators=(',',':')).encode())==r['ownStrokeReplacement']['donorOriginalMedianSHA256'],'complete original donorD/median remain unchanged')
 require(all(v is False for v in ready['approval'].values())and all(r[k]is False for k in['originalWhole','originalMMWhole','mappingApproved','directionApproved','nativeApproval','runtimeApplied']),'no approval inherited')
 old['recipe']=r;return old
def main():
 parser=argparse.ArgumentParser(description='Closed 薪 same-glyph own17-to11 whole/current/prefix hypothesis')
 parser.add_argument('--config',required=True);parser.add_argument('--config-sha',required=True);parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
 require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'assertion-enabled local execution required')
 path=base.pinned(args.config);require(path==ROOT/CONFIG and sha(path.read_bytes())==args.config_sha,'exact new config required');config=json.loads(path.read_bytes())
 expected,_=original_sources();expected.update({'kind':'authored-mm-xin-own17-to11-v2','root':'lingo-u85aa-authored-mm-own17-to11-v2','recipe':{'path':F+'recipe-own17-to11-v2.json','SHA256':RECIPE_SHA},'readiness':{'path':F+'readiness-own17-to11-v2.json','SHA256':READY_SHA},'baseAdapter':{'path':BASE,'SHA256':BASE_SHA},'previousConfig':{'path':OLD_CONFIG,'SHA256':OLD_CONFIG_SHA},'launcherSHA256':sha(base.pinned(SELF).read_bytes())})
 require(config==expected,'closed exact new source configuration required')
 def guards():
  require(sha(path.read_bytes())==args.config_sha and sha(base.pinned(SELF).read_bytes())==config['launcherSHA256'],'new config/adapter pins')
  require(sha(base.pinned(BASE).read_bytes())==BASE_SHA and sha(base.pinned(base.SHARED).read_bytes())==base.SHARED_SHA,'existing code pins')
  for item in[config['recipe'],config['readiness'],config['publisherMetadata']]:base.read_pin(item)
 guards();sources=new_sources(config);base.check_scene(sources)
 for n in[11,17]:
  for prefix in[False,True]:
   node=base.ET.fromstring(base.authored_svg(sources,n,prefix));parts=sources['recipe']['parts'][:n]if prefix else[sources['recipe']['parts'][n-1]]
   require([g[0].get('d')for g in node[0]]==[sources[p['source']]['strokes'][p['sourceStrokeOneBased']-1]for p in parts],'whole original selectedD only')
 meta=base.read_pin(config['publisherMetadata']);require(meta['dictionary']==config['domestic']and config['authoredParts']==17,'unchanged publisher17 descriptor')
 if args.check_only:
  require(base.selection('/whole','',17)is None and base.selection('/compare','domestic=11&part=11&dview=single&sview=prefix',17)==(11,11,False,True),'existing closed whole/current/prefix routes')
  print(json.dumps({'guardPass':True,'glyph':'薪','parts':17,'changedLogical':11,'sourceOriginalPath':16,'donorExistingLogical':17,'otherPartsUnchanged':16,'DOrMedianEdited':False,'sourceYFlipCount':1,'HTTP':0,'server':0,'nativeApproval':False}));return
 shared=base.module('hanja_xin_own_vertical_shared',base.pinned(base.SHARED));require(shared.FETCH_COUNT==0,'no preparatory publisher fetch')
 shared.CONFIG={'glyph':'薪','catalogStrokes':17,'domestic':config['domestic']};shared.ROOT=ROOT;shared.HERE=path.parent;shared.guards=guards;shared.load_sources=lambda:sources;shared.selection=lambda route,query:base.selection(route,query,17)
 def page(route,selected,data,domestic):
  raw=base.page(shared,config,route,selected,data,domestic);note='<p>NEW UNAPPROVED own-stroke hypothesis: logical11 reuses complete original 薪 path16 from existing logical17 under one positive affine. Original logical17 and other16 parts are unchanged. No stem crop, sourceD/median edit, contact or runtime approval.</p>'
  require(raw.count('</h1>')==1,'fixed existing page hook');return raw.replace('</h1>','</h1>'+note,1)
 shared.page=page;argv=sys.argv
 try:sys.argv=[str(base.pinned(base.SHARED)),'--port',str(args.port)];shared.main()
 finally:sys.argv=argv
if __name__=='__main__':main()
