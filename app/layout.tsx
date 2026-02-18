import ClarityProvider from "@/components/clarity-provider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vishnuraj Rajagopal | Full Stack + AI Engineering Lead",
    template: "%s | Full Stack + AI Engineering Lead"
  },
  description:
    "Modern portfolio of Vishnuraj Rajagopal - Full Stack + AI Engineering Lead based in Dubai, UAE.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://vishnuraj.me"
  ),
  openGraph: {
    title: "Vishnuraj Rajagopal Portfolio",
    description: "Full Stack + AI Engineering Lead | Dubai, UAE",
    type: "website",
    images: [
      {
        url: "/open-graph-banner.jpg",
        width: 1280,
        height: 720,
        alt: "Vishnuraj Rajagopal"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishnuraj Rajagopal Portfolio",
    description: "Full Stack + AI Engineering Lead | Dubai, UAE",
    images: ["/open-graph-banner.jpg"]
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
        <ClarityProvider>
          {children}
        </ClarityProvider>
        <Analytics />
      </body>
    </html>
  );
}
