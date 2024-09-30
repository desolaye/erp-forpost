import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Form } from '@/shared/ui/form'

import { useAuthLogin } from '@/features/auth'

import cls from './login-page.module.scss'

const LoginPage = () => {
  const { errors, onSubmit, handleSubmit, register, error, isPending } = useAuthLogin()

  return (
    <article className={cls.login_page}>
      <Card style={{ minWidth: '768px', margin: '0 auto' }}>
        <Text tag="h1" size="lg" weight="semi" style={{ textAlign: 'center' }}>
          Вход в систему
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Имя"
            label="Имя"
            isError={Boolean(errors.firstName)}
            helper={errors.firstName?.message}
            {...register('firstName')}
          />
          <Input
            placeholder="Фамилия"
            label="Фамилия"
            isError={Boolean(errors.lastName)}
            helper={errors.lastName?.message}
            {...register('lastName')}
          />
          <Input
            placeholder="Пароль"
            label="Пароль"
            type="password"
            isError={Boolean(errors.password)}
            helper={errors.password?.message}
            {...register('password')}
          />
          {error && <Text color="error">Неверное имя пользователя и/или пароль</Text>}
          <Button disabled={isPending} type="submit">
            К системе
          </Button>
        </Form>
      </Card>
    </article>
  )
}

export default LoginPage
