import { Card } from '@/shared/ui/card'
import { manualRootRoutes } from '../lib/manual-root-routes'
import cls from './manual-root-page.module.scss'

export const ManualRootPage = () => {
  return (
    <article className={cls.manual_root}>
      {manualRootRoutes.map((v) => (
        <Card key={v.title}>{v.title}</Card>
      ))}
    </article>
  )
}
