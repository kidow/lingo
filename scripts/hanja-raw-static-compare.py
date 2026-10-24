#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Pinned parameter launcher for the unchanged static raw comparator.
No rendering/XML/route function is copied. Original file/source assertions remain.
The original sidecar-only guards are explicitly replaced by equivalent config-SHA,
launcher-SHA, shared-code-SHA and all input-SHA guards; nothing is silently skipped.
"""
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,importlib.util,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py'
SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
PAGE_CSS_OLD=".grid{display:grid;grid-template-columns:repeat(2,540px);gap:10px;width:max-content}.panel{width:540px}svg{display:block;width:520px;height:520px;min-width:520px;min-height:520px}"
PAGE_CSS_NEW=".grid{display:grid;grid-template-columns:minmax(0,520px);gap:10px;width:100%;max-width:520px}.panel{width:100%;max-width:520px}svg{display:block;width:520px;height:520px;max-width:100%;min-width:0;min-height:0}"
FIVE=['defaults','engineHashes','engineRevision','groups','trace']
def require(value,message):
    if not value:raise ValueError(message)
def digest(raw):return hashlib.sha256(raw).hexdigest()
def pinned_path(value):
    require(type(value)is str and 0<len(value)<512,'relative source path required')
    p=Path(value);require(not p.is_absolute()and'..'not in p.parts,'relative source path only')
    q=(ROOT/p).resolve();require(q.is_relative_to(ROOT)and q==ROOT/p and q.is_file(),'fixed repository file only')
    return q
def hexsha(value):return type(value)is str and re.fullmatch(r'[0-9a-f]{64}',value)is not None
def validate_original_empty_body3(spec,path):
    # Explicit original u7050 opt-in only; the default full5 contract is unchanged.
    require(spec['root']=='u7050' and spec['file']=='docs/hanja-goal-glyphwiki-batch1017-2026-10-13/engine-whole-u7050.json' and spec['fileSHA256']=='48c62ed4fbebc6fd0bb1103b93c578054532103f253d97e08949f84ed62a5e30','exact original u7050 body3 required')
    fixed=spec['existingMatchingFull5']
    require(fixed=={'file':'docs/hanja-goal-glyphwiki-batch1017-2026-10-13/engine-proof.json','fileSHA256':'f8bb397b969b2d0df140586790f7372c622d4286c09c30aa6e2e442c9ec4eeec','proofKeys':FIVE},'exact original full5 basename and pin required')
    require(spec['nonDrawingRawRows']==[{'raw':5,'sourceKind':0,'calls':0,'polygons':0}],'exact original empty raw5 contract required')
    require(spec['proofKeys']==['defaults','groups','trace'] and spec['proofKind']=='body3-bound-to-existing-exact-full5','explicit bound body3 required')
    require((spec['rawGroups'],spec['drawingCalls'],spec['polygons'])==(24,23,49),'original24/23/49 counts required')
    raw=path.read_bytes();whole=pinned_path(fixed['file']).read_bytes()
    require(digest(raw)==spec['fileSHA256'] and digest(whole)==fixed['fileSHA256'],'original body/full5 pins changed')
    body,full=json.loads(raw),json.loads(whole)
    require(sorted(body)==['defaults','groups','trace'] and sorted(full)==FIVE and all(body[k]==full[k] for k in ['defaults','groups','trace']),'single original full5/body3 mismatch')
    groups,trace=body['groups'],body['trace']
    require(len(groups)==len(trace)==24 and groups[4]=={'raw':[0,0,0,0,None,None,None,None,None,None,None],'polygons':[]} and trace[4]==[],'raw5 kind0/P0/trace0 must agree')
    require(all(len(row)==(0 if i==4 else 1) for i,row in enumerate(trace)) and sum(map(len,trace))==23,'original empty row and23 calls required')
    require([len(g['polygons']) for g in groups]==spec['polygonCounts'] and sum(map(lambda g:len(g['polygons']),groups))==49,'original49 polygons required')
    require(all(g['raw'][0]!=0 and len(g['polygons'])>0 for i,g in enumerate(groups) if i!=4),'only raw5 is non-drawing')
    require([g['polygons'] for g in groups]==[[p for call in row for p in call['polygons']] for row in trace],'original raw/trace/P correspondence changed')

def validate_original_full8_u7cbb(spec,path):
    import math
    require(spec['root']=='u7cbb' and spec['file']=='docs/hanja-goal-glyphwiki-batch830-2026-10-13/engine-whole-u7cbb.json' and spec['fileSHA256']=='8546b3ac8bd9f17e4e3c7f28b6adb4618f24e648f51f7359c7883497d0c90a19','exact original 粻 full8 identity required')
    require(spec['proofKind']=='actual-full8-u7cbb-direct' and spec['proofKeys']==['defaults', 'engineHashes', 'engineRevision', 'groups', 'sourceArchiveSHA256', 'sourceProofFile', 'sourceRoot', 'trace'],'exact 粻 full8 keys/kind required')
    raw=path.read_bytes();require(digest(raw)==spec['fileSHA256'],'original 粻 full8 file changed')
    proof=json.loads(raw);require(sorted(proof)==['defaults', 'engineHashes', 'engineRevision', 'groups', 'sourceArchiveSHA256', 'sourceProofFile', 'sourceRoot', 'trace'],'complete original 粻 full8 required')
    require(proof['sourceRoot']=='u7cbb' and proof['sourceProofFile']=='engine-whole-u7cbb.json' and proof['sourceArchiveSHA256']=='7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62','original 粻 provenance3 changed')
    require(proof['engineRevision']=='49232bac0348fe815f4200d4116ab7917e0db47f','original 粻 revision changed')
    require(spec['sourceProofIdentity']=={'sourceRoot':'u7cbb','sourceProofFile':'engine-whole-u7cbb.json','sourceProofFileSha256':digest(raw)},'exact 粻 static identity3 changed')
    require(len(proof['groups'])==len(proof['trace'])==spec['rawGroups']==15 and sum(len(row)for row in proof['trace'])==spec['drawingCalls']==15,'original 粻 raw15/calls15 required')
    require([g['polygons']for g in proof['groups']]==[[p for call in row for p in call['polygons']]for row in proof['trace']],'original 粻 group/trace polygons differ')
    require([len(g['polygons'])for g in proof['groups']]==spec['polygonCounts'] and sum(len(g['polygons'])for g in proof['groups'])==spec['polygons']==30,'original 粻 polygon30 counts required')
    for group in proof['groups']:
        require(sorted(group)==['polygons','raw'],'original 粻 group shape changed')
        for poly in group['polygons']:
            require(len(poly)>=3,'original 粻 polygon size')
            for p in poly:require(sorted(p)==['off','x','y'] and p['off']==0 and all(type(p[k])in[int,float] and math.isfinite(p[k])for k in['x','y']),'only original 粻 finite off0 polygons')
    return proof

def validate_hkcs_m84d1_original_rows(proof,capture):
    # Pinned kagedf.js e6d7cb5e... case0 calls dfTransform; raw7 null a2/a3 select no transform branch or draw call.
    require(sorted(proof)==FIVE and proof['engineRevision']=='49232bac0348fe815f4200d4116ab7917e0db47f' and proof['engineHashes']==capture['engine']['actualLoadedHashes'] and len(proof['engineHashes'])==8,'exact captured HK full5 engine required')
    groups,trace=proof['groups'],proof['trace']
    require(len(groups)==len(trace)==17 and groups[6]=={'raw':[0,None,None,None,None,None,None,None,None,None,None],'polygons':[]} and trace[6]==[],'exact HK raw7 zero-kind/empty trace/P must remain')
    require(all(len(row)==(0 if i==6 else 1) for i,row in enumerate(trace)) and sum(map(len,trace))==16,'only original HK raw7 may have no drawing call')
    require(all(len(g['raw'])==11 and g['raw'][0]!=0 and len(g['polygons'])>0 for i,g in enumerate(groups) if i!=6),'no additional HK zero or empty rows allowed')
    require([len(g['polygons'])for g in groups]==[2,2,2,2,2,2,0,1,1,2,2,1,1,1,3,3,2] and [g['polygons']for g in groups]==[[p for call in row for p in call['polygons']]for row in trace],'exact original HK raw/trace/P correspondence required')

def validate_exact_hkcs_m84d1_capture(config,label,spec,path):
    # Only this captured provider identity may use its actual local artifact filename and raw7.
    require(config['glyph']=='蓑' and ord(config['glyph'])==0x84d1 and list(config['sourceRoots'])==['selected'] and label=='selected' and config['sourceRoots']['selected']==spec,'exact isolated HK 蓑 source required')
    require(set(spec)=={'root','file','fileSHA256','proofKeys','proofKind','sourceProofIdentity','rawGroups','drawingCalls','polygonCounts','polygons'},'exact HK source fields required')
    file='docs/hanja-actual-engine-capture-u84d1-hkcs-2026-10-24/engine-whole-u84d1-hkcs.json'
    capture_file='docs/hanja-actual-engine-capture-u84d1-hkcs-2026-10-24/capture.json'
    pin='ab7220e5d130e893e4e82462f8b60e4891d2e542278a3cec744f4d797c8d70ee'
    capture_pin='f45841941deac00fee286fe015ee36a5468dfc134500a9132102d7943888e202'
    require(spec['root']=='hkcs_m84d1' and spec['file']==file and spec['fileSHA256']==pin and path==pinned_path(file),'exact provider root and actual HK file/pin required; no alias')
    require(spec['proofKeys']==FIVE and spec['proofKind']=='actual-full5-direct' and spec['sourceProofIdentity']=={'sourceRoot':'hkcs_m84d1','sourceProofFile':'engine-whole-u84d1-hkcs.json','sourceProofFileSha256':pin},'exact original provider identity3 required')
    require(config['inputSHA256'].get(file)==pin and config['inputSHA256'].get(capture_file)==capture_pin,'whole and capture byte pins required')
    raw=path.read_bytes();capture_raw=pinned_path(capture_file).read_bytes()
    require(digest(raw)==pin and digest(capture_raw)==capture_pin,'captured original HK bytes changed')
    capture=json.loads(capture_raw);source=capture['source'];records=source['records']
    require(capture['glyph']=='蓑' and capture['providerRoot']=='hkcs_m84d1' and capture['localArtifactTag']=='u84d1-hkcs' and capture['localArtifactTagIsProviderRoot']is False,'provider root must not be replaced by artifact tag')
    require(source['recordNames']==['hkcs_m84d1','hkcs_m8279-p03-s01','hkcs_m8870'] and source['versions']==[['hkcs_m84d1',2],['hkcs_m8279-p03-s01',2],['hkcs_m8870',1]] and source['missing']==[] and records['hkcs_m84d1']['name']=='hkcs_m84d1' and records['hkcs_m84d1']['related']=='U+84D1' and records['hkcs_m8870']['data'].split('$')[2]=='0','exact provider closure and original $0 metadata required')
    require(capture['capture']['engineBuhinRoot']=='hkcs_m84d1' and capture['capture']['aliasInsertedIntoEngine']is False and capture['capture']['originalMetadataNotRemoved']is True,'actual provider capture without alias or deletion required')
    require((spec['rawGroups'],spec['drawingCalls'],spec['polygons'])==(17,16,29) and spec['polygonCounts']==[2,2,2,2,2,2,0,1,1,2,2,1,1,1,3,3,2],'exact HK17raw16calls29P required')
    validate_hkcs_m84d1_original_rows(json.loads(raw),capture)

def validate_original_full5_u727c(config,label,spec,path):
    # One pinned original full5 with its actual zero-draw raw4; no general sparse-source exemption.
    require(config['glyph']=='牼' and config['catalogStrokes']==11 and list(config['sourceRoots'])==['selected'] and label=='selected' and config['sourceRoots']['selected']==spec,'exact isolated 牼 comparison required')
    require(set(spec)=={'root','file','fileSHA256','proofKeys','proofKind','sourceProofIdentity','rawGroups','drawingCalls','polygonCounts','polygons'},'exact original 牼 full5 fields required')
    original='docs/hanja-source-original-full-u727c-2026-10-23/engine-proof.json'
    alias='docs/hanja-source-raw-compare-u727c-2026-10-23/engine-whole-u727c.json'
    pin='89859c169dac0332017f79e4c1b39424063e39caa95f3306d972318e0f0702db'
    require(spec['root']=='u727c' and spec['file']==alias and spec['fileSHA256']==pin and path==pinned_path(alias),'exact original 牼 full5 path/pin required')
    require(spec['proofKeys']==FIVE and spec['proofKind']=='actual-full5-direct' and spec['sourceProofIdentity']=={'sourceRoot':'u727c','sourceProofFile':'engine-whole-u727c.json','sourceProofFileSha256':pin},'actual 牼 full5 and identity3 required')
    require(config['inputSHA256'].get(alias)==pin and config['inputSHA256'].get(original)==pin,'both original 牼 byte pins required')
    require((spec['rawGroups'],spec['drawingCalls'],spec['polygons'])==(15,14,32) and spec['polygonCounts']==[3,2,2,3,0,2,3,2,3,2,3,2,2,1,2],'original 牼15raw14calls32P required')
    raw=path.read_bytes();original_raw=pinned_path(original).read_bytes()
    require(digest(raw)==pin and digest(original_raw)==pin and raw==original_raw,'original 牼 alias must be byte-identical actual full5')
    proof=json.loads(raw);require(sorted(proof)==FIVE and proof['engineRevision']=='49232bac0348fe815f4200d4116ab7917e0db47f' and len(proof['engineHashes'])==8,'complete original 牼 full5 required')
    groups,trace=proof['groups'],proof['trace']
    require(len(groups)==len(trace)==15 and groups[4]=={'raw':[0,0,0,0,None,None,None,None,None,None,None],'polygons':[]} and trace[4]==[],'original 牼 raw4 zero-draw row must remain')
    require(all(len(row)==(0 if i==4 else 1) for i,row in enumerate(trace)) and sum(map(len,trace))==14,'only original 牼 raw4 may have no call')
    require(all(g['raw'][0]!=0 and len(g['polygons'])>0 for i,g in enumerate(groups) if i!=4),'no other 牼 zero-draw rows allowed')
    require([len(g['polygons']) for g in groups]==spec['polygonCounts'] and [g['polygons']for g in groups]==[[p for call in row for p in call['polygons']]for row in trace],'original 牼 raw/trace/P correspondence changed')

def validate_original_full5_u7d8c(config,label,spec,path):
    # One pinned original full5 with its actual zero-draw raw8; no general sparse-source exemption.
    require(config['glyph']=='綌' and config['catalogStrokes']==13 and list(config['sourceRoots'])==['selected'] and label=='selected' and config['sourceRoots']['selected']==spec,'exact isolated 綌 comparison required')
    require(set(spec)=={'root','file','fileSHA256','proofKeys','proofKind','sourceProofIdentity','rawGroups','drawingCalls','polygonCounts','polygons'},'exact original 綌 full5 fields required')
    original='docs/hanja-source-original-full-u7d8c-2026-10-23/engine-proof.json'
    alias='docs/hanja-source-raw-compare-u7d8c-2026-10-23/engine-whole-u7d8c.json'
    pin='d025868602d7d0e1de4a06676126549ba88bd304e3d1695098b85d673b1d6713'
    require(spec['root']=='u7d8c' and spec['file']==alias and spec['fileSHA256']==pin and path==pinned_path(alias),'exact original 綌 full5 path/pin required')
    require(spec['proofKeys']==FIVE and spec['proofKind']=='actual-full5-direct' and spec['sourceProofIdentity']=={'sourceRoot':'u7d8c','sourceProofFile':'engine-whole-u7d8c.json','sourceProofFileSha256':pin},'actual 綌 full5 and identity3 required')
    require(config['inputSHA256'].get(alias)==pin and config['inputSHA256'].get(original)==pin,'both original 綌 byte pins required')
    require((spec['rawGroups'],spec['drawingCalls'],spec['polygons'])==(17,16,34) and spec['polygonCounts']==[3,2,3,3,2,1,3,2,0,3,2,3,2,1,1,2,1],'original 綌17raw16calls34P required')
    raw=path.read_bytes();original_raw=pinned_path(original).read_bytes()
    require(digest(raw)==pin and digest(original_raw)==pin and raw==original_raw,'original 綌 alias must be byte-identical actual full5')
    proof=json.loads(raw);require(sorted(proof)==FIVE and proof['engineRevision']=='49232bac0348fe815f4200d4116ab7917e0db47f' and len(proof['engineHashes'])==8,'complete original 綌 full5 required')
    groups,trace=proof['groups'],proof['trace']
    require(len(groups)==len(trace)==17 and groups[8]=={'raw':[0,0,0,0,None,None,None,None,None,None,None],'polygons':[]} and trace[8]==[],'original 綌 raw8 zero-draw row must remain')
    require(all(len(row)==(0 if i==8 else 1) for i,row in enumerate(trace)) and sum(map(len,trace))==16,'only original 綌 raw8 may have no call')
    require(all(g['raw'][0]!=0 and len(g['polygons'])>0 for i,g in enumerate(groups) if i!=8),'no other 綌 zero-draw rows allowed')
    require([len(g['polygons']) for g in groups]==spec['polygonCounts'] and [g['polygons']for g in groups]==[[p for call in row for p in call['polygons']]for row in trace],'original 綌 raw/trace/P correspondence changed')

def validate_exact_u6f7e_body3(config,label,spec,path):
    # Only the five fixed original 潾 bodies; the unchanged shared loader preserves three keys.
    fixed={"base":{"root":"u6f7e","file":"docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e.json","fileSHA256":"0a1bf9390d7fbda582d0adc85f4ea06897b485e0000c78604ac249af1e980f14","proofKeys":["defaults","groups","trace"],"proofKind":"selected-body3-only","sourceProofIdentity":{"sourceRoot":"u6f7e","sourceProofFile":"engine-whole-u6f7e.json","sourceProofFileSha256":"0a1bf9390d7fbda582d0adc85f4ea06897b485e0000c78604ac249af1e980f14"},"rawGroups":18,"drawingCalls":18,"polygonCounts":[2,2,2,1,2,3,2,2,1,2,3,1,2,2,2,1,2,2],"polygons":34},"k":{"root":"u6f7e-k","file":"docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e-k.json","fileSHA256":"f71e6368f7e92fb4714cabccb3b552586b5bf17406aa8bddec2197d07370879a","proofKeys":["defaults","groups","trace"],"proofKind":"selected-body3-only","sourceProofIdentity":{"sourceRoot":"u6f7e-k","sourceProofFile":"engine-whole-u6f7e-k.json","sourceProofFileSha256":"f71e6368f7e92fb4714cabccb3b552586b5bf17406aa8bddec2197d07370879a"},"rawGroups":18,"drawingCalls":18,"polygonCounts":[2,2,2,1,2,3,2,2,1,2,3,1,2,2,2,1,2,2],"polygons":34},"g":{"root":"u6f7e-g","file":"docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e-g.json","fileSHA256":"8477f855136689c136d166cb76f59780604a29f31e6a61d2399a2e8dff5f3d69","proofKeys":["defaults","groups","trace"],"proofKind":"selected-body3-only","sourceProofIdentity":{"sourceRoot":"u6f7e-g","sourceProofFile":"engine-whole-u6f7e-g.json","sourceProofFileSha256":"8477f855136689c136d166cb76f59780604a29f31e6a61d2399a2e8dff5f3d69"},"rawGroups":18,"drawingCalls":18,"polygonCounts":[2,2,2,1,2,3,2,2,1,2,3,1,2,2,2,2,2,2],"polygons":35},"vs0":{"root":"u6f7e-ue0100","file":"docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e-ue0100.json","fileSHA256":"877bbb703a71ab5cc91491a313f56ae4f28d56fafd14f4388615d6f18ce4a4e2","proofKeys":["defaults","groups","trace"],"proofKind":"selected-body3-only","sourceProofIdentity":{"sourceRoot":"u6f7e-ue0100","sourceProofFile":"engine-whole-u6f7e-ue0100.json","sourceProofFileSha256":"877bbb703a71ab5cc91491a313f56ae4f28d56fafd14f4388615d6f18ce4a4e2"},"rawGroups":18,"drawingCalls":18,"polygonCounts":[2,2,2,1,2,3,2,2,1,2,3,1,2,2,2,1,2,2],"polygons":34},"vs3":{"root":"u6f7e-ue0103","file":"docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e-ue0103.json","fileSHA256":"9a5117a7ea2621c743aa9f89039be992e7f2cae754a0850afc7e9fe3c2437116","proofKeys":["defaults","groups","trace"],"proofKind":"selected-body3-only","sourceProofIdentity":{"sourceRoot":"u6f7e-ue0103","sourceProofFile":"engine-whole-u6f7e-ue0103.json","sourceProofFileSha256":"9a5117a7ea2621c743aa9f89039be992e7f2cae754a0850afc7e9fe3c2437116"},"rawGroups":18,"drawingCalls":18,"polygonCounts":[2,2,2,1,2,3,2,2,1,2,3,1,2,2,2,1,2,2],"polygons":34}}
    inputs={"docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e.json":"0a1bf9390d7fbda582d0adc85f4ea06897b485e0000c78604ac249af1e980f14","docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e-k.json":"f71e6368f7e92fb4714cabccb3b552586b5bf17406aa8bddec2197d07370879a","docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e-g.json":"8477f855136689c136d166cb76f59780604a29f31e6a61d2399a2e8dff5f3d69","docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e-ue0100.json":"877bbb703a71ab5cc91491a313f56ae4f28d56fafd14f4388615d6f18ce4a4e2","docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-whole-u6f7e-ue0103.json":"9a5117a7ea2621c743aa9f89039be992e7f2cae754a0850afc7e9fe3c2437116","docs/hanja-goal-glyphwiki-batch1076-2026-10-13/engine-proof.json":"c9d75a60950006976eb2b7fc398082bd4a3d3b3bba5f0eaea6a6eb874156a8d2","docs/hanja-goal-glyphwiki-batch1076-2026-10-13/metadata.json":"fa140dc4b88415741df9e1e3984c033b2c50205485e88e1e56e2b15ebc9ad441","docs/hanja-goal-glyphwiki-batch1076-2026-10-13/source-hold.json":"b3de1a84e4160f03f45e2a6cc9a860ba4020081f30a7e0c81f5254bd45829c0a","docs/hanja-goal-glyphwiki-batch1076-2026-10-13/sources.json":"dd68751ff493f5c36e1f95c7639bc68713c0bebf175ad18f5e3827c6ca242910"}
    require(config['glyph']=='潾' and config['catalogStrokes']==15 and config['defaultSource']=='base' and list(config['sourceRoots'])==list(fixed) and config['sourceRoots']==fixed,'exact five original 潾 bodies required')
    require(label in fixed and spec==fixed[label] and config['inputSHA256']==inputs,'fixed original 潾 identity and complete pins required')
    require(path==pinned_path(fixed[label]['file']) and digest(path.read_bytes())==fixed[label]['fileSHA256'],'original 潾 body bytes changed')
    body=json.loads(path.read_bytes())
    require(sorted(body)==['defaults','groups','trace'] and len(body['groups'])==len(body['trace'])==18 and all(len(row)==1 for row in body['trace']),'original 潾18raw/18call/three-key only')
    require([len(g['polygons']) for g in body['groups']]==spec['polygonCounts'] and [g['polygons'] for g in body['groups']]==[[p for call in row for p in call['polygons']] for row in body['trace']],'original 潾 raw/trace/P correspondence changed')

def main():
    require(__debug__ and sys.flags.optimize==0,'optimized assertion-free execution forbidden')
    parser=argparse.ArgumentParser(description='Pinned static whole/raw/domestic comparison; ROOT starts HTTP.')
    parser.add_argument('--config',required=True);parser.add_argument('--config-sha',required=True);parser.add_argument('--port',type=int,default=0);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    require(0<=args.port<=65535 and hexsha(args.config_sha),'fixed port/config SHA required')
    config_path=pinned_path(args.config);require(config_path.name=='config.json'and config_path.parent.parent==ROOT/'docs'and config_path.parent.name.startswith('hanja-source-raw-compare-'),'comparison config location required')
    config_bytes=config_path.read_bytes();require(len(config_bytes)<=65536 and digest(config_bytes)==args.config_sha,'config SHA changed')
    config=json.loads(config_bytes)
    keys={'schema','glyph','catalogStrokes','sourceViewBox','defaultSource','sourceRoots','domestic','inputSHA256','holdSummary','launcherSHA256','sharedServe','noPartialAnimation','nativeApproval','runtimeApplied','guardMode','host','layoutMode'}
    require(type(config)is dict and set(config)==keys and config['schema']=='hanja-shared-static-raw-compare/v1','exact config fields required')
    require(type(config['glyph'])is str and len(config['glyph'])==1 and type(config['catalogStrokes'])is int and 1<=config['catalogStrokes']<=128,'glyph/count required')
    require(config['sourceViewBox']=='0 0 200 200'and config['host']=='127.0.0.1'and config['layoutMode']=='stacked520-css-only','original source/local host required')
    require(config['nativeApproval']is False and config['runtimeApplied']is False and config['noPartialAnimation']is True and config['guardMode']=='explicit-parameter-pins-v1','static unapproved scope required')
    require(config['sharedServe']=={'path':SHARED,'SHA256':SHARED_SHA}and hexsha(config['launcherSHA256']),'shared code identity changed')
    roots=config['sourceRoots'];require(type(roots)is dict and 1<=len(roots)<=8 and config['defaultSource']in roots,'selected original roots required')
    for label,spec in roots.items():
        require(re.fullmatch(r'[A-Za-z][A-Za-z0-9_-]{0,31}',label)is not None and type(spec)is dict,'static root label required')
        source_keys={'root','file','fileSHA256','proofKeys','proofKind','sourceProofIdentity','rawGroups','drawingCalls','polygonCounts','polygons'}
        bound_body='existingMatchingFull5'in spec or'nonDrawingRawRows'in spec
        require(set(spec)==(source_keys|{'existingMatchingFull5','nonDrawingRawRows'} if bound_body else source_keys),'exact source spec fields required')
        original_hkcs_m84d1=(config['glyph']=='蓑' and list(roots)==['selected'] and label=='selected' and spec['root']=='hkcs_m84d1')
        if original_hkcs_m84d1:validate_exact_hkcs_m84d1_capture(config,label,spec,pinned_path(spec['file']))
        require(type(spec['root'])is str and (re.fullmatch(r'u[0-9a-f]{4,6}(?:-[a-z0-9-]+)?',spec['root'])is not None or original_hkcs_m84d1),'original root identity required')
        path=pinned_path(spec['file']);original_u995f=(config['glyph']=='饟'and config['catalogStrokes']==26 and list(roots)==['selected']and spec['root']=='u995f'and spec['file']=='docs/hanja-goal-glyphwiki-batch701-2026-10-12/engine-proof.json'and spec['fileSHA256']=='ce533cc6fd25af9b6058423b1efafd878f8e40f682fc614432d92aced651139d'and spec['proofKind']=='actual-full5-direct');require((path.name=='engine-whole-'+spec['root']+'.json'or original_u995f or original_hkcs_m84d1)and hexsha(spec['fileSHA256']),'actual whole file required')
        if bound_body:validate_original_empty_body3(spec,path)
        elif spec['proofKind']=='selected-body3-only':validate_exact_u6f7e_body3(config,label,spec,path)
        elif spec['proofKind']=='actual-full8-u7cbb-direct':validate_original_full8_u7cbb(spec,path)
        else:require(spec['proofKeys']==FIVE and spec['proofKind']=='actual-full5-direct','single actual full5 only; no header synthesis')
        require(spec['sourceProofIdentity']=={'sourceRoot':spec['root'],'sourceProofFile':path.name,'sourceProofFileSha256':spec['fileSHA256']},'exact source identity3 required')
        original_u727c=(config['glyph']=='牼' and config['catalogStrokes']==11 and list(roots)==['selected'] and label=='selected' and spec['root']=='u727c')
        if original_u727c:validate_original_full5_u727c(config,label,spec,path)
        original_u7d8c=(config['glyph']=='綌' and config['catalogStrokes']==13 and list(roots)==['selected'] and label=='selected' and spec['root']=='u7d8c')
        if original_u7d8c:validate_original_full5_u7d8c(config,label,spec,path)
        require(type(spec['rawGroups'])is int and 1<=spec['rawGroups']<=128 and type(spec['drawingCalls'])is int and ((not bound_body and (spec['drawingCalls']>=spec['rawGroups'] or original_u727c or original_u7d8c or original_hkcs_m84d1))or(bound_body and spec['rawGroups']==24 and spec['drawingCalls']==23)),'raw/call counts required')
        require(type(spec['polygonCounts'])is list and len(spec['polygonCounts'])==spec['rawGroups']and all(type(n)is int and n>=0 for n in spec['polygonCounts'])and type(spec['polygons'])is int and sum(spec['polygonCounts'])==spec['polygons'],'original polygon counts required')
    domestic=config['domestic'];require(type(domestic)is dict and set(domestic)=={'url','status','bytes','sha256','clips','glyph','privateMediaSaved'}and domestic['glyph']==config['glyph']and domestic['status']==200 and domestic['clips']==config['catalogStrokes']and domestic['privateMediaSaved']is False and type(domestic['bytes'])is int and 0<domestic['bytes']<=1048576 and hexsha(domestic['sha256']),'pinned domestic metadata required')
    require(type(domestic['url'])is str and re.fullmatch(r'http://img\.e-hanja\.kr/hanjaSvg/aniSVG/[0-9A-Fa-f]{4}/[0-9A-Fa-f]{4,6}\.svg',domestic['url'])is not None and domestic['url'].rsplit('/',1)[-1].lower()==format(ord(config['glyph']),'x')+'.svg','fixed domestic source only')
    require(type(config['inputSHA256'])is dict and all(type(p)is str and hexsha(h)for p,h in config['inputSHA256'].items()),'input pins required')
    for spec in roots.values():
        require(config['inputSHA256'].get(spec['file'])==spec['fileSHA256'],'selected whole absent from input pins')
        if 'existingMatchingFull5'in spec:require(config['inputSHA256'].get(spec['existingMatchingFull5']['file'])==spec['existingMatchingFull5']['fileSHA256'],'original matching full5 absent from input pins')
    def parameter_guards():
        require(digest(config_path.read_bytes())==args.config_sha,'config changed')
        require(digest(Path(__file__).read_bytes())==config['launcherSHA256'],'launcher changed')
        require(digest(pinned_path(SHARED).read_bytes())==SHARED_SHA,'shared code changed')
        for path,expected in config['inputSHA256'].items():require(digest(pinned_path(path).read_bytes())==expected,'original input changed: '+path)
    parameter_guards()
    # Main guard prevents HTTP, source projection or dictionary access during import.
    spec=importlib.util.spec_from_file_location('hanja_static_raw_shared',pinned_path(SHARED));shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared)
    require(shared.FETCH_COUNT==0 and callable(shared.main)and callable(shared.load_sources),'unchanged shared entry contract required')
    shared.CONFIG=config;shared.HERE=config_path.parent;shared.ROOT=ROOT
    # Complete original eight-key proof is returned unchanged; old full5/body3 path stays original.
    if any(item['proofKind']=='actual-full8-u7cbb-direct'for item in roots.values()):
        require(config['glyph']=='粻' and config['catalogStrokes']==14 and list(roots)==['selected'],'exact isolated 粻 full8 comparison only')
        def load_original_u7cbb_full8():
            parameter_guards()
            return {'selected':validate_original_full8_u7cbb(roots['selected'],pinned_path(roots['selected']['file']))}
        shared.load_sources=load_original_u7cbb_full8
    # Explicit replacement of sidecar location guards; all original source/XML/route guards stay byte-exact.
    shared.guards=parameter_guards
    # Explicit CSS-only response wrapper: original page function and every SVG byte stay unchanged.
    original_page=shared.page
    def stacked_page(*params):
        original=original_page(*params);require(original.count(PAGE_CSS_OLD)==1,'exact original CSS hook changed')
        page=original.replace(PAGE_CSS_OLD,PAGE_CSS_NEW,1)
        require(page.replace(PAGE_CSS_NEW,PAGE_CSS_OLD,1)==original,'CSS inverse changed original page/SVG bytes')
        return page
    shared.page=stacked_page
    if args.check_only:
        sources=shared.load_sources();require(shared.FETCH_COUNT==0,'preparation cannot fetch domestic media')
        print(json.dumps({'guardMode':config['guardMode'],'sharedFunctionCopies':0,'roots':list(sources),'domesticCount':config['catalogStrokes'],'raw':{k:len(p['groups'])for k,p in sources.items()},'HTTP':0,'server':0,'sourceCompiler':0,'engine':0,'projection':0,'nativeApproval':False}));return
    original_argv=sys.argv
    try:
        sys.argv=[str(pinned_path(SHARED)),'--port',str(args.port)]
        shared.main()
    finally:sys.argv=original_argv
if __name__=='__main__':main()
