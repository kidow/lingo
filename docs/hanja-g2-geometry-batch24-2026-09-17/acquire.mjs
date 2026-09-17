/** Read-only source refresh; proprietary artwork remains in RAM. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { parseCandidates, CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE } from '../../scripts/hanja-stroke-audit.ts'
import { compose } from './compose.ts'
import { svgMetadata } from '../hanja-g2-inventory-2026-09-15/dictionary-audit.mjs'
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
export async function acquire() {
  const targets = [['埰',11,11,'Components'],['爀',18,18,'Components'],['瀅',18,18,'Components']]
  const sources = {}, candidates = {}, availability = []
  for (const [id,pin] of Object.entries({Ko:CANDIDATE_SOURCE,Ja:JAPANESE_CANDIDATE_SOURCE,MM:MAKE_ME_A_HANZI_SOURCE,...{"ZhHans":{"url":"https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsZhHans.txt","sha256":"5a5c157fddd0fd9bfaf5580b25c20a1ba2b0cabc0b7142e09f6149cbd5547798","license":"Arphic Public License; reviewed subset and license in public/hanja-strokes/"},"ZhHant":{"url":"https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsZhHant.txt","sha256":"731fe26345833745dc7d37c8213f3ca91585aa0ee18179c0ccda91be41ff6aec","license":"Arphic Public License; reviewed subset and license in public/hanja-strokes/"}}})) {
    const response = await fetch(pin.url, {signal:AbortSignal.timeout(45000)})
    assert.equal(response.status, 200)
    const bytes = Buffer.from(await response.arrayBuffer())
    candidates[id] = parseCandidates(bytes,pin)
    sources[id] = {...pin,bytes:bytes.length}
    for (const [glyph] of targets) availability.push({corpus:id,glyph,
      entries:candidates[id].filter(c=>c.character.normalize('NFKC')===glyph).map(c=>({glyph:c.character,strokes:c.medians.length}))})
  }
  const layouts = {
  "埰": [
    {
      "glyph": "土",
      "targetBox": [
        7,
        23,
        26,
        57
      ]
    },
    {
      "glyph": "采",
      "targetBox": [
        38,
        8,
        56,
        83
      ]
    }
  ],
  "爀": [
    {
      "glyph": "火",
      "targetBox": [
        6,
        15,
        24,
        77
      ]
    },
    {
      "glyph": "赤",
      "targetBox": [
        35,
        9,
        26,
        82
      ]
    },
    {
      "glyph": "赤",
      "targetBox": [
        67,
        9,
        27,
        82
      ]
    }
  ],
  "瀅": [
    {
      "glyph": "氵",
      "targetBox": [
        7,
        13,
        20,
        80
      ]
    },
    {
      "glyph": "火",
      "targetBox": [
        37,
        8,
        23,
        29
      ]
    },
    {
      "glyph": "火",
      "targetBox": [
        67,
        8,
        26,
        29
      ]
    },
    {
      "glyph": "冖",
      "targetBox": [
        33,
        44,
        61,
        14
      ]
    },
    {
      "glyph": "玉",
      "targetBox": [
        39,
        62,
        50,
        30
      ]
    }
  ]
}
  const componentSets = Object.fromEntries(Object.entries(layouts).map(([glyph,parts]) => [glyph,parts.map(part => {
    const source = candidates.MM.find(c => c.character === part.glyph)
    assert.ok(source, 'Licensed component missing: '+part.glyph)
    return {...part,corpus:'MM',sourceSha256:sources.MM.sha256,medians:source.medians,originalMediansSha256:hash(JSON.stringify(source.medians))}
  })]))
  candidates.Components = Object.entries(componentSets).map(([character,components]) => ({character,medians:compose(components)}))
  sources.Components = {url:'docs/hanja-g2-geometry-batch24-2026-09-17/originals.json#entries',
    sha256:hash(JSON.stringify(componentSets)),license:sources.MM.license,bytes:Buffer.byteLength(JSON.stringify(componentSets))}
  const entries = []
  for (const [glyph,catalogStrokes,expected,preferred] of targets) {
    const exact = ['Ko','Ja','MM','ZhHans','ZhHant'].flatMap(corpus=>candidates[corpus].filter(c=>c.character.normalize('NFKC')===glyph && c.medians.length===catalogStrokes).map(c=>({corpus,c})))
    const corpus = exact[0]?.corpus || preferred
    const candidate = exact[0]?.c || candidates[corpus].find(c=>c.character===glyph)
    assert.ok(candidate)
    const components = componentSets[glyph]
    const alternatives = ['Ko','Ja','MM','ZhHans','ZhHant'].flatMap(id=>candidates[id].filter(c=>c.character.normalize('NFKC')===glyph && !(id===corpus && c.character===candidate.character)).map(c=>({
      corpus:id,sourceGlyph:c.character,strokes:c.medians.length,medians:c.medians,paths:normalizeMedians(c.medians),originalMediansSha256:hash(JSON.stringify(c.medians))})))
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
    entries.push({glyph,strokes:candidate.medians.length,catalogStrokes,dictionaryStrokes:expected,corpus,sourceGlyph:candidate.character,alternatives,
      ...(corpus==='Components'?{components,componentsSha256:hash(JSON.stringify(components))}:{}),medians:candidate.medians,originalMediansSha256:hash(JSON.stringify(candidate.medians)),paths:normalizeMedians(candidate.medians),
      dictionary:{url,bytes:sb.length,sha256:hash(sb)},detail:{url:detailUrl,bytes:db.length,sha256:hash(db),status:d.status,displayedStrokes},
      svg:{...svg,status:s.status}})
  }
  return {schemaVersion:1,date:'2026-09-17',purpose:'Unapproved 埰 爀 瀅 alternate-corpus and component-based candidates and refreshed whole-glyph dictionary sources; review every boundary and direction before registration.',
    sources,availability,entries,characters:3,strokes:entries.reduce((n,e)=>n+e.strokes,0),catalogStrokes:47,dictionaryStrokes:47,proprietaryAssetsSaved:0,runtimeApprovalsAdded:0}
}
if(process.argv[1] && fileURLToPath(import.meta.url)===process.argv[1]) console.log(JSON.stringify(await acquire()))
