import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive as compileOriginal,sourceGroups as originalGroups,selectedProofIdentity as originalIdentity,renderProgressive} from './progressive.mjs'
export {renderProgressive}
const sha=v=>createHash('sha256').update(v).digest('hex')
const read=f=>readFileSync(new URL(f,import.meta.url))
export const sourceRoot='u568c'
export const sourceProofFile='engine-whole-u568c.json'
export const selectedProofIdentity=originalIdentity
export const originalSourceGroups=originalGroups
export const sourceGroups=Object.freeze([[0],[1,2],[3],[4],[5],[9],[8],[11],[6,7],[10],[12],[13,14],[15],[16],[18],[19],[17]].map(group=>Object.freeze(group)))
export const nativeApproval=false
export const runtimeApplied=false
export const approvalStatus='isolated-boundary-source-only; native activation unreviewed'
export const originalBaselineSHA256='c2b43f99ff53eee856559b838cc9b26c548bb4d3ac4ec650aba44be03992662c'
const ID=Object.freeze({sourceRoot:'u568c',sourceProofFile:'engine-whole-u568c.json',sourceProofFileSHA256:'693a1dd8860f2b88625e6bc3c93c613a6f755da63bd8a3e329181dfd2721ed3d'})
const PINS={"progressive.mjs":"0a8decfa453652a0647856413753154796798c23e2884d8f6f15653e245572e5","engine-proof.json":"0fb793d710713d24757c82f0ba9494beb5d025d43ceb10ede0a0dfd7ecc6535d","engine-whole-u568c.json":"693a1dd8860f2b88625e6bc3c93c613a6f755da63bd8a3e329181dfd2721ed3d","sources.json":"b7a2e0ee22f427f016efc1a5af9577e645e1d0be0206ab555953e494937e7f0f"}
const FULL5_SHA256='cef04b0489aded47ac3966fe03e8c5748b63659a42aedc963dfb1fd252fd0573'
const KEYS=['defaults','engineHashes','engineRevision','groups','trace']
let compileExecutions=0
export const sourceCompileExecutions=()=>compileExecutions
function validate(trace,proof,identity){
  assert.deepEqual(identity,ID,'Exact original identity3; case and filename prefix unchanged')
  for(const[f,h]of Object.entries(PINS))assert.equal(sha(read(f)),h,'Original source byte pin: '+f)
  assert.deepEqual(Object.keys(proof).sort(),KEYS,'Exact full5 header; no extra fields')
  assert.equal(sha(JSON.stringify(proof)),FULL5_SHA256,'Existing full3 whole plus fixed engine header2')
  assert.deepEqual(trace,proof.trace,'Trace identity')
  assert.equal(trace.length,20);assert.equal(proof.groups.length,20)
  assert.deepEqual([...sourceGroups.flat()].sort((a,b)=>a-b),Array.from({length:20},(_,i)=>i),'Every raw exactly once')
  for(let i=0;i<20;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  assert.equal(trace[12].length,1);assert.equal(trace[13].length,1);assert.equal(trace[14].length,1)
  assert.equal(trace[12][0].kind,'cdDrawCurve');assert.equal(trace[13][0].kind,'cdDrawLine');assert.equal(trace[14][0].kind,'cdDrawCurve')
}
export function compileProgressive(trace,proof,identity){
  assert.equal(arguments.length,3,'Exactly trace, full5 proof, identity3 are required')
  validate(trace,proof,identity)
  const before=JSON.stringify(proof)
  compileExecutions++
  const baseline=compileOriginal(trace,proof,identity)
  assert.equal(sha(JSON.stringify(baseline)),originalBaselineSHA256,'Exact existing numerical baseline')
  assert.equal(baseline.length,17);assert.equal(baseline[10].length,1);assert.equal(baseline[11].length,1)
  const segment = (polygons, direction, weight) => {
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
      outline: normalized.map(polygon => polygon.map((value, index) => `${index ? 'L' : 'M'}${value.x / 2} ${value.y / 2}`).join(' ') + ' Z').join(' '),
      bounds: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)],
      direction,
      weight: Math.round(weight * 1e6) / 1e6,
    }
  }

  const originalPrimitiveMask = call => {
      const args = call.args
      if (call.kind === 'cdDrawBezier') return {
        ...segment(call.polygons, 'curve', Math.hypot(args[6] - args[0], args[7] - args[1]) / 2),
        revealPath: `M${args[0] / 2} ${args[1] / 2} C${args[2] / 2} ${args[3] / 2} ${args[4] / 2} ${args[5] / 2} ${args[6] / 2} ${args[7] / 2}`,
        revealWidth: 14,
      }
      if (call.kind === 'cdDrawCurve') return {
        ...segment(call.polygons, 'curve', Math.hypot(args[4] - args[0], args[5] - args[1]) / 2),
        revealPath: `M${args[0] / 2} ${args[1] / 2} Q${args[2] / 2} ${args[3] / 2} ${args[4] / 2} ${args[5] / 2}`,
        revealWidth: 14,
      }
      const piece = segment(call.polygons, args[0] === args[2] ? (args[3] > args[1] ? 'down' : 'up') : args[1] === args[3] ? (args[2] > args[0] ? 'right' : 'left') : 'curve', Math.hypot(args[2] - args[0], args[3] - args[1]) / 2)
      return piece.direction === 'curve' ? { ...piece, revealPath: `M${args[0] / 2} ${args[1] / 2} L${args[2] / 2} ${args[3] / 2}`, revealWidth: 14 } : piece
  }
  // Explicitly materialize only original primitive masks already used to form old pen11.
  const upperQ=originalPrimitiveMask(trace[12][0])
  const vertical=originalPrimitiveMask(trace[13][0])
  const rise=baseline[11][0]
  assert.equal(baseline[10][0].outline,upperQ.outline+' '+vertical.outline,'Old compound preserves the same two original outlines')
  assert.deepEqual(baseline[10][0].bounds,[Math.min(upperQ.bounds[0],vertical.bounds[0]),Math.min(upperQ.bounds[1],vertical.bounds[1]),Math.max(upperQ.bounds[2],vertical.bounds[2]),Math.max(upperQ.bounds[3],vertical.bounds[3])])
  assert.equal(baseline[10][0].weight,Math.round((upperQ.weight+vertical.weight)*1e6)/1e6)
  assert.equal(upperQ.revealWidth,14);assert.equal(vertical.direction,'down')
  assert.equal(rise.revealWidth,14)
  // Never join the V endpoint to the separated Q start. Retain two independent mask objects.
  const out=[baseline[0],baseline[1],baseline[2],baseline[3],baseline[4],baseline[7],baseline[6],baseline[9],baseline[5],baseline[8],[upperQ],[vertical,rise],baseline[12],baseline[13],baseline[15],baseline[16],baseline[14]]
  assert.equal(out[10][0],upperQ);assert.equal(out[11][0],vertical);assert.equal(out[11][1],baseline[11][0])
  assert.equal(out.length,17);assert.equal(out.flat().length,19)
  assert.equal(JSON.stringify(proof),before,'No original trace, polygon, style, width or coordinates changed')
  return out
}
export function compileSourceWhole(root,trace,proof,identity){
  assert.equal(arguments.length,4,'Exactly root, trace, full5 proof, identity3 are required')
  assert.equal(root,sourceRoot,'Only fixed base u568c')
  return compileProgressive(trace,proof,identity)
}
