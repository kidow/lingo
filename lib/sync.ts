import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { createEmptyCard, fsrs, Rating } from 'ts-fsrs'
import { storeCard, type CardState, type Progress, type Rung } from './progress.ts'
import type { TrackId } from './track.ts'

/**
 * 진도 동기화. (docs/progress-sync.md, spec.md §4 §11)
 *
 * **서버는 사본이지 원본이 아니다.** 원본은 그대로 localStorage에 있고
 * (lib/progress.ts) 여기는 그것을 밖에 한 벌 더 두는 자리다. 네트워크가
 * 죽어도, 로그인을 안 했어도, 환경변수가 비어도 앱은 지금 그대로 돈다 —
 * 이 파일의 모든 함수가 그때 조용히 아무것도 안 한다.
 *
 * **스냅샷이 아니라 일어난 일을 쌓는다.** 현재 상태(rung·streak·fsrs)를
 * 올리면 통짜 LWW가 되어, 폰에서 20장 노트북에서 30장을 봤을 때 20장이
 * 사라진다. 지금보다 나쁘다 — 지금은 최소한 각 기기가 자기 것은 지킨다.
 * 로그를 쌓으면 병합이 합집합이 되고, 갈라진 카드만 처음부터 재생하면
 * 잃는 복습이 없다.
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/** 환경변수가 비면 동기화가 통째로 없다. `NEXT_PUBLIC_AUDIO_BASE`와 같은 규칙이다 */
export const SYNC_ON = Boolean(URL && KEY)

let client: SupabaseClient | null = null

/**
 * 붙을 수 있으면 클라이언트를, 아니면 null.
 *
 * **모듈 바깥에서 만들지 않는다.** 세션을 localStorage에 두는데 정적
 * 내보내기의 프리렌더에는 그것이 없다 (next.config.ts).
 */
function db(): SupabaseClient | null {
  if (!URL || !KEY || typeof localStorage === 'undefined') return null
  client ??= createClient(URL, KEY, {
    auth: {
      // 링크가 아니라 6자리 코드를 쓴다. 정적 내보내기라 콜백 라우트를 만들 수
      // 없고, 노트북에서 로그인하며 메일은 폰으로 열어도 된다
      detectSessionInUrl: false,
    },
  })
  return client
}

/* ── 등급 ────────────────────────────────────────────────────────── */

/**
 * 한 줄이 무슨 사건인가. ts-fsrs의 네 등급 중 둘만 쓰고(spec.md §6) 소개는
 * 등급이 아니라 별도 값이다.
 *
 * 소개 카드는 **판정이 없다** — 넘기는 순간 학습으로 인정할 뿐이라
 * (lib/engine.ts의 `recordIntro`) FSRS를 먹이지 않는다. 그래도 로그에 남긴다.
 * 안 남기면 다른 기기에서 그 낱말이 처음 보는 것으로 다시 나온다.
 */
export const RATING_INTRO = 0
export const RATING_AGAIN = 1
export const RATING_GOOD = 3
export type ReviewRating = typeof RATING_INTRO | typeof RATING_AGAIN | typeof RATING_GOOD

type Review = {
  device: string
  track: TrackId
  slug: string
  /** 기기 시계. FSRS 계산에 쓰이므로 진짜 답한 시각이어야 한다 */
  at: string
  rating: ReviewRating
  /** **답한 뒤의** 칸. 사다리 규칙은 덱마다 달라서(lib/progress.ts) 여기서 다시 세지 않는다 */
  rung: Rung
}

/* ── 기기 ────────────────────────────────────────────────────────── */

export const DEVICE_KEY = 'lingo.device'

/**
 * 이 기기의 이름. 기본키에 들어가 **밀어넣기를 멱등하게** 만든다 —
 * 네트워크가 끊겼다 붙어 같은 줄을 두 번 보내도 중복이 안 생긴다.
 */
