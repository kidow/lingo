import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import * as legacy from './progressive.mjs'

const CONFIG = {"batch":333,"glyph":"錞","captureMetadataRoot":"u931e-k","metadataStatus":"deferred-original-terminal-hook-outside-reveal-mask","sharedPins":{"metadata.json":"c9d3a835e2a8398ac15e443906b0afadfc4184b2a2d81075aeda602dac9599c6","progressive.mjs":"78770ec56d326fb02fe69f3b661e293c486f56d72f31c93f13653af5538e8737","primitive-reveal.mjs":"5326ce8367c5335536664a797d445283d00ce21a7372fe34a638a2e0fa9c7efa","validation.json":"cc1ae5db6e4064b3dddd422c6869263943eeb64171005a479f1dbaa4dbf2e507","verify.mjs":"29959a467d50d5a0396f42890b15730b1cb8e5feb42e0437192c45a417fc8db5"},"profiles":{"primary":{"root":"u931e-k","files":{"manifest":"sources.json","whole":"engine-proof.json","header":"engine-proof.json","trace":"draw-trace.json"},"pins":{"sources.json":"1e91ec612894ce10e4b18d48bea7501054671c69d9bb5454d3a30d7627c30a51","engine-proof.json":"5bf8029a6efea822b5404d0f65ad06fdf0b6eb54044cabdef6b5eccb418da167","draw-trace.json":"92292f7af6f2d9b92f625a6f932070422bc3814a40925cc9dbcc4256ccde09cb"},"fullProofSHA256":"8926dc7fa354f1ae4621d5a0dd46652da688be1750f704f3612be101c1e0b2cc","raw":18,"calls":19,"polygons":37,"emptyRaw":[],"versionNames":[],"diagnosticSupported":true,"diagnosticPens":16,"diagnosticMasks":16,"diagnosticSHA256":"ad1a2e42d88200e0de0ed8af3a30fc43d44e028934b1c73c0c96a020ef015a09","originalPolygonsExactlyOnce":true,"compilerUnsupportedReason":null,"sourceProvenanceText":"Exact whole u931e-k and all declared dependencies from pinned2016 archive; no aliases, historical records or substitutions.","provenanceTextAuthority":false,"finePens":[1,2,6,7,8,12,14,15],"provenanceTextMatchesActualRoot":true}},"sourceEngineReplayKnown":false,"sourceVerified":null,"priorActualEvidence":"validation.researchVerification is local verify.mjs PASS; verify.mjs performs no archive/engine HTTP replay; upstream pinnedEngine.hashesChecked statement is retained but independent actual replay evidence is unknown.","nativeApproval":false,"runtimeApplied":false}
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
