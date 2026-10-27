#!/usr/bin/env python3
"""Exact 薪 source adapter; reuse original MM renderer, XML checks and RAM publisher routes."""
import sys
sys.dont_write_bytecode = True
import hashlib, importlib.util, json
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
CONFIG_FILE = 'docs/hanja-source-raw-compare-u85aa-mm-whole-2026-10-28/config.json'
ADAPTER_FILE = 'scripts/hanja-static-original-mm-u85aa.py'
EXPECTED = json.loads("{\"schema\":\"hanja-fixed-MM-original-filled-whole/v1\",\"kind\":\"fixed-mm-original-filled-whole-u85aa\",\"glyph\":\"薪\",\"catalogStrokes\":17,\"originalFilledStrokes\":16,\"dictionaryPlaybackStrokes\":17,\"source\":{\"path\":\"docs/hanja-source-original-u85aa-mm-2026-10-27/source-record.json\",\"SHA256\":\"625581a61b44b8e1d23fd153a734f5c1fa0812128bb8aff4f5eaebebce5e95e0\",\"originalRecordSHA256\":\"7bd2cb8685c2af9b0b2db32954e31cb4bea6522b21bb05ef4e366451bcf1dc4c\",\"revision\":\"bddc96d41bef78427ed0e034e9f7e31d71fd1b92\",\"wholeCorpusSHA256\":\"a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee\"},\"domestic\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85AA.svg\",\"status\":200,\"bytes\":8838,\"sha256\":\"fdf6d30028411b1b15b768238c919dbd44569ada1bb422e2b81a4e68e629f247\",\"clips\":17,\"glyph\":\"薪\",\"privateMediaSaved\":false},\"license\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false},\"sharedServe\":{\"path\":\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\",\"SHA256\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"},\"inputSHA256\":{\"docs/hanja-source-original-u85aa-mm-2026-10-27/source-record.json\":\"625581a61b44b8e1d23fd153a734f5c1fa0812128bb8aff4f5eaebebce5e95e0\",\"docs/hanja-goal-glyphwiki-batch1124-2026-10-14/metadata.json\":\"238f92cb134b71a3de9d4e27811b7c27e2424c2234cdf40738b9549144c87788\",\"docs/hanja-source-raw-compare-u85aa-mm-whole-2026-10-28/readiness.json\":\"6b67934076ee15645275e5afbc9f02c257c61c666ba2525aa372fede6e0b7a0e\",\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\",\"public/hanja-strokes/ARPHICPL.txt\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\",\"scripts/hanja-static-original-mm-u6715.py\":\"26f1f172a54fd35483a2db80dd56cdfb43cb58d1a7396d669de12784a1d81562\"},\"sourceViewBox\":\"0 0 1024 1024\",\"sourceTransform\":\"translate(0 900) scale(1 -1)\",\"wholeOnly\":true,\"noPartialAnimation\":true,\"host\":\"127.0.0.1\",\"filledGeometryApproved\":false,\"domesticStrokeOrderApproved\":false,\"filledGapApproved\":false,\"nativeApproval\":false,\"runtimeApplied\":false,\"publisherReference\":{\"path\":\"docs/hanja-source-raw-compare-u85aa-mm-whole-2026-10-28/readiness.json\",\"SHA256\":\"6b67934076ee15645275e5afbc9f02c257c61c666ba2525aa372fede6e0b7a0e\"},\"countDifferencePresent\":true,\"countEqualityIsNotApproval\":true,\"coreAdapter\":{\"path\":\"scripts/hanja-static-original-mm-u6715.py\",\"SHA256\":\"26f1f172a54fd35483a2db80dd56cdfb43cb58d1a7396d669de12784a1d81562\"}}")

def run_mm_original_whole(args, config, config_path):
    core_path = ROOT / EXPECTED['coreAdapter']['path']
    if hashlib.sha256(core_path.read_bytes()).hexdigest() != EXPECTED['coreAdapter']['SHA256']:
        raise ValueError('exact reviewed MM core bytes required')
    spec = importlib.util.spec_from_file_location('hanja_exact_mm_u85aa_core', core_path)
    core = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(core)
    core.EXPECTED = EXPECTED
    core.CONFIG_FILE = CONFIG_FILE
    core.ADAPTER_FILE = ADAPTER_FILE
    return core.run_mm_original_whole(args, config, config_path)
