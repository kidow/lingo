from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re
R=Path(__file__).resolve().parents[2]
FIXTURE='docs/hanja-source-original-u995b-local-2026-10-27/fixtures-draft.json'
PATH='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py'
AXIS='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py'
COMPARABLE='docs/hanja-source-pen10-u83f0-k-assessment-2026-10-23/verify-connected-prefix.py'
PINS={FIXTURE:'43c5479209823cc8d6a908098a56cb3ff18eb2d273f4e274c9011f821a4319b0',PATH:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',AXIS:'db903056c1375705fd8133ee79dcc3ff5450c519012a3f249881af9abebdbd29',COMPARABLE:'ef879963066f92ea24db0b26fa7fb003a2c80479b660c536f272415295a0f1b6'}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
fixture=json.loads((R/FIXTURE).read_text())['u995b']
ns={'F':F,'re':re}
for path,names in [(PATH,{'polygons','cross','state'}),(AXIS,{'section','merge','intersection'})]:
    source=(R/path).read_text()
    for function in ast.parse(source).body:
        if isinstance(function,ast.FunctionDef) and function.name in names:exec(compile(ast.get_source_segment(source,function),path+'::pure-function-only','exec'),ns)
polygons,cross,state,section,merge,intersection=[ns[k] for k in ('polygons','cross','state','section','merge','intersection')]
P=[p for mask in fixture['strokes'][21] for p in polygons(mask['outline'])]
edges=[(a,b) for p in P for a,b in zip(p,p[1:]+p[:1]) if a!=b]
events={p[0] for poly in P for p in poly}
for i,(a,b) in enumerate(edges):
    for c,d in edges[i+1:]:
        point=intersection(a,b,c,d)
        if point is not None:events.add(point[0])
events=sorted(events)

def signed_area(p):return sum(a[0]*b[1]-a[1]*b[0] for a,b in zip(p,p[1:]+p[:1]))/2 if p else F(0)
def line(e,x):
    a,b=e;assert a[0]!=b[0]
    return a[1]+(x-a[0])*(b[1]-a[1])/(b[0]-a[0])
def yintervals(x):
    intervals=[]
    for p in P:
        hits=sorted([(line(e,x),e) for e in zip(p,p[1:]+p[:1]) if min(e[0][0],e[1][0])<x<max(e[0][0],e[1][0])],key=lambda v:v[0])
        assert len(hits)%2==0
        intervals.extend((hits[i],hits[i+1]) for i in range(0,len(hits),2))
    out=[]
    for low,high in sorted(intervals,key=lambda v:v[0][0]):
        if out and low[0]<=out[-1][1][0]:
            if high[0]>out[-1][1][0]:out[-1]=(out[-1][0],high)
        else:out.append((low,high))
    return out

cells=[]
for low,high in zip(events,events[1:]):
    for bottom,top in yintervals((low+high)/2):
        poly=[(low,line(bottom[1],low)),(high,line(bottom[1],high)),(high,line(top[1],high)),(low,line(top[1],low))]
        poly=[v for i,v in enumerate(poly) if v!=poly[i-1]]
        assert signed_area(poly)>0
        assert all(cross(a,b,c)>=0 for a,b in zip(poly,poly[1:]+poly[:1]) for c in poly)
        cells.append({'low':low,'high':high,'P':poly})

def clip(poly,cut):
    out=[]
    for a,b in zip(poly,poly[1:]+poly[:1]):
        if a[0]>=cut:out.append(a)
        if (a[0]<cut<b[0]) or (b[0]<cut<a[0]):
            t=(cut-a[0])/(b[0]-a[0]);out.append((cut,a[1]+t*(b[1]-a[1])))
    return [v for i,v in enumerate(out) if v!=out[i-1]]

def on(v,a,b):return cross(a,b,v)==0 and min(a[0],b[0])<=v[0]<=max(a[0],b[0]) and min(a[1],b[1])<=v[1]<=max(a[1],b[1])
def contact(a,b):
    points=set()
    for p,q in zip(a,a[1:]+a[:1]):
        for r,s in zip(b,b[1:]+b[:1]):
            if cross(p,q,r)==cross(p,q,s)==0:
                common={v for v in (p,q,r,s) if on(v,p,q) and on(v,r,s)}
                if len(common)>=2:return 'positive-edge'
                points.update(common)
            else:
                v=intersection(p,q,r,s)
                if v is not None:points.add(v)
    return 'point' if points else None

def components(polys,positive_edge_only):
    parents=list(range(len(polys)))
    def find(i):
        while parents[i]!=i:parents[i]=parents[parents[i]];i=parents[i]
        return i
    for i,a in enumerate(polys):
        for j,b in enumerate(polys[i+1:],i+1):
            kind=contact(a,b)
            if kind and (not positive_edge_only or kind=='positive-edge'):parents[find(i)]=find(j)
    groups={}
    for i in range(len(polys)):groups.setdefault(find(i),[]).append(i)
    return list(groups.values())

def uncovered(source,covered):
    result=[]
    for a,b in source:
        if a==b:
            if not any(c<=a<=d for c,d in covered):result.append((a,b))
            continue
        cuts=sorted({a,b}|{v for c,d in covered for v in (c,d) if a<v<b})
        for l,h in zip(cuts,cuts[1:]):
            if not any(c<=(l+h)/2<=d for c,d in covered):result.append((l,h))
    return result

checks=[]
for kind,cut in [('event',x) for x in events]+[('open-slab',(a+b)/2) for a,b in zip(events,events[1:])]:
    active=[clip(c['P'],cut) for c in cells if c['high']>cut]
    assert all(signed_area(p)>0 for p in active)
    edgeGroups=components(active,True);closedGroups=components(active,False)
    allAtCut=merge([v for p in P for v in section(p,0,cut)])
    activeAtCut=merge([v for p in active for v in section(p,0,cut)])
    isolated=uncovered(allAtCut,activeAtCut)
    initial=cut==events[-1]
    checks.append({'kind':kind,'cut':cut,'positiveCells':len(active),'area':sum(signed_area(p) for p in active),'closedComponents':len(closedGroups),'positiveSharedEdgeComponents':len(edgeGroups),'componentCellCounts':[len(g) for g in edgeGroups],'isolatedCutIntervals':isolated,'initialZeroPolicyRequired':initial,'positiveAreaPrefixConnected':bool(active) and len(edgeGroups)==1,'onlyIsolatedInitialSection':initial and not active})
noninitial=[v for v in checks if not v['initialZeroPolicyRequired']]
failures=[v for v in noninitial if not v['positiveAreaPrefixConnected'] or v['isolatedCutIntervals']]

def encode(v):
    if isinstance(v,F):return str(v)
    if isinstance(v,dict):return {k:encode(x) for k,x in v.items()}
    if isinstance(v,(tuple,list)):return [encode(x) for x in v]
    return v
near_zero={'originalRightBound':events[-1],'originalLeftBound':events[0],'sourceYBounds':[min(y for p in P for x,y in p),max(y for p in P for x,y in p)],'firstCutExtremalSourceSections':merge([v for p in P for v in section(p,0,events[-1])]),'areaUpperBoundCoefficient':(events[-1]-events[0])*(max(y for p in P for x,y in p)-min(y for p in P for x,y in p)),'inequality':'Area(prefix(p)) <= sourceBBoxHeight*(right-left)*p ->0 as p->0+','everyPositiveCutIsOriginalRightHalfPlaneOnly':True,'addedCapOrNewConnector':False}
out={'schema':'hanja-local-u995b-pen22-connected-right-prefix/v1','glyph':'饛','pen':22,'inputs':PINS,'axis':'x','direction':'decreasing','sourcePolygons':len(P),'eventCount':len(events),'slabCellCount':len(cells),'checks':checks,'nearZero':near_zero,'failureCount':len(failures),'firstFailures':failures[:4],'allPositivePrefixesEdgeConnectedWithNoIsolatedCutInk':not failures,'initialEmptyExplicitRequired':True,'completedAxisProofReexecuted':False,'comparablePen10ProofExecuted':False,'POrQOrWidthOrWeightChanged':False,'sourceMacroProvidedByROOT':'DL from upper-right cap to lower-left end','sourceMacroCompatible':False,'sourceDirectionApproved':False,'sourceMicroClockApproved':False,'candidateNativeApproved':False,'runtimeApplied':False,'engine':0,'server':0,'method':['Exact source-P union slab cells use original edges and all vertex/intersection events.','Each slab cell is convex; prefix clipping is exact and does not reconnect concave source polygons artificially.','All clipped positive-area cells are checked for positive-edge and weaker closed-point contact components separately.','At a cut event, source line intervals not in any positive-area cell closure are retained as isolated cut ink, not silently discarded.','Topology is fixed between events because slab edge order/contact incidence changes only at the enumerated exact events.','Zero-progress empty is an explicit authored policy; no claim is made that the closed extremal source section is empty.'],'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
print(json.dumps(encode(out),indent=2))
