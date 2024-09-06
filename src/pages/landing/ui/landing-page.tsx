import { Link } from '@tanstack/react-router'

import { routesPath } from '@/shared/config/routes-path.config'

import cls from './landing-page.module.scss'
import { Button } from '@/shared/ui/button'

export const LandingPage = () => {
  return (
    <article className={cls.landing_page}>
      <section className={cls.landing_page__section}>
        <h1 className={cls.landing_page__title}>ERP-ФОРПОСТ</h1>
        <h2 className={cls.landing_page__subtitle}>
          Система управления и автоматизации производства
        </h2>
        <Link to={routesPath.login()} className={cls.landing_page__link}>
          <Button>Войти в систему</Button>
        </Link>
      </section>
    </article>
  )
}
