#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Optional static board; reuse the pinned launcher and every original SVG function."""
import sys
sys.dont_write_bytecode = True
import argparse, copy, hashlib, html, importlib.util, json
from pathlib import Path
from urllib.parse import parse_qs

ROOT = Path(__file__).resolve().parent.parent
LAUNCHER = 'scripts/hanja-raw-static-compare.py'
LAUNCHER_SHA = '17e77f57900f45e6561976bcb0bcd14ccb81f7da07046645e1bdad3e45ca83f0'


def require(value, message):
    if not value:
        raise ValueError(message)


def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def fixed_path(name):
    require(type(name) is str and 0 < len(name) < 512, 'relative path required')
    p = Path(name)
    require(not p.is_absolute() and '..' not in p.parts, 'relative path only')
    q = (ROOT / p).resolve()
    require(q.is_relative_to(ROOT) and q == ROOT / p and q.is_file(), 'fixed file required')
    return q


def validate_groups(groups, base):
    require(type(groups) is dict and set(groups) == set(base['sourceRoots']), 'exact source labels required')
    for label, rows in groups.items():
        require(type(rows) is list and len(rows) == base['catalogStrokes'], 'one provisional row per domestic stroke')
        used = set()
        for row in rows:
            require(row is None or type(row) is list and len(row) > 0, 'null or nonempty raw list required')
            if row is None:
                continue
            for raw in row:
                require(type(raw) is int and 1 <= raw <= base['sourceRoots'][label]['rawGroups'], 'raw index outside original source')
                require(raw not in used, 'duplicate provisional raw assignment')
                used.add(raw)


def install_board(shared, base, groups, board_guards):
    original_selection, original_page, original_guards = shared.selection, shared.page, shared.guards

    def guarded():
        original_guards()
        board_guards()

    def selection(route, query):
        board_guards()
        if route != '/board':
            return original_selection(route, query)
        q = {} if not query else parse_qs(query, keep_blank_values=True, strict_parsing=True)
        require(set(q) <= {'source'} and all(len(v) == 1 and v[0] for v in q.values()), 'exact board query required')
        label = q.get('source', [base['defaultSource']])[0]
        require(label in groups, 'unknown board source')
        return {'boardSource': label}

    def grouped_svg(proof, indexes):
        pieces = []
        for index in indexes:
            svg = shared.source_svg(proof, index)
            require(svg.count('<g fill="#222">') == 1 and svg.endswith('</g></svg>'), 'original SVG shell changed')
            pieces.append(svg.split('<g fill="#222">', 1)[1][:-len('</g></svg>')])
        shell = shared.source_svg(proof)
        return shell.split('<g fill="#222">', 1)[0] + '<g fill="#222">' + ''.join(pieces) + '</g></svg>'

    def page(route, selected, sources, domestic):
        if route != '/board':
            return original_page(route, selected, sources, domestic)
        board_guards()
        label = selected['boardSource']
        old = original_page('/whole', None, sources, domestic)
        require(old.count('<div class="grid">') == 1, 'original page shell changed')
        head = old.split('<div class="grid">', 1)[0]
        rows, used = [], set()
        for i, indexes in enumerate(groups[label], 1):
            left = shared.domestic_svg(domestic, i)
            right = '<p class="pending">원raw 대응 미정</p>' if indexes is None else grouped_svg(sources[label], indexes)
            if indexes is not None:
                used.update(indexes)
            title = '국내 ' + str(i) + ' ↔ 검토후보 raw ' + ('미정' if indexes is None else ','.join(map(str, indexes)))
            rows.append('<section class="board-pair" data-domestic="' + str(i) + '"><h2>' + html.escape(title) + '</h2><div class="pair">' + left + right + '</div></section>')
        unassigned = [i for i in range(1, len(sources[label]['groups']) + 1) if i not in used]
        rest = ''.join('<section data-unassigned-raw="' + str(i) + '"><h2>미배정 원raw ' + str(i) + '</h2>' + shared.source_svg(sources[label], i) + '</section>' for i in unassigned)
        style = '<style>.board{display:grid;grid-template-columns:repeat(auto-fit,minmax(450px,1fr));gap:12px}.board-pair h2,.unassigned h2{font-size:15px}.pair{display:grid;grid-template-columns:220px 220px;gap:10px}.board svg,.unassigned svg{width:220px!important;height:220px!important;min-width:220px!important;min-height:220px!important;max-width:none!important}.pending{width:220px}.unassigned{display:grid;grid-template-columns:repeat(auto-fit,220px);gap:10px}</style>'
        note = '<h2>220px 정적 검토판 · provisionalGroups는 검토 가설이며 승인 아님</h2><p>같은 번호·원raw 합성은 시간·방향·연결성·합획 승인이 아닙니다. 미정은 빈 SVG가 아닌 미정으로 표시합니다. 원P/원좌표 그대로 · 520 비교는 위 링크 사용.</p>'
        return head + style + note + '<div class="board">' + ''.join(rows) + '</div><h2>미배정 원raw (삭제 없음)</h2><div class="unassigned">' + rest + '</div>'

    shared.guards, shared.selection, shared.page = guarded, selection, page
    return original_page, grouped_svg


