/** Read-only source inventory. Persist metadata only, never publisher artwork or paths. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const sha = b => createHash('sha256').update(b).digest('hex')
const sources = []
async function get(url) {
  const response = await fetch(url)
  const bytes = Buffer.from(await response.arrayBuffer())
  sources.push({url, status:response.status, bytes:bytes.length, sha256:sha(bytes)})
  if (!response.ok) throw new Error(url + ': ' + response.status)
  return bytes.toString()
}
const repos = []
for (const [repo, revision] of [
  ['Connum/hanzivg', '55ecef6a881d5120cd261587d668e1b6af843ec2'],
  ['g0v/zh-stroke-data', '26f12d65063cc97d2773b7777232277bfca5f563'],
  ['chanind/hanzi-writer-data', '68d10a4b21150cae5e1ebbd223eed289cf32d90c'],
]) {
  const tree = JSON.parse(await get('https://api.github.com/repos/' + repo + '/git/trees/' + revision + '?recursive=1'))
  if (tree.truncated) throw new Error('Incomplete repository tree')
  repos.push({repo, revision, truncated:false, matches:tree.tree
    .filter(e => /9c49|5bac|40009|23468|鱉|宬/i.test(e.path))
    .map(e => ({path:e.path, blobSha1:e.sha, bytes:e.size}))})
}
const g0vBase = 'https://raw.githubusercontent.com/g0v/zh-stroke-data/' + repos[1].revision + '/'
const g0vReadme = await get(g0vBase + 'README.md')
const g0v = JSON.parse(await get(g0vBase + 'json/9c49.json'))
const writer = JSON.parse(await get('https://raw.githubusercontent.com/chanind/hanzi-writer-data/' + repos[2].revision + '/data/' + encodeURIComponent('鱉') + '.json'))
const original = JSON.parse(readFileSync(new URL('../hanja-special2-direction-review-2026-09-21/originals.json', import.meta.url)))
  .entries.find(e => e.glyph === '鱉')
const moe = await get('https://stroke-order.learningweb.moe.edu.tw/page.jsp?ID=28')
const cns = await get('https://www.cns11643.gov.tw/wordView.jsp?ID=142954')
const cnsOrder = cns.match(/<figure strokeOrder><figcaption>筆順序<\/figcaption>\s*([^<]+)<\/figure>/)?.[1].trim()
console.log(JSON.stringify({schemaVersion:1, researchedOn:'2026-09-21', repos, sources,
  findings:{g0v:{glyph:'鱉', strokes:g0v.length, trackCounts:g0v.map(s => s.track.length),
    dataExplicitlyExcludedFromBlanketCC0:g0vReadme.includes('除前述資料檔之外'),
    publisherNoncommercialNoDerivatives:moe.includes('Attribution-NonCommercial-NoDerivs'),
    runtimeEligible:false},
  hanziWriter:{glyph:'鱉', strokes:writer.strokes.length,
    sameMediansAsHeldCandidate:JSON.stringify(writer.medians) === JSON.stringify(original.medians)},
  cns:{glyph:'宬', strokes:10, strokeTypes:cnsOrder}},
  proprietaryAssetsSaved:0, runtimeApprovalsAdded:0}, null, 2))
