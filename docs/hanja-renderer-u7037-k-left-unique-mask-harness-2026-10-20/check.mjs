import assert from 'node:assert/strict'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
const HERE=path.dirname(fileURLToPath(import.meta.url)),PARENT=path.resolve(HERE,'../hanja-renderer-growing-caps-u7037-k-five-targets-left-experiment-2026-10-20'),read=p=>readFileSync(p),sha=b=>createHash('sha256').update(b).digest('hex'),V=JSON.parse(read(path.join(HERE,'validation.json'))),s=read(path.join(HERE,'serve.py')).toString(),old=read(path.join(PARENT,'serve.py')).toString(),c=JSON.parse(read(path.join(PARENT,'config.json')))
assert.deepEqual(readdirSync(HERE).sort(),['README.md','check.mjs','serve.py','validation.json'].sort())
for(const[f,h]of Object.entries(V.parentFilesSHA256))assert.equal(sha(read(path.join(PARENT,f))),h,f)
for(const[f,h]of Object.entries(V.ownFilesSHA256))assert.equal(sha(read(path.join(HERE,f))),h,f)
const extra="PARENT=HERE.parent/'hanja-renderer-growing-caps-u7037-k-five-targets-left-experiment-2026-10-20'\nVALIDATION_BYTES=(HERE/'validation.json').read_bytes()\nVALIDATION_SHA=hashlib.sha256(VALIDATION_BYTES).hexdigest()\nVALIDATION=json.loads(VALIDATION_BYTES)\n",guard="    if sha((HERE/'validation.json').read_bytes())!=VALIDATION_SHA:raise ValueError('harness validation changed')\n    for file,expected in VALIDATION['parentFilesSHA256'].items():\n        if sha((PARENT/file).read_bytes())!=expected:raise ValueError('parent changed: '+file)\n    for file,expected in VALIDATION['ownFilesSHA256'].items():\n        if sha((HERE/file).read_bytes())!=expected:raise ValueError('harness changed: '+file)\n",wholeAddition="+'<pre id=\"metrics\"></pre>'+script(20,True)"
function verifyText(s){
 let inverse=s.replace(extra,'').replace(guard,'').replaceAll("getElementById('risk-coverage-button-4m1')","getElementById('coverage4m1')").replace('id="risk-coverage-button-4m1"','id="coverage4m1"').replace(wholeAddition,'+script(20,True)')
 for(const x of["'config.json'","'render.mjs'","CONFIG['sourceFixture']"])inverse=inverse.replaceAll('(PARENT/'+x+')','(HERE/'+x+')')
 assert.equal(inverse,old,'Only allowed ID/ref/rebase/whole-metrics and own pin guard changes')
 const page=s.slice(s.indexOf('def progressive_page'),s.indexOf('class Handler')),controlIds=[...page.matchAll(/id="([A-Za-z][\w-]*)"/g)].map(m=>m[1])
 assert.equal(new Set(controlIds).size,controlIds.length);assert(controlIds.includes('risk-coverage-button-4m1'));assert(!controlIds.includes('coverage4m1'))
 const refs=[...s.matchAll(/getElementById\('([^']+)'\)/g)].map(m=>m[1])
 for(const id of refs)assert(controlIds.includes(id),'progressive HTML missing ref '+id)
 const maskIds=c.curveTargets.map(t=>'coverage'+t.pen+'m'+t.mask).concat('coverage-body4m1')
 assert.equal(new Set(maskIds).size,maskIds.length);for(const id of controlIds)assert(!maskIds.includes(id),'HTML/SVG mask collision '+id)
 assert(old.includes('id="coverage4m1"')&&maskIds.includes('coverage4m1'),'static old risk intersection exists')
 assert(s.includes("targetCoverageResidual(targetMask(t.pen,t.mask),'coverage'+t.pen+'m'+t.mask)"))
 assert(s.includes("targetCoverageResidual(targetMask(4,1),'coverage-body4m1')"))
 assert(s.includes("getElementById('epsilon4m1')")&&controlIds.includes('epsilon4m1'))
 for(const x of["'config.json'","'render.mjs'","CONFIG['sourceFixture']"]){assert(!s.includes('(HERE/'+x+')'));assert(s.includes('(PARENT/'+x+')'))}
 assert(s.includes("REPO=HERE.parent.parent"));assert(s.includes("body=(PARENT/'render.mjs').read_text()"))
 const whole=s.slice(s.indexOf('def whole_page'),s.indexOf('def progressive_page'))
 assert.equal((whole.match(/id="metrics"/g)||[]).length,1);assert(whole.indexOf('id="metrics"')<whole.indexOf('script(20,True)'))
 const priorWhole=old.slice(old.indexOf('def whole_page'),old.indexOf('def progressive_page'));assert(!priorWhole.includes('id="metrics"'))
 assert(s.includes("requested=1;status({mode:'whole'})"));assert(s.includes("document.getElementById('metrics').textContent=JSON.stringify"))
 return{controlIds:controlIds.length,DOMRefs:refs.length,maskIds:maskIds.length}
}
const result=verifyText(s)
let negative=0;for(const mutated of[s.replace('id="risk-coverage-button-4m1"','id="coverage4m1"'),s.replace("getElementById('risk-coverage-button-4m1')","getElementById('coverage4m1')"),s.replaceAll("(PARENT/'render.mjs')","(HERE/'render.mjs')"),s.replace(wholeAddition,'+script(20,True)')]){assert.notEqual(mutated,s);assert.throws(()=>verifyText(mutated));negative++}
assert.equal(path.resolve(PARENT,c.sourceFixture),path.resolve(HERE,c.sourceFixture));assert.equal(sha(read(path.resolve(PARENT,c.sourceFixture))),c.fixtureSHA256)
assert.equal(V.nativeApproval,false);assert.equal(V.runtimeApplied,false);assert.equal(V.appUI,false)
console.log(JSON.stringify({passed:true,staticDiscoveryOnly:true,allowedInverseByteEqual:true,...result,IDIntersection:[],negative,parentPins:Object.keys(V.parentFilesSHA256).length,ownPins:Object.keys(V.ownFilesSHA256).length,correctRelativeConfigRenderFixture:true,wholeMetricsNodeOnly:true,progressiveMissingMetricsStillFails:true,sourceCompiler:0,moduleImports:0,geometry:0,derive:0,engine:0,server:0,HTTP:0,nativeApproval:false}))
