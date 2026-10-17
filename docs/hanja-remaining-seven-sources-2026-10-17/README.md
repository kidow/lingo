# 미적용 7자 공개 전체 자형 자료 확보

2026-10-17. 瀆·朕·讒·鱉·宬·篠·諞의 **공개 전체 자형과 의존 정의를 확보**했다. 국내 자형·필순 시각 검토와 런타임 적용은 하지 않았다. 기존 보류를 추가하거나 변경하지 않았다.

| 한자 | 급수 | 국내 목록 획수 | archive 기반 완전 whole proof | 고정 primary API | primary KAGE drawing groups |
|---|---|---:|---:|---|---:|
| 瀆 | 1급 | 18 | 5 | [u7006@18](https://glyphwiki.org/wiki/u7006@18) | 21 |
| 朕 | 1급 | 10 | 8 | [u6715-k@5](https://glyphwiki.org/wiki/u6715-k@5) | 12 |
| 讒 | 1급 | 24 | 4 | [u8b92@12](https://glyphwiki.org/wiki/u8b92@12) | 30 |
| 鱉 | 특급II | 23 | 5 | [u9c49-k@18](https://glyphwiki.org/wiki/u9c49-k@18) | 26 |
| 宬 | 특급II | 10 | 7 | [u5bac@13](https://glyphwiki.org/wiki/u5bac@13) | 11 |
| 篠 | 특급II | 16 | 6 | [u7be0@13](https://glyphwiki.org/wiki/u7be0@13) | 17 |
| 諞 | 특급 | 16 | 5 | [u8ade@8](https://glyphwiki.org/wiki/u8ade@8) | 19 |

**KAGE drawing group은 실제 필기 획이 아니다.** 위 숫자가 국내 획수보다 많다고 바로 불가능으로 판정하거나 임의로 합치지 않는다. 이어지는 primitive의 연결 근거와 국내 자료 대조가 별도로 필요하다. `-k`, Unicode/IVS 이름도 국내 자형 적합성의 증거로 쓰지 않는다. 현재 공개 페이지에서 鱉의 `-k`는 `u9c49-j`, 諞 기본형은 `u8ade-j`의 alias다.

## 자료 구성과 실제 검증

- 루트 `*-sources.json`: 고정 archive 전체 자형·지역형·IVS 후보와 역사 버전 의존 정의. 44개 요청 중 완전한 40개 whole proof를 저장했다. 불완전한 primary 4개도 숨기지 않고 누락 의존을 기록했다.
- `complete-primary/`: 위 primary 7개 모두의 완전한 고정 의존 폐쇄. archive에 없는 의존 정의 8개는 공개 API의 정확한 `@version`으로 별도 보완했다. 기존 archive 정의는 바꾸지 않았다. **서로 다른 날짜의 고정 정의를 조합한 폐쇄이며 단일 최신 snapshot이라는 뜻이 아니다.**
- `engine-whole-*.json`: 고정 KAGE 엔진 8파일로 실제 재현한 원본 polygons/groups/primitive trace. 경로·폭·순서·방향은 보정하지 않았다.
- `verify-source.mjs`: archive·라이선스 SHA, 공개 API 정의, KAGE 8파일 SHA, 47개 whole proof의 groups/trace/defaults를 독립 재현해 확인한다. 실제 실행 PASS. API가 JSON 키 순서를 바꾸므로 refetch는 identity를 의미적으로 비교하고, 저장된 응답의 직렬화 SHA와 definition data SHA를 각각 검증한다.
- 한자 7개를 현행 `hanjaStrokeData({glyph, strokes})`로 개별 조회한 결과 모두 미적용이다. 이 자료의 `nativeReviewCount`는 0이고 `runtimeApplied`는 false다. 서버·브라우저·빌드·Git 작업은 수행하지 않았다.

실행: `rtk proxy node docs/hanja-remaining-seven-sources-2026-10-17/verify-source.mjs`.

## 국내 기준과 다음 검토

급수·획수는 기존 한국어문회 목록의 고정 XLS 원본을 가져온 `content/hanja/characters/*.json` 기준이다. 원본 문서는 `배정한자 전체 대표훈음 부수 음표 명기본(xls).xls`, SHA256 `97b8db715ebe1dd6e00e8e58d338a9ba70e7420bf5ec84da38f987d60eb64b17`, sheet `배정한자`, 검증일 `2026-09-06`이다. [원본 안내 페이지](https://www.hanja.re.kr/kccpt/exam/levelConfirm.do)는 이번 Firecrawl 재조회가 `INVALID_ARGUMENT`로 실패하여 현재 응답을 확인했다고 주장하지 않는다.

기존 국내 사전 검토에서 남긴 구체적인 조건은 `research.json`에 출처 경로와 함께 기록했다. 瀆은 賣 가운데 四/罒, 朕은 月 안의 점/가로, 讒은 18획의 진입·내림, 鱉은 23/22획과 상단 순서·갈고리, 宬은 10/9획과 첫 점이 주요 대조 대상이다. 篠·諞은 이 조사에서 자형 세부 적합성을 새로 판정하지 않았다.

다음 작업은 브라우저 패널에서 완전 whole 후보들을 국내 자료와 먼저 대조하고, 맞는 자형에 한해 primitive 연결·실제 획수·순서·방향 검토용 후보를 준비하는 것이다. 이 캡처만으로 애니메이션을 승인하거나 등록하지 않는다.

## 라이선스

`NOTICE.md`, `archive-LICENSE.txt`를 함께 보존한다. 실제 고정 원문은 [일본어 라이선스 @18](https://glyphwiki.org/wiki/GlyphWiki:%E3%83%87%E3%83%BC%E3%82%BF%E3%83%BB%E8%A8%98%E4%BA%8B%E3%81%AE%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9@18)이다. 영어 `GlyphWiki:License@18`은 존재하지 않는 버전을 최신판으로 대체하므로 고정판 근거로 사용하지 않았다. 원본 자료가 허용하는 사용·수정·배포와 국내 필순의 정확성은 별개의 사항이다.
