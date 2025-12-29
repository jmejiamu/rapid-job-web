"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useI18n } from "./i18n";

export default function Home() {
  // translations
  const { locale, setLocale, t } = useI18n();

  // mount animation state
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  const steps = [
    {
      label: "Step 1",
      title: "Sign up with phone",
      description:
        "Enter your phone number, confirm with a quick SMS code, and you’re in.",
      accent: "from-indigo-500 via-blue-500 to-sky-500",
      emoji: "📲",
      highlights: ["1-min onboarding", "No passwords"],
    },
    {
      label: "Step 2",
      title: "Post or claim gigs",
      description:
        "Create a short listing or pick nearby gigs boosted to the top for your skills.",
      accent: "from-amber-400 via-orange-400 to-rose-400",
      emoji: "⚡",
      highlights: ["Smart matching", "Instant alerts"],
    },
    {
      label: "Step 3",
      title: "Chat & complete",
      description:
        "Message inside the app, confirm details, finish the job, and track payout status.",
      accent: "from-emerald-400 via-green-400 to-teal-400",
      emoji: "💬",
      highlights: ["Real-time chat", "Cash or app pay"],
    },
  ];

  const aboutHighlights = [
    {
      label: "Mission",
      title: "Empower flexible work",
      description:
        "Enable anyone to earn quickly and safely by connecting neighbors who need an extra hand.",
      badges: ["Fair pay", "Safety first", "Trust"],
    },
    {
      label: "Community",
      title: "Built for locals",
      description:
        "We focus on neighborhood crews — from handymen to cleaners — so jobs stay close and reliable.",
      badges: ["Local first", "Verified", "Support"],
    },
  ];

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
        {/* HEADER -> sticky navigation */}
        <header className="mb-8 sticky top-0 z-50 bg-gradient-to-b from-slate-900/40 to-transparent backdrop-blur-md">
          <nav className="flex items-center justify-between px-2 py-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl shadow-md grid place-items-center overflow-hidden bg-transparent">
                <Image
                  src="/logo.png"
                  alt="Rapid Job"
                  width={44}
                  height={44}
                  className="object-cover"
                />
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

            {/* Desktop nav - with language toggle */}
            <div className="hidden sm:flex items-center gap-4 text-sm text-white/80">
              <a href="#" className="px-2 py-1 rounded hover:text-white">
                {t("nav.home")}
              </a>
              <a href="#how" className="px-2 py-1 rounded hover:text-white">
                {t("nav.how")}
              </a>
              <a href="#about" className="px-2 py-1 rounded hover:text-white">
                {t("nav.about")}
              </a>
              <a href="#help" className="px-2 py-1 rounded hover:text-white">
                {t("nav.help")}
              </a>

              <div className="ml-2 inline-flex items-center gap-2 rounded-full bg-white/6 p-1">
                <button
                  onClick={() => setLocale("en")}
                  className={`px-2 py-1 rounded text-xs ${
                    locale === "en" ? "bg-white/10" : ""
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLocale("es")}
                  className={`px-2 py-1 rounded text-xs ${
                    locale === "es" ? "bg-white/10" : ""
                  }`}
                >
                  ES
                </button>
              </div>

              <a
                href="#download"
                className="ml-2 rounded-full bg-emerald-400 px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm"
              >
                {t("nav.getApp")}
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
                  {t("hero.beta")}
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
                  {t("hero.title")}
                </h2>

                {/* Updated hero copy: emphasize phone signup and chat */}
                <p className="mt-3 text-sm text-white/70">
                  {t("hero.subtitle")}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-white/90 shadow-sm">
                    {t("hero.pill.quick")}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-white/90 shadow-sm">
                    {t("hero.pill.cash")}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-white/90 shadow-sm">
                    {t("hero.pill.phone")}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-white/90 shadow-sm">
                    {t("hero.pill.chat")}
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
                  placeholder={t("hero.placeholder")}
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-emerald-400 via-indigo-400 to-sky-500 px-6 text-sm font-semibold text-slate-900 transition hover:shadow-2xl disabled:opacity-60"
              >
                {loading ? t("hero.joining") : t("hero.join")}
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
                <a
                  href="#download"
                  aria-label={t("download.appstore")}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/6 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
                >
                  <span className="text-xl"></span>
                  <span>{t("download.appstore")}</span>
                </a>
                <a
                  href="#download"
                  aria-label={t("download.playstore")}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/6 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
                >
                  <span className="text-xl">▶️</span>
                  <span>{t("download.playstore")}</span>
                </a>
              </div>
              <div className="rounded-full border border-white/10 px-4 py-2 text-white/80">
                • 5k+ workers
              </div>
            </footer>
          </section>
        </main>

        {/* How it works (update steps) */}
        <section id="how" className="mt-10 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/70">
                Flow
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                Guided
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {t("how.title")}
              </h3>
              <p className="mt-2 text-sm text-white/70">{t("how.subtitle")}</p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-white/70">
              <span className="rounded-full bg-slate-900/40 px-3 py-1">
                📍 Local jobs
              </span>
              <span className="rounded-full bg-slate-900/40 px-3 py-1">
                🔔 Instant alerts
              </span>
              <span className="rounded-full bg-slate-900/40 px-3 py-1">
                🛡️ Safe messaging
              </span>
            </div>
          </div>

          <div className="relative mt-8">
            <div
              className="pointer-events-none absolute top-16 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-indigo-500/30 via-white/30 to-emerald-400/30 sm:block"
              aria-hidden
            />

            <div className="relative grid gap-4 sm:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/4 via-white/0 to-transparent p-5 backdrop-blur"
                >
                  <div
                    className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${step.accent} text-2xl grid place-items-center shadow-lg`}
                  >
                    {step.emoji}
                  </div>
                  <div className="mt-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                      {step.label}
                    </p>
                    <p className="text-lg font-semibold text-white">
                      {step.title}
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.highlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About section - redesigned */}
        <section id="about" className="mt-10 p-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/70">
                About
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                Rapid Job
              </span>
              <h3 className="text-3xl font-semibold text-white">
                {t("about.title")}
              </h3>
              <div className="mt-3 inline-flex items-center gap-3 rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
                <span className="text-lg leading-none">🇸🇻</span>
                <span className="text-sm">{t("about.launch")}</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {t("about.p1")}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-3xl font-semibold text-white">5k+</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Workers
                  </p>
                </div>
                <div className="hidden h-10 w-px bg-white/10 sm:block" />
                <div>
                  <p className="text-3xl font-semibold text-white">120+</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Weekly gigs
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                “We created Rapid Job so everyday people can request help in a
                few taps while giving workers dependable income without
                red-tape.”
              </div>
            </div>

            <div className="grid gap-4">
              {aboutHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950/60 via-slate-900/40 to-transparent p-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                    {item.label}
                  </p>
                  <h4 className="mt-2 text-xl font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-white/70">
                    {item.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
                    {item.badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-dashed border-white/20 bg-slate-950/20 p-5 text-white/80">
                <h5 className="text-lg font-semibold text-white">
                  Join the movement
                </h5>
                <p className="mt-2 text-sm text-white/70">
                  Download the app, create your profile, and start exploring
                  local opportunities today.
                </p>
                <div className="mt-4 flex gap-3 text-xs">
                  <a
                    href="#download"
                    className="rounded-full bg-emerald-400/90 px-4 py-2 font-semibold text-slate-900"
                  >
                    {t("footer.getApp")}
                  </a>
                  <a href="#help" className="px-4 py-2 text-white/70">
                    Need help?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GLOBAL FOOTER - unchanged */}
        <footer className="mt-12 border-t border-white/6 pt-8 text-sm text-white/70">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg grid place-items-center overflow-hidden bg-transparent">
                    <Image
                      src="/logo.png"
                      alt="Rapid Job"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
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
