import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const repo=new URL('../../',import.meta.url),read=p=>readFileSync(new URL(p,repo)),sha=x=>createHash('sha256').update(x).digest('hex')
const s=JSON.parse(readFileSync(new URL('sources.json',import.meta.url))),r=JSON.parse(readFileSync(new URL('source-readiness.json',import.meta.url)))
assert.equal(sha(read(r.source.path)),r.source.SHA256)
for(const [p,h]of Object.entries(r.deduplication.cachedPublicSources))assert.equal(sha(read(p)),h)
for(const e of s.sourceInventory.responses)assert.deepEqual(JSON.parse(e.returnedJSONText),e.record)
const refs=(data)=>data.split('$').filter(x=>x.split(':')[0]==='99').map(x=>x.split(':')[7])
const base=n=>n.split('@')[0]
function tree(name,records,seen=[]){const n=base(name);assert(!seen.includes(n));const rec=records[n];assert(rec,n);if(name.includes('@'))assert.equal(String(rec.version),name.split('@')[1]);return rec.data.split('$').filter(l=>l.split(':')[0]!=='0').map(l=>{const a=l.split(':');return a[0]==='99'?[a.slice(0,7),a.slice(8),tree(a[7],records,[...seen,n])]:a})}
const record=s.records[s.root];assert.equal(record.version,1)
assert.deepEqual(refs(record.data),['u81e3-j@2','u7acb-04'])
const closed=['simch-kx_t087217','u81e3-j','u7acb-04'];for(const n of closed)for(const child of refs(s.records[n].data)){assert(closed.includes(base(child)))}
const drawing=n=>s.records[n].data.split('$').reduce((sum,l)=>sum+(l.startsWith('99:')?drawing(base(l.split(':')[7])):l.startsWith('0:')?0:1),0)
assert.equal(drawing(s.root),17)
const newTree=tree(s.root,s.records)
const oldResults=[]
for(const p of Object.keys(r.deduplication.cachedPublicSources)){const j=JSON.parse(read(p));const root=j.root??'hkcs_m7aea';assert.notEqual(record.data,j.records[root].data);if(!root.startsWith('kesuuko_'))assert.notEqual(JSON.stringify(newTree),JSON.stringify(tree(root,j.records)));oldResults.push({root,comparison:root.startsWith('kesuuko_')?'root-data-only-prior-closure-incomplete':'complete-recursive-structure'})}
assert.equal(s.records.hs_u7aea.data,'99:0:0:0:0:200:200:u7aea@10:0:0:0$0:-1:-1:-1')
assert.equal(s.records['simch-kx_kp0e3fa'].data,'99:0:0:0:0:200:202:u7aea@10:0:0:0')
tree('u7aea@10',s.records)
assert.equal(s.engine,0);assert.equal(s.nativeApproval,false);assert.equal(s.runtimeApplied,false)
console.log(JSON.stringify({result:'PASS-public-closure-and-exact-nonduplication-only',newCandidate:s.root+'@1',closure:closed,expandedDrawingRows:17,oldRootsCompared:oldResults,excludedWrappers:2,engine:0,nativeApproval:false,runtimeApplied:false}))
