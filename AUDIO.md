# AUDIO

발음 오디오 규칙. **이 파일이 오디오의 단일 진실 소스**다.

이미지와 달리 오디오는 스크립트가 없다. 손으로 만들어 손으로 넣는다.
넣기만 하면 앱이 알아서 집어간다 — 등록할 곳도, 갱신할 필드도 없다.

---

## 무엇을 읽히나

**그 언어의 정답 필드를 읽힌다.** 일본어는 **읽기(かな)**, 영어는 **표기**다.

| slug | 언어 | 읽힐 텍스트 | 읽히면 안 되는 것 |
|---|---|---|---|
| `cat` | `en` | `cat` | ~~`고양이`~~ |
| `cat` | `ja` | `ねこ` | ~~`猫`~~ · ~~`neko`~~ · ~~`고양이`~~ |
| `clock` | `en` | `clock` | ~~`시계`~~ |
| `clock` | `ja` | `とけい` | ~~`時計`~~ |
| `banana` | `ja` | `バナナ` | |
| `bread` | `ja` | `パン` | |

`content/*.json`에서 그 언어의 **정답 필드** 값 그대로다 — 일본어는 `words.ja.reading`,
영어는 `words.en.term`이다. 어느 필드가 정답인지는 `lib/lang.ts`의 `LANG`이 정한다.

표기(`猫`)를 읽히면 억양이 더 자연스러울 수는 있다. 그래도 읽기를 쓴다 —
학습자가 고르는 정답이 읽기이므로 **들리는 소리와 정답이 어긋나면 안 되고**,
다음톤 한자를 엉뚱하게 읽을 위험도 없앤다.

한국어 뜻이나 로마자는 절대 읽히지 않는다.

---

## 포맷 규격

**규격의 단위는 수치가 아니라 콘솔의 등급이다.** 콘솔에 수치 입력란이 없으므로,
다음 사람이 똑같이 고를 수 있는 단위로 적어야 한다.

| 항목 | 고를 것 | 그 결과 (실측) |
|---|---|---|
| Output format | **MP3** | mp3 |
| Sample rate | **Broadcast** | 22050 Hz |
| Bit rate | **High** | 96 kbps |
| 채널 | — | 모노 |
| 길이 | 단어 하나 | 1초 안팎 |
| 크기 | — | 개당 **10KB 안팎** |

수치는 `banana.mp3`를 `ffprobe`로 재어 적은 것이다. 등급 이름이 어느 수치인지는
xAI가 문서화하지 않았다.

**이 중 진짜 제약은 셋뿐이다.**

- **MP3(또는 WAV)여야 한다.** `pcm` · `mulaw` · `alaw`는 브라우저가 재생하지 못한다 —
  `<audio>`와 `decodeAudioData()`가 컨테이너 포맷만 받는다. WAV는 같은 길이에 6배 무겁다.
- **모노여야 한다.** 스테레오는 크기만 2배다. 발음에 좌우 분리가 필요하지 않다.
- **10KB 안팎이어야 한다.** 이미지가 개당 5KB인데 소리가 20KB면 균형이 맞지 않는다.

샘플레이트와 비트레이트는 **취향이 아니라 재현성 문제다.** 22050과 24000, 64k와 96k는
1초짜리 단어에서 귀로 구분되지 않는다. 그래서 어느 쪽이 옳다고 고집하지 않되,
**전 파일이 같은 등급으로 만들어졌다**는 것만 지킨다.

받은 파일이 위 실측값과 다르면 등급을 잘못 고른 것이다. 그때만 재인코딩한다.

```bash
ffmpeg -i 받은파일.mp3 -ac 1 -ar 22050 -b:a 96k public/audio/ja/cat.mp3
```

**속도는 `1.0` 하나만 만든다.** 느리게 듣는 기능은 앱이 재생 시점에 `playbackRate`로
처리한다(spec.md §3). 느린 소리를 구워 두면 그게 원본이 되어 정상 속도를 영영 못 내고,
속도를 조정할 때마다 전체 재생성을 해야 한다.

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
| `output_format` | `{ "codec": "mp3", "sample_rate": 22050, "bit_rate": 96000 }` | 콘솔의 `Broadcast` + `High`와 같은 값. 생략하면 24 kHz · 128 kbps가 나와 콘솔로 만든 파일과 어긋난다 |
| `speed` | `1.0` | **고정이다.** 느리게 듣는 것은 앱이 재생 시점에 한다 |
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

