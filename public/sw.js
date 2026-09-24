// 서비스 워커. **알림을 받는 일만 한다.** (lib/push.ts)
//
// spec.md §2는 오프라인 학습을 뺐다. 그래서 fetch를 가로채지 않는다 — 캐시가
// 없으니 네트워크가 끊기면 지금처럼 그냥 안 뜬다. 이 파일이 있는 이유는
// iOS가 알림을 서비스 워커로만 건네주기 때문이다.
//
// 알림을 켠 기기에만 등록된다. 켜지 않은 사람에게는 이 파일이 없는 것과 같다.

self.addEventListener('push', (event) => {
  // iOS는 받은 푸시마다 알림을 **꼭** 띄워야 한다. 조용히 넘기면 몇 번 뒤에
  // 구독을 거둔다 — 내용을 못 읽어도 기본 문구로 띄운다
  let message = { title: 'Lingo', body: '오늘 카드가 준비됐어요' }
  try {
    if (event.data) message = { ...message, ...event.data.json() }
  } catch {}

  event.waitUntil(
    self.registration.showNotification(message.title, {
      body: message.body,
      icon: '/icon-192.png',
      // 같은 날 두 번 와도 하나로 겹친다
      tag: 'daily-reminder',
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    (async () => {
      // 이미 열린 창이 있으면 그리로 간다. 새로 열면 피드가 처음부터 선다
      const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      for (const client of windows) if ('focus' in client) return client.focus()
      return self.clients.openWindow('/')
    })(),
  )
})
