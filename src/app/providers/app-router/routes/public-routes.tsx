import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import { LandingPage } from '@/pages/landing'
import { LoginPage } from '@/pages/login'

import { SuspenseProvider } from '../../suspense-provider'

const rootRoute = createRootRoute({
  component: Outlet,
})

const publicPaths = [
  {
    path: routesPath.landing,
    component: LandingPage,
  },
  {
    path: routesPath.login,
    component: LoginPage,
  },
]

const publucRoutes = publicPaths.map(({ component: Component, ...rest }) =>
  createRoute({
    path: rest.path(),
    getParentRoute: () => rootRoute,
    component: () => (
      <SuspenseProvider>
        <Component />
      </SuspenseProvider>
    ),
  }),
)

export { rootRoute, publucRoutes }
