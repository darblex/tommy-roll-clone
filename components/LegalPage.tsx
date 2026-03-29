import Link from "next/link";
import type { ReactNode } from "react";

type LegalItem = {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
};

type ContactCard = {
  title: string;
  rows: { label: string; value: string; href?: string }[];
  updatedAt?: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string[];
  sections: LegalItem[];
  contactCard?: ContactCard;
  footerLinks?: { label: string; href: string }[];
  children?: ReactNode;
};

export function LegalPage({ eyebrow, title, intro = [], sections, contactCard, footerLinks = [], children }: Props) {
  return (
    <main className="min-h-screen bg-[rgb(25,14,11)] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-white">
            טומי <span className="text-[rgb(232,73,33)]">רול</span>
          </Link>
          <Link href="/" className="text-sm text-white/80 transition-colors hover:text-white">
            ← חזרה לאתר
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="text-center">
          {eyebrow ? (
            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              {eyebrow}
            </div>
          ) : null}
          <h1 className="mb-5 text-4xl font-black md:text-5xl">{title}</h1>
          {intro.map((paragraph) => (
            <p key={paragraph} className="mx-auto mb-4 max-w-3xl text-sm leading-7 text-white/75 md:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 space-y-8 md:mt-14">
          {sections.map((section, index) => (
            <section key={`${section.title ?? "section"}-${index}`} className="space-y-4">
              {section.title ? <h2 className="text-2xl font-extrabold text-white md:text-3xl">{section.title}</h2> : null}
              {section.paragraphs?.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-sm leading-8 text-white/80 md:text-base">
                  {paragraph}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="space-y-2 pr-5 text-sm leading-8 text-white/80 md:text-base">
                  {section.bullets.map((bullet, bIndex) => (
                    <li key={bIndex} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {children}

        {contactCard ? (
          <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-2xl shadow-black/20">
            <h3 className="mb-4 text-2xl font-extrabold">{contactCard.title}</h3>
            <div className="space-y-3 text-sm text-white/85 md:text-base">
              {contactCard.rows.map((row) => (
                <div key={`${row.label}-${row.value}`}>
                  <span className="font-semibold text-white">{row.label}</span>{" "}
                  {row.href ? (
                    <a href={row.href} className="text-[rgb(232,73,33)] transition-colors hover:text-white" target={row.href.startsWith("http") ? "_blank" : undefined} rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                      {row.value}
                    </a>
                  ) : (
                    <span>{row.value}</span>
                  )}
                </div>
              ))}
            </div>
            {contactCard.updatedAt ? <p className="mt-4 text-xs text-white/45">{contactCard.updatedAt}</p> : null}
          </section>
        ) : null}

        {footerLinks.length ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center md:flex-row md:gap-6">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-[rgb(232,73,33)] transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © 2026 טומי רול. כל הזכויות שמורות.
      </footer>
    </main>
  );
}
