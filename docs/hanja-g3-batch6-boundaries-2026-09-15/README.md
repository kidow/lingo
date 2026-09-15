# 3급 誕·遍·幣·蔽·飽 획 경계·획수 보정 — 2026-09-15

**5자·70획을 모두 적용했다.** 기존 카탈로그 합계는 72획이었으며, 한국어문회의 후속 설명을 대조해 幣 15→14획, 蔽 16→15획으로 보정했다.

- 전체 **1,799/5,978자 (30.1%)** 적용, **4,179자** 미적용.
- 3급 신규 배정분 **298/317자 (94.0%)** 적용, **19자·221획** 미적용.
- 妥~輝 50자 묶음은 **50자·545획 적용 완료**, 보류 0자. 최초 카탈로그의 547획은 역사 기록으로 보존했다.

## 글자별 결과

| 글자 | 적용 획수 | 확인 및 보정 |
|---|---:|---|
| 誕 | 14 | 廴의 윗 꺾임과 이어지는 내리긋기를 원본의 별도 두 획으로 분리 |
| 遍 | 13 | 戶 첫 획을 왼쪽 아래 방향으로 수정, 내부 가로·세로 연결 보정, 辶 꺾임과 아래 획 분리 |
| 幣 | 14 | 위 두 점의 순서·방향 보정, 가운데 세로획을 원본처럼 한 획으로 표현 |
| 蔽 | 15 | 풀머리 가로획 분리와 순서 수정, 두 점 방향·간격 및 마지막 삐침 시작 간격 보정 |
| 飽 | 14 | 食의 긴 세로획과 아래 두 가로획, 작은 점의 분리 및 包 내부 연결·바깥 갈고리 간격 보정 |

**飽의 최초 관찰 설명을 정정했다.** 확대 원본에서 4획은 가로 꺾임, 5~6획은 안쪽 가로획, 7획은 긴 세로획, 8~9획은 아래 두 가로획으로 확인됐다. 앞선 “왼쪽 세로획을 먼저 쓴다”는 설명은 사용하지 않는다. [observations.json](observations.json)의 새 관찰 시점이 최초 기록을 대체한다.

## 획수 근거와 원문 보존

[한국어문회 상담 답변 16424](https://www.hanja.re.kr/klea/counsel/hanjaDetail.do?id=16424)는 㡀를 7획으로 보아야 한다고 설명하며 幣·蔽를 직접 언급한다. 이 설명과 각 글자의 전체 교재 영상을 대조했다. **幣 7+4+3=14, 蔽 4+7+4=15는 그 설명에 따른 계산**이며, 답변에 적힌 총획수를 직접 인용한 것이 아니다.

공식 XLS를 다시 내려받아 실제 파싱한 결과, 5317행 幣 15획·5318행 蔽 16획은 그대로였다. 971,264바이트와 SHA-256 `97b8db715ebe1dd6e00e8e58d338a9ba70e7420bf5ec84da38f987d60eb64b17`을 확인했다. [count-sources.json](count-sources.json)에 행과 출처 해시를 남겼다.

[카탈로그](../../content/hanja/characters/g3.json)는 원문 획수를 `sourceStrokes`, 보정 근거를 `strokeCountCorrection`에 보존한다. 식별자·급수·훈음·학습 기록 키는 유지된다. [보정 목록](../../content/hanja/stroke-count-corrections.json)과 기존 원자료 검증기가 같은 보정을 사용한다. 함께 언급된 다른 글자에는 이번 보정을 자동 확장하지 않았다.

## 대조 범위와 재현

[비상교육 고등 한문](https://text.vivasam.com/detail/186)의 [공개 교재 뷰어](https://viewer.vivasam.com/qrviewer/viewer.html?qrcode=106502_171p_25_ST&teacher=false) 원본을 사용했다. [부모 queue](../hanja-g3-batch6-2026-09-15/queue.json)의 정확한 글자·행·전체 영상 URL·해시를 유지하고, 다섯 전체 영상을 다시 받아 확인했다.

0.5초 간격으로 영상 전체를 관찰한 뒤 70개 누적 경로·시작점·끝점·방향·최종 자형을 대조했다. 획 경계는 5fps 구간으로 보강했다: 誕 14~18.8초, 遍 14~17.4초, 幣 5~7초, 蔽 10.6~12초, 飽 3.6~11초. 접합은 840px 원본 부분 확대로 확인했다. 실제 관찰 내용은 [observations.json](observations.json), 적용 벡터는 [candidate-paths.json](candidate-paths.json), 승인 기록은 [review.json](review.json)에 있다.

幣는 고정 Ja 후보, 나머지는 고정 Make Me a Hanzi 후보를 보정했다. 원본 기하 해시와 Arphic 라이선스, 수정 획의 원본 대응 번호를 유지했다. 외국 후보 자체나 부수의 공통성만으로 승인하지 않았다. 출판사 자료와의 Codex 시각 대조이며 시험 주관 기관·전문가의 애니메이션 인증을 의미하지 않는다. 관찰 시각은 샘플링한 완료 상한이고 정확한 붓 떼기 시각은 아니다.

원본 영상·캡처·XLS·외부 패키지를 저장하지 않았다. [serve.py](serve.py)와 [count-source.py](count-source.py)는 원본을 RAM에서만 읽는다.

검증 결과: 원본 영상 5개 해시 일치, 현재 배치와 부모 50자 검증 통과, 전체 교재 데이터 **1,267자 재구성 일치**, 한자 테스트 **231개**, 원자료 정규화 테스트 **6개**, 프로덕션 빌드 통과. 기존 검토·보정·런타임 배열의 앞부분 해시가 유지된다. [verification.json](verification.json).

재현 명령:

```sh
node docs/hanja-g3-batch6-boundaries-2026-09-15/verify.mjs --fresh
python3 -B docs/hanja-g3-batch6-boundaries-2026-09-15/count-source.py
node docs/hanja-g3-batch6-2026-09-15/verify.mjs
node scripts/hanja-stroke-textbook-build.ts --check
node --test 'lib/hanja*.test.ts'
python3 -B scripts/hanja-source.test.py
pnpm run build
```

## 다음 권장 작업

**慨·遣·苟·旣·飢 5자·59획의 획수·경계 차이와 전체 필순 검토**를 권장한다. 최초 출처 조사에서 후보 획수 차이로 분리했던 글자들이다. [next-batch.json](next-batch.json)은 아직 검토·적용하지 않은 다음 범위다.

3급 미적용 19자: **慨 遣 苟 旣 飢 畓 屯 鈍 濫 隷 隣 茫 暮 募 苗 迷 返 屛 携**.