function deviceId(): string {
  const stored = localStorage.getItem(DEVICE_KEY)
  if (stored) return stored
  const fresh = crypto.randomUUID()
  localStorage.setItem(DEVICE_KEY, fresh)
  return fresh
}

/* ── 아웃박스 ────────────────────────────────────────────────────── */

export const OUTBOX_KEY = 'lingo.outbox'
const cursorKey = (track: TrackId) => `lingo.cursor.${track}`

/** 아직 못 올린 줄. **localStorage에 둔다** — 못 올린 채로 닫아도 살아남아야 한다 */
function readOutbox(): Review[] {
  try {
    const raw = localStorage.getItem(OUTBOX_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as Review[]) : []
  } catch {
    return []
  }
}

/** 아직 못 올린 복습 수. 화면에 한 줄로 보여 준다 (components/sync-sheet.tsx) */
export function pendingCount(): number {
  if (typeof localStorage === 'undefined') return 0
  return readOutbox().length
}

function writeOutbox(rows: Review[]): void {
  try {
    localStorage.setItem(OUTBOX_KEY, JSON.stringify(rows))
  } catch {
    // 진도가 이미 한도를 채운 상황이다. 진도 저장이 먼저고 여기는 포기한다
  }
}

let timer: ReturnType<typeof setTimeout> | null = null

/** 카드마다 보내면 왕복이 카드 수만큼 난다. 잠깐 모았다 한 번에 보낸다 */
const FLUSH_DELAY = 3000

/**
 * 한 장 답했다. **저장이 아니라 적어 두기다** — 실제 전송은 뒤에서 한다.
 *
 * 부르는 쪽은 결과를 안 본다. 못 보내면 아웃박스에 남고 다음 기회에 같이 간다.
 */
export function logReview(review: Omit<Review, 'device'>): void {
  if (!db()) return
  writeOutbox([...readOutbox(), { ...review, device: deviceId() }])
  if (timer) return
  timer = setTimeout(() => {
    timer = null
    void flush()
  }, FLUSH_DELAY)
}

/**
 * 아웃박스를 비운다. 올린 만큼만 지운다.
 *
 * 보내는 동안 새 줄이 들어올 수 있으므로 **개수로 자른다** — 아웃박스는
 * 덧붙이기만 하므로 앞에서부터 보낸 만큼이 정확히 올라간 줄이다.
 */
export async function flush(): Promise<boolean> {
  const supabase = db()
  if (!supabase) return false

  const rows = readOutbox()
  if (rows.length === 0) return true

  const { data } = await supabase.auth.getSession()
  const userId = data.session?.user.id
  if (!userId) return false

  const { error } = await supabase
    .from('reviews')
    .upsert(
      rows.map((row) => ({ ...row, user_id: userId })),
      { onConflict: 'user_id,device,track,slug,at', ignoreDuplicates: true },
    )
  if (error) return false

  writeOutbox(readOutbox().slice(rows.length))
  return true
}

/* ── 당겨오기 ────────────────────────────────────────────────────── */

const scheduler = fsrs()

/** 한 번에 받아 올 줄 수 */
const PAGE = 1000

/** `.in()`은 주소 줄에 실려 간다. 너무 길면 서버가 거절한다 */
const SLUG_CHUNK = 200

export type Logged = { slug: string; at: string; rating: ReviewRating; rung: Rung }

/**
 * 카드 하나를 **처음부터 다시 만든다.**
 *
 * FSRS는 접기다 — 순서대로 먹이면 정확한 값이 나온다. rung은 접을 수 없다.
 * 사다리의 위아래 끝이 덱마다 다르고(lib/progress.ts) 그 규칙은 엔진에
 * 있어서, 여기서 다시 세면 두 곳에 같은 규칙이 생긴다. 대신 **마지막 줄의
 * 것을 쓴다** — rung은 가장 최근의 답이 정한 값이라 그게 맞다.
 */
