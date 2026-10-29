-- Hoop Versus: run this once in Supabase → SQL Editor.

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null check (username ~ '^[a-z0-9_]{3,16}$'),
  elo int not null default 1000,
  wins int not null default 0,
  losses int not null default 0,
  draws int not null default 0,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "profiles readable by all" on profiles for select using (true);
create policy "insert own profile" on profiles for insert with check (auth.uid() = id);

create table if not exists matches (
  id text primary key,
  quiz text,
  a uuid references profiles(id),
  b uuid references profiles(id),
  a_score int, b_score int,
  a_reported boolean default false,
  b_reported boolean default false,
  a_claim_b int, b_claim_a int,            -- what each side said the OTHER scored
  applied boolean default false,
  conflict boolean default false,
  a_elo_before int, b_elo_before int, a_elo_after int, b_elo_after int,
  created_at timestamptz default now()
);
alter table matches enable row level security;
create policy "matches readable by all" on matches for select using (true);

-- Both players call this with the same match id. Elo applies once both reports agree.
create or replace function report_match(p_match text, p_quiz text, p_opp uuid, p_my int, p_their int)
returns matches language plpgsql security definer as $$
declare
  uid uuid := auth.uid();
  ua uuid; ub uuid; m matches;
  ea int; eb int; expa float; sa float; k int := 32; da int; db int;
begin
  if uid is null then raise exception 'not signed in'; end if;
  if p_opp is null or p_opp = uid then raise exception 'bad opponent'; end if;
  if uid < p_opp then ua := uid; ub := p_opp; else ua := p_opp; ub := uid; end if;

  insert into matches(id, quiz, a, b) values (p_match, left(p_quiz, 80), ua, ub)
    on conflict (id) do nothing;
  select * into m from matches where id = p_match for update;
  if m.a <> ua or m.b <> ub then raise exception 'match belongs to other players'; end if;
  if m.applied then return m; end if;

  if uid = ua then
    update matches set a_score = p_my, a_claim_b = p_their, a_reported = true where id = p_match;
  else
    update matches set b_score = p_my, b_claim_a = p_their, b_reported = true where id = p_match;
  end if;
  select * into m from matches where id = p_match;

  if m.a_reported and m.b_reported then
    if m.a_score <> m.b_claim_a or m.b_score <> m.a_claim_b then
      update matches set conflict = true where id = p_match;
      select * into m from matches where id = p_match; return m;
    end if;
    select elo into ea from profiles where id = ua for update;
    select elo into eb from profiles where id = ub for update;
    expa := 1.0 / (1.0 + power(10.0, (eb - ea) / 400.0));
    sa := case when m.a_score > m.b_score then 1.0 when m.a_score < m.b_score then 0.0 else 0.5 end;
    da := round(k * (sa - expa));
    db := -da;
    update profiles set elo = elo + da,
      wins = wins + (case when sa = 1.0 then 1 else 0 end),
      losses = losses + (case when sa = 0.0 then 1 else 0 end),
      draws = draws + (case when sa = 0.5 then 1 else 0 end) where id = ua;
    update profiles set elo = elo + db,
      wins = wins + (case when sa = 0.0 then 1 else 0 end),
      losses = losses + (case when sa = 1.0 then 1 else 0 end),
      draws = draws + (case when sa = 0.5 then 1 else 0 end) where id = ub;
    update matches set applied = true, a_elo_before = ea, b_elo_before = eb,
      a_elo_after = ea + da, b_elo_after = eb + db where id = p_match;
    select * into m from matches where id = p_match;
  end if;
  return m;
end $$;
grant execute on function report_match(text, text, uuid, int, int) to authenticated;
