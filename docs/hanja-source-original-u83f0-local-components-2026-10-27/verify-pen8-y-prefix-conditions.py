from pathlib import Path
from fractions import Fraction as F
import ast, hashlib, json, re

R=Path(__file__).resolve().parents[2]
FIXTURE='docs/hanja-source-original-u83f0-local-components-2026-10-27/fixtures-draft.json'
AXIS='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py'
PATH='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py'
DIRECTION='docs/hanja-official-media-compare-u83f0-2026-10-23/official-temporal-native-review.json'
PINS={FIXTURE:'80df51355acb56c1b1d69fe5c67e866fb1d484f325e361d91a0b582e3ea11485',AXIS:'db903056c1375705fd8133ee79dcc3ff5450c519012a3f249881af9abebdbd29',PATH:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',DIRECTION:'08ab76a6600693b63663b7c6525314858112fa905b052df4c0009caf3c8d761c'}
for path,digest in PINS.items():assert hashlib.sha256((R/path).read_bytes()).hexdigest()==digest
namespace={'F':F,'re':re,'fixture':json.loads((R/FIXTURE).read_text())['u83f0']}
for path,names in [(PATH,{'polygons','cross','state'}),(AXIS,{'section','merge','intersection','audit','encode'})]:
    source=(R/path).read_text()
    for function in ast.parse(source).body:
        if isinstance(function,ast.FunctionDef) and function.name in names:
            exec(compile(ast.get_source_segment(source,function),path+'::pure-function-only','exec'),namespace)
result=namespace['audit'](8,1,'increasing')
directions=json.loads((R/DIRECTION).read_text())
selected=[item for item in directions['directions'] if item['pen'] in (8,9,11,12)]
assert directions['approval']['officialMacroDirections'] and not directions['approval']['officialMicrotiming']
out={'schema':'hanja-local-pen8-alternate-y-prefix/v1','glyph':'菰','inputs':PINS,'result':result,'reusedPublisherMacroDirections':selected,'directionInterpretationOnly':{'8':'Y increasing agrees with right-up to left-down macro; X sufficient-condition HOLD remains.','9':'Whole-logical Y increasing agrees with down then left-down macro.','11':'Both X increasing and Y increasing agree with down-right dot; prefer Y with pen9/12 only for shared source-bound family.','12':'Y increasing agrees with long down-right macro.'},'oldXProofReexecuted':False,'previousSuccessfulMathReexecuted':False,'newMathCases':1,'newNative':0,'engine':0,'server':0,'sourceMicroClockApproved':False,'candidateNativeApproved':False,'runtimeApplied':False,'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
print(json.dumps(namespace['encode'](out),ensure_ascii=False,indent=2))
