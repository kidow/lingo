"""
틀어 놓고 듣는 mp3를 만든다 — 수영하며 골전도 이어폰으로 듣는 용도. (drill/)

  ../lingo-tts-bench/.venv-qwen/bin/python scripts/drill.py drill/ja-discourse.json 1

트랙 하나가 mp3 하나다. 안내는 한 꼴뿐이다 — **«{한국어}는 일본어로» 뒤에 일본어.**
주제어(«반응·맞장구»)나 기능 이름은 읽지 않는다. 사용자가 시제품을 듣고 그렇게
정했다(2026-10-03) — 설명이 끼면 귀가 한국어에 머문다.

  1. 처음 듣기 — 표현마다
       응은 일본어로                  [B] うん … うん
       내일 와? 응, 갈게, 일본어로는    [A] 明日、来る?  [B] うん、行くよ。  (한 번 더)
       반말·존댓말 꼴이 다르면(reg pair) 존댓말 표현과 대화를 같은 꼴로 잇는다
  2. 떠올리기 — 순서를 섞어
       내일 와? 응, 갈게, 일본어로는   … 3초 …   [A] → [B]

**목소리 셋이 모두 Qwen3-TTS 복제다.** 골전도 이어폰은 물소리에 묻혀 또렷하지
않으므로 누가 말하는지가 목소리로 바로 갈려야 한다. 참고 음성은 xAI로 만든 문장
하나씩이다 — B(외울 표현)는 앱 예문과 같은 ara(tts-ref/ja.mp3), A(말 거는 쪽)는
rex(tts-ref/drill-ja-a.mp3), 한국어 안내는 eve(tts-ref/drill-ko.mp3). 처음에는
A와 한국어를 macOS `say`(Reed · Yuna)로 했다가 «기계 소리»라는 말을 들었다.

소리 조각은 .drill/cache에 목소리·문장 해시로 남긴다. 대화 한 줄을 고쳐도 그 줄만
다시 만든다. 결과 mp3는 .drill/<lang>/에 쓰고 커밋하지 않는다.
"""

import hashlib
import json
import os
import random
import re
import subprocess
import sys
import tempfile

import numpy as np
import soundfile as sf

SR = 24000
CACHE = os.path.join('.drill', 'cache')
REF = os.path.join('scripts', 'tts-ref')

# 목소리 → (참고 음성, 그 음성의 글, 읽을 언어)
VOICES = {
    'B': ('ja.mp3', None, 'Japanese'),  # 글은 ref.json의 ja
    'A': ('drill-ja-a.mp3', 'きのうは えきまえの みせで ともだちと ばんごはんを たべました。', 'Japanese'),
    'ko': ('drill-ko.mp3', '오늘은 날씨가 맑아서 공원에 산책하러 나갔어요. 바람도 시원했어요.', 'Korean'),
}

# 쉼 (초)
AFTER_NARRATION = 0.5
BETWEEN_REPEAT = 0.9
BETWEEN_LINES = 0.5
AFTER_ITEM = 1.6
THINK = 3.0
LOUDNESS = -16  # 물속에서는 작은 소리가 묻힌다 — 앱(-22)보다 크게


def key(voice: str, text: str) -> str:
    return os.path.join(CACHE, hashlib.sha1(f'qwen\n{voice}\n{text}'.encode()).hexdigest()[:16] + '.wav')


def to_wav(src: str, dst: str) -> None:
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-ac', '1', '-ar', str(SR), dst], check=True)


def trim(wav: np.ndarray) -> np.ndarray:
    """앞뒤 무음을 걷는다. 쉼을 이 스크립트가 정하려면 조각마다 붙은 무음이 없어야 한다"""
    loud = np.flatnonzero(np.abs(wav) > 0.02 * np.max(np.abs(wav)))
    if not len(loud):
        return wav
    pad = int(0.05 * SR)
    return wav[max(0, loud[0] - pad): loud[-1] + pad]


def plausible(seconds: float, text: str) -> bool:
    # 한자가 섞여 글자 수로 길이를 못 잰다 — 지어낸 소리(몇 배로 늘어난 것)만 거른다
    return 0.2 <= seconds <= len(text) * 0.45 + 2.0


def topic(word: str) -> str:
    """«응은» · «아니는» — 마지막 한글의 받침으로 은/는을 고른다"""
    word = word.rstrip('?!.… ')
    last = next((c for c in reversed(word) if '가' <= c <= '힣'), None)
    return word + ('은' if last and (ord(last) - 0xAC00) % 28 else '는')


def load_model():
    import torch
    from qwen_tts import Qwen3TTSModel

    model = Qwen3TTSModel.from_pretrained(
        'Qwen/Qwen3-TTS-12Hz-1.7B-Base', device_map='mps', dtype=torch.bfloat16, attn_implementation='sdpa')
    refs = json.load(open(os.path.join(REF, 'ref.json')))
    prompts = {}
    with tempfile.TemporaryDirectory() as tmp:
        for voice, (audio, text, _) in VOICES.items():
            wav = os.path.join(tmp, f'{voice}.wav')
            to_wav(os.path.join(REF, audio), wav)
            prompts[voice] = model.create_voice_clone_prompt(
                ref_audio=wav, ref_text=text or refs['ja'], x_vector_only_mode=False)
    return model, prompts


