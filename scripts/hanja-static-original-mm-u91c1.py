#!/usr/bin/env python3
"""Exact 釁 source adapter; reuse original MM renderer, XML checks and RAM publisher routes."""
import sys
sys.dont_write_bytecode = True
import hashlib, importlib.util, json
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
CONFIG_FILE = 'docs/hanja-source-raw-compare-u91c1-mm-whole-2026-10-28/config.json'
ADAPTER_FILE = 'scripts/hanja-static-original-mm-u91c1.py'
EXPECTED = json.loads("{\"schema\":\"hanja-fixed-MM-original-filled-whole/v1\",\"kind\":\"fixed-mm-original-filled-whole-u91c1\",\"glyph\":\"釁\",\"catalogStrokes\":25,\"originalFilledStrokes\":25,\"dictionaryPlaybackStrokes\":26,\"source\":{\"path\":\"docs/hanja-source-original-u91c1-mm-2026-10-27/source-record.json\",\"SHA256\":\"8c15282e57f9e1414c4e012fab52fc090189d35ed8b068eaaab4b30d10416bca\",\"originalRecordSHA256\":\"6534dc559fe0aa2d8e924fde8ba7b6b36493cd85ce8407e39078cd1e3ed66c48\",\"revision\":\"bddc96d41bef78427ed0e034e9f7e31d71fd1b92\",\"wholeCorpusSHA256\":\"a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee\"},\"domestic\":{\"url\":\"http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/91C1.svg\",\"status\":200,\"bytes\":12118,\"sha256\":\"d24cabbce191292c8e2ac3590015480b1c828ab263da21552b9ba5cf5b409549\",\"clips\":26,\"glyph\":\"釁\",\"privateMediaSaved\":false},\"license\":{\"kind\":\"Arphic Public License, original graphics.txt notice\",\"originalNoticeCopy\":{\"path\":\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\",\"SHA256\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\"},\"completeLicenseCopy\":{\"path\":\"public/hanja-strokes/ARPHICPL.txt\",\"SHA256\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\"},\"existingProjectRule\":\"scripts/hanja-stroke-audit.ts MAKE_ME_A_HANZI_SOURCE binds this exact graphics.txt revision and corpus SHA; no dictionary.txt used.\",\"freshUpstreamLicenseRequest\":false},\"sharedServe\":{\"path\":\"docs/hanja-source-raw-compare-u8a29-2026-10-21/serve.py\",\"SHA256\":\"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d\"},\"inputSHA256\":{\"docs/hanja-source-original-u91c1-mm-2026-10-27/source-record.json\":\"8c15282e57f9e1414c4e012fab52fc090189d35ed8b068eaaab4b30d10416bca\",\"docs/hanja-goal-glyphwiki-batch1056-2026-10-13/metadata.json\":\"def70587d4ebace8e57667d9a7fcda229ac30d98f3cd802053663621dd17d281\",\"docs/hanja-source-raw-compare-u91c1-mm-whole-2026-10-28/readiness.json\":\"497b9741db246748a6608c6109704ff14217d6ef3c2e6bde50a96e12a3260cb1\",\"public/hanja-strokes/MAKEMEAHANZI-COPYING.txt\":\"df2e856c73d2ddf036ba95556e25a27163de5cae6ef80e9509a86ec8ece9f84f\",\"public/hanja-strokes/ARPHICPL.txt\":\"76430f0e943a5a088af54d44a58af187be53528fffdfe5ce6abdfc44d508f78f\",\"scripts/hanja-static-original-mm-u6715.py\":\"26f1f172a54fd35483a2db80dd56cdfb43cb58d1a7396d669de12784a1d81562\"},\"sourceViewBox\":\"0 0 1024 1024\",\"sourceTransform\":\"translate(0 900) scale(1 -1)\",\"wholeOnly\":true,\"noPartialAnimation\":true,\"host\":\"127.0.0.1\",\"filledGeometryApproved\":false,\"domesticStrokeOrderApproved\":false,\"filledGapApproved\":false,\"nativeApproval\":false,\"runtimeApplied\":false,\"publisherReference\":{\"path\":\"docs/hanja-source-raw-compare-u91c1-mm-whole-2026-10-28/readiness.json\",\"SHA256\":\"497b9741db246748a6608c6109704ff14217d6ef3c2e6bde50a96e12a3260cb1\"},\"countDifferencePresent\":false,\"countEqualityIsNotApproval\":true,\"coreAdapter\":{\"path\":\"scripts/hanja-static-original-mm-u6715.py\",\"SHA256\":\"26f1f172a54fd35483a2db80dd56cdfb43cb58d1a7396d669de12784a1d81562\"}}")

def run_mm_original_whole(args, config, config_path):
    core_path = ROOT / EXPECTED['coreAdapter']['path']
    if hashlib.sha256(core_path.read_bytes()).hexdigest() != EXPECTED['coreAdapter']['SHA256']:
        raise ValueError('exact reviewed MM core bytes required')
    spec = importlib.util.spec_from_file_location('hanja_exact_mm_u91c1_core', core_path)
    core = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(core)
    core.EXPECTED = EXPECTED
    core.CONFIG_FILE = CONFIG_FILE
    core.ADAPTER_FILE = ADAPTER_FILE
    return core.run_mm_original_whole(args, config, config_path)