def exact_u727c_new_launcher(config,base):
    # Only the pinned original15raw14call32P/zeroRaw4 comparison may use this new launcher.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':'c7f2ffb34eefbdc889a1016ece7c756258542655c662d45ffa84f822d0c7387f'}
            and config.get('baseConfig')=={'path':'docs/hanja-source-raw-compare-u727c-2026-10-23/config.json','SHA256':'dedb492f64aa35ea4ccb572b5f31ca5dc26dac3fbc60cafdd5416c419a554543'}
            and base.get('glyph')=='牼' and base.get('catalogStrokes')==11
            and list(base.get('sourceRoots',{}))==['selected']
            and selected.get('root')=='u727c'
            and selected.get('file')=='docs/hanja-source-raw-compare-u727c-2026-10-23/engine-whole-u727c.json'
            and selected.get('fileSHA256')=='89859c169dac0332017f79e4c1b39424063e39caa95f3306d972318e0f0702db'
            and selected.get('proofKind')=='actual-full5-direct'
            and selected.get('proofKeys')==['defaults','engineHashes','engineRevision','groups','trace']
            and (selected.get('rawGroups'),selected.get('drawingCalls'),selected.get('polygons'))==(15,14,32)
            and selected.get('polygonCounts')==[3,2,2,3,0,2,3,2,3,2,3,2,2,1,2]
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u6705_prepared_launcher(config,base):
    # Exact u6705 actual-full5 source/base pin only; renderer and source guards remain unchanged.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':"c7f2ffb34eefbdc889a1016ece7c756258542655c662d45ffa84f822d0c7387f"}
            and config.get('baseConfig')=={'path':"docs/hanja-source-raw-compare-u6705-2026-10-23/config.json",'SHA256':"e9bc71d1de6e9e934761e991023c7ba2a2cf452e929f34d57ca9fc2f455a08a1"}
            and base.get('glyph')=="朅" and base.get('catalogStrokes')==14
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u6705","file":"docs/hanja-source-raw-compare-u6705-2026-10-23/engine-whole-u6705.json","fileSHA256":"9ed7129b5a50de139bce4fc494c2e216807d54c8f670f24f7a7b3988eb3b4675","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u6705","sourceProofFile":"engine-whole-u6705.json","sourceProofFileSha256":"9ed7129b5a50de139bce4fc494c2e216807d54c8f670f24f7a7b3988eb3b4675"},"rawGroups":18,"drawingCalls":19,"polygonCounts":[3,3,2,2,2,2,1,1,2,1,1,3,1,4,3,2,2,2],"polygons":37}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u7c67_prepared_launcher(config,base):
    # Exact u7c67 actual-full5 source/base pin only; renderer and source guards remain unchanged.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':"c7f2ffb34eefbdc889a1016ece7c756258542655c662d45ffa84f822d0c7387f"}
            and config.get('baseConfig')=={'path':"docs/hanja-source-raw-compare-u7c67-2026-10-23/config.json",'SHA256':"a997df7fd29a5a8725e0296d34fa69ee13568ab469dde7f1671f062ea60d34dc"}
            and base.get('glyph')=="籧" and base.get('catalogStrokes')==23
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u7c67","file":"docs/hanja-source-raw-compare-u7c67-2026-10-23/engine-whole-u7c67.json","fileSHA256":"67be1942eaa84b04bd30b6384ab2edbd1f3124f5a1264577d2eb42f983ca3756","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u7c67","sourceProofFile":"engine-whole-u7c67.json","sourceProofFileSha256":"67be1942eaa84b04bd30b6384ab2edbd1f3124f5a1264577d2eb42f983ca3756"},"rawGroups":26,"drawingCalls":30,"polygonCounts":[3,2,2,3,2,2,2,2,1,2,3,2,2,1,4,1,1,3,2,2,2,1,2,3,2,8],"polygons":60}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u7d8c_prepared_launcher(config,base):
    # Exact u7d8c actual-full5 source/base pin only; renderer and source guards remain unchanged.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={'path':"docs/hanja-source-raw-compare-u7d8c-2026-10-23/config.json",'SHA256':"fcc0ef1aec732f5fb3bf0b71ca806d9cb5fd3ee7b54032fe2127b0d52e3a99d3"}
            and base.get('glyph')=="綌" and base.get('catalogStrokes')==13
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u7d8c","file":"docs/hanja-source-raw-compare-u7d8c-2026-10-23/engine-whole-u7d8c.json","fileSHA256":"d025868602d7d0e1de4a06676126549ba88bd304e3d1695098b85d673b1d6713","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u7d8c","sourceProofFile":"engine-whole-u7d8c.json","sourceProofFileSha256":"d025868602d7d0e1de4a06676126549ba88bd304e3d1695098b85d673b1d6713"},"rawGroups":17,"drawingCalls":16,"polygonCounts":[3,2,3,3,2,1,3,2,0,3,2,3,2,1,1,2,1],"polygons":34}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u8627_vs2_prepared_launcher(config,base):
    # Exact original 蘧 VS2 full5; source/renderer/three existing admissions unchanged.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':"c7f2ffb34eefbdc889a1016ece7c756258542655c662d45ffa84f822d0c7387f"}
            and config.get('baseConfig')=={'path':"docs/hanja-source-raw-compare-u8627-vs2-2026-10-23/config.json",'SHA256':"12762981a5d51fbdafcf31f7f13dbe30e50ea5e0a1501b57fb9f1b054bfbc83e"}
            and base.get('glyph')=='蘧' and base.get('catalogStrokes')==21
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u8627-ue0102","file":"docs/hanja-source-raw-compare-u8627-vs2-2026-10-23/engine-whole-u8627-ue0102.json","fileSHA256":"cfc15b75a2dad4fdc5af7c22c8b2c8632735cd72a3130ce0fb9ca3ba0eca45cd","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u8627-ue0102","sourceProofFile":"engine-whole-u8627-ue0102.json","sourceProofFileSha256":"cfc15b75a2dad4fdc5af7c22c8b2c8632735cd72a3130ce0fb9ca3ba0eca45cd"},"rawGroups":24,"drawingCalls":28,"polygonCounts":[2,2,2,2,2,2,1,2,3,2,2,1,4,1,1,3,2,2,2,1,2,3,2,8],"polygons":54}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u83f0_k_prepared_launcher(config,base):
    # 원 u83f0-k 전체 full5/고정 비교 설정만 허용합니다. 기존 분기와 렌더러는 유지합니다.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':LAUNCHER,'SHA256':"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={'path':"docs/hanja-source-raw-compare-u83f0-k-2026-10-23/config.json",'SHA256':"ccc75229a05d0a7784746c80eddd766702c98daf11721ad62ecbfc4441e9c8d1"}
            and base.get('glyph')=="菰" and base.get('catalogStrokes')==12
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u83f0-k","file":"docs/hanja-source-raw-compare-u83f0-k-2026-10-23/engine-whole-u83f0-k.json","fileSHA256":"863677f60b148aa20c2db87336e8f1cd258b79dea32c41211846477876ae53b5","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u83f0-k","sourceProofFile":"engine-whole-u83f0-k.json","sourceProofFileSha256":"863677f60b148aa20c2db87336e8f1cd258b79dea32c41211846477876ae53b5"},"rawGroups":14,"drawingCalls":16,"polygonCounts":[2,2,2,2,1,2,5,3,3,3,2,3,2,2],"polygons":34}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u6fbe_k_prepared_launcher(config,base):
    # 정확한 澾 원 whole19raw/37P 및 기존 고정 비교 설정만 추가합니다. 렌더링은 유지합니다.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':"scripts/hanja-raw-static-compare.py",'SHA256':"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u6fbe-k-2026-10-24/config.json","SHA256":"5d5eb2af7108df3f883b769e1fac842ad4ecb652e7a09cb92fe03feb1517a42f"}
            and base.get('glyph')=='澾' and base.get('catalogStrokes')==16
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u6fbe-k","file":"docs/hanja-goal-glyphwiki-batch501-2026-10-10/engine-whole-u6fbe-k.json","fileSHA256":"49ac0bd9728ce5f31905e0abe8d1409e959072469ad9a76a63718e6da5ea93ae","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u6fbe-k","sourceProofFile":"engine-whole-u6fbe-k.json","sourceProofFileSha256":"49ac0bd9728ce5f31905e0abe8d1409e959072469ad9a76a63718e6da5ea93ae"},"rawGroups":19,"drawingCalls":19,"polygonCounts":[2,2,2,1,2,2,1,2,3,2,2,2,2,2,3,2,1,2,2],"polygons":37}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u6f5d_prepared_launcher(config,base):
    # 정확한 潝 원 whole19raw/21calls/35P와 고정 비교 설정만 추가합니다.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path':"scripts/hanja-raw-static-compare.py",'SHA256':"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u6f5d-2026-10-24/config.json","SHA256":"f8c631f677789e9d97c65cf2a98d3943ba5dbe6e390fd3821dd9af2ace76efe4"}
            and base.get('glyph')=='潝' and base.get('catalogStrokes')==15
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u6f5d","file":"docs/hanja-goal-glyphwiki-batch1058-2026-10-13/engine-whole-u6f5d.json","fileSHA256":"0ecb779f68ace811f50d446d854d95765735a55e851f5e8f94235dd7816b33a6","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u6f5d","sourceProofFile":"engine-whole-u6f5d.json","sourceProofFileSha256":"0ecb779f68ace811f50d446d854d95765735a55e851f5e8f94235dd7816b33a6"},"rawGroups":19,"drawingCalls":21,"polygonCounts":[2,2,2,1,3,2,2,1,1,2,1,1,5,1,1,1,5,1,1],"polygons":35}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])



