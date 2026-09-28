import assert from 'node:assert/strict'
import { test } from 'node:test'
import { categoryByPos } from './category-pos.ts'

const words = (...pos: string[]) => Object.fromEntries(pos.map((p, i) => [`l${i}`, { part_of_speech: p }]))

test('다섯 언어 이상이 같은 품사면 그 category', () => {
  assert.equal(categoryByPos(words('동사', '동사', '동사', '동사', '동사', '명사', '명사')), 'verb')
  assert.equal(categoryByPos(words('명사', '명사', '명사', '명사', '명사', '명사', '명사')), 'noun')
})

test('넷 이하로 갈리면 말하지 않는다', () => {
  assert.equal(categoryByPos(words('동사', '동사', '동사', '동사', '명사', '명사', '형용사')), null)
})

test('품사가 없거나 모르는 말이면 세지 않는다', () => {
  assert.equal(categoryByPos({ en: { part_of_speech: '형용사' }, ja: undefined, zh: {} }), null)
  assert.equal(categoryByPos(words('표현', '표현', '표현', '표현', '표현')), null)
})