def alone(expr: str) -> str:
    """표현만 따로 읽힐 때는 마침표를 붙인다. 두 글자짜리(いえ · さあ)를 맨몸으로 주면
    모델이 いいえ로 늘이거나 엉뚱한 소리를 냈다 — Whisper로 대조해 잡았다"""
    return expr if expr[-1] in '?!。…' else expr + '。'


def dialog_lines(d: dict) -> list:
    return [('A', d['a']), ('gap', BETWEEN_LINES), ('B', d['b'])]


def dialog_cue(d: dict) -> str:
    return f'{d["a_ko"]} {d["b_ko"].rstrip(".")}, 일본어로는'


def plan(track: dict) -> list:
    """(목소리, 글) 또는 ('gap', 초)의 줄. 목소리는 ko · A · B"""
    out = []
    items = track['items']
    for item in items:
        d = item['dialog']
        out += [('ko', f'{topic(item["ko"][0])} 일본어로'), ('gap', AFTER_NARRATION),
                ('B', alone(item['ja'])), ('gap', BETWEEN_REPEAT), ('B', alone(item['ja'])), ('gap', AFTER_ITEM),
                ('ko', dialog_cue(d)), ('gap', AFTER_NARRATION),
                *dialog_lines(d), ('gap', BETWEEN_REPEAT), *dialog_lines(d), ('gap', AFTER_ITEM)]
        if (p := item.get('dialog_polite')) and item.get('ko_polite'):
            out += [('ko', f'{topic(item["ko_polite"])} 일본어로'), ('gap', AFTER_NARRATION),
                    ('B', alone(item['polite'])), ('gap', BETWEEN_REPEAT), ('B', alone(item['polite'])), ('gap', AFTER_ITEM),
                    ('ko', dialog_cue(p)), ('gap', AFTER_NARRATION), *dialog_lines(p), ('gap', AFTER_ITEM)]
        out.append(('gap', 0.6))
    out += [('gap', 1.0), ('ko', '이제 한국어를 듣고, 일본어를 먼저 떠올려 보세요.'), ('gap', 1.5)]
    # 같은 트랙은 늘 같은 순서로 섞는다 — 들을 때마다 바뀌면 몇 번째인지 못 짚는다
    for item in random.Random(track['id']).sample(items, len(items)):
        d = item['dialog']
        out += [('ko', dialog_cue(d)), ('gap', THINK), *dialog_lines(d), ('gap', AFTER_ITEM)]
    return out


def main() -> None:
    path, track_id = sys.argv[1], int(sys.argv[2])
    data = json.load(open(path))
    track = next(t for t in data['tracks'] if t['id'] == track_id)
    lines = plan(track)
    os.makedirs(CACHE, exist_ok=True)

    todo = sorted({(v, t) for v, t in lines if v != 'gap' and not os.path.exists(key(v, t))})
    if todo:
        model, prompts = load_model()
        print(f'조각 {len(todo)}개를 만듭니다', flush=True)
        for n, (v, t) in enumerate(todo, 1):
            for _ in range(3):
                wavs, sr = model.generate_voice_clone(text=t, language=VOICES[v][2], voice_clone_prompt=prompts[v])
                if plausible(len(wavs[0]) / sr, t):
                    break
            else:
                print(f'  ! 길이가 어긋난 채 씁니다: {v} {t}', flush=True)
            with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
                sf.write(tmp.name, wavs[0], sr)
                to_wav(tmp.name, key(v, t))
            if n % 25 == 0:
                print(f'  {n}/{len(todo)}', flush=True)

    parts = []
    script = []
    clock = 0.0
    for v, t in lines:
        if v == 'gap':
            parts.append(np.zeros(int(t * SR), dtype=np.float32))
            clock += t
            continue
        wav, sr = sf.read(key(v, t), dtype='float32')
        assert sr == SR
        wav = trim(wav)
        # 조각마다 크기를 먼저 맞춘다. 끝의 loudnorm은 전체만 본다
        wav = np.clip(wav * (0.08 / max(np.sqrt(np.mean(wav ** 2)), 1e-4)), -0.98, 0.98)
        script.append(f'{int(clock // 60):02d}:{clock % 60:04.1f}  {v:2}  {t}')
        parts.append(wav)
        clock += len(wav) / SR

    lang = data['lang']
    out_dir = os.path.join('.drill', lang)
    os.makedirs(out_dir, exist_ok=True)
    name = f'{track_id:02d}-{track["title"].replace(" ", "")}'
    target = os.path.join(out_dir, name + '.mp3')
    with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
        sf.write(tmp.name, np.concatenate(parts), SR)
        subprocess.run(
            ['ffmpeg', '-v', 'error', '-y', '-i', tmp.name,
             '-af', f'loudnorm=I={LOUDNESS}:TP=-1.5:LRA=11', '-ac', '1', '-ar', '44100', '-b:a', '128k',
             '-metadata', f'title={name}', '-metadata', f'album=lingo {lang} 담화 표현',
             '-metadata', f'track={track_id}', '-metadata', 'artist=lingo', target],
            check=True,
        )
    open(os.path.join(out_dir, name + '.txt'), 'w').write('\n'.join(script) + '\n')
    print(f'→ {target} ({int(clock // 60)}분 {int(clock % 60)}초)')


if __name__ == '__main__':
    main()
