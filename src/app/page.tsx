import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  ChevronRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GalleryFeed } from "@/components/gallery-feed";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  classTimetable,
  clubContact,
  coaches,
  galleryPosts,
  karateDiscipline,
} from "@/lib/club-content";
import { getUploadedGalleryPosts } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const uploadedGalleryPosts = await getUploadedGalleryPosts();
  const visibleGalleryPosts =
    uploadedGalleryPosts.length > 0 ? uploadedGalleryPosts : galleryPosts;

  return (
    <main className="min-h-screen bg-[#f8f7f4] pb-24 text-zinc-950 md:pb-0">
      <nav className="fixed bottom-3 left-1/2 z-40 flex w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 items-center justify-around rounded-3xl border border-zinc-200 bg-white/95 px-3 py-2 text-sm font-bold text-zinc-700 shadow-lg backdrop-blur lg:bottom-auto lg:left-4 lg:top-1/2 lg:grid lg:w-max lg:max-w-none lg:-translate-x-0 lg:-translate-y-1/2 lg:grid-cols-1 lg:p-0">
        <Link className="rounded-t-3xl px-3 hover:bg-zinc-100 lg:w-full lg:px-4 lg:py-4 lg:text-center" href="#classes">
          Classes
        </Link>
        <Separator className="hidden w-8 lg:block lg:justify-self-center" />
        <Link className="px-3 hover:bg-zinc-100 lg:w-full lg:px-4 lg:py-4 lg:text-center" href="#gallery">
          Gallery
        </Link>
        <Separator className="hidden w-8 lg:block lg:justify-self-center" />
        <Link
          className="rounded-b-3xl px-3 hover:bg-zinc-100 lg:w-full lg:px-4 lg:py-4 lg:text-center"
          href="#contact"
        >
          Contact
        </Link>
      </nav>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
            <div className="flex justify-start">
              <Image
                src="/brand/logo.png"
                alt="Larkhill Karate Club"
                width={1000}
                height={1000}
                className="size-40 shrink-0 object-contain sm:size-52 md:size-64"
              />
            </div>
            <div className="flex flex-col justify-center">
              <Badge className="mb-5 w-fit bg-red-700 text-white hover:bg-red-700">
                {clubContact.locality}
              </Badge>
              <h1 className="text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
                Larkhill Karate Club
              </h1>
              <p className="mt-5 max-w-2xl text-xl leading-8 text-zinc-700">
                {karateDiscipline} karate classes for children, teens, and adults
                with a practical path through training, gradings, and competition.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#classes"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-red-700 text-white hover:bg-red-800"
                  )}
                >
                  View classes
                  <ChevronRight className="size-5" />
                </Link>
                <Link
                  href="#contact"
                  className={buttonVariants({ size: "lg", variant: "outline" })}
                >
                  Contact the club
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-red-700">
              Club coaches
            </p>
            <h2 className="mt-2 text-3xl font-black">Meet the team</h2>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach) => (
            <Card
              key={coach.name}
              className="overflow-hidden rounded-md border-zinc-300 pt-0 shadow-sm"
            >
              <div className="relative aspect-square bg-zinc-950">
                <Image
                  src={coach.image.src}
                  alt={coach.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-black">
                  {coach.name}
                </CardTitle>
                <CardDescription className="text-base text-zinc-700">
                  {coach.role} | {coach.classFocus}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="classes" className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-red-700">
              Class timetable
            </p>
            <h2 className="mt-2 text-3xl font-black">Train during the week</h2>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {classTimetable.map((item) => (
            <Card key={`${item.day}-${item.focus}`} className="overflow-hidden rounded-md pt-0 shadow-lg">
              <div className="relative aspect-[16/10] bg-zinc-950">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 text-white">
                  <p className="text-sm font-bold uppercase text-white/75">
                    {item.focus}
                  </p>
                  <p className="mt-1 text-2xl font-black">{item.day}</p>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="size-5 text-red-700" />
                  {item.day}
                </CardTitle>
                <CardDescription className="text-base text-zinc-700">
                  <span className="font-semibold">{item.focus}</span>
                  <span className="mx-2 text-zinc-400">|</span>
                  <span>
                    {item.coaches.length === 1 ? "Coach" : "Coaches"}{" "}
                    {item.coaches.join(" & ")}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {item.sessions.map((session) => (
                  <div
                    key={`${item.day}-${session.group}-${session.time}`}
                    className="rounded-md border border-zinc-200 px-4 py-3 text-base font-semibold"
                  >
                    <span className="block text-zinc-950">{session.group}</span>
                    {session.ages ? (
                      <span className="block text-sm text-zinc-600">
                        {session.ages}
                      </span>
                    ) : null}
                    <span className="mt-1 block text-red-700">{session.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="gallery" className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase text-red-700">
                Club gallery
              </p>
              <h2 className="mt-2 text-3xl font-black">Media from the club</h2>
            </div>
          </div>
          <GalleryFeed posts={visibleGalleryPosts} />
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-14">
        <Card className="rounded-md border-zinc-300">
          <CardHeader>
            <CardTitle className="text-3xl font-black">Start training</CardTitle>
            <CardDescription className="text-base">
              Contact details and enquiry handling will replace the incomplete
              information from the old website.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-lg">
              <p className="font-semibold">{clubContact.address}</p>
              <p className="text-zinc-700">{clubContact.email}</p>
            </div>
            <a
              href={`mailto:${clubContact.email}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-red-700 text-white hover:bg-red-800"
              )}
            >
              Email the club
            </a>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
