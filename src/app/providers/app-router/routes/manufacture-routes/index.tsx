import { createRoute } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import { ManufactureRoot } from '@/pages/manufacture/root'
import { ManufactureProcesses } from '@/pages/manufacture/processes'
import { ManufactureIssues } from '@/pages/manufacture/issues'
import { ProductDevelop } from '@/pages/manufacture/product-develop'
import { MyIssues } from '@/pages/my-issues'

import { erpLayoutRoute } from '../private-routes'

const manufactureRoute = createRoute({
  path: routesPath.erp.manufacture.root(),
  getParentRoute: () => erpLayoutRoute,
})

const manualsIndexRoute = createRoute({
  path: '/',
  getParentRoute: () => manufactureRoute,
  component: ManufactureRoot,
})

const processesRoute = createRoute({
  path: routesPath.erp.manufacture.processes(),
  getParentRoute: () => manufactureRoute,
  component: ManufactureProcesses,
})

const myIssuesRoute = createRoute({
  path: routesPath.erp.manufacture.issues('', 'my'),
  getParentRoute: () => manufactureRoute,
  component: MyIssues,
})

const issuesRoute = createRoute({
  path: routesPath.erp.manufacture.issues(),
  getParentRoute: () => manufactureRoute,
  component: ManufactureIssues,
})

const productDevelopRoute = createRoute({
  path: routesPath.erp.manufacture.proddev(),
  getParentRoute: () => manufactureRoute,
  component: ProductDevelop,
})

const productDevelopByIssueRoute = createRoute({
  path: routesPath.erp.manufacture.proddevIssue(),
  getParentRoute: () => manufactureRoute,
  component: ProductDevelop,
})

export const erpManufactures = manufactureRoute.addChildren([
  manualsIndexRoute,
  processesRoute,
  myIssuesRoute,
  issuesRoute,
  productDevelopRoute,
  productDevelopByIssueRoute,
])
