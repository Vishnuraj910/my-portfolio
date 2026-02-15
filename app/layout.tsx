import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: {
    default: "Vishnuraj Rajagopal | Full Stack + AI Engineering Lead",
    template: "%s | Full Stack + AI Engineering Lead"
  },
  description:
    "Modern portfolio of Vishnuraj Rajagopal - Full Stack + AI Engineering Lead based in Dubai, UAE.",
  metadataBase: new URL("https://portfolio.example.com"),
  openGraph: {
    title: "Vishnuraj Rajagopal Portfolio",
    description: "Full Stack + AI Engineering Lead | Dubai, UAE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishnuraj Rajagopal Portfolio",
    description: "Full Stack + AI Engineering Lead | Dubai, UAE"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const stored = localStorage.getItem('theme'); const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const theme = stored || (systemDark ? 'dark' : 'light'); document.documentElement.dataset.theme = theme; } catch(e) {} })();`
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
