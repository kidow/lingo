#!/usr/bin/env python3
"""Exact fixed MM 嫂 JSON dataset adapter for the existing whole-only HTTP comparator."""
import sys
sys.dont_write_bytecode = True
import hashlib, html, importlib.util, json, math, re, xml.etree.ElementTree as ET
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
CONFIG_FILE = 'docs/hanja-source-raw-compare-u5ac2-mm-whole-2026-10-27/config.json'
ADAPTER_FILE = 'scripts/hanja-static-original-mm-u5ac2.py'
LAUNCHER_FILE = 'scripts/hanja-raw-static-compare.py'
EXPECTED = json.loads("{\"schema\":\"hanja-fixed-MM-original-filled-whole/v1\",\"kind\":\"fixed-mm-original-filled-whole\",\"glyph\":\"嫂\",\"catalogStrokes\":12,\"originalFilledStrokes\":12,\"dictionaryPlaybackStrokes\":13,\"source\":{\"path\":\"docs/hanja-source-original-u5ac2-mm-2026-10-27/source-record.json\",\"SHA256\":\"b541b8053339f110fef34574a1a380b9ffa60fd9e0ea4a09378f7d6a972ca0ac\",\"originalRecordSHA256\":\"915642917cb4917e1074864d0875d09f7c185815e4e3a73c34b9acb5d4c44aa1\",\"revision\":\"bddc96d41bef78427ed0e034e9f7e31d71fd1b92\",\"wholeCorpusSHA256\":\"a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee\"},\"publisherMetadata\":{\"path\":\"docs/hanja-goal-glyphwiki-batch1091-2026-10-13/metadata.json\",\"SHA256\":\"66d6f90264725f8c0dc58d264f2f0cd539420cc08b32f3471c7247085be9b91a\"},\"domestic\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/5a00/5ac2.svg\",\"status\":200,\"bytes\":7231,\"sha256\":\"14a3854c144db993f43765aeafda9dcb8c63a3bcbf97a100db9e372ed9e3cd20\",\"clips\":13,\"glyph\":\"嫂\",\"privateMediaSaved\":false},\"license\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false},\"sharedServe\":{\"path\":\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\",\"SHA256\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"},\"inputSHA256\":{\"docs/hanja-source-original-u5ac2-mm-2026-10-27/source-record.json\":\"b541b8053339f110fef34574a1a380b9ffa60fd9e0ea4a09378f7d6a972ca0ac\",\"docs/hanja-goal-glyphwiki-batch1091-2026-10-13/metadata.json\":\"66d6f90264725f8c0dc58d264f2f0cd539420cc08b32f3471c7247085be9b91a\",\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\",\"public/hanja-strokes/ARPHICPL.txt\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"sourceViewBox\":\"0 0 1024 1024\",\"sourceTransform\":\"translate(0 900) scale(1 -1)\",\"wholeOnly\":true,\"noPartialAnimation\":true,\"host\":\"127.0.0.1\",\"countDifferenceResolved\":false,\"filledGeometryApproved\":false,\"domesticStrokeOrderApproved\":false,\"filledGapApproved\":false,\"nativeApproval\":false,\"runtimeApplied\":false}")

def require(value, message):
    if not value:
        raise ValueError(message)

def digest(raw):
    return hashlib.sha256(raw).hexdigest()

def fixed_file(relative):
    path = ROOT / relative
    require(path.resolve() == path and path.is_relative_to(ROOT) and path.is_file() and path.stat().st_size <= 1048576, 'fixed repository file required')
    return path

def same_json(a, b):
    if type(a) is not type(b):
        return False
    if type(b) is dict:
        return set(a) == set(b) and all(same_json(a[k], b[k]) for k in b)
    if type(b) is list:
        return len(a) == len(b) and all(same_json(x, y) for x, y in zip(a, b))
    return a == b

def whole_selection(route, query):
    require(route in ('/', '/whole') and query == '', 'exact MM whole-only route required')
    return None

def validate_config(config, config_path):
    require(config_path == ROOT / CONFIG_FILE, 'one fixed MM comparison config required')
    require(type(config) is dict and set(config) == set(EXPECTED) | {'adapter', 'launcherSHA256'}, 'exact MM config fields required')
    require(same_json({k: v for k, v in config.items() if k not in ('adapter', 'launcherSHA256')}, EXPECTED), 'exact fixed MM source and unresolved12/publisher13 required')
    require(config['adapter'] == {'path': ADAPTER_FILE, 'SHA256': digest(Path(__file__).read_bytes())}, 'fixed MM adapter bytes required')
    require(type(config['launcherSHA256']) is str and re.fullmatch('[0-9a-f]{64}', config['launcherSHA256']) is not None, 'fixed launcher hash required')

def parameter_guards(config, config_path, config_sha):
    validate_config(config, config_path)
    require(digest(config_path.read_bytes()) == config_sha, 'MM config changed')
    require(digest(fixed_file(LAUNCHER_FILE).read_bytes()) == config['launcherSHA256'], 'MM launcher changed')
    require(digest(Path(__file__).read_bytes()) == config['adapter']['SHA256'], 'MM adapter changed')
    require(digest(fixed_file(EXPECTED['sharedServe']['path']).read_bytes()) == EXPECTED['sharedServe']['SHA256'], 'original shared comparator changed')
    for path, pin in EXPECTED['inputSHA256'].items():
        require(digest(fixed_file(path).read_bytes()) == pin, 'fixed MM input changed')

