import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'
import { LandingPage } from '@/pages/landing'
import { LoginPage } from '@/pages/login'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const landingRoute = createRoute({
  path: routesPath.landing(),
  getParentRoute: () => rootRoute,
  component: LandingPage,
})

const loginRoute = createRoute({
  path: routesPath.login(),
  getParentRoute: () => rootRoute,
  component: LoginPage,
})

const registrationRoute = createRoute({
  path: routesPath.registration(),
  getParentRoute: () => rootRoute,
  component: () => <div>registration page</div>,
})

export { rootRoute, landingRoute, loginRoute, registrationRoute }
