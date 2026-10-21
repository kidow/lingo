# 絺 다섯 mask의 source-specific 초기 arc7 기하 근거

이 문서는 기존 고정 source의 앞 두 QQ 네 mask와 마지막 H/L/Q 복합 mask 하나에 대해, **초기 이상적 arclength 7 범위의 충분조건**을 기록합니다. 새 표시정책이나 renderer를 구현한 문서가 아니며 원 outline·guide·폭·weight·순서를 변경하지 않습니다. 실제 native·APP·runtime 승인은 false입니다.

## 고정 출처와 원 mask 결박

- source: `../hanja-source-independent-qq-reorder-u7d7a-source-experiment-2026-10-21/`.
- ROOT source8 commit: `1449e5604bf3e855f5ec218e6b7c472a72cdf8eb`.
- 전체 geometry SHA256: `933b3e52ba6e2a53237c09777724d4ea34ac05cd3124e1ecfb1ae38682cf719b`.
- 실산출: **13pens/15masks/38polygons**, 원16raw/17calls.
- base 실제 full5: `../hanja-goal-glyphwiki-batch949-2026-10-13/engine-proof.json`, SHA256 `8ca5792ecff90e6324438b4fdaa6d64cb038762bd4f0b62a79948ce95d9966a6`.
- same-selected body3: `../hanja-goal-glyphwiki-batch949-2026-10-13/engine-whole-u7d7a.json`, SHA256 `611e55e39e0ece888384112c74ccf7575534e31a5340789b01b333bac1ef112f`.
- full5/id3의 root·file·SHA와 defaults/groups/trace 결박을 유지합니다. VS0 body3를 full5로 승격하거나 header를 혼합하지 않습니다.

이번 문서 준비에서 아래 source 입력3개의 SHA만 최초1회 확인하여 기존 저장 핀과 일치했습니다.

- `docs/hanja-source-independent-qq-reorder-u7d7a-source-experiment-2026-10-21/config.json`: `b045badb1e4ddf54f5a16da03d42c546ec2892655dca483ad6b9b1149a2d8ece`.
- `docs/hanja-source-independent-qq-reorder-u7d7a-source-experiment-2026-10-21/fixtures.json`: `ec1e588e5b20f10ceba579ec33096e421b80ab97672f9e4715945831054d2c98`.
- `docs/hanja-source-independent-qq-reorder-u7d7a-source-experiment-2026-10-21/preparation.json`: `8df6e895652b87a8f4804987c49d1546344979306c2b3489b1bd20f19a216eff`.

아래 mask/outline/guide SHA는 같은 고정 fixture의 다섯 mask에 한정해 source-pin 확인과 함께 계산했습니다. 전체 mask SHA에는 bounds/direction/weight/revealPath/revealWidth까지 포함됩니다. 향후 정책을 적용하려면 이 값들과 전체 geometry를 함께 exact guard해야 하며, 비슷한 임의 Q 또는 임의 M/L/Q에 일반화하지 않습니다.

### 1m1

- 원 guide: `M25.755 8 Q20.61 18.5 14.3625 28`.
- 원 revealWidth: `14`, 원 weight: `23.017147`.
- 전체 mask JSON SHA256: `cbbfcaf757b48330a2674a07888b8b1a9a51c39d65deff638dd50421c8b1ae44`.
- outline 문자열 SHA256: `cd1576c5b4df65c4b8ad714ed1c1ec6e8f5f9c0086a5381e9dead161fc1293b9`.
- guide 문자열 SHA256: `9a20d2f68a700285fae8d2fe822dd05e8d658dc5455ee4de27bcf4b85933013a`.

### 1m2

- 원 guide: `M6.645 22.5 Q15.465 28 19.14 38`.
- 원 revealWidth: `14`, 원 weight: `19.909169`.
- 전체 mask JSON SHA256: `d9cc600661d9081e404b6ab6c12f3cee0b3797ca79e39400b0067e89a2bb81e1`.
- outline 문자열 SHA256: `95dab812b5e213083afd5f38a2897cc6f3f164743739e3b85d3d38e2824b64a2`.
- guide 문자열 SHA256: `ea734e0cd72e979bd90823183d6a374858730e38aaf9bfa80c63905adc6832d2`.

### 2m1

