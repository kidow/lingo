# 남은 한자 획 애니메이션: 근거와 제작 경로 심층 조사

조사일 2026-09-08. 대상: lingo 배정 한자 5,978자, 현재 승인 503자, 미적용 5,475자. 이번 조사는 앱 코드·승인 데이터·배포를 변경하지 않았다. 수치와 재현 방법은 `coverage.json`, 원문 상세는 `korean-evidence.md`와 `generation-evidence.md`에 기록했다.

## 결론

추가 적용을 위한 자료는 상당수 확보할 수 있다. 다만 **근거 없이 그리는 것과 한국 기준으로 정확하게 가르치는 것은 별개**다. 해외 획 데이터를 재생하거나 AI로 획을 생성하는 일은 가능하지만, 결과를 한국 한능검 필순 정답으로 취급할 근거는 생기지 않는다.

권장 경로는 **공개 획 데이터로 제작 후보 확보 → 한국 자료와 문자별 대조 → 자료가 부족하면 한국 한자 교육 전문가 검수**다. 전문가 검수 결과는 자체 검수로 표시하고 한국어문회 공식 자료 대조 상태와 구분한다. 검수 없이 생성한 순서는 내부 초안으로만 취급한다.

## 현재 범위와 새로 확인한 자료

현재 승인 목록을 제외하고 6종 공개 획 데이터를 실제 최신 커밋에 고정해 재집계했다. 미적용 5,475자 중 **4,702자**에 하나 이상의 제작 후보가 있으며 **773자**는 조사한 6종에 없다. 이 773자에 필순 근거가 없다는 뜻은 아니다. 반대로 후보가 있는 4,702자도 한국 기준 적용 승인을 받은 것이 아니다. 집계는 exact Unicode 기준이며 호환자·이체자·간번체를 자동 합치지 않았다.

| 공개 획 데이터 | 미적용 문자와 일치 | 그중 배정 획수 일치 |
| --- | ---: | ---: |
| AnimCJK Ko | 22 | 21 |
| AnimCJK Ja | 4,069 | 3,607 |
| AnimCJK ZhHans | 3,141 | 2,618 |
| AnimCJK ZhHant | 502 | 485 |
| Make Me a Hanzi | 4,289 | 3,682 |
| KanjiVG 기본 SVG | 4,074 | 미집계 |

