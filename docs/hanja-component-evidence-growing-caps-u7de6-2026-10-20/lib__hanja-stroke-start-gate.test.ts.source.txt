import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ts from 'typescript'
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
import { hasReviewedHanjaStartGate, isReviewedHanjaStartGateSegment, measureHanjaStartGateLength, hanjaStartGateClip, reviewedHanjaRevealContext, reviewedHanjaRevealPolicy, reviewedHanjaRevealClip, measureReviewedHanjaRevealLength, measureReviewedGrowingCapsFrame, commitReviewedGrowingCaps, type ReviewedGrowingNodes } from './hanja-stroke-start-gate.ts'
import { gateState } from '../docs/hanja-renderer-start-gate-u68d6-experiment-2026-10-19/render.mjs'

const fixture = JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-vq-u68d6-source-experiment-2026-10-19/fixtures.json', import.meta.url), 'utf8')).u68d6
const strokes = fixture.strokes as HanjaOutlineStrokes
const nativeLength = 38.68603515625
type MutableStrokes = (Omit<HanjaOutlineSegment, 'bounds'> & { bounds: number[]; extra?: boolean })[][]

test('exact 棖 geometry only: committed guide measurement, continuous gate and isolated renderer parity', () => {
  const before = JSON.stringify(strokes), segment = strokes[9][1]
  assert.equal(createHash('sha256').update(before).digest('hex'), 'fa3be0dbcd906119295020bea0caea8a4064925a8b85078a8cc71c0fee9f1e36')
  assert(hasReviewedHanjaStartGate(strokes)); assert(isReviewedHanjaStartGateSegment(segment))
  assert(!isReviewedHanjaStartGateSegment(strokes[9][0]))
  let negatives = 0
  for (const mutate of [
    (s: MutableStrokes) => s.pop(), (s: MutableStrokes) => s[0][0].weight++, (s: MutableStrokes) => s[9].reverse(),
    (s: MutableStrokes) => s[9][1].outline += ' ', (s: MutableStrokes) => s[9][1].bounds[0]++,
    (s: MutableStrokes) => s[9][1].revealPath += ' ', (s: MutableStrokes) => s[9][1].revealWidth++,
    (s: MutableStrokes) => s[9][1].weight++, (s: MutableStrokes) => s[9][1].direction = 'down',
    (s: MutableStrokes) => s[9][1].extra = true,
  ]) { const changed = structuredClone(strokes) as MutableStrokes; mutate(changed); assert(!hasReviewedHanjaStartGate(changed)); negatives++ }
  let measured = 0
  const guide = { isConnected: true, getAttribute: (key: string) => key === 'd' ? segment.revealPath! : null, getTotalLength: () => { measured++; return nativeLength } }
  assert.equal(measureHanjaStartGateLength(segment, null), null)
  assert.equal(measureHanjaStartGateLength(segment, { ...guide, isConnected: false }), null)
  assert.equal(measureHanjaStartGateLength(segment, { ...guide, getAttribute: () => 'wrong' }), null)
  assert.equal(measureHanjaStartGateLength(strokes[9][0], guide), null)
  assert.equal(measured, 0) // no DOM measurement before exact committed-ref checks
  assert.equal(measureHanjaStartGateLength(segment, guide), nativeLength)
  assert.equal(measured, 1)
  for (const result of [0, -1, NaN, Infinity]) assert.equal(measureHanjaStartGateLength(segment, { ...guide, getTotalLength: () => result }), null)
  assert.equal(measureHanjaStartGateLength(segment, { ...guide, getTotalLength: () => { throw Error('not measurable') } }), null)
  const tau = 14 / nativeLength
  assert.equal(tau, 0.36188769263779674)
  const values = [0, 1e-12, 1e-8, 1e-6, tau / 4, tau / 2, tau, .95, .9999, .99999999, 1]
  let threshold = -Infinity
  for (const p of values) {
    const actual = hanjaStartGateClip(segment, p, nativeLength), isolated = gateState(segment, p, nativeLength)
    assert.deepEqual(actual.center, isolated.q); assert.deepEqual(actual.tangent, isolated.v)
    assert.equal(actual.radius, isolated.r); assert.equal(actual.threshold, isolated.h); assert.equal(actual.tau, isolated.tau)
    assert(actual.threshold >= threshold); threshold = actual.threshold
    assert.equal(actual.active, p > 0 && p < tau)
  }
  const initial = hanjaStartGateClip(segment, 0, nativeLength), completed = hanjaStartGateClip(segment, 1, nativeLength)
  assert.equal(initial.threshold, -7); assert.equal(completed.threshold, 7); assert(!completed.active)
  const upperArea = (p: number) => { const g = hanjaStartGateClip(segment, p, nativeLength), ell = p * nativeLength; return 2 * g.radius * (g.threshold + g.radius) + 2 * Math.PI * g.radius * ell + Math.PI * ell * ell }
  const tinyAreas = [1e-6, 1e-8, 1e-10, 1e-12].map(upperArea)
  for (let i = 1; i < tinyAreas.length; i++) assert(tinyAreas[i] < tinyAreas[i - 1])
  assert(tinyAreas.at(-1)! < 1e-6)
  for (const length of [0, -1, NaN, Infinity]) { assert.throws(() => hanjaStartGateClip(segment, .5, length)); negatives++ }
  for (const p of [-.1, 1.1, NaN, Infinity]) { assert.throws(() => hanjaStartGateClip(segment, p, nativeLength)); negatives++ }
  const altered = { ...segment, revealWidth: 15 }; assert.throws(() => hanjaStartGateClip(altered, .1, nativeLength)); negatives++
  const boundary = strokes[9][0].weight / strokes[9].reduce((sum, s) => sum + s.weight, 0)
  assert.equal(outlineSegmentProgress(strokes[9], boundary - 1e-10)[1], 0)
  assert(outlineSegmentProgress(strokes[9], boundary + 1e-10)[1] > 0)
  assert.deepEqual(outlineSegmentProgress(strokes[9], 1), [1, 1])
  assert.equal(JSON.stringify(strokes), before)
  assert.equal(negatives, 19)
})



const shui = JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-hq-up-u5e28-source-experiment-2026-10-19/fixtures.json', import.meta.url), 'utf8')).u5e28.strokes as HanjaOutlineStrokes

