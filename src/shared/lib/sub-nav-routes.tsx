import { routesPath } from '../config/routes-path.config'
import { BxHomeIcon } from '../ui/icons/bx-home-icon'

export const subNavRoutes = [
  {
    icon: () => <BxHomeIcon height={32} width={32} />,
    to: routesPath.erp.root(),
    text: 'Главная',
  },
  {
    icon: () => <BxHomeIcon height={32} width={32} />,
    to: routesPath.erp.products(),
    text: 'Продукты',
  },
]
