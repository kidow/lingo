// Source-only VS2 candidate. Parent native boundary/frame review is pending.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'

const sha = value => createHash('sha256').update(value).digest('hex')
const digest = value => sha(JSON.stringify(value))
export const sourceRoot = 'u840b-ue0102'
export const sourceProofFile = './engine-whole-u840b-ue0102.json'
export const sourceProofFileSha256 = '1e1d15ea22f21eba0c2d1f7c718f547604e4be5551d4233780fc82e9f3764461'
export const sourceHeaderFile = './engine-proof.json'
export const sourceHeaderFileSha256 = '4328685e7e570bd8abad0396cdabbfad176662f611915bbbf824d18ec607ca59'
export const selectedProofIdentity = Object.freeze({ sourceRoot, sourceProofFile, sourceProofFileSha256, sourceHeaderFile, sourceHeaderFileSha256 })
export const sourceGroups = Object.freeze([[0],[1],[3],[2],[4],[5,6],[7],[8],[9],[10,11],[12],[13]].map(group => Object.freeze(group)))
const FULL_PROOF_SHA256 = '4845f4dc2c1e1e8269a15984af12782eed5dd1bc6933c5eb0e3f19a0c3cd8e0d'
const OVERLAP_CERTIFICATE_SHA256 = 'c1d1e4d037fcd6132871aec7be1a7809fac0133781dfb11f9bcdd88980315f62'
const endpoint = call => call.args.slice(call.kind === 'cdDrawLine' ? 2 : 4, call.kind === 'cdDrawLine' ? 4 : 6)

function segment(polygons, direction, weight) {
  const points = polygons.flat()
  assert(points.length > 0 && points.every(value => value.off === 0))
  assert(weight > 0)
  const xs = points.map(value => value.x / 2), ys = points.map(value => value.y / 2)
  const normalized = polygons.map(polygon => {
    const area = polygon.reduce((sum, value, index) => { const next = polygon[(index + 1) % polygon.length]; return sum + value.x * next.y - next.x * value.y }, 0)
    assert(area !== 0)
    return area < 0 ? [polygon[0], ...polygon.slice(1).reverse()] : polygon
  })
  return {
    outline: normalized.map(polygon => polygon.map((value, index) => (index ? 'L' : 'M') + value.x / 2 + ' ' + value.y / 2).join(' ') + ' Z').join(' '),
    bounds: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)],
    direction,
    weight: Math.round(weight * 1e6) / 1e6,
  }
}

// Identical original per-call reveal paths, width14 and chord weights used by the existing compiler.
function originalPiece(call) {
  const args = call.args
  if (call.kind === 'cdDrawCurve') return {
    ...segment(call.polygons, 'curve', Math.hypot(args[4] - args[0], args[5] - args[1]) / 2),
    revealPath: 'M' + args[0] / 2 + ' ' + args[1] / 2 + ' Q' + args[2] / 2 + ' ' + args[3] / 2 + ' ' + args[4] / 2 + ' ' + args[5] / 2,
    revealWidth: 14,
  }
  assert.equal(call.kind, 'cdDrawLine')
  const piece = segment(call.polygons, args[0] === args[2] ? (args[3] > args[1] ? 'down' : 'up') : args[1] === args[3] ? (args[2] > args[0] ? 'right' : 'left') : 'curve', Math.hypot(args[2] - args[0], args[3] - args[1]) / 2)
  return piece.direction === 'curve' ? { ...piece, revealPath: 'M' + args[0] / 2 + ' ' + args[1] / 2 + ' L' + args[2] / 2 + ' ' + args[3] / 2, revealWidth: 14 } : piece
}

export function compileProgressive(trace, proof, identity) {
  assert.deepEqual(identity, selectedProofIdentity, 'Explicit fixed whole/body/header identity required')
  const sourceBytes = readFileSync(new URL(sourceProofFile, import.meta.url))
  const headerBytes = readFileSync(new URL(sourceHeaderFile, import.meta.url))
  assert.equal(sha(sourceBytes), sourceProofFileSha256)
  assert.equal(sha(headerBytes), sourceHeaderFileSha256)
  const source = JSON.parse(sourceBytes), header = JSON.parse(headerBytes)
  const expected = { engineRevision: header.engineRevision, engineHashes: header.engineHashes, ...source }
  assert.deepEqual(Object.keys(proof).sort(), ['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(digest(expected), FULL_PROOF_SHA256, 'Full original geometry/preset/8-engine body is fixed')
  assert.deepEqual(proof, expected)
  assert.deepEqual(trace, expected.trace)
  assert.equal(trace.length, 14)
  assert.deepEqual(sourceGroups.flat().sort((a,b) => a-b), Array.from({length:14},(_,index) => index))
  const before = JSON.stringify(proof)
  const compileExact = indices => {
    const calls = indices.flatMap(index => trace[index])
    for (let index = 1; index < calls.length; index++) assert.deepEqual(endpoint(calls[index-1]), calls[index].args.slice(0,2), 'No invented connector or nonexact trajectory merge')
    const pieces = calls.map(originalPiece)
    if (pieces.length === 1) return pieces[0]
    assert(calls.every(call => call.kind === 'cdDrawLine'))
    return {
      outline: pieces.map(piece => piece.outline).join(' '),
      bounds: [Math.min(...pieces.map(piece=>piece.bounds[0])), Math.min(...pieces.map(piece=>piece.bounds[1])), Math.max(...pieces.map(piece=>piece.bounds[2])), Math.max(...pieces.map(piece=>piece.bounds[3]))],
      direction: 'curve',
      weight: Math.round(pieces.reduce((sum,piece)=>sum+piece.weight,0)*1e6)/1e6,
      revealPath: 'M' + calls[0].args[0]/2 + ' ' + calls[0].args[1]/2 + ' ' + calls.map(call => 'L'+call.args[2]/2+' '+call.args[3]/2).join(' '),
      revealWidth: 14,
    }
  }
  const outlines = sourceGroups.map(indices => {
    if (indices.length !== 2 || indices[0] !== 10 || indices[1] !== 11) return [compileExact(indices)]
    const certificateBytes = readFileSync(new URL('./vs2-source-boundary-analysis.json', import.meta.url))
    assert.equal(sha(certificateBytes), OVERLAP_CERTIFICATE_SHA256)
    const certificate = JSON.parse(certificateBytes)
    assert.equal(certificate.sourceProofFileSHA256, sourceProofFileSha256)
    assert.equal(certificate.filledOverlap.filledUnionIntersectionKAGE2, '4070939239/747556740')
    assert.equal(certificate.filledOverlap.positive, true)
    assert.deepEqual(trace[10][0].args, [89,125.497675,57,167.09605000000002,0,300])
    assert.deepEqual(trace[11][0].args, [67,158.776375,128,164.53615,165,184.375375,7,8])
    assert.equal(trace[10].length, 1); assert.equal(trace[11].length, 1)
    assert.equal(proof.groups[10].polygons.length, 2); assert.equal(proof.groups[11].polygons.length, 2)
    // Two independent intact original masks in the SAME pen; never connect the gap.
    return [compileExact([10]), compileExact([11])]
  })
  assert.equal(outlines.length, 12)
  assert.equal(outlines.flat().length, 13)
  assert.equal(outlines.flat().reduce((count,mask)=>count+(mask.outline.match(/M/g)?.length??0),0), 25)
  assert.equal(JSON.stringify(proof), before)
  return outlines
}
export const nativeApproval = false
export const nativeDirectionsReviewed = 0
export const nativeFramesReviewed = 0
export const nativeReplaysReviewed = 0
export const runtimeApplied = false
