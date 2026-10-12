// Evidence-only candidate; no runtime registration and no native browser approval.
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import {compileProgressive} from './progressive.mjs'
const sha=v=>crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex')
export function compileTerminal15Evidence(trace,proof){
 assert.equal(sha(trace),'0aae76a514b3d90e8da236b0507bbaa1d47be04b44027fa1570f84e789ee6210','Pinned original full trace')
 assert.equal(sha(proof.groups),'4b8fab5694da654bd52e6494b9872699c23d297faf28956b55175996d70cdc22','Pinned original full polygons')
 assert.deepEqual(proof.defaults,{kMage:10,kWidth:5,kMinWidthT:6,kAdjustMageStep:5})
 const compiled=compileProgressive(trace,proof)
 assert.equal(compiled.length,13);assert.equal(compiled.flat().length,13)
 const terminal=trace[11][0]
 assert.equal(terminal.kind,'cdDrawBezier')
 const [x1,y1,sx1,sy1,sx2,sy2,x2,y2,ta1,ta2]=terminal.args
 assert.equal(ta2%100,15);assert(y1<y2)
 const opt1=Math.floor((ta1%10000)/1000),width=proof.defaults.kMinWidthT-opt1/2
 const jump=proof.defaults.kWidth*5
 const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
 const tail=[point(x2,y2-width+1),point(x2+2,y2-width-jump),point(x2,y2-width-jump),point(x2-width,y2-width+1)]
 assert.deepEqual(terminal.polygons.at(-1),tail,'Pinned cdDrawCurveU terminal15 polygon; not Line terminal5')
 function segment(polygons,direction,weight){
  const all=polygons.flat(),xs=all.map(p=>p.x/2),ys=all.map(p=>p.y/2)
  const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
  return {outline:normalized.map(p=>p.map((v,i)=>(i?'L':'M')+(v.x/2)+' '+(v.y/2)).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight}
 }
 assert.equal(compiled[10].length,1)
 const originalBody=compiled[10][0]
 const body={...originalBody,...segment(terminal.polygons.slice(0,-1),'curve',originalBody.weight)}
 assert.equal(body.revealPath,originalBody.revealPath);assert.equal(body.revealWidth,14)
 const tailHeight=(Math.max(...tail.map(p=>p.y))-Math.min(...tail.map(p=>p.y)))/2
 assert.equal(tailHeight,13)
 compiled[10]=[body,segment([tail],'up',tailHeight)]
 assert.equal('revealPath' in compiled[10][1],false,'No invented tail centerline')
 return compiled
}
