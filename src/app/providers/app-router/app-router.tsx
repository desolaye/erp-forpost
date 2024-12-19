import { createRouter, RouterProvider } from '@tanstack/react-router'

import { erpHomeRoute, erpLayoutRoute } from './routes/private-routes'

import { erpManuals } from './routes/manuals-routes'
import { erpManufactures } from './routes/manufacture-routes'
import { erpCrm } from './routes/crm-routes'
import { erpWarehouse } from './routes/warehouse-routes'

import { publucRoutes, rootRoute } from './routes/public-routes'

const erpRouteTree = erpLayoutRoute.addChildren([
  erpHomeRoute,
  erpManuals,
  erpManufactures,
  erpCrm,
  erpWarehouse,
])

const routeTree = rootRoute.addChildren([...publucRoutes, erpRouteTree])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
