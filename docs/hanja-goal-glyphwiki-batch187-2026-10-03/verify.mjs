import assert from 'node:assert/strict'
import fs from 'node:fs'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'
const here = new URL('./', import.meta.url)
const findings = JSON.parse(fs.readFileSync(new URL('findings.json', here), 'utf8'))
const coverage = JSON.parse(fs.readFileSync(new URL('coverage.json', here), 'utf8'))
const characters = fs.readdirSync('content/hanja/characters').flatMap(f => JSON.parse(fs.readFileSync('content/hanja/characters/' + f, 'utf8')).characters)
assert.equal(findings.runtimeAdded, 0)
assert.equal(findings.domesticReviewedStrokes, 0)
assert.equal(findings.dictionary.status, 200)
assert.equal(findings.dictionary.privateMediaSaved, false)
assert.equal(findings.sourceAttempts.length, 2)
assert.equal(hanjaStrokeData(characters.find(c => c.glyph === '栯')), null)
assert.equal(hanjaStrokeData(characters.find(c => c.glyph === '浿')), null)
assert.equal(characters.filter(c => hanjaStrokeData(c)).length, coverage.applied)
assert.equal(characters.length, coverage.total)
console.log(JSON.stringify({passed:true,glyph:'栯',runtimeAdded:0,applied:coverage.applied,remaining:coverage.remaining,domesticReviewedStrokes:0}))
