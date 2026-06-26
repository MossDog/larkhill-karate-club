"use client";

import { Loader2, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { isSupabaseConfigured } from "@/utils/supabase/env";

export function StaffLoginForm({ nextPath }: { nextPath: string }) {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSignUp = mode === "sign-up";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!isSupabaseConfigured) {
      setError("Supabase is not configured yet.");
      return;
    }

    setIsSigningIn(true);

    const supabase = createClient();
    const { data: authData, error: authError } = isSignUp
      ? await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/staff/login?next=${encodeURIComponent(nextPath)}`,
          },
        })
      : await supabase.auth.signInWithPassword({
          email,
          password,
        });

    if (authError) {
      setError(authError.message);
      setIsSigningIn(false);
      return;
    }

    if (isSignUp) {
      setMessage(
        "Account created. If Supabase asks for email confirmation, confirm it before signing in."
      );
      setMode("sign-in");
      setPassword("");
      setIsSigningIn(false);
      return;
    }

    if (!authData.session) {
      setError("Sign-in succeeded, but no browser session was created.");
      setIsSigningIn(false);
      return;
    }

    setMessage("Signed in. Opening the gallery...");
    window.location.assign(nextPath);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {!isSupabaseConfigured ? (
        <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          Add Supabase environment variables before staff login can work.
        </div>
      ) : null}

      {error ? (
        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-950">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
          {message}
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-2 rounded-md bg-zinc-100 p-1">
        <button
          type="button"
          onClick={() => setMode("sign-in")}
          className={`rounded-md px-3 py-2 text-sm font-bold transition ${
            !isSignUp ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("sign-up")}
          className={`rounded-md px-3 py-2 text-sm font-bold transition ${
            isSignUp ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"
          }`}
        >
          Create account
        </button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-bold">
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="approved@email.com"
          className="h-12 text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-base font-bold">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-12 text-base"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSigningIn || !isSupabaseConfigured}
        className="h-12 w-full bg-red-700 text-base text-white hover:bg-red-800"
      >
        {isSigningIn ? (
          <Loader2 className="size-5 animate-spin" />
        ) : isSignUp ? (
          <UserPlus className="size-5" />
        ) : (
          <LogIn className="size-5" />
        )}
        {isSignUp ? "Create account" : "Sign in"}
      </Button>
    </form>
  );
}
