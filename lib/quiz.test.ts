import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { Entry } from './entries.ts'
import {
  CHOICE_COUNT,
  KEY_COUNT,
  buildBlank,
  buildChoice,
  buildCloze,
  canBlank,
  canCloze,
  clozeAt,
  isClozeTurn,
  isListenTurn,
} from './quiz.ts'
import type { Category, Concept, Example, Language } from './types.ts'

/* ── 도구 ────────────────────────────────────────────────────────── */

function entry(
  slug: string,
  answer: string,
  lang: Language = 'en',
  examples: Example[] = [],
  category: Category = 'noun',
  topic = 'home',
): Entry {
  const word = { term: answer, examples }
  const concept: Concept = {
    slug,
    meaning_ko: slug,
    category,
    image_prompt: 'x',
    topic,
    words: { [lang]: word },
  }
  return { key: slug, concept, word, lang, answer }
}

const ex = (text: string): Example => ({ text, ko: '뜻' })

/* ── clozeAt — 뚫을 자리 ─────────────────────────────────────────── */

test('앞뒤가 비어 있으면 뚫는다', () => {
  assert.equal(clozeAt('The towel is clean.', 'towel', 'en'), 4)
})

test('문장 맨 앞과 맨 끝도 뚫는다', () => {
  assert.equal(clozeAt('Towel first.', 'Towel', 'en'), 0)
  assert.equal(clozeAt('I need a towel', 'towel', 'en'), 9)
})

test('굴절된 긴 낱말 안은 파지 않는다', () => {
  // `Wash your ___s.` 가 되면 꼬리가 정답의 모양을 알려준다
  assert.equal(clozeAt('Wash your hands.', 'hand', 'en'), -1)
})

test('앞에 붙은 낱말 안도 파지 않는다', () => {
  // 여기서 `чайнике`를 뚫으면 정답 `чай`가 뒤에 그대로 남는다
  assert.equal(clozeAt('В чайнике остыл чай.', 'чай', 'ru'), 16)
})

test('같은 글자가 여러 번 나오면 온전한 첫 자리를 고른다', () => {
  assert.equal(clozeAt('The cathedral has a cat.', 'cat', 'en'), 20)
})

test('아포스트로피 뒤는 뚫지 않는다', () => {
  // 프랑스어 `d'`는 뒤에 모음이 온다는 표시라, 자음으로 시작하는 오답이
  // 문법만으로 지워진다 — 문장을 읽지 않고도 걸러진다
  assert.equal(clozeAt("Merci d'entrer par cette porte.", 'entrer', 'fr'), -1)
  assert.equal(clozeAt('Merci d’entrer par cette porte.', 'entrer', 'fr'), -1)
})

test('아포스트로피 앞도 뚫지 않는다', () => {
  // `___'t` 는 정답의 꼬리를 보여준다
  assert.equal(clozeAt("I don't know.", 'don', 'en'), -1)
})

test('하이픈으로 이어진 자리는 뚫지 않는다', () => {
  // 합성어의 나머지 반쪽이 답을 절반 말해 준다
  assert.equal(clozeAt('Ich machte ein Thunfisch-Brot.', 'Thunfisch', 'de'), -1)
  assert.equal(clozeAt('un demi-milliard', 'milliard', 'fr'), -1)
})

test('띄어쓰지 않는 언어는 경계를 보지 않는다', () => {
  // 일본어·중국어는 낱말 사이에 공백이 없어 이 규칙을 적용할 수 없다
  assert.equal(clozeAt('ねこが すきです。', 'ねこ', 'ja'), 0)
  assert.equal(clozeAt('我喜欢猫。', '猫', 'zh'), 3)
})

test('없는 낱말은 -1', () => {
  assert.equal(clozeAt('The towel is clean.', 'soap', 'en'), -1)
})

/* ── canCloze / buildCloze ───────────────────────────────────────── */

test('뚫을 수 있는 예문이 하나도 없으면 문맥 카드를 만들지 않는다', () => {
  const glued = entry('enter', 'entrer', 'fr', [ex("Merci d'entrer par cette porte.")])
  assert.equal(canCloze(glued), false)

  const ok = entry('enter', 'entrer', 'fr', [ex('Je vais entrer maintenant.')])
  assert.equal(canCloze(ok), true)
})

test('뚫을 수 있는 예문만 골라 쓴다', () => {
  const mixed = entry('enter', 'entrer', 'fr', [
    ex("Merci d'entrer par cette porte."),
    ex('Je vais entrer maintenant.'),
  ])
  const q = buildCloze(mixed, [mixed], 0)
  assert.equal(q.before, 'Je vais ')
  assert.equal(q.after, ' maintenant.')
})

test('예문이 여럿이면 회차로 돌려 쓴다', () => {
  const two = entry('towel', 'towel', 'en', [ex('The towel is clean.'), ex('I bought a towel.')])
  assert.equal(buildCloze(two, [two], 0).before, 'The ')
  assert.equal(buildCloze(two, [two], 1).before, 'I bought a ')
  assert.equal(buildCloze(two, [two], 2).before, 'The ')
})

