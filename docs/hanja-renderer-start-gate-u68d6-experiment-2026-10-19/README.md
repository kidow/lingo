# 棖 · continuous start-gate renderer 격리 실험

원source geometry는 docs/hanja-source-independent-vq-u68d6-source-experiment-2026-10-19의 공개fixture를 직접 재사용합니다. 12p13m25 / SHA fa3be0dbcd906119295020bea0caea8a4064925a8b85078a8cc71c0fee9f1e36. 새sourcefactory/compiler/engine/파생0이며 기존shared43·앱·proof·NOTICE·HOLD는 불변입니다. 원whole호환 및 Q시작 stamp HOLD는 새실험 승인으로 승계하지 않습니다.

R=P∩W(p)∩G(p). S는 원Q guide 시작점의 원반폭7 circle입니다. G는 S밖 unrestricted, S안은 원시작접선 투영≤-r+2r min(p/tau,1). 투영범위[-r,r]는 S∩P의 tight bound가 아니라 원circle의 정확보수범위입니다. gate좌표는 source시작점·접선·폭의 수식파생이며 hand-authored source좌표0. p=0 비표시, p→0+ cap노출은 area≤2r(h+r)→0, 이상적인집합에서 gate와roundsweep은nested입니다. SVG luminance-mask와raster의경계AA는 별도fresh관찰 대상입니다.

tau=min(1,revealWidth/L), L은 브라우저 SVG getTotalLength(original guide)입니다. 기존pathLength=1/dash=p2를 그대로 두므로 actualbrowser의 길이추정과 같은기준을 사용합니다. Node검사에만 원Q미분의 수치적분 길이를 넣으며 UA실측과 동일하다고 주장하지 않습니다. 페이지metrics는 actualL/tau를 표시합니다. tau는 폭1개를진행하는 source-derived 시간정책이지만 필순근거나서예검증이 아닙니다.

새 renderer는 target10/두번째mask만 변경합니다. 다른mask는기존동작입니다. target은p=1,완료prefix,whole에서도roundsweep를유지해 unmask로잔여형상을숨기지않습니다. 따라서 P⊆W(1)이아니면완료coverage가빠지고 별도HOLD입니다. coverage=1은원P에서fullsweep를뺀빨간잔여표시이며새원형이아닙니다. target전용guard가다르면거부하며범용화하지않습니다.

실행(root전용): python3 docs/hanja-renderer-start-gate-u68d6-experiment-2026-10-19/serve.py --target u68d6 --port 0
/whole, /pairs?stroke=10, /progressive?stroke=10&coarse=1, /progressive?stroke=10&coverage=1. 국내/기존renderer/새renderer 각520px, coarse기존·새각220px9단계. 모든multi10 경계before/at/after/0epsilon95/99.99/99.999999/100 및8초재생. source기동GETcompile0,국내미디어는후속root기동시SHA검증RAM만/저장0.

전체 R의 면적0 극한은 S 내부만으로 결론내리지 않습니다. 원 guide를 호길이로 제한한 길이를 ell=pL이라 두면 W(p)는 B(q,r+ell) 안에 있으므로, S 밖 노출은 annulus 면적 2πr·ell+π·ell² 이하입니다. 따라서 이상적인 filled 집합의 area(R(p))≤2r(h+r)+2πr·pL+π(pL)²→0입니다. 집중검사는cap부분 상한의 수렴/finite L/monotone gate를 수치 점검했고, 이 annulus 부등식은 삼각부등식에 의한 설계증명입니다. 실제SVG alpha·AA면적을 측정한 것은 아닙니다.

검증: 집중양성1/반례18·투영gate monotone441점·area0상한 극한·원fixture 불변·100% target unmask없음 PASS. Node구문2/PythonAST1/helperguard양성1음성1 최초PASS·실패0/반복0입니다. 이는집합수식/문자열구성 검사이며 실제SVG alpha면적·완료coverage·브라우저길이·native는미검증입니다. 원Q수치적분(Simpson4096) 참고L=38.68602803095172/tau=.3618877592912602이며 브라우저UA측정과의차이는root실측전미확인입니다. nativeApproval/runtimeAppliedfalse. 서버/UI/runtime/registry/Git/build0.
