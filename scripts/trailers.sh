#!/bin/zsh
# 커밋 트레일러가 제 꼴인지 본다.
#
#   pnpm trailers        최근 쉰 개
#   pnpm trailers 200    개수를 준다
#
# 2026-09-10에 `Co-Authored-By: Claude Opus 5 <maybe@noreply>`가 나갔다. 이미
# 푸시된 뒤라 고치지 못했다 — 워크트리를 남과 함께 쓰는 동안 force-push는
# 남이 받아 간 것을 지울 수 있어서다(docs/concurrent-sessions.md). 그러니
# **나가기 전에** 잡아야 한다.
#
# **없는 것은 짚지 않는다.** 이백 개를 훑어 보니 192개가 제 꼴이고 하나가
# 어긋났으며 일곱에는 아예 없었다. 없는 일곱은 다른 세션이 쓴 hanja 커밋이라
# 그 세션의 규칙이 다르다. 어긋난 것만 본다.
set -u
REPO=${0:a:h:h}
cd $REPO

WANT='Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>'
N=${1:-50}

# **이미 나간 것은 봐준다.** 3fc5d430이 그 오타로 나갔고 그때 이 검사가 없었다.
# 고치려면 history를 다시 써야 하는데 워크트리를 남과 함께 쓰는 동안에는 못
# 한다. 이 하나를 짚어 두면 막이가 쉰 개 동안 계속 실패하고, 그러면 «늘 빨간
# 검사»가 되어 아무도 안 본다 — 오늘 하루 종일 고친 병이 그것이다.
typeset -A FORGIVEN
FORGIVEN[3fc5d43028a8de50fb17a87b7b5e2785683aafad]=1

bad=0
git log -$N --format='%H' | while read -r h; do
  line=$(git log -1 --format='%B' "$h" | grep -i '^Co-Authored-By:' | head -1 | sed 's/[[:space:]]*$//')
  [ -z "$line" ] && continue
  [ "$line" = "$WANT" ] && continue
  [ -n "${FORGIVEN[$h]:-}" ] && continue
  print -r -- "  어긋남 $(git log -1 --format='%h %s' "$h")"
  print -r -- "         $line"
done > /tmp/trailers.$$ 2>/dev/null

if [ -s /tmp/trailers.$$ ]; then
  print -r -- ""
  print -r -- "트레일러가 어긋난 커밋이 있습니다 — 기대: $WANT"
  cat /tmp/trailers.$$
  bad=1
else
  print -r -- "최근 $N개 — 트레일러가 다 제 꼴입니다"
fi
rm -f /tmp/trailers.$$
exit $bad
