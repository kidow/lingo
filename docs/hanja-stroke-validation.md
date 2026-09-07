# 획별 애니메이션 검증 방법 조사

확인·적용일: 2026-09-07. 웹의 제작자 문서·공식 시험기관 자료와 공개 데이터 파일을 확인하고, 대조를 통과한 획별 데이터를 앱에 적용했다.

## 2026-09-07 적용

현재 총 503자(자체 중심선 18자 + AnimCJK Ko 기반 482자 + Ja 3자)의 재생을 제공한다. 5급까지 보정을 포함한 500자 전체와, 별도 공식 도해의 回·瓦·臼 3자다. 5급 범위에 남은 보류 글자는 없다. [12자 분할 보정 기록](hanja-stroke-review-splits.md)에 출처와 보정 방법을 남긴다. 기존 Web Animations 재생기와 Arphic Public License를 유지한다.

`node scripts/hanja-stroke-audit.ts`는 고정된 Ko·Ja 원본 해시, 변환 후 좌표, 成·초두머리 11자의 분할·순서·획 대응·결과 해시, 性의 보정 순서, 者·都의 점 삽입·원본 획 대응·경로 해시와 전체 도해 위치를 검증한다. `--json`은 글자별 상태를 출력한다. Ko 후보는 누락 5,456자, 획수 불일치 15자, 미승인 39자, 원본 획수까지 맞는 등록 468자이며 Ja 등록 3자는 별도 집계한다. 원본 획수 불일치 15자 중 5급까지의 14자는 점 추가 또는 획 분할 보정 후 재생된다. 警은 범위 밖이며 미승인이다. 따라서 Ko 기반 등록 경로는 482자다. 기존 자체 경로 18자의 다른 후보까지 승인하지 않는다. 읽기 전용 `scripts/hanja-stroke-review.py`의 `/reviewed`에서 공식 도해와 실제 배포 경로를 비교할 수 있다.

## 최초 조사 결론

**한국어문회 공식 도해로 기준 획을 확정하고, 그 기준과 애니메이션의 각 단계를 비교하는 방법이 가능하다.** SVG를 재생하는 라이브러리만으로 한국어문회 필순이 맞다고 인증할 수는 없다. 이번 조사에서 전 5,978자를 한국어문회 기준으로 자동 인증하는 공개 서비스나 기준 데이터는 확인하지 못했다.

새로 확인한 유용한 제작 후보는 **AnimCJK의 한국어 전용 `svgsKo` / `graphicsKo.txt`**다. 완성 폰트 윤곽을 새로 분할하기 전에 이 데이터를 공식 도해와 대조할 수 있다. 한국어 전용이라는 이름이나 제작자의 교차 확인만으로 공식 검증 완료로 처리하지 않는다.

## 웹에서 확인한 근거

