import assert from 'node:assert/strict'
import { expandKage } from '../hanja-goal-glyphwiki-batch26-2026-09-22/convert.mjs'
const point=p=>p.map(v=>Math.round(v*1e6)/1e6).join(' ')
export function boxPaths(source,groups,order,{allowCurves=false,allowConnectedVerticals=false}={}){
  const raw=expandKage(source,{allowConnectionLines:true,allowBoxLines:true,allowReviewedCurves:allowCurves})
  assert(raw.every(p=>p.type===1||(allowCurves&&p.type===2)),
    'Only reviewed straight box lines and opted-in quadratics are admitted')
  assert.deepEqual(groups.flat().slice().sort((a,b)=>a-b),raw.map((_,i)=>i+1))
  assert.deepEqual(order.slice().sort((a,b)=>a-b),groups.map((_,i)=>i+1))
  const paths=groups.map(group=>{
    assert(group.length===1||group.length===2)
    const[a,b]=group.map(i=>raw[i-1])
    if(a.type===2){
      assert(allowCurves&&!b,'Curve grouping is not admitted here')
      assert((a.head===7&&a.tail===8)||(a.head===0&&a.tail===7),'Unreviewed curve caps')
      return 'M '+point(a.points[0])+' Q '+a.points.slice(1).map(point).join(' ')
    }
    let path='M '+point(a.points[0])+' L '+point(a.points[1])
    if(b){
      assert(b.type===1,'Box corner must remain straight')
      assert.equal(group[1],group[0]+1,'Corner must be adjacent')
      assert(a.head===2&&a.tail===2&&b.head===22&&b.tail===23,'Unreviewed box corner codes')
      assert.equal(a.source,b.source)
      assert.equal(b.sourceRow,a.sourceRow+1)
      assert.deepEqual(a.points[1],b.points[0],'Exact corner endpoint required')
      assert(a.points[0][1]===a.points[1][1]&&a.points[0][0]<a.points[1][0])
      assert(b.points[0][0]===b.points[1][0]&&b.points[0][1]<b.points[1][1])
      path+=' L '+point(b.points[1])
    }else{
      assert(a.head!==22,'Unpaired right-upper corner')
      assert((a.head===0&&a.tail===0)||(a.head===12&&a.tail===13)
        ||(a.head===2&&a.tail===2)||(allowCurves&&a.head===0&&a.tail===32)
        ||(allowConnectedVerticals&&a.head===32&&(a.tail===0||a.tail===32)),
        'Unreviewed standalone box line')
      if(a.head===2)assert(a.points[0][0]<a.points[1][0],'Horizontal direction must be rightward')
      if(a.head===32||a.tail===32)assert(a.points[0][1]<a.points[1][1],'Connected vertical must be downward')
    }
    return path
  })
  return order.map(i=>paths[i-1])
}
