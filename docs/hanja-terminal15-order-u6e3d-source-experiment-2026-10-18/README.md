# 渽 원Q15 꼬리 분리와 전체획 순열 실험

원833 및 첫 재그룹 source8/HOLD/nativefalse는 변경하지 않습니다. 고정 baseline은 ../hanja-source-regroup-u6e3d-source-experiment-2026-10-18/fixtures.json의12획13mask28polygon(SHA da7fdfffc4ff7428e6759e38369d59a7bc8c2559e70c2e81ca15c6725b51110e)입니다. 원compiler/engine호출 없이 캐시만 사용합니다.

기존979 support628byte/partition2202byte를 그대로 사용하여 원7획raw7 Q15의 원lastQuad만 UPweight12.5로 분리합니다. width6/jump25/원quad exact guard와 body bounds 동일성을 요구합니다. body guide·폭14·weight86.431663·bounds 및 원물3의 두Q mask는 그대로입니다. 이후 전체획 참조순열 [1,2,3,4,5,6,10,11,12,7,8,9]만 적용하여 최종10이 원7입니다. 새12획14mask28polygon이며 좌표·폭·connector 작성은 없습니다.

root는 옛후보의 전체12방향 중1..6일치/7..12불일치 및 old7완료pop을 관찰했습니다. 이 이력은 새후보의 승인으로 승계하지 않습니다. 새물3 경계 .3838421566818278 및 최종10 경계 .8736501578872681의 시작nib/후진/완료와 whole/전체필순/coarse/자연재생은 fresh미승인입니다.

신규 strict full5/id3 unprefixed engine-proof.json/fileSHA256 API compileProgressive 필수3인자, compileSourceWhole 필수4인자를 유지합니다. 원source/NOTICE/fullproof/polygon과첫재그룹8파일을 전부 핀으로 보존합니다. GlyphWiki Project and contributors / LicenseRef-GlyphWiki, 원833 NOTICE.md를 참조하세요.

helper는 실제3SVG520,모든multi3/10 경계 직전/경계/직후 및0/epsilon.0001%/95/99.99/100,각220px9샘플coarse,8초 자연재생을 제공합니다. baseline은 originalPenOrder로 대응하므로 최종10→old7이며 show/coarse 모두 동일매핑입니다. 누적prefix는 원순서/새순서가 달라 같다고 주장하지 않습니다. startup/GET sourcecompile0/privateSVG rootRAM전용. root만 python3 serve.py --target u6e3d --port 0 으로실행합니다.

실제 이력: 기존baseline 캐시에서 파생1회 후 공개fixture를 검사 전에 저장했습니다. 원/신규sourcecompiler0·engine0. cached양성1/음성40·Node구문2·helperAST/매핑1·정적guard1·선언AST1 모두 단회PASS. 새기하 SHA 9a630dce3c1333c22cc3689f66d221fb2eb3877692b3afc5566d58c4e8c0e253; original32/new7핀 불일치0. native/runtime는 여전히false입니다.
