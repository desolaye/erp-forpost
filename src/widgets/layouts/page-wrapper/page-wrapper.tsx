import { PropsWithChildren } from 'react'

import cls from './page-wrapper.module.scss'

export const PageWrapper = (props: PropsWithChildren) => {
  const { children } = props

  return <article className={cls.page_wrapper}>{children}</article>
}
