#!/usr/bin/env python3
# Reuse fixed original-clock RAM style restoration; no publisher SVG/CSS/style saved.
import sys
sys.dont_write_bytecode=True
import hashlib,importlib.util,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
BASE=ROOT/'scripts/hanja-official-media-compare-mm-grass.py'
assert hashlib.sha256(BASE.read_bytes()).hexdigest()=='376ccdfa4d21ec68388c7545dafceb81f431b98383f2f0211c52b1204df8811c'
s=importlib.util.spec_from_file_location('u9917_fixed_original_clock',BASE)
base=importlib.util.module_from_spec(s);s.loader.exec_module(base)
base.CASES=json.loads("[{\"unicode\":\"u9917\",\"glyph\":\"餗\",\"clips\":16,\"safeMetadata\":{\"path\":\"docs/hanja-official-media-compare-u9917-2026-10-28/source-metadata-safe.json\",\"SHA256\":\"cf783fe77bf6a232c138cefc5ce754a677c562a74c24ee7244dc00a48e36877f\"},\"metadataFile\":\"docs/hanja-goal-glyphwiki-batch662-2026-10-11/metadata.json\",\"metadataSHA256\":\"e54a70e41c31f546b0cbd81fde9e19625f706ee14e1763ff1468dccd67c77f60\",\"svg\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/9917.svg\",\"bytes\":7766,\"sha256\":\"7ea48a9fb43f0fedce0bbfd00750c0b1080ea429da08d17d3ef8922c489645fd\"},\"files\":[\"config-all.json\"]}]")
base.SELF='docs/hanja-official-media-compare-u9917-2026-10-28/compare-original-clock.py'
if __name__=='__main__':base.main()
