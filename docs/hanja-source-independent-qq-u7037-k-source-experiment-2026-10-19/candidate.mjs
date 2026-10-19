export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })


const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const round=x=>Math.round(x*1e6)/1e6
const T=json('./config.json').targets['u7037-k'],FIXED_PINS={"../hanja-goal-glyphwiki-batch812-2026-10-13/NOTICE.md":"e8ddfc1f953cd07abf464ab998b24d19d194f160bd1fc94876af528d2e0c8d02","../hanja-goal-glyphwiki-batch812-2026-10-13/README.md":"4c2c9c5d01b57596f4dad757d64513f05f5c45f452ed105a111b041fd82b00bd","../hanja-goal-glyphwiki-batch812-2026-10-13/candidate-compile-analysis.json":"6948035923f83cb21bb861fac44d3f4ced9b74db80e9baa0761744103db5bf47","../hanja-goal-glyphwiki-batch812-2026-10-13/draw-trace.json":"245be618c3f7410dace5c23e894e4419dd5dc7d078e804ca4e734e6e9d744dd6","../hanja-goal-glyphwiki-batch812-2026-10-13/engine-proof.json":"f4be01a80e9fb13e3cb7afc6d648da6980092d63f99ba342dc6656f0e7a4c240","../hanja-goal-glyphwiki-batch812-2026-10-13/engine-whole-u7037-g.json":"0170e2734ed02788c1c0d4918f1517849c3ff9f6519e82bcc1838c02d3a04f85","../hanja-goal-glyphwiki-batch812-2026-10-13/engine-whole-u7037-k.json":"9cfbe9ca3dcf0ed631a8c28b5e9a885c0b0ceadb132236708ccb8c9043948439","../hanja-goal-glyphwiki-batch812-2026-10-13/engine-whole-u7037-ue0100.json":"ee9a690ed115cb52115dcfdae9fdaa2f4d2debb69250a0dea7c02b55c8dc4426","../hanja-goal-glyphwiki-batch812-2026-10-13/engine-whole-u7037-ue0101.json":"9cfbe9ca3dcf0ed631a8c28b5e9a885c0b0ceadb132236708ccb8c9043948439","../hanja-goal-glyphwiki-batch812-2026-10-13/engine-whole-u7037-ue0102.json":"7c855199ac959427012fcf6e2e3f74432fcafcda5775b379bc96aeaf3ef3c12a","../hanja-goal-glyphwiki-batch812-2026-10-13/engine-whole-u7037.json":"f4be01a80e9fb13e3cb7afc6d648da6980092d63f99ba342dc6656f0e7a4c240","../hanja-goal-glyphwiki-batch812-2026-10-13/metadata.json":"426c0ea19ab48799d6233e1eb467ea48aadef242724c7c6e6ae15953967eb82e","../hanja-goal-glyphwiki-batch812-2026-10-13/resume.json":"3ac6d99687dfd80cbe06122c8f4c809a48381b69c61f0820b241ab54b9a6acd2","../hanja-goal-glyphwiki-batch812-2026-10-13/review.json":"9c88b37e9b2c36cb6e60d132a8aaa3ef52aee21971c1c3c8adf96d6481d1d52f","../hanja-goal-glyphwiki-batch812-2026-10-13/serve-memory.py":"2d8d5a817367cfeb6de16619baa6182171d67eb416ab5c9a6a66ce4b2e286e38","../hanja-goal-glyphwiki-batch812-2026-10-13/source-analysis.json":"bf7e186097a31e2acd0b3859f2ebada89e8297cadd222dd61f61f4dd03c34c16","../hanja-goal-glyphwiki-batch812-2026-10-13/source-inventory.json":"4b8b27ddf3aaf8277313142451f73e0a62e1e8a6323641dcaa1ddf86a9cc96d9","../hanja-goal-glyphwiki-batch812-2026-10-13/source-join-analysis.json":"1d517bc42dd19515e7593829769fcbdcf58d3734b21aa563caf6c139d93c168b","../hanja-goal-glyphwiki-batch812-2026-10-13/sources.json":"e61eb0c2ab08b6cbfc7e88efe7b47c7f237acc66cd588ae328edfcc00b8a82a5","../hanja-goal-glyphwiki-batch812-2026-10-13/validation.json":"6609a3d689c572eb5e7cf1fa2c52333d967e1d87ea04fb550703a24cc3cc346a","../hanja-goal-glyphwiki-batch812-2026-10-13/verify-source.mjs":"a03034579a4d9209c357472be32ab19c22169a363fefd978b206c0cffcd9e44e","../hanja-goal-glyphwiki-batch372-2026-10-09/NOTICE.md":"717f3f04d2d782f0347ce80bbcba15f7fafbeb82bf7300e786a365ee0b8d5046","../hanja-goal-glyphwiki-batch372-2026-10-09/README.md":"60795b514be8daaca5c1ca76721cbd83135cb81b2cccab5a25faa9b74914dda7","../hanja-goal-glyphwiki-batch372-2026-10-09/coverage.json":"139859930e4ce9004091a7f209de29ef0874987fdd21d17488bc8b886c71dea8","../hanja-goal-glyphwiki-batch372-2026-10-09/draw-trace.json":"3927958368da07ee1309656bed1c46e5ffd5bffcb387ae915eba762982a042b4","../hanja-goal-glyphwiki-batch372-2026-10-09/engine-proof.json":"7eb9e53e18c67277e1918520937eec252a3cb6587844bde715802fa406b1644d","../hanja-goal-glyphwiki-batch372-2026-10-09/metadata.json":"6e6c6142d6fea7e5a85d196dc669f47bc7abbdba208eadac07c9066b02599329","../hanja-goal-glyphwiki-batch372-2026-10-09/next-source-inventory.json":"0a931bf23295d3ffc7c8d60f96c5c2e3cc8876eca3e2317db1ecf3a21ed27e79","../hanja-goal-glyphwiki-batch372-2026-10-09/next.json":"9f286eec33ef7b9e0cd1bc19a46b8c1394633d0ae7c46008739989ddcf63f559","../hanja-goal-glyphwiki-batch372-2026-10-09/review.json":"fdfec26a5940f10a0bdf59760f03e0648d0e7b0abadfc775671f7da0750ea3cd","../hanja-goal-glyphwiki-batch372-2026-10-09/serve.py":"5b96bfdbd4fd985a6131cd32e60a3433b767c3296d67aaaeb4190db8153b1282","../hanja-goal-glyphwiki-batch372-2026-10-09/sources.json":"ea69bc2f1b0d5666cd22b70f39f047e7eb906a0fed61c9f5ab5da5ea722bbd83","../hanja-goal-glyphwiki-batch372-2026-10-09/validation.json":"a5066e955e59e73f23c6911e2a34dcd316482ec3e2f97b3e3948a3b0d05e0017","../hanja-goal-glyphwiki-batch372-2026-10-09/verify.mjs":"584a1aa6ea4c1d298535dd2fba6e918bbb960892e3e7df4e28119b2d8a3f536b","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u7037-k","file":"../hanja-goal-glyphwiki-batch812-2026-10-13/engine-whole-u7037-k.json","fileSHA256":"9cfbe9ca3dcf0ed631a8c28b5e9a885c0b0ceadb132236708ccb8c9043948439"},FIXED_PROOF_SHA="fd6584b1f86f43d65d59430eeb2b00f543df6536fffec053fea02f93a47ae0e4",FIXED_BASELINE_SHA="c565931e1404621b89a583c4c8785f5e7cb319053fadede07d5183612f360eb0"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4,5],[6],[7],[8,9],[10],[11],[12],[13,14],[16],[15],[17],[18],[19],[20],[21],[22],[23]],FACTORY_MAP=[[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20]],RAW_COUNT=24,ORIGINAL=[[{"kind":"cdDrawCurve","args":[27.8,19.7,47.8,26.595,56.6,40.385,7,8]}],[{"kind":"cdDrawCurve","args":[12.6,65.01,34.2,71.905,42.2,85.695,7,8]}],[{"kind":"cdDrawCurve","args":[14.2,131.005,42.2,139.87,39,181.24,7,8]}],[{"kind":"cdDrawCurve","args":[35,147.75,38.2,135.93,71.8,65.995,32,7]}],[{"kind":"cdDrawLine","args":[59.6,23.7552,112.64,23.7552,0,2]}],[{"kind":"cdDrawLine","args":[112.64,23.7552,112.64,58.87520000000001,22,1]},{"kind":"cdDrawCurve","args":[112.64,58.87520000000001,112.64,68.8752,102.64,68.8752,1,14]}],[{"kind":"cdDrawCurve","args":[96.26,26.462400000000002,84.56,38.193599999999996,61.94,47.217600000000004,0,7]}],[{"kind":"cdDrawCurve","args":[104.84,40.9008,90.02000000000002,56.2416,57.26,71.58239999999999,0,7]}],[{"kind":"cdDrawLine","args":[124.34,23.7552,178.16,23.7552,0,2]}],[{"kind":"cdDrawLine","args":[178.16,23.7552,178.16,58.87520000000001,22,1]},{"kind":"cdDrawCurve","args":[178.16,58.87520000000001,178.16,68.8752,168.16,68.8752,1,314]}],[{"kind":"cdDrawCurve","args":[158.66,26.462400000000002,147.74,37.291199999999996,126.68,47.217600000000004,0,7]}],[{"kind":"cdDrawCurve","args":[168.8,40.9008,152.42000000000002,55.3392,122,68.8752,0,7]}],[{"kind":"cdDrawLine","args":[79.88,81.15888,79.88,117.62975999999999,12,213]}],[{"kind":"cdDrawLine","args":[79.88,81.15888,164.12,81.15888,2,2]}],[{"kind":"cdDrawLine","args":[164.12,81.15888,164.12,117.62975999999999,22,223]}],[{"kind":"cdDrawLine","args":[122,81.15888,122,117.62975999999999,32,32]}],[{"kind":"cdDrawLine","args":[79.88,99.39432000000001,164.12,99.39432000000001,2,2]}],[{"kind":"cdDrawLine","args":[79.88,117.62975999999999,164.12,117.62975999999999,2,2]}],[{"kind":"cdDrawLine","args":[67.4,137.568,176.6,137.568,0,100]}],[{"kind":"cdDrawLine","args":[102.5,122.088,102.5,156.144,0,32]}],[{"kind":"cdDrawLine","args":[141.5,122.088,141.5,156.144,0,32]}],[{"kind":"cdDrawLine","args":[57.26,156.144,186.74,156.144,0,0]}],[{"kind":"cdDrawCurve","args":[107.18,162.887088,86.9,174.048168,58.04,182.65814399999996,0,7]}],[{"kind":"cdDrawCurve","args":[130.57999999999998,162.249312,157.88,168.627072,173.48,180.42592800000003,7,8]}]],TRACE_SHA256="350c63ea49f8e05674decb99a8739e47262806a6f712e3675780c2f3d5cff94f",GROUPS_SHA256="1119fe4ff501d91a6f97f2acd0b95437f9462b53ee3bf87f30ccd3bfd540dd43",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u7037-k',sourceGroups=[[0],[1],[2,3],[4,5],[6],[7],[8,9],[10],[11],[12],[13,14],[16],[15],[17],[18],[19],[20],[21],[22],[23]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const header=json('../hanja-goal-glyphwiki-batch372-2026-10-09/engine-proof.json');assert.deepEqual(Object.keys(header).sort(),['defaults','engineHashes','engineRevision','groups']);assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch372-2026-10-09/draw-trace.json'));for(const k of ['groups','defaults','engineRevision','engineHashes'])assert.deepEqual(proof[k],header[k]);const literalText=readFileSync(local('../hanja-goal-glyphwiki-batch372-2026-10-09/serve.py'),'utf8');const marker="'groups='+repr(";const a=literalText.indexOf(marker)+marker.length,b=literalText.indexOf(')).replace',a);assert(a>=marker.length&&b>a);assert.deepEqual(JSON.parse(literalText.slice(a,b)),sourceGroups);const s=json("../hanja-goal-glyphwiki-batch812-2026-10-13/sources.json");assert.equal(s.root,'u7037');assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions){assert.equal(sha(s.records[p.name].data),p.sha256);assert.equal(s.records[p.name].name,p.name);assert.equal(p.requestedProviderName,p.name);assert.equal(p.responseIdentity.name+'@'+p.responseIdentity.version,p.name);assert.equal(s.records[p.name].related,p.responseIdentity.related)};for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
function generateGeometry(trace,proof,identity){const sourceGroups=ORIGINAL_SOURCE_GROUPS
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
let geometryRuns=0,cachedCalls=0
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);const baseline=FACTORY_MAP.map(indices=>indices.flatMap(i=>rawBaseline[i]));geometryRuns++;return{rawBaseline,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json')[sourceRoot];assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.deepEqual(f.strokes,f.baseline);assert.deepEqual(f.baseline,FACTORY_MAP.map(indices=>indices.flatMap(i=>f.rawBaseline[i])));cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
