import { forwardRef, InputHTMLAttributes } from 'react'
import cn from 'classnames'

import { Text } from '../text'
import cls from './input.module.scss'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean
  label?: string
  helper?: string
  full?: boolean
}

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { isError, label, helper, className, full, autoComplete, ...rest } = props

  const classes = cn(cls.input, { [cls.error]: isError }, className)
  const helperClasses = cn(cls.input__helper, { [cls.error]: isError })
  const wrapperClasses = cn(cls.input__wrapper, { [cls.full]: full })

  return (
    <div className={wrapperClasses}>
      {label && <Text>{label}</Text>}

      <input
        className={classes}
        ref={ref}
        autoComplete={autoComplete || 'off'}
        {...rest}
      />

      {helper && (
        <Text size="sm" className={helperClasses}>
          {helper}
        </Text>
      )}
    </div>
  )
})
