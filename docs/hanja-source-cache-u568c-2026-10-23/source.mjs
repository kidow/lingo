import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const CONFIG_SHA='942da0ff15f1ce584628edac02d9d550e7426fda0407a9436a7b40c134352e10',FIXED_CACHE_SHA='fd3319d9ac2f941e9ef51a5a505c6d3e72b90788c92f9493ae1dc69ac6423d55';
const config=JSON.parse(readFileSync(new URL('./config.json',import.meta.url)));
const IDENTITY=config.identity,CORRECTED_GROUPS=config.sourceGroups,ORIGINAL_SOURCE_GROUPS=config.baselineGroups,sourceGroups=ORIGINAL_SOURCE_GROUPS,RAW_COUNT=config.rawCount,CATALOG_COUNT=config.logicalPens,NON_DRAWING_SOURCE_ROWS=[],ORIGINAL=config.rawCalls,TRACE_SHA256=config.traceSHA256,GROUPS_SHA256=config.groupsSHA256,WHOLE_PAYLOAD_SHA256=config.fullProofJSONSHA256,PINNED_DEFAULTS=config.defaults,ENGINE_REVISION=config.engineRevision,ENGINE_HASHES=config.engineHashes;
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[[6,7]],SINGLE_CARDINAL_TIP_RAW=[0];
const originalBaselineSHA256='c2b43f99ff53eee856559b838cc9b26c548bb4d3ac4ec650aba44be03992662c';
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8);
const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
export const sourceRoot=config.root,selectedProofIdentity=Object.freeze(IDENTITY),nativeApproval=false,runtimeApplied=false;
export {CORRECTED_GROUPS as sourceGroups};
let projectionRuns=0,baselinePureCalls=0,boundaryPureCalls=0,cachedCalls=0;
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}

function validateSelectedProof(trace,proof,identity){
 assert.equal(arguments.length,3);strictJSON(trace);strictJSON(proof);strictJSON(identity);
 assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),CONFIG_SHA);
 assert.deepEqual(identity,IDENTITY);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);
 for(const[p,h]of Object.entries(config.inputSHA256))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);
 const bytes=readFileSync(new URL(IDENTITY.file,import.meta.url));assert.equal(sha(bytes),IDENTITY.fileSHA256);assert.deepEqual(JSON.parse(bytes),proof);
 const original=JSON.parse(readFileSync(new URL(config.originalBody3.path,import.meta.url)));assert.deepEqual(Object.keys(original).sort(),['defaults','groups','trace']);for(const k of ['groups','trace','defaults'])assert.deepEqual(original[k],proof[k]);
 assert.equal(digest(proof),WHOLE_PAYLOAD_SHA256);assert.deepEqual(trace,proof.trace);
 const e=JSON.parse(readFileSync(new URL(config.staticCorrespondence.path,import.meta.url)));assert.equal(e.glyph,'嚌');assert.equal(e.staticCorrespondenceApproved,true);assert.equal(e.provisionalMappingNativeApproved,true);assert.equal(e.sourceGroupsApproved,false);assert.deepEqual(e.confirmedGroupsOneBased,CORRECTED_GROUPS.map(g=>g.map(i=>i+1)));
 const official=JSON.parse(readFileSync(new URL(config.officialMacro.path,import.meta.url)));assert.equal(official.glyph,'嚌');assert.equal(official.native.officialMacroDirectionsApproved,true);assert.equal(official.native.validScreens,51);assert.equal(official.scope.contactApproved,false);assert.equal(official.scope.internalClockEquivalence,false);
 assert.equal(sha(compileOriginalBound.toString()),config.baselinePureBodySHA256);assert.equal(sha(projectBoundaryBound.toString()),config.boundaryPureBodySHA256);
}
function validateSelectedIdentity(proof,identity){validateSelectedProof(proof.trace,proof,identity)}
function validateBoundary(trace,proof,identity){validateSelectedProof(trace,proof,identity);assert.equal(trace.length,20);assert.equal(proof.groups.length,20);assert.deepEqual(CORRECTED_GROUPS.flat().slice().sort((a,b)=>a-b),Array.from({length:20},(_,i)=>i));assert.equal(trace[12][0].kind,'cdDrawCurve');assert.equal(trace[13][0].kind,'cdDrawLine');assert.equal(trace[14][0].kind,'cdDrawCurve');}
function compileOriginalBound(trace, proof, identity) {
  validateSelectedIdentity(proof,identity)
  assert.deepEqual(sourceGroups, ORIGINAL_SOURCE_GROUPS, "Pinned numeric source grouping; no native order approval")
  assert.equal(trace.length, RAW_COUNT)
  assert.equal(proof.groups.length, RAW_COUNT)
  assert.deepEqual(trace,proof.trace,'Selected complete whole trace must match, including empty metadata')
  assert.deepEqual(trace.map(row => row.map(call => ({ kind: call.kind, args: call.args }))), ORIGINAL)
  assert.equal(digest(trace), TRACE_SHA256, 'Every original trajectory and polygon must match the selected whole root')
  assert.equal(digest(proof.groups), GROUPS_SHA256)
  assert.deepEqual(proof.defaults, PINNED_DEFAULTS)
  assert.equal(proof.engineRevision, ENGINE_REVISION)
  assert.deepEqual(proof.engineHashes, ENGINE_HASHES)
  assert.equal(digest({engineRevision:proof.engineRevision,engineHashes:proof.engineHashes,groups:proof.groups,trace,defaults:proof.defaults}),WHOLE_PAYLOAD_SHA256,'The entire selected original body must match')
  const rawIndices = sourceGroups.flat()
  assert.deepEqual([...rawIndices].sort((a, b) => a - b), Array.from({ length: RAW_COUNT }, (_, index) => index).filter(index=>!NON_DRAWING_SOURCE_ROWS.some(row=>row.raw===index)), 'Every drawing raw group must occur exactly once; empty metadata remains in the whole proof')
  for(const row of NON_DRAWING_SOURCE_ROWS){assert.deepEqual(trace[row.raw],[]);assert.deepEqual(proof.groups[row.raw].polygons,[]);assert.deepEqual(proof.groups[row.raw].raw,row.originalRaw)}
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
  assert.equal(outlines.length,CATALOG_COUNT,'Numerical candidate count only; no domestic approval')
  return outlines
}
function projectBoundaryBound(trace,proof,identity){
  assert.equal(arguments.length,3,'Exactly trace, full5 proof, identity3 are required')
  validateBoundary(trace,proof,identity)
  const before=JSON.stringify(proof)
  boundaryPureCalls++
  const baseline=compileOriginalBound(trace,proof,identity)
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
  const corrected=out.slice();[corrected[6],corrected[9]]=[out[9],out[6]]
  for(let i=0;i<17;i++)if(i!==6&&i!==9)assert.equal(corrected[i],out[i],'Only corrected logical rows7/10 reorder')
  return {strokes:corrected,legacyStrokes:out}
}

