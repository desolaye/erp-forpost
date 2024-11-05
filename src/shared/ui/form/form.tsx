import { FormHTMLAttributes } from 'react'
import cn from 'classnames'

import { Loader } from '../loader'
import { Button } from '../button'

import cls from './form.module.scss'

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
  withButtons?: boolean
  pending?: boolean
  saveDisabled?: boolean
}

export const Form = (props: IFormProps) => {
  const { children, className, withButtons, saveDisabled, pending, ...rest } = props

  const classes = cn(cls.form, className)

  if (pending) return <Loader />

  return (
    <form className={classes} {...rest}>
      {children}

      {withButtons && (
        <footer className={cls.form__buttons}>
          <Button type="submit" full disabled={saveDisabled}>
            Сохранить
          </Button>
          <Button type="reset" full mode="secondary">
            Отменить
          </Button>
        </footer>
      )}
    </form>
  )
}
