/** Read-only source refresh; proprietary artwork remains in RAM. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { parseCandidates, CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE } from '../../scripts/hanja-stroke-audit.ts'
import { svgMetadata } from '../hanja-g2-inventory-2026-09-15/dictionary-audit.mjs'
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
export async function acquire() {
  const targets = [['祐',10,9],['禎',14,13]]
  const sources = {}, candidates = {}, availability = []
  for (const [id,pin] of Object.entries({Ko:CANDIDATE_SOURCE,Ja:JAPANESE_CANDIDATE_SOURCE,MM:MAKE_ME_A_HANZI_SOURCE})) {
    const response = await fetch(pin.url, {signal:AbortSignal.timeout(45000)})
    assert.equal(response.status, 200)
    const bytes = Buffer.from(await response.arrayBuffer())
    candidates[id] = parseCandidates(bytes,pin)
    sources[id] = {...pin,bytes:bytes.length}
    for (const [glyph] of targets) availability.push({corpus:id,glyph,
      entries:candidates[id].filter(c=>c.character.normalize('NFKC')===glyph).map(c=>({glyph:c.character,strokes:c.medians.length}))})
  }
  const targetCandidates = targets.map(([glyph,catalogStrokes]) => {
    const c=candidates.Ja.find(c=>c.character!==glyph && c.character.normalize('NFKC')===glyph && c.medians.length===catalogStrokes)
    assert.ok(c,'Target-form compatibility candidate required')
    return {glyph,sourceGlyph:c.character,strokes:catalogStrokes,corpus:'Ja',medians:c.medians,
      originalMediansSha256:hash(JSON.stringify(c.medians)),paths:normalizeMedians(c.medians),approved:false}
  })
  const entries = []
  for (const [glyph,catalogStrokes,expected] of targets) {
    const candidate = candidates.Ja.find(c=>c.character===glyph)
    assert.equal(candidate.medians.length,expected)
    const detailUrl = 'http://www.e-hanja.kr/e-hanja/dic/contents/jajun_contentA.asp'
    const d = await fetch(detailUrl,{method:'POST',body:new URLSearchParams({
      qry:'',snd:'',hanja:glyph,pageNo:'',keyfield:'',keyword:glyph,hanjaGrade:'',backUrl:''
    }),signal:AbortSignal.timeout(20000)})
    assert.equal(d.status,200)
    const db=Buffer.from(await d.arrayBuffer()),dt=db.toString('utf8')
    const iframe=[...dt.matchAll(/<iframe\b[^>]*>/g)].map(m=>m[0]).find(s=>s.includes('aniSVG'))
    assert.ok(iframe,'Actual dictionary animation iframe required')
    const url=new URL(iframe.match(/src=["']([^"']+)["']/)[1],detailUrl).href
    const s=await fetch(url,{signal:AbortSignal.timeout(20000)})
    assert.equal(s.status,200)
    const sb=Buffer.from(await s.arrayBuffer()),svg=svgMetadata(sb.toString())
    assert.equal(svg.title,glyph)
    assert.equal(svg.animated,expected)
    assert.equal(svg.outlines,expected)
    assert.ok(svg.timingSequenceValid && svg.clipCoverageValid)
    const displayedStrokes=Number(dt.match(/title=["']\s*(\d+)획 열람\s*["']/)?.[1])
    assert.equal(displayedStrokes,expected)
    entries.push({glyph,strokes:expected,catalogStrokes,dictionaryStrokes:expected,corpus:'Ja',
      medians:candidate.medians,originalMediansSha256:hash(JSON.stringify(candidate.medians)),paths:normalizeMedians(candidate.medians),
      dictionary:{url,bytes:sb.length,sha256:hash(sb)},detail:{url:detailUrl,bytes:db.length,sha256:hash(db),status:d.status,displayedStrokes},
      svg:{...svg,status:s.status}})
  }
  return {schemaVersion:1,date:'2026-09-16',purpose:'Unapproved nine/thirteen-stroke variants; target forms require ten/fourteen-stroke review.',
    sources,availability,entries,targetCandidates,characters:2,strokes:22,catalogStrokes:24,dictionaryStrokes:22,proprietaryAssetsSaved:0,runtimeApprovalsAdded:0}
}
if(process.argv[1] && fileURLToPath(import.meta.url)===process.argv[1]) console.log(JSON.stringify(await acquire()))
