import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import ts from 'typescript'
import {makeLocalU8587SourcePrefixContext,localU8587SourcePrefixPolicy,LOCAL_U8587_SOURCE_PREFIX_INPUT} from './hanja-stroke-source-prefix-u8587-local.ts'
import {makeReviewedU8587LocalPointWindowContext,reviewedU8587LocalPointWindowPolicy} from './hanja-stroke-source-point-windows-u8587-local.ts'
const read=(path:string)=>readFileSync(new URL('../'+path,import.meta.url),'utf8')
const hash=(value:string)=>createHash('sha256').update(value).digest('hex')
const source=read('components/hanja/stroke-outlines.tsx'),delta=JSON.parse(read('docs/hanja-actual-component-profiles-2026-10-22/u8587-local-components-source-preview-3.json')).previewComponentDelta
const ast=ts.createSourceFile('stroke-outlines.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX)
function calls(name:string){const out:ts.CallExpression[]=[];function walk(node:ts.Node){if(ts.isCallExpression(node)&&node.expression.getText(ast)===name)out.push(node);ts.forEachChild(node,walk)}walk(ast);return out}
function jsx(name:string){const out:ts.JsxSelfClosingElement[]=[];function walk(node:ts.Node){if(ts.isJsxSelfClosingElement(node)&&node.tagName.getText(ast)===name)out.push(node);ts.forEachChild(node,walk)}walk(ast);assert.equal(out.length,1);return out[0]}
function prop(node:ts.JsxSelfClosingElement,name:string){const p=node.attributes.properties.find(p=>ts.isJsxAttribute(p)&&p.name.getText(ast)===name);assert(p&&ts.isJsxAttribute(p)&&p.initializer&&ts.isJsxExpression(p.initializer)&&p.initializer.expression);return p.initializer.expression.getText(ast)}
test('薇 production component is exactly the ROOT-reviewed actual-component RAM source',()=>{
 assert.equal(hash(source),'e9b9abd326f209efce35a1da74a8c7d04830779294e16750344da1946dddf4e0')
 assert(source.endsWith(delta.append));let original=source.slice(0,-delta.append.length)
 for(const change of [...delta.replacements].reverse()){assert.equal(original.split(change.new).length,2);original=original.replace(change.new,change.old)}
 assert.equal(hash(original),'cad462b4ebfa4aba4f186a1b1cfa0ef9ee0c3b1db4f1d84bf9deb86b93724bfe')
})
test('薇 production factories bind actual strokes; whole-axis policies bypass independent mask progress',()=>{
 for(const name of ['makeLocalU8587SourcePrefixContext','makeReviewedU8587LocalPointWindowContext']){
  const found=calls(name);assert.equal(found.length,1);assert.deepEqual(found[0].arguments.map(n=>n.getText(ast)),['LOCAL_U8587_SOURCE_PREFIX_INPUT.fullProof','LOCAL_U8587_SOURCE_PREFIX_INPUT.identity','strokes'])
 }
 assert.deepEqual(calls('localU8587SourcePrefixPolicy')[0].arguments.map(n=>n.getText(ast)),['u8587LocalPrefixContext','stroke'])
 const whole=jsx('U8587LocalPrefixPreviewOutline');assert.equal(prop(whole,'segments'),'segments');assert.equal(prop(whole,'progress'),'Number.isFinite(progress)?Math.max(0,Math.min(1,progress)):NaN')
 assert(source.indexOf('if(u8587LocalPrefixPolicy)return')<source.indexOf('const amounts = outlineSegmentProgress'))
 const point=jsx('U8587LocalPointWindowOutline');assert.equal(prop(point,'progress'),'Number.isFinite(progress)?progress>=1?1:p:NaN');assert.equal(prop(point,'priorProgress'),'index>0?amounts[index-1]:0');assert.equal(prop(point,'logicalProgress'),'Number.isFinite(progress)?Math.max(0,Math.min(1,progress)):NaN')
 const commits=calls('commitReviewedU8587LocalPointWindow');assert.equal(commits.length,1);assert.equal(commits[0].arguments.at(-1)?.getText(ast),'logicalProgress')
 assert.deepEqual(calls('reviewedU8587LocalPointWindowPolicy')[0].arguments.map(n=>n.getText(ast)),['u8587LocalPointContext','stroke','index'])
})
test('薇 materialized branch owns only exact local source and preserves other-glyph fallback',()=>{
 const input=LOCAL_U8587_SOURCE_PREFIX_INPUT,strokes=structuredClone(input.strokes),prefix=makeLocalU8587SourcePrefixContext(structuredClone(input.fullProof),structuredClone(input.identity),strokes),point=makeReviewedU8587LocalPointWindowContext(structuredClone(input.fullProof),structuredClone(input.identity),strokes)
 assert(prefix&&point);assert.equal(localU8587SourcePrefixPolicy(prefix,11)?.segments.length,2)
 assert.equal(reviewedU8587LocalPointWindowPolicy(point,12,2)?.priorRequired,true)
 for(let pen=0;pen<17;pen++){assert.equal(!!localU8587SourcePrefixPolicy(prefix,pen),[4,5,11,13,15,16].includes(pen));for(let mask=0;mask<strokes[pen].length;mask++)assert.equal(!!reviewedU8587LocalPointWindowPolicy(point,pen,mask),[[12,2]].some(([p,m])=>p===pen&&m===mask))}
 const changed=strokes.map(p=>[...p]);changed[12][2]={...changed[12][2],weight:changed[12][2].weight+.001}
 assert.equal(makeLocalU8587SourcePrefixContext(input.fullProof,input.identity,changed),null);assert.equal(makeReviewedU8587LocalPointWindowContext(input.fullProof,input.identity,changed),null)
 const other=JSON.parse(read('docs/hanja-source-original-u5a93-2026-10-26/fixtures.json')).u5a93
 assert.equal(makeLocalU8587SourcePrefixContext(input.fullProof,input.identity,other.strokes),null);assert.equal(makeReviewedU8587LocalPointWindowContext(input.fullProof,input.identity,other.strokes),null)
})
