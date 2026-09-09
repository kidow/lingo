#!/usr/bin/env python3
"""Inspect publisher videos entirely in memory; output a contact sheet, never approval data."""
import argparse
import base64
import hashlib
import io
import json
import math
from pathlib import Path
import re
import struct
import subprocess
import urllib.parse
import urllib.request
from PIL import Image, ImageDraw


def atoms(data, start=0, end=None):
    end = len(data) if end is None else end
    offset = start
    while offset < end:
        if end - offset < 8:
            raise ValueError('Truncated MP4 atom')
        size, kind = struct.unpack_from('>I4s', data, offset)
        header = 8
        if size == 1:
            if end - offset < 16:
                raise ValueError('Truncated large MP4 atom')
            size = struct.unpack_from('>Q', data, offset + 8)[0]
            header = 16
        if size == 0:
            size = end - offset
        if size < header or offset + size > end:
            raise ValueError('Invalid MP4 atom size')
        yield offset, size, kind, header
        offset += size


def faststart(data):
    """Move moov before mdat and adjust chunk offsets; hash the original bytes separately."""
    top = list(atoms(data))
    if any(a[2] in (b'moof', b'sidx') for a in top):
        raise ValueError('Fragmented MP4 is unsupported')
    for kind in (b'ftyp', b'moov'):
        if sum(a[2] == kind for a in top) != 1:
            raise ValueError('Expected exactly one ftyp and moov')
    ftyp = next(a for a in top if a[2] == b'ftyp')
    moov = next(a for a in top if a[2] == b'moov')
    order = [ftyp, moov] + [a for a in top if a not in (ftyp, moov)]
    locations, offset = {}, 0
    for atom in order:
        locations[atom[0]] = offset
        offset += atom[1]
    moves = [(a[0] + a[3], a[0] + a[1], locations[a[0]] - a[0]) for a in top if a[2] == b'mdat']
    if not moves:
        raise ValueError('Expected media data')
    block = bytearray(data[moov[0]:moov[0] + moov[1]])
    # A size-zero trailing moov would consume all following media after relocation.
    if struct.unpack_from('>I', block, 0)[0] == 0:
        struct.pack_into('>I', block, 0, len(block))

    def patch(start, end):
        for off, size, kind, header in atoms(block, start, end):
            if kind == b'mvex':
                raise ValueError('Fragmented MP4 is unsupported')
            if kind in (b'moov', b'trak', b'mdia', b'minf', b'stbl'):
                patch(off + header, off + size)
            elif kind in (b'stco', b'co64'):
                if size < header + 8:
                    raise ValueError('Truncated chunk offset table')
                count = struct.unpack_from('>I', block, off + header + 4)[0]
                width, fmt = (4, '>I') if kind == b'stco' else (8, '>Q')
                if header + 8 + count * width > size:
                    raise ValueError('Invalid chunk offset table length')
                for i in range(count):
                    pos = off + header + 8 + i * width
                    old = struct.unpack_from(fmt, block, pos)[0]
                    delta = next((d for lo, hi, d in moves if lo <= old < hi), None)
                    if delta is None:
                        raise ValueError('Chunk offset outside mdat')
                    struct.pack_into(fmt, block, pos, old + delta)
    patch(0, len(block))
    return b''.join(bytes(block) if a == moov else data[a[0]:a[0] + a[1]] for a in order)


