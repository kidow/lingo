import assert from 'node:assert/strict'
import { test } from 'node:test'
import { auditTrivia } from './trivia-audit.ts'
import type { Trivia } from './types.ts'

/** 검사에 필요한 것만 채운 문항. note·source는 감사와 무관하다 */
function item(id: string, question: string, answer: string, distractors: string[]): Trivia {
  return { id, question, choices: [answer, ...distractors], answer, note: 'x' }
}

const kinds = (list: ReturnType<typeof auditTrivia>) => list.flatMap((suspect) => suspect.kinds)

test('멀쩡한 문항은 아무것도 안 걸린다', () => {
  const clean = item('a', '조사 は는 어떻게 읽나요?', 'わ', ['は', 'あ', 'や'])
  assert.deepEqual(auditTrivia('ja', [clean]), [])
})

test('정답만 유독 길면 길이로 걸린다', () => {
  const long = item('a', '왜인가요?', '오랜 인접과 한자문화권 공유에 따른 수렴', ['우연', '차용', '번역'])
  assert.ok(kinds(auditTrivia('ja', [long])).includes('length'))
})

test('짧은 보기끼리는 한두 글자 차이로 안 걸린다', () => {
  // 비율만 보면 2자 vs 4자가 1.6배를 넘는다. 절대 차이를 같이 봐야 조용하다
  const short = item('a', '어느 것?', 'ы', ['и', 'ая', 'ой'])
  assert.deepEqual(auditTrivia('ru', [short]), [])
})

test('소거되는 오답이 둘이면 걸린다', () => {
  const easy = item('a', '차이는?', '위치와 재학 중', ['차이가 없다', '정해져 있지 않다', '격식 차이'])
  assert.ok(kinds(auditTrivia('en', [easy])).includes('throwaway'))
})

test('소거되는 오답이 하나면 안 걸린다', () => {
  const ok = item('a', '차이는?', '위치와 재학 중', ['차이가 없다', '단수와 복수', '격식 차이'])
  assert.ok(!kinds(auditTrivia('en', [ok])).includes('throwaway'))
})

test('소거 문구가 정답 쪽이면 세지 않는다', () => {
  // 러시아어에 관사는 "아예 없다"가 정답이다 — 오답 품질 문제가 아니다
  const answerIsNone = item('a', '관사는?', '차이가 없다', ['하나뿐', '둘', '셋'])
  assert.ok(!kinds(auditTrivia('ru', [answerIsNone])).includes('throwaway'))
})

test('정답에만 괄호 주석이 붙으면 걸린다', () => {
  const glossed = item('a', '어족은?', '일본어족(Japonic)', ['알타이어족', '우랄어족', '중국티베트어족'])
  assert.ok(kinds(auditTrivia('ja', [glossed])).includes('gloss'))
})

test('넷 다 괄호가 있으면 안 걸린다', () => {
  const even = item('a', '읽기는?', 'わ (wa)', ['は (ha)', 'あ (a)', 'や (ya)'])
  assert.ok(!kinds(auditTrivia('ja', [even])).includes('gloss'))
})

test('같은 물음이 두 번이면 뒤엣것이 걸린다', () => {
  const twins = [
    item('a', '조사 は는 어떻게 읽나요?', 'わ', ['は', 'あ', 'や']),
    item('b', '조사 は는 어떻게 읽나요?', 'わ', ['ほ', 'の', 'を']),
  ]
  const found = auditTrivia('ja', twins)
  assert.equal(found.length, 1)
  assert.equal(found[0].id, 'b')
  assert.ok(found[0].why.includes('a'))
})

test('띄어쓰기·물음표만 다른 물음도 같은 것으로 본다', () => {
  const twins = [
    item('a', '어족은 무엇인가요?', 'A', ['B', 'C', 'D']),
    item('b', '어족은  무엇인가요', 'A', ['E', 'F', 'G']),
  ]
  assert.ok(kinds(auditTrivia('ja', twins)).includes('duplicate'))
})

test('언어가 다르면 같은 물음이어도 중복이 아니다', () => {
  const one = item('a', '관사가 있나요?', '있다', ['없다', '둘 다', '모른다'])
  const two = item('b', '관사가 있나요?', '없다', ['있다', '둘 다', '모른다'])
  assert.deepEqual(auditTrivia('ja', [one]), [])
  assert.deepEqual(auditTrivia('ru', [two]), [])
})