- 원 guide: `M36.4125 19.5 Q26.1225 38 13.995 55`.
- 원 revealWidth: `14`, 원 weight: `41.985644`.
- 전체 mask JSON SHA256: `88cca12a7d4faa4d015d2407e346d8a4910a828b6c5ec77d8680f3a5278d2e21`.
- outline 문자열 SHA256: `a9ebbee26b4a16592c99a42a5197f608646a7057d2583d27ac61e372ddb85ce4`.
- guide 문자열 SHA256: `c2a66f45bc8ed8213cba9cee5af4439629fb58a0e17781e5a380a4afa484c56e`.

### 2m2

- 원 guide: `M7.38 56.5 Q22.815 54.5 36.4125 50.5`.
- 원 revealWidth: `14`, 원 weight: `29.646012`.
- 전체 mask JSON SHA256: `3c2d55d26fb9f0f2a86ab64d0e1c07a26e339531f612f186466b1bb48a10572f`.
- outline 문자열 SHA256: `78bfc7579d2106d8c05174ee2fe4ffae08977d75c4c38857ebf82a34bf05bdab`.
- guide 문자열 SHA256: `8b016f7e1494ef469d0f80b10eb8526ed3a7a54700eb919966b1f69e8d84d81c`.

### 12m1

- 원 guide: `M52.075 57.5 L84.475 57.5 L84.475 79 Q84.475 84 79.475 84`.
- 원 revealWidth: `14`, 원 weight: `60.971068`.
- 전체 mask JSON SHA256: `f30d69e717a39bd47196004f5cf4b638eabb1e0608697782260553a1523998a0`.
- outline 문자열 SHA256: `2fbc5885274eb83f873a038da1a06b656691b095340e19da4a077d920ec09789`.
- guide 문자열 SHA256: `6f3997ce8b564b32ffb6333f0be168cb8ba8f98b94ff74593964c861f021b44f`.

## 네 Q의 기존 충분조건

각 원 guide는 canonical 단일 `M Q`입니다. 원 decimal 문자열을 정확 유리수로 해석하여

```text
γ(t) = P0 + 2At + Bt²
A = P1−P0
B = P0−2P1+P2
S(t) = |A+tB|² = aa+2ab·t+bb·t²
λ = min(0≤t≤T) S(t)
c = det(A,B)
κ(t) = |c| / (2 S(t)^(3/2))
```

로 계산한 기존 결과를 재사용합니다. λ는 실제 derivative의 norm² 자체가 아니라 `|A+tB|²`의 최솟값이며, `|γ′|²≥4λ`입니다. 내부 최소점 `−ab/bb`가 구간에 있으면 그 점을, 그렇지 않으면 양 끝점을 정확 비교했습니다. 수치 sampling으로 전체 구간을 추정하지 않았습니다.

네 guide 모두 T=1/2에서 다음 엄격 부등식이 성립했습니다.

```text
λ > 0
|γ(T)−γ(0)|² > 49
4 K² λ³ − c² > 0
1 − (7K)²/2 > 7K
```

chord 길이가7보다 크므로 parameter T 이전에 이상적 arc7을 지나며, 초기 arc7에서 곡률 bound K와 regularity를 사용할 수 있습니다. arc7 안의 회전각은 최대7K이므로 cos 하한 `1−(7K)²/2`가 기존 initial-offset 충분조건의 `7K`보다 엄격히 큽니다. 이는 기존 source-specific growing-cap 초기 조건 구조를 만족한다는 뜻이며, 전체 원 P의 paint/coverage와 동치라는 뜻이 아닙니다. 참고 구조는 [기존 噋 Q9 certificate](../hanja-renderer-growing-caps-u564b-q9-left-experiment-2026-10-21/render.mjs)의 `certificate`이며, 해당 기존 module/import/test를 이번에 실행하지 않았습니다.

### Q 1m1

- `A=(-1029/200, 21/2)`, `B=(-441/400, -1/1)`.
- `aa=5468841/40000`, `ab=-386211/80000`, `bb=354481/160000`.
- `T=1/2`, `K=1/100`, 최소 parameter `t*=1/2`.
- `λ=84766249/640000>0`.
- `c=det(A,B)=(-1029/200)(-1) − (21/2)(-441/400)`. 당시 저장한 A/B의 정확 determinant식이며, 수치 전개를 재계산하지 않았습니다.
- `|γ(T)−γ(0)|²=344180929/2560000`.
- chord²−49 margin: `218740929/2560000>0`.
- `4K²λ³−c²=425833579287105477736249/655360000000000000000>0`.
- 접선 cos 하한: `1−(7K)²/2=19951/20000`.
- `7K=7/100`; cos 하한−7K margin `18551/20000>0`.

