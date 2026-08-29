# AUDIO

발음 오디오 규칙. **이 파일이 오디오의 단일 진실 소스**다.

이미지와 달리 오디오는 스크립트가 없다. 손으로 만들어 손으로 넣는다.
넣기만 하면 앱이 알아서 집어간다 — 등록할 곳도, 갱신할 필드도 없다.

---

## 무엇을 읽히나

**그 언어의 정답 필드를 읽힌다.** 일본어는 **읽기(かな)** 다.

| slug | 읽힐 텍스트 | 읽히면 안 되는 것 |
|---|---|---|
| `cat` | `ねこ` | ~~`猫`~~ · ~~`neko`~~ · ~~`고양이`~~ |
| `clock` | `とけい` | ~~`時計`~~ |
| `banana` | `バナナ` | |
| `bread` | `パン` | |

`content/*.json`의 `words.ja.reading` 값 그대로다.

표기(`猫`)를 읽히면 억양이 더 자연스러울 수는 있다. 그래도 읽기를 쓴다 —
학습자가 고르는 정답이 읽기이므로 **들리는 소리와 정답이 어긋나면 안 되고**,
다음톤 한자를 엉뚱하게 읽을 위험도 없앤다.

한국어 뜻이나 로마자는 절대 읽히지 않는다.

---

## 포맷 규격

| 항목 | 값 | 플레이그라운드에서 고를 이름 |
|---|---|---|
| 컨테이너 | **MP3** | Output format → `MP3` |
| 샘플레이트 | **24000 Hz** | Sample rate → `Broadcast` |
| 비트레이트 | **64 kbps** | Bit rate → `High` |
| 채널 | 모노 (스테레오여도 무방하나 크기만 커진다) | |
| 길이 | 단어 하나. 1초 안팎 | |
| 크기 | 개당 **10KB 안팎** | |

단어 하나를 1초 읽는 소리라 어느 등급을 골라도 귀로는 차이가 크지 않다. 그래도
**하나로 고정한다.** 파일마다 규격이 다르면 볼륨과 음색이 미묘하게 어긋나고,
그 어긋남은 피드를 넘길 때 드러난다.

콘솔은 수치 대신 등급 이름만 보여준다. 이름이 어느 수치인지는 보장되지 않으므로
받은 파일을 `ffprobe`로 확인하고, 다르면 `ffmpeg`으로 재인코딩한다. 이름이 무엇이든
레포에 들어가는 파일은 **24000 Hz · 64 kbps · 모노**다.

**MP3 아니면 WAV여야 한다.** `pcm` · `mulaw` · `alaw`는 브라우저가 재생하지 못한다 —
`<audio>`와 `decodeAudioData()`가 컨테이너 포맷만 받는다. WAV는 같은 길이에 6배 무겁다.

비트레이트를 128kbps로 올리면 개당 19KB가 된다. 이미지가 5KB인데 소리가 19KB면
균형이 맞지 않는다. 사람 목소리는 24kHz 64kbps에서 열화가 거의 들리지 않는다.

---

## 만드는 법 — xAI TTS

