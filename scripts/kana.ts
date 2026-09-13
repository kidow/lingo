/**
 * 가나 카드의 예시 낱말을 뽑고, 뽑은 것을 눈으로 볼 시트를 만든다.
 * (docs/kana-tab-design.md §2, §7)
 *
 *   node scripts/kana.ts draft sei      청음의 빈자리를 채운다 (갈래: sei·daku·yoon)
 *   node scripts/kana.ts draft          전부
 *   node scripts/kana.ts sheet          content/kana.json을 HTML 한 장으로 깐다
 *
 * **자동이 확정이 아니다.** 규칙만으로 뽑으면 `あ` 카드에 `あんないばん`(길
 * 표지판)이 앉는다 — 실제 후보 목록 맨 위에 그것이 있었다. 그래서 초안을
 * 쓰고 시트를 열어 눈으로 본다. 어색한 낱말과 초급이 모를 낱말은 거기서만
 * 잡힌다 (docs/nets.md).
 *
 * **이미 적힌 자리는 건드리지 않는다.** 사람이 고쳐 둔 것을 다음 실행이
 * 덮으면 시트를 보는 일이 헛수고가 된다. 비운 자리만 채운다.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { AUDIO_MISSING } from '../lib/audio-have.ts'
import { KANA_SCRIPTS, KANA_TABLE, exampleQuota, glyphOf, type KanaExamples, type KanaKind, type KanaScript } from '../lib/kana.ts'
import type { Concept } from '../lib/types.ts'

const CONTENT_DIR = 'content'
const KANA_FILE = 'content/kana.json'
const SHEET = '.images/kana.html'

type Row = { slug: string; reading: string; ko: string; scene: boolean; image: boolean }

/** 모라 수. 작은 글자는 앞 글자에 붙으므로 세지 않는다 */
const SMALL = new Set([...'ゃゅょぁぃぅぇぉっァィゥェォャュョッ'])
const mora = (text: string) => [...text].filter((ch) => !SMALL.has(ch)).length

/** 작은 글자를 뒤에 달지 않은 자리 */
const SMALL_AFTER = new Set([...'ゃゅょぁぃぅぇぉャュョァィゥェォ'])

/**
 * 그 낱말 안에 이 마디가 **제 소리 그대로** 한 번이라도 서는가.
 *
 * 뒤에 작은 글자가 붙으면 다른 소리다 — `しゅと`의 `し`는 `し`가 아니다.
 * 요음 마디(`きゃ`)는 그 작은 글자까지가 제 모양이라 걸리지 않는다.
 */
function plainly(reading: string, glyph: string): boolean {
  for (let at = reading.indexOf(glyph); at !== -1; at = reading.indexOf(glyph, at + 1)) {
    const next = reading[at + glyph.length]
    if (!next || !SMALL_AFTER.has(next)) return true
  }
  return false
}

function concepts(): Row[] {
  const images = new Set(
    readdirSync('public/concepts').map((name) => name.replace(/\.webp$/, '')),
  )
  const rows: Row[] = []
  for (const file of readdirSync(CONTENT_DIR).filter((name) => name.endsWith('.json'))) {
    const json = JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf8')) as { concepts?: Concept[] }
    for (const concept of json.concepts ?? []) {
      const word = concept.words?.ja
      const reading = word?.reading ?? word?.term
      if (!reading) continue
      // 발음이 없으면 후보가 아니다. 예시마다 재생 버튼이 서는 카드다 (§2)
      if (AUDIO_MISSING.has(`ja/${concept.slug}`)) continue
      rows.push({
        slug: concept.slug,
        reading,
        ko: concept.meaning_ko,
        scene: concept.category === 'scene',
        image: images.has(concept.slug),
      })
    }
  }
  return rows
}

/**
 * 한 마디의 후보를 좋은 순서로 늘어놓는다. (§2)
 *
 * 1 그 마디로 **시작**하는 것 → 2 **짧은** 것 → 3 낱말(표현은 뒤) → 4 그림 있는 것
 *
 * **그 마디보다 긴 것만 남긴다.** `し` 후보 맨 위에 `し`(죽음)와 `し`(시)가
 * 있었다 — 배우는 글자가 그대로 예시가 되면 아무것도 안 가르친다.
 *
 * **조각으로만 든 낱말은 뺀다.** `し`에 `しゅと`(수도)가, `い`에 `いしゃ`(의사)가
 * 붙었다 — 글자는 거기 있지만 소리는 `しゅ`와 `しゃ`라 배우는 것과 다르다.
 * 가타카나 확장음도 같은 규칙에 걸린다(`ツ`에 붙은 `ツァーリ`).
 */
function candidates(glyph: string, rows: Row[]): Row[] {
  return rows
    .filter((row) => plainly(row.reading, glyph) && mora(row.reading) > mora(glyph))
    .sort((a, b) => {
      const starts = Number(b.reading.startsWith(glyph)) - Number(a.reading.startsWith(glyph))
      if (starts) return starts
      const length = mora(a.reading) - mora(b.reading)
      if (length) return length
      const kind = Number(a.scene) - Number(b.scene)
      if (kind) return kind
      const drawn = Number(b.image) - Number(a.image)
      if (drawn) return drawn
      return a.slug.localeCompare(b.slug)
    })
}

const read = (): KanaExamples => {
  try {
    return JSON.parse(readFileSync(KANA_FILE, 'utf8')) as KanaExamples
  } catch {
    return {}
  }
}

