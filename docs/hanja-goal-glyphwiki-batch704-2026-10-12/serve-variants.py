import sys
sys.dont_write_bytecode=True
import json,importlib.util,os
from pathlib import Path
HERE=Path("/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch704-2026-10-12")
ROOT=HERE.parent.parent
metadata={"glyph":"敔","root":"u6554","candidate":{"id":"u6554","glyph":"敔","hun":"막을","eum":"어","readingGrade":"특급","radical":"攴","strokes":11,"sourceRow":3167,"sourceHunEum":"막을 어","example":{"word":"柷敔","reading":"축어","source":{"dictionary":"표준국어대사전","targetCode":336166,"url":"https://stdict.korean.go.kr/search/searchView.do?word_no=336166&searchKeywordTo=3","verifiedAt":"2026-09-17"}}},"dictionary":{"url":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/6554.svg","status":200,"bytes":5465,"sha256":"4f756b23f196e81dece242147c2472f4cd348cdaeb63ef49883a67344ea5e29d","clips":11,"glyph":"敔","privateMediaSaved":False},"dictionaryStrokes":11,"status":"Source captured;native whole review pending","privateMediaSaved":False,"runtimeApplied":False,"runtimeRegistered":0}
names=["u6554","u6554-ue0100"]
import base64,gzip
variants=json.loads(gzip.decompress(base64.b64decode('H4sIAAAAAAAAE+1a308kNwz+X/KcjmLn975VvcfeUyv1Ae3D6lg4CgK0sL0ixP9eZSYJs+PMZOHU40BBCO2tL479xXacT35ke6O1YqtHdr672d/esdXJI9ttvrHVCXDBBQfbAUfbGQ4COz98vN5fXU3+rDm7vbl6OL+5DjpOHtm/bNWvZQ9shboznN2cnbGVeOKDrNdWF3oqzFrHsjU/qeu1LskskXkRZTBet14HcQJEYvjVpgM9AKGgkxyE7PSxmBjscM4EZTs1mNBrPBRKHd0uCbWgOg9NFxw5Yme4EZ3Q3GH8cKTZ/dKwhXaTrR0ufm9w8n3WNJIcmoo9ytlChy9D2LlBvZga5CJ8msBnTU000pYizVYAkdMAk2VAkr0kWOnO0xMVggN2NuIDwr40GvvVg+tAXB/0HSOlsI0Uj4XPWbqk2kMW0lD3Pgq9Gis+gAaQA0guRee0Vj7/GA5oOq2LEoudOho4aboYTqhoqmahg5DRh/GvstAuCMHNeoccF1xzrtNeaZF+IAmO9UwseOZ6q+pCRzF5VrvgWch8Oe9CQfCiUxtCpjfC0MDKQqvIwThMQicWhAdqU7CPxEuggS/F+jyiz/ZKpGpnTDoqkAZMvxfs5xO3Bciy28tCehIjtWPh2DPkglsO0nbOag6KA9pOWs2N7ruY/lshKqVRyWSFCTfvYXlTsQUpiKSLF7XU3fRuAKlil6F0YSXEHbWiQrSxohqkalHGS9UCXQk+thzWF4Qq9hzOBP2TEp9Wekn3FGlPEKJwO2BEwXtyhCCGhR4KWn1005FVIGPltwXUwSR4iErwMWJ0oZnEdFFpiriO0CgsHsegVPb95kToU58pqfMS0tUoR4jnmzEHASh6IIsxKRPkACOTsuLleI5H6Qp7irgOxWx3GTIuBGHILCM5ONcZ7D8e3YjIiKchtgVlVRFtQLLCQvuxoNKoJJo2cGBNaoKhiEOop5YHDTA4D1r2OIAR3JkufHKu9mYScXcaqyZmBtJDGopCTEYScjo/LMBQtTpXVFlo81RsxZSicS6jVm0KOZDwB9P3epOczPdTKZmFiNEoyUpn8kXsSPVwOr3hnCVavYvFDNz0aRCqTnTTFmpSLqABZlpBopu6UCWGK+AhZ9EEWkzHgrYgtckZkN300RB2G9Z6+o4EnbZ1goaKTveTwRG6h3FsQz7DkMRW8tB+hODVgoeWtg9pWwtk8OlOKlweKKMRztHgQJufukCde66fQGtrXoma6lUynaMsvFjiGzoEOjFX2xR15FkHJp+xEXRPmzt6U7hgXSo2obUi0WNzH+QKEJocH5YGezjlFLO+gERuLI2gCCtINtNLUeqkVxUKDaYzDxFDS0LqdGnzDQgj7oNEOwyeulIDky5iO26acqVfxnAZf+dHraYbp8qas/vd5st2iPbLi+tTtmJfTj/tNt9+v7jeMs42u/OQC0X6THDxcemyXvMCImX2rGfW3pwvq9leItAEL9r9vxNmNVspf4ZzGH9oxqyG0wyB1rNrH50yq2HzGgJt4N5+Cs7s9e7NMlBYzvYfTppVs//FFNrAvTXWrGTS60KpQqNVQ+kH0WbUtd/2u3/GFbJKpAluG4XWKLRGob2UQqs3JyVODWfeD++YQ6sXoRqrhjM1qPFpjU9jb8Kn1WO6yrDZmUxv3Frj1qY3bS5I751bW3N2uj3b7K/u78Jg2uXnzfk22M7Z5V8Xp/df2Upzdvn54rr/159sZTi7/PX07/3dffivf9xvb9lKPz3xYbjtl/1WgBBtxq3NuLUZt/fA2LUZtzbj1mbc2oxbm3FrM26Hz5pG0DWCrs24vQU/12bcGif3ETi5NuOWAr3xcI2HazNubcatzbjN8TvvhzFrM25txq3NuLUZt+9jzdqMW5txY41CaxRam3FrM26NT2ONT6vzaW3GrXFrjVt7uxm3p/8A2wEG1sJNAAA=')))
spec=importlib.util.spec_from_file_location('review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[{'glyph':'敔','id':n,'dictionaryStrokes':11,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'raw':i} for i in range(len(variants[n]['groups']))]} for n in names]
r.base.renderer.ENTRIES['敔']={'strokes':11,'dictionary':metadata['dictionary']}
def candidate(entry,end=None):
 groups=variants[entry['id']]['groups']
 if end is not None:groups=groups[:end]
 polygons=[p for g in groups for p in g['polygons']]
 assert all(v['off']==0 for p in polygons for v in p)
 return '<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in p)+'"/>' for p in polygons)+'</g></svg>'
r.candidate=candidate
code=(ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py').read_text()
handler=code[code.index('class Handler('):code.index("\nif __name__")].replace('Right KanjiVG','Right exact complete original whole; no trajectory approved').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.','GlyphWiki contributors; original source polygons. Engine implementation not embedded.')
exec(handler,r.__dict__)
print(json.dumps({'port':65317,'pid':os.getpid(),'wholeVariants':len(names)}),flush=True)
r.ThreadingHTTPServer(('127.0.0.1',65317),r.Handler).serve_forever()
