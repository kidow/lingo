# Batch1008 巘 — partial native hold

2026-10-18 root 브라우저 패널에서 base·VS0 whole 2개를 실제 관찰해 모두 국내 자형과 호환됨을 확인했다. 23방향을 관찰했으나 6·7획 순서가 서로 바뀌어 전체 필순은 승인하지 않았다. 순서 adapter는 만들지 않았다.

실제 DOM 너비520에서 99.99→100%를 관찰한 7획 중 3·9·11·12·15·17획은 PASS, 2획은 FAIL이다. 실제 2획은 山의 L자 획이며 100%에서 왼쪽 아래에 큰 삼각형이 갑자기 나타난다. 추가100×120 RAM 모서리 확대를100%·99.99%로 비교해 같은 문제를 확인했다. 이미지 파일은 저장하지 않았다. 이전 정적 audit의 “3·11획 pure L” 분류는 틀렸으며, 실제3·11획은 수직획이다. native 화면의 1부터 시작하는 번호를 기준으로 이번 기록을 정정한다.

coarse·마스크 경계·실제 재생·나머지 fine은 검토하지 않았다. 부분 PASS를 전체 승인이나 runtime 적용으로 확대하지 않는다. 원본 좌표·폭·경로·polygons·기존 helper와 readiness의 pending 기록을 보존한다.

source-only 대조에서 두 whole의 2획 원본 raw[1,2] call·args·polygon 배열 SHA가 각각 동일하다. 이는 두 captured profile 사이에서 별개의 2획 원본 geometry를 확보하지 못했다는 제약이며, 컴파일 또는 대안 native 검증 결과가 아니다. 새 경로나 폭 보정·임의 연결은 하지 않았다.

원본17파일과 실제 의존 공유 renderer3파일(국내자료 renderer2·candidate renderer1)의 SHA를 보존한다. 사용하지 않은 대안 helper를 새 의존성으로 추가하지 않는다.

실제1007 부모 SHA·hold SHA·원본17·공유 renderer3·canonical69 checkpoint의 기존296보류 중 巘 중복0·실제 registry lookup null을 집중검사1회로 확인해 PASS했다. 누적5,511/5,978자·미적용467자·보류297자이며 이번 보류1자만 추가했다. Compact 보류목록 생략은 삭제가 아니다. 다음은1009 玁 23획이다. 빌드·서버·Git 실행 없음.
