/**
 * 발음 파일 도구. (spec.md §7, AUDIO.md)
 *
 *   node scripts/audio.ts                    아직 없는 발음을 트랙별로 센다
 *   node scripts/audio.ts list ja            그 언어에서 만들 것을 순서대로 출력
 *   node scripts/audio.ts place ja cat ~/Downloads/speech.mp3
 *   node scripts/audio.ts make ja 10        API로 10개를 만들어 바로 넣는다
 *   node scripts/audio.ts sync              만든 것을 R2로 올린다
 *
 * 콘솔에서 사람이 만들어 `place`로 넣어도 되고, 키가 있으면 `make`가 만들기까지
 * 한다. 어느 쪽이든 규격(AUDIO.md)과 저장 경로는 이 스크립트가 지킨다.
 *
 * 콘솔 **화면**으로는 자동화가 안 된다. 브라우저가 만든 mp3를 디스크로 꺼낼
 * 방법이 없어서다 — 다운로드가 막히고 페이지에서 로컬로 보내는 길도 막힌다.
 * 그래서 `make`는 화면이 아니라 API를 쓴다(유료, 호출마다 크레딧).
 *
 * 파일명을 slug와 다르게 저장하면 앱이 조용히 못 찾는다. 그 실수가 실제로
 * 났었다(neko.mp3 ← cat). `place`가 이름을 대신 지어 그 경로를 막는다.
 */
import { execFileSync } from 'node:child_process'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { exampleAudioKey } from '../lib/entries.ts'
import { answerOf, LANG } from '../lib/lang.ts'
import { TRACKS } from '../lib/track.ts'
import type { Concept, Language } from '../lib/types.ts'

/** AUDIO.md가 정한 규격. 콘솔에서는 Broadcast · High가 이 값이다 */
const FORMAT = { sampleRate: 22050, bitRate: 96000, channels: 1 }
const VOICE = 'ara'

const concepts: Concept[] = readdirSync('content')
  .filter((f) => f.endsWith('.json'))
  .sort()
  // 개념이 없는 콘텐츠 파일도 있다 — kana.json은 가나 표다
  .flatMap((f) => (JSON.parse(readFileSync(join('content', f), 'utf8')).concepts ?? []) as Concept[])

const audioPath = (lang: string, slug: string) => join('public', 'audio', lang, `${slug}.mp3`)

/** 그 언어에서 발음이 필요한 것. 이미 있는 것은 빼고 돌려준다 */
function missing(lang: Language) {
  return concepts.flatMap((concept) => {
    const word = concept.words[lang]
    if (!word) return []
    const text = answerOf(word, lang)
    if (!text) return []
    const path = audioPath(lang, concept.slug)
    return existsSync(path) ? [] : [{ slug: concept.slug, text, path }]
  })
}

const line = (n: number) => '─'.repeat(n)

/**
 * 발음이 없는 자리를 `lib/audio-have.ts`에 적는다.
 *
 * 앱은 정적 내보내기라 도는 중에 파일 존재를 물어볼 서버가 없다. 듣기 카드가
 * 소리 없는 문제를 내지 않으려면 **빌드 때 알고 있어야** 한다. 없는 것만 적는
 * 이유는 있는 것을 다 적으면 20,671줄이 번들에 실리기 때문이다.
 */
/**
 * 예문 소리 중 **있는** 것. 낱말과 방향이 반대다 (lib/audio-have.ts).
 *
 * 이름이 문장 해시라 예문을 고치면 열쇠가 바뀐다. 낡은 파일은 여기에 안 잡히고
 * `pnpm check`가 고아로 잡는다.
 */
function examplesPresent(): string[] {
  const keys: string[] = []
  for (const { language } of TRACKS)
    for (const concept of concepts) {
      const word = concept.words[language]
      if (!word) continue
      const list = word.examples ?? (word.example ? [word.example] : [])
      list.forEach((example, index) => {
        const key = exampleAudioKey(concept.slug, index, example.text)
        if (existsSync(join('public', 'audio', language, 'ex', `${key}.mp3`)))
          keys.push(`${language}/${key}`)
      })
    }
  return keys.sort()
}

