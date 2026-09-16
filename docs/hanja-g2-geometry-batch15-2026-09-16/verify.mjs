/** Offline checks and live runtime counts; prints artifacts for native writes. */
import assert from 'node:assert/strict'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES} from '../../lib/hanja-stroke-dictionary-g2-geometry-batch15.ts'
import {buildG2GeometryBatch15DictionaryBundle,validateG2GeometryBatch15DictionaryBundle} from '../../scripts/hanja-stroke-dictionary-g2-geometry-batch15.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const hash=b=>createHash('sha256').update(b).digest('hex')
const originals=read('originals.json'),sources=read('source-checks.json'),observations=read('observations.json'),corrections=read('corrections.json')
const prepared=JSON.parse(execFileSync(process.execPath,[fileURLToPath(new URL('prepare.mjs',import.meta.url))],{encoding:'utf8',maxBuffer:3000000}))
assert.deepEqual(read('candidate-paths.json'),prepared.candidate)
assert.deepEqual(read('review.json'),prepared.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch15.json'),prepared.runtime)
assert.deepEqual(buildG2GeometryBatch15DictionaryBundle(),prepared.runtime)
validateG2GeometryBatch15DictionaryBundle()
assert.deepEqual(originals.entries.map(e=>[e.glyph,e.strokes,e.catalogStrokes,e.dictionaryStrokes]),[['湜',12,12,12],['珣',10,10,10],['瑢',14,14,14]])
assert.equal(typeof corrections.basis,'string')
assert.equal(corrections.edits.length,36)
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
const expectedContacts=[["湜",1,2,false],["湜",1,3,false],["湜",1,4,false],["湜",1,5,false],["湜",1,6,false],["湜",1,7,false],["湜",1,8,false],["湜",1,9,false],["湜",1,10,false],["湜",1,11,false],["湜",1,12,false],["湜",2,3,false],["湜",2,4,false],["湜",2,5,false],["湜",2,6,false],["湜",2,7,false],["湜",2,8,false],["湜",2,9,false],["湜",2,10,false],["湜",2,11,false],["湜",2,12,false],["湜",3,4,false],["湜",3,5,false],["湜",3,6,false],["湜",3,7,false],["湜",3,8,false],["湜",3,9,false],["湜",3,10,false],["湜",3,11,false],["湜",3,12,false],["湜",4,5,true],["湜",4,6,true],["湜",4,7,true],["湜",4,8,false],["湜",4,9,false],["湜",4,10,false],["湜",4,11,false],["湜",4,12,false],["湜",5,6,true],["湜",5,7,true],["湜",5,8,false],["湜",5,9,false],["湜",5,10,false],["湜",5,11,false],["湜",5,12,false],["湜",6,7,false],["湜",6,8,false],["湜",6,9,false],["湜",6,10,false],["湜",6,11,false],["湜",6,12,false],["湜",7,8,false],["湜",7,9,false],["湜",7,10,false],["湜",7,11,false],["湜",7,12,false],["湜",8,9,true],["湜",8,10,false],["湜",8,11,false],["湜",8,12,false],["湜",9,10,true],["湜",9,11,false],["湜",9,12,true],["湜",10,11,false],["湜",10,12,false],["湜",11,12,true],["珣",1,2,false],["珣",1,3,true],["珣",1,4,false],["珣",1,5,false],["珣",1,6,false],["珣",1,7,false],["珣",1,8,false],["珣",1,9,false],["珣",1,10,false],["珣",2,3,true],["珣",2,4,false],["珣",2,5,false],["珣",2,6,false],["珣",2,7,false],["珣",2,8,false],["珣",2,9,false],["珣",2,10,false],["珣",3,4,true],["珣",3,5,false],["珣",3,6,false],["珣",3,7,false],["珣",3,8,false],["珣",3,9,false],["珣",3,10,false],["珣",4,5,false],["珣",4,6,false],["珣",4,7,false],["珣",4,8,false],["珣",4,9,false],["珣",4,10,false],["珣",5,6,true],["珣",5,7,false],["珣",5,8,false],["珣",5,9,false],["珣",5,10,false],["珣",6,7,false],["珣",6,8,false],["珣",6,9,false],["珣",6,10,false],["珣",7,8,true],["珣",7,9,true],["珣",7,10,true],["珣",8,9,true],["珣",8,10,true],["珣",9,10,false],["瑢",1,2,false],["瑢",1,3,true],["瑢",1,4,false],["瑢",1,5,false],["瑢",1,6,false],["瑢",1,7,false],["瑢",1,8,false],["瑢",1,9,false],["瑢",1,10,false],["瑢",1,11,false],["瑢",1,12,false],["瑢",1,13,false],["瑢",1,14,false],["瑢",2,3,true],["瑢",2,4,false],["瑢",2,5,false],["瑢",2,6,false],["瑢",2,7,false],["瑢",2,8,false],["瑢",2,9,false],["瑢",2,10,false],["瑢",2,11,false],["瑢",2,12,false],["瑢",2,13,false],["瑢",2,14,false],["瑢",3,4,true],["瑢",3,5,false],["瑢",3,6,false],["瑢",3,7,false],["瑢",3,8,false],["瑢",3,9,false],["瑢",3,10,false],["瑢",3,11,false],["瑢",3,12,false],["瑢",3,13,false],["瑢",3,14,false],["瑢",4,5,false],["瑢",4,6,false],["瑢",4,7,false],["瑢",4,8,false],["瑢",4,9,false],["瑢",4,10,false],["瑢",4,11,false],["瑢",4,12,false],["瑢",4,13,false],["瑢",4,14,false],["瑢",5,6,false],["瑢",5,7,true],["瑢",5,8,false],["瑢",5,9,false],["瑢",5,10,false],["瑢",5,11,false],["瑢",5,12,false],["瑢",5,13,false],["瑢",5,14,false],["瑢",6,7,true],["瑢",6,8,false],["瑢",6,9,false],["瑢",6,10,false],["瑢",6,11,false],["瑢",6,12,false],["瑢",6,13,false],["瑢",6,14,false],["瑢",7,8,false],["瑢",7,9,false],["瑢",7,10,false],["瑢",7,11,false],["瑢",7,12,false],["瑢",7,13,false],["瑢",7,14,false],["瑢",8,9,false],["瑢",8,10,false],["瑢",8,11,false],["瑢",8,12,false],["瑢",8,13,false],["瑢",8,14,false],["瑢",9,10,false],["瑢",9,11,false],["瑢",9,12,false],["瑢",9,13,false],["瑢",9,14,false],["瑢",10,11,true],["瑢",10,12,true],["瑢",10,13,false],["瑢",10,14,false],["瑢",11,12,false],["瑢",11,13,false],["瑢",11,14,false],["瑢",12,13,true],["瑢",12,14,true],["瑢",13,14,true]]
for(const[glyph,one,two,touching]of expectedContacts){
 const contact=sources.entries.find(e=>e.glyph===glyph).contactChecks.find(c=>c.strokes[0]===one && c.strokes[1]===two)
 assert.equal(contact.sourceArtworkSaved,false)
 if(touching)assert.equal(contact.sourceBoundaryGapUnits,0)
 else assert.ok(contact.sourceBoundaryGapUnits>0)
}
const expectedProgressions=[{"glyph":"湜","stroke":1,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"湜","stroke":2,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"湜","stroke":3,"segments":[{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"same"},{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"湜","stroke":4,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"湜","stroke":5,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"湜","stroke":6,"segments":[{"command":"L","x":"right","screenY":"same"}],"sourceArtworkSaved":false},{"glyph":"湜","stroke":7,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"湜","stroke":8,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"湜","stroke":9,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"湜","stroke":10,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"湜","stroke":11,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"湜","stroke":12,"segments":[{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"珣","stroke":1,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"珣","stroke":2,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"珣","stroke":3,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"珣","stroke":4,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"珣","stroke":5,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"珣","stroke":6,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"珣","stroke":7,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"珣","stroke":8,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"珣","stroke":9,"segments":[{"command":"L","x":"right","screenY":"same"}],"sourceArtworkSaved":false},{"glyph":"珣","stroke":10,"segments":[{"command":"L","x":"right","screenY":"same"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":1,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":2,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":3,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":4,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":5,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":6,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":7,"segments":[{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":8,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":9,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":10,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":11,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":12,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":13,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瑢","stroke":14,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false}]
for(const {glyph,...expected} of expectedProgressions){
 assert.deepEqual(sources.entries.find(e=>e.glyph===glyph).pathProgressionChecks.find(c=>c.stroke===expected.stroke),expected)
}
const catalogDir=new URL('../../content/hanja/characters/',import.meta.url)
const characters=readdirSync(catalogDir).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(new URL(f,catalogDir),'utf8')).characters)
const byGlyph=new Map(characters.map(c=>[c.glyph,c]))
assert.equal(byGlyph.size,characters.length)
assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
const previous=read('../hanja-g2-geometry-batch14-2026-09-16/progress.json')
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
assert.equal(queues.geometryNeeded.characters,previous.remainingGrade2Queues.geometryNeeded.characters)
const queued=Object.values(queues).flatMap(q=>q.glyphs)
assert.equal(new Set(queued).size,queued.length)
assert.deepEqual([...queued].sort(),characters.filter(c=>c.readingGrade==='2급'&&!hanjaStrokeData(c)).map(c=>c.glyph).sort())
assert.equal(queues.geometryCountReview.characters,1)
assert.equal(queues.geometryCountReview.strokes,byGlyph.get('珽').strokes)
const objects=j=>j.rows.map(r=>Object.fromEntries(j.fields.map((f,i)=>[f,r[i]])))
const inventory=objects(read('../hanja-g2-inventory-2026-09-15/inventory.json'))
const dictionary=objects(read('../hanja-g2-inventory-2026-09-15/dictionary-inventory.json'))
const nextGlyphs=queues.geometryCountReview.glyphs.slice(0,1)
assert.deepEqual(nextGlyphs,['珽'])
const coverage=read('../hanja-g2-geometry-batch14-2026-09-16/alternate-coverage.json')
const nextEntries=nextGlyphs.map(g=>{
 const c=byGlyph.get(g),i=inventory.find(e=>e.glyph===g),d=dictionary.find(e=>e.glyph===g)
 assert.equal(c.strokes,d.displayedStrokes);assert.equal(c.strokes,d.animatedCount)
 return {glyph:g,strokes:c.strokes,dictionaryStrokes:d.animatedCount,
 licensedCounts:{ZhHans:coverage.corpora.find(c=>c.file==='graphicsZhHans.txt').entries.find(e=>e.glyph===g).strokes},
 dictionaryUrl:d.svgUrl,dictionarySha256:d.svgSha256}
})
const nextStrokes=nextEntries.reduce((n,e)=>n+e.strokes,0)
const nextBatch={schemaVersion:1,title:'珽 '+nextStrokes+'획·공개 경로 10획 차이 검토',characters:nextGlyphs.length,strokes:nextStrokes,
 source:'Prior inventory dated 2026-09-15; refresh required before review.',entries:nextEntries,
 requiredReview:['Refresh full dictionary sequences and licensed sources including compatibility glyphs.',
 'Locate the 10/11-stroke boundary difference between ZhHans and the Korean dictionary. Do not infer a split from stroke count alone.',
 'Review every path, direction, connection and cumulative stage before registration.'],
 sourceCountHeld:read('../hanja-g2-yu-2026-09-16/next-batch.json').sourceCountHeld.map(e=>({...e,review:e.glyph==='庾'?'../hanja-g2-yu-2026-09-16/review.json':e.review})),
 runtimeApprovalsAdded:0}
const progress={date:'2026-09-16',batch:{sourceAudited:3,reviewedStrokes:36,applied:3,appliedStrokes:36,held:0,authoredOrCorrectedPaths:36},
 overall:summarize(characters),byGrade:previous.byGrade.map(({grade})=>({grade,...summarize(characters.filter(c=>c.readingGrade===grade))})),
 remainingGrade2Queues:queues,sourceCountReviewStatus:previous.sourceCountReviewStatus,
 next:{task:nextBatch.title,characters:nextGlyphs.length,strokes:nextStrokes,glyphs:nextGlyphs}}
assert.equal(progress.overall.total,previous.overall.total)
assert.equal(progress.overall.totalStrokes,previous.overall.totalStrokes)
assert.equal(progress.overall.applied,previous.overall.applied+3)
assert.equal(progress.overall.appliedStrokes,previous.overall.appliedStrokes+36)
for(const entry of HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES){
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
console.log(JSON.stringify({verification:'passed',reconstructionAndPublicationValid:true,allThirtySixStagesObserved:true,catalogUnchanged:true,
 proprietaryAssetsSaved:0,proofPins,progress,nextBatch},null,2))
