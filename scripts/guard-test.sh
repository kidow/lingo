#!/bin/zsh
# 동시 세션 막이가 실제로 도는지 확인한다. (docs/concurrent-sessions.md)
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
# `pnpm pending`도 여기서 한 번 부른다. 그건 막이가 아니라 넘김 목록이지만
# 같은 `dirtyFiles`를 쓰고 배선이 끊기면 조용히 «0»이 되므로 함께 본다.
#
# 확인하려면 콘텐츠 파일이 더러워야 한다. 남의 파일을 건드릴 수는 없으므로
# **지금 깨끗한 파일을 하나 골라 그 개념 하나에 공백 한 칸을 붙였다 뗀다.**
#
# 빈 줄만 붙이던 때는 이 시험이 헛돌았다. `genimg`의 막이가 **어느 개념이
# 달라졌는지**를 보게 되면서(요청한 slug만 달라진 파일은 깨끗하게 친다) 개념이
# 하나도 안 바뀐 파일은 막이의 눈에 깨끗해서다. 그래서 **시험이 건드리는 개념과
# 다시 그리려는 개념을 서로 다르게** 둔다 — 그게 남이 만지는 상황이다.
#
# 끝나면 어떤 경로로 끝나든 원래대로 돌린다(trap).
#
# 2026-09-09에 이 막이들을 손으로 세 번 시험했다. 규칙을 손볼 때마다 같은 절차를
# 반복하게 되므로 스크립트로 남긴다.
#
# **그림은 만들지 않는다.** genimg의 막이는 프롬프트를 짓기 전에 걸리고, 통과
# 시험은 없는 slug로 하므로 API를 부르지 않는다.
set -u
REPO=${0:a:h:h}
cd $REPO