test('exact 帨 context and two policies: isolated parity, committed measurement and other-mask refusal', async () => {
  const before = JSON.stringify(shui)
  assert.equal(createHash('sha256').update(before).digest('hex'), 'c1488f46315395ce3258b8bccafd0350bd2d49f281e7a187bf4f0bf5cf7fa8b3')
  const context = reviewedHanjaRevealContext(shui)!
  assert.equal(context.id, 'u5e28'); assert.equal(hasReviewedHanjaStartGate(shui), false) // legacy 棖-only contract
  const qPolicy = reviewedHanjaRevealPolicy(context, 4, 1)!, planePolicy = reviewedHanjaRevealPolicy(context, 9, 0)!
  assert.equal(qPolicy.kind, 'circle-start'); assert.equal(planePolicy.kind, 'global-projection')
  assert.equal(reviewedHanjaRevealPolicy({ ...context }, 4, 1), null)
  for (let p = 0; p < shui.length; p++) for (let m = 0; m < shui[p].length; m++)
    if (!(p === 4 && m === 1) && !(p === 9 && m === 0)) assert.equal(reviewedHanjaRevealPolicy(context, p, m), null)
  for (const mutate of [
    (s: MutableStrokes) => s[0][0].weight++, (s: MutableStrokes) => s[9].reverse(),
    (s: MutableStrokes) => s[4][1].bounds[0]++, (s: MutableStrokes) => s[4][1].revealPath += ' ',
    (s: MutableStrokes) => s[9][0].outline += ' ', (s: MutableStrokes) => s[9][0].extra = true,
  ]) { const changed = structuredClone(shui) as MutableStrokes; mutate(changed); assert.equal(reviewedHanjaRevealContext(changed), null) }
  const q = shui[4][1], plane = shui[9][0], length = 26.571182250976562
  let measurements = 0
  const guide = { isConnected: true, getAttribute: () => q.revealPath!, getTotalLength: () => { measurements++; return length } }
  assert.equal(measureReviewedHanjaRevealLength(qPolicy, q, null), null)
  assert.equal(measureReviewedHanjaRevealLength(qPolicy, q, { ...guide, isConnected: false }), null)
  assert.equal(measureReviewedHanjaRevealLength(qPolicy, q, { ...guide, getAttribute: () => 'wrong' }), null)
  assert.equal(measurements, 0)
  assert.equal(measureReviewedHanjaRevealLength(qPolicy, q, guide), length); assert.equal(measurements, 1)
  assert.equal(measureReviewedHanjaRevealLength(planePolicy, plane, { ...guide, getAttribute: () => plane.revealPath!, getTotalLength: () => { throw Error('plane must not measure') } }), null)
  for (const value of [0, -1, NaN, Infinity]) assert.equal(measureReviewedHanjaRevealLength(qPolicy, q, { ...guide, getTotalLength: () => value }), null)
  assert.throws(() => measureReviewedHanjaRevealLength(qPolicy, plane, guide))
  assert.throws(() => reviewedHanjaRevealClip({ ...qPolicy }, q, .2, length))
  assert.throws(() => reviewedHanjaRevealClip(qPolicy, { ...q, revealWidth: 15 }, .2, length))
  assert.throws(() => reviewedHanjaRevealClip(qPolicy, q, .2, null))
  const isolated = await import(new URL('../docs/hanja-renderer-global-projection-u5e28-experiment-2026-10-20/render.mjs', import.meta.url).href)
  const progress = [0, 1e-12, 1e-8, 1e-6, .0269, .1, .5, .95, .9999, .99999999, 1]
  let previous = -Infinity
  for (const p of progress) {
    const circle = reviewedHanjaRevealClip(qPolicy, q, p, length), oldCircle = isolated.gateState(q, p, length)
    assert.equal(circle.kind, 'circle-start'); assert.deepEqual(circle.center, oldCircle.q); assert.deepEqual(circle.tangent, oldCircle.v)
    assert.equal(circle.threshold, oldCircle.h); if (circle.kind === 'circle-start') assert.equal(circle.tau, oldCircle.tau)
    const global = reviewedHanjaRevealClip(planePolicy, plane, p, null), oldGlobal = isolated.projectionState(plane, p)
    assert.equal(global.kind, 'global-projection'); assert.deepEqual(global.center, oldGlobal.q); assert.deepEqual(global.tangent, oldGlobal.v)
    assert.equal(global.projectionMin, oldGlobal.a); assert.equal(global.projectionMax, oldGlobal.b); assert.equal(global.threshold, oldGlobal.h)
    assert(global.threshold >= previous); previous = global.threshold
    const width = global.projectionMax - global.projectionMin
    assert.equal(width, 37)
    if (global.kind === 'global-projection') { assert.equal(global.normalMax-global.normalMin, 24); assert(Math.abs(24*(global.threshold-global.projectionMin)-888*p) < 1e-10) }
  }
  for (const p of [NaN, Infinity, -.1, 1.1]) assert.throws(() => reviewedHanjaRevealClip(planePolicy, plane, p, null))
  assert.equal(JSON.stringify(shui), before)
})

test('actual whole component SSR mounts exact guides without measurement; completed targets remain masked', async () => {
  const componentURL = new URL('../components/hanja/stroke-outlines.tsx', import.meta.url)
  const source = readFileSync(componentURL, 'utf8')
  const timingSource = readFileSync(new URL('./hanja-strokes.ts', import.meta.url), 'utf8')
  const speed = timingSource.match(/^const STROKE_PLAYBACK_SPEED = .+$/m)![0]
  const duration = timingSource.match(/^export const STROKE_DURATION = .+$/m)![0]
  const gap = timingSource.match(/^export const STROKE_GAP = .+$/m)![0]
  const timingURL = 'data:text/javascript;base64,' + Buffer.from([speed,duration,gap].join('\n')).toString('base64')
  let js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText
  for (const [from, to] of [
    ['@/lib/hanja-strokes', timingURL], ['@/lib/hanja-stroke-outline', new URL('./hanja-stroke-outline.ts', import.meta.url).href],
    ['@/lib/hanja-stroke-start-gate', new URL('./hanja-stroke-start-gate.ts', import.meta.url).href],
    ['react/jsx-runtime', import.meta.resolve('react/jsx-runtime')], ['react', import.meta.resolve('react')],
  ]) js = js.replaceAll('"'+from+'"', '"'+to+'"').replaceAll("'"+from+"'", "'"+to+"'")
  const { StrokeOutlines } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'))
  const render = (outlines: HanjaOutlineStrokes, phase: 'idle' | 'playing', manual: boolean | null, count: number) => renderToStaticMarkup(createElement('svg', null, createElement(StrokeOutlines, { strokes: outlines, clock: { current: [] }, phase, count, manual })))
  const complete = render(shui, 'idle', null, 10)
  for (const [id, segment] of [['u5e28-5-2', shui[4][1]], ['u5e28-10-1', shui[9][0]]] as const) {
    assert(complete.includes('data-stroke-start-gate="'+id+'"'))
    assert(complete.includes('d="'+segment.outline+'" mask="url(#'))
  }
  assert(complete.includes('data-stroke-reveal-policy="global-projection"'))
  const initial = render(shui, 'playing', false, 0)
  assert(initial.includes('data-stroke-start-gate="u5e28-5-2"'))
  assert(initial.includes('d="'+shui[4][1].revealPath+'"')) // guide refs exist even at p=0
  assert(!initial.includes('d="'+shui[4][1].outline+'"'))
  assert(!initial.includes('d="'+shui[9][0].outline+'"'))
  const prefix = render(shui, 'playing', true, 5)
  assert(prefix.includes('d="'+shui[4][1].outline+'" mask="url(#'))
  assert(!prefix.includes('d="'+shui[9][0].outline+'"'))
  const cheng = render(strokes, 'idle', null, 12)
  assert(cheng.includes('data-stroke-start-gate="u68d6-10-2"'))
  assert(cheng.includes('d="'+strokes[9][1].outline+'" mask="url(#'))
  const unrelated = structuredClone(shui) as MutableStrokes; unrelated[0][0].weight++
  assert(!render(unrelated, 'idle', null, 10).includes('data-stroke-start-gate'))
})

test('immutable reviewed allowlist rejects exposed segment and bounds mutation', () => {
  for (const data of [strokes, shui]) {
    const before = JSON.stringify(data), context = reviewedHanjaRevealContext(data)!
    const indices = context.id === 'u68d6' ? [[9,1]] : [[4,1],[9,0]]
    for (const [pen, mask] of indices) {
      const policy = reviewedHanjaRevealPolicy(context, pen, mask)!
      assert(Object.isFrozen(policy)); assert(Object.isFrozen(policy.segment)); assert(Object.isFrozen(policy.segment.bounds))
      const exposed = policy.segment as HanjaOutlineSegment
      assert.throws(() => { exposed.revealWidth = 15 }, TypeError)
      assert.throws(() => { (exposed.bounds as number[])[0]++ }, TypeError)
      assert.throws(() => { exposed.outline += ' ' }, TypeError)
      assert.strictEqual(reviewedHanjaRevealContext(data), context)
      assert.strictEqual(reviewedHanjaRevealPolicy(context, pen, mask), policy)
      assert.throws(() => reviewedHanjaRevealClip({ ...policy }, data[pen][mask], .5, 30))
    }
    assert.equal(JSON.stringify(data), before)
  }
})


