import { CSSProperties, PropsWithChildren } from 'react'

import cls from './page-wrapper.module.scss'

interface IPageWrapperProps {
  style?: CSSProperties
}

export const PageWrapper = (props: PropsWithChildren<IPageWrapperProps>) => {
  const { children, style } = props

  return (
    <article className={cls.page_wrapper} style={style}>
      {children}
    </article>
  )
}
