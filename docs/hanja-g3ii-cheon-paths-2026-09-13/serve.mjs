import { createServer } from 'node:http'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { buildCandidate } from './candidate.mjs'
const prior = JSON.parse(await readFile(new URL('../hanja-g3ii-cheon-2026-09-13/sources.json', import.meta.url)))
const assets = new Map()
for (const [id, path] of [['moya-sequence', '/sequence'], ['moya-numbered', '/numbered']]) {
  const entry = prior.assets.find(row => row.id === id), response = await fetch(entry.url, { signal: AbortSignal.timeout(30000) })
  if (!response.ok) throw new Error(`${id}: HTTP ${response.status}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.length !== entry.bytes || createHash('sha256').update(bytes).digest('hex') !== entry.sha256) throw new Error(`${id}: source changed`)
  assets.set(path, [bytes, 'image/jpeg'])
}
const server = createServer(async (req, res) => {
  try {
    const path = new URL(req.url, 'http://localhost').pathname
    const asset = path === '/' ? [await readFile(new URL('review.html', import.meta.url)), 'text/html; charset=utf-8']
      : path === '/candidate' ? [Buffer.from(JSON.stringify(await buildCandidate())), 'application/json'] : assets.get(path)
    if (!asset) { res.writeHead(404); res.end(); return }
    res.writeHead(200, { 'Content-Type': asset[1], 'Cache-Control': 'no-store' }); res.end(asset[0])
  } catch { res.writeHead(500); res.end() }
})
server.listen(0, '127.0.0.1', () => console.log(`Review: http://127.0.0.1:${server.address().port}/`))
