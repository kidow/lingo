/** Read-only candidate discovery. Presence/count agreement is not approval. */
import {readFileSync, readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'

const revision = '422b5538595676da918c288a4230cb5e22a1ee7e'
const root = new URL('../../content/hanja/characters/', import.meta.url)
const all = readdirSync(root).filter(f => f.endsWith('.json')).flatMap(f => JSON.parse(readFileSync(new URL(f, root))).characters)
const missing = all.filter(c => !hanjaStrokeData(c))
const response = await fetch(`https://api.github.com/repos/KanjiVG/kanjivg/git/trees/${revision}?recursive=1`)
if (!response.ok) throw Error(`Tree HTTP ${response.status}`)
const tree = await response.json()
if (tree.truncated) throw Error('Incomplete source inventory')
const tasks = missing.flatMap(character => {
  const prefix = 'kanji/' + character.glyph.codePointAt(0).toString(16).padStart(5, '0')
  return tree.tree.filter(f => f.path.endsWith('.svg') && (f.path === prefix+'.svg' || f.path.startsWith(prefix+'-')))
    .map(file => ({glyph:character.glyph,grade:character.readingGrade,catalogStrokes:character.strokes,file}))
})
const entries = []
let cursor = 0
await Promise.all(Array.from({length:4}, async () => {
  while (cursor < tasks.length) {
    const task = tasks[cursor++]
    const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/${revision}/${task.file.path}`
    try {
      const response = await fetch(url, {signal:AbortSignal.timeout(20000)})
      if (!response.ok) throw Error(`HTTP ${response.status}`)
      const bytes = Buffer.from(await response.arrayBuffer())
      const strokes = [...bytes.toString().matchAll(/<path\b[^>]*\bid="kvg:[^"]+-s\d+"/g)].length
      entries.push({glyph:task.glyph,grade:task.grade,catalogStrokes:task.catalogStrokes,path:task.file.path,
        strokes,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),url})
    } catch (error) {
      entries.push({glyph:task.glyph,path:task.file.path,error:String(error)})
    }
  }
}))
entries.sort((a,b) => tasks.findIndex(t=>t.file.path===a.path)-tasks.findIndex(t=>t.file.path===b.path))
const matches = entries.filter(e => e.strokes && e.strokes === e.catalogStrokes)
const limit = Number(process.argv.find(a => a.startsWith('--limit='))?.split('=')[1] ?? matches.length)
console.log(JSON.stringify({revision,treeTruncated:false,missing:missing.length,
  matchedCharacters:new Set(tasks.map(t=>t.glyph)).size,sourceFiles:entries.length,
  errors:entries.filter(e=>e.error),catalogCountMatchedCharacters:new Set(matches.map(e=>e.glyph)).size,
  catalogCountMatchedFiles:matches.length,
  classification:'Candidates only; domestic order, direction and full-form review still required.',
  candidates:matches.slice(0,limit)},null,2))
