#!/bin/zsh
# 커밋 트레일러가 제 꼴인지 본다.
#
#   pnpm trailers        최근 쉰 개
#   pnpm trailers 200    개수를 준다
#   pnpm trailers --self 규칙만 시험한다 (커밋은 안 본다)
#
# 2026-09-10에 `Co-Authored-By: Claude Opus 5 <maybe@noreply>`가 나갔다. 이미
# 푸시된 뒤라 고치지 못했다 — 워크트리를 남과 함께 쓰는 동안 force-push는
# 남이 받아 간 것을 지울 수 있어서다(docs/concurrent-sessions.md). 그러니
# **나가기 전에** 잡아야 한다.
#
# **모델 이름은 고정하지 않는다.** 처음에는 `Claude Opus 5` 한 줄만 옳다고
# 봤는데, 워크트리를 함께 쓰는 세션이 `Claude Fable 5.1`로 적으면서 이 검사가
# 열사흘 동안 계속 빨갰다. 그 줄은 틀린 것이 아니다 — **그 세션이 그 모델**
# 이다. 최근 400개를 세어 보니 Opus 5가 306 · Fable 5.1이 30이고 둘 다 꼴이
# 옳다. 틀린 것은 모델이 아니라 **주소**였다.
#
# 그래서 무엇을 보는지 바꿨다. 「이 문자열인가」가 아니라 「이 꼴인가」다.
#
#     Co-Authored-By: Claude <모델> <noreply@anthropic.com>
#
# 이러면 2026-09-10의 `<maybe@noreply>`는 그대로 걸리고, 다른 세션의 멀쩡한
# 줄은 안 걸린다. **늘 빨간 검사는 아무도 안 본다** — 이 파일이 고치려던
# 병이 바로 그것이라 검사 자신이 그 병에 걸리면 안 된다.
#
# **없는 것은 짚지 않는다.** 최근 400개 가운데 64개에 트레일러가 아예 없고
# 전부 다른 도구가 만든 hanja 커밋이다. 그 규칙은 여기 것이 아니다.
set -u
REPO=${0:a:h:h}

WANT='Co-Authored-By: Claude <모델> <noreply@anthropic.com>'
SHAPE='^Co-Authored-By: Claude [A-Za-z0-9.+ -]+ <noreply@anthropic\.com>$'

# 규칙만 시험한다. 정규식이 헐거워지면 «다 통과»가 되어 조용히 죽으므로,
# 막이가 옳은 줄과 틀린 줄을 둘 다 넣어 본다 (scripts/guard-test.sh)
if [ "${1:-}" = "--self" ]; then
  self=0
  for line in \
    'Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>' \
    'Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>'
  do
    [[ "$line" =~ $SHAPE ]] || { print -r -- "  실패 옳은 줄을 막았다 — $line"; self=1 }
  done
  for line in \
    'Co-Authored-By: Claude Opus 5 <maybe@noreply>' \
    'Co-Authored-By: Claude Opus 5 <noreply@example.com>' \
    'Co-Authored-By: Somebody Else <noreply@anthropic.com>' \
    'Co-Authored-By: Claude <noreply@anthropic.com>'
  do
    [[ "$line" =~ $SHAPE ]] && { print -r -- "  실패 틀린 줄을 지나갔다 — $line"; self=1 }
  done
  [ $self -eq 0 ] && print -r -- "규칙 여섯 줄 — 옳은 둘은 지나가고 틀린 넷은 걸립니다"
  exit $self
fi

cd $REPO
N=${1:-50}

# **이미 나간 것은 봐준다.** 3fc5d430이 그 오타로 나갔고 그때 이 검사가 없었다.
# 고치려면 history를 다시 써야 하는데 워크트리를 남과 함께 쓰는 동안에는 못
# 한다. 지금은 이 저장소에서 닿지 않는 커밋이라 걸릴 일도 없지만, 다시 범위에
# 들어오면 그 하나 때문에 쉰 개 내내 빨개지므로 남겨 둔다.
typeset -A FORGIVEN
FORGIVEN[3fc5d43028a8de50fb17a87b7b5e2785683aafad]=1

git log -$N --format='%H' | while read -r h; do
  [ -n "${FORGIVEN[$h]:-}" ] && continue
  # 한 커밋에 트레일러가 여럿일 수 있다. 첫 줄만 보면 뒤엣것이 샌다
  git log -1 --format='%B' "$h" | grep -i '^Co-Authored-By:' | sed 's/[[:space:]]*$//' | while read -r line; do
    [[ "$line" =~ $SHAPE ]] && continue
    print -r -- "  어긋남 $(git log -1 --format='%h %s' "$h")"
    print -r -- "         $line"
  done
done > /tmp/trailers.$$ 2>/dev/null

bad=0
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
