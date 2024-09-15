import { z } from 'zod'

export const ZItemValidator = z.object({
  quantity: z.string().regex(/[0-9]+/gi),
  productId: z.object({
    value: z.string().uuid(),
    label: z.string(),
  }),
})

export type ItemValidatorType = z.infer<typeof ZItemValidator>
