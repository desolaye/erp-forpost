import { Component, ErrorInfo, ReactNode, Suspense } from 'react'

import cls from './error-boundary.module.scss'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { routesPath } from '@/shared/config/routes-path.config'
import { Link } from '@tanstack/react-router'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <Suspense fallback="">
          <div className={cls.error_boundary}>
            <Text size="lg" weight="semi">
              Что-то пошло не так...
            </Text>
            <Text>Мы уже работаем над устранением ошибки.</Text>
            <Text size="sm">
              Если желаете ускорить процесс - обратитесь к Павлу Мигранову или Павлу
              Попову с описанием ошибки
            </Text>
            <Link to={routesPath.erp.root()}>
              <Button mode="neutral">На главную</Button>
            </Link>
          </div>
        </Suspense>
      )
    }

    return children
  }
}

export { ErrorBoundary }
