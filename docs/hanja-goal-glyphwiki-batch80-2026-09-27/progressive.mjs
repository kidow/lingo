import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4,5],[6],[7]]
const CURVES = {
  "0:0": [
    33.15,
    28,
    28.7,
    72,
    13.57,
    104,
    0,
    7
  ],
  "3:0": [
    16.240000000000002,
    132,
    46.5,
    120,
    87.44,
    104,
    0,
    7
  ],
  "5:0": [
    175.7,
    35,
    174.8,
    154,
    163.74495755427526,
    172.42507074287457,
    22,
    0
  ],
  "5:1": [
    163.74495755427526,
    172.42507074287457,
    158.6,
    181,
    148.6,
    181,
    2,
    14
  ],
  "6:0": [
    136.1,
    35,
    134.3,
    166,
    81.2,
    188,
    132,
    7
  ],
  "7:0": [
    104.6,
    69,
    106.4,
    97,
    90.2,
    117,
    7,
    8
  ]
}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,8)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.every(p=>p.off===0))
    // Separate source polygons are filled independently. Normalize winding before
    // joining SVG subpaths so overlapping source decorations remain a union.
    const normalized=polygons.map(p=>{
      const area=p.reduce((n,v,i)=>{const next=p[(i+1)%p.length];return n+v.x*next.y-next.x*v.y},0)
      assert(area!==0)
      return area<0?[p[0],...p.slice(1).reverse()]:p
    })
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  return sourceGroups.map(indices=>indices.flatMap(index=>{
    assert.deepEqual(trace[index].flatMap(c=>c.polygons),proof.groups[index].polygons)
    return trace[index].flatMap((call,j)=>{
      const a=call.args
      if(call.kind==='cdDrawCurve'){
        assert.deepEqual(a,CURVES[index+':'+j])
        if(index===5&&j===1){
          assert.equal(call.polygons.length,2)
          assert.deepEqual(call.polygons[1].map(p=>[p.x,p.y]),[[148.6,181],[148.6,175],[128.6,175],[128.6,178]])
          return [{...segment(call.polygons.slice(0,1),'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14},segment(call.polygons.slice(1),'left',(148.6-128.6)/2)]
        }
        return [{...segment(call.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}]
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a
      assert(x1===x2||y1===y2)
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}