test('문맥 카드는 정답을 포함해 보기 넷을 낸다', () => {
  const target = entry('towel', 'towel', 'en', [ex('The towel is clean.')])
  const pool = [target, entry('soap', 'soap'), entry('mirror', 'mirror'), entry('brush', 'brush')]
  const q = buildCloze(target, pool, 0)
  assert.equal(q.options.length, CHOICE_COUNT)
  assert.ok(q.options.includes('towel'))
  assert.equal(new Set(q.options).size, CHOICE_COUNT)
})

test('같은 틀을 쓰는 낱말은 오답에서 뺀다', () => {
  // 둘 다 `The ___ is clean.` 이면 어느 쪽을 넣어도 문장이 성립한다
  const target = entry('towel', 'towel', 'en', [ex('The towel is clean.')])
  const twin = entry('plate', 'plate', 'en', [ex('The plate is clean.')])
  const pool = [
    target,
    twin,
    entry('soap', 'soap', 'en', [ex('I used soap.')]),
    entry('mirror', 'mirror', 'en', [ex('A mirror hangs there.')]),
    entry('brush', 'brush', 'en', [ex('Bring a brush.')]),
  ]
  const q = buildCloze(target, pool, 0)
  assert.ok(!q.options.includes('plate'))
})

/* ── canBlank / buildBlank ───────────────────────────────────────── */

test('한 글자짜리 낱말은 철자 칸을 만들지 않는다', () => {
  // 첫 글자는 단서로 남기므로 뚫을 자리가 없다
  assert.equal(canBlank(entry('a', 'a')), false)
  assert.equal(canBlank(entry('at', 'at')), true)
})

test('상황 표현은 철자 칸으로 올라가지 않는다', () => {
  const scene = entry('please', 'Please wait', 'en', [], 'scene')
  assert.equal(canBlank(scene), false)
})

test('빈칸은 첫 글자를 뚫지 않는다', () => {
  const word = entry('towel', 'towel')
  for (let attempt = 0; attempt < 8; attempt += 1) {
    assert.ok(buildBlank(word, attempt).holeIndex > 0)
  }
})

test('회차를 돌면 모든 자리를 한 번씩 묻는다', () => {
  // 회차마다 새로 뽑으면 같은 자리가 연달아 나온다 — 그래서 돌린다
  const word = entry('banana', 'banana')
  const holes = [1, 2, 3, 4, 5]
  const seen = holes.map((_, i) => buildBlank(word, i).holeIndex)
  assert.deepEqual([...seen].sort((a, b) => a - b), holes)
})

test('빈칸 후보는 정답을 포함해 넷이다', () => {
  const q = buildBlank(entry('towel', 'towel'), 0)
  assert.equal(q.keys.length, KEY_COUNT)
  assert.ok(q.keys.includes(q.chars[q.holeIndex]))
  assert.equal(new Set(q.keys).size, KEY_COUNT)
})

/* ── buildChoice ─────────────────────────────────────────────────── */

test('4지선다는 정답 하나와 서로 다른 오답 셋이다', () => {
  const target = entry('towel', 'towel')
  const pool = [target, entry('soap', 'soap'), entry('mirror', 'mirror'), entry('brush', 'brush')]
  const q = buildChoice(target, pool, 0)
  assert.equal(q.options.length, CHOICE_COUNT)
  assert.ok(q.options.includes('towel'))
  assert.equal(new Set(q.options).size, CHOICE_COUNT)
})

test('같은 회차면 같은 배치, 회차가 바뀌면 달라진다', () => {
  // 카드를 떼었다 다시 붙여도 보기 순서가 흔들리면 안 된다
  const target = entry('towel', 'towel')
  const pool = [target, entry('soap', 'soap'), entry('mirror', 'mirror'), entry('brush', 'brush')]
  assert.deepEqual(buildChoice(target, pool, 0).options, buildChoice(target, pool, 0).options)

  const laps = new Set([0, 1, 2, 3, 4].map((a) => buildChoice(target, pool, a).options.join()))
  assert.ok(laps.size > 1)
})

/* ── 회차 갈림 ───────────────────────────────────────────────────── */

test('회차 갈림은 결정적이고, 회차가 오르면 갈린다', () => {
  const word = entry('towel', 'towel')
  assert.equal(isClozeTurn(word, 0), isClozeTurn(word, 0))

  const laps = [0, 1, 2, 3, 4, 5].map((a) => isClozeTurn(word, a))
  assert.ok(laps.some(Boolean) !== laps.every(Boolean))
})

test('듣기 회차도 회차마다 갈린다', () => {
  // 발음이 있어야 서는데 AUDIO_MISSING이 비어 있어(20,671자리가 다 찼다)
  // 여기서는 소리 쪽 조건이 늘 참이다 — 갈림만 본다
  const word = entry('towel', 'towel')
  const laps = [0, 1, 2, 3, 4, 5].map((a) => isListenTurn(word, a))
  assert.ok(laps.some(Boolean) !== laps.every(Boolean))
})