function manifest() {
  const gone: string[] = []
  for (const { language } of TRACKS)
    for (const { slug } of missing(language)) gone.push(`${language}/${slug}`)
  gone.sort()
  const here = examplesPresent()

  const path = join('lib', 'audio-have.ts')
  const source = readFileSync(path, 'utf8')
  const list = (keys: string[]) =>
    keys.length === 0 ? '[]' : `[\n${keys.map((k) => `  '${k}',`).join('\n')}\n]`
  const next = source
    .replace(
      /export const AUDIO_MISSING: ReadonlySet<string> = new Set\([\s\S]*?\)\n/,
      `export const AUDIO_MISSING: ReadonlySet<string> = new Set(${list(gone)})\n`,
    )
    .replace(
      /export const EXAMPLE_AUDIO: ReadonlySet<string> = new Set\([\s\S]*?\)\n/,
      `export const EXAMPLE_AUDIO: ReadonlySet<string> = new Set(${list(here)})\n`,
    )
  writeFileSync(path, next)
  console.log(`\n발음 없는 자리 ${gone.length}건 · 예문 소리 ${here.length}건을 ${path}에 적었습니다\n`)
}

function summary() {
  console.log(`\n발음 현황 — 없는 것만 만들면 된다\n${line(46)}`)
  for (const { label, language } of TRACKS) {
    const total = concepts.filter((c) => c.words[language] && answerOf(c.words[language]!, language)).length
    const left = missing(language).length
    const bar = '■'.repeat(Math.round(((total - left) / Math.max(total, 1)) * 20)).padEnd(20, '·')
    console.log(`  ${label.padEnd(6)} ${bar} ${total - left}/${total}  (${language})`)
  }
  console.log(`\n다음: node scripts/audio.ts list <lang>`)
}

function list(lang: Language, limit: number) {
  const rows = missing(lang).slice(0, limit)
  if (rows.length === 0) return console.log(`\n${lang} 는 다 만들어져 있습니다.`)

  console.log(`\n${lang} — ${missing(lang).length}개 남음, 아래 ${rows.length}개\n${line(52)}`)
  console.log(`콘솔 설정: voice ${VOICE} · Output MP3 · Sample rate Broadcast · Bit rate High`)
  console.log(`           Streaming optimization Quality · Text normalization 끔\n`)
  for (const row of rows) {
    console.log(`  ${row.text}`)
    console.log(`    → ${row.path}\n`)
  }
  console.log(`받은 파일은 이렇게 넣습니다:`)
  console.log(`  node scripts/audio.ts place ${lang} ${rows[0].slug} ~/Downloads/받은파일.mp3`)
}

/** ffprobe 한 번으로 규격을 잰다 */
function probe(file: string) {
  const out = execFileSync('ffprobe', [
    '-v', 'error',
    '-show_entries', 'stream=sample_rate,channels',
    '-show_entries', 'format=bit_rate,duration',
    '-of', 'default=noprint_wrappers=1:nokey=0', file,
  ]).toString()
  const get = (key: string) => Number(out.match(new RegExp(`${key}=(\\d+(?:\\.\\d+)?)`))?.[1] ?? 0)
  return {
    sampleRate: get('sample_rate'),
    channels: get('channels'),
    bitRate: get('bit_rate'),
    duration: get('duration'),
  }
}

/**
 * 규격을 재고 제자리에 넣는다. 맞으면 복사, 다르면 ffmpeg으로 맞춘다.
 * 그대로 복사했으면 true.
 */
function install(source: string, target: string): boolean {
  const before = probe(source)
  // 비트레이트는 넉넉히 본다. 1초짜리 파일은 컨테이너 오버헤드가 커서
  // 제대로 인코딩된 것도 표시값이 10% 넘게 뜬다 — 그걸로 재인코딩하면 손해다
  const matches =
    before.sampleRate === FORMAT.sampleRate &&
    before.channels === FORMAT.channels &&
    Math.abs(before.bitRate - FORMAT.bitRate) / FORMAT.bitRate < 0.25

  mkdirSync(dirname(target), { recursive: true })
  if (matches) {
    copyFileSync(source, target)
  } else {
    // 규격이 다르면 등급을 다시 고르게 하지 않고 여기서 맞춘다 (AUDIO.md)
    execFileSync('ffmpeg', [
      '-v', 'error', '-y', '-i', source,
      '-ac', String(FORMAT.channels),
      '-ar', String(FORMAT.sampleRate),
      '-b:a', `${FORMAT.bitRate / 1000}k`,
      target,
    ])
  }
  return matches
}