받은 뒤 `ffprobe`로 22050 Hz · 96 kbps · 모노인지 확인한다. 다르면 등급을 잘못 고른
것이므로 등급을 고쳐 다시 받는다.

---

## 도구

```bash
pnpm audio                      # 트랙별로 얼마나 남았는지
pnpm audio list ja 10           # 만들 것 10개 — 읽힐 텍스트와 저장 경로
pnpm audio place ja cat ~/Downloads/speech.mp3
pnpm audio make ja 10           # API로 10개를 만들어 바로 제자리에 넣는다

pnpm audio manifest             # 넣은 뒤 — 화면이 읽을 목록을 다시 적는다
pnpm audio peaks [lang]         # 넣은 뒤 — 파형 막대를 굽는다
pnpm audio sync                 # R2 같은 S3 호환 저장소로 올린다 (rclone)
```

`make`는 위 파라미터 표 그대로 `POST /v1/tts`를 부르고, 받은 바이트를 규격에
맞춰 `public/audio/{lang}/{slug}.mp3`에 넣는다.

키는 **레포 루트 `.env`**에 둔다. `.gitignore`가 막고 있어 커밋되지 않는다.

```
XAI_API_KEY=xai-...
```

셸에 `export XAI_API_KEY=...` 해도 된다. 둘 다 있으면 **셸 쪽이 이긴다** —
`.env`는 이미 있는 환경변수를 덮어쓰지 않는다.

**개수를 반드시 적는다(기본 5).** 호출마다 크레딧이 나가므로 전부를 한 번에
굽는 명령은 두지 않았다. 첫 실패에서 멈춘다 — 키나 크레딧 문제면 나머지도
어차피 다 실패한다.

### 콘솔 화면은 자동화할 수 없다

플레이그라운드에서 사람이 만들어 `place`로 넣는 길은 열려 있다. 하지만
**에이전트가 화면을 대신 눌러 주는 것은 안 된다** — 만들어진 mp3를 브라우저
밖으로 꺼낼 방법이 없다. 다운로드 버튼이 파일을 내려 주지 않고, 페이지에서
로컬로 바이트를 보내는 길도 막혀 있다. 시도해 보고 적어 둔다.

자동화가 필요하면 화면이 아니라 API(`make`)를 쓴다.

`place`가 하는 일:

- **파일명을 대신 짓는다.** 경로가 slug에서 계산되므로 이름이 한 글자만 달라도 앱이
  조용히 못 찾는다. 실제로 났던 실수다(`neko.mp3` ← `cat`).
- **규격을 재고 맞춘다.** 22050 Hz · 96 kbps · 모노가 아니면 `ffmpeg`으로 재인코딩한다.
  콘솔 등급을 다시 고를 필요가 없다.
- 이미 있으면 멈춘다. 덮어쓰려면 `--force`.

## 어디에 넣나

```
public/audio/{language}/{slug}.mp3
```

`language`는 `content/*.json`의 `words` 키(`en` · `ja`), `slug`는 개념 slug다.

```
public/audio/en/banana.mp3
public/audio/ja/banana.mp3
public/audio/ja/bread.mp3
public/audio/ja/cat.mp3
public/audio/ja/clock.mp3
```

**같은 개념이라도 언어마다 파일이 따로다.** 이미지는 개념 하나에 한 장이지만
소리는 언어의 것이기 때문이다. 영어 발음을 넣어도 일본어 파일은 그대로 쓴다.

**파일명이 slug와 한 글자라도 다르면 앱이 못 찾는다.** 경로가 slug에서 계산되기 때문에
데이터에 경로 필드가 없고, 따라서 오타를 잡아줄 곳도 없다.

### 예문 소리 — 이름에 문장 지문을 넣는다

```
public/audio/{language}/ex/{slug}-{i}-{해시12}.mp3

public/audio/ja/ex/hand-0-9f3a2b1c77e0.mp3
public/audio/en/ex/spokesperson-1-4d81ee07a1b2.mp3
```

`i`는 그 낱말의 몇 번째 예문인지(0부터), 해시는 **문장 자체**에서 나온다.

낱말은 `{slug}.mp3`로 충분하다 — 표제어는 거의 안 바뀐다. 예문은 다르다. 한 세션에
870개를 갈아 끼운 적이 있는데, 이름을 `{slug}-{i}`로 지었다면 파일이 그대로 남아
**문장과 다른 소리**가 났을 것이다. 파일이 있으니 버튼은 켜지고 학습자는 틀린 소리를
듣는다 — 눈에 안 띄는 실패다.

