# 기존 Q/Bezier terminal15 guard 재사용 후보7

暬649 실제10/raw9·10,栻687 pen9/raw8,罭716 pen11/raw7,棫717 pen10/raw11,淢719 pen9/raw11,緎720 pen12/raw15,茷979 pen8/raw7만 다룹니다. 선택whole는각원config의고정root이며다른whole를자동대체하지않습니다.

원979 progressive-terminal15-candidate.mjs의 contourPolygons/canonical/bounds와 원quad분리 guard본문을바이트동일재사용합니다. Q 또는Bezier/ta2=15/시작Y<끝Y/마지막raw의마지막call/정확한원tailquad/원mask내1회존재/마지막mask/bodybounds동일 조건을유지합니다. 출력은계산한polygon이아닌원outline문자열입니다. 새좌표·guide·연결선·폭·weight·순서·타mask변경이없고 기존bodybounds도그대로입니다. tailweight는고정engine jump(kWidth×5)/2=12.5입니다.

매호출전원입력파일·선택whole/header/완전full5/identity를검증하고,외부API 정확3/4인자를거부검사한뒤원함수를1회호출합니다. legacy6자는새id3{root,file,fileSHA256}→원2인자,979는기존Q후보id5 ./uppercaseSHA256를보존하고기존CONFIG의원id5 ./Sha256로원3인자함수에전달합니다. 원979extraarity미거부를새외부guard로보강합니다.

header실제형식은649/687이4필드,나머지는trace포함5필드입니다. **979 header의groups/trace는basewhole여서선택K와다릅니다.** 기존후보처럼header전체bytes/SHA를보존하면서engineRevision/engineHashes/defaults만선택K와대조하고,선택K body의groups/trace는절대로대체하지않습니다. 그외6자는header/body실제공유필드전체를대조합니다.

649의다른raw4LineUP는수정하지않고실패10만Q15로분리합니다. 719물수변의원독립2mask와720糸첫두pen의원추가mask도그대로입니다. 716고정provider2와모든원NOTICE/proof/과거보류/geometry를핀으로보존합니다. 새6baselineSHA는이번첫양성캡처이며독립옛해시가아닙니다. 979는기존source-only검증원baseline e4266d…ede1a를대조하며그것도native승인이아닙니다.

공개baseline/후보fixture만저장하고국내SVG는고정SHA후RAM에서만사용합니다. helper startup/GET sourcecompile0,port0,3SVG fine/pair각520px 및coarse baseline/candidate각220px,0epsilon/95/99.99/100/경계전중후/9coarse/8초자연재생을지원합니다. localtail면적은부동소수진단이며AA·국내필순·전체연속성승인을대신하지않습니다.

`python3 -B serve.py --target 649 --port 0` (root별도native용;준비중서버0). native/runtimefalse,기존holds/canonical/registry변경0입니다. 원자료라이선스는config각sourceDirectory/NOTICE를참고합니다.

실제source-check:1차는649baseline1회후독립derive의trace입력alias누락(ReferenceError)으로실패했습니다. 원guard본문은바꾸지않고alias만추가한뒤2차7대상양성/거부165전부PASS했습니다. 실제baseline은649총2·나머지각1=8회이며추가engine0입니다. source-check총2회,Node구문은module2/checker1=3회,PythonAST/helper정적guard각1회입니다. 실패/복구를성공1회로숨기지않습니다.

暬649: 15획/16mask/41polygon;pen10 boundary0.8325541385289524;compiledSHA547c85bd8d216479a6c639b14beb8d4964365030bc7918b2bbb83f3abbbc48bb
栻687: 10획/11mask/22polygon;pen9 boundary0.8688094842724506;compiledSHA08365d45cdf11d5576938ef5f28e350d4954fd8fc9f4789e01e858f6a6c6741b
罭716: 13획/14mask/27polygon;pen11 boundary0.8462481372039311;compiledSHA0b44b9aaea01337431332ffeb573960df475846630886d87a8b6a706318f33a3
棫717: 12획/13mask/27polygon;pen10 boundary0.8732609012962794;compiledSHAd06d6ee32f099df5c32c40a54016a8bc9c0d19916b9f2a50b99ab0f5323409d7
淢719: 11획/13mask/27polygon;pen9 boundary0.8732609012962794;compiledSHA37e167deac177a7aa71ea8ee1398cd87a20deee81a055173c177871a6d0207f2
緎720: 14획/17mask/39polygon;pen12 boundary0.8725767616955878;compiledSHAfb596b3e95bc6506faa44577688fa85e552f7429f32c2fd40537ff69e70e2922
茷979: 10획/11mask/25polygon;pen8 boundary0.8427380804869272;compiledSHAe5d28cf49259607467dca1923daefeecfe1e3fd707cf615f58ac581fde63f2c2
