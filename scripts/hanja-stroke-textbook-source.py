#!/usr/bin/env python3
"""Read the pinned Vivasam character manifest; never fetch or approve videos."""

import argparse
import hashlib
import io
import json
import re
import sys
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path, PurePosixPath


ROOT = Path(__file__).resolve().parents[1]
SOURCE_PATH = ROOT / "docs/hanja-stroke-additional-sources/sources.json"
SOURCE_ID = "vivasam-high-2022"
EXPECTED_ROWS = 1800
MAX_DOWNLOAD_BYTES = 1_000_000
MAX_XML_BYTES = 10_000_000
SHEET_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
NS = {"s": SHEET_NS}
HEADERS = {
    "A": "번호",
    "B": "학교급",
    "C": "자음",
    "D": "음",
    "E": "한자",
    "F": "뜻과 음",
    "G": "파일명",
}


class ManifestError(ValueError):
    """The source no longer matches the reviewed manifest contract."""


def validate_source_url(url):
    parsed = urllib.parse.urlsplit(url)
    if (
        parsed.scheme != "https"
        or parsed.netloc != "viewer.vivasam.com"
        or not parsed.path.startswith("/VS/HS/CHI/106502/QR/")
        or not parsed.path.endswith("/data/data_high.xlsx")
        or parsed.query
        or parsed.fragment
    ):
        raise ManifestError("Unexpected manifest URL")


def load_source(path=SOURCE_PATH):
    document = json.loads(Path(path).read_text(encoding="utf-8"))
    matches = [s for s in document["sources"] if s.get("id") == SOURCE_ID]
    if len(matches) != 1:
        raise ManifestError("Expected one Vivasam high-school source record")
    source = matches[0]
    validate_source_url(source["manifestUrl"])
    if not re.fullmatch(r"[0-9a-f]{64}", source["manifestSha256"]):
        raise ManifestError("Invalid pinned manifest SHA-256")
    if not isinstance(source["manifestBytes"], int) or not (
        0 < source["manifestBytes"] <= MAX_DOWNLOAD_BYTES
    ):
        raise ManifestError("Invalid pinned manifest byte count")
    if (
        source["manifestDataRows"] != EXPECTED_ROWS
        or source["manifestUniqueGlyphs"] != EXPECTED_ROWS
    ):
        raise ManifestError("Expected the 1,800-character source manifest")
    return source


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, request, response, code, message, headers, newurl):
        raise ManifestError("Manifest redirects require a new source review")


def read_manifest(source, manifest_file=None):
    """Read only the explicitly supplied file or the pinned public XLSX URL."""
    if manifest_file is not None:
        with Path(manifest_file).open("rb") as stream:
            data = stream.read(MAX_DOWNLOAD_BYTES + 1)
    else:
        validate_source_url(source["manifestUrl"])
        opener = urllib.request.build_opener(NoRedirect())
        with opener.open(source["manifestUrl"], timeout=30) as response:
            data = response.read(MAX_DOWNLOAD_BYTES + 1)
    if len(data) > MAX_DOWNLOAD_BYTES:
        raise ManifestError("Manifest exceeds the download size limit")
    return data


def verify_manifest(data, source):
    actual = hashlib.sha256(data).hexdigest()
    if actual != source["manifestSha256"]:
        raise ManifestError("Manifest SHA-256 differs from the reviewed source")
    if len(data) != source["manifestBytes"]:
        raise ManifestError("Manifest byte count differs from the reviewed source")
    return actual


def safe_archive_path(value):
    path = PurePosixPath(value)
    if (
        not value
        or "\\" in value
        or ":" in value
        or path.is_absolute()
        or any(part in (".", "..", "") for part in value.split("/"))
    ):
        raise ManifestError("External or unsafe XLSX archive path")


def parse_xml(data):
    if b"<!DOCTYPE" in data.upper() or b"<!ENTITY" in data.upper():
        raise ManifestError("XML entity declarations are not supported")
    try:
        return ET.fromstring(data)
    except ET.ParseError as error:
        raise ManifestError("Invalid XLSX XML") from error


def validate_archive(archive):
    names = archive.namelist()
    if len(names) != len(set(names)):
        raise ManifestError("Duplicate XLSX archive member")
    if sum(item.file_size for item in archive.infolist()) > MAX_XML_BYTES:
        raise ManifestError("Expanded XLSX exceeds the size limit")
    for name in names:
        safe_archive_path(name)
        if name.endswith(".rels"):
            root = parse_xml(archive.read(name))
            for relation in root.findall("{%s}Relationship" % REL_NS):
                if relation.get("TargetMode", "Internal") != "Internal":
                    raise ManifestError("External XLSX relationships are forbidden")
                safe_archive_path(relation.get("Target", ""))


