# 한자 전체 SVG 표시 가능성 조사

확인일: 2026-09-07. 대상: 현재 한능검 트랙의 고유 한자 5,978자. 웹의 제작자 문서와 실제 공개 폰트 파일을 확인했다. 앱 코드·콘텐츠·설치 의존성은 변경하지 않았다.

## 확인된 결론

**완성된 글자 모양은 5,978자 모두 SVG 경로로 변환 가능함을 실제로 확인했다.** 한국어용 Noto Serif CJK KR의 기존 윤곽을 추출하는 방식이다. 모델이 자형을 새로 설계하거나 필순을 추정하는 방식은 아니다. 한국어문회가 공식 승인한 SVG라는 의미도 아니다.

획별 애니메이션은 별도다. 폰트에서 추출한 완성형 윤곽을 첫 획부터 마지막 획까지 쓰는 순서로 취급할 수 없다. 기존 공식 도해 검증 범위는 [필순 출처 기록](hanja-stroke-sources.md)을 따른다.

## 웹 근거

1. [Noto CJK 공식 저장소](https://github.com/notofonts/noto-cjk): KR을 Korean으로 구분한다. [Noto Serif CJK 다운로드 안내](https://github.com/notofonts/noto-cjk/blob/main/Serif/README.md)는 언어별 전체 OTF와 지역별 부분집합을 구분한다. 이번 검사는 한국어용 전체 OTF를 사용했다.
2. [OpenType.js 공식 문서](https://github.com/opentypejs/opentype.js/blob/master/README.md): OTF/CFF 윤곽 읽기, 문자에서 글리프 조회, 경로 생성, `Path.toSVG()`로 SVG `<path>` 출력 기능을 명시한다. 브라우저와 Node.js를 지원한다.
3. [Noto Serif CJK 라이선스](https://github.com/notofonts/noto-cjk/blob/main/Serif/LICENSE): SIL OFL 1.1. 사용·수정·소프트웨어와의 재배포를 허용하고, 폰트 재배포 시 저작권·라이선스 보존 및 해당되는 예약명 조건을 요구한다. [OFL 공식 FAQ](https://openfontlicense.org/ofl-faq/) 1.1은 윤곽을 이용한 그래픽 제작을 허용한다. 5,978개 글리프를 자산 묶음으로 배포할 때 단순 그림이라는 이유로 폰트 라이선스 의무가 사라진다고 가정하지 않고 원본 출처·저작권·OFL을 함께 보존한다.
4. [KanjiVG 공식 FAQ](https://kanjivg.tagaini.net/faq.html): 일본 손글씨 자형을 기반으로 하며 일본 JIS 한자에서 출발했음을 명시한다. [SVG 형식 문서](https://kanjivg.tagaini.net/svg-format.html)는 획별 경로와 순서를 제공한다고 설명한다. 이 사실은 한국어문회 전 범위의 자형·필순 일치 근거가 아니다.
5. [Hanzi Writer 공식 Raw Character SVG 문서](https://hanziwriter.org/docs.html#raw-character-svg): 기존 문자 데이터를 SVG로 표시하는 방법을 제공한다. 원자료가 Make Me a Hanzi라고 명시한다. 한국어문회 전체 한자와의 자형·필순 일치를 확인한 자료는 아니다.

## 실제 변환 검증

공식 폰트와 공개 파서를 메모리에만 읽어 현재 `content/hanja/characters/*.json`의 문자 전부를 순회했다. 결과 SVG 파일은 생성·배포하지 않았다.

| 항목 | 결과 |
| --- | --- |
| 원본 | [NotoSerifCJKkr-Regular.otf](https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/OTF/Korean/NotoSerifCJKkr-Regular.otf) |
| 판본 | 2.003 |
| 폰트 크기 | 24,539,640바이트 |
| 폰트 SHA-256 | `77b4b741f864d27f15e90f275b17106dde90b2ad28f82bab72dc95805db5fb42` |
| 변환기 | OpenType.js 1.3.4, [실제 사용한 배포 파일](https://unpkg.com/opentype.js@1.3.4/dist/opentype.js) |
| 입력 | 5,978자, 고유 문자 5,978개 |
| 유효 경로 생성 | 5,978자 |
| 누락 글리프 | 0자 |
| 변환 오류·빈 경로·비정상 경계 좌표 | 0자 |
| SVG path 문자열 총합 | 6,907,801바이트; 소수점 3자리, 압축 전, SVG 바깥 태그 제외 |

검사는 문자에 대응하는 글리프가 `.notdef`가 아닌지, 경로 명령이 비어 있지 않은지, 경계 좌표가 유한한지와 SVG 문자열 생성 성공 여부를 확인했다. 모든 글자를 사람이 시각 검수하거나 한국어문회 정자·필순 기준과 대조한 검사는 아니다. SVG 파일로 바꾸어도 원본 폰트의 자형은 그대로다.

## 적용할 경우의 범위

근거가 확보된 구현 방향은 **한국어용 공개 폰트의 윤곽을 빌드 시 SVG로 추출해 글자 표시를 통일하는 것**이다. 완성 글자 표시와 공식 검증 획 재생 데이터는 별도로 관리한다. 수천 개 자산을 한 번에 초기 번들에 넣을지, 글자별 파일로 불러올지는 구현 시 성능을 측정해 정한다. 현재 조사만으로 전체 필순 재생을 확대하지 않는다.

context-mode 자료명: `Noto Serif CJK official font formats`, `OpenType.js SVG export documentation`, `OFL official FAQ SVG outlines`, `Noto Serif CJK official license`, `KanjiVG Korean limitations`, `Hanzi Writer official Chinese stroke data scope`. 기계 검증 출력: `Actual SVG conversion coverage for all 5978 Hanja using official Korean Noto font`.
