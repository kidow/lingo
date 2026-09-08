# 필순 근거 없이 SVG 애니메이션을 생성하는 방안 검토

조사일: 2026-09-08. 이 문서는 공개 원문을 검토한 기술 조사이며 앱 코드·승인 목록·배포를 변경하지 않는다. 문자별 적용 가능 수는 별도 카탈로그 교집합 조사에서 집계한다.

## 결론

벡터 후보를 제작하거나 해외 공개 데이터를 재생하는 것은 가능하다. 하지만 SVG가 존재한다는 사실, 경로 개수와 총획수가 같다는 사실, 모양이 비슷하다는 사실은 한국 한능검 학습용 필순의 정확성을 입증하지 않는다. 공식 개별 도해가 없더라도 한국 교과서·사전의 개별 기록과 전문가 검토를 근거로 삼는 경로는 있다. 그 경우 근거 종류를 정확히 기록하고, 한국어문회 자료를 대조한 기존 승인과 구별해야 한다. 원본 없이 AI나 규칙으로 만든 결과는 검토 후보로 한정하는 것이 타당하다.

## 공개 데이터 원문 확인

| 자료 | 실제 제공 범위·근거 | 한국 한능검에 대한 한계 |
| --- | --- | --- |
| [AnimCJK README](https://github.com/parsimonhi/animCJK/blob/master/README.md) | 언어별 SVG와 순서가 있는 획 경로. 현재 README는 Ko 535, Ja 7,007, ZhHans 8,014, ZhHant 1,013개를 안내한다. | README 자체가 같은 Unicode에도 언어별 자형·필순·진행 방향이 달라질 수 있다고 명시한다. Ko라는 폴더명이 한국어문회 개별 검증 완료를 뜻하지 않는다. |
| [AnimCJK 출처 설명](https://github.com/parsimonhi/animCJK/blob/master/README.md) | Make Me a Hanzi에서 파생한 뒤 수정·추가. 한국 자료 교차 확인처에 네이버 한자사전과 Korean Wiki Project, 타이완에는 교육부 필순 사이트 등을 열거한다. | 출처 목록은 개별 글자의 어느 획을 어느 자료와 대조했는지 보여주는 검토 원장과 다르다. |
| [KanjiVG 파일 설명](https://kanjivg.tagaini.net/files.html)·[참고문헌](https://kanjivg.tagaini.net/ref.html) | 일본 JIS 한자 중심의 순서·방향·형태를 가진 개별 SVG. 교육한자 필순 근거는 일본 문부성의 1958년 『筆順指導の手びき』, 그 밖에 江守賢治 필순자전과 교과서체 폰트 등을 명시한다. | 공식 참고문헌이 있으므로 무근거 자료는 아니다. 다만 프로젝트는 추가 문자까지 일본 기준임을 명시하므로 한국 기준 일치 여부는 별도 검토가 필요하다. |
| [Make Me a Hanzi](https://github.com/skishore/makemeahanzi/blob/master/README.md) | 9,000개 이상의 간체·번체 중국 문자. 완성 획 윤곽 `strokes`, 중심선 `medians`, 구성요소 대응을 제공한다. | README는 PRC 필순을 목표로 하며 일본·타이완 등에서는 순서가 다름을 명시한다. 번체 제공이 한국 필순 제공을 의미하지 않는다. |
| [Hanzi Writer](https://github.com/chanind/hanzi-writer/blob/master/README.md)·[데이터 로딩 문서](https://hanziwriter.org/docs.html#loading-character-data-link) | JavaScript 재생·쓰기 퀴즈 라이브러리. Make Me a Hanzi 파생 데이터를 불러오며 자체 데이터 로더도 지원한다. | 한국 필순을 판정하거나 Noto 윤곽에서 필순을 만들어 주는 엔진이 아니다. 데이터가 틀리면 그대로 재생·평가할 수 있다. |

위 숫자는 프로젝트 전체 공개 안내 수로, 우리 카탈로그의 미적용 문자 수나 새로 승인할 수 있는 수가 아니다. AnimCJK의 Ko·Ja·ZhHans·ZhHant와 Make Me a Hanzi, Hanzi Writer는 제작 기원이 겹친다. 여러 저장소에서 같은 결과가 나온다고 독립된 여러 근거의 합의로 계산하면 안 된다. KanjiVG도 AnimCJK의 참고 자료 중 하나다.

## Noto SVG에서 자동으로 획을 복원할 수 있는가

[Noto CJK](https://github.com/notofonts/noto-cjk/blob/main/README.md)는 KR·JP·SC·TC·HK 폰트를 구분한다. [OpenType CFF 사양](https://learn.microsoft.com/en-us/typography/opentype/spec/cff)은 글리프의 윤곽을 CharStrings로 표현한다. 윤곽의 그리기 명령 순서는 사람이 붓이나 펜으로 쓴 필순이라는 의미를 갖지 않는다. **이 사양에 대한 기술적 해석:** 동일한 완성 윤곽을 서로 다른 순서·분할로 만들 수 있으므로, 외곽선을 SVG로 바꾸는 것만으로 한국 필순이 복원되지는 않는다.

관련 연구가 실제로 존재하지만 해결 범위를 구분해야 한다.

| 1차 논문 | 확인한 방법·의존성 | 이 작업에 대한 의미 |
| --- | --- | --- |
| [CCSE, 2022](https://arxiv.org/html/2210.13826) | 획을 인스턴스 분할 문제로 학습한다. 폰트 제작 자료에 개별 획 좌표가 보존되지 않아 Make Me a Hanzi/cnchar에서 학습 데이터를 구성했다고 설명한다. 복잡하게 겹치는 획에서 분할 성능이 낮아진다고 보고한다. | 자동 분할의 실현 가능성을 보여준다. 이미 주석이 있는 데이터가 필요하며 한국 필순의 독립 검증은 아니다. |
| [Deep Structure Deformable Image Registration, 2023](https://arxiv.org/html/2307.04341) | 표준 순서가 표시된 참조 획을 목표 글자 영상에 정합한다. 심하게 교차하는 획과 참조·대상 간 큰 구조 차이를 실패 사례로 제시한다. | 한국 기준 참조가 확보된 뒤 자형을 옮기는 보조 도구로 검토할 수 있다. 참조 없이 정답 순서를 알아내는 방법은 아니다. |
| [LVGM, WACV 2026](https://openaccess.thecvf.com/content/WACV2026/html/Zhang_Stroke_Modeling_Enables_Vectorized_Character_Generation_with_Large_Vectorized_Glyph_WACV_2026_paper.html)·[읽을 수 있는 원문](https://arxiv.org/html/2511.11119) | 순서가 있는 획을 다음 토큰처럼 예측한다. 원데이터는 Make Me a Hanzi와 FZSJ-XIAOSXS이며 분할·순서에 수작업 주석을 사용한다. 약 90.7만 표본은 단어·성어·시구 표본을 포함하며 서로 다른 한자 수가 아니다. 평가는 인식 가능성·미관·문학적 품질 중심이다. | 최신 생성 모델도 정답 주석을 학습한다. 이 논문은 한국 배정 한자 전체의 획수·분할·방향·순서가 검증된 제품 데이터를 제공한다는 근거가 아니다. |

따라서 AI 생성은 초안 작성 비용을 줄일 수 있으나, 검증 근거가 없는 문제를 해결하지 못한다. Noto 명조체 윤곽과 손글씨 중심선이 다르게 보이는 현상 또한 바로 필순 오류를 뜻하지 않는다. KanjiVG [FAQ](https://kanjivg.tagaini.net/faq.html)도 인쇄체 대신 교과서체·해서체와 비교하도록 안내한다.

## 이용 조건과 정확성은 별도 판단

아래는 공개 본문에 적힌 조건의 요약이다. 앱 전체에 어떤 법적 의무가 전이되는지 단정하지 않는다.

- AnimCJK 한자 SVG·`graphics*`와 Make Me a Hanzi/Hanzi Writer 획 데이터는 [Arphic Public License](https://raw.githubusercontent.com/chanind/hanzi-writer-data/master/ARPHICPL.TXT)를 따른다. 본문은 라이선스 보존, 수정 내용·날짜 고지, 수정본을 해당 조건으로 제공하는 의무를 설명한다. AnimCJK의 [COPYING](https://github.com/parsimonhi/animCJK/blob/master/licenses/COPYING.txt)은 이 데이터와 나머지 LGPL 코드 등을 구분한다.
- Hanzi Writer 라이브러리의 MIT 라이선스가 획 데이터까지 MIT로 바꾸지 않는다. [데이터 저장소](https://github.com/chanind/hanzi-writer-data/blob/master/README.md)도 별도 라이선스를 명시한다.
- KanjiVG는 [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)이다. 출처·라이선스·변경 표시와 파생 자료의 동일 조건 공유를 고려해야 한다.
- Noto Serif는 [SIL OFL 1.1](https://github.com/notofonts/noto-cjk/blob/main/Serif/LICENSE)이다. 이 허가는 한국 필순이 맞다는 보증과 관계없다.

## 권장 적용 경로

1. **한국 개별 자료 대조:** 기존 순서대로 한 글자의 처음부터 끝까지 획수·분할·방향·순서를 기록한다. 한국어문회 문서, 한국 교과서·사전 등 실제 근거의 종류를 보존한다. 공개 열람권과 영상·도형 재배포권은 별도 확인한다.
2. **해외 벡터 + 한국 전문가 검수:** 공개 벡터를 초안으로 쓰고 전문가가 국내 참고자료 및 한국 필순 규칙과 예외를 대조한다. 공식 문서 대조와 다른 검증 상태를 부여하고, 충돌은 보류한다. 전문가는 판정자이지 한국어문회 승인 기관으로 표시하지 않는다.
3. **외국 기준 참고 애니메이션:** 제품 정책을 바꾸는 경우에만 출처·지역·한국 기준 미검증 사실을 명시한다. 한능검 기본 정답이나 쓰기 채점 근거로 섞지 않는다. 이번 조사에서 적용을 승인하거나 구현하지 않았다.
4. **AI·규칙 추론만 있는 후보:** 내부 후보 생성에 한정한다. 필순 규칙 적용만으로 예외까지 검증됐다고 보지 않는다. 적절한 참조·심사 없이 자동 공개하지 않는다.

검증 원장에는 글자 코드포인트, 출처 지역, 근거 유형·문서 위치, 벡터 저장소 커밋·해시, 획수, 순서·분할·방향·자형 확인, 검토자·날짜, 불일치 이유를 남기는 것이 좋다. 총획 일치와 여러 파생 데이터의 일치는 검토 우선순위를 정하는 보조 지표로 사용할 수 있다.

## 조사 기록

두 차례로 나누어 1차 README·공식 문서·라이선스와 2022/2023/2026 논문 본문을 교차 확인했다. 링크에 404가 반환된 추정 경로(`KanjiVG about.html`, `kanjivg.html`, AnimCJK `licenses/ARPHICPL.txt`)는 근거에서 제외하고 실제 탐색 메뉴·COPYING이 연결하는 문서를 사용했다. LVGM의 학회 PDF는 본문 파서가 바이너리로 인덱싱해 해당 인덱스를 근거로 사용하지 않았으며, 학회 페이지가 연결하는 arXiv 2511.11119 본문을 확인했다.

KB 검색 라벨: `Hanja deep AnimCJK primary README`, `Hanja deep AnimCJK copying`, `Hanja deep Make Me a Hanzi primary README`, `Hanja deep Hanzi Writer README license`, `Hanja deep KanjiVG references primary`, `Hanja deep KanjiVG metadata files`, `Hanja deep OpenType CFF contours primary`, `Hanja deep stroke segmentation paper`, `Hanja deep reference registration paper`, `Hanja deep LVGM 2026 readable paper`, `Hanja deep Arphic license terms`.
