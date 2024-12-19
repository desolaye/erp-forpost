import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import { ManualStaffPage } from '@/pages/manuals/staff'
import { ManualTechcardsPage } from '@/pages/manuals/techcards'
import { ManualRootPage } from '@/pages/manuals/root'
import { ManualAgentsPage } from '@/pages/manuals/agents'
import { ManualProductsPage } from '@/pages/manuals/products'
import { ManualWarehousesPage } from '@/pages/manuals/warehouses'

import { SuspenseProvider } from '../../suspense-provider'

const createManualsRoutes = (layout: any) => {
  const erpManualsRoute = createRoute({
    path: routesPath.erp.manuals.root(),
    getParentRoute: () => layout,
  })

  const manualsPaths = [
    {
      path: '/',
      component: ManualRootPage,
    },
    {
      path: routesPath.erp.manuals.agents(),
      component: ManualAgentsPage,
    },
    {
      path: routesPath.erp.manuals.techMap(),
      component: ManualTechcardsPage,
    },
    {
      path: routesPath.erp.manuals.staff(),
      component: ManualStaffPage,
    },
    {
      path: routesPath.erp.manuals.warehouses(),
      component: ManualWarehousesPage,
    },
    {
      path: routesPath.erp.manuals.products(),
      component: ManualProductsPage,
    },
  ]

  return erpManualsRoute.addChildren(
    manualsPaths.map(({ component: Component, path }) =>
      createRoute({
        getParentRoute: () => erpManualsRoute,
        path,
        component: () => (
          <SuspenseProvider>
            <Component />
          </SuspenseProvider>
        ),
      }),
    ),
  )
}

export { createManualsRoutes }
