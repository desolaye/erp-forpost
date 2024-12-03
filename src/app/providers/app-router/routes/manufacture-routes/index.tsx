import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import { ManufactureRoot } from '@/pages/manufacture/root'
import { ManufactureProcesses } from '@/pages/manufacture/processes'
import { ManufactureIssues } from '@/pages/manufacture/issues'
import { ProductDevelop } from '@/pages/manufacture/product-develop'
import { ProductCompleted } from '@/pages/manufacture/product-completed'
import { ManufacturingOrders } from '@/pages/manufacture/orders'
import { MyIssues } from '@/pages/my-issues'

import { SuspenseProvider } from '@/app/providers/suspense-provider'
import { erpLayoutRoute } from '../private-routes'

const manufactureRoute = createRoute({
  path: routesPath.erp.manufacture.root(),
  getParentRoute: () => erpLayoutRoute,
})

const manufacturePaths = [
  {
    path: '/',
    getParentRoute: () => manufactureRoute,
    component: ManufactureRoot,
  },
  {
    path: routesPath.erp.manufacture.orders(),
    getParentRoute: () => manufactureRoute,
    component: ManufacturingOrders,
  },
  {
    path: routesPath.erp.manufacture.processes(),
    getParentRoute: () => manufactureRoute,
    component: ManufactureProcesses,
  },
  {
    path: routesPath.erp.manufacture.issues('', 'my'),
    getParentRoute: () => manufactureRoute,
    component: MyIssues,
  },
  {
    path: routesPath.erp.manufacture.issues(),
    getParentRoute: () => manufactureRoute,
    component: ManufactureIssues,
  },
  {
    path: routesPath.erp.manufacture.proddev(),
    getParentRoute: () => manufactureRoute,
    component: ProductDevelop,
  },
  {
    path: routesPath.erp.manufacture.proddevIssue(),
    getParentRoute: () => manufactureRoute,
    component: ProductDevelop,
  },
  {
    path: routesPath.erp.manufacture.productCompleted(),
    getParentRoute: () => manufactureRoute,
    component: ProductCompleted,
  },
]

export const erpManufactures = manufactureRoute.addChildren(
  manufacturePaths.map(({ component: Component, getParentRoute, path }) =>
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
