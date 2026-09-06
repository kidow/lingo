import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { initialState, nextQuestion, questionFor, recordAnswer, recordIntro } from './engine.ts'
import { acceptedHanjaAnswers, buildHanjaChoice, HANJA_GRADES, HANJA_LADDER, HANJA_SKILLS, hanjaEntries, hanjaKey, hunEum, masteredHanjaCount, searchHanja, type HanjaCharacter } from './hanja.ts'
import { emptyProgress, freshCard, loadProgress, MASTERED_STABILITY, masteryLabel, progressKey, saveProgress } from './progress.ts'
import { LANGUAGE_TRACKS, TRACKS, trackOf } from './track.ts'
import { loadTrack, saveTrack } from './settings.ts'

const expected = [
  ['g8', 50], ['g7-2', 50], ['g7', 50], ['g6-2', 75], ['g6', 75],
  ['g5-2', 100], ['g5', 100], ['g4-2', 250], ['g4', 250], ['g3-2', 500],
  ['g3', 317], ['g2', 538], ['g1', 1145], ['special-2', 1150], ['special', 1328],
] as const
const files = expected.map(([id]) => JSON.parse(readFileSync(new URL(`../content/hanja/characters/${id}.json`, import.meta.url), 'utf8')) as {
  characters: HanjaCharacter[]
  grade: { id: string; label: string; newCharacters: number; cumulativeUnique: number; officialCount: number }
})
const characters = files.flatMap((file) => file.characters)
const entries = hanjaEntries(characters)
const now = Date.UTC(2026, 8, 6)

test('15급수 전체 5,978자는 중복 없이 두 읽기 능력을 독립적으로 가진다', () => {
  assert.equal(characters.length, 5978)
  assert.equal(new Set(characters.map((c) => c.glyph.normalize('NFC'))).size, 5978)
  assert.equal(new Set(entries.map((e) => e.key)).size, 11956)
  assert.equal(new Set(characters.map((c) => c.sourceRow)).size, 5978)
  let cumulative = 0
  files.forEach((file, i) => {
    assert.equal(file.grade.id, expected[i][0])
    assert.equal(file.characters.length, expected[i][1])
    assert.equal(file.grade.newCharacters, expected[i][1])
    cumulative += file.characters.length
    assert.equal(file.grade.cumulativeUnique, cumulative)
    assert.ok(file.characters.every((c) => c.readingGrade === HANJA_GRADES[i]))
  })
  assert.equal(files[13].grade.officialCount, 4918)
  assert.equal(files[13].grade.cumulativeUnique, 4650)
  assert.equal(characters.filter((c) => c.example).length, 10)
  for (const character of characters) {
    assert.equal(character.id, `u${character.glyph.codePointAt(0)!.toString(16)}`)
    if (character.example) assert.ok(character.example.word.includes(character.glyph))
    assert.ok(character.strokes > 0 && character.hun && character.eum)
  }
  assert.equal(trackOf('hanja').language, null)
  assert.equal(TRACKS.length, LANGUAGE_TRACKS.length + 1)
  assert.ok(LANGUAGE_TRACKS.every((track) => track.language))
})

test('두 방향 퀴즈 모두 정답 하나와 서로 다른 보기 네 개를 만든다', () => {
  for (const entry of entries) {
    const attempt = 3
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

test('두 능력이 숙련돼야 글자 하나를 세고 공개 5,978자를 분모로 쓴다', () => {
  const progress = emptyProgress()
  const mastered = () => ({ rung: 1 as const, streak: 4, fsrs: { ...freshCard(new Date(now)), stability: MASTERED_STABILITY } })
  progress.cards[entries[0].key] = mastered()
  assert.equal(masteredHanjaCount(progress, characters), 0)
  progress.cards[entries[1].key] = mastered()
  progress.cards['hanja:char:not-published:recognition'] = mastered()
  progress.cards['hanja:char:not-published:hun-eum'] = mastered()
  assert.equal(masteredHanjaCount(progress, characters), 1)
  assert.equal(masteryLabel(masteredHanjaCount(progress, characters), characters.length), '<1%')
  progress.cards[entries[1].key].fsrs.stability = MASTERED_STABILITY - 1
  assert.equal(masteredHanjaCount(progress, characters), 0)
})

test('모든 급수와 복수 훈음·호환자·원문 이체자를 검색할 수 있다', () => {
  for (const file of files) {
    for (const character of [file.characters[0], file.characters.at(-1)!]) {
      assert.ok(searchHanja(characters, character.glyph).some((found) => found.id === character.id))
    }
  }
  assert.ok(searchHanja(characters, '성 김').some((c) => c.glyph === '金'))
  assert.ok(searchHanja(characters, '金').some((c) => c.glyph === '金'))
  assert.ok(searchHanja(characters, '煕').some((c) => c.glyph === '熙'))
  assert.ok(searchHanja(characters, '산림').some((c) => c.glyph === '山'))
  assert.equal(searchHanja(characters, '').length, 5978)
})

test('대표 훈음이 달라도 다른 훈음이 겹치면 양쪽 모두 오답 후보에서 빠진다', () => {
  const base = characters[0]
  const alias: HanjaCharacter = { ...base, id: 'alias', glyph: '仮', hun: '별칭', readings: [{ hun: '별칭', eum: base.eum }, { hun: base.hun, eum: base.eum }] }
  const pool = hanjaEntries([...files[0].characters, alias])
  assert.ok(acceptedHanjaAnswers(alias).includes(hunEum(base)))
  for (const entry of hanjaEntries([base])) for (let attempt = 0; attempt < 20; attempt += 1) {
    const q = buildHanjaChoice(entry, pool, attempt)
    if (q.kind !== 'hanja-choice') throw new Error('choice required')
    assert.ok(!q.options.includes(alias.glyph))
    assert.ok(!q.options.includes(hunEum(alias)))
  }
})

test('기존 예시 10자의 진도 키는 전체 급수를 추가해도 유지된다', () => {
  for (const glyph of '山水木土日月火人大小') {
    const character = characters.find((c) => c.glyph === glyph)!
    assert.equal(character.id, `u${glyph.codePointAt(0)!.toString(16)}`)
    assert.equal(character.readingGrade, '8급')
    assert.ok(character.example)
  }
})

test('오답 보기는 같은 급수의 한자에서 고른다', () => {
  for (const file of files) for (const entry of hanjaEntries([file.characters[0]])) {
    const q = buildHanjaChoice(entry, entries)
    if (q.kind !== 'hanja-choice') throw new Error('choice required')
    const labels = new Set(file.characters.map((c) => entry.skill === 'recognition' ? c.glyph : hunEum(c)))
    assert.ok(q.options.every((option) => labels.has(option)))
  }
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
