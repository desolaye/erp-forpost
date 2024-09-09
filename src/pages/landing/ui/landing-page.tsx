import { Link } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import cls from './landing-page.module.scss'
import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

export const LandingPage = () => {
  return (
    <article className={cls.landing_page}>
      <section className={cls.landing_page__section}>
        <Text tag="h1" size="8xl" weight="semi">
          ERP-ФОРПОСТ
        </Text>
        <Text tag="h2" size="4xl">
          Система управления и автоматизации производства
        </Text>
        <Link to={routesPath.login()} className={cls.landing_page__link}>
          <Button>Войти в систему</Button>
        </Link>
      </section>
    </article>
  )
}
