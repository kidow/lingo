"""Read the Korean Language Society's public assignment workbook in memory.

Requires xlrd 2.0.2. This command never writes files. --inspect prints diagnostics;
the default emits structured source rows for the data import/verification step.
"""
import argparse
import collections
import hashlib
import http.cookiejar
import json
import re
import struct
import unicodedata
import urllib.parse
import urllib.request
import zlib

import xlrd

SOURCE_URL = "https://www.hanja.re.kr/kccpt/exam/levelConfirm.do"
DOCUMENT = "배정한자 전체 대표훈음 부수 음표 명기본(xls).xls"


def download(document):
    client = urllib.request.build_opener(
        urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar())
    )
    with client.open(SOURCE_URL, timeout=30) as response:
        page = response.read().decode("utf-8")
    token = re.search(r'<meta name="_csrf" content="([^"]+)"', page).group(1)
    request = urllib.request.Request(
        "https://www.hanja.re.kr/file/downloadDoc.do",
        data=urllib.parse.urlencode({
            "folder_name": "levelConfirm", "file_name": document, "_csrf": token,
        }).encode(),
        headers={"X-CSRF-TOKEN": token},
    )
    with client.open(request, timeout=30) as response:
        raw = response.read()
    return raw


def workbook():
    raw = download(DOCUMENT)
    book = xlrd.open_workbook(file_contents=raw)
    sheet = book.sheet_by_name("배정한자")
    assert sheet.row_values(0) == ["대표음", "급수", "한자", "대표훈음", "부수", "획수", "총획", "음표"]
    rows = [dict(zip(["eum", "gradeCode", "glyph", "hunEum", "radical", "residualStrokes", "strokes", "soundMark"], sheet.row_values(i)), sourceRow=i + 1) for i in range(1, sheet.nrows)]
    notes = book.sheet_by_name("일러두기")
    return {
        "source": {"organization": "한국어문회", "url": SOURCE_URL, "document": DOCUMENT,
                   "sha256": hashlib.sha256(raw).hexdigest(), "bytes": len(raw)},
        "notes": [notes.row_values(i) for i in range(notes.nrows)],
        "rows": rows,
    }


class CompoundFile:
    """Minimal read-only CFB streams for the official HWP files."""
    def __init__(self, raw):
        assert raw[:8] == bytes.fromhex("d0cf11e0a1b11ae1")
        self.raw = raw
        self.size = 1 << struct.unpack_from("<H", raw, 30)[0]
        self.mini_size = 1 << struct.unpack_from("<H", raw, 32)[0]
        self.cutoff = self.uint(56)
        difat = list(struct.unpack_from("<109I", raw, 76))
        next_sector = self.uint(68)
        for _ in range(self.uint(72)):
            values = self.ints(self.sector(next_sector))
            difat.extend(values[:-1])
            next_sector = values[-1]
        self.fat = []
        for sector in difat:
            if sector < 0xfffffffa:
                self.fat.extend(self.ints(self.sector(sector)))
        directory = self.chain(self.uint(48), self.fat, self.sector)
        self.entries = {}
        for offset in range(0, len(directory), 128):
            entry = directory[offset:offset + 128]
            length = struct.unpack_from("<H", entry, 64)[0]
            if not length:
                continue
            name = entry[:length - 2].decode("utf-16le")
            self.entries[name] = (entry[66], struct.unpack_from("<I", entry, 116)[0], struct.unpack_from("<Q", entry, 120)[0])
        root = next(value for value in self.entries.values() if value[0] == 5)
        self.mini = self.chain(root[1], self.fat, self.sector)
        self.mini_fat = self.ints(self.chain(self.uint(60), self.fat, self.sector))

    def uint(self, offset):
        return struct.unpack_from("<I", self.raw, offset)[0]

    @staticmethod
    def ints(data):
        return list(struct.unpack("<" + "I" * (len(data) // 4), data))

    def sector(self, number):
        return self.raw[(number + 1) * self.size:(number + 2) * self.size]

    @staticmethod
    def chain(start, table, read):
        result = []
        seen = set()
        while start < 0xfffffffa:
            assert start not in seen, "CFB sector cycle"
            seen.add(start)
            result.append(read(start))
            start = table[start]
        return b"".join(result)

    def stream(self, name):
        _, start, size = self.entries[name]
        if size < self.cutoff:
            return self.chain(start, self.mini_fat, lambda n: self.mini[n * self.mini_size:(n + 1) * self.mini_size])[:size]
        return self.chain(start, self.fat, self.sector)[:size]


def assignment(grade):
    document = f"배정한자{grade}.hwp"
    raw = download(document)
    cfb = CompoundFile(raw)
    compressed = bool(struct.unpack_from("<I", cfb.stream("FileHeader"), 36)[0] & 1)
    paragraphs = []
    for name in sorted(cfb.entries):
        if not re.fullmatch(r"Section\d+", name):
            continue
        body = cfb.stream(name)
        if compressed:
            body = zlib.decompress(body, -15)
        offset = 0
        while offset < len(body):
            header = struct.unpack_from("<I", body, offset)[0]
            offset += 4
            tag, size = header & 0x3ff, header >> 20
            if size == 0xfff:
                size = struct.unpack_from("<I", body, offset)[0]
                offset += 4
            payload = body[offset:offset + size]
            offset += size
            if tag != 67:
                continue
            units = struct.unpack("<" + "H" * (len(payload) // 2), payload)
            clean, i = [], 0
            while i < len(units):
                code = units[i]
                if code < 32:
                    if code in [0, 10, 13, 24, 25, 30, 31]:
                        i += 1
                    else:
                        i += 8
                    clean.append(" ")
                else:
                    clean.append(chr(code))
                    i += 1
            text = "".join(clean).strip()
            if text:
                paragraphs.append(text)
    return {"document": document, "sha256": hashlib.sha256(raw).hexdigest(), "paragraphs": paragraphs}


def inspect(data):
    rows = data["rows"]
    print(json.dumps(data["source"], ensure_ascii=False))
    print("rows", len(rows), "grades", collections.Counter(r["gradeCode"] for r in rows))
    for name, normalize in [("raw", lambda s: s), ("NFC", lambda s: unicodedata.normalize("NFC", s))]:
        groups = collections.defaultdict(list)
        for row in rows:
            groups[normalize(row["glyph"])].append(row)
        print(name, "unique", len(groups), "duplicates", json.dumps([v for v in groups.values() if len(v) > 1], ensure_ascii=False))
    print("notes", json.dumps(data["notes"], ensure_ascii=False))
    unusual = [r for r in rows if not re.fullmatch(r'\S+ ' + re.escape(r["eum"]) + r'(?::|\(:\))?', r["hunEum"])]
    print("compound huneum", len(unusual), json.dumps(unusual[:18], ensure_ascii=False))
    print("unusual glyphs", json.dumps([r for r in rows if len(r["glyph"]) != 1 or not (0x3400 <= ord(r["glyph"]) <= 0x9fff or 0xf900 <= ord(r["glyph"]) <= 0xfaff or 0x20000 <= ord(r["glyph"]) <= 0x323af)], ensure_ascii=False))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--inspect", action="store_true")
    parser.add_argument("--assignment", help="Official HWP grade, e.g. 특급II")
    args = parser.parse_args()
    data = assignment(args.assignment) if args.assignment else workbook()
    if args.inspect and not args.assignment:
        inspect(data)
    else:
        print(json.dumps(data, ensure_ascii=False))
