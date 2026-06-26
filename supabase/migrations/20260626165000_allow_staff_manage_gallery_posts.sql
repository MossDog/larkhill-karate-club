drop policy if exists "Approved staff can update their gallery posts" on public.gallery_posts;
drop policy if exists "Approved staff can delete their gallery posts" on public.gallery_posts;

create policy "Approved staff can update gallery posts"
  on public.gallery_posts
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  )
  with check (
    exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  );

create policy "Approved staff can delete gallery posts"
  on public.gallery_posts
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  );

drop policy if exists "Approved staff can update gallery media for their posts" on public.gallery_media;
drop policy if exists "Approved staff can delete gallery media for their posts" on public.gallery_media;

create policy "Approved staff can update gallery media"
  on public.gallery_media
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  )
  with check (
    exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  );

create policy "Approved staff can delete gallery media"
  on public.gallery_media
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  );

drop policy if exists "Approved staff can delete gallery media files" on storage.objects;

create policy "Approved staff can delete gallery media files"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'gallery-media'
    and exists (
      select 1
      from public.staff_accounts staff
      where staff.email = lower(auth.jwt() ->> 'email')
    )
  );
