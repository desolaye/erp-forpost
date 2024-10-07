import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'
import { ErpLayout } from '@/widgets/layouts/erp-layout'

import { WarehousesPage } from '@/pages/warehouses'
import { WarehouseProductsPage } from '@/pages/warehouse-products'
import { HomePage } from '@/pages/home'

import { rootRoute } from './public-routes'

const erpLayoutRoute = createRoute({
  id: 'erp',
  getParentRoute: () => rootRoute,
  component: ErpLayout,
})

const erpHomeRoute = createRoute({
  path: routesPath.erp.root(),
  getParentRoute: () => erpLayoutRoute,
  component: HomePage,
})

const erpWarehousesRoute = createRoute({
  path: routesPath.erp.warehouses.root(),
  getParentRoute: () => erpLayoutRoute,
  component: WarehousesPage,
})

const erpWarehouseProductsRoute = createRoute({
  path: routesPath.erp.warehouses.products(routesPath.erp.warehouses.root()),
  getParentRoute: () => erpLayoutRoute,
  component: WarehouseProductsPage,
})

export { erpHomeRoute, erpLayoutRoute, erpWarehousesRoute, erpWarehouseProductsRoute }
