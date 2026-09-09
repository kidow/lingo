#!/usr/bin/env python3
"""Offline, in-memory regression tests; run with python3 -B."""
import base64
import contextlib
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import struct
import sys
import unittest
from unittest.mock import patch

sys.dont_write_bytecode = True
SPEC = importlib.util.spec_from_file_location(
    'memory_review', Path(__file__).with_name('hanja-stroke-memory-review.py'))
review = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(review)


def box(kind, payload=b'', *, large=False, to_end=False):
    if large:
        return struct.pack('>I4sQ', 1, kind, len(payload) + 16) + payload
    return struct.pack('>I4s', 0 if to_end else len(payload) + 8, kind) + payload


def chunk_table(kind, offsets):
    fmt = '>I' if kind == b'stco' else '>Q'
    payload = b'\0' * 4 + struct.pack('>I', len(offsets))
    return box(kind, payload + b''.join(struct.pack(fmt, n) for n in offsets))


def movie_header(tables, *, large=False, to_end=False, extra=b''):
    nested = box(b'stbl', tables)
    for kind in (b'minf', b'mdia', b'trak'):
        nested = box(kind, nested)
    return box(b'moov', nested + extra, large=large, to_end=to_end)


def fixture(layout=('ftyp', 'mdat-a', 'moov'), *, kinds=(b'stco',),
            large_moov=False, zero_moov=False, extra_moov=b''):
    """Offsets refer to identifiable payload bytes in each individual mdat."""
    chunks = [('mdat-a', b'ALPHA-payload-123456789', 2)]
    if 'mdat-b' in layout:
        chunks.append(('mdat-b', b'BETA-payload-987654321', 3))
    parts = {
        'ftyp': box(b'ftyp', b'isom\0\0\0\0isom'),
        'free': box(b'free', b'untouched metadata'),
        **{name: box(b'mdat', payload) for name, payload, _ in chunks},
    }

    def header(offsets):
        return movie_header(b''.join(chunk_table(k, offsets) for k in kinds),
                            large=large_moov, to_end=zero_moov, extra=extra_moov)

    parts['moov'] = header([0] * len(chunks))
    positions, cursor = {}, 0
    for name in layout:
        positions[name] = cursor
        cursor += len(parts[name])
    offsets = [positions[name] + 8 + inside for name, _, inside in chunks]
    parts['moov'] = header(offsets)
    return b''.join(parts[name] for name in layout), parts, chunks, offsets


def table_values(data, kind):
    """Read the uniquely named fixture table independently of the utility walker."""
    position = data.index(kind)
    count = struct.unpack_from('>I', data, position + 8)[0]
    width, fmt = (4, '>I') if kind == b'stco' else (8, '>Q')
    return [struct.unpack_from(fmt, data, position + 12 + i * width)[0]
            for i in range(count)]


class AtomTests(unittest.TestCase):
    def test_regular_extended_and_to_end_atoms(self):
        data = box(b'free', b'a') + box(b'wide', b'bc', large=True) + box(b'mdat', b'def', to_end=True)
        self.assertEqual(list(review.atoms(data)), [
            (0, 9, b'free', 8), (9, 18, b'wide', 16), (27, 11, b'mdat', 8)])

    def test_child_zero_size_stops_at_parent_boundary(self):
        child = box(b'free', b'child', to_end=True)
        data = box(b'moov', child) + box(b'mdat', b'outside')
        self.assertEqual(list(review.atoms(data, 8, 8 + len(child))),
                         [(8, len(child), b'free', 8)])

    def test_truncated_or_impossible_atom_sizes_are_rejected(self):
        invalid = [b'x', b'1234567', struct.pack('>I4s', 1, b'moov'),
                   struct.pack('>I4s', 7, b'free'),
                   struct.pack('>I4s', 12, b'free'),
                   struct.pack('>I4sQ', 1, b'free', 15),
                   box(b'free') + b'x']
        for data in invalid:
            with self.subTest(data=data), self.assertRaises(ValueError):
                list(review.atoms(data))


