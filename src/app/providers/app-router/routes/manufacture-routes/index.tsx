import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import { ManufactureRoot } from '@/pages/manufacture/root'
import { ManufactureProcesses } from '@/pages/manufacture/processes'
import { ManufactureIssues } from '@/pages/manufacture/issues'

import { erpLayoutRoute } from '../private-routes'

const erpManufactureRoute = createRoute({
  path: routesPath.erp.manufacture.root(),
  getParentRoute: () => erpLayoutRoute,
})

const erpManualsIndexRoute = createRoute({
  path: '/',
  getParentRoute: () => erpManufactureRoute,
  component: ManufactureRoot,
})

const erpProcessesRoute = createRoute({
  path: routesPath.erp.manufacture.processes(),
  getParentRoute: () => erpManufactureRoute,
  component: ManufactureProcesses,
})

const erpIssuesRoute = createRoute({
  path: routesPath.erp.manufacture.issues(),
  getParentRoute: () => erpManufactureRoute,
  component: ManufactureIssues,
})

export const erpManufactures = erpManufactureRoute.addChildren([
  erpManualsIndexRoute,
  erpProcessesRoute,
  erpIssuesRoute,
])
