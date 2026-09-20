# 특급 6차 茀~紲 — 50자·664획 반영

2026-09-20 · **50자·664획 전부 반영, 보류 0자** · 특급 250 → 300/1,328자

**국소 보정이 한 획도 없는 첫 회차다.** 664획 전부가 허가된 중간선 그대로고,
고친 것은 순서뿐이다 — 후보 교체 두 자, 획 순서 교환 아홉 자.

## 후보를 바꾼 2자

| 글자 | 시작 후보 | 바꾼 후보 | 이유 |
| --- | --- | --- | --- |
| 畀 | Ja (2획 초과·최대 98°) | **Hans** (0획·18°) | 田의 가로 둘을 반대 순서로 쓴다 |
| 歃 | Ja (5획·최대 99°, **다섯 획 재배열** 필요) | **MM** (0획·22°) | 臼 두 쪽의 순서. 바꾸니 보정이 아예 없어졌다 |

둘 다 교체만으로 깨끗해졌다. 이유와 시작 후보는 [selection.json](selection.json)에 남겼다.

## 획 순서 교환 9자

| 부수 | 글자 | 교환 |
| --- | --- | --- |
| 糸 | 紕·繽·紓·紲 | 가운데 세로를 왼쪽 점보다 먼저 (4·5획) |
| 糸 ×2 | 轡 | 車 다음에 糸이 둘이라 두 쌍 (11·12, 17·18) |
| 艹 | 茀 | 두 十을 가로 먼저 (두 쌍) |
| 艹 | 蘋 | **앞의 十만.** 뒤의 十은 이미 사전 순서였다 |
| 髟의 長 | 鬢 | 왼쪽 세로를 위 가로보다 먼저 (1·2) |
| **山** | 豳 | 가운데 긴 세로를 **豩 열네 획 뒤로** (1 → 15) |

**豳이 이번 회차에서 처음 나온 자리다.** 사전은 두 豕를 먼저 쓰고 山을 통째로 마지막에 쓰는데,
MM은 山의 긴 가운데 세로로 글자를 연다. 그 한 획만 1번에서 15번으로 옮기면 나머지는 그대로 맞는다 —
凵과 오른쪽 세로는 이미 제자리다. 지금까지 나온 재배열 중 가장 멀리 움직인 획이고,
그래도 **획 하나만 옮긴다.**

轡은 [4차](../hanja-special-batch4-2026-09-20/README.md)의 孌과 같은 자리다(糸이 둘, 11과 17).
車 일곱 획이 먼저 오고 糸 여섯씩 둘, 口 셋이 뒤따른다.

茀과 蘋은 사전 그림이 `translate(12, -830)`로 가로 오프셋을 가진다.
[4차](../hanja-special-batch4-2026-09-20/README.md)의 厲, [5차](../hanja-special-batch5-2026-09-20/README.md)의 濛·矇·貓에 이어 세 번째다.
검토 시트·검사 스크립트가 모두 `translate(x, -y)`를 받으므로 대조에는 영향이 없다.

부수 유사성으로 승인하지 않았다. 쉰 글자의 사전 전체 필순을 순서대로 보고,
색으로 나눈 25% 진행 구간에서 방향·펜 떼기·획 경계·완성 자형을 대조했다.
[direction-probe.mjs](direction-probe.mjs)의 60° 초과 표시는 후보 교체 둘과 교환 넷으로 모두 해소했고,
각도 검사가 놓친 紕·轡·繽·紓·紲의 糸 순서는 끝점 배정 검사가 잡았다.
공개한 순서·경로로 다시 재면 60°를 넘는 획이 없다.
45~60° 구간은 아홉 획(庳 1, 紕 5, 轡 18, 痹 1, 繽 7, 擯 4, 鬢 16, 裼 1, 愃 4)이고,
이전 회차와 같은 기준으로 그대로 뒀다.

## 근거와 재현

- [selection.json](selection.json): 후보를 바꾼 두 글자와 그 이유
- [observations.json](observations.json): 50자 판정과 사유, 8방향 코드, 교환 9자의 재대조 기록
- [source-checks.json](source-checks.json), [originals.json](originals.json): 원문 해시·획별 시간·중간선
- [proposals.json](proposals.json), [corrections.json](corrections.json): 획별 원본 대응 (국소 보정 0획)
- [candidate-paths.json](candidate-paths.json), [review.json](review.json), [prepare.mjs](prepare.mjs), [verify.mjs](verify.mjs)
- [checks.json](checks.json), [progress.json](progress.json), [next-batch.json](next-batch.json)

필순 근거는 e-hanja 사전이며, **한국어문회 인증으로 표시하지 않는다.**
재생 중간선은 Arphic Public License의 고정 AnimCJK·Make Me a Hanzi 원본에서 출발했다.
사전의 경로·마스크·영상·스크린샷을 파일에 저장하거나 배포하지 않았다.

```bash
node docs/hanja-special-batch6-2026-09-20/verify.mjs
node --test lib/hanja*.test.ts
pnpm build
```

위 데이터 재현 검증, **한자 테스트 705개**, **타입 검사**, **프로덕션 빌드**가 통과했다.
전체 **4,526/5,978자(75.7%)**, 남은 **1,452자**.
특급 **300/1,328자(22.6%)**, 검토 가능한 특급은 **380자**가 남았다.

## 다음 묶음

**挈~漾 50자·658획**을 [next-batch.json](next-batch.json)에 정리했다(Ja 34·MM 16).

## 검토 시트 띄우기

```bash
/opt/homebrew/bin/python3 -u docs/hanja-special-batch6-2026-09-20/serve.py
```

`http://localhost:51790/?i=<0-49>&start=<획>&end=<획>`로 한 글자의 획 구간을 본다.
`&corrected=1`을 붙이면 보정 뒤의 경로로 다시 본다.
