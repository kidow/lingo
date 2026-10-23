// New source-terminal proof only. No source engine, projector, DOM or browser.
import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
const sha=x=>createHash('sha256').update(x).digest('hex')
const contexts=[
 {glyph:'籧',root:'u7c67',file:'docs/hanja-source-original-u7c67-2026-10-23/fixtures.json',SHA256:'ac326e4aa2bf4036cc23049bd84b02948e1e9b296ad4498f5fce9e55575e345d',pen:15,mask:1,raw:14},
 {glyph:'蘧',root:'u8627-ue0102',file:'docs/hanja-source-original-u8627-vs2-2026-10-23/fixtures.json',SHA256:'25ee5175bb428fa2673b95b4aa2bf4ade6acc1ea49c9f52625865a5054fdd216',pen:13,mask:1,raw:12},
]
const entries=contexts.map(c=>{const b=fs.readFileSync(c.file);assert.equal(sha(b),c.SHA256);const e=JSON.parse(b)[c.root];assert.equal(e.identity.root,c.root);assert.deepEqual(e.sourceGroups[c.pen-1],[c.raw]);assert.equal(e.fullProof.engineHashes['kagecd.js'],'489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860');return e})
assert.notDeepEqual(entries[0].identity,entries[1].identity)
const calls=entries[0].fullProof.trace[14],other=entries[1].fullProof.trace[12]
assert.deepEqual(calls,other)
assert.equal(calls.length,2);assert(calls.every(c=>c.kind==='cdDrawCurve'))
assert.deepEqual(calls[0].args.slice(4,6),calls[1].args.slice(0,2))
assert.equal(calls[1].args[7],14)
const rawTerminal=calls[1].polygons.at(-1)
assert.deepEqual(rawTerminal,[{x:127,y:168.6,off:0},{x:127,y:162.6,off:0},{x:107,y:162.6,off:0},{x:107,y:165.6,off:0}])
const segment=entries[0].strokes[14][0]
assert.deepEqual(segment,entries[1].strokes[12][0])
assert.equal(sha(JSON.stringify(segment)),'7f9f40de3c5cf414783ac4837a6dfac8f5653bb5aaade158322c4248fbd9afe7')
assert.equal(segment.weight,31.053594)
const pieces=segment.outline.match(/M[^Z]+Z/g);assert.equal(pieces.length,4)
const body=calls.flatMap(c=>c.polygons).slice(0,-1),lastBody=body.at(-1)
assert.equal(body.length,3)
// Body edge and terminal right edge share exactly this original positive edge.
assert(lastBody.some((v,i)=>{const w=lastBody[(i+1)%lastBody.length];return v.x===127&&w.x===127&&Math.min(v.y,w.y)<=162.6&&Math.max(v.y,w.y)>=168.6}))
const endpoint=segment.revealPath.match(/-?\d+(?:\.\d+)?/g).map(Number).slice(-2)
assert.deepEqual(endpoint,[63.5,84.325]);assert.equal(segment.revealWidth,14)
const rightX=127/2,leftX=107/2,bottom=162.6/2,topRight=168.6/2,topLeft=165.6/2
assert.deepEqual([rightX,leftX,bottom,topRight,topLeft],[63.5,53.5,81.3,84.3,82.8])
assert.equal(rightX-leftX,10)
assert(Math.max(Math.abs(endpoint[1]-bottom),Math.abs(endpoint[1]-topRight))<7)
// Exact tenths integer arithmetic: trapezoid area 45/2; positive shared edge3.
const twiceAreaTenths=(1270-1070)*((1686-1626)+(1656-1626))
assert.equal(twiceAreaTenths,18000)
const result={schema:'hanja-original-left-terminal-source-proof/v1',contexts:contexts.map((c,i)=>({...c,identity:entries[i].identity})),sourceEngine:{file:'kagecd.js',SHA256:entries[0].fullProof.engineHashes['kagecd.js'],function:'cdDrawCurveU',branch:'a2 == 14',rule:'jump to left, allways go left',newEngineExecution:0},originalCalls:calls,originalSegment:segment,bodyOutline:pieces.slice(0,-1).join(' '),terminalOutline:pieces.at(-1),rawTerminal,bodyOriginalPolygons:3,terminalOriginalPolygons:1,originalPUnionUnchanged:true,sourceSharedEdge:{x:'127/2',y:['813/10','843/10'],length:'3'},terminal:{left:'107/2',right:'127/2',bottom:'813/10',topLeft:'414/5',topRight:'843/10',area:'45/2',width:'10'},clipFamily:{threshold:'127/2 - 10*t',tRange:[0,1],prefixArea:'30*t - (15/2)*t*t',positiveDerivativeLowerBound:'15',convexPrefixesConnectedToOriginalBodyEdge:true,newInk:false,newSourceContour:false},proposedInternalClock:{bodyWeightNumerator:31053594,terminalExtentWeightNumerator:10000000,bodyShareExact:['15526797','20526797'],originalOuterMaskWeight:segment.weight,originalOuterWeightUnchanged:true,newDisplayMicroclock:true,officialTimingApproval:false},proofComputations:1,exactWholeBindings:2,independentWholeGuardsRequired:true,needsBodyResidualNativeCheck:true,needsTailBoundaryNativeCheck:true,needsActualUADOMCheck:true,nativeApproval:false,runtimeApplied:false,registered:false,server:0}
console.log(JSON.stringify(result))
