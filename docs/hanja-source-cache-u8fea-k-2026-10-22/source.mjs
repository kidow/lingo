import assert from 'node:assert/strict';
import{readFileSync,existsSync}from'node:fs';
import{createHash}from'node:crypto';
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const IDENTITY={"root":"u8fea-k","file":"../hanja-public-glyphwiki-engine-capture-u8fea-k-2026-10-22/engine-whole-u8fea-k.json","fileSHA256":"e35bcc0a2a9ce973de3a1f11e8c38a1dd074b93cfe1599aeeb125067cd59c7ba"},EXPECTED_GROUPS=[[6],[7,8],[9],[10],[11],[0],[1],[2,3],[4,5]],ORIGINAL_SOURCE_GROUPS=[[6],[7,8],[9],[10],[11],[0],[1],[2,3],[4],[5]],LOGICAL_ATOMS=[[0],[1],[2],[3],[4],[5],[6],[7],[8,9]],sourceGroups=ORIGINAL_SOURCE_GROUPS;
const RAW_COUNT=12,ORIGINAL=[[{"kind":"cdDrawCurve","args":[27,21,46,30,58,46,7,8]}],[{"kind":"cdDrawCurve","args":[16,57,35,65,49,81,7,8]}],[{"kind":"cdDrawLine","args":[14,107,50,107,0,2]}],[{"kind":"cdDrawLine","args":[50,107,50,158,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,168,55,154,0,7]}],[{"kind":"cdDrawBezier","args":[53,152,68,172,84,181,179,177,7,0]}],[{"kind":"cdDrawLine","args":[81.875,56.15,81.875,144.425,12,113]}],[{"kind":"cdDrawLine","args":[81.875,56.15,173.125,56.15,2,2]}],[{"kind":"cdDrawLine","args":[173.125,56.15,173.125,144.425,22,23]}],[{"kind":"cdDrawLine","args":[81.875,98.225,173.125,98.225,2,2]}],[{"kind":"cdDrawLine","args":[127.5,17.375,127.5,144.425,0,32]}],[{"kind":"cdDrawLine","args":[81.875,144.425,173.125,144.425,2,2]}]],TRACE_SHA256="b7c93e60328d0ebad11e4439baeee1572236539b6a448b2d829afe4c040cac0f",GROUPS_SHA256="ef75438244992abb6ad93adfbc26fc3f5a4c83eb0b6b26cbf71e67527b9ddee0",PROOF_SHA256="5ef8ae0a4b7c7044033f8e0496756165ea63766523a05bdc638a0f399435aa4d",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const INPUT_PINS=[{"path":"../hanja-public-glyphwiki-engine-capture-u8fea-k-2026-10-22/engine-whole-u8fea-k.json","sha256":"e35bcc0a2a9ce973de3a1f11e8c38a1dd074b93cfe1599aeeb125067cd59c7ba"},{"path":"../hanja-source-native-raw-correspondence-u8fea-k-2026-10-22.json","sha256":"40891d072ac1449e7791c66719a978d91c334e73950b2ae90050c8b667b54fd7"},{"path":"../hanja-goal-glyphwiki-batch176-2026-10-03/sources.json","sha256":"631c558b3ea1dde616f1844fc0c4479e1962fcb0717eb14bebb80f12b7d2feaf"}],PROJECTOR_BODY_SHA='f58c62d83c662318ab347384c31cc6403342289cb96fe5523a003b0e2bc72038';
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
const FIXED_CACHE_SHA='94c14ff3c297fe347c9630408c70c93a9b8ab6a186109daf4f81f4a537b2ccac';
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u8fea-k',selectedProofIdentity=clone(IDENTITY),logicalSourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(trace);strictJSON(proof);strictJSON(identity);assert.deepEqual(identity,IDENTITY);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);for(const p of INPUT_PINS)assert.equal(sha(readFileSync(new URL(p.path,import.meta.url))),p.sha256,p.path);const raw=readFileSync(new URL(IDENTITY.file,import.meta.url));assert.equal(sha(raw),IDENTITY.fileSHA256);assert.deepEqual(JSON.parse(raw),proof);assert.equal(digest(proof),PROOF_SHA256);assert.deepEqual(trace,proof.trace);const e=JSON.parse(readFileSync(new URL(INPUT_PINS[1].path,import.meta.url)));assert.equal(e.sourceRoot,sourceRoot);assert.deepEqual(e.staticCorrespondenceOneBased,EXPECTED_GROUPS.map(g=>g.map(i=>i+1)));assert.equal(e.approval.staticCorrespondence,true);assert.equal(sha(compileBound.toString()),PROJECTOR_BODY_SHA)}
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
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./source.json',import.meta.url)),'fixed cache exists; no repeated projection');assert.equal(projectionRuns,0);validateSelectedProof(...args);projectionRuns++;const atoms=compileBound(...args),strokes=LOGICAL_ATOMS.map(a=>a.flatMap(i=>atoms[i]));assert.equal(atoms.length,10);assert.equal(strokes.length,9);assert.equal(strokes.flat().length,10);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)?.length??0),0),20);return{schema:'hanja-fixed-source-cache/v1',root:sourceRoot,identity:clone(IDENTITY),sourceGroups:clone(EXPECTED_GROUPS),atomicSourceGroups:clone(ORIGINAL_SOURCE_GROUPS),strokes,geometrySHA256:digest(strokes),pureProjectorBodySHA256:PROJECTOR_BODY_SHA,preparation:{candidateBatch:1357,batchAssignmentProvisional:true,successfulPureProjectionOperations:1,internalPureCompileBoundCalls:1,originalCompilerCalls:0,existingCandidateFactoryCalls:0,engineRuns:0,newTerminalDerivations:0},sourcePreservation:{original20PolygonsExactlyOnce:true,exactInterRawJoinsOneBased:[[8,9],[3,4]],QB9:{rawOneBased:[5,6],independentMasks:true,endpointGapSourceUnits:[-2,-2],newConnector:false},originalCallFieldsUnchanged:true,originalTerminalFieldsUnchanged:true,newGuideOrConnector:false},staticMappingApproved:true,directionApproved:false,temporalOrderApproved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false};}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);const bytes=readFileSync(new URL('./source.json',import.meta.url));assert.equal(sha(bytes),FIXED_CACHE_SHA);const c=JSON.parse(bytes);assert.deepEqual(c.identity,IDENTITY);assert.deepEqual(c.sourceGroups,EXPECTED_GROUPS);assert.equal(digest(c.strokes),c.geometrySHA256);cachedCalls++;return c.strokes;}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1));}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls;

