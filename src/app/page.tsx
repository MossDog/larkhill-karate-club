import Link from "next/link";
import {
  CalendarDays,
  Camera,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { classTimetable, clubContact, galleryCategories } from "@/lib/club-content";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-md bg-red-700 text-lg font-black text-white">
              LK
            </span>
            <span>
              <span className="block text-lg font-bold leading-5">
                Larkhill Karate Club
              </span>
              <span className="text-sm text-zinc-600">Shotokan in Santry</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 md:flex">
            <Link href="#classes">Classes</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="#contact">Contact</Link>
            <Link href="/staff/gallery">Staff</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <div className="flex flex-col justify-center">
            <Badge className="mb-5 w-fit bg-red-700 text-white hover:bg-red-700">
              {clubContact.locality}
            </Badge>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
              Larkhill Karate Club
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-zinc-700">
              Shotokan karate classes for children, teens, and adults with a
              practical path through training, gradings, and competition.
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

          <div className="grid min-h-[360px] grid-cols-2 gap-3">
            <div className="rounded-md bg-zinc-950 p-5 text-white">
              <ShieldCheck className="mb-10 size-8 text-red-500" />
              <p className="text-2xl font-bold leading-8">
                Traditional standards, welcoming classes.
              </p>
            </div>
            <div className="rounded-md bg-red-700 p-5 text-white">
              <Trophy className="mb-10 size-8" />
              <p className="text-2xl font-bold leading-8">
                Training for gradings and competitions.
              </p>
            </div>
            <div className="rounded-md bg-emerald-700 p-5 text-white">
              <Users className="mb-10 size-8" />
              <p className="text-2xl font-bold leading-8">
                Clear groups for kids, teens, and adults.
              </p>
            </div>
            <div className="rounded-md border border-zinc-200 bg-[#f8f7f4] p-5">
              <MapPin className="mb-10 size-8 text-red-700" />
              <p className="text-2xl font-bold leading-8 text-zinc-950">
                Based in Larkhill, Santry.
              </p>
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
            Kata, kumite, and grading preparation across age-appropriate groups.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {classTimetable.map((item) => (
            <Card key={`${item.day}-${item.focus}`} className="rounded-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="size-5 text-red-700" />
                  {item.day}
                </CardTitle>
                <CardDescription className="text-base font-semibold text-zinc-700">
                  {item.focus}
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
              <h2 className="mt-2 text-3xl font-black">Moments from the mat</h2>
            </div>
            <Link
              href="/gallery"
              className={buttonVariants({ variant: "outline" })}
            >
              Open gallery
              <Camera className="size-5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryCategories.map((category) => (
              <div
                key={category.title}
                className="flex aspect-[4/3] flex-col justify-end rounded-md bg-zinc-950 p-4 text-white"
              >
                <p className="text-xl font-bold">{category.title}</p>
                <p className="mt-2 text-sm text-zinc-300">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
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
