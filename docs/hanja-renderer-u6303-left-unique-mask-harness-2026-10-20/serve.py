#!/usr/bin/env python3
import sys
sys.dont_write_bytecode=True
import ast,hashlib,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
ORIGINAL=ROOT/"docs/hanja-renderer-growing-caps-u6303-five-curves-left-experiment-2026-10-20/serve.py"
V_BYTES=(HERE/'validation.json').read_bytes()
V_SHA=hashlib.sha256(V_BYTES).hexdigest()
V=json.loads(V_BYTES)
ORIGINAL_CAPSULE_PINS={"docs/hanja-renderer-growing-caps-u6303-five-curves-left-experiment-2026-10-20/config.json":"3fb0a22f9ab714e40d9f514c5aa3c916eb3539b64db640b6feaf29c8765b5890","docs/hanja-renderer-growing-caps-u6303-five-curves-left-experiment-2026-10-20/render.mjs":"74d6d53cab3989052e204c8a5f93947a78cee4f1964aea3df7531ff6f06420e7","docs/hanja-renderer-growing-caps-u6303-five-curves-left-experiment-2026-10-20/check.mjs":"4374dd2619a7aaba37f6b40d60608772e9e71f62140fb2a1613edfc44a96780a","docs/hanja-renderer-growing-caps-u6303-five-curves-left-experiment-2026-10-20/serve.py":"cc627aa2cae7229a9868b2afea38100dfc952c1703cfaecbf1a1e1b5315de050","docs/hanja-renderer-growing-caps-u6303-five-curves-left-experiment-2026-10-20/README.md":"7c6190f1ce8566f100a1e8fc58358904ee0f2425ad313a4c9489860b2323cd07","docs/hanja-renderer-growing-caps-u6303-five-curves-left-experiment-2026-10-20/validation.json":"68e27beb996b131b2ef72d93b258a5ff2d0eb7acb855b8d7daca129c8827ac4a"}
INPUT_MAP_SHA="fd3e1b5b1f3ccf1189e28453c9cd6eafab2bf62ee35c338e0c2eada84d51841b"
REPLACEMENTS=[('id="coverage2m1"','id="risk-coverage2m1-control"'),("document.getElementById('coverage2m1')","document.getElementById('risk-coverage2m1-control')")]
def sha(raw):return hashlib.sha256(raw).hexdigest()
def guards():
    assert sha((HERE/'validation.json').read_bytes())==V_SHA,'wrapper metadata changed'
    assert V['originalCapsulePins']==ORIGINAL_CAPSULE_PINS,'original capsule pin map changed'
    for path,pin in ORIGINAL_CAPSULE_PINS.items():assert sha((ROOT/path).read_bytes())==pin,'original capsule changed: '+path
    config=json.loads((ORIGINAL.parent/'config.json').read_bytes());pins=config['targets']['u6303']['inputSHA256']
    assert len(pins)==73 and sha(json.dumps(pins,separators=(',',':'),ensure_ascii=False).encode())==INPUT_MAP_SHA,'original73 input map changed'
    assert V['originalSourceInputMap']['sha256']==INPUT_MAP_SHA and V['originalSourceInputMap']['count']==73
    for path,pin in pins.items():assert sha((ROOT/path).read_bytes())==pin,'original source input changed: '+path
    for name,pin in V['ownSHA256'].items():assert sha((HERE/name).read_bytes())==pin,'isolated helper changed: '+name
    return True
def transformed_source():
    guards();original=ORIGINAL.read_text();code=original
    for old,new in REPLACEMENTS:
        assert code.count(old)==1 and code.count(new)==0,'exact single UI control/reference replacement'
        code=code.replace(old,new,1)
    restored=code
    for old,new in reversed(REPLACEMENTS):restored=restored.replace(new,old,1)
    assert restored==original,'only allowed two UI ID strings may differ'
    return code
def delegated_namespace():
    code=transformed_source();tree=ast.parse(code,filename=str(ORIGINAL))
    namespace={'__name__':'__isolated_u6303_review__','__file__':str(ORIGINAL)}
    exec(compile(tree,str(ORIGINAL),'exec'),namespace)
    prior_guard=namespace['guards']
    def pinned_guards():
        guards();return prior_guard()
    namespace['guards']=pinned_guards
    main=tree.body[-1]
    assert isinstance(main,ast.If)and ast.unparse(main.test)=="__name__ == '__main__'",'original main boundary changed'
    return namespace,main
def main():
    namespace,node=delegated_namespace();namespace['__name__']='__main__'
    exec(compile(ast.Module(body=node.body,type_ignores=[]),str(ORIGINAL),'exec'),namespace)
if __name__=='__main__':main()
