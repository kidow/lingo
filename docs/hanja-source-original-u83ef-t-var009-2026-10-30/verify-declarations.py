#!/usr/bin/env python3
# Original declaration closure only: no engine, P generation, placement or source edits.
import json,hashlib
from pathlib import Path
from fractions import Fraction as F
ROOT=Path.cwd();PATH='docs/hanja-source-original-u83ef-t-var009-2026-10-30/source-record.json';r=json.loads((ROOT/PATH).read_text());records=r['records']
assert r['sourceArchive']['SHA256']=='7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62'and r['sourceArchive']['bytes']==63801771
assert set(records)=={'u83ef-t','u83ef-var-009','u8279-t03','u2ffb-u2ffb-u4e05-u2011f-ufa5e','u2ffb-u2ffb-u4e05-u2011f-ufa5e-var-001','u2ffb-u4e05-u2011f','u5341'}
for name,item in records.items():
 assert item['name']==name and hashlib.sha256(item['originalDumpLine'].encode()).hexdigest()==item['originalDumpLineSHA256'];parts=[x.strip()for x in item['originalDumpLine'].split('|')];assert parts==[name,item['related'],item['data']]
def flatten(name,m=(F(1),F(1),F(0),F(0)),chain=(),stack=()):
 assert name not in stack and name in records;out=[]
 for i,row in enumerate(records[name]['data'].split('$'),1):
  v=row.split(':')
  if v[0]=='99':
   assert v[1:3]==['0','0']and len(v)==11 and v[8:]==['0','0','0'];a,b=(F(v[5])-F(v[3]))/200,(F(v[6])-F(v[4]))/200;assert a>0 and b>0;out+=flatten(v[7],(m[0]*a,m[1]*b,m[0]*F(v[3])+m[2],m[1]*F(v[4])+m[3]),chain+({'caller':name,'row':i,'originalData':row},),stack+(name,))
  else:
   assert v[0]=='1'and len(v)==7;x1,y1,x2,y2=map(F,v[3:]);out.append({'record':name,'row':i,'originalData':row,'callerChain':chain,'nominalGuide':[[str(m[0]*x+m[2]),str(m[1]*y+m[3])]for x,y in[(x1,y1),(x2,y2)]],'axis':'H'if y1==y2 else'V'if x1==x2 else'down-slanted-V'})
 return out
out=[]
for root,expectedGap in[('u83ef-t',F('31.94')),('u83ef-var-009',F('29.046'))]:
 leaves=flatten(root);grass,body=leaves[:4],leaves[4:];assert len(grass)==4 and len(body)==8 and len(leaves)==12;assert[g['axis']for g in grass]==['H','down-slanted-V','H','down-slanted-V'];assert sum(p['axis']=='H'for p in body)==5 and sum(p['axis']=='V'for p in body)==3
 levels={}
 for leaf in body:
  if leaf['axis']=='H':
   p,q=[[F(x)for x in xy]for xy in leaf['nominalGuide']];levels.setdefault(p[1],[]).append((min(p[0],q[0]),max(p[0],q[0]),leaf['record'],leaf['row']))
 paired=[(y,sorted(v))for y,v in levels.items()if len(v)==2];assert len(paired)==1;y,pair=paired[0];gap=pair[1][0]-pair[0][1];assert gap==expectedGap and gap>0
 out.append({'root':root,'completeOriginalDeclarationClosure':True,'root99Children':2,'grassLeaves':4,'bodyLeaves':8,'totalSourceLeaves':12,'grass4PlusBody7Equals11':False,'bodyAxisCounts':{'H':5,'V':3},'nominalHorizontalLevels':[{'y':str(y),'segments':[[str(a),str(b)]for a,b,_,_ in v]}for y,v in sorted(levels.items())],'splitMiddleHLevel':str(y),'splitMiddleHSegments':[[str(a),str(b)]for a,b,_,_ in pair],'positiveNominalGuideGap':str(gap),'singleOriginalHAtSplitLevel':False,'originalLongOtherH':'u2ffb-u4e05-u2011f row2 =1:0:0:15:111:185:111 at a different level','allLeafInstances':leaves,'actualFilledContinuityKnown':False,'actualEngineCalls':None,'filledP':None})
print(json.dumps({'schema':'hanja-complete-declaration-shape-readiness/v1','glyph':'爗','donorGlyph':'華','sourceRecord':{'path':PATH,'SHA256':hashlib.sha256((ROOT/PATH).read_bytes()).hexdigest()},'roots':out,'sourceRecordsUnchanged':True,'engine':0,'server':0,'nativeApproval':False,'runtimeApplied':False},ensure_ascii=False))
