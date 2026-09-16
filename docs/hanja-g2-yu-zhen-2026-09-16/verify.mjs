/** Read-only consistency checks; recovered target candidates stay unregistered. */
import assert from 'node:assert/strict'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {normalizeMedians} from '../../lib/hanja-stroke-geometry.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const hash=b=>createHash('sha256').update(b).digest('hex')
const originals=read('originals.json'),sources=read('source-checks.json'),observations=read('observations.json'),review=read('review.json')
assert.equal(originals.sources.Ja.sha256,'2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8')
assert.equal(originals.sources.Ko.sha256,'7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e')
assert.equal(originals.sources.MM.sha256,'a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee')
assert.equal(originals.entries.length,2)
assert.equal(originals.targetCandidates.length,2)
const targetNames=['祐','禎'],targetCounts=[10,14],shortCounts=[9,13],compat=['祐','禎']
for(let i=0;i<2;i++){
  const modern=originals.entries[i],target=originals.targetCandidates[i]
  assert.equal(modern.glyph,targetNames[i]);assert.equal(target.glyph,targetNames[i])
  assert.equal(target.sourceGlyph,compat[i]);assert.equal(target.sourceGlyph.normalize('NFKC'),target.glyph)
  assert.notEqual(target.sourceGlyph,target.glyph)
  assert.equal(target.strokes,targetCounts[i]);assert.equal(modern.catalogStrokes,targetCounts[i])
  assert.equal(modern.strokes,shortCounts[i]);assert.equal(modern.dictionaryStrokes,shortCounts[i])
  for(const e of [modern,target]){
    assert.equal(e.corpus,'Ja');assert.equal(e.paths.length,e.strokes);assert.equal(e.medians.length,e.strokes)
    assert.deepEqual(e.paths,normalizeMedians(e.medians));assert.equal(e.originalMediansSha256,hash(JSON.stringify(e.medians)))
  }
  assert.equal(target.approved,false)
  assert.equal(modern.svg.animated,shortCounts[i]);assert.equal(modern.svg.outlines,shortCounts[i])
  assert.ok(modern.svg.timingSequenceValid && modern.svg.clipCoverageValid)
  const d=sources.dictionary[i]
  assert.deepEqual(d.dictionary,modern.dictionary)
  assert.equal(d.strokes.length,shortCounts[i])
  assert.deepEqual([...d.strokes.map(s=>s.xmlIndex)].sort((a,b)=>a-b),Array.from({length:shortCounts[i]},(_,n)=>n+1))
  assert.ok(d.strokes.every((s,n,a)=>s.duration>0 && (n===0 || s.delay>a[n-1].delay)))
  assert.equal(sources.moe[i].strokes,shortCounts[i]);assert.equal(sources.moe[i].unicode,targetNames[i])
  assert.equal(sources.kanken[i].oldGlyph,compat[i]);assert.equal(sources.kanken[i].oldStrokes,targetCounts[i])
  const rows=observations.entries[i].rows
  assert.deepEqual(rows.map(r=>r.candidateStroke),Array.from({length:targetCounts[i]},(_,n)=>n+1))
  assert.ok(rows.every(r=>r.status==='observed-unapproved-candidate' && r.direction && r.finding))
  assert.equal(observations.entries[i].wholeTargetOrderVerified,false)
  assert.equal(review.entries[i].wholeTargetOrderVerified,false)
  const pin=sources.staticForms[i]
  assert.equal(hash(readFileSync(new URL('../../'+pin.path,import.meta.url))),pin.sha256)
}
assert.deepEqual(sources.candidateSearch.licensedAvailability,originals.availability)
assert.equal(sources.official.wholeTargetOrder,false)
assert.equal(sources.conclusion.wholeTargetOrderIndependentlyEstablished,false)
assert.equal(sources.conclusion.targetCandidatePaths,24)
assert.deepEqual(observations.rightOrderConflict.proposedCandidatePermutation,[1,2,3,4,5,7,6,8,9,10])
assert.equal(observations.rightOrderConflict.permutationApplied,false)
assert.deepEqual(observations.geometryFindings.pathsNeedingEndpointCorrection,[10,11])
assert.equal(observations.geometryFindings.correctionsApplied,0)
assert.equal(observations.coverage.targetPathsInspected,24)
assert.equal(observations.coverage.wholeTargetPathsApproved,0)
assert.equal(review.approved,false);assert.equal(review.runtimeApprovalsAdded,0);assert.equal(review.catalogChanged,false)
const catalogDir=new URL('../../content/hanja/characters/',import.meta.url)
const characters=readdirSync(catalogDir).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(new URL(f,catalogDir),'utf8')).characters)
const byGlyph=new Map(characters.map(c=>[c.glyph,c]))
assert.equal(byGlyph.size,characters.length)
assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
for(let i=0;i<2;i++){
  assert.equal(byGlyph.get(targetNames[i]).strokes,targetCounts[i])
  assert.equal(byGlyph.get(targetNames[i]).readingGrade,'2급')
  assert.equal(hanjaStrokeData(byGlyph.get(targetNames[i])),null)
  assert.ok(!HANJA_STROKES.some(e=>e.glyph===targetNames[i] || e.glyph===compat[i]))
}
const previous=read('../hanja-g2-si-2026-09-16/progress.json')
const summarize=list=>{
  const applied=list.filter(c=>hanjaStrokeData(c))
  return {total:list.length,applied:applied.length,remaining:list.length-applied.length,percent:+(100*applied.length/list.length).toFixed(1),
    totalStrokes:list.reduce((n,c)=>n+c.strokes,0),appliedStrokes:applied.reduce((n,c)=>n+c.strokes,0)}
}
const queues=Object.fromEntries(Object.entries(previous.remainingGrade2Queues).map(([key,q])=>{
  const glyphs=q.glyphs.filter(g=>!hanjaStrokeData(byGlyph.get(g)))
  return [key,{characters:glyphs.length,strokes:glyphs.reduce((n,g)=>n+byGlyph.get(g).strokes,0),glyphs}]
}))
const queued=Object.values(queues).flatMap(q=>q.glyphs)
assert.equal(new Set(queued).size,queued.length)
assert.deepEqual([...queued].sort(),characters.filter(c=>c.readingGrade==='2급'&&!hanjaStrokeData(c)).map(c=>c.glyph).sort())
const nextBatch={
  schemaVersion:1,title:'庾 1자·11획 획수 차이와 전체 필순 근거 검토',characters:1,strokes:11,
  strokeCountBasis:'Current catalog, not dictionary animation count',
  entries:read('../hanja-g2-batch10-2026-09-16/next-batch.json').entries.filter(e=>e.glyph==='庾').map(e=>({...e,status:'awaiting-target-form-and-whole-path-review'})),
  requiredReview:['Refresh catalog, dictionary and licensed source pins, including compatibility-glyph candidates.',
    'Resolve eleven/twelve-stroke boundary and form evidence using the full 庾 rather than a standalone component count.',
    'Review every target path and direction only after the target sequence is established.'],
  held:review.entries.map(e=>({glyph:e.glyph,strokes:e.strokes,status:e.status,review:'review.json'})),
  earlierHeld:[{glyph:'飼',strokes:14,review:'../hanja-g2-si-2026-09-16/review.json'}],
  runtimeApprovalsAdded:0
}
assert.equal(nextBatch.entries.length,1);assert.equal(nextBatch.entries[0].strokes,11)
const sourceCountReviewStatus={reviewedHeld:{characters:3,strokes:38,glyphs:['飼','祐','禎']},awaitingFocusedReview:{characters:1,strokes:11,glyphs:['庾']}}
assert.deepEqual([...sourceCountReviewStatus.reviewedHeld.glyphs,...sourceCountReviewStatus.awaitingFocusedReview.glyphs].sort(),[...queues.sourceCountReview.glyphs].sort())
const progress={
  date:'2026-09-16',batch:{sourceAudited:2,targetStrokes:24,targetCandidatesRecovered:2,targetPathsInspected:24,wholeTargetPathsSourceVerified:0,applied:0,appliedStrokes:0,held:2},
  overall:summarize(characters),byGrade:previous.byGrade.map(({grade})=>({grade,...summarize(characters.filter(c=>c.readingGrade===grade))})),
  remainingGrade2Queues:queues,sourceCountReviewStatus,
  next:{task:'Review 庾 eleven-stroke form and whole-glyph stroke evidence',characters:1,strokes:11,glyphs:['庾']}
}
assert.deepEqual(progress.overall,previous.overall);assert.deepEqual(progress.byGrade,previous.byGrade)
assert.deepEqual(progress.remainingGrade2Queues,previous.remainingGrade2Queues)
const proofFiles=['acquire.mjs','serve.py','originals.json','source-checks.json','observations.json','review.json','verify.mjs']
const proofPins=Object.fromEntries(proofFiles.map(f=>[f,hash(readFileSync(new URL(f,import.meta.url)))]))
assert.ok(!readdirSync(new URL('./',import.meta.url)).some(f=>/\.(svg|xml|png|jpe?g|gif|webp|html)$/i.test(f)))
if(!process.argv.includes('--derive')){
  assert.deepEqual(read('progress.json'),progress);assert.deepEqual(read('next-batch.json'),nextBatch);assert.deepEqual(read('checks.json').proofPins,proofPins)
}
console.log(JSON.stringify({verification:'passed',targetCandidateNormalizationValid:true,compatibilityGlyphsVerified:true,heldGlyphsAbsentFromRuntime:true,
  metadataAndObservationCoverageValid:true,catalogAndCoverageUnchanged:true,proprietaryAssetsSaved:0,proofPins,progress,nextBatch},null,2))
