/** Read-only, loopback source comparison. Remote artwork remains in memory. */
import { createServer } from 'node:http'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

const sources = JSON.parse(await readFile(new URL('sources.json', import.meta.url)))
const assets = new Map()
for (const asset of sources.assets) {
  const response = await fetch(asset.url, { signal: AbortSignal.timeout(30000) })
  if (!response.ok) throw new Error(`${asset.id}: HTTP ${response.status}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.length !== asset.bytes || createHash('sha256').update(bytes).digest('hex') !== asset.sha256) {
    throw new Error(`${asset.id}: source changed; review it again`)
  }
  assets.set(`/${asset.id}`, [bytes, asset.type])
  console.log(`${asset.id}: ${bytes.length} bytes, hash verified`)
}
const glyph = await readFile(new URL('../../public/hanja/u9077.svg', import.meta.url))
if (createHash('sha256').update(glyph).digest('hex') !== '5305c4cb5d9410e3b239556112ed1b44753b4b5f70179a1f566026637dba3ac0') {
  throw new Error('Static app glyph changed')
}
assets.set('/app-glyph.svg', [glyph, 'image/svg+xml'])
const html = await readFile(new URL('review.html', import.meta.url))
assets.set('/', [html, 'text/html; charset=utf-8'])
const server = createServer((req, res) => {
  const asset = assets.get(new URL(req.url, 'http://localhost').pathname)
  if (!asset) { res.writeHead(404); res.end(); return }
  const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range ?? '')
  if (range) {
    const start = Number(range[1]), end = Math.min(Number(range[2] || asset[0].length - 1), asset[0].length - 1)
    if (start > end || start >= asset[0].length) { res.writeHead(416); res.end(); return }
    res.writeHead(206, { 'Content-Type': asset[1], 'Cache-Control': 'no-store', 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${asset[0].length}`, 'Content-Length': end - start + 1 })
    res.end(asset[0].subarray(start, end + 1)); return
  }
  res.writeHead(200, { 'Content-Type': asset[1], 'Cache-Control': 'no-store', 'Content-Length': asset[0].length, 'Accept-Ranges': 'bytes' })
  res.end(asset[0])
})
server.listen(0, '127.0.0.1', () => console.log(`Review: http://127.0.0.1:${server.address().port}/`))
