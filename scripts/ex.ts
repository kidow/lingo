/**
 * 예문이 표제어를 보여주는지 **쓰기 전에** 잰다.
 *
 *   node scripts/ex.ts batch.json      파일을 잰다
 *   node scripts/ex.ts < batch.json    stdin으로 받는다
 *
 * 받는 꼴은 `content/*.json`과 같다 — `{concepts:[…]}`도, 개념 배열도, 개념
 * 하나도 된다. 회차마다 쓰는 배치 스크립트가 `content/`에 넣기 **직전에**
 * 그대로 흘려보내면 된다.
 *
 * **왜 따로 두는가.** 이 판단은 오래 `pnpm check` 안에만 있었다. check는
 * `pnpm batch`의 아홉째 단계라, 예문이 틀렸다는 말을 들으려면 소품 겹침부터
 * 발음기호·번체·등급·굽기까지 다 돌려야 했다. 곧 **써 놓은 뒤에야** 안다는
 * 뜻이다. 2026-09-08부터 열세 회차를 세어 보니 회차마다 두셋씩 걸렸고
 * 자리가 늘 같았다 — 영어 문장 첫머리 대문자와 프랑스어 축약(`l'heure`)이
 * 절반이 넘는다. 둘 다 문장을 적는 순간 알 수 있는 것들이다.
 *
 * 잣대는 `lib/headword.ts`의 `judgeWord` 하나뿐이다. check도 같은 것을 쓰므로
 * 여기를 지나간 예문이 나중에 check에서 걸리는 일은 없다.
 */
import { readFileSync } from 'node:fs'
import { judgeWord, whyLateVerb } from '../lib/headword.ts'
import { LANG } from '../lib/lang.ts'
import type { Language } from '../lib/types.ts'

/** check가 오류로 잡는 자리. 글자 하나라 여기서도 같이 본다 */
const CURLY_APOSTROPHE = '’'

const KIND: Record<string, string> = { capital: '대문자', missing: '없음', stuck: '못 뚫음' }

type Loose = Record<string, unknown>

/** `{concepts:[…]}`·배열·개념 하나를 다 받는다 */
function conceptsOf(raw: unknown): Loose[] {
  if (Array.isArray(raw)) return raw as Loose[]
  const one = raw as Loose
  if (Array.isArray(one?.concepts)) return one.concepts as Loose[]
  return one?.words ? [one] : []
}

function read(path?: string): unknown {
  return JSON.parse(readFileSync(path ?? 0, 'utf8'))
}

/** 예문 줄을 꺼낸다. `examples`가 있으면 그것, 없으면 `example` 하나 */
function textsOf(word: Loose): string[] {
  const many = word.examples as Loose[] | undefined
  const one = word.example as Loose | undefined
  const rows = many?.length ? many : one ? [one] : []
  return rows.map((row) => (typeof row.text === 'string' ? row.text : ''))
}

const paths = process.argv.slice(2)
const files = paths.length > 0 ? paths : [undefined]

let concepts = 0
let sentences = 0
const lines: string[] = []

for (const path of files)
  for (const concept of conceptsOf(read(path))) {
    concepts += 1
    const slug = String(concept.slug ?? '?')
    const words = (concept.words ?? {}) as Record<string, Loose>
    for (const [lang, word] of Object.entries(words)) {
      const strategy = LANG[lang as Language]
      if (!strategy) continue
      const answer = word[strategy.answer]
      const texts = textsOf(word)
      sentences += texts.length
      if (typeof answer !== 'string' || !answer) {
        lines.push(`${slug}  ${lang}  정답 없음 — ${strategy.answer}를 채우세요`)
        continue
      }
      for (const [at, text] of texts.entries())
        if (text.includes(CURLY_APOSTROPHE))
          lines.push(`${slug}  ${lang}[${at}]  굽은 따옴표 — "${text}"\n    곧은 '를 쓰세요`)
      /*
       * 독일어 어순은 `check`가 안 보는 자리다 — 표제형이 예문에 있고 뚫리기
       * 까지 하므로 조용하다. 여기서만 짚는다. `content/` 전체에 대면 240이
       * 나오므로 `check`에 넣으면 경고 스물여섯이 이백예순이 되어 덮인다.
       */
      const pos = typeof word.part_of_speech === 'string' ? word.part_of_speech : ''
      for (const [at, text] of texts.entries()) {
        const late = whyLateVerb(text, answer, lang as Language, pos)
        if (late) lines.push(`${slug}  ${lang}[${at}]  어순 "${answer}" — "${text}"\n    ${late}`)
      }
      for (const snag of judgeWord(texts, answer, lang as Language))
        lines.push(
          `${slug}  ${lang}[${snag.at}]  ${KIND[snag.kind]} "${answer}" — "${texts[snag.at]}"` +
            (snag.said ? `\n    ${snag.said}` : ''),
        )
    }
  }

console.log(`개념 ${concepts} · 예문 ${sentences}을 쟀다\n`)
if (lines.length === 0) {
  console.log('걸린 자리 없음 — 그대로 쓰세요')
  process.exit(0)
}
for (const line of lines) console.log(line)
console.log(`\n걸린 자리 ${lines.length} — 쓰기 전에 고치세요`)
process.exit(1)
