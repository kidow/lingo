import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import crypto from 'node:crypto'
const dir = new URL('./', import.meta.url)
const repo = new URL('../../', import.meta.url)
const sha = b => crypto.createHash('sha256').update(b).digest('hex')
const read = name => fs.readFileSync(new URL(name, dir))
const json = name => JSON.parse(read(name))
const manifest = json('manifest.json')
export async function verifySource(id, engineCodes) {
assert(manifest.glyphs.some(g => g.root === id), 'Pass exactly one captured root')
const item = manifest.glyphs.find(g => g.root === id)
assert.equal(manifest.nativeReviewCount, 0)
assert.equal(manifest.runtimeApplied, false)
assert.equal(manifest.canonicalHoldCreated, false)
assert.equal(sha(read(manifest.license.archiveLicense.file)), manifest.license.archiveLicense.sha256)
const license = read(manifest.license.officialRevision.file)
assert.equal(sha(license), manifest.license.officialRevision.sha256)
assert(license.toString().includes('2025年9月3日'))
assert(license.toString().includes('@18版'))
assert(!license.toString().includes('古い版は存在しません'))
const codes = []
assert.deepEqual(Object.keys(engineCodes), Object.keys(manifest.engineHashes))
for (const [name, expected] of Object.entries(manifest.engineHashes)) {
  assert.equal(sha(engineCodes[name]), expected)
  const receipt=manifest.engineTransportReceipts[name]
  assert.equal(receipt.status,200)
  assert.equal(receipt.responseSHA256,expected)
  assert.equal(receipt.bytes,Buffer.byteLength(engineCodes[name]))
  assert.equal(receipt.codeStoredInCapsule,false)
  codes.push(engineCodes[name])
}
const sourceBytes = read(item.sourceFile)
const proofBytes = read(item.proofFile)
assert.equal(sha(sourceBytes), item.sourceFileSHA256)
assert.equal(sha(proofBytes), item.proofFileSHA256)
const source = JSON.parse(sourceBytes)
const proof = JSON.parse(proofBytes)
assert.equal(source.root, id)
assert.equal(source.candidate.glyph, item.glyph)
assert.equal(source.candidate.strokes, item.catalogStrokes)
assert.equal(source.candidate.readingGrade, item.readingGrade)
const catalogBytes = fs.readFileSync(new URL(source.catalog.file, repo))
assert.equal(sha(catalogBytes), source.catalog.sha256)
const catalog = JSON.parse(catalogBytes)
const findRows = value => {
  if (Array.isArray(value)) return value.flatMap(findRows)
  if (value && typeof value === 'object') return value.id === id ? [value] : Object.values(value).flatMap(findRows)
  return []
}
assert.deepEqual(findRows(catalog), [source.candidate])
const deps = record => {
  const alias = record.data.match(/^\[\[([^\]]+)\]\]$/)
  return alias ? [alias[1]] : record.data.split('$').map(s => s.split(':')).filter(s => s[0] === '99').map(s => s[7])
}
const seen = new Set()
const walk = (name, active = new Set()) => {
  assert(!active.has(name), 'Dependency cycle')
  if (seen.has(name)) return
  assert(source.records[name], 'Missing dependency')
  seen.add(name)
  for (const dependency of deps(source.records[name])) walk(dependency, new Set([...active, name]))
}
walk(id)
assert.deepEqual([...seen].sort(), Object.keys(source.records).sort())
assert.equal(seen.size, item.definitionCount)
assert.equal(source.providerDefinitions.length, seen.size)
for (const definition of source.providerDefinitions) {
  assert(seen.has(definition.lookupName))
  const p = definition.provider
  assert.equal(p.status, 200)
  assert.equal(Buffer.byteLength(p.responseText), p.bytes)
  assert.equal(sha(p.responseText), p.responseSHA256)
  const actual = JSON.parse(p.responseText)
  assert.equal(actual.name + '@' + String(actual.version), definition.fixedName)
  assert.equal(actual.name, definition.lookupName.split('@')[0])
  if (definition.lookupName.includes('@')) assert.equal(String(actual.version), definition.lookupName.split('@')[1])
  assert.equal(p.url, 'https://glyphwiki.org/api/glyph?name=' + encodeURIComponent(definition.fixedName))
  assert.deepEqual(definition.record, {name: definition.lookupName, related: actual.related, data: actual.data})
  assert.deepEqual(source.records[definition.lookupName], definition.record)
  assert.equal(sha(actual.data), definition.dataSHA256)
  if (definition.discovery) {
    const discovery = definition.discovery
    assert.equal(discovery.status, 200)
    assert.equal(sha(discovery.responseText), discovery.responseSHA256)
    assert.equal(Buffer.byteLength(discovery.responseText), discovery.bytes)
    const original = JSON.parse(discovery.responseText)
    for (const key of ['name', 'related', 'data']) assert.equal(original[key], actual[key])
    assert.equal(String(original.version), String(actual.version))
  }
}
assert.deepEqual(Object.keys(proof), ['engineRevision','engineHashes','groups','trace','defaults'])
assert.equal(proof.engineRevision, manifest.engineRevision)
assert.deepEqual(proof.engineHashes, manifest.engineHashes)
const context = vm.createContext({records: source.records, root: id})
for (const code of codes) vm.runInContext(code, context, {timeout: 1000})
const actual = JSON.parse(vm.runInContext("const resolve=(n,seen=new Set())=>{if(seen.has(n))throw Error('alias cycle');seen.add(n);const r=records[n];if(!r)throw Error('missing '+n);const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],seen):r.data;};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})", context, {timeout: 5000}))
assert.deepEqual(actual, {groups: proof.groups, trace: proof.trace, defaults: proof.defaults})
const rows = proof.groups.map((g,i) => ({g,i,t:proof.trace[i].filter(t=>t.polygons.length)})).filter(x=>x.g.polygons.length)
const joins = [], gaps = []
for (let i=1;i<rows.length;i++) {
  const a=rows[i-1], b=rows[i]
  if (JSON.stringify(a.t.at(-1).args.slice(-4,-2))===JSON.stringify(b.t[0].args.slice(0,2))) joins.push([a.i,b.i])
}
for (const row of rows) for (let i=1;i<row.t.length;i++) {
  const from=row.t[i-1].args.slice(-4,-2), to=row.t[i].args.slice(0,2)
  if (JSON.stringify(from)!==JSON.stringify(to)) gaps.push({rawIndex:row.i,from,to,gap:[to[0]-from[0],to[1]-from[1]]})
}
const diagnostic={rawGroups:proof.groups.length,drawingGroups:rows.length,polygons:proof.groups.reduce((n,g)=>n+g.polygons.length,0),emptyRawIndices:proof.groups.flatMap((g,i)=>g.polygons.length?[]:[i]),exactConsecutiveJoins:joins,conservativeRawMinimum:rows.length-joins.length,internalPrimitiveGaps:gaps}
assert.deepEqual(diagnostic,item.diagnostic)
assert.equal(source.sourceComplete,true)
for(const value of [source.nativeReviewed, source.runtimeApplied, source.canonicalHoldCreated,item.nativeReviewed,item.runtimeApplied,item.canonicalHoldCreated]) assert.equal(value,false)
const result={ok:true,root:id,definitions:seen.size,engineFilesVerified:codes.length,originalResponseHashesVerified:true,proofSHA256:sha(proofBytes),...diagnostic,catalogStrokes:item.catalogStrokes,nativeReviewCount:0,runtimeApplied:false,canonicalHoldCreated:false}
return result
}

if(typeof process !== 'undefined' && process.argv[1] && new URL('file://' + process.argv[1]).href === import.meta.url) {
  const engineCodes={}
  for(const [name, expected] of Object.entries(manifest.engineHashes)) {
    const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+manifest.engineRevision+'/'+name,{signal:AbortSignal.timeout(30000)})
    assert(response.ok)
    const code=await response.text(); assert.equal(sha(code),expected); engineCodes[name]=code
  }
  console.log(JSON.stringify(await verifySource(process.argv[2],engineCodes)))
}
