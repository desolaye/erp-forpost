import { SessionContextProvider } from '@/entities/session'

import { AppRouter } from './providers/app-router/app-router'
import { QueryProvider } from './providers/query-provider'
import { MyThemeProvider } from './providers/theme-provider'
import { ErrorBoundary } from './providers/error-boundary'

import './styles/index.scss'

export const App = () => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <SessionContextProvider>
          <MyThemeProvider>
            <AppRouter />
          </MyThemeProvider>
        </SessionContextProvider>
      </QueryProvider>
    </ErrorBoundary>
  )
}
