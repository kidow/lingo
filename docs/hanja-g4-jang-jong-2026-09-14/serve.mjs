// Review-only loopback server. Dictionary artwork and dependencies remain in RAM.
import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
const hash = value => createHash('sha256').update(value).digest('hex')
const manifest = readFileSync(new URL('../hanja-g4-held-11-2026-09-14/sources.json', import.meta.url))
assert.equal(hash(manifest), '0217a3f6fd4ff7a1f80cdd59790ad8f7f7b36f2f966dd042e14608895e7152c5')
const sources = JSON.parse(manifest).entries.filter(e => ['獎', '鍾'].includes(e.glyph))
const assets = new Map()
for (const source of sources) {
  const response = await fetch(source.sourceUrl)
  assert.equal(response.status, 200)
  const bytes = Buffer.from(await response.arrayBuffer())
  assert.equal(bytes.length, source.sourceBytes)
  assert.equal(hash(bytes), source.sourceSha256)
  assets.set(new URL(source.sourceUrl).pathname.replace('/hanjaSvg/aniSVG/', '/'), { bytes, type: 'image/svg+xml' })
}
// Both URLs are linked by the exact inspected dictionary SVG.
for (const [file, type, sha256] of [
  ['opmGna.svg.ani.min.css', 'text/css', '5c427b5157bb10b0f03e2b42207c55cb2149098044c3a254cd6d0a8d22f8af18'],
  ['gna.lib.svg.ani.min.js', 'text/javascript', 'e807c25571b8c0c46a80a37d86ff7b982822303dfb28d7464e35dfdffb2d2690'],
]) {
  const response = await fetch('http://img.e-hanja.kr/hanjaSvg/aniSVG/libs/' + file)
  assert.equal(response.status, 200)
  const bytes = Buffer.from(await response.arrayBuffer())
  assert.equal(hash(bytes), sha256)
  assets.set('/libs/' + file, { bytes, type })
  console.log(JSON.stringify({ dependency: file, bytes: bytes.length, sha256: hash(bytes) }))
}
const server = createServer((request, response) => {
  const path = new URL(request.url, 'http://127.0.0.1').pathname
  response.setHeader('Cache-Control', 'no-store')
  if (request.method !== 'GET') { response.writeHead(405).end(); return }
  if (path === '/sources.json') { response.setHeader('Content-Type', 'application/json'); response.end(JSON.stringify(sources)); return }
  const own = path === '/' ? 'review.html' : path === '/candidate-paths.json' ? 'candidate-paths.json' : undefined
  if (own) { response.setHeader('Content-Type', own.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/json'); response.end(readFileSync(new URL(own, import.meta.url))); return }
  const asset = assets.get(path)
  if (!asset) { response.writeHead(404).end(); return }
  response.setHeader('Content-Type', asset.type); response.end(asset.bytes)
})
server.listen(0, '127.0.0.1', () => console.log(JSON.stringify({ pid: process.pid, url: `http://127.0.0.1:${server.address().port}/`, sourceHashesVerified: sources.length })))
