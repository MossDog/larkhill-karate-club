"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { GalleryMedia, GalleryPost } from "@/lib/club-content";
import { cn } from "@/lib/utils";

type GalleryFeedProps = {
  posts: GalleryPost[];
};

export function GalleryFeed({ posts }: GalleryFeedProps) {
  const [activePostIndex, setActivePostIndex] = useState<number | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const hasPosts = posts.length > 0;

  const activePost =
    activePostIndex === null ? null : posts[activePostIndex] ?? null;
  const activeItem = activePost?.media[activeMediaIndex] ?? null;
  const activePostNumber = activePostIndex === null ? 0 : activePostIndex + 1;

  const openPost = (index: number) => {
    setActivePostIndex(index);
    setActiveMediaIndex(0);
  };

  const close = useCallback(() => setActivePostIndex(null), []);
  const showPrevious = useCallback(() => {
    setActivePostIndex((currentPostIndex) => {
      if (currentPostIndex === null) {
        return currentPostIndex;
      }

      const currentPost = posts[currentPostIndex];

      if (activeMediaIndex > 0) {
        setActiveMediaIndex(activeMediaIndex - 1);
        return currentPostIndex;
      }

      const previousPostIndex =
        (currentPostIndex - 1 + posts.length) % posts.length;
      const previousPost = posts[previousPostIndex];

      setActiveMediaIndex(
        previousPost ? previousPost.media.length - 1 : currentPost.media.length - 1
      );

      return previousPostIndex;
    });
  }, [activeMediaIndex, posts]);
  const showNext = useCallback(() => {
    setActivePostIndex((currentPostIndex) => {
      if (currentPostIndex === null) {
        return currentPostIndex;
      }

      const currentPost = posts[currentPostIndex];
      const nextMediaIndex = activeMediaIndex + 1;

      if (nextMediaIndex < currentPost.media.length) {
        setActiveMediaIndex(nextMediaIndex);
        return currentPostIndex;
      }

      setActiveMediaIndex(0);
      return (currentPostIndex + 1) % posts.length;
    });
  }, [activeMediaIndex, posts]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) {
      return;
    }

    if (deltaX > 0) {
      showPrevious();
      return;
    }

    showNext();
  };

  useEffect(() => {
    if (activePostIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePostIndex, close, showNext, showPrevious]);

  return (
    <>
      <div className="max-h-[560px] overflow-y-auto rounded-md border border-zinc-200 bg-white p-2 sm:p-3">
        {hasPosts ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {posts.map((post, index) => {
              const cover = post.media[0];
              const isGrouped = post.media.length > 1;

              return (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => openPost(index)}
                  className="group relative aspect-square overflow-hidden rounded-md bg-zinc-950 text-left shadow-sm ring-1 ring-zinc-200 transition hover:opacity-95 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                  aria-label={`Open ${post.caption}`}
                >
                  <MediaThumbnail item={cover} />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
                    <span className="flex items-end justify-between gap-2">
                      <span className="text-sm font-bold">{post.caption}</span>
                      {cover.type === "video" ? (
                        <Play className="size-4 shrink-0 fill-white opacity-90" />
                      ) : null}
                    </span>
                    {isGrouped ? (
                      <span className="mt-2 flex items-center gap-1.5">
                        {post.media.map((item, mediaIndex) => (
                          <span
                            key={item.src}
                            className={cn(
                              "size-1.5 rounded-full bg-white/45",
                              mediaIndex === 0 ? "w-4 bg-white" : ""
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-56 items-center justify-center rounded-md border border-dashed border-zinc-300 bg-white px-6 text-center">
            <p className="max-w-sm text-base font-semibold text-zinc-600">
              Gallery posts will appear here once media has been uploaded.
            </p>
          </div>
        )}
      </div>

      {activePost && activeItem ? (
        <div
          className="fixed inset-0 z-50 flex bg-black text-white"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery media viewer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 bg-gradient-to-b from-black/80 to-transparent p-4">
            <div>
              <p className="text-base font-bold">{activePost.caption}</p>
              <p className="text-sm text-white/70">
                Post {activePostNumber} of {posts.length}
              </p>
            </div>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={close}
              className="border-white/40 bg-black/40 text-white hover:bg-white hover:text-zinc-950"
              aria-label="Close gallery viewer"
            >
              <X className="size-5" />
            </Button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-20 sm:px-16">
            {activeItem.type === "video" ? (
              <video
                key={activeItem.src}
                src={activeItem.src}
                className="max-h-full max-w-full rounded-md"
                controls
                playsInline
                autoPlay
              />
            ) : (
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>

          {activePost.media.length > 1 ? (
            <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center">
              <div className="flex items-center gap-2 rounded-full bg-black/45 px-3 py-2 backdrop-blur">
                {activePost.media.map((item, index) => (
                  <span
                    key={item.src}
                    className={cn(
                      "size-2 rounded-full bg-white/35 transition",
                      index === activeMediaIndex ? "w-6 bg-white" : ""
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          ) : null}

          {posts.length > 1 ? (
            <>
              <ViewerNavButton
                label="Previous media"
                className="left-3 sm:left-5"
                onClick={showPrevious}
              >
                <ChevronLeft className="size-7" />
              </ViewerNavButton>
              <ViewerNavButton
                label="Next media"
                className="right-3 sm:right-5"
                onClick={showNext}
              >
                <ChevronRight className="size-7" />
              </ViewerNavButton>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

function MediaThumbnail({ item }: { item: GalleryMedia }) {
  if (item.type === "video") {
    return (
        <video
          src={item.src}
          className="size-full object-cover transition duration-300 group-hover:scale-105"
          muted
          playsInline
          preload="metadata"
      />
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes="(max-width: 640px) 50vw, 33vw"
      className="object-cover transition duration-300 group-hover:scale-105"
    />
  );
}

function ViewerNavButton({
  children,
  className,
  label,
  onClick,
}: {
  children: ReactNode;
  className: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white hover:text-zinc-950 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-14",
        className
      )}
    >
      {children}
    </button>
  );
}
