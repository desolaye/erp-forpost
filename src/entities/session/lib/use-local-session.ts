import { APP_VARS } from '@/shared/config/app-variables.config'
import { UserType, ZUser } from './session-context'

export const useLocalSession = () => {
  const getLocalSession = () => {
    const json = JSON.parse(localStorage.getItem(APP_VARS.USER) || '{}')
    const localCopy = ZUser.safeParse(json)

    return localCopy.success ? localCopy.data : null
  }

  const setLocalSession = (user: UserType | null) => {
    localStorage.setItem(APP_VARS.USER, JSON.stringify(user))
  }

  return { getLocalSession, setLocalSession }
}
