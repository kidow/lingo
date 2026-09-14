/** Read-only source/count inventory. Never approves strokes or writes downloaded assets. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE, parseCandidates } from '../../scripts/hanja-stroke-audit.ts'

const root = fileURLToPath(new URL('../../', import.meta.url))
const read = path => readFileSync(new URL('../../' + path, import.meta.url))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const json = path => JSON.parse(read(path))
const geometrySources = { MM: MAKE_ME_A_HANZI_SOURCE, Ja: JAPANESE_CANDIDATE_SOURCE, Ko: CANDIDATE_SOURCE }

export async function audit() {
  const catalogFile = 'content/hanja/characters/g3.json', catalogBytes = read(catalogFile)
  const catalog = JSON.parse(catalogBytes), chars = catalog.characters
  assert.equal(chars.length, 317)
  assert.equal(new Set(chars.map(c => c.glyph)).size, 317)
  assert.ok(chars.every(c => c.readingGrade === '3급'))
  const source = json('docs/hanja-stroke-additional-sources/sources.json').sources.find(s => s.id === 'vivasam-high-2022')
  const manifest = JSON.parse(execFileSync('/opt/homebrew/bin/rtk', ['proxy', 'python3', 'scripts/hanja-stroke-textbook-source.py', '--json'], { cwd: root, encoding: 'utf8', timeout: 45000, maxBuffer: 1000000 }))
  assert.equal(manifest.source.sha256, source.manifestSha256)
  assert.equal(manifest.entries.length, 1800)
  const corpora = {}, sourceFacts = {}
  for (const [id, pin] of Object.entries(geometrySources)) {
    const response = await fetch(pin.url, { signal: AbortSignal.timeout(45000) })
    assert.equal(response.status, 200)
    const bytes = Buffer.from(await response.arrayBuffer())
    const candidates = parseCandidates(bytes, pin)
    assert.equal(new Set(candidates.map(c => c.character)).size, candidates.length)
    corpora[id] = new Map(candidates.map(c => [c.character, c]))
    sourceFacts[id] = { url: pin.url, sha256: hash(bytes), bytes: bytes.length, characters: candidates.length, license: pin.license }
  }
  const sourceRows = chars.map(c => {
    const exact = manifest.entries.filter(s => s.glyph === c.glyph)
    const normalized = manifest.entries.filter(s => s.glyph.trim().normalize('NFC') === c.glyph.normalize('NFC'))
    assert.ok(exact.length <= 1 && normalized.length <= 1)
    return { character: c, source: exact[0] ?? normalized[0], match: exact.length ? 'exact' : normalized.length ? 'nfc-candidate' : 'absent' }
  })
  let cursor = 0, finished = 0
  const rows = new Array(chars.length)
  async function worker() {
    while (cursor < sourceRows.length) {
      const i = cursor++, { character: c, source: s, match } = sourceRows[i]
      let status = null, bytes = null, type = null, prefixStatus = null, isMp4 = false, error = null
      if (s) {
        const url = new URL('../media/video/' + s.manifestRow + '.mp4', source.manifestUrl).href
        try {
          const response = await fetch(url, { method: 'HEAD', redirect: 'error', signal: AbortSignal.timeout(15000) })
          status = response.status
          const length = response.headers.get('content-length')
          bytes = length !== null && /^\d+$/.test(length) ? Number(length) : null
          type = response.headers.get('content-type')
          if (status === 200 && bytes > 0) {
            const prefix = await fetch(url, { headers: { Range: 'bytes=0-31' }, redirect: 'error', signal: AbortSignal.timeout(15000) })
            prefixStatus = prefix.status
            if (prefix.status === 200 || prefix.status === 206) {
              const reader = prefix.body.getReader(), chunks = []
              let length = 0
              try {
                while (length < 32) {
                  const { value, done } = await reader.read()
                  if (done) break
                  chunks.push(Buffer.from(value).subarray(0, 32 - length))
                  length += chunks.at(-1).length
                }
              } finally { await reader.cancel() }
              const bytes = Buffer.concat(chunks)
              isMp4 = bytes.length >= 12 && bytes.subarray(4, 8).toString('ascii') === 'ftyp'
            } else await prefix.body?.cancel()
          }
        } catch (e) { error = e.name + ': ' + e.message }
      }
      const counts = ['MM', 'Ja', 'Ko'].map(id => {
        const candidate = corpora[id].get(c.glyph)
        if (!candidate) return null
        assert.ok(candidate.medians.length > 0 && candidate.strokes.length === candidate.medians.length)
        assert.ok(candidate.medians.every(stroke => stroke.length >= 2 && stroke.every(p => p.length === 2 && p.every(Number.isFinite))))
        return candidate.medians.length
      })
      rows[i] = [c.glyph, c.strokes, s?.glyph ?? null, s?.manifestRow ?? null, match, ...counts, status, bytes, type, prefixStatus, isMp4, error]
      finished++
      if (finished % 50 === 0) process.stderr.write('Checked ' + finished + '/' + chars.length + ' source/count records\n')
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker))
  const groups = { wholeStrokeReview: [], sourceFormReview: [], geometryCountReview: [], geometryNeeded: [], sourceUnavailable: [] }
  for (const r of rows) {
    const [glyph, strokes, , , match, mm, ja, ko, status, bytes, , , isMp4] = r
    if (match !== 'exact') groups.sourceFormReview.push(glyph)
    else if (status !== 200 || !(bytes > 0) || !isMp4) groups.sourceUnavailable.push(glyph)
    else if ([mm, ja, ko].every(n => n === null)) groups.geometryNeeded.push(glyph)
    else if (![mm, ja, ko].includes(strokes)) groups.geometryCountReview.push(glyph)
    else groups.wholeStrokeReview.push(glyph)
  }
  const variants = [['隷', '隸'], ['隣', '鄰']].map(([glyph, neighbor]) => ({ glyph, neighbor, sourceRows: manifest.entries.filter(s => s.glyph.trim().normalize('NFC') === neighbor), policy: 'Different exact glyph; form comparison required, not a substitute or approval.' }))
  const first50 = groups.wholeStrokeReview.slice(0, 50).map(glyph => {
    const r = rows.find(r => r[0] === glyph)
    const selected = [['Ko', r[7]], ['MM', r[5]], ['Ja', r[6]]].find(([, count]) => count === r[1])[0]
    return { glyph, strokes: r[1], publisherRow: r[3], candidate: selected }
  })
  const corpusCoverage = Object.fromEntries(['MM', 'Ja', 'Ko'].map((id, i) => [id, { available: rows.filter(r => r[5 + i] !== null).length, countMatch: rows.filter(r => r[5 + i] === r[1]).length }]))
  const runtimeCount = chars.filter(c => hanjaStrokeData(c)).length
  return {
    version: 1, date: '2026-09-14', purpose: 'Source and candidate-count discovery only; no per-stroke visual review or runtime approval.',
    catalog: { file: catalogFile, sha256: hash(catalogBytes), source: catalog.source, characters: chars.length, strokes: chars.reduce((n, c) => n + c.strokes, 0) },
    runtime: { allCharacters: HANJA_STROKES.length, grade3Enabled: runtimeCount, grade3Remaining: chars.length - runtimeCount, added: 0 },
    publisher: { id: source.id, productUrl: source.productUrl, viewerUrl: source.viewerUrl, manifestUrl: source.manifestUrl, manifestSha256: source.manifestSha256, manifestBytes: source.manifestBytes, manifestRows: manifest.entries.length, method: 'Pinned XLSX rows; exact spelling first, NFC only as a form-review candidate. HEAD checks size and metadata; a 32-byte range checks the MP4 ftyp signature. These do not establish complete video integrity, character appearance, stroke count, direction or playback.', videoUrlRule: "new URL('../media/video/' + publisherRow + '.mp4', manifestUrl)", providerCertification: 'Publisher material; not Korean exam-body certification.', videoAssetsCopied: 0 },
    geometry: sourceFacts, corpusCoverage,
    fields: ['glyph', 'catalogStrokes', 'publisherGlyph', 'publisherRow', 'publisherMatch', 'MMStrokes', 'JaStrokes', 'KoStrokes', 'videoHttpStatus', 'videoBytes', 'videoContentType', 'videoPrefixHttpStatus', 'videoPrefixIsMp4', 'probeError'],
    rows, groups, variantNeighbors: variants,
    first50: { characters: first50.length, strokes: first50.reduce((n, c) => n + c.strokes, 0), entries: first50, status: 'awaiting-complete-order-direction-boundary-and-form-review' },
    limitations: ['Matching counts never approve order, direction, glyph form or candidate geometry.', 'No animations, frame sequences, complete outlines or handwritten answers were evaluated in this inventory.', 'Candidate paths and source media are not included in these records.', 'Other candidate corpora are outside this inventory; absence here is not proof that no geometry exists anywhere.'],
  }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) console.log(JSON.stringify(await audit()))
