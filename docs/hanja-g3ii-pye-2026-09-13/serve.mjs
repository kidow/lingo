/** Local-only review: vendor SVG stays in memory and is never written to disk. */
import { createServer } from 'node:http'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

const response = await fetch('http://img.e-hanja.kr/hanjaSvg/aniSVG/5F00/5F0A.svg')
if (!response.ok) throw new Error(`Source HTTP ${response.status}`)
const source = Buffer.from(await response.arrayBuffer())
if (createHash('sha256').update(source).digest('hex') !== 'b345afcd709b8bfe29a05a6c979bbe2cd8464c7fa47ab78f3228a9812dfefd02') throw new Error('Source changed; review timings again')
const assets = new Map([['/source.svg', [source, 'image/svg+xml']]])
for (const [name, type, hash] of [
  ['gna.lib.svg.ani.min.js', 'text/javascript', 'e807c25571b8c0c46a80a37d86ff7b982822303dfb28d7464e35dfdffb2d2690'],
  ['opmGna.svg.ani.min.css', 'text/css', '5c427b5157bb10b0f03e2b42207c55cb2149098044c3a254cd6d0a8d22f8af18'],
]) {
  const result = await fetch(`http://img.e-hanja.kr/hanjaSvg/aniSVG/libs/${name}`)
  if (!result.ok) throw new Error(`Animation dependency HTTP ${result.status}`)
  const bytes = Buffer.from(await result.arrayBuffer())
  if (createHash('sha256').update(bytes).digest('hex') !== hash) throw new Error(`Animation dependency changed: ${name}`)
  assets.set(`/libs/${name}`, [bytes, type])
  console.log(name, bytes.length, createHash('sha256').update(bytes).digest('hex'))
}
const local = new Map([['/', ['review.html', 'text/html; charset=utf-8']], ['/review.html', ['review.html', 'text/html; charset=utf-8']], ['/candidate-paths.json', ['candidate-paths.json', 'application/json']]])
const server = createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname
  const asset = assets.get(path)
  if (asset) { res.writeHead(200, { 'Content-Type': asset[1], 'Cache-Control': 'no-store' }); res.end(asset[0]); return }
  const file = local.get(path)
  if (!file) { res.writeHead(404); res.end(); return }
  try { res.writeHead(200, { 'Content-Type': file[1], 'Cache-Control': 'no-store' }); res.end(await readFile(new URL(file[0], import.meta.url))) }
  catch { res.writeHead(500); res.end() }
})
server.listen(0, '127.0.0.1', () => console.log(`Review: http://127.0.0.1:${server.address().port}/`))
