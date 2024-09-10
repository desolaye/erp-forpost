import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'
import { ErpLayout } from '@/widgets/layouts/erp-layout'

import { ManualRootPage } from '@/pages/manuals/root'
import { ManualAgentsPage } from '@/pages/manuals/agents'
import { ManualProductsPage } from '@/pages/manuals/products'

import { rootRoute } from './public-routes'

const erpLayoutRoute = createRoute({
  id: 'erp',
  getParentRoute: () => rootRoute,
  component: ErpLayout,
})

const erpHomeRoute = createRoute({
  path: routesPath.erp.root(),
  getParentRoute: () => erpLayoutRoute,
  component: () => (
    <div>
      <main>erpHomeRoute</main>
    </div>
  ),
})

const erpManualsRoute = createRoute({
  path: routesPath.erp.manuals.root(),
  getParentRoute: () => erpLayoutRoute,
})

const erpManualsIndexRoute = createRoute({
  path: '/',
  getParentRoute: () => erpManualsRoute,
  component: ManualRootPage,
})

const erpManualsAgentsRoute = createRoute({
  path: routesPath.erp.manuals.agents(),
  getParentRoute: () => erpManualsRoute,
  component: ManualAgentsPage,
})

const erpManualsTechMapRoute = createRoute({
  path: routesPath.erp.manuals.techMap(),
  getParentRoute: () => erpManualsRoute,
  component: () => <div>TechMap manual</div>,
})

const erpManualsStaffRoute = createRoute({
  path: routesPath.erp.manuals.staff(),
  getParentRoute: () => erpManualsRoute,
  component: () => <div>staff manual</div>,
})

const erpManualsWarehousesRoute = createRoute({
  path: routesPath.erp.manuals.warehouses(),
  getParentRoute: () => erpManualsRoute,
  component: () => <div>warehouses manual</div>,
})

const erpManualsProductsRoute = createRoute({
  path: routesPath.erp.manuals.products(),
  getParentRoute: () => erpManualsRoute,
  component: ManualProductsPage,
})

export const erpManuals = erpManualsRoute.addChildren([
  erpManualsIndexRoute,
  erpManualsAgentsRoute,
  erpManualsTechMapRoute,
  erpManualsStaffRoute,
  erpManualsWarehousesRoute,
  erpManualsProductsRoute,
])

export { erpHomeRoute, erpLayoutRoute }
