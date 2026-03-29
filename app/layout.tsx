import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "טומי רול - רשת מסעדות רולים והמבורגרים",
  description:
    "טומי רול - רשת מסעדות רולים והמבורגרים מובילה בישראל. רולים עסיסיים, המבורגרים מושלמים ואהבה בכל ביס. 4 סניפים ברחבי הארץ.",
  icons: { icon: "/seo/favicon.png" },
  openGraph: {
    images: ["/seo/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={rubik.className}>
      <body>
        <a
          href="#main-content"
          className="sr-only fixed right-4 top-4 z-[100] rounded-full bg-[rgb(25,14,11)] px-4 py-2 text-sm font-semibold text-white shadow-lg focus:not-sr-only"
        >
          דלג לתוכן הראשי
        </a>
        {children}
      </body>
    </html>
  );
}