### Q 1m2

- `A=(441/50, 11/2)`, `B=(-1029/200, 9/2)`.
- `aa=135053/1250`, `ab=-206289/10000`, `bb=1868841/40000`.
- `T=1/2`, `K=1/20`, 최소 parameter `t*=91684/207649`.
- `λ=82174225/830596>0`.
- `c=det(A,B)=(441/50)(9/2) − (11/2)(-1029/200)`. 당시 저장한 A/B의 정확 determinant식이며, 수치 전개를 재계산하지 않았습니다.
- `|γ(T)−γ(0)|²=64414729/640000`.
- chord²−49 margin: `33054729/640000>0`.
- `4K²λ³−c²=18126441436187514576181/3581372736872179600>0`.
- 접선 cos 하한: `1−(7K)²/2=751/800`.
- `7K=7/20`; cos 하한−7K margin `471/800>0`.

### Q 2m1

- `A=(-1029/100, 37/2)`, `B=(-147/80, -3/2)`.
- `aa=4481341/10000`, `ab=-70737/8000`, `bb=36009/6400`.
- `T=1/2`, `K=1/100`, 최소 parameter `t*=1/2`.
- `λ=282047089/640000>0`.
- `c=det(A,B)=(-1029/100)(-3/2) − (37/2)(-147/80)`. 당시 저장한 A/B의 정확 determinant식이며, 수치 전개를 재계산하지 않았습니다.
- `|γ(T)−γ(0)|²=1136805601/2560000`.
- chord²−49 margin: `1011365601/2560000>0`.
- `4K²λ³−c²=20835827571534751086565969/655360000000000000000>0`.
- 접선 cos 하한: `1−(7K)²/2=19951/20000`.
- `7K=7/100`; cos 하한−7K margin `18551/20000>0`.

### Q 2m2

- `A=(3087/200, -2/1)`, `B=(-147/80, -2/1)`.
- `aa=9689569/40000`, `ab=-389789/16000`, `bb=47209/6400`.
- `T=1/2`, `K=1/100`, 최소 parameter `t*=1/2`.
- `λ=140621769/640000>0`.
- `c=det(A,B)=(3087/200)(-2) − (-2)(-147/80)`. 당시 저장한 A/B의 정확 determinant식이며, 수치 전개를 재계산하지 않았습니다.
- `|γ(T)−γ(0)|²=590129521/2560000`.
- chord²−49 margin: `464689521/2560000>0`.
- `4K²λ³−c²=1998644168279368567299609/655360000000000000000>0`.
- 접선 cos 하한: `1−(7K)²/2=19951/20000`.
- `7K=7/100`; cos 하한−7K margin `18551/20000>0`.

## 12m1: Q certificate와 분리한 straight-first-leg kind

12m1은 순수 MQ가 아니라 고정 원문 **M L L Q**입니다.

```text
M52.075 57.5 L84.475 57.5 L84.475 79 Q84.475 84 79.475 84
```

별도 kind는 `fixed-source-MLLQ-first-straight-leg-initial-arc7`로 구분해야 합니다. 전체 canonical 명령과 argument arity·원 mask fields·전체 geometry를 함께 결박하고, Q certificate를 억지로 적용하거나 새로운 Q guide를 합성하지 않습니다.

저장된 정확 결과는 다음과 같습니다.

- 원 시작점: `(2083/40, 115/2)`.
- 첫 L 끝점: `(3379/40, 115/2)`.
- 첫 L 차: `(162/5, 0/1)`.
- 첫 직선길이: `162/5=32.4>7`.
- 길이−7 margin: `127/5>0`.
- 첫 L chord²: `26244/25`; chord²−49 margin `25019/25>0`.
- 첫 segment 이전 경로0, 초기 arc7 안의 corner0.
- 초기 unit tangent `(1,0)`, 곡률 K=0, `ρK=0`, tangent cos 하한1.

따라서 초기 arc7은 원 첫 L 안에만 있으며 straight 초기 조건을 충족합니다. 전체 guide에는 뒤쪽 L corner와 Q가 그대로 남으므로 그 범위를 이 증명에 포함하지 않습니다. 원 마지막 LEFT514 polygon도 분리·수정하지 않습니다.

## 성장 반지름과 이상적 집합의 한계

