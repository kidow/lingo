# 綅 일곱 target의 source-specific 초기 arc7 기하 근거

원 source에 있는 네 Q와 세 straight-first-leg 복합 guide에 대해, 고정 반경7의 **초기 이상적 arc7 충분조건**을 기록합니다. 네 Q와 세 직선 prefix를 함께 다룬 새7target 정확 산술1회 결과를 저장된 값으로 재사용하며, 문서 작성에서 재계산하지 않았습니다. 기존 絺 산술도 반복하지 않았습니다. 원 shape·guide·폭·weight·순서는 불변이며 새 renderer/정책·APP·runtime을 승인하지 않습니다.

## 고정 source와 입력 핀

- source: `../hanja-source-independent-qq-hv-hq-u7d85-source-experiment-2026-10-21/`.
- 전체 geometry SHA256: `5333f55bf957db713a728f045fd7d3803c85605a0acbc61841278ec41a75bd09`.
- 실제 캐시 구조: **13pens/15masks/35polygons**.
- 실제 base full5: `../hanja-goal-glyphwiki-batch950-2026-10-13/engine-proof.json`, SHA256 `e8ef74a7a640edd8e94f088bba54260334bcb436aba10326ad172b7a58a26d83`.
- same-selected body3: `../hanja-goal-glyphwiki-batch950-2026-10-13/engine-whole-u7d85.json`, SHA256 `cee1fe49497bf4b741e1b06ca9b73dacadda7e975e4926420937caa3b2ea5c0c`.
- identity는 root `u7d85`, proof file `engine-proof.json`, 위 full5 파일 SHA의 **id3**입니다. 다른 variant의 body에 이 header를 섞거나 body3를 임의 full5로 승격하지 않습니다.
- 원 sourceGroups(0based): `[[0,1],[2,3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13,14],[15,16],[17]]`.

문서 준비에 필요한 source 입력3개를 최초1회 확인했습니다. config는 preparation의 기존 config 핀과 일치했고, fixture는 앞서 확인한 정확 캐시 SHA와 일치했습니다. 기존 source module·compiler·검사·산술을 호출하지 않았습니다.

- `docs/hanja-source-independent-qq-hv-hq-u7d85-source-experiment-2026-10-21/config.json`: `9327bbbc6d1c8880ab7533683cd093c1313cc8530d2fc216cbc157d15a619576`.
- `docs/hanja-source-independent-qq-hv-hq-u7d85-source-experiment-2026-10-21/fixtures.json`: `48bdc3cf39f8c0eb167f60c25d782a305d1785bab552c600967c12963e3c9fcf`.
- `docs/hanja-source-independent-qq-hv-hq-u7d85-source-experiment-2026-10-21/preparation.json`: `0073daa83cf128a75c662d974a3a4c865fbb2ac47e0fc6564f64c1ba321ad088`.

기존 preparation의 `nativeApproval=false/runtimeApplied=false`는 당시 준비 이력으로 유지합니다. 아래 해시는 이 고정 fixture에 한정하며, 향후 정책은 각 target의 모든 mask fields와 전체 geometry를 함께 결박해야 합니다. bounds/direction/weight/revealPath/revealWidth 중 일부만 맞춘 임의 곡선에 적용할 근거가 아닙니다. outline·guide 해시는 source 입력 확인 때 저장된 일곱 segment에 대해 계산했고 새 좌표·경로를 생성하지 않았습니다.

### 1m1

- 원 guide: `M25.425 8 Q20.35 18.5 14.1875 28`.
- 원 revealWidth `14` → 명목 반경 r=7; 원 weight `22.940824`.
- 원 bounds: `[13.8,6.55,28.8,28.2]`.
- 전체 mask JSON SHA256: `3ca81311f37855a28fef65fdd0b5a16ebbc530ca4f4d1de55780767c88c61250`.
- outline 문자열 SHA256: `9430b8c39f7900c04338e37513f82ff25a522186c6e0f19b3820baf3061cfead`.
- guide 문자열 SHA256: `98f90955753161eca44522bca9e2f0660f2d60619ab017d33b840d7a8fc98bcb`.

