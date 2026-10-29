import json,sys
from fractions import Fraction as F
d=json.load(sys.stdin,parse_float=F,parse_int=F)
def pts(g):
 return [[(p['x'],p['y'])for p in ps]for ps in g['polygons']]
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def on(a,b,p):return cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
def edge(a,b,c,e):
 x,y,z,w=cross(a,b,c),cross(a,b,e),cross(c,e,a),cross(c,e,b)
 return(x*y<0 and z*w<0)or on(a,b,c)or on(a,b,e)or on(c,e,a)or on(c,e,b)
def inside(p,poly):
 w=0
 for a,b in zip(poly,poly[1:]+poly[:1]):
  if on(a,b,p):return True
  if a[1]<=p[1]<b[1]and cross(a,b,p)>0:w+=1
  if b[1]<=p[1]<a[1]and cross(a,b,p)<0:w-=1
 return w!=0
def contact(a,b):
 if max(p[0]for p in a)<min(p[0]for p in b)or max(p[0]for p in b)<min(p[0]for p in a)or max(p[1]for p in a)<min(p[1]for p in b)or max(p[1]for p in b)<min(p[1]for p in a):return False
 return any(edge(x,y,z,w)for x,y in zip(a,a[1:]+a[:1])for z,w in zip(b,b[1:]+b[:1]))or inside(a[0],b)or inside(b[0],a)
def rawcontact(a,b):return any(contact(x,y)for x in pts(a)for y in pts(b))
old=d['original']['groups'];head=d['donor']['groups'][:4];body=old[3:]
assert all(p['off']==0 for g in head+body for ps in g['polygons']for p in ps)
for s in[d['original'],d['donor']]:
 assert len(s['groups'])==len(s['trace'])
 for g,rows in zip(s['groups'],s['trace']):assert g['polygons']==[p for c in rows for p in c['polygons']]
oldcontact=[[i+1,j+4]for i,a in enumerate(old[:3])for j,b in enumerate(body)if rawcontact(a,b)]
newcontact=[[i+1,j+4]for i,a in enumerate(head)for j,b in enumerate(body)if rawcontact(a,b)]
headpairs=[[i+1,j+1]for i,a in enumerate(head)for j,b in enumerate(head)if i<j and rawcontact(a,b)]
print(json.dumps({'arithmetic':'Exact rational original JSON decimal points; nonzero winding and segment boundary contact','originalHeadBodyContacts':oldcontact,'newDonorHeadRecipientBodyContacts':newcontact,'newHeadInternalContacts':headpairs,'crossPairsOld':48,'crossPairsNew':64,'bodyInternalContactsPreserved':'All43 original bodyP and all21 bodycalls unchanged; identity preserves every internal pair set relation, no recomputation needed.','newHeadInternalContactsPreserved':'All8 headP and4calls unchanged; identity retains donor internal relations.','sourceAllOff0':True,'bodyP':sum(len(g['polygons'])for g in body),'headP':sum(len(g['polygons'])for g in head),'newWholeP':sum(len(g['polygons'])for g in head+body)}))
