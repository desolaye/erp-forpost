import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'
import { ErpLayout } from '@/widgets/layouts/erp-layout'

import { InvoicesPage } from '@/pages/invoices'
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
      <main>Домашняя страница ERP системы. Пока что пусто</main>
    </div>
  ),
})

const erpInvoicesRoute = createRoute({
  path: routesPath.erp.invoices.root(),
  getParentRoute: () => erpLayoutRoute,
  component: InvoicesPage,
})

export { erpHomeRoute, erpLayoutRoute, erpInvoicesRoute }
