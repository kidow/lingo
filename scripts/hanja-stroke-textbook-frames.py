#!/usr/bin/env python3
"""Render temporary comparison sheets from public videos; never approve app data.

Requires ffmpeg, ffprobe, Pillow and NumPy. Outputs only PNG review sheets in the
explicit --output directory and JSON observations on stdout. A source video is
temporarily cached for seeking and removed after decoding. A quiet interval is
a navigation hint, never a stroke-order verdict.
"""
import argparse
import hashlib
import json
import math
import subprocess
import tempfile
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
MAX_VIDEO_BYTES = 20_000_000
KO_SHA = '7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e'
KO_URL = 'https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsKo.txt'
JA_SHA = '2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8'
JA_URL = KO_URL.replace('graphicsKo.txt', 'graphicsJa.txt')
MM_SHA = 'a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee'
MM_URL = 'https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt'


def download(url, maximum):
    with urllib.request.urlopen(url, timeout=30) as response:
        if response.status != 200:
            raise ValueError(f'Unexpected HTTP status: {response.status}')
        data = response.read(maximum + 1)
    if len(data) > maximum:
        raise ValueError('Source exceeds download size limit')
    return data


def run_tool(args, data):
    result = subprocess.run(['rtk', 'proxy', *args], input=data, stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE)
    if result.returncode:
        raise RuntimeError(result.stderr.decode(errors='replace')[-3000:])
    return result.stdout


def normalized_points(medians):
    points = [p for stroke in medians for p in stroke]
    xs, ys = [p[0] for p in points], [-p[1] for p in points]
    left, right, top, bottom = min(xs), max(xs), min(ys), max(ys)
    scale = 80 / max(right - left, bottom - top)
    # Match JavaScript Math.round used by normalizeMedians (positive coordinates).
    rounded = lambda value: math.floor(value * 10 + 0.5) / 10
    return [[(rounded(50 + (x - (left + right) / 2) * scale),
              rounded(50 + (-y - (top + bottom) / 2) * scale)) for x, y in stroke]
            for stroke in medians]


def candidate_sheet(medians, path):
    strokes = normalized_points(medians)
    size, label, cols = 220, 26, 6
    sheet = Image.new('RGB', (cols * size, math.ceil(len(strokes) / cols) * (size + label)), 'white')
    draw = ImageDraw.Draw(sheet)
    for index in range(len(strokes)):
        ox, oy = index % cols * size, index // cols * (size + label)
        draw.text((ox + 10, oy + 5), f'Stroke {index + 1}', fill='black')
        for n, stroke in enumerate(strokes[:index + 1]):
            points = [(ox + x * size / 100, oy + label + y * size / 100) for x, y in stroke]
            color = '#222222' if n < index else '#215dca'
            width = round(5 * size / 100)  # Match the runtime SVG strokeWidth=5.
            draw.line(points, fill=color, width=width, joint='curve')
            for x, y in points:
                radius = width / 2
                draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=color)
            if n == index:
                x, y = points[0]
                draw.ellipse((x - 4, y - 4, x + 4, y + 4), fill='#12974c')
                x, y = points[-1]
                draw.ellipse((x - 4, y - 4, x + 4, y + 4), fill='#d23b32')
    sheet.save(path)

def corrected_candidate(record, candidate):
    correction = record.get('geometryCorrection')
    if correction is None:
        return candidate
    registry = json.loads((ROOT / 'scripts/hanja-stroke-textbook-corrections.json').read_text())
    matches = [recipe for recipe in registry['recipes']
               if recipe['glyph'] == record['glyph'] and recipe['id'] == correction]
    if len(matches) != 1:
        raise ValueError('Unknown or duplicated correction recipe')
    recipe = matches[0]
    canonical = {key: recipe[key] for key in ['glyph', 'id', 'geometrySource',
                 'sourceVideoSha256', 'originalMediansSha256']}
    canonical['strokes'] = [{'sourceStroke': stroke['sourceStroke'],
                             **({'points': stroke['points']} if 'points' in stroke else {})}
                            for stroke in recipe['strokes']]
    canonical['notes'] = recipe['notes']
    recipe_sha = hashlib.sha256(json.dumps(canonical, ensure_ascii=False,
                               separators=(',', ':')).encode()).hexdigest()
    original = candidate['medians']
    original_sha = hashlib.sha256(json.dumps(original, separators=(',', ':')).encode()).hexdigest()
    if (recipe['geometrySource'] != record.get('geometrySource', KO_SHA)
            or recipe_sha != record.get('correctionSha256')
            or recipe['sourceVideoSha256'] != record.get('sourceVideo', {}).get('sha256')
            or recipe['originalMediansSha256'] != original_sha
            or len(recipe['strokes']) != record['expectedStrokes']):
        raise ValueError('Correction recipe source or count mismatch')
    medians = []
    for stroke in recipe['strokes']:
        index = stroke['sourceStroke']
        if index is not None and (type(index) is not int or not 1 <= index <= len(original)):
            raise ValueError('Correction recipe source index invalid')
        points = stroke.get('points') if index is None else stroke.get('points', original[index - 1])
        if not isinstance(points, list) or len(points) < 2 or any(len(point) != 2 or any(
                type(value) not in (int, float) or not math.isfinite(value)
                for value in point) for point in points):
            raise ValueError('Correction recipe points invalid')
        medians.append(points)
    return {**candidate, 'medians': medians}


