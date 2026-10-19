import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import * as r from './render.mjs';
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),C=json('./config.json'),V=json('./validation.json');
for(const[p,h]of Object.entries(C.inputSHA256))assert.equal(sha(read(p)),h,p);
for(const[p,h]of Object.entries(V.newFilesSHA256))assert.equal(sha(read(p)),h,p);
assert.equal(sha(read('./config.json')),V.configSHA256);
let negative=0,monotonePoints=0,maskCount=0,singleQ=0,mixed=0;const reports=[],reject=fn=>{assert.throws(fn);negative++};
function numericalLength(commands){let previous=commands[0].args,total=0;for(const segment of commands.slice(1)){if(segment.command==='L'){total+=Math.hypot(segment.args[0]-previous[0],segment.args[1]-previous[1]);previous=segment.args;continue}const[cx,cy,x,y]=segment.args,[sx,sy]=previous,N=4096,step=1/N,d=t=>Math.hypot(2*((1-t)*(cx-sx)+t*(x-cx)),2*((1-t)*(cy-sy)+t*(y-cy)));let sum=d(0)+d(1);for(let i=1;i<N;i++)sum+=(i%2?4:2)*d(i*step);total+=sum*step/3;previous=[x,y]}return total}
for(const[root,E]of Object.entries(C.experiments)){
 const F=json(E.fixture)[root],T=C.targets[root],before=JSON.stringify(F);assert.equal(sha(read(E.fixture)),E.fixtureSHA256);assert.equal(sha(JSON.stringify(F.strokes)),E.geometrySHA256);assert.equal(F.nativeApproval,false);assert.equal(F.runtimeApplied,false);assert.deepEqual(r.targetMasks(root).map(x=>[x.pen,x.mask]),E.gates);
 for(const{pen,mask,segment:s}of r.targetMasks(root)){
  maskCount++;const start=r.sourceStart(s),commands=r.parseExplicitGuide(s.revealPath),L=numericalLength(commands),g0=r.gateState(s,0,L),g1=r.gateState(s,1,L);assert.deepEqual(start.q,commands[0].args);assert(L>0&&Number.isFinite(L));assert.equal(g0.h,-start.r);assert.equal(g1.h,start.r);assert.equal(g0.tau,Math.min(1,s.revealWidth/L));assert.equal(r.startDiscAreaBound(g0),0);commands.length===2&&commands[1].command==='Q'?singleQ++:mixed++;
  const local=[0,1e-12,1e-10,1e-8,1e-6,g0.tau/4,g0.tau/2,g0.tau,.95,.9999,1],states=local.map(p=>r.gateState(s,p,L));for(let i=1;i<states.length;i++)assert(states[i].h>=states[i-1].h);
  const tiny=[1e-6,1e-8,1e-10,1e-12].map(p=>r.startDiscAreaBound(r.gateState(s,p,L))+2*Math.PI*start.r*p*L+Math.PI*(p*L)**2);for(let i=1;i<tiny.length;i++)assert(tiny[i]<tiny[i-1]);assert(tiny.at(-1)<1e-6);
  for(let ix=-10;ix<=10;ix++)for(let iy=-10;iy<=10;iy++){const x=start.q[0]+ix*start.r/8,y=start.q[1]+iy*start.r/8;let opened=false;for(const g of states){const yes=r.gateAllows(x,y,g);if(opened)assert(yes);opened||=yes}assert(r.gateAllows(x,y,g1));monotonePoints++}
  const lengthProvider=seg=>numericalLength(r.parseExplicitGuide(seg.revealPath)),full=r.renderStartGate(F.strokes,pen,1,'full'+maskCount,lengthProvider),whole=r.renderStartGate(F.strokes,F.strokes.length,1,'whole'+maskCount,lengthProvider);assert(full.includes('<path d="'+s.outline+'" mask="url(#'));assert(!full.includes('<path d="'+s.outline+'"/>'));assert(whole.includes('<path d="'+s.outline+'" mask="url(#'));assert(r.targetCoverageResidual(s,'res'+maskCount).includes('P-minus-full-round-sweep'));
  const masks=F.strokes[pen-1],sum=masks.reduce((n,m)=>n+m.weight,0),beforeWeight=masks.slice(0,mask-1).reduce((n,m)=>n+m.weight,0),localProgress=p=>(beforeWeight+s.weight*p)/sum;assert(!r.renderStartGate(F.strokes,pen,0,'zero'+maskCount,lengthProvider).includes('<path d="'+s.outline+'"'));assert(r.renderStartGate(F.strokes,pen,localProgress(1e-6),'early'+maskCount,lengthProvider).includes('-gate'));
  for(const progress of[NaN,Infinity,-.1,1.1])reject(()=>r.gateState(s,progress,L));for(const len of[0,-1,NaN,Infinity])reject(()=>r.gateState(s,.1,len));
  for(const mutate of[x=>x.revealWidth++,x=>x.weight++,x=>x.bounds[0]++,x=>x.revealPath+=' ',x=>x.outline+=' ',x=>x.direction='down']){const altered=structuredClone(s);mutate(altered);reject(()=>r.sourceStart(altered))}
  for(const guide of[s.revealPath+' Z',s.revealPath.replace('M','m'),s.revealPath+' L1',s.revealPath+' Q1 2 3',s.revealPath+' C1 2 3 4 5 6','M0 0','M0 0 LNaN 1','M0 0 LInfinity 1','M0 0 L1 2 trailing',s.revealPath.replace(' ','  ')])reject(()=>r.parseExplicitGuide(guide));
  reports.push({root,pen,mask,commands:commands.map(x=>x.command).join(' '),nodeLengthReference:L,tauReference:g0.tau,areaUpperBoundAt1eMinus12:tiny.at(-1),browserLengthNotMeasured:true,coverageUnproved:true});
 }
 const altered=structuredClone(F.strokes);altered[0][0].weight++;reject(()=>r.renderStartGate(altered,1,.5,'changed',()=>1));reject(()=>r.renderStartGate(F.strokes,0,.5,'bad',()=>1));reject(()=>r.renderStartGate(F.strokes,T.pens+1,.5,'bad',()=>1));reject(()=>r.renderStartGate(F.strokes,1,NaN,'bad',()=>1));reject(()=>r.renderStartGate(F.strokes,1,.5,'bad"',()=>1));assert.equal(JSON.stringify(F),before);
}
reject(()=>r.targetMasks('unknown'));assert.equal(maskCount,15);assert.equal(singleQ,7);assert.equal(mixed,8);assert.equal(r.nativeApproval,false);assert.equal(r.runtimeApplied,false);
console.log(JSON.stringify({passed:true,focusedExecutions:1,targets:4,maskCount,singleQ,mixed,negative,monotonePoints,reports,fullStrokeAndMaskGuards:true,sourceArraysUnchanged:true,completionUnmasked:false,sourceGeometryGenerations:0,engineRuns:0,browserLengthNotMeasured:true,actualCoverageUnproved:true,nativeApproval:false,runtimeApplied:false}));
