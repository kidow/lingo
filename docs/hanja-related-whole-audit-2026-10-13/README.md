# 관련 whole 원본 조사 — 2026-10-13

완료한 네 조사를 [findings.json](findings.json)에 기록했다. **native 신규 승인 0개**이며 기존 보류는 유지한다. 鶂만 새 source-only 숫자 후보를 [batch1105](../hanja-goal-glyphwiki-batch1105-2026-10-13/)로 준비했다. 19획 수치 일치와 원본 재현은 전체 모양·순서·방향·frame·replay 승인이나 runtime 적용을 뜻하지 않는다.

## 조사 범위와 결과

| 조사 | 요청 대상 | 실제 exact-related 조사 | 결과 |
|---|---:|---:|---|
| 鶂·卼·盌 | 3 | 3 | 鶂 `koseki-532530@2` source-only 후보 1개. 卼·盌 blocker 유지 |
| 807 등: 樲·絪·邅·紾·迭·絰·澯·觶·豝·茷 | 10 | 8 | 실질 blocker를 해결한 새 whole 0개 |
| 777 등: 鍮·諛·諭·愉·萸·滺·褎·楰·緌·玧 | 10 | 10 | 새 geometry 16개를 재현했으나 실질 blocker를 해결한 whole 0개 |
| 794 등: 奫·阭·繘·鴥·瀜·溵·扆·蔗 | 8 | 8 | 새 geometry 8개를 재현했으나 실질 blocker를 해결한 whole 0개 |

觶·豝는 두 번째 조사에서 runtime 미적용만 확인했고 exact-related inventory는 수행하지 않았다. 완료로 승격하지 않는다. 실제 폴더 번호는 豝977·茷979이며 요청에서 추정한 번호와 구분했다. 두 번째·세 번째 조사 당시 최종 확인은 5413/5978 적용, 565 미적용이었다. 이 수치는 조사 시점 snapshot이다. 네 번째 조사는 별도로 5414/5978 적용, 564 미적용을 관측했으며 대상8자는 모두 미적용이었다. 합계31개 요청 대상 중 실제 inventory29개·runtime 확인만2개이며, 이번 조사에 따른 신규 native 승인·적용은0개다.

## 확인한 주요 원본

- 鶂: 고정 archive의 `koseki-532530`와 실제 API `koseki-532530@2` 원본·identity가 일치한다. 5개 closure records, 명시 history 2개, raw22/draw25/polygon43, authored19그룹이며 내부 gap이 없다. 원본의 bird→儿 선언 순서는 유지했지만 국내 순서는 미검토다. 이전715 hold와 전방향 승인0을 유지한다.
- 卼: `koseki-033210`은 10그룹/국내9이며 기존 `u5140-01-var-001` 문제를 유지한다. 盌 `zihai-106808`은 死 모양 상부와 11그룹/국내10이다. 명시 현대 root를 추가 확인해도 기존 lower blocker를 해결하지 못했다. bare missing 의존성은 latest로 대체하지 않았다.
- 絪 `zihai-131501`: 13그룹/국내12. 澯 `juki-b4cc`: 17그룹/국내16. 迭 `koseki-438650`: 숫자9지만 기존 `ufa66`의 `(55,151)→(53,149)` 분리를 유지한다.
- 鍮·諭·愉의 HKCS whole는 각각17·16·12그룹이지만 공통 `hkcs_u4fde-02`가 가로 月 내부 두 획과 직선 刂를 사용한다. 국내 점 모양 月·巜 기준을 충족하지 않는다. 명시 `$0` 구분행 두 개는 geometry가 없는 구분행으로 제외했다.
- 緌 `extf-05792`는 `u7e9f`(纟)를 사용한다. raw14를 국내 糸의14획 승인으로 볼 수 없다. 다른 신규 원본은 횟수 불일치이며 諛의 관련 원본은 모두 기존 whole geometry와 중복했다.

- 네 번째 조사: 奫에는 새 exact-related whole가 없었고 瀜·溵의 추가 이름은 기존 전체 geometry와 중복했다. 阭 두 원본은8/국내7, 繘의 실제 archive IDS 원본은26/18, 鴥 `ebag_s196-026`의 명시 whole alias `u2b6e3`는11/16, 扆 `toki-01035000`은11/10그룹이다.
- 蔗 `koseki-359410`은15그룹이지만 second 灬 dot `(83.58,155.3608)→(93.42,180.912)`가 기존 base/k와 같은 down-right이다. 국내 pen13의 down-left를 해결하지 않는다. `j78-6874`도14그룹·해당 dot down-right이며 `zihai-101815`는11그룹·다른 몸체다. 명시 history `u2ff1-u9fb7-u706c@2`·`u5eb6@5`·`u5e7f@2`만 정확한 identity로 재현했으며 bare latest를 대체하지 않았다.

원본 data SHA256, 새 geometry SHA256, 중복 이름, exact endpoint 연결과 gap, 수치 기준·위험은 JSON에 있다. 내부 primitive gap0은 서로 다른 raw 사이의 gap0을 의미하지 않는다. authored join만 수치에 합산했으며 incidental 외곽 closing은 제외했다. 좌표 변경·보간·연결선 작성·방향 역전은 하지 않았다.

## 원본과 검증 범위

[고정 GlyphWiki archive](https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt) revision은 `a7dd7f3d911936770fa742e8c37d16bee7e2173c`, SHA256은 `7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62`이다. [KAGE engine](https://github.com/kamichikoichi/kage-engine/tree/49232bac0348fe815f4200d4116ab7917e0db47f) revision과 8개 원본 파일 SHA는 JSON에 고정했다. 실제 archive·engine SHA를 검증한 뒤 RAM에서 원본을 재현했다.

현재 GlyphWiki 페이지는 web 도구 접근에 실패했다. 현재 페이지 내용을 고정 archive identity의 근거로 사용하지 않았다. 첫 조사에서 확인한 공식 CNS [鶂](https://www.cns11643.gov.tw/wordView.jsp?ID=157785)·[卼](https://www.cns11643.gov.tw/wordView.jsp?ID=141623)·[盌](https://www.cns11643.gov.tw/wordView.jsp?ID=209499) 자료에는 글자·획순 텍스트와 font/PNG 참조가 있었으나 사용 가능한 per-stroke vector 경로는 확인하지 못했다.

1105의 public sources·engine proof·metadata·compiler 분석·capture 검증 파일 SHA를 JSON에 참조했다. private SVG·이미지·화면·전체 원본 그래픽은 이 문서에 포함하지 않았으며 저장·외부 전송하지 않았다. 이번 문서화에서 source/runtime/native 파일, 빌드, JEV, 커밋은 수행하지 않았다.

