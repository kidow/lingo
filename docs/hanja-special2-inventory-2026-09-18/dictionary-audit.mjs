/** Read-only domestic dictionary availability audit; never writes source assets or approves strokes. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const base = 'http://www.e-hanja.kr/e-hanja/dic/contents/'
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex')
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map((m) => [m[1], m[3]]))

async function receive(url, options = {}) {
  const response = await fetch(url, { ...options, redirect: 'error', signal: AbortSignal.timeout(15000) })
  const bytes = Buffer.from(await response.arrayBuffer())
  return { status: response.status, bytes: bytes.length, sha256: hash(bytes), text: bytes.toString('utf8') }
}

export function svgMetadata(text) {
  const paths = [...text.matchAll(/<path\b[^>]*>/g)].map((m) => attributes(m[0]))
  const outlines = paths.filter((p) => p.id)
  const animated = paths.filter((p) => p['clip-path'])
  const clips = [...text.matchAll(/<clipPath\b([^>]*)>([\s\S]*?)<\/clipPath>/g)].map((m) => ({
    id: attributes(m[1]).id,
    target: attributes(m[2].match(/<use\b[^>]*>/)?.[0] ?? '')['xlink:href']?.replace(/^#/, ''),
  }))
  const outlineIds = new Set(outlines.map((p) => p.id))
  const clipIds = new Set(clips.map((p) => p.id))
  const references = animated.map((p) => p['clip-path'].match(/^url\(#([^)]*)\)$/)?.[1])
  const timings = animated.map((p) => ({
    delay: Number(p.style?.match(/--d:\s*(\d+(?:\.\d+)?)ms/)?.[1]),
    duration: Number(p.style?.match(/--t:\s*(\d+(?:\.\d+)?)ms/)?.[1]),
  })).sort((a, b) => a.delay - b.delay)
  const timingSequenceValid = timings.length > 0 && timings.every((t, i) =>
    Number.isFinite(t.delay) && t.delay >= 0 && Number.isFinite(t.duration) && t.duration > 0 &&
    (i === 0 || t.delay >= timings[i - 1].delay + timings[i - 1].duration))
  const clipCoverageValid = outlines.length > 0 && outlineIds.size === outlines.length &&
    clips.length === outlines.length && clipIds.size === clips.length &&
    new Set(clips.map((c) => c.target)).size === outlines.length && clips.every((c) => outlineIds.has(c.target)) &&
    animated.length === outlines.length && new Set(references).size === animated.length && references.every((id) => clipIds.has(id))
  return {
    title: text.match(/<title\b[^>]*>([^<]*)<\/title>/)?.[1]?.trim() ?? null,
    rootId: attributes(text.match(/<svg\b[^>]*>/)?.[0] ?? '').id ?? null,
    outlines: outlines.length, animated: animated.length, timingSequenceValid, clipCoverageValid,
  }
}

export async function auditDictionary({ retryInventory = null } = {}) {
  const catalogPath = 'content/hanja/characters/special-2.json'
  const bytes = readFileSync(root + catalogPath)
  const catalog = JSON.parse(bytes)
  assert.equal(catalog.characters.length, 1150)
  assert.equal(catalog.characters.reduce((n, c) => n + c.strokes, 0), 15002)
  const sampleGlyph = catalog.characters[0].glyph
  const detailUrl = base + 'jajun_content.asp?hanja=' + encodeURIComponent(sampleGlyph) + '&keyword=' + encodeURIComponent(sampleGlyph)
  const discovery = await receive(detailUrl)
  assert.equal(discovery.status, 200)
  assert.match(discovery.text, /url:\s*"jajun_contentA\.asp"/)
  assert.match(discovery.text, /type:\s*"POST"/)
  assert.match(discovery.text, /data:\s*\{qry:strA, snd:strB, hanja:strC, pageNo:strD, keyfield:strE, keyword:strF, hanjaGrade:strG, backUrl:strH\}/)
  const stylesheetUrl = 'http://img.e-hanja.kr/hanjaSvg/aniSVG/libs/opmGna.svg.ani.min.css'
  const stylesheet = await receive(stylesheetUrl)
  assert.equal(stylesheet.status, 200)
  assert.match(stylesheet.text, /animation:framesRadical var\(--t\) linear forwards var\(--d\)/)
  assert.match(stylesheet.text, /animation:framesNormal var\(--t\) linear forwards var\(--d\)/)
  const fields = ['glyph', 'catalogStrokes', 'detailHttpStatus', 'detailBytes', 'detailSha256', 'displayedStrokes',
    'svgUrl', 'svgHttpStatus', 'svgBytes', 'svgSha256', 'svgTitle', 'outlineCount', 'animatedCount',
    'stepImageCount', 'timingSequenceValid', 'clipCoverageValid', 'svgRootId', 'error']
  if (retryInventory) {
    assert.equal(retryInventory.catalog.sha256, hash(bytes))
    assert.deepEqual(retryInventory.fields, fields)
    assert.equal(retryInventory.rows.length, catalog.characters.length)
    assert.deepEqual(retryInventory.rows.map((row) => row[0]), catalog.characters.map((c) => c.glyph))
    assert.equal(retryInventory.retryHistory, undefined, 'Only one retry pass is allowed')
  }
  const errorIndex = fields.indexOf('error')
  const work = catalog.characters.map((c, index) => ({ c, index }))
    .filter(({ index }) => !retryInventory || retryInventory.rows[index][errorIndex])
  const rows = retryInventory ? retryInventory.rows.map((row) => [...row]) : new Array(catalog.characters.length)
  let next = 0
  let done = 0
  await Promise.all(Array.from({ length: retryInventory ? 2 : 4 }, async () => {
    while (next < work.length) {
      const { c, index } = work[next++]
      const row = { glyph: c.glyph, catalogStrokes: c.strokes }
      try {
        const detail = await receive(base + 'jajun_contentA.asp', { method: 'POST', body: new URLSearchParams({
          qry: '', snd: '', hanja: c.glyph, pageNo: '', keyfield: '', keyword: c.glyph, hanjaGrade: '', backUrl: '',
        }) })
        Object.assign(row, { detailHttpStatus: detail.status, detailBytes: detail.bytes, detailSha256: detail.sha256 })
        if (detail.status !== 200) throw new Error('Dictionary detail HTTP ' + detail.status)
        row.displayedStrokes = Number(detail.text.match(/title=["']\s*(\d+)획 열람\s*["']/)?.[1]) || null
        const iframe = [...detail.text.matchAll(/<iframe\b[^>]*>/g)].map((m) => attributes(m[0])).find((a) => a.id === 'svgAni')
        if (!iframe?.src) throw new Error('No animation iframe in public dictionary response')
        row.svgUrl = new URL(iframe.src, base).href
        const sourceUrl = new URL(row.svgUrl)
        assert.equal(sourceUrl.origin, 'http://img.e-hanja.kr')
        assert.match(sourceUrl.pathname, /^\/hanjaSvg\/aniSVG\/[A-F\d]+\/[A-F\d]+\.svg$/)
        row.stepImageCount = new Set([...detail.text.matchAll(/<img\b[^>]*>/g)]
          .map((m) => attributes(m[0]).src ?? '').filter((url) => url.startsWith(row.svgUrl.replace(/\.svg$/, '-')))).size
        const svg = await receive(row.svgUrl)
        Object.assign(row, { svgHttpStatus: svg.status, svgBytes: svg.bytes, svgSha256: svg.sha256 })
        if (svg.status !== 200) throw new Error('Linked SVG HTTP ' + svg.status)
        const meta = svgMetadata(svg.text)
        Object.assign(row, { svgTitle: meta.title, outlineCount: meta.outlines, animatedCount: meta.animated,
          timingSequenceValid: meta.timingSequenceValid, clipCoverageValid: meta.clipCoverageValid, svgRootId: meta.rootId })
      } catch (error) {
        row.error = error.name + ': ' + error.message
      }
      rows[index] = fields.map((field) => row[field] ?? null)
      if (++done % 50 === 0) process.stderr.write('Dictionary availability ' + done + '/' + work.length + '\n')
    }
  }))
  const records = rows.map((row) => Object.fromEntries(fields.map((field, i) => [field, row[i]])))
  const groups = { countMatched: [], countReview: [], metadataReview: [], unavailable: [] }
  for (const r of records) {
    const group = r.error ? 'unavailable' : r.svgTitle !== r.glyph || !r.timingSequenceValid || !r.clipCoverageValid
      ? 'metadataReview' : r.catalogStrokes !== r.displayedStrokes || r.catalogStrokes !== r.outlineCount ||
        r.catalogStrokes !== r.animatedCount || r.catalogStrokes !== r.stepImageCount ? 'countReview' : 'countMatched'
    groups[group].push(r.glyph)
  }
  return {
    schemaVersion: 1, checkedAt: '2026-09-18', purpose: 'Public dictionary availability and metadata inventory only; no visual stroke approval.',
    catalog: { file: catalogPath, sha256: hash(bytes), characters: catalog.characters.length, strokes: 15002 },
    source: { id: 'ehanja-public-dictionary', provider: 'e-hanja.kr 디지털 한자사전', classification: 'Private Korean dictionary; not Korea Eomunhoe certification.',
      detailUrl, detailHttpStatus: discovery.status, detailBytes: discovery.bytes, detailSha256: discovery.sha256,
      ajaxUrl: base + 'jajun_contentA.asp', method: 'POST', requestFields: ['qry', 'snd', 'hanja', 'pageNo', 'keyfield', 'keyword', 'hanjaGrade', 'backUrl'],
      stylesheet: { url: stylesheetUrl, httpStatus: stylesheet.status, bytes: stylesheet.bytes, sha256: stylesheet.sha256,
        interpretation: 'The animation shorthand uses var(--t) as duration and var(--d) as delay.' },
      discovery: 'Public detail HTML declares showCustomer POST; every SVG URL is extracted from iframe#svgAni in its live response, never guessed.',
      authentication: 'No cookies, credentials or member session were used.',
      geometryPolicy: 'SVG paths and HTML are inspected only in RAM and never included in this inventory or runtime.' },
    fields, rows, groups, counts: Object.fromEntries(Object.entries(groups).map(([key, glyphs]) => [key, glyphs.length])),
    limitations: [
      'Matching title and counts do not verify the rendered final form or the order, direction and segmentation of all strokes.',
      'CSS --d delay ordering is checked for complete non-overlapping timing; XML path order is not treated as animation order.',
      'Availability does not establish redistribution rights. No proprietary outlines, animated paths, scripts or images were saved.',
      'No animation was promoted, and no per-character visual review was completed in this inventory.',
    ],
    ...(retryInventory ? { retryHistory: work.map(({ c, index }) => ({ glyph: c.glyph,
      firstError: retryInventory.rows[index][errorIndex], finalError: rows[index][errorIndex], attempts: 2,
    })), retryPolicy: 'One retry of initial failed rows only, with concurrency reduced from four to two.' } : {}),
    runtimeApprovalsAdded: 0, proprietaryAssetsSaved: 0,
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) console.log(JSON.stringify(await auditDictionary()))
