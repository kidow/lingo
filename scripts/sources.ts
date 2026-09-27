/**
 * 기출·모의고사 링크가 아직 살아 있는지 본다. (spec.md §3 · §7, lib/exam-sources.ts)
 *
 *   node scripts/sources.ts            전부 연다
 *   node scripts/sources.ts toeic jlpt 그 트랙만
 *
 * 링크는 썩는다. 한국TOEIC위원회는 반기마다 새 회차를 붙이고, 국내 TORFL 시행처는
 * 2026년에 바뀌었다. 목록은 조사한 날(`EXAM_SOURCES_CHECKED`)의 사진이라, 그 뒤에
 * 무엇이 무너졌는지는 **열어 봐야만** 안다. `pnpm check`에 넣지 않은 것은 네트워크에
 * 매이기 때문이다 — 오프라인에서 검증이 깨지면 안 된다.
 *
 * 판정은 셋이다.
 *
 *   살아 있음  2xx·3xx
 *   막힘       401·403·429 — 봇을 막는 사이트가 많다. 사람 눈으로 한 번 열어 본다
 *   죽음       404·410·5xx·연결 실패 — 목록에서 고치거나 빼야 한다
 *
 * **죽은 것이 있으면 1로 끝난다.** 막힌 것은 죽은 것으로 세지 않는다 — 브라우저로는
 * 멀쩡히 열리는 곳이 대부분이다.
 *
 * 마감이 지난 행사도 함께 짚는다. 화면에서는 저절로 빠지지만(`examSourcesFor`)
 * 목록에 남아 있으면 다음 사람이 헷갈린다 — 지우라는 말이다.
 */
import { EXAM_SOURCES, localDay, type ExamSource } from '../lib/exam-sources.ts'
import { TRACK_IDS, type TrackId } from '../lib/track.ts'

const TIMEOUT_MS = 20_000
/** 한꺼번에 여는 수. 같은 사이트에 한 번에 몰리지 않게 작게 둔다 */
const PARALLEL = 4
/** 봇으로 보이면 막는 곳이 있어 브라우저처럼 인사한다 */
const HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
  'accept-language': 'ko,en;q=0.8',
}

type Verdict = 'alive' | 'blocked' | 'dead'
type Result = { source: ExamSource; verdict: Verdict; detail: string }

function judge(status: number): Verdict {
  if (status >= 200 && status < 400) return 'alive'
  if (status === 401 || status === 403 || status === 429) return 'blocked'
  return 'dead'
}

async function open(source: ExamSource): Promise<Result> {
  try {
    const response = await fetch(source.url, {
      headers: HEADERS,
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    // 본문은 읽지 않는다. 연결만 닫는다
    await response.body?.cancel()
    return { source, verdict: judge(response.status), detail: String(response.status) }
  } catch (error) {
    const reason = error instanceof Error ? (error.cause instanceof Error ? error.cause.message : error.message) : String(error)
    return { source, verdict: 'dead', detail: reason.slice(0, 60) }
  }
}

async function main() {
  const asked = process.argv.slice(2).filter((arg) => !arg.startsWith('--'))
  const unknown = asked.filter((track) => !TRACK_IDS.includes(track as TrackId))
  if (unknown.length > 0) {
    console.error(`없는 트랙입니다: ${unknown.join(', ')} (있는 것: ${TRACK_IDS.join(' ')})`)
    process.exit(1)
  }
  const sources = asked.length > 0 ? EXAM_SOURCES.filter((source) => asked.includes(source.track)) : EXAM_SOURCES

  const results: Result[] = []
  let next = 0
  await Promise.all(
    Array.from({ length: PARALLEL }, async () => {
      while (next < sources.length) {
        const source = sources[next++]
        results.push(await open(source))
      }
    }),
  )
  // 표의 순서로 되돌린다 — 끝난 차례대로 쌓였다
  results.sort((a, b) => EXAM_SOURCES.indexOf(a.source) - EXAM_SOURCES.indexOf(b.source))

  const mark: Record<Verdict, string> = { alive: '  ', blocked: '? ', dead: '✗ ' }
  for (const track of TRACK_IDS) {
    const rows = results.filter((result) => result.source.track === track)
    if (rows.length === 0) continue
    console.log(`\n${track}`)
    for (const { source, verdict, detail } of rows)
      console.log(`  ${mark[verdict]}${source.id.padEnd(28)} ${detail.padEnd(5)} ${source.url}`)
  }

  const today = localDay()
  const expired = sources.filter((source) => source.until && source.until < today)
  const count = (verdict: Verdict) => results.filter((result) => result.verdict === verdict).length

  console.log(`\n${results.length}곳 — 살아 있음 ${count('alive')} · 막힘 ${count('blocked')} · 죽음 ${count('dead')}`)
  if (count('blocked') > 0)
    console.log('  ?  막힘은 봇 차단일 때가 많다. 브라우저로 한 번 열어 보고 멀쩡하면 그대로 둔다')
  if (count('dead') > 0)
    console.log('  ✗  죽음은 lib/exam-sources.ts에서 주소를 고치거나 뺀다. 고치면 EXAM_SOURCES_CHECKED도 올린다')
  if (expired.length > 0)
    console.log(`  마감이 지나 화면에서 빠진 행사: ${expired.map((source) => source.id).join(', ')} — 목록에서 지운다`)

  process.exit(count('dead') > 0 ? 1 : 0)
}

await main()
