import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  ChevronRight,
  ExternalLink,
  Mail,
  MapPin,
  Medal,
  Phone,
  Ticket,
  Trophy,
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
} from "@/lib/club-content";
import { getUploadedGalleryPosts } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const uploadedGalleryPosts = await getUploadedGalleryPosts();

  return (
    <main className="min-h-screen bg-[#f8f7f4] pb-24 text-zinc-950 md:pb-0">
      {/** FLOATING NAV */}
      <nav className="fixed bottom-3 left-1/2 z-40 flex w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 items-center justify-around rounded-3xl border border-zinc-200 bg-white/95 px-3 py-2 text-sm font-bold text-zinc-700 shadow-lg backdrop-blur lg:bottom-auto lg:left-4 lg:top-1/2 lg:grid lg:w-max lg:max-w-none lg:-translate-x-0 lg:-translate-y-1/2 lg:grid-cols-1 lg:p-0">
        <Link className="rounded-t-3xl px-3 hover:bg-zinc-100 lg:w-full lg:px-4 lg:py-4 lg:text-center" href="#classes">
          Classes
        </Link>
        <Separator className="hidden w-8 lg:block lg:justify-self-center" />
        <Link className="px-3 hover:bg-zinc-100 lg:w-full lg:px-4 lg:py-4 lg:text-center" href="#gallery">
          Gallery
        </Link>
        <Separator className="hidden w-8 lg:block lg:justify-self-center" />
        <Link className="rounded-b-3xl px-3 hover:bg-zinc-100 lg:w-full lg:px-4 lg:py-4 lg:text-center" href="#contact">
          Contact
        </Link>
      </nav>

      {/** HERO SECTION */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
            <div className="mb-auto flex justify-start">
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
              <div className="mt-5 max-w-2xl space-y-5 text-xl leading-8 text-zinc-700">
                <p>
                  Larkhill Karate Club, member of the Irish Kenpo Karate Union, has been proudly established for 18
                  years, providing high-quality martial arts training in a
                  friendly, supportive, and inclusive environment.
                </p>
                <p>
                  We welcome members from 5 years through to adults, with
                  classes designed for different ages and experience levels.
                  Whether you&apos;re looking to improve fitness, build
                  confidence, learn self-defence, or compete, there&apos;s a
                  place for you at our club.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-red-700 text-white hover:bg-red-800"
                  )}
                >
                  Contact the club
                  <ChevronRight className="size-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/** COACHES SECTION */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-red-700">
              Club coaches
            </p>
            <h2 className="mt-2 text-3xl font-black">Meet the team</h2>
            <p className="text-lg leading-8 text-zinc-700">
              Training is led by three dedicated coaches, giving students
              guidance and support as they build confidence, develop
              technique, and progress through the Kenpo Karate system.
            </p>
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
      
      {/** CLASSES SECTION */}
      <section id="classes" className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-red-700">
              Class timetable
            </p>
            <h2 className="mt-2 text-3xl font-black">Train during the week</h2>
            <p className="text-lg leading-8 text-zinc-700">
              Classes are organised by age and training focus, helping students
              learn at the right pace.
            </p>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {classTimetable.map((item) => (
            <Card key={`${item.day}-${item.focus}`} className="overflow-hidden rounded-md pt-0">
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
      
      {/** PROGRESSION SECTION */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase text-red-700">
                Progression
              </p>
              <h2 className="mt-2 text-3xl font-black">
                Gradings, squads, and competition
              </h2>
              <p className="text-lg leading-8 text-zinc-700">
                Students can train recreationally, work towards gradings, or
                represent the club at home and national competitions. Competing
                is always optional, but the pathway is there for members who
                want to test themselves further.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-md border border-zinc-200 bg-[#f8f7f4] p-4">
                  <Trophy className="size-6 text-red-700" />
                  <p className="mt-3 font-bold text-zinc-950">
                    Club competition pathway
                  </p>
                  <p className="mt-2 text-zinc-700">
                    Members have access to Karate Ireland&apos;s National Junior
                    Championships, Senior Championships, and the Irish
                    International Open.
                  </p>
                </div>
                <div className="rounded-md border border-zinc-200 bg-[#f8f7f4] p-4">
                  <Medal className="size-6 text-red-700" />
                  <p className="mt-3 font-bold text-zinc-950">
                    National squad opportunities
                  </p>
                  <p className="mt-2 text-zinc-700">
                    Athletes can also access national squads, where they may
                    qualify to represent Ireland at WKF and EKF competitions.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 my-auto">
              <Card className="rounded-md border-zinc-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-black">
                    Irish Kenpo Karate Union
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-zinc-700">
                    The Irish Kenpo Karate Union supports squad members on the
                    national team pathway and runs gradings throughout the year,
                    giving members a clear route through the Kenpo Karate
                    system.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://www.ikku.ie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-center sm:w-auto"
                    )}
                  >
                    Visit IKKU
                    <ExternalLink className="size-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="rounded-md border-zinc-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-black">
                    Karate Ireland
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-zinc-700">
                    Karate Ireland, also known as O.N.A.K.A.I., is the National
                    Governing Body for karate in Ireland and is recognised by
                    the World Karate Federation and European Karate Federation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://www.karate-ireland.ie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-center sm:w-auto"
                    )}
                  >
                    Visit Karate Ireland
                    <ExternalLink className="size-4" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/** GALLERY SECTION */}
      <section id="gallery" className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase text-red-700">
                Club gallery
              </p>
              <h2 className="mt-2 text-3xl font-black">Media from the club</h2>
            </div>
          </div>
          <GalleryFeed posts={uploadedGalleryPosts} />
        </div>
      </section>

      {/** CONTACT SECTION */}
      <section id="contact" className="px-5 py-14 bg-white">
        <Card className="mx-auto max-w-6xl rounded-md border-zinc-300">
          <CardHeader>
            <CardTitle className="text-3xl font-black">Start training</CardTitle>
            <CardDescription className="text-base">
              Contact the club with any questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-zinc-200 bg-[#f8f7f4] p-4">
                <Mail className="size-5 text-red-700" />
                <p className="mt-3 text-sm font-bold uppercase text-zinc-500">
                  Email
                </p>
                <a
                  href={`mailto:${clubContact.email}`}
                  className="mt-1 block wrap-break-word text-lg font-bold text-zinc-950 hover:text-red-700"
                >
                  {clubContact.email}
                </a>
              </div>
              <div className="rounded-md border border-zinc-200 bg-[#f8f7f4] p-4">
                <Phone className="size-5 text-red-700" />
                <p className="mt-3 text-sm font-bold uppercase text-zinc-500">
                  Phone
                </p>
                <a
                  href={`tel:${clubContact.phone}`}
                  className="mt-1 block text-lg font-bold text-zinc-950 hover:text-red-700"
                >
                  {clubContact.phone}
                </a>
              </div>
              <div className="rounded-md border border-zinc-200 bg-[#f8f7f4] p-4 sm:col-span-2">
                <MapPin className="size-5 text-red-700" />
                <p className="mt-3 text-sm font-bold uppercase text-zinc-500">
                  Location
                </p>
                <p className="mt-1 text-lg font-bold text-zinc-950">
                  {clubContact.address}
                </p>
                <p className="mt-2 text-zinc-700">{clubContact.parking}</p>
              </div>
            </div>

            <div className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-md ">
                  <Ticket className="size-10 stroke-1 text-red-700" />
                </span>
                <div>
                  <p className="text-xl font-black">First two classes free</p>
                  <p className="mt-2 text-zinc-700">
                    New students can come along for two trial classes before
                    deciding whether to join.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <a
                  href={`mailto:${clubContact.email}`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-red-700 text-white hover:bg-red-800"
                  )}
                >
                  <Mail className="size-5" />
                  Email the club
                </a>
                <a
                  href={clubContact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "justify-center"
                  )}
                >
                  <MapPin className="size-5" />
                  Open in Google Maps
                </a>
                <a
                  href={clubContact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "justify-center"
                  )}
                >
                  <ExternalLink className="size-5" />
                  Facebook
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-zinc-200 bg-white py-3">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-zinc-600 items-center">
          <p>&copy; 2026 Larkhill Karate Club</p>
          <a href="https://github.com/MossDog" target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 hover:text-red-700">
            Website by Luke Hughes
            <ExternalLink className="size-3" />
          </a>
        </div>
      </footer>
    </main>
  );
}
