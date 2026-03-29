"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";

/* ───── data ───── */
const NAV_ITEMS = [
  { label: "עמוד ראשי", href: "#hero" },
  { label: "תפריט", href: "#stars" },
  { label: "סניפים", href: "#branches" },
  { label: "גלריה", href: "#gallery" },
  { label: "אודות", href: "#about" },
  { label: "צור קשר", href: "#contact" },
];

const STARS = [
  {
    img: "/images/roll-entrecote.jpg",
    badge: "הנמכר ביותר ⭐",
    title: "רול אנטריקוט",
    desc: "נתחי אנטריקוט עסיסיים בתוך טורטייה פריכה עם כל התוספות",
  },
  {
    img: "/images/roll-chicken.jpg",
    badge: "פופולרי 🔥",
    title: "רול עוף",
    desc: "רצועות עוף טריות על הגריל בתוך טורטייה עם רטבים מיוחדים",
  },
  {
    img: "/images/hamburger-entrecote.jpg",
    badge: "המלצת השף 👨‍🍳",
    title: "המבורגר אנטריקוט",
    desc: "המבורגר אנטריקוט טחון במקום, עסיסי ומושלם",
  },
];

const BRANCHES = [
  {
    img: "/images/branch-ramat-gan.png",
    name: "סניף רמת גן",
    label: "רמת גן - כשר",
    address: "שדרות ירושלים 42",
    phone: "03-574-2822",
    hours: ["א'-ה' 12:00 – 00:00", "ו' סגור", 'מוצ"ש – כחצי שעה לאחר צאת השבת ועד חצות'],
  },
  {
    img: "/images/branch-givat-shmuel.png",
    name: "סניף גבעת שמואל",
    label: "גבעת שמואל - כשר",
    address: "ז'בוטינסקי 512",
    phone: "03-574-2822",
    hours: ["א'-ד' 12:00 – 00:00", "יום ה 12:00 - 01:00", "ו' סגור", 'מוצ"ש – כחצי שעה לאחר צאת השבת ועד 01:00'],
  },
  {
    img: "/images/branch-kiryat-ono.png",
    name: "סניף קרית אונו",
    label: "קרית אונו - כשר",
    address: "נעמי שמר 5",
    phone: "077-9386148",
    hours: ["א'-ה' 12:00 – 00:00", "ו' סגור", 'מוצ"ש – כחצי שעה לאחר צאת השבת ועד חצות'],
  },
  {
    img: "/images/branch-givatayim.png",
    name: "סניף גבעתיים, תל אביב",
    label: "סניף גבעתיים, תל אביב - כשר",
    address: "אריאל שרון 10",
    phone: "077-3034030",
    hours: ["א'-ה' 12:00 – 00:00", "ו' סגור", 'מוצ"ש – כחצי שעה לאחר צאת השבת ועד חצות'],
  },
];

const TESTIMONIALS = [
  { initial: "ש", name: "שרה כהן", text: "הרול אנטריקוט הכי טעים שאכלתי! הבשר עסיסי, הירקות טריים והשירות מעולה. ממליצה בחום!" },
  { initial: "ד", name: "דוד לוי", text: "משפחתי ואני מזמינים מטומי רול כבר 3 שנים. האיכות תמיד נשמרת והטעם פשוט מושלם!" },
  { initial: "מ", name: "מיכל אברהם", text: "המבורגר האנטריקוט שלהם הוא פשוט שיא! כל כך עסיסי וטעים. חובה לנסות!" },
];

const GALLERY = Array.from({ length: 8 }, (_, i) => `/images/gallery-${i + 1}.jpg`);
const INSTAGRAM_REELS = [
  "https://www.instagram.com/reel/DSVCKBsDAR7/embed/",
  "https://www.instagram.com/reel/DNBSvy-IqbC/embed/",
  "https://www.instagram.com/reel/DBEsnqao_3x/embed/",
];

/* ───── icons (inline svg) ───── */
function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
  );
}

function PhoneIcon() {
  return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
}

function MapIcon() {
  return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}

function ClockIcon() {
  return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}

