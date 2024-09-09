import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

import cls from './button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: IButtonProps) => {
  const { children, className, disabled, ...rest } = props

  const classes = cn(
    cls.button,
    cls.mode_primary,
    { [cls.disabled]: disabled },
    className,
  )

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
