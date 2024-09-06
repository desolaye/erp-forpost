import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

import cls from './button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: IButtonProps) => {
  const { children, className, ...rest } = props

  const classes = cn(cls.button, cls.mode_primary, className)

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
