import { createRouter, RouterProvider } from '@tanstack/react-router'

import { erpHomeRoute, erpInvoicesRoute, erpLayoutRoute } from './routes/private-routes'
import { erpManuals } from './routes/manuals-routes'
import { erpManufactures } from './routes/manufacture-routes'

import {
  landingRoute,
  loginRoute,
  registrationRoute,
  rootRoute,
} from './routes/public-routes'

const erpRouteTree = erpLayoutRoute.addChildren([
  erpHomeRoute,
  erpManuals,
  erpManufactures,
  erpInvoicesRoute,
])

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
