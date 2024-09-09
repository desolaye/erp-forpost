import { forwardRef, InputHTMLAttributes } from 'react'
import cn from 'classnames'

import { Text } from '../text'
import cls from './input.module.scss'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean
  label?: string
  helper?: string
}

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { isError, label, helper, className, ...rest } = props

  const classes = cn(cls.input, { [cls.error]: isError }, className)
  const helperClasses = cn(cls.input__helper, { [cls.error]: isError })

  return (
    <div className={cls.input__wrapper}>
      {label && <Text>{label}</Text>}
      <input className={classes} ref={ref} {...rest} />
      {helper && (
        <Text size="sm" className={helperClasses}>
          {helper}
        </Text>
      )}
    </div>
  )
})
