# DELE 수준별 공개 어휘 자료 조사

확인일: 2026-09-06

## 결론

스페인어 낱말·표현에 A1~C2 수준을 명시한 공식 공개 자료는 존재한다. Instituto
Cervantes의 PCIC 어휘 표가 일차 출처다. 새로 확인한 GEOLEXI에서는 일부 어휘의
PCIC 등급과 의미, 출처 링크를 공개 검색의 JSON 응답으로 조회할 수 있다.

따라서 현재 `spec.md:90`과 `scripts/coverage.ts:298`의 “낱말별 등급을 담은 공개
목록이 없다”는 설명은 너무 넓다. 정확한 설명은 “공식 자료는 있지만 전체 목록의
자동 수집·재사용 경로를 아직 채택하지 않았다”이다. 기존 PCIC 크롤러 제한과
ELELex의 빈도 분포 문제는 이번에도 확인되었다.

이번 작업은 출처 조사와 조회 검증이다. 앱 코드·콘텐츠의 등급은 변경하지 않았다.

## 1. PCIC: A1~C2 공식 어휘 표

제공 기관: Instituto Cervantes. 주제별 어휘는 `9. Nociones específicas`에 있다.

| 원문 | 실제 표의 등급 열 | 확인한 예 |
| --- | --- | --- |
| [A1–A2](https://cvc.cervantes.es/ensenanza/biblioteca_ELE/plan_curricular/niveles/09_nociones_especificas_inventario_a1-a2.htm) | A1, A2 별도 | A1: ojo / A2: cabeza |
| [B1–B2](https://cvc.cervantes.es/ensenanza/biblioteca_ELE/plan_curricular/niveles/09_nociones_especificas_inventario_b1-b2.htm) | B1, B2 별도 | B1: músculo / B2: cerebro |
| [C1–C2](https://cvc.cervantes.es/ensenanza/biblioteca_ELE/plan_curricular/niveles/09_nociones_especificas_inventario_c1-c2.htm) | C1, C2 별도 | C1: ombligo / C2: epidermis |

세 페이지의 본문과 표를 실제로 조회했다. 파일명에 두 등급이 묶여 있어도 표 안에서는
각각 구분되므로, A1/A2 등을 임의로 나눌 필요가 없다.

공식 [전체 목차](https://cvc.cervantes.es/ensenanza/biblioteca_ELE/plan_curricular/indice.htm)에는
추상적 개념과 표현을 다루는 `8. Nociones generales`도 있다. 9장만을 스페인어 어휘
전체로 취급해서는 안 된다.

[공식 소개](https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/niveles/09_nociones_especificas_introduccion.htm)는
이 목록이 닫힌 목록이 아니라고 명시한다. 따라서 “DELE에 출제되는 모든 단어의
확정 목록”이라고 소개해서는 안 된다. 수준별 학습 내용의 공식 참고 자료다.

수집 제한은 남아 있다. [robots.txt](https://cvc.cervantes.es/robots.txt)를 재조회한 결과,
일부 검색엔진은 별도 규칙을 적용받지만 일반 `User-agent: *`에는 `Disallow: /`가
적용된다. 이번 조사 도구로 본문을 읽을 수 있었다는 사실이 일괄 수집 허용이나
재배포 라이선스를 뜻하지 않는다.

## 2. GEOLEXI: 단어·뜻·PCIC 등급을 반환하는 공식 공개 검색

[GEOLEXI](https://geolexi.cervantes.es/)는 Instituto Cervantes와 UNED의 연구를 바탕으로
PCIC 어휘와 지역별 동의어를 제공한다. 공개 안내에서 항목의 의미, PCIC 수준,
주제, 지역별 용례를 제공한다고 설명한다. PCIC 전체를 담는 사전은 아니다.

### 실제 응답 확인

공개 화면에서 사용하는
[클라이언트 코드](https://geolexi.cervantes.es/js/js_geolexi.js)의 요청 형식을 확인한 뒤,
동일한 읽기 전용 검색 요청으로 응답을 검증했다. 로그인은 사용하지 않았다.

- 전체 항목 수: [공개 카운터](https://geolexi.cervantes.es/geolexiUtils.php?action=getTermCount)가
  `count: 1428`을 반환했다. **등급이 있는 항목 수가 아니라 전체 항목 수다.**
- 조회 경로: `POST https://geolexi.cervantes.es/geolexiPHP.php`
- 형식: `application/x-www-form-urlencoded`
- 검색 필드: `palabra`, `significado`, `color`, `radio`. 단순 단어 조회에서는 마지막
  세 필드를 빈 문자열로 보냈다.
- 응답에서 확인한 필드: `termino`, `significado`, `tema`, `nivel.nombre_nivel`,
  `nivel.url_nivel`.

| 검색어 | 실제 응답 | 주의점 |
| --- | --- | --- |
| piso | A1, 주거 의미, PCIC A1–A2 원문 링크 | 층·바닥 등 다른 뜻에 자동 적용하면 안 됨 |
| acera | B2, 보도 의미, PCIC B1–B2 원문 링크 | 공식 단일 등급 조회 성공 |
| trabajo | A1 | 직업·보수를 받는 활동의 의미 |
| chamba | sin nivel | 동의어에 등급을 전파하면 안 됨 |
| grifo | sin nivel | 항목이 있어도 수준이 없을 수 있음 |
| coche, ordenador, autobús | 검색 결과 없음 | 기본 단어도 빠진 부분 목록임 |

`errorBD`라는 값은 위 사례에서 “검색 결과 없음”이라는 메시지와 함께 반환되었다.
HTTP 200만으로 유효한 낱말이나 등급이 있다고 판단하면 안 된다.

이 호스트의 `/robots.txt`는 HTTP 404였다. 이는 별도의 robots 파일을 찾지 못했다는
뜻이며 재배포 허가의 근거는 아니다. 사이트는 저작권 보유를 표시한다. 공개 조회는
검증했지만, 정식 공개 API 계약이나 전체 데이터의 개방형 라이선스는 확인하지 못했다.

**활용 판단:** 현재 앱의 스페인어 표기와 의미가 일치하고 응답에 명시적 등급이 있는
항목을 대조하는 첫 후보다. 전체 어휘 커버리지와 수준별 항목 수는 아직 측정하지 않았다.

## 3. ELELex: 다운로드 가능하지만 단일 등급이 아님

[공식 배포 페이지](https://cental.uclouvain.be/cefrlex/elelex/download/)에서 14,290개
항목과 [TSV 다운로드](https://cental.uclouvain.be/cefrlex/static/resources/es/ELELex.tsv)를
확인했다. 제공 범위는 A1~C1이고, 교재·읽기 자료에서 관찰한 수준별 빈도 분포다.
라이선스 표기는 CC BY-NC-SA 4.0이다.

**활용 판단:** 어휘 후보를 찾는 데 유용하지만, 첫 출현 수준이나 최대 빈도의 수준을
선택하는 것은 별도 추정 규칙이다. 현재 프로젝트의 “추정하지 않는다” 원칙을
만족하는 단일 등급 자료로 채택할 근거는 이번에도 찾지 못했다.

## 4. iRead4Skills: 공개 XLSX 3,033행, 자체 난이도 라벨

[연구팀 자료 페이지](https://iread4skills.com/tools-resources/)가 직접 연결하는
[Zenodo 데이터](https://zenodo.org/records/10889986)를 확인했다.

ZIP을 실제로 읽어 `Spanish/Spanish_lexicon.xlsx`를 검사했다. 시트에는 헤더 없이
3,033행이 있으며 단어, 품사, 의미 부류, 난이도 값이 들어 있다. 난이도 값은
`Very Easy`, `Easy`, `Plain`이다. 예를 들어 `abandono`는 `Easy`로 기록되어 있다.

배포 설명은 이 난이도들을 A1, A2, B1에 **대략 대응**한다고 한다. CEFR 등급 자체가
입력된 파일이나 DELE 공식 등급 목록은 아니다.

배포 페이지의 권리 표시는 CC BY 4.0과 별도의 CC BY-NC-ND 4.0 설명이 함께 있어
재사용 조건이 일관되게 명시되었다고 판단하지 않았다.

**활용 판단:** 출처가 있는 학술 어휘 목록이지만, 라벨을 곧바로 A1~B1로 바꿔 앱에
넣으면 근사 대응을 확정 등급으로 바꾸게 된다. 이번 조사에서는 채택하지 않는다.

## 5. 공개 저장소·학습 서비스 추가 확인

| 후보 | 확인 내용 | 등급 근거로서의 판단 |
| --- | --- | --- |
| [Talhakasikci/cefr-vocabulary-dataset](https://github.com/Talhakasikci/cefr-vocabulary-dataset) | 스페인어 A1~B2 JSON/CSV. 비공식·자동/반자동 작성, 라벨 오류 가능성을 README에 명시 | 공식 등급 대조 자료로 바로 채택하기 어려움 |
| [natema/wordhoard](https://github.com/natema/wordhoard) | 공개 설명에서 독일어 외 CEFR 값을 빈도 기반 추정으로 명시 | 프로젝트의 무추정 원칙에 맞지 않음 |
| [REELEX](https://www.reellexicon.com/) | PCIC 기반이라고 소개하는 학습 영상 서비스. 사이트 본문 확인 | 검증 가능한 전체 단어별 다운로드 표를 확인하지 못함 |
| [kimtth Anki 저장소](https://github.com/kimtth/learn-anki-deck-es-fr-de-it-cn) | Langenscheidt A1~B2 교재 기반이라고 설명 | 공개 저장소에 있다는 사실만으로 원자료 재사용 근거가 되지 않음 |
| [어휘 자료 연구 목록](https://github.com/fildpauz/vocab-lists) | 스페인어 항목은 ELELex, 빈도 사전, 원어민 어휘 지식 자료 등을 안내 | 추가로 채택할 수 있는 단일 CEFR 등급표는 확인하지 못함 |

검색은 한국어 요청을 바탕으로 영어·스페인어 질의로 진행했다. 공식 PCIC와 GEOLEXI,
CEFRLex, 연구기관·학술 저장소, GitHub, Anki 및 학습 서비스까지 조사했다.
“모든 웹사이트에 대안이 없다”는 부재 증명이나 전 웹 완전 검색을 주장하지 않는다.

## 적용 방향

1. **공식 등급의 근거:** PCIC의 각 수준 열과 해당 의미·표현.
2. **자동 조회의 첫 후보:** GEOLEXI에서 일치하는 단어·의미·명시적 PCIC 등급만
   수집하고 원문 링크를 보존한다. 실제 통합 전 재사용 범위를 확인한다.
3. **빈칸 처리:** 없는 단어, `sin nivel`, 의미가 다른 동형어는 그대로 비운다.
   동의어의 등급이나 빈도 기반 등급을 물려주지 않는다.
4. **전체 범위 확장:** PCIC의 정식 데이터 제공 또는 허용된 재사용 경로를 확보해야 한다.
   이번에 A1~C2 전체를 자유롭게 재배포할 수 있는 공식 CSV/JSON까지 확보한 것은 아니다.

## 6. 우리 콘텐츠 대비 실측 (2026-09-06)

조사 뒤에 “쓸 수 있나”를 문구가 아니라 숫자로 정하려고 GEOLEXI 공개 검색에 우리
스페인어 표기를 직접 물어봤다. 읽기 전용 조회이며 앱 데이터는 바꾸지 않았다.

| 표본 | 등급이 온 것 | 적중률 |
| --- | --- | --- |
| es 표기 전체(4,774개)에서 150개 | 4 | 2.7% |
| 한 낱말짜리(3,096개)에서 150개 | 17 | 11.3% |

콘텐츠 전체로 환산하면 **약 350개 · 7% 언저리**다. 이론 상한도 낮다 — 공개
카운터가 돌려준 전체 항목이 1,428개라, 우리 표기와 전부 맞아떨어져도 30%가
천장이다. 같은 자리의 다른 트랙은 DELF 47.9% · JLPT 46.2% · TORFL 38.7% ·
TELC 26.4%다.

두 가지를 덧붙여 확인했다.

- **등급은 낱말이 아니라 뜻에 붙는다.** `trampa`는 B2로 오지만 뜻이 “속임수”이고
  우리 개념은 덫이다. 표기로 맞추면 다른 뜻의 등급을 물려받는다(spec.md §7의
  `Bank`·`Karte` 함정과 같다). 등급이 온 17개 중 1개가 그랬다.
- **결과 없음이 HTTP 200으로 온다.** `[{"termino":"errorBD", …}]` 한 줄이다.
  이걸 가리지 않고 세면 “항목 있음”이 크게 부풀어 보인다 — 처음 측정에서 실제로
  146개로 잘못 셌고, 다시 재니 141개가 결과 없음이었다.

**판단:** 채택하지 않는다. 스크립트·캐시·뜻 대조를 붙여 얻는 것이 카드 350장의
레벨 줄이고 그중 일부는 다른 뜻의 등급이다. 결론은 “목록이 없다”가 아니라
**“전량을 우리 기준으로 받을 길이 없다”**로 spec.md와 coverage 출력에 옮겨 적었다.

## 검증 범위와 지식베이스 검색 라벨

- PCIC의 세 수준쌍 페이지 본문·표, 공식 소개, 현재 robots 규칙을 확인했다.
- GEOLEXI 공개 카운터와 공개 검색의 JSON 응답을 확인했다.
- iRead4Skills ZIP 내부의 스페인어 XLSX와 실제 행·라벨을 확인했다.
- 앱 코드·데이터를 변경하지 않았으므로 앱 테스트 대신 출처 접근과 응답 구조를 검증했다.

context-mode 검색 라벨:

- `PCIC official A1 A2 specific vocabulary`
- `PCIC official B1 B2 specific vocabulary`
- `PCIC official C1 C2 specific vocabulary`
- `CVC robots current`
- `GEOLEXI official lexical levels`
- `GEOLEXI public client API`
- `GEOLEXI live term count`
- `ELELex official download and license`
- `iRead4Skills Basic Lexicons dataset`
- `Community CEFR dataset provenance`
