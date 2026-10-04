# Batch245 — 菅 12획 적용

국내 사전의 12획 방향·누적 자형·완성 자형을 Codex 브라우저 패널에서 비교하고, 획당 9개 진행 프레임 전체 108개를 실제로 관찰했다. 정확한 whole-glyph u83c5-k 및 선언된 8개 archive record만 사용했다. 교육 사전 교차검토이며 시험 주관 기관의 공식 승인은 아니다.

Exact whole u83c5-k/u83c5-var-001 and declared ufa5e-03/u8279-k03/u5b98/u5b80-03/u5196-03/u382f from pinned archive. Original15 raw groups15 drawing primitives,Q2/C0 and original coordinates/polygons/default mincho preserved. Domestic grass order swaps raw2/3. Domestic7 roof joins raw6/7 at176.36,72.41855; domestic9 fold joins raw9/10 at144.84,93.22550000000001; domestic11 fold joins raw12/13 at153.705,142.54649999999998. Normalize200to100/winding only; no inferred geometry, reversal, width changes, radical transplant or latest substitution.

metadata.json은 최초 비교 시점의 provisional capture이며, 최종 승인은 progressive-review.json과 검증 결과에 기록했다. 초기 캡처를 승인 기록으로 오인하지 않는다.

원본 8개 엔진 파일의 해시와 경로 재현 대조, 323개 파일·1,487개 테스트, 격리 production build 및 TypeScript 검사를 통과했다. 19개 입력의 해시가 빌드 전후 동일하며 4개 정적 배포 파일이 바이트 단위로 일치했다. 이전 睍의 NOTICE 두 곳에 남았던 琸 설명을 실제 睍 runtime geometryLicense.modifications와 동일한 문구로 보정했다. 원래의 睍 데이터·검토 승인은 변경하지 않았다.

430×932 모바일 브라우저 패널에서 학습 자동재생·다시 재생과 쓰기 연습 자동재생·다시 재생 모두 1→12획을 관찰했다. 캔버스338×338(x46,y288.8046875), 시트430×792.1953125(x0,y139.8046875), 입력0→1→0, 스크롤0을 드로잉 전후 유지했다. 정적 오버레이0개/애니메이션SVG1개, touch-action:none, data-vaul-no-drag, 콘솔 오류0개를 확인했다. private graphics는 RAM에만 유지했고 저장하지 않았다.

현재 실제 공유 런타임은 **5108/5978 (85.4%)**, 미적용 **870자**. 특급II 951/1150 (82.7%), 미적용 199자. 보류 legacy112자 목록과 다른 세션 파일은 보존했다.

다음 후보는 **菉 12획**. 정확한 whole-glyph u83c9-k의 선언된 5개 의존 record를 확보했으며 누락과 literal revision 추가는 없다. 아직 국내 필순·진행 프레임·런타임 적용을 승인하지 않았다. 새 배치 시작 시 실제 미적용 상태를 재확인하고 브라우저 패널 검토부터 진행한다. 絪은 연속된 첫 두 꺾임을 제공하는 새로운 whole-glyph 근거가 확보될 때만 재시도한다.

커밋 메시지: `feat(hanja): add reviewed 菅 stroke animation`
