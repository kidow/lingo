/**
 * 발음 파일 도구. (spec.md §7, AUDIO.md)
 *
 *   node scripts/audio.ts                    아직 없는 발음을 트랙별로 센다
 *   node scripts/audio.ts list ja            그 언어에서 만들 것을 순서대로 출력
 *   node scripts/audio.ts place ja cat ~/Downloads/speech.mp3
 *   node scripts/audio.ts make ja 10        API로 10개를 만들어 바로 넣는다
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
import { answerOf, LANG } from '../lib/lang.ts'
import { TRACKS } from '../lib/track.ts'
import type { Concept, Language } from '../lib/types.ts'

/** AUDIO.md가 정한 규격. 콘솔에서는 Broadcast · High가 이 값이다 */
const FORMAT = { sampleRate: 22050, bitRate: 96000, channels: 1 }
const VOICE = 'ara'

const concepts: Concept[] = readdirSync('content')
  .filter((f) => f.endsWith('.json'))
  .sort()
  .flatMap((f) => JSON.parse(readFileSync(join('content', f), 'utf8')).concepts)

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

/**
 * xAI TTS로 직접 만든다. **호출마다 크레딧이 나간다** — 그래서 개수를 인자로
 * 받고 기본값을 5로 둔다. 한 번에 201개를 굽는 명령은 일부러 두지 않았다.
 *
 * 파라미터는 AUDIO.md 표 그대로다. 콘솔의 Broadcast · High · Quality와 같은
 * 값이라 콘솔로 만든 파일과 섞여도 소리가 튀지 않는다.
 */
async function make(lang: Language, limit: number) {
  const key = process.env.XAI_API_KEY
  if (!key) {
    fail(
      'XAI_API_KEY 가 없습니다.\n' +
        '  https://console.x.ai 에서 키를 발급해 셸에 넣고 다시 실행하세요:\n' +
        '    export XAI_API_KEY=...',
    )
  }
  if (!LANG[lang]) fail(`알 수 없는 언어: ${lang}`)

  const rows = missing(lang).slice(0, limit)
  if (rows.length === 0) return console.log(`\n${lang} 는 다 만들어져 있습니다.`)

  console.log(`\n${lang} ${rows.length}개를 만듭니다 — 호출마다 크레딧이 나갑니다\n${line(52)}`)
  const temp = join('.audio-tmp', `${lang}.mp3`)
  mkdirSync(dirname(temp), { recursive: true })

  let done = 0
  for (const row of rows) {
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

    // 첫 실패에서 멈춘다. 키가 틀렸거나 크레딧이 없으면 나머지도 다 실패한다 —
    // 200번 더 부르며 같은 오류를 쌓을 이유가 없다
    if (!res.ok) {
      rmSync('.audio-tmp', { recursive: true, force: true })
      fail(`${row.slug} 실패 (HTTP ${res.status})\n  ${(await res.text()).slice(0, 300)}`)
    }

    writeFileSync(temp, Buffer.from(await res.arrayBuffer()))
    const copied = install(temp, row.path)
    const after = probe(row.path)
    done += 1
    console.log(
      `  ${row.slug.padEnd(14)}${row.text.padEnd(10)} ${after.duration.toFixed(2)}초 · ` +
        `${(statSync(row.path).size / 1024).toFixed(1)}KB${copied ? '' : ' (재인코딩)'}`,
    )
  }

  rmSync('.audio-tmp', { recursive: true, force: true })
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

function fail(message: string): never {
  console.error(`\n${message}\n`)
  process.exit(1)
}

const [command, ...rest] = process.argv.slice(2)
if (!command || command === 'summary') summary()
else if (command === 'list') list((rest[0] ?? 'ja') as Language, Number(rest[1] ?? 10))
else if (command === 'make') await make((rest[0] ?? 'ja') as Language, Number(rest[1] ?? 5))
else if (command === 'place') {
  const [lang, slug, file] = rest
  if (!lang || !slug || !file) fail('사용법: place <lang> <slug> <파일>')
  place(lang as Language, slug, file)
} else fail(`알 수 없는 명령: ${command}`)
