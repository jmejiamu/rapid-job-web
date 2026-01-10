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
    <div className="relative min-h-screen overflow-visible bg-gradient-to-br from-white via-slate-50 to-sky-50 text-slate-900 antialiased">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-[18%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />
        <div className="absolute bottom-10 right-0 h-[26rem] w-[26rem] translate-x-1/4 rounded-full bg-emerald-500/15 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />
        <div className="absolute inset-x-0 top-1/3 h-96 bg-gradient-to-b from-indigo-500/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* HEADER -> sticky navigation */}
        <header className="sticky top-6 z-50 mb-10">
          <nav className="flex items-center justify-between rounded-2xl border border-slate-200/40 bg-white/90 px-4 py-3 shadow-sm sm:px-6">
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
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Rapid Job
                </h1>
                <p className="text-xs text-slate-600">
                  Small gigs. Fast pay. No resume required.
                </p>
              </div>
            </div>

            {/* Desktop nav - with language toggle */}
            <div className="hidden sm:flex items-center gap-4 text-sm text-slate-600">
              <a
                href="#"
                className="px-2 py-1 rounded transition-colors duration-150 hover:text-slate-900"
              >
                {t("nav.home")}
              </a>
              <a
                href="#how"
                className="px-2 py-1 rounded transition-colors duration-150 hover:text-slate-900"
              >
                {t("nav.how")}
              </a>
              <a
                href="#about"
                className="px-2 py-1 rounded transition-colors duration-150 hover:text-slate-900"
              >
                {t("nav.about")}
              </a>
              <a
                href="#help"
                className="px-2 py-1 rounded transition-colors duration-150 hover:text-slate-900"
              >
                {t("nav.help")}
              </a>

              <div className="ml-2 inline-flex items-center gap-2 rounded-full bg-slate-100/60 p-1">
                <button
                  onClick={() => setLocale("en")}
                  className={`px-2 py-1 rounded text-xs ${
                    locale === "en" ? "bg-slate-200/60" : ""
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLocale("es")}
                  className={`px-2 py-1 rounded text-xs ${
                    locale === "es" ? "bg-slate-200/60" : ""
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
                className="rounded-md bg-slate-100/60 px-3 py-2 text-sm text-slate-800"
              >
                Menu
              </button>
            </div>
          </nav>
        </header>

        <main className="grid gap-8 lg:gap-10">
          {/* Left column (hero / waitlist) */}
          <section className="relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, rgba(0,0,0,0.02) 1px, transparent 1px)",
                  backgroundSize: "180px 180px",
                }}
              />
              <div className="absolute -right-12 top-12 h-40 w-40 rounded-full bg-emerald-200/40 blur-[120px]" />
              <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-indigo-100/40 blur-[140px]" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">
                  {t("hero.beta")}
                </p>
                <h2
                  className={`mt-2 font-extrabold leading-tight text-slate-900 transition-all duration-700 ease-out
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
                <p className="mt-3 text-sm text-slate-700">
                  {t("hero.subtitle")}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100/70 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm">
                    {t("hero.pill.quick")}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100/70 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm">
                    {t("hero.pill.cash")}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100/70 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm">
                    {t("hero.pill.phone")}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100/70 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm">
                    {t("hero.pill.chat")}
                  </span>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid w-full gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
            >
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200/40 bg-white/90 px-4 py-3 shadow-inner shadow-black/5 transition focus-within:border-emerald-300/40">
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
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-400 via-indigo-400 to-sky-500 px-6 text-sm font-semibold text-slate-900 shadow-[0_15px_50px_rgba(16,185,129,0.4)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_25px_65px_rgba(14,165,233,0.5)] disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
              >
                {loading ? t("hero.joining") : t("hero.join")}
              </button>
            </form>

            {message && (
              <p
                className={`mt-4 rounded-2xl border px-4 py-2 text-sm ${
                  message.type === "success"
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                    : "border-rose-400/30 bg-rose-400/10 text-rose-200"
                }`}
              >
                {message.text}
              </p>
            )}

            <footer className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200/40 bg-white/80 p-4 text-xs text-slate-700 shadow-inner shadow-black/5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#download"
                  aria-label={t("download.appstore")}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-100/60 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
                >
                  <span className="text-xl"></span>
                  <span>{t("download.appstore")}</span>
                </a>
                <a
                  href="#download"
                  aria-label={t("download.playstore")}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-100/60 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
                >
                  <span className="text-xl">
                    <Image
                      src="/google-play-icons.png"
                      alt="Play Store"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span>{t("download.playstore")}</span>
                </a>
              </div>
              <div className="rounded-full border border-slate-200/60 px-4 py-2 text-slate-700">
                • 5k+ workers
              </div>
            </footer>
          </section>
        </main>

        {/* How it works (update steps) */}
        <section id="how" className="relative mt-10 overflow-hidden p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute inset-0 opacity-[0.08]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.35),_transparent_50%)]" />
            </div>
          </div>
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/40 bg-slate-100/60 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-slate-700">
                Flow
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                Guided
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                {t("how.title")}
              </h3>
              <p className="mt-2 text-sm text-slate-700">{t("how.subtitle")}</p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-slate-700">
              <span className="rounded-full border border-slate-200/40 bg-slate-100/60 px-3 py-1">
                📍 Local jobs
              </span>
              <span className="rounded-full border border-slate-200/40 bg-slate-100/60 px-3 py-1">
                🔔 Instant alerts
              </span>
              <span className="rounded-full border border-slate-200/40 bg-slate-100/60 px-3 py-1">
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
                <div key={step.title} className="group relative p-5">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-emerald-400/20" />
                  </div>
                  <div
                    className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${step.accent} text-2xl shadow-lg shadow-black/40`}
                  >
                    {step.emoji}
                  </div>
                  <div className="mt-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">
                      {step.label}
                    </p>
                    <p className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.highlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-200/40 bg-slate-100/60 px-3 py-1 text-[11px] text-slate-700"
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
        <section
          id="about"
          className="relative mt-10 overflow-hidden p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
            <div className="absolute -bottom-24 right-0 h-48 w-48 rounded-full bg-emerald-500/20 blur-[120px]" />
          </div>
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/40 bg-slate-100/60 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-slate-700">
                About
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                Rapid Job
              </span>
              <h3 className="text-3xl font-semibold text-slate-900">
                {t("about.title")}
              </h3>
              <div className="mt-3 inline-flex items-center gap-3 rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
                <span className="text-lg leading-none">🇸🇻</span>
                <span className="text-sm">{t("about.launch")}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {t("about.p1")}
              </p>

              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/40 bg-slate-50 p-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-3xl font-semibold text-slate-900">5k+</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-600">
                    Workers
                  </p>
                </div>
                <div className="hidden h-10 w-px bg-white/15 sm:block" />
                <div>
                  <p className="text-3xl font-semibold text-slate-900">120+</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-600">
                    Weekly gigs
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border-l-4 border-emerald-400/60 bg-slate-50 p-5 text-sm text-slate-700 shadow-[0_10px_30px_rgba(2,6,23,0.04)]">
                “We created Rapid Job so everyday people can request help in a
                few taps while giving workers dependable income without
                red-tape.”
              </div>
            </div>

            <div className="grid gap-4">
              {aboutHighlights.map((item) => (
                <div key={item.title} className="group relative p-5">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-slate-100/40 opacity-0 transition duration-300 group-hover:opacity-100" />
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-600">
                    {item.label}
                  </p>
                  <h4 className="mt-2 text-xl font-semibold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-700">
                    {item.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
                    {item.badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full border border-slate-200/40 bg-slate-100/60 px-3 py-1 text-slate-700"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="p-5 text-slate-700">
                <h5 className="text-lg font-semibold text-slate-900">
                  Join the movement
                </h5>
                <p className="mt-2 text-sm text-slate-700">
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
                  <a href="#help" className="px-4 py-2 text-slate-700">
                    Need help?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GLOBAL FOOTER */}
        <footer className="mt-12 p-6 text-sm text-slate-700 sm:p-8">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-10">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-transparent">
                  <Image
                    src="/logo.png"
                    alt="Rapid Job"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-slate-900 font-semibold">Rapid Job</div>
                  <div className="text-xs text-slate-600">
                    Connect local help quickly.
                  </div>
                </div>
              </div>
              <p className="mt-3 max-w-sm text-xs text-slate-600">
                Post jobs and claim gigs from the Rapid Job mobile app.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <h4 className="font-medium text-slate-900">Product</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>
                    <a
                      href="#download"
                      className="text-slate-600 transition hover:text-slate-900"
                    >
                      Get the app
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 transition hover:text-slate-900"
                    >
                      Browse Jobs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-900">Company</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 transition hover:text-slate-900"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 transition hover:text-slate-900"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/rapid-jobs-app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 transition hover:text-slate-900"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-900">Support</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 transition hover:text-slate-900"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 transition hover:text-slate-900"
                    >
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200/40 pt-4 text-xs text-slate-600">
            © {new Date().getFullYear()} Rapid Job. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
