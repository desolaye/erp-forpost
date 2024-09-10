import { z } from 'zod'

export const ZProduct = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  cost: z.number(),
})

export const ZProductValidator = z.object({
  name: z.string().min(3),
  version: z.string().min(1),
})

export type ProductType = z.infer<typeof ZProduct>
export type ProductValidatorType = z.infer<typeof ZProductValidator>
