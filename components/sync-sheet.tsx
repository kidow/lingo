'use client'

import { Dialog } from '@base-ui/react/dialog'
import { Cloud, CloudOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { currentEmail, pendingCount, sendCode, signOut, verifyCode, SYNC_ON } from '@/lib/sync'

/**
 * 로그인하는 자리. (docs/progress-sync.md)
 *
 * **이 앱의 유일한 로그인이고, 없어도 돌아간다.** 진도는 localStorage가
 * 원본이라(lib/progress.ts) 여기를 한 번도 안 열어도 학습은 똑같다. 로그인은
 * 그 진도를 **기기 사이에 잇는** 일만 한다.
 *
 * 링크가 아니라 6자리 코드다. 정적 내보내기라 콜백 라우트를 만들 수 없고
 * (next.config.ts), 노트북에서 로그인하며 메일은 폰으로 열어도 된다 — 기기
 * 동기화가 목적이니 이쪽이 맞다.
 */
export function SyncSheet() {
  const [email, setEmail] = useState<string | null>(null)
  const [pending, setPending] = useState(0)

  // 세션은 비동기로만 읽힌다. 프리렌더에는 아예 없다
  useEffect(() => {
    void currentEmail().then(setEmail)
    setPending(pendingCount())
  }, [])

  // 환경변수가 비면 자리째 뺀다. 눌러도 할 수 있는 것이 없다 (lib/sync.ts)
  if (!SYNC_ON) return null

  const on = email !== null

  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label={on ? `진도 동기화 켜짐 — ${email}` : '진도 동기화 꺼짐'}
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
          className="
            fixed left-1/2 top-1/2 w-[min(22rem,calc(100vw-2rem))]
            -translate-x-1/2 -translate-y-1/2
            rounded-ctrl border border-line bg-surface p-5
          "
        >
          <Dialog.Title className="text-base font-semibold">진도 동기화</Dialog.Title>

          {on ? (
            <SignedIn email={email} pending={pending} onOut={() => setEmail(null)} />
          ) : (
            <SignIn />
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function SignedIn({
  email,
  pending,
  onOut,
}: {
  email: string
  pending: number
  onOut: () => void
}) {
  return (
    <>
      <Dialog.Description className="mt-2 text-sm text-sub">
        <strong className="font-medium text-ink">{email}</strong>로 이어져 있습니다. 이 기기에서
        푼 것이 다른 기기에도 쌓입니다.
      </Dialog.Description>

      {pending > 0 && (
        // 못 올린 것이 있다고 겁줄 자리가 아니다. 다음 기회에 같이 올라간다
        <p className="mt-2 text-[13px] text-sub">아직 못 올린 복습 {pending}개 — 곧 올라갑니다.</p>
      )}

      <div className="mt-4 flex justify-end gap-2">
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

function SignIn() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit() {
    setBusy(true)
    setError(null)

    if (!sent) {
      const failed = await sendCode(email.trim())
      setBusy(false)
      // 목록에 없는 주소는 여기서 끝난다. 서버에도 같은 규칙이 한 겹 더 있다
      if (failed) setError(failed)
      else setSent(true)
      return
    }

    const failed = await verifyCode(email.trim(), code.trim())
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
            maxLength={6}
            autoFocus
            value={code}
            onChange={(event) => setCode(event.target.value)}
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
