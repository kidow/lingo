#!/usr/bin/env python3
"""Exact public original-P subset contact only; no media, engine or compiler."""
import hashlib
import json
from decimal import Decimal
from fractions import Fraction as F
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = 'docs/hanja-remaining-seven-sources-2026-10-17/complete-primary/engine-whole-u9c49-k@18.json'
SOURCE_SHA = '18aaa529c1293d97bca50d877ae8655fc3820d73462852248d206d94bfc4a619'
EXPECTED_AREA = F(2342475591, 181667800)
EXPECTED_POLYGON = [(F(329059,3358),F(648297,16790)),(F(276212,2705),F(113562,2705)),(F(498,5),F(214,5)),(F(191,2),F(204,5))]

def cross(a,b,c):
    return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])

def area2(poly):
    return sum((a[0]*b[1]-b[0]*a[1] for a,b in zip(poly,poly[1:]+poly[:1])), F(0))

def convex(poly):
    assert len(poly)==5 and len(set(poly))==5
    turns=[cross(poly[i],poly[(i+1)%5],poly[(i+2)%5]) for i in range(5)]
    assert all(t>0 for t in turns) or all(t<0 for t in turns), 'strict convex source polygon required'
    return poly if area2(poly)>0 else list(reversed(poly))

def line_intersection(s,e,a,b):
    cs,ce=cross(a,b,s),cross(a,b,e)
    t=cs/(cs-ce)
    return (s[0]+t*(e[0]-s[0]),s[1]+t*(e[1]-s[1]))

def clip(subject,clipper):
    out=subject
    for a,b in zip(clipper,clipper[1:]+clipper[:1]):
        incoming,out=out,[]
        if not incoming:break
        s=incoming[-1]
        for e in incoming:
            si,ei=cross(a,b,s)>=0,cross(a,b,e)>=0
            if ei:
                if not si:out.append(line_intersection(s,e,a,b))
                out.append(e)
            elif si:out.append(line_intersection(s,e,a,b))
            s=e
    return out

def canonical(poly):
    if area2(poly)<0:poly=list(reversed(poly))
    i=min(range(len(poly)),key=lambda j:poly[j])
    return poly[i:]+poly[:i]

def main():
    raw=(ROOT/SOURCE).read_bytes()
    assert hashlib.sha256(raw).hexdigest()==SOURCE_SHA, 'original public full5 changed'
    proof=json.loads(raw,parse_float=Decimal)
    assert sorted(proof)==['defaults','engineHashes','engineRevision','groups','trace']
    assert len(proof['groups'])==len(proof['trace'])==26
    assert sum(len(r) for r in proof['trace'])==27
    assert sum(len(g['polygons']) for g in proof['groups'])==49
    selected=[]
    for index in (2,5):
        g=proof['groups'][index]
        assert g['polygons']==[p for call in proof['trace'][index] for p in call['polygons']]
        poly=g['polygons'][1]
        assert all(set(p)=={'x','y','off'} and p['off']==0 for p in poly)
        selected.append(convex([(F(p['x']),F(p['y'])) for p in poly]))
    intersection=canonical(clip(*selected))
    area=abs(area2(intersection))/2
    assert area==EXPECTED_AREA and area>0
    assert intersection==canonical(EXPECTED_POLYGON), 'ROOT independent exact polygon parity failed'
    result={
        'schema':'hanja-public-original-P-contact-proof/v1',
        'date':'2026-10-26','glyph':'鱉','root':'u9c49-k@18',
        'source':{'path':SOURCE,'sha256':SOURCE_SHA,'schema':'actual-full5-direct','rawRows':26,'drawingCalls':27,'polygons':49},
        'script':{'path':str(Path(__file__).resolve().relative_to(ROOT)),'sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()},
        'coordinateSystem':'original200',
        'method':'exact rational Sutherland-Hodgman clipping of two strict-convex original polygons; exact shoelace area',
        'selection':[{'raw':3,'polygon':2,'vertices':5},{'raw':6,'polygon':2,'vertices':5}],
        'strictConvexBoth':True,
        'intersectionPolygon':[[str(x),str(y)] for x,y in intersection],
        'areaOriginal200':str(area),'positiveArea':True,'rootIndependentCalculationParity':True,
        'scope':'The two selected original-P subsets overlap with positive area. This suffices for public dot-roof contact, not the area of the whole union or a private geometry claim.',
        'limits':{'fullUnionAreaComputed':False,'privateGeometryUsed':False,'AAOrExactPrivateGapCauseDetermined':False,'originalSourceChanged':False,'engine':0,'compiler':0,'projection':0,'server':0,'nativeApproval':False,'runtimeApplied':False}
    }
    print(json.dumps(result,ensure_ascii=False,indent=2))

if __name__=='__main__':main()
