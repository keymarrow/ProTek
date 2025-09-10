import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Proteknologies Limited",
  description: "Proteknologies Limited - Your Zoho Implementation Partner",

  verification: {
    google: 'flVD6IDhJJ3AqVuD2GQsOGzO7xhqHdaFgoV6OLWQqcw'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plusJakarta.variable}>
        {/* Netlify Identity script removed to avoid interfering with Decap CMS auth */}
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: 'https://protek.co.tz/',
            name: 'Proteknologies Limited',
            alternateName: 'ProTek',
          })}
        </Script>
        <Script id="ld-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Proteknologies Limited',
            alternateName: 'ProTek',
            url: 'https://protek.co.tz/',
            logo: 'https://protek.co.tz/ProTek.svg',
            sameAs: [
              'https://www.linkedin.com/company/proteknologies',
              'https://x.com/proteknologies',
              'https://instagram.com/proteknologies',
            ],
          })}
        </Script>
        {children}
      </body>
    </html>
  );
}
