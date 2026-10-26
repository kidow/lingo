#!/usr/bin/env python3
"""Source-only 籧18 conditions. Reuse one exact audit function, never old target runs."""
import ast
import hashlib
import json
import re
from fractions import Fraction as F
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
PINS={
 'docs/hanja-source-original-u7c67-2026-10-23/fixtures.json':'ac326e4aa2bf4036cc23049bd84b02948e1e9b296ad4498f5fce9e55575e345d',
 'lib/hanja-stroke-start-caps-u7c67.ts':'ef6fd7a0a8f9df01f682f594cfc8098a755d2a88a9ee0f0b4d2f67640ed64c01',
 'docs/hanja-original-left-terminal-qb-preparation-2026-10-23/future96-u7c67/native-hold.json':'c9d52718223aafc36bff11a9099aa62cfc69f3265cff388ab22a0a97897fa2d3',
 'docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py':'95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396'}

def cross(a,b,p):return (b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
def enc(x):
 if isinstance(x,F):return str(x)
 if isinstance(x,(list,tuple)):return [enc(y) for y in x]
 if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
 return x

def simple(poly):
 for i,(a,b) in enumerate(zip(poly,poly[1:]+poly[:1])):
  for j,(c,d) in enumerate(zip(poly,poly[1:]+poly[:1])):
   if j<=i or j==i+1 or (i==0 and j==len(poly)-1):continue
   u,v=cross(a,b,c),cross(a,b,d);w,z=cross(c,d,a),cross(c,d,b)
   if u*v<0 and w*z<0:return False
   for p,x,y in [(c,a,b),(d,a,b),(a,c,d),(b,c,d)]:
    if cross(x,y,p)==0 and min(x[0],y[0])<=p[0]<=max(x[0],y[0]) and min(x[1],y[1])<=p[1]<=max(x[1],y[1]):return False
 return True

def main():
 for p,h in PINS.items():assert hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==h,p
 fixture=json.loads((ROOT/'docs/hanja-source-original-u7c67-2026-10-23/fixtures.json').read_text())['u7c67']
 segment=fixture['strokes'][17][0]
 assert fixture['sourceGroups'][17]==[17] and len(fixture['strokes'][17])==1
 assert hashlib.sha256(json.dumps(segment,separators=(',',':'),ensure_ascii=False).encode()).hexdigest()=='424037413381ed1fbfc5f57c4144d68033f7668528370594ecac5ed9633c9515'
 method=ROOT/'docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py'
 tree=ast.parse(method.read_text());definition=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='audit')
 source=ast.get_source_segment(method.read_text(),definition)
 # Expose its already-computed boundary solely for cycle/simple/anchor verification.
 needle="return{'raw':raw"
 assert source.count(needle)==1
 source=source.replace(needle,"return{'exteriorBoundary':sorted(boundary),'originalP':P,'raw':raw",1)
 namespace={'F':F,'f':fixture['fullProof']}
 exec(compile(source,str(method)+'::audit-only','exec'),namespace)
 result=namespace['audit'](18)
 edges=result.pop('exteriorBoundary');originalP=result.pop('originalP')
 outlineP=[]
 for part in segment['outline'].split('Z'):
  nums=re.findall(r'-?[0-9]+(?:\.[0-9]+)?',part)
  if nums:outlineP.append([(F(nums[i]),F(nums[i+1])) for i in range(0,len(nums),2)])
 def cycleKey(poly):
  rotations=[tuple(seq[i:]+seq[:i]) for seq in [poly,list(reversed(poly))] for i in range(len(seq))]
  return min(rotations)
 assert [cycleKey(p) for p in outlineP]==[cycleKey(p) for p in originalP] and all(simple(p) for p in originalP)
 assert result['regularBoundaryGraph'] and len(edges)==27
 successor=dict(edges);assert len(successor)==len(edges)
 remaining=set(successor);cycles=[]
 while remaining:
  first=min(remaining);v=first;cycle=[]
  while v in remaining:remaining.remove(v);cycle.append(v);v=successor[v]
  assert v==first
  cycles.append(cycle)
 assert len(cycles)==1 and simple(cycles[0])
 assert result['strictUnionKernelPositiveArea'] and result['kernelArea']==F('7106377259327/22859933376000')
 assert not result['Q0InsideOriginalUnion'] and not result['Q0OnOriginalUnionBoundary']
 A=(F('86.8'),F(61));Q=(F('86.5'),F('59.575'));K=result['kernelVertices']
 km=min(cross(a,b,A)/(abs(b[0]-a[0])+abs(b[1]-a[1])) for a,b in zip(K,K[1:]+K[:1]))
 margin=min(cross(a,b,A)/(abs(b[0]-a[0])+abs(b[1]-a[1])) for a,b in edges)
 delta=min(km,margin)/2
 assert km==F('71/1700') and margin>0 and delta>0
 for x in [A[0]-delta,A[0]+delta]:
  for y in [A[1]-delta,A[1]+delta]:assert all(cross(a,b,(x,y))>0 for a,b in edges)
 distance2=sum((A[i]-Q[i])**2 for i in [0,1]);assert distance2==F('3393/1600') and distance2<49
 # Entire strict head box stays within the original start disk using an exact L1 upper bound.
 diskBound=(abs(A[0]-Q[0])+delta)**2+(abs(A[1]-Q[1])+delta)**2
 assert diskBound<49
 xmin,ymin,xmax,ymax=map(lambda v:F(str(v)),segment['bounds'])
 extents=[A[0]-xmin,xmax-A[0],A[1]-ymin,ymax-A[1]];assert all(v>0 for v in extents)
 assert extents==[F('15.5'),F('1.2'),F('3.6'),F('6.8')]
 result.update({'closedExteriorCycles':1,'originalSubpathsSimple':True,'unionExteriorSimple':True})
 out={
  'schema':'hanja-source-initial-kernel-conditions/v1','date':'2026-10-26','glyph':'籧','root':'u7c67','pen':18,'mask':1,'sourceRaw':18,
  'inputSHA256':PINS,'sourceSegmentSHA256':'424037413381ed1fbfc5f57c4144d68033f7668528370594ecac5ed9633c9515',
  'script':{'path':str(Path(__file__).resolve().relative_to(ROOT)),'sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()},
  'existingNative':{'reusedWithoutReplay':True,'future96Pass':40,'future96Hold':1,'failure':'18m1 at .03: small dot and separate lower-right fragment','terminal15PassPreserved':True},
  'originalSegment':segment,'existingCapCertificate':{'T':'2/3','K':'1/50','unchanged':True,'doesNotCertifyAllVisibleOriginalPIntersectionsConnected':True},
  'exactOriginalUnionAudit':result,
  'candidateConditions':{'authorAnchor':A,'originalQ0':Q,'anchorEqualsOriginalQ0':False,'originalExteriorStrictLInfinityMargin':margin,'strictHeadBoxHalfWidth':delta,'headBoxInsideOriginalUnionAndKernel':True,'distanceSquaredToQ0':distance2,'wholeHeadBoxStartDiskSquaredUpperBound':diskBound,'insideOriginalStartDiskRadius':7,'sourceBounds':[xmin,ymin,xmax,ymax],'pointRectExtents':extents,'p0Hidden':True,'p1WholeOriginalPDirectRequired':True,'nestedRect':True,'initialDiameterSquaredUpperBoundCoefficient':(xmax-xmin)**2+(ymax-ymin)**2},
  'connectionArgument':['The exact original nonzero union has one regular simple exterior cycle and a strict visibility-kernel anchor A.','For each p>0 the proposed rectangle is convex, contains A in its interior, and is nested in p. Every point of originalP intersect rectangle connects to A by its segment inside both sets.','The strict head box around A lies in originalP and in its kernel. A scaled positive box lies in every p>0 rectangle, yielding positive initial ink. Strict kernel visibility excludes detached point-only new pieces for this simple union.','Rectangle diameter is p times the original bounds diagonal, so newly visible ink diameter tends to zero. At p1 the original P must be direct, with no outline edits.'],
  'limits':{'candidateOnly':True,'sameQClockClaimed':False,'authorStartDiffersFromQ0':True,'existingCapsPolicyAutomaticallyReusable':False,'causeOfOldNativeFailureFullyProved':False,'nativeApproved':False,'UAOrAAVerified':False,'newModuleWritten':False,'sourcePOrQOrWidthOrWeightChanged':False,'old40OrTerminal15Replayed':False,'engine':0,'projection':0,'server':0,'sharedFilesChanged':False,'registered':False}
 }
 print(json.dumps(enc(out),ensure_ascii=False,indent=2))

if __name__=='__main__':main()
