import { db } from './sync.ts'

/**
 * 매일 알림. 켜고 끄는 쪽이다 — 보내는 쪽은 서버에 있다
 * (supabase/functions/daily-reminder, supabase/migrations/…_reminders.sql).
 *
 * **조르지 않는 알림이다.** 기본은 꺼져 있고 사람이 켠다. 오늘 이미 공부했으면
 * 서버가 보내지 않는다. spec.md §2가 스트릭·일일 목표를 뺀 이유를 지킨다.
 *
 * iOS에서는 **홈 화면에 추가한 앱으로 열었을 때만** 된다(iOS 16.4 이상).
 * Safari 탭에서는 권한을 묻는 길 자체가 없다. 권한은 사람이 버튼을 누른 그
 * 순간에만 물을 수 있다.
 */

/** 서버가 푸시에 서명할 때 쓰는 공개 키. 비면 알림 자리가 통째로 없다 */
const VAPID = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY

/** 알림을 처음 켤 때 고른 것으로 두는 시각. 하루 공부를 마무리할 저녁이다 */
export const DEFAULT_HOUR = 21

/**
 * 이 기기에서 알림을 켤 수 있는가.
 *
 * `install` — iOS Safari 탭이다. 홈 화면에 추가하면 된다고 알려 줄 자리다.
 * `unsupported` — 켤 방법이 없다. 자리를 안 세운다.
 */
export type Availability = 'ready' | 'install' | 'unsupported'

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  // iPadOS는 데스크톱 Safari인 척한다. 손가락이 닿는 Mac은 없다
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

const standalone = () =>
  matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true

export function availability(): Availability {
  if (!VAPID || typeof window === 'undefined' || !('serviceWorker' in navigator)) return 'unsupported'
  // iOS는 탭에서도 PushManager를 드러낼 때가 있어 먼저 홈 화면 여부를 본다
  if (isIOS() && !standalone()) return 'install'
  return 'PushManager' in window && 'Notification' in window ? 'ready' : 'unsupported'
}

/** 알림 권한을 이미 거절했는가. 그러면 앱이 다시 물을 수 없다 — 설정에서만 풀린다 */
export const blocked = () => typeof Notification !== 'undefined' && Notification.permission === 'denied'

export const BLOCKED_MESSAGE = '알림이 막혀 있습니다. 설정 → 알림 → Lingo에서 켤 수 있습니다.'

async function subscription(): Promise<PushSubscription | null> {
  const registration = await navigator.serviceWorker.getRegistration('/')
  return (await registration?.pushManager.getSubscription()) ?? null
}

/** 켜져 있으면 받는 시각(0~23), 꺼져 있으면 null. 서버에 줄이 있어야 켜진 것이다 */
export async function currentHour(): Promise<number | null> {
  const supabase = db()
  const current = await subscription()
  if (!supabase || !current) return null
  const { data } = await supabase
    .from('push_subscriptions')
    .select('hour')
    .eq('endpoint', current.endpoint)
    .maybeSingle()
  return (data?.hour as number | undefined) ?? null
}

/** base64url → 바이트. 브라우저가 공개 키를 이 모양으로 받는다 */
function keyBytes(base64url: string): Uint8Array<ArrayBuffer> {
  const base64 = (base64url + '='.repeat((4 - (base64url.length % 4)) % 4)).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64)
  const bytes = new Uint8Array(new ArrayBuffer(raw.length))
  for (let i = 0; i < raw.length; i += 1) bytes[i] = raw.charCodeAt(i)
  return bytes
}

/**
 * 알림을 켠다. 실패하면 사람에게 보일 말을 돌려준다.
 *
 * **권한부터 묻는다.** iOS는 사람이 누른 그 순간에만 묻게 해 준다 — 서비스
 * 워커를 먼저 등록하고 기다렸다 물으면 그 순간이 지나가 조용히 거절된다.
 */
export async function enableReminder(hour: number): Promise<string | null> {
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return BLOCKED_MESSAGE

  const supabase = db()
  if (!supabase || !VAPID) return '알림을 켤 수 없습니다.'

  try {
    // 알림을 켤 때만 등록한다. 켜지 않은 기기에는 서비스 워커가 없다 (public/sw.js)
    await navigator.serviceWorker.register('/sw.js')
    const registration = await navigator.serviceWorker.ready
    const current =
      (await registration.pushManager.getSubscription()) ??
      (await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(VAPID) }))

    const { endpoint, keys } = current.toJSON()
    if (!endpoint || !keys?.p256dh || !keys.auth) return '알림 주소를 받지 못했습니다.'

    const { error } = await supabase.from('push_subscriptions').upsert(
      {
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
        hour,
        // 받는 시각은 이 기기의 시간대로 센다. 서울에서 고른 9시는 서울의 9시다
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      },
      { onConflict: 'endpoint' },
    )
    return error ? error.message : null
  } catch (cause) {
    return cause instanceof Error ? cause.message : '알림을 켜지 못했습니다.'
  }
}

/** 받는 시각을 바꾼다 */
export async function setReminderHour(hour: number): Promise<string | null> {
  const supabase = db()
  const current = await subscription()
  if (!supabase || !current) return '알림이 꺼져 있습니다.'
  const { error } = await supabase.from('push_subscriptions').update({ hour }).eq('endpoint', current.endpoint)
  return error ? error.message : null
}

/**
 * 알림을 끈다. 서버의 줄을 먼저 지운다 — 그래야 구독 해지가 실패해도 더
 * 오지 않는다. 서비스 워커도 거둔다. 켤 때만 있던 것이라 끄면 없던 것이 된다.
 */
export async function disableReminder(): Promise<string | null> {
  const supabase = db()
  const current = await subscription()
  if (supabase && current) {
    const { error } = await supabase.from('push_subscriptions').delete().eq('endpoint', current.endpoint)
    if (error) return error.message
  }
  await current?.unsubscribe()
  await (await navigator.serviceWorker.getRegistration('/'))?.unregister()
  return null
}
