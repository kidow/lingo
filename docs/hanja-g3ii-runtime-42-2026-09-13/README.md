# 笛·蹟·稚 3자·42획 런타임 반영

2026-09-13. 검토가 끝난 笛 11획, 蹟 18획, 稚 13획을 학습·쓰기 연습에서 사용하는 획 데이터에 추가했다. 기존 재생 컴포넌트의 자동재생·다시 재생 경로에서 조회할 수 있다. 화면에서의 실제 재생 확인은 아래 제한이 남는다.

## 적용 근거

- 국내 순서 근거는 **모야랜드 번호도해**, 방향 근거는 개별 검토한 대만 교육부 자료다. `moyaland-numbered`로 분류하며 한국어문회 인증이나 검정 교과서 영상으로 표시하지 않는다.
- [누락 17개 보완](../hanja-g3ii-missing-17-2026-09-13/README.md), [63획 교차검토](../hanja-g3ii-crosscheck-63-2026-09-13/README.md), [42획 경로 검토](../hanja-g3ii-paths-42-2026-09-13/README.md)의 근거 파일 8개를 SHA-256으로 고정했다. 새 누적 이미지 17장을 확보했다는 뜻이 아니다.
- 배포 경로는 고정된 Make Me a Hanzi 원본 중 해당 3자의 medians에서 재현한다. 笛은 보정 없이 사용하고, 蹟 12획의 두 좌표와 稚 2획의 끝점은 기존 검토에서 확정한 보정을 유지했다.
- 출판사 도해·영상 및 교육부 원본 좌표는 배포하지 않는다. 출처 URL·해시와 라이선스가 있는 원본 medians, 검토된 파생 경로를 보관한다. 라이선스는 기존 `public/hanja-strokes/`의 관련 고지를 따른다.

## 코드와 보호 장치

- `public/hanja-strokes/numbered-reviewed.json`: 새 3자·42획 데이터.
- `lib/hanja-stroke-numbered.ts`: 별도 출처와 3자만 허용하는 런타임 로더. JSON 키 순서는 의미에 영향을 주지 않는다.
- `scripts/hanja-stroke-numbered.ts`: 원본·근거 해시와 보정 경로를 재현·검증한다. `scripts/split.ts`에서 호출하여 빌드 전에 검사한다.
- `lib/hanja-stroke-numbered.test.ts`: 누락·중복·잘못된 출처·획수·순서·좌표 및 경로/해시 동시 변조를 검사한다.
- `lib/hanja-strokes.ts`, `scripts/hanja-stroke-audit.ts`: 기존 조회와 전체 코퍼스 감사에 연결했다.

## 검증과 현재 수량

| 항목 | 결과 |
| --- | --- |
| 한자 회귀 테스트 | 160/160 통과 |
| TypeScript 및 `pnpm build` | 통과, 정적 내보내기 완료 |
| 전체 원본 코퍼스 감사 | 통과, 재생 가능 1,476자 |
| 새 경로 원본 재현 | 3자·42획 일치 |
| 공개 JSON과 정적 내보내기 JSON | SHA-256 일치 |
| 전체 애니메이션 | 1,476 / 5,978자, 미적용 4,502자 |
| 3급II 신규 배정분 | 486 / 500자, 미적용 14자 |

브라우저 검증은 기존 개발 페이지의 로딩 정체와 임시 정적 서버 연결 실패로 완료하지 못했다. 이어 오류 페이지에 대한 브라우저 URL 정책 차단이 발생했다. 자동재생·다시 재생을 화면에서 확인했다고 기록하지 않는다. 페이지가 정상 접속될 때 3자를 찾아 소개 화면과 쓰기 연습의 자동재생·다시 재생을 확인해야 한다.

3급II 남은 14자: **訣·蓮·紋·奔·森·慈·遷·追·兔·透·弊·楓·響·還**. 다음은 선행 교차검토에서 자형 차이를 확인한 **訣·紋의 국내 자료에 맞춘 경로 보정 검토**를 권장한다.

기계 판독용 검증 요약: [verification.json](verification.json).

지식 기반: `Hanja numbered final metadata order regression`, `Hanja numbered final production build`, `Hanja numbered full corpus audit`, `Hanja numbered final runtime snapshot`.
