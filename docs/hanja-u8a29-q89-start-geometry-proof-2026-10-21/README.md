# 訩 원Q8·Q9 고유 초기곡선조건

## 판정범위

원11p13m23/geometry`217071f7050ebbb9e3f2d63c51fda0401004287c00f90de5210f6bd71d74c3bc`에결박한두MQ의**초기arc7 곡선조건만PASS**입니다. 각원guide를정확십진유리수로읽고 T=1/2,K=1/100을각고유입력에대해새로검증했습니다. 다른글자곡률이나苽7의인증결과를자동승계하지않았습니다. 새정확산술1묶음이며재계산0입니다.

**두원M 모두원P밖**입니다. 8 A=(159/2,14),9 A=(2023/40,47/2)에대해각원M-L-Z subpath의정확edge/ray검사결과내부·경계모두아닙니다. 이것을growing cap의source-specific 노출/접촉·연결성승인으로바꾸지않습니다. 두target의곡선초기조건은충족하지만,새표시정책을작성하기전각P교집합첫접촉·연결/coverage 자격검토는별도필요합니다. renderer/기하/guide/width14/weight수정0이며원8headblob/9삼각nib HOLD는그대로입니다.

## 고유 초기증명

A=원M,u=원Qcontrol−A,v=원Qend−2control+A,q(t)=A+2ut+vt²입니다. λ(t)=|u+vt|²의[0,1/2]최솟값을정확계산했습니다. 8은λmin=2115721/1600(t=1/2),9는51425/64(t=0)입니다. x도함수는8에서-104/5→-611/20으로엄격음수,9에서143/4→611/20으로엄격양수여서regular/injective입니다. chord(T)²는각10175129/6400,1361169/1600으로49보다크므로초기arc길이7이이구간안에있습니다.

κ≤|u×v|/(2λmin^(3/2)),K=1/100에대해각4K²λmin³−(u×v)²>0입니다. r=7,rK=7/100,cos하한1−(rK)²/2=19951/20000>7/100도충족합니다. 이는ideal초기정규곡선조건이지P연결·후반곡률·픽셀/AA·실제UA/native승인이아닙니다. 향후실험은전체원BrowserL/q(d)를동일path에서읽어야하며sourceweight나고유산술로UA값을대체하지않습니다.

## 원P subpath와coverage 한계

8은원subpath가3개이고시작점에서각경계거리²가19881/89000,10201/5827600,9815689/1158800입니다. 셋다196미만이라초기arc7 mask의A중심반경14근방에들어올수있습니다. 따라서headserif인접subpath의별도노출을거리만으로배제하지못합니다. **원subpath 번호는서로분리된위상component라는뜻이아니며**,원P끼리겹치거나접할수있습니다. 합집합P와butt/두cap의교집합이한조각인지아직증명하지않았습니다.

9의원말단subpath2까지거리²5466469/1600>196이므로d≤7인원prefix/두cap의반경d+7≤14범위에서는그말단subpath를배제할수있습니다. 그러나mainP1과의최초접촉/이후P교집합연결까지보장하지않습니다.

전체원P⊆원fullround(guide,width14)의coverage확인은초기곡률과별개로필수입니다. p1을항상roundmask에두면coverage밖P는완성에서도빠질수있으며,임의guide확장·width확대·threshold/offset/connector로보정하지않습니다. 첫초기조건PASS만으로새renderer/native합격을주장하지않습니다. ROOT다음source-specific 검토후에만별도실험작성여부를판단합니다.

## 정확산술 저장결과

새원입력에대한초기곡률·M의P소속·subpath경계거리산술을한묶음으로실행했습니다. 원polygon점은변경/저장하지않았고거리검사의edge projection은표시guide로사용하지않습니다. compiler/factory/engine/기하투영0입니다.

