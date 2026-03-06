import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async () => {
    // Get browser language
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0]
      const supportedLangs = ['en', 'ar', 'es', 'fr', 'hi', 'ml']
      if (supportedLangs.includes(browserLang) && browserLang !== 'en') {
        throw redirect({ to: '/$locale', params: { locale: browserLang } })
      }
    }
    throw redirect({ to: '/$locale', params: { locale: 'en' } })
  },
})
