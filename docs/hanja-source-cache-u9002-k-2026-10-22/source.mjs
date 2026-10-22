import assert from 'node:assert/strict';
import{readFileSync,existsSync}from'node:fs';
import{createHash}from'node:crypto';
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const IDENTITY={"root":"u9002-k","file":"../hanja-public-glyphwiki-engine-capture-u9002-k-2026-10-22/engine-whole-u9002-k.json","fileSHA256":"ff390745b4af39f1a802e9d3d79ae9dde50d845735cfad342525872c1f97930e"};
const EXPECTED_GROUPS=[[6],[7],[8],[9],[10,11],[12],[0],[1],[2,3],[4,5]];
const ORIGINAL_SOURCE_GROUPS=[[6],[7],[8],[9],[10,11],[12],[0],[1],[2,3],[4],[5]];
const LOGICAL_ATOMS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10]];
const RAW_COUNT=13;
const ORIGINAL=[[{"kind":"cdDrawCurve","args":[27,21,46,30,58,46,7,8]}],[{"kind":"cdDrawCurve","args":[16,57,35,65,49,81,7,8]}],[{"kind":"cdDrawLine","args":[14,107,50,107,0,2]}],[{"kind":"cdDrawLine","args":[50,107,50,158,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,168,55,154,0,7]}],[{"kind":"cdDrawBezier","args":[53,152,68,172,84,181,179,177,7,0]}],[{"kind":"cdDrawCurve","args":[166.465,21.59,125.095,35.955,68.95,41.87,0,7]}],[{"kind":"cdDrawLine","args":[66.98,68.91,185.18,68.91,0,0]}],[{"kind":"cdDrawLine","args":[126.08,33.42,126.08,103.555,32,32]}],[{"kind":"cdDrawLine","args":[88.65,103.555,88.65,145.805,12,13]}],[{"kind":"cdDrawLine","args":[88.65,103.555,163.51,103.555,2,2]}],[{"kind":"cdDrawLine","args":[163.51,103.555,163.51,145.805,22,23]}],[{"kind":"cdDrawLine","args":[88.65,145.805,163.51,145.805,2,2]}]];
const TRACE_SHA256="8e9062f14f43ce93d48b3a94b4c85ffafc6f767983936ee66997e284015d6610";
const GROUPS_SHA256="70338d2a932a225b5e8709e4d0c28752d7b8b5afd6d438e312cddd57aee396e6";
const PROOF_SHA256="a19cd502c9665cb77120bdcb4e887028658c8eba31a00c4eb0d6f233570dde75";
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5};
const ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f";
const ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"};
const UP_TAIL_GROUPS=[];
const LEFT_TAIL_GROUPS=[];
const SINGLE_CARDINAL_TIP_RAW=[9];
const INPUT_PINS=[{"path":"../hanja-public-glyphwiki-engine-capture-u9002-k-2026-10-22/engine-whole-u9002-k.json","sha256":"ff390745b4af39f1a802e9d3d79ae9dde50d845735cfad342525872c1f97930e"},{"path":"../hanja-source-raw-compare-u9002-k-2026-10-22/board-config.json","sha256":"4f0143b2ad6f7a9cecca2060ed40c3a386746bf8c2661bf37b45794f3f4ff21d"},{"path":"../hanja-source-raw-compare-u9002-k-2026-10-22/native-review.json","sha256":"882d694d1af08773bbdb2c88753a33c677a5354130170e55c72dc0051bbd608b"},{"path":"../hanja-goal-glyphwiki-batch203-2026-10-04/sources.json","sha256":"c04390b7bbae4983de03e3c5887e2fe149ecf67efdd0a33a233c3d7c4459301e"}];
const PROJECTOR_BODY_SHA="f58c62d83c662318ab347384c31cc6403342289cb96fe5523a003b0e2bc72038";
const FIXED_CACHE_SHA="943c190098a7a890935a9cdbf97ee59095c175f34b6bbc4a47df956fa2b9145e";
const sourceGroups=ORIGINAL_SOURCE_GROUPS,endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u9002-k',selectedProofIdentity=clone(IDENTITY),logicalSourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(trace);strictJSON(proof);strictJSON(identity);assert.deepEqual(identity,IDENTITY);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);for(const p of INPUT_PINS)assert.equal(sha(readFileSync(new URL(p.path,import.meta.url))),p.sha256,p.path);const raw=readFileSync(new URL(IDENTITY.file,import.meta.url));assert.equal(sha(raw),IDENTITY.fileSHA256);assert.deepEqual(JSON.parse(raw),proof);assert.equal(digest(proof),PROOF_SHA256);assert.deepEqual(trace,proof.trace);const e=JSON.parse(readFileSync(new URL(INPUT_PINS[2].path,import.meta.url)));assert.equal(e.glyph,'适');assert.equal(e.actualFull5SHA256,IDENTITY.fileSHA256);assert.deepEqual(e.provisionalGroupsOneBased,EXPECTED_GROUPS.map(g=>g.map(i=>i+1)));assert.equal(e.staticCorrespondenceReviewed,true);assert.equal(sha(compileBound.toString()),PROJECTOR_BODY_SHA);}
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

