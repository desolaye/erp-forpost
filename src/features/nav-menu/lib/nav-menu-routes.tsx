import { routesPath } from '@/shared/config/routes-path.config'
import { BxBookIcon } from '@/shared/ui/icons/bx-book-icon'
import { BxHomeIcon } from '@/shared/ui/icons/bx-home-icon'

export const navMenuRoutes = [
  {
    icon: () => <BxHomeIcon height={32} width={32} />,
    to: routesPath.erp.root(),
    text: 'Главная',
  },
  {
    icon: () => <BxBookIcon height={32} width={32} />,
    to: routesPath.erp.manuals.root(),
    text: 'Справочники',
  },
]
