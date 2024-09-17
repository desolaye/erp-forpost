import cn from 'classnames'

import { IButtonProps, modeStyle, cls } from './button.setup'

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
