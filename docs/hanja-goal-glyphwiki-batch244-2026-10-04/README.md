# Batch244 — 菁 12획 적용

국내 사전의 12획 방향·누적 자형·완성 자형을 Codex 브라우저 패널에서 비교하고, 획당 9개 진행 프레임 전체 108개를 실제로 관찰했다. 정확한 whole-glyph u83c1-k 및 선언된 6개 archive record만 사용했다. 교육 사전 교차검토이며 시험 주관 기관의 공식 승인은 아니다.

Exact whole u83c1-k/u83c1-var-002 and declared ufa5e-03/u8279-k03/u9751/u9fb6-03 from pinned archive. Original13 raw groups14 drawing primitives,Q1/C0 and original coordinates/polygons/default mincho preserved. Domestic grass order swaps raw2/3; middle horizontals precede raw5 vertical (source order raw4/raw6/raw5/raw7). Domestic10 fold joins raw9/10 at143,121.12 and preserves continuous line/line/curve ending in the original left hook. Normalize200to100/winding only; no inferred geometry, reversal, width changes, radical transplant or latest substitution.

metadata.json은 최초 비교 시점의 provisional capture이며, 최종 승인은 progressive-review.json의 12획·108프레임 검토 및 검증 결과에 기록했다. 초기 캡처를 승인 기록으로 오인하지 않는다.

원본 8개 엔진 파일 해시와 경로 재현 대조, 322개 파일·1,484개 테스트, 격리 production build 및 TypeScript 검사를 통과했다. 런타임 포함 17개 입력의 해시가 빌드 전후 동일하며 3개 정적 배포 파일이 바이트 단위로 일치했다.

430×932 모바일 브라우저 패널에서 학습 자동재생·다시 재생과 쓰기 연습 자동재생·다시 재생 모두 1→12획을 관찰했다. 캔버스는 338×338, 정적 오버레이 0개/애니메이션 SVG 1개였다. 재생 버튼을 DOM locator로 누르면서 시트 스크롤이 126으로 이동해, 그 후 네이티브 드로잉을 다시 수행하여 입력 전후 캔버스·시트 위치와 스크롤 126이 유지되고 0→1→0획이 되는 것을 확인했다. touch-action:none, data-vaul-no-drag 및 콘솔 오류 0개를 확인했다. private graphics는 RAM에만 유지했고 저장하지 않았다.

현재 실제 공유 런타임은 **5107/5978 (85.4%)**, 미적용 **871자**. 특급II 950/1150 (82.6%), 미적용 200자. 보류 legacy112자 목록과 다른 세션의 파일은 변경하지 않았다.

다음 후보는 **菅 12획**. 정확한 whole-glyph u83c5-k의 선언된 8개 의존 record를 확보했으며 누락과 literal revision 추가는 없다. 아직 국내 필순·진행 프레임·런타임 적용을 승인하지 않았다. 새 배치 시작 시 실제 미적용 상태를 재확인하고 브라우저 패널 검토부터 진행한다. 絪은 연속된 첫 두 꺾임을 제공하는 새로운 whole-glyph 근거가 확보될 때만 재시도한다.

커밋 메시지: `feat(hanja): add reviewed 菁 stroke animation`
