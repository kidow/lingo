# 韞: 새 native 순서 보류와 읽기 전용 교환안

루트가 원 vh-u97de source 후보에서 whole1 호환, 첫 fine [3,19,1]의99.99→100 완료형상 PASS를 확인했습니다. 그러나 fine1 화면에서 국내 첫획은 왼쪽 위에서 내려오는 사선(현재 candidate2/raw2)이고, 현재 candidate1은 가로→아래 fold(raw0/1)여서 첫획 순서가 다릅니다. 방향전체/coarse/multi/자연재생은0에서중단했습니다. PID59790/port61226/session1354 STOP143. 이부분PASS는 새다른후보승인이아닙니다.

원폴더 docs/hanja-source-independent-vh-u97de-source-experiment-2026-10-19/ 및 원743 full5/header/literal19/NOTICE/HOLD/nativefalse/runtimefalse는 수정하지 않았습니다. 기존국내관찰은7·8·9만이고 원19전체배열은 있어도 allStrokesReviewed=false·progressive0/전체순서미승인입니다.

공개cache의 old1은 raw0 H(19.08,36→68.48,36) + raw1 V(68.48,36→68.48,64)입니다. old2는 raw2 slanted down(47.2,13→39.599999999999994,64)이며 원guide M23.6 6.5 L19.799999999999997 32/width14 그대로입니다. 따라서 원획참조만 [2,1,3..19]로교환하는 후보는 필드·마스크·37polygon·폭·guide·weight·기존8경계를 그대로 보존할 수 있습니다.

다만 root가 새로명시한 직접근거는 국내1→현재2이며 국내2→현재1의진단과나머지전체순서승인은아직없습니다. 원완전배열존재와국내완전순열검증은다릅니다. 새candidate geometry/source8/서버는생성하지않았고, hold.json의 RAM참조projection해시는실험산출/검증완료를뜻하지않습니다. 새helper도현재추가하지않았습니다.

후속으로루트가선택하면 기존공개캐시참조만의별도first1/2 order source8을준비하고 originalOrderBaseline/baselinePenMap[2,1,3..19]를명시해야합니다. 첫획prefix차이는의도된비교차이이며두획이후원prefix와같습니다. 기존8 VH .2621359223300971 포함 whole/전방향/fine/coarse/모든경계/자연재생 freshALL이필수입니다. 새native/runtimefalse·geometry/compiler/engine/UI/server/Git/build0을유지합니다.
