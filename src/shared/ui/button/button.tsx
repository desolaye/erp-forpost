import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

import cls from './button.module.scss'

type ButtonMode = 'primary' | 'table' | 'secondary' | 'neutral'

const modeStyle: Record<ButtonMode, string> = {
  primary: cls.mode_primary,
  table: cls.mode_table,
  secondary: cls.mode_secondary,
  neutral: cls.mode_neutral,
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: ButtonMode
  full?: boolean
}

export const Button = (props: IButtonProps) => {
  const { children, className, disabled, mode = 'primary', full, ...rest } = props

  const classes = cn(
    cls.button,
    modeStyle[mode],
    { [cls.disabled]: disabled, [cls.full]: full },
    className,
  )

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
