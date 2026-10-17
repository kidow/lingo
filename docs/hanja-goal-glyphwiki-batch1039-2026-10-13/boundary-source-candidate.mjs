import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './strict-source-candidate.mjs'
export {renderProgressive,selectedProofIdentity,sourceRoot} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const originalSourceGroups=Object.freeze(original.sourceGroups.map(g=>Object.freeze([...g])))
export const sourceGroups=Object.freeze([[0,1],[2],[3,4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14]].map(g=>Object.freeze(g)))
const ORIGINAL_SHA="c2a3f39dfea9844a00c8d61c3044eec6d53314e61cfea5754ec8085d7fa306d7",PEN_SHA=["57b9db4a9c3e0b059b3a8f0260292b8d86f0070aa569651a11da7e25cdfe515a","450459002810cb9de94f57b0d244390b60c3a32ffe20d1410ada94a83abc0e79","71e4fe32c373feee9e82864b1559ee4cb157f19e641e899d7d91c612b0df3692","e19ebf1013fa4aae4d36259b28c7fba5019af47ba624eeecb4a4ff329fe66ca0","94007a4622152491c4551719f66e13657394679ef5c521f3630a012a14b5dc08","159c63e1bd7fd79b5bcadb65a550981962547d388808a50986ceb196a90cdaef","741a1fcdf86aed1a55e48af33034ead46ace904c351a201d1868924927b6ecd2","c83a6b260bff39bf063964c52f6a4667fb38e817285dd555941426a093c1f065","27d81456a96319bf4ed5a032c4d57365f31d83afdbf88e5a6dd743f82781510b","446dea2be3e0463699e5547564ca972677e56c0bed0a39db0ca5be1983f4d049","8ec7a5196663fbe3a4e0432ad539a2f7309d58360e0e45ae1cd07495c94003b5","da84e3784940d4e70e82c35d5e979761a2992dfe16809d1f3e1a6e0cae930165"]
function pins(){const p=JSON.parse(read('boundary-source-preparation.json'));for(const[f,h]of Object.entries(p.inputSHA256))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.identity,original.selectedProofIdentity);assert.deepEqual(p.originalSourceGroups,originalSourceGroups);assert.deepEqual(p.sourceGroups,sourceGroups)}
function originalPrimitiveMask(call){
  const consumedPolygons=new Set()
  const segment = (polygons, direction, weight) => {
    for (const polygon of polygons) { assert(!consumedPolygons.has(polygon), 'An original polygon cannot be emitted twice'); consumedPolygons.add(polygon) }
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

  const args=call.args
  if(call.kind==='cdDrawCurve')return {...segment(call.polygons,'curve',Math.hypot(args[4]-args[0],args[5]-args[1])/2),revealPath:`M${args[0]/2} ${args[1]/2} Q${args[2]/2} ${args[3]/2} ${args[4]/2} ${args[5]/2}`,revealWidth:14}
  assert.equal(call.kind,'cdDrawLine')
  const piece=segment(call.polygons,args[0]===args[2]?(args[3]>args[1]?'down':'up'):args[1]===args[3]?(args[2]>args[0]?'right':'left'):'curve',Math.hypot(args[2]-args[0],args[3]-args[1])/2)
  return piece.direction==='curve'?{...piece,revealPath:`M${args[0]/2} ${args[1]/2} L${args[2]/2} ${args[3]/2}`,revealWidth:14}:piece
}

export function compileProgressive(trace,proof,identity){
  assert.equal(arguments.length,3,'Exactly three explicit arguments required');pins();assert.deepEqual(identity,original.selectedProofIdentity);assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","sourceProofFile","sourceProofFileSHA256","sourceRoot","trace"]);assert.equal(sha(JSON.stringify(proof)),"3ab3258a839c3f6521bacd242ca98345f678d111fb9a31f582df72b4e817c48e");assert.deepEqual(trace,proof.trace)
  const before=JSON.stringify(proof),baseline=original.compileSourceWhole(original.sourceRoot,trace,proof,identity)
  assert.equal(sha(JSON.stringify(baseline)),ORIGINAL_SHA);assert.deepEqual(baseline.map(p=>sha(JSON.stringify(p))),PEN_SHA);assert.deepEqual(originalSourceGroups,[[0],[1],[3,2,4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14]]);assert.equal(baseline.length,12);assert.equal(baseline.flat().length,12)
  assert.equal(trace[2].length,1);assert.equal(trace[2][0].kind,'cdDrawCurve');assert.equal(trace[3].length,1);assert.equal(trace[3][0].kind,'cdDrawLine');assert.equal(trace[4].length,0);assert.equal(proof.groups[4].polygons.length,0)
  const out=[[...baseline[0],...baseline[1]],[originalPrimitiveMask(trace[2][0])],[originalPrimitiveMask(trace[3][0])],...baseline.slice(3)]
  assert.strictEqual(out[0][0],baseline[0][0]);assert.strictEqual(out[0][1],baseline[1][0]);for(let i=3;i<out.length;i++)assert.strictEqual(out[i],baseline[i]);assert.equal(sha(JSON.stringify(baseline)),ORIGINAL_SHA,'Original baseline objects remain unmodified')
  assert.deepEqual(out[0].map(p=>p.revealWidth),[14,14]);assert.equal(out[1][0].revealWidth,14);assert.equal(out[2][0].direction,'right');assert.equal(out[2][0].revealPath,undefined)
  assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:15},(_,i)=>i));assert.equal(out.length,12);assert.equal(out.flat().length,13);assert.equal(JSON.stringify(proof),before)
  return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,original.sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
