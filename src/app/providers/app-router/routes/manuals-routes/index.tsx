import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import { ManualStaffPage } from '@/pages/manuals/staff'
import { ManualTechcardsPage } from '@/pages/manuals/techcards'
import { ManualRootPage } from '@/pages/manuals/root'
import { ManualAgentsPage } from '@/pages/manuals/agents'
import { ManualProductsPage } from '@/pages/manuals/products'
import { ManualWarehousesPage } from '@/pages/manuals/warehouses'

import { erpLayoutRoute } from '../private-routes'
import { SuspenseProvider } from '@/app/providers/suspense-provider'

const erpManualsRoute = createRoute({
  path: routesPath.erp.manuals.root(),
  getParentRoute: () => erpLayoutRoute,
})

const manualsPaths = [
  {
    path: '/',
    getParentRoute: () => erpManualsRoute,
    component: ManualRootPage,
  },
  {
    path: routesPath.erp.manuals.agents(),
    getParentRoute: () => erpManualsRoute,
    component: ManualAgentsPage,
  },
  {
    path: routesPath.erp.manuals.techMap(),
    getParentRoute: () => erpManualsRoute,
    component: ManualTechcardsPage,
  },
  {
    path: routesPath.erp.manuals.staff(),
    getParentRoute: () => erpManualsRoute,
    component: ManualStaffPage,
  },
  {
    path: routesPath.erp.manuals.warehouses(),
    getParentRoute: () => erpManualsRoute,
    component: ManualWarehousesPage,
  },
  {
    path: routesPath.erp.manuals.products(),
    getParentRoute: () => erpManualsRoute,
    component: ManualProductsPage,
  },
]

export const erpManuals = erpManualsRoute.addChildren(
  manualsPaths.map(({ component: Component, getParentRoute, path }) =>
    createRoute({
      getParentRoute,
      path,
      component: () => (
        <SuspenseProvider>
          <Component />
        </SuspenseProvider>
      ),
    }),
  ),
)
