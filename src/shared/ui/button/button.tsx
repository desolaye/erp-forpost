import { forwardRef } from 'react'
import cn from 'classnames'

import { IButtonProps, modeStyle, cls } from './button.setup'

export const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
  const { children, className, disabled, mode = 'primary', full, circle, ...rest } = props

  const classes = cn(
    cls.button,
    modeStyle[mode],
    { [cls.disabled]: disabled, [cls.full]: full, [cls.circle]: circle },
    className,
  )

  return (
    <button className={classes} disabled={disabled} ref={ref} {...rest}>
      {children}
    </button>
  )
})
