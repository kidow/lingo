"""
예문 소리를 Qwen3-TTS로 만든다. (AUDIO.md §예문 소리)

  node scripts/audio.ts ex <lang> [개수|all]   ← 이 파일을 직접 부르지 않는다

낱말은 xAI TTS(ara)로 만들었다. 예문은 같은 ara 목소리를 **복제해** 로컬에서
만든다 — 7만 7천 문장을 API로 부르면 $35인데, 2026-09-24에 네 모델을 견주니
Qwen3-TTS 1.7B가 읽기 정확도는 xAI와 같고 목소리도 귀로 구별이 안 됐다.
참고 음성은 scripts/tts-ref/{lang}.mp3 — xAI ara로 만든 문장 하나다.

입력은 audio.ts가 넘기는 JSON(만들 것 목록)이다. 문장 해시로 이름을 짓는 일은
audio.ts가 한다 — 해시를 파이썬에서 다시 짜면 둘이 어긋날 때 조용히 못 찾는다.
"""

import json
import os
import subprocess
import sys
import tempfile
import time

import soundfile as sf
import torch
from qwen_tts import Qwen3TTSModel

MODEL = 'Qwen/Qwen3-TTS-12Hz-1.7B-Base'
NAME = {'en': 'English', 'ja': 'Japanese', 'zh': 'Chinese', 'es': 'Spanish', 'fr': 'French', 'de': 'German', 'ru': 'Russian'}

# 말 빠르기(글자/초). xAI ara로 만든 예문 20개씩에서 잰 값이다. 길이 검사의 기준
RATE = {'en': 14.8, 'ja': 7.4, 'zh': 4.4, 'es': 14.2, 'fr': 16.6, 'de': 14.7, 'ru': 14.1}

# 지어낸 소리를 거른다. 0.6B가 2.2초 문장을 21.7초로 늘린 일이 있었고 Whisper
# 채점으로는 안 잡혔다 — 길이만이 확실한 신호다. 벗어나면 다시 뽑는다
TRIES = 3


def expected(text: str, lang: str) -> float:
    return len(text) / RATE[lang] + 0.4


def plausible(seconds: float, text: str, lang: str) -> bool:
    e = expected(text, lang)
    return 0.5 * e <= seconds <= 1.8 * e + 1.0


def encode(wav, sr: int, target: str) -> None:
    """낱말과 같은 규격(22050 Hz · 96 kbps · 모노)에 음량을 -22 LUFS로 맞춘다.

    xAI 낱말은 -22 LUFS 언저리인데 Qwen은 문장마다 -24~-20으로 흔들린다.
    낱말 버튼 다음에 예문 버튼을 누르면 소리 크기가 튀지 않아야 한다.
    """
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
        sf.write(tmp.name, wav, sr)
        partial = target + '.part.mp3'
        subprocess.run(
            ['ffmpeg', '-v', 'error', '-y', '-i', tmp.name,
             '-af', 'loudnorm=I=-22:TP=-1.5:LRA=11',
             '-ac', '1', '-ar', '22050', '-b:a', '96k', partial],
            check=True,
        )
        # 다 쓴 뒤에 이름을 바꾼다. 중간에 멈추면 반쪽 파일이 "있는 것"으로 세어진다
        os.replace(partial, target)


def main() -> None:
    lang, todo_path = sys.argv[1], sys.argv[2]
    rows = json.load(open(todo_path))
    refs = json.load(open(os.path.join(os.path.dirname(__file__), 'tts-ref', 'ref.json')))

    started = time.time()
    model = Qwen3TTSModel.from_pretrained(MODEL, device_map='mps', dtype=torch.bfloat16, attn_implementation='sdpa')
    # 참고 음성은 mp3로 두고 wav로 풀어 넘긴다 — 모델의 로더가 mp3를 못 읽는 환경이 있다
    with tempfile.NamedTemporaryFile(suffix='.wav') as ref:
        subprocess.run(
            ['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(os.path.dirname(__file__), 'tts-ref', f'{lang}.mp3'),
             '-ac', '1', '-ar', '24000', ref.name],
            check=True,
        )
        prompt = model.create_voice_clone_prompt(ref_audio=ref.name, ref_text=refs[lang], x_vector_only_mode=False)
    print(f'모델을 올렸습니다 ({time.time() - started:.0f}초) — {lang} {len(rows)}개', flush=True)

    done, failed = 0, []
    started = time.time()
    for row in rows:
        for _ in range(TRIES):
            wavs, sr = model.generate_voice_clone(text=row['text'], language=NAME[lang], voice_clone_prompt=prompt)
            if plausible(len(wavs[0]) / sr, row['text'], lang):
                encode(wavs[0], sr, row['path'])
                done += 1
                break
        else:
            failed.append(row['slug'])
            print(f'  ! {row["slug"]} — {TRIES}번 모두 길이가 어긋났습니다: {row["text"]}', flush=True)
        if (done + len(failed)) % 100 == 0:
            rate = (time.time() - started) / (done + len(failed))
            left = (len(rows) - done - len(failed)) * rate / 3600
            print(f'  {done + len(failed)}/{len(rows)} · 문장당 {rate:.1f}초 · 남은 시간 {left:.1f}시간', flush=True)

    print(f'\n{lang} {done}개 완료 · 실패 {len(failed)}개', flush=True)
    if failed:
        print('  실패: ' + ' '.join(failed), flush=True)


if __name__ == '__main__':
    main()
