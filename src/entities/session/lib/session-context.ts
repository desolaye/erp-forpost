import { createContext } from 'react'
import { z } from 'zod'

export const ZUser = z.object({
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
})

export type UserType = z.infer<typeof ZUser>

export interface UserSessionContext {
  session: UserType | null
  setSession: (user: UserType | null) => void
}

export const SessionContext = createContext<UserSessionContext>({
  session: null,
  setSession: () => {},
})