원 guide의 전체 UA 길이를 L로 측정한 표시정책을 향후 검토한다면 `d=pL`, `ρ(d)=min(d,7)`를 사용해야 합니다. 12m1의 첫 직선길이32.4를 **전체 L로 대신하지 않습니다**. p와 L/endpoint는 같은 원 guide·frame에 결박해야 하며 NOpathLength measurement와 dash용 정규화 path를 혼동하지 않아야 합니다. 이번 문서는 실제 UA 측정을 수행하지 않았습니다.

12m1의 초기 d≤7에서는 `γ(s)=γ(0)+(s,0)`입니다. butt normal strip은 nested이고 시작·끝 disc의 radius가 d로 증가하며, 끝 disc 중심 이동거리는 두 d의 차와 같으므로 그 disc들도 nested입니다. 원래 고정 r7 cap을 갑자기 추가하는 정책과 달리 이 이상적 초기 strip/cap 집합의 면적은 `14d+2πd²` 이하로 제한되어 d→0+에서0으로 갑니다. 이 면적 상한은 초기 직선 집합 설명이며 원 P와의 교집합이 연결된다는 증명이 아닙니다.

네 Q가 기존 충분조건을 만족하므로 **초기 인증 때문에 x-monotone 대안을 요구할 대상은 이번 다섯 개에서0**입니다. 이 문장을 다음 범위로 확대하지 않습니다.

- 원 P의 실제 coverage 또는 원 P∩노출집합의 연결성.
- 앞 mask와 새 mask의 접촉·연결성. 두 QQ의 원 gap은 그대로이고 새 connector0입니다.
- 초기7 이후 corner/Q/terminal의 전체 sweep 또는 원 shape와 SVG paint의 등가성.
- p=1·완료 prefix/whole의 실제 raster, UA 반올림·AA·모든 frame의 연속성.
- 국내 temporal 필순·합획, 실제 APP/controller/storage/routes, runtime 등록.

source-specific 고정 kind가 가능하다는 근거이며 기존 rK 조건을 약화하거나 모든 source에 일반화한 승인이 아닙니다.

## ROOT 원 renderer 관찰과 분리

아래는 수학 계산 결과가 아니라 ROOT가 별도로 전달한 원 source native 관찰 요약입니다. 초안 작성 때는 HOLD 기록이 작성 중이었으나, 문서 최종화 전에 ROOT가 [HOLD README](../hanja-source-native-hold-u7d7a-startcaps-2026-10-21/README.md)와 [HOLD JSON](../hanja-source-native-hold-u7d7a-startcaps-2026-10-21/hold.json)의 존재·메타 PASS를 확인해 전달했습니다. ROOT 전달 SHA256은 README `b18f3c3be4477402899734a4f44b69c094896b7e127fdd1751364255dfdd504f`, hold.json `d728063e521b9066bf309671cd061f58662935cdaf0b712662b9160505ba9ba6`입니다. 이번 문서는 이 확정 포인터만 연결하며, HOLD 파일·기존 산술·입력핀 검사를 재실행하지 않았습니다.

- pen1·pen2 각각 첫 Q epsilon에서 finite startcap FIRSTFAIL.
- pen1·pen2 각각 before/at에는 없던 두 번째 Q의 finite stub가 boundary after에 나타나는 FIRSTFAIL.
- pen12 epsilon에서도 원 H 시작의 r7 finite chunk FIRSTFAIL이며0 비교 이미지로 확인.
- pen12 completion `.9999/.99999999/1` 세 ink-full 관찰은 PASS였고 tail 끝 pop은 관찰되지 않았습니다. 이는 tail 분리 필요성 또는 전체 coverage의 승인으로 확대되지 않습니다.

원 HOLD/min15/NOTICE와 위 관찰을 새 충분조건이 소급해서 PASS로 만들지 않습니다. 새 표시정책의 실제 검토가 필요합니다.

## 실행 범위

- 네 Q exact rational 계산: 기존 최초1회 결과 재사용, 재계산0.
- 12m1 straight prefix exact rational 계산: 기존 최초1회 결과 재사용, 재계산0.
- 새 source 입력핀 확인1회: config/fixture/preparation 3개 일치. 같은 작업에서 다섯 mask·outline·guide 해시만 계산.
- 새 문서1 작성 후 문서 문자열/고정 출처값 메타검사1회만 수행.
- 새 source projection/compiler/factory/engine/geometry, 정책/module 실행, 기존 테스트·산술, API/UI/server/Git/build 실행0.
- native/APP/runtime 승인은 false이며 본 문서가 renderer 동작을 승인하지 않습니다.
