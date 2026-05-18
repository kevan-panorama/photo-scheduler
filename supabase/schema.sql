create table if not exists photo_properties (
  id uuid primary key default gen_random_uuid(),

  created_at timestamp with time zone default now(),

  title text,
  address text,
  city text,

  shoot_date timestamp with time zone,

  photographer text,

  status text default 'scheduled'
);