/** 한 낱말을 만들어 제자리에 넣는다. 실패하면 던진다 */
async function makeOne(key: string, lang: Language, row: { slug: string; text: string; path: string }) {
  const res = await fetch('https://api.x.ai/v1/tts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: row.text,
      language: lang,
      voice_id: VOICE,
      speed: 1.0,
      optimize_streaming_latency: 0,
      text_normalization: false,
      output_format: { codec: 'mp3', sample_rate: FORMAT.sampleRate, bit_rate: FORMAT.bitRate },
    }),
  })
  if (!res.ok) throw new Error(`${row.slug} 실패 (HTTP ${res.status}) ${(await res.text()).slice(0, 200)}`)

  // 임시 파일은 slug별로 따로 둔다 — 동시에 여러 개가 오가므로 한 이름을
  // 나눠 쓰면 서로 덮어쓴다
  const temp = join('.audio-tmp', `${lang}-${row.slug}.mp3`)
  mkdirSync(dirname(temp), { recursive: true })
  writeFileSync(temp, Buffer.from(await res.arrayBuffer()))
  install(temp, row.path)
  rmSync(temp, { force: true })
}

/**
 * xAI TTS로 직접 만든다. **호출마다 크레딧이 나간다** — 그래서 개수를 인자로
 * 받는다. `all`을 주면 그 언어를 끝까지 만든다.
 *
 * 한 번에 여러 개를 부른다. 한 낱말은 1초가 안 걸리지만 14,000개를 하나씩
 * 부르면 몇 시간이 된다 — 동시 실행 수를 두어 벽시계 시간을 줄인다. 실패가
 * 나면 그 자리에서 멈춘다(키·크레딧 문제면 나머지도 다 실패한다).
 *
 * 파라미터는 AUDIO.md 표 그대로다. 콘솔의 Broadcast · High · Quality와 같은
 * 값이라 콘솔로 만든 파일과 섞여도 소리가 튀지 않는다.
 */
async function make(lang: Language, limit: number, concurrency = 8) {
  // 레포 루트 .env를 읽는다. .gitignore가 이미 막고 있어 커밋될 일이 없고,
  // 셸을 새로 열 때마다 export를 다시 칠 이유도 없다
  if (existsSync('.env')) process.loadEnvFile('.env')

  const key = process.env.XAI_API_KEY
  if (!key) {
    fail(
      'XAI_API_KEY 가 없습니다.\n' +
        '  https://console.x.ai 에서 키를 발급해 레포 루트 .env 에 넣으세요:\n' +
        '    XAI_API_KEY=xai-...\n' +
        '  (.env 는 .gitignore에 있습니다. 셸에 export 해도 됩니다)',
    )
  }
  if (!LANG[lang]) fail(`알 수 없는 언어: ${lang}`)

  const rows = missing(lang).slice(0, limit)
  if (rows.length === 0) return console.log(`\n${lang} 는 다 만들어져 있습니다.`)

  console.log(`\n${lang} ${rows.length}개를 만듭니다 — 호출마다 크레딧이 나갑니다 (동시 ${concurrency})\n${line(52)}`)

  let done = 0
  let stopped = false
  const queue = [...rows]

  // 실패는 반환값으로 꺼낸다. 클로저 안에서 바깥 변수에 담으면 TS가 좁힌
  // 타입을 되돌리지 못해 나중에 읽을 수 없다
  async function worker(): Promise<Error | undefined> {
    for (;;) {
      if (stopped) return
      const row = queue.shift()
      if (!row) return
      try {
        await makeOne(key!, lang, row)
      } catch (error) {
        // 첫 실패에서 전체를 멈춘다. 키가 틀렸거나 크레딧이 없으면 나머지도
        // 다 실패한다 — 14,000번 더 부르며 같은 오류를 쌓을 이유가 없다
        stopped = true
        return error as Error
      }
      done += 1
      if (done % 50 === 0) console.log(`  ${done}/${rows.length}`)
    }
  }

  const results = await Promise.all(Array.from({ length: Math.min(concurrency, rows.length) }, worker))
  rmSync('.audio-tmp', { recursive: true, force: true })

  const failure = results.find((r) => r !== undefined)
  if (failure) fail(`${done}개까지 만들고 멈췄습니다\n  ${failure.message}`)
  console.log(`\n${done}개 완료 · ${lang} 남은 것 ${missing(lang).length}개`)
}

