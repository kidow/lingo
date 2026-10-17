import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
const dir = new URL('./', import.meta.url), out = new URL('./complete-primary/', dir);
const read = name => readFile(new URL(name, dir), 'utf8');
const sha = b => createHash('sha256').update(b).digest('hex');
const checks = JSON.parse(await read('source-checks.json'));
await mkdir(out, { recursive:true });
const textCache = new Map();
async function publicText(url) {
  if(!textCache.has(url)) textCache.set(url,(async()=>{
    const r=await fetch(url,{signal:AbortSignal.timeout(30000)});
    assert(r.ok,'Public source HTTP '+r.status);return r.text();
  })());
  return textCache.get(url);
}
const codes=await Promise.all(Object.entries(checks.engineHashes).map(async([name,hash])=>{
  const text=await publicText('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+checks.engineRevision+'/'+name);
  assert.equal(sha(text),hash);return text;
}));
const instrument = `const resolve=(n,seen=new Set())=>{if(seen.has(n))throw Error('alias cycle');seen.add(n);const r=records[n];if(!r)throw Error('missing '+n);const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],seen):r.data;};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`;
const report=[];
for(const spec of checks.glyphs) {
  const parentBytes=await read(spec.sourceFile);assert.equal(sha(parentBytes),spec.sourceFileSha256);
  const parent=JSON.parse(parentBytes), records={}, providers=[], supplemental=[];
  const visited=new Set();
  async function collect(name) {
    if(visited.has(name))return;visited.add(name);
    let record=parent.records[name];
    if(!record) {
      const latestUrl='https://glyphwiki.org/api/glyph?name='+encodeURIComponent(name);
      const latest=JSON.parse(await publicText(latestUrl));
      assert.equal(latest.name,name.split('@')[0]);assert.match(String(latest.version),/^\d+$/);
      const version=String(latest.version), apiUrl='https://glyphwiki.org/api/glyph?name='+encodeURIComponent(latest.name+'@'+version);
      const responseText=await publicText(apiUrl), exact=JSON.parse(responseText);
      assert.equal(exact.name,latest.name);assert.equal(String(exact.version),String(latest.version));
      assert.equal(exact.data,latest.data);assert.equal(exact.related,latest.related);
      assert.equal(typeof exact.data,'string');assert.equal(typeof exact.related,'string');
      record={name,related:exact.related,data:exact.data};
      supplemental.push({lookupName:name,fixedName:latest.name+'@'+version,apiUrl,responseIdentity:exact,responseSha256:sha(responseText),dataSha256:sha(exact.data)});
    }
    records[name]=record;
    const historical=parent.providerVersions.find(p=>p.name===name);if(historical)providers.push(historical);
    const a=record.data.match(/^\[\[([^\]]+)\]\]$/);
    const deps=a?[a[1]]:record.data.split('$').map(s=>s.split(':')).filter(p=>p[0]==='99').map(p=>p[7]);
    for(const n of deps)await collect(n);
  }
  await collect(spec.fixed);
  const source={glyph:spec.glyph,root:spec.fixed,archive:parent.archive,parentSourceFile:'../'+spec.sourceFile,parentSourceFileSha256:spec.sourceFileSha256,dependencyPolicy:'Pinned archive/historical definitions retained byte-for-byte; only absent dependency names resolved by separately recorded exact public API version. This is a fixed mixed-date closure, not a claim of a single latest upstream snapshot.',records,providerVersions:providers,supplementalProviderVersions:supplemental,missing:[]};
  const ctx=vm.createContext({records,root:spec.fixed});for(const code of codes)vm.runInContext(code,ctx,{timeout:1000});
  const p=JSON.parse(vm.runInContext(instrument,ctx,{timeout:5000}));
  const proof={engineRevision:checks.engineRevision,engineHashes:checks.engineHashes,...p};
  const sourceFile=spec.root+'-sources.json',proofFile='engine-whole-'+spec.fixed+'.json';
  const sourceBytes=JSON.stringify(source,null,2)+'\n',proofBytes=JSON.stringify(proof,null,2)+'\n';
  await writeFile(new URL(sourceFile,out),sourceBytes,{flag:'wx'});await writeFile(new URL(proofFile,out),proofBytes,{flag:'wx'});
  report.push({glyph:spec.glyph,root:spec.fixed,catalogStrokes:spec.catalogStrokes,sourceFile,sourceFileSha256:sha(sourceBytes),proofFile,proofFileSha256:sha(proofBytes),sourceComplete:true,records:Object.keys(records).length,supplemental:supplemental.map(p=>({lookupName:p.lookupName,fixedName:p.fixedName,apiUrl:p.apiUrl,dataSha256:p.dataSha256})),rawGroups:p.groups.length,drawingGroups:p.groups.filter(g=>g.polygons.length).length,polygons:p.groups.reduce((n,g)=>n+g.polygons.length,0),nativeReviewed:false,runtimeApplied:false});
}
const result={capturedAt:'2026-10-17',closurePolicy:'Source-only fixed mixed-date archive plus explicitly pinned missing API dependencies',glyphs:report,nativeReviewCount:0,runtimeApplied:false,canonicalHoldCreated:false};
await writeFile(new URL('source-checks.json',out),JSON.stringify(result,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify(result));