해시를 넣으면 예문을 고쳤을 때 이름이 달라져 파일이 없어지고, 버튼이 조용히 안 뜬다.
남은 옛 파일은 `pnpm check`가 "지금 예문과 맞지 않습니다"로 잡는다. `slug-i`를 앞에
남기는 것은 사람이 찾을 수 있어야 하기 때문이다 — 해시만 쓰면 손으로 넣을 때 무엇이
무엇인지 알 수 없다.

해시는 FNV-1a 64비트의 아래 48비트(16진 12자)다. 브라우저와 스크립트가 같은 값을
내야 해서 의존성 없이 짠다 — WebCrypto의 sha256은 비동기라 렌더 중에 못 쓴다.
값은 `exampleAudioKey()`가 낸다 (lib/entries.ts).

디렉터리가 없으면 만든다.

```bash
mkdir -p public/audio/ja
```

파일은 **레포에 커밋하지 않는다.** `.gitignore`가 `public/audio/`를 막는다.
로컬에는 그대로 남는다 — `pnpm audio`도 `/debug` 점검도 파일을 직접 보기 때문이다.
만든 뒤에는 **`pnpm audio sync`로 R2에 올린다.**

---

## 옮겼다 — R2 (2026-09-12)

옮기기 전에는 레포에 뒀었다. Vercel이 Git 연동으로 빌드하고 정적 파일 개수
하드 캡이 없어 버틸 수 있었다. 무너진 것은 `.git`이다 — **982MB**까지 갔고
디스크 기준 기여도가 json 441MB · **mp3 400MB** · webp 44MB였다.
spec.md §4가 잡은 신호(`.git` 500MB 초과)를 한참 넘긴 값이다.

> 참고로 발음만 33,000개라 **Cloudflare Pages의 20,000개 한도는 애초에 넘겼다.**
> Vercel에 남는 이유가 이것이다.

### 지금 상태

| 무엇 | 값 |
|---|---|
| 버킷 | `lingo-audio` (`R2_REMOTE=r2:lingo-audio`) |
| 공개 주소 | `https://pub-…r2.dev` — **Public Development URL** |
| 낱말 | 33,155개 · 476MB |
| 예문 | 아직 0개 (`<lang>/ex/`) |

**용량 걱정은 없다.** R2 무료 티어는 저장 10 GB-month · 쓰기 100만/월 ·
읽기 1,000만/월 · **egress 무료**다. 예문(95,796개 ≈ 4.3GB)까지 다 넣어도
**약 5GB, 무료 한도의 절반**이다. 넘겨도 초과분이 GB당 월 $0.015다.

### 커스텀 도메인은 아직 안 붙였다

R2 커스텀 도메인은 **버킷과 같은 Cloudflare 계정의 zone**이어야 하는데
`dongwook.kim`은 Vercel 네임서버에 있다. partial(CNAME) setup은 Business
요금제 전용이라 쓸 수 없다. 그래서 지금은 r2.dev다.

잃는 것은 둘뿐이다 — **엣지 캐시**(r2.dev는 Cloudflare Cache를 안 탄다)와
**rate limit 보장**(문서가 숫자를 공개하지 않는다). 12KB mp3라 체감은 작다.

붙이려면 이 순서다.

1. Cloudflare에 `dongwook.kim`을 zone으로 추가하고 네임서버를 옮긴다 (무료)
   — **기존 레코드를 먼저 전부 옮긴다.** apex A 2개 · `www` · 와일드카드 ·
   그리고 **Daum 메일 MX 2개**. MX를 빠뜨리면 메일이 죽는다
2. R2 → `lingo-audio` → Settings → Custom Domains → `audio.dongwook.kim`
3. 붙인 뒤 **Public Development URL은 Disable** — 둘 다 열려 있으면 캐시가 우회된다
4. Vercel 환경변수를 바꾸고 **재배포** (빌드 타임에 박힌다)

### 히스토리에서도 뺐다 — `.git` 979MB → 93MB

같은 날 이어서 했다. 추적만 떼면 파일이 히스토리에 남아 clone이 그대로 무겁다.

```bash
git bundle create ~/lingo-pre-filter-$(date +%F).bundle --all   # 백업. 원격에 밀지 않는다
git-filter-repo --path public/audio --invert-paths --force
git remote add origin https://github.com/kidow/lingo.git        # filter-repo가 지운다
git push --force origin main
```

