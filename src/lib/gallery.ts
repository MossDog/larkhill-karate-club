import type { GalleryMedia, GalleryPost } from "@/lib/club-content";
import { isSupabaseConfigured } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/server";

type GalleryMediaRow = {
  alt: string;
  height: number | null;
  media_type: string;
  sort_order: number;
  storage_path: string;
  width: number | null;
};

type GalleryPostRow = {
  caption: string;
  gallery_media: GalleryMediaRow[];
  id: string;
  title: string;
};

export async function getUploadedGalleryPosts(): Promise<GalleryPost[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_posts")
    .select(
      "id,title,caption,gallery_media(alt,height,media_type,sort_order,storage_path,width)"
    )
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as GalleryPostRow[])
    .map((post) => {
      const media = post.gallery_media
        .sort((first, second) => first.sort_order - second.sort_order)
        .map((item): GalleryMedia | null => {
          const type = getMediaType(item.media_type);

          if (!type) {
            return null;
          }

          return {
            src: supabase.storage
              .from("gallery-media")
              .getPublicUrl(item.storage_path).data.publicUrl,
            alt: item.alt || post.title || post.caption || "Club gallery media",
            type,
            width: item.width ?? 1080,
            height: item.height ?? 1080,
          };
        })
        .filter((item): item is GalleryMedia => Boolean(item));

      return {
        id: post.id,
        caption: post.caption || post.title || "Club gallery post",
        media,
      };
    })
    .filter((post) => post.media.length > 0);
}

function getMediaType(value: string): "image" | "video" | null {
  if (value === "image" || value === "video") {
    return value;
  }

  return null;
}
