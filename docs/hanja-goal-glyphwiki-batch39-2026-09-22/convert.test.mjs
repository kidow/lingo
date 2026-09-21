import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { expandMan,buildManPaths } from './convert.mjs'
const read=f=>JSON.parse(readFileSync(new URL(f,import.meta.url)))
const source=read('../../public/hanja-strokes/glyphwiki/8513.json')
const review=read('./findings.json').entries[0]
test('every transformed coordinate equals the pinned renderer reference',()=>{
  const raw=expandMan(source)
  assert.deepEqual(raw.map(p=>[p.type,p.head,p.tail,...p.points.flat()]),read('./reference.json').raw)
  assert.equal(raw[1].points[0][0],63)
  assert.equal(raw[1].points[1][0],63)
})
test('all15 reviewed paths reproduce without source mutation',()=>{
  const before=JSON.stringify(source)
  assert.deepEqual(buildManPaths(source,review.groups,review.sourceStrokeIndices),read('../../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch39.json')[0].paths)
  assert.equal(JSON.stringify(source),before)
})
test('other pivots, stretch rows and roots remain unsupported',()=>{
  for(const edit of [
    s=>{s.records[s.root].data=s.records[s.root].data.replace('200:-60','200:-59')},
    s=>{s.records[s.root].data=s.records[s.root].data.replace('0:0:-60','0:0:-59')},
    s=>{s.root='u66fc'},
  ]){
    const changed=structuredClone(source);edit(changed)
    assert.throws(()=>expandMan(changed))
  }
})
test('box and curve corners must retain exact source boundaries',()=>{
  for(const [record,from,to]of [['u65e5-03','150:26:150:82','151:26:151:82'],['u53c8-07','145:38:114:157','146:38:114:157']]){
    const changed=structuredClone(source)
    changed.records[record].data=changed.records[record].data.replace(from,to)
    assert.throws(()=>buildManPaths(changed,review.groups,review.sourceStrokeIndices))
  }
})
test('missing or duplicate primitives and order positions are rejected',()=>{
  assert.throws(()=>buildManPaths(source,review.groups.slice(1),review.sourceStrokeIndices))
  const order=review.sourceStrokeIndices.slice();order[3]=order[2]
  assert.throws(()=>buildManPaths(source,review.groups,order))
})
test('unreviewed hooks, direction changes and cyclic references are rejected',()=>{
  for(const edit of [
    s=>{s.records['u53c8-07'].data=s.records['u53c8-07'].data.replace('2:7:0','2:7:4')},
    s=>{s.records['u53c8-07'].data=s.records['u53c8-07'].data.replace('59:37:92:156:172:180','172:180:92:156:59:37')},
    s=>{s.records['ufa5e-03'].data='99:0:0:0:0:200:200:u8513-k'},
  ]){
    const changed=structuredClone(source);edit(changed)
    assert.throws(()=>expandMan(changed))
  }
})
test('width3 keeps tiers separated and exact box endpoints connected',()=>{
  const e=read('../../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch39.json')[0]
  const p=e.paths.map(s=>s.match(/-?\d+(?:\.\d+)?/g).map(Number))
  assert.equal(e.strokeWidth,3)
  assert(p[2][0]-p[0][2]>e.strokeWidth)
  assert(p[4][1]-p[1][3]>e.strokeWidth)
  assert(p[8][1]-p[7][1]>e.strokeWidth)
  assert(p[13][1]-p[12][1]>e.strokeWidth)
  assert.deepEqual(p[5].slice(-2),[p[7][2],p[7][3]])
  assert.deepEqual(p[9].slice(-2),[p[12][2],p[12][3]])
})
