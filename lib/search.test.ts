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

test('치다 만 글자도 자모로 걸린다', () => {
  // `커ㅍ`는 글자로는 어디에도 없지만 자모로 풀면 `ㅋㅓㅍ`이라 `커피` 안에 있다
  assert.ok(search(index, '커ㅍ').some((h) => h.key === 'coffee'))
  assert.ok(search(index, '거ㄹ').some((h) => h.key === 'street'))
})

test('자판을 잘못 두고 쳐도 되돌려 찾는다', () => {
  // zjvl → 커피. 멀쩡한 영어로 찾은 것이 있으면 되돌리지 않는다
  assert.ok(search(index, 'zjvl').some((h) => h.key === 'coffee'))
  assert.deepEqual(
    search(index, 'cafe').map((h) => h.key),
    ['coffee'],
    'cafe는 영어로 이미 걸리므로 ㅊㅁ뮤로 뒤집지 않는다',
  )
})

test('초성 동점은 기초 어휘가 먼저다', () => {
  // ㅋㅍ 하나에 넷이 통째로 맞는다. 시험이 여럿 낮은 등급으로 올린 쪽이 앞선다
  const tie = buildIndex(
    [
      concept({ slug: 'kickboard', meaning_ko: '킥판', words: { en: { term: 'kickboard' } } }),
      concept({
        slug: 'carpet',
        meaning_ko: '카펫',
        words: {
          ja: { term: 'カーペット', attributes: { jlpt: 'N2' } },
          de: { term: 'Teppich', attributes: { cefr: 'B1' } },
        },
      }),
      concept({
        slug: 'coffee2',
        meaning_ko: '커피',
        words: {
          ja: { term: 'コーヒー', attributes: { jlpt: 'N5' } },
          de: { term: 'Kaffee', attributes: { cefr: 'A1' } },
        },
      }),
    ],
    [],
    [],
  )
  assert.deepEqual(
    search(tie, 'ㅋㅍ').map((h) => h.key),
    ['coffee2', 'carpet', 'kickboard'],
    '등급이 낮은 것 → 높은 것 → 아예 없는 것',
  )
})

test('등급 하나짜리가 여럿짜리를 밀어내지 않는다', () => {
  // 쿠폰은 TSL 75위 하나뿐이라 「있는 것만 평균」이면 0.06으로 커피(0.10)를
  // 이겼다. 빈자리를 벌점으로 세면 뒤집힌다
  const tie = buildIndex(
    [
      concept({ slug: 'coupon', meaning_ko: '쿠폰', words: { en: { term: 'coupon', attributes: { tsl: 75 } } } }),
      concept({
        slug: 'coffee3',
        meaning_ko: '커피',
        words: {
          ja: { term: 'コーヒー', attributes: { jlpt: 'N5' } },
          zh: { term: '咖啡', attributes: { hsk: 3, tocfl: '準備2' } },
          de: { term: 'Kaffee', attributes: { cefr: 'A1' } },
          ru: { term: 'кофе', attributes: { torfl: 'A1' } },
        },
      }),
    ],
    [],
    [],
  )
  assert.deepEqual(
    search(tie, 'ㅋㅍ').map((h) => h.key),
    ['coffee3', 'coupon'],
  )
})

test('등급을 매긴 시험이 많은 쪽이 먼저다', () => {
  const tie = buildIndex(
    [
      concept({
        slug: 'few',
        meaning_ko: '카페',
        words: { de: { term: 'Café', attributes: { cefr: 'A1' } } },
      }),
      concept({
        slug: 'many',
        meaning_ko: '커피',
        words: {
          de: { term: 'Kaffee', attributes: { cefr: 'A1' } },
          ja: { term: 'コーヒー', attributes: { jlpt: 'N5' } },
          ru: { term: 'кофе', attributes: { torfl: 'A1' } },
        },
      }),
    ],
    [],
    [],
  )
  assert.deepEqual(
    search(tie, 'ㅋㅍ').map((h) => h.key),
    ['many', 'few'],
  )
})

test('빈 검색어는 아무것도 안 낸다', () => {
  assert.deepEqual(search(index, ''), [])
  assert.deepEqual(search(index, '   '), [])
})

test('결과 수를 제한한다', () => {
  assert.equal(search(index, 'e', 2).length, 2)
})
