import { routesPath } from '@/shared/config/routes-path.config'

const { root, processes } = routesPath.erp.manufacture

export const manufactureRoutes = [
  {
    route: processes(root()),
    title: 'Производственные процессы',
  },
]
