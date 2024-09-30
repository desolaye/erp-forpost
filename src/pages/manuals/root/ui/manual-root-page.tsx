import { Card } from '@/shared/ui/card'
import { manualRootRoutes } from '../lib/manual-root-routes'
import cls from './manual-root-page.module.scss'
import { Link } from '@tanstack/react-router'
import { Text } from '@/shared/ui/text'

const ManualRootPage = () => {
  return (
    <article className={cls.manual_root}>
      <Card>
        <Text size="xl">Текущие справочники:</Text>
        {manualRootRoutes.map((v) => (
          <Link to={v.route} key={v.route}>
            <Text link color="primary">
              {v.title}
            </Text>
          </Link>
        ))}
      </Card>
    </article>
  )
}

export default ManualRootPage