class FaststartTests(unittest.TestCase):
    def assert_chunk_payloads_preserved(self, result, chunks, kind):
        actual = table_values(result, kind)
        expected = [result.index(payload) + inside for _, payload, inside in chunks]
        self.assertEqual(actual, expected)
        for offset, (_, payload, inside) in zip(actual, chunks):
            self.assertEqual(result[offset:offset + 5], payload[inside:inside + 5])

    def test_front_moov_is_byte_identical_for_both_offset_tables(self):
        original, _, chunks, offsets = fixture(('ftyp', 'moov', 'mdat-a'),
                                               kinds=(b'stco', b'co64'))
        result = review.faststart(original)
        self.assertEqual(result, original)
        for kind in (b'stco', b'co64'):
            self.assertEqual(table_values(result, kind), offsets)
            self.assert_chunk_payloads_preserved(result, chunks, kind)

    def test_rear_moov_relocates_stco_and_co64_without_mutating_input(self):
        original, parts, chunks, old_offsets = fixture(kinds=(b'stco', b'co64'))
        snapshot = bytes(original)
        result = review.faststart(original)
        self.assertEqual(original, snapshot)
        self.assertNotEqual(result, original)
        self.assertEqual([a[2] for a in review.atoms(result)], [b'ftyp', b'moov', b'mdat'])
        self.assertEqual(len(result), len(original))
        for kind in (b'stco', b'co64'):
            self.assertEqual(table_values(result, kind), [old_offsets[0] + len(parts['moov'])])
            self.assert_chunk_payloads_preserved(result, chunks, kind)

    def test_multiple_mdat_offsets_receive_their_own_relocation(self):
        original, parts, chunks, old_offsets = fixture(
            ('ftyp', 'mdat-a', 'free', 'moov', 'mdat-b'), kinds=(b'stco', b'co64'))
        result = review.faststart(original)
        self.assertIn(parts['free'], result)
        self.assertEqual([a[2] for a in review.atoms(result)],
                         [b'ftyp', b'moov', b'mdat', b'free', b'mdat'])
        for kind in (b'stco', b'co64'):
            self.assertEqual(table_values(result, kind),
                             [old_offsets[0] + len(parts['moov']), old_offsets[1]])
            self.assert_chunk_payloads_preserved(result, chunks, kind)

    def test_extended_moov_preserves_64_bit_atom_header(self):
        original, parts, chunks, _ = fixture(large_moov=True, kinds=(b'co64',))
        result = review.faststart(original)
        moov_start = len(parts['ftyp'])
        self.assertEqual(struct.unpack_from('>I4sQ', result, moov_start),
                         (1, b'moov', len(parts['moov'])))
        self.assert_chunk_payloads_preserved(result, chunks, b'co64')

    def test_zero_sized_trailing_moov_does_not_absorb_mdat_after_move(self):
        original, parts, chunks, _ = fixture(zero_moov=True)
        result = review.faststart(original)
        self.assertEqual([a[2] for a in review.atoms(result)], [b'ftyp', b'moov', b'mdat'])
        self.assertEqual(struct.unpack_from('>I', result, len(parts['ftyp']))[0], len(parts['moov']))
        self.assert_chunk_payloads_preserved(result, chunks, b'stco')

    def test_missing_or_duplicate_required_atoms_are_rejected(self):
        original, parts, _, _ = fixture()
        cases = [parts['ftyp'] + parts['mdat-a'], parts['moov'] + parts['mdat-a'],
                 original + parts['moov'], parts['ftyp'] + original]
        for data in cases:
            with self.subTest(length=len(data)), self.assertRaisesRegex(ValueError, 'exactly one'):
                review.faststart(data)

    def test_fragmented_top_level_atoms_are_rejected(self):
        original, _, _, _ = fixture()
        for kind in (b'moof', b'sidx'):
            with self.subTest(kind=kind), self.assertRaisesRegex(ValueError, 'Fragmented'):
                review.faststart(original + box(kind))

    def test_mvex_fragment_declaration_is_rejected_without_waiting_for_moof(self):
        original, _, _, _ = fixture(extra_moov=box(b'mvex', box(b'trex', b'\0' * 24)))
        with self.assertRaisesRegex(ValueError, 'Fragmented'):
            review.faststart(original)

    def test_invalid_nested_atom_is_rejected(self):
        original, parts, _, _ = fixture()
        invalid = parts['ftyp'] + movie_header(struct.pack('>I4s', 200, b'stco')) + parts['mdat-a']
        with self.assertRaises(ValueError):
            review.faststart(invalid)

    def test_truncated_chunk_offset_tables_are_rejected(self):
        _, parts, _, _ = fixture()
        for kind in (b'stco', b'co64'):
            for payload in (b'\0' * 4, b'\0' * 4 + struct.pack('>I', 2)):
                data = parts['ftyp'] + movie_header(box(kind, payload)) + parts['mdat-a']
                with self.subTest(kind=kind, size=len(payload)), self.assertRaises(ValueError):
                    review.faststart(data)

    def test_offsets_outside_mdat_payload_are_rejected(self):
        original, parts, _, offsets = fixture()
        mdat_start = len(parts['ftyp'])
        mdat_end = mdat_start + len(parts['mdat-a'])
        for value in (0, mdat_start, mdat_start + 7, mdat_end, len(original)):
            for kind in (b'stco', b'co64'):
                data = (parts['ftyp'] + parts['mdat-a'] + movie_header(chunk_table(kind, [value])))
                with self.subTest(kind=kind, offset=value), self.assertRaisesRegex(ValueError, 'outside mdat'):
                    review.faststart(data)