```json
[
  {
    "pen": 8,
    "mask": 1,
    "rawOneBased": 9,
    "maskSHA256": "7ef49f707c3c2232bb074a6687f588940b9069d7435c5ff45c5b6cf462d409db",
    "guide": "M79.5 14 Q69.1 56.5 48.95 80",
    "width": 14,
    "radius": 7,
    "weight": 72.727591,
    "A": [
      "159/2",
      "14"
    ],
    "u": [
      "-52/5",
      "85/2"
    ],
    "v": [
      "-39/4",
      "-19"
    ],
    "startMembership": {
      "strictInteriorSubpaths": [],
      "boundarySubpaths": [],
      "insideOriginalP": false
    },
    "T": "1/2",
    "K": "1/100",
    "lambdaMin": "2115721/1600",
    "lambdaMinAt": "1/2",
    "cross": "24479/40",
    "chordSquaredAtT": "10175129/6400",
    "chordSquaredMinus49": "9861529/6400",
    "curvatureMargin": "5635532537040950361/10240000000000",
    "rK": "7/100",
    "cosLower": "19951/20000",
    "cosMinusRK": "18551/20000",
    "injectiveAxis": "x",
    "derivativeEndpoints": [
      "-104/5",
      "-611/20"
    ],
    "originalSubpaths": [
      {
        "subpath": 1,
        "boundaryDistanceFromStartSquared": "19881/89000",
        "excludedFromInitialArc7Radius14Ball": false
      },
      {
        "subpath": 2,
        "boundaryDistanceFromStartSquared": "10201/5827600",
        "excludedFromInitialArc7Radius14Ball": false
      },
      {
        "subpath": 3,
        "boundaryDistanceFromStartSquared": "9815689/1158800",
        "excludedFromInitialArc7Radius14Ball": false
      }
    ],
    "initialCurveConditionsSufficient": true,
    "PIntersectionConnectedNotProved": true,
    "fullCoverageNotProved": true
  },
  {
    "pen": 9,
    "mask": 1,
    "rawOneBased": 10,
    "maskSHA256": "c0d93d7d0976cb58f1026b71d55f33be64a30276917a96f2044af1b24cd7ba4f",
    "guide": "M50.575 23.5 Q68.45 45.5 81.125 75.5",
    "width": 14,
    "radius": 7,
    "weight": 60.310053,
    "A": [
      "2023/40",
      "47/2"
    ],
    "u": [
      "143/8",
      "22"
    ],
    "v": [
      "-26/5",
      "8"
    ],
    "startMembership": {
      "strictInteriorSubpaths": [],
      "boundarySubpaths": [],
      "insideOriginalP": false
    },
    "T": "1/2",
    "K": "1/100",
    "lambdaMin": "51425/64",
    "lambdaMinAt": "0",
    "cross": "1287/5",
    "chordSquaredAtT": "1361169/1600",
    "chordSquaredMinus49": "1282769/1600",
    "curvatureMargin": "3702970715081/26214400",
    "rK": "7/100",
    "cosLower": "19951/20000",
    "cosMinusRK": "18551/20000",
    "injectiveAxis": "x",
    "derivativeEndpoints": [
      "143/4",
      "611/20"
    ],
    "originalSubpaths": [
      {
        "subpath": 1,
        "boundaryDistanceFromStartSquared": "109561/507200",
        "excludedFromInitialArc7Radius14Ball": false
      },
      {
        "subpath": 2,
        "boundaryDistanceFromStartSquared": "5466469/1600",
        "excludedFromInitialArc7Radius14Ball": true
      }
    ],
    "initialCurveConditionsSufficient": true,
    "PIntersectionConnectedNotProved": true,
    "fullCoverageNotProved": true
  }
]
```

입력7핀과새문서상태만1회확인합니다.

```json
{
  "docs/hanja-source-independent-hv-vh-u8a29-source-experiment-2026-10-21/config.json": "284d7a83525051b4be196e0d71282d99df41398480b2c9bb4d82d23048932b9a",
  "docs/hanja-source-independent-hv-vh-u8a29-source-experiment-2026-10-21/fixtures.json": "8ee191a3a00bf9e12f2077f122ae0d78b2cafd5e7ca83e6312f60a2ca20c8b6e",
  "docs/hanja-source-independent-hv-vh-u8a29-source-experiment-2026-10-21/preparation.json": "8200c1fcf7a6527afba156a1164a5d0fe1fc445ccf2a428d7aa59bdd9a4e7dce",
  "docs/hanja-goal-glyphwiki-batch1055-2026-10-13/engine-whole-u8a29.json": "b56d6a71c7835c50f2dba80ea1f66a9b61d076ec166128476da75d4cc5cef8d1",
  "docs/hanja-source-native-review-hv-vh-u8a29-2026-10-21/review.json": "4cfcb5f90659d9d1858a8b7305338d99b456a1373520e4a7ef4032388514d32f",
  "docs/hanja-source-raw-review-u8a29-2026-10-21/review.json": "0a808c5ac55d39409fe6fd062e3149bd412a1745fcc8219e6eafa754f0f4bef4",
  "docs/hanja-goal-glyphwiki-batch1055-2026-10-13/source-hold.json": "1abd78e564b1b4d79344ad63c366c5fd1e4a605cb0b6449dc115d238bd4f365c"
}
```
