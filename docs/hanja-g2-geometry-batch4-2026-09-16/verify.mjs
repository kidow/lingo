/** Offline checks and live runtime counts; prints artifacts for native writes. */
import assert from 'node:assert/strict'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES} from '../../lib/hanja-stroke-dictionary-g2-geometry-batch4.ts'
import {buildG2GeometryBatch4DictionaryBundle,validateG2GeometryBatch4DictionaryBundle} from '../../scripts/hanja-stroke-dictionary-g2-geometry-batch4.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const hash=b=>createHash('sha256').update(b).digest('hex')
const originals=read('originals.json'),sources=read('source-checks.json'),observations=read('observations.json'),corrections=read('corrections.json')
const prepared=JSON.parse(execFileSync(process.execPath,[fileURLToPath(new URL('prepare.mjs',import.meta.url))],{encoding:'utf8',maxBuffer:3000000}))
assert.deepEqual(read('candidate-paths.json'),prepared.candidate)
assert.deepEqual(read('review.json'),prepared.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch4.json'),prepared.runtime)
assert.deepEqual(buildG2GeometryBatch4DictionaryBundle(),prepared.runtime)
validateG2GeometryBatch4DictionaryBundle()
assert.deepEqual(originals.entries.map(e=>[e.glyph,e.strokes,e.catalogStrokes,e.dictionaryStrokes]),[['蔑',14,15,15],['茅',8,9,9],['范',8,9,9]])
assert.equal(corrections.automaticRadicalApproval,false)
assert.equal(corrections.edits.length,26)
assert.equal(observations.automaticRadicalApproval,false)
assert.equal(sources.proprietaryAssetsSaved,0)
assert.deepEqual(sources.availability,originals.availability)
for(const e of originals.entries){
 const s=sources.entries.find(s=>s.glyph===e.glyph),o=observations.entries.find(o=>o.glyph===e.glyph)
 assert.equal(e.svg.animated,e.catalogStrokes);assert.equal(e.svg.outlines,e.catalogStrokes)
 assert.equal(e.detail.displayedStrokes,e.catalogStrokes)
 assert.ok(e.svg.timingSequenceValid && e.svg.clipCoverageValid)
 assert.equal(s.strokes.length,e.catalogStrokes)
 assert.deepEqual(s.strokes.map(r=>r.xmlIndex).sort((a,b)=>a-b),Array.from({length:e.catalogStrokes},(_,i)=>i+1))
 assert.ok(s.strokes.every((r,i,a)=>r.duration>0 && (i===0 || r.delay>=a[i-1].delay+a[i-1].duration)))
 assert.deepEqual(o.rows.map(r=>r.stroke),Array.from({length:e.catalogStrokes},(_,i)=>i+1))
 assert.ok(o.rows.every((r,i)=>r.dictionaryStage===i+1 && r.direction===o.directions[i] && r.finding && r.status==='match'))
 assert.equal(o.correctedReview.finalCumulativeFormChecked,true)
 assert.deepEqual(o.correctedReview.editedStrokes,corrections.edits.filter(c=>c.glyph===e.glyph).map(c=>c.stroke).sort((a,b)=>a-b))
}
const expectedContacts=[['蔑',9,15,false],['蔑',11,15,true],['茅',5,6,true],['茅',6,7,true],['茅',7,9,true],['茅',8,9,false]]
for(const[glyph,one,two,touching]of expectedContacts){
 const contact=sources.entries.find(e=>e.glyph===glyph).contactChecks.find(c=>c.strokes[0]===one && c.strokes[1]===two)
 assert.equal(contact.sourceArtworkSaved,false)
 if(touching)assert.equal(contact.sourceBoundaryGapUnits,0)
 else assert.ok(contact.sourceBoundaryGapUnits>0)
}
const catalogDir=new URL('../../content/hanja/characters/',import.meta.url)
const characters=readdirSync(catalogDir).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(new URL(f,catalogDir),'utf8')).characters)
const byGlyph=new Map(characters.map(c=>[c.glyph,c]))
assert.equal(byGlyph.size,characters.length)
assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
const previous=read('../hanja-g2-geometry-batch3-2026-09-16/progress.json')
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
assert.equal(queues.geometryCountReview.characters,previous.remainingGrade2Queues.geometryCountReview.characters-3)
assert.equal(queues.geometryCountReview.strokes,previous.remainingGrade2Queues.geometryCountReview.strokes-33)
const objects=j=>j.rows.map(r=>Object.fromEntries(j.fields.map((f,i)=>[f,r[i]])))
const inventory=objects(read('../hanja-g2-inventory-2026-09-15/inventory.json'))
const dictionary=objects(read('../hanja-g2-inventory-2026-09-15/dictionary-inventory.json'))
const nextGlyphs=queues.geometryCountReview.glyphs.slice(0,3)
assert.deepEqual(nextGlyphs,['縫','蓬','芬'])
const nextEntries=nextGlyphs.map(g=>{
 const c=byGlyph.get(g),i=inventory.find(e=>e.glyph===g),d=dictionary.find(e=>e.glyph===g)
 assert.equal(c.strokes,d.displayedStrokes);assert.equal(c.strokes,d.animatedCount)
 return {glyph:g,strokes:c.strokes,dictionaryStrokes:d.animatedCount,
 licensedCounts:Object.fromEntries(['Ko','Ja','MM'].filter(k=>Number.isInteger(i[k+'Strokes'])).map(k=>[k,i[k+'Strokes']])),
 dictionaryUrl:d.svgUrl,dictionarySha256:d.svgSha256}
})
const nextStrokes=nextEntries.reduce((n,e)=>n+e.strokes,0)
const nextBatch={schemaVersion:1,title:'縫·蓬·芬 3자·'+nextStrokes+'획 경로 획수 차이 검토',characters:3,strokes:nextStrokes,
 source:'Prior inventory dated 2026-09-15; refresh required before review.',entries:nextEntries,
 requiredReview:['Refresh full dictionary sequences and licensed sources including compatibility glyphs.',
 'Locate per-glyph boundary differences rather than splitting solely to match stroke counts.',
 'Review every path, direction, connection and cumulative stage before registration.'],
 sourceCountHeld:read('../hanja-g2-yu-2026-09-16/next-batch.json').sourceCountHeld.map(e=>({...e,review:e.glyph==='庾'?'../hanja-g2-yu-2026-09-16/review.json':e.review})),
 runtimeApprovalsAdded:0}
