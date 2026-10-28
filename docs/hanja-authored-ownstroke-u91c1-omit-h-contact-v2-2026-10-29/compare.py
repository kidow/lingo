import argparse,hashlib,importlib.util,json,sys,html
from fractions import Fraction as F
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json'
EXPECTED=json.loads("{\"schema\":\"hanja-authored-whole-sweep-affine-static-comparison/v1\",\"glyph\":\"釁\",\"catalogStrokes\":25,\"dictionaryPlaybackStrokes\":26,\"sourceViewBox\":\"0 0 200 200\",\"defaultSource\":\"selected\",\"sourceRoots\":{\"selected\":{\"root\":\"u91c1-omit-raw29-sweeps-Y-contact-v2\",\"file\":\"docs/hanja-authored-ownstroke-u91c1-omit-h-contact-v2-2026-10-29/fixtures-static-draft.json\",\"fileSHA256\":\"0659a7869095ea1e3e5fd17ce0d4ea9115e0419ccda43a3e6bc781856e174db8\",\"proofKind\":\"authored-omission-and-whole-sweep-matrix-not-engine-capture\",\"sourceProofIdentity\":{\"sourceRoot\":\"u91c1-omit-raw29-sweeps-Y-contact-v2\",\"sourceProofFile\":\"fixtures-static-draft.json\",\"sourceProofFileSha256\":\"0659a7869095ea1e3e5fd17ce0d4ea9115e0419ccda43a3e6bc781856e174db8\"},\"rawGroups\":32,\"drawingCalls\":36,\"polygonCounts\":[1,1,2,2,1,1,2,1,3,1,2,2,1,2,1,1,2,1,2,2,1,1,2,3,6,1,1,3,2,1,4,1],\"polygons\":57}},\"domestic\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/91C1.svg\",\"status\":200,\"bytes\":12118,\"sha256\":\"d24cabbce191292c8e2ac3590015480b1c828ab263da21552b9ba5cf5b409549\",\"clips\":26,\"glyph\":\"釁\",\"privateMediaSaved\":false},\"host\":\"127.0.0.1\",\"noPartialAnimation\":true,\"canonicalMappingApproved\":false,\"nativeApproval\":false,\"runtimeApplied\":false,\"wholeOnly\":true,\"holdSummary\":\"Explicit authored raw29 omission plus positive whole-sweep Y affine on originalraw28/30 only. Original arrays retained with one common matrix per wholeP/guide. Only new contacts arebody27; whole/mapping/temporal still unapproved.\",\"sharedServe\":{\"path\":\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\",\"SHA256\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"},\"inputSHA256\":{\"docs/hanja-authored-ownstroke-u91c1-omit-h-contact-v2-2026-10-29/recipe.json\":\"3b517ab280989115f9b29aee71558c4f4fa68f6098e3a53eb2ded34be7124138\",\"docs/hanja-authored-ownstroke-u91c1-omit-h-contact-v2-2026-10-29/fixtures-static-draft.json\":\"0659a7869095ea1e3e5fd17ce0d4ea9115e0419ccda43a3e6bc781856e174db8\",\"docs/hanja-authored-ownstroke-u91c1-omit-h-contact-v2-2026-10-29/public-math-v2.json\":\"d7f649cded70830f377909164f7a33df63f5dc75c8d883137717aecc35965b02\",\"docs/hanja-authored-ownstroke-u91c1-omit-h-contact-v2-2026-10-29/verify-public-contact-v2.py\":\"3b4b8cf53d6c4dcc764ce9c584426fe71ab9c7ba4408437d09339457d050fcc3\",\"docs/hanja-goal-glyphwiki-batch1056-2026-10-13/engine-whole-u91c1-ue0106.json\":\"259e4a48fc191f53f417ccc14969016808405b6566f6c5741a94a32e3b19fe6f\",\"docs/hanja-official-media-compare-u91c1-2026-10-29/native-clock-review.json\":\"5a92acef0d06ec6018c496ee5110ab62bdcfcc9b6cc93dbd807e54d26ee44940\",\"docs/hanja-source-raw-compare-u91c1-ue0106-original-2026-10-29/native-whole-review.json\":\"659a5624e5b1f92e56630dbbb30a8d714f79797986e59576dcb30b3182a51d38\",\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"},\"sourceRootWasAuthored\":true,\"candidateOriginalRoot\":false,\"isOriginalEngineCapture\":false,\"recipe\":{\"path\":\"docs/hanja-authored-ownstroke-u91c1-omit-h-contact-v2-2026-10-29/recipe.json\",\"SHA256\":\"3b517ab280989115f9b29aee71558c4f4fa68f6098e3a53eb2ded34be7124138\"},\"originalSource\":{\"path\":\"docs/hanja-goal-glyphwiki-batch1056-2026-10-13/engine-whole-u91c1-ue0106.json\",\"SHA256\":\"259e4a48fc191f53f417ccc14969016808405b6566f6c5741a94a32e3b19fe6f\"},\"placements\":[{\"sourceRawOneBased\":28,\"authorRawOneBased\":28,\"matrixExact\":[\"1\",\"0\",\"0\",\"38/35\",\"0\",\"-2577/175\"],\"determinantExact\":\"38/35\",\"filledSourceMinY\":\"1333/10\",\"filledSourceMaxY\":\"859/5\",\"newMinY\":\"130\",\"maxYFixed\":true,\"applyTo\":[\"allOriginalP\",\"wholeOriginalRawAndTraceGuides\"]},{\"sourceRawOneBased\":30,\"authorRawOneBased\":29,\"matrixExact\":[\"1\",\"0\",\"0\",\"414/305\",\"0\",\"-93413/1525\"],\"determinantExact\":\"414/305\",\"filledSourceMinY\":\"1409/10\",\"filledSourceMaxY\":\"857/5\",\"newMinY\":\"130\",\"maxYFixed\":true,\"applyTo\":[\"allOriginalP\",\"wholeOriginalRawAndTraceGuides\"]}],\"publicMath\":{\"path\":\"docs/hanja-authored-ownstroke-u91c1-omit-h-contact-v2-2026-10-29/public-math-v2.json\",\"SHA256\":\"d7f649cded70830f377909164f7a33df63f5dc75c8d883137717aecc35965b02\"}}")
SHARED=EXPECTED['sharedServe']['path'];SOURCE=EXPECTED['sourceRoots']['selected']['file'];ORIGINAL="docs/hanja-goal-glyphwiki-batch1056-2026-10-13/engine-whole-u91c1-ue0106.json"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require(x,message):
    if not x:raise ValueError(message)
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
    p=argparse.ArgumentParser(description='釁 explicit whole-raw29 omission32raw vs domestic26; catalog25 separate');p.add_argument('--config-sha',required=True);p.add_argument('--port',type=int,default=0);p.add_argument('--check-only',action='store_true');args=p.parse_args()
    require(__debug__ and sys.flags.optimize==0 and 0<=args.port<=65535,'asserted local port')
    config=json.loads(CONFIG.read_bytes())
    def guards():
        require(sha(CONFIG)==args.config_sha and sha(Path(__file__).resolve())==config.get('adapterSHA256'),'config/adapter changed')
        require({k:v for k,v in config.items()if k!='adapterSHA256'}==EXPECTED,'exact authored omission-plus-sweep-affine context required')
        for path,h in config['inputSHA256'].items():require(sha(ROOT/path)==h,'changed input: '+path)
    guards();proof=json.loads((ROOT/SOURCE).read_bytes())
    original=json.loads((ROOT/ORIGINAL).read_bytes());require(proof['schema']=='hanja-single-source-omission-plus-whole-sweep-affine-static-draft/v1'and proof['placements']==EXPECTED['placements']and proof['locallyAuthoredRoot']is True and proof['mixedParts']is False and proof['originalWhole']is False and proof['isOriginalEngineCapture']is False and proof['isActualLocallyAuthoredEngineCapture']is False,'exact authored provenance');require(proof['sourceRawIndicesOneBased']==[i for i in range(1,34)if i!=29]and proof['groups']==[g for i,g in enumerate(original['groups'],1)if i!=29]and proof['trace']==[g for i,g in enumerate(original['trace'],1)if i!=29],'only whole originalraw29 omission');require(len(proof['groups'])==32 and len(sum(proof['trace'],[]))==36 and sum(len(g['polygons'])for g in proof['groups'])==57,'authored32raw36calls57P counts')
    require([sum((c['polygons']for c in row),[])for row in proof['trace']]==[g['polygons']for g in proof['groups']],'original traceP binding')
    sources={'selected':proof};shared=module('xin_authored_omit29_static_shell',ROOT/SHARED);require(shared.FETCH_COUNT==0,'private assets only at ROOT server start')
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
        text=original_page(*params);notice='<p>AUTHORED V2: omit originalraw29; apply positive whole-sweep Yaffine to originalraw28/30. Original32raw /36calls /57P arrays preserved with declared matrices. Catalog25, domestic26 and source32 are independent counts. Not originalwhole or enginecapture. New bodycontacts are a math-supported hypothesis; nativewhole/mapping/temporal approval pending.</p>'
        require(text.count('</h1>')==1,'page hook');return text.replace('</h1>','</h1>'+notice,1)
    def selection(route,query):
        require(route!='/checks','no engine execution requested');return original_selection(route,query)
    shared.page=page;shared.selection=selection
    if args.check_only:
        dummy={'viewBox':'0 0 200 200','transform':'matrix(1 0 0 1 0 0)','strokes':[{'d':'M0 0 L1 1'}for _ in range(26)]}
        require(selection('/whole','')is None,'whole selection')
        whole=page('/whole',None,sources,dummy);require(whole.count('<section class="panel">')==2 and 'Catalog25, domestic26 and source32' in whole,'whole page and independent count notice')
        rendered=source_svg(proof);require(rendered.count('<path ')==57 and rendered.count(' transform="matrix(')==2,'all57 originalP and exactly2 whole-group matrices')
        for raw in[1,32]:
            selected=selection('/compare','source=selected&domestic=26&raw='+str(raw)+'&dview=single&rview=single');require(selected['raw']==raw and selected['domestic']==26,'independent selectors');require(page('/compare',selected,sources,dummy).count('<section class="panel">')==2,'raw page')
        try:selection('/checks','')
        except ValueError:pass
        else:raise ValueError('engine route not rejected')
        require(shared.FETCH_COUNT==0,'no private fetch');print(json.dumps({'guardPass':True,'glyph':'釁','root':'u91c1-omit-raw29-sweeps-Y-contact-v2','catalog':25,'domestic':26,'raw':32,'calls':36,'polygons':57,'locallyAuthored':True,'originalWhole':False,'isOriginalEngineCapture':False,'originalSourceUnchanged':True,'wholeAndIndependentSelectors':'PASS','HTTP':0,'server':0,'engine':0,'nativeApproval':False}));return
    old=sys.argv
    try:sys.argv=[str(ROOT/SHARED),'--port',str(args.port)];shared.main()
    finally:sys.argv=old
if __name__=='__main__':main()
