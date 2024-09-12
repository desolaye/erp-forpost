import { FormHTMLAttributes } from 'react'
import cls from './form.module.scss'
import cn from 'classnames'

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {}

export const Form = (props: IFormProps) => {
  const { children, className, ...rest } = props

  const classes = cn(cls.form, className)

  return (
    <form className={classes} {...rest}>
      {children}
    </form>
  )
}
