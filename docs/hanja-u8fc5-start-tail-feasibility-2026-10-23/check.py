#!/usr/bin/env python3
"""Exact, source-pinned feasibility only. No renderer, compiler, engine, or file writes."""
import argparse, hashlib, json, re
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
FIXTURE='docs/hanja-source-independent-qb-u8fc5-vs2-source-experiment-2026-10-19/fixtures.json'
EXPECTED='6d61dce090101293999a78f83fba373d5b93d77dc53ab14e4e8a76c0e4f2598f'
raw=(ROOT/FIXTURE).read_bytes()
assert hashlib.sha256(raw).hexdigest()==EXPECTED
DATA=json.loads(raw)['u8fc5-ue0102']
N=r'[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?'
def nums(s): return [F(v) for v in re.findall(N,s)]
def add(a,b): return tuple(x+y for x,y in zip(a,b))
def sub(a,b): return tuple(x-y for x,y in zip(a,b))
def scale(a,s): return tuple(x*s for x in a)
def dot(a,b): return sum(x*y for x,y in zip(a,b))
def cross(a,b): return a[0]*b[1]-a[1]*b[0]
def q(a,b,c,t): return add(add(scale(a,(1-t)**2),scale(b,2*t*(1-t))),scale(c,t*t))
def bez(a,b,c,d,t): return add(add(scale(a,(1-t)**3),scale(b,3*t*(1-t)**2)),add(scale(c,3*t*t*(1-t)),scale(d,t**3)))
def points(poly): return [(F(str(v['x']))/2,F(str(v['y']))/2) for v in poly]
def area2(p): return sum(cross(p[i],p[(i+1)%len(p)])for i in range(len(p)))
def strict_inside_convex(poly,p):
    values=[cross(sub(poly[(i+1)%len(poly)],poly[i]),sub(p,poly[i]))for i in range(len(poly))]
    return all(v>0 for v in values) or all(v<0 for v in values)
def convex(poly):
    vals=[cross(sub(poly[(i+1)%len(poly)],poly[i]),sub(poly[(i+2)%len(poly)],poly[(i+1)%len(poly)]))for i in range(len(poly))]
    return all(v>0 for v in vals) or all(v<0 for v in vals)
def no_interior_overlap(a,b):
    for p in [a,b]:
        for i in range(len(p)):
            e=sub(p[(i+1)%len(p)],p[i]); n=(-e[1],e[0])
            aa=[dot(v,n)for v in a];bb=[dot(v,n)for v in b]
            if max(aa)<=min(bb) or max(bb)<=min(aa):return True
    return False
def starts():
    out=[]
    for pen,grammar in [(1,'MLQ'),(6,'MLL')]:
        m=DATA['strokes'][pen-1][0];s=m['revealPath'];v=nums(s);a=tuple(v[:2]);b=tuple(v[2:4])
        assert s.startswith('M') and ' L' in s
        first2=dot(sub(b,a),sub(b,a)); assert first2>49 and m['revealWidth']==14
        out.append({'pen':pen,'mask':1,'grammar':grammar,'firstLineLengthSquared':str(first2),'initialCurvature':0,'initialSevenArcAvailable':True})
    T=F(1,2);K=F(1,20)
    for pen in [2,3,4,5,7]:
        m=DATA['strokes'][pen-1][0];s=m['revealPath'];assert re.fullmatch('M'+N+' '+N+' Q'+N+' '+N+' '+N+' '+N,s)
        v=nums(s);a,b,c=[tuple(v[i:i+2])for i in range(0,6,2)];u=sub(b,a);vv=add(sub(c,scale(b,2)),a)
        den=dot(vv,vv); t=max(F(0),min(T,-dot(u,vv)/den)) if den else F(0)
        lam=dot(add(u,scale(vv,t)),add(u,scale(vv,t))); det=cross(u,vv)
        chord=sub(q(a,b,c,T),a);axis=1 if pen==3 else 0
        assert lam>0 and 4*K*K*lam**3>det**2 and dot(chord,chord)>49
        assert min(u[axis],u[axis]+vv[axis])>0 and chord[axis]>7
        assert 1-(7*K)**2/2>7*K
        out.append({'pen':pen,'mask':1,'grammar':'MQ','T':str(T),'K':str(K),'lambda':str(lam),'cross':str(det),'chordSquared':str(dot(chord,chord)),'monotoneAxis':'xy'[axis],'initialSevenArcAvailable':True})
    m=DATA['strokes'][6][1];s=m['revealPath'];assert re.fullmatch('M'+N+' '+N+' C'+N+' '+N+' '+N+' '+N+' '+N+' '+N,s)
    v=nums(s);a,b,c,d=[tuple(v[i:i+2])for i in range(0,8,2)];u=sub(b,a);vv=sub(c,b);w=sub(d,c)
    A=scale(u,3);B=scale(sub(vv,u),6);C=scale(add(sub(w,scale(vv,2)),u),3);T=F(1,4);K=F(3,35)
    derivative=lambda t:add(add(A,scale(B,t)),scale(C,t*t))
    assert A[0]>0 and B[0]>=0 and C[0]>=0 and derivative(T)[1]>0 and B[1]<0 and C[1]<0
    lam=A[0]**2+derivative(T)[1]**2
    z0=cross(A,B);z1=2*cross(A,C);z2=cross(B,C)
    value=z0+z1*T+z2*T*T
    assert z0<0 and value<0 and z1<0 and z1+2*z2*T<0
    bound=-value;chord=sub(bez(a,b,c,d,T),a)
    assert K*K*lam**3>bound**2 and dot(chord,chord)>49 and 1-(7*K)**2/2>7*K
    assert all(vv[0]>0 for vv in [u,vv,w]) and B[1]<0 and B[1]+2*C[1]<0 and d[1]>=bez(a,b,c,d,T)[1]
    out.append({'pen':7,'mask':2,'grammar':'MC-cubic','T':str(T),'K':str(K),'speedSquaredLowerBound':str(lam),'crossUpperBound':str(bound),'chordSquared':str(dot(chord,chord)),'initialSevenArcAvailable':True})
    assert len(out)==8
    return {'targets':out,'scope':'initial regularity/curvature and seven-arc availability only; not P intersection, same-pen contact, raster or native approval'}