# **어느 파일을 쓸지는 그때 고른다.** 예전에는 content/scene.json에 묶여 있어
# 그 파일에 남의 미커밋 수정이 있으면 시험이 아예 안 돌았다. 워크트리를 함께
# 쓰는 동안 그 조건은 자주 깨진다 — 2026-09-10에 열여섯 파일 중 여덟이
# 더러웠다. 지금 깨끗한 파일 하나를 골라 쓰고, 하나도 없으면 건너뛴다.
#
# 고르는 것이 셋이다. 더럽힐 개념(MARK), 다시 그려 볼 개념(REDRAW, 그림이
# 있어야 한다), 그리고 props에 물어볼 소품 낱말이다. 소품은 MARK의 프롬프트에서
# **가장 드문 낱말**을 고른다 — 흔한 낱말은 props가 건너뛴다.
PICK=$(node -e '
const fs = require("fs"), { execFileSync } = require("child_process")
const dirty = new Set(
  execFileSync("git", ["diff", "--name-only", "HEAD", "--", "content"], { encoding: "utf8" })
    .split("\n").filter(Boolean).map((p) => p.replace("content/", "")),
)
const files = fs.readdirSync("content").filter((f) => f.endsWith(".json") && !dirty.has(f))
// props와 같은 방식으로 끊는다. 하이픈을 살리지 않으면 «mid-stride»에서
// «stride»를 뽑아 놓고 props는 못 찾는다
const words = (t) =>
  String(t ?? "").toLowerCase().replace(/[^a-z\s-]/g, " ").split(/\s+/).filter((w) => w.length > 3)
const freq = new Map()
const all = []
for (const f of fs.readdirSync("content").filter((f) => f.endsWith(".json"))) {
  const j = JSON.parse(fs.readFileSync("content/" + f, "utf8"))
  if (!Array.isArray(j.concepts)) continue
  for (const c of j.concepts) {
    all.push({ file: f, ...c })
    for (const w of new Set(words(c.image_prompt))) freq.set(w, (freq.get(w) ?? 0) + 1)
  }
}
for (const f of files) {
  const rows = all.filter((c) => c.file === f)
  const drawn = rows.find((c) => fs.existsSync(`public/concepts/${c.slug}.webp`))
  const mark = rows.find((c) => c !== drawn && words(c.image_prompt).length > 0)
  if (!drawn || !mark) continue
  const word = words(mark.image_prompt).sort((a, b) => (freq.get(a) ?? 0) - (freq.get(b) ?? 0))[0]
  console.log([f, mark.slug, drawn.slug, word].join(" "))
  break
}
')
if [ -z "$PICK" ]; then
  print -r -- "깨끗한 콘텐츠 파일이 없습니다 — 시험을 건너뜁니다."
  print -r -- "  남의 미커밋 수정과 섞이지 않으려면 파일 하나가 비어 있어야 합니다."
  exit 0
fi
FILE=${PICK[(w)1]}
MARK=${PICK[(w)2]}
REDRAW=${PICK[(w)3]}
PROP=${PICK[(w)4]}
print -r -- "시험 파일: content/$FILE  (건드릴 개념 $MARK · 다시 그려 볼 개념 $REDRAW · 소품 «$PROP»)"
print -r -- ""

restore() { git checkout -- "content/$FILE" 2>/dev/null }
trap restore EXIT INT TERM

FILE=$FILE MARK=$MARK node -e '
const fs = require("fs")
const p = "content/" + process.env.FILE
const j = JSON.parse(fs.readFileSync(p, "utf8"))
const c = j.concepts.find((c) => c.slug === process.env.MARK)
if (!c) { console.error("시험용 개념이 없습니다"); process.exit(1) }
c.image_prompt += " "
fs.writeFileSync(p, JSON.stringify(j, null, 2) + "\n")
'
if [ -z "$(git diff --name-only HEAD -- "content/$FILE")" ]; then
  print -r -- "실패 — 파일을 더럽히지 못했습니다"
  exit 1
fi

fail=0
ok() { print -r -- "  OK   $1" }
no() { print -r -- "  실패 $1"; fail=1 }

# 1. dup — scene의 개념이 걸리면 표시가 붙는다
if pnpm dup $REDRAW 2>&1 | grep -q "손대는 중"; then ok "dup이 표시를 붙인다"
else no "dup에 표시가 없다"; fi

# 2. props — 임자 줄에 표시가 붙는다. scene 개념이 나오는 질의를 쓴다
if pnpm props $PROP 2>&1 | grep -q "손대는 중"; then
  ok "props가 표시를 붙인다"
else no "props에 표시가 없다"; fi

# 3. genimg — **그림이 있는** 개념을 다시 그리려 하면 멈춘다
out=$(pnpm genimg $REDRAW 2>&1)
if print -r -- "$out" | grep -q "멈춤 —"; then ok "genimg이 다시 그리기를 막는다"
else no "genimg이 안 막았다"; fi

# 4. 그림이 없는 자리는 막지 않는다. 없는 slug라 API도 안 부른다
out=$(pnpm genimg no-such-slug-for-guard-test 2>&1)
if print -r -- "$out" | grep -q "멈춤 —"; then no "genimg이 채우기까지 막았다"
else ok "genimg이 채우기는 지나간다"; fi

# 5. pending — 넘김 문서를 읽어 목록을 낸다. 판단은 단위 시험이 지키므로
#    여기서는 **도는지**만 본다 (lib/pending.test.ts)
if pnpm pending 2>&1 | grep -q "넘긴 개념"; then ok "pending이 목록을 낸다"
else no "pending이 목록을 못 냈다"; fi

# 6. trailers — 커밋 트레일러가 제 꼴인지. 나간 뒤에는 못 고치므로 여기서 본다
if zsh $REPO/scripts/trailers.sh 50 >/dev/null 2>&1; then ok "커밋 트레일러가 제 꼴이다"
else no "트레일러가 어긋난 커밋이 있다 — pnpm trailers 로 보세요"; fi

restore
if [ -n "$(git diff --name-only HEAD -- "content/$FILE")" ]; then
  print -r -- "  실패 원복이 안 됐습니다 — git checkout content/$FILE 을 하세요"
  fail=1
else
  ok "시험 파일을 원래대로 돌렸다"
fi

print -r -- ""
[ $fail -eq 0 ] && print -r -- "막이가 다 돕니다" || print -r -- "막이가 새고 있습니다"
exit $fail
