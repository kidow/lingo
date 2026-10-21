# 苽 VS3 미보정 시작: 고유 초기조건만 읽기·정확 산술

원 actualfull5/id3에서 고정한9p10m22/geometry `4a842b0535cbeee6a9392eb1be179c0aed335617db1019ba558b2cf9cfab0698`만 분석합니다. renderer/source/guide/P/width/weight/필순/기하는 수정하지 않았습니다. 이 문서는 **새source-specific 노출정책의 승인서가 아니며**, 실제8 시작닙 HOLD와 기존cap HOLD를 보존합니다. 7m2의 T1/2 K1/100을 다른mask에 승계하지 않습니다.

| 대상 | 원문법 | 초기구간 고유결과 | 원시작점의 P 소속 | 범위 |
|---|---|---|---|---|
|5m1|MQ|T1/2 K1/100|두번째 subpath 엄격내부|초기arc7만|
|6m1|MLQ|첫L=8313/400>7, κ=0|첫 subpath 엄격내부|첫수직L만; 후반Q 인증0|
|8m1|MQ|T1/2 K1/25|모든 원subpath 밖|노출정책자격 추가검토 필수|
|9m1|MQ|T1/2 K1/60|모든 원subpath 밖|노출정책자격 추가검토 필수|

8의 원시작 A=(2267/40,1823/25)=(56.675,72.92)는 원P minX=56.85보다 정확7/40 왼쪽입니다. 이 점을 P안으로 옮기거나 guide를 바꾸지 않습니다. 9도 원M에 대해 원M-L-Z 다각형별 정확ray-crossing/edge검사에서 내부·경계 모두 아닙니다. P밖이라는 사실을 다른글자 인증으로 덮거나 단순히 growing cap이면 연결된다고 해석하지 않습니다. 향후 **각source-specific 노출정책의 자격검토**와 실제P교집합/coverage/초반native가 별도로 필요합니다.

MQ는 원십진 literal을 정확유리수로 읽어 A=원M, u=control−A, v=end−2control+A, q(t)=A+2ut+vt²로 둡니다. 각[0,T]의 λ=min|u+vt|²는 이차식 꼭짓점을 구간으로 제한하여 정확계산했습니다. 한 좌표의 도함수가 구간전체에서 같은엄격부호이므로 regular/injective이고, chord(T)²>49이므로 초기arc길이7이 구간안에 있습니다. κ≤|u×v|/(2λ^(3/2))에서 저장한 K에 대해 4K²λ³−(u×v)²>0을 확인했습니다. r=width/2=7, cos하한1−(7K)²/2>7K도 정확양수입니다. 이것은 ideal초기곡선 조건이며 원P교집합 연결/모든후반구간/AA/UA측정/브라우저 통과의 증명이 아닙니다.

6의 첫 원L은 (0,8313/400), 길이²69105969/160000>49입니다. 뒤Q 또는corner에 κ0를 확장하지 않고 기존단일MQ parser의 허용범위를 넓히지도 않습니다. 전체UA 길이가 필요한 향후정책에서 첫L길이로 전체guide L을 대체하면 안됩니다.

아래는 **고유정확산술 최초1묶음**의 저장결과입니다. math 재실행0, 원polygons/coords변경0, 기존검사/engine/compiler/factory/projection0입니다. 시작P포함검사는 strict원M-L-Z 각subpath의 유리수edge/ray검사이며 임의raster/epsilon을 사용하지 않았습니다. 실제8native FAIL은 별도native2의 global.01 큰삼각초기닙 관찰이며,8 .125 분리조각만을 실패로 판정하지 않습니다.

