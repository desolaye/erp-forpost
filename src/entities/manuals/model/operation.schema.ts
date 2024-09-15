import { z } from 'zod'

export const ZOperation = z.object({
  name: z.string(),
  id: z.string(),
})

export type OperationType = z.infer<typeof ZOperation>
