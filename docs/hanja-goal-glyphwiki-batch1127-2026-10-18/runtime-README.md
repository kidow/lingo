# 玿1127 runtime

선택u73bf의9획·10mask·19polygon입니다. 기존657의5획 LEFT-tail 끝부분을 원polygon 그대로 별도mask로 분리했습니다. 원outline union·body guide/width/weight·다른mask는 유지되며 targetmask분해는 바뀝니다.

root native:whole1(국내/원본/보정)·9방향·81coarse·520px fine4/5/6/8·5획0→epsilon·경계.8928777260195087전중후/95·자연재생4.28375→100 PASS. 다른whole와다른실험후보 승인은 없습니다. app자동재생은 이번검증대상이 아닙니다.

공개실험fixture를 재사용하므로 runtime준비컴파일0/engine0입니다. source실험657 positive1은 별도기록이며 첫baseline29a14e…7285b는 새capture로서 옛독립compiled hash가 아닙니다. 원657관련20핀+실험8핀을 보존합니다.

실제1126부모26f89cb3…8035a8의5569/409·historical343/resolved16/active327에서 기존657 object1을 회복했습니다. 집중3/3·verifier구문1회 및 root실제등록검증1회 모두exit0 PASS입니다. 실제5570/408·historical343/resolved17/active326, canonical184refs를 확인했습니다. 玿9획 lookup과8/10획 null도 통과했습니다.

집중검사:rtk proxy node --experimental-strip-types --test lib/hanja-stroke-dictionary-glyphwiki-batch1127.test.ts
verifier구문:rtk proxy node --check docs/hanja-goal-glyphwiki-batch1127-2026-10-18/verify-runtime.mjs
root실제등록검증:rtk proxy node --experimental-strip-types docs/hanja-goal-glyphwiki-batch1127-2026-10-18/verify-runtime.mjs

productionbuild/typecheck/fullsuite/push/server는 실행하지 않습니다.
