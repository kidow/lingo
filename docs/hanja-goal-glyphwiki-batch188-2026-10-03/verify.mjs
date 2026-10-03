import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import vm from 'node:vm'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'
const here = new URL('./', import.meta.url)
const read = name => JSON.parse(fs.readFileSync(new URL(name, here), 'utf8'))
const source = read('sources.json'), proof = read('engine-proof.json'), findings = read('findings.json'), coverage = read('coverage.json')
assert.equal(source.archive.sha256, '7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
assert.equal(Object.keys(source.records).length, 4)
assert.deepEqual(source.missing, [])
assert.equal(proof.groups.length, 13)
assert.equal(proof.trace[4].length, 0)
assert.equal(proof.trace.flat().filter(c => c.kind === 'cdDrawCurve').length, 6)
const end = proof.trace[2][0].args.slice(4, 6), start = proof.trace[3][0].args.slice(0, 2)
assert.deepEqual(end, findings.sourceGap.firstEnd)
assert.deepEqual(start, findings.sourceGap.secondStart)
assert.equal(Math.hypot(end[0] - start[0], end[1] - start[1]), findings.sourceGap.distance)
assert(findings.sourceGap.distance > 34)
assert.equal(findings.runtimeAdded, 0)
assert.equal(findings.geometryReviewPassed, false)
assert.equal(findings.progressiveFramesReviewed, 0)
assert.deepEqual(findings.reviewedDomesticStrokes, Array.from({length:10}, (_,i) => i + 1))
assert.equal(findings.privateMediaSaved, false)
const characters = fs.readdirSync('content/hanja/characters').flatMap(f => JSON.parse(fs.readFileSync('content/hanja/characters/' + f, 'utf8')).characters)
assert.equal(hanjaStrokeData(characters.find(c => c.glyph === '浿')), null)
assert.equal(hanjaStrokeData(characters.find(c => c.glyph === '珝')), null)
assert.equal(characters.filter(c => hanjaStrokeData(c)).length, coverage.applied)
assert.equal(characters.length, coverage.total)
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
console.log(JSON.stringify({passed:true,runtimeAdded:0,glyph:'浿',domesticReviewed:10,gap:findings.sourceGap.distance,engineFiles:process.argv.includes('--engine')?8:0,applied:coverage.applied,remaining:coverage.remaining}))
