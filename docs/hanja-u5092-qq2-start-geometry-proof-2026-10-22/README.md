# 傒 QQ2 네 원 Q의 초기 시작 기하 근거

이 문서는 source-specific 고정 원 MQ 네 개의 **초기 이상적 arc7 충분조건**만 검토합니다. 원 P·guide·방향·폭·weight·순서·flags를 바꾸지 않으며 renderer/APP/runtime 구현이나 native FAIL 해결 승인이 아닙니다. source/native/actualAppUI/runtimeApplied 승인 false를 유지합니다.

## 출처와 원 필드 결박

- 고정 source8: `../hanja-source-independent-qq2-u5092-source-experiment-2026-10-21/`, ROOT commit `6720276b7a6815fa8a72de6c39d9047e4bb55930`.
- 전체 geometry SHA256 `642621410227020153fb15458ea6231f0f65dcbc752ad836d4cb7b56666a0063`, 실산출 **12pens/14masks/35polygons**, 원14raw/14calls입니다.
- source config SHA256 `c3b16b704464a17ae4582b42b2d2879c7691f24993b8c6dbe39ceca5a9fac88a`.
- fixture SHA256 `1e6e1ccaaf07bc0204df4bde76d0c12e14926077864d57c178a274d475d10971`.
- preparation SHA256 `de676da4931db765d28b66697174711fd58d730a03b0e9039989fd96d2729ef3`.
- base actual full5 `../hanja-goal-glyphwiki-batch1021-2026-10-13/engine-proof.json`, byte SHA256 `4df5262150a106350598ea1e99134d87c2a21bd62a171bde1110ff94d3a1f13d`, id3 strict root/file/SHA입니다.
- matching body3 `../hanja-goal-glyphwiki-batch1021-2026-10-13/engine-whole-u5092.json`, byte SHA256 `6846a697199379906c05af93ae7d8b90341a0a36447b048bc9b6582422a3812e`. defaults/groups/trace는 actual full5와 같은 자료이며 header 혼합0입니다.
- 원1021 최소14 HOLD·빈 sourceGroups·NOTICE·기존 false 이력을 보존합니다. 두 pair의 정적 대응이 공식 시간/방향/합획 승인은 아닙니다.

source 입력3핀은 직전 새 native 기록의 입력27핀 확인에서 일치한 결과를 재사용했으며 이번 문서에서 재검사하지 않았습니다. mask/outline/guide fingerprint와 아래 유리수·contour 관계는 저장된 원 fixture만 읽은 **새 정확 산술1묶음**으로 산출했습니다. source/projection/compiler/factory/engine 또는 기존 증명 module/test 실행0입니다.

## 정확 유리수 충분조건

네 원 guide는 모두 canonical 단일 `M Q`, revealWidth14이므로 r=7입니다. 원 canonical decimal 문자열을 이진 부동소수 근삿값 대신 정확 유리수로 해석했습니다.

```text
γ(t)=P0+2At+Bt²
A=P1−P0, B=P0−2P1+P2
S(t)=|A+tB|²=aa+2ab t+bb t²
λ=min S(t), 0≤t≤T
c=det(A,B)
κ(t)=|c|/(2S(t)^(3/2))
```

`bb>0`이면 내부 최소점 `−ab/bb`를 [0,T]에 clamp하고 양 끝/내부의 정확 값을 비교합니다. λ는 반속도제곱이며 `|γ′|²≥4λ`입니다. 네 대상 모두 T=1/2에서 다음이 엄격하게 성립했습니다.

```text
λ>0
|γ(T)−γ(0)|²>49
4K²λ³−c²>0
1−(7K)²/2>7K
```

