import { PropsWithChildren, useState } from 'react'

import { UserType, SessionContext } from '../lib/session-context'
import { useLocalSession } from '../lib/use-local-session'

export const SessionContextProvider = (props: PropsWithChildren) => {
  const { children } = props

  const { getLocalSession, setLocalSession } = useLocalSession()
  const [session, setSession] = useState(getLocalSession())

  const handleSaveSession = (user: UserType | null) => {
    if (user?.firstName || user === null) {
      console.log('handleSaveSession', user)

      setSession(user)
      setLocalSession(user)
    }
  }

  return (
    <SessionContext.Provider value={{ session, setSession: handleSaveSession }}>
      {children}
    </SessionContext.Provider>
  )
}
