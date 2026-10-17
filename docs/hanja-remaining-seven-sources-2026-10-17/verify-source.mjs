import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
const dir = new URL('./', import.meta.url);
const read = n => readFile(new URL(n, dir), 'utf8');
const obj = async n => JSON.parse(await read(n));
const sha = b => createHash('sha256').update(b).digest('hex');
const initial = await obj('source-checks.json'), complete = await obj('complete-primary/source-checks.json');
const cache = new Map();
async function publicText(url) {
  if(!cache.has(url))cache.set(url,(async()=>{const r=await fetch(url,{signal:AbortSignal.timeout(60000)});assert(r.ok);return r.text()})());
  return cache.get(url);
}
const archiveText=await publicText(initial.archive.url);assert.equal(sha(archiveText),initial.archive.sha256);
const map=new Map(archiveText.split('\n').map(l=>l.split('|').map(s=>s.trim())).filter(a=>a.length>=3).map(a=>[a[0],{name:a[0],related:a[1],data:a[2]}]));
assert.equal(sha(await read(initial.license.file)),initial.license.sha256);
assert.equal(await publicText(initial.license.url),await read(initial.license.file));
const codes=await Promise.all(Object.entries(initial.engineHashes).map(async([name,hash])=>{const text=await publicText('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+initial.engineRevision+'/'+name);assert.equal(sha(text),hash);return text}));
const instrument = `const resolve=(n,seen=new Set())=>{if(seen.has(n))throw Error('alias cycle');seen.add(n);const r=records[n];if(!r)throw Error('missing '+n);const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],seen):r.data;};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`;
const deps=r=>{const a=r.data.match(/^\[\[([^\]]+)\]\]$/);return a?[a[1]]:r.data.split('$').map(s=>s.split(':')).filter(p=>p[0]==='99').map(p=>p[7])};
function closure(records,root) {const selected={},missing=new Set(),seen=new Set();const walk=n=>{if(seen.has(n))return;seen.add(n);if(!records[n]){missing.add(n);return}selected[n]=records[n];for(const d of deps(records[n]))walk(d)};walk(root);return {selected,missing:[...missing].sort()};}
async function provider(p,record,supplemental=false) {
  const text=await publicText(p.apiUrl),d=JSON.parse(text);
  assert.deepEqual(d,p.responseIdentity);assert.equal(d.data,record.data);assert.equal(d.related,record.related);
  // The API changes JSON key order between otherwise identical fixed-version responses.
  // Verify captured transport serialization locally and refetched identities semantically above.
  assert.equal(sha(JSON.stringify(p.responseIdentity)),p.responseSha256);
  if(supplemental){assert.equal(sha(d.data),p.dataSha256);assert.equal(d.name+'@'+String(d.version),p.fixedName);}
  else {assert.equal(d.name,p.name.split('@')[0]);assert.equal(String(d.version),p.version);assert.equal(sha(d.data),p.sha256);}
}
let proofs=0, initialSources=0, fixedSources=0, supplementalDefinitions=0, historicalDefinitions=0;
async function proof(records,w,prefix) {
  const c=closure(records,w.root);assert.deepEqual(c.missing,w.sourceComplete?[]:w.missing);
  if(!w.sourceComplete)return;
  const bytes=await read(prefix+w.proofFile),p=JSON.parse(bytes);assert.equal(sha(bytes),w.proofSha256??w.proofFileSha256);
  assert.equal(p.engineRevision,initial.engineRevision);assert.deepEqual(p.engineHashes,initial.engineHashes);
  const ctx=vm.createContext({records:c.selected,root:w.root});for(const code of codes)vm.runInContext(code,ctx,{timeout:1000});
  const actual=JSON.parse(vm.runInContext(instrument,ctx,{timeout:5000}));
  assert.deepEqual(actual.groups,p.groups);assert.deepEqual(actual.trace,p.trace);assert.deepEqual(actual.defaults,p.defaults);
  assert.equal(p.groups.length,w.rawGroups);assert.equal(p.groups.filter(g=>g.polygons.length).length,w.drawingGroups);
  assert.equal(p.groups.reduce((n,g)=>n+g.polygons.length,0),w.polygons);assert.equal(w.nativeReviewed,false);proofs++;
}
for(const g of initial.glyphs) {
  const bytes=await read(g.sourceFile);assert.equal(sha(bytes),g.sourceFileSha256);const s=JSON.parse(bytes);
  assert.equal(s.glyph,g.glyph);assert.equal(s.root,g.root);assert.deepEqual(s.archive,initial.archive);
  for(const[name,r]of Object.entries(s.records)) {
    if(/@\d+$/.test(name)){const p=s.providerVersions.find(p=>p.name===name);assert(p);await provider(p,r);historicalDefinitions++;}
    else assert.deepEqual(r,map.get(name));
  }
  assert.deepEqual(s.wholeNames,g.whole.map(w=>w.root));
  assert.deepEqual([...new Set(s.wholeNames.flatMap(n=>closure(s.records,n).missing))].sort(),s.missing);
  for(const w of g.whole)await proof(s.records,w,'');
  assert.equal(g.nativeReviewed,false);assert.equal(g.runtimeApplied,false);initialSources++;
}
for(const g of complete.glyphs) {
  const bytes=await read('complete-primary/'+g.sourceFile);assert.equal(sha(bytes),g.sourceFileSha256);const s=JSON.parse(bytes);
  const parentBytes=await read(s.parentSourceFile.replace(/^\.\.\//,''));assert.equal(sha(parentBytes),s.parentSourceFileSha256);const parent=JSON.parse(parentBytes);
  for(const[name,r]of Object.entries(s.records)) {
    if(parent.records[name])assert.deepEqual(r,parent.records[name]);
    else {const p=s.supplementalProviderVersions.find(p=>p.lookupName===name);assert(p);await provider(p,r,true);supplementalDefinitions++;}
  }
  assert.deepEqual(closure(s.records,s.root).missing,[]);
  await proof(s.records,g,'complete-primary/');fixedSources++;
}
assert.equal(initial.nativeReviewCount,0);assert.equal(complete.nativeReviewCount,0);
assert.equal(initial.runtimeApplied,false);assert.equal(complete.runtimeApplied,false);
assert.equal(initial.canonicalHoldCreated,false);assert.equal(complete.canonicalHoldCreated,false);
console.log(JSON.stringify({ok:true,initialSourceCapsules:initialSources,completePrimaryCapsules:fixedSources,wholeProofsReproduced:proofs,historicalDefinitions,supplementalDefinitions,engineFilesVerified:codes.length,archiveSha256:sha(archiveText),licenseSha256:initial.license.sha256,nativeReviewCount:0,runtimeApplied:false,canonicalHoldCreated:false}));