export function replay(rows: Logged[]): CardState {
  let card = createEmptyCard(new Date(rows[0].at))
  let streak = 0

  for (const row of rows) {
    if (row.rating === RATING_INTRO) continue
    const correct = row.rating === RATING_GOOD
    card = scheduler.next(card, new Date(row.at), correct ? Rating.Good : Rating.Again).card
    streak = correct ? streak + 1 : 0
  }

  return { rung: rows[rows.length - 1].rung, streak, fsrs: storeCard(card) }
}

/** 받아 온 것. 재생한 카드와, 받아들이면 옮길 커서 */
export type Pulled = { cards: Record<string, CardState>; cursor: string }

/**
 * 남이 올린 것을 받아 재생한다. 바뀐 게 없으면 null.
 *
 * **내 기기가 올린 줄은 건너뛴다.** 그건 이미 로컬에 있고, 다시 받아 재생해도
 * 같은 값이 나올 뿐이다. 그래서 커서가 가리키는 것은 «내가 모르는 것»이다.
 *
 * 순서가 중요하다 — **먼저 밀어넣고 나서 당긴다.** 거꾸로 하면 아직 못 올린
 * 내 복습이 서버 로그에 없는 채로 재생돼 덮인다.
 *
 * **저장도 커서 이동도 하지 않는다.** 예전에는 여기서 커서를 옮기고 합친
 * 진도를 돌려줬는데, 받는 사이 피드가 카드를 넘기면 피드가 받기 전 진도로
 * 그것을 덮었다. 커서는 이미 지나가 있어서 덮인 카드를 다시는 안 받았다 —
 * 다른 기기의 복습이 이 기기에서만 조용히 빠졌다. 그래서 얹는 일은
 * `applyPulled`가, 커서를 옮길지는 부르는 쪽이 정한다.
 */
export async function pull(track: TrackId): Promise<Pulled | null> {
  const supabase = db()
  if (!supabase) return null

  const { data } = await supabase.auth.getSession()
  if (!data.session) return null

  const mine = deviceId()
  let cursor = localStorage.getItem(cursorKey(track)) ?? '1970-01-01T00:00:00Z'

  // 1) 내가 모르는 줄이 **어느 카드**를 건드렸는지만 알아낸다
  const touched = new Set<string>()
  for (;;) {
    const { data: fresh, error } = await supabase
      .from('reviews')
      .select('slug, inserted_at')
      .eq('track', track)
      .neq('device', mine)
      .gt('inserted_at', cursor)
      .order('inserted_at', { ascending: true })
      .limit(PAGE)
    if (error || !fresh || fresh.length === 0) break

    for (const row of fresh) touched.add(row.slug as string)
    cursor = fresh[fresh.length - 1].inserted_at as string
    if (fresh.length < PAGE) break
  }

  if (touched.size === 0) return null

  // 2) 그 카드들의 **전체** 이력을 기기 가리지 않고 받아 처음부터 재생한다.
  //    일부만 받아 이어 붙이면 내 기기에 없던 앞부분이 빠진다
  const slugs = [...touched]
  const history = new Map<string, Logged[]>()

  for (let at = 0; at < slugs.length; at += SLUG_CHUNK) {
    const { data: rows, error } = await supabase
      .from('reviews')
      .select('slug, at, rating, rung')
      .eq('track', track)
      .in('slug', slugs.slice(at, at + SLUG_CHUNK))
      .order('at', { ascending: true })
    // 한 덩이라도 못 받으면 커서를 옮기지 않는다. 다음에 통째로 다시 한다
    if (error || !rows) return null
    for (const row of rows as Logged[]) {
      const list = history.get(row.slug)
      if (list) list.push(row)
      else history.set(row.slug, [row])
    }
  }

  const cards: Record<string, CardState> = {}
  for (const [slug, rows] of history) if (rows.length > 0) cards[slug] = replay(rows)
  return { cards, cursor }
}