const yu = JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-vq-up-order-u9e8c-source-experiment-2026-10-20/fixtures.json', import.meta.url), 'utf8')).u9e8c.strokes as HanjaOutlineStrokes
const yuL = 43.41614532470703
function yuPolicies() { const context = reviewedHanjaRevealContext(yu)!; return { context, q: reviewedHanjaRevealPolicy(context,8,1)!, growing: reviewedHanjaRevealPolicy(context,10,0)! } }
function fakeGrowing(id = 'test-yu-11') {
  const owner = {}, writes: string[] = [], counts = { length:0, endpoint:0 }, body = yu[10][0]
  const node = (initial: Record<string,string>) => { const attrs = new Map(Object.entries(initial));return { isConnected:true,ownerSVGElement:owner,getAttribute:(key:string)=>attrs.get(key)??null,setAttribute:(key:string,value:string)=>{attrs.set(key,value);writes.push(key+'='+value)},removeAttribute:(key:string)=>{attrs.delete(key)},attrs } }
  const common = { 'data-growing-owner':id }, guide = Object.assign(node({ ...common,id:id+'-growing-guide',d:body.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter' }), {
    getTotalLength(){ counts.length++;return yuL },
    getPointAtLength(d:number){ assert.strictEqual(this,guide);counts.endpoint++;return d <= 11.8 ? {x:61.5,y:30.4+d} : {x:90,y:47.2} },
  })
  const startCap = node(common), endCap = node(common), ink = node({ ...common,mask:'url(#'+id+'-growing)' })
  return { id,guide,startCap,endCap,ink,writes,counts,nodes:{guide,startCap,endCap,ink} as unknown as ReviewedGrowingNodes }
}

test('麌 exact context, immutable masks and single-path same-frame growing parity', async () => {
  const before=JSON.stringify(yu),{context,q,growing}=yuPolicies(),body=yu[10][0]
  assert.equal(createHash('sha256').update(before).digest('hex'),'d697a545504cc475de264b657c28f9b5b857278e4813c4ebf3c96dba2c37464d')
  assert.equal(context.id,'u9e8c');assert.equal(q.id,'u9e8c-9-2');assert.equal(q.kind,'circle-start');assert.equal(growing.id,'u9e8c-11-1');assert.equal(growing.kind,'growing-caps')
  assert.equal(hasReviewedHanjaStartGate(yu),false);assert.equal(reviewedHanjaRevealPolicy({...context},10,0),null)
  for(let p=0;p<yu.length;p++)for(let m=0;m<yu[p].length;m++)if(!(p===8&&m===1)&&!(p===10&&m===0))assert.equal(reviewedHanjaRevealPolicy(context,p,m),null)
  for(const mutate of [(s:MutableStrokes)=>s[0][0].weight++,(s:MutableStrokes)=>s.reverse(),(s:MutableStrokes)=>s[10].reverse(),(s:MutableStrokes)=>s[10][0].revealWidth++,(s:MutableStrokes)=>s[10][0].revealPath+=' ',(s:MutableStrokes)=>s[8][1].bounds[0]++,(s:MutableStrokes)=>s[10][0].extra=true]){const changed=structuredClone(yu) as MutableStrokes;mutate(changed);assert.equal(reviewedHanjaRevealContext(changed),null)}
  for(const policy of[q,growing]){assert(Object.isFrozen(policy));assert(Object.isFrozen(policy.segment));assert(Object.isFrozen(policy.segment.bounds));assert.throws(()=>{(policy.segment as HanjaOutlineSegment).weight++},TypeError);assert.throws(()=>{(policy.segment.bounds as number[])[0]++},TypeError)}
  const isolated=await import(new URL('../docs/hanja-renderer-growing-caps-u9e8c-11-experiment-2026-10-20/render.mjs',import.meta.url).href)
  for(const p of[0,1e-6,7/yuL,11.8/yuL,.95,.9999,1]){const f=fakeGrowing(),frame=measureReviewedGrowingCapsFrame(growing,body,p,f.nodes.guide),ref=isolated.growingCapsState(body,p,yuL,frame.point);assert.equal(f.counts.length,1);assert.equal(f.counts.endpoint,1);assert.equal(frame.progress,p);assert.equal(frame.d,p*yuL);assert.equal(frame.d,ref.d);assert.equal(frame.rho,ref.rho);assert.deepEqual(frame.q0,ref.q0);assert(Object.isFrozen(frame));assert(Object.isFrozen(frame.q0));assert(Object.isFrozen(frame.point));const circle=reviewedHanjaRevealClip(q,yu[8][1],p,36.421756744384766),old=isolated.gateState(yu[8][1],p,36.421756744384766);assert.equal(circle.threshold,old.h)}
  assert.throws(()=>measureReviewedGrowingCapsFrame({...growing},body,.1,fakeGrowing().nodes.guide));assert.throws(()=>measureReviewedGrowingCapsFrame(growing,{...body,revealWidth:15},.1,fakeGrowing().nodes.guide));assert.throws(()=>reviewedHanjaRevealClip(growing,body,.1,yuL));assert.equal(JSON.stringify(yu),before)
})

test('麌 layout commit is atomic, StrictMode-cleanable and no-UA at zero/full', () => {
  const {growing}=yuPolicies(),body=yu[10][0],f=fakeGrowing(),p=.03026250475088331
  const committed=commitReviewedGrowingCaps(growing,body,p,f.id,f.nodes);assert.equal(committed.status,'visible');assert.equal(f.ink.getAttribute('visibility'),'visible');assert.equal(f.guide.getAttribute('stroke-dasharray'),String(p)+' 2');assert.equal(f.endCap.getAttribute('r'),String(p*yuL));assert.equal(f.startCap.getAttribute('r'),String(p*yuL));assert.equal(f.endCap.getAttribute('cy'),String(30.4+p*yuL));assert.equal(f.writes.at(-1),'visibility=visible');assert.deepEqual(f.counts,{length:1,endpoint:1})
  committed.cleanup();committed.cleanup();assert.equal(f.ink.getAttribute('visibility'),'hidden');assert.equal(f.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(f.startCap.getAttribute('r'),'0');assert.equal(f.endCap.getAttribute('r'),'0');assert.equal(f.ink.getAttribute('data-growing-progress'),null)
  const repeated=commitReviewedGrowingCaps(growing,body,p,f.id,f.nodes);assert.equal(repeated.status,'visible');assert.deepEqual(f.counts,{length:2,endpoint:2});repeated.cleanup()
  const noInk={...f.nodes,ink:null};assert.equal(commitReviewedGrowingCaps(growing,body,0,f.id,noInk).status,'empty');assert.equal(commitReviewedGrowingCaps(growing,body,1,f.id,noInk).status,'complete');assert.deepEqual(f.counts,{length:2,endpoint:2})
  const other=fakeGrowing('second-component');assert.equal(commitReviewedGrowingCaps(growing,body,p,other.id,other.nodes).status,'visible');repeated.cleanup();assert.equal(other.ink.getAttribute('visibility'),'visible');assert.equal(f.ink.getAttribute('visibility'),'hidden')
})

test('麌 completion transition isolates the full-round path from prior layout cleanup', () => {
  const {growing}=yuPolicies(),body=yu[10][0],f=fakeGrowing()
  const mid=commitReviewedGrowingCaps(growing,body,.03,f.id,f.nodes)
  const fullGuide=fakeGrowing('full-round-mask').guide,fullInk=fakeGrowing('full-round-ink').ink
  fullGuide.setAttribute('stroke-linecap','round');fullGuide.setAttribute('stroke-dasharray','1 2')
  fullInk.setAttribute('mask','url(#'+f.id+')');fullInk.setAttribute('visibility','visible')
  // React commits completion props before running the old intermediate cleanup.
  mid.cleanup()
  assert.equal(fullGuide.getAttribute('stroke-linecap'),'round');assert.equal(fullGuide.getAttribute('stroke-dasharray'),'1 2');assert.equal(fullInk.getAttribute('visibility'),'visible');assert.equal(fullInk.getAttribute('mask'),'url(#'+f.id+')')
  const complete=commitReviewedGrowingCaps(growing,body,1,f.id,{...f.nodes,ink:null});complete.cleanup()
  assert.equal(complete.status,'complete');assert.equal(fullGuide.getAttribute('stroke-dasharray'),'1 2');assert.equal(fullInk.getAttribute('visibility'),'visible');assert.deepEqual(f.counts,{length:1,endpoint:1})
  const source=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8')
  const ast=ts.createSourceFile('stroke-outlines.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX)
  const keyed=new Map<string,string>();function visit(node:ts.Node){if(ts.isJsxSelfClosingElement(node)&&node.tagName.getText(ast)==='path'){const key=node.attributes.properties.find(p=>ts.isJsxAttribute(p)&&p.name.getText(ast)==='key');if(key&&ts.isJsxAttribute(key)&&key.initializer&&ts.isStringLiteral(key.initializer))keyed.set(key.initializer.text,node.getText(ast))}ts.forEachChild(node,visit)}visit(ast)
  assert(keyed.get('full-round-ink')?.includes('mask={\'url(#\'+clipId+\')\'}'));assert(!keyed.get('full-round-ink')?.includes('ref={ink}'));assert(keyed.get('growing-ink')?.includes('ref={ink}'));assert(keyed.get('growing-ink')?.includes("clipId+'-growing)'"))
})

test('麌 invalid source, UA, frame or reused IDs fail closed without stale ink', () => {
  const {growing,q}=yuPolicies(),body=yu[10][0]
  const cases:((f:ReturnType<typeof fakeGrowing>)=>{p?:number;id?:string;policy?:typeof growing;segment?:HanjaOutlineSegment}|void)[]=[
    ()=>({p:NaN}),()=>({p:Infinity}),()=>({p:-.1}),()=>({p:1.1}),()=>({id:'bad id'}),()=>({policy:q}),()=>({segment:{...body,revealWidth:15}}),
    ...[0,-1,NaN,Infinity,6.9].map(L=>(f:ReturnType<typeof fakeGrowing>)=>{f.guide.getTotalLength=()=>L}),
    f=>{f.guide.isConnected=false},f=>{f.guide.setAttribute('d','wrong')},f=>{f.guide.setAttribute('pathLength','2')},f=>{f.guide.setAttribute('stroke-width','15')},f=>{f.guide.setAttribute('stroke-linecap','round')},f=>{f.guide.setAttribute('stroke-linejoin','round')},
    f=>{f.guide.setAttribute('id','foreign-guide')},f=>{f.startCap.setAttribute('data-growing-owner','foreign')},f=>{f.ink.setAttribute('mask','url(#foreign)')},f=>{f.endCap.ownerSVGElement={}},
    f=>{f.guide.getTotalLength=()=>{throw Error('UA length')}},f=>{f.guide.getPointAtLength=()=>{throw Error('UA point')}},f=>{f.guide.getPointAtLength=()=>({x:NaN,y:1})},f=>{f.guide.getPointAtLength=()=>({x:1,y:Infinity})},f=>{f.guide.getPointAtLength=()=>{f.guide.setAttribute('d','changed during UA');return{x:61.5,y:31}}},
  ]
  for(const change of cases){const f=fakeGrowing();assert.equal(commitReviewedGrowingCaps(growing,body,.03,f.id,f.nodes).status,'visible');const overrides=change(f)||{};const result=commitReviewedGrowingCaps(overrides.policy??growing,overrides.segment??body,overrides.p??.04,overrides.id??f.id,f.nodes);assert.equal(result.status,'hidden');assert.equal(f.ink.getAttribute('visibility'),'hidden');assert.equal(f.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(f.startCap.getAttribute('r'),'0');assert.equal(f.endCap.getAttribute('r'),'0');assert.equal(f.ink.getAttribute('data-growing-progress'),null)}
})

async function renderYuComponent() {
  const source=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),timing=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8')
  const lines=timing.split('\n'),timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>lines.find(l=>l.startsWith(prefix))!).join('\n')).toString('base64')
  let js=ts.transpileModule(source+'\nexport { GrowingCapsOutline }\n',{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
  for(const[from,to]of[['@/lib/hanja-strokes',timingURL],['@/lib/hanja-stroke-outline',new URL('./hanja-stroke-outline.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate',new URL('./hanja-stroke-start-gate.ts',import.meta.url).href],['react/jsx-runtime',import.meta.resolve('react/jsx-runtime')],['react',import.meta.resolve('react')]])js=js.replaceAll('"'+from+'"','"'+to+'"').replaceAll("'"+from+"'","'"+to+"'")
  return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
}

test('麌 actual SSR has deterministic hidden intermediate ink and original full-round completion; old policies retain their branch', async () => {
  const {StrokeOutlines,GrowingCapsOutline}=await renderYuComponent(),{growing}=yuPolicies(),body=yu[10][0]
  const renderChild=(p:number)=>renderToStaticMarkup(createElement('svg',null,createElement(GrowingCapsOutline,{policy:growing,segment:body,progress:p,clipId:'fixed-test'})))
  const zero=renderChild(0);assert(zero.includes('stroke-linecap="butt"'));assert(zero.includes('stroke-linejoin="miter"'));assert(zero.includes('d="'+body.revealPath+'"'));assert(!zero.includes('d="'+body.outline+'"'))
  const mid=renderChild(.03);assert.equal(mid,renderChild(.03));assert(mid.includes('visibility="hidden"'));assert(!mid.includes('data-growing-full-round'));assert(!renderChild(NaN).includes('d="'+body.outline+'"'));assert(!renderChild(Infinity).includes('d="'+body.outline+'"'))
  const full=renderChild(1);assert(full.includes('data-growing-full-round="true"'));assert(full.includes('d="'+body.outline+'" mask="url(#fixed-test)"'));assert(full.includes('stroke-dasharray="1 2"'));assert(!full.includes('visibility="hidden"'))
  const render=(data:HanjaOutlineStrokes,phase:'idle'|'playing'|'done',manual:boolean|null,count:number)=>renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes:data,clock:{current:[]},phase,count,manual})))
  const whole=render(yu,'done',null,18);assert(whole.includes('data-stroke-start-gate="u9e8c-9-2"'));assert(whole.includes('data-stroke-start-gate="u9e8c-11-1"'));assert(whole.includes('data-stroke-reveal-policy="growing-caps"'));assert(whole.includes('d="'+body.outline+'" mask="url(#'));assert(!render(yu,'playing',true,10).includes('d="'+body.outline+'"'));assert(render(yu,'playing',true,11).includes('data-growing-full-round="true"'))
  for(const[data,ids]of[[strokes,['u68d6-10-2']],[shui,['u5e28-5-2','u5e28-10-1']]] as const){const html=render(data,'idle',null,data.length);for(const id of ids)assert(html.includes('data-stroke-start-gate="'+id+'"'));assert(!html.includes('data-stroke-reveal-policy="growing-caps"'));const context=reviewedHanjaRevealContext(data)!;assert.notEqual(context.id,'u9e8c')}
})


