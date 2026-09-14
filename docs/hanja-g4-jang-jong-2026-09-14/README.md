# 獎·鍾 2자·32획 검토 — 2026-09-14

**獎 15획·鍾 17획을 승인하여 재생 데이터에 반영했다.** 獎의 첫 두 획 순서를 바꾸고 총 6획의 경로를 보정했다. 원본 경로 26획의 점 좌표는 그대로 유지하며, 이 중 獎의 2획만 순서가 바뀌었다.

## 대조 근거

| 글자 | 급수 | 획수 | 사전 원본 |
|---|---|---:|---|
| 獎 | 4급 | 15 | [e-hanja 獎](http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/734E.svg) |
| 鍾 | 4급 | 17 | [e-hanja 鍾](http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/937E.svg) |

국내 민간 사전과의 교차검토이며, 한국어문회·교육부의 공식 인증을 뜻하지 않는다. 獎 U+734E의 犬 점과 鍾 U+937E의 오른쪽 重을 확인했다. 기존 교과서의 奬·鐘 자형에 대한 보류 기록은 유지하고, 그 자형의 승인이나 기하 경로를 가져오지 않았다.

원본 SVG와 연결된 CSS·JS를 메모리에만 가져와 바이트 수와 SHA-256을 확인했다. 브라우저에서 원래 CSS 애니메이션을 활성화하고, 각 획의 지연 시간에 재생 시간 20%·80%·100%를 더한 시각에서 정지하여 **96개 시간 표본**을 관찰했다. 원본은 재생 시간 75%에서 경로 노출이 끝나므로 80% 표본은 완성 경로를 보여준다. 연속 전체 재생을 보았다는 주장이 아닌 원래 렌더러의 시간별 프레임 대조다.

원래 후보 32개 누적 상태와 보정 후 32개 누적 상태를 확인했다. 시간과 방향은 [observations.json](observations.json), 승인과 해시는 [review.json](review.json)에 기록했다.

## 수정 내용

| 글자·획 | 처리 |
|---|---|
| 獎 1·2 | 긴 세로획을 먼저, 아래로 내려간 뒤 오른쪽으로 꺾는 획을 다음에 쓰도록 원본 MM 2·1 순으로 재배열 |
| 獎 11 | 가운데 점을 위 가로획과 오른쪽 갈고리에서 분리 |
| 獎 13 | 아래 犬의 첫 하강부를 위쪽 왼쪽 세로획과 분리하고 이어지는 왼쪽 삐침 유지 |
| 獎 15 | 犬의 점을 가로획 위, 아래로 내려가는 획의 오른쪽 안쪽에 배치 |
| 鍾 7 | 金의 왼쪽 아래 삐침이 중앙 세로획에 닿도록 연결 |
| 鍾 11 | 田 왼쪽 경계를 세로로 내리도록 수정 |
| 鍾 13 | 田 안쪽 가로획 양끝을 양옆 경계에 연결 |

연결부와 분리된 점의 간격은 런타임 선 굵기 5에서 검사했다. 재배열한 獎의 원본 인덱스는 2·1로 보존하고, 직접 보정한 6획만 `null`로 표시했다. 획을 합치거나 나누지 않았다.

기하 경로는 [고정된 Make Me a Hanzi 원본](https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt)의 medians와 명시적으로 작성한 보정에서 나온다. [originals.json](originals.json), [prior-candidate-paths.json](prior-candidate-paths.json), [corrections.json](corrections.json), [candidate-paths.json](candidate-paths.json)에 원본과 전체 수정 소스를 보존했다. 수정 소스는 [Arphic Public License](../../public/hanja-strokes/ARPHICPL.txt)를 따른다. 사전 윤곽·중심선·CSS·JS·스크린샷은 저장하거나 재배포하지 않는다.

## 검증 결과

- 전체 한자 테스트 **214개 통과**, 실패 0개.
- 배포용 빌드와 TypeScript 검사 통과.
- 원본 SVG 2개 및 CSS·JS의 온라인 응답·바이트·해시 일치.
- 기존 사전 검토 19자의 런타임 레코드 유지.
- 순서를 되돌리거나 보정 전 경로로 바꾸고 해시를 다시 계산해도 검증에서 거부함.

명령과 결과는 [verification.json](verification.json)에 기록했다.

```bash
node docs/hanja-g4-jang-jong-2026-09-14/verify.mjs --online
node --test lib/hanja*.test.ts
pnpm run build
```

시각 대조판은 `node docs/hanja-g4-jang-jong-2026-09-14/serve.mjs`가 출력하는 로컬 주소에서 연다. 사전 원본은 서버 실행 중 메모리에만 유지된다.

## 다음 검토

현재 전체 5,978자 중 **1,500자 적용**. 3급Ⅱ까지는 **1,499/1,500자**이며 **藝 1자·19획**만 남았다. 다음으로 藝의 정확한 사전 자형과 전체 경로·방향 대조를 권장한다.

KB 검색 표제: `獎鍾 full Hanja tests exit`, `獎鍾 online verification exit`, `獎鍾 live coverage`.
