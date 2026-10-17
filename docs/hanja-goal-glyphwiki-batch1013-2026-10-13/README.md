# Batch1013 衋

2026-10-18 root 브라우저 패널 최종 승인. Whole5를 실제 관찰해 base·VS1·VS2·VS3는 국내 자형과 호환, VS0의 긴 수직획은 비호환임을 확인했고 base를 선택했다. 최종순열[1,2,3,5,4,6,7,8,9,10,11,12,13,14,15,16,17,18,24,19,20,21,22,23]의24방향이 일치한다.

원본의171 coarse 관찰 중 최종prefix가 달라지는22·23·24획27프레임은 제외했다. 유효원본144+이전보정4·5획의동일prefix18+최종last6의새54=216프레임 PASS. Fine최종10획[1,4,5,8,10,14,16,19,21,24]은 모두실제DOM너비520·99.99→100% PASS. 원본상속은[1,8,10,14,16]5획만이고4·5보정2획과최종19·21·24새3획을더했다. 원본20fold·24dot의fine는상속하지않았다. core8+선택4·5는검토했고선택9·15는미검토다. 24획·24마스크이므로마스크간경계는없다. 21획실제재생text3.1763%→자연완료100% PASS.

Root의앞선두순서제안은19~24획을오독한오류였다. 중간제안의native19가하단H·24가DOT임을확인해FAIL로제외했다. 원본rawcall·compiledbounds를독립대조해원본19왼V·20Hfold·21중V·22오른V·23하단H·24윗DOT을확정하고last6[24,19,20,21,22,23]으로보정했다. 바뀐제안마다source검사1회씩총3회·guard거부72건을기록한다. 통과한source검사를native승인으로확대하지않고이전제안은보존했다.

원본20·strict4·order5·실제공유renderer3과historical source-only pending/nativefalse/runtimefalse기록은보존한다. Full5정확SHA·필수3/4인자·원본outer6→inner3계약을유지하고원본24개마스크목록만순열로재배치했다. 24획·24마스크·41polygon의경로·좌표·폭·weight를합성하거나변경하지않았다. Frozen8records·5roots·providers0·aliases와원본license를보존하며license는rawfixture에서만검증한다.

집중테스트3/3·verifier구문검사·root registry 실제verifier를각각1회실행해모두PASS했다. 原20·strict4·order5·shared3의핀과최종순열각penSHA·실제衋24획단일등록및23·25획미등록을확인했다. 앱자동재생UI는이번회차검증하지않았다. 빌드·전체테스트·서버·Git 실행없음.

실제1012checkpoint가부모다. 누적5,515/5,978자·미적용463자·보류298자를상속한다. Compact목록생략은삭제가아니다. 다음은1014鞙16획이다.
