# 敭 획 애니메이션 검토 · batch259

Codex 브라우저 패널에서 국내 사전 13획의 방향·누적·완성 자형과 117개 진행 프레임을 모두 확인했다. 마지막 획 실제 재생 28%/36%→100%도 확인했다. 사전 대조 결과이며 시험 주관 기관의 공식 승인은 아니다.

All13 domestic directions/cumulative/full form and117 progressive frames reviewed in Codex in-app browser. Exact whole u656d-k/u656d/u661c/u65e5/u6535-02 from pinned archive. Original15 raw groups16 drawing primitives,Q8/C0 and original coordinates/polygons/default mincho preserved. Domestic2 follows continuous raw1/2 at85.3677,25.3098. Domestic7 follows raw7 line to raw8 two curves at92.205,117.23 and87.43303588018591,169.66147253061425. Original source order preserved. All original curve controls and source terminal decorations preserved. Normalize200to100/winding only; no inferred geometry, reversal, width changes, radical transplant or latest substitution.

metadata.json은 후보 기록이며 progressive-review.json과 verify.mjs가 최종 검증이다. 사전 그래픽은 RAM에서만 대조하며 저장·배포하지 않는다. 라이선스와 편집 가능한 전체 원본은 NOTICE.md 및 공개 656d.json에 기록했다.

전용 스냅샷 250923d2bbaef92e7d63f42ee6a1f87603c27c3d에서 334개 테스트 파일 1,520개 검사·원본 엔진 8개 해시 및 경로 재현·Next 16.3.3 배포 빌드·17개 입력 해시·공개 산출물 3개 바이트 비교를 통과했다.

모바일 430×932에서 소개·쓰기 자동재생 및 다시 재생 1→13을 확인했다. 시트 430×792.195, 캔버스 338×338이며 입력 0→1→0 전후 위치·스크롤 0이 그대로였다. 정적 이미지 0·애니메이션 SVG 1·콘솔 오류 0이다. 소유 탭 32·33과 서버 3개를 정리하고 뷰포트를 초기화했다. 모바일 RAM 서버는 context runner 종료 후 리스너 부재를 확인했다.

누적 5,119/5,978자 85.6%, 미적용 859자. 특급II 962/1,150자 83.7%, 미적용 188자. 다음 暐 13획의 정확한 전체 원본 4개와 엔진 경로를 확보했다. 국내 전 획 대조는 미완료다. 다른 세션 파일과 스테이징·기존 보류 112자는 유지했다.

커밋 메시지: feat(hanja): add reviewed 敭 stroke animation
