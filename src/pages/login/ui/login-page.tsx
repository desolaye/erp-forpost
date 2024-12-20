import { useMemo } from 'react'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Form } from '@/shared/ui/form'

import { AuthLoginType } from '@/entities/session'
import { useAuthLogin } from '@/features/auth'

import cls from './login-page.module.scss'

const LoginPage = () => {
  const { errors, onSubmit, handleSubmit, register, isSubmitError, isPending } =
    useAuthLogin()

  const fields: { label: string; value: keyof AuthLoginType }[] = useMemo(
    () => [
      {
        label: 'Имя',
        value: 'firstName',
      },
      {
        label: 'Фамилия',
        value: 'lastName',
      },
      {
        label: 'Пароль',
        value: 'password',
      },
    ],
    [],
  )

  return (
    <article className={cls.login_page}>
      <Card style={{ minWidth: '768px', margin: '0 auto' }}>
        <Text tag="h1" size="lg" weight="semi" style={{ textAlign: 'center' }}>
          Вход в систему
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((v) => (
            <Input
              placeholder={v.label}
              label={v.label}
              isError={Boolean(errors[v.value])}
              helper={errors[v.value]?.message}
              type={v.value === 'password' ? 'password' : 'text'}
              {...register(v.value)}
            />
          ))}

          {isSubmitError && (
            <Text color="error">Неверное имя пользователя и/или пароль</Text>
          )}

          <Button disabled={isPending} type="submit">
            Войти
          </Button>
          <Text size="sm">
            Если у вас нет аккаунта, вы можете обратиться <br />к Евгению Скобкову или
            Луне Валк
          </Text>
        </Form>
      </Card>
    </article>
  )
}

export default LoginPage
