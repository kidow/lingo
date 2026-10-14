import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import * as legacy from './progressive.mjs'

const CONFIG = {"batch":335,"glyph":"錡","captureMetadataRoot":"u9321-k","metadataStatus":"Native domestic full16 directions and original progressive paths review pending.","sharedPins":{"metadata.json":"339a8efbf559ff0d06fff0df97edabf91106299063dc51a9bcd9280fb0eaca4f","progressive.mjs":"1111379a227834352b683b352c362060976bcf4015b66524e9aca3405b4d4ca5","primitive-reveal.mjs":"c6aac1dfc6558ca2406671a5e2665e1481e93e4ffced565934d372116300fa5c","validation.json":"af60d457cb1b49334fe3d1e28d18124fd783bb429468b2e57ae5a91cb918d343","verify.mjs":"690702ee4ab2c8a9d8b883b7c64654d7ac9db4c5f66381fe0a2ed1c47b822bbb"},"profiles":{"primary":{"root":"u9321-k","files":{"manifest":"sources.json","whole":"engine-proof.json","header":"engine-proof.json","trace":"draw-trace.json"},"pins":{"sources.json":"544d133f9c62a5539ae016262d9e94add232ebb2d25ac93076e480458466198f","engine-proof.json":"8de747e0ef213eedfecbd9600ff10b71e757dddcb4f3075a6b51b19fc36d46a3","draw-trace.json":"1b019f7e35fc8f568c11b5afc9bc2cc847fe8cb1bf8500e70470388a0cbe3080"},"fullProofSHA256":"a215dc91bdb71a7355161156a5eb62851a730411138910f419f19ead80d2b199","raw":18,"calls":18,"polygons":36,"emptyRaw":[8],"versionNames":[],"diagnosticSupported":true,"diagnosticPens":16,"diagnosticMasks":16,"diagnosticSHA256":"70585eeedecefcb9f47c611eee78677a0dd52ba0ca2853c31969afe50c6d5908","originalPolygonsExactlyOnce":true,"compilerUnsupportedReason":null,"sourceProvenanceText":"Exact whole u931f-k and all declared dependencies from pinned2016 archive; no aliases, historical records or substitutions.","provenanceTextAuthority":false,"finePens":[1,2,6,7,8,10,11,14,16],"provenanceTextMatchesActualRoot":false}},"sourceEngineReplayKnown":false,"sourceVerified":null,"priorActualEvidence":"validation.researchVerification is local verify.mjs PASS; verify.mjs performs no archive/engine HTTP replay; upstream pinnedEngine.hashesChecked statement is retained but independent actual replay evidence is unknown.","nativeApproval":false,"runtimeApplied":false}
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
