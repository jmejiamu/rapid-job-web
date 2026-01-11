import { useEffect, useState } from "react";

type Locale = "en" | "es";
const defaultLocale: Locale = "en";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.how": "How it works",
    "nav.about": "About",
    "nav.help": "Help",
    "nav.getApp": "Get the app",

    "hero.beta": "Beta waitlist",
    "hero.title": "Find local help in minutes — post & hire without resumes",
    "hero.subtitle":
      "Rapid Jobs is mobile-first — sign up quickly with your phone number (no password), post or claim gigs from the app, and use real-time in-app chat to ask questions and confirm details.",
    "hero.pill.quick": "⚡ Quick matches",
    "hero.pill.cash": "💸 Cash friendly",
    "hero.pill.phone": "📱 Phone signup",
    "hero.pill.chat": "💬 In-app chat",
    "hero.placeholder": "you@domain.com",
    "hero.join": "Join waitlist",
    "hero.joining": "Joining…",

    "how.title": "How it works",
    "how.subtitle":
      "Mobile-first flow: join with your phone, share or claim gigs, chat to confirm, and get paid fast.",

    "about.title": "A faster, safer way to match local help",
    "about.launch": "Launching soon in El Salvador — join the waitlist",
    "about.p1":
      "Rapid Jobs connects neighbors who need help with vetted workers ready to earn. Post small gigs, chat inside the app, and track payouts without juggling spreadsheets or paperwork.",

    "footer.getApp": "Get the app",
    "download.appstore": "Download on the App Store",
    "download.playstore": "Get it on Google Play",
  },
  es: {
    "nav.home": "Inicio",
    "nav.how": "Cómo funciona",
    "nav.about": "Acerca",
    "nav.help": "Ayuda",
    "nav.getApp": "Obtener la app",

    "hero.beta": "Lista de espera Beta",
    "hero.title":
      "Encuentra ayuda local en minutos — publica y contrata sin currículum",
    "hero.subtitle":
      "Rapid Jobs es móvil: regístrate con tu número, publica o acepta trabajos y usa chat en la app para confirmar detalles.",
    "hero.pill.quick": "⚡ Emparejamientos rápidos",
    "hero.pill.cash": "💸 Efectivo bienvenido",
    "hero.pill.phone": "📱 Registro por teléfono",
    "hero.pill.chat": "💬 Chat en la app",
    "hero.placeholder": "tu@dominio.com",
    "hero.join": "Unirse a la lista",
    "hero.joining": "Enviando…",

    "how.title": "Cómo funciona",
    "how.subtitle":
      "Flujo móvil: regístrate con tu teléfono, publica o acepta trabajos, chatea para confirmar y recibe el pago rápido.",

    "about.title": "Una forma más rápida y segura de conseguir ayuda local",
    "about.launch": "Próximamente en El Salvador — únete a la lista de espera",
    "about.p1":
      "Rapid Jobs conecta a vecinos que necesitan ayuda con trabajadores verificados listos para ganar. Publica trabajos cortos, chatea en la app y controla pagos sin papeleo.",

    "footer.getApp": "Obtener la app",
    "download.appstore": "Descargar en App Store",
    "download.playstore": "Obtener en Google Play",
  },
};

export function useI18n() {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return defaultLocale;
    return (localStorage.getItem("locale") as Locale) || defaultLocale;
  });

  useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const t = (key: string) => {
    return (
      translations[locale]?.[key] ?? translations[defaultLocale][key] ?? key
    );
  };

  return { locale, setLocale, t };
}
