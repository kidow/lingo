from pathlib import Path
from fractions import Fraction as F
import json,hashlib,re
R=Path(__file__).resolve().parents[2]
D=Path(__file__).resolve().parent
b=(D/'fixtures.json').read_bytes();assert hashlib.sha256(b).hexdigest()=='882029a46c26f5b7be94defc8f95315f17c147243e5ff1650afe33cee3a32919'
f=json.loads(b)['hkcs_m705d']
b=(D/'static-contact-risk-proof.json').read_bytes();assert hashlib.sha256(b).hexdigest()=='6d3064af59e18df648cac96857683cf176774b91f7499c652b0995775d94619a'
h=json.loads(b)['hook'];seg=f['strokes'][12][1]
assert seg['revealWidth']==14 and seg['direction']=='curve'
m=re.fullmatch(r'M([^ ]+) ([^ ]+) Q([^ ]+) ([^ ]+) ([^ ]+) ([^ ]+)',seg['revealPath']);assert m
q=list(map(F,m.groups()[:2]));box=[[F(x)for x in p]for p in h['commonBox']]
d=[sum((p[i]-q[i])**2 for i in range(2))for p in box];assert max(d)<49
print(json.dumps({'glyph':'灝','pen':13,'mask':2,'sourceRoot':'hkcs_m705d','fixtureSHA256':hashlib.sha256((D/'fixtures.json').read_bytes()).hexdigest(),'priorContactProofSHA256':hashlib.sha256(b).hexdigest(),'Q0':list(map(str,q)),'radius':'7','cornerDistanceSquared':list(map(str,d)),'minRadiusSquaredMargin':str(49-max(d)),'allCommonBoxInsideInitialDisk':True,'wholePrefixConnectedProved':False,'actualPriorBindingStillRequired':True,'sourceGeometryChanged':False,'sourceEngineReplay':0,'sourceProjection':0,'nativeApproval':False,'runtimeApplied':False},ensure_ascii=False))