import { reviewedQuadraticCapsContext, reviewedQuadraticCapsPolicy, measureReviewedQuadraticCapsFrame, commitReviewedQuadraticCaps, type ReviewedQuadraticCapsPolicy } from './hanja-stroke-start-gate.ts'
const shuFixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-vq-two-q15-up-u7659-source-experiment-2026-10-20/fixtures.json',import.meta.url),'utf8')).u7659
const shu=shuFixture.strokes as HanjaOutlineStrokes
const shuTargets=[[11,1],[14,1],[17,0]] as const
function shuPolicy(i:number) { const [p,m]=shuTargets[i];return reviewedQuadraticCapsPolicy(reviewedQuadraticCapsContext(shu),p,m)! }
function fakeQuadratic(i:number,id='test-shu-'+i) {
  const body=shuPolicy(i).segment,owner={},writes:string[]=[],counts={length:0,endpoint:0},L=40
  const tokens=body.revealPath!.split(' '),n=[tokens[0].slice(1),tokens[1],tokens[2].slice(1),tokens[3],tokens[4],tokens[5]].map(Number)
  const node=(initial:Record<string,string>)=>{const attrs=new Map(Object.entries(initial));return{isConnected:true,ownerSVGElement:owner,getAttribute:(key:string)=>attrs.get(key)??null,setAttribute:(key:string,value:string)=>{attrs.set(key,value);writes.push(key+'='+value)},removeAttribute:(key:string)=>{attrs.delete(key)},attrs}}
  const common={'data-growing-owner':id},guide=Object.assign(node({...common,id:id+'-growing-guide',d:body.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),{
    getTotalLength(){counts.length++;return L},
    getPointAtLength(d:number){assert.strictEqual(this,guide);counts.endpoint++;const t=d/L;return{x:(1-t)**2*n[0]+2*(1-t)*t*n[2]+t*t*n[4],y:(1-t)**2*n[1]+2*(1-t)*t*n[3]+t*t*n[5]}},
  })
  const startCap=node(common),endCap=node(common),ink=node({...common,mask:'url(#'+id+'-growing)'})
  return{id,guide,startCap,endCap,ink,writes,counts,L,nodes:{guide,startCap,endCap,ink} as unknown as ReviewedGrowingNodes}
}
test('癙 independent exact Q certificates and immutable whole allowlist preserve old bytes',()=>{
  assert.equal(createHash('sha256').update(JSON.stringify(shu)).digest('hex'),'70ca22b0b1bcf57f63141c5b4460262054ab51847b1bd4e880aa2657347eee74')
  const context=reviewedQuadraticCapsContext(shu)!;assert.equal(context.id,'u7659');assert.equal(reviewedHanjaRevealContext(shu),null)
  const certs=[[.3,1/1000],[.25,1/2500],[.125,11/1500]]
  for(let p=0;p<shu.length;p++)for(let m=0;m<shu[p].length;m++){const found=reviewedQuadraticCapsPolicy(context,p,m);assert.equal(!!found,shuTargets.some(([a,b])=>a===p&&b===m))}
  for(let i=0;i<3;i++){
    const policy=shuPolicy(i);assert.equal(policy.id,'u7659-'+(shuTargets[i][0]+1)+'-'+(shuTargets[i][1]+1));assert.equal(policy.kind,'growing-q-caps')
    assert.equal(policy.certificate.parameterBound,certs[i][0]);assert.equal(policy.certificate.curvatureBound,certs[i][1]);assert.equal(policy.certificate.exactDecimalRational,true);assert.equal(policy.certificate.notRasterProof,true)
    assert(Object.isFrozen(policy));assert(Object.isFrozen(policy.certificate));assert(Object.isFrozen(policy.segment));assert(Object.isFrozen(policy.segment.bounds))
    assert.throws(()=>{policy.segment.weight++},TypeError);assert.throws(()=>{(policy.segment.bounds as number[])[0]++},TypeError)
    assert.throws(()=>measureReviewedGrowingCapsFrame(policy as unknown as Parameters<typeof measureReviewedGrowingCapsFrame>[0],policy.segment,.1,fakeQuadratic(i).nodes.guide))
    assert.throws(()=>measureReviewedQuadraticCapsFrame({...policy},policy.segment,.1,fakeQuadratic(i).nodes.guide))
    assert.equal(reviewedQuadraticCapsPolicy({...context},...shuTargets[i]),null)
  }
  for(const mutate of[(s:MutableStrokes)=>s[0][0].weight++,(s:MutableStrokes)=>s.reverse(),(s:MutableStrokes)=>s[11].reverse(),(s:MutableStrokes)=>s[14][1].revealPath+=' ',(s:MutableStrokes)=>s[17][0].revealWidth++,(s:MutableStrokes)=>s[11][1].bounds[0]++,(s:MutableStrokes)=>s[1][0].extra=true]){const changed=structuredClone(shu) as MutableStrokes;mutate(changed);assert.equal(reviewedQuadraticCapsContext(changed),null)}
  for(const other of[strokes,shui,yu])assert.equal(reviewedQuadraticCapsContext(other),null)
  const lib=readFileSync(new URL('./hanja-stroke-start-gate.ts',import.meta.url),'utf8')
  assert.equal(createHash('sha256').update(lib.slice(0,33354)).digest('hex'),'7e16cc13ab1326e7c89294e03c838f3504f94a28bed17f22a74df279d0316792')
  const component=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8')
  const oldChildren=component.slice(component.indexOf('/** Mounted even'),component.indexOf('\n/** All UA reads',component.indexOf('function GrowingCapsOutline'))+0)
  // The original two complete child functions are a fixed contiguous substring, before the new Q child.
  assert.equal(createHash('sha256').update(oldChildren).digest('hex'),'f5d886fd79de55dfe29711e4d72a7c484da0e667ca34a5565b91c2a1618fc2f4')
})
test('癙 Q same-frame caps parity and atomic fail-closed layout commits',async()=>{
  const isolated=await import(new URL('../docs/hanja-renderer-growing-caps-u7659-three-q-experiment-2026-10-20/render.mjs',import.meta.url).href)
  for(let i=0;i<3;i++){
    const policy=shuPolicy(i),body=policy.segment
    for(const p of[0,1e-10,.01,7/40,.625,.95,.9999,.99999999,1]){
      const f=fakeQuadratic(i),frame=measureReviewedQuadraticCapsFrame(policy,body,p,f.nodes.guide)
      const ref=i===2?isolated.growingCapsState(body,p,f.L,frame.point):isolated.addedQState(body,p,f.L,frame.point)
      assert.deepEqual(f.counts,{length:1,endpoint:1});assert.equal(frame.progress,p);assert.equal(frame.d,ref.d);assert.equal(frame.rho,ref.rho);assert.deepEqual(frame.q0,ref.q0)
      assert(Object.isFrozen(frame));assert(Object.isFrozen(frame.point));assert(Object.isFrozen(frame.q0))
    }
    const f=fakeQuadratic(i),committed=commitReviewedQuadraticCaps(policy,body,.01,f.id,f.nodes)
    assert.equal(committed.status,'visible');assert.equal(f.writes.at(-1),'visibility=visible');assert.deepEqual(f.counts,{length:1,endpoint:1})
    assert.equal(f.guide.getAttribute('stroke-dasharray'),'.01 2'.replace('.01','0.01'));assert.equal(f.startCap.getAttribute('r'),'0.4');assert.equal(f.endCap.getAttribute('r'),'0.4');assert.equal(f.ink.getAttribute('data-growing-progress'),'0.01')
    committed.cleanup();committed.cleanup();assert.equal(f.ink.getAttribute('visibility'),'hidden');assert.equal(f.startCap.getAttribute('r'),'0');assert.equal(f.ink.getAttribute('data-growing-progress'),null)
    for(const p of[0,1]){const blank={...f.nodes,ink:null};assert.equal(commitReviewedQuadraticCaps(policy,body,p,f.id,blank).status,p===0?'empty':'complete')}
    assert.deepEqual(f.counts,{length:1,endpoint:1})
    const changes:((f:ReturnType<typeof fakeQuadratic>)=>{p?:number;id?:string;policy?:ReviewedQuadraticCapsPolicy;segment?:HanjaOutlineSegment}|void)[]=[
      ()=>({p:NaN}),()=>({p:-.01}),()=>({p:1.01}),()=>({p:Infinity}),()=>({id:'bad id'}),()=>({policy:{...policy}}),()=>({policy:shuPolicy((i+1)%3)}),()=>({segment:{...body,revealWidth:15}}),()=>({segment:{...body,revealPath:body.revealPath+' '}}),
      ...[NaN,Infinity,0,6.9].map(L=>(v:ReturnType<typeof fakeQuadratic>)=>{v.guide.getTotalLength=()=>L}),
      v=>{v.guide.isConnected=false},v=>{v.guide.setAttribute('d','M0 0 Q1 1 2 2')},v=>{v.guide.setAttribute('pathLength','2')},v=>{v.guide.setAttribute('stroke-width','15')},v=>{v.guide.setAttribute('stroke-linecap','round')},v=>{v.guide.setAttribute('stroke-linejoin','round')},
      v=>{v.guide.setAttribute('id','other')},v=>{v.ink.setAttribute('mask','url(#other)')},v=>{v.startCap.setAttribute('data-growing-owner','other')},v=>{v.endCap.ownerSVGElement={}},
      v=>{v.guide.getTotalLength=()=>{throw Error('UA length')}},v=>{v.guide.getPointAtLength=()=>{throw Error('UA endpoint')}},v=>{v.guide.getPointAtLength=()=>({x:NaN,y:0})},
      v=>{v.guide.getPointAtLength=()=>{v.guide.setAttribute('d','changed');return{x:1,y:2}}},
      v=>{v.guide.getPointAtLength=()=>{v.ink.setAttribute('data-growing-owner','changed');return{x:1,y:2}}},
    ]
    for(const change of changes){const v=fakeQuadratic(i);assert.equal(commitReviewedQuadraticCaps(policy,body,.01,v.id,v.nodes).status,'visible');const override=change(v)||{};assert.equal(commitReviewedQuadraticCaps(override.policy??policy,override.segment??body,override.p??.02,override.id??v.id,v.nodes).status,'hidden');assert.equal(v.ink.getAttribute('visibility'),'hidden');assert.equal(v.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(v.startCap.getAttribute('r'),'0');assert.equal(v.endCap.getAttribute('r'),'0');assert.equal(v.ink.getAttribute('data-growing-progress'),null)}
    const original=fakeQuadratic(i),other=fakeQuadratic(i,'other-instance-'+i),a=commitReviewedQuadraticCaps(policy,body,.1,original.id,original.nodes);assert.equal(commitReviewedQuadraticCaps(policy,body,.1,other.id,other.nodes).status,'visible');a.cleanup();assert.equal(other.ink.getAttribute('visibility'),'visible')
  }
})
async function renderShuComponent() {
  const source=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),timing=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8')
  const lines=timing.split('\n'),timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>lines.find(l=>l.startsWith(prefix))!).join('\n')).toString('base64')
  let js=ts.transpileModule(source+'\nexport { QuadraticCapsOutline }\n',{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
  for(const[from,to]of[['@/lib/hanja-strokes',timingURL],['@/lib/hanja-stroke-outline',new URL('./hanja-stroke-outline.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate',new URL('./hanja-stroke-start-gate.ts',import.meta.url).href],['react/jsx-runtime',import.meta.resolve('react/jsx-runtime')],['react',import.meta.resolve('react')]])js=js.replaceAll('"'+from+'"','"'+to+'"').replaceAll("'"+from+"'","'"+to+"'")
  return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
}


test('癙 actual component SSR keeps three exact Q guides mounted, intermediate ink hidden and full-round completion masked',async()=>{
  const{StrokeOutlines,QuadraticCapsOutline}=await renderShuComponent()
  for(let i=0;i<3;i++){
    const policy=shuPolicy(i),body=policy.segment,render=(p:number)=>renderToStaticMarkup(createElement('svg',null,createElement(QuadraticCapsOutline,{policy,segment:body,progress:p,clipId:'shu-'+i})))
    const zero=render(0);assert(zero.includes('stroke-linecap="butt"'));assert(!zero.includes('d="'+body.outline+'"'))
    const mid=render(.03);assert.equal(mid,render(.03));assert(mid.includes('visibility="hidden"'));assert(!mid.includes('data-growing-full-round'))
    for(const p of[NaN,Infinity,-1,1.01])assert(!render(p).includes('d="'+body.outline+'"'))
    const full=render(1);assert(full.includes('data-growing-full-round="true"'));assert(full.includes('d="'+body.outline+'" mask="url(#shu-'+i+')"'));assert(full.includes('stroke-linecap="round"'));assert(full.includes('stroke-dasharray="1 2"'));assert(!full.includes('visibility="hidden"'))
    const f=fakeQuadratic(i),committed=commitReviewedQuadraticCaps(policy,body,.03,f.id,f.nodes),fullInk=fakeQuadratic(i,'full-'+i).ink
    fullInk.setAttribute('mask','url(#'+f.id+')');fullInk.setAttribute('visibility','visible');committed.cleanup();assert.equal(commitReviewedQuadraticCaps(policy,body,1,f.id,{...f.nodes,ink:null}).status,'complete');assert.equal(fullInk.getAttribute('visibility'),'visible');assert.equal(fullInk.getAttribute('mask'),'url(#'+f.id+')')
  }
  const render=(phase:'idle'|'playing'|'done',manual:boolean|null,count:number)=>renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes:shu,clock:{current:[]},phase,count,manual})))
  for(const phase of['idle','done'] as const){const html=render(phase,null,18);assert.equal((html.match(/data-growing-full-round="true"/g)||[]).length,3);for(let i=0;i<3;i++)assert(html.includes('data-stroke-start-gate="'+shuPolicy(i).id+'"'));assert.equal((html.match(/data-stroke-reveal-policy="growing-q-caps"/g)||[]).length,3)}
  const prefix=render('playing',true,16);assert.equal((prefix.match(/data-growing-full-round="true"/g)||[]).length,2);assert(!prefix.includes('d="'+shuPolicy(2).segment.outline+'"'))
  const c=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),child=c.slice(c.indexOf('function QuadraticCapsOutline'))
  assert(child.includes('key="full-round-ink"'));assert(child.includes('key="growing-ink"'));assert(child.includes('return committed.cleanup'))
})