행끼리 중복되므로 합산하지 않는다. 획수 일치는 필순·방향·획 경계·자형이 맞다는 충분조건이 아니다. 원문: [AnimCJK](https://github.com/parsimonhi/animCJK), [Make Me a Hanzi](https://github.com/skishore/makemeahanzi), [KanjiVG](https://github.com/KanjiVG/kanjivg). 파일별 해시와 고정 커밋은 `coverage.json`에 있다.

| 대조 자료 | 확인한 접근 수준 | 미적용 문자와의 관계 |
| --- | --- | --- |
| 비상 2022 고등 한문 | 기존 확보 XLSX를 다시 해시 검증, 1,800행 파싱 | 1,284자 exact 일치. 문자별 영상의 전체 필순 대조는 남음 |
| 대만 교육부 6,063자 | 공식 다운로드 CSV 전체 파싱; 모든 글자와 Unicode ID 일치 확인 | 4,079자 exact 일치. 대만 기준이므로 한국 기준 대조 필요 |
| 동아 2022 고등 한문 | 공식 QR 목록 6개; 囚·巡의 실제 MP4 존재 확인 | 6자 모두 비상 목록에 포함. 문자 수 추가 0, 교차 근거 추가 |
| 씨마스 2022 언어생활과 한자 | 공식 소개의 필순 ZIP 제공 안내 확인 | 로그인·교사 인증 게이트. 파일·문자 수 미확보 |
| 중국 GF0023-2020 | 교육부 규범 공개와 8,105자 대상 확인 | 중국 규범. 이번 조사에서 한국 카탈로그 전수 교집합 미집계 |
| 중국 GF3002-1999 | 20,902자 대상이라는 원문 범위 및 공개 PDF 다운로드 확인 | 받은 PDF는 8쪽. 20,902자 개별 필순표 전수를 확보한 것으로 계산하지 않음 |

비상과 대만 목록을 중복 제거하면 미적용 **4,121자**에 대조 경로가 있다. 나머지 **1,354자**는 이 두 목록에 없다는 뜻이며, 모든 공식 출처에 없다는 결론이 아니다. 동아의 6자 역시 이미 비상 목록에 있어 여기에 더하지 않는다.

근거: [비상 공식 교과서](https://text.vivasam.com/detail/186), [비상 공개 자료 뷰어](https://viewer.vivasam.com/qrviewer/viewer.html?qrcode=106502_171p_25_ST&teacher=false), [대만 교육부 공식 다운로드](https://stroke-order.learningweb.moe.edu.tw/resource.jsp?ID=1), [동아 필순 목록](https://qr.t25.kr/HI22CHC00TOT01101), [씨마스 공식 소개](https://viewer.cmass.kr/html/textbook/view_h_35.shtml), [씨마스 자료실](https://teachingsaem.cmass.kr/textbook-material/detail/552), [중국 교육부 2020 규범 발표](https://www.moe.gov.cn/jyb_xwfb/gzdt_gzdt/s5987/202102/t20210226_515113.html), [1999 규범 공개 PDF](https://hudong.moe.gov.cn/jyb_sjzl/ziliao/A19/201001/W020150902457900316281.pdf).

## 일반 규칙이나 SVG만으로 정답을 만들 수 없는 이유

1. **필순 규칙은 모든 글자에 유일한 답을 주지 않는다.** 한국어문회의 2004년 상담 답변은 일부 교차획의 두 순서 모두 틀렸다고 할 수 없다고 설명한다. 이를 현행 전수 채점정책으로 일반화하지 않는다. 국내 연구도 王·田처럼 일반 원칙만으로 순서를 확정하기 어려운 사례를 논의한다. 이 연구는 저자 초록을 확인했고 유료 본문은 확보하지 않았다. [한국어문회 상담 78](https://www.hanja.re.kr/klea/counsel/hanjaDetail.do?id=78), [한연석, 2013, KCI](https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART001831264).
2. **공식 사이트 안의 답변도 확정성 검토가 필요하다.** ‘월따말 류’ 상담 답변은 답변자 스스로 잘 모른다고 밝히며 유추를 제안한다. URL만으로 해당 필순을 승인하면 안 된다. [한국어문회 상담 9050](https://www.hanja.re.kr/klea/counsel/hanjaDetail.do?id=9050).
3. **같은 Unicode가 같은 지역 자형·필순을 보장하지 않는다.** AnimCJK도 언어별 차이를 경고한다. KanjiVG에는 일본 문부성의 1958년 필순 지침 등 참고문헌이 있어 무근거 자료는 아니지만 한국 기준과는 구분해야 한다. [Unicode CJK FAQ](https://unicode.org/faq/han_cjk.html), [AnimCJK README](https://github.com/parsimonhi/animCJK/blob/master/README.md), [KanjiVG 참고문헌](https://kanjivg.tagaini.net/ref.html).
4. **Noto의 완성 윤곽에는 필순 정답이 들어 있지 않다.** OpenType CFF의 윤곽 명령을 SVG로 옮겨도 사람이 쓰는 획의 경계·방향·순서가 복원되는 것은 아니라는 기술적 판단이다. [OpenType CFF 사양](https://learn.microsoft.com/en-us/typography/opentype/spec/cff), [Noto CJK](https://github.com/notofonts/noto-cjk).

## AI·자동 분해·합성의 실제 가능 범위

| 방법 | 가능한 일 | 해결하지 못하는 일 |
| --- | --- | --- |
| 기존 SVG/중심선 재생 | 제공된 순서로 JavaScript 애니메이션 구현 | 원본 순서의 한국 기준 정확성 판정 |
| 부수·구성요소 합성 | 이미 검증한 부품의 기하·제작 작업 재사용 | 전체 글자에서 부품 간 순서나 교차획 예외를 자동 확정 |
| CCSE, 2022 | 학습 데이터로 획 인스턴스 분할 | 주석 없는 모든 한국 한자의 필순 정답 복원 |
| 참조 영상 정합, 2023 | 순서가 있는 참조 획을 목표 자형에 맞춤 | 참조 없이 순서를 입증 |
| LVGM, WACV 2026 | 학습한 획 시퀀스로 벡터 글자 생성 | 한국 배정 한자 5,978자에 대한 교육용 필순 보증 |

논문 원문: [CCSE](https://arxiv.org/html/2210.13826), [참조 정합](https://arxiv.org/html/2307.04341), [LVGM](https://arxiv.org/html/2511.11119). 최신 LVGM도 Make Me a Hanzi·FZSJ 자료와 수작업 순서 주석을 사용한다. 약 90.7만 표본은 단어·성어·시구도 포함하며 서로 다른 한자 90.7만 자가 아니다. 따라서 모델은 제작 보조 수단으로 검토할 수 있지만 검증 출처를 대신하지 못한다.

Hanzi Writer는 데이터를 재생·평가하는 라이브러리다. Motion 역시 재생 효과의 구현 도구이지 필순 정답을 판정하는 근거가 아니다. AnimCJK·Make Me a Hanzi·Hanzi Writer의 데이터 계보는 겹치므로 일치를 독립된 여러 근거의 합의로 계산하지 않는다. [Hanzi Writer 데이터 로딩](https://hanziwriter.org/docs.html#loading-character-data-link), [데이터 저장소](https://github.com/chanind/hanzi-writer-data).

## 이용 조건

정확성을 검토할 자료와 앱에 복제·수정해서 배포할 자산은 구분한다. 대만 교육부 사이트는 애니메이션 등에 CC BY-NC-ND 3.0 TW 조건과 비상업적 iframe 이용 안내를 제공한다. 이를 앱용으로 자유롭게 수정·재배포할 수 있는 허가로 해석하지 않는다. 사실·방법을 참고하는 행위와 영상·SVG 표현물의 복제에 동일한 결론을 내리는 것은 이 조사 범위 밖이다. [대만 교육부 저작권 안내](https://stroke-order.learningweb.moe.edu.tw/page.jsp?ID=52), [해당 CC 조건](https://creativecommons.org/licenses/by-nc-nd/3.0/tw/deed.en).

AnimCJK 및 Make Me a Hanzi 계열 획 데이터의 Arphic Public License, KanjiVG의 CC BY-SA 3.0, Noto의 OFL은 서로 다른 조건이다. Hanzi Writer 코드의 MIT가 획 데이터까지 MIT로 바꾸지 않는다. 원본 라이선스·수정 표시 등 각 자산의 명시된 조건을 유지해야 한다. 교과서 영상의 공개 열람이나 학교 수업 사용 안내도 이 앱의 재배포 허락을 입증하지 않는다. [AnimCJK COPYING](https://github.com/parsimonhi/animCJK/blob/master/licenses/COPYING.txt), [KanjiVG 라이선스](https://kanjivg.tagaini.net/files.html), [비상 이용 안내](https://www.vivasam.com/support/notice/detail?noticeId=1570&page=3).

## 실행 권장안

1. 비상 목록에 있는 미적용 1,284자를 급수순으로 검토한다. 기존 검토 후보 20자 중 警은 획수 차이가 있어 별도 보류한다. 나머지 19자의 획수 일치도 아직 전체 필순 승인으로 올리지 않는다.
2. 문자별 원장에 원문 URL·영상/페이지 위치·확인 날짜, 한국 자형, 획수, 획 분할, 순서, 방향, 원본 데이터 계보·라이선스, 판정과 검수자를 함께 남긴다. 동아 자료는 같은 글자의 교차 대조에 사용한다.
3. 한국 자료가 없는 후보에는 대만·중국·일본 자료를 보조 근거로 확보한다. 지역 차이가 해결되지 않으면 전문가 검수를 거쳐 자체 교육 기준을 정한다. 이 결과를 공식 시험기관 확인과 같은 상태로 표시하지 않는다.
4. 이번 6종 공개 데이터에서 벡터를 찾지 못한 773자는 먼저 근거를 찾고 직접 경로를 제작하거나 자동화 초안을 보정한다. 검수 전에는 현재의 정적 SVG와 자유 쓰기를 유지한다.
5. 자동 검사는 데이터 누락, 획수, 경로 유효성, 재생 시작/완료, 회귀를 검사한다. 한국 필순의 의미적 정확성은 원문 대조와 사람 검수로 확인한다. 공개 허용 순서가 여러 개면 하나만 정답으로 단정하지 않는다.

## 조사 경계와 재현

모든 영상의 전 구간을 재생하거나 5,475자의 필순을 승인한 조사가 아니다. 교사 인증이 필요한 씨마스 ZIP은 받지 않았고 로그인 우회를 하지 않았다. 중국 규범의 전체 문자 교집합은 집계하지 않았다. 한국 정부·시험기관의 전체 5,978자 필순 전수 규범을 찾지 못했지만 존재하지 않는다고 단정하지 않는다.

GitHub 고정 커밋의 JSONL `character`를 추출하고 KanjiVG의 변형 접미사가 없는 기본 SVG 파일명을 코드포인트로 변환했다. 카탈로그는 `content/hanja/characters/*.json`, 승인 목록은 실제 `lib/hanja-strokes.ts`의 `HANJA_STROKES`를 읽었다. 대만은 공식 CSV 6,064행(헤더 포함), 비상은 기존 읽기 전용 `scripts/hanja-stroke-textbook-source.py --json`으로 XLSX 해시와 구조를 검증했다. 동일 글자를 중복 제거한 합집합만 계산했다. 결과 파일의 합계·차감 관계를 별도 검증했다.

## 출처 원장

모든 URL은 2026-09-08에 확인했다. 본문에 게시일이 없는 페이지는 게시일 미표시로 취급했다.

| 핵심 주장 | 1차 발행 주체·문서 | 발행/버전 | 확인 수준 |
| --- | --- | --- | --- |
| 복수 필순 가능 | 한국어문회 상담 78 | 2004-03-03 | 답변 본문 |
| 공식 도메인도 불확실한 답변 가능 | 한국어문회 상담 9050 | 2013-10-24 | 답변 본문 |
| 일반 원칙의 한계 | 한연석, 한문교육용 기초한자의 필순 考, DOI 10.17963/ccek.2013..41.261 | 2013 | KCI 저자 초록만 |
| 국내 1,800자 목록 | 비상교육 고등 한문 공개 XLSX | 2022 개정 교과서 계열 | SHA-256와 1,800행 검증 |
| 6,063자 대조 경로 | 대만 교육부 전체 필순 iframe CSV | 현행 다운로드 | 전체 행·Unicode 대응 검증 |
| 국내 교차 자료 | 동아출판 고등 한문 QR | 2022 개정 | 6자 목록, 샘플 2개 미디어 존재 |
| 추가 ZIP 존재 | 씨마스 언어생활과 한자 | 2022 개정 | 소개·접근 게이트, 파일 미확보 |
| 중국 규범 | 중국 교육부 GF0023-2020 / GF3002-1999 | 2020 / 1999 | 공식 범위, 후자 8쪽 PDF 내려받음 |
| 자동 생성의 한계 | CCSE / 참조 정합 / LVGM 연구 저자 | 2022 / 2023 / 2026 | 공개 논문 본문 |
| 제작 후보 4,702자 | AnimCJK / Make Me a Hanzi / KanjiVG | coverage.json 고정 커밋 | 실제 파일·Git tree 교집합 |

KB 주요 라벨: `Official Taiwan character list current Hanja overlap and Korean textbook union`, `Fresh exact-Unicode remaining Hanja coverage six upstream stroke datasets`, `Korean source memo current`, `Deep research generation memo current`, `Official China GF3002 PDF actual pages and appendix availability`.
