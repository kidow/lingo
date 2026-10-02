"""
틀어 놓고 듣는 mp3를 만든다 — 수영하며 골전도 이어폰으로 듣는 용도. (drill/)

  ../lingo-tts-bench/.venv-qwen/bin/python scripts/drill.py drill/ja-discourse.json 1

트랙 하나가 mp3 하나다. 두 바퀴로 짠다.

  1. 처음 듣기 — 표현마다
       [ko] 기능 · 뜻          [B] 표현 ×2
       [A] 말 → [B] 표현이 든 대답     [ko] 대화 뜻     [A] → [B] 한 번 더
       반말·존댓말 꼴이 다르면(reg pair) 존댓말 대화를 잇는다
  2. 떠올리기 — 순서를 섞어
       [ko] 기능   [A] 말   … 3초 …   [B] 대답

**목소리를 셋으로 가른다.** 골전도 이어폰은 물소리에 묻혀 또렷하지 않다 —
누가 말하는지가 목소리로 바로 갈려야 한다. B(외울 표현)는 앱의 예문 소리와 같은
ara 복제(scripts/tts-ref/ja.mp3), A(말 거는 쪽)는 macOS Reed를 참고로 한 복제,
한국어 안내는 macOS Yuna다. Reed 참고 음성은 `say`로 그 자리에서 만든다 —
바이너리를 커밋하지 않아도 다시 만들어진다.

소리 조각은 .drill/cache에 문장 해시로 남긴다. 대화 한 줄을 고쳐도 그 줄만 다시
만든다. 결과 mp3는 .drill/<lang>/에 쓰고 커밋하지 않는다.
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
REF_A_TEXT = 'きのうは えきまえの みせで ともだちと ばんごはんを たべました。'

# 쉼 (초)
AFTER_NARRATION = 0.6
BETWEEN_REPEAT = 0.9
BETWEEN_LINES = 0.5
AFTER_ITEM = 1.6
THINK = 3.0
LOUDNESS = -16  # 물속에서는 작은 소리가 묻힌다 — 앱(-22)보다 크게


def key(voice: str, text: str) -> str:
    return os.path.join(CACHE, hashlib.sha1(f'{voice}\n{text}'.encode()).hexdigest()[:16] + '.wav')


def to_wav(src: str, dst: str) -> None:
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-ac', '1', '-ar', str(SR), dst], check=True)


def trim(wav: np.ndarray) -> np.ndarray:
    """앞뒤 무음을 걷는다. 쉼을 이 스크립트가 정하려면 조각마다 붙은 무음이 없어야 한다"""
    loud = np.flatnonzero(np.abs(wav) > 0.02 * np.max(np.abs(wav)))
    if not len(loud):
        return wav
    pad = int(0.05 * SR)
    return wav[max(0, loud[0] - pad): loud[-1] + pad]


def say_korean(text: str, dst: str) -> None:
    with tempfile.NamedTemporaryFile(suffix='.aiff') as tmp:
        subprocess.run(['say', '-v', 'Yuna', '-r', '170', '-o', tmp.name, text], check=True)
        to_wav(tmp.name, dst)


def plausible(seconds: float, text: str) -> bool:
    # 한자가 섞여 글자 수로 길이를 못 잰다 — 지어낸 소리(몇 배로 늘어난 것)만 거른다
    return 0.2 <= seconds <= len(text) * 0.45 + 2.0


def load_model():
    import torch
    from qwen_tts import Qwen3TTSModel

    model = Qwen3TTSModel.from_pretrained(
        'Qwen/Qwen3-TTS-12Hz-1.7B-Base', device_map='mps', dtype=torch.bfloat16, attn_implementation='sdpa')
    refs = json.load(open(os.path.join('scripts', 'tts-ref', 'ref.json')))
    prompts = {}
    with tempfile.TemporaryDirectory() as tmp:
        b = os.path.join(tmp, 'b.wav')
        to_wav(os.path.join('scripts', 'tts-ref', 'ja.mp3'), b)
        prompts['B'] = model.create_voice_clone_prompt(ref_audio=b, ref_text=refs['ja'], x_vector_only_mode=False)
        aiff, a = os.path.join(tmp, 'a.aiff'), os.path.join(tmp, 'a.wav')
        subprocess.run(['say', '-v', 'Reed (일본어(일본))', '-o', aiff, REF_A_TEXT], check=True)
        to_wav(aiff, a)
        prompts['A'] = model.create_voice_clone_prompt(ref_audio=a, ref_text=REF_A_TEXT, x_vector_only_mode=False)
    return model, prompts


def plan(track: dict) -> list:
    """(목소리, 글) 또는 ('gap', 초)의 줄. 목소리는 ko · A · B"""
    out = [('ko', f'{track["title"]}. 처음 듣기.'), ('gap', 1.2)]
    items = track['items']
    for item in items:
        meaning = ', '.join(re.sub(r'\s*\(.*?\)', '', k) for k in item['ko'][:2])
        d = item['dialog']
        out += [('ko', f'{item["fn"]}. {meaning}.'), ('gap', AFTER_NARRATION),
                ('B', item['ja']), ('gap', BETWEEN_REPEAT), ('B', item['ja']), ('gap', AFTER_NARRATION),
                ('A', d['a']), ('gap', BETWEEN_LINES), ('B', d['b']), ('gap', AFTER_NARRATION),
                ('ko', f'{d["a_ko"]} {d["b_ko"]}'), ('gap', AFTER_NARRATION),
                ('A', d['a']), ('gap', BETWEEN_LINES), ('B', d['b'])]
        if p := item.get('dialog_polite'):
            out += [('gap', AFTER_NARRATION), ('ko', '존댓말로.'), ('gap', AFTER_NARRATION),
                    ('B', item['polite']), ('gap', AFTER_NARRATION),
                    ('A', p['a']), ('gap', BETWEEN_LINES), ('B', p['b'])]
        out.append(('gap', AFTER_ITEM))
    out += [('gap', 1.0), ('ko', '이번에는 떠올리기. 말을 듣고, 뭐라고 대답할지 먼저 떠올려 보세요.'), ('gap', 1.5)]
    # 같은 트랙은 늘 같은 순서로 섞는다 — 들을 때마다 바뀌면 몇 번째인지 못 짚는다
    for item in random.Random(track['id']).sample(items, len(items)):
        d = item['dialog']
        out += [('ko', item['fn'] + '.'), ('gap', AFTER_NARRATION),
                ('A', d['a']), ('gap', THINK), ('B', d['b']), ('gap', AFTER_ITEM)]
    out += [('ko', f'{track["title"]}, 끝.')]
    return out


def main() -> None:
    path, track_id = sys.argv[1], int(sys.argv[2])
    data = json.load(open(path))
    track = next(t for t in data['tracks'] if t['id'] == track_id)
    lines = plan(track)
    os.makedirs(CACHE, exist_ok=True)

    todo = sorted({(v, t) for v, t in lines if v in ('A', 'B') and not os.path.exists(key(v, t))})
    for v, t in {(v, t) for v, t in lines if v == 'ko'}:
        if not os.path.exists(key(v, t)):
            say_korean(t, key(v, t))
    if todo:
        model, prompts = load_model()
        print(f'일본어 조각 {len(todo)}개를 만듭니다', flush=True)
        for n, (v, t) in enumerate(todo, 1):
            for _ in range(3):
                wavs, sr = model.generate_voice_clone(text=t, language='Japanese', voice_clone_prompt=prompts[v])
                if plausible(len(wavs[0]) / sr, t):
                    break
            else:
                print(f'  ! 길이가 어긋난 채 씁니다: {v} {t}', flush=True)
            with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
                sf.write(tmp.name, wavs[0], sr)
                to_wav(tmp.name, key(v, t))
            if n % 20 == 0:
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
        # 목소리마다 크기가 달라(say는 크고 Qwen은 작다) 조각마다 먼저 맞춘다. 끝의 loudnorm은 전체만 본다
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
