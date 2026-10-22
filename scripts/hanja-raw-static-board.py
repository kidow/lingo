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
LAUNCHER_SHA = 'a0fb79fbde90e7b86700a95d11efccc6ddd89e3565030f476065adef7d39c897'


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
    require(config['launcher'] == {'path': LAUNCHER, 'SHA256': LAUNCHER_SHA}, 'original launcher required')
    require(config['wrapper']['path'] == str(Path(__file__).resolve().relative_to(ROOT)), 'fixed board wrapper')
    base_path = fixed_path(config['baseConfig']['path'])
    base = json.loads(base_path.read_bytes())
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
