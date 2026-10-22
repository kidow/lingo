import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const SOURCE=new URL('../hanja-goal-glyphwiki-batch898-2026-10-13/engine-whole-u928d.json',import.meta.url),CACHE=new URL('./source14.json',import.meta.url);
const SOURCE_SHA='87cb68cf1f9cb210b49bcaece7c9eb7e5b3f9d56b528c9c331d1b76a4530bd71',SOURCE_CANONICAL_SHA='68d22301b73db0afbf9af8855bb80305c6d517766eebcb6da2b3ad46cb8e40e8',CACHE_SHA='4ed92c8c1d97f4ce83138d0bea74b7c88d6b64b1989500eb58784031df0d0595';
const ID={"sourceRoot":"u928d","sourceProofFile":"engine-whole-u928d.json","sourceProofFileSha256":"87cb68cf1f9cb210b49bcaece7c9eb7e5b3f9d56b528c9c331d1b76a4530bd71"},LOGICAL_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14]];
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}

function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(trace);strictJSON(proof);strictJSON(identity);assert.deepEqual(identity,ID);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),SOURCE_CANONICAL_SHA);assert.deepEqual(trace,proof.trace);}
const RAW_COUNT=15,ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14]],sourceGroups=ORIGINAL_SOURCE_GROUPS,ORIGINAL=[[{"kind":"cdDrawCurve","args":[53.15,15,39.95,58,12.725,92,0,7]}],[{"kind":"cdDrawCurve","args":[52.325,27,72.95,38,81.2,54,7,8]}],[{"kind":"cdDrawLine","args":[33.35,71,80.375,71,0,100]}],[{"kind":"cdDrawLine","args":[18.5,103,85.325,103,0,0]}],[{"kind":"cdDrawLine","args":[52.325,71,52.325,164,32,32]}],[{"kind":"cdDrawCurve","args":[20.15,120,33.35,134,35,154,7,8]}],[{"kind":"cdDrawCurve","args":[77.075,119,71.3,135,62.225,151,0,7]}],[{"kind":"cdDrawCurve","args":[16.85,177,50.675,169,83.675,157,0,7]}],[{"kind":"cdDrawLine","args":[91.26,33,185.34,33,0,0]}],[{"kind":"cdDrawCurve","args":[129.48000000000002,35,121.64,59,104,90,0,7]}],[{"kind":"cdDrawCurve","args":[91.26,93,126.54,86,168.68,77,0,7]}],[{"kind":"cdDrawCurve","args":[150.06,50,170.64,71,177.5,96,7,8]}],[{"kind":"cdDrawLine","args":[93.22,133,178.48,133,0,0]}],[{"kind":"cdDrawLine","args":[133.4,99,133.4,179,0,32]}],[{"kind":"cdDrawLine","args":[75.58,179,188.28,179,0,0]}]],TRACE_SHA256='c0f527b31db75b4fc177e81eef9c12872375145f07ca8e009f9e824571289483',GROUPS_SHA256='88920dc49c302b327f35ba072224a154feb306d7377a4fc61e15730d1abc7654',PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
// Exact 8066-byte pure projector function from pinned candidate 6723637c...18cb; no old factory/engine invocation.
function compileBound(trace, proof, identity) {
  validateSelectedProof(trace, proof, identity)
  assert.deepEqual(sourceGroups, ORIGINAL_SOURCE_GROUPS, "Pinned numeric source grouping; no native order approval")
  assert.equal(trace.length, RAW_COUNT)
  assert.equal(proof.groups.length, RAW_COUNT)
  assert.deepEqual(trace.map(row => row.map(call => ({ kind: call.kind, args: call.args }))), ORIGINAL)
  assert.equal(digest(trace), TRACE_SHA256, 'Every original trajectory and polygon must match the selected whole root')
  assert.equal(digest(proof.groups), GROUPS_SHA256)
  assert.deepEqual(proof.defaults, PINNED_DEFAULTS)
  assert.equal(proof.engineRevision, ENGINE_REVISION)
  assert.deepEqual(proof.engineHashes, ENGINE_HASHES)
  const rawIndices = sourceGroups.flat()
  assert.deepEqual([...rawIndices].sort((a, b) => a - b), Array.from({ length: RAW_COUNT }, (_, index) => index), 'Every original raw group must occur exactly once')
  for (let index = 0; index < trace.length; index++) {
    assert.deepEqual(trace[index].flatMap(call => call.polygons), proof.groups[index].polygons)
  }
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
  // The tail is an existing emitted polygon. Its extra directional mask adds no geometry or connector.
  const terminalUpTail = (indices) => {
    const terminal = trace[indices.at(-1)].at(-1)
    assert.equal(terminal.kind, 'cdDrawLine')
    const [x1, y1, x2, y2, ta1, ta2] = terminal.args
    assert.equal(y1, y2); assert(x1 < x2)
    assert.equal(ta1 % 1000, 6); assert.equal(ta2 % 100, 5)
    const opt1 = Math.floor(ta1 / 1000)
    const width = proof.defaults.kMinWidthT - opt1 / 2
    const jump = proof.defaults.kWidth * (4 * (1 - opt1 / proof.defaults.kAdjustMageStep) + 1)
    assert(width > 0 && jump > 0)
    const polygon = [point(x2, y2 - width), point(x2 + 2, y2 - width - jump), point(x2, y2 - width - jump), point(x2 - width, y2 - width)]
    assert.deepEqual(terminal.polygons.at(-1), polygon, 'Pinned original terminal5 upward-tail polygon identity')
    return { polygon, jump, direction: 'up' }
  }
  const terminalLeftTail = (indices) => {
    const terminal = trace[indices.at(-1)].at(-1)
    assert.equal(terminal.kind, 'cdDrawCurve')
    const [x1, y1, cx, cy, x2, y2, ta1, ta2] = terminal.args
    assert.equal(cy, y2); assert(cx > x2)
    assert.equal(ta2 % 100, 14)
    const opt1 = Math.floor(ta1 / 1000), opt2 = Math.floor((ta2 % 1000) / 100)
    const width = proof.defaults.kMinWidthT - opt1 / 2
    const jump = proof.defaults.kWidth * 4 * Math.min(1 - opt2 / 10, (width / proof.defaults.kMinWidthT) ** 3) * (width > 6 ? 6 / width : 1)
    assert(width > 0 && jump > 0)
    const polygon = [point(x2, y2), point(x2, y2 - width), point(x2 - jump, y2 - width), point(x2 - jump, y2 - width * 0.5)]
    assert.deepEqual(terminal.polygons.at(-1), polygon, 'Pinned original terminal14 left-tail polygon identity')
    return { polygon, jump, direction: 'left' }
  }
  const tails = new Map()
  for (const indices of UP_TAIL_GROUPS) tails.set(JSON.stringify(indices), terminalUpTail(indices))
  for (const indices of LEFT_TAIL_GROUPS) tails.set(JSON.stringify(indices), terminalLeftTail(indices))
  const compile = (indices, tail) => {
    const calls = indices.flatMap(index => trace[index]).map(call => ({ ...call, polygons: [...call.polygons] }))
    if (tail) assert.deepEqual(calls.at(-1).polygons.pop(), tail.polygon)
    for (let index = 1; index < calls.length; index++) {
      assert.deepEqual(endpoint(calls[index - 1]), calls[index].args.slice(0, 2), 'Merged original trajectories must be exactly continuous; no invented connectors')
    }
    const pieces = calls.map(call => {
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
    })
    if (pieces.length === 1) return pieces[0]
    const first = calls[0].args
    return {
      outline: pieces.map(piece => piece.outline).join(' '),
      bounds: [Math.min(...pieces.map(piece => piece.bounds[0])), Math.min(...pieces.map(piece => piece.bounds[1])), Math.max(...pieces.map(piece => piece.bounds[2])), Math.max(...pieces.map(piece => piece.bounds[3]))],
      direction: 'curve',
      weight: Math.round(pieces.reduce((sum, piece) => sum + piece.weight, 0) * 1e6) / 1e6,
      revealPath: `M${first[0] / 2} ${first[1] / 2} ${calls.map(call => { const args = call.args; return call.kind === 'cdDrawLine' ? `L${args[2] / 2} ${args[3] / 2}` : call.kind === 'cdDrawBezier' ? `C${args[2] / 2} ${args[3] / 2} ${args[4] / 2} ${args[5] / 2} ${args[6] / 2} ${args[7] / 2}` : `Q${args[2] / 2} ${args[3] / 2} ${args[4] / 2} ${args[5] / 2}` }).join(' ')}`,
      revealWidth: 14,
    }
  }
  const outlines = sourceGroups.map(indices => {
    const tail = tails.get(JSON.stringify(indices))
    return tail ? [compile(indices, tail), segment([tail.polygon], tail.direction, tail.jump / 2)] : [compile(indices)]
  })
  const emittedPolygonCount = outlines.flat().reduce((sum, mask) => sum + (mask.outline.match(/M/g)?.length ?? 0), 0)
  assert.equal(emittedPolygonCount, trace.flatMap(calls => calls.flatMap(call => call.polygons)).length, 'Every original polygon must be emitted in exactly one mask')

  // Terminal13 is one original emitted polygon, not a separate authored tip.
  // Keep its full original bounds in a cardinal down mask; do not invent a curve connector or split geometry.
  for (const raw of SINGLE_CARDINAL_TIP_RAW) {
    const index = sourceGroups.findIndex(indices => indices.length === 1 && indices[0] === raw);
    assert(index >= 0);
    const call = trace[raw][0];
    assert.equal(trace[raw].length, 1);
    assert.equal(call.kind, 'cdDrawLine');
    assert.equal(call.args[0], call.args[2]);
    assert(call.args[3] > call.args[1]);
    assert.equal(call.args.at(-1) % 100, 13);
    assert.equal(call.polygons.length, 1);
    assert.equal(outlines[index].length, 1);
    assert.equal(outlines[index][0].direction, 'down');
    assert.equal(outlines[index][0].revealPath, undefined);
    const points = call.polygons.flat();
    assert.deepEqual(outlines[index][0].bounds, [Math.min(...points.map(p => p.x / 2)), Math.min(...points.map(p => p.y / 2)), Math.max(...points.map(p => p.x / 2)), Math.max(...points.map(p => p.y / 2))]);
  }
  return outlines
}
let rawProjectionRuns=0,cachedCalls=0;
function fixedProof(){const b=readFileSync(SOURCE);assert.equal(sha(b),SOURCE_SHA);return JSON.parse(b);}
export function cachedStrokes(proof,identity){assert.equal(arguments.length,2);validateSelectedProof(proof.trace,proof,identity);assert(/^[0-9a-f]{64}$/.test(CACHE_SHA));const b=readFileSync(CACHE);assert.equal(sha(b),CACHE_SHA);const f=JSON.parse(b);assert.equal(f.geometrySHA256,digest(f.strokes));cachedCalls++;return clone(f.strokes);}
export function counters(){return{newInternalRawProjectorExecutions:rawProjectionRuns,cachedPositiveCalls:cachedCalls,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0}}
function capture(){assert(!existsSync(CACHE),'public cache already exists; projection disabled');assert.equal(rawProjectionRuns,0);const proof=fixedProof();validateSelectedProof(proof.trace,proof,ID);rawProjectionRuns++;const rawBaseline=compileBound(proof.trace,proof,ID),strokes=LOGICAL_GROUPS.map(g=>g.flatMap(i=>rawBaseline[i]));return{schema:'u928d-independent-14logical-source/v1',glyph:'銍',root:'u928d',sourceFile:'docs/hanja-goal-glyphwiki-batch898-2026-10-13/engine-whole-u928d.json',sourceFileSHA256:SOURCE_SHA,sourceIdentity:ID,sourceGroups:LOGICAL_GROUPS,rawBaseline,strokes,geometrySHA256:digest(strokes),counts:{pens:strokes.length,masks:strokes.flat().length,polygons:strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)?.length||0),0)},preparationHistory:{newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,raw10And11IndependentMasks:true,sourceGuideChanged:false,sourcePolygonChanged:false,staticMappingOnly:true,nativeApproval:false,actualAppUI:false,runtimeApplied:false},revealPolicy:'raw11 guide remains original. Separate source-bound foot triangulation is an isolated policy candidate, not encoded into glyph geometry or approved by this source cache.'};}
function check(){const proof=fixedProof(),strokes=cachedStrokes(proof,ID),f=JSON.parse(readFileSync(CACHE));assert.deepEqual(f.sourceGroups,LOGICAL_GROUPS);assert.deepEqual(f.counts,{pens:14,masks:15,polygons:34});assert.equal(f.rawBaseline.length,15);assert.equal(strokes[9].length,2);assert.deepEqual(strokes,LOGICAL_GROUPS.map(g=>g.flatMap(i=>f.rawBaseline[i])));for(let i=0;i<15;i++){const points=proof.groups[i].polygons.flat(),mask=f.rawBaseline[i][0];assert.equal(f.rawBaseline[i].length,1);assert.deepEqual(mask.bounds,[Math.min(...points.map(p=>p.x/2)),Math.min(...points.map(p=>p.y/2)),Math.max(...points.map(p=>p.x/2)),Math.max(...points.map(p=>p.y/2))]);assert.equal((mask.outline.match(/M/g)||[]).length,proof.groups[i].polygons.length);}for(const i of [9,10]){const a=proof.groups[i].raw;assert.equal(f.rawBaseline[i][0].revealPath,'M'+a[3]/2+' '+a[4]/2+' Q'+a[5]/2+' '+a[6]/2+' '+a[7]/2+' '+a[8]/2);assert.equal(f.rawBaseline[i][0].revealWidth,14);}const badID={...ID,sourceRoot:'u928d-ue0100'};assert.throws(()=>validateSelectedProof(proof.trace,proof,badID));const bad=clone(proof);bad.trace[10][0].args[0]+=1;assert.throws(()=>validateSelectedProof(bad.trace,bad,ID));const missing=clone(proof);delete missing.defaults;assert.throws(()=>validateSelectedProof(missing.trace,missing,ID));assert.throws(()=>cachedStrokes(proof,ID,0));assert.equal(rawProjectionRuns,0);return{cachedSourceFirstPass:true,pens:14,masks:15,polygons:34,boundsOriginal15:true,independentPair:true,negativeCases:4,...counters()};}
if(process.argv[2]==='--capture-once')process.stdout.write(JSON.stringify(capture(),null,2)+'\n');else if(process.argv[2]==='--check-cached')console.log(JSON.stringify(check()));