function draft(kinds: KanaKind[]) {
  const rows = concepts()
  const examples = read()
  /** 한 낱말은 최대 두 장까지. 무제한이면 같은 그림이 카드마다 반복된다 (§2) */
  const used = new Map<string, number>()
  for (const picked of Object.values(examples))
    for (const list of Object.values(picked))
      for (const slug of list) used.set(slug, (used.get(slug) ?? 0) + 1)

  let filled = 0
  const short: string[] = []
  for (const unit of KANA_TABLE) {
    if (!kinds.includes(unit.kind)) continue
    for (const script of KANA_SCRIPTS) {
      const glyph = glyphOf(unit, script)
      if (!glyph) continue
      const quota = exampleQuota(script, unit.id)
      const already = examples[unit.id]?.[script] ?? []
      if (already.length >= quota) continue

      const picked = [...already]
      const pool = candidates(glyph, rows)
      /**
       * **앞머리가 겹치면 뒤로 미룬다.** `ヘ` 예시가 `ヘアゴム`·`ヘアネット`·
       * `ヘアピン` 셋이었다 — 글자는 맞지만 한 낱말을 세 번 보는 것과 같다.
       * 한 바퀴를 겹치지 않게 돌고, 그래도 모자라면 겹침을 허용한다.
       */
      const heads = new Set<string>()
      for (const avoidRepeat of [true, false]) {
        for (const row of pool) {
          if (picked.length >= quota) break
          if (picked.includes(row.slug)) continue
          if ((used.get(row.slug) ?? 0) >= 2) continue
          const head = row.reading.slice(0, glyph.length + 1)
          if (avoidRepeat && heads.has(head)) continue
          heads.add(head)
          picked.push(row.slug)
          used.set(row.slug, (used.get(row.slug) ?? 0) + 1)
        }
      }
      examples[unit.id] = { ...examples[unit.id], [script]: picked }
      filled += picked.length - already.length
      if (picked.length < quota) short.push(`${glyph}(${picked.length}/${quota})`)
    }
  }

  const ordered: KanaExamples = {}
  for (const unit of KANA_TABLE) if (examples[unit.id]) ordered[unit.id] = examples[unit.id]
  writeFileSync(KANA_FILE, `${JSON.stringify(ordered, null, 2)}\n`)

  console.log(`${KANA_FILE} — 예시 ${filled}개를 새로 채웠습니다`)
  if (short.length) console.log(`  ! 아직 모자란 마디 ${short.length}개: ${short.join(' ')}`)
  console.log('  시트를 보세요 — node scripts/kana.ts sheet')
}

function sheet() {
  const rows = new Map(concepts().map((row) => [row.slug, row]))
  const examples = read()
  const cards = KANA_TABLE.flatMap((unit) =>
    KANA_SCRIPTS.flatMap((script: KanaScript) => {
      const glyph = glyphOf(unit, script)
      const picked = examples[unit.id]?.[script]
      if (!glyph || !picked) return []
      const words = picked.map((slug) => {
        const row = rows.get(slug)
        if (!row) return `<li class="miss">${slug} — 없는 개념</li>`
        const marked = row.reading.replaceAll(glyph, `<mark>${glyph}</mark>`)
        return `<li><b>${marked}</b><span>${row.ko} · ${row.slug}</span></li>`
      })
      const lack = picked.length < exampleQuota(script, unit.id) ? ' lack' : ''
      return [`<article class="${lack}"><h2>${glyph}<em>${unit.romaji}</em></h2><ol>${words.join('')}</ol></article>`]
    }),
  )
  const html = `<!doctype html><meta charset="utf-8"><title>가나 예시 시트</title><style>
body{margin:0;padding:24px;background:#f4f1ec;color:#1c1917;font:14px/1.5 Pretendard,"Apple SD Gothic Neo",sans-serif}
h1{font-size:17px;margin:0 0 14px}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
article{background:#fbf9f5;border:1px solid #e7e2da;border-radius:12px;padding:12px 14px}
article.lack{border-color:#c83b4c;background:#fff0f2}
h2{margin:0 0 8px;font:600 30px/1 "Hiragino Sans","Noto Sans JP",sans-serif;display:flex;align-items:baseline;gap:10px}
h2 em{font:600 13px/1 sans-serif;color:#716a62;font-style:normal}
ol{margin:0;padding-left:18px} li{margin:3px 0}
b{font:600 16px/1.4 "Hiragino Sans","Noto Sans JP",sans-serif}
mark{background:#edefff;color:#4255ff;border-radius:3px;padding:0 1px}
span{display:block;font-size:12px;color:#716a62} .miss{color:#c83b4c}
</style><h1>가나 예시 시트 — 카드 ${cards.length}장. 어색한 낱말과 초급이 모를 낱말을 여기서 잡는다</h1><main>${cards.join('')}</main>`
  mkdirSync(dirname(SHEET), { recursive: true })
  writeFileSync(SHEET, html)
  console.log(`${SHEET} — 카드 ${cards.length}장`)
}

const [mode, ...rest] = process.argv.slice(2)
const KINDS: KanaKind[] = ['sei', 'daku', 'yoon']
if (mode === 'draft') draft(rest.length ? (rest as KanaKind[]) : KINDS)
else if (mode === 'sheet') sheet()
else {
  console.log('node scripts/kana.ts draft [sei|daku|yoon]')
  console.log('node scripts/kana.ts sheet')
  process.exit(1)
}