def exact_u6f5a_prepared_launcher(config,base):
    # 정확한 潚 원 base full5/고정 설정만 추가; 16획 대응은 아직 정적 가설입니다.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={'path': 'scripts/hanja-raw-static-compare.py', 'SHA256': 'bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2'}
            and config.get('baseConfig')=={'path': 'docs/hanja-source-raw-compare-u6f5a-2026-10-24/config.json', 'SHA256': '53308321010da4d5b2661adea73417c38b11e253f17d7a253127ab89b50130a2'}
            and base.get('glyph')=='潚' and base.get('catalogStrokes')==16
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={'root': 'u6f5a', 'file': 'docs/hanja-source-raw-compare-u6f5a-2026-10-24/engine-whole-u6f5a.json', 'fileSHA256': '5433ceafe7bd1190e196eafb4c2cefba826d42ee1a0785b6f19615879333cf4f', 'proofKeys': ['defaults', 'engineHashes', 'engineRevision', 'groups', 'trace'], 'proofKind': 'actual-full5-direct', 'sourceProofIdentity': {'sourceRoot': 'u6f5a', 'sourceProofFile': 'engine-whole-u6f5a.json', 'sourceProofFileSha256': '5433ceafe7bd1190e196eafb4c2cefba826d42ee1a0785b6f19615879333cf4f'}, 'rawGroups': 20, 'drawingCalls': 21, 'polygonCounts': [2, 2, 2, 1, 1, 2, 2, 1, 2, 1, 4, 2, 2, 1, 2, 1, 1, 2, 1, 1], 'polygons': 33}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def exact_u99fe_prepared_launcher(config,base):
    # Exact compatible 駾 base full5 and fixed17-row hypothesis only.
    selected=base.get('sourceRoots',{}).get('selected',{})
    return (config.get('launcher')=={"path":"scripts/hanja-raw-static-compare.py","SHA256":"bcefa6073be1d338ad17cf72e1a23456e2fd12c15c0296915925243695ad92f2"}
            and config.get('baseConfig')=={"path":"docs/hanja-source-raw-compare-u99fe-2026-10-24/config.json","SHA256":"f4a01015a1a55718ad13efe4dae192ef61666332af21482552cffa005350f050"}
            and base.get('glyph')=='駾' and base.get('catalogStrokes')==17
            and list(base.get('sourceRoots',{}))==['selected']
            and selected=={"root":"u99fe","file":"docs/hanja-source-raw-compare-u99fe-2026-10-24/engine-whole-u99fe.json","fileSHA256":"545ed363b3c99a5cd017a8d23ac28f1d73de2319803d21f832da644a221e89e9","proofKeys":["defaults","engineHashes","engineRevision","groups","trace"],"proofKind":"actual-full5-direct","sourceProofIdentity":{"sourceRoot":"u99fe","sourceProofFile":"engine-whole-u99fe.json","sourceProofFileSha256":"545ed363b3c99a5cd017a8d23ac28f1d73de2319803d21f832da644a221e89e9"},"rawGroups":20,"drawingCalls":23,"polygonCounts":[1,2,1,2,2,1,4,2,2,2,2,3,2,2,1,1,2,1,3,7],"polygons":43}
            and base.get('launcherSHA256')==config['launcher']['SHA256'])