**백업은 원격에 밀지 않는다.** 백업 브랜치를 푸시하면 그 브랜치가 mp3를 붙잡아
GitHub 쪽 용량이 그대로다. 로컬 번들 하나면 된다 — `git bundle verify`로
"records a complete history"를 확인하고 넘어간다.

**예상보다 많이 줄었다.** 580MB를 예상했는데 93MB가 됐다. 둘이 더 있었다.

- **Codex 찌꺼기.** `refs/codex/turn-diffs/checkpoints/…` 세 개가 mp3 전량을
  붙잡고 있었다. filter-repo가 "Unexpected object of type tree, skipping"으로
  건너뛴 것들이다. `git update-ref -d`로 지워야 사라진다
- **loose 객체.** `git gc --prune=now --aggressive`가 마저 걷는다

`main`에서 도달하는 mp3가 0인지로 확인한다 — 전체 ref로 세면 저런 찌꺼기까지
잡혀 안 줄어든 것처럼 보인다.

```bash
git rev-list --objects main | grep -c '\.mp3$'   # 0 이어야 한다
git fsck --no-progress                           # 아무것도 안 나와야 한다
```

> **다른 곳의 클론은 전부 버린다.** 커밋 해시가 전부 바뀌었다. 옛 클론에서
> 푸시하면 mp3가 되살아난다. 다시 클론하거나 `git fetch && git reset --hard origin/main`.

---

## 어떻게 올라가나 — S3 호환 어디든

> 재생성은 **옮기고 나서** 한다. 저장소에 둔 채 33,000개를 다시 뽑으면
> 히스토리에 사본이 한 벌 더 쌓이고, 그건 옮긴 뒤에도 사라지지 않는다.

R2·Backblaze B2·S3 등 **S3 호환이면 무엇이든 된다.** 스크립트가 rclone에
맡기므로 바뀌는 것은 리모트 설정뿐이고, 넣는 값은 어디나 셋이다 —
액세스 키 ID · 시크릿 · 엔드포인트.

**Supabase Storage는 쓰지 않는다.** 용량은 이제 무료 티어를 넘겼다(1GB에 260MB —
쓰려면 유료다). 그때 재던 때는 209MB였다(무료 1GB,
egress 5GB면 12KB짜리 mp3 기준 월 43만 회). 막는 것은 둘이다.

- 무료 프로젝트는 **7일간 DB 활동이 없으면 일시정지**된다. 판단 기준이
  "user database activity"인데 우리는 Storage만 쓰고 쿼리가 0이라, 발음이
  매일 재생돼도 정지 대상이 된다. 정지되면 발음이 통째로 404다
- 지금 계정의 조직은 Pro라 프로젝트를 더 만들면 **월 $10**이다. 무료로 하려면
  별도 무료 조직이 필요하고, 한 조직에 Free와 Pro는 섞이지 않는다

한 번만 하는 준비.

```bash
brew install rclone
rclone config          # n → 이름 r2 → s3 → provider Cloudflare → 키 입력
```

`.env`에 리모트를 적는다 (`.env.example` 참고).

```
R2_REMOTE=r2:lingo-audio
```

이름이 `R2_`로 시작하지만 R2 전용이 아니다. rclone 리모트 이름이 무엇이든 들어간다.

만들고 나서 올린다. 바뀐 것만 올라간다 — 내용(체크섬)으로 보므로 다시 뽑아도
같은 파일이면 건너뛴다.

```bash
pnpm audio sync
```

**두 번 돈다.** 낱말과 예문은 이름 짓는 법이 달라 캐시 수명도 달라야 한다.

| 무엇 | 이름 | 캐시 |
|---|---|---|
| 낱말 `<lang>/<slug>.mp3` | slug 고정 — 다시 뽑아도 주소가 같다 | `max-age=86400` (하루) |
| 예문 `<lang>/ex/<slug>-<i>-<해시>.mp3` | 문장 해시가 이름에 있다 | `max-age=31536000, immutable` |

> **소리를 바꾸면 하루를 기다린다.** 낱말은 주소가 그대로라 브라우저가 옛 것을
> 하루까지 들고 있다. 급하면 강력 새로고침으로 먼저 확인한다. 예문은 이름이
> 바뀌므로 이 문제가 없다.

