import { FormHTMLAttributes } from 'react'
import cn from 'classnames'

import cls from './form.module.scss'
import { Button } from '../button'

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
  withButtons?: boolean
  saveDisabled?: boolean
}

export const Form = (props: IFormProps) => {
  const { children, className, withButtons, saveDisabled, ...rest } = props

  const classes = cn(cls.form, className)

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
