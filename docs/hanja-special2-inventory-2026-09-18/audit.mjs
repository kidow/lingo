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
  const catalogFile = 'content/hanja/characters/special-2.json', catalogBytes = read(catalogFile)
  const catalog = JSON.parse(catalogBytes), chars = catalog.characters
  assert.equal(chars.length, 1150)
  assert.equal(new Set(chars.map(c => c.glyph)).size, 1150)
  assert.ok(chars.every(c => c.readingGrade === '특급II'))

  // 교과서 목록은 고등 한문 1,800자다. 2급은 한 자도 겹치지 않았으나 특급II는 넷이 겹친다 —
  // 겹치는 글자만 영상 존재를 확인한다. 교과서 경로는 사전보다 앞선 출처라 따로 남긴다
  const source = json('docs/hanja-stroke-additional-sources/sources.json').sources.find(s => s.id === 'vivasam-high-2022')
  const manifest = JSON.parse(execFileSync('/opt/homebrew/bin/rtk', ['proxy', 'python3', 'scripts/hanja-stroke-textbook-source.py', '--json'], { cwd: root, encoding: 'utf8', timeout: 45000, maxBuffer: 1000000 }))
  assert.equal(manifest.source.sha256, source.manifestSha256)
  assert.equal(manifest.entries.length, 1800)
  const publisherRows = chars.map(c => {
    const exact = manifest.entries.filter(s => s.glyph === c.glyph)
    const normalized = manifest.entries.filter(s => s.glyph.trim().normalize('NFC') === c.glyph.normalize('NFC'))
    assert.ok(exact.length <= 1 && normalized.length <= 1)
    return { character: c, source: exact[0] ?? normalized[0], match: exact.length ? 'exact' : normalized.length ? 'nfc-candidate' : 'absent' }
  })

  const corpora = {}, sourceFacts = {}
  for (const [id, pin] of Object.entries(geometrySources)) {
    const response = await fetch(pin.url, { signal: AbortSignal.timeout(120000) })
    assert.equal(response.status, 200)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(hash(bytes), pin.sha256)
    const candidates = parseCandidates(bytes, pin)
    assert.equal(new Set(candidates.map(c => c.character)).size, candidates.length)
    corpora[id] = new Map(candidates.map(c => [c.character, c]))
    sourceFacts[id] = { url: pin.url, sha256: hash(bytes), bytes: bytes.length, characters: candidates.length, license: pin.license }
  }

  // 교과서에 실린 글자만 영상 존재를 확인한다. HEAD와 32바이트 ftyp 검사는 완전성 검증이 아니다
  const videos = new Map()
  for (const { character: c, source: s, match } of publisherRows) {
    if (match === 'absent') continue
    const url = new URL('../media/video/' + s.manifestRow + '.mp4', source.manifestUrl).href
    try {
      const head = await fetch(url, { method: 'HEAD', redirect: 'error', signal: AbortSignal.timeout(15000) })
      const length = head.headers.get('content-length')
      videos.set(c.glyph, { url, status: head.status, bytes: /^\d+$/.test(length ?? '') ? Number(length) : null, type: head.headers.get('content-type'), error: null })
    } catch (error) { videos.set(c.glyph, { url, status: null, bytes: null, type: null, error: error.name + ': ' + error.message }) }
  }

  const rows = chars.map((c, i) => {
    const { source: s, match } = publisherRows[i]
    const counts = ['MM', 'Ja', 'Ko'].map(id => {
      const candidate = corpora[id].get(c.glyph)
      if (!candidate) return null
      assert.ok(candidate.medians.length > 0 && candidate.strokes.length === candidate.medians.length)
      assert.ok(candidate.medians.every(stroke => stroke.length >= 2 && stroke.every(p => p.length === 2 && p.every(Number.isFinite))))
      return candidate.medians.length
    })
    const video = videos.get(c.glyph)
    return [c.glyph, c.strokes, s?.glyph ?? null, s?.manifestRow ?? null, match, ...counts, video?.status ?? null, video?.bytes ?? null, video?.type ?? null, video?.error ?? null]
  })

  const geometryGroups = { countMatch: [], countReview: [], missing: [] }
  for (const row of rows) {
    const counts = row.slice(5, 8)
    const group = counts.every(count => count === null) ? 'missing' : counts.includes(row[1]) ? 'countMatch' : 'countReview'
    geometryGroups[group].push(row[0])
  }
  const corpusCoverage = Object.fromEntries(['MM', 'Ja', 'Ko'].map((id, i) => [id, {
    available: rows.filter(r => r[5 + i] !== null).length, countMatch: rows.filter(r => r[5 + i] === r[1]).length,
  }]))
  const runtimeCount = chars.filter(c => hanjaStrokeData(c)).length
  return {
    version: 1, date: '2026-09-18', purpose: 'Source and candidate-count discovery only; no per-stroke visual review or runtime approval.',
    catalog: { file: catalogFile, sha256: hash(catalogBytes), source: catalog.source, characters: chars.length, strokes: chars.reduce((n, c) => n + c.strokes, 0) },
    runtime: { allCharacters: HANJA_STROKES.length, gradeEnabled: runtimeCount, gradeRemaining: chars.length - runtimeCount, added: 0 },
    publisher: { id: source.id, productUrl: source.productUrl, viewerUrl: source.viewerUrl, manifestUrl: source.manifestUrl,
      manifestSha256: source.manifestSha256, manifestBytes: source.manifestBytes, manifestRows: manifest.entries.length,
      matches: publisherRows.filter(r => r.match !== 'absent').length,
      matchedGlyphs: publisherRows.filter(r => r.match !== 'absent').map(r => r.character.glyph),
      method: 'Pinned XLSX rows; exact spelling first, NFC only as a form-review candidate. Only the listed characters were probed, with HEAD alone. That never establishes video integrity, appearance, stroke count, direction or playback.',
      videoUrlRule: "new URL('../media/video/' + publisherRow + '.mp4', manifestUrl)",
      providerCertification: 'Publisher material; not Korean exam-body certification.', videoAssetsCopied: 0 },
    geometry: sourceFacts, corpusCoverage,
    fields: ['glyph', 'catalogStrokes', 'publisherGlyph', 'publisherRow', 'publisherMatch', 'MMStrokes', 'JaStrokes', 'KoStrokes',
      'videoHttpStatus', 'videoBytes', 'videoContentType', 'videoProbeError'],
    rows, geometryGroups,
    limitations: ['Matching counts never approve order, direction, glyph form or candidate geometry.',
      'No animations, frame sequences, complete outlines or handwritten answers were evaluated in this inventory.',
      'Candidate paths and source media are not included in these records.',
      'Other candidate corpora are outside this inventory; absence here is not proof that no geometry exists anywhere.'],
  }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) console.log(JSON.stringify(await audit()))
