import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { loadFixture } from './fixture.mjs'
import { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
import { revealDescriptor, activationAlpha, EXPERIMENT } from './reveal-descriptor.mjs'
import { renderString } from './svg-string-adapter.mjs'
import { renderDOM } from './svg-dom-adapter.mjs'
const fixture=loadFixture(),{strokes,contract}=fixture,digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex'),before=digest(strokes),b=contract.fixture.boundary
const esc=x=>String(x).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;')
class Node { constructor(name){this.name=name;this.attrs={};this.children=[]}setAttribute(k,v){this.attrs[k]=v}appendChild(c){this.children.push(c);return c}serialize(){const a=Object.entries(this.attrs).map(([k,v])=>' '+k+'="'+esc(v)+'"').join('');return (this.children.length||!['path','rect'].includes(this.name))?'<'+this.name+a+'>'+this.children.map(n=>n.serialize()).join('')+'</'+this.name+'>':'<'+this.name+a+'/>'} }
const document={createElementNS:(_ns,name)=>new Node(name)}
const fractions=[0,.125,.25,b-1e-10,b,b+1e-10,.5,.625,.75,.875,.9999,1]
let originalParity=0,adapterParity=0,sourceReferences=0,scopeChecks=0
for(let pen=1;pen<=17;pen++)for(const p of fractions){
  assert.equal(renderString(strokes,pen,p,'original','same'),renderProgressive(strokes,pen,p,'same'));originalParity++
  for(const mode of ['original','gated']) {
    assert.equal(renderDOM(document,strokes,pen,p,mode,'same').serialize(),renderString(strokes,pen,p,mode,'same'));adapterParity++
    for(const d of revealDescriptor(strokes,pen,p,mode)){assert.equal(d.source,strokes[d.pen-1][d.mask-1]);sourceReferences++}
  }
  if(pen!==12){assert.equal(renderString(strokes,pen,p,'gated','same'),renderString(strokes,pen,p,'original','same'));scopeChecks++}
}
const segments=strokes[11],D=EXPERIMENT.strokeDurationMilliseconds*segments[1].weight/segments.reduce((s,v)=>s+v.weight,0)
const tiny=revealDescriptor(strokes,12,b+1e-10,'gated').find(d=>d.pen===12&&d.mask===2)
assert(tiny&&tiny.opacity>0&&tiny.opacity<1e-7)
assert.equal(revealDescriptor(strokes,12,b,'gated').some(d=>d.pen===12&&d.mask===2),false)
let previous=0;for(let i=0;i<=100;i++){const q=i/100,alpha=activationAlpha(q,D);assert(alpha>=previous&&alpha>=0&&alpha<=1);previous=alpha}
assert.equal(activationAlpha(0,D),0);assert.equal(activationAlpha(1,D),1)
const gateQ=40/D,atGate=revealDescriptor(strokes,12,b+(1-b)*gateQ,'gated').find(d=>d.pen===12&&d.mask===2)
assert(Math.abs(atGate.opacity-1)<1e-12)
const faded=revealDescriptor(strokes,12,b+(1-b)*gateQ/2,'gated')
assert.equal(faded.filter(d=>d.opacity<1).length,1);assert(Math.abs(faded.find(d=>d.opacity<1).opacity-.5)<1e-12)
for(let pen=1;pen<=17;pen++)assert.equal(renderString(strokes,pen,1,'gated','same'),renderProgressive(strokes,pen,1,'same'))
assert.equal(digest(strokes),before);assert.equal(before,contract.compiledSHA256)
assert.equal(strokes.flat().reduce((s,v)=>s+(v.outline.match(/M/g)||[]).length,0),42)
assert.equal(contract.timing.strokeDurationMilliseconds,650/1.5)
console.log(JSON.stringify({passed:true,originalRendererParityCases:originalParity,diagnosticAdapterParityCases:adapterParity,sourceReferenceChecks:sourceReferences,unaffectedOtherPenChecks:scopeChecks,continuousActivationChecks:101,fadePhaseChecks:4,completedFormChecks:17,originalCompleteGeometrySHA256:before,pens:17,masks:20,polygons:42,gateQ,gateDurationMs:40,secondMaskDurationMs:D,boundary:b,afterBoundaryAlpha:tiny.opacity,sourceInputsUnchanged:true,nativeObserved:0,nativeApproval:false,productionChanged:false,buildExecuted:false}))
