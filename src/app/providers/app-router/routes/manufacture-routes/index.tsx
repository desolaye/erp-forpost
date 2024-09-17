import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'
import { ManufactureRoot } from '@/pages/manufacture/root'

import { erpLayoutRoute } from '../private-routes'
import { ManufactureProcesses } from '@/pages/manufacture/processes'

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

export const erpManufactures = erpManufactureRoute.addChildren([
  erpManualsIndexRoute,
  erpProcessesRoute,
])
