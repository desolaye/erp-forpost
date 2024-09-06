import { Link } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

import cls from './login-page.module.scss'

export const LoginPage = () => {
  return (
    <article className={cls.login_page}>
      <Card style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>Вход в систему</h1>
        <Link to={routesPath.erp.root()} className={cls.login_page__link}>
          <Button>К системе</Button>
        </Link>
      </Card>
    </article>
  )
}
