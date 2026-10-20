export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from 'node:assert/strict';import{readFileSync,existsSync}from'node:fs';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets.u7c1c,FIXED_PINS={"../hanja-goal-glyphwiki-batch965-2026-10-13/NOTICE.md":"08b1272b08ff4a0ee4c8de6eb2cf30dbbbd40201b01125a4ec792ca79f711e07","../hanja-goal-glyphwiki-batch965-2026-10-13/README.md":"a1f81f15cbd3517df31d695a4546b4d7037e3bf5d4471e19ecc86c1147eb6060","../hanja-goal-glyphwiki-batch965-2026-10-13/candidate-compile-analysis.json":"00bf825366ebcf7ffc244b675a2a2e66bbbcaa6ab3b8342e2fb03733eb459852","../hanja-goal-glyphwiki-batch965-2026-10-13/engine-proof.json":"9d3fc6a34716614537223cbd2f8e8345bbd43f4eddebe9d05ffa9adb5da3082b","../hanja-goal-glyphwiki-batch965-2026-10-13/engine-whole-u7c1c.json":"ce024be69d2544cabadde7968d0a12963735bb29775066ed54b962ed6c5cbeec","../hanja-goal-glyphwiki-batch965-2026-10-13/metadata.json":"795ca72fa2498d93acca21430ac917921ec7594349bd71832e7e2911bbcac685","../hanja-goal-glyphwiki-batch965-2026-10-13/native-server-preflight-hold.json":"7d6fbb1f34e4649185aa484633bad2bd2bb6262a7f8f7e5acff78a56ee825135","../hanja-goal-glyphwiki-batch965-2026-10-13/native-static-input-pins.json":"cc3da13a10e427f6157d42d1f3db8c5218f385d92c82478e02b562c37436e41e","../hanja-goal-glyphwiki-batch965-2026-10-13/progressive.mjs":"abd82103da04bc7c48b7724362a67c60aa1b51ca3e87d86b10e6844234efc2a9","../hanja-goal-glyphwiki-batch965-2026-10-13/resume.json":"6b336db3f7739e9f3211adb975527b82594115ee5119e2b622de002e951897f0","../hanja-goal-glyphwiki-batch965-2026-10-13/serve-static-native.py":"6ef8d50909637997006297c044a1ff0e4573bede457821a56b33d78ada2abf84","../hanja-goal-glyphwiki-batch965-2026-10-13/source-analysis.json":"21d4631c0883c52cac6c4159393bd93feff55ef9947c8112ae7373f4a1e8a2f8","../hanja-goal-glyphwiki-batch965-2026-10-13/source-hold.json":"0a2f9336195b3ab9ba928fa244eced53d9bc0a0761f01e778a866bc4a5ad0641","../hanja-goal-glyphwiki-batch965-2026-10-13/source-join-analysis.json":"322d494e3fe4db4eeaa15b6b98a905b23cb5c25171ccb85b4256c85222b50c2a","../hanja-goal-glyphwiki-batch965-2026-10-13/source-only-helper-readiness-2026-10-14.json":"395fcfb638f0ac0ccc945eb34dc470501e13c24e47f36408598d9dda27c37622","../hanja-goal-glyphwiki-batch965-2026-10-13/source-preservation-audit.json":"6670fb3648c302d1879bc190e802a15afe96b993a56c719e8e3aae4a535719fc","../hanja-goal-glyphwiki-batch965-2026-10-13/sources.json":"0addebdceb61df423294a766186288584817d816adee44db5cca50b309502728","../hanja-goal-glyphwiki-batch965-2026-10-13/validation.json":"f5772b019e1ce983499e24d23e75c654fe182f05c7f3a59384d3a13774d618f2","../hanja-goal-glyphwiki-batch965-2026-10-13/verify-source.mjs":"66427479ba50757a8bdcd0dce3b3a4b4b8f21762765efdcb363f7f3deb2605ee","../hanja-source-raw-compare-u564b-2026-10-21/serve.py":"eac29cfcfac49f5584dc3a67e3ab90b6c47920156563d6833bf6ae1f88832efc","../hanja-source-raw-compare-u564b-2026-10-21/check.mjs":"2d58f4ad1bf96f343232df7951196824827c054b8fbc6a7f67dcb27bc7716703","../hanja-source-raw-compare-u7c1c-2026-10-21/config.json":"8b629fa6161ae6ece3575453fc758b1cb74b09748a85aef5ec6be7070c99e5c6","../hanja-source-raw-compare-u7c1c-2026-10-21/serve.py":"25266cacf9c4aa8fe22e808e7446c0d5332bd1ddbbf374c267bdfc45067e90f7","../hanja-source-raw-compare-u7c1c-2026-10-21/check.mjs":"5413ac0ece90138c47d405ac2fdef098b2502f987110446dfc120ddb943344a8","../hanja-source-raw-compare-u7c1c-2026-10-21/README.md":"1d9cb5abe8a77514fe44baa39aabfebaa6cafe43c6d95f2f4589467e8d180ada","../hanja-source-raw-compare-u7c1c-2026-10-21/validation.json":"8632f0aba57ea02da4b482100e5356ec3b7505c6ee2d2706ae88712d790d637f","../hanja-source-native-raw-correspondence-u7c1c-2026-10-21/README.md":"e6066caa24954b047099f54c0a64afcf236d8f06fac1bb231241f272a193d09d","../hanja-source-native-raw-correspondence-u7c1c-2026-10-21/review.json":"c31426957959a0acc67615ade4048b21c4327f9227e5429a63064c6adb04b0c2","../hanja-source-independent-hq-reorder-u564b-source-experiment-2026-10-21/candidate.mjs":"ebd6c61f0581a24fcc954ceaaa01de77f19270b96b8268077065de76a7f4267e","../hanja-source-independent-hq-reorder-u564b-source-experiment-2026-10-21/source-check.mjs":"8ef22f5e23d8178235fcf3f7b6eb6e39385d218e9790285c05249709c0a1fdc6","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-g2-batch10-2026-09-16/originals.json":"5e14aff1d1c731ad58cbcd4e48fffda5197361ecacd5ff4732e529775f5eda91"},EXPECTED_IDENTITY={"sourceRoot":"u7c1c","sourceProofFile":"engine-proof.json","sourceProofFileSha256":"9d3fc6a34716614537223cbd2f8e8345bbd43f4eddebe9d05ffa9adb5da3082b"},EXPECTED_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11,12],[13],[14],[15],[16],[17,18],[19],[20]];
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u7c1c',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
const EXPECTED_CONFIG_SHA="0c0a841867993b95a74aa9b9ea3ddc839c474b7edf5c4efd4b852333c54fa791";
function validateSelectedProof(trace,proof,identity){assert.equal(sha(readFileSync(new URL("./config.json",import.meta.url))),EXPECTED_CONFIG_SHA);assert.equal(arguments.length,3);strictJSON(identity);strictJSON(proof);strictJSON(trace);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),"40b8d1f21ee2ae6667f5208b50f430fba87554fc730be00cdf33bdce0adec48e");assert.deepEqual(trace,proof.trace);assert.equal(T.actualFull5File,'../hanja-goal-glyphwiki-batch965-2026-10-13/engine-proof.json');assert.equal(sha(readFileSync(new URL(T.actualFull5File,import.meta.url))),EXPECTED_IDENTITY.sourceProofFileSha256);assert.deepEqual(json(T.actualFull5File),proof);const body=json(T.selectedBody3File);assert.equal(sha(readFileSync(new URL(T.selectedBody3File,import.meta.url))),"ce024be69d2544cabadde7968d0a12963735bb29775066ed54b962ed6c5cbeec");assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace']);for(const k of['defaults','groups','trace'])assert.deepEqual(body[k],proof[k]);}
const RAW_COUNT=21,ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20]],ORIGINAL=[[{"kind":"cdDrawCurve","args":[49,13.475,40,41.15,12,61.4,0,7]}],[{"kind":"cdDrawLine","args":[42,31.7,106,31.7,2,0]}],[{"kind":"cdDrawCurve","args":[48,31.7,68,40.475,75,53.975,7,8]}],[{"kind":"cdDrawCurve","args":[128,13.475,119,40.475,91,58.025,0,7]}],[{"kind":"cdDrawLine","args":[120,31.7,186,31.7,2,0]}],[{"kind":"cdDrawCurve","args":[127,31.7,147,40.475,154,53.975,7,8]}],[{"kind":"cdDrawCurve","args":[27.645,63.9,47.52,69.115,56.265,79.545,7,8]}],[{"kind":"cdDrawCurve","args":[12.54,98.17,34.004999999999995,103.38499999999999,41.955,113.815,7,8]}],[{"kind":"cdDrawCurve","args":[14.13,148.08499999999998,41.955,154.79000000000002,38.775,186.08,7,8]}],[{"kind":"cdDrawCurve","args":[34.8,160.75,37.98,151.81,71.37,98.91499999999999,32,7]}],[{"kind":"cdDrawLine","args":[88.0035,67.2674,88.0035,103.7426,12,313]}],[{"kind":"cdDrawLine","args":[88.0035,67.2674,162.76649999999998,67.2674,2,2]}],[{"kind":"cdDrawLine","args":[162.76649999999998,67.2674,162.76649999999998,103.7426,22,323]}],[{"kind":"cdDrawLine","args":[88.0035,84.96860000000001,162.76649999999998,84.96860000000001,2,2]}],[{"kind":"cdDrawLine","args":[88.0035,103.7426,162.76649999999998,103.7426,2,2]}],[{"kind":"cdDrawLine","args":[62.55,120.52,187.155,120.52,0,100]}],[{"kind":"cdDrawCurve","args":[107.28,120.52,91.305,143.615,60.42,154.04500000000002,132,7]}],[{"kind":"cdDrawLine","args":[94.5,136.91,171.18,136.91,2,2]}],[{"kind":"cdDrawCurve","args":[171.18,136.91,170.115,162.24,164.14418000334766,173.51728114860674,22,0]},{"kind":"cdDrawCurve","args":[164.14418000334766,173.51728114860674,159.465,182.355,149.465,182.355,2,14]}],[{"kind":"cdDrawCurve","args":[121.125,136.91,99.825,164.475,57.224999999999994,180.865,132,7]}],[{"kind":"cdDrawCurve","args":[148.815,136.91,133.905,168.945,92.37,187.57,132,7]}]],TRACE_SHA256="13fe5a139a5fa7a295dd7e85fde3bcea09e3b878e5a0028984dc72921f3bf85b",GROUPS_SHA256="8ce321b5b79353d3a84482d22fb9cad117cf1973ff5c6d33d286b0e3c272de9b",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
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
function mergeExact(raw,indices,trace){assert(indices.length===2);assert(EXPECTED_GROUPS.some(g=>JSON.stringify(g)===JSON.stringify(indices)));assert([[11,12],[17,18]].some(g=>JSON.stringify(g)===JSON.stringify(indices)));const calls=indices.flatMap(i=>trace[i]);assert.equal(calls.length,indices[0]===11?2:3);assert.deepEqual(endpoint(calls[0]),calls[1].args.slice(0,2),'no connector or positive gap joins');const parts=indices.map(i=>{assert.equal(raw[i].length,1);return raw[i][0]}),first=calls[0].args;return{outline:parts.map(p=>p.outline).join(' '),bounds:[Math.min(...parts.map(p=>p.bounds[0])),Math.min(...parts.map(p=>p.bounds[1])),Math.max(...parts.map(p=>p.bounds[2])),Math.max(...parts.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(parts.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:'M'+first[0]/2+' '+first[1]/2+' '+calls.map(c=>{const a=c.args;return c.kind==='cdDrawLine'?'L'+a[2]/2+' '+a[3]/2:c.kind==='cdDrawCurve'?'Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2:'C'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2+' '+a[6]/2+' '+a[7]/2}).join(' '),revealWidth:14}}
let projectionRuns=0,internalRawProjectorRuns=0,cachedCalls=0;
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./fixtures.json',import.meta.url)),'public fixed fixture exists; projection disabled');validateSelectedProof(...args);assert.equal(projectionRuns,0,'author first projection only');projectionRuns++;internalRawProjectorRuns++;const[trace,proof,identity]=args,rawBaseline=projectRaw(trace,proof,identity),strokes=EXPECTED_GROUPS.map(g=>g.length===1?rawBaseline[g[0]]:g[0]===8?g.flatMap(i=>rawBaseline[i]):[mergeExact(rawBaseline,g,trace)]);return{fullProof:proof,rawBaseline,baseline:clone(strokes),strokes,traceProjectionOperations:1,newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,staticMappingApproved:true,nativeAnimationApproved:false,nativeApproval:false,runtimeApplied:false}}
export function traceProjectionCallCount(){return projectionRuns}export function newInternalRawProjectorCallCount(){return internalRawProjectorRuns}export function cachedPositiveCallCount(){return cachedCalls}export function originalSourceCompilerCallCount(){return 0}export function existingFactoryCallCount(){return 0}
if(process.argv[1]===fileURLToPath(import.meta.url)){assert.equal(process.argv.length,3);assert.equal(process.argv[2],'--author-capture-once');const proof=json(T.actualFull5File),payload=captureProjection(proof.trace,proof,EXPECTED_IDENTITY);process.stdout.write(JSON.stringify({u7c1c:payload}))}
const FIXED_RAW_SHA="0a45fee7718d3b6e409dc983195e92763ef123bd616e66907b7f853d56654d79",FIXED_COMPILED_SHA="f11cd0dae3a1bc09045063834efb7b70529552f11e2e6ae7a0c19e7d2de586a3",FIXED_PAYLOAD_SHA="a7874ba70f5c8367306bb08804bae8cf9b823e6d455b0b2001a3dcb1eb372b0b",FIXED_FILE_SHA="29cc3fb7d563f55abfc6b54f31c2bc97e37c85699bce733c17e60b1b1e858e5b";
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const bytes=readFileSync(new URL('./fixtures.json',import.meta.url));assert.equal(sha(bytes),FIXED_FILE_SHA);const f=JSON.parse(bytes).u7c1c;assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.equal(digest(f.fullProof),T.fullProofSHA256);assert.equal(digest(f.rawBaseline),FIXED_RAW_SHA);assert.equal(digest(f.strokes),FIXED_COMPILED_SHA);assert.deepEqual(f.baseline,f.strokes);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
