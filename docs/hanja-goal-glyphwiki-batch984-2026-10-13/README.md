# 敝 · batch984 source 보류

국내 목록 12획과 기존 국내 사전 snapshot 11획이 다릅니다. 원본의 수치상 후보가 있더라도 이 충돌을 해결하지 않고 활성화하지 않습니다.

| captured root | raw | 연속 최소 | 정확한 연속 접점 (1-based) |
|---|---:|---:|---|
| u655d-03 | 13 | 12 | 5/6 |
| u655d-ue0102 | 13 | 12 | 5/6 |
| u655d-g | 12 | 11 | 4/5 |
| u655d-ue0103 | 12 | 11 | 3/4 |
| u655d-03-var-001 | 13 | 12 | 5/6 |
| u655d-ue0104 | 13 | 12 | 5/6 |
| u655d-var-002 | 13 | 12 | 5/6 |
| u655d | 13 | 12 | 5/6 |
| u655d-var-003 | 13 | 12 | 5/6 |
| u655d-03-var-004 | 12 | 11 | 4/5 |
| u655d-07-itaiji-001 | 미완전 | — | missing u5182-j |
| u655d-itaiji-001 | 15 | 14 | 5/6 |
| u655d-var-001 | 13 | 12 | 5/6 |
| u655d-03-var-002 | 12 | 11 | 4/5 |
| u655d-ue0100 | 13 | 12 | 5/6 |
| u655d-ue0101 | 12 | 11 | 3/4 |
| u655d-g03 | 12 | 11 | 4/5 |

raw 내부 call 연결과 trace/polygon 보존을 원본에서 확인했습니다. 비연속 endpoint 접촉도 source-hold.json에 별도로 기록했으며, 국내 한 획의 경계로 승인하지 않았습니다. 모든 좌표 비교는 strict equality이고 삭제·반전·보간·새 connector를 사용하지 않았습니다. 미완전 source는 후보로 승격하지 않습니다.

새 compiler·native 검토·서버·빌드·Git 작업은 하지 않았습니다. 원본 source·metadata·NOTICE·helper·계약과 기존 byte pin은 보존합니다. Native whole·방향·프레임·fine·재생 검토는 모두 0이며 runtime 미적용입니다.

canonical939~959의 기존 보류에서 이 glyph/root의 중복은 없었습니다. 기존 source preflight는 canonical 보류 계수가 아닙니다. 이 조사에서 resume와 누적 계수는 만들지 않았으며 root가 순서대로 확정합니다.
