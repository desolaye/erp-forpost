import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

import cls from './button.module.scss'

type ButtonMode = 'primary' | 'table'

const modeStyle: Record<ButtonMode, string> = {
  primary: cls.mode_primary,
  table: cls.mode_table,
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: ButtonMode
}

export const Button = (props: IButtonProps) => {
  const { children, className, disabled, mode = 'primary', ...rest } = props

  const classes = cn(cls.button, modeStyle[mode], { [cls.disabled]: disabled }, className)

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
