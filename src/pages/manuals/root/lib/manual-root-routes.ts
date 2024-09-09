import { routesPath } from '@/shared/config/routes-path.config'

const { agents, products, root, staff, techMap, warehouses } = routesPath.erp.manuals

export const manualRootRoutes = [
  {
    route: agents(root()),
    title: 'Контрагенты',
  },
  {
    route: products(root()),
    title: 'Продукты',
  },
  {
    route: staff(root()),
    title: 'Сотрудники',
  },
  {
    route: techMap(root()),
    title: 'Технологические карты',
  },
  {
    route: warehouses(root()),
    title: 'Склады',
  },
]
