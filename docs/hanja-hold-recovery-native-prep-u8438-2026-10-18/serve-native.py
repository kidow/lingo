#!/usr/bin/env python3
"""Static source-only whole/raw comparison; dictionary media are RAM-only."""
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, importlib.util, json, math, os
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def checked_path(relative):
    path = (ROOT / relative).resolve()
    if not path.is_relative_to(ROOT):
        raise ValueError('Path outside workspace')
    return path

def guard():
    config = json.loads((HERE / 'config.json').read_text())
    validation = json.loads((HERE / 'validation.json').read_text())
    for name, expected in validation['newFilePins'].items():
        if sha(HERE / name) != expected:
            raise ValueError('New helper pin changed: ' + name)
    for relative, expected in config['immutablePins'].items():
        if sha(checked_path(relative)) != expected:
            raise ValueError('Original input pin changed: ' + relative)
    meta = json.loads(checked_path(config['metadataFile']).read_text())
    if meta['glyph'] != config['glyph'] or meta['dictionary'] != config['dictionary']:
        raise ValueError('Domestic metadata identity mismatch')
    if meta['candidate']['strokes'] != config['catalogStrokes'] or meta['dictionaryStrokes'] != config['domesticStrokes']:
        raise ValueError('Count identity changed')
    analysis = json.loads(checked_path(config['sourceAnalysisFile']).read_text())
    mismatch = config['metadataPinDiscrepancy']
    if analysis['metadataFileSHA256'] != mismatch['recordedAnalysisSHA256'] or sha(checked_path(config['metadataFile'])) != mismatch['currentByteSHA256']:
        raise ValueError('Metadata discrepancy contract changed')
    proofs = {}
    for item in config['wholeProofs']:
        proof = json.loads(checked_path(item['file']).read_text())
        if set(proof) != {'defaults', 'engineHashes', 'engineRevision', 'groups', 'trace'}:
            raise ValueError('Full5 proof schema mismatch')
        if proof['engineRevision'] != config['engineRevision'] or proof['engineHashes'] != config['engineHashes']:
            raise ValueError('Engine identity mismatch')
        if len(proof['groups']) != len(proof['trace']) or len(proof['groups']) != item['rawRows']:
            raise ValueError('Raw row identity mismatch')
        for group, calls in zip(proof['groups'], proof['trace']):
            if group['polygons'] != [p for c in calls for p in c['polygons']]:
                raise ValueError('Raw polygons differ from original trace')
            for polygon in group['polygons']:
                for vertex in polygon:
                    if vertex['off'] != 0 or not all(isinstance(vertex[k], (int, float)) and math.isfinite(vertex[k]) for k in ('x', 'y')):
                        raise ValueError('Unsupported original polygon vertex')
        proofs[item['root']] = proof
    if config['defaultRoot'] not in proofs or config['nativeApproved'] or config['runtimeApplied']:
        raise ValueError('Source-only identity changed')
    return config, proofs

