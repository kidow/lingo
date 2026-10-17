# Batch985 蒲 — 호환 원본의 획수 불일치 보류

2026-10-17 root 브라우저 패널에서 whole6개를 모두 실제 관찰했다. K·VS2는 분리된 네 획 풀초와 甫의 점이 있어 국내 자형과 호환된다. Base·VS0·VS1은 연결된 풀초라 비호환이며 VS3은 연결된 풀초와 누락된 甫 점으로 비호환이다.

호환 K·VS2 proof는 byte가 동일하다. 원본16raw·17calls·30polygon에서 exact 연속 연결은 raw11→12 및 raw12 내부 line→curve뿐이다. 최소15획이므로 국내14획을 맞출 수 없다. 水 raw6 끝[38.675,184.32]와 raw7 시작[34.6,159.5]는25.1522966 떨어져 있다. 연결되지 않은 획을 합치거나 좌표·경로·폭·mask를 수정해14획으로 만들지 않았다. 원본 compiler의14획 프로필은 whole이 비호환인 base·VS0·VS1뿐이다.

필순·coarse·fine·실제 재생 검토는 모두0이다. Whole의 호환 판정만 기록하며 native/runtime 승인은 하지 않는다. 새K 프로필이나 helper를 만들지 않았다. 원본24파일과 whole6개·고정입력11pin을 보존한다. 사전 SVG·이미지는 디스크에 저장하지 않았다.

실제984 checkpoint와 canonical939까지46 checkpoint·기존283개 보류의 문자열 및 객체를 대조해 蒲/u84b2 중복0을 확인했다. 새 보류1개를 더해284개다. 누적 runtime5,501/5,978·미적용477은 변하지 않는다. Compact checkpoint의 목록 생략은 기존 보류 삭제가 아니다. 다음은986炰9획이다.

새4파일·원본24pin·parentSHA·holdSHA·실제 runtime lookupnull 및 registry등록0 집중 검증을1회 실행해 PASS했다. 빌드·전체 테스트·서버·Git 실행 없음. 현재 검토 서버49832는 root가 관리한다.
