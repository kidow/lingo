"""Read the Korean Language Society's public assignment workbook in memory.

Requires xlrd 2.0.2. This command never writes files. --inspect prints diagnostics;
the default emits structured source rows for the data import/verification step.
"""
import argparse
import base64
import collections
from concurrent.futures import ThreadPoolExecutor
import gzip
import hashlib
import http.cookiejar
import json
from pathlib import Path
import re
import struct
import unicodedata
import urllib.parse
import urllib.request
import zlib

import xlrd

SOURCE_URL = "https://www.hanja.re.kr/kccpt/exam/levelConfirm.do"
DOCUMENT = "배정한자 전체 대표훈음 부수 음표 명기본(xls).xls"
GRADES = [
    ("g8", "8급", ["80"], 50, 50),
    ("g7-2", "7급II", ["72"], 100, 100),
    ("g7", "7급", ["70"], 150, 150),
    ("g6-2", "6급II", ["62"], 225, 225),
    ("g6", "6급", ["60"], 300, 300),
    ("g5-2", "5급II", ["52"], 400, 400),
    ("g5", "5급", ["50"], 500, 500),
    ("g4-2", "4급II", ["42"], 750, 750),
    ("g4", "4급", ["40"], 1000, 1000),
    ("g3-2", "3급II", ["32"], 1500, 1500),
    ("g3", "3급", ["30"], 1817, 1817),
    ("g2", "2급", ["20", "12"], 2355, 2355),
    ("g1", "1급", ["10"], 3500, 3500),
    ("special-2", "특급II", ["02"], 4650, 4918),
    ("special", "특급", ["00"], 5978, 5978),
]


def readings(row):
    result = []
    for value in row["hunEum"].split("|"):
        # 원문의 이체자 주석과 장음 표시는 훈음 답안과 분리한다.
        value = re.sub(r"[\[(][\u3400-\u9fff\uf900-\ufaff]+[\])]", "", value)
        value = value.replace("빛날요:", "빛날 요:")
        match = re.fullmatch(r"(.+?)\s+([가-힣]+)(?::|\(:\))?", value.strip())
        if not match:
            raise ValueError(f"Unrecognized huneum row {row['sourceRow']}: {value}")
        result.append({"hun": match[1], "eum": match[2]})
    return result


def assignment_glyphs(data):
    glyphs = []
    for paragraph in data["paragraphs"]:
        if glyphs and "쓰기" in paragraph and len(paragraph) < 100:
            break
        if paragraph[:1] in "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ":
            glyphs.extend(paragraph[1:].split())
    assert glyphs and all(len(glyph) == 1 for glyph in glyphs)
    return glyphs


def display_glyph(glyph):
    normalized = unicodedata.normalize("NFC", glyph)
    # 급수별 HWP(2급 이상)는 熙, 전체 XLS는 煕로 적는다. HWP의 표시를 쓰고
    # XLS 원문은 sourceGlyph와 glyphAliases에 남겨 양쪽 모두 검색한다.
    return "熙" if normalized == "煕" else normalized


def character_from_row(row, label):
    glyph = display_glyph(row["glyph"])
    values = readings(row)
    character = {
        "id": f"u{ord(glyph):x}", "glyph": glyph, **values[0], "readingGrade": label,
        "radical": unicodedata.normalize("NFC", row["radical"]), "strokes": int(row["strokes"]),
        "sourceRow": row["sourceRow"], "sourceHunEum": row["hunEum"],
    }
    if len(values) > 1:
        character["readings"] = values
    if row["glyph"] != glyph:
        character["sourceGlyph"] = row["glyph"]
        character["glyphAliases"] = list(dict.fromkeys(value for value in [row["glyph"], unicodedata.normalize("NFC", row["glyph"])] if value != glyph))
    return character


def verify_root(data, root):
    cumulative, jobs, all_ids = set(), [], set()
    for gid, label, codes, unique, advertised in GRADES:
        path = Path(root) / "content" / "hanja" / "characters" / f"{gid}.json"
        actual = json.loads(path.read_text())
        assert actual["source"]["sha256"] == data["source"]["sha256"], f"Workbook changed: {gid}"
        expected = [character_from_row(row, label) for row in data["rows"] if row["gradeCode"] in codes]
        assert [{key: value for key, value in item.items() if key != "example"} for item in actual["characters"]] == expected, f"Content differs from official source: {gid}"
        for item in expected:
            assert item["id"] not in all_ids
            all_ids.add(item["id"])
            cumulative.add(item["glyph"])
        assert len(cumulative) == unique, f"Unique count: {gid}"
        assert actual["grade"]["cumulativeUnique"] == unique
        assert actual["grade"]["officialCount"] == advertised
        assert actual["grade"]["newCharacters"] == len(expected)
        jobs.append((gid, label, set(cumulative), actual["grade"]))

    def check_document(job):
        gid, label, expected, grade = job
        document = assignment(label)
        assert document["sha256"] == grade["assignmentSha256"], f"HWP changed: {gid}"
        glyphs = {display_glyph(glyph) for glyph in assignment_glyphs(document)}
        assert glyphs == expected, f"Official membership mismatch: {gid}: {expected ^ glyphs}"
        return {"id": gid, "new": grade["newCharacters"], "unique": len(glyphs), "officialCount": grade["officialCount"], "membershipVerified": True}

    with ThreadPoolExecutor(max_workers=3) as pool:
        report = list(pool.map(check_document, jobs))
    assert len(all_ids) == 5978
    return {"source": data["source"], "uniqueCharacters": len(all_ids), "readingSkills": len(all_ids) * 2, "grades": report}


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


def cached_workbook(prefix):
    parts = [json.loads(gzip.decompress(base64.b64decode(Path(f"{prefix}-{i}.gz.b64").read_text()))) for i in range(6)]
    assert all(part["source"] == parts[0]["source"] for part in parts)
    rows = [row for part in parts for row in part["rows"]]
    assert len(rows) == 5978
    assert [row["sourceRow"] for row in rows] == list(range(2, 5980))
    assert len({unicodedata.normalize("NFC", row["glyph"]) for row in rows}) == 5978
    return {**parts[0], "rows": rows}


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
    parser.add_argument("--cached-prefix", help="Read an already downloaded six-part snapshot")
    parser.add_argument("--compact", action="store_true", help="Compact source rows for the importer")
    parser.add_argument("--start", type=int, default=0)
    parser.add_argument("--limit", type=int, default=5978)
    parser.add_argument("--verify-root", help="Compare every runtime character against the XLS and all 15 HWP rosters")
    args = parser.parse_args()
    data = assignment(args.assignment) if args.assignment else cached_workbook(args.cached_prefix) if args.cached_prefix else workbook()
    if args.verify_root:
        print(json.dumps(verify_root(data, args.verify_root), ensure_ascii=False, indent=2))
    elif args.compact:
        print(json.dumps([[r["gradeCode"], r["glyph"], r["hunEum"], r["radical"], int(r["strokes"]), readings(r), r["sourceRow"]] for r in data["rows"][args.start:args.start + args.limit]], ensure_ascii=False, separators=(",", ":")))
    elif args.inspect and not args.assignment:
        inspect(data)
    else:
        print(json.dumps(data, ensure_ascii=False))
