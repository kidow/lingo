/** Offline checks and live runtime counts; prints artifacts for native writes. */
import assert from 'node:assert/strict'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {HANJA_DICTIONARY_G2_GEOMETRY_BATCH24_STROKES} from '../../lib/hanja-stroke-dictionary-g2-geometry-batch24.ts'
import {buildG2GeometryBatch24DictionaryBundle,validateG2GeometryBatch24DictionaryBundle} from '../../scripts/hanja-stroke-dictionary-g2-geometry-batch24.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const hash=b=>createHash('sha256').update(b).digest('hex')
const originals=read('originals.json'),sources=read('source-checks.json'),observations=read('observations.json'),corrections=read('corrections.json')
const prepared=JSON.parse(execFileSync(process.execPath,[fileURLToPath(new URL('prepare.mjs',import.meta.url))],{encoding:'utf8',maxBuffer:3000000}))
assert.deepEqual(read('candidate-paths.json'),prepared.candidate)
assert.deepEqual(read('review.json'),prepared.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch24.json'),prepared.runtime)
assert.deepEqual(buildG2GeometryBatch24DictionaryBundle(),prepared.runtime)
validateG2GeometryBatch24DictionaryBundle()
assert.deepEqual(originals.entries.map(e=>[e.glyph,e.strokes,e.catalogStrokes,e.dictionaryStrokes]),[['埰',11,11,11],['爀',18,18,18],['瀅',18,18,18]])
assert.equal(typeof corrections.method,'string')
assert.equal(corrections.edits.length,47)
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
const expectedContacts=[["埰",1,2,true],["埰",1,3,false],["埰",1,4,false],["埰",1,5,false],["埰",1,6,false],["埰",1,7,false],["埰",1,8,false],["埰",1,9,false],["埰",1,10,false],["埰",1,11,false],["埰",2,3,true],["埰",2,4,false],["埰",2,5,false],["埰",2,6,false],["埰",2,7,false],["埰",2,8,false],["埰",2,9,false],["埰",2,10,false],["埰",2,11,false],["埰",3,4,false],["埰",3,5,false],["埰",3,6,false],["埰",3,7,false],["埰",3,8,false],["埰",3,9,false],["埰",3,10,false],["埰",3,11,false],["埰",4,5,true],["埰",4,6,false],["埰",4,7,false],["埰",4,8,false],["埰",4,9,false],["埰",4,10,false],["埰",4,11,false],["埰",5,6,false],["埰",5,7,false],["埰",5,8,false],["埰",5,9,false],["埰",5,10,false],["埰",5,11,false],["埰",6,7,false],["埰",6,8,false],["埰",6,9,false],["埰",6,10,false],["埰",6,11,false],["埰",7,8,false],["埰",7,9,false],["埰",7,10,false],["埰",7,11,false],["埰",8,9,true],["埰",8,10,true],["埰",8,11,true],["埰",9,10,true],["埰",9,11,true],["埰",10,11,false],["爀",1,2,false],["爀",1,3,false],["爀",1,4,false],["爀",1,5,false],["爀",1,6,false],["爀",1,7,false],["爀",1,8,false],["爀",1,9,false],["爀",1,10,false],["爀",1,11,false],["爀",1,12,false],["爀",1,13,false],["爀",1,14,false],["爀",1,15,false],["爀",1,16,false],["爀",1,17,false],["爀",1,18,false],["爀",2,3,true],["爀",2,4,false],["爀",2,5,false],["爀",2,6,false],["爀",2,7,false],["爀",2,8,false],["爀",2,9,false],["爀",2,10,false],["爀",2,11,false],["爀",2,12,false],["爀",2,13,false],["爀",2,14,false],["爀",2,15,false],["爀",2,16,false],["爀",2,17,false],["爀",2,18,false],["爀",3,4,true],["爀",3,5,false],["爀",3,6,false],["爀",3,7,false],["爀",3,8,false],["爀",3,9,false],["爀",3,10,false],["爀",3,11,false],["爀",3,12,false],["爀",3,13,false],["爀",3,14,false],["爀",3,15,false],["爀",3,16,false],["爀",3,17,false],["爀",3,18,false],["爀",4,5,false],["爀",4,6,false],["爀",4,7,false],["爀",4,8,false],["爀",4,9,false],["爀",4,10,false],["爀",4,11,false],["爀",4,12,false],["爀",4,13,false],["爀",4,14,false],["爀",4,15,false],["爀",4,16,false],["爀",4,17,false],["爀",4,18,false],["爀",5,6,true],["爀",5,7,false],["爀",5,8,false],["爀",5,9,false],["爀",5,10,false],["爀",5,11,false],["爀",5,12,false],["爀",5,13,false],["爀",5,14,false],["爀",5,15,false],["爀",5,16,false],["爀",5,17,false],["爀",5,18,false],["爀",6,7,true],["爀",6,8,false],["爀",6,9,false],["爀",6,10,false],["爀",6,11,false],["爀",6,12,false],["爀",6,13,false],["爀",6,14,false],["爀",6,15,false],["爀",6,16,false],["爀",6,17,false],["爀",6,18,false],["爀",7,8,true],["爀",7,9,true],["爀",7,10,false],["爀",7,11,false],["爀",7,12,false],["爀",7,13,false],["爀",7,14,false],["爀",7,15,false],["爀",7,16,false],["爀",7,17,false],["爀",7,18,false],["爀",8,9,false],["爀",8,10,false],["爀",8,11,false],["爀",8,12,false],["爀",8,13,false],["爀",8,14,false],["爀",8,15,false],["爀",8,16,false],["爀",8,17,false],["爀",8,18,false],["爀",9,10,false],["爀",9,11,true],["爀",9,12,false],["爀",9,13,false],["爀",9,14,false],["爀",9,15,false],["爀",9,16,false],["爀",9,17,false],["爀",9,18,false],["爀",10,11,false],["爀",10,12,false],["爀",10,13,false],["爀",10,14,false],["爀",10,15,false],["爀",10,16,false],["爀",10,17,false],["爀",10,18,false],["爀",11,12,false],["爀",11,13,false],["爀",11,14,false],["爀",11,15,false],["爀",11,16,false],["爀",11,17,false],["爀",11,18,false],["爀",12,13,true],["爀",12,14,false],["爀",12,15,false],["爀",12,16,false],["爀",12,17,false],["爀",12,18,false],["爀",13,14,true],["爀",13,15,false],["爀",13,16,false],["爀",13,17,false],["爀",13,18,false],["爀",14,15,true],["爀",14,16,true],["爀",14,17,false],["爀",14,18,false],["爀",15,16,false],["爀",15,17,false],["爀",15,18,false],["爀",16,17,false],["爀",16,18,true],["爀",17,18,false],["瀅",1,2,false],["瀅",1,3,false],["瀅",1,4,false],["瀅",1,5,false],["瀅",1,6,false],["瀅",1,7,false],["瀅",1,8,false],["瀅",1,9,false],["瀅",1,10,false],["瀅",1,11,false],["瀅",1,12,false],["瀅",1,13,false],["瀅",1,14,false],["瀅",1,15,false],["瀅",1,16,false],["瀅",1,17,false],["瀅",1,18,false],["瀅",2,3,false],["瀅",2,4,false],["瀅",2,5,false],["瀅",2,6,false],["瀅",2,7,false],["瀅",2,8,false],["瀅",2,9,false],["瀅",2,10,false],["瀅",2,11,false],["瀅",2,12,false],["瀅",2,13,false],["瀅",2,14,false],["瀅",2,15,false],["瀅",2,16,false],["瀅",2,17,false],["瀅",2,18,false],["瀅",3,4,false],["瀅",3,5,false],["瀅",3,6,false],["瀅",3,7,false],["瀅",3,8,false],["瀅",3,9,false],["瀅",3,10,false],["瀅",3,11,false],["瀅",3,12,false],["瀅",3,13,false],["瀅",3,14,false],["瀅",3,15,false],["瀅",3,16,false],["瀅",3,17,false],["瀅",3,18,false],["瀅",4,5,false],["瀅",4,6,false],["瀅",4,7,false],["瀅",4,8,false],["瀅",4,9,false],["瀅",4,10,false],["瀅",4,11,false],["瀅",4,12,false],["瀅",4,13,false],["瀅",4,14,false],["瀅",4,15,false],["瀅",4,16,false],["瀅",4,17,false],["瀅",4,18,false],["瀅",5,6,true],["瀅",5,7,false],["瀅",5,8,false],["瀅",5,9,false],["瀅",5,10,false],["瀅",5,11,false],["瀅",5,12,false],["瀅",5,13,false],["瀅",5,14,false],["瀅",5,15,false],["瀅",5,16,false],["瀅",5,17,false],["瀅",5,18,false],["瀅",6,7,true],["瀅",6,8,false],["瀅",6,9,false],["瀅",6,10,false],["瀅",6,11,false],["瀅",6,12,false],["瀅",6,13,false],["瀅",6,14,false],["瀅",6,15,false],["瀅",6,16,false],["瀅",6,17,false],["瀅",6,18,false],["瀅",7,8,false],["瀅",7,9,false],["瀅",7,10,false],["瀅",7,11,false],["瀅",7,12,false],["瀅",7,13,false],["瀅",7,14,false],["瀅",7,15,false],["瀅",7,16,false],["瀅",7,17,false],["瀅",7,18,false],["瀅",8,9,false],["瀅",8,10,false],["瀅",8,11,false],["瀅",8,12,false],["瀅",8,13,false],["瀅",8,14,false],["瀅",8,15,false],["瀅",8,16,false],["瀅",8,17,false],["瀅",8,18,false],["瀅",9,10,true],["瀅",9,11,false],["瀅",9,12,false],["瀅",9,13,false],["瀅",9,14,false],["瀅",9,15,false],["瀅",9,16,false],["瀅",9,17,false],["瀅",9,18,false],["瀅",10,11,true],["瀅",10,12,false],["瀅",10,13,false],["瀅",10,14,false],["瀅",10,15,false],["瀅",10,16,false],["瀅",10,17,false],["瀅",10,18,false],["瀅",11,12,false],["瀅",11,13,false],["瀅",11,14,false],["瀅",11,15,false],["瀅",11,16,false],["瀅",11,17,false],["瀅",11,18,false],["瀅",12,13,true],["瀅",12,14,false],["瀅",12,15,false],["瀅",12,16,false],["瀅",12,17,false],["瀅",12,18,false],["瀅",13,14,false],["瀅",13,15,false],["瀅",13,16,false],["瀅",13,17,false],["瀅",13,18,false],["瀅",14,15,false],["瀅",14,16,true],["瀅",14,17,false],["瀅",14,18,false],["瀅",15,16,true],["瀅",15,17,false],["瀅",15,18,false],["瀅",16,17,true],["瀅",16,18,false],["瀅",17,18,false]]
for(const[glyph,one,two,touching]of expectedContacts){
 const contact=sources.entries.find(e=>e.glyph===glyph).contactChecks.find(c=>c.strokes[0]===one && c.strokes[1]===two)
 assert.equal(contact.sourceArtworkSaved,false)
 if(touching)assert.equal(contact.sourceBoundaryGapUnits,0)
 else assert.ok(contact.sourceBoundaryGapUnits>0)
}
const expectedProgressions=[{"glyph":"埰","stroke":1,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"埰","stroke":2,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"埰","stroke":3,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"埰","stroke":4,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"埰","stroke":5,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"埰","stroke":6,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"埰","stroke":7,"segments":[{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"埰","stroke":8,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"埰","stroke":9,"segments":[{"command":"L","x":"same","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"埰","stroke":10,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"埰","stroke":11,"segments":[{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":1,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":2,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":3,"segments":[{"command":"L","x":"same","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":4,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":5,"segments":[{"command":"L","x":"right","screenY":"same"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":6,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":7,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":8,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":9,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":10,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":11,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":12,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":13,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":14,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":15,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":16,"segments":[{"command":"L","x":"same","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":17,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"爀","stroke":18,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":1,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":2,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":3,"segments":[{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"up"},{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":4,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":5,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":6,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":7,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":8,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":9,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":10,"segments":[{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":11,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":12,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":13,"segments":[{"command":"L","x":"right","screenY":"up"},{"command":"L","x":"right","screenY":"down"},{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":14,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":15,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":16,"segments":[{"command":"L","x":"left","screenY":"down"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":17,"segments":[{"command":"L","x":"right","screenY":"up"}],"sourceArtworkSaved":false},{"glyph":"瀅","stroke":18,"segments":[{"command":"L","x":"right","screenY":"down"}],"sourceArtworkSaved":false}]
for(const {glyph,...expected} of expectedProgressions){
 assert.deepEqual(sources.entries.find(e=>e.glyph===glyph).pathProgressionChecks.find(c=>c.stroke===expected.stroke),expected)
}
const catalogDir=new URL('../../content/hanja/characters/',import.meta.url)
const characters=readdirSync(catalogDir).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(new URL(f,catalogDir),'utf8')).characters)
const byGlyph=new Map(characters.map(c=>[c.glyph,c]))
assert.equal(byGlyph.size,characters.length)
assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
const previous=read('../hanja-g2-geometry-batch23-2026-09-17/progress.json')
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
assert.deepEqual(nextGlyphs,['澔','嬅','壎'])
const nextEntries=nextGlyphs.map(g=>{
 const c=byGlyph.get(g),i=inventory.find(e=>e.glyph===g),d=dictionary.find(e=>e.glyph===g)
 assert.equal(c.strokes,d.displayedStrokes);assert.equal(c.strokes,d.animatedCount)
 return {glyph:g,strokes:c.strokes,dictionaryStrokes:d.animatedCount,
 licensedCounts:{},
 dictionaryUrl:d.svgUrl,dictionarySha256:d.svgSha256}
})
const nextStrokes=nextEntries.reduce((n,e)=>n+e.strokes,0)
const nextBatch={schemaVersion:1,title:'澔·嬅·壎 3자·'+nextStrokes+'획 경로 구성 가능성 검토',characters:nextGlyphs.length,strokes:nextStrokes,
 source:'Prior inventory dated 2026-09-15; refresh required before review.',entries:nextEntries,
 requiredReview:['Refresh full dictionary sequences and licensed sources including compatibility glyphs.',
 'Find licensed whole-glyph or component candidates, then compare every stroke against the full Korean dictionary sequence. Component reuse never grants automatic approval.',
 'Review every path, direction, connection and cumulative stage before registration.'],
 sourceCountHeld:read('../hanja-g2-yu-2026-09-16/next-batch.json').sourceCountHeld.map(e=>({...e,review:e.glyph==='庾'?'../hanja-g2-yu-2026-09-16/review.json':e.review})),
 runtimeApprovalsAdded:0}
const progress={date:'2026-09-17',batch:{sourceAudited:3,reviewedStrokes:47,applied:3,appliedStrokes:47,held:0,authoredOrCorrectedPaths:47},
 overall:summarize(characters),byGrade:previous.byGrade.map(({grade})=>({grade,...summarize(characters.filter(c=>c.readingGrade===grade))})),
 remainingGrade2Queues:queues,sourceCountReviewStatus:previous.sourceCountReviewStatus,
 next:{task:nextBatch.title,characters:nextGlyphs.length,strokes:nextStrokes,glyphs:nextGlyphs}}
assert.equal(progress.overall.total,previous.overall.total)
assert.equal(progress.overall.totalStrokes,previous.overall.totalStrokes)
assert.equal(progress.overall.applied,previous.overall.applied+3)
assert.equal(progress.overall.appliedStrokes,previous.overall.appliedStrokes+47)
for(const entry of HANJA_DICTIONARY_G2_GEOMETRY_BATCH24_STROKES){
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
console.log(JSON.stringify({verification:'passed',reconstructionAndPublicationValid:true,allFortySevenStagesObserved:true,catalogUnchanged:true,
 proprietaryAssetsSaved:0,proofPins,progress,nextBatch},null,2))
