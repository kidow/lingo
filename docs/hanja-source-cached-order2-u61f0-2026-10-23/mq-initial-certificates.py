#!/usr/bin/env python3
"""Exact glyph-own MQ initial certificates. No engine, renderer, UA or file writes.

Uses the existing Fraction MQ curvature/chord/monotone-axis mechanism. The
three unchanged stored certificates are excluded; this proves ten new MQs.
"""
import hashlib,json,re
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
FIXTURE='docs/hanja-source-cached-order2-u61f0-2026-10-23/fixtures.json'
FIXTURE_SHA='8b6167b4be2b6d8d98803367c1a32fc4ce835c24c6d34e6ee1b4ac046d399be5'
raw=(ROOT/FIXTURE).read_bytes()
assert hashlib.sha256(raw).hexdigest()==FIXTURE_SHA
data=json.loads(raw)['u61f0-order2']
N=r'[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?'
def sub(a,b):return tuple(x-y for x,y in zip(a,b))
def add(a,b):return tuple(x+y for x,y in zip(a,b))
def scale(a,s):return tuple(x*s for x in a)
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def cross(a,b):return a[0]*b[1]-a[1]*b[0]
def q(a,b,c,t):return add(add(scale(a,(1-t)**2),scale(b,2*t*(1-t))),scale(c,t*t))
certificates=[]
for pen in [1,2,4,6,8,9,10,14,15,16]:
    segment=data['strokes'][pen-1][0];path=segment['revealPath']
    assert segment['direction']=='curve' and segment['revealWidth']==14
    assert re.fullmatch('M'+N+' '+N+' Q'+N+' '+N+' '+N+' '+N,path)
    values=[F(x)for x in re.findall(N,path)];a,b,c=[tuple(values[i:i+2])for i in range(0,6,2)]
    u=sub(b,a);v=add(sub(c,scale(b,2)),a);den=dot(v,v);det=cross(u,v)
    chosen=None
    for T in [F(1,4),F(1,3),F(1,2),F(2,3),F(3,4),F(1)]:
        chord=sub(q(a,b,c,T),a)
        axes=[]
        for axis in [0,1]:
            for sign in [1,-1]:
                if min(sign*u[axis],sign*(u[axis]+v[axis]))>0 and sign*chord[axis]>7:axes.append((axis,sign))
        if not axes:continue
        at=max(F(0),min(T,-dot(u,v)/den))if den else F(0)
        lam=dot(add(u,scale(v,at)),add(u,scale(v,at)))
        assert lam>0 and dot(chord,chord)>49
        for K in [F(1,100),F(1,75),F(1,50),F(1,40),F(1,30),F(1,25),F(1,20),F(1,15),F(1,12),F(1,10)]:
            if 4*K*K*lam**3>det**2 and 1-(7*K)**2/2>7*K:
                chosen=(T,K,at,lam,chord,axes[0]);break
        if chosen:break
    assert chosen is not None,('No sufficient stored condition',pen,path)
    T,K,at,lam,chord,(axis,sign)=chosen
    assert lam>0 and 4*K*K*lam**3>det**2
    assert dot(chord,chord)>49 and sign*chord[axis]>7
    assert min(sign*u[axis],sign*(u[axis]+v[axis]))>0
    assert 1-(7*K)**2/2>7*K
    certificates.append({'pen':pen,'mask':1,'syntax':'MQ','initialKind':'single-quadratic','guide':path,'width':14,'weight':segment['weight'],'bounds':segment['bounds'],'T':str(T),'K':str(K),'lambdaMinAt':str(at),'lambdaMin':str(lam),'cross':str(det),'chordSquaredAtT':str(dot(chord,chord)),'monotoneAxis':'xy'[axis],'monotoneSign':sign,'cosLower':str(1-(7*K)**2/2),'radius':7,'initialArcMax':7,'initialSufficientConditions':True,'curvatureBoundStrict':True,'laterGuideOutsideInitialDisk':True,'UAFullOriginalGuideRequired':True,'notRasterProof':True,'notSourcePConnectivityProof':True,'notPreviousMaskConnectivityProof':True,'notFullSweepProof':True})
report={'schema':'hanja-glyph-own-exact-mq-initial-certificates/v1','glyph':'懰','root':'u61f0','fixture':FIXTURE,'fixtureSHA256':FIXTURE_SHA,'mechanism':'Existing exact Fraction MQ: curvature squared bound, first-seven-arc availability, signed monotone axis no-return and tangent inequality. Original long decimal literals preserved.','certificates':certificates,'newMQCertificates':10,'oldCertificateMathReruns':0,'sourceCompiler':0,'engine':0,'projection':0,'UA':0,'renderer':0,'native':0,'fileWrites':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(report,ensure_ascii=False,separators=(',',':')))
