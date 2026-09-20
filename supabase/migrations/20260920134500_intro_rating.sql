-- 소개 카드를 로그에 들인다. (lib/sync.ts, docs/progress-sync.md)
--
-- 첫 판에서 등급을 ts-fsrs의 둘(1 Again / 3 Good)로만 잡았는데, **엔진이 내는
-- 사건은 셋이다.** 소개 카드는 판정이 없다 — 넘기는 순간 학습으로 인정할 뿐이라
-- (lib/engine.ts의 `recordIntro`) FSRS를 먹이지 않는다.
--
-- 그래도 로그에 남겨야 한다. 안 남기면 다른 기기에서 그 낱말이 처음 보는
-- 것으로 다시 나온다. 그래서 0을 «등급 없음»으로 들인다 — 재생할 때 이 줄은
-- FSRS를 건너뛰고 rung만 옮긴다.

alter table public.reviews drop constraint reviews_rating_check;

alter table public.reviews
  add constraint reviews_rating_check check (rating in (0, 1, 3));

comment on column public.reviews.rating is
  '0 소개(등급 없음) / 1 Again / 3 Good — lib/sync.ts';

-- 첫 판의 주석이 «답한 시점의 칸»이라고 했는데 **답한 뒤의 칸**이다. 사다리의
-- 위아래 끝이 덱마다 달라(lib/progress.ts) 재생 쪽에서 다시 세지 않고, 가장
-- 최근 줄의 값을 그대로 집는다
comment on column public.reviews.rung is
  '답한 뒤의 칸. 0 소개 / 1 재인 / 2 문맥 / 3 철자 — lib/progress.ts';
