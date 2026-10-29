#!/usr/bin/env python3
# Static-only complete original Hans 倉10 + unchanged original 瑲 玉4.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
from urllib.parse import parse_qs
from fractions import Fraction
import argparse,copy,hashlib,html,importlib.util,json,math,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent;CONFIG=HERE/'config.json';NS='{http://www.w3.org/2000/svg}'
ET.register_namespace('',NS[1:-1])
def sha(x):return hashlib.sha256(x).hexdigest()
def require(v,m):
 if not v:raise ValueError(m)
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--config-sha',required=True);ap.add_argument('--check-only',action='store_true');ap.add_argument('--port',type=int,default=0);a=ap.parse_args();raw=CONFIG.read_bytes();require(sha(raw)==a.config_sha,'config pin');c=json.loads(raw)
 def guards():
  require(sha(CONFIG.read_bytes())==a.config_sha and sha(Path(__file__).read_bytes())==c['adapter']['SHA256'],'config/adapter pin')
  for p,h in c['inputSHA256'].items():require(sha((ROOT/p).read_bytes())==h,'fixed source changed: '+p)
  require(sha((ROOT/c['sharedServe']['path']).read_bytes())==c['sharedServe']['SHA256'],'shared RAM static helper pin')
 guards();f=json.loads((HERE/'fixture-static-draft.json').read_text());recipe=json.loads((HERE/'recipe.json').read_text());src=json.loads((ROOT/recipe['sourceRefs']['recipient']['path']).read_text());donor=json.loads((ROOT/recipe['sourceRefs']['donor']['path']).read_text())
 require(f['retainedRecipientGroups']==src['groups'][:4] and f['retainedRecipientTrace']==src['trace'][:4] and f['recipientEmptyRaw5']==src['groups'][4],'original 玉 groups/trace identity')
 require(len(f['donorParts'])==len(donor['filledPaths'])==len(donor['guides'])==10,'complete source 倉10')
 require(recipe['retainedRecipientRawOneBased']==[1,2,3,4] and [m['rawOneBased']for m in f['logicalMappingHypothesis'][:4]]==[1,3,2,4],'clock-role hypothesis only')
 require(f['approval']=={'native':False,'mapping':False,'temporal':False,'runtimeApplied':False},'unapproved static draft')
 matrix=recipe['authorChoice']['matrix200'];exact=recipe['authorChoice']['matrixExact200'];require(len(matrix)==len(exact)==6 and all(math.isfinite(x)for x in matrix) and matrix==[float(Fraction(x))for x in exact] and matrix[0]>0 and matrix[3]>0 and matrix[1]==matrix[2]==0,'single positive source affine')
 for i,p in enumerate(f['donorParts']):require(p['originalD']==donor['filledPaths'][i]['originalD'] and p['originalGuideD']==donor['guides'][i]['originalD'] and p['matrix200']==matrix and p['matrixExact200']==exact,'original full D/guide same single affine')
 require(donor['guides'][2]['originalD']=='M482 261L557 328','whole donor original third DR guide')
 spec=importlib.util.spec_from_file_location('cang_public_static',ROOT/c['sharedServe']['path']);shared=importlib.util.module_from_spec(spec);spec.loader.exec_module(shared);shared.CONFIG=c;shared.ROOT=ROOT;source=shared.source_svg(src)
 def authored(pens=None):
  take=set(range(1,15)if pens is None else pens);root=ET.Element(NS+'svg',{'viewBox':'0 0 200 200','width':'520','height':'520','data-explicit-mixed-author':'true'});g=ET.SubElement(root,NS+'g',{'fill':'#222'});old=ET.fromstring(source)
  for mapping in f['logicalMappingHypothesis'][:4]:
   if mapping['logical']in take:
    for n in old[0]:
     if int(n.get('data-original-raw'))==mapping['rawOneBased']:
      before=ET.tostring(n);clone=copy.deepcopy(n);require(ET.tostring(clone)==before,'original 玉 SVG unchanged');g.append(clone)
  if any(p in take for p in range(5,15)):
   placed=ET.SubElement(g,NS+'g',{'transform':'matrix('+ ' '.join(str(x)for x in matrix)+')','data-complete-original-donor':'AnimCJK-Hans-倉10'})
   for i,p in enumerate(f['donorParts'],5):
    if i in take:ET.SubElement(placed,NS+'path',{'d':p['originalD'],'data-original-donor-stroke':str(i-4)})
  return ET.tostring(root,encoding='unicode')
 def donor_svg():
  root=ET.Element(NS+'svg',{'viewBox':'0 0 1024 1024','width':'520','height':'520'});g=ET.SubElement(root,NS+'g',{'fill':'#222'})
  for p in donor['filledPaths']:ET.SubElement(g,NS+'path',{'d':p['originalD']})
  return ET.tostring(root,encoding='unicode')
 def selection(route,query):
  if route in('/','/whole'):require(not query,'query forbidden');return None
  require(route=='/stroke','closed route');q=parse_qs(query,keep_blank_values=True);require(set(q)=={'pen','view'}and all(len(v)==1 for v in q.values()),'exact selection keys');p=q['pen'][0];v=q['view'][0];require(p.isdecimal()and str(int(p))==p and 1<=int(p)<=14 and v in('current','prefix'),'fourteen explicit static selections');return int(p),v
 def page(route,s,ignored,domestic):
  if s:
   p,v=s;pre=v=='prefix';panels=[('국내 원형 '+str(p)+' '+v,shared.domestic_svg(domestic,p,pre)),('저자 혼합 순서 가설 '+str(p)+' '+v+' — 미승인',authored(range(1,p+1)if pre else[p]))]
  else:panels=[('국내 瑲14 원형',shared.domestic_svg(domestic)),('고정 원 KAGE 瑲17raw — 내부 H 불일치 보존',source),('공개 원 Hans 倉10 — 별도1024 source frame',donor_svg()),('저자 혼합 玉4 +완전倉10 — 미승인',authored())]
  options=''.join('<option>'+str(i)+'</option>'for i in range(1,15));form='<form action="/stroke"><select name="pen">'+options+'</select><select name="view"><option>current</option><option>prefix</option></select><button>정적 대조</button></form>'
  return '<!doctype html><meta charset="utf-8"><title>瑲 완전倉10 저자 혼합 미승인</title><style>body{font:16px system-ui;margin:16px}h1{font-size:24px}h2{font-size:17px}.panels{display:grid;grid-template-columns:repeat(auto-fit,520px);gap:16px}svg{display:block;width:520px;height:520px}</style><h1>瑲 공개 원형 혼합 정적 가설</h1><p><a href="/whole">전체 대조</a></p>'+form+'<p>원 玉4 P/guide 그대로. 완전 Hans 倉10의 원D/guide에 공개 control-bbox 기준 양의행렬 하나만 적용. 원source whole/engine capture 아님. 연결·필순·시간·제품 적용 모두 ROOT 실제검토 전 미승인.</p><div class="panels">'+''.join('<section><h2>'+html.escape(label)+'</h2>'+svg+'</section>'for label,svg in panels)+'</div>'
 shared.guards=guards;shared.load_sources=lambda:{'recipient':src,'donor':donor,'candidate':f};shared.selection=selection;shared.page=page
 full=ET.fromstring(authored());require(len(list(full.iter(NS+'path')))==18,'8original 玉 P +10original donor D');require('ns0:'not in authored(),'standard inline SVG')
 dummy={'viewBox':'0 0 200 200','transform':'','strokes':[{'d':'M0 0 L1 1'}for _ in range(14)]};require(page('/whole',None,None,dummy).count('<section>')==4,'actual whole page four-panel contract')
 for p in range(1,15):
  for v in['current','prefix']:
   selected=selection('/stroke','pen='+str(p)+'&view='+v);doc=page('/stroke',selected,None,dummy);require(doc.count('<section>')==2,'actual current/prefix page contract');ET.fromstring(authored(range(1,p+1)if v=='prefix'else[p]))
 for route,query in[('/checks',''),('/compare',''),('/stroke','pen=0&view=current'),('/whole','x=1'),('/stroke','pen=1&view=current&pen=2')]:
  try:selection(route,query)
  except ValueError:pass
  else:raise ValueError('forbidden route/query accepted')
 require(shared.FETCH_COUNT==0,'check-only private HTTP0')
 if a.check_only:print(json.dumps({'codeCheck':'PASS','recipientRaw4':True,'recipientP':8,'wholeDonorD':10,'coloredPaths':18,'staticSelections':28,'actualPageContract':'4whole/2selected','newCrossContacts':0,'HTTP':0,'engine':0,'server':0,'nativeApproval':False}));return
 old=sys.argv
 try:sys.argv=[str(ROOT/c['sharedServe']['path']),'--port',str(a.port)];shared.main()
 finally:sys.argv=old
if __name__=='__main__':main()