[문서](https://docs.x.ai/developers/model-capabilities/audio/text-to-speech) ·
[플레이그라운드](https://console.x.ai/team/default/voice/text-to-speech) ·
[API 키 발급](https://console.x.ai/team/default/api-keys)

### 파라미터

| 파라미터 | 값 | 비고 |
|---|---|---|
| `text` | 읽기 (`ねこ`) | 위 표 참고 |
| `language` | `ja` | BCP-47. xAI가 일본어를 지원한다 |
| `voice_id` | `ara` | Warm and friendly. 기본값 `eve`는 밝고 들뜬 톤이라 반복 재생에 지친다 |
| `output_format` | `{ "codec": "mp3", "sample_rate": 24000, "bit_rate": 64000 }` | 생략하면 24 kHz · **128 kbps**가 나온다. 샘플레이트는 같고 비트레이트만 두 배다 |
| `speed` | `1.0` | 범위는 `0.7`~`1.5`. 느리게 하려면 `0.9`까지만. 그 아래는 부자연스럽다 |
| `optimize_streaming_latency` | `0` | 콘솔의 `Quality`. `0`이 곧 "최적화 없음 = 최고 음질"이다 |
| `text_normalization` | `false` | 기본값. 아래 참고 |
| `with_timestamps` | `false` | 기본값. 글자별 타이밍을 쓸 곳이 없고 정렬 패스만큼 느려진다 |

뒤의 셋은 **기본값이 이미 우리가 원하는 값**이라 생략해도 된다. 그래도 적어 두는 이유는
콘솔에서 만들 때 스위치를 직접 만나기 때문이다.

- **스트리밍 지연 최적화를 끄는 이유** — 스트리밍을 하지 않는다. 파일 하나를 받아 레포에
  커밋하고 끝이라 첫 소리까지의 지연에 음질을 내줄 이유가 없다.
- **텍스트 정규화를 끄는 이유** — 숫자·약어·기호를 말로 풀어 읽는 기능이다. 읽히는 것은
  `ねこ` 같은 **단어 하나**라 풀 것이 없고, 켜 두면 입력과 들리는 소리가 달라질 여지만
  생긴다. 숫자를 읽히는 개념이 들어오면 그때 다시 보되 원칙은 같다 —
  **`reading` 값이 그대로 들려야 한다.**

**한 번 정하면 바꾸지 않는다.** 단어마다 목소리가 달라지면 피드가 어수선해진다.
바꾸려면 전체 재생성이다(맨 아래).

### curl

```bash
curl -X POST https://api.x.ai/v1/tts \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "ねこ",
    "language": "ja",
    "voice_id": "ara",
    "output_format": { "codec": "mp3", "sample_rate": 24000, "bit_rate": 64000 }
  }' \
  --output public/audio/ja/cat.mp3
```

`text`와 출력 파일명만 바꿔가며 반복한다. 응답이 바로 mp3 바이트다.

### 플레이그라운드로 만들 때

콘솔에는 수치 입력란이 없다. 아래처럼 고른다.

| 항목 | 고를 것 |
|---|---|
| Voice | `ara` |
| Speech Speed | `1.0x` |
| Streaming optimization | `Quality` |
| Output format | `MP3` |
| Sample rate | `Broadcast` |
| Bit rate | `High` |
| Text normalization | 끔 |
| Timestamps | 끔 |

받은 뒤 `ffprobe`로 값을 본다. 24000 Hz · 64 kbps가 아니면 **이름을 다시 고르지 말고**
재인코딩한다. 등급 이름이 어떤 수치인지는 보장되지 않지만, 이 한 줄을 거치면 결과는 항상 같다.

```bash
ffmpeg -i 받은파일.mp3 -ac 1 -ar 24000 -b:a 64k public/audio/ja/cat.mp3
```

---

## 어디에 넣나

```
public/audio/{language}/{slug}.mp3
```

`language`는 `content/*.json`의 `words` 키(`ja`), `slug`는 개념 slug다.

```
public/audio/ja/banana.mp3
public/audio/ja/bread.mp3
public/audio/ja/cat.mp3
public/audio/ja/clock.mp3
```

**파일명이 slug와 한 글자라도 다르면 앱이 못 찾는다.** 경로가 slug에서 계산되기 때문에
데이터에 경로 필드가 없고, 따라서 오타를 잡아줄 곳도 없다.

디렉터리가 없으면 만든다.

```bash
mkdir -p public/audio/ja
```

파일은 레포에 커밋한다. 개당 10KB라 이미지와 같은 취급이다.

---

## 넣은 뒤

등록 절차가 없다. 파일을 놓고 새로고침하면 발음 버튼이 켜진다.

```bash
pnpm check     # 어느 단어에 발음이 없는지 알려준다
```

`pnpm check`는 발음이 없다고 실패하지 않는다. 없는 것은 정상이고, 그 단어의 버튼이
비활성으로 남을 뿐이다.

---

## 검수 체크리스트

넣기 전에 들어본다. 하나라도 걸리면 다시 만든다.

- [ ] **읽기를 읽는다** — 한자 표기나 한국어 뜻이 아니다
- [ ] 억양이 맞다 — `はし`(다리/젓가락)처럼 고저로 뜻이 갈리는 단어는 특히 확인한다
- [ ] 앞뒤 무음이 길지 않다 — 탭했을 때 바로 소리가 나야 한다
- [ ] 볼륨이 다른 파일들과 비슷하다
- [ ] 목소리가 다른 파일들과 같다
- [ ] 파일명이 slug와 정확히 같다
- [ ] mp3이고 10KB 안팎이다
- [ ] **24000 Hz · 64 kbps · 모노다** — 콘솔 등급 이름을 믿지 말고 아래 `ffprobe`로 본다

포맷 확인:

```bash
ffprobe -v error -show_entries format=duration,bit_rate,size \
  -show_entries stream=codec_name,sample_rate,channels \
  -of default=noprint_wrappers=1 public/audio/ja/cat.mp3
```

---

## 발음이 없어도 된다

이미지와 다르다. **이미지는 모든 개념에 있어야 하지만**(카드 3종이 전부 이미지를 전제한다),
**발음은 없어도 학습이 돌아간다.** 없으면 버튼이 비활성으로 남는다.

버튼은 사라지지 않는다. 읽기 오른쪽 자리를 지키고 아이콘만 흐려진다 —
자리가 비면 옆 글자가 밀린다. (spec.md §3)

---

## 나중에 바꿀 때

목소리나 포맷을 바꾸면 **기존 파일과 새 파일이 섞인다.** 같은 피드 안에서 목소리가
바뀌면 어수선하므로, 변경은 전체 재생성을 원칙으로 한다.

`public/audio/`를 통째로 비우고 다시 만든다.

> 주의 — Next 이미지·정적 자산은 캐시가 살아 있으면 파일을 교체해도 브라우저가 옛 것을
> 계속 쓸 수 있다. 배포 후 소리가 안 바뀌면 강력 새로고침으로 먼저 확인한다.
