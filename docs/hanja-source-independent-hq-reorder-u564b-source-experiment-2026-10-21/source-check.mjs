import assert from 'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{spawnSync}from'node:child_process';import{fileURLToPath}from'node:url';import*as m from './candidate.mjs';
const sha=x=>createHash('sha256').update(x).digest('hex'),digest=x=>sha(JSON.stringify(x)),json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8')),clone=x=>JSON.parse(JSON.stringify(x)),T=json('./config.json').targets.u564b,P=json('./preparation.json'),F=json('./fixtures.json').u564b;
for(const[p,h]of Object.entries(T.inputSHA256))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);
for(const[p,h]of Object.entries(P.newFilesSHA256))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);
assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),P.configSHA256);
assert.deepEqual(Object.keys(F.fullProof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);
assert.equal(digest(F.fullProof),T.fullProofSHA256);assert.equal(digest(F.rawBaseline),T.rawBaselineSHA256);assert.equal(digest(F.strokes),T.derivedSHA256);assert.equal(digest(F),T.fixturePayloadSHA256);
assert.equal(sha(readFileSync(new URL(T.actualFull5File,import.meta.url))),T.actualFull5SHA256);const body=json(T.selectedBody3File);for(const k of['groups','trace','defaults'])assert.deepEqual(body[k],F.fullProof[k]);
assert.equal(sha(readFileSync(new URL(T.selectedBody3File,import.meta.url))),T.identity.sourceProofFileSha256);
assert.deepEqual(Object.keys(T.identity).sort(),['sourceRoot','sourceProofFile','sourceProofFileSha256','sourceHeaderFile','sourceHeaderFileSha256'].sort());
const out=m.compileSourceWhole('u564b',F.fullProof.trace,F.fullProof,T.identity);
assert.deepEqual(out,F.strokes);assert.deepEqual([F.rawBaseline.length,out.length,out.flat().length,out.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0)],[18,15,16,33]);
assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.traceProjectionCallCount(),0);assert.equal(m.newInternalRawProjectorCallCount(),0);assert.equal(m.originalSourceCompilerCallCount(),0);assert.equal(m.existingFactoryCallCount(),0);
const sourceGroups=[[0],[1,2],[3],[4],[5],[6],[7,8],[10],[9,11],[12],[13],[14],[15],[16],[17]];
assert.deepEqual(T.sourceGroups,sourceGroups);assert.deepEqual(m.sourceGroups,sourceGroups);
assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i));
const polygon=p=>{const area=p.reduce((n,v,i)=>n+v.x*p[(i+1)%p.length].y-p[(i+1)%p.length].x*v.y,0);assert.notEqual(area,0);const q=area<0?[p[0],...p.slice(1).reverse()]:p;return q.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z'};
const pieces=s=>s.outline.match(/M[^M]*?Z/g)||[];
for(let raw=0;raw<18;raw++){assert.equal(F.rawBaseline[raw].length,1);assert.deepEqual(pieces(F.rawBaseline[raw][0]),F.fullProof.groups[raw].polygons.map(polygon));}
assert.deepEqual(out.flat().flatMap(pieces).sort(),F.fullProof.groups.flatMap(g=>g.polygons.map(polygon)).sort());
for(let p=0;p<15;p++){const g=sourceGroups[p];if(g.length===1)assert.deepEqual(out[p],F.rawBaseline[g[0]]);}
assert.deepEqual(out[8],[...F.rawBaseline[9],...F.rawBaseline[11]]);
assert.deepEqual(out[7],F.rawBaseline[10]);assert.deepEqual(out[12],F.rawBaseline[15]);assert.deepEqual(out[13],F.rawBaseline[16]);
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8);
for(const[p,g]of[[1,[1,2]],[6,[7,8]]]){const calls=g.flatMap(i=>F.fullProof.trace[i]),parts=g.map(i=>F.rawBaseline[i][0]),a=calls[0].args;
 assert.equal(calls.length,2);assert.deepEqual(endpoint(calls[0]),calls[1].args.slice(0,2));assert(calls.every(c=>c.kind==='cdDrawLine'));
 assert.deepEqual(out[p],[{outline:parts.map(s=>s.outline).join(' '),bounds:[Math.min(...parts.map(s=>s.bounds[0])),Math.min(...parts.map(s=>s.bounds[1])),Math.max(...parts.map(s=>s.bounds[2])),Math.max(...parts.map(s=>s.bounds[3]))],direction:'curve',weight:Math.round(parts.reduce((n,s)=>n+s.weight,0)*1e6)/1e6,revealPath:'M'+a[0]/2+' '+a[1]/2+' '+calls.map(c=>'L'+c.args[2]/2+' '+c.args[3]/2).join(' '),revealWidth:14}]);
}
assert.deepEqual(endpoint(F.fullProof.trace[9].at(-1)),F.fullProof.trace[11][0].args.slice(0,2));
assert.notDeepEqual(endpoint(F.fullProof.trace[15].at(-1)),F.fullProof.trace[16][0].args.slice(0,2));
assert.equal(F.fullProof.trace[12].at(-1).kind,'cdDrawCurve');assert.deepEqual(F.fullProof.trace[12].at(-1).args.slice(-2),[1,14]);assert.deepEqual(out[9],F.rawBaseline[12]);
const rawText=readFileSync(new URL('./candidate.mjs',import.meta.url),'utf8'),start=rawText.indexOf('function compileBound('),end=rawText.indexOf('\nreturn compileBound',start),generic=rawText.slice(start,end);
assert.equal(Buffer.byteLength(generic),8067);assert.equal(sha(generic),'4ea61b5e0ba522559dd0c5ef42a24cae29159a79ea4e38ff56a836a25d713355');
let negative=0;const reject=fn=>{assert.throws(fn);negative++};
for(const args of[[],[F.fullProof.trace,F.fullProof],[F.fullProof.trace,F.fullProof,T.identity,'extra']])reject(()=>Reflect.apply(m.compileProgressive,null,args));
for(const args of[[],['u564b',F.fullProof.trace,F.fullProof],['u564b',F.fullProof.trace,F.fullProof,T.identity,'extra']])reject(()=>Reflect.apply(m.compileSourceWhole,null,args));
reject(()=>m.compileSourceWhole('u564b-ue0100',F.fullProof.trace,F.fullProof,T.identity));
for(const k of Object.keys(T.identity)){const id=clone(T.identity);id[k]+=' ';assert.notDeepEqual(id,T.identity);reject(()=>m.compileProgressive(F.fullProof.trace,F.fullProof,id));const missing=clone(T.identity);delete missing[k];assert.notDeepEqual(missing,T.identity);reject(()=>m.compileProgressive(F.fullProof.trace,F.fullProof,missing));}
reject(()=>m.compileProgressive(F.fullProof.trace,F.fullProof,{...T.identity,extra:true}));
for(const k of Object.keys(F.fullProof)){const p=clone(F.fullProof);if(k==='engineRevision')p[k]+=' ';else if(k==='engineHashes')p[k][Object.keys(p[k])[0]]='0'.repeat(64);else if(k==='defaults')p[k][Object.keys(p[k])[0]]+=1;else if(k==='trace')p[k][0][0].args[0]+=.1;else p[k][0].polygons[0][0].x+=.1;assert.notDeepEqual(p,F.fullProof);reject(()=>m.compileProgressive(p.trace,p,T.identity));}
const extraProof={...F.fullProof,extra:true};assert.notDeepEqual(extraProof,F.fullProof);reject(()=>m.compileProgressive(extraProof.trace,extraProof,T.identity));
const trace=clone(F.fullProof.trace);trace[0][0].polygons[0][0].off=1;assert.notDeepEqual(trace,F.fullProof.trace);reject(()=>m.compileProgressive(trace,F.fullProof,T.identity));
reject(()=>Reflect.apply(m.captureProjection,null,[F.fullProof.trace,F.fullProof]));reject(()=>m.captureProjection(F.fullProof.trace,F.fullProof,{...T.identity,sourceRoot:'u564b-ue0100'}));
assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.traceProjectionCallCount(),0);assert.equal(m.newInternalRawProjectorCallCount(),0);
assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false);assert.equal(m.actualAppUI,false);
const py="import ast,json,sys,types\nfrom pathlib import Path\np=Path(sys.argv[1]);text=p.read_text();tree=ast.parse(text);m=types.ModuleType('u564b_source_helper');m.__file__=str(p);exec(compile(tree,str(p),'exec'),m.__dict__);m.guards()\nassert \"default='u564b'\" in text\nfor token in ['15p16m33','18raw/19calls/33polygon','HQ9','raw13 LQ LEFT14','stroke=9&coarse=1','independent','cachedFixture','8000']:assert token in text,token\nassert 'candidate.mjs'not in text and 'compileProgressive'not in text and 'engine-proof'not in text\nassert text.index('if args.check_only:')<text.index('review.renderer.ENTRIES')\nprint(json.dumps({'PythonAST':1,'helperGuard':1,'captionCounts':True,'noHTTP':True}))";
const h=spawnSync('python3',['-B','-c',py,fileURLToPath(new URL('./serve.py',import.meta.url))],{encoding:'utf8',timeout:30000});assert.equal(h.status,0,h.stderr||h.stdout);
console.log(JSON.stringify({passed:true,cachedPositive:1,negative,actual:{raw:18,pens:15,masks:16,polygons:33},allRawPolygonsExactOnce:true,HQ9IndependentEvenAtZeroGap:true,nonconsecutiveReorderOnly:true,exactHVJoins:2,pen10ActualLQLEFT14Unmodified:true,sourceGeometryThisCheck:0,traceProjectionThisCheck:0,originalCompiler:0,existingFactory:0,engine:0,nativeApproval:false,helper:JSON.parse(h.stdout)}));
