-- 「내 진도」 모달의 재료. (components/sync-sheet.tsx, lib/sync.ts의 `summary`)
--
-- **날짜별 합계는 서버가 낸다.** 기록을 줄째 받아 기기에서 세면 하루 수백
-- 장씩 몇 달이면 수만 줄이다. 날짜 하나가 한 줄이 되면 1년을 받아도 수백 줄이다.
--
-- **날짜 경계는 기기의 시간대다.** 서버 시계(UTC)로 끊으면 서울에서 오전 9시
-- 전에 푼 것이 어제로 간다. 그래서 시간대 이름을 받는다(`Asia/Seoul`).
--
-- 기록이 있는 트랙도 같이 돌려준다. 모달은 이 기기에서 안 열어 본 트랙도
-- 줄로 세워야 한다 — 폰에서만 한 HSK가 노트북에도 나와야 한다.
--
-- **security invoker다.** 부른 사람의 권한으로 돌아서 RLS가 그대로 걸린다.
-- 그래도 `auth.uid()`로 한 번 더 거른다 — RLS를 누가 풀어도 남의 것이 안 섞인다.

create or replace function public.my_summary(tz text)
returns json
language sql
stable
security invoker
set search_path = public
as $$
  select json_build_object(
    'tracks', coalesce(
      (select json_agg(distinct track) from public.reviews where user_id = auth.uid()),
      '[]'::json
    ),
    'days', coalesce(
      (
        select json_agg(d order by d.day)
        from (
          select (at at time zone tz)::date as day,
                 count(*) as total,
                 count(*) filter (where rating = 3) as good,
                 count(*) filter (where rating = 1) as again
          from public.reviews
          where user_id = auth.uid()
          group by 1
        ) d
      ),
      '[]'::json
    )
  )
$$;

-- 로그인한 사람만 부른다. 기본값은 anon에게도 열려 있다 — 불러 봐야
-- auth.uid()가 비어 빈 결과지만, 쓰지 않는 문은 닫는다
revoke execute on function public.my_summary(text) from public, anon;
grant execute on function public.my_summary(text) to authenticated;
