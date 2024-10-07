import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'
import { ErpLayout } from '@/widgets/layouts/erp-layout'

import { HomePage } from '@/pages/home'

import { rootRoute } from './public-routes'
import { SuspenseProvider } from '../../suspense-provider'

const erpLayoutRoute = createRoute({
  id: 'erp',
  getParentRoute: () => rootRoute,
  component: ErpLayout,
})

const erpHomeRoute = createRoute({
  path: routesPath.erp.root(),
  getParentRoute: () => erpLayoutRoute,
  component: () => (
    <SuspenseProvider>
      <HomePage />
    </SuspenseProvider>
  ),
})

export { erpHomeRoute, erpLayoutRoute }
