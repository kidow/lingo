import assert from 'node:assert/strict'
import { answerSize, optionColumns, optionSize } from './fit.ts'
import { test } from 'node:test'
import { blankable, pickConfusables } from './confusables.ts'
import { shuffled } from './random.ts'

const rng = () => 0.42

test('빈칸은 문자 체계를 가린다', () => {
  assert.equal(blankable('ねこ'), true)
  assert.equal(blankable('パン'), true)
  assert.equal(blankable('invoice'), true)
  assert.equal(blankable('面包'), true, '한자도 이제 뚫는다')
  assert.equal(blankable('стол'), true, '키릴도 이제 뚫는다')
  // 띄어쓰기가 든 단어를 통째로 막지 않는다 — 공백 자리만 안 뚫으면 된다
  assert.equal(blankable('código de barras'), true)
  assert.equal(blankable('   '), false, '뚫을 글자가 하나도 없다')
})

test('오답 후보는 같은 문자 체계에서만 나온다', () => {
  const kana = pickConfusables('ネ', 3, rng, shuffled)
  assert.ok(
    kana.every((c) => c >= '゠' && c <= 'ヿ'),
    `가타카나 문제에 다른 문자가 섞였다: ${kana.join()}`,
  )

  const hanzi = pickConfusables('未', 3, rng, shuffled)
  assert.ok(
    hanzi.every((c) => c >= '一' && c <= '鿿'),
    `한자 문제에 다른 문자가 섞였다: ${hanzi.join()}`,
  )
  assert.ok(hanzi.includes('末'), '닮은 글자를 먼저 쓴다')

  const latin = pickConfusables('a', 3, rng, shuffled)
  assert.ok(latin.every((c) => /^[a-z]$/.test(c)), latin.join())

  const cyrillic = pickConfusables('ы', 3, rng, shuffled)
  assert.ok(
    cyrillic.every((c) => /\p{Script=Cyrillic}/u.test(c)),
    `키릴 문제에 다른 문자가 섞였다: ${cyrillic.join()}`,
  )
  assert.ok(cyrillic.includes('ь'), '닮은 글자를 먼저 쓴다')
})

test('후보에 정답이 섞이지 않는다', () => {
  for (const char of ['ね', '未', 'a', 'ン', 'ы', 'и', 'ё']) {
    const picked = pickConfusables(char, 3, rng, shuffled)
    assert.equal(picked.includes(char), false, `${char} 자신이 오답에 들어갔다`)
    assert.equal(new Set(picked).size, 3, `${char} 후보가 중복됐다`)
  }
})

/* ── 길이에 맞춘 글자 크기 ─────────────────────────────────────────── */

test('정답이 길수록 작은 글자 크기를 고른다', () => {
  assert.match(answerSize('ねこ'), /42px/)
  assert.match(answerSize('ショッピングモール'), /32px/)
  assert.match(answerSize('おかいけい おねがいします'), /24px/)
})

test('보기가 길면 한 줄에 하나씩 쌓는다', () => {
  assert.equal(optionColumns(['ねこ', 'いぬ', 'とり', 'さかな']), 2)
  assert.equal(optionColumns(['ねこ', 'おかいけい おねがいします', 'とり', 'さかな']), 1)
  assert.match(optionSize(['ねこ', 'おかいけい おねがいします']), /14px/)
})
