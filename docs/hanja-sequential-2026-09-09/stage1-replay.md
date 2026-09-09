# 1단계 회귀 방지: 기존 phase2 입력 보존

2026-09-09. 새 승인 글자를 런타임에 추가해도 이미 끝난 phase2 실험을 당시 입력으로 재현할 수 있도록 [replay-input.json](../hanja-component-phase2-2026-09-09/replay-input.json)을 만들었다. 기존 실험 코드·결과·분할·부품 recipe와 공개 데이터는 변경하지 않았다. 새 부품 알고리즘을 실행하거나 다음 단계를 진행한 작업이 아니다.

## 보존한 입력

- 당시 승인 743개 전체 객체: 경로, 원본 대응 번호, 검증 출처와 메타데이터를 포함한다. **원래 런타임 배열 순서도 보존한다.** 해시 계산에서만 복사본을 코드포인트순으로 정렬한다.
- 카탈로그 5,978자: 실제 실험에서 읽는 `glyph/strokes/readingGrade/hun/eum`만 보존했다.
- 기존 `hanja-component-input.json`의 정의·사전 출처, 동결된 개발/검증 100+100 분할, 당시 reviewed-parts 전체.
- 최초 검증 전 implementation-freeze와 기준 result의 원문·정규 JSON 해시.

JSON은 개별 승인 객체·카탈로그 객체를 각각 한 줄에 담았다. 총 1,053,559 bytes이며, 큰 원문을 context-mode로 쓰지 않고 메모리로 캡처한 조각을 `functions.store/load`에 보존해 native `apply_patch`로 저장했다.

## 검증한 핀

| 대상 | SHA-256 |
| --- | --- |
| 아카이브 파일 | `3b0ad533655bc596704bf529d2accf9a001f203db8381e89d0a4a792f422b70a` |
| 아카이브 payload | `d392709da4f172975cb34f8bc61c0cf0dede85ea24e65fb161ca52b192b120de` |
| 기존 승인 스냅샷 | `7fde6fd393e3ec7421184736a6175a3006a67b19782721bf104a4f38f90d50f6` |
| 기존 input 파일 | `8a66193c60da5c4e2373506a8d3dac925c891e63792cf6b549856318e6d36df4` |
| 기존 input 정규 JSON | `589b6a440fca8087a435480d27b22fde19b798ec205cb051f0c0c58e785159de` |
| 기존 result 파일 | `cc8d31b3a612ed729c311122da7ea829eefc827a9af045cd63efe2ef7e378bf8` |
| 재현된 result 정규 JSON | `f2973957b5d311a2e709f357c63462e8dbebebd249f1fac07e9c010a6994dede` |

기존 implementation-freeze에 명시된 8개 파일의 바이트 해시, 승인 743개 해시, 정의 해시, split 본문 해시, reviewed-parts 해시를 모두 확인했다. 상세 핀은 아카이브의 `baseline` 및 `implementationFreeze`에 있다. payload 자체도 별도 SHA로 고정했다.

## 실제 재현 결과

현재 함수 서명은 `runPhase2(input, approved, characters, split, recipes, options)`다. 저장한 아카이브에서 이 여섯 인자를 공급하고 `{ mode: 'validation' }`으로 **기존 완료 실험을 재현**했다. 반환 객체 전체를 기존 `result.json`과 `assert.deepEqual`로 비교해 일치했고, 실행 전후 payload SHA도 동일했다.

| 구분 | v1 생성 / 기하 스크린 통과 | v2 생성 / 기하 스크린 통과 |
| --- | --- | --- |
| 개발 100자 | 10 / 3 | 12 / 8 |
| 기존 검증 100자 | 5 / 0 | 6 / 1 |
| 초안 20자 | 20 / 미평가 | 20 / 미평가 |

이 숫자는 저장된 실험의 재현 값이다. 한국 필순 승인 수가 아니며, 이 실험으로 공개한 글자는 0개다. 경로·출처·배치 근거·제외 목록 및 모든 library hash까지 기존 결과와 같았다.

초기 캡처에서 승인 해시의 정렬 규칙을 입력 배열 자체에도 적용했을 때 library hash가 달라지는 것을 발견했다. `knownHeldOutExclusions`와 forbidden 목록의 순서가 library hash에 반영되므로, 최종 파일은 원래 런타임 순서를 복구하여 검증했다. 향후 재현에서도 `payload.approved` 자체를 정렬하면 안 된다.

## 재현 예시

아래 코드는 파일을 쓰지 않는다. 구현은 기존 동결 버전을 유지하고, 아카이브로부터 입력을 공급한다.

```sh
rtk proxy node --input-type=module <<'NODE'
import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { runPhase2 } from './scripts/hanja-component-phase2.ts'
const sha = value => createHash('sha256')
  .update(Buffer.isBuffer(value) ? value : JSON.stringify(value)).digest('hex')
const bytes = fs.readFileSync('docs/hanja-component-phase2-2026-09-09/replay-input.json')
assert.equal(sha(bytes), '3b0ad533655bc596704bf529d2accf9a001f203db8381e89d0a4a792f422b70a')
const archive = JSON.parse(bytes)
const p = archive.payload
assert.equal(sha(p), archive.payloadSha256)
assert.equal(sha([...p.approved].sort((a, b) =>
  a.glyph.codePointAt(0) - b.glyph.codePointAt(0))), archive.baseline.expectedApprovedSnapshotSha256)
assert.equal(sha(p.input), archive.baseline.inputCanonicalSha256)
assert.equal(sha(p.reviewedParts), archive.baseline.recipeHash)
const expectedBytes = fs.readFileSync(archive.baseline.phase2ResultPath)
assert.equal(sha(expectedBytes), archive.baseline.resultFileSha256)
const actual = runPhase2(p.input, p.approved, p.characters, p.split, p.reviewedParts,
  { mode: 'validation' })
assert.deepEqual(actual, JSON.parse(expectedBytes))
assert.equal(sha(actual), archive.baseline.resultCanonicalSha256)
console.log('Frozen phase2 replay matches the existing result')
NODE
```

동결한 기존 CLI는 변경하지 않았다. 현재 런타임과 독립적으로 재현하려면 새 `rtk proxy node scripts/hanja-component-replay.ts --check` 명령을 사용한다. 아카이브 바이트·payload·입력·구현 8개 파일·기존 결과 해시와 반환 객체 전체를 검사하며 파일을 쓰지 않는다. 현재 승인 수는 재현 결과 밖에 별도로 표시하고, 기존 결과의 `unchangedRuntime: 743`은 당시 실험 상태로 유지한다. 새 글자 추가를 이유로 기존 스냅샷·split·recipe·result를 덮어쓰지 않는다.
