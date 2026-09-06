import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { initialState, nextQuestion, questionFor, recordAnswer, recordIntro } from './engine.ts'
import { buildHanjaChoice, HANJA_LADDER, HANJA_SKILLS, hanjaEntries, hanjaKey, hunEum, masteredHanjaCount, type HanjaCharacter } from './hanja.ts'
import { emptyProgress, freshCard, loadProgress, MASTERED_STABILITY, masteryLabel, progressKey, saveProgress } from './progress.ts'
import { LANGUAGE_TRACKS, TRACKS, trackOf } from './track.ts'
import { loadTrack, saveTrack } from './settings.ts'

const { characters } = JSON.parse(readFileSync(new URL('../content/hanja/characters/g8.json', import.meta.url), 'utf8')) as { characters: HanjaCharacter[] }
const entries = hanjaEntries(characters)
const now = Date.UTC(2026, 8, 6)

test('예시 10자는 고유한 8급 글자이며 두 읽기 능력을 독립적으로 가진다', () => {
  assert.equal(characters.length, 10)
  assert.equal(new Set(characters.map((c) => c.glyph)).size, 10)
  assert.equal(new Set(entries.map((e) => e.key)).size, 20)
  for (const character of characters) {
    assert.equal(character.id, `u${character.glyph.codePointAt(0)!.toString(16)}`)
    assert.equal(character.readingGrade, '8급')
    assert.ok(character.example.word.includes(character.glyph))
    assert.ok(character.strokes > 0 && character.hun && character.eum)
  }
  assert.equal(trackOf('hanja').language, null)
  assert.equal(TRACKS.length, LANGUAGE_TRACKS.length + 1)
  assert.ok(LANGUAGE_TRACKS.every((track) => track.language))
})

test('두 방향 퀴즈 모두 정답 하나와 서로 다른 보기 네 개를 만든다', () => {
  for (const entry of entries) for (let attempt = 0; attempt < 12; attempt += 1) {
    const q = buildHanjaChoice(entry, entries, attempt)
    assert.equal(q.kind, 'hanja-choice')
    if (q.kind !== 'hanja-choice') throw new Error('choice required')
    assert.equal(q.options.length, 4)
    assert.equal(new Set(q.options).size, 4)
    assert.equal(q.options.filter((v) => v === q.answer).length, 1)
    assert.equal(q.prompt, entry.skill === 'recognition' ? hunEum(entry.character) : entry.character.glyph)
    assert.deepEqual(q, buildHanjaChoice(entry, entries, attempt))
  }
})

test('같은 훈음을 가진 다른 글자를 오답으로 내지 않는다', () => {
  const alias = { ...characters[0], id: 'alias', glyph: '仮' }
  const pool = hanjaEntries([...characters, alias])
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const q = buildHanjaChoice(entries[0], pool, attempt)
    if (q.kind !== 'hanja-choice') throw new Error('choice required')
    assert.ok(!q.options.includes(alias.glyph))
  }
})

test('소개를 미리 한 장 더 만들 때 같은 글자의 다른 능력 소개를 중복 출제하지 않는다', () => {
  const first = nextQuestion(initialState(), entries, () => 0, now, true)!
  assert.equal(first.question.kind, 'hanja-intro')
  const second = nextQuestion(first.state, entries, () => 0, now, true)!
  assert.equal(second.question.kind, 'hanja-intro')
  if (first.question.kind !== 'hanja-intro' || second.question.kind !== 'hanja-intro') throw new Error('intro required')
  assert.notEqual(first.question.entry.character.id, second.question.entry.character.id)
})

test('소개 뒤에는 선택형만 출제하고 오답에도 선택형을 유지하며 FSRS에 기록한다', () => {
  let state = initialState()
  for (const skill of HANJA_SKILLS) state = recordIntro(state, hanjaKey(characters[0].id, skill), now)
  assert.equal(masteredHanjaCount(state.progress, characters), 0)
  for (const correct of [true, false, true]) {
    state = recordAnswer(state, entries[0].key, correct, now + 1000, HANJA_LADDER)
    assert.equal(state.progress.cards[entries[0].key].rung, 1)
    assert.equal(questionFor(entries[0], state, entries).kind, 'hanja-choice')
  }
  assert.equal(state.progress.cards[entries[0].key].fsrs.reps, 3)
  assert.equal(state.progress.cards[entries[1].key].fsrs.reps, 0)
})

test('두 능력이 숙련돼야 글자 하나를 세고 실제 공개 10자를 분모로 쓴다', () => {
  const progress = emptyProgress()
  const mastered = () => ({ rung: 1 as const, streak: 4, fsrs: { ...freshCard(new Date(now)), stability: MASTERED_STABILITY } })
  progress.cards[entries[0].key] = mastered()
  assert.equal(masteredHanjaCount(progress, characters), 0)
  progress.cards[entries[1].key] = mastered()
  progress.cards['hanja:char:not-published:recognition'] = mastered()
  progress.cards['hanja:char:not-published:hun-eum'] = mastered()
  assert.equal(masteredHanjaCount(progress, characters), 1)
  assert.equal(masteryLabel(masteredHanjaCount(progress, characters), characters.length), '10%')
  progress.cards[entries[1].key].fsrs.stability = MASTERED_STABILITY - 1
  assert.equal(masteredHanjaCount(progress, characters), 0)
})

test('한능검 선택과 진도는 새로 불러올 수 있고 기존 트랙 진도와 분리된다', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  const store = new Map<string, string>()
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
  } })
  try {
    const old = JSON.stringify(emptyProgress())
    store.set(progressKey('jlpt'), old)
    const state = recordAnswer(initialState(), entries[0].key, true, now, HANJA_LADDER)
    assert.equal(saveProgress('hanja', state.progress), true)
    assert.deepEqual(loadProgress('hanja'), state.progress)
    assert.equal(store.get(progressKey('jlpt')), old)
    saveTrack('hanja')
    assert.equal(loadTrack(), 'hanja')
  } finally {
    if (original) Object.defineProperty(globalThis, 'localStorage', original)
    else Reflect.deleteProperty(globalThis, 'localStorage')
  }
})
