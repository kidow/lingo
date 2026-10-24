import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
const read=p=>readFileSync(new URL('../../'+p,import.meta.url)), sha=b=>createHash('sha256').update(b).digest('hex')
const sourcePath="docs/hanja-source-alternative-u7681-j-2026-10-25/sources.json", wholePath="docs/hanja-actual-engine-capture-u7681-j-2026-10-25/engine-whole-u7681-j.json"
const sourceBytes=read(sourcePath),wholeBytes=read(wholePath),source=JSON.parse(sourceBytes),f=JSON.parse(wholeBytes)
assert.equal(sha(sourceBytes),"7ef420fc6d0941cf83ae316e8f386dc7a99920ea0aa4b442e5629ccb5f4f2285")
assert.equal(sha(wholeBytes),"c64b3d87ec722d56007895449de12a797b4143e1276a92d5c3d3d57ab534ddb6")
assert.equal(source.root,'u7681-j');assert.equal(source.records['u7681-j'].version,'4');assert.equal(source.records['u767d-07'].version,4)
assert.equal(source.records['u7681-j'].data,'99:0:0:10:7:190:116:u767d-07$1:0:0:14:138:186:138$1:0:0:100:105:100:185')
assert.deepEqual(Object.keys(f).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.equal(f.engineRevision,"49232bac0348fe815f4200d4116ab7917e0db47f")
assert.equal(f.groups.length,8);assert.equal(f.trace.length,8);assert.equal(f.trace.flat().length,8)
assert.equal(f.groups.reduce((n,g)=>n+g.polygons.length,0),13)
assert.deepEqual(f.groups.map(g=>g.polygons),f.trace.map(row=>row.flatMap(call=>call.polygons)))
assert.equal(sha(JSON.stringify(f.groups.flatMap(g=>g.polygons))),"3d31bdb79c626d813fd9946e160cf65987e472f04473a994e30fe297074073a7")
assert.deepEqual(f.groups[7].raw,[1,0,0,100,105,100,185,null,null,null,null])
assert.equal(Object.keys(f.engineHashes).length,8)
console.log('皁 J artifact FIRST PASS: original full5 8 raw / 8 calls / 13 P; no engine replay or native approval')
