import { CSSProperties, PropsWithChildren } from 'react'

import { Text } from '@/shared/ui/text'
import cls from './page-wrapper.module.scss'

interface IPageWrapperProps {
  style?: CSSProperties
  title?: string
}

export const PageWrapper = (props: PropsWithChildren<IPageWrapperProps>) => {
  const { children, style, title } = props

  return (
    <article className={cls.page_wrapper} style={style}>
      {title && (
        <Text size="2xl" weight="semi">
          {title}
        </Text>
      )}

      {children}
    </article>
  )
}
