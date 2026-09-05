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
  // 잇는 부호가 든 단어를 통째로 막지 않는다 — 그 자리만 안 뚫으면 된다
  assert.equal(blankable('código de barras'), true)
  assert.equal(blankable('x-ray'), true, '붙임표')
  assert.equal(blankable("aujourd'hui"), true, '작은따옴표')
  assert.equal(blankable('s\u2019asseoir'), true, '유니코드 따옴표')
  assert.equal(blankable('-'), false, '부호만 있으면 뚫을 글자가 없다')
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
  // 탁음은 청음의 표에서 짝을 찾는데(`bare`), `さ`의 짝에 `ざ`가 들어 있어서
  // `ざ`를 물으면 보기에 `ざ`가 두 번 섰다 — 넷처럼 보이지만 셋이었다
  for (const char of ['ね', '未', 'a', 'ン', 'ы', 'и', 'ё', 'ざ', 'げ', 'べ', 'é']) {
    const picked = pickConfusables(char, 3, rng, shuffled)
    assert.equal(picked.includes(char), false, `${char} 자신이 오답에 들어갔다`)
    assert.equal(new Set(picked).size, 3, `${char} 후보가 중복됐다`)
  }
})

test('정답에 붙은 부호를 후보에도 붙인다', () => {
  // 부호 있는 것이 하나뿐이면 글자를 몰라도 눈으로 골라진다
  const marked = (c: string) => c.normalize('NFD').length > 1
  for (const char of ['é', 'ü', 'ç', 'べ', 'ざ', 'ぱ', 'ヴ']) {
    const picked = pickConfusables(char, 3, rng, shuffled)
    assert.ok(
      picked.every(marked),
      `${char} 후보에 맨 글자가 섞였다: ${picked.join(' ')}`,
    )
  }
})

test('정답이 대문자면 후보도 대문자다', () => {
  // `SIMカード`의 M, `卡拉OK`의 K가 이 자리다
  for (const char of ['M', 'K', 'O']) {
    const picked = pickConfusables(char, 3, rng, shuffled)
    assert.ok(
      picked.every((c) => c === c.toUpperCase()),
      `${char} 후보에 소문자가 섞였다: ${picked.join(' ')}`,
    )
  }
})

test('합쳐서 글자가 되지 않는 조합은 버린다', () => {
  // `き`에 탁점을 붙이면 `ぎ`가 되지만 `ね`에 붙이면 그런 글자가 없다
  const picked = pickConfusables('べ', 3, rng, shuffled)
  assert.equal(picked.length, 3)
  assert.ok(
    picked.every((c) => [...c].length === 1),
    `합쳐지지 않은 자모가 남았다: ${picked.join(' ')}`,
  )
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
