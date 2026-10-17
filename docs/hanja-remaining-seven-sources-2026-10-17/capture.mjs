import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

// Public-source acquisition only. No dictionary image, runtime registration or native approval.
const dir = new URL('./', import.meta.url);
const sha = b => createHash('sha256').update(b).digest('hex');
const archive = {
  url: 'https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt',
  sha256: '7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62',
  repositoryRevision: 'a7dd7f3d911936770fa742e8c37d16bee7e2173c'
};
const engineRevision = '49232bac0348fe815f4200d4116ab7917e0db47f';
const engineHashes = {
  '2d.js': 'dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942',
  'buhin.js': '6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456',
  'curve.js': '77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da',
  'kage.js': 'c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78',
  'kagecd.js': '489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860',
  'kagedf.js': 'e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847',
  'polygon.js': 'f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2',
  'polygons.js': '111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a'
};
const specs = [
  { glyph:'瀆', root:'u7006', grade:'1급', catalogStrokes:18, fixed:'u7006@18', requirement:'Domestic 賣 middle is 四 with inner 八; old MM uses 罒. A regional name alone does not establish compatibility.' },
  { glyph:'朕', root:'u6715', grade:'1급', catalogStrokes:10, fixed:'u6715-k@5', requirement:'Domestic left 月 has two right-descending dots; old Ja/MM/Hans have two horizontal strokes.' },
  { glyph:'讒', root:'u8b92', grade:'1급', catalogStrokes:24, fixed:'u8b92@12', requirement:'Domestic stroke 18 crosses lower component in a shallow right descent; old MM/Ja have a shorter entry/sweep.' },
  { glyph:'鱉', root:'u9c49', grade:'특급II', catalogStrokes:23, fixed:'u9c49-k@18', requirement:'Catalog 23 vs old MM 22; domestic upper left-falling then dot differs from Taiwan dot then left-falling. Hook/full geometry remains to check.' },
  { glyph:'宬', root:'u5bac', grade:'특급II', catalogStrokes:10, fixed:'u5bac@13', requirement:'Catalog 10 vs old Hans 9. First dot direction and whole-form stroke accounting require domestic comparison.' },
  { glyph:'篠', root:'u7be0', grade:'특급II', catalogStrokes:16, fixed:'u7be0@13', requirement:'Exact domestic whole form, 16-stroke grouping, sequence and directions remain unverified.' },
  { glyph:'諞', root:'u8ade', grade:'특급', catalogStrokes:16, fixed:'u8ade@8', requirement:'Exact domestic whole form, 16-stroke grouping, sequence and directions remain unverified.' }
];
const textCache = new Map();
async function publicText(url) {
  if (!textCache.has(url)) textCache.set(url, (async () => {
    const r = await fetch(url, { signal:AbortSignal.timeout(60000) });
    assert(r.ok, 'Public source HTTP ' + r.status);
    return r.text();
  })());
  return textCache.get(url);
}
async function freshWrite(name, content) {
  const url = new URL(name, dir);
  try { await access(url); throw Error('Refusing to overwrite ' + name); }
  catch (e) { if (e.code !== 'ENOENT') throw e; }
  await writeFile(url, content, { flag:'wx' });
}
const json = v => JSON.stringify(v, null, 2) + '\n';
const archiveText = await publicText(archive.url);
assert.equal(sha(archiveText), archive.sha256);
const map = new Map(archiveText.split('\n').map(l=>l.split('|').map(s=>s.trim())).filter(a=>a.length>=3).map(a=>[a[0],{name:a[0],related:a[1],data:a[2]}]));
const licenseUrl = archive.url.replace('dump_newest_only.txt','LICENSE.txt');
const licenseText = await publicText(licenseUrl);
const codes = await Promise.all(Object.entries(engineHashes).map(async ([name, hash]) => {
  const text = await publicText('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+engineRevision+'/'+name);
  assert.equal(sha(text), hash); return text;
}));
const instrument = `const resolve=(n,seen=new Set())=>{if(seen.has(n))throw Error('alias cycle');seen.add(n);const r=records[n];if(!r)throw Error('missing '+n);const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],seen):r.data;};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`;
const report = [];
for (const spec of specs) {
  const names = [...map.keys()].filter(n=>new RegExp('^'+spec.root+'(?:-(?:g|h|j|kp|k|t|v|ue010[0-9a-f]|var-[0-9]{3}|itaiji-[0-9]{3}))?$').test(n)).sort();
  names.push(spec.fixed);
  const records = {}, providerVersions = [], missing = new Set(), visited = new Set();
  async function collect(name) {
    if(visited.has(name))return; visited.add(name);
    let record;
    if(/@\d+$/.test(name)) {
      const apiUrl='https://glyphwiki.org/api/glyph?name='+encodeURIComponent(name);
      const body=await publicText(apiUrl), d=JSON.parse(body), version=name.split('@').at(-1);
      assert.equal(d.name,name.split('@')[0]); assert.equal(String(d.version),version);
      assert.equal(typeof d.data,'string'); assert.equal(typeof d.related,'string');
      record={name,related:d.related,data:d.data};
      providerVersions.push({name,version,apiUrl,responseIdentity:d,sha256:sha(d.data),responseSha256:sha(body)});
    } else record=map.get(name);
    if(!record){missing.add(name);return;} records[name]=record;
    const alias=record.data.match(/^\[\[([^\]]+)\]\]$/);
    const deps=alias?[alias[1]]:record.data.split('$').map(s=>s.split(':')).filter(p=>p[0]==='99').map(p=>p[7]);
    for(const dep of deps)await collect(dep);
  }
  for(const name of names)await collect(name);
  const capsule={archive,glyph:spec.glyph,root:spec.root,wholeNames:names,records,missing:[...missing].sort(),providerVersions};
  const closure=(name,seen=new Set())=>{if(seen.has(name))return [];seen.add(name);const r=records[name];if(!r)return[name];const a=r.data.match(/^\[\[([^\]]+)\]\]$/);const ds=a?[a[1]]:r.data.split('$').map(s=>s.split(':')).filter(p=>p[0]==='99').map(p=>p[7]);return [...new Set(ds.flatMap(n=>closure(n,seen)))].sort()};
  const whole=[];
  for(const name of names) {
    const absent=closure(name); if(absent.length){whole.push({root:name,sourceComplete:false,missing:absent});continue;}
    const subset={};const fill=(n)=>{if(subset[n])return;const r=records[n];subset[n]=r;const a=r.data.match(/^\[\[([^\]]+)\]\]$/);for(const dep of a?[a[1]]:r.data.split('$').map(s=>s.split(':')).filter(p=>p[0]==='99').map(p=>p[7]))fill(dep)};fill(name);
    const ctx=vm.createContext({records:subset,root:name});for(const code of codes)vm.runInContext(code,ctx,{timeout:1000});
    const p=JSON.parse(vm.runInContext(instrument,ctx,{timeout:5000}));
    const proof={engineRevision,engineHashes,...p}; const bytes=json(proof), file='engine-whole-'+name+'.json';
    await freshWrite(file,bytes);
    whole.push({root:name,sourceComplete:true,recordCount:Object.keys(subset).length,proofFile:file,proofSha256:sha(bytes),rawGroups:p.groups.length,drawingGroups:p.groups.filter(g=>g.polygons.length).length,polygons:p.groups.reduce((n,g)=>n+g.polygons.length,0),drawingCalls:p.trace.flat().length,aliasOf:records[name].data.match(/^\[\[([^\]]+)\]\]$/)?.[1]??null,nativeReviewed:false});
  }
  const sourceBytes=json(capsule); await freshWrite(spec.root+'-sources.json',sourceBytes);
  report.push({...spec,sourceFile:spec.root+'-sources.json',sourceFileSha256:sha(sourceBytes),records:Object.keys(records).length,historicalDependencies:providerVersions.length,whole,sourceCompleteRoots:whole.filter(w=>w.sourceComplete).length,nativeReviewed:false,runtimeApplied:false});
}
await freshWrite('archive-LICENSE.txt',licenseText);
await freshWrite('source-checks.json',json({capturedAt:'2026-10-17',archive,license:{url:licenseUrl,file:'archive-LICENSE.txt',sha256:sha(licenseText)},engineRevision,engineHashes,glyphs:report,privateDomesticGraphicsCaptured:false,nativeReviewCount:0,runtimeApplied:false,canonicalHoldCreated:false}));
console.log(JSON.stringify({ok:true,archiveSha256:sha(archiveText),glyphs:report.map(({glyph,catalogStrokes,records,historicalDependencies,whole})=>({glyph,catalogStrokes,records,historicalDependencies,whole})),nativeReviewCount:0,runtimeApplied:false}));
