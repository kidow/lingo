import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import reviewed from '../public/hanja-strokes/textbook-kanjivg-reviewed.json' with { type: 'json' }
import { loadTextbookKanjiVGStrokes, TEXTBOOK_KANJIVG_PINS } from './hanja-stroke-textbook-kanjivg.ts'
import { HANJA_TEXTBOOK_SOURCE } from './hanja-stroke-textbook.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const dir = new URL('../content/hanja/characters/', import.meta.url)
const catalog: HanjaCharacter[] = readdirSync(dir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const root = new URL('../docs/hanja-goal-special-textbook-lin-2026-09-21/', import.meta.url)
const sha = (value: string) => createHash('sha256').update(value).digest('hex')

test('鄰 15획을 교과서 0480번과 공개 경로에서 재현하고 隣과 구분한다', () => {
  const reproduced = JSON.parse(execFileSync(process.execPath,
    [fileURLToPath(new URL('build.mjs', root))], { encoding: 'utf8' }))
  assert.deepEqual(reviewed, reproduced)
  const character = catalog.find(entry => entry.glyph === '鄰')!
  assert.equal(character.strokes, 15)
  const data = hanjaStrokeData(character)!
  assert.deepEqual(data, reviewed[0])
  assert.equal(data.verificationSource, 'vivasam-high-2022')
  assert.equal(HANJA_STROKES.filter(entry => entry.glyph === '鄰').length, 1)
  assert.equal(sha(JSON.stringify(data.paths)), TEXTBOOK_KANJIVG_PINS[0].pathsSha256)
  assert.equal(reviewed[0].sourceReference.manifestSha256, HANJA_TEXTBOOK_SOURCE.manifestSha256)
  assert.equal(reviewed[0].sourceReference.manifestRow, '0480')
  assert.equal(reviewed[0].sourceReference.glyph, '鄰')
  assert.equal(hanjaStrokeData(catalog.find(entry => entry.glyph === '隣')!)?.glyph, '隣')
  assert.equal(reviewed[0].geometryLicense.spdx, 'CC-BY-SA-3.0')
})

test('교과서 전체 영상·관찰 기록과 15획 시각 검토를 고정한다', () => {
  const findingsText = readFileSync(new URL('findings.json', root), 'utf8')
  const observationsText = readFileSync(new URL('observations.json', root), 'utf8')
  const findings = JSON.parse(findingsText)
  const observations = JSON.parse(observationsText)
  assert.equal(sha(findingsText), reviewed[0].reviewSha256)
  assert.equal(sha(observationsText), reviewed[0].observationsSha256)
  assert.deepEqual(findings.sourceVideo, reviewed[0].sourceVideo)
  assert.equal(observations.sourceVideoSha256, reviewed[0].sourceVideo.sha256)
  assert.equal(findings.strokes.length, 15)
  assert.equal(observations.strokes.length, 15)
  assert.equal(findings.manifestRowValues[4], '鄰')
  assert.ok(Object.values(findings.checks).every(value => value === 'match'))
  let previousTime = -1
  for (let i = 0; i < 15; i++) {
    const stroke = findings.strokes[i]
    assert.equal(stroke.stroke, i + 1)
    assert.equal(stroke.frames.length, 3)
    assert.deepEqual(stroke.frames.map((frame: { time: number }) => frame.time), observations.strokes[i].observedTimes)
    assert.ok(stroke.observation.length > 10)
    for (const frame of stroke.frames) {
      assert.match(frame.sha256, /^[a-f0-9]{64}$/)
      assert.ok(frame.time > previousTime && frame.time < 21.831)
      previousTime = frame.time
    }
  }
})

test('다른 한자·영상·순서·라이선스·검토 기록을 대입하면 거부한다', () => {
  const mutations: ((entry: typeof reviewed[number]) => void)[] = [
    entry => { entry.glyph = '隣' },
    entry => { entry.verificationSource = 'ehanja-crosschecked' },
    entry => { entry.sourceReference.manifestRow = '0481' },
    entry => { entry.sourceVideo.sha256 = '0'.repeat(64) },
    entry => { entry.geometrySource = '0'.repeat(64) },
    entry => { entry.geometryLicense.spdx = 'unknown' },
    entry => { entry.reviewSha256 = '0'.repeat(64) },
    entry => { entry.observationsSha256 = '0'.repeat(64) },
    entry => { entry.sourceStrokeIndices.reverse() },
    entry => { entry.paths.pop() },
  ]
  for (const mutate of mutations) {
    const changed = structuredClone(reviewed)
    mutate(changed[0])
    assert.throws(() => loadTextbookKanjiVGStrokes(changed))
  }
  assert.throws(() => loadTextbookKanjiVGStrokes([...reviewed, reviewed[0]]))
})
