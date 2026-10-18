# 痗·苺 고정 V/H 및 LEFT 표시 실험

기존 공개 캐시의 원본 baseline을 읽어 각 글자의 두 획을 독립 파생한 source-only 후보입니다. 痗는 u75d7의 8획 V/H와 9획 LEFT, 苺는 u82fa-k의 5획 V/H와 6획 LEFT만 다룹니다. 원본·기존 보류 기록은 바꾸지 않습니다.

원 V/H 결합 guide 대신 고정 원호출의 polygon bounds로 세로 아래→가로 오른쪽을 표시합니다. 원 guide 보존이나 일반 대각선 지원을 주장하지 않습니다. 원 polygon/합집합/순서/폭은 유지하고 원 호출별 weight를 그대로 씁니다. LEFT는 기존 7e0649 primitive로 같은 변경 전 baseline에서 별도로 파생합니다. 기존 H→V kernel은 변경하지 않습니다.

원 proof/full5/header4와 선택 whole의 unprefixed identity3를 엄격히 검증하며 API는 필수3/4 인자입니다. 기존 공개 more-lab baseline의 최초 캡처 이력은 그 preparation을 참조하며 독립적인 과거 baseline 인증이라고 주장하지 않습니다. 이번 lab의 source compiler/engine 실행은 0입니다.

신규 후보 native/runtime 승인은 모두 false입니다. 과거 root 관찰은 원 미분리 痗8·苺5에서 99.99→100%에 약12px foot가 나타난 실패이며 이번 후보의 검증을 대신하지 않습니다. 새 두 V/H 방향, 각 두 경계와 0epsilon/95/99.99/100, 전체 획 순서·coarse·fine·자연 재생은 root 브라우저 검토가 필요합니다.

helper는 공개 fixture만 캐시하고 시작/GET source compile은 0입니다. 국내 사전 SVG는 고정 SHA를 확인하여 RAM에서만 사용합니다. fine/pair는 3SVG 각각520px, coarse는 baseline/candidate 각각220px입니다.

```sh
python3 -B docs/hanja-bounds-vh-two-source-experiment-2026-10-18/serve.py --target 565 --port 0
# 苺는 --target 566
```

실제 source 검증 단1회에서 양성2·사전 거부60이 통과했습니다. 같은 baseline 독립 파생4이며 source compiler/engine0, Node 구문2·Python AST1·helper 정적 guard1회 통과했습니다. 痗12p14m31poly와 苺9p11m22poly의 원 polygon exact-once 및 타 mask 보존을 확인했습니다.

痗8/9 경계는 .4125180750301056/.8978270678166707, 苺5/6은 .389529895060189/.9145494031087816입니다. bounds-halfplane 산술의 100% 잔여면적0은 이번 표시 정책의 수치 검사이며 국내 필순·경계 활성화·시각적 연속성 승인이 아닙니다. 서버/native/build/Git는 실행하지 않았습니다.