chord>7이므로 T 이전에 이상적 arc7을 지나며, 초기 arc7에서 regularity와 κ<K를 사용할 수 있습니다. 회전각≤7K에 대한 cos 하한은 `1−(7K)²/2`입니다. 이는 기존 고유 초기 인증의 충분조건을 만족한다는 뜻이며, 임의 MQ·원P 전체 coverage·UA/SVG/raster·후반 sweep·mask 간 연결성에 대한 정리는 아닙니다. 기존 [絺 초기 충분조건 구조](../hanja-u7d7a-start-geometry-proof-2026-10-21/README.md)를 읽기 참고했으며 해당 산술/검사/module을 재실행하지 않았습니다.

### 7m1

- 원 guide: `M61.87 30 Q56.92 36 50.98 44`.
- 원 width `14`, r=`7/1`, weight `17.736744`, bounds `[50.6,28.2,64.35,44.25]`.
- 전체 mask JSON SHA256 `afeff9704be9e1ff9e89871bfc5527b527ef46bcf1571af1601b207d90e0191e`.
- outline SHA256 `ab3222ff17fbd6c48c438a76f8e40191b43cc10c2a862b46488deece33b43a5b`, guide SHA256 `73638706ef0cccd134f2f232a68ebe5c2e12ab204d6a19b79f9150fcd79502b6`.
- 정확 `A=(-99/20, 6/1)`, `B=(-99/100, 2/1)`.
- `aa=24201/400`, `ab=33801/2000`, `bb=49801/10000`.
- `T=1/2`, `K=1/100`, 최소 parameter `t*=0/1`.
- `λ=24201/400>0`, `det(A,B)=-99/25`.
- chord² `11082241/160000`, chord²−49 `3242241/160000>0`.
- 곡률 엄격 margin `4K²λ³−det²=11665188992601/160000000000>0`.
- `7K=7/100`, cos 하한 `19951/20000`, cos 하한−7K `18551/20000>0`.
- 시작점 `(6187/100, 30/1)`의 자기 P 판정: **outside**. 이 첫 mask의 앞선 전체 완료획들과의 포함 관계는 검토하지 않았습니다.
- 원 3개 contour는 모두 simple입니다. 닫힌 polygon support 교차/포함 그래프의 연결성분: `[[0,2,1]]`(0based). 이는 이 mask의 전체 원P support가 연결이라는 정적 사실이며 시간별 노출 P의 연결은 아닙니다.

### 7m2

- 원 guide: `M43.06 40 Q50.98 43 55.93 50`.
- 원 width `14`, r=`7/1`, weight `16.298371`, bounds `[43.35,39.75,57.95,51.7]`.
- 전체 mask JSON SHA256 `ab2a0e740c25f5d0d57aa55f23ee420888972769a3c0ae6697dc8375d0e2c2af`.
- outline SHA256 `8af1f0ebaa76d0af741455a93df36205f427d7737ca538c689e8d082d43abc74`, guide SHA256 `50f8573999c71bb3eeacda00e24329c6d1d8eca8374bd182382e2a20e7911d67`.
- 정확 `A=(198/25, 3/1)`, `B=(-297/100, 4/1)`.
- `aa=44829/625`, `ab=-14403/1250`, `bb=248209/10000`.
- `T=1/2`, `K=1/20`, 최소 parameter `t*=115224/248209`.
- `λ=16475481/248209>0`, `det(A,B)=4059/100`.
- chord² `10802641/160000`, chord²−49 `2962641/160000>0`.
- 곡률 엄격 margin `4K²λ³−det²=195276625472410179097851/152915875157933290000>0`.
- `7K=7/20`, cos 하한 `751/800`, cos 하한−7K `471/800>0`.
- 시작점 `(2153/50, 40/1)`의 자기 P 판정: **outside**. 직전 같은 논리획 m1의 P 판정: **outside**.
- 원 2개 contour는 모두 simple입니다. 닫힌 polygon support 교차/포함 그래프의 연결성분: `[[0,1]]`(0based). 이는 이 mask의 전체 원P support가 연결이라는 정적 사실이며 시간별 노출 P의 연결은 아닙니다.

### 8m1

