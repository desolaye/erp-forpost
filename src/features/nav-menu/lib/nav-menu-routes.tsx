import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'

import { routesPath } from '@/shared/config/routes-path.config'
export const navMenuRoutes = [
  {
    icon: () => <HomeOutlinedIcon fontSize="large" />,
    to: routesPath.erp.root(),
    text: 'Главная',
  },
  {
    icon: () => <MenuBookOutlinedIcon fontSize="large" />,
    to: routesPath.erp.manuals.root(),
    text: 'Справочники',
  },
  {
    icon: () => <ConstructionOutlinedIcon fontSize="large" />,
    to: routesPath.erp.manufacture.root(),
    text: 'Панель производства',
  },
  {
    icon: () => <AssignmentOutlinedIcon fontSize="large" />,
    to: routesPath.erp.manufacture.issues(routesPath.erp.manufacture.root(), 'my'),
    text: 'Мои задачи',
  },
]
