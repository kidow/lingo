import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import vm from 'node:vm'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'
const here = new URL('./', import.meta.url)
const read = name => JSON.parse(fs.readFileSync(new URL(name, here), 'utf8'))
const source=read('sources.json'),proof=read('engine-proof.json'),findings=read('findings.json'),coverage=read('coverage.json'),alternative=read('alternative-u6d8d-ue0100.json')
assert.equal(crypto.createHash('sha256').update(fs.readFileSync(new URL('sources.json',here))).digest('hex'),'4a9442f1b360b17307bd47b45238cb3e62ebfbbc1ebc3bebfbd29bf15a9f5079')
assert.equal(source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
assert.deepEqual(Object.keys(source.records),['u6d8d-k','u6d8d','u6c35-01','u5b5d'])
assert.deepEqual(source.missing,[])
assert.equal(alternative.records[alternative.root].data,source.records[source.root].data)
for(const k of ['u6d8d','u6c35-01','u5b5d'])assert.deepEqual(alternative.records[k],source.records[k])
assert.equal(proof.groups.length,12)
assert.equal(proof.trace.flat().filter(c=>c.kind==='cdDrawCurve').length,7)
assert.equal(proof.trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
const end=proof.trace[2][0].args.slice(4,6),start=proof.trace[3][0].args.slice(0,2)
assert.deepEqual(end,findings.sourceGap.firstEnd)
assert.deepEqual(start,findings.sourceGap.secondStart)
assert.equal(Math.hypot(end[0]-start[0],end[1]-start[1]),findings.sourceGap.distance)
assert(findings.sourceGap.distance>34)
const firstStart=proof.trace[2][0].args.slice(0,2), secondEnd=proof.trace[3][0].args.slice(4,6)
for(const [a,b] of [[end,start],[firstStart,start],[end,secondEnd],[firstStart,secondEnd]])assert(Math.hypot(a[0]-b[0],a[1]-b[1])>26)
assert.deepEqual(proof.trace[8][0].args.slice(2,4),proof.trace[9][0].args.slice(0,2))
assert.deepEqual(proof.trace[10][0].args.slice(2,4),proof.trace[10][1].args.slice(0,2))
assert.equal(findings.runtimeAdded,0)
assert.equal(findings.geometryReviewPassed,false)
assert.equal(findings.progressiveFramesReviewed,0)
assert.deepEqual(findings.reviewedDomesticStrokes,Array.from({length:10},(_,i)=>i+1))
assert.deepEqual(findings.sourceGroupsZeroBased.flat(),Array.from({length:12},(_,i)=>i))
assert.equal(findings.privateMediaSaved,false)
const characters=fs.readdirSync('content/hanja/characters').flatMap(f=>JSON.parse(fs.readFileSync('content/hanja/characters/'+f,'utf8')).characters)
assert.equal(hanjaStrokeData(characters.find(c=>c.glyph==='涍')),null)
assert.equal(hanjaStrokeData(characters.find(c=>c.glyph==='茗')),null)
assert.equal(characters.filter(c=>hanjaStrokeData(c)).length,coverage.applied)
assert.equal(characters.length,coverage.total)
if (process.argv.includes('--engine')) {
  const sandbox = {records:source.records,root:source.root}
  vm.createContext(sandbox)
  for (const [file, hash] of Object.entries(proof.engineHashes)) {
    const response = await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/' + proof.engineRevision + '/' + file)
    assert.equal(response.status, 200)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), hash)
    vm.runInContext(bytes.toString('utf8'), sandbox, {filename:file})
  }
  const reproduced = JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`, sandbox))
  assert.deepEqual(reproduced.groups, proof.groups)
  assert.deepEqual(reproduced.trace, proof.trace)
  assert.deepEqual(reproduced.defaults, proof.defaults)
}
console.log(JSON.stringify({passed:true,runtimeAdded:0,glyph:'涍',domesticReviewed:10,gap:findings.sourceGap.distance,alternativeSameWholeSource:true,engineFiles:process.argv.includes('--engine')?8:0,applied:coverage.applied,remaining:coverage.remaining}))
