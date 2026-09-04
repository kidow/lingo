import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildIndex, chosungOf, fold, search } from './search.ts'
import type { Article, Concept } from './types.ts'
import type { TriviaEntry } from './trivia.ts'

const concept = (over: Partial<Concept> & Pick<Concept, 'slug' | 'meaning_ko'>): Concept => ({
  category: 'noun',
  image_prompt: '',
  words: {},
  ...over,
})

const CONCEPTS: Concept[] = [
  concept({
    slug: 'coffee',
    meaning_ko: '커피',
    words: {
      en: { term: 'coffee' },
      zh: { term: '咖啡', romanization: 'kāfēi' },
      fr: { term: 'café' },
      de: { term: 'Kaffee' },
      ja: { term: 'コーヒー', reading: 'コーヒー', romanization: 'kohi' },
    },
  }),
  concept({
    slug: 'street',
    meaning_ko: '거리',
    words: { de: { term: 'Straße' }, ru: { term: 'улица', romanization: 'ulitsa' } },
  }),
  concept({
    slug: 'iced-coffee',
    meaning_ko: '아이스커피',
    words: { en: { term: 'iced coffee' } },
  }),
]

const TRIVIA: TriviaEntry[] = [
  {
    key: 'trivia:ja:particle-wa',
    lang: 'ja',
    trivia: {
      id: 'particle-wa',
      question: '조사로 쓰인 は를 어떻게 읽나요?',
      choices: ['わ', 'は'],
      answer: 'わ',
      note: '표기는 그대로 두고 소리만 바뀝니다.',
    },
  },
]

const ARTICLES: Article[] = [
  { id: 'hiragana', title: '히라가나 표', summary: '오십음도 전체', lang: 'ja', tables: [], rules: [] },
]

const index = buildIndex(CONCEPTS, TRIVIA, ARTICLES)

test('부호를 뗀 표기끼리 맞춘다', () => {
  assert.equal(fold('café'), 'cafe')
  assert.equal(fold('kāfēi'), 'kafei')
  assert.equal(fold('für'), 'fur')
  assert.equal(fold('Straße'), 'strasse', 'ß는 NFD로 안 풀려 따로 편다')
})

test('악센트 없이 쳐도 걸린다', () => {
  assert.deepEqual(
    search(index, 'cafe').map((h) => h.key),
    ['coffee'],
  )
  assert.deepEqual(
    search(index, 'kafei').map((h) => h.key),
    ['coffee'],
    '성조 없는 병음',
  )
  assert.deepEqual(
    search(index, 'strasse').map((h) => h.key),
    ['street'],
  )
})

test('한국어 뜻·원어·로마자 어느 쪽으로도 찾는다', () => {
  for (const query of ['커피', '咖啡', 'kohi', 'コーヒー']) {
    assert.ok(
      search(index, query).some((h) => h.key === 'coffee'),
      `${query}로 못 찾았다`,
    )
  }
})

test('초성만 치면 초성으로 찾는다', () => {
  assert.equal(chosungOf('커피'), 'ㅋㅍ')
  const keys = search(index, 'ㅋㅍ').map((h) => h.key)
  assert.ok(keys.includes('coffee'))
  assert.ok(keys.includes('iced-coffee'), '가운데서도 걸린다')
  assert.equal(keys[0], 'coffee', '통째로 같은 초성이 맨 위에 선다')
})

test('통째로 같은 것 · 앞에서 걸린 것 · 가운데서 걸린 것 순으로 선다', () => {
  const keys = search(index, 'coffee').map((h) => h.key)
  assert.deepEqual(keys, ['coffee', 'iced-coffee'])
  // `cafe`를 치면 `cafe`가 `cafeteria`보다 먼저다 — 둘 다 앞에서 걸리지만
  // 통째로 같은 쪽이 있다
  const cafes = buildIndex(
    [
      concept({ slug: 'cafeteria', meaning_ko: '구내식당', words: { en: { term: 'cafeteria' } } }),
      concept({ slug: 'cafe', meaning_ko: '카페', words: { en: { term: 'cafe' } } }),
    ],
    [],
    [],
  )
  assert.deepEqual(
    search(cafes, 'cafe').map((h) => h.key),
    ['cafe', 'cafeteria'],
  )
})

test('상식과 참고 글도 같이 걸린다', () => {
  const trivia = search(index, '조사로')
  assert.equal(trivia[0]?.kind, 'trivia')
  const article = search(index, '히라가나')
  assert.equal(article[0]?.kind, 'article')
})

test('어느 표기로 걸렸는지를 들고 온다', () => {
  const [hit] = search(index, 'kafei')
  assert.equal(hit.kind === 'word' && hit.lang, 'zh')
  assert.equal(hit.kind === 'word' && hit.text, 'kāfēi')
  // 한국어 뜻으로 걸리면 제목이 곧 그 표기라 따로 적지 않는다
  const [byKorean] = search(index, '커피')
  assert.equal(byKorean.kind === 'word' && byKorean.text, undefined)
})

test('빈 검색어는 아무것도 안 낸다', () => {
  assert.deepEqual(search(index, ''), [])
  assert.deepEqual(search(index, '   '), [])
})

test('결과 수를 제한한다', () => {
  assert.equal(search(index, 'e', 2).length, 2)
})
