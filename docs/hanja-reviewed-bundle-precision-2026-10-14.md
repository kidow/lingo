# 한자 검증 데이터의 배포 컴파일 정밀도 오류

Vercel의 `/debug` 구성 수집 중 batch788의 정확 일치 검증이 실패했다.
원본 TypeScript 상수와 JSON은 Node에서 일치했으며, 기존 테스트도 통과했다.

Next.js 16.3.3의 작은 개발용 route에서 실제 Turbopack 변환을 재현했다.
차이는 `bundle[0].outlines[2][0].revealWidth` 한 값이었다.

- 원본 및 TypeScript 상수: `14.595417999999999`
- Turbopack JSON import: `14.595418`

Turbopack은 JSON을 Rust에서 파싱한 후 다시 직렬화하여 모듈로 만든다.
설치 버전의 [JSON 변환 구현](https://github.com/vercel/next.js/blob/v16.3.3/turbopack/crates/turbopack-ecmascript/src/json_source_transform.rs)을 확인했다.
따라서 소수 정밀도 차이가 `JSON.stringify`의 정확 일치 조건을 깨뜨렸다.

## 수정

같은 중복 JSON import와 정확 일치 초기화를 사용하는 502개 GlyphWiki 묶음에서
실행용 export가 기존 `EXPECTED` 상수를 직접 사용하도록 했다.
export 타입은 기존 검증 함수의 `ReturnType`으로 유지한다.

검증 함수는 그대로 남아 있다. 원본 JSON과 상수의 정확 비교 및 잘못된 필순,
경로, 출처, 가중치 거부 동작도 유지한다. 숫자 허용 오차를 추가하지 않았으며,
상수의 내용, `as const`/기존 타입 선언, 공개 JSON, 필순, 경로, 출처 기록은 바꾸지 않았다.
앞으로 같은 묶음을 생성할 때도 실행용 export는 상수를 사용하고, 원본 JSON은
검증 함수와 테스트에서 비교해야 한다.

## 확인

- 실제 Turbopack route: 수정 전 JSON 비교 실패를 재현했다.
- 수정 후 같은 route: 실행용 데이터가 원본 상수와 정확히 일치했고 원래 숫자를 유지했다.
- 502개 묶음: 상수와 원본 JSON 일치, 상수 및 정확 비교 함수의 내용 보존 확인.
- batch788 테스트 4개 통과. 반올림된 `14.595418`을 넣으면 계속 거부하는 회귀 테스트를 추가했다.
- TypeScript 검사 통과.
- 전체 빌드, 전체 테스트 모음, 푸시, 배포는 실행하지 않았다.

임시 재현 route와 실험용 loader는 확인 후 제거했다.