```json
[
  {
    "pen": 5,
    "mask": 1,
    "guide": "M76.375 28.5025 Q58.645 33.3925 25.155 35.8375",
    "width": 14,
    "radius": 7,
    "maskSHA256": "b4e8eb30998e03a717f9a782a439c592ff32705357ce2bf2baa904e3566e568a",
    "P0": [
      "611/8",
      "11401/400"
    ],
    "u": [
      "-1773/100",
      "489/100"
    ],
    "v": [
      "-394/25",
      "-489/200"
    ],
    "pointInOriginalP": {
      "strictInteriorSubpaths": [
        2
      ],
      "boundarySubpaths": [],
      "insideOriginalP": true
    },
    "certificate": {
      "T": "1/2",
      "K": "1/100",
      "lambda": "67653/200",
      "lambdaAtTMin": "0",
      "cross": "96333/800",
      "chordSquared": "12490153/25600",
      "chordSquaredMinus49": "11235753/25600",
      "curvatureMargin": "19641472372827/20000000000",
      "rK": "7/100",
      "cosLower": "19951/20000",
      "cosMinusRK": "18551/20000",
      "strictAxis": "x",
      "derivativeEndpoints": [
        "-1773/50",
        "-2561/50"
      ]
    }
  },
  {
    "pen": 8,
    "mask": 1,
    "guide": "M56.675 72.92 Q65.53999999999999 77.81 69.48 87.59",
    "width": 14,
    "radius": 7,
    "maskSHA256": "d07782810a244eb9ad67ff11992bc8f4fb8878219ca4938d1e09efe9deafce86",
    "P0": [
      "2267/40",
      "1823/25"
    ],
    "u": [
      "886499999999999/100000000000000",
      "489/100"
    ],
    "v": [
      "-246249999999999/50000000000000",
      "489/100"
    ],
    "pointInOriginalP": {
      "strictInteriorSubpaths": [],
      "boundarySubpaths": [],
      "insideOriginalP": false
    },
    "certificate": {
      "T": "1/2",
      "K": "1/25",
      "lambda": "50524699728999780168094000000239121/535196944444442255555555555560000",
      "lambdaAtTMin": "10971124999999874138888888889/26759847222222112777777777778",
      "cross": "674330999999998533/10000000000000000",
      "chordSquared": "3825471812499996946500000000001/40000000000000000000000000000",
      "chordSquaredMinus49": "1865471812499996946500000000001/40000000000000000000000000000",
      "curvatureMargin": "200568093254477164759072783253961482067037276230723719946381987503095514560427407466072777290109832488982014611111108159/239530544580919759530293166396641759680610681543481267146925778695130315298010973936900000000000000000000000000000000",
      "rK": "7/25",
      "cosLower": "1201/1250",
      "cosMinusRK": "851/1250",
      "strictAxis": "x",
      "derivativeEndpoints": [
        "886499999999999/50000000000000",
        "2561/200"
      ]
    }
  },
  {
    "pen": 9,
    "mask": 1,
    "guide": "M67.0175 29.725 Q69.9725 74.1425 91.6425 88.8125",
    "width": 14,
    "radius": 7,
    "maskSHA256": "99a960e2e0cc73e8e446c0235698cad0be3dbe41d1ea70477b5c32923e60ef2a",
    "P0": [
      "26807/400",
      "1189/40"
    ],
    "u": [
      "591/200",
      "17767/400"
    ],
    "v": [
      "3743/200",
      "-11899/400"
    ],
    "pointInOriginalP": {
      "strictInteriorSubpaths": [],
      "boundarySubpaths": [],
      "insideOriginalP": false
    },
    "certificate": {
      "T": "1/2",
      "K": "1/60",
      "lambda": "26225429/25600",
      "lambdaAtTMin": "1/2",
      "cross": "-7353419/8000",
      "chordSquared": "3650152357/2560000",
      "chordSquaredMinus49": "3524712357/2560000",
      "curvatureMargin": "5279778059700148722989/15099494400000000",
      "rK": "7/60",
      "cosLower": "7151/7200",
      "cosMinusRK": "6311/7200",
      "strictAxis": "x",
      "derivativeEndpoints": [
        "591/100",
        "197/8"
      ]
    }
  },
  {
    "pen": 6,
    "mask": 1,
    "kind": "exact MLQ first-L-only",
    "guide": "M25.155 35.8375 L25.155 56.62 Q24.17 83.515 8.9025 94.11",
    "width": 14,
    "radius": 7,
    "maskSHA256": "956e8212bbdc1841dc72a9ecad94c9a8045de483e5ae3e2261fdea913c7937be",
    "P0": [
      "5031/200",
      "2867/80"
    ],
    "pointInOriginalP": {
      "strictInteriorSubpaths": [
        1
      ],
      "boundarySubpaths": [],
      "insideOriginalP": true
    },
    "firstL": [
      "0",
      "8313/400"
    ],
    "firstLSquared": "69105969/160000",
    "K": "0/1",
    "scope": "initial arc7 is first vertical L only; later Q is not certified"
  }
]
```

입력핀(새문서schema/hash 검사1회, 산술 반복0):

```json
{
  "docs/hanja-source-independent-vs3-actualfull5-u82fd-source-experiment-2026-10-21/config.json": "a51a6dfc0eab7c026788199a0e5e373a10f3fbbfa64a46bbc179236cf7b213da",
  "docs/hanja-source-independent-vs3-actualfull5-u82fd-source-experiment-2026-10-21/fixtures.json": "b9e95f18387c30c92b7e71772fb15ea562d1f8d9a8ed8249c5a62e84f9d483f5",
  "docs/hanja-source-independent-vs3-actualfull5-u82fd-source-experiment-2026-10-21/preparation.json": "6c512a5b0cc531a4948fa45e5100da3305dfe2908b2387eae538fc8229966987",
  "docs/hanja-source-actual-full5-u82fd-vs3-2026-10-21/engine-whole-u82fd-ue0103.json": "9a71406f64cd87f87b244e6c6b05fac330360b677d0a0c03ff0d509f7cc4c840",
  "docs/hanja-renderer-native-review-u82fd-vs3-q7-2026-10-21/review.json": "28ee75aff0fb6fcd5357aa209ff49d15dc3adf26a0ef2c959a0efb9000b9aa9d",
  "docs/hanja-goal-glyphwiki-batch1068-2026-10-13/native-review.json": "2f703e2f2271a8e45319c3f498ec0f6e5699614109a08515a7afc3f6c8bcdb78"
}
```
