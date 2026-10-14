// Source-only original terminal15 same-pen candidate; domestic native review is pending.
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const SOURCE_DIRECTORY = new URL('./', import.meta.url)
const hash = value => createHash('sha256').update(value).digest('hex')
export const originalCompilerSHA256 = "a75ac7fd4267c4bb0dea21b1cfcf895e08edbcf42ae1e0e39067f9c70aed348c"
export const candidateWholeProofs = Object.freeze([{"identity":{"sourceRoot":"u7501","sourceProofFile":"./engine-whole-u7501.json","sourceProofFileSha256":"57611d1aeab7aead8768e14853b032835b7e9ccf68665d1f5be40a5564ef6aac","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571"},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13]]},{"identity":{"sourceRoot":"u7501-ue0100","sourceProofFile":"./engine-whole-u7501-ue0100.json","sourceProofFileSha256":"57611d1aeab7aead8768e14853b032835b7e9ccf68665d1f5be40a5564ef6aac","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571"},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13]]},{"identity":{"sourceRoot":"u7501-ue0101","sourceProofFile":"./engine-whole-u7501-ue0101.json","sourceProofFileSha256":"57611d1aeab7aead8768e14853b032835b7e9ccf68665d1f5be40a5564ef6aac","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571"},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13]]}].map(value => Object.freeze({...value,identity:Object.freeze(value.identity),sourceGroups:Object.freeze(value.sourceGroups.map(group=>Object.freeze(group)))})))
export const supportedWholeRoots = Object.freeze(candidateWholeProofs.map(value => value.identity.sourceRoot))
export const sourceRoot = 'u7501'
export const sourceGroups = Object.freeze(candidateWholeProofs[0].sourceGroups.map(group => Object.freeze(group)))
export const nativeApproval = false
export const runtimeApplied = false
export function compileSourceWhole(root, trace, proof, identity) {
  assert.equal(hash(readFileSync(new URL('progressive.mjs', SOURCE_DIRECTORY))), originalCompilerSHA256, 'Frozen original compiler file')
  const selected = candidateWholeProofs.find(value => value.identity.sourceRoot === root)
  assert(selected, 'Only three explicitly pinned original terminal15 whole profiles are supported')
  assert.deepEqual(identity, selected.identity, 'Complete original seven-field whole/header/metadata identity')
  assert.deepEqual(selected.sourceGroups, original.candidateWholeProofs.find(value=>value.identity.sourceRoot===root).sourceGroups, 'Intact original source grouping')
  assert.deepEqual(selected.sourceGroups[11], [11,12])
  const before = JSON.stringify(proof)
  const strokes = original.compileSourceWhole(root, trace, proof, identity)
  assert.equal(JSON.stringify(proof), before)
  assert.equal(strokes.length, 13)
  assert.equal(strokes.flat().length, 13)
  const pen = strokes[11]
  assert.equal(pen.length, 1)
  const body = pen[0]
  assert.equal(body.direction, 'curve')
  assert.equal(body.revealPath, 'M60.7 34.5 L81.07 34.5 Q76.705 86.5 91.74 88.5')
  assert.equal(body.revealWidth, 14)
  assert.equal(body.weight, 75.414063)
  assert.equal(trace[12].length, 1)
  const call = trace[12][0]
  assert.equal(call.kind, 'cdDrawCurve')
  assert.deepEqual(call.args, [162.14,69,153.41,173,183.48,177,22,15])
  assert.equal(call.polygons.length, 4)
  const [x1,y1,cx,cy,x2,y2,ta1,ta2] = call.args
  assert.equal(ta2, 15); assert(y1 < y2)
  const width = proof.defaults.kMinWidthT - Math.floor((ta1 % 10000) / 1000) / 2
  const jump = proof.defaults.kWidth * 5
  assert.equal(width, 6); assert.equal(jump, 25)
  const point = (x,y) => ({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
  const last = call.polygons.at(-1)
  assert.deepEqual(last, [point(x2,y2-width+1),point(x2+2,y2-width-jump),point(x2,y2-width-jump),point(x2-width,y2-width+1)])
  assert.deepEqual(last, proof.groups[12].polygons.at(-1))
  // Reuse the exact already emitted polygon string; no new path or point order.
  const pieces = body.outline.match(/M[^Z]* Z/g)
  assert.equal(pieces.length, 5)
  const tailOutline = pieces.at(-1)
  const coordinates = tailOutline.match(/-?\d+(?:\.\d+)?/g).map(Number)
  assert.deepEqual(coordinates.slice().sort((a,b)=>a-b), last.flatMap(value=>[value.x/2,value.y/2]).sort((a,b)=>a-b))
  const xs=last.map(value=>value.x/2),ys=last.map(value=>value.y/2)
  const tail = {outline:tailOutline,bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction:'up',weight:jump/2}
  const result = strokes.slice()
  result[11] = [{...body,outline:pieces.slice(0,-1).join(' ')},tail]
  assert.equal(result.flat().length,14)
  assert.equal(JSON.stringify(proof),before)
  return result
}