def main():
    require(__debug__ and sys.flags.optimize == 0, 'optimized execution forbidden')
    parser = argparse.ArgumentParser(description='Pinned provisional static board; ROOT starts HTTP.')
    parser.add_argument('--config', required=True)
    parser.add_argument('--config-sha', required=True)
    parser.add_argument('--port', type=int, default=0)
    parser.add_argument('--check-only', action='store_true')
    args = parser.parse_args()
    require(0 <= args.port <= 65535, 'port range')
    config_path = fixed_path(args.config)
    raw = config_path.read_bytes()
    require(len(raw) <= 65536 and digest(raw) == args.config_sha, 'board config SHA changed')
    config = json.loads(raw)
    require(set(config) == {'schema', 'baseConfig', 'launcher', 'sharedServe', 'wrapper', 'provisionalGroups', 'nativeApproval', 'runtimeApplied'}, 'exact board fields required')
    require(config['schema'] == 'hanja-provisional-static-board/v1' and config['nativeApproval'] is False and config['runtimeApplied'] is False, 'unapproved static board only')
    legacy_launcher = config['launcher'] == {'path': LAUNCHER, 'SHA256': LAUNCHER_SHA}
    require(config['wrapper']['path'] == str(Path(__file__).resolve().relative_to(ROOT)), 'fixed board wrapper')
    base_path = fixed_path(config['baseConfig']['path'])
    base = json.loads(base_path.read_bytes())
    require(legacy_launcher or exact_u727c_new_launcher(config,base) or exact_u6705_prepared_launcher(config,base) or exact_u7c67_prepared_launcher(config,base) or exact_u7d8c_prepared_launcher(config,base) or exact_u8627_vs2_prepared_launcher(config,base) or exact_u83f0_k_prepared_launcher(config,base) or exact_u6fbe_k_prepared_launcher(config,base) or exact_u6f5d_prepared_launcher(config,base) or exact_u6f5a_prepared_launcher(config,base) or exact_u99fe_prepared_launcher(config,base), 'original launcher or exact pinned 牼 launcher required')
    require(config['sharedServe'] == base['sharedServe'], 'same original shared renderer')
    validate_groups(config['provisionalGroups'], base)

    def board_guards():
        require(digest(config_path.read_bytes()) == args.config_sha, 'board config changed')
        for entry in [config['baseConfig'], config['launcher'], config['sharedServe'], config['wrapper']]:
            require(set(entry) == {'path', 'SHA256'} and digest(fixed_path(entry['path']).read_bytes()) == entry['SHA256'], 'board input changed')

    board_guards()
    spec = importlib.util.spec_from_file_location('hanja_static_parameter_launcher', fixed_path(LAUNCHER))
    launcher = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(launcher)
    # Retain the module the original launcher creates; its validation, guards,
    # SVG functions and main remain original. No source/XML function is copied.
    captured = []
    original_factory = importlib.util.module_from_spec
    def retain_module(module_spec):
        module = original_factory(module_spec)
        if module_spec.name == 'hanja_static_raw_shared':
            captured.append(module)
        return module
    old_argv = sys.argv
    try:
        importlib.util.module_from_spec = retain_module
        sys.argv = [str(fixed_path(LAUNCHER)), '--config', config['baseConfig']['path'], '--config-sha', config['baseConfig']['SHA256'], '--check-only']
        launcher.main()
    finally:
        importlib.util.module_from_spec = original_factory
        sys.argv = old_argv
    require(len(captured) == 1, 'one original shared module required')
    shared = captured[0]
    original_page, grouped_svg = install_board(shared, base, config['provisionalGroups'], board_guards)
    if args.check_only:
        sources = shared.load_sources()
        domestic = {'viewBox': '0 0 1024 1152', 'transform': '', 'strokes': [{'d': 'M' + str(i) + ' 0 L' + str(i) + ' 1 Z'} for i in range(base['catalogStrokes'])]}
        selected = shared.selection('/board', '')
        board = shared.page('/board', selected, sources, domestic)
        require(board.count('data-domestic="') == base['catalogStrokes'], 'board domestic count')
        require(board.count('data-unassigned-raw="') == len(sources[base['defaultSource']]['groups']) - len({i for a in config['provisionalGroups'][base['defaultSource']] if a is not None for i in a}), 'unassigned raw count')
        require(shared.page('/whole', None, sources, domestic) == original_page('/whole', None, sources, domestic), 'original whole page changed')
        for label, proof in sources.items():
            for index in range(1, len(proof['groups']) + 1):
                require(grouped_svg(proof, [index]) == shared.source_svg(proof, index), 'original single SVG bytes changed')
        negative = 0
        for bad in [{}, {**config['provisionalGroups'], 'unknown': []}, {k: [] for k in config['provisionalGroups']}]:
            try:
                validate_groups(bad, base)
            except ValueError:
                negative += 1
        for row in [[0], [True], [base['sourceRoots'][base['defaultSource']]['rawGroups'] + 1], [1, 1], []]:
            bad = copy.deepcopy(config['provisionalGroups'])
            bad[base['defaultSource']][0] = row
            try:
                validate_groups(bad, base)
            except ValueError:
                negative += 1
        require(negative == 8, 'meaningful board negative checks')
        require(shared.FETCH_COUNT == 0, 'check-only must not fetch private media')
        print(json.dumps({'boardCheck': 'PASS', 'negative': negative, 'singleSVGByteParity': sum(len(p['groups']) for p in sources.values()), 'domesticRows': base['catalogStrokes'], 'HTTP': 0, 'server': 0, 'sourceCompiler': 0, 'engine': 0, 'projection': 0, 'nativeApproval': False}))
        return
    try:
        sys.argv = [shared.__file__, '--port', str(args.port)]
        shared.main()
    finally:
        sys.argv = old_argv


if __name__ == '__main__':
    main()
