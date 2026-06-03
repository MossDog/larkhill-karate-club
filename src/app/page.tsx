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
import {
  classTimetable,
  clubContact,
  galleryPosts,
  karateDiscipline,
} from "@/lib/club-content";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] pb-20 text-zinc-950 md:pb-0">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-5 py-4">
          <nav className="hidden items-center gap-1 rounded-full border border-zinc-200 bg-white/95 px-3 py-2 text-sm font-bold text-zinc-700 shadow-sm backdrop-blur md:flex">
            <Link className="rounded-full px-4 py-2 hover:bg-zinc-100" href="#classes">
              Classes
            </Link>
            <Link className="rounded-full px-4 py-2 hover:bg-zinc-100" href="#gallery">
              Gallery
            </Link>
            <Link className="rounded-full px-4 py-2 hover:bg-zinc-100" href="#contact">
              Contact
            </Link>
            <Link
              className="rounded-full px-4 py-2 hover:bg-zinc-100"
              href="/staff/gallery"
            >
              Staff
            </Link>
          </nav>
        </div>
      </header>
      <nav className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-full border border-zinc-200 bg-white/95 px-3 py-2 text-sm font-bold text-zinc-700 shadow-lg backdrop-blur md:hidden">
        <Link href="#classes">Classes</Link>
        <Link href="#gallery">Gallery</Link>
        <Link href="#contact">Contact</Link>
        <Link href="/staff/gallery">Staff</Link>
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

      <section id="classes" className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-red-700">
              Class timetable
            </p>
            <h2 className="mt-2 text-3xl font-black">Train during the week</h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-zinc-700">
            Tuesday kata and Thursday kumite classes, led by named coaches across
            age-appropriate groups.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {classTimetable.map((item) => (
            <Card key={`${item.day}-${item.focus}`} className="overflow-hidden rounded-md">
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
            <p className="max-w-xl text-lg leading-8 text-zinc-700">
              A simple scrolling feed for photos and videos uploaded by staff.
            </p>
          </div>
          <GalleryFeed posts={galleryPosts} />
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
