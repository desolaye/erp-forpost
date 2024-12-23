import { z } from 'zod'

export const ZOperation = z.object({
  id: z.string().uuid(),
  name: z.string(),
  desciption: z.string().nullable(),
  type: z.object({
    value: z.number(),
    name: z.string(),
  }),
})

export type OperationType = z.infer<typeof ZOperation>
