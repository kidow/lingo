import json,urllib.request,hashlib,re,xml.etree.ElementTree as ET
pairs=[('09e91','09e91'),('09e91-Kaisho','09e91-Kaisho'),('09e91-KaishoHzFst','09e91-KaishoHzLst')]
def get(repo,rev,ident):
 url='https://raw.githubusercontent.com/'+repo+'/'+rev+'/kanji/'+ident+'.svg'
 with urllib.request.urlopen(url,timeout=25) as r:raw=r.read()
 xml=ET.fromstring(raw);p=[x.attrib['d'] for x in xml.iter('{http://www.w3.org/2000/svg}path') if '-s' in x.attrib.get('id','')]
 return {'id':ident,'url':url,'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest()},p
def signature(p):return [float(v) if re.match(r'^[+\-.\d]',v) else v for v in re.findall(r'[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?',p)]
out=[]
for oldid,newid in pairs:
 a,ap=get('Connum/hanzivg','55ecef6a881d5120cd261587d668e1b6af843ec2',oldid)
 b,bp=get('KanjiVG/kanjivg','422b5538595676da918c288a4230cb5e22a1ee7e',newid)
 aa=list(map(signature,ap));bb=list(map(signature,bp))
 mapping=[next((i+1 for i,p in enumerate(bb) if p==q),None) for q in aa]
 blockers=[3,4,7,9,12]
 out.append({'glyph':'麑','hanziVG':a,'kanjiVG':b,'oldStrokeToCurrentStroke':mapping,'onlyReorderedExistingPaths':sorted(x for x in mapping if x is not None)==list(range(1,len(bb)+1)),'unchangedBlockingPaths':{str(i):aa[i-1]==bb[i-1] for i in blockers}})
print(json.dumps(out,ensure_ascii=False))
