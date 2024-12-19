import { createRouter, RouterProvider } from '@tanstack/react-router'

import { erpHomeRoute, erpLayoutRoute } from './routes/private-routes'
import { publucRoutes, rootRoute } from './routes/public-routes'

import { createManualsRoutes } from './routes/manuals-routes'
import { createManufactureRoutes } from './routes/manufacture-routes'
import { createCrmRoutes } from './routes/crm-routes'
import { createWarehouseRoutes } from './routes/warehouse-routes'

const erpRouteTree = erpLayoutRoute.addChildren([
  erpHomeRoute,
  createManualsRoutes(erpLayoutRoute),
  createManufactureRoutes(erpLayoutRoute),
  createCrmRoutes(erpLayoutRoute),
  createWarehouseRoutes(erpLayoutRoute),
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
