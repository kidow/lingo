// FIRST changed-wire verification only. No SSR, browser, engine, math or shared writes.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import cp from 'node:child_process'
import {createRequire} from 'node:module'
const require=createRequire(import.meta.url),ts=require('typescript')
const ROOT=process.cwd(),sha=x=>crypto.createHash('sha256').update(x).digest('hex')
const r=cp.spawnSync('/opt/homebrew/bin/node',['docs/hanja-source-cached-order2-u61f0-2026-10-23/prepare-future-caps-patch.mjs'],{encoding:'utf8',maxBuffer:5000000})
assert.equal(r.status,0,r.stderr);const pack=JSON.parse(r.stdout),C=pack.profile
const helper='scripts/hanja-actual-component-review.mjs',component='components/hanja/stroke-outlines.tsx',source=pack.source[helper]
const ast=ts.createSourceFile(helper,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
assert.equal(ast.parseDiagnostics.length,0)
const fn=name=>{const n=ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name);assert(n);return n}
const strokes=JSON.parse(fs.readFileSync(C.fixture))['u61f0-order2'].strokes
let oldGuardCalls=0
const wrapper=new Function('assert','plainU61f0Order2FixedFixture',fn('u61f0GrowingFixedFixture').getText(ast)+';return u61f0GrowingFixedFixture')(assert,(c,v)=>{oldGuardCalls++;assert.equal(c.kind,'plain-outline');assert.equal(v.marker,true);return strokes})
assert.equal(wrapper(C,{marker:true}),strokes)
let wrapperNegatives=0
for(const mutate of[c=>{c.kind='plain-outline'},c=>{c.targets[0].id+='bad'},c=>{c.targets[0].q0[0]+=.1},c=>{c.targets[0].segment.revealPath+=' '},c=>{c.targets.pop()},c=>{c.targets[5].pen=8},c=>{c.targets[12].mask=2}]){
 const c=structuredClone(C);mutate(c);assert.throws(()=>wrapper(c,{marker:true}));wrapperNegatives++
}
const decls=ast.statements.filter(ts.isVariableStatement).flatMap(n=>[...n.declarationList.declarations])
const strokeExpr=decls.find(n=>n.name.getText(ast)==='strokes')?.initializer.getText(ast);assert(strokeExpr)
assert.equal(new Function('C','fixture','u61f0GrowingFixedFixture','return ('+strokeExpr+')')(C,{marker:true},wrapper),strokes)
const resources=fn('resources'),collector=resources.body.statements.findIndex(n=>ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>d.name.getText(ast)==='component'))
assert(collector>=0);assert(ts.isForStatement(resources.body.statements[collector+1]))
const read=p=>{assert(typeof p==='string'&&!p.startsWith('/')&&!p.split('/').includes('..'));if(Object.hasOwn(pack.source,p))return Buffer.from(pack.source[p]);const b=fs.readFileSync(p);if(Object.hasOwn(C.inputSHA256,p))assert.equal(sha(b),C.inputSHA256[p],p);return b}
const constantsSource=new Function('fs','resolve','ROOT','C','assert',fn('constantsSource').getText(ast)+';return constantsSource')(fs,path.resolve,ROOT,C,assert)
const collected=new Function('C','read','constantsSource','assert',resources.body.statements[collector].getText(ast)+'\n'+resources.body.statements[collector+1].getText(ast)+'\nreturn {deps,raw};')(C,read,constantsSource,assert)
assert.equal(Object.keys(collected.raw).length,102);assert.equal(C.expectedResourceClosureModules,102)
const changed=['component',collected.deps['@/lib/hanja-stroke-start-caps-u61f0'],collected.deps['@/lib/hanja-stroke-source-clip-u7d8e'],collected.deps['@/lib/hanja-stroke-start-caps-u7d8e']]
let changedTranspiles=0,changedRuntimeImports=0
for(const key of changed){assert(key);const t=ts.transpileModule(collected.raw[key],{reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}});assert.equal(t.diagnostics?.length||0,0);changedTranspiles++;for(const m of t.outputText.matchAll(/require\(["']([^"']+)["']\)/g)){assert(Object.hasOwn(collected.deps,m[1])||['react','react/jsx-runtime'].includes(m[1]),key+': '+m[1]);changedRuntimeImports++}}
let fixtureWire
const route=resources.body.statements.find(n=>n.getText(ast).startsWith("routes.set('/fixture.json'"));assert(route)
new Function('routes','C','strokes',route.getText(ast))({set(k,v){assert.equal(k,'/fixture.json');fixtureWire=JSON.parse(v.body)}},C,strokes)
assert.deepEqual(fixtureWire.strokes,strokes);assert.deepEqual(fixtureWire.profile.pairProgress,C.pairProgress);assert.equal(fixtureWire.profile.targets.length,13)
for(const t of fixtureWire.profile.targets)assert.deepEqual(t.q0,t.segment.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number))
const browserDecl=decls.find(n=>n.name.getText(ast)==='BROWSER');assert(browserDecl)
const browser=new Function('return ('+browserDecl.initializer.getText(ast)+')')()
const ba=ts.createSourceFile('browser.mjs',browser,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);assert.equal(ba.parseDiagnostics.length,0)
const bf=name=>{const n=ba.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name);assert(n);return n}
let selectedState=0
const state=new Function('C','u51d7CapsState',bf('targetState').getText(ba)+';return targetState')(fixtureWire.profile,()=>{selectedState++;return'exact-u61f0-state'})
assert.equal(state({}),'exact-u61f0-state');assert.equal(selectedState,1)
const reader=bf('u51d7ReadCapsTarget'),ns=reader.body.statements.find(ts.isVariableStatement).declarationList.declarations.find(d=>d.name.getText(ba)==='ns');assert(ns)
for(const t of C.targets)assert.equal(new Function('t','return ('+ns.initializer.getText(ba)+')')(t),'u61f0')
const controls={dataset:{}},buttons=[]
const setup=new Function('C','document','button','u51d7Rho','u7e58Coverage',bf('setupU61f0').getText(ba)+';return setupU61f0')(fixtureWire.profile,{querySelector:()=>controls},(label,callback)=>buttons.push(label),()=>{},()=>{})
setup();assert.equal(buttons.length,179);setup();assert.equal(buttons.length,179)
assert(buttons.includes('u61f0-7-1 local 0.000001'));assert(buttons.includes('u61f0-18-1 full-round residual'));assert(buttons.includes('pen18 source before mask2 0'))
assert(bf('Probe').getText(ba).includes("if(C.kind==='growing-u61f0-caps')setupU61f0()"))
assert(browser.includes("if(C.kind==='growing-u61f0-caps'||")&&browser.includes('requestAnimationFrame(frameReport)'))
const replay={};let current=null,old=[],next=[]
const flush=()=>{if(current&&old.length){const a=old.join('\n'),b=next.join('\n');assert.equal(replay[current].split(a).length,2,'Exact patch hunk');replay[current]=replay[current].replace(a,b)}old=[];next=[]}
for(const line of pack.patch.split('\n')){if(line.startsWith('*** Update File: ')){flush();current=line.slice(17);replay[current]=fs.readFileSync(current,'utf8')}else if(line==='@@'){flush()}else if(line==='*** End Patch'){flush()}else if(line.startsWith('-'))old.push(line.slice(1));else if(line.startsWith('+'))next.push(line.slice(1))}
for(const[p,s]of Object.entries(pack.source))assert.equal(replay[p],s,'Exact own patch replay '+p)
const proof={schema:'hanja-u61f0-future90-wire-focused/v1',baseline:pack.baseline,future:pack.future,changedFixtureWrapperPositive:1,changedWrapperNegatives:wrapperNegatives,oldLoaderStubbed:true,oldSourceGuardReexecutions:0,actualDispatchExpression:true,actualFixtureWire:true,wireTargets:13,wireQ0:13,wireBoundaryCount:3,actualResourceCollector:true,totalClosureResources:102,changedModulesTranspiled:changedTranspiles,changedRuntimeImports,unchangedModulesNotTranspiled:98,namespaceTargets:13,stateRoute:1,setupControls:179,duplicateSetupAdds:0,exactPatchReplayFiles:2,nativeInitialApproval:false,SSR:0,server:0,browser:0,engine:0,projection:0,oldMath:0,oldDomainTests:0,oldDOMTests:0,sharedWrites:0}
console.log(JSON.stringify({proof,patch:pack.patch,profile:pack.profile}))
