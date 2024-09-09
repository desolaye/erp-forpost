import { SessionContextProvider } from '@/entities/session'
import { AppRouter } from './providers/app-router/app-router'
import { QueryProvider } from './providers/query-provider'
import './styles/index.scss'

export const App = () => {
  return (
    <QueryProvider>
      <SessionContextProvider>
        <AppRouter />
      </SessionContextProvider>
    </QueryProvider>
  )
}
