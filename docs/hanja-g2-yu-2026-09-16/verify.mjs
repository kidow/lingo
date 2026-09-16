/** Read-only source and runtime checks; 庾 remains an unregistered candidate. */
import assert from 'node:assert/strict'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {normalizeMedians} from '../../lib/hanja-stroke-geometry.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const hash=b=>createHash('sha256').update(b).digest('hex')
const originals=read('originals.json'),sources=read('source-checks.json'),observations=read('observations.json'),review=read('review.json'),next=read('next-batch.json')
assert.equal(originals.sources.MM.sha256,'a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee')
assert.equal(originals.sources.Ja.sha256,'2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8')
assert.equal(originals.sources.Ko.sha256,'7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e')
assert.equal(originals.entries.length,1)
const candidate=originals.entries[0]
assert.equal(candidate.glyph,'庾');assert.equal(candidate.corpus,'MM')
assert.equal(candidate.strokes,11);assert.equal(candidate.catalogStrokes,11);assert.equal(candidate.dictionaryStrokes,12)
assert.equal(candidate.paths.length,11);assert.equal(candidate.medians.length,11)
assert.deepEqual(candidate.paths,normalizeMedians(candidate.medians))
assert.equal(candidate.originalMediansSha256,hash(JSON.stringify(candidate.medians)))
assert.equal(candidate.svg.animated,12);assert.equal(candidate.svg.outlines,12)
assert.ok(candidate.svg.timingSequenceValid && candidate.svg.clipCoverageValid)
assert.deepEqual(sources.dictionary.dictionary,candidate.dictionary)
assert.equal(sources.dictionary.strokes.length,12)
assert.deepEqual(sources.dictionary.strokes.map(s=>s.xmlIndex),[10,11,12,1,2,3,4,5,6,7,8,9])
assert.ok(sources.dictionary.strokes.every((s,n,a)=>s.duration>0 && (n===0 || s.delay>a[n-1].delay)))
assert.equal(sources.dictionary.displayedStrokes,12);assert.equal(sources.dictionary.animatedStrokes,12)
assert.equal(sources.moe.unicode,'庾');assert.equal(sources.moe.strokes,11)
assert.equal(sources.moe.embeddedXmlSha256,'a6564fbd9a0e44c59348357562946a1c2ff4adf33d714d987736a286c569029e')
assert.deepEqual(sources.moe.directionChecks.map(r=>[r.stroke,r.result]),[[6,'left-to-right'],[8,'left-to-right']])
assert.equal(sources.moe.referenceOnly,true)
assert.equal(sources.official.wholeTargetOrder,false);assert.equal(sources.official.wholeTargetCountExplicit,false)
assert.equal(sources.conclusion.wholeTargetOrderVerifiedAgainstMoe,true)
assert.equal(sources.conclusion.koreanWholeTargetOrderVerified,false)
assert.deepEqual(sources.candidateSearch.licensedAvailability,originals.availability)
assert.equal(hash(readFileSync(new URL('../../'+sources.staticForm.path,import.meta.url))),sources.staticForm.sha256)
assert.deepEqual(observations.rows.map(r=>r.candidateStroke),Array.from({length:11},(_,n)=>n+1))
assert.deepEqual(observations.rows.map(r=>r.moeStroke),Array.from({length:11},(_,n)=>n+1))
assert.deepEqual(observations.rows.map(r=>r.dictionaryStroke),[1,2,3,4,5,6,8,9,null,11,12])
assert.ok(observations.rows.every(r=>r.direction && r.finding && r.status==='observed-unapproved-candidate'))
assert.equal(observations.rows.filter(r=>r.dictionaryDirectionCorrespondence).length,9)
assert.deepEqual(observations.boundary.dictionaryStrokes,[7,10])
assert.equal(observations.boundary.automaticMergeApplied,false)
assert.equal(observations.formDifference.correctionApplied,false)
assert.equal(observations.coverage.candidatePathsInspected,11)
assert.equal(observations.coverage.moeCumulativeStagesInspected,11)
assert.equal(observations.coverage.dictionaryCumulativeStagesInspected,12)
assert.equal(review.status,'held-korean-whole-target-order')
assert.equal(review.approved,false);assert.equal(review.runtimeApprovalsAdded,0)
assert.equal(review.catalogChanged,false);assert.equal(review.geometryChanged,false)
const catalogDir=new URL('../../content/hanja/characters/',import.meta.url)
const chars=readdirSync(catalogDir).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(new URL(f,catalogDir),'utf8')).characters)
const byGlyph=new Map(chars.map(c=>[c.glyph,c]))
assert.equal(byGlyph.size,chars.length);assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
assert.equal(byGlyph.get('庾').strokes,11);assert.equal(byGlyph.get('庾').readingGrade,'2급')
assert.equal(hanjaStrokeData(byGlyph.get('庾')),null)
assert.ok(!HANJA_STROKES.some(e=>e.glyph==='庾'))
const previous=read('../hanja-g2-yu-zhen-2026-09-16/progress.json')
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
assert.deepEqual([...queued].sort(),chars.filter(c=>c.readingGrade==='2급'&&!hanjaStrokeData(c)).map(c=>c.glyph).sort())
const inventory=read('../hanja-g2-inventory-2026-09-15/inventory.json')
const dictionaryInventory=read('../hanja-g2-inventory-2026-09-15/dictionary-inventory.json')
const asObjects=j=>j.rows.map(row=>Object.fromEntries(j.fields.map((f,i)=>[f,row[i]])))
for(const entry of next.entries){
 const c=byGlyph.get(entry.glyph),geometry=asObjects(inventory).find(r=>r.glyph===entry.glyph),d=asObjects(dictionaryInventory).find(r=>r.glyph===entry.glyph)
 assert.equal(c.strokes,entry.strokes);assert.equal(c.readingGrade,'2급');assert.equal(hanjaStrokeData(c),null)
 assert.ok(queues.geometryCountReview.glyphs.includes(entry.glyph))
 assert.equal(d.displayedStrokes,entry.dictionaryStrokes);assert.equal(d.animatedCount,entry.dictionaryStrokes)
 assert.equal(d.svgUrl,entry.dictionaryUrl);assert.equal(d.svgSha256,entry.dictionarySha256)
 for(const [corpus,count] of Object.entries(entry.licensedCounts))assert.equal(geometry[corpus+'Strokes'],count)
}
assert.equal(next.characters,next.entries.length);assert.equal(next.strokes,next.entries.reduce((n,e)=>n+e.strokes,0))
assert.deepEqual(next.entries.map(e=>e.glyph),['葛','儆','菓'])
assert.equal(next.strokes,40)
const sourceCountReviewStatus={reviewedHeld:{characters:4,strokes:49,glyphs:['飼','祐','庾','禎']},awaitingFocusedReview:{characters:0,strokes:0,glyphs:[]}}
assert.deepEqual(sourceCountReviewStatus.reviewedHeld.glyphs,queues.sourceCountReview.glyphs)
const progress={date:'2026-09-16',
 batch:{sourceAudited:1,targetStrokes:11,candidatePathsInspected:11,moeWholeGlyphStagesInspected:11,dictionaryStagesInspected:12,koreanWholeTargetOrderVerified:0,applied:0,appliedStrokes:0,held:1},
 overall:summarize(chars),byGrade:previous.byGrade.map(({grade})=>({grade,...summarize(chars.filter(c=>c.readingGrade===grade))})),
 remainingGrade2Queues:queues,sourceCountReviewStatus,
 next:{task:next.title,characters:3,strokes:40,glyphs:['葛','儆','菓']}
}
assert.deepEqual(progress.overall,previous.overall);assert.deepEqual(progress.byGrade,previous.byGrade)
assert.deepEqual(progress.remainingGrade2Queues,previous.remainingGrade2Queues)
const proofFiles=['acquire.mjs','serve.py','originals.json','source-checks.json','observations.json','review.json','next-batch.json','verify.mjs']
const proofPins=Object.fromEntries(proofFiles.map(f=>[f,hash(readFileSync(new URL(f,import.meta.url)))]))
assert.ok(!readdirSync(new URL('./',import.meta.url)).some(f=>/\.(svg|xml|png|jpe?g|gif|webp|html)$/i.test(f)))
if(!process.argv.includes('--derive')){
 assert.deepEqual(read('progress.json'),progress)
 assert.deepEqual(read('checks.json').proofPins,proofPins)
}
console.log(JSON.stringify({verification:'passed',candidateNormalizationValid:true,sourceMetadataAndCoverageValid:true,heldGlyphAbsentFromRuntime:true,
 nextBatchMatchesInventory:true,catalogAndCoverageUnchanged:true,proprietaryAssetsSaved:0,proofPins,progress},null,2))