def timeline_sheet(frames, indices, times, output, title):
    cols, size, label = 6, 210, 26
    sheet = Image.new('RGB', (cols * size, math.ceil(len(indices) / cols) * (size + label)), 'white')
    draw = ImageDraw.Draw(sheet)
    for n, frame_index in enumerate(indices):
        x, y = n % cols * size, n // cols * (size + label)
        draw.text((x + 8, y + 5), f'{title} {times[frame_index]:.2f}s', fill='black')
        sheet.paste(Image.fromarray(frames[frame_index]).resize((size, size)), (x, y + label))
    sheet.save(output)


def inspect(record, source, candidate, output, fps, selected_times):
    url = source['manifestUrl'].replace('data/data_high.xlsx', f"media/video/{record['manifestRow']}.mp4")
    data = download(url, MAX_VIDEO_BYTES)
    video_sha = hashlib.sha256(data).hexdigest()
    if record.get('sourceVideo'):
        previous = record['sourceVideo']
        if previous['url'] != url or previous['sha256'] != video_sha or previous['bytes'] != len(data):
            raise ValueError('Previously inspected source video changed; do not reuse its review')
    probe = json.loads(run_tool(['ffprobe', '-v', 'error', '-show_entries',
                                'stream=width,height:format=duration', '-of', 'json', 'pipe:0'], data))
    duration = float(probe['format']['duration'])
    if not math.isfinite(duration) or not 0 < duration <= 120:
        raise ValueError('Unexpected video duration; inspect before decoding')
    video = next(stream for stream in probe['streams'] if 'width' in stream)
    if (video['width'], video['height']) != (1920, 1080):
        raise ValueError('Inspect the new layout before choosing a crop')
    # Layout observed from the full publisher frame; keep the entire glyph box.
    # These MP4 files store their index at the end and need a seekable input.
    # Decode the exact bytes whose hash is recorded, then remove the temp video.
    with tempfile.NamedTemporaryFile(suffix='.mp4', dir=output) as video_file:
        video_file.write(data)
        video_file.flush()
        raw = run_tool(['ffmpeg', '-v', 'error', '-i', video_file.name, '-an', '-vf',
                        f'fps={fps},crop=850:740:120:220,scale=256:256',
                        '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1'], None)
    frames = np.frombuffer(raw, dtype=np.uint8).reshape((-1, 256, 256, 3))
    times = np.arange(len(frames)) / fps
    delta = np.mean(np.abs(frames[1:].astype(np.int16) - frames[:-1].astype(np.int16)), axis=(1, 2, 3))
    # Summarize continuous quiet spans, not a claim about semantic stroke ends.
    spans, start = [], None
    for n, value in enumerate(delta):
        if value < 0.12 and start is None:
            start = n
        if start is not None and (value >= 0.12 or n == len(delta) - 1):
            end = n if value >= 0.12 else n + 1
            if end - start >= max(2, int(fps * 0.2)):
                spans.append([round(float(times[start]), 3), round(float(times[end]), 3)])
            start = None
    row = record['manifestRow']
    sample_indices = list(range(0, len(frames), max(1, int(fps / 2))))
    if sample_indices[-1] != len(frames) - 1:
        sample_indices.append(len(frames) - 1)
    timeline_sheet(frames, sample_indices, times, output / f'{row}-timeline.png', row)
    indices = sorted(set([0, len(frames) - 1] + [min(len(frames) - 1, round(s[0] * fps)) for s in spans]))
    timeline_sheet(frames, indices, times, output / f'{row}-quiet.png', row)
    candidate_sheet(candidate['medians'], output / f'{row}-candidate.png')
    if selected_times:
        if any(time < 0 or time > duration for time in selected_times):
            raise ValueError('Requested observation time is outside the video')
        selected = [min(len(frames) - 1, round(time * fps)) for time in selected_times]
        for page, start in enumerate(range(0, len(selected), 36), 1):
            timeline_sheet(frames, selected[start:start + 36], times,
                           output / f'{row}-selected-{page}.png', row)
    return {'glyph': record['glyph'], 'manifestRow': row, 'sourceVideo': {'url': url,
            'sha256': video_sha, 'bytes': len(data)},
            'durationSeconds': duration, 'sampleFps': fps, 'quietSpans': spans,
            'frames': len(frames), 'expectedStrokes': record['expectedStrokes'],
            'candidateStrokes': len(candidate['medians']),
            'reviewStatus': 'unreviewed', 'selectedTimes': selected_times,
            'sheets': [str(output / f'{row}-{kind}.png')
                for kind in ['timeline', 'quiet', 'candidate']]}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--glyphs', required=True, help='Exact glyphs from the current review ledger')
    parser.add_argument('--output', type=Path, required=True, help='Temporary, non-public review image directory')
    parser.add_argument('--fps', type=int, default=10, choices=[10, 20, 30, 60])
    parser.add_argument('--geometry-source', choices=['ko', 'ja', 'mm'],
                        help='Override the recorded candidate for comparison only; never grants approval')
    parser.add_argument('--times', help='Comma-separated seconds for detailed observation sheets (36 frames per page)')
    args = parser.parse_args()
    selected_times = [float(time) for time in args.times.split(',')] if args.times else []
    if any(not math.isfinite(time) for time in selected_times):
        parser.error('Observation times must be finite')
    output = args.output.resolve()
    if output.is_relative_to(ROOT):
        parser.error('Use a temporary output directory outside the repository; publisher frames are not app assets')
    output.mkdir(parents=True, exist_ok=True)
    ledger = json.loads((ROOT / 'scripts/hanja-stroke-textbook-review.json').read_text())
    sources = json.loads((ROOT / 'docs/hanja-stroke-additional-sources/sources.json').read_text())
    source = next(s for s in sources['sources'] if s['id'] == ledger['sourceId'])
    records = {r['glyph']: r for r in ledger['records']}
    if any(glyph not in records for glyph in args.glyphs):
        parser.error('Glyph not in review ledger')
    candidates_by_source = {}
    for glyph in dict.fromkeys(args.glyphs):
        geometry_sha = ({'ko': KO_SHA, 'ja': JA_SHA, 'mm': MM_SHA}[args.geometry_source]
                        if args.geometry_source else records[glyph].get('geometrySource', KO_SHA))
        geometry_url = {KO_SHA: KO_URL, JA_SHA: JA_URL, MM_SHA: MM_URL}.get(geometry_sha)
        if not geometry_url:
            raise ValueError('Unknown geometry source')
        if geometry_sha not in candidates_by_source:
            geometry = download(geometry_url, 40_000_000)
            if hashlib.sha256(geometry).hexdigest() != geometry_sha:
                raise ValueError('Pinned geometry source changed')
            candidates_by_source[geometry_sha] = {
                entry['character']: entry for entry in map(json.loads, geometry.decode().splitlines())}
        candidate = candidates_by_source[geometry_sha].get(glyph)
        if candidate is None:
            raise ValueError(f'No exact glyph in selected geometry source: {glyph}')
        original_count = len(candidate['medians'])
        if not args.geometry_source:
            candidate = corrected_candidate(records[glyph], candidate)
        result = inspect(records[glyph], source, candidate, output, args.fps, selected_times)
        result['geometrySource'] = {'url': geometry_url, 'sha256': geometry_sha}
        result['originalCandidateStrokes'] = original_count
        result['geometryCorrection'] = None if args.geometry_source else records[glyph].get('geometryCorrection')
        print(json.dumps(result, ensure_ascii=False), flush=True)


if __name__ == '__main__':
    main()
