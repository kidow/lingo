# 2급 暹~穩 50자·622획 검토

2026-09-16. **50자 전부 적용, 보류 0자.** 한국어 e-hanja 사전의 각 글자 필순·진행 방향·획 경계·최종 자형을 대조했다. 33자의 경로 99획을 보정하고, 보정된 33자도 전체 획을 다시 검토했다.

## 결과

- 유지한 경로 523획, 자체 보정 99획, 필순 배열 조정 6자.
- 필순 조정: 暹·燮·瑟·淵·盈·濊. 글자별 순열은 [corrections.json](corrections.json)에 기록했다.
- 연결·간격 보정: 日·目·門 등 내부 가로획의 연결, 糹의 세로획과 양쪽 점, 殖의 마지막 ㄴ형 획과 안쪽 획 간격, 閼의 마지막 올림획, 穩의 爫·工·彐·心 등을 개별 대조했다.
- 최초 관찰은 [initial-observations.json](initial-observations.json), 최종 판정과 재검토 메모는 [observations.json](observations.json)에 보존했다. 殖은 간격 검사에서 발견한 시작점 근접을 추가 보정하고 12획을 다시 대조했다.
- 재현 검증 통과, 한자 테스트 **262개/43파일 통과**, TypeScript·프로덕션 빌드 통과.

## 출처와 재현

검증 표시는 `ehanja-crosschecked`다. 민간 사전과의 교차검토이며 한국어문회 등 시험 주관 기관의 공식 인증을 의미하지 않는다. 각 원본 SVG의 URL·바이트 수·SHA-256, 필순 지연 순서와 좌표 변환을 [source-checks.json](source-checks.json)에 기록했다. 필순과 방향은 전체 누적 단계 및 25·50·75·100% 드러남을 직접 비교했으며, 시간 간격이 같다고 가정하지 않았다.

재생 경로는 공개 라이선스의 Make Me a Hanzi 44자와 AnimCJK 일본어 자료 6자(暹·貰·邵·隋·倻·墺)를 사용했다. 실제 출처·커밋·해시·원본 중앙선은 [originals.json](originals.json), 재배열과 보정 경로는 [proposals.json](proposals.json)에 있다. 보정 경로마다 파생된 원래 획 번호를 보존했다. 두 자료의 Arphic Public License와 저작자 표기는 [배포 안내](../../public/hanja-strokes/README.md)를 따른다.

사전 SVG와 렌더링 이미지는 메모리에서만 열람했고 저장·재배포하지 않았다. 사전 외곽선은 재생 경로로 복제하지 않았다. 정적 Noto SVG와는 별도 경로이며 자필 정답 판정 기능은 추가하지 않았다.

```sh
node docs/hanja-g2-batch5-2026-09-16/prepare.mjs
node docs/hanja-g2-batch5-2026-09-16/verify.mjs
node --test lib/hanja-stroke-dictionary-g2-batch5.test.ts
pnpm build
```

`prepare.mjs`는 읽기 전용 컴파일러이며 표준 출력만 반환한다. `verify.mjs`는 배포 데이터 재현·출처 해시·전체 적용 현황·다음 후보를 검사한다. 검토 도구 `acquire.mjs`와 `serve.py`는 로컬 수집·열람용이며 사전 접근이 필요하다.

## 누적 현황

| 범위 | 적용 | 남음 | 적용률 |
|---|---:|---:|---:|
| 전체 | 2068/5978 | 3910 | 34.6% |
| 8급~3급 | 전부 | 0 | 100% |
| 2급 | 250/538 | 288 | 46.5% |

전체 적용 획은 **22,854/74,557획**이다. 급수별 상세는 [progress.json](progress.json)에 있다. 2급 잔여 288자 중 전체 획 검토 대기 207자와 별도 출처·보정 검토 대상 81자가 남았다.

다음 권장 작업은 **甕~佾 50자·574획**의 개별 검토다. [next-batch.json](next-batch.json)의 자료 확보 조건은 승인 판정이 아니며, 전체 획 검토를 거쳐야 적용한다.
