import { createFileRoute } from '@tanstack/react-router'
import { PortfolioPage } from '../components/portfolio-page'
import { isLocale, locales } from '../lib/i18n'
import { getMessages } from '../lib/messages'

const validLocales = locales as readonly string[]

export const Route = createFileRoute('/$locale')({
  beforeLoad: async ({ params }) => {
    const { locale } = params

    // If locale param is "api" or starts with "api", skip this route
    if (locale === 'api' || locale.startsWith('api')) {
      throw Object.assign(new Error('Not Found'), { _skipRouteMatch: true })
    }

    if (!isLocale(locale)) {
      throw new Error(` Invalid locale: ${locale}`)
    }
  },
  loader: async ({ params }) => {
    const { locale } = params
    return {
      locale: locale as typeof validLocales[number],
      messages: getMessages(locale as typeof validLocales[number]),
    }
  },
  component: LocalePage,
})

function LocalePage() {
  const { locale, messages } = Route.useLoaderData()
  return <PortfolioPage locale={locale} messages={messages} />
}
