import assert from 'node:assert/strict';import{readFileSync,existsSync}from'node:fs';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets.u6e7a,FIXED_PINS={"../hanja-goal-glyphwiki-batch1087-2026-10-13/NOTICE.md":"d86c5a3bed763b111f8e1f12a253aacb6e753dd2ebb967f4155395a1942826e3","../hanja-goal-glyphwiki-batch1087-2026-10-13/README.md":"8e597b7cc8ef591255860ba4e38b2fbb1ad634a90f3004eb655d4ab7ef87de06","../hanja-goal-glyphwiki-batch1087-2026-10-13/candidate-compile-analysis.json":"b5b061a8753b4c4e4e8341d174e3391d1343c2a45dc847247a842f62c6ed6cc0","../hanja-goal-glyphwiki-batch1087-2026-10-13/checkpoint-validation.json":"c4356ed0e6a2e1ffbabc8b158ddba12de6ad29e102c8e112807803bdca76514f","../hanja-goal-glyphwiki-batch1087-2026-10-13/engine-proof.json":"ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9","../hanja-goal-glyphwiki-batch1087-2026-10-13/engine-whole-u6e7a-k.json":"2b1c443b0104a3ac6259fbba259f8ae4e1f83ef23c767a609ff3a2dab72d4048","../hanja-goal-glyphwiki-batch1087-2026-10-13/engine-whole-u6e7a.json":"9885f0959ffeab9f19945f5d6e3627800f558ce6b854f9ad1f328eaa7825736c","../hanja-goal-glyphwiki-batch1087-2026-10-13/metadata.json":"5600b9136e80e1e921420fa2dabfb5599a770b00965ca166e2ae64666bbc5fb6","../hanja-goal-glyphwiki-batch1087-2026-10-13/native-server-preparation-source-analysis.json":"ab81d6ca89b4ab545bb4bf3a67bd909cbda9fc269f87ddbc3033011bcb970d1a","../hanja-goal-glyphwiki-batch1087-2026-10-13/native-server-validation.json":"0440ae491a0d5f421883a1fc06a6da2ba0adc0d18b03bb1352bccb169f6cb0b2","../hanja-goal-glyphwiki-batch1087-2026-10-13/progressive.mjs":"e303fa435547fe55c8f6b0a22a2fc53805a46428fb4bf429c2b6f9a025661802","../hanja-goal-glyphwiki-batch1087-2026-10-13/resume.json":"84e59287f21139f5bd48ee7b7ae31851a80078fa568ce4ecd832917915f4126c","../hanja-goal-glyphwiki-batch1087-2026-10-13/serve-whole.py":"d0ed63529f8f93ce07fe2dcdb3232846d6275986e854c4cdcfb87ee5789746b6","../hanja-goal-glyphwiki-batch1087-2026-10-13/source-analysis.json":"6d39b2dc034d92a2e14610525bce2ae0e86a6f1bfefafceeb89d40e88b4f7543","../hanja-goal-glyphwiki-batch1087-2026-10-13/source-hold.json":"f74f5dca271464e628c5f753f784bd13b0eb086a2b49d8c48dbdcc725a5ef7bb","../hanja-goal-glyphwiki-batch1087-2026-10-13/source-join-analysis.json":"4af62477dc9fe485fc60bae6c4880d6a8dbd4e4f7531a54fda196cba993f5827","../hanja-goal-glyphwiki-batch1087-2026-10-13/source-only-helper-readiness.json":"a4b27036b61882b4a3d2debb2e547176d0b0bcb6b16cfb90b5ccf2c2053dac1e","../hanja-goal-glyphwiki-batch1087-2026-10-13/sources.json":"729ff27e78cfbc9ed772c8d5fad69b72afdfb80043d8e4484be6a9ac0d3a5bfe","../hanja-goal-glyphwiki-batch1087-2026-10-13/validation.json":"b2b99e50687135b17d2d3d673c26f055b7b5f2975d3b0a9a7d062cf4d15761b1","../hanja-goal-glyphwiki-batch1087-2026-10-13/verify-source.mjs":"bf3843b0ef186b227b306c83bcd3b13734c0a5ae535bbb8ab674ceb84862b15b","../hanja-source-raw-compare-u6e7a-2026-10-21/README.md":"a85793dfe7be7fbd553297faaf65f59d3c7e089cda42520c3fa07bb126ede13a","../hanja-source-raw-compare-u6e7a-2026-10-21/config.json":"f1c0776c1647a39af01b7d1a1af50c67fc6fdcd2e886c1940b7eb27b0de26f4f","../hanja-source-raw-compare-u6e7a-2026-10-21/check.mjs":"60dd0174e966a2698bbd803d54592ea3aecf81c3f3a18808dbb098207470c69f","../hanja-source-raw-compare-u6e7a-2026-10-21/serve.py":"25266cacf9c4aa8fe22e808e7446c0d5332bd1ddbbf374c267bdfc45067e90f7","../hanja-source-raw-compare-u6e7a-2026-10-21/validation.json":"941ea9ecdfc85d5dca393c3c44b32569c8154e1f9854cb46ca02952507e3f4b5","../hanja-source-raw-review-u6e7a-2026-10-21/README.md":"8ea59a2fb06d959ea9f13e8972a77a403d36e20b7e9908ca94b7d89da22c5e1f","../hanja-source-raw-review-u6e7a-2026-10-21/review.json":"846f5f57f0f7a277c955b9cf8384dba79f6e3d202a2047ff9f7fe27abc13277a","../hanja-source-independent-qq-reorder-u7d7a-source-experiment-2026-10-21/candidate.mjs":"c5de7d721edfe195fb8394b0f435872fc1f1ee885ac70a4bffa060a31358f374","../hanja-source-independent-qq-u6efa-source-experiment-2026-10-19/candidate.mjs":"03cd39ae2790fce32ffe4379ba5ea17daef148a66fe167df2cb9e174fd8a148c","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"},EXPECTED_IDENTITY={"sourceRoot":"u6e7a","sourceProofFile":"engine-proof.json","sourceProofFileSha256":"ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9"},EXPECTED_GROUPS=[[0],[1],[2,3],[5],[6],[7],[8,9],[10],[11],[12],[13],[14]];
const EXPECTED_CONFIG_SHA="aae777e3fd0680c43e6e0aade49749bc120b7f727292e3ae555cb827777a1a92",FIXED_PROOF_SHA="ff4da0992129c85be7886b7d2831c8ea00d8e192d51fc72836cc74d4d7bd57ad",FULL_FILE="../hanja-goal-glyphwiki-batch1087-2026-10-13/engine-proof.json",BODY_FILE="../hanja-goal-glyphwiki-batch1087-2026-10-13/engine-whole-u6e7a.json",BODY_FILE_SHA="9885f0959ffeab9f19945f5d6e3627800f558ce6b854f9ad1f328eaa7825736c";
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}

