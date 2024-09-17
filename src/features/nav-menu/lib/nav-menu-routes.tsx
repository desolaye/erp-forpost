import { routesPath } from '@/shared/config/routes-path.config'
import { BookIcon } from '@/shared/ui/icons/book-icon'
import { HomeIcon } from '@/shared/ui/icons/home-icon'

export const navMenuRoutes = [
  {
    icon: () => <HomeIcon height={32} width={32} />,
    to: routesPath.erp.root(),
    text: 'Главная',
  },
  {
    icon: () => <BookIcon height={32} width={32} />,
    to: routesPath.erp.manuals.root(),
    text: 'Справочники',
  },
]
