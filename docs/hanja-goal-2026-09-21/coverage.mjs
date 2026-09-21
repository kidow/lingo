/** Current checkout only: candidates, other worktrees and static SVGs do not count. */
import { readFileSync, readdirSync } from 'node:fs'
import assert from 'node:assert/strict'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
const root = new URL('../../content/hanja/characters/', import.meta.url)
const all = readdirSync(root).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, root))).characters)
assert.equal(new Set(all.map(c => c.glyph)).size, all.length)
assert.equal(new Set(HANJA_STROKES.map(c => c.glyph)).size, HANJA_STROKES.length)
const count = characters => {
  const applied = characters.filter(c => hanjaStrokeData(c)).length
  return { applied, total: characters.length, remaining: characters.length - applied,
    percent: Number((applied / characters.length * 100).toFixed(1)) }
}
console.log(JSON.stringify({ runtime: count(all),
  grades: Object.entries(Object.groupBy(all, c => c.readingGrade)).map(([grade, characters]) => ({ grade, ...count(characters) })) }, null, 2))