def tail():
    proof=DATA['fullProof'];call=proof['trace'][1][0]
    assert call['kind']=='cdDrawCurve' and call['args']==[151,31,147,158,178,161,22,15]
    polys=[points(poly)for poly in proof['groups'][1]['polygons']]
    assert list(map(len,polys))==[22,5,5,4]
    body,startcap,endcap,up=polys
    assert up==[(F(89),F(78)),(F(90),F(65)),(F(89),F(65)),(F(86),F(78))] and convex(up)
    witness=(F(179,2),F(66));assert strict_inside_convex(up,witness)
    guide=nums(DATA['strokes'][0][0]['revealPath']);h0=tuple(guide[:2]);a,b,c=[tuple(guide[i:i+2])for i in range(2,8,2)]
    T=F(3,4);qx=max(a[0],q(a,b,c,T)[0]);qy=q(a,b,c,T)[1]
    assert a[0]-2*b[0]+c[0]>0 and min(b[1]-a[1],c[1]-b[1])>0
    assert witness[0]-qx>7 and qy-witness[1]>7 and witness[1]-h0[1]>7
    cells=[]
    for i in range(10):
        cell=[body[i],body[i+1],body[-2-i],body[-1-i]]
        assert convex(cell)
        anchor=q(a,b,c,F(2*i+1,20));radius2=max(dot(sub(v,anchor),sub(v,anchor))for v in cell)
        assert radius2<49,(i,str(radius2))
        cells.append(cell)
    assert sum(abs(area2(v))for v in cells)==abs(area2(body))
    assert all(no_interior_overlap(cells[i],cells[j])for i in range(10)for j in range(i+1,10))
    assert all(dot(sub(v,a),sub(v,a))<49 for v in startcap)
    assert all(dot(sub(v,c),sub(v,c))<49 for v in endcap)
    H=points(proof['groups'][0]['polygons'][0]);assert convex(H) and all(v[1]>=F(29,2)and v[1]<=F(33,2)for v in H)
    seed=(F(74),F(16));assert strict_inside_convex(H,seed)and strict_inside_convex(cells[0],seed)and strict_inside_convex(startcap,seed)
    assert set([body[10],body[11]])<=set(endcap)
    triangle=[body[9],body[10],body[11]]
    assert convex(cells[9])and all(v in cells[9]for v in triangle)
    for y in [F(623,8),F(78)]:
        assert strict_inside_convex(triangle,(F(177,2),y))
    for y in [F(623,8),F(78)-F(1,1000000)]:
        assert strict_inside_convex(up,(F(177,2),y))
    return {'originalFlag':15,'originalUPPolygonVertices':[[str(x),str(y)]for x,y in up],'uncoveredInteriorWitness':[str(v)for v in witness],'QFirstIntervalXBound':str(qx),'QSecondIntervalYBound':str(qy),'bodyOriginalPolygons':4,'tailOriginalPolygons':1,'bodyQCells':10,'bodyQCellCoverage':'strict radius7 disks centered on original Q','bodyCellsExactAreaAndNonoverlap':True,'tailPrefix':'original UP quad intersect y>=78-13p, x within original bounds','allPositiveTailPrefixesConnectedToCompletedBody':'take x=88.5,y=78-min(13p/2,1/8); strict intersection with original final body cell','newGeometry':0,'displayClockApproved':False,'nativeApproval':False}
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--part',choices=['all','starts','tail'],default='all');args=parser.parse_args();result={}
    if args.part in ['all','starts']:result['starts']=starts();print(json.dumps({'starts':result['starts']},ensure_ascii=False))
    if args.part in ['all','tail']:result['tail']=tail();print(json.dumps({'tail':result['tail']},ensure_ascii=False))
