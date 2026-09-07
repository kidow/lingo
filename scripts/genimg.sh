#!/bin/zsh
# 개념 그림을 배치로 만든다. (spec.md §7, IMAGE_STYLE.md)
#
#   pnpm genimg glitter wilt bury …        기본은 한 장씩 (PAR=1)
#   PAR=2 pnpm genimg glitter wilt …       동시에 두 장 — 아래 경고를 읽을 것
#
# `pnpm prompt <slug>`이 만든 최종 문구를 gpt-image 스킬에 넘기고, 나온 PNG를
# `.images/<slug>.png`에 둔다. 이어서 `pnpm image <slug>`로 WebP를 만든다.
#
# **slug마다 임시 디렉터리를 따로 준다.** codex는 workspace-write 샌드박스라
# 제 디렉터리 밖에 못 쓴다 — 한 매니페스트에 --concurrency 3으로 돌렸을 때
# 그림이 남의 slug 자리에 저장된 사고가 있었고, 디렉터리를 나누면 그 경로가
# 구조적으로 막힌다.
#
# **그래도 동시 실행은 사고가 난다.** 디렉터리를 나눈 뒤에도 PAR=2에서 두 번
# 겪었다 — 한 번은 같은 그림이 두 slug에 들어갔고, 한 번은 한 장이 통째로
# 나오지 않았다(쉰 장 남짓에 두 번). 그래서 기본을 1로 둔다. 2로 올리면 장당
# 47초가 25초로 줄지만, 사고를 반드시 눈으로 확인해야 한다.
#
# **프로세스를 나눠도 사고는 난다.** 스물두 장을 `pnpm genimg` 두 번으로
# 동시에 돌리면 11분에 끝나지만(한 프로세스 PAR=1이면 22분), 두 번째 회차에서
# `part-with`와 `set-about`이 바이트까지 같은 파일이 됐다 — 서로 **다른**
# 프로세스의 슬러그다. 앞선 회차에 "프로세스가 다르면 사고의 여지가 구조적으로
# 없다"고 적었는데 틀렸다.
#
# 게다가 그 사고는 **검사에 안 걸렸다.** 중복 검사가 `"$@"`, 곧 그 실행에
# 넘긴 슬러그끼리만 비교했기 때문이다. 아래에서 요청한 장을 `.images/` 전체와
# 대조하도록 넓혔다 — 다른 프로세스가 만든 장과도 맞춰 본다.
#
# 나눠 돌리려면 두 가지를 지킨다. **출력을 버리지 않는다**(`> /dev/null`로
# 경고를 흘린 적이 있다). 그리고 **모두 끝난 뒤 `md5 -q .images/*.png | sort |
# uniq -d`를 한 번 더 돌린다** — 나중에 끝난 쪽만 교차 중복을 볼 수 있다.
#
# 끝나고 두 가지를 검사한다. 둘 다 걸리면 0이 아닌 값으로 끝난다.
#
#   빠진 장   요청한 slug 중 파일이 안 생긴 것. **이것이 조용한 쪽이다** —
#             md5는 있는 파일끼리만 비교하므로 없는 장은 영영 안 걸린다
#   같은 장   두 slug에 바이트가 같은 파일이 들어간 것
#
# 그림이 서로 **뒤바뀐 것**은 여기서 못 잡는다. 바이트도 다르고 구조도 달라서다 —
# `pnpm sheet`로 붙여 놓고 눈으로 본다.
set -u
REPO=/Users/kidow/Documents/dev/kidow/lingo
SKILL=~/.claude/skills/gpt-image/scripts/gpt_image.mjs
PAR=${PAR:-1}
TMP=$(mktemp -d)

