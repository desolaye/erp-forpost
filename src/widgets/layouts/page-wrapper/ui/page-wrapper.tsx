import { CSSProperties, PropsWithChildren } from 'react'
import cn from 'classnames'

import { Text } from '@/shared/ui/text'

import cls from './page-wrapper.module.scss'

interface IPageWrapperProps {
  style?: CSSProperties
  title?: string
  classNames?: string
}

export const PageWrapper = (props: PropsWithChildren<IPageWrapperProps>) => {
  const { children, style, title, classNames } = props

  const classes = cn(cls.page_wrapper, classNames)

  return (
    <article className={classes} style={style}>
      {title && (
        <Text size="2xl" weight="semi">
          {title}
        </Text>
      )}

      {children}
    </article>
  )
}
