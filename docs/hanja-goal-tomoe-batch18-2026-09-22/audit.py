import json,hashlib,urllib.request,subprocess,os
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,parse_qs
root=Path(__file__).resolve().parents[2]
registered=set(json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {HANJA_STROKES} from './lib/hanja-strokes.ts';console.log(JSON.stringify(HANJA_STROKES.map(e=>e.glyph)))"],cwd=root)))
chars=[c for p in (root/'content/hanja/characters').glob('*.json') for c in json.loads(p.read_text())['characters']]
missing=[c for c in chars if c['glyph'] not in registered]
dictionary={}
for folder in ['hanja-g1-inventory-2026-09-18','hanja-g2-inventory-2026-09-15','hanja-special-inventory-2026-09-20','hanja-special2-inventory-2026-09-18']:
 d=json.loads((root/'docs'/folder/'dictionary-inventory.json').read_text())
 for row in d['rows']:
  r=dict(zip(d['fields'],row))
  if r.get('animatedCount'): dictionary[r['glyph']]={'url':r['svgUrl'],'bytes':r['svgBytes'],'sha256':r['svgSha256'],'strokes':r['animatedCount']}
tap=json.loads((root/'docs/hanja-goal-variant-kanjivg-batch15-2026-09-22/tap-metadata.json').read_text())['dictionary']
dictionary['搭']={'url':tap['url'],'bytes':tap['bytes'],'sha256':tap['sha256'],'strokes':tap['animated']}
held=set(json.loads((root/'docs/hanja-goal-2026-09-21/progress.json').read_text())['held'])

import xml.etree.ElementTree as ET
repos=[('l4u','9d054a1f490368e0d45e0aff6430ce3598ab92c5'),('iacore','d605755d162b2f35cbf9b95fa8b41f59ae7adaf0')]
datasets={};source_meta=[];entries=[]
for owner,rev in repos:
 base='https://raw.githubusercontent.com/'+owner+'/tomoe/'+rev+'/'
 materials={}
 for path in ['README','COPYING','data/handwriting-ja.xml']:
  raw=urllib.request.urlopen(base+path,timeout=40).read()
  materials[path]={'url':base+path,'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest()}
  if path=='README':assert 'LGPL except KANJIDIC2' in raw.decode()
  elif path=='COPYING':assert 'Version 2.1, February 1999' in raw.decode()
  else:xml=ET.fromstring(raw)
 data={}
 for c in xml.findall('character'):
  glyph=c.findtext('utf8');ss=c.findall('./strokes/stroke')
  if len(glyph)!=1 or not ss:continue
  points=[[[float(p.attrib['x']),float(p.attrib['y'])] for p in s.findall('point')] for s in ss]
  if not all(len(p)>=2 for p in points):continue
  data[glyph]=points
 datasets[owner]=data;source_meta.append({'owner':owner,'revision':rev,'license':'LGPL-2.1','charactersWithPaths':len(data),'materials':materials})
 for c in missing:
  g=c['glyph']
  if g not in data:continue
  ref=dictionary.get(g)
  entries.append({'glyph':g,'grade':c['readingGrade'],'catalogStrokes':c['strokes'],'owner':owner,'candidateStrokes':len(data[g]),'dictionary':ref,'matchesDomesticCount':bool(ref and ref['strokes']==len(data[g])),'recentHold':g in held,'pointHash':hashlib.sha256(json.dumps(data[g],separators=(',',':')).encode()).hexdigest()})
report={'date':'2026-09-22','missing':len(missing),'sources':source_meta,'counts':{o:{'missingMatches':sum(e['owner']==o for e in entries),'domesticCountMatches':sum(e['owner']==o and e['matchesDomesticCount'] for e in entries),'outsideRecentHolds':sum(e['owner']==o and e['matchesDomesticCount'] and not e['recentHold'] for e in entries)} for o in datasets}}

print(json.dumps({**report,'eligible':[e for e in entries if e['owner']=='l4u' and e['matchesDomesticCount']]},ensure_ascii=False))