if [ $# -eq 0 ]; then
  print -r -- "slug를 하나 이상 주세요.\n\n  pnpm genimg glitter wilt bury"
  exit 1
fi

# 프롬프트 본문은 `pnpm prompt`가 IMAGE_STYLE을 얹어 만든다. 구분선 셋째 칸이다
build() {
  local slug=$1 ws=$2
  SLUG=$slug WS=$ws REPO=$REPO python3 - <<'PY'
import json, os, subprocess, sys
slug, ws, repo = os.environ['SLUG'], os.environ['WS'], os.environ['REPO']
out = subprocess.run(['pnpm', 'prompt', slug], capture_output=True, text=True, cwd=repo).stdout
parts = out.split('─' * 72)
# 구분선이 셋 미만이면 그런 slug가 없다는 뜻이다. 여기서 멈춰야 API를 안 부른다
if len(parts) < 3:
    sys.exit(1)
json.dump({'jobs': [{'id': slug, 'prompt': parts[2].strip(), 'out': slug + '.png', 'overwrite': True}]},
          open(f'{ws}/m.json', 'w'), ensure_ascii=False)
PY
}

run_one() {
  local slug=$1 ws=$TMP/$1
  node "$SKILL" batch --manifest "$ws/m.json" --cwd "$ws" --concurrency 1 >"$ws/log" 2>&1
  if [ -f "$ws/$slug.png" ]; then
    mv "$ws/$slug.png" "$REPO/.images/$slug.png"
    print -r -- "  OK   $slug"
  else
    print -r -- "  FAIL $slug — $(grep -o 'ERROR\[[^]]*\]=.\{0,120\}' "$ws/log" | head -1)"
  fi
}

mkdir -p "$REPO/.images"

wanted=()
for slug in "$@"; do
  mkdir -p "$TMP/$slug"
  if build "$slug" "$TMP/$slug"; then
    wanted+=("$slug")
  else
    print -r -- "  SKIP $slug — 그런 개념이 없습니다 (pnpm prompt가 문구를 못 냈습니다)"
  fi
done

START=$(date +%s)
pids=()
for slug in $wanted; do
  run_one "$slug" &
  pids+=($!)
  if [ ${#pids[@]} -ge $PAR ]; then wait ${pids[1]}; pids=(${pids[@]:1}); fi
done
wait
print -r -- "총 $(( $(date +%s) - START ))초 · ${#wanted[@]} 장 · 동시 $PAR"

bad=0

# 빠진 장. 동시 실행에서 한 장이 OK도 FAIL도 없이 사라진 적이 있다
gone=()
for slug in "$@"; do [ -f "$REPO/.images/$slug.png" ] || gone+=("$slug"); done
if [ ${#gone[@]} -gt 0 ]; then
  print -r -- "경고 — 파일이 안 만들어진 slug: ${gone[*]}"
  bad=1
fi

# 같은 장이 두 slug에 들어간 자리. 디렉터리를 나눠도, 프로세스를 나눠도 겪었다.
# **요청한 장만이 아니라 `.images/` 전체와 대조한다** — 다른 프로세스가 같은 그림을
# 남의 슬러그에 넣었을 때 자기 목록끼리만 비교하면 영영 안 걸린다
files=("$REPO"/.images/*.png(N))
if [ ${#files[@]} -gt 1 ]; then
  dupes=$(md5 -r "${files[@]}" 2>/dev/null | awk '{n=split($2,p,"/"); h[$1]=h[$1]" "p[n]} END {for (k in h) if (split(h[k],a," ")>1) print h[k]}')
  if [ -n "$dupes" ]; then
    print -r -- "경고 — 같은 그림이 여러 slug에 들어갔다:$dupes"
    print -r -- "       해당 slug를 지우고 PAR=1로 다시 돌리세요."
    bad=1
  fi
fi

rm -rf "$TMP"
[ $bad -eq 0 ] || exit 1

# 시트를 여기서 만든다. **md5로 못 잡는 사고가 남아 있기 때문이다** —
# 그림이 서로 뒤바뀐 것은 바이트도 구조도 달라 어떤 검사도 못 본다. 눈으로
# 보는 수밖에 없는데, 예전에는 이 줄이 "pnpm sheet를 돌리세요"라는 권유였고
# 그래서 건너뛸 수 있었다. 붙여 두면 열어 보기만 하면 된다.
#
# 두 프로세스로 나눠 돌릴 때 서로 덮지 않도록 첫 slug를 이름에 넣는다
SHEET="$REPO/.images/sheet-$1.png"
node "$REPO/scripts/sheet.ts" --out "$SHEET" "$@"
print -r -- "그림을 눈으로 확인하세요 — $SHEET"