/**
 * 받아 온 카드를 진도에 얹는다.
 *
 * `before`는 받기 시작할 때의 카드 묶음이다. **그 사이 여기서 바뀐 카드는
 * 덮지 않는다** — 재생한 값에는 그 사이의 복습이 없다(아직 못 올렸다). 대신
 * `clean`이 false가 되고, 부르는 쪽은 커서를 옮기지 않는다. 다음에 같은 줄을
 * 다시 받는데, 그때는 그 복습도 올라가 있어 재생이 둘을 다 품는다.
 *
 * 바뀌었는지는 **참조로** 가린다. 엔진은 카드를 고칠 때마다 새 객체를 만들고
 * 안 고친 카드는 그대로 둔다 (lib/engine.ts).
 */
export function applyPulled(
  progress: Progress,
  pulled: Pulled,
  before: Record<string, CardState>,
): { progress: Progress; clean: boolean } {
  const cards = { ...progress.cards }
  let clean = true
  for (const [slug, card] of Object.entries(pulled.cards)) {
    if (progress.cards[slug] !== before[slug]) {
      clean = false
      continue
    }
    cards[slug] = card
  }
  return { progress: { ...progress, cards }, clean }
}

/** 받아 온 줄을 다 얹었을 때만 부른다. 다음에는 그 뒤부터 받는다 */
export function acceptCursor(track: TrackId, cursor: string): void {
  localStorage.setItem(cursorKey(track), cursor)
}

/**
 * 밀어넣고 당긴다. 한 번에 부르는 자리다.
 *
 * **피드는 마운트와 트랙 전환 때만 부른다.** 세션 중간에 진도가 바뀌면 보고
 * 있던 카드 뭉치가 어긋난다 — 피드는 진도를 보고 한 칸 앞까지만 카드를
 * 만든다 (components/feed.tsx의 `extendOne`).
 */
export async function syncNow(track: TrackId): Promise<Pulled | null> {
  await flush()
  return pull(track)
}

/* ── 로그인 ──────────────────────────────────────────────────────── */

/**
 * 6자리 코드를 메일로 보낸다.
 *
 * **`shouldCreateUser: false`가 핵심이다.** 목록에 없는 주소는 로그인 자체가
 * 시작되지 않는다. 서버에도 같은 규칙이 한 겹 더 있다
 * (supabase/migrations/…_reviews.sql의 `allowed_emails`).
 */
export async function sendCode(email: string): Promise<string | null> {
  const supabase = db()
  if (!supabase) return '동기화가 꺼져 있습니다'
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false },
  })
  return error ? error.message : null
}

/**
 * 6자리를 확인한다.
 *
 * **두 종류를 다 받는다.** 메일로 온 코드는 `email`로 통하는 것이 정상이고,
 * Admin API(`/auth/v1/admin/generate_link`)로 직접 뽑은 것은 `magiclink`다 —
 * 메일 발송이 막혔던 날 그 길로 첫 로그인을 했다. 상용에서 어느 쪽으로
 * 통과하는지는 확인하지 않았으므로 한쪽을 지우지 않는다. 사람이 보기에 둘 다
 * 그냥 여섯 자리라, 어느 쪽인지 묻지 않고 차례로 대 본다.
 */
export async function verifyCode(email: string, token: string): Promise<string | null> {
  const supabase = db()
  if (!supabase) return '동기화가 꺼져 있습니다'

  const first = await supabase.auth.verifyOtp({ email, token, type: 'email' })
  if (!first.error) return null

  const second = await supabase.auth.verifyOtp({ email, token, type: 'magiclink' })
  // 둘 다 틀렸으면 첫 번째 말을 전한다. 그쪽이 사람이 쓴 경로다
  return second.error ? first.error.message : null
}

/** 로그인한 주소. 안 했으면 null */
export async function currentEmail(): Promise<string | null> {
  const supabase = db()
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session?.user.email ?? null
}

/**
 * 나간다. **아웃박스는 비우지 않는다** — 못 올린 복습이 남아 있을 수 있고,
 * 다시 들어오면 그대로 올라간다. 진도도 그대로 둔다. 로컬이 원본이다.
 */
export async function signOut(): Promise<void> {
  await db()?.auth.signOut()
}