### 1m2

- 원 guide: `M6.575 22.5 Q15.275 28 18.9 38`.
- 원 revealWidth `14` → 명목 반경 r=7; 원 weight `19.80292`.
- 원 bounds: `[6.75,22.35,21.2,39.4]`.
- 전체 mask JSON SHA256: `1a1279d9e8834aa299af0fdf19630655560e79c73a975a09c690afa2f6a554c5`.
- outline 문자열 SHA256: `1c219ac60d5b09e988c3df5c3c680e5805a6e25a1a1d8abd57e203c046dbb72f`.
- guide 문자열 SHA256: `4556fb31f682f039529fc768a32488cd0eb09aed42f5c621144906074c9427f4`.

### 2m1

- 원 guide: `M35.9375 19.5 Q25.7875 38 13.825 55`.
- 원 revealWidth `14` → 명목 반경 r=7; 원 weight `41.82359`.
- 원 bounds: `[13.45,18,39.15,55.25]`.
- 전체 mask JSON SHA256: `d9aef59975310dfdae29c32d44641df59624a07960582183b8f9a84c51b87a70`.
- outline 문자열 SHA256: `a65c74d2fe5204e862654c9d89fe07985fdaf9885cab1d30baebe9c8435d324c`.
- guide 문자열 SHA256: `211f126c0045e2905a8304c8f293986123f3057b21c731264b80961b0b6cd615`.

### 2m2

- 원 guide: `M7.3 56.5 Q22.525 54.5 35.9375 50.5`.
- 원 revealWidth `14` → 명목 반경 r=7; 원 weight `29.259296`.
- 원 bounds: `[6.4,50.05,36.05,60.75]`.
- 전체 mask JSON SHA256: `edc79414f6671cbc567c8fbbc7806fe558634e3e1b0582288dc33762557520fa`.
- outline 문자열 SHA256: `7733f3ccd1e0663c7da76a75eab30c75bd68916d93cdd965cdb39e728db111a3`.
- guide 문자열 SHA256: `61af61605dca10eb5f60c65712a8a76565ecfeb5b43a99aee259ecccd0ea38a5`.

### 7m1

- 원 guide: `M53.14 12 L81.895 12 L81.895 35`.
- 원 revealWidth `14` → 명목 반경 r=7; 원 weight `51.755`.
- 원 bounds: `[53.1,8.5,87.35,40]`.
- 전체 mask JSON SHA256: `605482d169f13da043b61f5f7d561dc2bd2e0d771a9c0f2f6ca5db3aac96b4e6`.
- outline 문자열 SHA256: `428d1ffba9cf17383ee3ba71fd7488f86ddd4b0abad985f2910bcdaf7c1996af`.
- guide 문자열 SHA256: `ccd79d653bb9702a5041e2bb8058a9009a4aa629097267b8905fb9e4a02ea0b0`.

### 11m1

- 원 guide: `M47.8264 46.075 L89.5252 46.075 Q87.78775 49.975 83.73370000000001 56.475`.
- 원 revealWidth `14` → 명목 반경 r=7; 원 weight `53.602643`.
- 원 bounds: `[47.8,42.55,95,56.7]`.
- 전체 mask JSON SHA256: `ceeb1a73e8c63e60865df37d800b5b3f22a8c1d65dc7899ee582035bb56d7f1a`.
- outline 문자열 SHA256: `6dda9503762f51ddf3530c99a67e835587ae8d682572b9c86d91e8fdd66de468`.
- guide 문자열 SHA256: `cae89b2d1c7d7d06afd7763e6e955b63ff87ea301cdbf38ffb74ec67a6281f31`.

### 12m1

