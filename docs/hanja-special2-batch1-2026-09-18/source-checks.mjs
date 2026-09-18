/** Dictionary playback-order record. SVGs are parsed in RAM; only timing and clip references are kept. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const originals = JSON.parse(readFileSync(new URL('originals.json', import.meta.url), 'utf8'))
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(m => [m[1], m[3]]))

export async function sourceChecks() {
  const entries = []
  for (const entry of originals.entries) {
    const pin = entry.dictionary
    const response = await fetch(pin.url, { signal: AbortSignal.timeout(20000) })
    assert.equal(response.status, 200)
    const raw = Buffer.from(await response.arrayBuffer())
    assert.equal(raw.length, pin.bytes)
    assert.equal(createHash('sha256').update(raw).digest('hex'), pin.sha256)
    const text = raw.toString('utf8')
    assert.equal(text.match(/<title\b[^>]*>([^<]*)<\/title>/)?.[1]?.trim(), entry.glyph)
    const groups = [...text.matchAll(/<g\b[^>]*>/g)].map(m => attributes(m[0]))
    assert.equal(groups.length, 1)
    assert.match(groups[0].transform ?? '', /^scale\(1,-1\) translate\(0, -\d+\)$/)
    const paths = [...text.matchAll(/<path\b[^>]*>/g)].map(m => attributes(m[0]))
    const outlines = new Set(paths.filter(p => p.id).map(p => p.id))
    const clips = Object.fromEntries([...text.matchAll(/<clipPath\b([^>]*)>([\s\S]*?)<\/clipPath>/g)]
      .map(m => [attributes(m[1]).id, attributes(m[2].match(/<use\b[^>]*>/)?.[0] ?? '')['xlink:href']?.replace(/^#/, '')]))
    const strokes = paths.filter(p => p['clip-path']).map((p, index) => {
      const target = clips[p['clip-path'].match(/^url\(#([^)]*)\)$/)[1]]
      assert.ok(outlines.has(target))
      return { xmlIndex: index + 1, target,
        delay: Number(p.style.match(/--d:\s*(\d+)ms/)[1]), duration: Number(p.style.match(/--t:\s*(\d+)ms/)[1]) }
    }).sort((a, b) => a.delay - b.delay)
    assert.equal(strokes.length, entry.strokes)
    assert.equal(new Set(strokes.map(s => s.target)).size, strokes.length)
    assert.ok(strokes.every((s, i) => i === 0 || s.delay >= strokes[i - 1].delay + strokes[i - 1].duration))
    entries.push({ glyph: entry.glyph, dictionary: pin, transform: groups[0].transform,
      strokes: strokes.map(({ xmlIndex, delay, duration }) => ({ xmlIndex, delay, duration })) })
    await new Promise(r => setTimeout(r, 200))
  }
  return { date: '2026-09-18',
    method: 'Each pinned SVG was fetched, size and SHA-256 rechecked, strokes paired through clip-path references and ordered by CSS --d delay. XML order is recorded but never treated as playback order.',
    entries, proprietaryAssetsSaved: 0 }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) console.log(JSON.stringify(await sourceChecks()))
