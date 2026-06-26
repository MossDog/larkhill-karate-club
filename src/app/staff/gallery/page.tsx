import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { StaffGalleryUploader } from "@/components/staff-gallery-uploader";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

export default async function StaffGalleryPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect("/staff/login?next=/staff/gallery");
  }

  const staffEmail = userData.user.email?.toLowerCase();

  if (!staffEmail) {
    redirect("/staff/login?next=/staff/gallery");
  }

  const { data: staffAccount } = await supabase
    .from("staff_accounts")
    .select("display_name,role")
    .eq("email", staffEmail)
    .maybeSingle();

  if (!staffAccount) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] px-5 py-8 text-zinc-950">
        <div className="mx-auto max-w-lg">
          <Card className="rounded-md border-zinc-300">
            <CardHeader>
              <CardTitle className="text-3xl font-black">
                Access not enabled
              </CardTitle>
              <CardDescription className="text-base">
                You are signed in, but this email has not been added as an
                approved staff account yet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full"
                )}
              >
                Return to public site
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

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
            {staffAccount.display_name}
          </Badge>
        </div>
      </header>

      <StaffGalleryUploader />
    </main>
  );
}