function place(lang: Language, slug: string, source: string) {
  if (!LANG[lang]) fail(`알 수 없는 언어: ${lang}`)
  const concept = concepts.find((c) => c.slug === slug)
  if (!concept) fail(`알 수 없는 slug: ${slug}`)
  const word = concept!.words[lang]
  if (!word) fail(`${slug} 에 ${lang} 단어가 없습니다`)
  if (!existsSync(source)) fail(`파일이 없습니다: ${source}`)

  const target = audioPath(lang, slug)
  if (existsSync(target) && !process.argv.includes('--force'))
    fail(`이미 있습니다: ${target} (--force 로 덮어씁니다)`)

  const matches = install(source, target)
  const after = probe(target)
  const size = statSync(target).size / 1024
  console.log(`\n${answerOf(word, lang)} → ${target}`)
  console.log(`  ${matches ? '그대로 복사' : '규격이 달라 재인코딩'}`)
  console.log(`  ${after.sampleRate} Hz · ${Math.round(after.bitRate / 1000)} kbps · ${after.channels}ch · ${after.duration.toFixed(2)}초 · ${size.toFixed(1)}KB`)
  console.log(`\n${lang} 남은 것 ${missing(lang).length}개`)
}

/**
 * 발음을 R2(또는 S3 호환 어디든)로 올린다.
 *
 * 발음은 저장소에 두지 않는다 — 14,448개 170MB라 clone과 배포가 그만큼
 * 느려지고, 정적 호스팅의 배포당 파일 개수 한도에 먼저 걸린다. 파일은 로컬에
 * 남겨 둔다: `pnpm audio`도 /debug 점검도 파일을 직접 보기 때문이다.
 *
 * 올리는 일은 rclone에 맡긴다. 바뀐 것만 올리고(체크섬), 병렬로 붓고,
 * 자격증명을 자기 설정에 넣어 둔다 — 여기서 다시 만들 이유가 없다.
 *
 *   rclone config                       한 번, r2 리모트를 만든다
 *   R2_REMOTE=r2:lingo-audio            .env 에 적는다
 */
function sync() {
  if (existsSync('.env')) process.loadEnvFile('.env')

  const remote = process.env.R2_REMOTE
  if (!remote) {
    fail(
      'R2_REMOTE 가 없습니다.\n' +
        '  rclone으로 리모트를 만든 뒤(.env 에 적습니다):\n' +
        '    R2_REMOTE=r2:버킷이름\n' +
        '  리모트 만들기: rclone config → n → s3 → Cloudflare R2',
    )
  }

  try {
    execFileSync('rclone', ['version'], { stdio: 'ignore' })
  } catch {
    fail('rclone 이 없습니다. brew install rclone')
  }

  const local = join('public', 'audio')
  const count = readdirSync(local).reduce(
    (sum, lang) => sum + readdirSync(join(local, lang)).length,
    0,
  )
  console.log(`\n${local} → ${remote}/audio  (${count}개, 바뀐 것만 올라갑니다)\n${line(52)}`)

  // --checksum: 시각이 아니라 내용을 본다. 파일을 다시 뽑아도 내용이 같으면
  // 올리지 않는다 — 시각으로 보면 전량이 다시 올라간다
  execFileSync('rclone', ['sync', local, `${remote}/audio`, '--checksum', '--transfers', '32', '--progress'], {
    stdio: 'inherit',
  })

  console.log(`\n올렸습니다. 배포에서 쓰려면 NEXT_PUBLIC_AUDIO_BASE 에 공개 주소를 넣습니다`)
}

function fail(message: string): never {
  console.error(`\n${message}\n`)
  process.exit(1)
}

const [command, ...rest] = process.argv.slice(2)
if (!command || command === 'summary') summary()
else if (command === 'list') list((rest[0] ?? 'ja') as Language, Number(rest[1] ?? 10))
else if (command === 'make') {
  const count = rest[1] === 'all' ? Number.MAX_SAFE_INTEGER : Number(rest[1] ?? 5)
  await make((rest[0] ?? 'ja') as Language, count, Number(rest[2] ?? 8))
}
else if (command === 'sync') sync()
else if (command === 'manifest') manifest()
else if (command === 'place') {
  const [lang, slug, file] = rest
  if (!lang || !slug || !file) fail('사용법: place <lang> <slug> <파일>')
  place(lang as Language, slug, file)
} else fail(`알 수 없는 명령: ${command}`)
