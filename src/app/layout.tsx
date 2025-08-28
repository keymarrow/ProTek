import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
