import argparse,hashlib,importlib.util,json,sys,html
from fractions import Fraction as F
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
EXPECTED=json.loads("{\"schema\":\"hanja-authored-legacy-whole-raw-Y-shrink-static-comparison/v1\",\"glyph\":\"怰\",\"catalogStrokes\":8,\"dictionaryPlaybackStrokes\":8,\"sourceViewBox\":\"0 0 200 200\",\"defaultSource\":\"selected\",\"sourceRoots\":{\"selected\":{\"root\":\"u6030-legacy-raw6-headgap1-Yshrink-v1\",\"file\":\"docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/fixtures-static-draft.json\",\"fileSHA256\":\"201f2fef977751f23cb306dbb4f5e2f3ccd59a4774fd407b984072dcbdce34dd\",\"proofKind\":\"authored-original-P-arrays-plus-whole-raw-Y-matrix-not-engine-capture\",\"separateTrace\":{\"path\":\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/draw-trace.json\",\"SHA256\":\"98731d24ca0671b759673c24437cdfe84c0f0628d5830ebf99598c4f98f80412\"},\"rawGroups\":10,\"drawingCalls\":10,\"polygonCounts\":[2,2,2,2,2,3,2,3,3,2],\"polygons\":23}},\"domestic\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6030.svg\",\"status\":200,\"bytes\":4270,\"sha256\":\"598274aff021b8a5d49185e5a46fe4181f58c8fa2f93ae487366c911fb4893c4\",\"clips\":8,\"glyph\":\"怰\",\"privateMediaSaved\":false},\"host\":\"127.0.0.1\",\"noPartialAnimation\":true,\"canonicalMappingApproved\":false,\"nativeApproval\":false,\"runtimeApplied\":false,\"wholeOnly\":true,\"holdSummary\":\"Explicit author whole raw6 Yshrink89/93 with fixedbottom97.5: head minY53 isgap1 belowHmax52; contactsraw4/5removed, raw7positivecontactretained, no newcontacts. Allother9raw exact. Both guidehandoffs and temporal/native approval remain unresolved.\",\"sharedServe\":{\"path\":\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\",\"SHA256\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"},\"inputSHA256\":{\"docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/recipe.json\":\"b8c7b860fffe220482bff75b5a082f2174c4ffae5b2def7e5de6228f15de2daf\",\"docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/fixtures-static-draft.json\":\"201f2fef977751f23cb306dbb4f5e2f3ccd59a4774fd407b984072dcbdce34dd\",\"docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/public-math.json\":\"4dbbddcc888640d462df81835bb0bdc9e60627ba3171aada90ed92692fd753f8\",\"docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-public-contact.py\":\"2e10934196e91fb93140e31d3313ec0f1cca7f35e87cb4b0de05b6b0c88cacac\",\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/engine-proof.json\":\"fef26dbd710dac54ff97f9040e0636f5e3f45fd0687ee47f46f8ae5e444e2242\",\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/draw-trace.json\":\"98731d24ca0671b759673c24437cdfe84c0f0628d5830ebf99598c4f98f80412\",\"docs/hanja-source-raw-compare-u6030-legacy-original-2026-10-29/native-original-review.json\":\"223fa75a3402d165795926f53e85ad792c52b5e9c9e7eff09004fc607a07f625\",\"docs/hanja-official-media-compare-u6030-2026-10-29/native-clock-review.json\":\"8a380f3a012be3d6db1429ac810c383c4d8bef20c53e38f8677042bc414490b8\",\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"},\"sourceRootWasAuthored\":true,\"candidateOriginalRoot\":false,\"isOriginalEngineCapture\":false,\"originalLegacyProof4\":{\"path\":\"docs/hanja-goal-glyphwiki-batch126-2026-09-27/engine-proof.json\",\"SHA256\":\"fef26dbd710dac54ff97f9040e0636f5e3f45fd0687ee47f46f8ae5e444e2242\"},\"placements\":[{\"sourceRawOneBased\":6,\"matrixExact\":[\"1\",\"0\",\"0\",\"89/93\",\"0\",\"130/31\"],\"determinantExact\":\"89/93\",\"applyTo\":[\"allWholeOriginalP\",\"wholeOriginalGuide\"],\"sourceMinY\":\"51\",\"newMinY\":\"53\",\"sourceAndNewMaxY\":\"195/2\",\"headGapToUpperH\":\"1\",\"lostOriginalContacts\":[4,5],\"preservedPositiveAreaContact\":[7],\"newContacts\":[]}],\"recipe\":{\"path\":\"docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/recipe.json\",\"SHA256\":\"b8c7b860fffe220482bff75b5a082f2174c4ffae5b2def7e5de6228f15de2daf\"},\"publicMath\":{\"path\":\"docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/public-math.json\",\"SHA256\":\"4dbbddcc888640d462df81835bb0bdc9e60627ba3171aada90ed92692fd753f8\"}}")
SHARED=EXPECTED['sharedServe']['path'];SOURCE=EXPECTED['sourceRoots']['selected']['file'];TRACE=EXPECTED['sourceRoots']['selected']['separateTrace']['path'];ORIGINAL=EXPECTED['originalLegacyProof4']['path']
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='怰 authored whole raw6 positive-Yshrink/static; guide holds preserved');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted local port')
    config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config.get('adapterSHA256'),'config/adapter changed')
        require({k:v for k,v in config.items()if k!='adapterSHA256'}==EXPECTED,'exact original怰 legacy4/trace comparison context required')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'changed input: '+path)
    guards();proof=json.loads((ROOT/SOURCE).read_bytes())
    trace=json.loads((ROOT/TRACE).read_bytes());original=json.loads((ROOT/ORIGINAL).read_bytes());require(sorted(original)==['defaults','engineRevision','groups','hashes']and len(original['hashes'])==8 and original['engineRevision']=='49232bac0348fe815f4200d4116ab7917e0db47f','originallegacy4 identity');require(proof['schema']=='hanja-legacy-proof4-whole-raw-affine-static-draft/v1'and proof['placements']==EXPECTED['placements']and proof['groups']==original['groups']and proof['trace']==trace and proof['locallyAuthoredRoot']is True and proof['originalWhole']is False and proof['isOriginalEngineCapture']is False and proof['isActualLocallyAuthoredEngineCapture']is False,'exact authored whole-group transform context');require(len(proof['groups'])==len(trace)==10 and len(sum(trace,[]))==10 and sum(len(g['polygons'])for g in proof['groups'])==23,'unchanged23 originalP and10calls')
    require([sum((c['polygons']for c in row),[])for row in trace]==[g['polygons']for g in proof['groups']],'original traceP binding')
    sources={'selected':proof};shared=module('xuan_authored_raw6_static_shell',ROOT/SHARED);require(shared.FETCH_COUNT==0,'private assets only at ROOT server start')
    shared.CONFIG={**config,'catalogStrokes':config['dictionaryPlaybackStrokes']};shared.HERE=HERE;shared.ROOT=ROOT;shared.guards=guards;shared.load_sources=lambda:sources
    original_source_svg=shared.source_svg
    def source_svg(proof,count=None,prefix=False):
        require(proof is sources['selected'],'one exact authored matrix source')
        indexes=list(range(len(proof['groups'])))if count is None else list(range(count))if prefix else[count-1]
        out=['<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 200 200"><g fill="#222">']
        matrix_by_raw={v['sourceRawOneBased']:v['matrixExact']for v in proof['placements']}
        for index in indexes:
            group=proof['groups'][index];source_raw=proof['sourceRawIndicesOneBased'][index];matrix=matrix_by_raw.get(source_raw)
            transform=(' transform="matrix('+' '.join(format(float(F(x)),'.17g')for x in matrix)+')"')if matrix else''
            out.append('<g data-original-raw="'+str(index+1)+'" data-source-raw="'+str(source_raw)+'" data-polygons="'+str(len(group['polygons']))+'"'+transform+'>')
            for poly in group['polygons']:out.append('<path d="'+html.escape(shared.polygon_path(poly),quote=True)+'"/>')
            out.append('</g>')
        return ''.join(out)+'</g></svg>'
    shared.source_svg=source_svg
    original_page,original_selection=shared.page,shared.selection
    def page(*params):
        text=original_page(*params);notice='<p>AUTHORED 怰 raw6 wholeYshrink candidate:10raw/10calls/23originalP arrays with1matrix. Headgap1 belowupperH; original contactsraw4/5removed, raw7positivecontactretained. Source/domestic numbers independent. Raw6/7 andraw8/9 guide handoffs unresolved. No bridge, inferredretracing, fakefull5, enginecapture, native or animation approval.</p>'
        require(text.count('</h1>')==1,'page hook');return text.replace('</h1>','</h1>'+notice,1)
    def selection(route,query):
        require(route!='/checks','no engine execution requested');return original_selection(route,query)
    shared.page=page;shared.selection=selection
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(8)]}
        require(selection('/whole','')is None,'whole selection')
        whole=page('/whole',None,sources,dummy);require(whole.count('<section class="panel">')==2 and 'raw6 wholeYshrink candidate' in whole,'whole page and independent count notice')
        rendered=source_svg(proof);require(rendered.count('<path ')==23 and rendered.count(' transform="matrix(')==1,'all23 originalP andonewholematrix')
        for raw in[6,7,8,9]:
            selected=selection('/compare','source=selected&domestic=1&raw='+str(raw)+'&dview=single&rview=single');require(selected['raw']==raw and selected['domestic']==1,'independent selectors');require(page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'raw page')
        try:selection('/checks','')
        except ValueError:pass
        else:raise ValueError('engine route not rejected')
        require(shared.FETCH_COUNT==0,'no private fetch');print(json.dumps({'guardPass':True,'glyph':'怰','root':"u6030-legacy-raw6-headgap1-Yshrink-v1",'catalog':8,'domestic':8,'raw':10,'calls':10,'polygons':23,'legacyProof4AndSeparateTrace':True,'newFull5Claim':False,'locallyAuthored':True,'originalWhole':False,'originalSourceUnchanged':True,'wholeAndIndependentSelectors':'PASS','HTTP':0,'server':0,'engine':0,'nativeApproval':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
