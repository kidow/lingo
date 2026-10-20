import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const read=p=>readFileSync(new URL(p,import.meta.url)),sha=b=>createHash('sha256').update(b).digest('hex'),meta=JSON.parse(read('./validation.json')),wrapper=read('./serve.py').toString()
const literal=name=>JSON.parse(wrapper.match(new RegExp('^'+name+'=(.*)$','m'))[1])
const source=read('../../'+literal('SOURCE')).toString(),old=literal('OLD_CAPTION'),replacement=literal('NEW_CAPTION')
assert.equal(sha(source),literal('EXPECTED_SOURCE_SHA'));assert.equal(source.split(old).length,2);assert(!source.includes(replacement));const patched=source.replace(old,replacement);assert.equal(patched.split(replacement).length,2);assert.equal(patched.replace(replacement,old),source);assert.equal(sha(patched),literal('EXPECTED_PATCHED_SHA'));assert.equal(meta.allowedReplacements,1);assert.equal(meta.geometryPolicyChanges,0);assert.equal(meta.browserJSChanges,0)
assert(old.startsWith('<p>墍'));assert(replacement.startsWith('<p>酈 u9148'));for(const phrase of ['22획/25mask/57polygon','19·21','0.7614893808966503','0.8924120569160016','fixed round cap','native/app/runtimefalse'])assert(replacement.includes(phrase))
assert(wrapper.includes("'__file__':str(original)"));assert(wrapper.includes("compile(patched,str(original),'exec')"));assert(!wrapper.includes('subprocess'));assert(!wrapper.includes('node '));assert(!wrapper.includes('--check-only'));assert.equal(meta.originalHerePreserved,true);assert.equal(meta.originalFilePreserved,true)
for(const[file,pin]of Object.entries(meta.inputSHA256))assert.equal(sha(read('../../'+file)),pin,file)
for(const[file,pin]of Object.entries(meta.ownSHA256))assert.equal(sha(read('./'+file)),pin,file)
assert.equal(Object.keys(meta.inputSHA256).length,8);assert.equal(Object.keys(meta.ownSHA256).length,3)
for(const key of ['nativeApproval','actualAppUIVerified','runtimeApplied','serverStarted','buildRun','HTTPExecuted'])assert.equal(meta[key],false,key)
for(const key of ['sourceCompilerCalls','engineRuns','factoryCalls','geometryDerivations','oldChecksRepeated'])assert.equal(meta[key],0,key)
assert.equal(meta.checks.captionInverseAndMetadataRuns,1);assert.equal(meta.checks.nodeSyntaxRuns,1);assert.equal(meta.checks.pythonASTRuns,1)
console.log(JSON.stringify({captionInverseAndMetadata:'PASS',allowedReplacements:1,inputPins:8,ownPins:3,originalHerePreserved:true,sourceOrGeometryOrJSChanges:0,engine:0,oldChecksRepeated:0,native:false,HTTP:0,serverStarted:false}))