let projectionRuns=0,cachedCalls=0;
export function captureProjection(...args){
 assert.equal(args.length,3);assert(!existsSync(new URL('./source.json',import.meta.url)),'public cache exists; projection disabled');assert.equal(projectionRuns,0);validateSelectedProof(...args);projectionRuns++;
 const atoms=compileBound(...args),baselineStrokes=LOGICAL_ATOMS.map(a=>a.flatMap(i=>atoms[i]));assert.equal(atoms.length,11);assert.equal(baselineStrokes.length,10);assert.equal(baselineStrokes.flat().length,11);
 const v=args[1].trace[11][0];assert.equal(args[1].trace[11].length,1);assert.equal(v.kind,'cdDrawLine');assert.deepEqual(v.args,[163.51,103.555,163.51,145.805,22,23]);assert.equal(v.polygons.length,2);
 const quad=v.polygons[0];assert.deepEqual(quad,[{x:169.5,y:103.5,off:0},{x:169.5,y:153.8,off:0},{x:157.5,y:159.8,off:0},{x:157.5,y:103.5,off:0}]);const[A,B,C,D]=quad;assert.equal(A.x,B.x);assert.equal(C.x,D.x);assert.equal(A.y,D.y);assert(D.y<B.y&&B.y<C.y);
 const E={x:C.x,y:B.y,off:0},rectangle=[A,B,E,D],triangle=[B,C,E],sc=v=>{const[a,b='']=String(v).split('.'),n=BigInt(a+b),d=10n**BigInt(b.length);assert.equal(n*40n%d,0n);return n*40n/d},area2=P=>P.reduce((n,a,i)=>{const b=P[(i+1)%P.length];return n+sc(a.x)*sc(b.y)-sc(b.x)*sc(a.y)},0n);assert.equal(area2(rectangle)+area2(triangle),area2(quad));assert(area2(rectangle)>0n&&area2(triangle)>0n);
 const path=P=>{const a=P.reduce((n,p,i)=>{const q=P[(i+1)%P.length];return n+p.x*q.y-q.x*p.y},0),q=a<0?[P[0],...P.slice(1).reverse()]:P;return q.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z'},bounds=P=>[Math.min(...P.map(v=>v.x/2)),Math.min(...P.map(v=>v.y/2)),Math.max(...P.map(v=>v.x/2)),Math.max(...P.map(v=>v.y/2))];
 const strokes=clone(baselineStrokes),before=strokes[4][0];assert.equal(strokes[4].length,1);assert.equal(before.revealPath,'M44.325 51.7775 L81.755 51.7775 L81.755 72.9025');assert.equal(before.revealWidth,14);assert.equal(before.weight,58.555);assert.equal(before.outline,[...args[1].trace[10][0].polygons,...v.polygons].map(path).join(' '));
 const bodyPolygons=[...args[1].trace[10][0].polygons,rectangle,v.polygons[1]],body={...before,outline:bodyPolygons.map(path).join(' '),bounds:bounds(bodyPolygons.flat())},tail={outline:path(triangle),bounds:bounds(triangle),direction:'down',weight:(C.y-B.y)/2};assert.equal(tail.weight,3);strokes[4]=[body,tail];for(let i=0;i<10;i++)if(i!==4)assert.deepEqual(strokes[i],baselineStrokes[i]);
 const polys=s=>s.flat().flatMap(m=>m.outline.match(/M[^M]+/g).map(v=>v.trim())).sort(),emitted=polys(strokes),expected=polys(baselineStrokes);assert.equal(expected.length,23);assert.equal(expected.splice(expected.indexOf(path(quad)),1).length,1);expected.push(path(rectangle),path(triangle));assert.deepEqual(emitted,expected.sort());assert.equal(strokes.flat().length,12);assert.equal(emitted.length,24);
 return{schema:'hanja-fixed-source-cache/v1',root:sourceRoot,identity:clone(IDENTITY),sourceGroups:clone(EXPECTED_GROUPS),atomicSourceGroups:clone(ORIGINAL_SOURCE_GROUPS),strokes,baselineStrokes:clone(baselineStrokes),baselineGeometrySHA256:digest(baselineStrokes),geometrySHA256:digest(strokes),pureProjectorBodySHA256:PROJECTOR_BODY_SHA,preparation:{candidateBatch:1361,batchAssignmentProvisional:true,successfulPureProjectionOperations:1,internalPureCompileBoundCalls:1,originalCompilerCalls:0,existingCandidateFactoryCalls:0,engineRuns:0,newTerminalDerivations:1,originalQuadPartitionOperations:1},sourcePreservation:{original23PolygonUnionPreserved:true,originalPolygonCount:23,emittedFragmentCount:24,oneOriginalQuadPartitioned:true,other22OriginalPolygonsUnchanged:true,other9PensUnchanged:true,originalContourUnchanged:true,newExternalInk:false,originalCallFieldsUnchanged:true,originalBodyGuideWidthWeightPreserved:true,newGuideOrConnector:false,QB10:{rawOneBased:[5,6],independentMasks:true,endpointGapSourceUnits:[-2,-2],newConnector:false}},terminalPartition:{rawOneBased:12,originalArgs:clone(v.args),originalQuad:clone(quad),cutPoint:E,cutRule:'E=(original C.x,original B.y), original CD edge intersection',bodyRectangle:rectangle,tailTriangle:triangle,originalAreaRaw:'3198/5',bodyRectangleAreaRaw:'3018/5',tailTriangleAreaRaw:'36',bodyGuide:body.revealPath,bodyWidth:14,bodyWeight:58.555,tailWeight:3,logicalPenWeightBefore:58.555,logicalPenWeightAfter:61.555,bodyBoundsPolicy:'remaining original P after triangle partition;recomputed subset bounds',actualAppDurationIncreaseClaim:false,positiveOutsideWitnessDisplay:['7881/100','1996/25'],witnessSquaredDisplay:'9088309/160000',sourceRadiusSquaredDisplay:49,originalHMaxSquaredDisplay:'169021/160000',bodyRectMaxSquaredDisplay:'800321/32000',headJointDiscMaxSquaredDisplay:'199301/6400',wholeProjectionRepeated:0,newNativeApproval:false},staticMappingApproved:true,directionApproved:false,temporalOrderApproved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false};
}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);const bytes=readFileSync(new URL('./source.json',import.meta.url));assert.equal(sha(bytes),FIXED_CACHE_SHA);const c=JSON.parse(bytes);assert.deepEqual(c.identity,IDENTITY);assert.deepEqual(c.sourceGroups,EXPECTED_GROUPS);assert.equal(digest(c.strokes),c.geometrySHA256);cachedCalls++;return c.strokes;}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1));}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls;
