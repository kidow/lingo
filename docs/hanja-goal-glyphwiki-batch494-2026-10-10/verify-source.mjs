import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),proof=obj('engine-reference.json'),review=obj('whole-review.json')
assert.equal(source.glyph,'鼐');assert.equal(source.root,'u9f10')
assert.deepEqual(source.missing,['u76ee-j']);assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(source.records).length,10);assert.equal(source.providerVersions.length,5)
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
const inventory=obj('whole-variant-inventory.json');assert.equal(inventory.archiveVerified,true);assert.equal(inventory.engineFiles,8);assert.deepEqual(inventory.wholeVariants.map(v=>v.root).sort(),source.wholeNames.slice().sort());for(const v of inventory.wholeVariants)assert.equal(map.get(v.root).data,v.rootData);for(const v of review.wholeVariants){assert.equal(map.get(v.name).related,v.related);assert.equal(map.get(v.name).data,v.data);}const meta=obj('metadata.json'),dictionary=await fetch(meta.dictionary.url);assert(dictionary.ok);const bytes=Buffer.from(await dictionary.arrayBuffer());assert.equal(bytes.length,meta.dictionary.bytes);assert.equal(sha(bytes),meta.dictionary.sha256);assert.equal((bytes.toString().match(/clip-path="url\(#/g)||[]).length,meta.dictionaryStrokes);assert(bytes.toString().includes('<title>'+meta.glyph+'</title>'));

assert.equal(map.has('u76ee-j'),false);assert.equal(source.records['u76ee@5'].data,'99:0:0:0:0:200:200:u76ee-j');const candidates=obj('missing-dependency-candidates.json');assert.equal(candidates.length,2);for(const v of candidates){const r=await fetch(v.apiUrl);assert(r.ok);const actual=await r.json();assert.equal(actual.name,v.name.split('@')[0]);assert.equal(Number(actual.version),v.version);assert.equal(actual.related,v.related);assert.equal(actual.data,v.data);}assert.equal(candidates[0].data,'99:0:0:0:0:200:200:u76ee@5');assert.equal(candidates[1].data.split('$').length,6);for(const [file,hash]of Object.entries(proof.engineHashes)){const r=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file);assert(r.ok);assert.equal(sha(await r.text()),hash);}assert.equal(review.runtimeApplied,false);assert.equal(review.geometryReviewPassed,false);assert.equal(review.progressiveFramesApproved,0);assert.equal(meta.corpusStrokes,15);assert.equal(meta.dictionaryStrokes,15);assert.equal(hanjaStrokeData({glyph:'鼐',strokes:15}),null);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='鼐').length,0);console.log(JSON.stringify({passed:true,glyph:'鼐',sourceOnly:true,records:10,roots:4,histories:5,missing:1,explicitUnselectedVersionCandidates:2,engineReferenceFiles:8,domesticPens:15,runtimeApplied:false,nativeFramesApproved:0,privateMediaSaved:false}));
