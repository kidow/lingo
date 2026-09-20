-- 진도 동기화. (spec.md §4 §11, docs/progress-sync.md)
--
-- **스냅샷이 아니라 일어난 일을 쌓는다.** 지금 진도(lib/progress.ts의
-- Progress)는 현재 상태다 — rung·streak·fsrs. 그것을 그대로 올리면 두 기기가
-- 갈라졌을 때 한쪽이 다른 쪽을 덮는다. 폰에서 20장, 노트북에서 30장을 보면
-- 20장이 사라진다. 지금보다 나쁘다 — 지금은 최소한 각 기기가 자기 것은 지킨다.
--
-- 로그를 쌓으면 병합이 합집합이 되고, 갈라진 카드만 시간순으로 재생하면
-- 잃는 복습이 없다. 카드 하나에 복습이 스무 번이면 재생도 스무 번이다.
--
-- 방향을 지금 정하는 이유는 **되돌릴 수 없어서**다. 로그에서 스냅샷은 뽑히지만
-- 스냅샷에서 로그는 못 뽑는다. 나중에 바꾸면 그때까지의 이력이 영영 없다.

create table public.reviews (
  user_id uuid not null references auth.users on delete cascade,

  -- 어느 기기가 적었나. **기본키에 들어간다.** 두 기기가 같은 순간 같은 카드를
  -- 답해도 충돌하지 않고, 덕분에 밀어넣기가 멱등해진다 — on conflict do nothing
  -- 이면 재시도가 공짜라 네트워크가 끊겼다 붙어도 중복이 안 생긴다
  device uuid not null,

  -- 트랙은 아홉이지만(lib/track.ts) 제약을 걸지 않는다. 트랙이 늘 때마다
  -- 마이그레이션을 쓰게 되고, 모르는 트랙이 들어와도 그 줄만 안 읽히면 그만이다
  track text not null,
  slug text not null,

  -- **기기 시계다.** FSRS 계산에 쓰이므로 실제로 답한 시각이어야 한다.
  -- 기기 사이에 어긋날 수 있고, 그래서 당겨올 커서로는 쓰지 않는다
  at timestamptz not null,

  -- 채점이 2진이라 ts-fsrs의 네 등급 중 둘만 쓴다 (spec.md §6)
  rating smallint not null check (rating in (1, 3)),  -- 1 Again / 3 Good

  -- 답한 시점의 칸. 0 소개 / 1 재인 / 2 문맥 / 3 철자 (lib/progress.ts)
  rung smallint not null check (rung between 0 and 3),

  -- **서버 시계다.** 당겨올 때의 커서 — 기기 시계로 커서를 잡으면 시계가 느린
  -- 기기가 올린 줄을 영영 못 본다
  inserted_at timestamptz not null default now(),

  primary key (user_id, device, track, slug, at)
);

-- 마지막으로 당긴 뒤에 생긴 줄만 가져온다
create index reviews_pull on public.reviews (user_id, inserted_at);

-- 카드 하나를 재생할 때. 기본키는 device가 앞에 있어 기기를 가로지르지 못한다
create index reviews_card on public.reviews (user_id, track, slug, at);

alter table public.reviews enable row level security;

-- 정적 내보내기라 서버가 없다 (next.config.ts). 브라우저가 DB에 직접 붙으므로
-- **막는 것은 RLS 하나뿐이다.** anon 키는 공개되는 값이고 그래도 되는 이유가 이것이다
create policy reviews_own on public.reviews
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

/* ── 가입 제한 ────────────────────────────────────────────────────────
 *
 * 지금은 한 사람만 쓴다. 로그인하지 않은 사람도 앱은 그대로 쓴다 —
 * localStorage만 쓰고 동기화만 없다 (docs/progress-sync.md).
 *
 * 막는 자리가 셋이다. 대시보드에서 공개 가입을 끄고, 클라이언트가
 * `shouldCreateUser: false`로 부르고, 아래 트리거가 마지막에 받는다.
 * 앞의 둘은 **사람이 되돌릴 수 있는 설정**이라 DB에도 한 겹 둔다.
 */

create table public.allowed_emails (email text primary key);
insert into public.allowed_emails (email) values ('wcgo2ling@gmail.com');

-- 아무도 못 읽는다. 정책이 하나도 없는 RLS 테이블은 전부 거부다 —
-- 아래 트리거만 security definer로 뚫고 본다
alter table public.allowed_emails enable row level security;

create or replace function public.reject_unlisted_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from public.allowed_emails where email = new.email) then
    raise exception 'signup not allowed: %', new.email;
  end if;
  return new;
end;
$$;

-- 앞의 두 겹이 정상이면 **이 트리거는 한 번도 안 걸린다.** 걸린다는 것은
-- 설정이 풀렸다는 뜻이다
create trigger reject_unlisted_signup
  before insert on auth.users
  for each row execute function public.reject_unlisted_signup();
