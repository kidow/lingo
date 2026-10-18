# 菡·巘·嶼 고정 V2/H1 표시 실험

菡1006의VS2 u83e1-ue0102 11획raw[11,12],巘1008 baseu5dd8 2획raw[1,2],嶼1090 Ku5dbc-k 2획raw[1,2]만대상입니다. 원V 두polygon과H 한polygon을down→right 두mask로표시합니다. 원polygon/좌표/폭/연결점/순서·나머지모든mask는그대로이고원call길이/2 weight합을보존합니다. active guide는원combinedcenterline과달라지는명시적표시정책변경입니다. 새획geometry/connector를저작하지않습니다.

## 원岯함수기원과한정guard치환

commit04b1ece의岯실험 boundedVh 원본문SHA fe87cb90faa47d69adc13a70588ae5c54ccff1469724b395d51438084206113b를고정합니다. 원본문은pen2/raw[1,2]/Vflags0·13을하드코딩하므로이세후보에전체본문동일이라고주장하지않습니다. 진입guard두곳만고정config의pen/raw와정확Vflags에결박하는명시치환으로바꿉니다. 그밖의원point정규화·convex/접점·outlinepartition·bounds·weight·타획참조계산본문은byte동일입니다. 菡Vflags0/113,巘·嶼1000/13,모든Hflags2/2이며원호출exactendpoint접점을필수검사합니다. 전체원/새함수SHA와치환쌍은preparation.json에있습니다.

## 스키마와보존범위

菡은원selectedid5(sourceRoot/sourceProofFile/sourceProofFileSha256/sourceHeaderFile/sourceHeaderFileSha256,접두점없음),巘은기존nativecaller외6(root/sourceProofFile/sourceProofFileSHA256/engineHeaderSHA256/sourceFileSHA256/compilerFileSHA256)→원innerid3,嶼는./접두사·Sha256소문자키의원id7을그대로보존합니다. 외부compileProgressive필수3/compileSourceWhole필수4,exactfull5전체SHA·proof/header/source/compiler파일핀을검사합니다. 캐시처리단계에서원compiler를다시호출하지않으며원inner계약과최초capture호출을기록합니다.

원source폴더·NOTICE·기존보류·원岯실험8은불변입니다. 巘의기존국내6/7순서불일치는이실험에서보정하지않으며native승인0입니다. 다른whole별칭과기존nativegate를자동승계하지않습니다.

## 캐시와횟수

기존fixtures파일에서이3target캐시를찾지못해정상Node에서원계약으로baseline각1회만캡처했습니다(총sourcecompiler3/engine0). 공개baseline을fixtures.json에먼저보존한뒤새표시파생양성각1회·변형거부·구문/AST/guard를단회검사합니다. 菡·嶼는기존고정compiledSHA와대조하고巘baselineSHA는이번첫저장값이며독립과거hash로주장하지않습니다. 초기사전RAM정리에서미선언변수하네스오류1이있었으나sourcecompile/파일생성/검사전이었고재컴파일원인이아닙니다.

## native helper

rtk proxy python3 -B docs/hanja-bounds-vh-additional-source-experiment-2026-10-18/serve.py --target 1006 --port 0

--target1006/1008/1090,whole/pairs/실제3SVG520 fine/각220의9coarse/모든복수mask경계전중후·0epsilon·95·99.99/100·설정8초자연재생을지원합니다. 공개fixture만캐시하며startup/GETsourcecompile0,국내SVG는원URL/SHA/clipguard뒤RAM에서만사용합니다. 서버는root가필요할때시작·종료합니다. source-only/nativeApproval=false/runtimeApplied=false,app UI/새필순승인/빌드/registry/hold/resume변경0입니다.

GlyphWiki Project and contributors, LicenseRef-GlyphWiki. 각원sources.json의고정archive a7dd7f3d911936770fa742e8c37d16bee7e2173c 및명시provider/원NOTICE를보존합니다. privateSVG/HTML/이미지저장0입니다.

## 최종 단회 결과

캐시양성3·API거부84·직접primitive거부27·Node구문2·PythonAST1·helperguard1은집중1회exit0PASS입니다. 집중중sourcecompiler0,원baseline총3회(후보별1),engine0입니다. 菡12p14m31 SHA0d10b666…ed8c23,전체경계6(.8398941215251192)/11(.38627016766845934);巘23p27m62 SHAbf47397f…b3e369,전체경계2(.6998104679982504)/9(.8727593918554927)/15(.9147030382010121)/17(.8187503489055784);嶼17p18m36 SHAfd9d8147…58a85c7,전체경계2(.6924908028565245)입니다. 巘6/7순서는여전히미보정·미승인입니다.

집중성공stdout의공개derivedfixture만기존baseline캐시에합쳐보존하고핀을갱신했습니다. 이문서/메타및fixture최종화때compiler·통과한검사·구문/guard를반복하지않았습니다. 새native/runtime승인0입니다.
