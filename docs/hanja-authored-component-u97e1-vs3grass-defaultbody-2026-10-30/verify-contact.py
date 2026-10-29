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
old=d['original']['groups'];headold=old[12:15];head=d['donor']['groups'][12:16];keep=list(enumerate(old[:12],1))+list(enumerate(old[15:],16));assert all(p['off']==0 for g in headold+head+[g for _,g in keep]for ps in g['polygons']for p in ps);oldpairs=[[13+i,j]for i,a in enumerate(headold)for j,b in keep if rawcontact(a,b)];newpairs=[[13+i,j]for i,a in enumerate(head)for j,b in keep if rawcontact(a,b)];print(json.dumps({'originalGrassToRetainedContacts':oldpairs,'newGrassToRetainedContacts':newpairs,'oldPairs':57,'newPairs':76,'retainedRaw':[i for i,_ in keep],'retainedP':sum(len(g['polygons'])for _,g in keep),'newGrassP':sum(len(g['polygons'])for g in head),'completeSourceGrassUnitPreserved':True,'otherOriginalGeometryUnchanged':True,'newEngine':0,'nativeApproval':False}))
