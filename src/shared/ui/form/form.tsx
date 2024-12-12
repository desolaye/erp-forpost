import { FormHTMLAttributes } from 'react'
import cn from 'classnames'

import { Loader } from '../loader'
import { Button } from '../button'

import cls from './form.module.scss'
import { Text } from '../text'

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
  withButtons?: boolean
  withButtonsUp?: boolean
  pending?: boolean
  error?: boolean
  saveDisabled?: boolean
}

export const Form = (props: IFormProps) => {
  const {
    children,
    className,
    withButtons,
    saveDisabled,
    pending,
    error,
    withButtonsUp,
    ...rest
  } = props

  const classes = cn(cls.form, className)

  if (pending) return <Loader />

  return (
    <form className={classes} {...rest}>
      {withButtonsUp && (
        <footer className={cls.form__buttons}>
          <Button type="submit" full disabled={saveDisabled}>
            Сохранить
          </Button>
          <Button type="reset" full mode="secondary">
            Отменить
          </Button>
        </footer>
      )}

      {children}

      {error && (
        <Text weight="semi" color="error">
          Ошибка отправки формы
        </Text>
      )}

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
