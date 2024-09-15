import { UserType, ZUser } from './session-context'

export const useLocalSession = () => {
  const getLocalSession = () => {
    const json = JSON.parse(localStorage.getItem('user') || '{}')
    const localCopy = ZUser.safeParse(json)

    return localCopy.success ? localCopy.data : null
  }

  const setLocalSession = (user: UserType | null) => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  return { getLocalSession, setLocalSession }
}
