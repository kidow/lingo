from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re

R=Path(__file__).resolve().parents[2]
FIX='docs/hanja-source-original-u51de-base-2026-10-27/fixtures-draft.json'
PATH='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py'
AXIS='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py'
CLOCK='docs/hanja-official-media-compare-u51de-2026-10-27/native-clock-review.json'
PINS={FIX:'623a80e6bbd7363bfb171731d60f730d9f9c412ec07a94afd3eccd7a30ed1255',PATH:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',AXIS:'db903056c1375705fd8133ee79dcc3ff5450c519012a3f249881af9abebdbd29',CLOCK:'546aea0545adb15ef3fbea741da903881d3b4573b086b2432bf9a1581b33a7c5'}
sha=lambda b:hashlib.sha256(b).hexdigest()
for p,h in PINS.items():assert sha((R/p).read_bytes())==h,p
f=json.loads((R/FIX).read_text())['u51de']
assert f['root']==f['identity']['root']=='u51de'
assert f['identity']['fileSHA256']=='59adc1112c7e6456b67ecc86c6583f11475287bf71af5a8f0a6e429d5dddc91c'
assert f['compiledSHA256']=='c9ac1ef9b6c55526779f888cfd12f31622fad344ed20cbbf3dfa0dabee7caea1'
assert f['sourceGroups'][8:]==[[11,18],[3,4],[5],[6],[7],[8],[9],[10]]
before=json.dumps(f,sort_keys=True)
env={'F':F,'re':re}
def pure(path,names):
    source=(R/path).read_text()
    for node in ast.parse(source).body:
        if isinstance(node,ast.FunctionDef)and node.name in names:
            exec(compile(ast.get_source_segment(source,node),path+'::pure-only','exec'),env)
pure(PATH,{'polygons','cross','state','area'})
pure(AXIS,{'section','merge','intersection','audit'})
polygons,state,area=[env[k]for k in['polygons','state','area']]
def enc(v):
    if isinstance(v,F):return str(v)
    if isinstance(v,(list,tuple)):return[enc(x)for x in v]
    if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
    return v
def audit(outline,axis,direction):
    env['fixture']={'strokes':[[{'outline':outline}]]}
    return env['audit'](1,axis,direction)
def first_contact(outline,prior,axis,direction):
    pp=polygons(outline);value=(min if direction=='increasing' else max)(p[axis]for poly in pp for p in poly)
    current=env['merge']([v for poly in pp for v in env['section'](poly,axis,value)])
    previous=env['merge']([v for poly in polygons(prior)for v in env['section'](poly,axis,value)])
    covered=all(any(a<=low<=high<=b for a,b in previous)for low,high in current)
    overlap=sum((max(F(0),min(high,b)-max(low,a))for low,high in current for a,b in previous),F(0))
    return {'coordinate':value,'currentIntervals':current,'closedPriorCovered':covered,'positiveLineOverlap':overlap}
rows=[]
for pen,mask,axis,direction in[(9,1,1,'increasing'),(9,2,0,'increasing'),(10,1,0,'increasing'),(10,2,1,'increasing'),(11,1,0,'increasing'),(12,1,1,'increasing'),(12,2,1,'increasing'),(12,3,0,'increasing')]+[(p,1,1,'increasing')for p in[13,14,15,16]]:
    segment=f['strokes'][pen-1][mask-1];a=audit(segment['outline'],axis,direction)
    row={'pen':pen,'mask':mask,'axis':'xy'[axis]+('+'if direction=='increasing'else'-'),'P':a['sourcePolygons'],'events':a['eventCount'],'slabs':a['openSlabCount'],'prefixEligible':a['halfPlanePrefixGeometryEligible'],'failedSections':a['failureCount']}
    if mask>1:row['priorContact']=first_contact(segment['outline'],f['strokes'][pen-1][mask-2]['outline'],axis,direction)
    if pen>=13:
        values=list(map(F,re.findall(r'[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',segment['revealPath'])))
        assert len(values)==6
        ys=values[1::2];dy=[ys[1]-ys[0],ys[2]-ys[1]]
        assert all(v>0 for v in dy)
        row['originalQYControlDeltas']=dy
        row['originalQStartInsideOwnP']=any(state(tuple(values[:2]),p)>=0 for p in polygons(segment['outline']))
        row['roundCapHoldObservedByROOT']=True
    rows.append(row)
m=f['strokes'][11][2];parts=['M'+s.strip()for s in m['outline'].split('M')[1:]];assert len(parts)==3
body,hook=' '.join(parts[:2]),parts[2]
bp,hp=polygons(body),polygons(hook)
call=f['fullProof']['trace'][6][2]
assert call['kind']=='cdDrawLine'and call['args']==[151,127,182,127,6,5]
trace=[[(F(str(v['x']))/2,F(str(v['y']))/2)for v in p]for p in call['polygons']]
trace=[([p[0]]+p[:0:-1])if sum(a[0]*b[1]-a[1]*b[0]for a,b in zip(p,p[1:]+p[:1]))<0 else p for p in trace]
assert trace==polygons(m['outline'])
bodyAudit=audit(body,0,'increasing');hookAudit=audit(hook,1,'decreasing')
assert bodyAudit['halfPlanePrefixGeometryEligible']and hookAudit['halfPlanePrefixGeometryEligible']
assert min(y for p in bp for x,y in p)==F('60.5')==max(y for p in hp for x,y in p)
assert max(x for x,y in bp[0])==min(x for x,y in bp[1])==F(91)
upStart=first_contact(hook,body,1,'decreasing')
assert upStart['closedPriorCovered']and upStart['positiveLineOverlap']==3
bodyStart=first_contact(body,f['strokes'][11][1]['outline'],0,'increasing')
assert bodyStart['closedPriorCovered']and bodyStart['positiveLineOverlap']>0
bodyArea=sum(map(area,bp),F(0));hookArea=sum(map(area,hp),F(0))
assert bodyArea==F('103.8')and hookArea==25
hookInfo={'originalRaw':6,'originalCall':3,'flags':[6,5],'HGuideOnlyDoesNotProveUP':True,'originalPSelection':{'bodyAndCap':[1,2],'UP':[3]},'bodyBand':[F('75.5'),F('60.5'),F('94'),F('66.5')],'UPBounds':[F(88),F(48),F(92),F('60.5')],'bodyXPlusPrefix':True,'UPYMinusPrefix':True,'bodyStartPriorContact':bodyStart,'bodyToUPPositiveEdgeLength':F(3),'bodyUPIntersectionArea':F(0),'strictInteriorPointWindowSeedUnavailable':True,'bodyArea':bodyArea,'UPArea':hookArea,'candidateAuthoredClock':{'bodyShareByOriginalHLengthAndUPHeight':F('15.5')/(F('15.5')+F('12.5')),'alternativeBodyAreaShare':bodyArea/(bodyArea+hookArea),'adopted':False,'originalPublisherClockEquivalent':False},'singleWholeOriginalDWithTwoAuxiliaryRectClipsFeasible':True,'PGuideFlagsWeightsChanged':False,'freshNativeRequired':True}
assert before==json.dumps(f,sort_keys=True)
out={'schema':'hanja-u51de-base-source-feasibility-9-16/v1','glyph':'凞','root':'u51de','date':'2026-10-27','inputs':PINS,'compiledSHA256':f['compiledSHA256'],'clockReusedScenes':50,'nativeReplayed':0,'sourceOrderAndMembershipRechecked':False,'method':'Load only pinned pure polygon and exact event/slab axis helpers; source-P selections stay unchanged. Positive prior interface is distinct from a strict-interior point-window seed. Axis geometry eligibility does not approve direction or authored time.','masks':rows,'logical12Mask3':hookInfo,'renderContract':['First body-only band X-prefix; never expose original UP P3 during that phase.','After actual body/cap completion, add original P3 Y-decreasing prefix from the positive shared edge.','Paint complete original D once; use auxiliary clip union only. Require same-frame actually opaque mask2 predecessor.','Whole-source completion and fresh forward direction/transition need browser approval.'],'sourcePGuideFlagsWeightsChanged':False,'newBridge':False,'newGuide':False,'newLogicalStroke':False,'engine':0,'compiler':0,'SSR':0,'server':0,'nativeApproval':False,'runtimeApplied':False,'verifierSHA256':sha(Path(__file__).read_bytes())}
out['method']='Pinned pure exact axis sections; positive-edge contact differs from interior-window seed. Original source clock reused; authored phase needs native approval.'
out['renderContract']={'singleWholeOriginalD':True,'bodyPhaseUPArea':0,'phaseOrder':['originalP1+P2 X+','originalP3 Y-'],'priorMask2OpaqueSameFrameRequired':True,'finalWholeSourceExactRequired':True,'freshBrowserRequired':True}
print(json.dumps(enc(out),ensure_ascii=False,separators=(',',':')))
