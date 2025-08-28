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
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-recovery" strategy="afterInteractive">
          {`
            (function () {
              function setup() {
                var ni = (window as any).netlifyIdentity;
                if (!ni) return;
                ni.on('init', function(user){
                  var hash = window.location.hash || '';
                  if (!user && hash.indexOf('recovery_token=') !== -1) {
                    ni.open('recovery');
                  }
                });
                ni.init();
              }
              if (document.readyState !== 'loading') setup();
              else window.addEventListener('DOMContentLoaded', setup);
              var iv = setInterval(function(){
                if ((window as any).netlifyIdentity) { clearInterval(iv); setup(); }
              }, 500);
            })();
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
