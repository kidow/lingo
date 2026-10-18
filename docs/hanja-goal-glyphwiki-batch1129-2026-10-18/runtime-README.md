# 祔1129 runtime

선택u7954의10획·11mask·25polygon입니다. 원9번째획의 LEFT-tail 원polygon만 별도mask로 분리했습니다. 원outline union·body guide/width/weight·다른mask는 보존하며 targetmask분해와 그bodybounds는 바뀝니다. 새로운획기하는 생성하지 않았습니다.

root native:whole1(국내/원본/보정)·10방향·90coarse·520px fine3/4/5/6/9/10·9획0→epsilon·경계.9247886572011831전중후/95·자연재생2.93625→100 PASS. 선택u7954만 승인, 다른whole와app자동재생은 미검토입니다.

공개frozenfixture를 그대로 읽어 runtime준비컴파일0/engine0입니다. 기존source실험605 positive1과 firstbaseline60916a…898f는 별도기록이며 옛독립compiled hash를 주장하지 않습니다. 원605관련23핀·실험8핀은 유지합니다.

실제1128부모3ee7510d…bf743의5571/407·historical343/resolved18/active325에서 기존605 object1을 회복했습니다. root실제등록검증1회exit0 PASS로 실제5572/406·historical343/resolved19/active324·canonical186refs를 확인했습니다.

집중검사:첫회 geometry/source2건PASS·loader음성테스트1건harnessFAIL(기존값2재대입). 해당변이만+=1로수정하여 실패subtest만1회재실행PASS했습니다. 총2실행으로서로다른3검사PASS,fixture/geometry불변입니다. verifier구문은1회exit0입니다.
집중검사명령:rtk proxy node --experimental-strip-types --test lib/hanja-stroke-dictionary-glyphwiki-batch1129.test.ts
구문:rtk proxy node --check docs/hanja-goal-glyphwiki-batch1129-2026-10-18/verify-runtime.mjs
root실제등록검증:rtk proxy node --experimental-strip-types docs/hanja-goal-glyphwiki-batch1129-2026-10-18/verify-runtime.mjs

productionbuild/typecheck/fullsuite/push/server는 실행하지 않습니다.
