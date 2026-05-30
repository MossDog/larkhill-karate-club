import Link from "next/link";
import { ArrowLeft, CheckCircle2, Eye, ImagePlus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { galleryCategories } from "@/lib/club-content";
import { cn } from "@/lib/utils";

const drafts = [
  {
    title: "May grading",
    category: "Gradings",
    count: "18 photos",
    status: "Draft",
  },
  {
    title: "Saturday squad training",
    category: "Training",
    count: "9 photos",
    status: "Published",
  },
];

export default function StaffGalleryPage() {
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
            Public site
          </Link>
          <Badge className="bg-red-700 text-base text-white hover:bg-red-700">
            Staff
          </Badge>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <Card className="rounded-md border-zinc-300">
            <CardHeader>
              <CardTitle className="text-4xl font-black leading-tight">
                Gallery upload
              </CardTitle>
              <CardDescription className="text-lg leading-8">
                Add training, grading, competition, and event media for the
                public gallery.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border-2 border-dashed border-zinc-400 bg-white p-6">
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex size-16 items-center justify-center rounded-md bg-red-700 text-white">
                      <ImagePlus className="size-9" />
                    </span>
                    <div>
                      <p className="text-2xl font-black">Upload media</p>
                      <p className="text-lg text-zinc-700">Photos or short videos</p>
                    </div>
                  </div>
                  <Button size="lg" className="bg-red-700 text-lg hover:bg-red-800">
                    Choose files
                  </Button>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="event-name" className="text-lg font-bold">
                    Event name
                  </Label>
                  <Input
                    id="event-name"
                    className="h-14 text-lg"
                    placeholder="May grading"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-date" className="text-lg font-bold">
                    Date
                  </Label>
                  <Input id="event-date" type="date" className="h-14 text-lg" />
                </div>
                <div className="space-y-2">
                  <Label className="text-lg font-bold">Category</Label>
                  <Select>
                    <SelectTrigger className="h-14 text-lg">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {galleryCategories.map((category) => (
                        <SelectItem
                          key={category.title}
                          value={category.title.toLowerCase().replaceAll(" ", "-")}
                        >
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-lg font-bold">Visibility</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger className="h-14 text-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg font-bold">
                  Caption
                </Label>
                <Textarea
                  id="description"
                  className="min-h-32 text-lg"
                  placeholder="Short gallery caption"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-14 bg-red-700 text-lg hover:bg-red-800">
                  <CheckCircle2 className="size-6" />
                  Save gallery item
                </Button>
                <Button size="lg" variant="outline" className="h-14 text-lg">
                  <Eye className="size-6" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-4">
          <Card className="rounded-md border-zinc-300">
            <CardHeader>
              <CardTitle className="text-2xl font-black">Gallery items</CardTitle>
              <CardDescription className="text-base">
                Recent uploads will appear here after Supabase is connected.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {drafts.map((item) => (
                <div
                  key={item.title}
                  className="rounded-md border border-zinc-200 bg-white p-4"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-black">{item.title}</p>
                      <p className="text-zinc-700">
                        {item.category} - {item.count}
                      </p>
                    </div>
                    <Badge
                      variant={item.status === "Published" ? "default" : "secondary"}
                      className={
                        item.status === "Published"
                          ? "bg-emerald-700"
                          : "bg-zinc-200 text-zinc-900"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
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
    </main>
  );
}
