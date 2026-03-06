import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import '../globals.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Vishnuraj Rajagopal | Full Stack + AI Engineering Lead',
      },
      {
        name: 'description',
        content: 'Modern portfolio of Vishnuraj Rajagopal - Full Stack + AI Engineering Lead based in Dubai, UAE.',
      },
      {
        property: 'og:title',
        content: 'Vishnuraj Rajagopal Portfolio',
      },
      {
        property: 'og:description',
        content: 'Full Stack + AI Engineering Lead | Dubai, UAE',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const stored = localStorage.getItem('theme'); const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const theme = stored || (systemDark ? 'dark' : 'light'); document.documentElement.dataset.theme = theme; } catch(e) {} })();`,
          }}
        />
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
