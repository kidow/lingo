/** Read-only generator: emit assets for review/native file writing, or verify them. */
import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const fontUrl = 'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/OTF/Korean/NotoSerifCJKkr-Regular.otf'
const fontSha = '77b4b741f864d27f15e90f275b17106dde90b2ad28f82bab72dc95805db5fb42'
const parserUrl = 'https://unpkg.com/opentype.js@1.3.4/dist/opentype.js'
const parserSha = 'aca3813e716a07e06c2e32c736d841508b15451cf39483f289acbd879c64d09f'
const licenseUrl = 'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/LICENSE'
const hash = (value) => createHash('sha256').update(value).digest('hex')
const id = (glyph) => `u${glyph.codePointAt(0).toString(16)}`
const number = (value) => String(Math.round(value * 1000000) / 1000000)

async function download(url, sha) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  if (sha && hash(bytes) !== sha) throw new Error(`Source changed: ${url}`)
  return bytes
}

export async function generateHanjaSvgAssets() {
  const folder = join(root, 'content/hanja/characters')
  const characters = (await Promise.all((await readdir(folder)).filter((file) => file.endsWith('.json')).sort()
    .map(async (file) => JSON.parse(await readFile(join(folder, file), 'utf8')).characters))).flat()
  const primary = new Set(characters.map((character) => character.glyph))
  const glyphs = [...new Set(characters.flatMap((character) => [character.glyph, ...character.radical, ...(character.example?.word ?? '')]))]
    .sort((a, b) => a.codePointAt(0) - b.codePointAt(0))
  const [fontBytes, parserBytes, licenseBytes] = await Promise.all([
    download(fontUrl, fontSha), download(parserUrl, parserSha), download(licenseUrl),
  ])
  const sandbox = { exports: {}, module: {}, console: { log() {}, warn() {}, error() {} } }
  sandbox.module.exports = sandbox.exports
  vm.createContext(sandbox)
  vm.runInContext(parserBytes.toString('utf8'), sandbox, { timeout: 10000 })
  const font = sandbox.exports.parse(fontBytes.buffer.slice(fontBytes.byteOffset, fontBytes.byteOffset + fontBytes.byteLength))
  const assets = {}
  const entries = {}
  for (const glyph of glyphs) {
    const outline = font.charToGlyph(glyph)
    if (!outline || outline.index === 0) throw new Error(`Missing glyph: ${glyph}`)
    const path = outline.getPath(0, 0, 1000)
    const box = path.getBoundingBox()
    if (!path.commands.length || ![box.x1, box.y1, box.x2, box.y2].every(Number.isFinite)) throw new Error(`Invalid outline: ${glyph}`)
    const width = box.x2 - box.x1, height = box.y2 - box.y1
    // Keep the font's relative glyph sizes, centering in a common em square.
    const scale = Math.min(1, 920 / width, 920 / height)
    const x = (1000 - width * scale) / 2 - box.x1 * scale
    const y = (1000 - height * scale) / 2 - box.y1 * scale
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><!-- Noto Serif CJK KR 2.003 outlines; SIL OFL 1.1. See OFL.txt and NOTICE.txt. --><g id="glyph" fill="currentColor" transform="translate(${number(x)} ${number(y)}) scale(${number(scale)})">${path.toSVG(3)}</g></svg>\n`
    assets[`public/hanja/${id(glyph)}.svg`] = svg
    entries[id(glyph)] = { glyph, sha256: hash(svg) }
  }
  assets['public/hanja/OFL.txt'] = licenseBytes.toString('utf8')
  assets['public/hanja/NOTICE.txt'] = `Lingo Hanja outline assets\n\nSource: Noto Serif CJK KR Regular, Version 2.003\n${fontUrl}\nFont SHA-256: ${fontSha}\n\n${font.names.copyright?.en ?? ''}\n\nThese SVG outlines are derived from Noto Serif CJK KR and distributed under the SIL Open Font License 1.1. See OFL.txt.\nThe font's outlines are preserved; SVG coordinates are centered and fitted to an em square.\nThese assets are not an official Korean Hanja examination typeface or stroke-order dataset.\nThe original font name identifies the source, not a new font released by Lingo.\n\nConverter: OpenType.js 1.3.4 (MIT), used during generation only; not bundled in the app.\n${parserUrl}\nParser SHA-256: ${parserSha}\n`
  assets['public/hanja/manifest.json'] = `${JSON.stringify({
    version: 1, font: { name: 'Noto Serif CJK KR Regular', version: '2.003', url: fontUrl, sha256: fontSha },
    parser: { version: '1.3.4', url: parserUrl, sha256: parserSha },
    license: { name: 'SIL Open Font License 1.1', url: licenseUrl, sha256: hash(licenseBytes) },
    primaryCount: primary.size, supplementalCount: glyphs.length - primary.size, glyphs: entries,
  }, null, 2)}\n`
  return assets
}

if (typeof process !== 'undefined' && process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const assets = await generateHanjaSvgAssets()
  if (process.argv.includes('--verify')) {
    for (const [file, expected] of Object.entries(assets)) {
      if (await readFile(join(root, file), 'utf8') !== expected) throw new Error(`Asset differs: ${file}`)
    }
    console.log(`Verified ${Object.keys(assets).length - 3} SVG assets against pinned font and parser.`)
  } else {
    // The caller writes the returned files; this generator never mutates the workspace.
    console.log(JSON.stringify(assets))
  }
}
