import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultNotFoundComponent: () => {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>404 - Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
        </div>
      )
    },
  })

  return router
}

export function createRouter() {
  return getRouter()
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
