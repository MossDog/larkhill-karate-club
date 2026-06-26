import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { StaffLoginForm } from "@/components/staff-login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

type StaffLoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function StaffLoginPage({
  searchParams,
}: StaffLoginPageProps) {
  const params = await searchParams;
  const nextPath =
    params.next && params.next.startsWith("/") ? params.next : "/staff/gallery";
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const staffEmail = userData.user?.email?.toLowerCase();

  if (staffEmail) {
    const { data: staffAccount } = await supabase
      .from("staff_accounts")
      .select("email")
      .eq("email", staffEmail)
      .maybeSingle();

    if (staffAccount) {
      redirect(nextPath);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-5 py-8 text-zinc-950">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="/brand/logo.png"
            alt="Larkhill Karate Club"
            width={140}
            height={140}
            className="size-28 object-contain"
          />
        </div>
        <Card className="rounded-md border-zinc-300">
          <CardHeader>
            <CardTitle className="text-3xl font-black">Staff login</CardTitle>
            <CardDescription className="text-base">
              Sign in or create an account with an approved staff email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <StaffLoginForm nextPath={nextPath} />
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full text-zinc-700"
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