def cell_value(cell, shared_strings):
    kind = cell.get("t")
    if kind == "inlineStr":
        return "".join(node.text or "" for node in cell.findall("s:is//s:t", NS))
    value = cell.find("s:v", NS)
    if value is None or value.text is None:
        raise ManifestError("Missing cached XLSX cell value")
    if kind == "s":
        if not re.fullmatch(r"\d+", value.text):
            raise ManifestError("Invalid shared-string index")
        index = int(value.text)
        if index >= len(shared_strings):
            raise ManifestError("Shared-string index is out of range")
        return shared_strings[index]
    if kind in (None, "n", "str"):
        # File-name formulas have cached strings. No formulas are evaluated.
        return value.text
    raise ManifestError("Unsupported XLSX cell type")


def row_values(row, shared_strings, expected_row):
    if row.get("r") != str(expected_row):
        raise ManifestError("Worksheet row numbers are duplicated or nonsequential")
    values = {}
    for cell in row.findall("s:c", NS):
        match = re.fullmatch(r"([A-Z]+)([1-9]\d*)", cell.get("r", ""))
        if match is None or int(match.group(2)) != expected_row:
            raise ManifestError("Invalid worksheet cell reference")
        column = match.group(1)
        if column in values:
            raise ManifestError("Duplicate worksheet cell")
        values[column] = cell_value(cell, shared_strings)
    if set(values) != set(HEADERS):
        raise ManifestError("Missing or unexpected manifest columns")
    return values


def parse_manifest(data, expected_rows=EXPECTED_ROWS):
    """Parse in-memory XLSX facts; callers must verify its source hash first."""
    try:
        with zipfile.ZipFile(io.BytesIO(data)) as archive:
            validate_archive(archive)
            strings_root = parse_xml(archive.read("xl/sharedStrings.xml"))
            strings = [
                "".join(node.text or "" for node in item.findall(".//s:t", NS))
                for item in strings_root.findall("s:si", NS)
            ]
            sheet = parse_xml(archive.read("xl/worksheets/sheet1.xml"))
    except (zipfile.BadZipFile, KeyError, RuntimeError) as error:
        raise ManifestError("Invalid or incomplete XLSX archive") from error
    rows = sheet.findall("s:sheetData/s:row", NS)
    if len(rows) != expected_rows + 1:
        raise ManifestError("Unexpected manifest data-row count")
    if row_values(rows[0], strings, 1) != HEADERS:
        raise ManifestError("Manifest headers differ from the reviewed source")

    entries = []
    seen_glyphs, seen_rows, seen_filenames = set(), set(), set()
    for position, row in enumerate(rows[1:], start=1):
        values = row_values(row, strings, position + 1)
        manifest_row, glyph, filename = values["A"], values["E"], values["G"]
        if manifest_row != "%04d" % position:
            raise ManifestError("Manifest IDs are duplicated or nonsequential")
        stripped = glyph.strip()
        if len(stripped) != 1 or not unicodedata.name(stripped, "").startswith(
            ("CJK UNIFIED IDEOGRAPH-", "CJK COMPATIBILITY IDEOGRAPH-")
        ):
            raise ManifestError("Expected one Hanja glyph in each row")
        if values["B"] not in ("중등", "고등"):
            raise ManifestError("Unexpected school level")
        if (
            not filename.startswith(manifest_row + " ")
            or not filename.endswith(".mp4")
            or any(char in filename for char in "/\\:%?#")
            or any(ord(char) < 32 for char in filename)
            or filename.strip() != filename
        ):
            raise ManifestError("Expected a video basename, not an external path")
        if (
            stripped in seen_glyphs
            or manifest_row in seen_rows
            or filename in seen_filenames
        ):
            raise ManifestError("Duplicate glyph, manifest ID or video filename")
        seen_glyphs.add(stripped)
        seen_rows.add(manifest_row)
        seen_filenames.add(filename)
        # Preserve the raw glyph, including source whitespace and compatibility
        # characters. Candidate normalization belongs to the review workflow.
        entries.append(
            {"glyph": glyph, "manifestRow": manifest_row, "videoFilename": filename}
        )
    return entries


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest-file", type=Path, help="Read an existing pinned XLSX")
    parser.add_argument("--json", action="store_true", help="Emit all factual row records")
    args = parser.parse_args(argv)
    try:
        source = load_source()
        data = read_manifest(source, args.manifest_file)
        digest = verify_manifest(data, source)
        entries = parse_manifest(data)
        result = {
            "source": {"id": SOURCE_ID, "sha256": digest, "url": source["manifestUrl"]}
        }
        if args.json:
            result["entries"] = entries
        else:
            result.update(
                bytes=len(data),
                dataRows=len(entries),
                uniqueGlyphs=len({entry["glyph"] for entry in entries}),
                uniqueManifestRows=len({entry["manifestRow"] for entry in entries}),
            )
        print(json.dumps(result, ensure_ascii=False, separators=(",", ":")))
        return 0
    except (
        ManifestError,
        OSError,
        urllib.error.URLError,
        json.JSONDecodeError,
        KeyError,
        TypeError,
        ValueError,
    ) as error:
        print("Manifest validation failed: %s" % error, file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
