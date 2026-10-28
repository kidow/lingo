"""Closed static pair adapter for two unapproved public-source terminal0 trials."""
import copy,hashlib,importlib.util,json,math,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent.parent
CASES=[{"config":"docs/hanja-source-raw-compare-u71c4-terminal0-2026-10-28/config.json","semanticSHA256":"9ed058dcf9fe0b5a340a4b7c2de22b4e9f6cb3bffad091e6b2d3b3e20c225fb8"},{"config":"docs/hanja-source-raw-compare-u9dd6-terminal0-2026-10-28/config.json","semanticSHA256":"3d9c2a8dd12272a6f4c0f72760818469a8a59aa0d6e4936f5e47f6a223b99fc3"}]
SHARED='docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py'
SHARED_SHA='ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d'
def require(x,message):
    if not x:raise ValueError(message)
def digest(b):return hashlib.sha256(b).hexdigest()
def pinned(p):
    value=(ROOT/p).resolve();require(value.is_relative_to(ROOT) and not Path(p).is_absolute(),'repository-relative fixed path required');return value
def load_sources(config,config_path):
    case=[x for x in CASES if config_path==ROOT/x['config']];require(len(case)==1,'one exact terminal pair config required')
    semantic={k:v for k,v in config.items()if k!='launcherSHA256'}
    require(digest(json.dumps(semantic,sort_keys=True,separators=(',',':'),ensure_ascii=False).encode())==case[0]['semanticSHA256'],'fixed terminal config semantic required')
    require(config['candidateOriginalRoot']is False and config['candidateActualAuthoredEngineCapture']is True and config['originalRecordsEdited']is False and config['nativeApproval']is False and config['runtimeApplied']is False and all(v is False for v in config['approval'].values()),'authored capture is not original-source or approved playback')
    require(config['sharedServe']=={'path':SHARED,'SHA256':SHARED_SHA},'fixed shared shell only')
    for p,h in config['inputSHA256'].items():require(digest(pinned(p).read_bytes())==h,'terminal input changed: '+p)
    metadata=json.loads(pinned(config['metadata']).read_bytes());require(metadata['dictionary']==config['domestic'],'exact publisher metadata only')
    override=json.loads(pinned(config['sourceOverride']).read_bytes());source=json.loads(pinned(override['originalSource']['path']).read_bytes())
    require(override['authored']is True and override['locallyAuthoredRoot']is True and override['originalRecordsEdited']is False and override['sourceCoordinatesInventedOrChanged']is False,'separate local source namespace only')
    changes=[];references=[]
    for name,record in override['records'].items():
        original=name.removeprefix('local_').removesuffix('_terminal0_20261028');require(original in source['records'],'closed original ancestor clone')
        before=source['records'][original]['data'].split('$');after=record['data'].split('$');require(len(before)==len(after),'same row count')
        for row,(a,b)in enumerate(zip(before,after),1):
            aa,bb=a.split(':'),b.split(':');require(len(aa)==len(bb),'same field count')
            for i,(x,y)in enumerate(zip(aa,bb)):
                if x!=y:
                    entry=(original,row,i+1,x,y)
                    (references if aa[0]=='99' and i==7 else changes).append(entry)
    cell=override['changedNumericSourceCell'];require(changes==[(cell['originalOwner'],3,3,cell['from'],'0')],'one exact terminal numeric cell only')
    require(references==[(x['originalOwner'],x['rowOneBased'],8,x['from'],x['to'])for x in override['referenceRewires']],'only declared reference rewires')
    out={}
    for label,spec in config['sourceRoots'].items():
        b=pinned(spec['file']).read_bytes();require(digest(b)==spec['fileSHA256'],'actual capture pin')
        proof=json.loads(b);require(sorted(proof)==['defaults','engineHashes','engineRevision','groups','trace'],'actual full5 required')
        require((len(proof['groups']),sum(map(len,proof['trace'])),sum(len(g['polygons'])for g in proof['groups']))==(spec['rawGroups'],spec['drawingCalls'],spec['polygons']),'exact raw/call/P counts')
        require([g['polygons']for g in proof['groups']]==[[p for c in row for p in c['polygons']]for row in proof['trace']],'all raw/trace/P correspondence')
        for group in proof['groups']:
            for poly in group['polygons']:require(len(poly)>=3 and all(set(p)=={'x','y','off'} and p['off']==0 and all(type(p[k])in[int,float]and math.isfinite(p[k])for k in['x','y'])for p in poly),'fixed finite original off0 polygon representation')
        out[label]=proof
    require(list(out)==['original','authored'],'original plus authored only')
    a,b=out['original'],out['authored'];require(a['engineRevision']==b['engineRevision'] and a['engineHashes']==b['engineHashes'] and a['defaults']==b['defaults'],'same pinned engine/defaults')
    affected=[i for i,(x,y)in enumerate(zip(a['groups'],b['groups']))if x!=y or a['trace'][i]!=b['trace'][i]]
    require(len(a['groups'])==len(b['groups']) and len(affected)==1 and all(i in config['allowedRawGroupsZeroBased']for i in affected),'one actual raw inside declared logical slot; not compatibility approval')
    return out
def run_terminal(args,config,config_path):
    sources=load_sources(config,config_path)
    def guards():
        require(digest(config_path.read_bytes())==args.config_sha,'config bytes changed')
        require(digest(pinned('scripts/hanja-raw-static-compare.py').read_bytes())==config['launcherSHA256'],'exact ROOT-integrated launcher pin required')
        require(digest(pinned(SHARED).read_bytes())==SHARED_SHA,'shared shell changed')
        for p,h in config['inputSHA256'].items():require(digest(pinned(p).read_bytes())==h,'terminal input changed: '+p)
    guards()
    if args.check_only:
        print(json.dumps({'glyph':config['glyph'],'actualPairs':2,'originalRoot':config['sourceRoots']['original']['root'],'authoredRoot':config['sourceRoots']['authored']['root'],'engine':0,'HTTP':0,'server':0,'nativeApproval':False}));return
    spec=importlib.util.spec_from_file_location('hanja_terminal_static_shared',pinned(SHARED));shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);require(shared.FETCH_COUNT==0,'no preparatory publisher fetch')
    shared.CONFIG=config;shared.HERE=config_path.parent;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_svg,original_page,original_selection=shared.source_svg,shared.page,shared.selection
    def source_svg(proof,count=None,prefix=False):
        value=original_svg(proof,count,prefix)
        return value.replace('data-original-raw=','data-authored-engine-raw=')if proof is sources['authored']else value
    def page(*params):
        return original_page(*params).replace('원authored raw ','저자 terminal0 raw ').replace('원original raw ','공개 원본 raw ').replace('원proof exact','exact source pins; candidate is actual locally-authored engine capture, not public-original whole')
    def selection(route,query):
        require(route!='/checks','legacy original-proof checks do not approve authored terminal data');return original_selection(route,query)
    shared.source_svg=source_svg;shared.page=page;shared.selection=selection
    argv=sys.argv
    try:sys.argv=[str(pinned(SHARED)),'--port',str(args.port)];shared.main()
    finally:sys.argv=argv
