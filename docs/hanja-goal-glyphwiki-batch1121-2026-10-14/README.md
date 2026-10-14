# 菱 고정 출처 재검토

- 고정 GlyphWiki archive와8개 고정 KAGE engine을 정확히 재현했고 모든 명시 history를 확인했습니다.
- 전체 자형 10종, records20개를 확보했습니다. 국내 사전 SVG는 RAM에서 표제·clip수·byte SHA만 검증했습니다.
- 카탈로그 12획 / 국내 사전 11획을 별도로 보존합니다.
- 획수 차이와 이전 보류 근거를 유지합니다. 획별 컴파일러는 만들지 않았습니다.
- 원본 좌표·폭·path를 변경하거나 다른 전체자형을 섞지 않았습니다. runtime/build/commit은 실행하지 않았습니다.

원본 archive: https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt

재현: verify-source.mjs. public/source byte identity와 원본 engine 재현 PASS는 native 승인과 별개입니다.