function MailIcon() {
  return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4H16V5.3c-.2 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.2V11H8.8v2.8h2.4V21h2.3Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.5 3c.3 1.9 1.4 3.1 3.2 3.6v2.5c-1.2 0-2.3-.3-3.2-.9v6.1c0 3.3-2.2 5.7-5.5 5.7-3 0-5.2-2.2-5.2-5 0-3 2.4-5.2 5.7-5.2.3 0 .7 0 1 .1v2.7c-.3-.1-.6-.2-.9-.2-1.6 0-2.9 1-2.9 2.5 0 1.4 1 2.5 2.4 2.5 1.6 0 2.6-1.1 2.6-3.2V3h2.8Z" />
    </svg>
  );
}

/* ───── component ───── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <Script
        src="https://cdn.userway.org/widget.js"
        strategy="afterInteractive"
        data-account="ZMs9cc17RE"
        data-color="#ec4920"
        data-widget_layout="full"
      />

      {/* ====== HEADER ====== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[rgb(25,14,11)] bg-opacity-95 shadow-lg backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="#hero">
            <Image src="/images/logo.png" alt="Tommy Roll" width={120} height={48} className="h-10 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((n) => (
              <a key={n.href} href={n.href} className="text-white text-opacity-80 hover:text-opacity-100 text-sm transition-colors">
                {n.label}
              </a>
            ))}
            <a href="#contact" className="bg-[rgb(232,73,33)] hover:bg-[rgb(200,60,25)] text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors">
              הזמינו עכשיו
            </a>
          </nav>
          <button className="md:hidden text-white text-2xl" onClick={() => setMobileMenu(!mobileMenu)} aria-label="תפריט">
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>
        {mobileMenu && (
          <nav className="md:hidden bg-[rgb(25,14,11)] border-t border-white border-opacity-10 px-4 pb-4 flex flex-col gap-3">
            {NAV_ITEMS.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMobileMenu(false)} className="text-white text-opacity-80 hover:text-opacity-100 py-2 text-sm">
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenu(false)} className="bg-[rgb(232,73,33)] text-white text-center px-5 py-2 rounded-full text-sm font-semibold">
              הזמינו עכשיו
            </a>
          </nav>
        )}
      </header>

      {/* ====== HERO ====== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image src="/images/hero.jpg" alt="טומי רול" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(25,15,13)] via-black via-opacity-50 to-transparent" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">טומי רול</h1>
          <p className="text-lg md:text-2xl text-white text-opacity-80 mb-8">רשת מסעדות רחוב שכולם מדברים עליהם</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-[rgb(232,73,33)] hover:bg-[rgb(200,60,25)] text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors inline-flex items-center gap-2 justify-center">
              🛒 הזמינו עכשיו
            </a>
            <a href="#branches" className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-full font-semibold text-lg transition-colors inline-flex items-center gap-2 justify-center">
              📍 גלו את הסניפים
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" className="w-full h-16 md:h-24" preserveAspectRatio="none">
            <path d="M0,60 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ====== STARS ====== */}
      <section id="stars" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">הכוכבים שלנו</h2>
            <p className="text-gray-600">המנות שהופכות כל ארוחה לחוויה בלתי נשכחת</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STARS.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                <div className="relative h-56 overflow-hidden">
                  <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm text-sm px-3 py-1 rounded-full font-semibold">
                    {s.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
                  <a href="#contact" className="inline-flex items-center gap-2 bg-[rgb(232,73,33)] hover:bg-[rgb(200,60,25)] text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors">
                    🛒 הזמינו עכשיו
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== ABOUT ====== */}
      <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-[rgb(25,14,11)] to-[rgb(26,26,26)]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[rgb(232,73,33)] text-sm px-4 py-1.5 rounded-full mb-4 font-semibold bg-[rgb(232,73,33)] bg-opacity-10">
              📖 הסיפור שלנו
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
              טומי רול רמת גן - מוסד קולינרי של אוכל רחוב כבר 21 שנה
            </h2>
            <p className="text-gray-400 mb-4">
              הכי טרי, הכי טעים, בלי פשרות. אנטריקוט שנפרס במקום, המבורגרים שנטחנים במקום, שניצל קריספי שמוכן לפי הזמנה, ורול עוף מהפנט. תורים שמעידים על תחלופה גבוהה - אך השירות מהיר ומתקתק את כולם.
            </p>
            <p className="text-gray-400 mb-6">
              הסניף ברמת גן הוא מוקד עלייה לרגל, ובעקבותיו נפתחו שלושה סניפים גדולים ומצליחים. אפשר לאכול במקום במסעדה, או להזמין עם שירות משלוחים משלנו עד הבית.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 bg-[rgb(232,73,33)] hover:bg-[rgb(200,60,25)] text-white px-8 py-3 rounded-full font-semibold transition-colors">
              ← הזמינו עכשיו
            </a>
          </div>
          <div className="flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden">
              <Image src="/images/about-rolls-tray.jpg" alt="מגש רולים עם צ'יפס וטבעות בצל" width={600} height={350} className="w-full object-cover h-56 md:h-64" />
              <div className="absolute bottom-4 right-4 bg-[rgb(232,73,33)] text-white px-4 py-2 rounded-xl text-center">
                <span className="block text-2xl font-bold">21+</span>
                <span className="text-xs">שנות ניסיון</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <Image src="/images/about-hamburgers.jpg" alt="המבורגרים מפנקים של טומי רול" width={600} height={350} className="w-full object-cover h-56 md:h-64" />
              <div className="absolute bottom-4 right-4 bg-[rgb(232,73,33)] text-white px-4 py-2 rounded-xl text-center">
                <span className="block text-2xl font-bold">50K+</span>
                <span className="text-xs">לקוחות מרוצים</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== GALLERY ====== */}
      <section id="gallery" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">גלריית המנות שלנו</h2>
            <p className="text-gray-600">תמונות אמיתיות מהסניפים שלנו - ללא פילטרים</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map((src, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden group aspect-square cursor-pointer">
                <Image src={src} alt={`מנה ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#contact" className="inline-flex items-center gap-2 bg-[rgb(232,73,33)] hover:bg-[rgb(200,60,25)] text-white px-8 py-3 rounded-full font-semibold transition-colors">
              ← הזמינו עכשיו
            </a>
          </div>
        </div>
      </section>

      {/* ====== INSTAGRAM ====== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[rgb(25,14,11)] to-[rgb(26,26,26)]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-sm px-4 py-1.5 rounded-full mb-4 font-semibold">
            🎬 הרילסים שלנו
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">עקבו אחרינו באינסטגרם</h2>
          <p className="text-gray-400 mb-10">@tommyrollbar | רגעים טעימים מהמטבח שלנו</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {INSTAGRAM_REELS.map((src, i) => (
              <div key={src} className="overflow-hidden rounded-2xl border border-white border-opacity-10 bg-white bg-opacity-5 shadow-lg">
                <iframe
                  src={src}
                  title={`Instagram Reel ${i + 1}`}
                  className="h-[26rem] w-full"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mb-8">
            {INSTAGRAM_REELS.map((_, i) => (
              <span key={i} className={`h-3 w-3 rounded-full ${i === 0 ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white bg-opacity-30"}`} />
            ))}
          </div>
          <a href="https://www.instagram.com/tommyrollbar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-full font-semibold transition-colors">
            <InstagramIcon className="h-5 w-5" /> עקבו אחרינו באינסטגרם
          </a>
        </div>
      </section>

      {/* ====== BRANCHES ====== */}
      <section id="branches" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">הסניפים שלנו</h2>
            <p className="text-gray-600">4 מיקומים ברחבי הארץ - קרוב אליכם תמיד</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {BRANCHES.map((b) => (
              <div key={b.name} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image src={b.img} alt={b.name} fill className="object-cover" />
                  <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                    ✓ {b.label}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{b.name}</h3>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-start gap-3">
                      <span className="text-[rgb(232,73,33)] mt-0.5"><MapIcon /></span>
                      <div>
                        <p className="text-gray-500 text-xs">כתובת:</p>
                        <p className="text-gray-700 text-sm">{b.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[rgb(232,73,33)] mt-0.5"><PhoneIcon /></span>
                      <div>
                        <p className="text-gray-500 text-xs">טלפון:</p>
                        <a href={`tel:${b.phone}`} className="text-[rgb(232,73,33)] text-sm font-semibold">{b.phone}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[rgb(232,73,33)] mt-0.5"><ClockIcon /></span>
                      <div>
                        <p className="text-gray-500 text-xs">שעות פתיחה:</p>
                        {b.hours.map((h, i) => (
                          <p key={i} className="text-gray-700 text-sm">{h}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a href="#contact" className="flex-1 text-center bg-[rgb(232,73,33)] hover:bg-[rgb(200,60,25)] text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1">
                      🛒 הזמינו עכשיו
                    </a>
                    <a href={`https://waze.com/ul?q=${encodeURIComponent(b.address)}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center border border-[rgb(232,73,33)] text-[rgb(232,73,33)] hover:bg-[rgb(232,73,33)] hover:bg-opacity-10 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1">
                      📍 נווטו אלינו
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[rgb(25,14,11)] to-[rgb(26,26,26)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">מה הלקוחות אומרים</h2>
            <p className="text-gray-400">אלפי לקוחות מרוצים ממליצים עלינו</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl p-6 hover:bg-opacity-10 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[rgb(232,73,33)] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {t.initial}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{t.name}</h4>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white text-opacity-80 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl p-6">
            <div className="text-center">
              <div className="flex justify-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <span className="block text-3xl font-bold text-[rgb(232,73,33)]">4.9/5</span>
              <span className="text-white text-opacity-60 text-sm">דירוג ממוצע</span>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white bg-opacity-20" />
            <div className="text-center">
              <span className="block text-3xl font-bold text-[rgb(232,73,33)]">2,500+</span>
              <span className="text-white text-opacity-60 text-sm">ביקורות</span>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white bg-opacity-20" />
            <div className="text-center">
              <span className="block text-3xl font-bold text-[rgb(232,73,33)]">98%</span>
              <span className="text-white text-opacity-60 text-sm">שביעות רצון</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <Image src="/images/cta-bg.jpg" alt="אוכל על האש" fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            אין כמו רול חם ועסיסי שמוכן בדיוק בשבילך
          </h2>
          <p className="text-white text-opacity-80 mb-8">הזמינו עכשיו ותהנו מאוכל רחוב איכותי שמגיע אליכם חם וטרי</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <a href="#contact" className="bg-[rgb(232,73,33)] hover:bg-[rgb(200,60,25)] text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors inline-flex items-center gap-2 justify-center">
              🛒 הזמינו עכשיו!
            </a>
            <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-full font-semibold text-lg transition-colors inline-flex items-center gap-2 justify-center">
              🥡 טייק אווי
            </a>
          </div>
          <p className="text-white text-opacity-50 text-sm">זמן אספקה ממוצע: 90-120 דקות</p>
        </div>
      </section>

      {/* ====== CONTACT ====== */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">צרו קשר</h2>
            <p className="text-gray-600">נשמח לשמוע מכם ולעזור בכל שאלה</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 mx-auto mb-4 bg-[rgb(232,73,33)] bg-opacity-10 rounded-full flex items-center justify-center text-[rgb(232,73,33)]">
                <PhoneIcon />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">טלפון ראשי</h3>
              <a href="tel:03-574-2822" className="text-[rgb(232,73,33)] font-semibold">03-574-2822</a>
              <p className="text-gray-400 text-sm mt-1">א׳-ה׳ 12:00-00:00</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 mx-auto mb-4 bg-[rgb(232,73,33)] bg-opacity-10 rounded-full flex items-center justify-center text-[rgb(232,73,33)]">
                <MailIcon />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">אימייל</h3>
              <a href="mailto:info@tommyrollbar.co.il" className="text-[rgb(232,73,33)] font-semibold text-sm">info@tommyrollbar.co.il</a>
              <p className="text-gray-400 text-sm mt-1">נענה תוך 24 שעות</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 mx-auto mb-4 bg-[rgb(232,73,33)] bg-opacity-10 rounded-full flex items-center justify-center text-[rgb(232,73,33)]">
                <MapIcon />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">כתובת ראשית</h3>
              <p className="text-gray-700 text-sm">שדרות ירושלים 42</p>
              <p className="text-gray-400 text-sm">רמת גן</p>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-gray-800 mb-2">עקבו אחרינו ברשתות החברתיות</h3>
            <p className="text-gray-500 text-sm mb-4">הצטרפו לקהילה שלנו וקבלו עדכונים על מבצעים ומנות חדשות</p>
            <div className="flex justify-center gap-4">
              <a href="https://www.facebook.com/share/1Adx2eb9gD/" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700" aria-label="Facebook">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/tommyrollbar?igsh=anY1NjRyNmR1cnE1" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white transition-opacity hover:opacity-80" aria-label="Instagram">
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a href="https://www.tiktok.com/@tommyrollbar?_r=1&_t=ZS-93G7LtbLKPX" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800" aria-label="TikTok">
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="py-12 md:py-16 bg-[rgb(25,14,11)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <Image src="/images/logo.png" alt="Tommy Roll" width={120} height={48} className="h-10 w-auto mb-4" />
              <p className="text-white text-opacity-50 text-sm mb-4">
                מסעדת טורטיות והמבורגרים משפחתית מעל כ-20 שנים, המציעה אוכל רחוב עממי וטעים במחיר הוגן.
              </p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/share/1Adx2eb9gD/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white bg-opacity-10 text-white transition-colors hover:bg-opacity-20" aria-label="Facebook">
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a href="https://www.instagram.com/tommyrollbar?igsh=anY1NjRyNmR1cnE1" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white bg-opacity-10 text-white transition-colors hover:bg-opacity-20" aria-label="Instagram">
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a href="https://www.tiktok.com/@tommyrollbar?_r=1&_t=ZS-93G7LtbLKPX" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white bg-opacity-10 text-white transition-colors hover:bg-opacity-20" aria-label="TikTok">
                  <TikTokIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">ניווט מהיר</h4>
              <nav className="flex flex-col gap-2">
                {NAV_ITEMS.map((n) => (
                  <a key={n.href} href={n.href} className="text-white text-opacity-50 hover:text-opacity-100 text-sm transition-colors">{n.label}</a>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">הסניפים שלנו</h4>
              <div className="flex flex-col gap-2 text-white text-opacity-50 text-sm">
                {BRANCHES.map((b) => (
                  <span key={b.name} className="flex items-start gap-2">
                    <span className="text-[rgb(232,73,33)]">📍</span>
                    {b.label} - {b.address}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">הזמינו עכשיו</h4>
              <div className="flex flex-col gap-3">
                <a href="#contact" className="bg-[rgb(232,73,33)] hover:bg-[rgb(200,60,25)] text-white text-center px-6 py-2.5 rounded-full text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1">
                  🛒 הזמינו עכשיו!
                </a>
                <a href="#contact" className="border border-white border-opacity-20 text-white hover:bg-white hover:bg-opacity-10 text-center px-6 py-2.5 rounded-full text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1">
                  🥡 טייק אווי
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white border-opacity-10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white text-opacity-40 text-xs">
              <p>© 2026 Tommy Roll. כל הזכויות שמורות. - צילום מנות: יעל בונפיס</p>
              <div className="flex gap-4">
                <a href="https://tommyrollbar.co.il/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">תנאי שימוש</a>
                <a href="https://tommyrollbar.co.il/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">מדיניות פרטיות</a>
                <a href="https://tommyrollbar.co.il/%D7%94%D7%A6%D7%94%D7%A8%D7%AA-%D7%A0%D7%92%D7%99%D7%A9%D7%95%D7%AA" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">הצהרת נגישות</a>
              </div>
            </div>
            <p className="text-center text-white text-opacity-30 text-xs mt-4">
              אתר זה נבנה על ידי <a href="https://knockknock.co.il" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">נוק נוק טכנולוגיה</a> | פתרונות מתקדמים לעסקים
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
