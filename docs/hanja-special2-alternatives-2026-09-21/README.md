# 보류 5자의 대체 전체 후보 조사

2026-09-21. **纛·蘿·藺·鱉·宬 5자·96획**의 기존 갈고리·방향·자형 차이를 해결할 자료를 조사했다.
**纛·蘿·藺 3자·65획의 유력한 전체 후보를 새로 확보했다.** 문제 획 선별을 마친 상태이며, 전체 필순 승인이나 서비스 적용은 아니다.

## 후보별 결과

고정한 [KanjiVG 리비전](https://github.com/KanjiVG/kanjivg/tree/422b5538595676da918c288a4230cb5e22a1ee7e)의 후보 7종에서 완성 자형과 문제 획 19쌍을 화면으로 비교했다.
실제 비교 기록은 [findings.json](findings.json)과 [source-checks.json](source-checks.json)에 있다.

| 글자 | 우선 후보 | 확인한 부분 | 후속 범위 |
|---|---|---|---|
| 纛 | `07e9b.svg` | 6획 왼쪽 갈고리 있음, 15·22획에 불필요한 갈고리 없음 | 전체 24획 |
| 蘿 | `0863f.svg` | 12–14획이 糸의 세로·삐침·점, 17획은 왼쪽 아래로 진행 | 전체 22획 |
| 藺 | `085fa.svg` | 14획이 사전처럼 왼쪽 아래로 진행 | 전체 19획 |
| 鱉 | 새 후보 미확보 | 기존 MM의 좌우 상단 방향과 4획 갈고리 문제는 미해결 | 사전 기준 22획 보류 |
| 宬 | 새 후보 미확보 | 첫 점 방향 및 9획/10획 자형 구분은 미해결 | 사전 기준 9획 보류 |

纛의 `Kaisho`·`KaishoVtLst`는 15·22획 갈고리가 남아 배제했다. 蘿의 `Kaisho`는 아래가 糹의 점 셋이므로 배제했다.
藺의 `Kaisho`도 14획 방향은 맞지만 기본 후보를 우선하고 대안으로 남겼다.
비교 중 잘못 대응시켜 열었던 纛 15→17, 22→24 화면은 판정에 쓰지 않았다. 최종 기록은 15→15, 22→22 대조다.

[KanjiVG 자체 설명](https://kanjivg.tagaini.net/variants.html)에 따르면 기본·해서체 파일은 자형과 획순이 다를 수 있다.
파일명이나 일본 자료라는 이유만으로 승인하지 않고, 국내 민간 사전 e-hanja의 같은 글자와 직접 비교했다.
e-hanja 대조도 한국어문회의 공식 필순 인증은 아니다.

## 鱉·宬의 보완 자료와 한계

- **鱉:** [대만 교육부 이체자 사전](https://dict.variants.moe.edu.tw/dictView.jsp?ID=52400&la=1)의 검색 색인은 22획을 제시하고 상단을 점·삐침으로 설명한다. 국내 사전의 삐침·점과 다른 지역 자형을 설명하는 근거이며, 기존 후보의 4획 갈고리까지 해결하지 않는다.
- **宬:** [대만 교육부 이체자 사전](https://dict.variants.moe.edu.tw/dictView.jsp?educode=C02485)의 검색 색인은 9획으로 기재하지만, 직접 조회한 [CNS11643](https://www.cns11643.gov.tw/wordView.jsp?ID=142954)은 총 10획·부수 외 7획이다. 획수 표기만으로 첫 점 방향이나 전체 경로를 승인할 수 없다.
- 위 교육부 두 상세 페이지는 직접 요청에서 HTTP 404였다. 검색 색인으로 확인한 설명과 직접 취득한 CNS 정보를 구분해 기록했다. 해당 페이지의 완전한 현행 본문과 애니메이션을 확보했다고 주장하지 않는다.

KanjiVG의 전체 트리에서 鱉·宬의 같은 코드포인트 SVG는 없었다. AnimCJK와 Make Me a Hanzi의 최신 HEAD는 이미 조사한 고정 리비전과 동일했다.
[inventory.json](inventory.json)은 저장소 리비전·파일 목록·트리 조회 누락 여부를 기록한다.
이번 범위에서 후보를 찾지 못했다는 뜻이며, 세상에 자료가 없다는 결론은 아니다. 다른 코드포인트의 鼈을 鱉에 임의로 대입하지 않았다.

## 다음 작업

**纛·蘿·藺 우선 후보 3자·65획의 순서·방향·경로 전체 검토**를 권장한다.
검토 통과 후 KanjiVG의 109 좌표계와 곡선 명령을 100 좌표계에 손실 없이 옮기는 방법 및 정적·동적 자형 일치를 확인한다.
현재 후보는 M/C/c/s 곡선을 그대로 보존했다. 기존 중앙선 좌표로 임의 재작성하거나, 다른 글자의 부수로 바꾸거나, 런타임에 연결하지 않았다.

현재 서비스 적용 수는 **4,922/5,978자(82.3%)**, 미적용 **1,056자**로 그대로다.
특급II는 **841/1,150자(73.1%)** 적용, **309자** 미적용이다.

## 재현과 파일

- [prepare.mjs](prepare.mjs): 고정 리비전의 7 SVG를 받아 Git blob 해시를 검증하고, 변경하지 않은 경로를 JSON으로 출력한다.
- [candidates.json](candidates.json): 원본 경로·획 번호·획 유형·출처 해시와 라이선스. 전체 154개 경로를 포함한다.
- [serve.py](serve.py): 사전 자료를 RAM에만 두는 비교 화면. `?id=07e9b&pairs=6:6,15:15,22:22` 형식으로 문제 획을 대조한다.
- [verify.mjs](verify.mjs), [checks.json](checks.json): 파일 출처, 비교 범위, 후보 분류, 서비스 미적용 및 기존 적용 수 검사. 시각 판단을 자동으로 증명하는 검사는 아니다.

```sh
node docs/hanja-special2-alternatives-2026-09-21/prepare.mjs
node docs/hanja-special2-alternatives-2026-09-21/verify.mjs
python3 docs/hanja-special2-alternatives-2026-09-21/serve.py 51828
```

## 라이선스

`candidates.json`의 획 경로는 **KanjiVG, Copyright Ulrich Apel**, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)에 따른다.
[프로젝트](https://kanjivg.tagaini.net/)와 [라이선스 고지](https://github.com/KanjiVG/kanjivg/blob/422b5538595676da918c288a4230cb5e22a1ee7e/README.md)를 표시한다.
변경은 SVG에서 경로·획 유형을 JSON으로 추출한 것뿐이다. 해당 파생 데이터에도 같은 라이선스를 유지한다.
기존 AnimCJK/APL 데이터와 라이선스를 혼동하지 않는다.
©2020 e-hanja의 원본 SVG·HTML·스크린샷은 저장·배포하지 않았으며, 정부 사이트의 자형 이미지나 경로도 복제하지 않았다.
