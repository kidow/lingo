#!/usr/bin/env python3
"""ROOT executes once in its working network environment. Never print/save SVG or d."""
import hashlib,json,re,sys,xml.etree.ElementTree as ET
from urllib.request import build_opener,HTTPRedirectHandler
URL='http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/995b.svg'
BYTES=10716
SVG_SHA='15c4a68d14997e01aad86e74271717009c6563359916f0b06f2a27c0f48291f1'
CSS_SHA='5c427b5157bb10b0f03e2b42207c55cb2149098044c3a254cd6d0a8d22f8af18'
NS='{http://www.w3.org/2000/svg}'
GEOMETRY=['d','clip-path','stroke-width','stroke-dasharray','stroke-dashoffset','transform','pathLength']
ROOT_KEYS={'id','class','viewBox','version'}
PATH_KEYS={'stroke','id','class','clipPath','delayMs','durationMs','pathLength','inlineStyle','geometrySHA256'}
TOP_KEYS={'schema','glyph','fetchFacts','svgRoot','timedPaths','cssSHA256','inertScriptValidated','bodyOutputOrFileSaved'}
STYLE_KEYS={'--d','--t','stroke-dasharray','stroke-dashoffset'}
SCRIPT_ATTRS={'{http://www.w3.org/1999/xlink}href':'../libs/gna.lib.svg.ani.min.js'}
def need(value,message):
 if not value:raise ValueError(message)
def sha(value):return hashlib.sha256(value).hexdigest()
class NoRedirect(HTTPRedirectHandler):
 def redirect_request(self,*args,**kwargs):raise ValueError('redirect rejected')
def extract():
 # Exactly one request, same opener/no-redirect/bounded read as the existing shared viewer.
 facts={'attempts':1,'successes':0,'status':None,'bytes':None,'SHA256':None,'clips':None,'retries':0}
 try:
  with build_opener(NoRedirect()).open(URL,timeout=20) as response:
   facts['status']=response.status
   need(response.status==200 and response.geturl()==URL,'original URL/status mismatch')
   raw=response.read(BYTES+1)
  facts.update(bytes=len(raw),SHA256=sha(raw))
  need(len(raw)==BYTES and sha(raw)==SVG_SHA,'original byte/hash mismatch')
  need(b'<!DOCTYPE' not in raw.upper() and b'<!ENTITY' not in raw.upper(),'XML declarations rejected')
  root=ET.fromstring(raw)
  need(root.tag==NS+'svg' and set(root.attrib)==ROOT_KEYS,'unexpected root fields')
  root_attrs=dict(root.attrib)
  need(re.fullmatch(r'[A-Za-z][A-Za-z0-9_-]{0,63}',root_attrs['id']) and root_attrs['class']=='ani-svg','unexpected root identity')
  need(re.fullmatch(r'[0-9 .-]{1,80}',root_attrs['viewBox']) and root_attrs['version']=='1.1','unexpected root dimensions/version')
  rows=[];scripts=[]
  for node in root.iter():
   need(not any(k.rsplit('}',1)[-1].lower().startswith('on')for k in node.attrib),'event handler rejected')
   if node.tag.rsplit('}',1)[-1]=='script':
    need(node.tag==NS+'script' and not list(node),'unexpected script structure')
    scripts.append({'attributes':dict(node.attrib),'bodyBytes':len((node.text or '').encode()),'bodySHA256':sha((node.text or '').encode())})
   if node.tag!=NS+'path' or not node.get('clip-path'):continue
   style=node.get('style','')
   declarations=[d.strip()for d in style.split(';')if d.strip()]
   need(len(style)<=250 and all(':'in d for d in declarations),'unexpected generic style')
   need(set(d.split(':',1)[0].strip()for d in declarations)<=STYLE_KEYS,'unexpected style property')
   need(all(re.fullmatch(r'(?:--[dt]:\s*\d+ms|stroke-dash(?:array|offset):\s*[0-9. ]+)',d)for d in declarations),'unsafe generic style value')
   delay=re.search(r'--d:\s*(\d+)ms',style);duration=re.search(r'--t:\s*(\d+)ms',style)
   need(delay and duration and int(duration[1])>0,'original timing missing')
   need(re.fullmatch(r'url\(#[A-Za-z0-9_-]{1,80}\)',node.get('clip-path')),'unexpected clip id')
   need(re.fullmatch(r'\d+(?:\.\d+)?',node.get('pathLength','')),'unexpected pathLength')
   for key in ['id','class']:
    need(node.get(key)is None or re.fullmatch(r'[A-Za-z0-9_ -]{0,80}',node.get(key)),'unexpected path label')
   # The original shape attributes are hashed locally and never enter output or files.
   geometry=json.dumps([[k,node.get(k)]for k in GEOMETRY],separators=(',',':'),ensure_ascii=False).encode()
   rows.append({'id':node.get('id'),'class':node.get('class'),'clipPath':node.get('clip-path'),'delayMs':int(delay[1]),'durationMs':int(duration[1]),'pathLength':node.get('pathLength'),'inlineStyle':style,'geometrySHA256':sha(geometry)})
  rows.sort(key=lambda row:row['delayMs']);need(len(rows)==23,'original23 timed paths required')
  rows=[dict(stroke=i,**row)for i,row in enumerate(rows,1)]
  need(all(set(row)==PATH_KEYS for row in rows),'output path allowlist mismatch')
  need(len({row['clipPath']for row in rows})==23,'duplicate original clips')
  need(all(rows[i]['delayMs']>=rows[i-1]['delayMs']+rows[i-1]['durationMs']for i in range(1,23)),'overlapping original timing')
  need(scripts==[{'attributes':SCRIPT_ATTRS,'bodyBytes':0,'bodySHA256':'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}],'inert script mismatch')
  facts.update(successes=1,clips=23)
  result={'schema':'hanja-safe-original-media-metadata/v1','glyph':'饛','fetchFacts':facts,'svgRoot':root_attrs,'timedPaths':rows,'cssSHA256':CSS_SHA,'inertScriptValidated':True,'bodyOutputOrFileSaved':False}
  need(set(result)==TOP_KEYS,'output top-level allowlist mismatch')
  encoded=json.dumps(result,ensure_ascii=False,separators=(',',':'))
  need(len(encoded.encode())<=18000,'safe metadata size limit')
  return encoded,0
 except Exception as error:
  # Fixed error message and type only; never echo parser/source/shape text or traceback.
  failure={'schema':'hanja-safe-original-media-metadata-failure/v1','glyph':'饛','fetchFacts':facts,'errorType':type(error).__name__,'message':'Single bounded retrieval or strict metadata validation failed; no retry.','bodyOutputOrFileSaved':False}
  return json.dumps(failure,ensure_ascii=False,separators=(',',':')),1
if __name__=='__main__':
 output,status=extract();sys.stdout.write(output+'\n');sys.exit(status)
