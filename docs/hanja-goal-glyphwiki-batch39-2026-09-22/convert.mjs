import assert from 'node:assert/strict'
const point=p=>p.map(v=>Math.round(v*1e6)/1e6).join(' ')
// Scope: this whole-glyph record only. General KAGE stretching is not enabled.
export function expandMan(source){
  assert.equal(source.root,'u8513-k')
  function visit(name,ancestors=[]){
    assert(!ancestors.includes(name)&&ancestors.length<16,'Cyclic or deep reference')
    const record=source.records[name];assert(record,'Missing source record')
    const result=[]
    for(const[index,row]of record.data.split('$').entries()){
      const f=row.split(':'),type=Number(f[0])
      if(type===99){
        assert([8,11].includes(f.length))
        const values=f.slice(0,7).map(Number);assert(values.every(Number.isFinite))
        const[,sx,sy,x0,y0,x1,y1]=values
        assert(x1>x0&&y1>y0)
        let child=visit(f[7],[...ancestors,name])
        if(sx!==0||sy!==0){
          assert.equal(name,'u8513-k');assert.equal(index,0)
          assert.equal(row,'99:200:-60:0:4:200:139:ufa5e-03:0:0:-60',
            'Only the reviewed equal-pivot reference is admitted')
          const points=child.flatMap(p=>p.points)
          const bounds=[0,1].map(axis=>[
            Math.min(200,...points.map(p=>p[axis])),
            Math.max(0,...points.map(p=>p[axis])),
          ])
          // The declared source and destination pivots coincide. Preserve
          // the renderer arithmetic and floor: simplifying to identity would
          // incorrectly leave the left grass vertical at64 instead of63.
          const normalize=(v,axis)=>{
            const pivot=axis===0?100:40
            const[low,high]=v<pivot?[bounds[axis][0],pivot]:[pivot,bounds[axis][1]]
            assert(high>low)
            return Math.floor((v-low)/(high-low)*(high-low)+low)
          }
          child=child.map(p=>({...p,points:p.points.map(v=>v.map(normalize))}))
        }else{
          assert(f.length===8||f.slice(8).every(v=>Number(v)===0),'Unreviewed reference parameters')
        }
        result.push(...child.map(p=>({...p,points:p.points.map(([x,y])=>[
          x0+x*(x1-x0)/200,y0+y*(y1-y0)/200,
        ])})))
        continue
      }
      assert(type===1||type===2,'Unreviewed primitive')
      const n=f.map(Number);assert(n.every(Number.isFinite)&&n.every(Number.isInteger))
      assert.equal(f.length,type===1?7:9)
      const[,head,tail]=n
      const points=[]
      for(let i=3;i<n.length;i+=2)points.push([n[i],n[i+1]])
      if(type===1){
        const flat=points[0][1]===points[1][1]&&points[0][0]<points[1][0]
        const down=points[0][0]===points[1][0]&&points[0][1]<points[1][1]
        assert((head===0&&tail===0)||((head===2&&tail===2)||(head===0&&tail===2))&&flat
          ||((head===12&&tail===13)||(head===22&&tail===23)||(head===32&&tail===32))&&down,
          'Unreviewed line caps or direction')
      }else{
        assert((head===22&&tail===7)||(head===7&&tail===0),'Unreviewed curve caps')
        assert(points[0][1]<points[1][1]&&points[1][1]<points[2][1])
        if(head===22)assert(points[0][0]>points[1][0]&&points[1][0]>points[2][0])
        else assert(points[0][0]<points[1][0]&&points[1][0]<points[2][0])
      }
      result.push({type,head,tail,source:name,sourceRow:index+1,points})
    }
    return result
  }
  return visit(source.root)
}
export function buildManPaths(source,groups,order){
  const raw=expandMan(source)
  assert.deepEqual(groups.flat().slice().sort((a,b)=>a-b),raw.map((_,i)=>i+1))
  assert.deepEqual(order.slice().sort((a,b)=>a-b),groups.map((_,i)=>i+1))
  const paths=groups.map(group=>{
    assert(group.length===1||group.length===2)
    const[a,b]=group.map(i=>raw[i-1])
    const normalized=a.points.map(p=>p.map(v=>v/2))
    let path='M '+point(normalized[0])+(a.type===1?' L ':' Q ')+normalized.slice(1).map(point).join(' ')
    if(b){
      assert.equal(group[1],group[0]+1)
      assert.equal(a.source,b.source);assert.equal(b.sourceRow,a.sourceRow+1)
      assert.deepEqual(a.points[1],b.points[0],'Source corner endpoints must be exact')
      assert(a.type===1)
      assert((a.head===2&&a.tail===2&&b.type===1&&b.head===22&&b.tail===23)
        ||(a.head===0&&a.tail===2&&b.type===2&&b.head===22&&b.tail===7),
        'Only reviewed source-declared corners')
      path+=(b.type===1?' L ':' Q ')+b.points.slice(1).map(p=>point(p.map(v=>v/2))).join(' ')
    }else assert(a.head!==22&&!(a.type===1&&a.tail===2&&a.head===0),'Unpaired source corner')
    return path
  })
  return order.map(i=>paths[i-1])
}
