# 苽 VS3 8·9: 원P 밖 시작의 growing-cap 자격검토

## 결론

**현재 자동이식은 HOLD를 권고합니다.** 원8·9의 guide/P/width14/weight·필순을 그대로 두면 ideal mask의 작은잉크 출현 가능성은 배제되지 않지만, 실제 원P와의 교집합이 최초접촉부터 연결된 한조각임을 보장할 source별 충분조건은 아직 없습니다. 8의 기존 fixed-cap 시작닙 native HOLD는 그대로이며, 9에 새 native FAIL이 있었다고 기록하지 않습니다. 기존7 정책이나 다른글자 인증을 승계하지 않습니다. renderer/앱/원source는 수정하지 않습니다.

## 원조건과 첫접촉

고정 actualfull5/id3의9p10m22·geometry `4a842b0535cbeee6a9392eb1be179c0aed335617db1019ba558b2cf9cfab0698`입니다. 8MQ 원M=(56.675,72.92), 9MQ 원M=(67.0175,29.725)는 각각 원P 밖입니다. 기존 고유 초기증명의8 T1/2 K1/25,9 T1/2 K1/60을 **그대로 읽었고 곡률산술 재계산0**입니다. 그증명은 초기arc7 정칙/단사만 다룹니다.

원시작 A, 실제원guide의 arclength endpoint q(d), r=7, ρ=min(r,d)에서 origin cap은 dist(A,P)≤ρ일때만 접촉하며 moving cap은 dist(q(d),P)≤ρ일때만 접촉합니다. butt는 원prefix의 normal cross-section과 P가 만나는 조건이 별도로 필요합니다. UA 길이를 고유근사곡선 길이나 sourceweight로 대체하지 않습니다. 여기서는 실제접촉시각·global threshold·UA endpoint를 만들어내지 않습니다.

원P 각vertex의 (X−A)·u 최소값은 아래저장산술처럼 두글자모두 양수입니다. T0=u/|u|에 대한 원P 전방여유 a=min(X−A)·T0>0입니다. 재사용하는 초기κ≤K와 rK<1 조건안에서, s≤d≤7인 원butt단면 X=q(s)+nN(s), |n|≤r의 전방좌표는 (1+rK)d<2d 이하입니다. 두 cap도 전방좌표가2d 이하이므로 **0<d<a/2이면 P와 새mask는 비어 있습니다.** 이는 source로부터 얻은 충분빈구간의 수학조건이며, 구현에 임의threshold·offset·buffer clamp를 추가하자는 뜻이 아닙니다. 아래에는 a²/4를 정확분수로 저장했습니다. 실제UA나global.01의 결과로 바꾸어 주장하지 않습니다.

첫 origin-cap 접촉거리는 8에서 √(717409/3370000),9에서 √(654481/2930000)입니다. moving-cap이나 butt가 이보다 먼저 P를 만날수 있으므로 이를 전체mask의 최초출현시각으로 쓰지 않습니다. 원fixed r7 startdisc는 가까운 원P vertex를 이미 포함하며 해당vertex근방의 원P 내부를 덮을수 있습니다. 작은ρ로 바꾸면 원cap의 유한시작blob을 피할 ideal 가능성은 있지만, 출현후 연결한 조각이라는 결론은 나오지 않습니다.

## 비국소조각과 연결성의 미증명

원말단subpath2까지의 거리²는8에서11824601/40000,9에서619389229/160000으로 둘다196보다 큽니다. d≤7에서 원prefix butt(폭14)와두cap은 A중심반경 d+7≤14 안에 있으므로 이 **별도말단subpath2**가 초기arc7에 들어오는 위험은 배제할 수 있습니다. 이는 mainP1의 멀리되돌아오는 부분까지 모두 배제했다는 뜻이 아닙니다.

mainP1의 연속edge turn은8에서 양12/음9/0하나,9에서 양13/음9여서 원다각형은 비볼록입니다. 한개의 연결mask도 비볼록 P와 만나면 여러component가 될수 있습니다. 원butt부분과 두cap 각각에서 생긴 P교집합이 언제 접속하는지, source의 어느경계가 최초접촉인지, 이후섬이 생겼다가 합쳐지는지를 아직 엄격히 분류하지 않았습니다. 원MQ regular/injective·rK조건·P밖 시작점·말단조각의 거리배제만으로는 충분하지 않습니다.

확실한승인을 위해서는 최소한 각 d 구간에서 P의 원normal fiber가 단일구간이고 최초접촉patch와 모든새patch가 맞닿는다는 source별 조건, 또는 원P/원mask arrangement의 동등한 전체구간 증명이 필요합니다. 그런 증명은 이번에 확보하지 않았습니다. finite native만으로도 universal연결/모든RAF를 증명했다고 쓰지 않습니다.

## coverage와 후속권고

초기조건과 별도로 **P⊆원fullround(guide,width14)** 검사가 필요합니다. p1을 항상원roundmask로 유지하면 coverage밖 원P는끝까지 빠질 수 있습니다. P원형을p1에직접복원하는변경은 이번범위가 아니며 임의폭확대/guide수정/connector/원P절단도 금지합니다. 초기arc7에서 말단subpath2가 안보인다는 사실은 후반 fullcoverage를 대체하지 않습니다.

현재권고는8·9를 동일generic growing-cap 승인목록에 넣지 않고 HOLD로 두는 것입니다. 별도승인을 받아 source별 최초cap/butt접촉·초기patch접속 및 원fullcoverage를 좁혀야합니다. 향후실험이 허용되더라도 현재원P/guide를 유지하며 처음실패 gate에서 멈추고, 원기존8 FAIL과 새정책결과를 구분해야합니다. 9의 기존coarse관찰을 새정책승인으로 바꾸지 않습니다.

