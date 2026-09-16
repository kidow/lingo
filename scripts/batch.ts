/**
 * 개념을 넣은 **직후에 늘 함께 도는 아홉**을 한 번에 돌린다. (spec.md §7)
 *
 *   node scripts/batch.ts private-room bring-slippers meals-included …
 *
 *   1. pnpm props --in       배치 안에서 겹치는 소품을 찍는다
 *   2. pnpm romanize         ja·zh·ru 예문의 로마자를 채운다
 *   3. scripts/ipa.ts        발음기호를 채운다
 *   4. scripts/ipa-fr.ts     프랑스어 발음기호를 채운다 (Lexique 383)
 *   5. pnpm tocfl            zh의 번체 표기·TOCFL 등급을 채운다
 *   6. pnpm levels           JLPT·HSK·CEFR·TSL·TORFL 등급을 채운다
 *   7. pnpm audio manifest   발음이 없는 자리를 lib/audio-have.ts에 적는다
 *   8. pnpm split            화면이 읽는 public/content/를 다시 굽는다
 *   9. pnpm check            전부 검증한다
 *
 * 순서에 뜻이 있다. 소품 겹침은 **그림을 뽑기 전에** 알아야 고칠 수 있고,
 * 로마자와 발음기호는 채우기 전에 `check`를 돌리면 경고가 백 줄 넘게 나와
 * 진짜 문제를 덮는다. 그래서 채운 다음에 검사한다.
 *
 * **채우는 셋(5·6·7)이 뒤에 붙은 것은 `check`가 그 결과물을 읽어서다.**
 * `check`는 `lib/audio-have.ts`의 `AUDIO_MISSING`과 `lib/levels-stamp.ts`의
 * `LEVELS_STAMP`를 import하고, zh에 `tocfl` 등급이 붙은 낱말의 예문에 번체가
 * 없으면 "pnpm tocfl 을 돌리세요"라고 운다. 셋을 빼고 돌리면 **회차마다 같은
 * 경고가 나고 사람이 같은 세 줄을 손으로 앞에 붙였다** — 서른 회차 넘게 그랬다.
 * 굽기보다 앞인 것도 같은 이유다. 굽기는 채워진 콘텐츠를 실어야 한다.
 *
 * 값은 셋을 합쳐 10초쯤이고 그 대부분이 `tocfl`이다(8.5초 · 공식 자료 여섯을
 * 겹친다). 나머지 둘은 각각 0.5초다.
 *
 * **셋이 적는 `lib/` 두 파일은 커밋에 싣지 않는다.** 전역 생성물이라 워크트리를
 * 나눠 쓰는 세션끼리 부딪는다 (spec.md §7 · docs/concurrent-sessions.md).
 *
 * **`ipa-fr`를 따로 적은 것은 여기서 빠져 있었기 때문이다.** `pnpm ipa`는
 * `ipa.ts && ipa-fr.ts` 둘을 이어 돌리는데 이 스크립트는 `ipa.ts` 하나만 불렀다.
 * 서른 회차 넘게 그렇게 돌았고, 붙이고 처음 돌린 날 프랑스어 발음기호
 * **561건**이 한꺼번에 채워졌다. `check`가 울지 않아 아무도 몰랐다 — 참고줄은
 * 없어도 화면이 서는 자리라 빈 것이 경고가 아니다. **package.json의 한 이름이
 * 스크립트 둘을 가리키면, 그 이름을 부르지 않고 안쪽을 부르는 자리가 조용히
 * 반쪽만 돈다.**
 *
 * **굽기를 넣은 것은 값이 거의 없어서다.** 1초면 끝나고(`pnpm split`),
 * `predev`·`prebuild`가 이미 같은 일을 하므로 새 의존도 아니다. 굽고 나면
 * dev 화면이 방금 넣은 개념을 그대로 보여주고 `check`의 낡음 경고도 사라진다.
 * 결과물은 `.gitignore`에 있어 커밋에는 실리지 않는다.
 *
 * **`pnpm dup`은 여기 없다.** 그건 개념을 쓰기 전에 도는 것이고 이건 쓴 뒤에
 * 도는 것이라, 묶으면 둘 중 하나는 늘 헛돈다.
 *
 * **`pnpm guards`도 여기 없다.** 넣으면 **모든 회차가 첫 단계에서 죽는다** —
 * 그 시험은 `content/scene.json`을 일부러 더럽히므로 그 파일이 깨끗할 때만
 * 돌고, 이 스크립트는 개념을 막 써 넣어 그 파일이 더러운 순간에 돈다.
 * 값도 안 맞는다. 17초가 걸리고, 보는 것이 콘텐츠가 아니라 **막이 코드**라
 * 회차마다 재도 결과가 같다. 막이를 손볼 때 손으로 부른다 (docs/nets.md).
 *
 * 회차마다 이것들을 손으로 이어 쳤고, 로마자를 잊어 `check`가 경고 이백 줄을
 * 뿜은 적이 있다. 순서를 아는 자리를 스크립트에 두면 잊을 데가 없다.
 */
import { spawnSync } from 'node:child_process'

const slugs = process.argv.slice(2)
if (slugs.length === 0) {
  console.log('배치에 넣은 slug를 적으세요')
  console.log('  node scripts/batch.ts private-room bring-slippers …')
  process.exit(1)
}

/** 넷 중 하나라도 실패하면 거기서 멈춘다 — 다음 단계가 앞 단계를 전제한다 */
function run(label: string, args: string[]) {
  console.log(`\n── ${label}`)
  const { status } = spawnSync('node', args, { stdio: 'inherit' })
  if (status !== 0) {
    console.log(`\n${label}에서 멈췄습니다`)
    process.exit(status ?? 1)
  }
}

run('소품 겹침', ['scripts/props.ts', '--in', ...slugs])
run('로마자', ['scripts/romanize.ts'])
run('발음기호', ['scripts/ipa.ts'])
run('발음기호 fr', ['scripts/ipa-fr.ts'])
run('번체·TOCFL', ['scripts/tocfl.ts'])
run('시험 등급', ['scripts/levels.ts'])
run('발음 목록', ['scripts/audio.ts', 'manifest'])
run('굽기', ['scripts/split.ts'])
run('검증', ['scripts/check.ts'])
console.log('\n아홉 다 지났습니다 — 이제 pnpm genimg으로 그림을 뽑습니다\n')
