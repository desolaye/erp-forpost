import { Loader } from '../loader'
import { Text } from '../text'

import cls from './app-loader.module.scss'

export const AppLoader = () => {
  return (
    <div className={cls.app_loader}>
      <Text>Грузим страницу...</Text>
      <Loader />
    </div>
  )
}
