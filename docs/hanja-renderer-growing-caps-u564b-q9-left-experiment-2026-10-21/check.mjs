import assert from 'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import * as r from './render.mjs';
const read=p=>readFileSync(new URL(p,import.meta.url)),sha=b=>createHash('sha256').update(b).digest('hex'),json=p=>JSON.parse(read(p)),C=json('./config.json'),V=json('./validation.json'),T=C.targets.u564b,F=json(C.sourceFixture).u564b,strokes=F.strokes,clone=v=>JSON.parse(JSON.stringify(v));
for(const[p,h]of Object.entries(T.inputSHA256))assert.equal(sha(read('../../'+p)),h,p);
for(const[p,h]of Object.entries(V.newFilesSHA256))assert.equal(sha(read(p)),h,p);
assert.equal(sha(read('./config.json')),V.configSHA256);assert.equal(sha(read(C.sourceFixture)),C.fixtureSHA256);
assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0)],[15,17,33]);
assert.equal(sha(JSON.stringify(strokes)),C.fixedStrokesSHA256);assert.equal(sha(JSON.stringify(F.fullProof)),C.full5CanonicalSHA256);
assert.deepEqual(Object.keys(F.fullProof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(Object.keys(T.identity).length,5);
assert.equal(sha(read(T.actualFull5File)),T.actualFull5SHA256);assert.deepEqual(json(T.actualFull5File),F.fullProof);assert.equal(sha(read(T.selectedBody3File)),T.selectedBody3SHA256);const selected=json(T.selectedBody3File);assert.deepEqual(Object.keys(selected).sort(),['defaults','groups','trace']);for(const k of Object.keys(selected))assert.deepEqual(selected[k],F.fullProof[k]);
assert.equal(r.certificateCheckCount(),1);assert.equal(C.qTargets.length,1);assert.deepEqual(C.qTargets.map(t=>[t.pen,t.mask]),[[9,2]]);
const moduleText=read('./render.mjs').toString(),old43=read('../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs').toString();assert(moduleText.startsWith(old43.slice(old43.indexOf('export function renderProgressive('))));
const strictBody=s=>s.slice(s.indexOf('function coordinateBinding'),s.indexOf('export function measureTarget'));
assert.equal(strictBody(moduleText).replaceAll('噋','牷'),strictBody(read('../hanja-renderer-growing-caps-u7277-four-q-experiment-2026-10-20/render.mjs').toString()));
const mockLengths=[40],mockPolicy=i=>r.targetInfo(C.qTargets[i].pen,C.qTargets[i].mask);
function mockTarget(i, id = 'can-' + i) {
    const policy = mockPolicy(i), segment = policy.segment, q0 = segment.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0, 2).map(Number), L = mockLengths[i], events = [];
    const document = { defaultView: null }, view = { document, getComputedStyle: (n) => { const x = n; return { transform: x.cssTransform, getPropertyValue: (key) => key === 'translate' ? x.cssTranslate : 'none' }; } };
    document.defaultView = view;
    let owner;
    const node = (name, attrs) => ({ localName: name, namespaceURI: 'http://www.w3.org/2000/svg', isConnected: true, ownerSVGElement: owner, ownerDocument: document, parentElement: null, cssTransform: 'none', cssTranslate: 'none', attrs: { ...attrs }, getAttribute(key) { return this.attrs[key] ?? null; }, setAttribute(key, value) { this.attrs[key] = value; events.push(name + ':' + key + '=' + value); }, removeAttribute(key) { delete this.attrs[key]; } });
    const svg = node('svg', {});
    owner = svg;
    const group = node('g', {}), target = node('g', { 'data-stroke-start-gate': policy.id }), defs = node('defs', {}), mask = node('mask', { id: id + '-can-growing', maskUnits: 'userSpaceOnUse', x: '0', y: '0', width: '100', height: '100' });
    group.parentElement = svg;
    target.parentElement = group;
    defs.parentElement = target;
    mask.parentElement = defs;
    let pointHook = null, lengthHook = null, length = L;
    let reads = 0, pointReads = 0;
    const measurement = Object.assign(node('path', { 'data-growing-owner': id, 'data-can-measurement': 'true', id: id + '-can-measure', d: segment.revealPath }), { getTotalLength() { reads++; events.push('measure:length'); lengthHook?.(); return length; }, getPointAtLength(d) { pointReads++; events.push('measure:point'); return pointHook ? pointHook(d) : { x: q0[0] + d / L, y: q0[1] + d / L }; } });
    const guide = Object.assign(node('path', { 'data-growing-owner': id, id: id + '-can-guide', d: segment.revealPath, pathLength: '1', 'stroke-width': '14', 'stroke-linecap': 'butt', 'stroke-linejoin': 'miter' }), { getTotalLength() { throw Error('dash is not measurement guide'); }, getPointAtLength() { throw Error('dash is not measurement guide'); } });
    const startCap = node('circle', { 'data-growing-owner': id, r: '0' }), endCap = node('circle', { 'data-growing-owner': id, r: '0' }), ink = node('ink', { 'data-growing-owner': id, d: segment.outline, mask: 'url(#' + id + '-can-growing)', visibility: 'hidden' });
    measurement.parentElement = defs;
    guide.parentElement = mask;
    startCap.parentElement = mask;
    endCap.parentElement = mask;
    ink.parentElement = target;
    const nodes = { measurement, guide, startCap, endCap, ink };
    return { policy, segment, q0, L, id, owner, svg, document, view, group, target, defs, mask, measurement, guide, startCap, endCap, ink, nodes, events, counts: () => ({ reads, pointReads }), pointHook: (fn) => { pointHook = fn; }, lengthHook: (fn) => { lengthHook = fn; }, setLength: (n) => { length = n; } };
}

let negative=0;const reject=fn=>{assert.throws(fn);negative++};let mockFrames=0;
for(let i=0;i<1;i++){const t=C.qTargets[i],s=r.targetMask(t.pen,t.mask),meta=r.targetInfo(t.pen,t.mask),cert=r.sourceCertificate(s);assert.deepEqual(s,strokes[t.pen-1][t.mask-1]);assert.equal(sha(JSON.stringify(s)),C.qTargets[i].maskSHA256);assert.equal(cert.parameterBound,1/2);assert.equal(cert.curvatureBound,1/50);assert.equal(cert.initialArcMax,7);assert.equal(cert.exactDecimalRational,true);assert.equal(cert.notRasterProof,true);assert.equal(meta.id,t.id);for(const p of[0,1e-6,.03,.95,.9999,.99999999,1]){const x=mockTarget(i),f=r.measureTarget(s,p,x.nodes.measurement),expected=r.growingState(s,p,x.L,f.point);assert.deepEqual(f,expected);assert.deepEqual(x.counts(),{reads:1,pointReads:1});mockFrames++}for(const p of[0,1]){const x=mockTarget(i),f=r.commitTarget(s,p,x.id,x.nodes);assert.equal(f.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),{reads:0,pointReads:0})}const x=mockTarget(i);x.ink.attrs['data-growing-distance']='stale';const valid=r.commitTarget(s,.03,x.id,x.nodes);assert.equal(valid.status,'visible');assert.equal(x.ink.attrs['data-growing-distance'],String(valid.frame.d));assert.equal(x.events.at(-1),'ink:visibility=visible');assert.deepEqual(x.counts(),{reads:1,pointReads:1});valid.cleanup();assert.equal(x.ink.attrs.visibility,'hidden');assert.equal(x.startCap.attrs.r,'0');assert.equal(x.endCap.attrs.r,'0');assert.equal(x.ink.getAttribute('data-growing-distance'),null);assert.equal(x.ink.getAttribute('data-growing-progress'),null);
 const mutations=[z=>z.measurement.attrs.pathLength='1',z=>z.measurement.attrs.d+=' ',z=>z.guide.attrs['stroke-linecap']='round',z=>z.ink.attrs.mask='wrong',z=>z.endCap.parentElement=z.defs,z=>z.startCap.ownerDocument={},z=>z.target.attrs.transform='translate(1 0)',z=>z.group.cssTranslate='1px'];for(const phase of['before','length','point'])for(const mutate of mutations){const z=mockTarget(i);if(phase==='before')mutate(z);if(phase==='length')z.lengthHook(()=>mutate(z));if(phase==='point')z.pointHook(d=>{mutate(z);return{x:z.q0[0]+d/z.L,y:z.q0[1]+d/z.L}});assert.equal(r.commitTarget(s,.03,z.id,z.nodes).status,'hidden');assert.equal(z.ink.attrs.visibility,'hidden');assert.equal(z.startCap.attrs.r,'0');negative++}for(const L of[NaN,Infinity,-1,7]){const z=mockTarget(i);z.setLength(L);assert.equal(r.commitTarget(s,.03,z.id,z.nodes).status,'hidden');negative++}for(const p of[NaN,Infinity,-1,1.01]){const z=mockTarget(i);assert.equal(r.commitTarget(s,p,z.id,z.nodes).status,'hidden');assert.deepEqual(z.counts(),{reads:0,pointReads:0});negative++}for(const k of Object.keys(s)){const bad=clone(s);bad[k]=k==='bounds'?[0,0,1,1]:typeof bad[k]==='number'?bad[k]+1:String(bad[k])+' ';reject(()=>r.sourceCertificate(bad));const z=mockTarget(i);reject(()=>r.commitTarget(bad,.03,z.id,z.nodes));assert.deepEqual(z.counts(),{reads:0,pointReads:0})}}

