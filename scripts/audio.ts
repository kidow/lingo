/**
 * 발음 오디오를 생성한다. (spec.md §7)
 *
 *   node scripts/audio.ts               아직 없는 것만
 *   node scripts/audio.ts cat clock     지정한 것만
 *   node scripts/audio.ts --all         전부 (덮어씀)
 *   node scripts/audio.ts --voice sal   목소리 지정
 *
 * xAI TTS — POST https://api.x.ai/v1/tts
 * 키는 환경변수로만 받는다. 레포에 넣지 않는다.
 *
 *   export XAI_API_KEY=...
 *
 * 읽히는 것은 **그 언어의 정답 필드**다. 일본어는 읽기(かな)이므로
 * 들리는 소리와 정답이 정확히 같다. (lib/lang.ts의 LANG)
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { LANG } from '../lib/lang.ts'

const ENDPOINT = 'https://api.x.ai/v1/tts'
const CONTENT_DIR = 'content'
const OUT_ROOT = join('public', 'audio')

/**
 * 단어 하나는 1초 남짓이다. 기본값 128kbps는 과하다 —
 * 이미지가 5KB인데 오디오가 19KB면 균형이 안 맞는다. 64kbps에서
 * 사람 목소리는 열화가 거의 들리지 않는다.
 */
const OUTPUT_FORMAT = { codec: 'mp3', sample_rate: 24000, bit_rate: 64000 } as const

/** 발음 참조용이라 중립적이고 또렷한 쪽이 낫다. --voice로 바꾼다 */
const DEFAULT_VOICE = 'sal'

const args = process.argv.slice(2)
const all = args.includes('--all')
const voiceIndex = args.indexOf('--voice')
const voice = voiceIndex >= 0 ? args[voiceIndex + 1] : DEFAULT_VOICE
const only = args.filter((a, i) => !a.startsWith('--') && i !== voiceIndex + 1)

const apiKey = process.env.XAI_API_KEY
if (!apiKey) {
  console.error(
    '환경변수 XAI_API_KEY가 없습니다.\n' +
      '  export XAI_API_KEY=...   (또는 .env.local에 두고 셸에서 읽어 실행)\n' +
      '키는 console.x.ai 에서 발급합니다.',
  )
  process.exit(1)
}

type Job = { slug: string; lang: string; text: string; out: string }

function collectJobs(): Job[] {
  if (!existsSync(CONTENT_DIR)) {
    console.error(`${CONTENT_DIR}/ 가 없습니다.`)
    process.exit(1)
  }

  const jobs: Job[] = []
  for (const file of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json')).sort()) {
    const parsed = JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf8')) as {
      concepts?: { slug?: string; words?: Record<string, Record<string, string>> }[]
    }

    for (const concept of parsed.concepts ?? []) {
      const slug = concept.slug
      if (!slug) continue
      if (only.length > 0 && !only.includes(slug)) continue

      for (const [lang, word] of Object.entries(concept.words ?? {})) {
        const strategy = LANG[lang as keyof typeof LANG]
        if (!strategy) continue // lib/lang.ts에 없는 언어는 출제되지 않으므로 건너뛴다

        const text = word[strategy.answer]
        if (!text) continue // 정답 필드가 비면 출제도 안 되니 발음도 필요 없다

        const out = join(OUT_ROOT, lang, `${slug}.mp3`)
        if (!all && existsSync(out)) continue

        jobs.push({ slug, lang, text, out })
      }
    }
  }
  return jobs
}

const jobs = collectJobs()

if (only.length > 0) {
  const found = new Set(jobs.map((j) => j.slug))
  const missing = only.filter((slug) => !found.has(slug))
  if (missing.length > 0 && !all) {
    console.log(`이미 있거나 ${CONTENT_DIR}/ 에 없습니다: ${missing.join(', ')}`)
  }
}

if (jobs.length === 0) {
  console.log(all ? '대상이 없습니다.' : '발음이 없는 단어가 없습니다. 다시 만들려면 --all.')
  process.exit(0)
}

console.log(`\n${jobs.length}개 · 목소리 ${voice} · mp3 ${OUTPUT_FORMAT.sample_rate / 1000}kHz ${
  OUTPUT_FORMAT.bit_rate / 1000
}kbps\n`)

let failed = 0
for (const job of jobs) {
  mkdirSync(join(OUT_ROOT, job.lang), { recursive: true })

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: job.text,
      voice_id: voice,
      language: job.lang,
      output_format: OUTPUT_FORMAT,
    }),
  })

  if (!response.ok) {
    // 본문에 사유가 들어온다 (한도 초과, 잘못된 voice_id 등)
    const detail = await response.text().catch(() => '')
    console.error(`  ✗ ${job.slug} (${job.lang}) — HTTP ${response.status} ${detail.slice(0, 300)}`)
    failed += 1
    continue
  }

  writeFileSync(job.out, Buffer.from(await response.arrayBuffer()))
  const size = statSync(job.out).size
  console.log(
    `  ${job.slug.padEnd(14)} ${job.lang}  ${job.text.padEnd(8)} ${(size / 1024).toFixed(1).padStart(5)} KB`,
  )
}

console.log(`\n생성 ${jobs.length - failed}개${failed ? ` · 실패 ${failed}개` : ''}\n`)
if (failed > 0) process.exit(1)
