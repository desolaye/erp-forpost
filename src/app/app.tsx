import { SessionContextProvider } from '@/entities/session'

import { AppRouter } from './providers/app-router/app-router'
import { QueryProvider } from './providers/query-provider'
import { MyThemeProvider } from './providers/theme-provider'

import './styles/index.scss'

export const App = () => {
  return (
    <QueryProvider>
      <SessionContextProvider>
        <MyThemeProvider>
          <AppRouter />
        </MyThemeProvider>
      </SessionContextProvider>
    </QueryProvider>
  )
}
