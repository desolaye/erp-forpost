import { createRouter, RouterProvider } from '@tanstack/react-router'

import {
  erpHomeRoute,
  erpLayoutRoute,
  erpWarehouseProductsRoute,
  erpWarehousesRoute,
} from './routes/private-routes'

import { erpManuals } from './routes/manuals-routes'
import { erpManufactures } from './routes/manufacture-routes'
import { erpCrm } from './routes/crm-routes'

import { landingRoute, loginRoute, rootRoute } from './routes/public-routes'

const erpRouteTree = erpLayoutRoute.addChildren([
  erpHomeRoute,
  erpManuals,
  erpManufactures,
  erpCrm,
  erpWarehousesRoute,
  erpWarehouseProductsRoute,
])

const routeTree = rootRoute.addChildren([landingRoute, loginRoute, erpRouteTree])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