function canonicalPolygon(points){const a=points.map(p=>Array.isArray(p)?p:[p.x/2,p.y/2]),keys=[];for(const q of[a,a.slice().reverse()])for(let i=0;i<q.length;i++)keys.push(JSON.stringify(q.slice(i).concat(q.slice(0,i))));return keys.sort()[0]}
function originalPolygonKeys(proof){return proof.groups.flatMap(g=>g.polygons).map(canonicalPolygon).sort()}
function emittedPolygonKeys(strokes){return strokes.flatMap(p=>p.flatMap(m=>m.outline.match(/M[^Z]+Z/g).map(raw=>{const n=raw.match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi).map(Number),points=[];for(let i=0;i<n.length;i+=2)points.push([n[i],n[i+1]]);return canonicalPolygon(points)}))).sort()}
export function captureProjection(...args){
 assert.equal(args.length,3);assert(!existsSync(new URL('./fixture.json',import.meta.url)),'fixed cache exists; projection disabled');assert.equal(projectionRuns,0);validateSelectedProof(...args);
 projectionRuns++;baselinePureCalls++;const {strokes,legacyStrokes}=projectBoundaryBound(...args),proof=args[1];
 assert.equal(strokes.length,17);assert.equal(strokes.flat().length,19);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)?.length??0),0),39);
 assert.deepEqual(emittedPolygonKeys(strokes),originalPolygonKeys(proof),'Exact original39 polygons once, with orientation/cyclic-order normalization only');
 for(let i=0;i<17;i++)assert.deepEqual(strokes[i],legacyStrokes[i===6?9:i===9?6:i],'Only7/10 permutation; every original mask field unchanged');
 assert.equal(strokes[11].length,2);assert.equal(strokes[11][0].direction,'down');assert.equal(strokes[11][0].revealPath,undefined);assert.equal(strokes[11][1].revealPath,'M67.39500000000001 49.1 Q75.8475 46.325 84.3 42.625');assert.equal(strokes[11][1].revealWidth,14);assert.equal(strokes[8].length,2);assert.equal(strokes[8][1].direction,'left');
 assert.equal(baselinePureCalls,1);assert.equal(boundaryPureCalls,1);
 return{schema:'hanja-fixed-source-cache/v1',root:sourceRoot,identity:clone(IDENTITY),sourceGroups:clone(CORRECTED_GROUPS),strokes,geometrySHA256:digest(strokes),baselinePureBodySHA256:config.baselinePureBodySHA256,boundaryPureBodySHA256:config.boundaryPureBodySHA256,legacyWrongMappingGeometrySHA256:digest(legacyStrokes),maskFieldSHA256:strokes.map(p=>p.map(digest)),preparation:{successfulPureProjectionOperations:1,copiedBaselinePureBodyCalls:1,copiedBoundaryPureBodyCalls:1,originalCompilerModuleCalls:0,engineRuns:0},sourcePreservation:{original39PolygonsExactlyOnce:true,all20RawExactlyOnce:true,onlyRows7And10Reordered:true,everyMaskGuideWidthWeightUnchanged:true,pen12VAndRiseIndependent:true,pen9OriginalLEFT414PartitionPreserved:true,newConnector:false,newGuide:false,originalTraceAndFlagsPinned:true},staticMappingApproved:true,officialMacroEvidence:clone(config.officialMacro),sourceGroupsApproved:false,contactApproved:false,microClockApproved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false};
}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);const bytes=readFileSync(new URL('./fixture.json',import.meta.url));assert.equal(sha(bytes),FIXED_CACHE_SHA);const c=JSON.parse(bytes);assert.deepEqual(c.identity,IDENTITY);assert.deepEqual(c.sourceGroups,CORRECTED_GROUPS);assert.equal(digest(c.strokes),c.geometrySHA256);cachedCalls++;return c.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls;

