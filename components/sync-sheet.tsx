'use client'

import { Dialog } from '@base-ui/react/dialog'
import { ChevronDown, Cloud, CloudOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { loadTally } from '@/lib/corpus'
import { DECKS } from '@/lib/deck'
import { loadProgress } from '@/lib/progress'
import {
  currentEmail,
  flush,
  pendingCount,
  pullOthers,
  sendCode,
  signOut,
  summary,
  verifyCode,
  SYNC_ON,
} from '@/lib/sync'
import { countProgress, steady, type Shelf, type Steady, type Tally } from '@/lib/tally'
import { TRACK_IDS, trackOf, type TrackId } from '@/lib/track'

/**
 * 「내 진도」 — 로그인하면 여기서 어디까지 왔는지 본다. (docs/progress-sync.md)
 *
 * **이 앱의 유일한 로그인이고, 없어도 돌아간다.** 진도는 localStorage가
 * 원본이라(lib/progress.ts) 여기를 한 번도 안 열어도 학습은 똑같다. 로그인은
 * 그 진도를 **기기 사이에 잇는** 일을 하고, 이은 뒤에는 이 자리가 모든 기기를
 * 합친 진도를 보여 준다. 로그아웃 상태에서는 로그인 칸만 선다 — 로그인할 수
 * 있는 주소가 하나뿐이라(supabase/migrations/…_reviews.sql) 다른 방문자에게
 * 진도를 여기 세워도 찾아올 자리가 아니다. 자기 트랙의 %는 헤더에 있다.
 *
 * 링크가 아니라 6자리 코드다. 정적 내보내기라 콜백 라우트를 만들 수 없고
 * (next.config.ts), 노트북에서 로그인하며 메일은 폰으로 열어도 된다 — 기기
 * 동기화가 목적이니 이쪽이 맞다.
 */
export function SyncSheet({ track }: { track: TrackId }) {
  const [email, setEmail] = useState<string | null>(null)

  // 세션은 비동기로만 읽힌다. 프리렌더에는 아예 없다
  useEffect(() => {
    void currentEmail().then(setEmail)
  }, [])

  // 환경변수가 비면 자리째 뺀다. 눌러도 할 수 있는 것이 없다 (lib/sync.ts)
  if (!SYNC_ON) return null

  const on = email !== null

  return (
    <Dialog.Root>
      <Dialog.Trigger
        // 아이콘은 동기화 상태를 말하는 표지라 그대로 두고, 여는 자리의 이름만
        // 안에 든 것을 따른다
        aria-label={on ? '내 진도 — 동기화 켜짐' : '진도 동기화 꺼짐'}
        className="-m-2 rounded-ctrl p-2 text-sub"
      >
        {on ? (
          <Cloud className="size-5" aria-hidden />
        ) : (
          <CloudOff className="size-5" aria-hidden />
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/40" />
        <Dialog.Popup
          // 트랙을 펼치면 길어진다. 화면을 넘으면 창 안에서 굴린다
          className="
            fixed left-1/2 top-1/2 max-h-[85dvh] w-[min(22rem,calc(100vw-2rem))]
            -translate-x-1/2 -translate-y-1/2 overflow-y-auto
            rounded-ctrl border border-line bg-surface p-5
          "
        >
          {on ? (
            <MyProgress email={email} track={track} onOut={() => setEmail(null)} />
          ) : (
            <>
              <Dialog.Title className="text-base font-semibold">진도 동기화</Dialog.Title>
              <SignIn />
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/* ── 내 진도 ─────────────────────────────────────────────────────── */

type ShelfLine = { shelf: Shelf; seen: number; mastered: number; total: number | null }

type TrackLine = {
  track: TrackId
  current: boolean
  shelves: ShelfLine[]
  seen: number
  mastered: number
  /** 개수 파일을 못 받았으면 null — 분모가 없으니 막대도 없다 */
  total: number | null
}

type View = {
  lines: TrackLine[]
  /** 서버 요약을 못 받았으면 null. 트랙 목록은 이 기기 기준이 된다 */
  steady: Steady | null
  pending: number
}

/** 덱 순서 그대로, 한능검은 끝. 헤더의 덱 탭과 같은 순서다 */
const SHELVES: Shelf[] = [...DECKS.map((deck) => deck.id), 'hanja']
const SHELF_LABEL: Record<Shelf, string> = {
  ...(Object.fromEntries(DECKS.map((deck) => [deck.id, deck.label])) as Record<Exclude<Shelf, 'hanja'>, string>),
  hanja: '글자',
}

/** 오늘 날짜(`YYYY-MM-DD`). 서버에 넘기는 시간대와 같은 이 기기의 시간대다 */
const todayHere = () => new Date().toLocaleDateString('en-CA')

/**
 * 모달을 열 때마다 새로 센다.
 *
 * 순서가 있다 — 못 올린 복습을 먼저 올리고(그래야 서버 합계에 든다), 서버에
 * 기록이 있는 트랙을 물어 **지금 트랙을 뺀 나머지를 받아 온 뒤** 센다. 지금
 * 트랙은 피드가 쥐고 있어서 앱을 열 때 이미 받았다 (lib/sync.ts의 `pullOthers`).
 * 받아 온 뒤에 세야 폰에서 푼 HSK가 노트북 모달에도 나온다.
 */
async function load(track: TrackId): Promise<View> {
  const [tally, got] = await Promise.all([loadTally(), flush().then(() => summary())])
  const remote = (got?.tracks ?? []).filter((id): id is TrackId => TRACK_IDS.includes(id))
  if (got) await pullOthers(remote, track)
  return {
    lines: linesOf(tally, remote, track),
    steady: got ? steady(got.days, todayHere()) : null,
    pending: pendingCount(),
  }
}

/**
 * 시작한 트랙만 세운다. 서버에 기록이 있거나 이 기기에 진도가 있는 트랙이다 —
 * 폰에서만 해 본 트랙도 노트북에 나와야 하고, 로그인 전에 쌓은 진도도 이
 * 기기에는 있다. 지금 트랙이 맨 위, 나머지는 트랙 목록 순서다.
 */
function linesOf(tally: Tally | null, remote: TrackId[], current: TrackId): TrackLine[] {
  const phrases = new Set(tally?.phrases ?? [])
  const order = [current, ...TRACK_IDS.filter((id) => id !== current)]
  const lines: TrackLine[] = []

  for (const track of order) {
    const progress = loadProgress(track)
    if (Object.keys(progress.cards).length === 0 && !remote.includes(track)) continue

    const counts = countProgress(progress, phrases)
    const totals = tally?.totals[track]
    const shelves = SHELVES.flatMap((shelf): ShelfLine[] => {
      const total = totals ? (totals[shelf] ?? 0) : null
      const count = counts[shelf] ?? { seen: 0, mastered: 0 }
      if (!total && count.seen === 0) return []
      // 지금은 출제되지 않는 카드가 진도에 남아 분자가 분모를 넘을 수 있다
      // (lib/tally.ts의 `countProgress`). 전체로 자른다
      const cap = (value: number) => (total === null ? value : Math.min(value, total))
      return [{ shelf, seen: cap(count.seen), mastered: cap(count.mastered), total }]
    })

    lines.push({
      track,
      current: track === current,
      shelves,
      seen: shelves.reduce((sum, line) => sum + line.seen, 0),
      mastered: shelves.reduce((sum, line) => sum + line.mastered, 0),
      total: tally ? shelves.reduce((sum, line) => sum + (line.total ?? 0), 0) : null,
    })
  }
  return lines
}

function MyProgress({ email, track, onOut }: { email: string; track: TrackId; onOut: () => void }) {
  const [view, setView] = useState<View | null>(null)

  // 창이 닫히면 이 컴포넌트가 떼였다가 열 때 다시 붙는다. 그래서 여는 것이 곧 새로 세는 것이다
  useEffect(() => {
    let alive = true
    void load(track).then((next) => {
      if (alive) setView(next)
    })
    return () => {
      alive = false
    }
  }, [track])

  return (
    <>
      <Dialog.Title className="text-base font-semibold">내 진도</Dialog.Title>

      {!view ? (
        <Loading />
      ) : (
        <>
          <section className="mt-4" aria-labelledby="far-heading">
            <div className="flex items-baseline justify-between gap-2">
              <h3 id="far-heading" className="text-[13px] font-semibold text-sub">
                얼마나 멀리 왔나
              </h3>
              {/* 이 기준을 모르면 시작하고 몇 주간 "외움 0"만 보여 고장처럼 읽힌다 */}
              <span className="text-[11px] text-sub">외움 = 끝 단계에서 21일 넘게 기억</span>
            </div>
            {!view.steady && (
              <p className="mt-1 text-[12px] text-sub">서버에 닿지 못해 이 기기 기준입니다.</p>
            )}
            {view.lines.length === 0 ? (
              <p className="mt-2 text-sm text-sub">아직 시작한 트랙이 없습니다.</p>
            ) : (
              <ul className="mt-2">
                {view.lines.map((line) => (
                  <TrackRow key={line.track} line={line} />
                ))}
              </ul>
            )}
          </section>

          <section className="mt-5" aria-labelledby="steady-heading">
            <h3 id="steady-heading" className="text-[13px] font-semibold text-sub">
              꾸준함
            </h3>
            {view.steady ? (
              <SteadyView steady={view.steady} />
            ) : (
              <p className="mt-2 text-sm text-sub">연결되면 보입니다.</p>
            )}
          </section>
        </>
      )}

      {/*
        계정은 한 번 이으면 볼 일이 거의 없다. 로그아웃 곁에 둔다.
        못 올린 복습은 겁줄 자리가 아니다 — 다음 기회에 같이 올라간다.

        버튼과 한 줄에 두면 주소에 밀려 동기화 상태가 잘린다(352px에서
        "기기 …"). 줄을 따로 준다
      */}
      <p className="mt-5 border-t border-line pt-3 text-[12px] break-all text-sub">
        {email} · {view && view.pending > 0 ? `${view.pending}개 올리는 중` : '기기 사이 동기화 중'}
      </p>
      <div className="mt-2 flex justify-end gap-2">
        <Dialog.Close className="rounded-ctrl px-3 py-2 text-sm text-sub">닫기</Dialog.Close>
        <button
          type="button"
          onClick={() => {
            // 아웃박스도 진도도 그대로 둔다. 로컬이 원본이다 (lib/sync.ts)
            void signOut().then(onOut)
          }}
          className="rounded-ctrl border border-line px-3 py-2 text-sm"
        >
          로그아웃
        </button>
      </div>
    </>
  )
}

/**
 * 숫자가 다 모일 때까지 자리만 잡는다. 이 기기 숫자를 먼저 그렸다가 받아 온
 * 뒤 바꾸면 눈앞에서 숫자가 움직여 "방금 본 게 틀렸나" 싶다.
 */
function Loading() {
  return (
    <div className="mt-4 space-y-4" aria-busy="true" aria-label="진도를 세는 중">
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3.5 w-2/3 animate-pulse rounded bg-line" />
          <div className="h-1.5 animate-pulse rounded bg-line" />
        </div>
      ))}
    </div>
  )
}

const format = (value: number) => value.toLocaleString('ko-KR')

function Numbers({ line }: { line: { seen: number; mastered: number; total: number | null } }) {
  return (
    <span className="shrink-0 text-[12px] text-sub tabular-nums">
      외움 <b className="font-semibold text-ink">{format(line.mastered)}</b> · 본 {format(line.seen)}
      {line.total !== null && ` / ${format(line.total)}`}
    </span>
  )
}

/** 연한 칸은 본 것, 진한 칸은 외운 것. 숫자가 같은 말을 하므로 읽히지 않게 둔다 */
function Bar({ line, thin = false }: { line: { seen: number; mastered: number; total: number | null }; thin?: boolean }) {
  if (!line.total) return null
  const width = (value: number) => `${(value / line.total!) * 100}%`
  return (
    <div aria-hidden className={`relative mt-1.5 overflow-hidden rounded-full bg-line ${thin ? 'h-1' : 'h-1.5'}`}>
      <div className="absolute inset-y-0 left-0 rounded-full bg-sub/35" style={{ width: width(line.seen) }} />
      <div className="absolute inset-y-0 left-0 rounded-full bg-ink" style={{ width: width(line.mastered) }} />
    </div>
  )
}

/**
 * 트랙 한 줄. 칸이 둘 이상이면 눌러서 덱별로 편다 — 한능검은 덱이 없는
 * 트랙이라 펴지 않는다. 처음에는 다 닫혀 있다: 이 자리에서 먼저 알고 싶은
 * 것은 트랙끼리의 견줌이다.
 */
function TrackRow({ line }: { line: TrackLine }) {
  const [open, setOpen] = useState(false)
  const expandable = line.shelves.length > 1
  const name = (
    <span className="min-w-0 truncate font-semibold">
      {trackOf(line.track).label}
      {line.current && <span className="ml-1 text-[12px] font-normal text-sub">지금</span>}
      {line.track === 'hanja' && <span className="ml-1 text-[12px] font-normal text-sub">글자</span>}
    </span>
  )

  return (
    <li className="border-t border-line py-2.5 first:border-t-0 first:pt-0">
      {expandable ? (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="-mx-1 flex w-[calc(100%+0.5rem)] items-baseline justify-between gap-2 rounded-ctrl px-1 text-left text-sm"
        >
          <span className="flex min-w-0 items-baseline gap-1">
            {name}
            <ChevronDown
              aria-hidden
              className={`size-3.5 shrink-0 self-center text-sub transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </span>
          <Numbers line={line} />
        </button>
      ) : (
        <div className="flex items-baseline justify-between gap-2 text-sm">
          {name}
          <Numbers line={line} />
        </div>
      )}
      <Bar line={line} />

      {open && (
        <ul className="mt-2 space-y-2 pl-3">
          {line.shelves.map((shelf) => (
            <li key={shelf.shelf}>
              <div className="flex items-baseline justify-between gap-2 text-[13px]">
                <span>{SHELF_LABEL[shelf.shelf]}</span>
                <Numbers line={shelf} />
              </div>
              <Bar line={shelf} thin />
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

const WEEKDAY = '일월화수목금토'
const weekdayOf = (day: string) => WEEKDAY[new Date(`${day}T00:00:00Z`).getUTCDay()]

function SteadyView({ steady }: { steady: Steady }) {
  const peak = Math.max(...steady.week.map((day) => day.total), 1)
  return (
    <>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {/* 연속일이 아니다 — 스트릭은 spec.md §2가 뺐다 (lib/tally.ts의 `active`) */}
        <Stat value={`${steady.active}일`} label="최근 7일 중" />
        <Stat value={`${format(steady.today)}장`} label="오늘" />
        <Stat
          value={steady.accuracy === null ? '—' : `${Math.round(steady.accuracy * 100)}%`}
          label="최근 7일 정답률"
        />
      </div>

      {/* 빈 날도 바닥선을 남긴다. 어느 날이 비었는지가 곧 「7일 중 N일」의 풀이다 */}
      <div aria-hidden className="mt-3 flex gap-1.5">
        {steady.week.map((day, i) => {
          const today = i === steady.week.length - 1
          return (
            <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-12 w-full items-end">
                <div
                  className={`w-full rounded-[3px] ${day.total === 0 ? 'h-0.5 bg-line' : today ? 'bg-ink' : 'bg-sub/35'}`}
                  style={day.total === 0 ? undefined : { height: `${Math.max((day.total / peak) * 100, 8)}%` }}
                />
              </div>
              <span className={`text-[10px] ${today ? 'font-semibold text-ink' : 'text-sub'}`}>
                {today ? '오늘' : weekdayOf(day.day)}
              </span>
            </div>
          )
        })}
      </div>
      <p className="sr-only">
        최근 7일: {steady.week.map((day) => `${weekdayOf(day.day)} ${day.total}장`).join(', ')}
      </p>
    </>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-ctrl bg-bg px-2.5 py-2">
      <b className="block text-lg font-bold tabular-nums">{value}</b>
      <span className="text-[11px] text-sub">{label}</span>
    </div>
  )
}

/* ── 로그인 ──────────────────────────────────────────────────────── */

function SignIn() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * 확인이 나가 있는가. **상태가 아니라 ref다** — 여섯 자리가 차서 저절로
   * 나간 확인과 사람이 누른 Enter가 같은 틱에 겹치면 `busy`는 아직 false로
   * 읽혀 두 번 나간다. 두 번째가 이미 쓴 코드로 가서 오류를 띄운다
   */
  const inFlight = useRef(false)

  async function submit(token = code) {
    if (inFlight.current) return
    inFlight.current = true
    setBusy(true)
    setError(null)

    if (!sent) {
      const failed = await sendCode(email.trim())
      inFlight.current = false
      setBusy(false)
      // 목록에 없는 주소는 여기서 끝난다. 서버에도 같은 규칙이 한 겹 더 있다
      if (failed) setError(failed)
      else setSent(true)
      return
    }

    const failed = await verifyCode(email.trim(), token)
    inFlight.current = false
    setBusy(false)
    if (failed) {
      setError(failed)
      return
    }

    /*
     * ponytail: 로그인 직후 세션을 화면에 흘려 넣는 대신 통째로 다시 연다.
     * 진도를 읽는 자리가 여럿이고(피드·헤더·한자 껍데기) 저마다 마운트 때
     * 한 번 읽는 구조라, 한 기기에서 한 번 있는 일에 그 길을 다 뚫는 것보다
     * 새로고침이 정확하다. 자주 일어나면 그때 바꾼다
     */
    location.reload()
  }

  return (
    <>
      <Dialog.Description className="mt-2 text-sm text-sub">
        {sent
          ? '메일로 온 6자리를 넣으세요.'
          : '로그인하면 기기 사이에 진도가 이어집니다. 안 해도 학습은 그대로입니다.'}
      </Dialog.Description>

      <form
        className="mt-3 flex flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          void submit()
        }}
      >
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          // 코드를 기다리는 중에는 주소가 잠긴다. 바꾸면 그 코드는 못 쓴다
          readOnly={sent}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일"
          // iOS Safari는 16px보다 작은 입력 칸에 포커스가 가면 화면을 확대한다.
          // 확대 자체는 막지 않으므로(app/layout.tsx) 글자를 16px에 둔다 —
          // 찾기 칸과 같은 규칙이다 (components/search-sheet.tsx)
          className="rounded-ctrl border border-line bg-bg px-3 py-2 text-base read-only:text-sub"
        />

        {sent && (
          <input
            required
            // 숫자만 오는 칸이다. 폰에서 숫자판이 뜬다.
            //
            // `one-time-code`가 자동 입력의 열쇠다. iOS 17 이상의 Safari는 기본
            // Mail 앱에 도착한 코드를 키보드 위에 띄워 준다 — 받는 계정이 그 앱에
            // 등록돼 있어야 하고, Gmail 앱으로만 받으면 안 뜬다. Android 웹에는
            // 메일 코드를 채우는 길이 없다(WebOTP는 문자 전용)
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            autoFocus
            value={code}
            onChange={(event) => {
              // 숫자만 남긴다. 붙여넣기나 자동 입력이 "123 456"처럼 띄어 올 수
              // 있다 — 그래서 maxLength를 걸지 않는다. 걸면 브라우저가 공백째
              // 여섯 글자에서 잘라 "123 45"가 된다
              const next = event.target.value.replace(/\D/g, '').slice(0, 6)
              setCode(next)
              // 여섯 자리가 차면 바로 확인한다. 자동 입력이면 제안을 누르는 것으로
              // 로그인이 끝난다. 틀렸으면 오류가 뜨고, 고쳐서 다시 여섯이 되면 또 간다
              if (next.length === 6) void submit(next)
            }}
            placeholder="6자리"
            className="rounded-ctrl border border-line bg-bg px-3 py-2 text-base tracking-[0.3em]"
          />
        )}

        {error && (
          <p role="alert" className="text-[13px] text-err">
            {error}
          </p>
        )}

        <div className="mt-1 flex justify-end gap-2">
          <Dialog.Close className="rounded-ctrl px-3 py-2 text-sm text-sub">닫기</Dialog.Close>
          <button
            type="submit"
            disabled={busy}
            className="rounded-ctrl border border-line px-3 py-2 text-sm disabled:text-sub"
          >
            {busy ? '…' : sent ? '확인' : '코드 받기'}
          </button>
        </div>
      </form>
    </>
  )
}
