// Source-only RAM handoff. No private SVG is served or written.
import http from 'node:http'
import readline from 'node:readline'
import { existsSync } from 'node:fs'
globalThis.__hanjaSourceCaptureExtraCandidates=[{"id":"u83f1","glyph":"菱","hun":"마름","eum":"릉","readingGrade":"1급","radical":"艸","strokes":12,"sourceRow":1533,"sourceHunEum":"마름 릉","example":{"word":"菱狀","reading":"능상","source":{"dictionary":"표준국어대사전","targetCode":69127,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=69127&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":1121,"reReview":true,"priorDocs":[{"docs":"hanja-goal-variant-kanjivg-batch13-2026-09-22","status":"held missing domestic stroke8 upward hook; catalog12/domestic11","reviewFile":"docs/hanja-goal-variant-kanjivg-batch13-2026-09-22/findings.json"},{"docs":"hanja-goal-tomoe-batch21-2026-09-22","status":"held missing upward hook and final stroke junction mismatch","reviewFile":"docs/hanja-goal-tomoe-batch21-2026-09-22/findings.json"}],"runtimeApplied":false},{"id":"u9ad3","glyph":"髓","hun":"뼛골","eum":"수","readingGrade":"1급","radical":"骨","strokes":23,"sourceRow":2780,"sourceHunEum":"뼛골 수","example":{"word":"骨髓","reading":"골수","source":{"dictionary":"표준국어대사전","targetCode":394233,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=394233&searchKeywordTo=3","verifiedAt":"2026-09-17"}},"batch":1122,"reReview":true,"priorDocs":[{"docs":"hanja-goal-g1-batch2-2026-09-21","status":"held domestic walk22/23 geometry mismatch; catalog23","reviewFile":"docs/hanja-goal-g1-batch2-2026-09-21/findings.json"}],"runtimeApplied":false}]
const m=await import('../hanja-goal-glyphwiki-batch1119-2026-10-14/capture-sources.mjs')
const bundle=m.captureBundle,allowed=new Set([1119,1120,1121,1122])
for(const [path,value] of Object.entries(bundle.files)){
  if(!/^docs\/hanja-goal-glyphwiki-batch(?:1119|1120|1121|1122)-2026-10-14\//.test(path))throw Error('Unexpected output scope '+path)
  const lower=path.toLowerCase()
  if(lower.endsWith('.svg')||lower.endsWith('.png')||lower.endsWith('.jpg'))throw Error('No private graphic endpoint')
}
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://127.0.0.1:64680')
  res.setHeader('Cache-Control','no-store')
  if(url.pathname==='/summary'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify({summary:bundle.summary,errors:bundle.errors,files:Object.keys(bundle.files),cacheURLs:globalThis.__hanjaSourceCaptureBufferCache.size,privateMediaSaved:false}));return}
  if(url.pathname==='/file'){
    const path=url.searchParams.get('path')
    if(!Object.hasOwn(bundle.files,path)){res.statusCode=404;res.end('Not captured');return}
    res.setHeader('Content-Type','text/plain; charset=utf-8');res.end(bundle.files[path]);return
  }
  res.statusCode=404;res.end('No endpoint')
})
server.listen(64680,'127.0.0.1',()=>process.stdout.write(JSON.stringify({sourceOnlyCaptureReady:true,pid:process.pid,port:64680,summary:bundle.summary,errors:bundle.errors,cacheURLs:globalThis.__hanjaSourceCaptureBufferCache.size,privateMediaSaved:false})+'\n'))
const done=new Set()
for await(const line of readline.createInterface({input:process.stdin})){
 const n=Number(line.trim())
 if(line.trim()==='exit'){server.close();break}
 if(!allowed.has(n)){process.stdout.write(JSON.stringify({batch:n,rejected:true})+'\n');continue}
 if(done.has(n)){process.stdout.write(JSON.stringify({batch:n,alreadyVerified:true})+'\n');continue}
 const url=new URL('../hanja-goal-glyphwiki-batch'+n+'-2026-10-14/verify-source.mjs',import.meta.url)
 if(!existsSync(url)){process.stdout.write(JSON.stringify({batch:n,notPrepared:true})+'\n');continue}
 try{const verified=await import(url);done.add(n);process.stdout.write(JSON.stringify({batch:n,sourceVerificationResult:verified.sourceVerificationResult??null,cacheURLs:globalThis.__hanjaSourceCaptureBufferCache.size,sourceNativeApproval:false})+'\n')}
 catch(error){process.stdout.write(JSON.stringify({batch:n,verificationFailed:true,error:String(error)})+'\n')}
}
