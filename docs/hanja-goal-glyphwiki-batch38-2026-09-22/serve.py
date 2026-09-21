#!/usr/bin/env python3
"""RAM-only comparison of the rejected primary and alternative whole 蔗."""
import sys
sys.dont_write_bytecode=True
import json,importlib.util
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
sources=json.loads((HERE/'sources.json').read_text())['entries']
meta=json.loads((HERE/'metadata.json').read_text())[0]
def paths(source):
    result=[]
    def point(p):
        return ' '.join(str(round(v,6)).rstrip('0').rstrip('.') if '.' in str(round(v,6)) else str(round(v,6)) for v in p)
    def expand(name,t=(1,1,0,0)):
        for row in source['records'][name]['data'].split('$'):
            f=row.split(':');typ=int(f[0])
            if typ==99:
                assert f[1:3]==['0','0']
                assert len(f)==8 or (len(f)==11 and f[9:11]==['0','0'])
                x0,y0,x1,y1=map(float,f[3:7])
                expand(f[7],(t[0]*(x1-x0)/200,t[1]*(y1-y0)/200,t[0]*x0+t[2],t[1]*y0+t[3]))
            else:
                assert typ in (1,2,7)
                n=list(map(float,f[3:]))
                pts=[((n[i]*t[0]+t[2])/2,(n[i+1]*t[1]+t[3])/2)for i in range(0,len(n),2)]
                suffix=' L '+point(pts[1])+' Q '+' '.join(map(point,pts[2:])) if typ==7 else (' L ' if typ==1 else ' Q ')+' '.join(map(point,pts[1:]))
                result.append('M '+point(pts[0])+suffix)
    expand(source['root'])
    result[2],result[3]=result[3],result[2]
    if source['root']=='u8517-k':result[9],result[10]=result[10],result[9]
    assert len(result)==15
    return result
spec=importlib.util.spec_from_file_location('review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[{'glyph':'蔗','id':s['root'],'dictionaryStrokes':15,'dictionary':meta['dictionary'],'viewBox':'0 0 100 100','strokes':[{'path':p}for p in paths(s)]}for s in sources if s['root']in('u8517-k','gaijin_krcourt-08517')]
r.base.renderer.ENTRIES['蔗']={'strokes':15,'dictionary':meta['dictionary']}
original=r.candidate
def candidate(entry,end=None):
    return original(entry,end).replace('stroke-width="5"','stroke-width="3"').replace('stroke-width="4"','stroke-width="3"')
r.candidate=candidate
code=(ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py').read_text()
handler=code[code.index('class Handler('):code.index("\nif __name__")].replace('Right KanjiVG','Right held GlyphWiki candidate').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.','GlyphWiki contributors; custom permissive license. Candidate rejected.')
exec(handler,r.__dict__)
if __name__=='__main__':
    port=int(sys.argv[1])if len(sys.argv)>1 else 51889
    print('RAM comparison server: '+str(port),flush=True)
    r.ThreadingHTTPServer(('127.0.0.1',port),r.Handler).serve_forever()
