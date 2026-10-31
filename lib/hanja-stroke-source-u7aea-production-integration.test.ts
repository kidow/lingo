import {readHanjaHistoricalSource} from './hanja-test-component-loader.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import ts from 'typescript'
import {makeLocalU7aeaSourcePrefixContext,localU7aeaSourcePrefixPolicy,LOCAL_U7AEA_SOURCE_PREFIX_INPUT} from './hanja-stroke-source-prefix-u7aea-local.ts'
import {makeReviewedU7aeaLocalHeadTailContext,reviewedU7aeaLocalHeadTailPolicy} from './hanja-stroke-source-head-tail-u7aea-local.ts'
const read=(path:string)=>readFileSync(new URL('../'+path,import.meta.url),'utf8')
const hash=(value:string)=>createHash('sha256').update(value).digest('hex')
const source=read('components/hanja/stroke-outlines.tsx'),delta=JSON.parse(read('docs/hanja-source-original-u7aea-local-2026-10-27/preview-component-delta.json'))
const ast=ts.createSourceFile('stroke-outlines.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX)
function calls(name:string){const out:ts.CallExpression[]=[];function walk(node:ts.Node){if(ts.isCallExpression(node)&&node.expression.getText(ast)===name)out.push(node);ts.forEachChild(node,walk)}walk(ast);return out}
function jsx(name:string){const out:ts.JsxSelfClosingElement[]=[];function walk(node:ts.Node){if(ts.isJsxSelfClosingElement(node)&&node.tagName.getText(ast)===name)out.push(node);ts.forEachChild(node,walk)}walk(ast);assert.equal(out.length,1);return out[0]}
function prop(node:ts.JsxSelfClosingElement,name:string){const p=node.attributes.properties.find(p=>ts.isJsxAttribute(p)&&p.name.getText(ast)===name);assert(p&&ts.isJsxAttribute(p)&&p.initializer&&ts.isJsxExpression(p.initializer)&&p.initializer.expression);return p.initializer.expression.getText(ast)}
test('竪 historical component retains the ROOT-reviewed RAM source and inverse',()=>{
 const source=readHanjaHistoricalSource('components/hanja/stroke-outlines.tsx','e9b9abd326f209efce35a1da74a8c7d04830779294e16750344da1946dddf4e0').toString()
 assert.equal(hash(source),'e9b9abd326f209efce35a1da74a8c7d04830779294e16750344da1946dddf4e0')
 const latest=JSON.parse(read('docs/hanja-actual-component-profiles-2026-10-22/u8587-local-components-source-preview-3.json')).previewComponentDelta;assert(source.endsWith(latest.append));let baseR=source.slice(0,-latest.append.length)
 for(const change of [...latest.replacements].reverse()){assert.equal(baseR.split(change.new).length,2);baseR=baseR.replace(change.new,()=>change.old)}
 assert.equal(hash(baseR),'cad462b4ebfa4aba4f186a1b1cfa0ef9ee0c3b1db4f1d84bf9deb86b93724bfe')
 assert(baseR.endsWith(delta.append));let original=baseR.slice(0,-delta.append.length)
 for(const change of [...delta.replacements].reverse()){assert.equal(original.split(change.new).length,2);original=original.replace(change.new,change.old)}
 assert.equal(hash(original),'e753fbe759cbb66cb1ba6c107e164908e9d19a4a6b736645fa385a0e0dd832e5')
})
test('竪 production factories bind actual strokes; whole-axis policies bypass independent mask progress',()=>{
 for(const name of ['makeLocalU7aeaSourcePrefixContext','makeReviewedU7aeaLocalHeadTailContext']){
  const found=calls(name);assert.equal(found.length,1);assert.deepEqual(found[0].arguments.map(n=>n.getText(ast)),['LOCAL_U7AEA_SOURCE_PREFIX_INPUT.fullProof','LOCAL_U7AEA_SOURCE_PREFIX_INPUT.identity','strokes'])
 }
 assert.deepEqual(calls('localU7aeaSourcePrefixPolicy')[0].arguments.map(n=>n.getText(ast)),['u7aeaLocalPrefixContext','stroke'])
 const whole=jsx('U7aeaLocalPrefixPreviewOutline');assert.equal(prop(whole,'segments'),'segments');assert.equal(prop(whole,'progress'),'Number.isFinite(progress)?Math.max(0,Math.min(1,progress)):NaN')
 assert(source.indexOf('if(u7aeaLocalPrefixPolicy)return')<source.indexOf('const amounts = outlineSegmentProgress'))
 const point=jsx('U7aeaLocalHeadTailOutline');assert.equal(prop(point,'progress'),'Number.isFinite(progress)?progress>=1?1:p:NaN');assert.equal(prop(point,'priorProgress'),'index>0?amounts[index-1]:0')
 assert.deepEqual(calls('reviewedU7aeaLocalHeadTailPolicy')[0].arguments.map(n=>n.getText(ast)),['u7aeaLocalPointContext','stroke','index'])
})
test('竪 materialized branch owns only exact local source and preserves other-glyph fallback',()=>{
 const input=LOCAL_U7AEA_SOURCE_PREFIX_INPUT,strokes=structuredClone(input.strokes),prefix=makeLocalU7aeaSourcePrefixContext(structuredClone(input.fullProof),structuredClone(input.identity),strokes),point=makeReviewedU7aeaLocalHeadTailContext(structuredClone(input.fullProof),structuredClone(input.identity),strokes)
 assert(prefix&&point);assert.equal(localU7aeaSourcePrefixPolicy(prefix,8)?.segments.length,1)
 assert.equal(reviewedU7aeaLocalHeadTailPolicy(point,6,1)?.priorRequired,true)
 for(let pen=0;pen<13;pen++){assert.equal(!!localU7aeaSourcePrefixPolicy(prefix,pen),[7,8,10,11].includes(pen));for(let mask=0;mask<strokes[pen].length;mask++)assert.equal(!!reviewedU7aeaLocalHeadTailPolicy(point,pen,mask),[[6,1]].some(([p,m])=>p===pen&&m===mask))}
 const changed=strokes.map(p=>[...p]);changed[6][1]={...changed[6][1],weight:changed[6][1].weight+.001}
 assert.equal(makeLocalU7aeaSourcePrefixContext(input.fullProof,input.identity,changed),null);assert.equal(makeReviewedU7aeaLocalHeadTailContext(input.fullProof,input.identity,changed),null)
 const other=JSON.parse(read('docs/hanja-source-original-u5a93-2026-10-26/fixtures.json')).u5a93
 assert.equal(makeLocalU7aeaSourcePrefixContext(input.fullProof,input.identity,other.strokes),null);assert.equal(makeReviewedU7aeaLocalHeadTailContext(input.fullProof,input.identity,other.strokes),null)
})