export const sourceRoot='u6e7a',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(identity);strictJSON(proof);strictJSON(trace);assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),EXPECTED_CONFIG_SHA);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);assert.deepEqual(T.rawSourceGroups,ORIGINAL_SOURCE_GROUPS);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);assert.equal(T.actualFull5File,FULL_FILE);assert.equal(T.selectedBody3File,BODY_FILE);assert.equal(sha(readFileSync(new URL(FULL_FILE,import.meta.url))),EXPECTED_IDENTITY.sourceProofFileSha256);assert.deepEqual(json(FULL_FILE),proof);assert.equal(sha(readFileSync(new URL(BODY_FILE,import.meta.url))),BODY_FILE_SHA);const body=json(BODY_FILE);assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace']);for(const k of['defaults','groups','trace'])assert.deepEqual(body[k],proof[k]);assert.equal(proof.groups[4].raw[0],0);assert.deepEqual(proof.groups[4].polygons,[]);assert.deepEqual(trace[4],[]);}
const RAW_COUNT=15,ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13],[14]],ORIGINAL=[[{"kind":"cdDrawCurve","args":[26.32,20,44.32,27,52.24,41,7,8]}],[{"kind":"cdDrawCurve","args":[12.64,66,32.08,73,39.28,87,7,8]}],[{"kind":"cdDrawCurve","args":[14.08,133,39.28,142,36.4,184,7,8]}],[{"kind":"cdDrawCurve","args":[32.8,150,35.68,138,65.92,67,32,7]}],[],[{"kind":"cdDrawCurve","args":[96.24680000000001,16.625,81.9584,72.2,60.7904,116.075,0,7]}],[{"kind":"cdDrawLine","args":[81.9584,73.175,81.9584,183.35,0,0]}],[{"kind":"cdDrawLine","args":[112.03999999999999,27,112.03999999999999,80,12,13]}],[{"kind":"cdDrawLine","args":[112.03999999999999,27,167.48000000000002,27,2,2]}],[{"kind":"cdDrawLine","args":[167.48000000000002,27,167.48000000000002,80,22,23]}],[{"kind":"cdDrawLine","args":[112.03999999999999,80,167.48000000000002,80,2,2]}],[{"kind":"cdDrawLine","args":[94.03999999999999,113,184.04,113,0,0]}],[{"kind":"cdDrawLine","args":[138.68,80,138.68,183,32,0]}],[{"kind":"cdDrawCurve","args":[134.36,113,121.4,153,91.88,178,132,7]}],[{"kind":"cdDrawCurve","args":[143.72,113,156.68,147,181.16,167,7,0]}]],TRACE_SHA256="30507a700b7025cabcd730d50576321fe7e8da1863bf570804a287461e8bf6c7",GROUPS_SHA256="f065db26a27c2d4fe958174a0d4188190ca057e46d3662cda97eaa9477598931",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
function projectRaw(trace,proof,identity){const sourceGroups=ORIGINAL_SOURCE_GROUPS;
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

return compileBound(trace,proof,identity)}
function mergeExact(raw,indices,trace){assert.deepEqual(indices,[8,9]);const calls=indices.flatMap(i=>trace[i]);assert.equal(calls.length,2);assert(calls.every(c=>c.kind==='cdDrawLine'));for(let i=1;i<calls.length;i++)assert.deepEqual(endpoint(calls[i-1]),calls[i].args.slice(0,2),'no connector or positive-gap join');const parts=indices.map(i=>{assert.equal(raw[i].length,1);return raw[i][0]}),first=calls[0].args;return{outline:parts.map(p=>p.outline).join(' '),bounds:[Math.min(...parts.map(p=>p.bounds[0])),Math.min(...parts.map(p=>p.bounds[1])),Math.max(...parts.map(p=>p.bounds[2])),Math.max(...parts.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(parts.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:'M'+first[0]/2+' '+first[1]/2+' '+calls.map(c=>{const a=c.args;return c.kind==='cdDrawLine'?'L'+a[2]/2+' '+a[3]/2:'Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2}).join(' '),revealWidth:14}}
let projectionRuns=0,internalRawProjectorRuns=0,cachedCalls=0;
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./fixtures.json',import.meta.url)),'public fixture exists; projection disabled');validateSelectedProof(...args);assert.equal(projectionRuns,0);projectionRuns++;internalRawProjectorRuns++;const[trace,proof,identity]=args,factoryRaw=projectRaw(trace,proof,identity);assert.equal(factoryRaw.length,14);const rawBaseline=Array.from({length:15},(_,i)=>i===4?[]:factoryRaw[i<4?i:i-1]);assert.deepEqual(rawBaseline[4],[]);const strokes=EXPECTED_GROUPS.map(g=>g.length===1?rawBaseline[g[0]]:g[0]===2?g.flatMap(i=>rawBaseline[i]):[mergeExact(rawBaseline,g,trace)]);return{fullProof:proof,rawBaseline,baseline:clone(strokes),strokes,excludedEmptyRows:[{raw:4,sourceGroup:clone(proof.groups[4]),trace:clone(trace[4])}],traceProjectionOperations:1,newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,staticMappingApproved:true,nativeAnimationApproved:false,nativeApproval:false,runtimeApplied:false}}
export function traceProjectionCallCount(){return projectionRuns}export function newInternalRawProjectorCallCount(){return internalRawProjectorRuns}export function cachedPositiveCallCount(){return cachedCalls}export function originalSourceCompilerCallCount(){return 0}export function existingFactoryCallCount(){return 0}
if(process.argv[1]===fileURLToPath(import.meta.url)){assert.equal(process.argv.length,3);assert.equal(process.argv[2],'--author-capture-once');const proof=json(FULL_FILE);process.stdout.write(JSON.stringify({u6e7a:captureProjection(proof.trace,proof,T.identity)},null,2)+'\n')}
const FIXED_RAW_SHA="5d24764045dec414ed5f17d6c21c8ce708351a1767c112a8fd2efb5af8cfffd4",FIXED_COMPILED_SHA="643e371661c0557ea3338b28d58e94490385f0dac495b6738fdd3991d2d8d1d6",FIXED_PAYLOAD_SHA="71e2230d378a699624258977341eecce10761050d9966cf191db3559243cbbfd",FIXED_FILE_SHA="247767960d239c885d98e1975f0774de34fac914ab1a9402bcf602d78e8f8aa4";
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const bytes=readFileSync(new URL('./fixtures.json',import.meta.url));assert.equal(sha(bytes),FIXED_FILE_SHA);const f=JSON.parse(bytes).u6e7a;assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.deepEqual(f.fullProof,args[1]);assert.equal(digest(f.rawBaseline),FIXED_RAW_SHA);assert.equal(digest(f.strokes),FIXED_COMPILED_SHA);assert.deepEqual(f.baseline,f.strokes);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
