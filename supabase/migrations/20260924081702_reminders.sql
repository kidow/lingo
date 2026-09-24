-- 매일 알림. (docs/progress-sync.md, supabase/functions/daily-reminder/index.ts)
--
-- **조르지 않는 알림이다.** spec.md §2는 스트릭·일일 목표를 뺐다 — 목표가
-- 없는 피드에 "오늘 안 하면"을 붙이면 조르는 물건이 된다. 그래서 세 가지를
-- 지킨다. 기본은 꺼져 있고 사람이 켠다. **오늘 이미 공부했으면 보내지 않는다.**
-- 문구에 숫자도 죄책감도 없다. 까먹지 않게 알려 주는 데서 멈춘다.
--
-- 기기마다 한 줄이다. 알림 주소(endpoint)가 기기·브라우저마다 다르다 —
-- 폰에서 켠다고 아이패드에서 켜지지 않는다.

create table public.push_subscriptions (
  -- 푸시 서비스가 준 주소. 기기마다 다르고 그 자체로 이름이 된다
  endpoint text primary key,
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  -- 받는 쪽 공개 키와 인증 비밀. 푸시 내용을 암호화하는 데 쓴다
  p256dh text not null,
  auth text not null,
  -- 이 기기 시간대의 몇 시에 받을지
  hour smallint not null check (hour between 0 and 23),
  tz text not null,
  -- 그 시간대의 날짜로 마지막으로 보낸 날. 한 시간마다 돌아도 하루 한 번이다
  last_sent_on date,
  created_at timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;

-- 브라우저가 자기 줄을 넣고 고치고 지운다. 남의 줄은 못 본다
create policy push_subscriptions_own on public.push_subscriptions
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

/**
 * 지금 보낼 차례인 구독. Edge Function이 한 시간마다 부른다.
 *
 * 셋이 다 맞아야 한다 — 그 기기 시간대로 **지금이 고른 시각**이고, 오늘 아직
 * **안 보냈고**, 그 사람이 오늘 **한 장도 안 넘겼다.** 마지막이 "조르지 않는다"의
 * 몸통이다: 공부한 날에는 알림이 오지 않는다.
 *
 * 시간대 이름이 틀린 줄은 건너뛴다. 하나가 `at time zone`에서 던지면 이 함수가
 * 통째로 실패해 모든 사람의 알림이 멈춘다.
 *
 * security definer다. 모든 사람의 구독을 봐야 하므로 RLS를 넘는다 — 그래서
 * service_role(Edge Function)만 부른다.
 */
create or replace function public.due_reminders()
returns table (endpoint text, p256dh text, auth text, local_day date)
language sql
stable
security definer
set search_path = public
as $$
  select s.endpoint, s.p256dh, s.auth, (now() at time zone s.tz)::date
  from public.push_subscriptions s
  where s.tz in (select name from pg_timezone_names)
    and extract(hour from now() at time zone s.tz) = s.hour
    and s.last_sent_on is distinct from (now() at time zone s.tz)::date
    and not exists (
      select 1
      from public.reviews r
      where r.user_id = s.user_id
        -- 그 시간대의 오늘 자정 이후. 날짜로 바꿔 비교하면 줄마다 계산해야 한다
        and r.at >= date_trunc('day', now() at time zone s.tz) at time zone s.tz
    )
$$;

revoke execute on function public.due_reminders() from public, anon, authenticated;
grant execute on function public.due_reminders() to service_role;
