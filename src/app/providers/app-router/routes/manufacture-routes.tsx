import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import { ManufactureRoot } from '@/pages/manufacture/root'
import { ManufactureProcesses } from '@/pages/manufacture/processes'
import { ManufactureIssues } from '@/pages/manufacture/issues'
import { ProductDevelop } from '@/pages/manufacture/product-develop'
import { ProductCompleted } from '@/pages/manufacture/product-completed'
import { ManufacturingOrders } from '@/pages/manufacture/orders'
import { MyIssues } from '@/pages/my-issues'

import { SuspenseProvider } from '../../suspense-provider'

const createManufactureRoutes = (layout: any) => {
  const manufactureRoute = createRoute({
    path: routesPath.erp.manufacture.root(),
    getParentRoute: () => layout,
  })

  const manufacturePaths = [
    {
      path: '/',
      component: ManufactureRoot,
    },
    {
      path: routesPath.erp.manufacture.orders(),
      component: ManufacturingOrders,
    },
    {
      path: routesPath.erp.manufacture.processes(),
      component: ManufactureProcesses,
    },
    {
      path: routesPath.erp.manufacture.issues('', 'my'),
      component: MyIssues,
    },
    {
      path: routesPath.erp.manufacture.issues(),
      component: ManufactureIssues,
    },
    {
      path: routesPath.erp.manufacture.proddev(),
      component: ProductDevelop,
    },
    {
      path: routesPath.erp.manufacture.proddevIssue(),
      component: ProductDevelop,
    },
    {
      path: routesPath.erp.manufacture.productCompleted(),
      component: ProductCompleted,
    },
  ]

  return manufactureRoute.addChildren(
    manufacturePaths.map(({ component: Component, path }) =>
      createRoute({
        getParentRoute: () => manufactureRoute,
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

export { createManufactureRoutes }
