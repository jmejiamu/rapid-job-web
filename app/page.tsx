"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unknown error");
      setMessage({ type: "success", text: "You're on the waitlist — thanks!" });
      setEmail("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Server error";
      setMessage({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-12">
        <header className="mb-8 flex items-center gap-3 text-sm text-indigo-100">
          <div className="h-11 w-11 rounded-xl border border-white/10 bg-white/10 text-lg font-semibold text-white grid place-items-center">
            R
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">Rapid Job</h1>
            <p className="text-xs text-white/60">
              Small gigs. Fast pay. Work on your schedule.
            </p>
          </div>
        </header>

        <main className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-indigo-900/30 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">
              Beta waitlist
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Find local gigs in minutes — no resume needed
            </h2>
            <p className="mt-3 text-sm text-white/70">
              Post a quick job (cash or your choice) and get matches nearby.
              Great for chores, moving, dog walks, and more.
            </p>
            <p className="mt-3 text-sm text-white/70">
              Sign up to join the beta and get notified when Rapid Job launches
              on iOS and Android.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex w-full flex-col gap-3 sm:flex-row"
            >
              <div className="flex-1 rounded-2xl border border-white/15 bg-black/20 px-4 py-3">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-12 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-400 to-sky-500 px-8 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-60"
              >
                {loading ? "Joining…" : "Join"}
              </button>
            </form>

            {message && (
              <p
                className={`mt-4 text-sm ${
                  message.type === "success"
                    ? "text-emerald-300"
                    : "text-rose-300"
                }`}
              >
                {message.text}
              </p>
            )}

            <footer className="mt-10 flex flex-col gap-4 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/appstore-badge.svg"
                  alt="App Store"
                  width={120}
                  height={36}
                />
                <Image
                  src="/play-badge.svg"
                  alt="Google Play"
                  width={120}
                  height={36}
                />
              </div>
              <div className="rounded-full border border-white/10 px-4 py-2 text-white/80">
                • 5k+ workers
              </div>
            </footer>
          </section>

          <section className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-transparent to-transparent p-6">
              <p className="text-sm font-medium text-white">Highlights</p>
              <p className="text-xs text-white/60">
                Built for pros who want flexibility without sacrificing pay.
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/20 text-2xl">
                  ⚡
                </div>
                <div>
                  <p className="font-medium text-white">Quick matches</p>
                  <p className="text-xs text-white/60">
                    Get matched to nearby shifts that fit your skills.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-2xl">
                  💸
                </div>
                <div>
                  <p className="font-medium text-white">Fast pay</p>
                  <p className="text-xs text-white/60">
                    Receive payouts quickly after completing shifts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500/15 text-2xl">
                  🔒
                </div>
                <div>
                  <p className="font-medium text-white">Trusted partners</p>
                  <p className="text-xs text-white/60">
                    We vet clients so you can work with confidence.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