- 원 guide: `M76.72 35 Q66.82 46 55.93 57`.
- 원 width `14`, r=`7/1`, weight `30.269194`, bounds `[55.6,33.15,79.05,57.3]`.
- 전체 mask JSON SHA256 `54915e8e59bbe5f893e865811fb7200effffbd2221a5714e67125b75bbc1fb5b`.
- outline SHA256 `0e4bde33bb165936e0d7ac9b5d6215d6d792e59f91daae4a74fa42a476cfd69d`, guide SHA256 `42daa26d0ab2c20a92ed39d8ddc10b4e2850d040ea09fe487c772e667e881153`.
- 정확 `A=(-99/10, 11/1)`, `B=(-99/100, 0/1)`.
- `aa=21901/100`, `ab=9801/1000`, `bb=9801/10000`.
- `T=1/2`, `K=1/100`, 최소 parameter `t*=0/1`.
- `λ=21901/100>0`, `det(A,B)=1089/100`.
- chord² `35835481/160000`, chord²−49 `27995481/160000>0`.
- 곡률 엄격 margin `4K²λ³−det²=10208417645701/2500000000>0`.
- `7K=7/100`, cos 하한 `19951/20000`, cos 하한−7K `18551/20000>0`.
- 시작점 `(1918/25, 35/1)`의 자기 P 판정: **outside**. 이 첫 mask의 앞선 전체 완료획들과의 포함 관계는 검토하지 않았습니다.
- 원 3개 contour는 모두 simple입니다. 닫힌 polygon support 교차/포함 그래프의 연결성분: `[[0,2,1]]`(0based). 이는 이 mask의 전체 원P support가 연결이라는 정적 사실이며 시간별 노출 P의 연결은 아닙니다.

### 8m2

- 원 guide: `M39.1 60 Q64.84 58 85.63 55`.
- 원 width `14`, r=`7/1`, weight `46.797873`, bounds `[38.35,54.55,85.65,64.35]`.
- 전체 mask JSON SHA256 `196ccec865a28e4e2ddd6fb7911ebbf613bafdaf80ff0b0acc14d57727849342`.
- outline SHA256 `1499c9f1b27549723b5fb3b1d59df9cf262d8db9e71693b8ab47618b737a8b22`, guide SHA256 `2bc06ff347f687b370abb7df070e2796340a7e5e94814b2423c2c2bfa34f42f4`.
- 정확 `A=(1287/50, -2/1)`, `B=(-99/20, -1/1)`.
- `aa=1666369/2500`, `ab=-125413/1000`, `bb=10201/400`.
- `T=1/2`, `K=1/100`, 최소 parameter `t*=1/2`.
- `λ=21900409/40000>0`, `det(A,B)=-891/25`.
- chord² `96869601/160000`, chord²−49 `89029601/160000>0`.
- 곡률 엄격 margin `4K²λ³−det²=10300813956460430117929/160000000000000000>0`.
- `7K=7/100`, cos 하한 `19951/20000`, cos 하한−7K `18551/20000>0`.
- 시작점 `(391/10, 60/1)`의 자기 P 판정: **inside**. 직전 같은 논리획 m1의 P 판정: **outside**.
- 원 3개 contour는 모두 simple입니다. 닫힌 polygon support 교차/포함 그래프의 연결성분: `[[0,2,1]]`(0based). 이는 이 mask의 전체 원P support가 연결이라는 정적 사실이며 시간별 노출 P의 연결은 아닙니다.

## 시작점과 원 P의 연결성 위험

정확 winding-number와 경계 포함 검사에서 7m1·7m2·8m1의 M은 자기 P 밖, 8m2만 자기 P 내부입니다. 각 mask의 원 contour는 비인접 edge 교차가 없는 simple polygon이며, polygon 사이 닫힌집합 교차/포함 그래프는 각각 연결성분1개입니다. 두 mask의 **전체 support 합집합**도 각 pair에서 연결됩니다. 이는 최종 원P의 정적 상태로만 해석하며 초기 공개집합이나 선행 모든 완료획과의 연결로 확대하지 않습니다.

