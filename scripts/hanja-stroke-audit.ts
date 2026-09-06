/** Read-only audit. Candidate availability and matching counts NEVER approve playback. */
import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { HANJA_STROKES } from '../lib/hanja-strokes.ts'

export const CANDIDATE_SOURCE = {
  url: 'https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsKo.txt',
  sha256: '7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e',
  license: 'Arphic Public License; candidates are not bundled in the application',
} as const

type Character = { glyph: string; strokes: number; readingGrade: string }
type Candidate = { character: string; strokes: string[]; medians: number[][][] }
type Verified = { glyph: string; paths: readonly string[]; sourceImage: string; sourceRow: number }

export function parseCandidates(bytes: Uint8Array): Candidate[] {
  if (createHash('sha256').update(bytes).digest('hex') !== CANDIDATE_SOURCE.sha256) {
    throw new Error('Candidate source hash changed; review the upstream revision before continuing')
  }
  return Buffer.from(bytes).toString('utf8').trim().split('\n').map((line) => JSON.parse(line))
}

export function auditStrokes(characters: Character[], candidates: Candidate[], verified: readonly Verified[]) {
  const byGlyph = new Map<string, Candidate>()
  for (const candidate of candidates) {
    if (typeof candidate.character !== 'string' || [...candidate.character].length !== 1 || byGlyph.has(candidate.character)) {
      throw new Error('Invalid or duplicate candidate character')
    }
    byGlyph.set(candidate.character, candidate)
  }
  const approved = new Map(verified.map((entry) => [entry.glyph, entry]))
  if (approved.size !== verified.length) throw new Error('Duplicate verified character')
  const entries = characters.map((character) => {
    const candidate = byGlyph.get(character.glyph)
    const review = approved.get(character.glyph)
    if (review && (!review.sourceImage || review.sourceRow < 1 || review.paths.length !== character.strokes)) {
      throw new Error(`Verified source/count mismatch: ${character.glyph}`)
    }
    const valid = candidate && Array.isArray(candidate.strokes) && candidate.strokes.length > 0
      && candidate.strokes.every((path) => typeof path === 'string' && path.trim().startsWith('M'))
      && Array.isArray(candidate.medians) && candidate.medians.length === candidate.strokes.length
      && candidate.medians.every((points) => Array.isArray(points) && points.length >= 2
        && points.every((point) => Array.isArray(point) && point.length === 2 && point.every(Number.isFinite)))
    const candidateStatus = !candidate ? 'missing' : !valid ? 'invalid'
      : candidate.strokes.length !== character.strokes ? 'count-mismatch' : 'needs-official-review'
    return {
      glyph: character.glyph,
      grade: character.readingGrade,
      expectedStrokes: character.strokes,
      candidateStrokes: candidate?.strokes?.length ?? null,
      candidateStatus,
      // Approved paths remain our independently reviewed paths, never the candidate's paths.
      playback: review ? 'verified' : 'unavailable',
      evidence: review ? { image: review.sourceImage, row: review.sourceRow } : null,
    }
  })
  const counts = (key: 'candidateStatus' | 'playback') => Object.fromEntries(
    [...new Set(entries.map((entry) => entry[key]))].map((status) => [status, entries.filter((entry) => entry[key] === status).length]),
  )
  return { source: CANDIDATE_SOURCE, total: entries.length, candidateTotal: candidates.length,
    candidateStatus: counts('candidateStatus'), playback: counts('playback'), entries }
}

async function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const folder = join(root, 'content/hanja/characters')
  const characters: Character[] = (await Promise.all((await readdir(folder)).filter((file) => file.endsWith('.json')).sort()
    .map(async (file) => JSON.parse(await readFile(join(folder, file), 'utf8')).characters))).flat()
  const response = await fetch(CANDIDATE_SOURCE.url, { signal: AbortSignal.timeout(30_000) })
  if (!response.ok) throw new Error(`Candidate download: HTTP ${response.status}`)
  const report = auditStrokes(characters, parseCandidates(new Uint8Array(await response.arrayBuffer())), HANJA_STROKES)
  if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2))
  else {
    const { entries, ...summary } = report
    console.log(JSON.stringify({ ...summary, mismatches: entries.filter((entry) => entry.candidateStatus === 'count-mismatch') }, null, 2))
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main()
}
