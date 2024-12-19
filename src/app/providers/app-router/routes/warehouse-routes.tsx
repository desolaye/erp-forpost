import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import { WarehousesPage } from '@/pages/warehouses'
import { WarehouseProductsPage } from '@/pages/warehouse-products'
import { PurchaseHistoryPage } from '@/pages/purchase-history'

import { SuspenseProvider } from '../../suspense-provider'

export const createWarehouseRoutes = (layout: any) => {
  const warehouseRoute = createRoute({
    path: routesPath.erp.warehouses.root(),
    getParentRoute: () => layout,
  })

  const warehousePaths = [
    {
      path: '/',
      component: () => <div>Root warehouse</div>,
    },
    {
      path: '/all',
      component: WarehousesPage,
    },
    {
      path: routesPath.erp.warehouses.history(),
      component: PurchaseHistoryPage,
    },
    {
      path: routesPath.erp.warehouses.products(),
      component: WarehouseProductsPage,
    },
  ]

  return warehouseRoute.addChildren(
    warehousePaths.map(({ component: Component, path }) =>
      createRoute({
        path,
        getParentRoute: () => warehouseRoute,
        component: () => (
          <SuspenseProvider>
            <Component />
          </SuspenseProvider>
        ),
      }),
    ),
  )
}