두 m2의 M은 직전 m1의 P 밖입니다. 원 guide gap은 논리7 `[-15.83999999999999,-8]`, 논리8 `[-33.66,6]` 그대로입니다. 고정 유한 cap을 성장 cap으로 바꾸더라도 기존 gap이나 원P 배치를 없애지 않습니다.

특히 8m2 시작 x=39.1, 앞선 8m1 원P minX=55.6입니다. 원 중심선을 이상적 arc d만큼 따른 모든 중심점의 x는 39.1+d 이하입니다. r7 normal strip과 radius≤7인 cap을 결합해도 x≤39.1+d+7입니다. 따라서

```text
0<d<19/2 ⇒ x≤39.1+d+7<55.6
```

범위에서는 이 공개집합이 **직전 8m1 P와 접촉할 수 없습니다**. 8m2의 M은 자기P 내부이므로 비영 성장 disc가 포함되는 이상적 정책에서는 작은 양수 d의 자기 ink가 생길 수 있지만 직전 m1과의 연결은 이 좌표 경계로 보장할 수 없습니다. 이것은 앞선 모든 다른 완료획과의 분리 증명이 아니며 그 전체 합집합과의 접촉은 미검토입니다.

7m2도 시작 x=43.06, 앞선 7m1 minX=50.6이므로 `0<d<27/50`이면 같은 상한 `43.06+d+7<50.6`에서 직전 m1과 접촉할 수 없습니다. 다만 이 M은 자기 P 밖이므로 그 구간에 실제 자기 ink가 이미 노출되는지는 별도 문제이며 이번 계산이 그 존재를 주장하지 않습니다.

결론적으로 네 초기 곡률/접선 인증이 통과해도 **면적0 극한·시간 연속과 선행획 연결이 동시에 해결됐다는 승격은 불가**합니다. `ρ=min(d,7)` 같은 별도 고정 source-specific 성장 표시를 추후 실험할 수 있는 초기 근거일 뿐입니다. 새 policy의 P 교집합·모든 component·실제 UA·coverage·후반·국내 temporal 자료를 추가로 검토해야 합니다. 원 M을 옮기거나 경로/connector를 새로 만들어 연결하도록 권고하지 않습니다.

## ROOT native 관찰과 분리

[새 native README](../hanja-source-native-review-qq2-u5092-2026-10-22/README.md) SHA256 `526b9a44665cee42955555339148cc70d4b6c6eecac777296dba1ab12be939e5`, [review.json](../hanja-source-native-review-qq2-u5092-2026-10-22/review.json) SHA256 `5fca36b13ddc2369849f897471915b0ca2f80515bc5a1ca9a69a391df2190a75`를 연결합니다.

ROOT 실제8프레임은 각 논리획7·8의 global epsilon1e-6와 내부 경계 before/at/after±1e-10입니다. 두 첫 MQ에서 큰 유한 head, 두 m2 after에서 선행 끝과 떨어진 유한 삼각/사각 조각을 관찰해 HOLD했습니다. before/at에는 새 조각이 없었습니다. mask-local은 별도 미계측이며 whole/coarse/fine/natural/APP는 미실행입니다. 이번 초기 산술이 그 FAIL을 PASS로 바꾸지 않습니다.

## 실행 범위

- 네 Q source-specific 정확 유리수/원P 정적 관계: 새1묶음, 이전 산술 반복0.
- 새 README1 작성 후 출처값·문서 문자열·fingerprint 포인터의 메타 정합성1회만 확인.
- 입력 source3핀은 직전 기록의 입력27핀 확인 결과 재사용, source pin 재검사0.
- 원 기하/필드 변경0, projection/compiler/factory/engine/renderer/module/기존 테스트/HTTP/API/UI/server/Git/build/TSC0.
- 초기 source-specific 가능성만 기록하며 native/APP/runtime 승인false를 유지합니다.
