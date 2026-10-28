#!/usr/bin/env python3
"""Exact 菏 source adapter; reuse original MM renderer, XML checks and RAM publisher routes."""
import sys
sys.dont_write_bytecode = True
import hashlib, importlib.util, json
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
CONFIG_FILE = 'docs/hanja-source-raw-compare-u83cf-mm-whole-2026-10-28/config.json'
ADAPTER_FILE = 'scripts/hanja-static-original-mm-u83cf.py'
EXPECTED = json.loads("{\"schema\":\"hanja-fixed-MM-original-filled-whole/v1\",\"kind\":\"fixed-mm-original-filled-whole-u83cf\",\"glyph\":\"菏\",\"catalogStrokes\":12,\"originalFilledStrokes\":11,\"dictionaryPlaybackStrokes\":12,\"source\":{\"path\":\"docs/hanja-source-original-u83cf-mm-2026-10-27/source-record.json\",\"SHA256\":\"f9af6506c2517a375d833493b37864c798017ccc04bb4fb33a2eae1379e89303\",\"originalRecordSHA256\":\"bc6517dd56bde8b2a8514d0f5aee003bc0ef75f462464a2c1684638b197501b6\",\"revision\":\"bddc96d41bef78427ed0e034e9f7e31d71fd1b92\",\"wholeCorpusSHA256\":\"a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee\"},\"domestic\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83cf.svg\",\"status\":200,\"bytes\":6125,\"sha256\":\"eeb73ad977f088459c3a9d1d906e6306277b736cbf321dcf119cf0facc2d99b8\",\"clips\":12,\"glyph\":\"菏\",\"privateMediaSaved\":false},\"license\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false},\"sharedServe\":{\"path\":\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\",\"SHA256\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"},\"inputSHA256\":{\"docs/hanja-source-original-u83cf-mm-2026-10-27/source-record.json\":\"f9af6506c2517a375d833493b37864c798017ccc04bb4fb33a2eae1379e89303\",\"docs/hanja-goal-glyphwiki-batch998-2026-10-13/metadata.json\":\"a47e681720fe5ffbf81d700d7a7181ed9b7ad114a20b5f54f6762fbfbe763d57\",\"docs/hanja-source-raw-compare-u83cf-mm-whole-2026-10-28/readiness.json\":\"dd7fe1a7293fe1e39430c5fc9a8b5bb9fab8b4b5656cadd326172748ac3ba1e0\",\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\",\"public/hanja-strokes/ARPHICPL.txt\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\",\"scripts/hanja-static-original-mm-u6715.py\":\"26f1f172a54fd35483a2db80dd56cdfb43cb58d1a7396d669de12784a1d81562\"},\"sourceViewBox\":\"0 0 1024 1024\",\"sourceTransform\":\"translate(0 900) scale(1 -1)\",\"wholeOnly\":true,\"noPartialAnimation\":true,\"host\":\"127.0.0.1\",\"filledGeometryApproved\":false,\"domesticStrokeOrderApproved\":false,\"filledGapApproved\":false,\"nativeApproval\":false,\"runtimeApplied\":false,\"publisherReference\":{\"path\":\"docs/hanja-source-raw-compare-u83cf-mm-whole-2026-10-28/readiness.json\",\"SHA256\":\"dd7fe1a7293fe1e39430c5fc9a8b5bb9fab8b4b5656cadd326172748ac3ba1e0\"},\"countDifferencePresent\":true,\"countEqualityIsNotApproval\":true,\"coreAdapter\":{\"path\":\"scripts/hanja-static-original-mm-u6715.py\",\"SHA256\":\"26f1f172a54fd35483a2db80dd56cdfb43cb58d1a7396d669de12784a1d81562\"}}")

def run_mm_original_whole(args, config, config_path):
    core_path = ROOT / EXPECTED['coreAdapter']['path']
    if hashlib.sha256(core_path.read_bytes()).hexdigest() != EXPECTED['coreAdapter']['SHA256']:
        raise ValueError('exact reviewed MM core bytes required')
    spec = importlib.util.spec_from_file_location('hanja_exact_mm_u83cf_core', core_path)
    core = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(core)
    core.EXPECTED = EXPECTED
    core.CONFIG_FILE = CONFIG_FILE
    core.ADAPTER_FILE = ADAPTER_FILE
    return core.run_mm_original_whole(args, config, config_path)
