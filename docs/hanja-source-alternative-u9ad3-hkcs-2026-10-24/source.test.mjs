import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex'),s=read('./sources.json'),path='../hanja-source-alternatives-g1-five-2026-10-24.json',old=read(path),start=performance.now()
assert.equal(sha(readFileSync(new URL(path,import.meta.url))),s.provenance.preservedExisting.SHA256)
for(const key of s.provenance.preservedExisting.recordNames){const r=old.records.find(v=>v.query===key);assert(r);assert.equal(s.records[key].data,r.exactPublicData);assert.equal(s.records[key].name,r.name);assert.equal(s.records[key].version,r.version)}
assert.equal(s.providerRoot,'hkcs_m9ad3');assert.equal(s.localArtifactTagIsProviderRoot,false);assert.deepEqual(Object.keys(s.records),s.recordNames);assert.deepEqual(s.versions,s.recordNames.map(n=>[n,s.records[n].version]))
const seen=new Set(),stack=new Set(),refs=[];let rows=0,metadata=0
function visit(key){assert(!stack.has(key));if(seen.has(key))return;const r=s.records[key];assert(r,'Missing literal dependency');const m=key.match(/^(.*)@(\d+)$/);assert.equal(r.name,m?m[1]:key);if(m)assert.equal(Number(r.version),Number(m[2]));stack.add(key);for(const row of r.data.split('$')){const a=row.split(':');if(a[0]==='99'){refs.push([key,a[7]]);visit(a[7])}else{assert(Number.isFinite(Number(a[0])));rows++;if(row==='0')metadata++}}stack.delete(key);seen.add(key)}
visit(s.providerRoot);assert.equal(seen.size,5);assert.equal(rows,30);assert.equal(metadata,1);assert.equal(s.records['hkcs_cdp-8ca9-16@1'].data.split('$')[5],'0');assert.equal(s.records['hkcs_m9040@2'].data.split('$')[0].split(':')[7],'hkcs_cdp-8ca9-16@1')
assert.equal(s.provenance.mixedDateProviderClosure,true);assert.equal(s.provenance.historicalArchiveRestoration,false);assert.equal(s.provenance.aliasInserted,false);assert.equal(s.nativeApproval,false);assert.equal(s.runtimeApplied,false)
console.log(JSON.stringify({newAuthoredClosureFIRSTPASS:true,root:s.providerRoot,records:5,unexpandedLeafRowsIncludingMetadata:rows,originalMetadataRows:metadata,refs,engine:0,sourceProjection:0,SHA256:sha(readFileSync(new URL('./sources.json',import.meta.url))),durationMs:performance.now()-start}))