for(const args of[[9,1],[10,1],[1,1],[9]])reject(()=>r.targetInfo(...args));
for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++){const bad=clone(strokes);bad[p][m].weight++;reject(()=>r.assertFixedGeometry(bad))}
for(const make of[s=>{Object.defineProperty(s,'hidden',{value:1});return s},s=>{Object.defineProperty(s,'weight',{get:()=>1,enumerable:true});return s},s=>Object.create(s)])reject(()=>r.sourceCertificate(make(clone(strokes[8][1]))));
const sparse=clone(strokes);delete sparse[0];reject(()=>r.assertFixedGeometry(sparse));
const zero=r.renderGrowingCaps(strokes,9,0,'zero'),full=r.renderGrowingCaps(strokes,15,1,'full'),whole=r.renderWhole(strokes,'whole'),partial=r.renderGrowingCaps(strokes,9,.8,'partial');
assert(!zero.includes('data-can-ink'));assert(!zero.includes('data-can-full'));assert.equal((full.match(/data-can-full="true"/g)||[]).length,1);assert.equal((whole.match(/data-can-full="true"/g)||[]).length,1);assert(partial.includes('visibility="hidden"'));assert.equal((full.match(/data-can-measurement="true"/g)||[]).length,1);
const segment=strokes[8][1];assert(full.includes('d="'+segment.outline+'" mask="url(#full-9-1)"'));const residual=r.targetCoverageResidual(segment,'residual-u564b-9m2');for(const token of['stroke-linecap="round"','stroke-linejoin="miter"','pathLength="1"','stroke-dasharray="1 2"'])assert(residual.includes(token),token);
const stripNew=s=>s.replace(/<g data-can-target="[^"]+"[\s\S]*?<\/g>/g,''),stripOld=s=>s.replaceAll('<path d="'+segment.outline+'"/>','');let ordinaryParity=0;
for(let pen=1;pen<=15;pen++)if(pen!==9)for(const p of[0,.125,.25,.375,.5,.625,.75,.875,1]){assert.equal(stripNew(r.renderGrowingCaps(strokes,pen,p,'same')),stripOld(r.renderProgressive(strokes,pen,p,'same')));ordinaryParity++}
const direct=strokes[8][0];assert.deepEqual(direct,C.nonTargetDirect9m1.fields);const boundary=direct.weight/strokes[8].reduce((n,s)=>n+s.weight,0);assert.equal(boundary,.6092369035989366);
let directParity=0;for(const p of[0,.125,.25,.375,.5,.625,.75,.875,.9999]){assert.equal(stripNew(r.renderGrowingCaps(strokes,9,boundary*p,'same')),stripOld(r.renderProgressive(strokes,9,boundary*p,'same')));directParity++}
assert.deepEqual(strokes[9],F.strokes[9]);assert.equal(strokes[9][0].weight,32.071068);assert.equal(strokes[9][1].weight,10);
assert.equal(C.nativeApproval,false);assert.equal(C.runtimeApplied,false);assert.equal(C.appUI,false);
console.log(JSON.stringify({passed:true,certificates:r.certificateCheckCount(),T:.5,K:.02,initialArcOnly:7,negative,mockFrames,ordinaryParity,directParity,sourcePins:Object.keys(T.inputSHA256).length,ownPins:Object.keys(V.newFilesSHA256).length,sourceProjection:0,sourceCompiler:0,tailDerivations:0,engine:0,HTTP:0,UI:0,server:0,UA:false,nativeApproval:false,runtimeApplied:false}));
