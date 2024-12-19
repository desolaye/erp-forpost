import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import { InvoicesPage } from '@/pages/crm/invoices'
import { IssuesHistoryPage } from '@/pages/crm/issues-history'
import { PriceListPage } from '@/pages/crm/price-list'

import { SuspenseProvider } from '../../suspense-provider'

const createCrmRoutes = (layout: any) => {
  const crmRoute = createRoute({
    path: routesPath.erp.crm.root(),
    getParentRoute: () => layout,
  })

  const crmPaths = [
    {
      path: '/',
      component: () => <div>Root crm</div>,
    },
    {
      path: routesPath.erp.crm.invoices(),
      component: InvoicesPage,
    },
    {
      path: routesPath.erp.crm.issuesHistory(),
      component: IssuesHistoryPage,
    },
    {
      path: routesPath.erp.crm.priceLists(),
      component: PriceListPage,
    },
  ]

  return crmRoute.addChildren(
    crmPaths.map(({ component: Component, path }) =>
      createRoute({
        getParentRoute: () => crmRoute,
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

export { createCrmRoutes }
