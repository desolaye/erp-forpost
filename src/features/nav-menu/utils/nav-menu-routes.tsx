import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import WarehouseIcon from '@mui/icons-material/Warehouse'

import { routesPath } from '@/shared/config/routes-path.config'

export const navMenuRoutes = () => {
  const { manuals, manufacture } = routesPath.erp

  return [
    {
      icon: () => <HomeOutlinedIcon fontSize="large" />,
      to: routesPath.erp.root(),
      text: 'Главная',
    },
    {
      icon: () => <MenuBookOutlinedIcon fontSize="large" />,
      to: manuals.root(),
      text: 'Справочники',
      childs: [
        { text: 'Контрагенты', to: manuals.agents },
        { text: 'Продукты', to: manuals.products },
        { text: 'Сотрудники', to: manuals.staff },
        { text: 'Технологические карты', to: manuals.techMap },
        { text: 'Склады', to: manuals.warehouses },
      ],
    },
    {
      icon: () => <ConstructionOutlinedIcon fontSize="large" />,
      to: manufacture.root(),
      text: 'Панель производства',
      childs: [
        { text: 'Производственные процессы', to: manufacture.processes },
        { text: 'Продукты в разработке', to: manufacture.proddev },
      ],
    },
    {
      icon: () => <AssignmentOutlinedIcon fontSize="large" />,
      to: manufacture.issues(manufacture.root(), 'my'),
      text: 'Мои задачи',
    },
    {
      icon: () => <LocalAtmIcon fontSize="large" />,
      to: routesPath.erp.invoices.root(),
      text: 'Счета',
    },
    {
      icon: () => <WarehouseIcon fontSize="large" />,
      to: routesPath.erp.warehouses.root(),
      text: 'Склады',
    },
  ]
}
