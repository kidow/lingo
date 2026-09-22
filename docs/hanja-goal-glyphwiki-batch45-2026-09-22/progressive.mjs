import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'

// Original outer enclosure primitives remain one dictionary stroke.
export const sourceGroups = [[0],[1],[3],[2],[4],[5,6],[7]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,8)
  const segment = (polygons,direction,weight) => {
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.every(p=>p.off===0))
    return {
      outline:polygons.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),
      bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],
      direction,weight:Math.round(weight*1e6)/1e6,
    }
  }
  return sourceGroups.map(indices=>indices.flatMap(index=>{
    const calls=trace[index]
    assert.deepEqual(calls.flatMap(c=>c.polygons),proof.groups[index].polygons)
    return calls.flatMap((call,callIndex)=>{
      const a=call.args
      if(call.kind==='cdDrawCurve'){
        const expected = index===4
          ? [67.46587500000001,61.34505,53.97375,98.71095,20.693174999999997,130.32825,0,7]
          : callIndex===0
            ? [167.3076,83.620875,168.20707499999997,162.664125,152.51701623307443,175.68073799937682,22,0]
            : [152.51701623307443,175.68073799937682,144.820725,182.06565,134.820725,182.06565,2,14]
        assert(index===4||index===6)
        assert.deepEqual(a,expected)
        const hook=index===6&&callIndex===1
        assert.equal(call.polygons.length,index===4?3:2)
        if(hook)assert.deepEqual(call.polygons[1].map(p=>[p.x,p.y]),[[134.8,182],[134.8,176],[114.8,176],[114.8,179]])
        const curve={...segment(hook?call.polygons.slice(0,1):call.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),
          revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
        return hook?[curve,segment(call.polygons.slice(1),'left',10)]:[curve]
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a;assert(x1===x2||y1===y2)
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}
