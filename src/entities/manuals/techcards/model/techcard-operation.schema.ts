import { z } from 'zod'

export const ZTechcardOperation = z.object({
  id: z.string().uuid(),
  techCardId: z.string().uuid(),
  operationId: z.string().uuid(),

  operationName: z.string(),
  description: z.string().nullable(),
  techCardNumber: z.string(),
  number: z.number(),
})

export type TechcardOperationType = z.infer<typeof ZTechcardOperation>