def run(command, data):
    return subprocess.run(['rtk', 'proxy', *command], input=data, stdout=subprocess.PIPE,
                          stderr=subprocess.PIPE, check=True, timeout=45).stdout


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--row', required=True)
    parser.add_argument('--fps', type=int, default=2, choices=[1, 2, 5, 10])
    parser.add_argument('--times', help='Comma-separated sample times; rounded to the chosen fps grid')
    parser.add_argument('--start', type=int, default=0)
    parser.add_argument('--count', type=int, default=24)
    parser.add_argument('--width', type=int, default=144)
    parser.add_argument('--columns', type=int, default=6)
    parser.add_argument('--quality', type=int, default=55)
    parser.add_argument('--image-start', type=int, default=0)
    parser.add_argument('--image-length', type=int, default=50000)
    args = parser.parse_args()
    if not re.fullmatch(r'\d{4}', args.row) or not 32 <= args.width <= 850 or not 1 <= args.count <= 100:
        parser.error('Invalid row, width or frame count')
    if args.start < 0 or not 1 <= args.columns <= 12 or not 1 <= args.quality <= 100 or args.image_start < 0 or args.image_length < 0:
        parser.error('Invalid sheet or output range')
    root = Path(__file__).resolve().parent.parent
    source = (root / 'lib/hanja-stroke-textbook.ts').read_text()
    manifest_url = re.search(r"manifestUrl: '([^']+)'", source).group(1)
    url = urllib.parse.urljoin(manifest_url, '../media/video/' + args.row + '.mp4')
    with urllib.request.urlopen(url, timeout=30) as response:
        original = response.read(20_000_001)
    if len(original) > 20_000_000:
        raise ValueError('Video size limit exceeded')
    data = faststart(original)
    probe = json.loads(run(['ffprobe', '-v', 'error', '-i', 'pipe:0', '-show_entries',
                            'format=duration:stream=codec_type,width,height', '-of', 'json'], data))
    stream = next(s for s in probe['streams'] if s['codec_type'] == 'video')
    if stream['width'] < 970 or stream['height'] < 960:
        raise ValueError('Video dimensions differ from the reviewed publisher layout')
    duration = float(probe['format']['duration'])
    filters = f'fps={args.fps},crop=850:740:120:220,scale={args.width}:{args.width}'
    raw = run(['ffmpeg', '-v', 'error', '-i', 'pipe:0', '-an', '-vf', filters,
               '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1'], data)
    frame_size = args.width * args.width * 3
    if len(raw) % frame_size:
        raise ValueError('Partial decoded frame')
    total = len(raw) // frame_size
    times = [float(t) for t in args.times.split(',')] if args.times else None
    if times is not None and (len(times) > 100 or any(not math.isfinite(t) or t < 0 for t in times)):
        raise ValueError('Sample outside decoded video or sample limit')
    indices = ([round(t * args.fps) for t in times] if times is not None
               else list(range(args.start, min(total, args.start + args.count))))
    if not indices or any(i < 0 or i >= total for i in indices):
        raise ValueError('Sample outside decoded video')
    cell_height = args.width + 24
    sheet = Image.new('RGB', (args.columns * args.width, ((len(indices) + args.columns - 1) // args.columns) * cell_height), 'white')
    draw = ImageDraw.Draw(sheet)
    for position, index in enumerate(indices):
        frame = Image.frombytes('RGB', (args.width, args.width), raw[index * frame_size:(index + 1) * frame_size])
        x, y = (position % args.columns) * args.width, (position // args.columns) * cell_height
        sheet.paste(frame, (x, y))
        draw.text((x + 5, y + args.width + 4), f'{args.row}  {index / args.fps:.1f}s', fill='black')
    buffer = io.BytesIO()
    sheet.save(buffer, format='WEBP', quality=args.quality)
    encoded = base64.b64encode(buffer.getvalue()).decode('ascii')
    print(json.dumps({'row': args.row, 'sourceVideo': {'url': url, 'sha256': hashlib.sha256(original).hexdigest(), 'bytes': len(original)},
                      'durationSeconds': duration, 'fps': args.fps, 'frameCount': total,
                      'sampleTimes': [i / args.fps for i in indices], 'imageLength': len(encoded),
                      'imageStart': args.image_start, 'image': encoded[args.image_start:args.image_start + args.image_length]}, separators=(',', ':')))


if __name__ == '__main__':
    main()