## 새접촉산술 저장결과

정확원decimal·원M-L-Z edge만으로 수행한 **새접촉산술1묶음**입니다. 기존κ/증명산술 반복0, 기하생성/투영/compiler/factory/engine0입니다. 거리²는 원시작점이 P밖임을 확인한 기존결과를 전제로 각원edge의 유리수projection을[0,1]로제한해 계산했습니다. 이 projection은 거리검사용일뿐 source좌표·표시guide·코드에는 쓰지 않습니다.

```json
[
  {
    "pen": 8,
    "mask": 1,
    "maskSHA256": "d07782810a244eb9ad67ff11992bc8f4fb8878219ca4938d1e09efe9deafce86",
    "originalStart": [
      "2267/40",
      "1823/25"
    ],
    "originalInitialTangent": [
      "886499999999999/100000000000000",
      "489/100"
    ],
    "priorCertificateNotRecalculated": {
      "T": "1/2",
      "K": "1/25",
      "rK": "7/25"
    },
    "forwardClearance": {
      "minDot": "18528299999999993/4000000000000000",
      "uSquared": "1025003249999998227000000000001/10000000000000000000000000000",
      "aSquared": "343297900889999740603800000000049/1640005199999997163200000000001600",
      "sufficientEmptyBeforeD2LessThan": "343297900889999740603800000000049/6560020799999988652800000000006400"
    },
    "originRoundR7NearOriginalVertex": {
      "vertex": [
        "573/10",
        "291/4"
      ],
      "distanceSquared": "16781/40000",
      "insideR7": true
    },
    "originalSubpaths": [
      {
        "subpath": 1,
        "minForwardDotUnnormalized": "18528299999999993/4000000000000000",
        "distanceFromAtoPolygonSquared": "717409/3370000",
        "closestBoundaryEdge": 22,
        "allRadius14BallExcluded": false,
        "turnSigns": {
          "positive": 12,
          "negative": 9,
          "zero": 1
        }
      },
      {
        "subpath": 2,
        "minForwardDotUnnormalized": "615483299999999623/4000000000000000",
        "distanceFromAtoPolygonSquared": "11824601/40000",
        "closestBoundaryEdge": 4,
        "allRadius14BallExcluded": true,
        "turnSigns": {
          "positive": 5,
          "negative": 0,
          "zero": 0
        }
      }
    ]
  },
  {
    "pen": 9,
    "mask": 1,
    "maskSHA256": "99a960e2e0cc73e8e446c0235698cad0be3dbe41d1ea70477b5c32923e60ef2a",
    "originalStart": [
      "26807/400",
      "1189/40"
    ],
    "originalInitialTangent": [
      "591/200",
      "17767/400"
    ],
    "priorCertificateNotRecalculated": {
      "T": "1/2",
      "K": "1/60",
      "rK": "7/60"
    },
    "forwardClearance": {
      "minDot": "806219/40000",
      "uSquared": "317063413/160000",
      "aSquared": "649989075961/3170634130000",
      "sufficientEmptyBeforeD2LessThan": "649989075961/12682536520000"
    },
    "originRoundR7NearOriginalVertex": {
      "vertex": [
        "1349/20",
        "603/20"
      ],
      "distanceSquared": "58829/160000",
      "insideR7": true
    },
    "originalSubpaths": [
      {
        "subpath": 1,
        "minForwardDotUnnormalized": "806219/40000",
        "distanceFromAtoPolygonSquared": "654481/2930000",
        "closestBoundaryEdge": 22,
        "allRadius14BallExcluded": false,
        "turnSigns": {
          "positive": 13,
          "negative": 9,
          "zero": 0
        }
      },
      {
        "subpath": 2,
        "minForwardDotUnnormalized": "103196949/40000",
        "distanceFromAtoPolygonSquared": "619389229/160000",
        "closestBoundaryEdge": 1,
        "allRadius14BallExcluded": true,
        "turnSigns": {
          "positive": 3,
          "negative": 0,
          "zero": 0
        }
      }
    ]
  }
]
```

입력7핀 및 새문서상태만1회 확인합니다. native/APP/runtime승인0, 코드/원기하/서버/Git변경0입니다.

```json
{
  "docs/hanja-source-independent-vs3-actualfull5-u82fd-source-experiment-2026-10-21/config.json": "a51a6dfc0eab7c026788199a0e5e373a10f3fbbfa64a46bbc179236cf7b213da",
  "docs/hanja-source-independent-vs3-actualfull5-u82fd-source-experiment-2026-10-21/fixtures.json": "b9e95f18387c30c92b7e71772fb15ea562d1f8d9a8ed8249c5a62e84f9d483f5",
  "docs/hanja-source-actual-full5-u82fd-vs3-2026-10-21/engine-whole-u82fd-ue0103.json": "9a71406f64cd87f87b244e6c6b05fac330360b677d0a0c03ff0d509f7cc4c840",
  "docs/hanja-u82fd-vs3-unmodified-start-geometry-proof-2026-10-21/README.md": "22d851aac8a21280e4781186b5f1e589dcd81a70e3c9a96de65c93f2cc5c46bb",
  "docs/hanja-renderer-native-review-u82fd-vs3-q7-2026-10-21/README.md": "16880a792bfa58ab55274204962ab7103aaa2def4580eac4a6def41c86a7f8f2",
  "docs/hanja-renderer-native-review-u82fd-vs3-q7-2026-10-21/review.json": "28ee75aff0fb6fcd5357aa209ff49d15dc3adf26a0ef2c959a0efb9000b9aa9d",
  "docs/hanja-goal-glyphwiki-batch1068-2026-10-13/native-review.json": "2f703e2f2271a8e45319c3f498ec0f6e5699614109a08515a7afc3f6c8bcdb78"
}
```
