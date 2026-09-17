/** Offline checks and live runtime counts; prints artifacts for native writes. */
import assert from 'node:assert/strict'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES} from '../../lib/hanja-stroke-dictionary-g2-geometry-batch25.ts'
import {buildG2GeometryBatch25DictionaryBundle,validateG2GeometryBatch25DictionaryBundle} from '../../scripts/hanja-stroke-dictionary-g2-geometry-batch25.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const hash=b=>createHash('sha256').update(b).digest('hex')
const originals=read('originals.json'),sources=read('source-checks.json'),observations=read('observations.json'),corrections=read('corrections.json')
const prepared=JSON.parse(execFileSync(process.execPath,[fileURLToPath(new URL('prepare.mjs',import.meta.url))],{encoding:'utf8',maxBuffer:3000000}))
assert.deepEqual(read('candidate-paths.json'),prepared.candidate)
assert.deepEqual(read('review.json'),prepared.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch25.json'),prepared.runtime)
assert.deepEqual(buildG2GeometryBatch25DictionaryBundle(),prepared.runtime)
validateG2GeometryBatch25DictionaryBundle()
assert.deepEqual(originals.entries.map(e=>[e.glyph,e.strokes,e.catalogStrokes,e.dictionaryStrokes]),[['澔',15,15,15],['嬅',14,14,14],['壎',17,17,17]])
assert.equal(typeof corrections.method,'string')
assert.equal(corrections.edits.length,46)
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
const expectedContacts=[["澔",1,2,false],["澔",1,3,false],["澔",1,4,false],["澔",1,5,false],["澔",1,6,false],["澔",1,7,false],["澔",1,8,false],["澔",1,9,false],["澔",1,10,false],["澔",1,11,false],["澔",1,12,false],["澔",1,13,false],["澔",1,14,false],["澔",1,15,false],["澔",2,3,false],["澔",2,4,false],["澔",2,5,false],["澔",2,6,false],["澔",2,7,false],["澔",2,8,false],["澔",2,9,false],["澔",2,10,false],["澔",2,11,false],["澔",2,12,false],["澔",2,13,false],["澔",2,14,false],["澔",2,15,false],["澔",3,4,false],["澔",3,5,false],["澔",3,6,false],["澔",3,7,false],["澔",3,8,false],["澔",3,9,false],["澔",3,10,false],["澔",3,11,false],["澔",3,12,false],["澔",3,13,false],["澔",3,14,false],["澔",3,15,false],["澔",4,5,false],["澔",4,6,true],["澔",4,7,false],["澔",4,8,false],["澔",4,9,false],["澔",4,10,false],["澔",4,11,false],["澔",4,12,false],["澔",4,13,false],["澔",4,14,false],["澔",4,15,false],["澔",5,6,true],["澔",5,7,true],["澔",5,8,true],["澔",5,9,false],["澔",5,10,false],["澔",5,11,false],["澔",5,12,false],["澔",5,13,false],["澔",5,14,false],["澔",5,15,false],["澔",6,7,true],["澔",6,8,true],["澔",6,9,false],["澔",6,10,false],["澔",6,11,false],["澔",6,12,false],["澔",6,13,false],["澔",6,14,false],["澔",6,15,false],["澔",7,8,false],["澔",7,9,false],["澔",7,10,false],["澔",7,11,false],["澔",7,12,false],["澔",7,13,false],["澔",7,14,false],["澔",7,15,false],["澔",8,9,false],["澔",8,10,false],["澔",8,11,false],["澔",8,12,false],["澔",8,13,false],["澔",8,14,false],["澔",8,15,false],["澔",9,10,true],["澔",9,11,false],["澔",9,12,false],["澔",9,13,false],["澔",9,14,false],["澔",9,15,false],["澔",10,11,true],["澔",10,12,false],["澔",10,13,false],["澔",10,14,false],["澔",10,15,false],["澔",11,12,true],["澔",11,13,false],["澔",11,14,false],["澔",11,15,false],["澔",12,13,false],["澔",12,14,false],["澔",12,15,false],["澔",13,14,true],["澔",13,15,true],["澔",14,15,true],["嬅",1,2,true],["嬅",1,3,true],["嬅",1,4,false],["嬅",1,5,false],["嬅",1,6,false],["嬅",1,7,false],["嬅",1,8,false],["嬅",1,9,false],["嬅",1,10,false],["嬅",1,11,false],["嬅",1,12,false],["嬅",1,13,true],["嬅",1,14,false],["嬅",2,3,true],["嬅",2,4,false],["嬅",2,5,false],["嬅",2,6,false],["嬅",2,7,false],["嬅",2,8,false],["嬅",2,9,false],["嬅",2,10,false],["嬅",2,11,false],["嬅",2,12,false],["嬅",2,13,false],["嬅",2,14,false],["嬅",3,4,false],["嬅",3,5,false],["嬅",3,6,false],["嬅",3,7,false],["嬅",3,8,false],["嬅",3,9,false],["嬅",3,10,false],["嬅",3,11,false],["嬅",3,12,false],["嬅",3,13,false],["嬅",3,14,false],["嬅",4,5,true],["嬅",4,6,false],["嬅",4,7,false],["嬅",4,8,false],["嬅",4,9,false],["嬅",4,10,false],["嬅",4,11,false],["嬅",4,12,false],["嬅",4,13,false],["嬅",4,14,false],["嬅",5,6,false],["嬅",5,7,false],["嬅",5,8,false],["嬅",5,9,false],["嬅",5,10,false],["嬅",5,11,false],["嬅",5,12,false],["嬅",5,13,false],["嬅",5,14,false],["嬅",6,7,true],["嬅",6,8,false],["嬅",6,9,false],["嬅",6,10,false],["嬅",6,11,false],["嬅",6,12,false],["嬅",6,13,false],["嬅",6,14,false],["嬅",7,8,false],["嬅",7,9,false],["嬅",7,10,false],["嬅",7,11,false],["嬅",7,12,false],["嬅",7,13,false],["嬅",7,14,false],["嬅",8,9,false],["嬅",8,10,true],["嬅",8,11,true],["嬅",8,12,false],["嬅",8,13,false],["嬅",8,14,true],["嬅",9,10,true],["嬅",9,11,true],["嬅",9,12,false],["嬅",9,13,false],["嬅",9,14,true],["嬅",10,11,false],["嬅",10,12,true],["嬅",10,13,false],["嬅",10,14,false],["嬅",11,12,true],["嬅",11,13,false],["嬅",11,14,false],["嬅",12,13,false],["嬅",12,14,true],["嬅",13,14,true],["壎",1,2,true],["壎",1,3,false],["壎",1,4,false],["壎",1,5,false],["壎",1,6,false],["壎",1,7,false],["壎",1,8,false],["壎",1,9,false],["壎",1,10,false],["壎",1,11,false],["壎",1,12,false],["壎",1,13,false],["壎",1,14,false],["壎",1,15,false],["壎",1,16,false],["壎",1,17,false],["壎",2,3,true],["壎",2,4,false],["壎",2,5,false],["壎",2,6,false],["壎",2,7,false],["壎",2,8,false],["壎",2,9,false],["壎",2,10,false],["壎",2,11,false],["壎",2,12,false],["壎",2,13,false],["壎",2,14,false],["壎",2,15,false],["壎",2,16,false],["壎",2,17,false],["壎",3,4,false],["壎",3,5,false],["壎",3,6,false],["壎",3,7,false],["壎",3,8,false],["壎",3,9,false],["壎",3,10,false],["壎",3,11,false],["壎",3,12,false],["壎",3,13,false],["壎",3,14,false],["壎",3,15,false],["壎",3,16,false],["壎",3,17,false],["壎",4,5,false],["壎",4,6,false],["壎",4,7,false],["壎",4,8,false],["壎",4,9,false],["壎",4,10,false],["壎",4,11,false],["壎",4,12,true],["壎",4,13,false],["壎",4,14,false],["壎",4,15,false],["壎",4,16,false],["壎",4,17,false],["壎",5,6,false],["壎",5,7,false],["壎",5,8,false],["壎",5,9,false],["壎",5,10,false],["壎",5,11,false],["壎",5,12,true],["壎",5,13,false],["壎",5,14,false],["壎",5,15,false],["壎",5,16,false],["壎",5,17,false],["壎",6,7,true],["壎",6,8,false],["壎",6,9,false],["壎",6,10,true],["壎",6,11,false],["壎",6,12,false],["壎",6,13,false],["壎",6,14,false],["壎",6,15,false],["壎",6,16,false],["壎",6,17,false],["壎",7,8,false],["壎",7,9,false],["壎",7,10,true],["壎",7,11,false],["壎",7,12,true],["壎",7,13,false],["壎",7,14,false],["壎",7,15,false],["壎",7,16,false],["壎",7,17,false],["壎",8,9,false],["壎",8,10,false],["壎",8,11,false],["壎",8,12,false],["壎",8,13,false],["壎",8,14,false],["壎",8,15,false],["壎",8,16,false],["壎",8,17,false],["壎",9,10,false],["壎",9,11,false],["壎",9,12,false],["壎",9,13,false],["壎",9,14,false],["壎",9,15,false],["壎",9,16,false],["壎",9,17,false],["壎",10,11,false],["壎",10,12,true],["壎",10,13,false],["壎",10,14,false],["壎",10,15,false],["壎",10,16,false],["壎",10,17,false],["壎",11,12,true],["壎",11,13,false],["壎",11,14,false],["壎",11,15,false],["壎",11,16,false],["壎",11,17,false],["壎",12,13,true],["壎",12,14,false],["壎",12,15,false],["壎",12,16,false],["壎",12,17,false],["壎",13,14,false],["壎",13,15,false],["壎",13,16,false],["壎",13,17,false],["壎",14,15,false],["壎",14,16,false],["壎",14,17,false],["壎",15,16,false],["壎",15,17,false],["壎",16,17,false]]
for(const[glyph,one,two,touching]of expectedContacts){
 const contact=sources.entries.find(e=>e.glyph===glyph).contactChecks.find(c=>c.strokes[0]===one && c.strokes[1]===two)
 assert.equal(contact.sourceArtworkSaved,false)
 if(touching)assert.equal(contact.sourceBoundaryGapUnits,0)
 else assert.ok(contact.sourceBoundaryGapUnits>0)
}
const expectedProgressions=[{"glyph":"澔","stroke":1,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":2,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":3,"segments":[{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":4,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":5,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":6,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":7,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":8,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":9,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":10,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":11,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":12,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":13,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":14,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"澔","stroke":15,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":1,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":2,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":3,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":4,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":5,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":6,"segments":[{"command":"L","x":"right","screenY":"same"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":7,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":8,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":9,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":10,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":11,"segments":[{"command":"L","x":"same","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":12,"segments":[{"command":"L","x":"right","screenY":"same"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":13,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"嬅","stroke":14,"segments":[{"command":"L","x":"same","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":1,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":2,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":3,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":4,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":5,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":6,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":7,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":8,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":9,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":10,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":11,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":12,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":13,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":14,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":15,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":16,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"壎","stroke":17,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false}]
for(const {glyph,...expected} of expectedProgressions){
 assert.deepEqual(sources.entries.find(e=>e.glyph===glyph).pathProgressionChecks.find(c=>c.stroke===expected.stroke),expected)
}
const catalogDir=new URL('../../content/hanja/characters/',import.meta.url)
const characters=readdirSync(catalogDir).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(new URL(f,catalogDir),'utf8')).characters)
const byGlyph=new Map(characters.map(c=>[c.glyph,c]))
assert.equal(byGlyph.size,characters.length)
assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
const previous=read('../hanja-g2-geometry-batch24-2026-09-17/progress.json')
const summarize=list=>{
 const applied=list.filter(c=>hanjaStrokeData(c))
 return {total:list.length,applied:applied.length,remaining:list.length-applied.length,percent:+(100*applied.length/list.length).toFixed(1),
 totalStrokes:list.reduce((n,c)=>n+c.strokes,0),appliedStrokes:applied.reduce((n,c)=>n+c.strokes,0)}
}
const queues=Object.fromEntries(Object.entries(previous.remainingGrade2Queues).map(([key,q])=>{
 const glyphs=q.glyphs.filter(g=>!hanjaStrokeData(byGlyph.get(g)))
 return [key,{characters:glyphs.length,strokes:glyphs.reduce((n,g)=>n+byGlyph.get(g).strokes,0),glyphs}]
}))
assert.equal(queues.wholeStrokeReview.characters,0)
assert.equal(queues.geometryNeeded.characters,previous.remainingGrade2Queues.geometryNeeded.characters-3)
const queued=Object.values(queues).flatMap(q=>q.glyphs)
assert.equal(new Set(queued).size,queued.length)
assert.deepEqual([...queued].sort(),characters.filter(c=>c.readingGrade==='2급'&&!hanjaStrokeData(c)).map(c=>c.glyph).sort())
assert.equal(queues.geometryCountReview.characters,0)
assert.equal(queues.geometryCountReview.strokes,0)
assert.equal(queues.geometryNeeded.characters,0)
assert.equal(queues.sourceCountReview.characters,4)
const nextGlyphs=characters.filter(c=>c.readingGrade==='1급'&&!hanjaStrokeData(c)).map(c=>c.glyph)
const nextStrokes=nextGlyphs.reduce((n,g)=>n+byGlyph.get(g).strokes,0)
const nextBatch={schemaVersion:1,title:'1급 미적용 '+nextGlyphs.length+'자 출처·획수 조사',readingGrade:'1급',characters:nextGlyphs.length,strokes:nextStrokes,
 source:'Current runtime and catalog inventory queue only. Grade 1 source availability and counts require a fresh audit.',glyphs:nextGlyphs,
 requiredReview:['Refresh the pinned licensed corpora and check whole-glyph and compatibility-glyph availability for every pending grade 1 character.',
 'Acquire actual domestic dictionary detail/animation references and classify matching counts, count differences and missing sources.',
 'Select a bounded first review group from the inventory; source availability or component reuse never grants runtime approval.',
 'Preserve the four held grade 2 characters until their recorded whole-glyph evidence requirements are met.'],
 sourceCountHeld:read('../hanja-g2-yu-2026-09-16/next-batch.json').sourceCountHeld.map(e=>({...e,review:e.glyph==='庾'?'../hanja-g2-yu-2026-09-16/review.json':e.review})),
 runtimeApprovalsAdded:0}
const progress={date:'2026-09-17',batch:{sourceAudited:3,reviewedStrokes:46,applied:3,appliedStrokes:46,held:0,authoredOrCorrectedPaths:46},
 overall:summarize(characters),byGrade:previous.byGrade.map(({grade})=>({grade,...summarize(characters.filter(c=>c.readingGrade===grade))})),
 remainingGrade2Queues:queues,sourceCountReviewStatus:previous.sourceCountReviewStatus,
 next:{task:nextBatch.title,readingGrade:'1급',characters:nextGlyphs.length,strokes:nextStrokes}}
assert.equal(progress.overall.total,previous.overall.total)
assert.equal(progress.overall.totalStrokes,previous.overall.totalStrokes)
assert.equal(progress.overall.applied,previous.overall.applied+3)
assert.equal(progress.overall.appliedStrokes,previous.overall.appliedStrokes+46)
for(const entry of HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES){
 const c=byGlyph.get(entry.glyph)
 assert.equal(c.readingGrade,'2급');assert.equal(c.strokes,entry.paths.length);assert.deepEqual(hanjaStrokeData(c),entry)
}
const proofFiles=['compose.ts','acquire.mjs','serve.py','prepare.mjs','verify.mjs','initial-observations.json','originals.json','source-checks.json','observations.json','corrections.json','proposals.json','candidate-paths.json','review.json']
const proofPins=Object.fromEntries(proofFiles.map(f=>[f,hash(readFileSync(new URL(f,import.meta.url)))]))
assert.ok(!readdirSync(new URL('./',import.meta.url)).some(f=>/\.(svg|xml|png|jpe?g|gif|webp|html)$/i.test(f)))
if(!process.argv.includes('--derive')){
 assert.deepEqual(read('progress.json'),progress);assert.deepEqual(read('next-batch.json'),nextBatch)
 assert.deepEqual(read('checks.json').proofPins,proofPins)
}
console.log(JSON.stringify({verification:'passed',reconstructionAndPublicationValid:true,allFortySixStagesObserved:true,catalogUnchanged:true,
 proprietaryAssetsSaved:0,proofPins,progress,nextBatch},null,2))