올리면 `.audio-synced` 도장이 찍힌다. 그보다 새로운 mp3가 있으면
`pnpm check`가 **"발음 N개가 R2에 안 올라갔습니다"** 로 알려 준다 — 로컬에서는
`public/`을 그대로 보므로 **안 올려도 내 화면에서는 멀쩡히 들린다.** 그게 위험하다.

앱이 보는 주소는 **`NEXT_PUBLIC_AUDIO_BASE`** 가 정한다.

| 어디 | 값 | 결과 |
|---|---|---|
| 로컬 | 비워 둔다 | `/audio/ja/cat.mp3` — `public/`을 그대로 본다 |
| 배포 | `https://pub-xxxx.r2.dev` | `https://pub-xxxx.r2.dev/audio/ja/cat.mp3` |

빌드 때 값이 박히므로 런타임 분기가 없다. 로컬과 배포가 같은 코드로 돈다.
**배포 환경변수를 바꾸면 재배포해야 반영된다.**

> 로컬에서 `out/`을 그대로 올려 배포한다면 `out/audio/`가 딸려 간다 —
> `public/`에 파일이 남아 있어서다. 그 경우 지우고 올린다: `rm -rf out/audio`

---

## 넣은 뒤 — 굽는 것이 둘 있다

파일을 놓는 것만으로는 끝이 아니다. **정적 내보내기라 도는 중에 디렉터리를 못
물어본다** — 무엇이 있고 없는지를 미리 적어 두어야 화면이 안다.

```bash
pnpm audio manifest    # lib/audio-have.ts — 발음이 없는 자리와 예문 소리가 있는 자리
pnpm audio peaks [lang] # public/peaks/<lang>.json — 듣기 카드에 깔리는 파형
pnpm check             # 둘 다 낡았으면 여기서 운다
```

`manifest`가 낡으면 **소리 없는 문제가 나간다** — 목록에 없는데 버튼이 켜진다.
`check`가 어긋난 열쇠를 다섯 개까지 그대로 찍어 준다.

    ! lib/audio-have.ts가 낡았습니다 — 1건 어긋납니다 (en/excuse-me).

`peaks`는 `ffmpeg`으로 소리를 훑어 낱말마다 **0~9 마흔 자**를 적는다
(`lib/peaks.ts`). 듣기 카드의 그림 자리에 깔리는 것이라 **없어도 카드는
성립한다** — `lib/corpus.ts`가 그렇게 짜여 있다.

**둘 다 커밋되는 생성물이라 HEAD 콘텐츠로 굽는다.** 다른 세션이 개념을 넣어
두고 아직 커밋하지 않았으면 `check`는 경고 대신 기록만 남긴다 — 그 콘텐츠를
커밋하는 쪽이 그때 함께 굽는 자리다 ([docs/concurrent-sessions.md](docs/concurrent-sessions.md)).

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
- [ ] **22050 Hz · 96 kbps · 모노다** — 아래 `ffprobe`로 본다. 다르면 등급을 잘못 골랐다

포맷 확인:

```bash
ffprobe -v error -show_entries format=duration,bit_rate,size \
  -show_entries stream=codec_name,sample_rate,channels \
  -of default=noprint_wrappers=1 public/audio/ja/cat.mp3
```

---

## 발음이 없어도 된다

이미지와 다르다. **이미지는 모든 개념에 있어야 하지만**(카드 5종이 전부 이미지를 전제한다),
**발음은 없어도 학습이 돌아간다.** 없으면 버튼이 비활성으로 남는다.

버튼은 사라지지 않는다. 읽기 오른쪽 자리를 지키고 아이콘만 흐려진다 —
자리가 비면 옆 글자가 밀린다. (spec.md §3)

---

## 나중에 바꿀 때

목소리나 포맷을 바꾸면 **기존 파일과 새 파일이 섞인다.** 같은 피드 안에서 목소리가
바뀌면 어수선하므로, 변경은 전체 재생성을 원칙으로 한다.

`public/audio/`를 통째로 비우고 다시 만든 뒤 `pnpm audio sync`로 다시 올린다.
파일명이 slug 고정이라 **주소가 그대로다** — CDN 캐시를 비우지 않으면 옛 소리가
계속 나간다.

> 주의 — Next 이미지·정적 자산은 캐시가 살아 있으면 파일을 교체해도 브라우저가 옛 것을
> 계속 쓸 수 있다. 배포 후 소리가 안 바뀌면 강력 새로고침으로 먼저 확인한다.
