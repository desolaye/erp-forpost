import { z } from 'zod'

export const ZAuthLogin = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  password: z.string().min(3).max(20),
})

export type AuthLoginType = z.infer<typeof ZAuthLogin>
