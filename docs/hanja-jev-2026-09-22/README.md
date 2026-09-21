# Jev 한자 연구 연동

TypeSafe 스킬과 [현재 HTTP 계약](https://docs.typesafe.ai/api.md)에 따라 연구용 CLI를 추가했다. 제품 브라우저 코드에는 연결하지 않는다.

```sh
node scripts/hanja-jev-review.mjs --dry-run docs/hanja-jev-2026-09-22/input.json
node scripts/hanja-jev-review.mjs docs/hanja-jev-2026-09-22/input.json
node --test scripts/hanja-jev-review.test.mjs
```

실제 실행은 환경변수 TYPESAFE_API_KEY를 사용하며, 실행 환경에 없으면 저장소 .env를 process.loadEnvFile로 읽는다. 키·인증 헤더·원본 오류 응답은 출력하지 않는다. 키가 없으면 요청 전에 중단한다. 출력은 JSON이며 파일을 자동 변경하지 않는다. 동일 입력을 다시 실행하면 API를 다시 호출하므로 검토에는 저장한 result.json을 재사용한다.

## 범위

[Jev는 텍스트 입력만 지원](https://docs.typesafe.ai/concepts/state.md)한다. 영어 검토 요약을 보내며 비공개 사전 SVG·HTML·이미지와 API 키를 state에 넣지 않는다. 한자 자체는 식별자로만 쓴다. 출처 조사, 전체 시각 대조, 실행 검증, 근거 부족의 네 가지 선택지를 독립 질문으로 한 번에 보낸다. 최대8후보, 고정 API 호스트, 리다이렉트 거부,30초 제한, 자동 재시도 없음, 응답 타입·분포 검사를 적용했다.

[인용 검증 패턴](https://docs.typesafe.ai/cookbooks/citation_check.md)을 참고하되, 이 도구는 이미 기록된 관찰의 다음 단계만 분류한다. Jev가 사전이나 URL 본문을 직접 열어 검증하지 않는다. confidence는 사실 정확도나 승인 확률이 아니다. 출력은 항상 advisoryOnly=true, runtimeApproval=false다. 필순·기하·라이선스의 독립 검증과 실제 제품 검증은 기존 절차가 담당한다. 검증되지 않은 임계값으로 후보를 자동 승인하지 않는다.

## 실제 실행

2026-09-22(한국 시간), 모델 jev-1.13.0, 요청1회,718ms, 입력1545/출력170토큰. 호출 비용 금액은 응답에 없어 계산하지 않았다. 입력과 요청 SHA256, 모델·확률·confidence·사용량을 input.json/result.json에 기록했다.

| 후보 | Jev 선택 | confidence | 실제 후속 조치 |
|---|---|---:|---|
| 蔓15획 | 실행 검증 |0.95| 학습·쓰기 화면 검증 완료; 배치39 적용 |
| 蔗15획 | 대체 출처 조사 |0.89| 기존 방향 불일치 보류 유지 |
| 薪17획 | 출처 조사 |0.37| 고정 원본5개 재조회 일치; 전체 시각 검토 대기 |

薪은 출처 조사0.53, 시각 검토0.47로 갈렸다. 확신 있는 승인으로 취급하지 않고 미완료였던 원본 재조회부터 수행했다. 세 사례는 초기 동작 확인이며 도메인 정확도 평가나 일반화된 성능 수치가 아니다.

API 연결4테스트(정상 계약, 누락 키/그래픽/중복 식별자 거부, 잘못된 응답 거부, 오류 비노출·재시도 금지) 통과. 실제 저장 응답과 입력 해시도 일치했다.
