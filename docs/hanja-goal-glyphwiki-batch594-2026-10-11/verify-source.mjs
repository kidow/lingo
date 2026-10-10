import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),review=obj('progressive-review.json')
assert.equal(source.glyph,'籩');assert.equal(source.root,'u7c69')
assert.deepEqual(source.missing,['u76ee-j']);assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(source.records).length,24);assert.equal(source.providerVersions.length,14)
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
const meta=obj('metadata.json'),dictionary=await fetch(meta.dictionary.url);assert(dictionary.ok);const bytes=Buffer.from(await dictionary.arrayBuffer());assert.equal(bytes.length,meta.dictionary.bytes);assert.equal(sha(bytes),meta.dictionary.sha256);assert.equal((bytes.toString().match(/clip-path="url\(#/g)||[]).length,25);assert(bytes.toString().includes('<title>籩</title>'));
assert.equal(source.records['u76ee@5'].data,'99:0:0:0:0:200:200:u76ee-j');assert.equal(map.has('u76ee-j'),false);assert.equal(review.fullSourceFamilyCaptured,false);assert.equal(review.progressiveFramesApproved,0);assert.equal(review.runtimeApplied,false);assert.equal(hanjaStrokeData({glyph:'籩',strokes:25}),null);
console.log(JSON.stringify({passed:true,glyph:'籩',records:24,roots:6,histories:14,missing:['u76ee-j'],fullSourceFamilyCaptured:false,nativePensReviewed:0,nativeFrames:0,runtimeApplied:false,privateMediaSaved:false}));

const history=obj('missing-source-history.json');for(const h of history.versions){const r=await fetch(h.url);assert(r.ok);const a=await r.json();assert.equal(a.name,'u76ee-j');assert.equal(Number(a.version),Number(h.version));assert.equal(a.related,h.related);assert.equal(a.data,h.data);}assert.equal(history.versions[0].data,'99:0:0:0:0:200:200:u76ee@5');assert.equal(history.nativeBrowser,603);assert.equal(history.nativeCreatedAt,'2018-05-17 20:35 JST');
