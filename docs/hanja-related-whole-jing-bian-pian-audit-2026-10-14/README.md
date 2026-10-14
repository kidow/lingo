# 靚·褊·諞 고정 원본 whole 조사 — 2026-10-14

공개 고정 archive의 실제 related 식별자 19개를 8개 고정 engine으로 RAM에서 재현했습니다. 기존 원본·compiler·runtime·native 보류는 변경하지 않았습니다. 현재 GlyphWiki 페이지는 접근 실패했으며 archive 원본만 근거로 삼았습니다.

| 글자 | source 조사 결과 | 남은 위험 |
|---|---|---|
| 靚15 | `u975a`·`u975a-var-001`·`toki-01084520`의 원본 내부 수직이 가로획에 닿는 靑 특징 확인. `u975a-ue0103`은 toki와 duplicate | 세 whole의 상부 source1–4 순서는 H→H→H→V. 국내 전체 순서·방향·whole·mask 경계·frame/replay 미검토 |
| 褊14 | `hkcs_u890a`의 source6은 원본 짧은 오른쪽 아래 Q 점. 기존 긴 戸 가로획과 다른 source 특징 | source6의 국내 pen 대응과 衤/扁 전체 검토 미완료 |
| 諞16 | 실제 related3종에서 원하는 짧은 오른쪽 첫 획 미확인, viable0 | j78/koseki는 같은 왼쪽 Q, base는 긴 가로획. 기존 보류 유지 |

靚 base/var-001의 見 원본이 달라 전체 geometry도 다릅니다(34/32 polygons). toki/VS3는 같은36 polygons입니다. HKCS 靚은 이름의 related가 靑이더라도 실제 두 내부 가로획을 사용하므로 제외했습니다. part-like 두 원본의10획도 靚15 whole 후보로 승격하지 않았습니다.

source 특징을 확인한 **distinct whole4개**는 후속 source-only 준비 대상으로만 제안합니다. 숫자 일치·public related 이름·부품 형태만으로 native 승인하지 않습니다. 원본 부품 조합·좌표/폭/방향 수정·latest 의존성 치환은 없습니다. 실제 graph에 explicit `@version` 의존성은 없었으며 bare 누락도 없었습니다.

근거: [고정 archive](https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt), [고정 engine](https://github.com/kamichikoichi/kage-engine/tree/49232bac0348fe815f4200d4116ab7917e0db47f). root·source body·geometry·의존성 manifest SHA, duplicate, 원본 primitive 특징, 기존 보류 문서 SHA는 [findings.json](findings.json)에 기록했습니다.

`findings.json` SHA256: `6b478fdd93388ed5876b68f8ff5e608a88aa8ddc432fab41ac41c8fa0511d32b`
