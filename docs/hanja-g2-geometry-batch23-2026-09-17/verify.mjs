/** Offline checks and live runtime counts; prints artifacts for native writes. */
import assert from 'node:assert/strict'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {HANJA_DICTIONARY_G2_GEOMETRY_BATCH23_STROKES} from '../../lib/hanja-stroke-dictionary-g2-geometry-batch23.ts'
import {buildG2GeometryBatch23DictionaryBundle,validateG2GeometryBatch23DictionaryBundle} from '../../scripts/hanja-stroke-dictionary-g2-geometry-batch23.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const hash=b=>createHash('sha256').update(b).digest('hex')
const originals=read('originals.json'),sources=read('source-checks.json'),observations=read('observations.json'),corrections=read('corrections.json')
const prepared=JSON.parse(execFileSync(process.execPath,[fileURLToPath(new URL('prepare.mjs',import.meta.url))],{encoding:'utf8',maxBuffer:3000000}))
assert.deepEqual(read('candidate-paths.json'),prepared.candidate)
assert.deepEqual(read('review.json'),prepared.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch23.json'),prepared.runtime)
assert.deepEqual(buildG2GeometryBatch23DictionaryBundle(),prepared.runtime)
validateG2GeometryBatch23DictionaryBundle()
assert.deepEqual(originals.entries.map(e=>[e.glyph,e.strokes,e.catalogStrokes,e.dictionaryStrokes]),[['晙',11,11,11],['埈',10,10,10],['瓚',23,23,23]])
assert.equal(typeof corrections.method,'string')
assert.equal(corrections.edits.length,44)
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
const expectedContacts=[["晙",1,2,true],["晙",1,3,true],["晙",1,4,true],["晙",1,5,false],["晙",1,6,false],["晙",1,7,false],["晙",1,8,false],["晙",1,9,false],["晙",1,10,false],["晙",1,11,false],["晙",2,3,true],["晙",2,4,true],["晙",2,5,false],["晙",2,6,false],["晙",2,7,false],["晙",2,8,false],["晙",2,9,false],["晙",2,10,false],["晙",2,11,false],["晙",3,4,false],["晙",3,5,false],["晙",3,6,false],["晙",3,7,false],["晙",3,8,false],["晙",3,9,false],["晙",3,10,false],["晙",3,11,false],["晙",4,5,false],["晙",4,6,false],["晙",4,7,false],["晙",4,8,false],["晙",4,9,false],["晙",4,10,false],["晙",4,11,false],["晙",5,6,true],["晙",5,7,true],["晙",5,8,true],["晙",5,9,false],["晙",5,10,false],["晙",5,11,false],["晙",6,7,false],["晙",6,8,false],["晙",6,9,false],["晙",6,10,false],["晙",6,11,false],["晙",7,8,false],["晙",7,9,false],["晙",7,10,false],["晙",7,11,false],["晙",8,9,false],["晙",8,10,false],["晙",8,11,false],["晙",9,10,true],["晙",9,11,true],["晙",10,11,true],["埈",1,2,true],["埈",1,3,false],["埈",1,4,false],["埈",1,5,false],["埈",1,6,false],["埈",1,7,false],["埈",1,8,false],["埈",1,9,false],["埈",1,10,false],["埈",2,3,true],["埈",2,4,false],["埈",2,5,false],["埈",2,6,false],["埈",2,7,false],["埈",2,8,false],["埈",2,9,false],["埈",2,10,false],["埈",3,4,false],["埈",3,5,false],["埈",3,6,false],["埈",3,7,false],["埈",3,8,false],["埈",3,9,false],["埈",3,10,false],["埈",4,5,true],["埈",4,6,true],["埈",4,7,true],["埈",4,8,false],["埈",4,9,false],["埈",4,10,false],["埈",5,6,false],["埈",5,7,false],["埈",5,8,false],["埈",5,9,false],["埈",5,10,false],["埈",6,7,false],["埈",6,8,false],["埈",6,9,false],["埈",6,10,false],["埈",7,8,false],["埈",7,9,false],["埈",7,10,false],["埈",8,9,true],["埈",8,10,true],["埈",9,10,true],["瓚",1,2,false],["瓚",1,3,true],["瓚",1,4,false],["瓚",1,5,false],["瓚",1,6,false],["瓚",1,7,false],["瓚",1,8,false],["瓚",1,9,false],["瓚",1,10,false],["瓚",1,11,false],["瓚",1,12,false],["瓚",1,13,false],["瓚",1,14,false],["瓚",1,15,false],["瓚",1,16,false],["瓚",1,17,false],["瓚",1,18,false],["瓚",1,19,false],["瓚",1,20,false],["瓚",1,21,false],["瓚",1,22,false],["瓚",1,23,false],["瓚",2,3,true],["瓚",2,4,false],["瓚",2,5,false],["瓚",2,6,false],["瓚",2,7,false],["瓚",2,8,false],["瓚",2,9,false],["瓚",2,10,false],["瓚",2,11,false],["瓚",2,12,false],["瓚",2,13,false],["瓚",2,14,false],["瓚",2,15,false],["瓚",2,16,false],["瓚",2,17,false],["瓚",2,18,false],["瓚",2,19,false],["瓚",2,20,false],["瓚",2,21,false],["瓚",2,22,false],["瓚",2,23,false],["瓚",3,4,true],["瓚",3,5,false],["瓚",3,6,false],["瓚",3,7,false],["瓚",3,8,false],["瓚",3,9,false],["瓚",3,10,false],["瓚",3,11,false],["瓚",3,12,false],["瓚",3,13,false],["瓚",3,14,false],["瓚",3,15,false],["瓚",3,16,false],["瓚",3,17,false],["瓚",3,18,false],["瓚",3,19,false],["瓚",3,20,false],["瓚",3,21,false],["瓚",3,22,false],["瓚",3,23,false],["瓚",4,5,false],["瓚",4,6,false],["瓚",4,7,false],["瓚",4,8,false],["瓚",4,9,false],["瓚",4,10,false],["瓚",4,11,false],["瓚",4,12,false],["瓚",4,13,false],["瓚",4,14,false],["瓚",4,15,false],["瓚",4,16,false],["瓚",4,17,false],["瓚",4,18,false],["瓚",4,19,false],["瓚",4,20,false],["瓚",4,21,false],["瓚",4,22,false],["瓚",4,23,false],["瓚",5,6,true],["瓚",5,7,false],["瓚",5,8,false],["瓚",5,9,false],["瓚",5,10,false],["瓚",5,11,false],["瓚",5,12,false],["瓚",5,13,false],["瓚",5,14,false],["瓚",5,15,false],["瓚",5,16,false],["瓚",5,17,false],["瓚",5,18,false],["瓚",5,19,false],["瓚",5,20,false],["瓚",5,21,false],["瓚",5,22,false],["瓚",5,23,false],["瓚",6,7,true],["瓚",6,8,false],["瓚",6,9,false],["瓚",6,10,false],["瓚",6,11,false],["瓚",6,12,false],["瓚",6,13,false],["瓚",6,14,false],["瓚",6,15,false],["瓚",6,16,false],["瓚",6,17,false],["瓚",6,18,false],["瓚",6,19,false],["瓚",6,20,false],["瓚",6,21,false],["瓚",6,22,false],["瓚",6,23,false],["瓚",7,8,true],["瓚",7,9,false],["瓚",7,10,false],["瓚",7,11,false],["瓚",7,12,false],["瓚",7,13,false],["瓚",7,14,false],["瓚",7,15,false],["瓚",7,16,false],["瓚",7,17,false],["瓚",7,18,false],["瓚",7,19,false],["瓚",7,20,false],["瓚",7,21,false],["瓚",7,22,false],["瓚",7,23,false],["瓚",8,9,true],["瓚",8,10,true],["瓚",8,11,false],["瓚",8,12,false],["瓚",8,13,false],["瓚",8,14,false],["瓚",8,15,false],["瓚",8,16,false],["瓚",8,17,false],["瓚",8,18,false],["瓚",8,19,false],["瓚",8,20,false],["瓚",8,21,false],["瓚",8,22,false],["瓚",8,23,false],["瓚",9,10,false],["瓚",9,11,false],["瓚",9,12,false],["瓚",9,13,false],["瓚",9,14,false],["瓚",9,15,false],["瓚",9,16,false],["瓚",9,17,false],["瓚",9,18,false],["瓚",9,19,false],["瓚",9,20,false],["瓚",9,21,false],["瓚",9,22,false],["瓚",9,23,false],["瓚",10,11,false],["瓚",10,12,false],["瓚",10,13,false],["瓚",10,14,false],["瓚",10,15,false],["瓚",10,16,false],["瓚",10,17,false],["瓚",10,18,false],["瓚",10,19,false],["瓚",10,20,false],["瓚",10,21,false],["瓚",10,22,false],["瓚",10,23,false],["瓚",11,12,true],["瓚",11,13,false],["瓚",11,14,false],["瓚",11,15,false],["瓚",11,16,false],["瓚",11,17,false],["瓚",11,18,false],["瓚",11,19,false],["瓚",11,20,false],["瓚",11,21,false],["瓚",11,22,false],["瓚",11,23,false],["瓚",12,13,true],["瓚",12,14,false],["瓚",12,15,false],["瓚",12,16,false],["瓚",12,17,false],["瓚",12,18,false],["瓚",12,19,false],["瓚",12,20,false],["瓚",12,21,false],["瓚",12,22,false],["瓚",12,23,false],["瓚",13,14,true],["瓚",13,15,false],["瓚",13,16,false],["瓚",13,17,false],["瓚",13,18,false],["瓚",13,19,false],["瓚",13,20,false],["瓚",13,21,false],["瓚",13,22,false],["瓚",13,23,false],["瓚",14,15,true],["瓚",14,16,true],["瓚",14,17,false],["瓚",14,18,false],["瓚",14,19,false],["瓚",14,20,false],["瓚",14,21,false],["瓚",14,22,false],["瓚",14,23,false],["瓚",15,16,false],["瓚",15,17,false],["瓚",15,18,false],["瓚",15,19,false],["瓚",15,20,false],["瓚",15,21,false],["瓚",15,22,false],["瓚",15,23,false],["瓚",16,17,false],["瓚",16,18,false],["瓚",16,19,false],["瓚",16,20,false],["瓚",16,21,false],["瓚",16,22,false],["瓚",16,23,false],["瓚",17,18,true],["瓚",17,19,true],["瓚",17,20,true],["瓚",17,21,true],["瓚",17,22,false],["瓚",17,23,false],["瓚",18,19,true],["瓚",18,20,true],["瓚",18,21,true],["瓚",18,22,false],["瓚",18,23,false],["瓚",19,20,false],["瓚",19,21,false],["瓚",19,22,false],["瓚",19,23,false],["瓚",20,21,false],["瓚",20,22,false],["瓚",20,23,false],["瓚",21,22,false],["瓚",21,23,false],["瓚",22,23,false]]
for(const[glyph,one,two,touching]of expectedContacts){
 const contact=sources.entries.find(e=>e.glyph===glyph).contactChecks.find(c=>c.strokes[0]===one && c.strokes[1]===two)
 assert.equal(contact.sourceArtworkSaved,false)
 if(touching)assert.equal(contact.sourceBoundaryGapUnits,0)
 else assert.ok(contact.sourceBoundaryGapUnits>0)
}
const expectedProgressions=[{"glyph":"晙","stroke":1,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"晙","stroke":2,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"晙","stroke":3,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"晙","stroke":4,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"晙","stroke":5,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"晙","stroke":6,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"晙","stroke":7,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"晙","stroke":8,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"left","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"晙","stroke":9,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"晙","stroke":10,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"晙","stroke":11,"segments":[{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"埈","stroke":1,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"埈","stroke":2,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"埈","stroke":3,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"埈","stroke":4,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"埈","stroke":5,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"埈","stroke":6,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"埈","stroke":7,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"埈","stroke":8,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"埈","stroke":9,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"埈","stroke":10,"segments":[{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":1,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":2,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":3,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":4,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":5,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":6,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":7,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":8,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":9,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":10,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":11,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":12,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":13,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":14,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":15,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":16,"segments":[{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"left","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":17,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":18,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":19,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":20,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":21,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":22,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瓚","stroke":23,"segments":[{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false}]
for(const {glyph,...expected} of expectedProgressions){
 assert.deepEqual(sources.entries.find(e=>e.glyph===glyph).pathProgressionChecks.find(c=>c.stroke===expected.stroke),expected)
}
const catalogDir=new URL('../../content/hanja/characters/',import.meta.url)
const characters=readdirSync(catalogDir).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(new URL(f,catalogDir),'utf8')).characters)
const byGlyph=new Map(characters.map(c=>[c.glyph,c]))
assert.equal(byGlyph.size,characters.length)
assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
const previous=read('../hanja-g2-geometry-batch22-2026-09-17/progress.json')
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
const objects=j=>j.rows.map(r=>Object.fromEntries(j.fields.map((f,i)=>[f,r[i]])))
const inventory=objects(read('../hanja-g2-inventory-2026-09-15/inventory.json'))
const dictionary=objects(read('../hanja-g2-inventory-2026-09-15/dictionary-inventory.json'))
const nextGlyphs=queues.geometryNeeded.glyphs.slice(0,3)
assert.deepEqual(nextGlyphs,['埰','爀','瀅'])
const nextEntries=nextGlyphs.map(g=>{
 const c=byGlyph.get(g),i=inventory.find(e=>e.glyph===g),d=dictionary.find(e=>e.glyph===g)
 assert.equal(c.strokes,d.displayedStrokes);assert.equal(c.strokes,d.animatedCount)
 return {glyph:g,strokes:c.strokes,dictionaryStrokes:d.animatedCount,
 licensedCounts:{},
 dictionaryUrl:d.svgUrl,dictionarySha256:d.svgSha256}
})
const nextStrokes=nextEntries.reduce((n,e)=>n+e.strokes,0)
const nextBatch={schemaVersion:1,title:'埰·爀·瀅 3자·'+nextStrokes+'획 경로 구성 가능성 검토',characters:nextGlyphs.length,strokes:nextStrokes,
 source:'Prior inventory dated 2026-09-15; refresh required before review.',entries:nextEntries,
 requiredReview:['Refresh full dictionary sequences and licensed sources including compatibility glyphs.',
 'Find licensed whole-glyph or component candidates, then compare every stroke against the full Korean dictionary sequence. Component reuse never grants automatic approval.',
 'Review every path, direction, connection and cumulative stage before registration.'],
 sourceCountHeld:read('../hanja-g2-yu-2026-09-16/next-batch.json').sourceCountHeld.map(e=>({...e,review:e.glyph==='庾'?'../hanja-g2-yu-2026-09-16/review.json':e.review})),
 runtimeApprovalsAdded:0}
const progress={date:'2026-09-17',batch:{sourceAudited:3,reviewedStrokes:44,applied:3,appliedStrokes:44,held:0,authoredOrCorrectedPaths:44},
 overall:summarize(characters),byGrade:previous.byGrade.map(({grade})=>({grade,...summarize(characters.filter(c=>c.readingGrade===grade))})),
 remainingGrade2Queues:queues,sourceCountReviewStatus:previous.sourceCountReviewStatus,
 next:{task:nextBatch.title,characters:nextGlyphs.length,strokes:nextStrokes,glyphs:nextGlyphs}}
assert.equal(progress.overall.total,previous.overall.total)
assert.equal(progress.overall.totalStrokes,previous.overall.totalStrokes)
assert.equal(progress.overall.applied,previous.overall.applied+3)
assert.equal(progress.overall.appliedStrokes,previous.overall.appliedStrokes+44)
for(const entry of HANJA_DICTIONARY_G2_GEOMETRY_BATCH23_STROKES){
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
console.log(JSON.stringify({verification:'passed',reconstructionAndPublicationValid:true,allFortyFourStagesObserved:true,catalogUnchanged:true,
 proprietaryAssetsSaved:0,proofPins,progress,nextBatch},null,2))
