import { HTMLAttributes } from 'react'
import cn from 'classnames'

import cls from './card.module.scss'

export const Card = (props: HTMLAttributes<HTMLElement>) => {
  const { children, className, ...rest } = props

  const classes = cn(cls.card, className)

  return (
    <section className={classes} {...rest}>
      {children}
    </section>
  )
}
