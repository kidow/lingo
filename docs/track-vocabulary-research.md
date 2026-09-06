# DELE 외 7개 트랙의 공식 어휘 출처 비교

확인일: 2026-09-06. 대상: 현재 lingo의 TOEIC, JLPT, HSK, TOCFL, DELF, TELC, TORFL.
앱 코드와 콘텐츠는 변경하지 않았다. DELE 조사는 [별도 문서](./dele-vocabulary-research.md)에 있다.

## 결론

**HSK는 실제로 출처 기준을 갱신할 이유가 있다.** 2025년 발표한 새 공식 시험 대강과
현재 선택하는 2021년 기준 사이에 단어별 등급 차이가 확인됐다. 같은 GitHub 데이터에
2026 대강용 태그가 추가되어 있지만 현재 구현은 이를 사용하지 않는다.

TOEIC에는 2026년판 공식 1,800어 교재, TORFL에는 2026년판 C1 공식 최소어휘집이
있다. 다만 무료로 재사용 가능한 전체 데이터는 확보하지 못했다. TELC가 공개한 B2
교재 어휘표는 보충 자료가 되지만 모든 수록 단어의 최초 습득 수준을 B2로 판정하는
근거가 되지는 않는다. TOCFL은 이미 현 공식 배포본을 사용한다.

JLPT는 현행 시험의 단어별 목록을 비공개로 유지한다. DELF의 현 FLELex/Beacco는
학술적으로 공개된 자료지만 **시험기관의 직접 등급표가 아니라 통계모형이 산출한
CEFR 참고 등급**이라는 점을 분명히 해야 한다.

## 비교 기준

“더 좋다”는 단어 수뿐 아니라 시험과 판본의 일치, 등급의 직접 명시 여부, 실제
파일 접근, 구조화 가능성, 재사용 조건을 함께 비교했다. 다음은 서로 다른 속성이다.

- 시험기관·공공기관의 공식 자료인지
- 개별 단어의 등급표인지, 특정 수준 교재에 등장한 어휘 목록인지
- 전체를 무료로 열람할 수 있는지
- 데이터를 앱에 복제·수정·재배포할 권한이 확인되는지

## 요약표

| 트랙 | 현재 구현의 출처 | 확인한 더 나은 후보 또는 현황 | 판단 |
| --- | --- | --- | --- |
| HSK | complete-hsk-vocabulary의 `n1`~`n7`, 2021 기준 | 공식 2025 시험 대강 PDF, 저장소의 `newest`/`t` 계열 | **우선 대조·갱신 검토**. 시험 시행 상황과 판본을 구분 |
| TOEIC | TSL 1.2, 1,250개 순위 | ETS·IIBC 공식 2026 교재, 1,800개 단어·구 | 공식성은 높음. 유료 교재이며 공개 데이터 대체재는 미확보 |
| TORFL | ros-edu.ru, A1~B2 | Златоуст의 2026년 C1 최소어휘집, 11,000개 단위 | C1 확장 근거는 존재. 전체 무료 데이터·재사용 경로 미확보 |
| TELC | Goethe A1~B1 Wortliste | telc B2 직업언어 교재 어휘표, B1·B2 간호 시험 전문어휘 | **범위를 명시한 보충 자료**. 일반 B2 확정 등급으로 일괄 적용 불가 |
| TOCFL | 공식 八千詞表 202409; NAER 202504는 표기 검증용 | 현 공식 페이지도 동일한 파일 배포 | 현 출처 유지. TBCL을 TOCFL 단어 등급과 혼합하지 않음 |
| JLPT | Jisho의 JLPT 태그 | JF Marugoto 등의 공식 교재 어휘표는 존재 | 현행 N1~N5 공식 목록 대체재는 없음. JF 수준을 N등급으로 환산하지 않음 |
| DELF | FLELex/Beacco A1~C2 | FEI 공식 언어내용 목록, 참고문헌 | 단어별 공개 시험 등급표는 미확인. 현재 등급의 추정 성격 표시 필요 |

