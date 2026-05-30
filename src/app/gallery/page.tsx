import Link from "next/link";
import { ArrowLeft, Camera, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { galleryCategories, safeguardingNotes } from "@/lib/club-content";
import { cn } from "@/lib/utils";

const placeholderItems = [
  {
    title: "Training photos",
    category: "Training",
    status: "Coming soon",
  },
  {
    title: "Grading days",
    category: "Gradings",
    status: "Coming soon",
  },
  {
    title: "Competition moments",
    category: "Competitions",
    status: "Coming soon",
  },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "text-base"
            )}
          >
            <ArrowLeft className="size-5" />
            Home
          </Link>
          <Link
            href="/staff/gallery"
            className={buttonVariants({ variant: "outline" })}
          >
            Staff tools
          </Link>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <Badge className="mb-5 w-fit bg-red-700 text-white hover:bg-red-700">
            Club gallery
          </Badge>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl">
                Training, gradings, competitions, and club events
              </h1>
              <p className="mt-5 max-w-3xl text-xl leading-8 text-zinc-700">
                The public gallery will show approved media only. Staff can upload
                photos and videos as drafts first, then publish once they have
                checked the content.
              </p>
            </div>
            <Card className="rounded-md border-zinc-300 bg-[#f8f7f4]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-black">
                  <ShieldCheck className="size-6 text-red-700" />
                  Safeguarding first
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-base leading-7 text-zinc-700">
                {safeguardingNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-red-700">
              Browse by category
            </p>
            <h2 className="mt-2 text-3xl font-black">What will appear here</h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-zinc-700">
            These sections are ready for real Supabase-backed media in the next
            implementation step.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {galleryCategories.map((category) => (
            <Card key={category.title} className="rounded-md border-zinc-300">
              <CardHeader>
                <CardTitle className="text-2xl font-black">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-base leading-7">
                  {category.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-4 md:grid-cols-3">
            {placeholderItems.map((item) => (
              <Card key={item.title} className="rounded-md border-zinc-300">
                <CardContent className="p-0">
                  <div className="flex aspect-[4/3] items-center justify-center rounded-t-md bg-zinc-950 text-white">
                    <Camera className="size-12 text-red-500" />
                  </div>
                  <div className="p-5">
                    <Badge variant="secondary" className="mb-3 text-sm">
                      {item.status}
                    </Badge>
                    <h3 className="text-xl font-black">{item.title}</h3>
                    <p className="mt-1 text-zinc-700">{item.category}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
