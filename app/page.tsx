"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  // mount animation state
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="relative min-h-screen overflow-visible bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/18 blur-3xl" />
        <div className="absolute bottom-8 right-6 h-80 w-80 rounded-full bg-emerald-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-12">
        {/* ANNOUNCEMENT: Coming soon to El Salvador */}
        <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-200 self-start">
          <span className="text-xl leading-none">🇸🇻</span>
          <div className="flex flex-col leading-tight">
            <span className="font-medium text-amber-200">
              Coming soon to El Salvador
            </span>
            <span className="text-white/60 text-[11px]">
              Join the waitlist to be notified when we launch
            </span>
          </div>
        </div>

        {/* HEADER -> sticky navigation */}
        <header className="mb-8 sticky top-0 z-50 bg-gradient-to-b from-slate-900/40 to-transparent backdrop-blur-md">
          <nav className="flex items-center justify-between px-2 py-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-emerald-400 shadow-md grid place-items-center text-lg font-extrabold text-slate-900">
                R
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                  Rapid Job
                </h1>
                <p className="text-xs text-white/70">
                  Small gigs. Fast pay. No resume required.
                </p>
              </div>
            </div>

            {/* Desktop nav - adjusted to emphasize app download */}
            <div className="hidden sm:flex items-center gap-4 text-sm text-white/80">
              <a href="#" className="px-2 py-1 rounded hover:text-white">
                Home
              </a>
              <a href="#how" className="px-2 py-1 rounded hover:text-white">
                How it works
              </a>
              <a href="#about" className="px-2 py-1 rounded hover:text-white">
                About
              </a>
              <a href="#help" className="px-2 py-1 rounded hover:text-white">
                Help
              </a>
              <a
                href="#download"
                className="ml-2 rounded-full bg-emerald-400 px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm"
              >
                Get the app
              </a>
            </div>

            {/* Mobile menu placeholder */}
            <div className="sm:hidden">
              <button
                aria-label="Open menu"
                className="rounded-md bg-white/6 px-3 py-2 text-sm"
              >
                Menu
              </button>
            </div>
          </nav>
        </header>

        <main className="grid gap-6 sm:gap-8">
          {/* Left column (hero / waitlist) */}
          <section className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">
                  Beta waitlist
                </p>
                <h2
                  className={`mt-2 font-extrabold leading-tight text-white transition-all duration-700 ease-out
                    ${
                      mounted
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-6"
                    }
                    text-4xl sm:text-5xl md:text-6xl`}
                >
                  Find local help in minutes — post & hire without resumes
                </h2>

                {/* Updated hero copy: emphasize phone signup and chat */}
                <p className="mt-3 text-sm text-white/70">
                  Rapid Job is mobile-first — sign up quickly with your phone
                  number (no password), post or claim gigs from the app, and use
                  real-time in-app chat to ask questions and confirm details.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-white/90 shadow-sm">
                    ⚡ Quick matches
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-white/90 shadow-sm">
                    💸 Cash friendly
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-white/90 shadow-sm">
                    📱 Phone signup
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-white/90 shadow-sm">
                    💬 In-app chat
                  </span>
                </div>
              </div>

              <div className="mt-4 sm:mt-0">
                {/* subtle mock phone card — now shows chat preview */}
                <div className="hidden sm:block rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 p-3 shadow-xl">
                  <div className="w-36 rounded-xl bg-gradient-to-b from-slate-800/60 to-transparent p-3">
                    <div className="h-48 w-full rounded-lg bg-black/40 p-3 flex flex-col justify-between">
                      <div>
                        <div className="h-3 w-16 rounded-full bg-white/10 mb-2" />
                        <div className="space-y-2">
                          <div className="h-4 w-28 rounded bg-white/8" />
                          <div className="h-3 w-20 rounded bg-white/6" />
                        </div>
                      </div>

                      {/* Chat preview */}
                      <div className="mt-2">
                        <div className="mb-2 rounded-lg bg-white/10 px-2 py-1 text-xs text-white/90 max-w-[14rem]">
                          Worker: Hi — can you confirm the time?
                        </div>
                        <div className="rounded-lg bg-emerald-500/20 px-2 py-1 text-xs text-white max-w-[10rem] self-end">
                          You: 10am works 👍
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex w-full flex-col gap-3 sm:flex-row"
            >
              <div className="flex-1 rounded-2xl border border-white/12 bg-black/30 px-4 py-3 flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-white/60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M2 7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 7l-10 6L2 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                className="h-12 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-emerald-400 via-indigo-400 to-sky-500 px-6 text-sm font-semibold text-slate-900 transition hover:shadow-2xl disabled:opacity-60"
              >
                {loading ? "Joining…" : "Join waitlist"}
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

            <footer className="mt-8 flex flex-col gap-4 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
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
        </main>

        {/* How it works (update steps) */}
        <section id="how" className="mt-10 p-6">
          <h3 className="text-lg font-semibold text-white">How it works</h3>
          <p className="text-sm text-white/70 mt-2">
            Mobile-first flow: sign up, post or claim, chat and complete.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-start gap-2">
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-indigo-500/20 text-white font-semibold">
                1
              </div>
              <p className="font-medium text-white">Sign up with phone</p>
              <p className="text-xs text-white/60">
                Quick phone number verification — no passwords.
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-amber-400/20 text-white font-semibold">
                2
              </div>
              <p className="font-medium text-white">Post or claim</p>
              <p className="text-xs text-white/60">
                Create a short listing or claim nearby gigs instantly.
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-emerald-400/20 text-white font-semibold">
                3
              </div>
              <p className="font-medium text-white">Chat & complete</p>
              <p className="text-xs text-white/60">
                Use in-app chat to ask questions, confirm details, and agree
                payment.
              </p>
            </div>
          </div>
        </section>

        {/* About section - unchanged */}
        <section id="about" className="mt-10 p-6">
          <h3 className="text-lg font-semibold text-white">About Rapid Job</h3>
          <p className="mt-2 text-sm text-white/70">
            Rapid Job is revolutionizing the gig economy by connecting local
            workers with people who need tasks done—quickly and easily. Our
            mobile app allows you to post jobs or find gigs in your area, all
            while communicating and getting paid securely through the app.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h4 className="text-white font-medium">Our mission</h4>
              <p className="text-sm text-white/70">
                To empower individuals with flexible work opportunities and to
                provide a reliable solution for people needing tasks completed.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-white font-medium">Join us</h4>
              <p className="text-sm text-white/70">
                Be part of our growing community. Download the app, sign up, and
                start exploring opportunities or getting tasks done today.
              </p>
            </div>
          </div>
        </section>

        {/* GLOBAL FOOTER - unchanged */}
        <footer className="mt-12 border-t border-white/6 pt-8 text-sm text-white/70">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-400 to-emerald-400 grid place-items-center text-sm font-bold text-slate-900">
                    R
                  </div>
                  <div>
                    <div className="text-white font-semibold">Rapid Job</div>
                    <div className="text-xs text-white/60">
                      Connect local help quickly.
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-white/60">
                  Post jobs and claim gigs from the Rapid Job mobile app.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <div>
                  <h4 className="font-medium text-white">Product</h4>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a href="#download" className="hover:text-white">
                        Get the app
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Browse Jobs
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white">Company</h4>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a href="#" className="hover:text-white">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Careers
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white">Support</h4>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a href="#" className="hover:text-white">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Privacy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 text-xs text-white/60">
              © {new Date().getFullYear()} Rapid Job. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
