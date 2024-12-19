import { SessionContextProvider } from '@/entities/session'

import { ErrorBoundary } from './providers/error-boundary'
import { QueryProvider } from './providers/query-provider'
import { ThemeProvider } from './providers/theme-provider'
import { AppRouter } from './providers/app-router'

import './styles/index.scss'

export const App = () => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <SessionContextProvider>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </SessionContextProvider>
      </QueryProvider>
    </ErrorBoundary>
  )
}