def read_original_mm():
    raw = fixed_file(EXPECTED['source']['path']).read_bytes()
    require(len(raw) < 100000 and digest(raw) == EXPECTED['source']['SHA256'], 'fixed original MM document required')
    document = json.loads(raw)
    original = document['originalRecordJSON']
    require(type(original) is str and digest(original.encode('utf-8')) == EXPECTED['source']['originalRecordSHA256'] == document['originalRecordSHA256'], 'original MM raw JSON changed')
    record = document['record']
    require(same_json(json.loads(original), record) and set(record) == {'character', 'strokes', 'medians'} and record['character'] == '嫂', 'one exact original MM whole required')
    require(document['schema'] == 'hanja-original-MM-single-record/v1' and document['source']['revision'] == EXPECTED['source']['revision'] and document['source']['wholeCorpusSHA256'] == EXPECTED['source']['wholeCorpusSHA256'], 'original fixed MM provenance required')
    require(document['license'] == EXPECTED['license'], 'original APL license references required')
    require(all(document[k] is False for k in ('filledGeometryApproved', 'domesticStrokeOrderApproved', 'filledGapApproved', 'componentReuseApproved', 'nativeApproval', 'runtimeApplied')), 'no prior source approval transfer')
    require(type(record['strokes']) is list and type(record['medians']) is list and len(record['strokes']) == len(record['medians']) == 12, 'original MM12 filled paths and medians required')
    require(all(type(d) is str and d for d in record['strokes']), 'original filled path strings required')
    require(all(type(row) is list and len(row) >= 2 and all(type(p) is list and len(p) == 2 and all(type(v) in (int, float) and math.isfinite(v) for v in p) for p in row) for row in record['medians']), 'original finite medians retained, never rendered')
    return record

def original_mm_svg(record):
    paths = ''.join('<path fill="#222" d="' + html.escape(d, quote=True) + '"/>' for d in record['strokes'])
    return '<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 1024 1024" aria-label="嫂 original MM12 filled whole"><g transform="translate(0 900) scale(1 -1)">' + paths + '</g></svg>'

def check_original_svg(record):
    root = ET.fromstring(original_mm_svg(record))
    ns = '{http://www.w3.org/2000/svg}'
    require(root.tag == ns + 'svg' and root.get('viewBox') == EXPECTED['sourceViewBox'] and len(root) == 1, 'fixed MM SVG shell required')
    group = root[0]
    require(group.tag == ns + 'g' and group.attrib == {'transform': EXPECTED['sourceTransform']}, 'only explicit MM900 Y reflection allowed')
    require(len(group) == 12 and all(p.tag == ns + 'path' and p.attrib == {'fill': '#222', 'd': d} for p, d in zip(group, record['strokes'])), 'every original filled path and order unchanged')

def whole_page(shared, route, selected, sources, domestic):
    require(route in ('/', '/whole') and selected is None and list(sources) == ['MM'], 'one fixed MM whole page required')
    publisher = shared.domestic_svg(domestic)
    original = original_mm_svg(sources['MM'])
    return '<!doctype html><meta charset="utf-8"><title>嫂 original MM whole comparison</title><style>body{font:16px system-ui;margin:16px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}.panel{width:520px}svg{display:block;width:520px;height:520px}h2{font-size:16px}</style><h1>嫂 · catalog12 / original MM12 / publisher13</h1><p>Whole-only source comparison. The count difference, Korean order, filled gaps and runtime remain unapproved. MM paths are unchanged; only translate(0 900) and Y reflection are applied. No medians or per-stroke mapping are displayed.</p><div class="panels"><section class="panel"><h2>Original publisher whole13 · RAM only</h2>' + publisher + '</section><section class="panel"><h2>Fixed original MM filled whole12 · APL</h2>' + original + '</section></div>'

def run_mm_original_whole(args, config, config_path):
    require(__debug__ and sys.flags.optimize == 0, 'optimized assertion-free execution forbidden')
    def guards():
        parameter_guards(config, config_path, args.config_sha)
    guards()
    record = read_original_mm()
    metadata = json.loads(fixed_file(EXPECTED['publisherMetadata']['path']).read_bytes())
    require(metadata['dictionary'] == EXPECTED['domestic'], 'original publisher metadata unchanged')
    spec = importlib.util.spec_from_file_location('hanja_mm_u5ac2_original_shared', fixed_file(EXPECTED['sharedServe']['path']))
    shared = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(shared)
    require(shared.FETCH_COUNT == 0 and callable(shared.main) and callable(shared.domestic_svg), 'original HTTP and publisher SVG functions required')
    # Existing parser calls this field catalogStrokes; here it validates publisher13 only.
    # Public MM/catalog12 remain separate in the fixed config and visible caption.
    shared.CONFIG = {'glyph': '嫂', 'catalogStrokes': 13, 'domestic': EXPECTED['domestic']}
    shared.ROOT = ROOT
    shared.HERE = config_path.parent
    shared.guards = guards
    shared.load_sources = lambda: {'MM': record}
    shared.selection = whole_selection
    shared.page = lambda route, selected, sources, domestic: whole_page(shared, route, selected, sources, domestic)
    if args.check_only:
        check_original_svg(record)
        require(shared.FETCH_COUNT == 0, 'MM check-only cannot fetch publisher')
        print(json.dumps({'MMWholeCheck': 'PASS', 'glyph': '嫂', 'originalFilledPaths': 12, 'catalogStrokes': 12, 'publisherStrokes': 13, 'countDifferenceResolved': False, 'originalPathStringsUnchanged': True, 'sourceTransform': EXPECTED['sourceTransform'], 'HTTP': 0, 'server': 0, 'engine': 0, 'projection': 0, 'blockedHTMLRead': False, 'nativeApproval': False, 'runtimeApplied': False}))
        return
    original_argv = sys.argv
    try:
        sys.argv = [shared.__file__, '--port', str(args.port)]
        shared.main()
    finally:
        sys.argv = original_argv
