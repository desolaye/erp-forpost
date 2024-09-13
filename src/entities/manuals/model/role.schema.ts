import { z } from 'zod'

export const ZRole = z.object({
  id: z.string(),
  name: z.string(),
})

export type RoleType = z.infer<typeof ZRole>
