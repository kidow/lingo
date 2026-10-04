# 詵 13획 적용 · batch270

국내13획 순서·방향·누적·완성 자형과117개 진행 장면을 Codex 브라우저 패널에서 확인했다. 원본의 비도형 제어항목 raw8만 재생에서 제외했다. 실제13획 순서와 원본 경로 좌표·방향은 그대로 보존했다.

All13 domestic directions/cumulative/full form and117 progressive frames reviewed in native Codex browser panel. Exact whole u8a75-k/u8a75/u8a01-01/u5148-02 from pinned archive. Original15 raw groups16 drawing primitives,Q3/C0 and original coordinates/polygons/default mincho preserved. Raw8 is an original non-drawing control (raw opcode0, no trace/polygons), not a pen stroke; only this empty control omitted from playback. Domestic6 raw5/6 continuous at63.19,132.6; domestic13 raw14 original line/curve/line continuous at143.87,168 and153.87,178. Full curve controls and terminal decorations retained. Normalize200to100 and polygon winding only; no inferred connector, reversal, width change, radical transplant or latest substitution.

공식 KAGE8파일 고정 해시로 원본4개 record·15raw·16drawing(Q3/C0) 재현 검사 통과. 口6획의 두 선과 儿13획의 선·곡선·선은 원본 접점이 이어진다. 비도형 raw8의 opcode0·빈 trace·빈 polygons를 명시적으로 검사했다. 사전 그래픽은 RAM 전용이며 사전 교차검토는 시험 주관기관 공식 승인을 뜻하지 않는다.

343파일·1,547테스트 실패0, Next16.3.3 빌드·타입 검사·17개 입력 해시 및3개 export 일치 통과. 검증 snapshot baabc0d0214b9f63200f6f6f29d1b9e6648d2990. 모바일430x932 학습 자동2→13, 다시 재생1→13, 쓰기 자동/다시 재생1→13. 캔버스338px, static img0/animated svg1, 입력0→1→0 중 시트 위치·scrollTop0 유지, 콘솔 오류 없음. 탭55·56과 전용 서버3개 정리.

전체5,128/5,978자85.8%, 미적용850자. 특급II971/1,150자84.4%, 미적용179자. 기존 보류112자와 타 세션 변경 보존. 다음 鉥13획은 전체 u9265-k와 선언된4개 원본 완전,13raw/16drawing(Q8/C0). 국내/진행 화면 검토 전으로 미등록이다.

커밋 메시지: feat(hanja): add reviewed 詵 stroke animation
