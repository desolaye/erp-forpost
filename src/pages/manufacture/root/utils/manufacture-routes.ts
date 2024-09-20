import { routesPath } from '@/shared/config/routes-path.config'

const { root, processes, proddev } = routesPath.erp.manufacture

export const manufactureRoutes = [
  {
    route: processes(root()),
    title: 'Производственные процессы',
  },
  {
    route: proddev(root()),
    title: 'Продукты в разработке',
  },
]