def public_svg(proof, raw=None):
    # Use original complete polygons verbatim. Never synthesize a path or join.
    groups = proof['groups'] if raw is None else [proof['groups'][raw - 1]]
    shapes = ''.join('<polygon points="' + ' '.join(str(v['x']) + ',' + str(v['y']) for v in p) + '"/>' for g in groups for p in g['polygons'])
    return '<svg viewBox="0 0 200 200"><g fill="#222">' + shapes + '</g></svg>'

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=0)
    parser.add_argument('--check-only', action='store_true')
    args = parser.parse_args()
    config, proofs = guard()
    if args.check_only:
        print(json.dumps({'guard': 'PASS', 'glyph': config['glyph'], 'wholes': len(proofs), 'sourceCompile': 0, 'engine': 0, 'HTTP': 0, 'server': 0, 'nativeApproved': False, 'runtimeApplied': False}), flush=True)
        return
    if not 0 <= args.port <= 65535:
        raise ValueError('Invalid local port')
    renderer_path = checked_path(config['rendererFile'])
    spec = importlib.util.spec_from_file_location('fixed_dictionary_renderer', renderer_path)
    renderer = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(renderer)
    renderer.ENTRIES = {config['glyph']: {'strokes': config['domesticStrokes'], 'dictionary': config['dictionary']}}
    renderer.CACHE = {}

    def domestic_whole():
        data = renderer.source(config['glyph'])
        paths = ''.join('<path d="' + html.escape(s['outline'].get('d'), quote=True) + '"/>' for s in data['strokes'])
        return '<svg viewBox="0 0 1024 1024"><g transform="' + html.escape(data['transform'], quote=True) + '">' + paths + '</g></svg>'

    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *args):
            pass
        def do_GET(self):
            try:
                parsed = urlparse(self.path)
                if parsed.path not in ('/', '/whole', '/pairs'):
                    self.send_error(404, 'Only static whole/pairs review is supported')
                    return
                q = parse_qs(parsed.query)
                root = q.get('id', [config['defaultRoot']])[0]
                if root not in proofs:
                    raise ValueError('Unknown pinned whole root')
                item = next(p for p in config['wholeProofs'] if p['root'] == root)
                proof = proofs[root]
                esc = html.escape
                parts = ['<!doctype html><html lang="ko"><meta charset="utf-8"><title>' + esc(config['glyph']) + ' source boundary review</title><style>body{font:15px system-ui;margin:12px;width:1080px;color:#111}h1{font-size:23px}p{max-width:1050px;overflow-wrap:anywhere}.pair{display:flex;gap:12px}.pair svg{width:520px;height:520px}section{border:1px solid #ddd;margin:12px 0;padding:8px}.warning{background:#fff1d6;padding:10px}input{width:240px}select{min-width:220px}code{overflow-wrap:anywhere}</style>',
                    '<h1>' + esc(config['glyph']) + ' · static whole/raw review</h1>',
                    '<p class="warning">Catalog ' + str(config['catalogStrokes']) + ' / domestic ' + str(config['domesticStrokes']) + '. Counts disagree. Public raw rows are NOT verified domestic strokes. No automatic 1:1 mapping, grouping, ordering or runtime approval.</p>',
                    '<p>LEFT: domestic colored direction (blue → green → orange → red). RIGHT: exact public polygons. In pairs, RIGHT shows ONLY the selected raw row; no cumulative prefix. Pair indices are independently selected, 1-based.</p>',
                    '<form action="/whole"><label>Whole <select name="id">' + ''.join('<option value="' + esc(p['root'], quote=True) + '"' + (' selected' if p['root'] == root else '') + '>' + esc(p['root']) + ' (' + str(p['rawRows']) + ' raw)</option>' for p in config['wholeProofs']) + '</select></label><button>Whole</button></form>',
                    '<form action="/pairs"><input type="hidden" name="id" value="' + esc(root, quote=True) + '"><label>Domestic:raw pairs <input name="pairs" placeholder="1:1,2:3"></label><button>Independent pairs</button></form>',
                    '<p><code>' + esc(root) + '</code> · raw rows ' + str(item['rawRows']) + ' · original polygons ' + str(item['polygons']) + '<br>Whole proof SHA256 <code>' + item['sha256'] + '</code><br>Prior whole observation only: ' + esc(item['priorWholeObservation']) + '; this helper makes no compatibility judgment.</p>']
                if parsed.path == '/pairs':
                    raw_pairs = q.get('pairs', [''])[0]
                    pairs = []
                    for token in raw_pairs.split(','):
                        if token:
                            values = token.split(':')
                            if len(values) != 2:
                                raise ValueError('Use independently chosen domestic:raw pairs')
                            left, right = map(int, values)
                            if not (1 <= left <= config['domesticStrokes'] and 1 <= right <= len(proof['groups'])):
                                raise ValueError('Pair index outside independent source bounds')
                            pairs.append((left, right))
                    if not pairs:
                        parts.append('<p>No pairs selected. Enter explicit domestic:raw indices; no default mapping is inferred.</p>')
                    for index, (left, right) in enumerate(pairs):
                        parts.append('<section><b>Domestic ' + str(left) + ' / public raw ' + str(right) + ' (zero-based raw ' + str(right - 1) + ')</b><div class="pair">' + renderer.dictionary_svg(config['glyph'], left, True, config['root'] + '-' + str(index) + '-' + str(left) + '-' + str(right)) + public_svg(proof, right) + '</div></section>')
                else:
                    parts.append('<section><b>LEFT domestic complete / RIGHT exact public whole</b><div class="pair">' + domestic_whole() + public_svg(proof) + '</div></section>')
                mismatch = config['metadataPinDiscrepancy']
                parts.append('<p>Historical source-analysis metadata pin differs from the current preserved bytes. Recorded <code>' + mismatch['recordedAnalysisSHA256'] + '</code>; current <code>' + mismatch['currentByteSHA256'] + '</code>. Neither original file is corrected by this helper.</p><p>Dictionary ©2020 e-hanja: RAM-only, no graphics saved. GlyphWiki contributors: original polygons; see NOTICE.md. Native approval false; runtime applied false. This server has no progressive compiler or animation.</p></html>')
                body = ''.join(parts).encode()
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.send_header('Cache-Control', 'no-store')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)
            except Exception as exc:
                self.send_error(400, str(exc))
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    print(json.dumps({'pid': os.getpid(), 'port': server.server_port, 'glyph': config['glyph'], 'sourceCompile': 0, 'engine': 0, 'nativeApproved': False, 'runtimeApplied': False}), flush=True)
    try:
        server.serve_forever()
    finally:
        server.server_close()

if __name__ == '__main__':
    main()
