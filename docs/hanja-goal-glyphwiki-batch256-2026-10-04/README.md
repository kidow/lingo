# 寗 획 애니메이션 검토 · batch256

Codex 브라우저 패널에서 국내 사전 13획의 방향·누적·완성 자형과 117개 진행 프레임을 모두 확인했다. 마지막 획 실제 재생 26%/46%→100%도 확인했다. 사전 대조 결과이며 시험 주관 기관의 공식 승인은 아니다.

All13 domestic directions/cumulative/full form and117 progressive frames reviewed in Codex in-app browser. Exact whole u5bd7/u5b93-03/u5b80-03/u5196-03/j78-5147 from pinned archive. Original15 raw groups18 drawing primitives,Q8/C0 and original coordinates/polygons/default mincho preserved. Domestic3 continuous raw2/3 at176,34.4743125. Domestic6 original line/curve/line at68,76.875 and78,86.875. Domestic10 continuous raw12/13 at151,112.92 with original down/left hook at151,174.16. Domestic9..12 follows raw11,12/13,10,9; source j78-5147 preserves two full-width lower horizontals and central vertical ends at last horizontal. Initial u5bd7-k lower short horizontal rejected; no component transplant. Normalize200to100/winding only; no inferred geometry, reversal, width changes or latest substitution.

초기 u5bd7-k 후보의 짧은 내부 가로획을 국내 자형과 대조해 제외했다. 7개 전체 후보를 조사한 뒤 선언된 j78-5147을 포함한 전체 u5bd7 원본을 선택했다. 초기 원본·엔진 결과·경로는 initial-k-* 파일에 보존했다. 다른 글자의 부수를 옮기거나 경로를 추정하지 않았다.

metadata.json은 후보 기록이며 progressive-review.json과 verify.mjs가 최종 검증이다. 사전 그래픽은 RAM에서만 대조하며 저장·배포하지 않는다. 라이선스와 편집 가능한 전체 원본은 NOTICE.md 및 공개 5bd7.json에 기록했다.

전용 스냅샷 89d6c4defbb42914fa7b921e2e877c27a65050cf에서 332개 테스트 파일 1514개 검사·원본 엔진 8개 해시 및 경로 재현·Next16.3.3 배포 빌드·21개 입력 해시·공개 산출물 3개 바이트 비교를 통과했다.

모바일 430×932에서 소개·쓰기 자동재생 및 다시재생 1→13을 확인했다. 시트 430×792.195, 캔버스 338×338이며 입력 0→1→0 전후 위치·스크롤 0이 그대로였다. 정적 이미지 0·애니메이션 SVG 1·콘솔 오류 0이다. 소유 탭27·28과 서버를 정리하고 뷰포트를 초기화했다.

누적 5117/5978자 85.6%, 미적용 861자. 특급II 960/1150자 83.5%, 미적용 190자. 다음 愰 13획의 정확한 전체 원본 6개와 엔진 경로를 확보했다. 국내 전 획 대조는 미완료다. 다른 세션 파일과 스테이징·기존 보류 112자는 유지했다.

커밋 메시지: feat(hanja): add reviewed 寗 stroke animation