class SamplingTests(unittest.TestCase):
    WIDTH = 32
    COLORS = [(230, 10, 10), (10, 210, 10), (10, 10, 230), (220, 210, 10), (10, 210, 220)]

    def invoke(self, arguments, *, frame_count=5, raw_tail=b'', stream_size=(970, 960)):
        original, _, _, _ = fixture()
        expected_pipe = review.faststart(original)
        raw = b''.join(bytes(self.COLORS[i % len(self.COLORS)]) * (self.WIDTH ** 2)
                       for i in range(frame_count)) + raw_tail
        probe = {'streams': [{'codec_type': 'video', 'width': stream_size[0], 'height': stream_size[1]}],
                 'format': {'duration': '2.5'}}
        captured = io.StringIO()
        calls = []

        def execute(command, data):
            calls.append((command, data))
            self.assertEqual(data, expected_pipe)
            self.assertIn('pipe:0', command)
            return json.dumps(probe).encode() if command[0] == 'ffprobe' else raw

        with patch.object(review.Path, 'read_text', return_value="manifestUrl: 'https://example.invalid/data/list.xlsx'"), \
                patch.object(review.urllib.request, 'urlopen', return_value=io.BytesIO(original)) as request, \
                patch.object(review, 'run', side_effect=execute), \
                patch.object(sys, 'argv', ['memory-review', '--row', '1052', '--width', str(self.WIDTH), *arguments]), \
                contextlib.redirect_stdout(captured):
            review.main()
        self.assertEqual(len(calls), 2)
        request.assert_called_once_with('https://example.invalid/media/video/1052.mp4', timeout=30)
        result = json.loads(captured.getvalue())
        self.assertEqual(result['sourceVideo']['sha256'], hashlib.sha256(original).hexdigest())
        self.assertEqual(result['sourceVideo']['bytes'], len(original))
        self.assertEqual(result['frameCount'], frame_count)
        return result

    def test_start_count_clips_at_last_frame_and_decodes_real_sheet(self):
        result = self.invoke(['--start', '3', '--count', '10', '--columns', '2'])
        self.assertEqual(result['sampleTimes'], [1.5, 2.0])
        with review.Image.open(io.BytesIO(base64.b64decode(result['image']))) as image:
            self.assertEqual(image.size, (64, 56))
            for column, index in enumerate((3, 4)):
                actual = image.convert('RGB').getpixel((column * 32 + 16, 16))
                self.assertLess(max(abs(a - b) for a, b in zip(actual, self.COLORS[index])), 25)

    def test_explicit_times_round_to_grid_and_preserve_requested_order(self):
        result = self.invoke(['--times', '1.24,0.24,1.24', '--count', '1'])
        self.assertEqual(result['sampleTimes'], [1.0, 0.0, 1.0])

    def test_first_and_last_available_frames_are_valid(self):
        result = self.invoke(['--times', '0,2.0'])
        self.assertEqual(result['sampleTimes'], [0.0, 2.0])

    def test_out_of_bounds_selection_and_empty_video_are_rejected(self):
        cases = [(['--start', '5'], 5), (['--times', '2.5'], 5),
                 (['--times', '-1'], 5), ([], 0)]
        for arguments, count in cases:
            with self.subTest(arguments=arguments, count=count), \
                    self.assertRaisesRegex(ValueError, 'Sample outside decoded video'):
                self.invoke(arguments, frame_count=count)

    def test_negative_time_cannot_become_zero_when_rounded(self):
        with self.assertRaises(ValueError):
            self.invoke(['--times=-0.1'])

    def test_nonfinite_or_malformed_times_are_rejected(self):
        for value in ('nan', 'inf', '1,,2', 'nope'):
            with self.subTest(value=value), self.assertRaises((ValueError, OverflowError)):
                self.invoke(['--times=' + value])

    def test_explicit_times_cannot_bypass_100_sample_limit(self):
        with self.assertRaises(ValueError):
            self.invoke(['--times', ','.join(['0'] * 101)])

    def test_partial_raw_frame_is_rejected(self):
        with self.assertRaisesRegex(ValueError, 'Partial decoded frame'):
            self.invoke([], raw_tail=b'\0')

    def test_incompatible_crop_dimensions_are_rejected(self):
        for size in ((969, 960), (970, 959)):
            with self.subTest(size=size), self.assertRaisesRegex(ValueError, 'dimensions differ'):
                self.invoke([], stream_size=size)

    def test_image_output_chunks_reconstruct_the_same_in_memory_webp(self):
        full = self.invoke(['--count', '1'])
        first = self.invoke(['--count', '1', '--image-length', '23'])
        rest = self.invoke(['--count', '1', '--image-start', '23'])
        self.assertEqual(first['image'] + rest['image'], full['image'])
        self.assertEqual(first['imageLength'], len(full['image']))
        self.assertEqual(rest['imageStart'], 23)
        empty = self.invoke(['--count', '1', '--image-length', '0'])
        self.assertEqual(empty['image'], '')
        self.assertEqual(empty['imageLength'], full['imageLength'])

    def test_invalid_cli_ranges_fail_before_network_access(self):
        invalid = [('--start', '-1'), ('--count', '0'), ('--count', '101'),
                   ('--width', '31'), ('--width', '851'), ('--columns', '0'),
                   ('--columns', '13'), ('--quality', '0'), ('--quality', '101'),
                   ('--image-start', '-1'), ('--image-length', '-1'), ('--fps', '3'),
                   ('--row', '../1')]
        for option, value in invalid:
            with self.subTest(option=option, value=value), \
                    patch.object(review.urllib.request, 'urlopen') as request, \
                    patch.object(sys, 'argv', ['memory-review', '--row', '1052', option, value]), \
                    contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit):
                review.main()
            request.assert_not_called()


if __name__ == '__main__':
    unittest.main(verbosity=2)
