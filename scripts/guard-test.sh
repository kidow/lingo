#!/bin/zsh
# 동시 세션 막이 셋이 실제로 도는지 확인한다. (docs/concurrent-sessions.md)
#
#   pnpm guards
#
# 막는 자리가 셋이다. 셋 다 «그 개념이 든 파일이 아직 커밋되지 않은 수정을
# 품고 있는가»를 본다.
#
#   pnpm dup     걸린 개념 줄에 ⟨손대는 중⟩을 붙인다
#   pnpm props   임자 줄에 ⟨손대는 중⟩을 붙인다
#   pnpm genimg  **이미 있는 그림**을 다시 그리려 하면 멈춘다
#
# 확인하려면 콘텐츠 파일이 더러워야 한다. 남의 파일을 건드릴 수는 없으므로
# **`content/scene.json`에 빈 줄 하나를 붙였다 뗀다** — 내용은 그대로다.
# 끝나면 어떤 경로로 끝나든 원래대로 돌린다(trap).
#
# 2026-09-09에 이 막이들을 손으로 세 번 시험했다. 규칙을 손볼 때마다 같은 절차를
# 반복하게 되므로 스크립트로 남긴다.
#
# **그림은 만들지 않는다.** genimg의 막이는 프롬프트를 짓기 전에 걸리고, 통과
# 시험은 없는 slug로 하므로 API를 부르지 않는다.
set -u
REPO=${0:a:h:h}
FILE=$REPO/content/scene.json
cd $REPO

if [ -n "$(git diff --name-only HEAD -- content/scene.json)" ]; then
  print -r -- "content/scene.json에 이미 수정이 있습니다 — 시험이 그것과 섞입니다. 커밋하고 다시 부르세요."
  exit 1
fi

restore() { node -e 'const fs=require("fs"),p=process.argv[1];fs.writeFileSync(p,fs.readFileSync(p,"utf8").replace(/\n+$/,"\n"))' $FILE }
trap restore EXIT INT TERM

printf '\n' >> $FILE
if [ -z "$(git diff --name-only HEAD -- content/scene.json)" ]; then
  print -r -- "실패 — 파일을 더럽히지 못했습니다"
  exit 1
fi

fail=0
ok() { print -r -- "  OK   $1" }
no() { print -r -- "  실패 $1"; fail=1 }

# 1. dup — scene의 개념이 걸리면 표시가 붙는다
if pnpm dup pay-by-card 2>&1 | grep -q "손대는 중"; then ok "dup이 표시를 붙인다"
else no "dup에 표시가 없다"; fi

# 2. props — 임자 줄에 표시가 붙는다. scene 개념이 나오는 질의를 쓴다
if pnpm props "one card reader showing a small cross mark" 2>&1 | grep -q "손대는 중"; then
  ok "props가 표시를 붙인다"
else no "props에 표시가 없다"; fi

# 3. genimg — **그림이 있는** 개념을 다시 그리려 하면 멈춘다
out=$(pnpm genimg pay-by-card 2>&1)
if print -r -- "$out" | grep -q "멈춤 —"; then ok "genimg이 다시 그리기를 막는다"
else no "genimg이 안 막았다"; fi

# 4. 그림이 없는 자리는 막지 않는다. 없는 slug라 API도 안 부른다
out=$(pnpm genimg no-such-slug-for-guard-test 2>&1)
if print -r -- "$out" | grep -q "멈춤 —"; then no "genimg이 채우기까지 막았다"
else ok "genimg이 채우기는 지나간다"; fi

restore
if [ -n "$(git diff --name-only HEAD -- content/scene.json)" ]; then
  print -r -- "  실패 원복이 안 됐습니다 — git checkout content/scene.json 을 하세요"
  fail=1
else
  ok "시험 파일을 원래대로 돌렸다"
fi

print -r -- ""
[ $fail -eq 0 ] && print -r -- "막이 셋 다 돕니다" || print -r -- "막이가 새고 있습니다"
exit $fail
