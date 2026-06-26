"use client";

import Image from "next/image";
import {
  CheckCircle2,
  GripVertical,
  ImagePlus,
  Loader2,
  Play,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBrowserSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

type QueuedFile = {
  file: File;
  id: string;
  previewUrl: string;
  type: "image" | "video";
};

type RecentPost = {
  id: string;
  title: string;
  caption: string;
  mediaCount: number;
  coverUrl: string | null;
  coverType: "image" | "video" | null;
};

export function StaffGalleryUploader() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [queuedFiles, setQueuedFiles] = useState<QueuedFile[]>([]);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queuedFilesRef = useRef<QueuedFile[]>([]);

  const canSave = queuedFiles.length > 0 && !isSaving && isSupabaseConfigured;
  const fileSummary = useMemo(() => {
    if (queuedFiles.length === 0) {
      return "No files selected yet";
    }

    return `${queuedFiles.length} ${
      queuedFiles.length === 1 ? "file" : "files"
    } queued as one gallery post`;
  }, [queuedFiles.length]);

  useEffect(() => {
    queuedFilesRef.current = queuedFiles;
  }, [queuedFiles]);

  useEffect(() => {
    return () => {
      queuedFilesRef.current.forEach((item) =>
        URL.revokeObjectURL(item.previewUrl)
      );
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    async function loadRecentPosts() {
      setIsLoadingPosts(true);
      setError(null);

      const supabase = createBrowserSupabaseClient();
      const { data, error: postsError } = await supabase
        .from("gallery_posts")
        .select(
          "id,title,caption,gallery_media(id,storage_path,media_type,sort_order)"
        )
        .order("created_at", { ascending: false })
        .limit(5);

      if (postsError) {
        setError(postsError.message);
        setIsLoadingPosts(false);
        return;
      }

      const mappedPosts =
        data?.map((post) => {
          const media = [...post.gallery_media].sort(
            (first, second) => first.sort_order - second.sort_order
          );
          const cover = media[0];
          const coverUrl = cover
            ? supabase.storage
                .from("gallery-media")
                .getPublicUrl(cover.storage_path).data.publicUrl
            : null;

          return {
            id: post.id,
            title: post.title,
            caption: post.caption,
            mediaCount: media.length,
            coverUrl,
            coverType: getMediaType(cover?.media_type),
          };
        }) ?? [];

      setRecentPosts(mappedPosts);
      setIsLoadingPosts(false);
    }

    void loadRecentPosts();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    const nextFiles = files.map((file) => ({
      file,
      id: crypto.randomUUID(),
      previewUrl: URL.createObjectURL(file),
      type: file.type.startsWith("video/") ? "video" : "image",
    })) satisfies QueuedFile[];

    setQueuedFiles((currentFiles) => [...currentFiles, ...nextFiles]);
    event.target.value = "";
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (id: string) => {
    setQueuedFiles((currentFiles) => {
      const fileToRemove = currentFiles.find((item) => item.id === id);

      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }

      return currentFiles.filter((item) => item.id !== id);
    });
  };

  const resetForm = () => {
    queuedFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setQueuedFiles([]);
    setTitle("");
    setCaption("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!isSupabaseConfigured) {
      setError("Add Supabase environment variables before uploading media.");
      return;
    }

    if (queuedFiles.length === 0) {
      setError("Choose at least one photo or video before saving.");
      return;
    }

    setIsSaving(true);

    const supabase = createBrowserSupabaseClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      setError("Sign in as an approved staff member before uploading.");
      setIsSaving(false);
      return;
    }

    const { data: post, error: postError } = await supabase
      .from("gallery_posts")
      .insert({
        title: title.trim() || caption.trim() || "Gallery post",
        caption: caption.trim(),
        created_by: userData.user.id,
      })
      .select("id")
      .single();

    if (postError) {
      setError(postError.message);
      setIsSaving(false);
      return;
    }

    const mediaRows = [];

    for (const [index, item] of queuedFiles.entries()) {
      const extension = item.file.name.split(".").pop() ?? "upload";
      const storagePath = `${userData.user.id}/${post.id}/${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabase.storage
        .from("gallery-media")
        .upload(storagePath, item.file, {
          cacheControl: "3600",
          contentType: item.file.type,
        });

      if (uploadError) {
        setError(uploadError.message);
        setIsSaving(false);
        return;
      }

      mediaRows.push({
        post_id: post.id,
        storage_path: storagePath,
        media_type: item.type,
        alt: title.trim() || caption.trim() || "Larkhill Karate Club media",
        sort_order: index,
      });
    }

    const { error: mediaError } = await supabase
      .from("gallery_media")
      .insert(mediaRows);

    if (mediaError) {
      setError(mediaError.message);
      setIsSaving(false);
      return;
    }

    const coverUrl = supabase.storage
      .from("gallery-media")
      .getPublicUrl(mediaRows[0].storage_path).data.publicUrl;

    setRecentPosts((currentPosts) => [
      {
        id: post.id,
        title: title.trim() || caption.trim() || "Gallery post",
        caption: caption.trim(),
        mediaCount: queuedFiles.length,
        coverUrl,
        coverType: queuedFiles[0].type,
      },
      ...currentPosts,
    ]);
    setMessage("Gallery post saved.");
    resetForm();
    setIsSaving(false);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section>
        <Card className="rounded-md border-zinc-300">
          <CardHeader>
            <CardTitle className="text-4xl font-black leading-tight">
              New gallery post
            </CardTitle>
            <CardDescription className="text-lg leading-8">
              Add one caption with one or several photos and videos. The first
              item becomes the cover shown in the public gallery feed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="sr-only"
                onChange={handleFileChange}
              />

              {!isSupabaseConfigured ? (
                <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-amber-950">
                  Add Supabase environment variables before uploads can be
                  saved.
                </div>
              ) : null}

              {message ? (
                <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-emerald-950">
                  {message}
                </div>
              ) : null}

              {error ? (
                <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-950">
                  {error}
                </div>
              ) : null}

              <div className="rounded-md border-2 border-dashed border-zinc-400 bg-white p-6">
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex size-16 items-center justify-center rounded-md bg-red-700 text-white">
                      <ImagePlus className="size-9" />
                    </span>
                    <div>
                      <p className="text-2xl font-black">Upload media</p>
                      <p className="text-lg text-zinc-700">
                        Choose one file or several files for this post
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="lg"
                    onClick={openFilePicker}
                    className="bg-red-700 text-lg text-white hover:bg-red-800"
                  >
                    Choose files
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-lg font-black">Selected media</p>
                    <p className="text-zinc-700">{fileSummary}</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={openFilePicker}>
                    <Upload className="size-4" />
                    Add more
                  </Button>
                </div>
                {queuedFiles.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {queuedFiles.map((item, index) => (
                      <div
                        key={item.id}
                        className="overflow-hidden rounded-md border border-zinc-200 bg-white"
                      >
                        <div className="relative aspect-square bg-zinc-950">
                          <QueuedMediaPreview item={item} />
                          <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent p-2 text-white">
                            <span className="flex items-center gap-1.5 text-sm font-bold">
                              <GripVertical className="size-4" />
                              {index === 0 ? "Cover" : `Item ${index + 1}`}
                            </span>
                            <button
                              type="button"
                              className="flex size-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-white hover:text-zinc-950"
                              aria-label={`Remove item ${index + 1}`}
                              onClick={() => removeFile(item.id)}
                            >
                              <X className="size-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 px-3 py-2 text-sm font-semibold text-zinc-700">
                          <span>{item.type === "video" ? "Video" : "Photo"}</span>
                          <span className="truncate">{item.file.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border border-zinc-200 bg-white px-4 py-8 text-center text-zinc-600">
                    Selected photos and videos will appear here before saving.
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-title" className="text-lg font-bold">
                  Post title
                </Label>
                <Input
                  id="post-title"
                  className="h-14 text-lg"
                  placeholder="Squad training"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-caption" className="text-lg font-bold">
                  Caption
                </Label>
                <Textarea
                  id="post-caption"
                  className="min-h-32 text-lg"
                  placeholder="Optional caption for the whole post"
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="submit"
                  size="lg"
                  disabled={!canSave}
                  className="h-14 bg-red-700 text-lg hover:bg-red-800"
                >
                  {isSaving ? (
                    <Loader2 className="size-6 animate-spin" />
                  ) : (
                    <CheckCircle2 className="size-6" />
                  )}
                  Save to gallery
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      <aside className="space-y-4">
        <Card className="rounded-md border-zinc-300">
          <CardHeader>
            <CardTitle className="text-2xl font-black">Gallery items</CardTitle>
            <CardDescription className="text-base">
              Recent posts in the same grouped format used by the public feed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoadingPosts ? (
              <div className="rounded-md border border-zinc-200 bg-white px-4 py-8 text-center text-zinc-600">
                Loading gallery posts...
              </div>
            ) : null}

            {!isLoadingPosts && recentPosts.length === 0 ? (
              <div className="rounded-md border border-zinc-200 bg-white px-4 py-8 text-center text-zinc-600">
                Saved posts will appear here after Supabase is connected.
              </div>
            ) : null}

            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="overflow-hidden rounded-md border border-zinc-200 bg-white"
              >
                <div className="grid grid-cols-[5.5rem_1fr] gap-3 p-3">
                  <div className="relative aspect-square overflow-hidden rounded-md bg-zinc-950">
                    {post.coverUrl ? (
                      <RecentCover
                        src={post.coverUrl}
                        type={post.coverType ?? "image"}
                        alt={post.title}
                      />
                    ) : null}
                    {post.mediaCount > 1 ? (
                      <span className="absolute right-1.5 top-1.5 rounded-full bg-black/65 px-2 py-1 text-xs font-bold text-white">
                        1/{post.mediaCount}
                      </span>
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-black">{post.title}</p>
                    <p className="text-zinc-700">
                      {post.mediaCount} {post.mediaCount === 1 ? "item" : "items"}
                    </p>
                    <p className="mt-1 line-clamp-2 text-zinc-700">
                      {post.caption || "No caption"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 border-t border-zinc-100 p-3">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="size-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

function QueuedMediaPreview({ item }: { item: QueuedFile }) {
  if (item.type === "video") {
    return (
      <>
        <video
          src={item.previewUrl}
          className="size-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
        <Play className="absolute bottom-2 right-2 size-5 fill-white text-white drop-shadow" />
      </>
    );
  }

  return (
    <Image
      src={item.previewUrl}
      alt={item.file.name}
      fill
      sizes="(max-width: 1024px) 50vw, 20vw"
      className="object-cover"
      unoptimized
    />
  );
}

function RecentCover({
  alt,
  src,
  type,
}: {
  alt: string;
  src: string;
  type: "image" | "video";
}) {
  if (type === "video") {
    return (
      <>
        <video
          src={src}
          className="size-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
        <Play className="absolute bottom-2 right-2 size-4 fill-white text-white drop-shadow" />
      </>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="6rem"
      className="object-cover"
      unoptimized
    />
  );
}

function getMediaType(value: string | null | undefined): "image" | "video" | null {
  if (value === "image" || value === "video") {
    return value;
  }

  return null;
}
