# 3급 妥~輝 50자 검토 — 2026-09-15

배정 데이터 50자·547획 중 **15자·97획을 적용**, 35자·450획은 보류했다.
영상 관찰은 총 545획이다. 幣는 배정 15획/영상 14획, 蔽는 배정 16획/영상 15획으로 달라 이번에 적용하지 않았다.

적용: **托 怠 匹 巷 亥 享 亨 兮 乎 互 弘 禾 丸 侯 毁**.
모두 Make Me a Hanzi 원본 경로를 전체 글자 단위로 대조한 결과이며 새 보정 레시피는 없다.

## 출처와 검토 범위

- [비상교육 고등 한문 교재](https://text.vivasam.com/detail/186)의 [공식 교재 뷰어](https://viewer.vivasam.com/qrviewer/viewer.html?qrcode=106502_171p_25_ST&teacher=false)를 기준으로 했다.
- XLSX 1,800행의 원본 해시와 각 글자에 대응하는 전체 MP4의 해시·바이트 수를 고정했다. 정확한 행·URL·후보 출처는 [queue.json](queue.json)에 있다.
- 전체 영상의 누적 획을 0.5초 간격으로 끝까지 보고, 후보의 누적 경로·시작점·끝점과 대조했다. 재생 선폭 5에서 연결·빈틈을 확인했으며 접합이 모호한 글자는 최종 자형을 확대했다.
- 濯·弘은 방향 확인을 위해 5 fps 구간을 추가로 보았다. 穫의 19번째 후보도 스크롤하여 확인했다.
- 완료 시각은 샘플링된 완료 상한이며 정확한 붓 떼기 시각이 아니다. 글자별 관찰과 보류 사유는 [observations.json](observations.json)에 기록했다.
- 출판사 자료와의 Codex 시각 대조이며 한국어문회 또는 전문가의 인증을 의미하지 않는다. 외국 경로 자료나 부수의 유사성만으로 승격하지 않았다.
- 출판사 영상과 프레임은 메모리에서만 처리했다. 저장소에는 영상·캡처를 복제하지 않았다. 후보 벡터의 기존 Arphic 라이선스는 유지한다.

## 결과와 재현

현재 누적 적용은 **1,764/5,978자**, 미적용은 **4,214자**다.
3급은 **263/317자 (83.0%)**, 미적용 **54자**다.
이번 보류 35자 외에 기존 보류 18자와 후속 대상 携 1자가 남아 있다.

- [prepare.mjs](prepare.mjs): 관찰 기록과 원본 벡터에서 승인된 15자의 레코드·경로를 읽기 전용으로 재구성.
- [originals.json](originals.json): 이번 50자의 고정된 후보 원본.
- [review.json](review.json), [candidate-paths.json](candidate-paths.json): 적용한 15자의 출처 기록과 경로.
- [baseline.json](baseline.json): 기존 누적 레코드를 보존했는지 검사할 배열 길이·해시.
- [verify.mjs](verify.mjs): 50자 범위, 관찰 시각, 경로 해시, 실제 적용·보류, 기존 배열 보존 검사.
- [verification.json](verification.json): 검증 결과. 전체 영상 50개 재확인, 배포 데이터 재구성 일치, 한자 테스트 36개 파일·231개 통과, 프로덕션 빌드 통과.

검증 명령: `node docs/hanja-g3-batch6-2026-09-15/verify.mjs --fresh`,
`node scripts/hanja-stroke-textbook-build.ts --check`, `pnpm run build`.

## 보류 목록

상세한 획 번호·수정 지점은 observations.json의 각 notes에 있다.
획수 차이를 맞추기 위해 임의로 획을 나누거나 합치지 않는다.

| 글자 | 배정 획수 | 관찰 획수 | 보류 분류 |
|---|---:|---:|---|
| 妥 | 7 | 7 | direction, glyph-form |
| 墮 | 15 | 15 | glyph-form |
| 濁 | 16 | 16 | glyph-form |
| 濯 | 17 | 17 | direction, glyph-form |
| 誕 | 14 | 14 | stroke-count, boundaries |
| 貪 | 11 | 11 | glyph-form |
| 播 | 15 | 15 | glyph-form |
| 把 | 7 | 7 | glyph-form |
| 罷 | 15 | 15 | glyph-form |
| 頗 | 14 | 14 | order, glyph-form |
| 販 | 11 | 11 | glyph-form |
| 貝 | 7 | 7 | glyph-form |
| 遍 | 13 | 13 | stroke-count, boundaries, direction, glyph-form |
| 幣 | 15 | 14 | stroke-count, boundaries, order, direction |
| 蔽 | 16 | 15 | stroke-count, boundaries, order, direction |
| 抱 | 8 | 8 | glyph-form |
| 飽 | 14 | 14 | stroke-count, boundaries, glyph-form |
| 幅 | 12 | 12 | glyph-form |
| 漂 | 14 | 14 | glyph-form |
| 旱 | 7 | 7 | glyph-form |
| 咸 | 9 | 9 | order, glyph-form |
| 奚 | 10 | 10 | direction, glyph-form |
| 該 | 13 | 13 | glyph-form |
| 軒 | 10 | 10 | glyph-form |
| 絃 | 11 | 11 | order, direction, glyph-form |
| 縣 | 16 | 16 | glyph-form |
| 嫌 | 13 | 13 | direction, glyph-form |
| 螢 | 16 | 16 | glyph-form |
| 毫 | 11 | 11 | glyph-form |
| 昏 | 8 | 8 | glyph-form |
| 鴻 | 17 | 17 | glyph-form |
| 穫 | 19 | 19 | order, glyph-form |
| 擴 | 18 | 18 | glyph-form |
| 曉 | 16 | 16 | glyph-form |
| 輝 | 15 | 15 | glyph-form |

## 다음 권장 작업

**妥·墮·濁·濯·貪·播·把·罷·頗·販 10자·128획**의 경로·방향·순서를 보정하고,
보정된 전체 누적 자형을 같은 원본 영상과 다시 대조한다.
[next-batch.json](next-batch.json)에 이 대상과 나머지 보류 25자를 구분했다.