const progress={date:'2026-09-16',batch:{sourceAudited:3,reviewedStrokes:33,applied:3,appliedStrokes:33,held:0,authoredOrCorrectedPaths:26},
 overall:summarize(characters),byGrade:previous.byGrade.map(({grade})=>({grade,...summarize(characters.filter(c=>c.readingGrade===grade))})),
 remainingGrade2Queues:queues,sourceCountReviewStatus:previous.sourceCountReviewStatus,
 next:{task:nextBatch.title,characters:3,strokes:nextStrokes,glyphs:nextGlyphs}}
assert.equal(progress.overall.total,previous.overall.total)
assert.equal(progress.overall.totalStrokes,previous.overall.totalStrokes)
assert.equal(progress.overall.applied,previous.overall.applied+3)
assert.equal(progress.overall.appliedStrokes,previous.overall.appliedStrokes+33)
for(const entry of HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES){
 const c=byGlyph.get(entry.glyph)
 assert.equal(c.readingGrade,'2급');assert.equal(c.strokes,entry.paths.length);assert.deepEqual(hanjaStrokeData(c),entry)
}
const proofFiles=['acquire.mjs','serve.py','prepare.mjs','verify.mjs','initial-observations.json','originals.json','source-checks.json','observations.json','corrections.json','proposals.json','candidate-paths.json','review.json']
const proofPins=Object.fromEntries(proofFiles.map(f=>[f,hash(readFileSync(new URL(f,import.meta.url)))]))
assert.ok(!readdirSync(new URL('./',import.meta.url)).some(f=>/\.(svg|xml|png|jpe?g|gif|webp|html)$/i.test(f)))
if(!process.argv.includes('--derive')){
 assert.deepEqual(read('progress.json'),progress);assert.deepEqual(read('next-batch.json'),nextBatch)
 assert.deepEqual(read('checks.json').proofPins,proofPins)
}
console.log(JSON.stringify({verification:'passed',reconstructionAndPublicationValid:true,allThirtyThreeStagesObserved:true,catalogUnchanged:true,
 proprietaryAssetsSaved:0,proofPins,progress,nextBatch},null,2))
