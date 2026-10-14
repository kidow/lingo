import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import * as legacy from './progressive.mjs'

const CONFIG = {"batch":337,"glyph":"擎","captureMetadataRoot":"u64ce-k","metadataStatus":"Native original grass partition mismatch; full historical17 crosschecked, pen6/17 terminal reveal failed; no runtime.","sharedPins":{"metadata.json":"465be8ec652d4d834e19296955ef6b01acda8842432e1bb50249b492a7b4113b","progressive.mjs":"abfdea9acaf4a24bc54d34e800ca1f22862cd379d9f06f9482f41339ffa1c7cb","primitive-reveal.mjs":"a427bfe3c1d8eabc041098f684d32afe82aeeaf30f90b4953f2dcee664ff4c84","validation.json":"b75a11379064b6988936931b74d47181a7159873cd49b69142c97ed86578f8c0","verify.mjs":"72e2802abd98e3f8c21de9e7c83dbb45452b749f9dc7f709ca64a0b1aae7db67"},"profiles":{"primary":{"root":"u64ce-k","files":{"manifest":"sources.json","whole":"engine-proof.json","header":"engine-proof.json","trace":"draw-trace.json"},"pins":{"sources.json":"6d29f2bda0f9449848ec35945914f38b1be6222e9aaa874dd8a26503d538e942","engine-proof.json":"a416c3cbdc2ed452349a07a87b66557413b515744debe40b6ea78b72c9b9b8c8","draw-trace.json":"6518a1e3fa532ec388e3bd7a79bf91b2bfb9bca3dfd99e1962758ea8e5c441e8"},"fullProofSHA256":"955d0ef1d702bc7f71bc0aa5699a1dd40de5d3bf678bf906fe9d9cbd15d0f5d4","raw":18,"calls":20,"polygons":38,"emptyRaw":[],"versionNames":[],"diagnosticSupported":false,"diagnosticPens":0,"diagnosticMasks":0,"diagnosticSHA256":null,"originalPolygonsExactlyOnce":null,"compilerUnsupportedReason":"Expected values to be strictly equal:\n\n18 !== 19\n","sourceProvenanceText":"Exact whole u931f-k and all declared dependencies from pinned2016 archive; no aliases, historical records or substitutions.","provenanceTextAuthority":false,"finePens":[],"provenanceTextMatchesActualRoot":false},"historical":{"root":"u64ce-ue0102","files":{"manifest":"historical-sources.json","whole":"historical-engine-proof.json","header":"historical-engine-proof.json","trace":"historical-draw-trace.json"},"pins":{"historical-sources.json":"b1148174c0c954c409c1ed1830fa278e2a3ba5c4748cd599e605ae40933976ee","historical-engine-proof.json":"4698ebd91c71375814a0ce4d91daaad7e9ab1c55060126c07a5b079ddaa589ab","historical-draw-trace.json":"be3d6745a59579420b5554d1ec294900d7a9d178fd26c626182a8561dbeb76aa"},"fullProofSHA256":"9e3a1c92b2cccaa422704729a2c1d2a422d07536333cfa92ebe5fa5421032e75","raw":19,"calls":21,"polygons":39,"emptyRaw":[],"versionNames":["u656c-var-002@1","u53e3@12","u53e3-j@2","u6535-02@9"],"diagnosticSupported":true,"diagnosticPens":17,"diagnosticMasks":17,"diagnosticSHA256":"cf7fccec16d2e4b9b95e0f35d3dafb105d027af7ec92abeebe40a32f7b8d5b73","originalPolygonsExactlyOnce":true,"compilerUnsupportedReason":null,"sourceProvenanceText":"Exact whole u64ce-ue0102 and declared dependencies from pinned2016 archive; named historical versions captured exactly via GlyphWiki API without latest substitution. Native domestic review pending.","provenanceTextAuthority":false,"finePens":[5,6,8,10,12,13,14,17],"provenanceTextMatchesActualRoot":true},"historical2":{"root":"u64ce-var-001","files":{"manifest":"historical2-sources.json","whole":"historical2-engine-proof.json","header":"historical2-engine-proof.json","trace":"historical2-draw-trace.json"},"pins":{"historical2-sources.json":"0d28d6352fd398dd664812d59d6f90d52493a5747e00095217bd6d00be373aa7","historical2-engine-proof.json":"d1a34e88cdb4353b96331beee97e675503dc4ecb9de62e1bfbc2ac22d2e19b84","historical2-draw-trace.json":"3debdf0c30ac5b3ec6d758d58929d67b8238c5c0d3730e4bfd4286099118f3de"},"fullProofSHA256":"a9e204229cc12e79485ba23ba9903dbebf47980eea64348522f05c7b733b908e","raw":19,"calls":21,"polygons":40,"emptyRaw":[],"versionNames":["u656c-var-001@2","u53e3@12","u53e3-j@2","u6535-02@9","u8279-k03@4","ufa5e-03@3"],"diagnosticSupported":false,"diagnosticPens":0,"diagnosticMasks":0,"diagnosticSHA256":null,"originalPolygonsExactlyOnce":null,"compilerUnsupportedReason":"all other original pen trajectories must be continuous\n+ actual - expected\n\n  [\n+   90.39699999999999,\n+   108.46\n-   120.1857,\n-   45.785\n  ]\n","sourceProvenanceText":"Exact whole u64ce-var-001 and declared dependencies from pinned2016 archive; named historical versions captured exactly via GlyphWiki API without latest substitution. Native domestic review pending.","provenanceTextAuthority":false,"finePens":[],"provenanceTextMatchesActualRoot":true}},"sourceEngineReplayKnown":false,"sourceVerified":null,"priorActualEvidence":"validation.researchVerification is local verify.mjs PASS; verify.mjs performs no archive/engine HTTP replay; upstream pinnedEngine.hashesChecked statement is retained but independent actual replay evidence is unknown.","nativeApproval":false,"runtimeApplied":false}
const sha = value => createHash('sha256').update(value).digest('hex')
const freeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value) } return value }
freeze(CONFIG)
const read = name => readFileSync(new URL(name, import.meta.url))
const object = name => JSON.parse(read(name))
const canonical = points => {
  const row = points.map(point => point.join(','))
  const choices = []
  for (const ordered of [row, [...row].reverse()]) for (let i = 0; i < ordered.length; i++) choices.push([...ordered.slice(i), ...ordered.slice(0, i)].join(';'))
  return choices.sort()[0]
}
function identityFor(profile) {
  const p = CONFIG.profiles[profile]
  assert(p, 'Unknown legacy whole profile')
  return {
    profile, sourceRoot: p.root,
    wholeFile: p.files.whole, wholeFileSHA256: p.pins[p.files.whole],
    headerFile: p.files.header, headerFileSHA256: p.pins[p.files.header],
    traceFile: p.files.trace, traceFileSHA256: p.pins[p.files.trace],
    manifestFile: p.files.manifest, manifestFileSHA256: p.pins[p.files.manifest],
    metadataFile: 'metadata.json', metadataFileSHA256: CONFIG.sharedPins['metadata.json'],
    compilerFile: 'progressive.mjs', compilerFileSHA256: CONFIG.sharedPins['progressive.mjs'],
    primitiveFile: 'primitive-reveal.mjs', primitiveFileSHA256: CONFIG.sharedPins['primitive-reveal.mjs']
  }
}
export const legacyWholeIdentities = freeze(Object.fromEntries(Object.keys(CONFIG.profiles).map(profile => [profile, identityFor(profile)])))
function pinFiles(profile) {
  const p = CONFIG.profiles[profile]
  for (const [file, pin] of Object.entries({ ...CONFIG.sharedPins, ...p.pins })) assert.equal(sha(read(file)), pin, 'Original byte pin changed: ' + file)
}
export function pinnedLegacyFullProof(identity) {
  assert(identity && typeof identity.profile === 'string', 'Explicit legacy whole/file/header/trace/metadata/compiler identity required')
  assert.deepEqual(identity, legacyWholeIdentities[identity.profile], 'Exact legacy whole identity required; profiles cannot be mixed')
  pinFiles(identity.profile)
  const p = CONFIG.profiles[identity.profile], h = object(p.files.whole), trace = object(p.files.trace), source = object(p.files.manifest), metadata = object('metadata.json')
  assert.deepEqual(Object.keys(h).sort(), ['defaults', 'engineHashes', 'engineRevision', 'groups'])
  assert.equal(source.root, p.root)
  assert(source.records[p.root], 'Declared whole root must be present in original records')
  assert.equal(metadata.glyph, CONFIG.glyph)
  assert.equal(metadata.root, CONFIG.captureMetadataRoot, 'Metadata capture root stays distinct from historical selected root')
  assert.equal(h.groups.length, trace.length)
  for (let i = 0; i < trace.length; i++) assert.deepEqual(trace[i].flatMap(call => call.polygons), h.groups[i].polygons, 'Original raw call polygons must equal captured whole group ' + i)
  const full = { engineRevision: h.engineRevision, engineHashes: h.engineHashes, groups: h.groups, trace, defaults: h.defaults }
  assert.equal(sha(JSON.stringify(full)), p.fullProofSHA256, 'Exact full trace and whole/header relation is frozen')
  return full
}
export function validateLegacyFullProof(fullProof, identity) {
  const expected = pinnedLegacyFullProof(identity)
  assert.deepEqual(Object.keys(fullProof).sort(), ['defaults', 'engineHashes', 'engineRevision', 'groups', 'trace'])
  assert.deepEqual(fullProof, expected, 'Complete original whole/header/trace proof must match')
  return { localOnly: true, sourceRoot: identity.sourceRoot, sourceEngineReplayKnown: false, sourceVerified: null, nativeApproval: false, runtimeApplied: false }
}
export function compileLegacyDiagnostic(fullProof, identity) {
  validateLegacyFullProof(fullProof, identity)
  const p = CONFIG.profiles[identity.profile]
  assert(p.diagnosticSupported, 'Original legacy compiler does not support this profile; no trace substitution or gap repair: ' + p.compilerUnsupportedReason)
  const callerBefore = JSON.stringify(fullProof)
  const trace = structuredClone(fullProof.trace), proof = object(p.files.whole), before = JSON.stringify({ trace, proof })
  const strokes = legacy.compileProgressive(trace, proof)
  assert.equal(JSON.stringify({ trace, proof }), before, 'Original legacy diagnostic inputs must remain unchanged')
  assert.equal(JSON.stringify(fullProof), callerBefore, 'Caller full proof must remain unchanged')
  assert.equal(sha(JSON.stringify(strokes)), p.diagnosticSHA256, 'Existing numeric diagnostic output, paths, masks and weights are immutable')
  const original = proof.groups.flatMap(group => group.polygons).map(poly => canonical(poly.map(vertex => [vertex.x / 2, vertex.y / 2]))).sort()
  const emitted = strokes.flat().flatMap(mask => mask.outline.split('Z').map(path => path.trim()).filter(Boolean)).map(path => {
    const coordinates = [...path.matchAll(/-?\d+(?:\.\d+)?(?:e[-+]?\d+)?/gi)].map(match => Number(match[0]))
    return canonical(Array.from({ length: coordinates.length / 2 }, (_, i) => coordinates.slice(i * 2, i * 2 + 2)))
  }).sort()
  assert.deepEqual(emitted, original, 'Each original polygon must appear exactly once in the existing diagnostic')
  return { diagnosticOnly: true, sourceEngineReplayKnown: false, sourceVerified: null, nativeApproval: false, runtimeApplied: false, strokes }
}
export const sourceEngineReplayKnown = false
export const sourceVerified = null
export const nativeApproval = false
export const runtimeApplied = false