- 원 guide: `M49.9 58 L81.08500000000001 58 Q70.96000000000001 84 37.75 92.5`.
- 원 revealWidth `14` → 명목 반경 r=7; 원 weight `86.576084`.
- 원 bounds: `[37.6,54.5,86.55,92.9]`.
- 전체 mask JSON SHA256: `3d8c0f39cd1c441b9a4a16920b4ba8e9c236bb5837a5c5d537458584cfaed0ce`.
- outline 문자열 SHA256: `fdf1bf313763ae6172add208fe694ba614e122e0580ea2bacfee1d7970dc55ec`.
- guide 문자열 SHA256: `ddc585b11b7caa22e4a4092e20d61fa86d46b95de812dfd9d4b697532879dfeb`.

## 네 Q의 정확 구간 부등식

네 guide는 모두 단일 canonical `M Q`입니다. 원 문자열의 decimal을 정확 유리수로 해석하여

```text
γ(t) = P0 + 2At + Bt²
A = P1−P0
B = P0−2P1+P2
S(t) = |A+tB|²
λ = min(0≤t≤T) S(t)
c = det(A,B)
κ(t) = |c| / (2 S(t)^(3/2))
```

를 사용했습니다. λ는 `|A+tB|²`의 최소이며 실제 `|γ′|²≥4λ`입니다. S의 내부 꼭짓점과 구간 양 끝점을 정확 비교한 결과로 구간 전체를 다루며, 수치 sampling으로 증명했다고 주장하지 않습니다.

T=1/2와 source별 K에 대해 다음 값이 모두 엄격하게 양수입니다.

```text
λ
|γ(T)−γ(0)|² − 49
4K²λ³ − c²
1 − (7K)²/2 − 7K
```

chord(T)>7이므로 그 이전에 이상적 arc7을 지나고, 초기 arc7에서 곡률≤K와 regularity를 사용할 수 있습니다. 초기 회전각≤7K에서 `cos(회전각)≥1−(7K)²/2>7K`라는 기존 초기-offset 충분조건 구조를 충족합니다. 기존 증명을 약화하지 않았고 이 값을 실제 UA 또는 원 P 연결성으로 대체하지 않습니다.

### Q 1m1

- `A=(-203/40, 21/2)`, `B=(-87/80, -1/1)`.
- `T=1/2`, `K=1/100`, 최소 parameter `t*=1/2`.
- `λ=3368201/25600>0`, `c=det(A,B)=2639/160`.
- `|γ(T)−γ(0)|²=13685921/102400`.
- chord²−49 margin `8668321/102400>0`.
- 곡률 엄격 margin `4K²λ³−c²=26801148998491824601/41943040000000000>0`.
- 접선 cos 하한 `1−(7K)²/2=19951/20000`.
- `7K=7/100`; cos 하한−7K margin `18551/20000>0`.

### Q 1m2

- `A=(87/10, 11/2)`, `B=(-203/40, 9/2)`.
- `T=1/2`, `K=1/20`, 최소 parameter `t*=31044/73609`.
- `λ=28783225/294436>0`, `c=det(A,B)=1073/16`.
- `|γ(T)−γ(0)|²=2537321/25600`.
- chord²−49 margin `1282921/25600>0`.
- 곡률 엄격 margin `4K²λ³−c²=61832053367826535323/12762705017776928>0`.
- 접선 cos 하한 `1−(7K)²/2=751/800`.
- `7K=7/20`; cos 하한−7K margin `471/800>0`.

### Q 2m1

- `A=(-203/20, 37/2)`, `B=(-29/16, -3/2)`.
- `T=1/2`, `K=1/100`, 최소 parameter `t*=1/2`.
- `λ=11194961/25600>0`, `c=det(A,B)=7801/160`.
- `|γ(T)−γ(0)|²=45152449/102400`.
- chord²−49 margin `40134849/102400>0`.
- 곡률 엄격 margin `4K²λ³−c²=1303326759868757725681/41943040000000000>0`.
- 접선 cos 하한 `1−(7K)²/2=19951/20000`.
- `7K=7/100`; cos 하한−7K margin `18551/20000>0`.

### Q 2m2