let correctionRuns=0;
export function deriveCachedDown2Correction(...args){
 assert.equal(args.length,3);assert.equal(correctionRuns,0);validateSelectedProof(...args);
 const bytes=readFileSync(new URL('./source.json',import.meta.url));assert.equal(sha(bytes),'e22d04d494c4618bd67726d291d5e384535d6e81c8ab38ee619ab0c51b66c028');const old=JSON.parse(bytes);assert.equal(old.geometrySHA256,'9b7ad70e6b8a0c4ea7543431c1b6d5b21aeed00a9b2f6896ad07ea3737b150be');
 const v=args[1].trace[8][0];assert.equal(args[1].trace[8].length,1);assert.equal(v.kind,'cdDrawLine');assert.deepEqual(v.args,[173.125,56.15,173.125,144.425,22,23]);assert.equal(v.polygons.length,2);
 const quad=v.polygons[0];assert.deepEqual(quad,[{x:179.1,y:56.1,off:0},{x:179.1,y:152.4,off:0},{x:167.1,y:158.4,off:0},{x:167.1,y:56.1,off:0}]);const[A,B,C,D]=quad;assert.equal(C.x,D.x);assert(D.y<B.y&&B.y<C.y);const E={x:C.x,y:B.y,off:0},rect=[A,B,E,D],triangle=[B,C,E];assert.equal(E.x,C.x);assert.equal(E.y,B.y);
 const area2=P=>P.reduce((n,p,i)=>{const q=P[(i+1)%P.length];return n+p.x*q.y-q.x*p.y},0);
 // The split uses one original-edge intersection. Source contour and all original points stay unchanged.
 const sc=v=>{const[a,b='']=String(v).split('.'),n=BigInt(a+b),d=10n**BigInt(b.length);assert.equal(n*40n%d,0n);return n*40n/d},signed=P=>P.reduce((n,p,i)=>{const q=P[(i+1)%P.length];return n+sc(p.x)*sc(q.y)-sc(q.x)*sc(p.y)},0n);assert.equal(signed(rect)+signed(triangle),signed(quad));assert(signed(rect)>0n&&signed(triangle)>0n);
 const path=P=>{const p=area2(P)<0?[P[0],...P.slice(1).reverse()]:P;return p.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z'},bounds=P=>[Math.min(...P.map(p=>p.x/2)),Math.min(...P.map(p=>p.y/2)),Math.max(...P.map(p=>p.x/2)),Math.max(...P.map(p=>p.y/2))];
 const strokes=clone(old.strokes),before=strokes[1][0];assert.equal(strokes[1].length,1);assert.equal(before.revealPath,'M40.9375 28.075 L86.5625 28.075 L86.5625 72.2125');assert.equal(before.revealWidth,14);assert.equal(before.weight,89.7625);
 const sourcePolygons=[...args[1].trace[7][0].polygons,...v.polygons];assert.equal(before.outline,sourcePolygons.map(path).join(' '));const bodyPolygons=[...args[1].trace[7][0].polygons,rect,v.polygons[1]],body={...before,outline:bodyPolygons.map(path).join(' '),bounds:bounds(bodyPolygons.flat())},tail={outline:path(triangle),bounds:bounds(triangle),direction:'down',weight:(C.y-B.y)/2};assert.equal(tail.weight,3);strokes[1]=[body,tail];
 for(let i=0;i<9;i++)if(i!==1)assert.deepEqual(strokes[i],old.strokes[i]);const poly=s=>s.flat().flatMap(m=>m.outline.match(/M[^M]+/g).map(s=>s.trim())).sort(),expected=poly(old.strokes);assert.equal(expected.splice(expected.indexOf(path(quad)),1).length,1);expected.push(path(rect),path(triangle));assert.deepEqual(poly(strokes),expected.sort());assert.equal(poly(strokes).length,21);
 correctionRuns++;return{...old,baselineStrokes:clone(old.strokes),baselinePreparation:clone(old.preparation),baselineGeometrySHA256:old.geometrySHA256,strokes,geometrySHA256:digest(strokes),preparation:{...old.preparation,newTerminalDerivations:1,newCachedCorrectionOperations:1},sourcePreservation:{...old.sourcePreservation,original20PolygonsExactlyOnce:false,original20PolygonsUnionPreserved:true,originalPolygonCount:20,emittedFragmentCount:21,oneOriginalQuadPartitioned:true,other19OriginalPolygonsUnchanged:true,other8PensUnchanged:true,originalContourUnchanged:true,newExternalInk:false},cachedCorrection:{kind:'original-raw9-terminal23-boundary-intersection-down-fragment',priorCacheSHA256:sha(bytes),priorGeometrySHA256:old.geometrySHA256,priorSourceModuleSHA256:'0081be50d5acb784378fda8c8136412cdbd7014bf9b83a36af5fe7b9a034c5f5',nativeHold:'docs/hanja-actual-component-profiles-2026-10-22/u8fea-native-hold.json',nativeHoldSHA256:'08a89ffda86e4391e3c4101f6cd3af60cdc582ee93e7a93c3dcdefe9e421aa8f',rawOneBased:9,originalArgs:clone(v.args),originalQuad:clone(quad),cutPoint:E,cutRule:'x=original C.x on CD; y=original B.y',bodyRectangle:rect,tailTriangle:triangle,originalAreaRaw:'5958/5',bodyRectangleAreaRaw:'5778/5',tailTriangleAreaRaw:'36',bodyGuidePreserved:body.revealPath,bodyWidth:body.revealWidth,bodyWeight:body.weight,tailWeight:tail.weight,bodyBoundsPolicy:'원quad에서 triangle을 제외한 active body P bounds',bodyTailBoundary:body.weight/(body.weight+tail.weight),positiveOutsideWitnessDisplay:[83.75,79],witnessSquaredDisplay:'172737/3200',sourceRadiusSquaredDisplay:'49',bodyRectangleMaxCapsuleSquaredRaw:'79921/800',headMaxJointDiscSquaredRaw:'39761/320',originalHMaxCapsuleSquaredRaw:'6733/1600',successfulCachedCorrectionOperations:1,wholeProjectionRepeated:0,engineRuns:0,newNativeApproval:false}}
}
export const cachedCorrectionCallCount=()=>correctionRuns;
