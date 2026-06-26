create table if not exists public.staff_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  caption text not null default '',
  created_by uuid not null references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_media (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.gallery_posts (id) on delete cascade,
  storage_path text not null,
  media_type text not null check (media_type in ('image', 'video')),
  alt text not null default '',
  width integer,
  height integer,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists gallery_media_post_id_sort_order_idx
  on public.gallery_media (post_id, sort_order);

alter table public.staff_profiles enable row level security;
alter table public.gallery_posts enable row level security;
alter table public.gallery_media enable row level security;

create policy "Staff can read staff profiles"
  on public.staff_profiles
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.staff_profiles staff
      where staff.user_id = auth.uid()
    )
  );

create policy "Public can read gallery posts"
  on public.gallery_posts
  for select
  to anon, authenticated
  using (true);

create policy "Staff can create gallery posts"
  on public.gallery_posts
  for insert
  to authenticated
  with check (
    created_by = auth.uid()
    and exists (
      select 1
      from public.staff_profiles staff
      where staff.user_id = auth.uid()
    )
  );

create policy "Staff can update their gallery posts"
  on public.gallery_posts
  for update
  to authenticated
  using (
    created_by = auth.uid()
    and exists (
      select 1
      from public.staff_profiles staff
      where staff.user_id = auth.uid()
    )
  )
  with check (created_by = auth.uid());

create policy "Staff can delete their gallery posts"
  on public.gallery_posts
  for delete
  to authenticated
  using (
    created_by = auth.uid()
    and exists (
      select 1
      from public.staff_profiles staff
      where staff.user_id = auth.uid()
    )
  );

create policy "Public can read gallery media"
  on public.gallery_media
  for select
  to anon, authenticated
  using (true);

create policy "Staff can create gallery media"
  on public.gallery_media
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.gallery_posts post
      where post.id = post_id
        and post.created_by = auth.uid()
    )
  );

create policy "Staff can update gallery media for their posts"
  on public.gallery_media
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.gallery_posts post
      where post.id = post_id
        and post.created_by = auth.uid()
    )
  );

create policy "Staff can delete gallery media for their posts"
  on public.gallery_media
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.gallery_posts post
      where post.id = post_id
        and post.created_by = auth.uid()
    )
  );

insert into storage.buckets (id, name, public)
values ('gallery-media', 'gallery-media', true)
on conflict (id) do nothing;

create policy "Staff can upload gallery media"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'gallery-media'
    and exists (
      select 1
      from public.staff_profiles staff
      where staff.user_id = auth.uid()
    )
  );

create policy "Staff can update gallery media files"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'gallery-media'
    and owner = auth.uid()
  )
  with check (
    bucket_id = 'gallery-media'
    and owner = auth.uid()
  );

create policy "Staff can delete gallery media files"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'gallery-media'
    and owner = auth.uid()
  );

create policy "Public can view gallery media files"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'gallery-media');