- `A=(609/40, -2/1)`, `B=(-29/16, -2/1)`.
- `T=1/2`, `K=1/100`, 최소 parameter `t*=1/2`.
- `λ=5479081/25600>0`, `c=det(A,B)=-1363/40`.
- `|γ(T)−γ(0)|²=22984529/102400`.
- chord²−49 margin `17966929/102400>0`.
- 곡률 엄격 margin `4K²λ³−c²=115783512397406688441/41943040000000000>0`.
- 접선 cos 하한 `1−(7K)²/2=19951/20000`.
- `7K=7/100`; cos 하한−7K margin `18551/20000>0`.

## 세 복합 guide의 별도 straight-prefix kind

7m1은 `M L L`, 11m1·12m1은 `M L Q`입니다. 순수 MQ가 아니므로 Q certificate를 억지로 적용하지 않습니다. 각 전체 원 canonical guide·명령별 argument arity·원 mask fields·전체 geometry에 결박한 **별도 source-specific kind**가 필요합니다.

### 직선 prefix 7m1

- 별도 고정 kind: `exact-source-MLL-first-straight-leg-initial-arc7`.
- canonical 원 guide: `M53.14 12 L81.895 12 L81.895 35`.
- 원 시작점 `(2657/50, 12/1)`, 첫 L 끝점 `(16379/200, 12/1)`.
- 첫 L 차 `(5751/200, 0/1)`, 길이 `5751/200>7`.
- 첫 L 길이−7 margin `4351/200>0`.
- 첫 L chord² `33074001/40000`; chord²−49 margin `31114001/40000>0`.
- 초기 tangent `(1,0)`, K=0, ρK=0, cos 하한1. 선행 segment0, 초기 arc7 안의 corner0.

### 직선 prefix 11m1

- 별도 고정 kind: `exact-source-MLQ-first-straight-leg-initial-arc7`.
- canonical 원 guide: `M47.8264 46.075 L89.5252 46.075 Q87.78775 49.975 83.73370000000001 56.475`.
- 원 시작점 `(59783/1250, 1843/40)`, 첫 L 끝점 `(223813/2500, 1843/40)`.
- 첫 L 차 `(104247/2500, 0/1)`, 길이 `104247/2500>7`.
- 첫 L 길이−7 margin `86747/2500>0`.
- 첫 L chord² `10867437009/6250000`; chord²−49 margin `10561187009/6250000>0`.
- 초기 tangent `(1,0)`, K=0, ρK=0, cos 하한1. 선행 segment0, 초기 arc7 안의 corner0.

### 직선 prefix 12m1

- 별도 고정 kind: `exact-source-MLQ-first-straight-leg-initial-arc7`.
- canonical 원 guide: `M49.9 58 L81.08500000000001 58 Q70.96000000000001 84 37.75 92.5`.
- 원 시작점 `(499/10, 58/1)`, 첫 L 끝점 `(8108500000000001/100000000000000, 58/1)`.
- 첫 L 차 `(3118500000000001/100000000000000, 0/1)`, 길이 `3118500000000001/100000000000000>7`.
- 첫 L 길이−7 margin `2418500000000001/100000000000000>0`.
- 첫 L chord² `9725042250000006237000000000001/10000000000000000000000000000`; chord²−49 margin `9235042250000006237000000000001/10000000000000000000000000000>0`.
- 초기 tangent `(1,0)`, K=0, ρK=0, cos 하한1. 선행 segment0, 초기 arc7 안의 corner0.

12m1의 첫 L 길이는 원 canonical 문자열에 따라 `3118500000000001/100000000000000=31.18500000000001`입니다. 31.185로 임의 반올림하지 않습니다. 11m1의 끝값 `83.73370000000001`, 12m1의 `81.08500000000001/70.96000000000001` 등도 원문 그대로 보존합니다. 초기7은 모두 첫 L 안에만 있으며, 뒤 corner나 Q·terminal에는 이 K=0 증명을 확장하지 않습니다.

