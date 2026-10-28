# 한능검 선택 의존성 타입 진단 수정

2026-10-28 기준. 빌드와 전체 프로젝트 타입 검사는 실행하지 않았다.

- `tsconfig.json`의 compilerOptions를 사용하고 rootNames를 `lib/hanja-stroke-dictionary-glyphwiki-batch1508.ts`와 해당 `.test.ts` 두 개로 제한했다. incremental과 emit은 사용하지 않았다.
- 수정 전 semantic 진단은 52건(TS2353 48건, TS2322 4건), 수정 후 같은 선택 의존성의 semantic 진단은 0건이다.
- 공통 `HanjaDictionaryStrokeData`에 실제 출처 메타데이터를 나타내는 선택 `HanjaGeometryLicense` 필드를 추가했다. 등록 데이터 1,001개의 메타데이터 필드 형태를 확인했으며, 임의 인덱스 시그니처나 `any`를 사용하지 않았다.
- batch1412·1413·1414·1415의 CORE에 기존 데이터 타입을 지정해 `direction`이 일반 string으로 넓어지는 추론을 막았다. 허용 방향의 타입 범위는 넓히지 않았다.
- 수정한 5개 파일은 ES2022/ESNext 변환 JavaScript의 SHA-256이 수정 전과 모두 같다. 경로·출처·라이선스 값·등록 배열·실행 동작은 변경하지 않았다.

## 집중 검증

선택 semantic 진단 0건. 다음 기존 테스트 파일 6개에서 23개 테스트를 실행해 15개 통과, 8개 실패를 확인했다.

- `lib/hanja-stroke-dictionary.test.ts`
- `lib/hanja-stroke-dictionary-glyphwiki-batch1412.test.ts`
- `lib/hanja-stroke-dictionary-glyphwiki-batch1413.test.ts`
- `lib/hanja-stroke-dictionary-glyphwiki-batch1414.test.ts`
- `lib/hanja-stroke-dictionary-glyphwiki-batch1415.test.ts`
- `lib/hanja-stroke-dictionary-glyphwiki-batch1508.test.ts`

중앙 사전·1508 테스트 15개는 통과했다. 1412~1415의 기존 테스트 8개가 실패했다. 대표 1412 실패는 현재 렌더러 `abf736…`를 과거 `6ecfc2…`와 비교하는 원본 핀 검사와 현재 적용 수 5,923을 과거 고정 수 5,827과 비교하는 검사다. 이 타입 변경은 렌더러·적용 수·변환 JavaScript를 바꾸지 않는다. 과거 승인 문서의 핀을 현재 값으로 덮어쓰거나 검사를 약화하지 않았고, 그 기존 테스트 정리는 이번 수정에서 제외했다.

## 변환 JavaScript 불변 해시

| 파일 | SHA-256 |
| --- | --- |
| hanja-stroke-dictionary.ts | 26ad2763cccc9a0883f0ab04ed804835c456b05238c4cdd72d3825804506a2e0 |
| batch1412.ts | 9f8a9e60f4113d325717da1fd49d229522e72c24d4cdcab6b59342b2e559fed5 |
| batch1413.ts | dd3c9a8567b3dcadb73924546076f571e54478039c88e8edbcaaa08feaf24ddf |
| batch1414.ts | 84641fc46be780e78aa7c8bc71815d63c289c76111cbd8e4b31edb5333a23ceb |
| batch1415.ts | 3774f4b41032428ef604742029f7cf1aa60858f528fdf0575129454cfa3a4553 |
