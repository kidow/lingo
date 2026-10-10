import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),review=obj('progressive-review.json')
assert.equal(source.glyph,'纆');assert.equal(source.root,'u7e86')
assert.deepEqual(source.missing,['u571f-j']);assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(source.records).length,13);assert.equal(source.providerVersions.length,6)
const archiveResponse=await fetch(source.archive.url);assert(archiveResponse.ok)
const archive=await archiveResponse.text();assert.equal(sha(archive),source.archive.sha256)
const map=new Map(archive.split('\n').map(l=>l.split('|').map(s=>s.trim())).filter(a=>a.length>=3).map(a=>[a[0],{name:a[0],related:a[1],data:a[2]}]))
for(const [name,record] of Object.entries(source.records)){
 if(/@\d+$/.test(name)){
  const version=source.providerVersions.find(v=>v.name===name);assert(version)
  const response=await fetch(version.apiUrl);assert(response.ok);const actual=await response.json()
  assert.equal(actual.name,name.split('@')[0]);assert.equal(Number(actual.version),version.version)
  assert.equal(actual.related,record.related);assert.equal(actual.data,record.data);assert.equal(sha(actual.data),version.sha256)
 }else assert.deepEqual(map.get(name),record)
}
const missing=new Set();const seen=new Set();function visit(name){if(seen.has(name))return;seen.add(name);const r=source.records[name];if(!r){missing.add(name);return;}for(const line of r.data.split('$'))if(line.startsWith('99:'))visit(line.split(':')[7]);const alias=r.data.match(/^\[\[([^\]]+)\]\]$/);if(alias)visit(alias[1]);}for(const n of source.wholeNames)visit(n);assert.deepEqual([...missing].sort(),source.missing.slice().sort());
const meta=obj('metadata.json'),dictionary=await fetch(meta.dictionary.url);assert(dictionary.ok);const bytes=Buffer.from(await dictionary.arrayBuffer());assert.equal(bytes.length,meta.dictionary.bytes);assert.equal(sha(bytes),meta.dictionary.sha256);assert.equal((bytes.toString().match(/clip-path="url\(#/g)||[]).length,21);assert(bytes.toString().includes('<title>纆</title>'));
assert.equal(source.records['u571f@6'].data,'99:0:0:0:0:200:200:u571f-j');assert.equal(review.fullSourceFamilyCaptured,false);assert.equal(review.progressiveFramesApproved,0);assert.equal(review.runtimeApplied,false);assert.equal(hanjaStrokeData({glyph:'纆',strokes:21}),null);
console.log(JSON.stringify({passed:true,glyph:'纆',records:13,roots:4,histories:6,missing:['u571f-j'],fullSourceFamilyCaptured:false,nativePensReviewed:0,nativeFrames:0,runtimeApplied:false,privateMediaSaved:false}));
