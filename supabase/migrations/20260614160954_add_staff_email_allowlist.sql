create table if not exists public.staff_accounts (
  email text primary key check (email = lower(email)),
  display_name text not null,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now()
);

alter table public.staff_accounts enable row level security;

insert into public.staff_accounts (email, display_name, role)
values
  ('lukejohnmosshughes@gmail.com', 'Luke', 'admin'),
  ('larkhilldojo@gmail.com', 'Larkhill Dojo', 'staff')
on conflict (email) do update
set display_name = excluded.display_name,
    role = excluded.role;

drop policy if exists "Staff can read staff profiles" on public.staff_profiles;

create policy "Approved staff can read staff accounts"
  on public.staff_accounts
  for select
  to authenticated
  using (
    email = lower(auth.jwt() ->> 'email')
  );

drop policy if exists "Staff can create gallery posts" on public.gallery_posts;
drop policy if exists "Staff can update their gallery posts" on public.gallery_posts;
drop policy if exists "Staff can delete their gallery posts" on public.gallery_posts;

create policy "Approved staff can create gallery posts"
  on public.gallery_posts
  for insert
  to authenticated
  with check (
    created_by = auth.uid()
    and exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  );

create policy "Approved staff can update their gallery posts"
  on public.gallery_posts
  for update
  to authenticated
  using (
    created_by = auth.uid()
    and exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  )
  with check (created_by = auth.uid());

create policy "Approved staff can delete their gallery posts"
  on public.gallery_posts
  for delete
  to authenticated
  using (
    created_by = auth.uid()
    and exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  );

drop policy if exists "Staff can create gallery media" on public.gallery_media;
drop policy if exists "Staff can update gallery media for their posts" on public.gallery_media;
drop policy if exists "Staff can delete gallery media for their posts" on public.gallery_media;

create policy "Approved staff can create gallery media"
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
    and exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  );

create policy "Approved staff can update gallery media for their posts"
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
    and exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  );

create policy "Approved staff can delete gallery media for their posts"
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
    and exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  );

drop policy if exists "Staff can upload gallery media" on storage.objects;
drop policy if exists "Staff can update gallery media files" on storage.objects;
drop policy if exists "Staff can delete gallery media files" on storage.objects;

create policy "Approved staff can upload gallery media"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'gallery-media'
    and exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  );

create policy "Approved staff can update gallery media files"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'gallery-media'
    and owner = auth.uid()
    and exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  )
  with check (
    bucket_id = 'gallery-media'
    and owner = auth.uid()
  );

create policy "Approved staff can delete gallery media files"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'gallery-media'
    and owner = auth.uid()
    and exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  );
