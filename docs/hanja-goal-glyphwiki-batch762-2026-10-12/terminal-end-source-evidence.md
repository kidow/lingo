# 稢 7·8·11획 끝부분 원본 검토

공개 고정 엔진 8파일 해시 확인 및 실제 3개 호출 출력 재현을 통과했습니다. 13펜·13마스크 기존 후보와 13펜·14마스크 꼬리 분리 evidence 후보 모두 원본 polygon 29개를 정확히 한 번씩 보존합니다. 다른 12펜은 동일하며 변조 4건을 거부했습니다. 브라우저 승인은 아직 없습니다.

출처: [kagecd.js 고정 원본](https://github.com/kamichikoichi/kage-engine/blob/49232bac0348fe815f4200d4116ab7917e0db47f/kagecd.js).

7획 raw6 terminal13은 [768–771행](https://github.com/kamichikoichi/kage-engine/blob/49232bac0348fe815f4200d4116ab7917e0db47f/kagecd.js#L768)의 kAdjustKakatoL[0]=14 규칙입니다. y122 끝점의 원본 바닥 y136·142가 down bounds [42.05,36.5,48.05,71]에 포함됩니다. 99.99%→100% 잔여 높이는 정규화 0.00345이며 전체 끝 polygon을 갑자기 추가하는 구조가 아닙니다.

8획 raw8 terminal323은 [772–775행](https://github.com/kamichikoichi/kage-engine/blob/49232bac0348fe815f4200d4116ab7917e0db47f/kagecd.js#L772)의 kAdjustKakatoR[3]=2 규칙입니다. y122 끝점의 원본 바닥 y124·130을 포함해 H→V 전체 원본 꼭짓점의 중심선 최소거리 최대가 정규화5.46으로 마스크 radius7 이내입니다. 이 수치는 브라우저 관찰을 대체하지 않습니다.

11획 raw11은 cdDrawBezier→cdDrawCurveU의 [571–585행 terminal15](https://github.com/kamichikoichi/kage-engine/blob/49232bac0348fe815f4200d4116ab7917e0db47f/kagecd.js#L571)입니다. 噳의 Line terminal5와 다른 공식입니다. width6, kWidth5에서 tip y180−6−25=149, base y180−6+1=175이므로 높이는26입니다. 마지막 원본 polygon [(181.3,175),(183.3,149),(181.3,149),(175.3,175)]를 같은 획의 추가 up mask로 분리하면 bounds [87.65,74.5,91.65,87.5], weight13을 사용할 수 있습니다. 새 중심선이나 좌표를 만들지 않고 원래 B 경로와 revealWidth14를 유지합니다.

기존 B tip 2개의 중심선 최소거리는 정규화 약12.981159·12.097093으로 radius7보다 큽니다. 따라서 현재 마지막 프레임에서 새로 나타날 영역이 있습니다. 꼬리를 제외한 body 꼭짓점 최대거리는 약4.472699입니다. 수치는 8192개 샘플과80회 구간 보정으로 계산한 분석값이며, 전체 거리의 수학적 증명이나 브라우저 승인으로 표현하지 않습니다.

terminal15-candidate-evidence.mjs는 evidence 전용이며 기존 progressive.mjs를 변경하지 않았습니다. verify-terminal-end-evidence.mjs가 공개 출처 질의·엔진 실행·전체 polygon 일치·변조 거부·수치 분석을 재현합니다. 재검토하려면 부모 검증 화면에서 이 후보를 명시적으로 사용해야 합니다. 빌드·런타임 등록·커밋·사전 이미지 사용을 수행하지 않았습니다.