// 荃 전용 신규 검사. 기존 癙/다른 정책의 테스트 본문은 그대로 둔다.
import { reviewedQuanQuadraticCapsContext, reviewedQuanQuadraticCapsPolicy, measureReviewedQuanQuadraticCapsFrame, commitReviewedQuanQuadraticCaps, type ReviewedQuanQuadraticCapsPolicy, type ReviewedQuanGrowingNodes } from './hanja-stroke-start-gate.ts'
import { growingState as quanStandaloneState } from '../docs/hanja-renderer-growing-caps-u8343-vs2-two-q-experiment-2026-10-20/render.mjs'
const quan=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-hq-u8343-vs2-source-experiment-2026-10-20/fixtures.json',import.meta.url),'utf8')).originalOrderBaseline as HanjaOutlineStrokes
const quanClone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v)) as T
const quanIndices=[[4,0],[5,1]] as const
function quanPolicy(i:number){const [pen,mask]=quanIndices[i];return reviewedQuanQuadraticCapsPolicy(reviewedQuanQuadraticCapsContext(quan),pen,mask)!}
function fakeQuan(i:number,id='quan-'+i){
  const policy=quanPolicy(i),segment=policy.segment,q0=i===0?[51,33.5]:[53,33.5],L=i===0?55.10026550292969:46.49167251586914,events:string[]=[]
  const document={defaultView:null as unknown},view={document,getComputedStyle:(n:Element)=>{const x=n as unknown as {cssTransform:string;cssTranslate:string};return{transform:x.cssTransform,getPropertyValue:(key:string)=>key==='translate'?x.cssTranslate:'none'}}};document.defaultView=view
  let owner:SVGSVGElement
  const node=(name:string,attrs:Record<string,string>)=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:document,parentElement:null as unknown,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},getAttribute(key:string){return this.attrs[key]??null},setAttribute(key:string,value:string){this.attrs[key]=value;events.push(name+':'+key+'='+value)},removeAttribute(key:string){delete this.attrs[key]}})
  const svg=node('svg',{});owner=svg as unknown as SVGSVGElement
  const group=node('g',{}),target=node('g',{'data-stroke-start-gate':policy.id}),defs=node('defs',{}),mask=node('mask',{id:id+'-quan-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'})
  group.parentElement=svg;target.parentElement=group;defs.parentElement=target;mask.parentElement=defs
  let pointHook:((d:number)=>{x:number;y:number})|null=null,lengthHook:(()=>void)|null=null,length=L
  let reads=0,pointReads=0
  const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-quan-measurement':'true',id:id+'-quan-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('measure:length');lengthHook?.();return length},getPointAtLength(d:number){pointReads++;events.push('measure:point');return pointHook?pointHook(d):{x:q0[0]+d/L,y:q0[1]+d/L}}})
  const guide=Object.assign(node('path',{'data-growing-owner':id,id:id+'-quan-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),{getTotalLength(){throw Error('dash is not measurement guide')},getPointAtLength(){throw Error('dash is not measurement guide')}})
  const startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('ink',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-quan-growing)',visibility:'hidden'})
  measurement.parentElement=defs;guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
  const nodes={measurement,guide,startCap,endCap,ink} as unknown as ReviewedQuanGrowingNodes
  return{policy,segment,q0,L,id,owner,svg,document,view,group,target,defs,mask,measurement,guide,startCap,endCap,ink,nodes,events,counts:()=>({reads,pointReads}),pointHook:(fn:typeof pointHook)=>{pointHook=fn},lengthHook:(fn:typeof lengthHook)=>{lengthHook=fn},setLength:(n:number)=>{length=n}}
}
test('荃 exact whole and two private certificates preserve every prior policy byte',()=>{
  assert.equal(quan.length,10);assert.equal(quan.flat().length,11)
  const context=reviewedQuanQuadraticCapsContext(quan);assert(context);assert.equal(context.id,'u8343-ue0102')
  assert.equal(reviewedQuanQuadraticCapsPolicy({id:'u8343-ue0102'},4,0),null)
  for(const [i,[pen,mask]]of quanIndices.entries()){
    const p=quanPolicy(i);assert.equal(p.segment,quanPolicy(i).segment);assert.equal(p.kind,'growing-quan-q-caps');assert.equal(p.id,'u8343-ue0102-'+(pen+1)+'-'+(mask+1))
    assert.equal(p.certificate.parameterBound,i===0?.2:.15);assert.equal(p.certificate.curvatureBound,i===0?1/49:1/86);assert.equal(p.certificate.rKBound,i===0?1/7:7/86);assert.equal(p.certificate.initialArcMax,7);assert.equal(p.certificate.exactDecimalRational,true);assert.equal(p.certificate.notRasterProof,true)
    assert(Object.isFrozen(p));assert(Object.isFrozen(p.segment));assert(Object.isFrozen(p.segment.bounds));assert(Object.isFrozen(p.certificate))
    assert.throws(()=>{(p.segment.bounds as number[])[0]+=1});assert.throws(()=>{p.segment.weight+=1})
    for(const key of Object.keys(p.segment)){
      const changed=quanClone(quan),s=changed[pen][mask] as unknown as Record<string,unknown>
      s[key]=key==='bounds'?[0,0,1,1]:key==='weight'?1:key==='revealWidth'?13:String(s[key])+' '
      assert.equal(reviewedQuanQuadraticCapsContext(changed),null)
    }
    const extra=quanClone(quan);Object.assign(extra[pen][mask],{extra:true});assert.equal(reviewedQuanQuadraticCapsContext(extra),null)
    const fake=fakeQuan(i);assert.throws(()=>measureReviewedQuanQuadraticCapsFrame({...p},p.segment,.1,fake.nodes.measurement))
  }
  for(let pen=0;pen<10;pen++)for(let mask=0;mask<quan[pen].length;mask++){
    const changed=quanClone(quan);changed[pen][mask].weight+=.001;assert.equal(reviewedQuanQuadraticCapsContext(changed),null)
    if(!quanIndices.some(([p,m])=>p===pen&&m===mask))assert.equal(reviewedQuanQuadraticCapsPolicy(context,pen,mask),null)
  }
  const source=readFileSync(new URL('./hanja-stroke-start-gate.ts',import.meta.url),'utf8')
  assert.equal(createHash('sha256').update(source.slice(0,51743)).digest('hex'),'5e1eaaf4b99c72854370a499980bf97e9b3001bde8c35a1475149ec52bf40bf8')
  const component=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),oldChild=component.slice(component.indexOf('function QuadraticCapsOutline'),component.indexOf('\n/** 荃만'))
  assert.equal(createHash('sha256').update(oldChild).digest('hex'),'354ee362d6662ee4d9eed7d16d963703b548738e784d17f9049e2ab480216344')
  const testSource=readFileSync(new URL('./hanja-stroke-start-gate.test.ts',import.meta.url),'utf8')
  assert.equal(createHash('sha256').update(testSource.slice(0,39948)).digest('hex'),'b79aea6e0fbc1a259edba29f93e4391119e5c99142a4d708f43d3b972b9fa3c5')
})
test('荃 connected original-path frames and atomic caps fail closed without prior-test reruns',()=>{
  for(let i=0;i<2;i++){
    const f=fakeQuan(i),result=commitReviewedQuanQuadraticCaps(f.policy,f.segment,.03,f.id,f.nodes)
    assert.equal(result.status,'visible');assert(result.frame);assert.deepEqual(f.counts(),{reads:1,pointReads:1});assert.equal(f.events.at(-1),'ink:visibility=visible')
    const expected=quanStandaloneState(f.segment,.03,f.L,[result.frame.point.x,result.frame.point.y])
    assert.equal(result.frame.L,expected.L);assert.equal(result.frame.d,expected.d);assert.equal(result.frame.rho,expected.rho);assert.deepEqual(result.frame.q0,expected.start)
    assert.equal(f.guide.attrs['stroke-dasharray'],'.03 2'.replace('.03','0.03'));assert.equal(f.startCap.attrs.r,String(result.frame.rho));assert.equal(f.endCap.attrs.r,String(result.frame.rho))
    result.cleanup();assert.equal(f.ink.attrs.visibility,'hidden');assert.equal(f.guide.attrs['stroke-dasharray'],'0 2');assert.equal(f.startCap.attrs.r,'0');assert.equal(f.ink.getAttribute('data-growing-length'),null)
    const strict=commitReviewedQuanQuadraticCaps(f.policy,f.segment,.03,f.id,f.nodes);assert.equal(strict.status,'visible');strict.cleanup();strict.cleanup()
    const zero=fakeQuan(i);assert.equal(commitReviewedQuanQuadraticCaps(zero.policy,zero.segment,0,zero.id,zero.nodes).status,'empty');assert.deepEqual(zero.counts(),{reads:0,pointReads:0})
    const full=fakeQuan(i);assert.equal(commitReviewedQuanQuadraticCaps(full.policy,full.segment,1,full.id,full.nodes).status,'complete');assert.deepEqual(full.counts(),{reads:0,pointReads:0})
    const exact=fakeQuan(i);const start=measureReviewedQuanQuadraticCapsFrame(exact.policy,exact.segment,0,exact.nodes.measurement);assert.deepEqual(start.q0,exact.q0);assert.deepEqual(start.point,{x:exact.q0[0],y:exact.q0[1]})
    const mutations:Array<(x:ReturnType<typeof fakeQuan>)=>void>=[
      x=>{x.measurement.isConnected=false},x=>{x.measurement.ownerSVGElement={}as SVGSVGElement},x=>{x.measurement.attrs.pathLength='1'},x=>{x.measurement.attrs.transform='translate(1)'},
      x=>{x.owner.getAttribute=()=> 'scale(2)'},x=>{(x.owner as unknown as {isConnected:boolean}).isConnected=false},x=>{x.measurement.attrs.d+=' '},x=>{x.measurement.attrs.id='wrong'},x=>{x.measurement.attrs['data-quan-measurement']='false'},
      x=>{x.guide.attrs.pathLength='2'},x=>{x.guide.attrs.d+=' '},x=>{x.guide.attrs['stroke-width']='13'},x=>{x.guide.attrs['stroke-linecap']='round'},x=>{x.guide.attrs['stroke-linejoin']='round'},x=>{x.guide.attrs.transform='scale(2)'},
      x=>{x.startCap.attrs['data-growing-owner']='reused'},x=>{x.endCap.ownerSVGElement={}as SVGSVGElement},x=>{x.ink.attrs.mask='url(#wrong)'},x=>{x.setLength(NaN)},x=>{x.setLength(6)},
      x=>{x.pointHook(()=>({x:NaN,y:0}))},x=>{x.pointHook(()=>{x.guide.attrs.d+=' ';return{x:0,y:0}})},x=>{x.lengthHook(()=>{x.measurement.attrs.pathLength='1'})},
    ]
    for(const mutate of mutations){const x=fakeQuan(i);mutate(x);assert.equal(commitReviewedQuanQuadraticCaps(x.policy,x.segment,.03,x.id,x.nodes).status,'hidden');assert.equal(x.ink.attrs.visibility,'hidden');assert.equal(x.startCap.attrs.r,'0');assert.equal(x.guide.attrs['stroke-dasharray'],'0 2')}
    for(const p of[NaN,Infinity,-1,1.01]){const x=fakeQuan(i);assert.equal(commitReviewedQuanQuadraticCaps(x.policy,x.segment,p,x.id,x.nodes).status,'hidden');assert.deepEqual(x.counts(),{reads:0,pointReads:0})}
    const wrongM=fakeQuan(i);wrongM.pointHook(()=>({x:wrongM.q0[0]+.001,y:wrongM.q0[1]}));assert.throws(()=>measureReviewedQuanQuadraticCapsFrame(wrongM.policy,wrongM.segment,0,wrongM.nodes.measurement))
    const badFrame=fakeQuan(i);assert.equal(commitReviewedQuanQuadraticCaps(badFrame.policy,badFrame.segment,.03,'bad id',badFrame.nodes).status,'hidden')
    const clone=fakeQuan(i);assert.equal(commitReviewedQuanQuadraticCaps({...clone.policy},clone.segment,.03,clone.id,clone.nodes).status,'hidden')
    const fullInk=fakeQuan(i,'full-only').ink;fullInk.setAttribute('mask','url(#'+f.id+')');fullInk.setAttribute('visibility','visible');result.cleanup();assert.equal(fullInk.attrs.visibility,'visible');assert.equal(fullInk.attrs.mask,'url(#'+f.id+')')
  }
})
async function renderQuanComponent(){
  const source=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),timing=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8'),lines=timing.split('\n')
  const timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>lines.find(l=>l.startsWith(prefix))!).join('\n')).toString('base64')
  let js=ts.transpileModule(source+'\nexport { QuanQuadraticCapsOutline }\n',{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
  for(const[from,to]of[['@/lib/hanja-strokes',timingURL],['@/lib/hanja-stroke-outline',new URL('./hanja-stroke-outline.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate',new URL('./hanja-stroke-start-gate.ts',import.meta.url).href],['react/jsx-runtime',import.meta.resolve('react/jsx-runtime')],['react',import.meta.resolve('react')]])js=js.replaceAll('"'+from+'"','"'+to+'"').replaceAll("'"+from+"'","'"+to+"'")
  return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
}
test('荃 actual component SSR isolates measurement and full-round keys at zero mid full prefix',async()=>{
  const{StrokeOutlines,QuanQuadraticCapsOutline}=await renderQuanComponent()
  for(let i=0;i<2;i++){
    const policy=quanPolicy(i),segment=policy.segment,render=(p:number)=>renderToStaticMarkup(createElement('svg',null,createElement(QuanQuadraticCapsOutline,{policy,segment,progress:p,clipId:'quan-ssr-'+i})))
    const zero=render(0);assert(!zero.includes('d="'+segment.outline+'"'));const measurement=zero.match(/<path[^>]*data-quan-measurement="true"[^>]*>/)![0];assert(measurement.includes('d="'+segment.revealPath+'"'));assert(!measurement.includes('pathLength'));assert(!measurement.includes('pathLength'.toLowerCase()));assert(!measurement.includes('transform='))
    const mid=render(.03);assert.equal(mid,render(.03));assert(mid.includes('visibility="hidden"'));assert(!mid.includes('data-growing-full-round'))
    for(const p of[NaN,Infinity,-1,1.01])assert(!render(p).includes('d="'+segment.outline+'"'))
    const full=render(1);assert(full.includes('data-growing-full-round="true"'));assert(full.includes('d="'+segment.outline+'" mask="url(#quan-ssr-'+i+')"'));assert(full.includes('stroke-linecap="round"'));assert(full.includes('stroke-linejoin="miter"'));assert(full.includes('stroke-dasharray="1 2"'))
  }
  const render=(phase:'idle'|'playing'|'done',manual:boolean|null,count:number)=>renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes:quan,clock:{current:[]},phase,manual,count})))
  for(const phase of['idle','done']as const){const whole=render(phase,null,10);assert.equal((whole.match(/data-stroke-reveal-policy="growing-quan-q-caps"/g)||[]).length,2);assert.equal((whole.match(/data-growing-full-round="true"/g)||[]).length,2)}
  assert.equal((render('playing',true,5).match(/data-growing-full-round="true"/g)||[]).length,1)
  assert.equal((render('playing',true,6).match(/data-growing-full-round="true"/g)||[]).length,2)
  const source=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),child=source.slice(source.indexOf('function QuanQuadraticCapsOutline'))
  assert(child.includes('key="quan-full-round-ink"'));assert(child.includes('key="quan-growing-ink"'));assert(child.includes('return committed.cleanup'));assert(source.includes('Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN'))
})
test('荃 coordinate binding failed-tail rejects parent document and rendered transforms',()=>{
  let rejected=0
  for(let i=0;i<2;i++){
    const valid=fakeQuan(i),ok=commitReviewedQuanQuadraticCaps(valid.policy,valid.segment,.03,valid.id,valid.nodes)
    assert.equal(ok.status,'visible');assert.deepEqual(valid.counts(),{reads:1,pointReads:1});assert.equal(valid.events.at(-1),'ink:visibility=visible');ok.cleanup()
    const mutations:Array<(x:ReturnType<typeof fakeQuan>)=>void>=[]
    for(const name of['measurement','guide','startCap','endCap','ink','mask','defs','target','group','svg']as const){
      mutations.push(x=>{x[name].attrs.transform='translate(10 0)'},x=>{x[name].cssTransform='matrix(1, 0, 0, 1, 10, 0)'},x=>{x[name].cssTranslate='10px'},x=>{x[name].ownerDocument={}as typeof x.document},x=>{x[name].parentElement={} })
    }
    mutations.push(x=>{x.startCap.parentElement=x.defs},x=>{x.endCap.parentElement=x.target},x=>{x.ink.parentElement=x.group},x=>{x.measurement.parentElement=x.mask},x=>{x.guide.parentElement=x.defs},x=>{x.mask.attrs.maskUnits='objectBoundingBox'},x=>{x.target.attrs['data-stroke-start-gate']='other'},x=>{x.ink.attrs.d+=' '},x=>{x.document.defaultView={document:{}}},x=>{x.view.document={}as typeof x.document})
    for(const phase of['before','length','point']as const)for(const mutate of mutations){
      const x=fakeQuan(i)
      if(phase==='before')mutate(x)
      if(phase==='length')x.lengthHook(()=>mutate(x))
      if(phase==='point')x.pointHook(d=>{mutate(x);return{x:x.q0[0]+d/x.L,y:x.q0[1]+d/x.L}})
      const result=commitReviewedQuanQuadraticCaps(x.policy,x.segment,.03,x.id,x.nodes)
      assert.equal(result.status,'hidden',phase);assert.equal(x.ink.attrs.visibility,'hidden');assert.equal(x.startCap.attrs.r,'0');assert.equal(x.endCap.attrs.r,'0');assert.equal(x.guide.attrs['stroke-dasharray'],'0 2');assert.equal(x.ink.getAttribute('data-growing-length'),null);rejected++
    }
    const post=fakeQuan(i),set=post.endCap.setAttribute
    post.endCap.setAttribute=function(key,value){set.call(this,key,value);if(key==='r'&&value!=='0')post.ink.cssTransform='translateX(10px)'}
    assert.equal(commitReviewedQuanQuadraticCaps(post.policy,post.segment,.03,post.id,post.nodes).status,'hidden');assert.equal(post.ink.attrs.visibility,'hidden');rejected++
    const source=readFileSync(new URL('./hanja-stroke-start-gate.ts',import.meta.url),'utf8')
    assert.equal(createHash('sha256').update(source.slice(0,51743)).digest('hex'),'5e1eaaf4b99c72854370a499980bf97e9b3001bde8c35a1475149ec52bf40bf8')
    assert.equal(createHash('sha256').update(readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url))).digest('hex'),'f729f0db65f84dee49182a104d874fe48b347f05dbaeb0283e1a0777434c1900')
  }
  assert.equal(rejected,362)
})
