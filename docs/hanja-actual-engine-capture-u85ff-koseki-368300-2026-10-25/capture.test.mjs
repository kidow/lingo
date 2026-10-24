import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
const read=p=>readFileSync(new URL('../../'+p,import.meta.url)),sha=b=>createHash('sha256').update(b).digest('hex')
const sourcePath="docs/hanja-source-alternative-u85ff-koseki-368300-2026-10-25/sources.json",fullPath="docs/hanja-actual-engine-capture-u85ff-koseki-368300-2026-10-25/engine-whole-koseki-368300.json",capturePath="docs/hanja-actual-engine-capture-u85ff-koseki-368300-2026-10-25/capture.json",svgPath="docs/hanja-actual-engine-capture-u85ff-koseki-368300-2026-10-25/whole.svg"
const source=JSON.parse(read(sourcePath)),f=JSON.parse(read(fullPath)),c=JSON.parse(read(capturePath)),svg=read(svgPath).toString()
assert.equal(sha(read(sourcePath)),c.source.SHA256);assert.equal(sha(read(fullPath)),c.full5.SHA256);assert.equal(sha(read(svgPath)),c.wholeSVG.SHA256)
assert.equal(source.root,"koseki-368300");assert.equal(source.rootVersion,9);assert.deepEqual(Object.keys(f).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.equal(f.engineRevision,'49232bac0348fe815f4200d4116ab7917e0db47f');assert.deepEqual(f.engineHashes,c.engine.actualLoadedHashes);assert.equal(Object.keys(f.engineHashes).length,8)
assert.deepEqual(f.groups.map(g=>g.polygons),f.trace.map(row=>row.flatMap(call=>call.polygons)));assert.deepEqual([f.groups.length,f.trace.flat().length,f.groups.flatMap(g=>g.polygons).length],[21,21,37])
assert.equal(sha(JSON.stringify(f.groups.flatMap(g=>g.polygons))),c.captureFacts.wholePolygonsSHA256);assert.equal(c.captureFacts.makeGlyphCalls,1);assert.equal(c.captureFacts.captureEvaluation,1);assert.equal(c.captureFacts.actualVMContexts,1)
assert.equal(c.captureFacts.oldHeaderOrBodyCombined,false);assert.equal(c.captureFacts.aliasInserted,false);assert.equal(c.approval.native,false);assert.equal(c.privateDictionaryFilesWritten,0)
const seen=new Set();function visit(n,anc=[]){assert(!anc.includes(n));if(seen.has(n))return;seen.add(n);assert(source.records[n]);for(const row of source.records[n].data.split('$')){const a=row.split(':');if(a[0]==='99')visit(a[7],[...anc,n]);}}visit(source.root);assert.deepEqual([...seen].sort(),Object.keys(source.records).sort())
assert.equal((svg.match(/ Z/g)||[]).length,c.wholeSVG.polygons);assert(!/transform=|clipPath|mask=/.test(svg));assert.equal(c.wholeSVG.originalCoordinatesPreserved,true)
console.log("藿 새 전체원본 full5 21raw/21calls/37P artifact 검증 PASS; engine/native 재생0")
