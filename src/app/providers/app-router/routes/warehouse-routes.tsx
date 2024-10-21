import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import { WarehousesPage } from '@/pages/warehouses'
import { WarehouseProductsPage } from '@/pages/warehouse-products'
import { PurchaseHistoryPage } from '@/pages/purchase-history'

import { SuspenseProvider } from '../../suspense-provider'
import { erpLayoutRoute } from './private-routes'

const warehouseRoute = createRoute({
  path: routesPath.erp.warehouses.root(),
  getParentRoute: () => erpLayoutRoute,
})

const warehousePaths = [
  {
    path: '/',
    getParentRoute: () => warehouseRoute,
    component: () => <div>Root warehouse</div>,
  },
  {
    path: '/all',
    getParentRoute: () => warehouseRoute,
    component: WarehousesPage,
  },
  {
    path: routesPath.erp.warehouses.history(),
    getParentRoute: () => warehouseRoute,
    component: PurchaseHistoryPage,
  },
  {
    path: routesPath.erp.warehouses.products(),
    getParentRoute: () => warehouseRoute,
    component: WarehouseProductsPage,
  },
]

export const erpWarehouse = warehouseRoute.addChildren(
  warehousePaths.map(({ component: Component, getParentRoute, path }) =>
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
