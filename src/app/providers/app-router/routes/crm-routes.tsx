import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import { InvoicesPage } from '@/pages/crm/invoices'
import { IssuesHistoryPage } from '@/pages/crm/issues-history'
import { PriceListPage } from '@/pages/crm/price-list'

import { SuspenseProvider } from '../../suspense-provider'
import { erpLayoutRoute } from './private-routes'

const crmRoute = createRoute({
  path: routesPath.erp.crm.root(),
  getParentRoute: () => erpLayoutRoute,
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

export const erpCrm = crmRoute.addChildren(
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
