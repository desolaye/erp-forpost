import { HTMLAttributes } from 'react'

import cls from './card.module.scss'
import cn from 'classnames'

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