| 자료 | 문서에서 확인한 내용 | 검증에서의 역할 |
| --- | --- | --- |
| [한국어문회 「필순 정정 및 500자 필순」](https://www.hanja.re.kr/kccpt/exam/otherData.do?search_option=subject&search_text=%ED%95%84%EC%88%9C) | 공식 설명에 5급 누적 500자 필순과 정정·보충 수록을 명시 | 해당 범위의 기준 원문 |
| [AnimCJK 공식 README](https://github.com/parsimonhi/animCJK/blob/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/README.md) | 한국어 535자, 획 모양과 중심선을 이용한 애니메이션, 네이버 한자사전 등 교차 확인 출처 | 획별 SVG 제작 후보와 대조 대상 |
| [Make Me a Hanzi 공식 README](https://github.com/skishore/makemeahanzi/blob/master/README.md) | 순서가 있는 획 경로와 중심선 제공, PRC 필순을 목표로 하며 지역별 차이가 있음을 명시 | 데이터 구조 참고; 한국어문회 기준으로 무조건 대체할 수 없음 |
| [Hanzi Writer 획 비교 코드](https://github.com/chanind/hanzi-writer/blob/master/src/strokeMatches.ts) | 기준 획과 시작·끝점, 방향, 곡선 거리, 길이를 비교하고 허용 오차 사용 | 입력이 이미 정해진 기준 획에 가까운지 검사; 기준 자체의 정당성을 검증하지 않음 |
| [KanjiVG FAQ](https://kanjivg.tagaini.net/faq.html), [알려진 문제](https://kanjivg.tagaini.net/known-problems) | 일본 손글씨 기반이며 일부 획순 문제도 공개 | 여러 라이브러리의 결과가 같다는 사실만으로 공식 정답을 보장할 수 없음 |
| [Web Animations currentTime](https://developer.mozilla.org/en-US/docs/Web/API/Animation/currentTime) | 재생·정지 여부와 관계없이 애니메이션 시간을 읽고 설정 가능 | 특정 획의 시작·중간·끝 프레임 검사 |
| [Playwright 스크린샷 검사](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1) | 기준 이미지 비교, 기본 설정에서 유한 애니메이션을 끝까지 진행함 | 일시정지한 특정 프레임을 `animations: 'allow'`로 검사해야 중간 획을 검증 가능 |

## AnimCJK 한국어 데이터 기계 대조 결과

검사 파일: [graphicsKo.txt](https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsKo.txt).

- 커밋: `ec5e17cca76c87587790bcbce5ea0b4d4fb753d6`
- 파일 크기: 1,387,824바이트
- SHA-256: `7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e`
- 고유 문자: 535자
- 앱의 5,978자와 정확한 문자 일치: 522자. 임의 이체자 치환은 하지 않았다.
- 일치 범위: 8급 50, 7급Ⅱ 50, 7급 50, 6급Ⅱ 75, 6급 75, 5급Ⅱ 100, 5급 100, 4급Ⅱ 20, 1급 1, 특급 1.
- 일치한 모든 항목에서 획 경로와 중심선의 개수가 같고, 중심선이 2점 이상이며 좌표가 유한했다.
- 공식 배정자료 기반 앱 총획과 획 경로 수 불일치: 15자. 총획 일치는 필요 검사 중 하나일 뿐 필순 검증 완료를 뜻하지 않는다.

| 문자 | 앱 총획 | AnimCJK 획 경로 수 |
| --- | ---: | ---: |
| 敬 | 13 | 12 |
| 觀 | 25 | 24 |
| 舊 | 18 | 17 |
| 萬 | 13 | 12 |
| 都 | 12 | 11 |
| 落 | 13 | 12 |
| 葉 | 13 | 12 |
| 苦 | 9 | 8 |
| 英 | 9 | 8 |
| 者 | 9 | 8 |
| 成 | 7 | 6 |
| 藥 | 19 | 18 |
| 警 | 20 | 19 |
| 草 | 10 | 9 |
| 花 | 8 | 7 |

위 차이의 원인은 이번 조사에서 확정하지 않았다. 획수 집계 기준·자형·획 분할·자료 오류 중 무엇 때문인지 한국어문회 글자별 도해와 정정 자료로 확인해야 한다. 자동으로 획을 추가하거나 분할해 맞추지 않는다. 522자는 제작 후보 수이며 공식 검증 완료 수가 아니다.

## Lingo에 적용할 검증 절차 — 조사에 근거한 제안

1. **독립적인 기준 확정:** 공식 도해의 판본·페이지/이미지·글자 위치를 기록하고 첫 획부터 마지막 획까지 분할·순서·진행 방향을 확인한다. 도해에 방향이 명확하지 않으면 임의로 보완하지 않고 미확인 상태로 둔다.
2. **후보 대조:** AnimCJK 한국어 SVG를 획별로 펼쳐 원문과 나란히 확인한다. 문자 코드나 총획만 비교하지 않는다. 두 후보 데이터가 서로 같더라도 공식 대조를 생략하지 않는다.
3. **기준 데이터 잠금:** 대조가 끝난 획 경로와 방향·순서·출처를 판본과 함께 보존한다. 모델의 자형 추정이나 OCR 결과만으로 검증 상태를 바꾸지 않는다.
4. **프레임 자동 검사:** 각 획의 시작·중간·끝에서 재생 시간을 고정한다. 이전 획 유지, 현재 획의 올바른 방향 진행, 다음 획 미노출, 마지막 완성형을 검사한다. 공식 대조를 마친 기준 화면과 비교하며, 구현에서 자동 생성한 화면을 그대로 정답 기준으로 승인하지 않는다.
5. **조작 회귀 검사:** 일시정지·이어 재생·처음부터 재생·글자 변경·화면 비활성화·동작 줄이기 설정을 검사한다. 이 단계는 재생기의 동작을 검증하며 필순의 공식성을 새로 증명하지 않는다.

Playwright Clock 문서가 열거하는 가상 시계 대상에는 JavaScript 타이머와 requestAnimationFrame 등이 있다. 그것만으로 Web Animations의 문서 타임라인까지 고정된다고 가정하지 않는다. Web Animations 재생기는 애니메이션을 멈추고 `currentTime`을 명시적으로 설정하는 검사용 경로와, 표시 획 수의 동기화가 필요하다. [Clock 문서](https://playwright.dev/docs/clock).

AnimCJK README는 한자 SVG·graphics 데이터에 Arphic Public License, 나머지 파일에 LGPL을 구분해 명시한다. 실제 도입 시 해당 파일의 저작권·원본 라이선스를 함께 보존하고 검토한다. 이번 조사에서는 데이터를 앱에 복사하거나 외부에 문의하지 않았다.

context-mode 자료명: `AnimCJK Korean stroke animation support`, `AnimCJK Korean dataset corpus coverage and stroke count checks`, `한국어문회 공식 500자 필순 재확인`, `Make Me a Hanzi stroke data validation basis`, `Hanzi Writer matching algorithm limits`, `Web Animations deterministic frame inspection`, `Playwright screenshot animation validation caveat`.
