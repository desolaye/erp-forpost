import { createRouter, RouterProvider } from '@tanstack/react-router'

import { erpHomeRoute, erpLayoutRoute, erpManuals } from './routes/private-routes'
import {
  landingRoute,
  loginRoute,
  registrationRoute,
  rootRoute,
} from './routes/public-routes'

const erpRouteTree = erpLayoutRoute.addChildren([erpHomeRoute, erpManuals])

const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  registrationRoute,
  erpRouteTree,
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
