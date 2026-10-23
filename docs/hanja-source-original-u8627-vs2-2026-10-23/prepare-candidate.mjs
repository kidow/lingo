// Source preparation only: prints candidate code, never writes or invokes geometry.
import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {createRequire} from 'node:module'
const require=createRequire(new URL('../../package.json',import.meta.url)),ts=require('typescript')
const base='docs/hanja-source-independent-qq-three-u785c-source-experiment-2026-10-23/candidate.mjs',old=fs.readFileSync(base,'utf8')
assert.equal(createHash('sha256').update(old).digest('hex'),'3051eb5cdfb799e9d8ce59396b61d8d7f072da45a77a2b60e97722f2d1a36d23')
const ast=ts.createSourceFile(base,old,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
let body=ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='deriveOriginalMasks').getText(ast)
body=body.replace('assert.equal(trace.length,16)','assert.equal(trace.length,24)').replace("assert.equal(calls[i].kind,'cdDrawCurve');assert(Math.hypot(end[0]-start[0],end[1]-start[1])>2&&Math.hypot(end[0]-start[0],end[1]-start[1])<3,'Original finite source gap retained');","assert.equal(calls[i].kind,'cdDrawBezier');assert.deepEqual(end,[55,162.05]);assert.deepEqual(start,[53,160.4]);").replace('Domestic pen19 ends left. Reveal exactly the independently emitted','If a pinned terminal is selected, reveal exactly the independently emitted').replace('Domestic review established one pen for these source drawing commands.','The existing numeric source table groups these drawing commands; new direction approval is pending.')
assert(body.includes("assert.equal(calls[i].kind,'cdDrawBezier');assert.deepEqual(end,[55,162.05])"))
const original='docs/hanja-goal-glyphwiki-batch415-2026-10-09/progressive.mjs',p=fs.readFileSync(original,'utf8')
assert.equal(createHash('sha256').update(p).digest('hex'),'476f2aea54ac94885865066beebc3339553f8efbcc19aaf45034da8feef8ac93')
const pa=ts.createSourceFile(original,p,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS),vars=pa.statements.filter(ts.isVariableStatement).flatMap(n=>[...n.declarationList.declarations])
const tables=['CURVES','BEZIERS','TERMINALS'].map(name=>'const '+name+'='+vars.find(d=>d.name.getText(pa)===name).initializer.getText(pa))
const head=`// Provisional original-source QB partition; no native approval.
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {ORIGINAL_U8627,originalU8627SourceContext} from './source-context.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sourceGroups=ORIGINAL_U8627.sourceGroups,INDEPENDENT_PAIRS=new Set(['[8,9]'])
`
const tail=`
let runs=0,cachedCalls=0
export const sourceRoot='u8627-ue0102',selectedProofIdentity=ORIGINAL_U8627.identity,nativeApproval=false,runtimeApplied=false
export {sourceGroups}
export function captureGeometry(trace,proof,identity){assert.equal(originalU8627SourceContext(trace,proof,identity),ORIGINAL_U8627);assert.equal(runs,0,'FIRST compile only; use frozen cache thereafter');runs++;const strokes=deriveOriginalMasks(trace,proof);assert.equal(strokes.length,21);assert.equal(strokes.flat().length,22);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),54);return strokes}
export function compileProgressive(trace,proof,identity){assert.equal(originalU8627SourceContext(trace,proof,identity),ORIGINAL_U8627);const f=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url)))['u8627-ue0102'];assert.equal(sha(f.strokes),EXPECTED_GEOMETRY_SHA256);assert.deepEqual(f.fullProof,proof);assert.deepEqual(f.identity,identity);assert.deepEqual(f.sourceGroups,sourceGroups);cachedCalls++;return f.strokes}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return runs}
export function cachedPositiveCallCount(){return cachedCalls}
`
const candidate=head+tables.join('\n')+"\nconst sha=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex')\nconst EXPECTED_GEOMETRY_SHA256='PENDING_FIRST_COMPILE'\n"+body+'\n'+tail
console.log(JSON.stringify({candidate,sourceFactory:base,sourceFactorySHA256:'3051eb5cdfb799e9d8ce59396b61d8d7f072da45a77a2b60e97722f2d1a36d23'}))
