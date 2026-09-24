// 매일 알림을 보낸다. Supabase Cron이 한 시간마다 부른다.
// (supabase/migrations/…_reminders.sql, docs/progress-sync.md)
//
// 누구에게 보낼지는 DB가 정한다(`due_reminders`) — 그 기기 시간대로 지금이
// 고른 시각이고, 오늘 안 보냈고, 오늘 한 장도 안 넘긴 구독만 돌아온다.
// 여기는 보내고 적어 두는 일만 한다.
//
// **Deno에서 돈다.** 앱과 같은 저장소에 있지만 앱 빌드와 타입 검사에서는
// 빠진다(tsconfig.json의 exclude). 대시보드의 Edge Functions 편집기에 이
// 파일을 그대로 붙여 배포한다.
//
// 필요한 비밀값 (Edge Functions → Secrets)
//   VAPID_PUBLIC_KEY · VAPID_PRIVATE_KEY  `npx web-push generate-vapid-keys`로 만든 한 쌍
//   VAPID_SUBJECT                         mailto:로 시작하는 연락처. 푸시 서비스가 문제 있을 때 쓴다
//   CRON_SECRET                           Cron이 헤더에 실어 보내는 값. 아무나 이 함수를 못 부르게 한다
// SUPABASE_URL · SUPABASE_SERVICE_ROLE_KEY는 Supabase가 알아서 넣어 준다.

import webpush from 'npm:web-push@3.6.7'
import { createClient } from 'npm:@supabase/supabase-js@2'

// 숫자도 죄책감도 넣지 않는다. "3일째 안 했어요"는 조르는 말이다 (spec.md §2)
const MESSAGE = { title: 'Lingo', body: '오늘 카드가 준비됐어요' }

type Due = { endpoint: string; p256dh: string; auth: string; local_day: string }

Deno.serve(async (req) => {
  // 두 번 불려도 하루 한 번만 보내지만(last_sent_on), 아무나 부르면 헛돈다
  if (req.headers.get('x-cron-secret') !== Deno.env.get('CRON_SECRET')) {
    return new Response('forbidden', { status: 403 })
  }

  // 비밀값을 빠뜨리면 web-push가 던진다. 그대로 두면 "Internal Server Error"만
  // 남아 무엇이 빠졌는지 알 수 없다 — 배포하고 처음 부를 때 여기서 걸린다
  try {
    webpush.setVapidDetails(
      Deno.env.get('VAPID_SUBJECT') ?? '',
      Deno.env.get('VAPID_PUBLIC_KEY') ?? '',
      Deno.env.get('VAPID_PRIVATE_KEY') ?? '',
    )
  } catch (cause) {
    const reason = cause instanceof Error ? cause.message : String(cause)
    return new Response(`VAPID 비밀값을 확인하세요 (VAPID_SUBJECT · VAPID_PUBLIC_KEY · VAPID_PRIVATE_KEY): ${reason}`, {
      status: 500,
    })
  }
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

  // `?test=1`은 조건을 건너뛰고 **모든 구독**에 지금 보낸다. 켜 놓고 제대로
  // 오는지 보려는 자리다 — 정식 경로는 공부한 날에 안 보내서 오늘 시험할 길이
  // 없다. 보낸 날로 적지 않으므로 오늘 정식 알림은 그대로 산다
  const test = new URL(req.url).searchParams.get('test') === '1'
  const { data, error } = test
    ? await db.from('push_subscriptions').select('endpoint, p256dh, auth')
    : await db.rpc('due_reminders')
  if (error) return new Response(error.message, { status: 500 })
  const due = (data ?? []) as Due[]

  let sent = 0
  let gone = 0
  let failed = 0

  for (const row of due) {
    try {
      await webpush.sendNotification(
        { endpoint: row.endpoint, keys: { p256dh: row.p256dh, auth: row.auth } },
        JSON.stringify(MESSAGE),
        // 한 시간 안에 못 닿으면 버린다. 저녁 9시 알림이 새벽에 오면 소용없다
        { TTL: 60 * 60 },
      )
      if (!test) {
        await db.from('push_subscriptions').update({ last_sent_on: row.local_day }).eq('endpoint', row.endpoint)
      }
      sent += 1
    } catch (cause) {
      const status = (cause as { statusCode?: number }).statusCode
      // 404·410은 그 주소가 죽었다는 뜻이다 — 홈 화면에서 앱을 지웠거나 권한을
      // 거뒀다. 남겨 두면 매일 헛보낸다
      if (status === 404 || status === 410) {
        await db.from('push_subscriptions').delete().eq('endpoint', row.endpoint)
        gone += 1
      } else {
        failed += 1
      }
    }
  }

  return Response.json({ test, due: due.length, sent, gone, failed })
})
