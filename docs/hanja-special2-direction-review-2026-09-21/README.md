# 특급II 8자·148획 순서·방향·경로 검토

2026-09-21. [35자 획수 차이 조사](../hanja-special2-variants-2026-09-21/README.md)의 후속 검토다.
**嘯·瀟·嘴 3자·52획은 순서 보정 후 전체 경로 대조를 통과했다. 5자·96획은 보류한다.**
이번 결과는 경로 검토이며 서비스 적용 승인이 아니다. 런타임 데이터와 UI는 변경하지 않았다.

| 한자 | 배정 / 사전 획수 | 후보 | 결과 |
|---|---:|---|---|
| 纛 | 25 / 24 | AnimCJK Ja | 2·3번 순서 차이 외에 6번 갈고리 누락, 15·22번 갈고리 차이로 보류 |
| 蘿 | 23 / 22 | AnimCJK Ja | 12–14번 糸/糹 구조와 17번 방향이 달라 보류 |
| 藺 | 20 / 19 | AnimCJK Ja | 隹의 14번 짧은 삐침이 반대 방향인 점으로 그려져 보류 |
| 鱉 | 23 / 22 | Make Me a Hanzi | 1·2번의 위치·방향과 4번 갈고리가 달라 보류 |
| 宬 | 10 / 9 | AnimCJK Hans | 4·5번 순서 차이 외에 첫 점의 수직/대각선 진행 차이로 보류 |
| 嘯 | 15 / 16 | AnimCJK Ja | 肅 내부 순서 보정 후 16획 대조 통과 |
| 瀟 | 19 / 20 | Make Me a Hanzi | 艹와 肅 내부 순서 보정 후 20획 대조 통과 |
| 嘴 | 15 / 16 | AnimCJK Ja | 14·15번 교환 후 16획 대조 통과 |

## 검토 기준과 한계

e-hanja는 **민간 한국 한자 사전**이다. 이 검토를 한국어문회 공식 필순 인증으로 표현하지 않는다.
고정된 사전 SVG의 실행 지연·시간과 클립 연결을 확인하고, 각 획을 25·50·75% 진행 구간으로 나눠
시작점·중간 진행·끝 방향·꺾임·갈고리와 누적 상태를 직접 대조했다. 원본 148획과 보정본 52획을 모두 보았다.
별도로 8자의 Noto 정적 자형·사전 완성형·후보 완성형을 비교했다.

수치 비교는 선별에만 사용했다. 鱉의 1·2번은 방향 각도만 보면 교환 후보지만,
교환하면 좌우 위치가 잘못되므로 기각했다. 宬의 첫 점도 60도 미만이라는 이유로 통과시키지 않았다.
纛의 6·15·22번은 확대해서 갈고리 차이를 재확인했다.

`proposals.json`은 사전 순서 → 라이선스 원본 획 번호의 일대일 대응이다.
세 후보의 기존 경로를 재배열했으며 좌표 추가·삭제·수정, 획 분할·합병, 다른 글자의 부품 대체는 하지 않았다.
선 굵기와 글꼴 비례까지 사전 윤곽과 동일하다는 뜻은 아니다.
보류한 5자는 부분 순서 대응만 기록하고 재생 후보로 승인하지 않았다.

## 파일과 재현

- [originals.json](originals.json): 고정 리비전의 라이선스 중앙선·정규화 경로, 원본 해시, 사전 URL·해시.
- [proposals.json](proposals.json): 통과한 3자의 획 번호 재배열.
- [review.json](review.json): 글자별 관찰, 보류 사유, 검토한 획, 보정 전후 경로 해시.
- [source-checks.json](source-checks.json): 사전 타임라인 메타데이터와 검토 페이지 방문 기록. 방문 기록 자체가 시각 검토의 증명은 아니다.
- [verification.json](verification.json): 원본 재현, 148획/52획 범위, 좌표 보존, 기존 변형 자형 회귀 테스트 결과.

```sh
node docs/hanja-special2-direction-review-2026-09-21/prepare.mjs
node docs/hanja-special2-direction-review-2026-09-21/verify.mjs
node --test lib/hanja-stroke-special2-variants.test.ts lib/hanja-stroke-variants.test.ts
python3 docs/hanja-special2-direction-review-2026-09-21/serve.py 51825
```

`prepare.mjs`는 고정된 공개 코퍼스를 내려받아 JSON을 표준 출력으로만 내보낸다.
이번 실행에서는 저장된 원본 스냅샷과 전체 일치를 확인했다.
검토 서버는 `http://127.0.0.1:51825/?glyph=嘯&start=7&end=12&corrected=1`처럼 사용한다.
사전 자료는 요청 때 RAM에만 두며, 종료하면 사라진다. 테스트는 기록의 일관성을 검사하며 시각 판단을 대신하지 않는다.

## 현재 상태와 다음 작업

실제 서비스 적용은 **4,919 / 5,978자(82.3%)**, 미적용 **1,059자**다.
특급II는 **838 / 1,150자(72.9%)**, 미적용 **312자**다. 이번 검토로 적용 수는 늘지 않았다.

다음은 **嘯·瀟·嘴 3자·52획을 사전 자형으로 연결**하는 작업이다.
배정 획수와 사전 재생 획수를 구분하고, 정적 표시·애니메이션·쓰기 가이드가 같은 경로를 쓰는지,
자동 재생·재재생·오버레이 중복·모바일 배치를 확인한 뒤 적용한다.
그 뒤 보류한 5자·96획의 다른 전체 후보 또는 자형 차이를 설명할 근거를 찾는다.

## 출처와 라이선스

AnimCJK Copyright 2016–2026 FM&SH. `graphicsJa`와 `graphicsZhHans`는 Arphic Public License 자료다.
Make Me a Hanzi의 중앙선 출처 고지와 라이선스도 유지한다.
[출처 고지](../../public/hanja-strokes/COPYING.txt),
[Arphic 라이선스](../../public/hanja-strokes/ARPHICPL.txt),
[Make Me a Hanzi 고지](../../public/hanja-strokes/MAKEMEAHANZI-COPYING.txt)를 따른다.
고정 리비전 URL·해시는 `originals.json`에 있다. 변경은 좌표 정규화 및 세 후보의 획 순서 재배열이다.
©2020 e-hanja의 HTML·SVG 경로·스크린샷은 저장하거나 배포하지 않았다.
