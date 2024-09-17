import { HTMLAttributes } from 'react'
import cn from 'classnames'

import cls from './card.module.scss'

interface ICard extends HTMLAttributes<HTMLElement> {}

export const Card = (props: ICard) => {
  const { children, className, ...rest } = props

  const classes = cn(cls.card, className)

  return (
    <section className={classes} {...rest}>
      {children}
    </section>
  )
}
