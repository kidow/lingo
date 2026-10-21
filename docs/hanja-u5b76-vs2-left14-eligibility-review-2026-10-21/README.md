# 孶 VS2 logical12 LEFT14 분리 적격성 — 읽기 검토

결론: **기존 batch997 LEFT14 커널의 정확 조건은 충족합니다. 다만 body bounds가 바뀌므로 瀷 예시의 bounds 불변 추가 조건까지 충족하는 것은 아닙니다.** 기존 蓀 active-bounds 재산출 정책을 source-specific하게 명시하는 별도 후보라면 원 quad만 분리하는 검토를 이어갈 수 있습니다. 이 문서는 분리 적격성 검토이며 새 source8·renderer·APP나 native 승인이 아닙니다.

## 고정 대상과 기존 구현

- source: `../hanja-source-independent-vs2-pairs-u5b76-source-experiment-2026-10-21/`, 고정13p18m44.
- 전체 기하 SHA256: `d08f44b6a8a1233cf8bf685cfc5305be1efb9e8ffea4af750af15ebf4c438727`.
- logical12는 zero-based raw[16](원번호17), 원 call2개와 single mask입니다.
- 원 전체 mask 필드 SHA256: `9cb9f768e40a7ff6f9e8318373ec568a20ec37b9bd4dcb78bb85ccf5305855f3`.
- 실제 VS2 full5/id3 단일 출처, source/HOLD/NOTICE/순서/gap/44polygon·guide·폭·weight를 보존합니다.

읽은 구현은 `docs/hanja-terminal-tail-left-source-experiment-2026-10-18/tail-candidate.mjs`의 `existingTail/eligible/derive`, batch997 `progressive.mjs`의 `terminalLeftTail`, 瀷 `qq-left-u7037-k`와 蓀 `qq-left-u84c0-k` 후보입니다. old module import나 함수 실행은 하지 않았습니다. prior-art의 LEFT 커널 본문은 batch997과 바이트 동일하며 커널 SHA256은 `87aa9b34fca26388e49841c720bc033433b61369eeafb8874f78c01cc768a593`입니다.

## 정확 guard 대조

원 call 문법은 V 다음 Q입니다. 전체 guide를 새 Q로 합성하지 않습니다.

```json
[
  {
    "kind": "cdDrawLine",
    "args": [
      100,
      136.06,
      100,
      172.23,
      0,
      1
    ]
  },
  {
    "kind": "cdDrawCurve",
    "args": [
      100,
      172.23,
      100,
      182.23,
      90,
      182.23,
      1,
      14
    ]
  }
]
```

- terminal.kind=`cdDrawCurve`.
- terminal cy=y2=182.23, cx=100>x2=90.
- ta2=14, ta2%100=14. ta1=1에서 opt1=0, ta2에서 opt2=0.
- defaults.kMinWidthT=6, defaults.kWidth=5.
- 기존 식 width=kMinWidthT−opt1/2=6.
- 기존 식 jump=kWidth×4×min(1−opt2/10,(width/kMinWidthT)³)×(width>6?6/width:1)=20.
- width와 jump는 모두 양수입니다.
- 원 terminal 마지막 quad가 아래 결과와 JSON deep equality로 정확 일치하고, 원44polygon 전체에 같은 quad 지문은 **1회**입니다.

```json
[
  {
    "x": 90,
    "y": 182.2,
    "off": 0
  },
  {
    "x": 90,
    "y": 176.2,
    "off": 0
  },
  {
    "x": 70,
    "y": 176.2,
    "off": 0
  },
  {
    "x": 70,
    "y": 179.2,
    "off": 0
  }
]
```

quad SHA256: `ef4880294f155987fd0dc401f1823b52a274fd0410b9f95c5ffa66762b458f90`.

기존 `point` 규칙은 **원좌표를 floor(x×10)/10으로 보존한 원 terminal 산출물**을 비교하는 조건입니다. 182.23을 새로 임의 좌표로 교정하지 않습니다. 원 polygon이 이미 가진 182.2/176.2/179.2를 그대로 분리 대상으로 식별한 것입니다. engine width6과 표시 guide revealWidth14(r7)는 서로 다른 값이며 혼동하지 않습니다.

## bounds 차이와 반드시 유지할 필드

| 항목 | 원본 / 분리 검토 결과 |
| --- | --- |
| 원 raw polygon 수 | 5개 |
| 원 body bounds | [35,67.5,54.5,94.1] |
| tail 제외 원4polygon bounds | [45,67.5,54.5,94.1] |
| 원 tail1polygon bounds | [35,88.1,45,91.1] |
| body guide | `M50 68.03 L50 86.115 Q50 91.115 45 91.115` |
| body revealWidth | 14 그대로 |
| body direction / weight | curve / 25.156068 그대로 |
| 독립 tail direction / weight | 기존 left / round(jump/2)=10 |
| 분리될 경우 예상 수 | 13p19m44 (아직 생성하지 않음) |

기존 `derive`는 마지막 원 outline chunk만 떼고 남은 원 polygon의 bounds를 다시 계산하며, 원 guide/revealWidth/bodyweight는 그대로 남깁니다. 이 일반 규칙은 孶에도 대응하지만 body.minX 35→45를 **불변이라고 주장하면 안 됩니다**. 瀷 예시의 추가 `assert.deepEqual(derivedBody.bounds,oldBody.bounds)`는 이 대상에서 false입니다. 해당 guard를 느슨하게 바꾸거나 기존 瀷 allowlist를 확장할 수 없습니다.

