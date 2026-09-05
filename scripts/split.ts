import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { LANGUAGES } from '../lib/lang.ts'
import { triviaEntries } from '../lib/trivia.ts'
import type {
  Article,
  ArticleFile,
  Concept,
  ContentFile,
  Language,
  TriviaFile,
  Word,
} from '../lib/types.ts'

/**
 * 콘텐츠를 **언어별로 갈라 public/에 굽는다.** (spec.md §4, §8)
 *
 *   pnpm split
 *
 * 이름이 `pack`이 아닌 이유는 `pnpm pack`이 npm 내장 명령이어서다 — 스크립트
 * 대신 tarball을 만든다.
 *
 * 개념 하나에 일곱 언어가 붙어 있다(§1). 그 구조가 콘텐츠에는 맞지만 화면에는
 * 맞지 않는다 — JLPT를 보는 사람에게 러시아어 예문 5만 줄이 같이 실린다.
 * 번들에 통째로 구우니 청크 하나가 11.5MB였고, 그중 예문이 70%였다.
 *
 * 그래서 **읽는 단위로 다시 자른다.**
 *
 *   public/content/{lang}.json   그 언어의 개념·상식·참고 글. 피드가 쓴다
 *   public/content/search.json   일곱 언어의 표기만. 찾기 시트가 쓴다
 *
 * 검색은 트랙을 안 가려서 일곱 언어가 다 필요하지만(lib/search.ts) **예문은
 * 한 줄도 안 본다.** 그래서 찾기 쪽 파일에서는 예문을 통째로 뺀다 — 그것만으로
 * 70%가 빠진다. `image_prompt`도 뺀다. 그림을 다시 만들 때 쓰는 메모지
 * 화면에 나오는 값이 아니다 (§7).
 *
 * `lib/peaks.ts`가 파형에 대해 이미 같은 판단을 했다 — 언어 하나가 230KB라
 * 일곱을 실으면 1.6MB가 모든 방문자에게 간다. 콘텐츠는 그 열 배다.
 *
 * **저장소에 두지 않는다.** `content/*.json`에서 언제나 다시 나오는 값이라
 * 커밋해 두면 원본과 어긋날 자리만 생긴다. `pnpm dev`와 `pnpm build`가
 * 먼저 이 스크립트를 돌린다 (package.json).
 */
const ROOT = new URL('..', import.meta.url).pathname
const CONTENT = join(ROOT, 'content')
const OUT = join(ROOT, 'public/content')

/** 파일 이름을 개념에 붙인다. 문맥 카드의 오답이 같은 주제에서 나와야 한다 (lib/content.ts) */
function conceptsOf(): Concept[] {
  return readdirSync(CONTENT)
    .filter((name) => name.endsWith('.json') && name !== 'articles.json')
    .sort()
    .flatMap((name) => {
      const file = JSON.parse(readFileSync(join(CONTENT, name), 'utf8')) as ContentFile
      const topic = name.replace('.json', '')
      return file.concepts.map((concept) => ({ ...concept, topic }))
    })
}

function articlesOf(): Article[] {
  const file = JSON.parse(readFileSync(join(CONTENT, 'articles.json'), 'utf8')) as ArticleFile
  return file.articles
}

function triviaOf(lang: Language) {
  const path = join(CONTENT, 'trivia', `${lang}.json`)
  const file = JSON.parse(readFileSync(path, 'utf8')) as TriviaFile
  return triviaEntries(lang, file.items)
}

/**
 * 검색이 실제로 훑는 것만 남긴 낱말. (lib/search.ts의 `wordFields`·`basicnessOf`)
 *
 * `attributes`는 남긴다 — 검색 결과의 순서가 시험 등급에서 나온다. 빼면
 * `ㅋㅍ` 하나에 쿠폰·카페·커피가 콘텐츠 파일 순서대로 선다.
 */
function thin(word: Word): Word {
  const { term, traditional, reading, romanization, also, attributes } = word
  return { term, traditional, reading, romanization, also, attributes }
}

/** JSON에서 `undefined` 필드를 지운다. 그대로 두면 키만 남아 자리를 먹는다 */
const compact = (value: unknown) => JSON.stringify(value, (_, v) => (v === undefined ? undefined : v))

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

const concepts = conceptsOf()
const articles = articlesOf()
const sizes: Array<[string, number]> = []

for (const lang of LANGUAGES) {
  const mine = concepts
    .filter((concept) => concept.words[lang])
    .map(({ image_prompt: _drop, words, ...rest }) => ({ ...rest, words: { [lang]: words[lang] } }))

  const body = compact({
    concepts: mine,
    trivia: triviaOf(lang),
    articles: articles.filter((article) => article.lang === lang),
  })
  writeFileSync(join(OUT, `${lang}.json`), body)
  sizes.push([`${lang}.json`, body.length])
}

/** 찾기 시트가 여는 한 벌. 일곱 언어가 다 있지만 예문이 없다 */
const search = compact({
  concepts: concepts.map(({ image_prompt: _drop, words, ...rest }) => ({
    ...rest,
    words: Object.fromEntries(
      (Object.entries(words) as Array<[Language, Word]>).map(([lang, word]) => [lang, thin(word)]),
    ),
  })),
  trivia: LANGUAGES.flatMap(triviaOf),
  articles,
})
writeFileSync(join(OUT, 'search.json'), search)
sizes.push(['search.json', search.length])

const kb = (bytes: number) => `${(bytes / 1024).toFixed(0)} KB`.padStart(8)
for (const [name, bytes] of sizes) console.log(`  ${name.padEnd(13)} ${kb(bytes)}`)
console.log(`\n개념 ${concepts.length}개 · 참고 글 ${articles.length}편 → public/content/`)