## HSK — 공식 시험 대강과 현재 선택하는 데이터가 다르다

[시험기관의 대강 페이지](https://www.chinesetest.cn/syllabus)가 직접 연결하는
[공식 PDF](https://hsk.cn-bj.ufileos.com/3.0/%E6%96%B0%E7%89%88HSK%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B21219.pdf)를
실제로 읽었다. 406쪽이며 표지는 `2025-11 发布`, `2026-07 实施`로 되어 있다.
어휘 표에는 `序号 / 等级 / 词语 / 拼音 / 词性`이 있으며, 1~6급과 7–9급 묶음을 구분한다.

표의 번호 경계를 직접 확인한 누적 항목 수는 다음과 같다. 이는 표제어를 정규화·중복
제거한 수가 아니라 **공식 표의 번호 기준**이다.

| 수준 | 누적 항목 수 |
| --- | ---: |
| 1 | 300 |
| 2 | 500 |
| 3 | 1,000 |
| 4 | 2,000 |
| 5 | 3,600 |
| 6 | 5,400 |
| 7–9 | 11,000 |

물리적 PDF 87쪽에서 300번 `做饭`은 1급, 301번 `啊`부터는 2급이다.
92쪽에서 500번 `左边`은 2급, 501번 `阿姨`부터는 3급이다.
83쪽의 `苹果`는 1급이고, `爱好`는 87쪽의 2급, `机场`는 89쪽의 2급이다.
표에는 `半`의 `1（4）`처럼 품사·용법에 따른 복수 수준 표시도 있어 이를 보존해야 한다.

현재 [define.ts](../scripts/define.ts)의 `hskLevels()`는 `^n[1-9]$`만 읽는다.
[사용 중인 저장소](https://github.com/drkameleon/complete-hsk-vocabulary)의 현재 응답에서
`爱好`와 `机场`는 모두 `n1` 및 `t2`를 갖는다. 즉 추상적인 판본 차이가 아니라 실제
동일 단어의 등급 차이다.

저장소의 [축약 스크립트](https://github.com/drkameleon/complete-hsk-vocabulary/blob/main/scripts/minify.rb)는
`newest-`를 `t`, `new-`를 `n`, `old-`를 `o`로 바꾼다.
[2026 대강 태그 추가 변경](https://github.com/drkameleon/complete-hsk-vocabulary/commit/9837ce887ada)은
2026-03-23에 병합됐고, `wordlists/exclusive/newest/` 파일들도 존재한다.
README의 등급 표는 여전히 old/new만 설명하므로 README만으로 최신 여부를 판단하면 안 된다.

**시행 시점 주의:** PDF의 시행 표기와 전 세계 모든 시험장의 전환 완료는 같은 사실이
아니다. 현재 [공식 공지](https://www.chinesetest.cn/notice)는 **2026-09-20 제2차 글로벌
시범시험**을 안내하며 등록 개시는 2026-08-03이라고 적는다. “2026년 7월부터 모든
시험이 전환됐다”고 단정하지 않는다.

**권고:** `HSK 2021 표준`과 `HSK 2025 발표/2026 시험 대강`을 구분하고, 공식 PDF를
기준으로 `newest` 데이터의 누락·정규화·복수 품사 표시를 대조한다. 단순히 `n`을 `t`로
바꾸는 작업까지 이번 조사에서 검증한 것은 아니다. 공식 PDF의 개방형 재배포 라이선스도
별도로 확인해야 하며, 저장소의 MIT 표기가 원문 전체에 자동 적용되는 것은 아니다.

## TOEIC — 2026년 공식 1,800어 자료가 있다

[IIBC의 2025-11-27 공식 발표](https://www.iibc-global.org/iibc/press/2025/p295.html)에서
『公式TOEIC Listening & Reading 英単語』를 확인했다. 발표된 출간일은 2026-01-09이며,
[현재 상품·학습 안내](https://www.iibc-global.org/toeic/support/prep/lr_voca_02/pr.html)에서도
책과 앱의 구매 경로를 제공한다.

실제 시험에서 추출한 기본어 1,200개, 상급어 300개, 연어·구 300개로 구성된다.
따라서 출제기관과의 직접성에서는 학습교재 코퍼스 기반인 TSL보다 강한 후보다.
다만 전체 1,800개를 무료 CSV/JSON으로 제공하거나 앱에 재배포하도록 허용한 경로는
확인하지 못했다. 개인이 교재를 구입하는 것과 앱 데이터로 재사용하는 것은 구분해야 한다.

[ETS 준비자료 페이지](https://www.ets.org/toeic/test-takers/prepare.html)도 확인했으나,
공개 자료는 안내서·샘플시험과 유료 학습과정 중심이다.

[TSL 저자 배포 페이지](https://www.newgeneralservicelist.com/toeic-service-list)는 현재도
1.2, 1,250어, 통계 CSV, CC BY-SA 4.0을 제공한다. 현재 구현의 CSV와 같은 파일이다.
이 자료가 주장하는 높은 커버리지는 **NGSL과 함께 사용할 때**의 수치이며 TSL 단독
커버리지가 아니다. NGSL은 일반어휘 보완재지만 단어별 TOEIC 등급표가 되지는 않는다.

**권고:** 공개 앱 데이터에는 현 TSL을 유지하고, 공식 2026 교재는 권리 협의가 가능한
경우의 대체 후보로 기록한다. “ETS 공식 어휘 자료가 전혀 없다”고 설명하지 않는다.

## TORFL — C1 공식 최소어휘집이 실제로 존재한다

[원출판사 Златоуст의 4판 상품](https://zlatoust.store/product/899-leksicheskiy-minimum-3-y-uroven-4-ye-izd)은
2026년판, C1, 11,000개 단위, ISBN 978-5-908045-51-3으로 표시된다.
출판사는 이 책이 러시아 국가 시험체계의 공식 자료군에 포함된다고 명시한다.
상품에 표시된 매체는 종이책이다.

이는 “C1에 공식 어휘 기준이 없다”는 의미가 아니라 **현재 구현의 공개 데이터가
A1~B2에서 끝난다**는 의미다. [현 ros-edu.ru 화면](https://www.ros-edu.ru/basic-dictionary)에는
C1·C2 필터가 보이지만, 기존 `POST /380`을 실제 재조회한 결과는 다음과 같았다.

| 조회 | 실제 count | 실제 data 길이 |
| --- | ---: | ---: |
| 전체, page=1 | 4,361 | 40 |
| level_id=5 (C1), page=1 | 0 | 0 |
| level_id=6 (C2), page=1 | 0 | 0 |

필터가 보인다고 상급 어휘 데이터가 있다고 판단하면 안 된다. ros-edu.ru는 이 비교에서
시험 주관기관의 직접 배포 파일과 별도의 플랫폼 출처로 취급한다.

[러시아국립도서관의 2018년판 기록](https://search.rsl.ru/ru/record/01009702838)도 확인했다.
검색 도구는 “전체 무료 열람”이라는 문장을 추출했지만 HTML을 재확인하니 공통 팝업의
문구였고 링크는 `#`였다. 실제 해당 도서의 동작 영역에는 열람실 주문·부분 복사 신청만
있었다. 따라서 이 기록을 무료 전체 원문 확보의 증거로 사용하지 않는다.

**권고:** C1 확장은 공식 책의 데이터 제공·이용 가능 범위를 확인하는 과제로 남긴다.
즉시 교체할 수 있는 전체 무료 데이터와 C2 단어별 공식 공개 목록은 확보하지 못했다.

## TELC — B2 자료는 있지만 교재 수준과 단어 수준을 구분해야 한다

[telc 공식 다운로드](https://www.telc.net/lehrmaterialien/downloadbereich/)에
『Einfach besser! 400 / 500』의 B2 직업언어 어휘표가 있다.
[500 독일어 PDF](https://www.telc.net/fileadmin/user_upload/Downloads_Verlag/Einfach_besser_100_400_500/Wortschatzlisten/Einfach_besser_500_Wortschatzliste_Deutsch.pdf)를
실제로 읽었으며 35쪽, 단원별 `Artikel / Deutsch / Beispielsatz 또는 Notizen` 구조다.
직업·산업·학력·직장 활동 관련 어휘와 표현을 제공한다.

같은 페이지의 [400 어휘표](https://www.telc.net/fileadmin/user_upload/Downloads_Verlag/Einfach_besser_100_400_500/Wortschatzlisten/Einfach_besser_400_Wortschatzliste_Deutsch.pdf)도
후보다. 다만 “B2 교재에 수록됨”과 “개별 단어의 최초 수준이 B2임”은 다르다.
기존 A1~B1 결과를 덮어쓰거나 나머지를 전부 B2라고 확정해서는 안 된다.

추가로 [telc Deutsch B1·B2 Pflege 공식 핸드북 발췌](https://shop.telc.net/media/catalog/product/file/5036B01010201bib.pdf)를
확인했다. PDF 16쪽, 인쇄 108쪽에는 일반어휘 기반에 약 1,100개 간호 전문어를 더한다고
설명한다. **실제로 받은 파일은 17쪽 발췌본**이므로 1,100개 전체 목록을 확보했다고
보고하지 않는다. B1·B2 전문시험 자료이므로 일반 B2 단일 등급표와도 다르다.

Goethe B2의 별도 어휘표가 없다는 오래된 공식 설명도 검색됐으나 그 PDF 직접 요청은
404였다. 이 검색 결과만으로 현재 정책 전체를 단정하지 않는다. 이번 범위에서는
현 Goethe A1~B1 자료를 대체하는 공개 일반 B2~C2 단어별 확정 표를 찾지 못했다.

**권고:** 현 A1~B1 근거를 유지하고 `telc B2 직업언어 교재 수록 어휘`처럼 별도 출처
유형으로 활용을 검토한다. 사이트가 무료 다운로드를 제공한다는 사실과 앱 재배포
허가 여부는 구분한다.

## TOCFL — 현 공식 배포본을 이미 사용한다

[TOCFL 공식 참고어휘 페이지](https://tocfl.edu.tw/tocfl/index.php/exam/download)가 연결하는
[華語八千詞表 202409](https://tocfl.edu.tw/tocfl/assets/files/vocabulary/8000zhuyin_202409.zip)는
현재 `scripts/tocfl.ts`의 URL과 같다.

[國教院 공식 다운로드](https://coct.naer.edu.tw/page.jsp?ID=41)도
`14452詞語表202504`를 PDF/XLSX/ODS로 제공하며 현재 코드의 202504 XLSX와 같다.
페이지에는 별도의 일반 빈도표도 있지만, 그 파일이 더 새롭다는 이유만으로 시험
등급표를 대체하지는 못한다.

**권고:** TOCFL 등급은 八千詞表를 유지한다. 더 넓은 TBCL 14,452어를 활용할 때는
TBCL이라는 출처·척도를 명시한다. 능력척도의 대응과 “해당 단어의 TOCFL 공식 등급”은
서로 다른 주장이다. 현 후보 검증용 사용을 자동 등급 대입으로 바꿀 근거는 확보하지 않았다.

## JLPT — 현행 N등급 공식 어휘 목록은 비공개

[JLPT 공식 FAQ](https://www.jlpt.jp/sp/e/faq/index.html)의 2010년 개정 관련 설명은
어휘·한자·문법 목록을 담은 Test Content Specifications를 더는 출판하지 않는다고
명시한다. 따라서 제3자의 N1~N5 태그를 현행 출제기관이 지정한 목록이라고 소개할 수 없다.

공식 교육기관의 어휘 자료 자체가 없는 것은 아니다.
[Japan Foundation Marugoto 자료](https://marugoto.jpf.go.jp/en/download/)에는 수준별
어휘 목록이 있고, [중급 1 B1](https://marugoto.jpf.go.jp/en/download/intermediate1/) 페이지는
한국어를 포함한 번역 어휘 PDF를 제공한다.
[IRODORI](https://www.irodori.jpf.go.jp/en/about.html)도 JF Standard 수준의 교재·어휘 자료다.

**권고:** 일본어 표기·뜻·학습 콘텐츠 보충에 활용할 수 있다. JF/CEFR 교재 수준을 N등급으로
임의 환산하지 않는다. 현재 Jisho의 등급은 현행 JLPT 공식 전수표가 아니라는 설명을 유지한다.

## DELF — 현재 단일 등급도 연구모형에서 산출됐다

[FLELex 공식 연구팀 다운로드](https://cental.uclouvain.be/cefrlex/flelex/download/)는
Beacco 판 14,236개 표제어와 A1~C2 수준, CC BY-NC-SA 4.0을 제공한다.
더 큰 CRF 판은 17,871개이며 복합표현을 포함하지만 단일 수준 대입 문제를 해결하는
별도의 공식 시험 등급표는 아니다.

[Pintard·François 원 논문](https://aclanthology.org/2020.readi-1.13/)은 프랑스어 Reference
Level Description으로 통계모형을 학습하여 FLELex의 수준별 빈도를 단일 CEFR 수준으로
변환한다고 설명한다. 즉 **우리가 런타임에 추정하지 않는다는 사실이 원자료의 등급도
직접 공식 지정되었다는 뜻은 아니다.**

[FEI 공식 자료 페이지](https://www.france-education-international.fr/diplome/ressources-dilf-delf-dalf-tcf?langue=en)와
연결된 [Inventaire linguistique PDF](https://www.france-education-international.fr/document/cecrl)도
확인했다. PDF는 112쪽의 언어내용·기능·문법·어휘영역·학습 시나리오 자료이며, 현
14,236개 단어 등급 테이블을 대체하는 같은 형태의 전수 목록을 확인하지 못했다.

**권고:** 공식 출제 등급으로 소개하지 말고 FLELex/Beacco 기반 CEFR 참고 등급임을
명시한다. “어떤 형태의 추정도 쓰지 않는다”가 엄격한 제품 요구사항이라면 이 출처는
재검토 대상이다. 이번에 FEI 직접 지정·전수 공개·단어별 A1~C2를 모두 만족하는 더 나은
데이터는 찾지 못했다.

## 실측으로 닫은 항목 (2026-09-06)

조사 뒤에 “바꿀 수 있나”를 숫자로 확인했다. 앱 데이터는 HSK 외에는 바꾸지 않았다.

**HSK — 바꿨다.** `o`·`n`·`t` 가운데 어느 것이 최신인지 급별 낱말 수로 갈랐다
(`t` 294·491·978·1950·3497·5181·10057 ↔ 공식 300·500·1000·2000·3600·5400·11000).
두 판이 다 아는 우리 낱말 1,692개 중 925개(54.7%)가 등급이 달랐다. `t`로 옮겼고
등급 붙는 낱말은 1,837 → 1,734로 줄었다 (scripts/define.ts).

**TELC — 바꿀 이유가 없다.** telc 400·500 어휘표 PDF에서 낱말을 긁어(고유 1,521개)
우리 독일어 표기와 맞춰 봤다.

| 잰 것 | 값 |
| --- | ---: |
| 우리 독일어 표기 | 4,774 |
| 등급 있음 (Goethe A1~B1) | 1,263 |
| 빈칸 | 3,511 |
| **빈칸 중 telc 목록에 있는 것** | **12 (0.3%)** |
| telc 목록 낱말 중 Goethe A1~B1에도 있는 것 | 308 / 1,521 (20.2%) |

두 숫자가 각각 다른 것을 말한다. 0.3%는 **얻을 것이 없다**는 뜻이고, 20.2%는
“B2 교재에 실렸다”가 “그 낱말의 최초 수준이 B2다”와 다르다는 것을 그대로 보여
준다 — 목록의 5분의 1이 이미 A1~B1 낱말이다. 독일어 빈칸 3,511개는 실재하는
구멍이지만 이 자료로는 메워지지 않는다.

**TORFL — C1 확장 불가를 재확인했다.** `POST /380`을 등급별로 다시 조회했다.

| level_id | count |
| --- | ---: |
| 1 (A1) | 719 |
| 2 (A2) | 1,168 |
| 3 (B1) | 2,000 |
| 4 (B2) | 4,361 |
| 5 (C1) | **0** |
| 6 (C2) | **0** |

화면에 필터가 보여도 데이터가 없다. C1은 종이책뿐이다.

**TOEIC·JLPT·DELF·TOCFL — 바꿀 대상이 없다.** TOEIC 공식 1,800어는 유료 교재이고,
JLPT는 출제기관이 목록 출판을 중단했으며, DELF는 FLELex/Beacco 말고 낱말별 표가
없고, TOCFL은 이미 현 공식 배포본을 쓴다.

## 다음 작업의 우선순위

1. HSK: 채택할 시험 판본을 구분한 뒤 공식 대강과 `newest` 데이터 대조. 현재 `n` 선택을
   단순히 “현행”이라고 부르는 설명 정비.
2. DELF: FLELex/Beacco가 학술적 추정 수준이라는 출처 설명 정비.
3. TELC: B2 직업언어 자료를 일반 단어 등급과 별도의 보충 자료로 검토.
4. TOEIC·TORFL: 공식 유료 원자료의 데이터 제공·재사용 경로가 확보되면 교체·확장 검토.
5. TOCFL·JLPT: 현재 확인된 근거보다 강한 단어별 시험 등급 자료가 생기기 전에는 유지.

## 검증과 조사 한계

- 공식기관 페이지와 실제 파일·응답을 우선했다. 검색 결과의 게시일보다 문서 표지·공식
  발표일을 우선했고, HSK의 표지 시행일과 실제 시범시험 공지를 함께 기록했다.
- HSK PDF는 수준 경계·일부 실제 단어를 대조했다. 표 행 추출은 줄바꿈·동형어·품사
  부가표시를 완전히 정규화한 파서 검증이 아니므로 앱 전체 교체 검증으로 간주하지 않는다.
- telc B2 어휘 PDF, FEI 언어내용 PDF, TORFL JSON 응답을 직접 확인했다.
- 검색 결과에 나타난 무료 열람 팝업·부분 발췌본·깨진 PDF 링크를 전체 원문 확보와
  구분했다. 유료 책을 구입하거나 로그인·결제를 진행하지 않았다.
- 출처를 교체하거나 등급을 변경하는 작업은 하지 않았다. “찾지 못함”은 이번에 조사한
  범위의 결과이지 모든 웹사이트에 자료가 없다는 증명이 아니다.
- 주관기관·공식 교육기관·원출판사·연구팀·현재 저장소까지 비교한 뒤, 반복되는 사설
  암기목록은 더 조사해도 공식성 판단이 달라지지 않아 수집을 중단했다.

context-mode 검색 라벨: `HSK official current syllabus landing`,
`HSK official rollout announcement`, `Current HSK GitHub data provenance`,
`TOEIC official 2026 1800 vocabulary release`, `TOEIC TSL author current version`,
`TORFL C1 original publisher fourth edition`, `TORFL current public dictionary levels`,
`TELC official teaching vocabulary downloads`, `TOCFL official downloads current`,
`TOCFL NAER official current lists`, `JLPT official vocabulary policy`,
`Japanese JF official B1 vocabulary download`, `DELF FLELex original download methodology`,
`FLELex Beacco original paper evidence`, `DELF official resources and reference books`.
