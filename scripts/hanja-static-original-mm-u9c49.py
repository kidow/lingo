#!/usr/bin/env python3
"""Exact 鱉 source adapter; reuse original MM renderer, XML checks and RAM publisher routes."""
import sys
sys.dont_write_bytecode = True
import hashlib, importlib.util, json
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
CONFIG_FILE = 'docs/hanja-source-raw-compare-u9c49-mm-whole-2026-10-28/config.json'
ADAPTER_FILE = 'scripts/hanja-static-original-mm-u9c49.py'
EXPECTED = json.loads("{\"schema\":\"hanja-fixed-MM-original-filled-whole/v1\",\"kind\":\"fixed-mm-original-filled-whole-u9c49\",\"glyph\":\"鱉\",\"catalogStrokes\":22,\"originalFilledStrokes\":22,\"dictionaryPlaybackStrokes\":22,\"source\":{\"path\":\"docs/hanja-source-original-u9c49-mm-2026-10-27/source-record.json\",\"SHA256\":\"c33ca8c74b6f186a031ef7c2ffaffffa1ca9950ea8b45729d6553080a0c69c2b\",\"originalRecordSHA256\":\"1c609a0bcd08cb4c0f1c700bb1737ddeb014e142241cf0486b3389a53a42dbbd\",\"revision\":\"bddc96d41bef78427ed0e034e9f7e31d71fd1b92\",\"wholeCorpusSHA256\":\"a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee\"},\"domestic\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/9C00/9C49.svg\",\"status\":200,\"bytes\":10760,\"sha256\":\"b828b858e6f6f0b1d65083947df7c303bcba24e1d13a28fbabe4afbe18663622\",\"clips\":22,\"glyph\":\"鱉\",\"privateMediaSaved\":false},\"license\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false},\"sharedServe\":{\"path\":\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\",\"SHA256\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"},\"inputSHA256\":{\"docs/hanja-source-original-u9c49-mm-2026-10-27/source-record.json\":\"c33ca8c74b6f186a031ef7c2ffaffffa1ca9950ea8b45729d6553080a0c69c2b\",\"docs/hanja-source-raw-compare-u9c49-hkcs-m-whole-2026-10-25/config.json\":\"73e527c093798b341805cfdaffe35efdaf57fe7c4312e353aa732ded97165bd4\",\"docs/hanja-source-raw-compare-u9c49-mm-whole-2026-10-28/readiness.json\":\"d689ec18d25f65738d08818c2770e17d4f6c4c341a8860e8c7661a73115bbc0c\",\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\",\"public/hanja-strokes/ARPHICPL.txt\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\",\"scripts/hanja-static-original-mm-u6715.py\":\"26f1f172a54fd35483a2db80dd56cdfb43cb58d1a7396d669de12784a1d81562\"},\"sourceViewBox\":\"0 0 1024 1024\",\"sourceTransform\":\"translate(0 900) scale(1 -1)\",\"wholeOnly\":true,\"noPartialAnimation\":true,\"host\":\"127.0.0.1\",\"filledGeometryApproved\":false,\"domesticStrokeOrderApproved\":false,\"filledGapApproved\":false,\"nativeApproval\":false,\"runtimeApplied\":false,\"publisherReference\":{\"path\":\"docs/hanja-source-raw-compare-u9c49-mm-whole-2026-10-28/readiness.json\",\"SHA256\":\"d689ec18d25f65738d08818c2770e17d4f6c4c341a8860e8c7661a73115bbc0c\"},\"countDifferencePresent\":false,\"countEqualityIsNotApproval\":true,\"coreAdapter\":{\"path\":\"scripts/hanja-static-original-mm-u6715.py\",\"SHA256\":\"26f1f172a54fd35483a2db80dd56cdfb43cb58d1a7396d669de12784a1d81562\"}}")

def run_mm_original_whole(args, config, config_path):
    core_path = ROOT / EXPECTED['coreAdapter']['path']
    if hashlib.sha256(core_path.read_bytes()).hexdigest() != EXPECTED['coreAdapter']['SHA256']:
        raise ValueError('exact reviewed MM core bytes required')
    spec = importlib.util.spec_from_file_location('hanja_exact_mm_u9c49_core', core_path)
    core = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(core)
    core.EXPECTED = EXPECTED
    core.CONFIG_FILE = CONFIG_FILE
    core.ADAPTER_FILE = ADAPTER_FILE
    return core.run_mm_original_whole(args, config, config_path)
