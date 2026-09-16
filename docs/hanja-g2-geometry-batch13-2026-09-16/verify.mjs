/** Offline checks and live runtime counts; prints artifacts for native writes. */
import assert from 'node:assert/strict'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES} from '../../lib/hanja-stroke-dictionary-g2-geometry-batch13.ts'
import {buildG2GeometryBatch13DictionaryBundle,validateG2GeometryBatch13DictionaryBundle} from '../../scripts/hanja-stroke-dictionary-g2-geometry-batch13.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const hash=b=>createHash('sha256').update(b).digest('hex')
const originals=read('originals.json'),sources=read('source-checks.json'),observations=read('observations.json'),corrections=read('corrections.json')
const prepared=JSON.parse(execFileSync(process.execPath,[fileURLToPath(new URL('prepare.mjs',import.meta.url))],{encoding:'utf8',maxBuffer:3000000}))
assert.deepEqual(read('candidate-paths.json'),prepared.candidate)
assert.deepEqual(read('review.json'),prepared.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch13.json'),prepared.runtime)
assert.deepEqual(buildG2GeometryBatch13DictionaryBundle(),prepared.runtime)
validateG2GeometryBatch13DictionaryBundle()
assert.deepEqual(originals.entries.map(e=>[e.glyph,e.strokes,e.catalogStrokes,e.dictionaryStrokes]),[['薰',17,18,18],['姬',10,9,9]])
assert.equal(typeof corrections.basis,'string')
assert.equal(corrections.edits.length,27)
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
const expectedContacts=[["薰",1,2,true],["薰",1,3,false],["薰",1,4,false],["薰",1,5,false],["薰",1,6,false],["薰",1,7,false],["薰",1,8,false],["薰",1,9,false],["薰",1,10,false],["薰",1,11,false],["薰",1,12,false],["薰",1,13,false],["薰",1,14,false],["薰",1,15,false],["薰",1,16,false],["薰",1,17,false],["薰",1,18,false],["薰",2,3,false],["薰",2,4,false],["薰",2,5,false],["薰",2,6,false],["薰",2,7,false],["薰",2,8,false],["薰",2,9,false],["薰",2,10,false],["薰",2,11,false],["薰",2,12,false],["薰",2,13,false],["薰",2,14,false],["薰",2,15,false],["薰",2,16,false],["薰",2,17,false],["薰",2,18,false],["薰",3,4,true],["薰",3,5,false],["薰",3,6,false],["薰",3,7,false],["薰",3,8,false],["薰",3,9,false],["薰",3,10,false],["薰",3,11,false],["薰",3,12,false],["薰",3,13,false],["薰",3,14,false],["薰",3,15,false],["薰",3,16,false],["薰",3,17,false],["薰",3,18,false],["薰",4,5,true],["薰",4,6,false],["薰",4,7,false],["薰",4,8,false],["薰",4,9,false],["薰",4,10,false],["薰",4,11,false],["薰",4,12,false],["薰",4,13,false],["薰",4,14,false],["薰",4,15,false],["薰",4,16,false],["薰",4,17,false],["薰",4,18,false],["薰",5,6,false],["薰",5,7,false],["薰",5,8,false],["薰",5,9,false],["薰",5,10,false],["薰",5,11,false],["薰",5,12,false],["薰",5,13,true],["薰",5,14,false],["薰",5,15,false],["薰",5,16,false],["薰",5,17,false],["薰",5,18,false],["薰",6,7,false],["薰",6,8,false],["薰",6,9,false],["薰",6,10,false],["薰",6,11,false],["薰",6,12,false],["薰",6,13,true],["薰",6,14,false],["薰",6,15,false],["薰",6,16,false],["薰",6,17,false],["薰",6,18,false],["薰",7,8,true],["薰",7,9,false],["薰",7,10,false],["薰",7,11,true],["薰",7,12,false],["薰",7,13,false],["薰",7,14,false],["薰",7,15,false],["薰",7,16,false],["薰",7,17,false],["薰",7,18,false],["薰",8,9,false],["薰",8,10,false],["薰",8,11,true],["薰",8,12,false],["薰",8,13,true],["薰",8,14,false],["薰",8,15,false],["薰",8,16,false],["薰",8,17,false],["薰",8,18,false],["薰",9,10,false],["薰",9,11,true],["薰",9,12,false],["薰",9,13,false],["薰",9,14,false],["薰",9,15,false],["薰",9,16,false],["薰",9,17,false],["薰",9,18,false],["薰",10,11,true],["薰",10,12,false],["薰",10,13,false],["薰",10,14,false],["薰",10,15,false],["薰",10,16,false],["薰",10,17,false],["薰",10,18,false],["薰",11,12,false],["薰",11,13,true],["薰",11,14,false],["薰",11,15,false],["薰",11,16,false],["薰",11,17,false],["薰",11,18,false],["薰",12,13,true],["薰",12,14,false],["薰",12,15,false],["薰",12,16,false],["薰",12,17,false],["薰",12,18,false],["薰",13,14,true],["薰",13,15,false],["薰",13,16,false],["薰",13,17,false],["薰",13,18,false],["薰",14,15,false],["薰",14,16,false],["薰",14,17,false],["薰",14,18,false],["薰",15,16,false],["薰",15,17,false],["薰",15,18,false],["薰",16,17,false],["薰",16,18,false],["薰",17,18,false],["姬",1,2,true],["姬",1,3,true],["姬",1,4,false],["姬",1,5,false],["姬",1,6,false],["姬",1,7,false],["姬",1,8,false],["姬",1,9,false],["姬",2,3,true],["姬",2,4,false],["姬",2,5,false],["姬",2,6,false],["姬",2,7,false],["姬",2,8,false],["姬",2,9,false],["姬",3,4,false],["姬",3,5,false],["姬",3,6,false],["姬",3,7,false],["姬",3,8,false],["姬",3,9,false],["姬",4,5,false],["姬",4,6,true],["姬",4,7,false],["姬",4,8,false],["姬",4,9,true],["姬",5,6,false],["姬",5,7,false],["姬",5,8,false],["姬",5,9,false],["姬",6,7,true],["姬",6,8,false],["姬",6,9,false],["姬",7,8,true],["姬",7,9,false],["姬",8,9,true]]
for(const[glyph,one,two,touching]of expectedContacts){
 const contact=sources.entries.find(e=>e.glyph===glyph).contactChecks.find(c=>c.strokes[0]===one && c.strokes[1]===two)
 assert.equal(contact.sourceArtworkSaved,false)
 if(touching)assert.equal(contact.sourceBoundaryGapUnits,0)
 else assert.ok(contact.sourceBoundaryGapUnits>0)
}
const expectedProgressions=[{"glyph":"薰","stroke":1,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":2,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":3,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":4,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":5,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":6,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":7,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":8,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"same","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":9,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":10,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":11,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":12,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":13,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":14,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":15,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":16,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":17,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"薰","stroke":18,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"姬","stroke":1,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"right","screenY":"same"},{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"姬","stroke":2,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"姬","stroke":3,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"姬","stroke":4,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"姬","stroke":5,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"姬","stroke":6,"segments":[{"command":"L","x":"same","screenY":"down"},{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"same","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"姬","stroke":7,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"姬","stroke":8,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"姬","stroke":9,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false}]
for(const {glyph,...expected} of expectedProgressions){
 assert.deepEqual(sources.entries.find(e=>e.glyph===glyph).pathProgressionChecks.find(c=>c.stroke===expected.stroke),expected)
}
const catalogDir=new URL('../../content/hanja/characters/',import.meta.url)
const characters=readdirSync(catalogDir).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(new URL(f,catalogDir),'utf8')).characters)
const byGlyph=new Map(characters.map(c=>[c.glyph,c]))
assert.equal(byGlyph.size,characters.length)
assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
const previous=read('../hanja-g2-geometry-batch12-2026-09-16/progress.json')
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
assert.equal(queues.geometryCountReview.characters,previous.remainingGrade2Queues.geometryCountReview.characters-2)
assert.equal(queues.geometryCountReview.strokes,previous.remainingGrade2Queues.geometryCountReview.strokes-27)
const objects=j=>j.rows.map(r=>Object.fromEntries(j.fields.map((f,i)=>[f,r[i]])))
const inventory=objects(read('../hanja-g2-inventory-2026-09-15/inventory.json'))
const dictionary=objects(read('../hanja-g2-inventory-2026-09-15/dictionary-inventory.json'))
assert.equal(queues.geometryCountReview.characters,0)
const nextGlyphs=queues.geometryNeeded.glyphs.slice(0,3)
assert.deepEqual(nextGlyphs,['塏','璟','琯'])
const nextEntries=nextGlyphs.map(g=>{
 const c=byGlyph.get(g),i=inventory.find(e=>e.glyph===g),d=dictionary.find(e=>e.glyph===g)
 assert.equal(c.strokes,d.displayedStrokes);assert.equal(c.strokes,d.animatedCount)
 return {glyph:g,strokes:c.strokes,dictionaryStrokes:d.animatedCount,
 licensedCounts:Object.fromEntries(['Ko','Ja','MM'].filter(k=>Number.isInteger(i[k+'Strokes'])).map(k=>[k,i[k+'Strokes']])),
 dictionaryUrl:d.svgUrl,dictionarySha256:d.svgSha256}
})
const nextStrokes=nextEntries.reduce((n,e)=>n+e.strokes,0)
const nextBatch={schemaVersion:1,title:'塏·璟·琯 3자·'+nextStrokes+'획 대체 경로 확보·검토',characters:nextGlyphs.length,strokes:nextStrokes,
 source:'Prior inventory dated 2026-09-15; refresh required before review.',entries:nextEntries,
 requiredReview:['Refresh full dictionary sequences and licensed sources including compatibility glyphs.',
 'Find licensed alternate geometry or document a component-based authored candidate; never auto-approve by radical reuse.',
 'Review every path, direction, connection and cumulative stage before registration.'],
 sourceCountHeld:read('../hanja-g2-yu-2026-09-16/next-batch.json').sourceCountHeld.map(e=>({...e,review:e.glyph==='庾'?'../hanja-g2-yu-2026-09-16/review.json':e.review})),
 runtimeApprovalsAdded:0}
const progress={date:'2026-09-16',batch:{sourceAudited:2,reviewedStrokes:27,applied:2,appliedStrokes:27,held:0,authoredOrCorrectedPaths:27},
 overall:summarize(characters),byGrade:previous.byGrade.map(({grade})=>({grade,...summarize(characters.filter(c=>c.readingGrade===grade))})),
 remainingGrade2Queues:queues,sourceCountReviewStatus:previous.sourceCountReviewStatus,
 next:{task:nextBatch.title,characters:nextGlyphs.length,strokes:nextStrokes,glyphs:nextGlyphs}}
assert.equal(progress.overall.total,previous.overall.total)
assert.equal(progress.overall.totalStrokes,previous.overall.totalStrokes)
assert.equal(progress.overall.applied,previous.overall.applied+2)
assert.equal(progress.overall.appliedStrokes,previous.overall.appliedStrokes+27)
for(const entry of HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES){
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
console.log(JSON.stringify({verification:'passed',reconstructionAndPublicationValid:true,allTwentySevenStagesObserved:true,catalogUnchanged:true,
 proprietaryAssetsSaved:0,proofPins,progress,nextBatch},null,2))