蓀 예시는 원 body.minX13.65→20.65의 active bounds 변화를 별도 `leftBodyPolicy.activeBoundsChanged=true`로 기록합니다. 孶을 준비한다면 이와 같은 이미 존재하는 정책을 새 대상의 정확 source identity/전체 기하/원 mask/quad에 결박하고, 35→45의 재산출을 명시해야 합니다. 원 body bounds를 그대로 두는 정책과 바꿔 말하지 않습니다. 기존 모듈들은 대상 allowlist가 있으므로 孶을 자동 수용하지 않으며 이 문서도 그 계약을 변경하지 않습니다.

원 bodyweight25.156068을 그대로 두고 tailweight10을 추가하면 logical12 내부 총 mask allocation은 정확 십진수35.156068, body/tail 경계의 정확 유리수는 `6289017/8789017`입니다. 기존 helper와 같은 JavaScript 합산에서는 35.156068000000005, 경계값은 0.7155540830106484입니다. 이는 고정8초인 **획12 내부 body/tail 배분 변화**이며 재생시간을10 늘리는 것이 아닙니다. 다른12획의 필드·기존 다섯 pair의 내부 경계는 변경할 이유가 없습니다. 아직 파생 후보를 생성하지 않았으므로 다른획 불변은 향후 exact 검사가 요구되는 조건입니다.

## 원 tail과 ideal round sweep의 차이

원 MLQ는 전체 중심선 x가 [45,50] 안에 있고 끝점x=45입니다. 초기 V의 x=50, 뒤 Q의 세 제어점 x=50/50/45의 convex hull로 이 범위가 유지됩니다. 따라서 반경7인 이상적 round-disc sweep은 x≥38인 영역에만 있을 수 있습니다. 원 tail에는 x=35인 꼭짓점이 있어 이 ideal sweep 하한보다3 작습니다. 이는 해당 원 tail 일부가 원 guide의 이상적 r7 round sweep 밖이라는 정적 범위 증거이며, ROOT의 near1/1 foot 형태 차이와 별도로 기록합니다.

이 부등식은 브라우저 실제 paint·raster의 독립 계측이나 관찰된 차이의 엄밀한 UA 원인 증명이 아닙니다. source P를 없애거나 줄이지 않고 마지막 원 quad를 독립 left mask로 노출하는 기존 분리 방식의 필요성을 검토할 근거일 뿐입니다. body 전체 P coverage, 최초 cap, 후반 Q 연결, split 후 p1 coverage·진행 연결성·국내 필순·시간적 합획은 별도 fresh 검토가 필요합니다. 앞서 고유 초기 arc7 문서의 첫 L 조건과 이 후반 foot 검토도 서로 다른 범위입니다.

## 다음 최소 범위와 실행 이력

권장 다음 작업은 ROOT 별도 승인 후 **source-bound logical12 원 LEFT14 quad만 cached partition하는 신규 source8**입니다. 원 source8/HOLD는 유지하고 새13p19m44 후보에서 guide/폭/bodyweight/다른12획/44polygon exact-once, quad uniqueness, active bounds35→45 및 새 내부 timing을 검사해야 합니다. 이 문서 작성에서는 partition·projection·compiler·factory·engine·기존 tests·renderer·APP 수정0입니다.

필요한 새 산술은 guard/원 quad·bounds·weight·간단한 x범위 대조를 **1회**만 수행했습니다. old 커널/derive를 호출하지 않았고 새 기하나 파생 fixture를 만들지 않았습니다. 문서 저장 뒤 입력7핀/문서 문자열·결과 형식 메타1회만 확인하며 산술과 통과 검사는 반복하지 않습니다. UI·서버·Git·build·TSC0, native/APP/runtime 승인은 false입니다.

```json
{
  "docs/hanja-source-independent-vs2-pairs-u5b76-source-experiment-2026-10-21/fixture.json": "2626f648bf03fcd5dfd62c0ad0b3ec960530b2115a7818d4f352c06ef0ce818b",
  "docs/hanja-source-independent-vs2-pairs-u5b76-source-experiment-2026-10-21/config.json": "212baa0a730143ad673e567048dc5c364051f0b60f0569c8b772cd7edeab0bdb",
  "docs/hanja-terminal-tail-left-source-experiment-2026-10-18/tail-candidate.mjs": "abd4e5011d011e463e52069248b9d73831df9d7f4ee79361b22194c9f9721de5",
  "docs/hanja-goal-glyphwiki-batch997-2026-10-13/progressive.mjs": "25b9a23cdf644798a7336df3f78b72ecc3c4ad10d0fbe860b403a38911e514f6",
  "docs/hanja-source-independent-qq-left-u84c0-k-source-experiment-2026-10-19/candidate.mjs": "1325cae7e75e3d7932eaaf4092e2085c5f1dae79f3eede404b145b32d33be037",
  "docs/hanja-source-independent-qq-left-u7037-k-source-experiment-2026-10-20/candidate.mjs": "3e10d796f7420e9ea3e16a3ffd41862c20a17b3c9b18fcc06ad74f173b25f298",
  "docs/hanja-source-native-hold-u5b76-vs2-startcaps-left14-2026-10-21/hold.json": "509407294d8c2b8749f6d48272b6baa824a6460240216ce4706759bff8c28a9d"
}
```
