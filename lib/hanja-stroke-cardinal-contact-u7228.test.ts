import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {spawnSync} from 'node:child_process'
import {makeReviewedU7228CardinalSourceContext,reviewedU7228CardinalPolicy,sampleReviewedU7228CardinalFrame,verifyReviewedU7228CardinalPrior,REVIEWED_U7228_CARDINAL_SOURCE} from './hanja-stroke-cardinal-contact-u7228.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u7228-vs0-2026-10-25/fixtures.json',import.meta.url),'utf8')).u7228_ue0100
test('爨 original H-to-V bands select only two exact masks and preserve empty/full endpoints',()=>{
 const ctx=makeReviewedU7228CardinalSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(ctx)
 for(let p=0;p<30;p++)for(let m=0;m<f.strokes[p].length;m++){const policy=reviewedU7228CardinalPolicy(ctx,p,m);assert.equal(!!policy,m===1&&[5,8].includes(p));if(!policy)continue
  const s=f.strokes[p][m],raw=f.fullProof.groups[f.sourceGroups[p][m]].raw;assert.deepEqual(policy.segment,s);assert.equal(policy.origin,raw[4]/2);assert.equal(policy.originY,policy.origin)
  assert.equal(sampleReviewedU7228CardinalFrame(policy,s,0,0).visible,false)
  const full=sampleReviewedU7228CardinalFrame(policy,s,1,1);assert.equal(full.originalPDirect,true);assert.equal(full.clip,null)
  for(const x of [Number.EPSILON,1e-15,.000001,.01,.03,.5,.99]){const a=sampleReviewedU7228CardinalFrame(policy,s,x,1);assert(a.clip);assert(a.clip.height>0);assert.equal(a.clip.y,policy.origin-policy.negativeExtent*x);assert(a.clip.y<=policy.origin);assert(a.clip.y+a.clip.height>=policy.origin)}
  assert.throws(()=>sampleReviewedU7228CardinalFrame(policy,s,.01,.999));assert.throws(()=>sampleReviewedU7228CardinalFrame({...policy},s,.01,1));assert.throws(()=>sampleReviewedU7228CardinalFrame(policy,{...s,weight:s.weight+1},.01,1))
 }
 assert.equal(makeReviewedU7228CardinalSourceContext({...f.fullProof,header:'synthetic'},f.identity,f.strokes),null)
 assert.equal(REVIEWED_U7228_CARDINAL_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U7228_CARDINAL_SOURCE.newGuideAdded,false)
})
test('爨 bands require adjacent sole direct original H in the same untransformed opaque SVG',()=>{
 const ctx=makeReviewedU7228CardinalSourceContext(f.fullProof,f.identity,f.strokes)
 for(const pen of[6,9]){const policy=reviewedU7228CardinalPolicy(ctx,pen-1,1)!;const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:()=> 'none'},doc={defaultView:{document:null as unknown,getComputedStyle:()=>style}};doc.defaultView.document=doc
  const node=(localName:string,a:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerDocument:doc,ownerSVGElement:null as unknown,parentElement:null as unknown,children:[] as unknown[],previousElementSibling:null as unknown,nextElementSibling:null as unknown,getAttribute:(k:string)=>a[k]??null,setAttribute:(k:string,v:string)=>{a[k]=v},removeAttribute:(k:string)=>{delete a[k]}})
  const owner=node('svg'),parent=node('g',{'data-outline-stroke':String(pen)}),prev=node('path',{d:policy.predecessor.outline}),g=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':policy.kind});for(const n of[parent,prev,g])n.ownerSVGElement=owner
  parent.parentElement=owner;owner.children=[parent];prev.parentElement=parent;g.parentElement=parent;parent.children=[prev,g];prev.nextElementSibling=g;g.previousElementSibling=prev
  assert.equal(verifyReviewedU7228CardinalPrior(policy,g as unknown as Element,1),true);assert.equal(verifyReviewedU7228CardinalPrior(policy,g as unknown as Element,.999),false)
  prev.setAttribute('mask','url(#foreign)');assert.equal(verifyReviewedU7228CardinalPrior(policy,g as unknown as Element,1),false);prev.removeAttribute('mask')
  style.opacity='.5';assert.equal(verifyReviewedU7228CardinalPrior(policy,g as unknown as Element,1),false);style.opacity='1'
  prev.setAttribute('d',policy.predecessor.outline+' ');assert.equal(verifyReviewedU7228CardinalPrior(policy,g as unknown as Element,1),false)
 }
})
test('爨 exact raw-guide origins and original contact rectangles certify both new bands',()=>{
 const code=String.raw`
from pathlib import Path
from fractions import Fraction as F
import json,re,hashlib
b=Path.cwd();p=json.loads((b/'docs/hanja-source-original-u7228-vs0-2026-10-25/cardinal-contact-proof.json').read_text());f=json.loads((b/p['fixture']).read_text())['u7228_ue0100'];facts=json.loads((b/p['sourceFacts']).read_text())
assert hashlib.sha256((b/p['fixture']).read_bytes()).hexdigest()==p['fixtureSHA256'] and hashlib.sha256((b/p['sourceFacts']).read_bytes()).hexdigest()==p['sourceFactsSHA256']
def polygon(s):
 n=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',s.split(' Z')[0])));return [tuple(n[i:i+2])for i in range(0,len(n),2)]
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
for c in p['targets']:
 pen=c['pen'];a,s=f['strokes'][pen-1];raw=f['fullProof']['groups'][c['rawIndex0']]['raw'];priorraw=f['fullProof']['groups'][c['rawIndex0']-1]['raw'];origin=F(str(raw[4]))/2;assert raw[4]==priorraw[4] and origin==F(c['sourceGuideStartY'])
 top,bottom=F(str(s['bounds'][1])),F(str(s['bounds'][3]));assert origin-top==F(c['negativeExtent'])>0 and bottom-origin==F(c['positiveExtent'])>0
 left,right=map(F,c['actualPriorContactX']);end=origin+F(c['priorPositiveHeadroom']);assert right-left==F(c['contactWidth'])>0 and end==F(str(a['bounds'][3]))>origin
 rectangle=[(left,origin),(right,origin),(right,end),(left,end)]
 for poly in [polygon(a['outline']),polygon(s['outline'])]:
  assert all(cross(poly[i],poly[(i+1)%4],poly[(i+2)%4])>0 for i in range(4))
  assert all(all(cross(aa,bb,q)>=0 for aa,bb in zip(poly,poly[1:]+poly[:1]))for q in rectangle)
 row=next(r for r in facts['cardinalMasks']if r['pen']==pen and r['mask']==2);assert row['singlePositiveFrontierAllInterior'] and hashlib.sha256(json.dumps(row,separators=(',',':'),ensure_ascii=False).encode()).hexdigest()==c['singlePositiveFrontierCertificate']['rowSHA256']
assert len(p['targets'])==2 and not p['nativeApproval'] and not p['newGuideAdded']
print('새 2band 원guide·양수 접촉직사각형·기존단면인증 참조 PASS')
`
 const r=spawnSync('python3',['-c',code],{cwd:new URL('..',import.meta.url),encoding:'utf8',timeout:30000});assert.equal(r.status,0,r.stdout+r.stderr)
})
