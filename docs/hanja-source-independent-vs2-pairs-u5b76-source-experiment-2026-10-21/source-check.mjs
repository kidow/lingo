import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as m from './candidate.mjs';
const sha=x=>createHash('sha256').update(x).digest('hex'),digest=x=>sha(JSON.stringify(x));
const read=p=>readFileSync(new URL(p,import.meta.url)),json=p=>JSON.parse(read(p)),clone=x=>JSON.parse(JSON.stringify(x));
const T=json('./config.json').targets['u5b76-ue0102'],P=json('./prep.json'),F=json('./fixture.json')['u5b76-ue0102'];
for(const[p,h]of Object.entries(T.inputSHA256))assert.equal(sha(read(p)),h,p);
for(const[p,h]of Object.entries(P.newFilesSHA256))assert.equal(sha(read('./'+p)),h,p);
assert.equal(sha(read('./config.json')),P.configSHA256);
assert.equal(digest(F.fullProof),T.fullProofSHA256);
assert.equal(digest(F.rawBaseline),T.rawBaselineSHA256);
assert.equal(digest(F.strokes),T.derivedSHA256);
assert.equal(digest(F),T.fixturePayloadSHA256);
assert.equal(sha(read('./fixture.json')),T.fixtureFileSHA256);
const out=m.compileSourceWhole('u5b76-ue0102',F.fullProof.trace,F.fullProof,T.identity);
assert.deepEqual(out,F.strokes);assert.deepEqual(F.baseline,out);
const groups=[[0],[1],[2],[3],[4,5],[6,7],[8],[9,10],[11,12],[13],[14,15],[16],[17]];
assert.deepEqual(T.sourceGroups,groups);assert.deepEqual(m.sourceGroups,groups);
assert.deepEqual(groups.flat(),Array.from({length:18},(_,i)=>i));
assert.deepEqual([F.rawBaseline.length,out.length,out.flat().length,F.fullProof.trace.flat().length],[18,13,18,19]);
const canonical=poly=>{const area=poly.reduce((n,p,i)=>{const q=poly[(i+1)%poly.length];return n+p.x*q.y-q.x*p.y},0);assert.notEqual(area,0);assert(poly.every(p=>p.off===0&&Number.isFinite(p.x)&&Number.isFinite(p.y)));const pts=area<0?[poly[0],...poly.slice(1).reverse()]:poly;return pts.map((p,i)=>(i?'L':'M')+p.x/2+' '+p.y/2).join(' ')+' Z'};
const endpoint=c=>c.kind==='cdDrawLine'?c.args.slice(2,4):c.kind==='cdDrawCurve'?c.args.slice(4,6):c.args.slice(6,8);
for(let i=0;i<18;i++){
  const calls=F.fullProof.trace[i],s=F.rawBaseline[i][0],polys=calls.flatMap(c=>c.polygons),points=polys.flat();
  assert.equal(F.rawBaseline[i].length,1);assert.equal(calls.length,i===16?2:1);
  assert.deepEqual(polys,F.fullProof.groups[i].polygons);
  assert.equal(s.outline,polys.map(canonical).join(' '));
  assert.deepEqual(s.bounds,[Math.min(...points.map(p=>p.x/2)),Math.min(...points.map(p=>p.y/2)),Math.max(...points.map(p=>p.x/2)),Math.max(...points.map(p=>p.y/2))]);
  const weights=calls.map(c=>Math.round(Math.hypot(endpoint(c)[0]-c.args[0],endpoint(c)[1]-c.args[1])/2*1e6)/1e6);
  assert.equal(s.weight,Math.round(weights.reduce((n,w)=>n+w,0)*1e6)/1e6);
  const a=calls[0].args;
  if(calls.length>1){
    for(let j=1;j<calls.length;j++)assert.deepEqual(endpoint(calls[j-1]),calls[j].args.slice(0,2));
    const expected='M'+a[0]/2+' '+a[1]/2+' '+calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?'L'+v[2]/2+' '+v[3]/2:'Q'+v[2]/2+' '+v[3]/2+' '+v[4]/2+' '+v[5]/2}).join(' ');
    assert.equal(s.revealPath,expected);assert.equal(s.revealWidth,14);assert.equal(s.direction,'curve');
  }else if(calls[0].kind==='cdDrawCurve'){
    assert.equal(s.direction,'curve');assert.equal(s.revealPath,'M'+a[0]/2+' '+a[1]/2+' Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2);assert.equal(s.revealWidth,14);
  }else{
    assert.equal(calls[0].kind,'cdDrawLine');
    assert.equal(s.direction,a[0]===a[2]?(a[3]>a[1]?'down':'up'):(a[2]>a[0]?'right':'left'));
    assert.equal(s.revealPath,undefined);assert.equal(s.revealWidth,undefined);
  }
}
for(let p=0;p<groups.length;p++)assert.deepEqual(out[p],groups[p].flatMap(i=>F.rawBaseline[i]));
assert.deepEqual(T.independentMaskPairs.map(p=>p.pen),[5,6,8,9,11]);
for(const pair of T.independentMaskPairs){
  const calls=pair.raw.map(i=>F.fullProof.trace[i]),a=endpoint(calls[0].at(-1)),b=calls[1][0].args.slice(0,2);
  assert.deepEqual([b[0]-a[0],b[1]-a[1]],pair.rawGap);
  assert.equal(out[pair.pen-1].length,2);
  assert.equal(pair.connector,false);assert.equal(pair.guideJoined,false);assert.equal(pair.preserveEvenIfExactEndpoint,true);
}
assert.deepEqual(T.independentMaskPairs.at(-1).rawGap,[0,0]);
assert.deepEqual(T.exactInterRawJoins,[]);assert.equal(T.rawInternalCallsPreserved,true);
assert.equal(out[11][0].revealPath,'M50 68.03 L50 86.115 Q50 91.115 45 91.115');
assert.deepEqual(F.fullProof.trace[16].map(c=>c.args),[[100,136.06,100,172.23,0,1],[100,172.23,100,182.23,90,182.23,1,14]]);
const expected=groups.flat().flatMap(i=>F.fullProof.groups[i].polygons).map(canonical);
const actual=out.flat().flatMap(s=>s.outline.split(' Z').filter(s=>s.trim()).map(s=>s.trim()+' Z'));
assert.deepEqual(actual,expected);assert.equal(expected.length,44);
assert.equal(F.tailDerivations,0);assert.equal(F.traceProjectionOperations,1);
assert.equal(F.originalCompilerExecutions,0);assert.equal(F.existingFactoryCalls,0);assert.equal(F.engineRuns,0);
const factory=s=>s.slice(s.indexOf('function compileBound('),s.indexOf('\nreturn compileBound(trace,proof,identity)}',s.indexOf('function compileBound(')));
const ours=factory(read('./candidate.mjs').toString());
assert.equal(ours.length,8067);
assert.equal(ours,factory(read('../hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/candidate.mjs').toString()));
let negative=0;const reject=f=>{assert.throws(f);negative++};
for(const a of[[],[F.fullProof.trace],[F.fullProof.trace,F.fullProof],[F.fullProof.trace,F.fullProof,T.identity,{}]])reject(()=>Reflect.apply(m.compileProgressive,null,a));
for(const a of[[],['wrong',F.fullProof.trace,F.fullProof,T.identity],['u5b76-ue0102',F.fullProof.trace,F.fullProof,T.identity,{}]])reject(()=>Reflect.apply(m.compileSourceWhole,null,a));
for(const k of Object.keys(T.identity)){
  const a=clone(T.identity);delete a[k];reject(()=>m.compileProgressive(F.fullProof.trace,F.fullProof,a));
  const b=clone(T.identity);b[k]+='x';reject(()=>m.compileProgressive(F.fullProof.trace,F.fullProof,b));
}
reject(()=>m.compileProgressive(F.fullProof.trace,F.fullProof,{...T.identity,extra:true}));
for(const change of[p=>p.trace[0][0].args[0]++,p=>p.trace[0][0].polygons[0][0].x++,p=>p.groups[0].polygons[0][0].y++,p=>p.defaults.kWidth++,p=>p.engineRevision+='x',p=>p.engineHashes['2d.js']+='x',p=>p.extra=true]){
 const p=clone(F.fullProof);change(p);assert.notDeepEqual(p,F.fullProof);reject(()=>m.compileProgressive(p.trace,p,T.identity));
}
const sparse=clone(F.fullProof.trace);delete sparse[0];reject(()=>m.compileProgressive(sparse,F.fullProof,T.identity));
reject(()=>m.compileProgressive([...F.fullProof.trace].reverse(),F.fullProof,T.identity));
reject(()=>m.captureProjection(F.fullProof.trace,F.fullProof,T.identity));
const nonfinite=clone(F.fullProof);nonfinite.defaults.kWidth=NaN;reject(()=>m.compileProgressive(nonfinite.trace,nonfinite,T.identity));
const accessor=clone(T.identity);Object.defineProperty(accessor,'sourceRoot',{enumerable:true,get(){throw Error('accessor forbidden')}});reject(()=>m.compileProgressive(F.fullProof.trace,F.fullProof,accessor));
const symbol=clone(T.identity);symbol[Symbol('extra')]=1;reject(()=>m.compileProgressive(F.fullProof.trace,F.fullProof,symbol));
assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.traceProjectionCallCount(),0);assert.equal(m.newInternalRawProjectorCallCount(),0);
assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false);assert.equal(m.actualAppUI,false);
const py="import ast,json,runpy,sys,base64\nfrom pathlib import Path\nD=Path(sys.argv[1]);s=(D/'serve.py').read_text();tree=ast.parse(s);m=runpy.run_path(str(D/'serve.py'),run_name='new_helper_contract_only');m['guards']()\nassert 'subprocess'not in s and 'compiled('not in s and 'review.source('not in s\nassert '18raw/19calls/44polygon→13p18m44'in s and 'HQ11 exact접점 독립2mask'in s and 'QQ5 activation'in s\nfor route,q in[('/',''),('/whole',''),('/checks',''),('/progressive',''),('/pairs','stroke=13'),('/progressive','stroke=5&coarse=1')]:m['selected_query'](route,q,5,13)\nneg=0\nfor route,q in[('/bad',''),('/progressive','stroke='),('/progressive','stroke=0'),('/progressive','stroke=14'),('/progressive','stroke=01'),('/progressive','stroke=1&stroke=2'),('/progressive','x=1'),('/progressive','coarse=0'),('/progressive','coarse=1&coarse=1'),('/pairs','coarse=1'),('/whole','stroke=1'),('/checks','stroke=1'),('/progressive','stroke=-1'),('/progressive','stroke=1.0')]:\n try:m['selected_query'](route,q,5,13)\n except(AssertionError,ValueError):neg+=1\n else:raise AssertionError((route,q))\nF=json.loads((D/'fixture.json').read_text())['u5b76-ue0102'];ROOT=D.parent.parent;render=(ROOT/'docs/hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs').read_text();render=render[render.index('export function renderProgressive'):].replace('export function renderProgressive','function renderProgressive',1)\nnodes=[n for n in ast.walk(tree)if isinstance(n,ast.AugAssign)and isinstance(n.target,ast.Name)and n.target.id=='body'and ast.get_source_segment(s,n).startswith(\"body+='<script>'+render\")];assert len(nodes)==1\nscope={'render':render,'json':json,'original':F['baseline'],'strokes':F['strokes'],'pen':5,'baseline_pen':5};script=eval(compile(ast.Expression(nodes[0].value),'<new-helper-js>','eval'),scope);assert script.startswith('<script>');script=script[len('<script>'):]+'show(0);'\nprint(json.dumps({'PythonAST':1,'helperGuards':1,'queryPositive':6,'queryNegatives':neg,'HTTP':0,'server':0,'embeddedJavaScriptBase64':base64.b64encode(script.encode()).decode()}))\n";
const r=spawnSync('python3',['-B','-c',py,fileURLToPath(new URL('./',import.meta.url))],{encoding:'utf8'});
assert.equal(r.status,0,r.stderr||r.stdout);
const h=JSON.parse(r.stdout),script=Buffer.from(h.embeddedJavaScriptBase64,'base64').toString();delete h.embeddedJavaScriptBase64;
const syntax=spawnSync('node',['--check','--input-type=commonjs'],{input:script,encoding:'utf8'});assert.equal(syntax.status,0,syntax.stderr);
console.log(JSON.stringify({PASS:true,cachedPositive:1,negative,sourcePins:Object.keys(T.inputSHA256).length,ownPins:Object.keys(P.newFilesSHA256).length,pens:13,masks:18,polygons:44,raw:18,calls:19,polygonBijection:true,rawParentTraceMapping:true,rawMaskFieldsPreserved:true,factory8067ByteExact:true,independentPairPens:[5,6,8,9,11],exactEndpointPairNotMerged:true,rawInternalTwoCallsPreserved:true,tailDerivations:0,newProjection:0,originalChecksRepeated:0,...h,embeddedJavaScriptSyntax:1,sourceCompiler:0,factoryCalls:0,engine:0,nativeApproval:false,runtimeApplied:false}));