표시정책을 추후 구현하더라도 `d=p×L`, `ρ=min(d,7)`의 L은 **같은 원 전체 guide의 UA 전체길이**입니다. 첫 L 길이를 전체 L로 대체하지 않습니다. 같은 frame의 progress·L·point와 동일 owner/document/좌표계, NOpathLength 측정 경로 및 dash 정규화 경로 구분은 별도 구현 가드와 native 검토 대상입니다.

초기 straight 구간의 butt normal strip과 radius d로 성장하는 시작·끝 disc는 이상적으로 nested이며 면적 상한 `14d+2πd²`가0으로 갑니다. 이는 초기 집합의 면적 성질이며 원 P와의 교집합 또는 앞 mask와의 연결성을 증명하지 않습니다.

## 충분조건과 미승인 범위

일곱 target은 초기 충분조건을 충족하므로, **초기 인증 조건 때문에 x-monotone 대안을 요구하는 대상은 이번에0**입니다. 다음을 뜻하지 않습니다.

- 원 P의 full-sweep coverage, clipping 결과의 연결성 또는 앞 mask와의 접촉.
- QQ 사이의 원 gap을 없애거나 source guide를 연결한다는 승인.
- 초기 arc7 이후 corner/Q/terminal의 동작 또는 전체 SVG paint와의 등가성.
- p=0/1·완료 prefix/whole·AA·UA 근사·raster의 실제 승인.
- 국내 temporal 필순/합획, 실제 APP/controller/storage/routes·runtime 등록 승인.

원 shape·폭·weight를 고정한 상태에서 새로운 표시정책을 검토할 수 있다는 초기 근거만 제공합니다. 완료 때 원 P를 갑자기 unmask하여 누락을 가리는 우회나 임의 guide/곡선 합성의 근거가 아닙니다. 7/11/12의 꼬리 분리도 이번 계산에서 수행하거나 승인하지 않았습니다.

## ROOT 전달 native 관찰 — 수학 결과와 별도

ROOT가 전달한 원 source 관찰은 다음과 같습니다. 현재 보류 기록은 [작성 중인 HOLD README](../hanja-source-native-hold-u7d85-startcaps-2026-10-21/README.md) 및 [작성 중인 HOLD JSON](../hanja-source-native-hold-u7d85-startcaps-2026-10-21/hold.json)으로 연결할 예정입니다. **이번 문서 작성 시 해당 HOLD는 작성 중이라는 전달만 받았고, 파일 존재·완료·메타핀은 확인하지 않았습니다.**

- 1m1·1m2·2m1·2m2: pen1/2 epsilon과 각각 boundary before/at/after에서 원 고정 roundcap의 큰 finite cap/stub FIRSTFAIL.
- 7m1 HV·11m1 HQ·12m1 HQ: 선택획의0→epsilon에서 H 첫 시작에 큰 직사각 stub FIRSTFAIL.
- 위 선택획의0은 선행획까지 전체 blank라는 뜻이 아닙니다.
- 7/11/12의 `.9999→1` completion은 각2이미지, 총6이미지 PASS였습니다.
- near-one `.99999999` 버튼이 없어 그 위치는 UNRUN입니다. 이를 completion 전체 구간이나 새 policy의 원 P coverage 승인으로 확대하지 않습니다.
- 꼬리 분리0입니다.

이 관찰을 초기 수학 충분조건으로 소급하여 PASS 처리하지 않습니다. 새 표시정책의 native 검토는 별도로 필요합니다.

## 실행 이력

- 새7target exact rational 산술: 최초1회 결과만 재사용, 문서 작성 재계산0.
- 기존 絺/簜 산술 및 기존 성공 테스트 반복0.
- 새 source 입력핀 확인1회: config/fixture/preparation 3개. 원 mask JSON SHA는 앞서 저장한 값, outline·guide SHA는 같은 메타 작업에서 계산.
- 목적 파일 부재를 확인하고 새 README1만 작성합니다. 저장 후 문서 문자열/출처값 메타1회만 확인합니다.
- source projection/compiler/factory/engine/geometry, 정책/module·테스트·API/UI/server/Git/build 실행0.
- native/APP/runtime 승인은 false입니다.
