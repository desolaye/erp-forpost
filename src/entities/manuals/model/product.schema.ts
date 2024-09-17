import { z } from 'zod'

export const ZProduct = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  cost: z.number(),
})

export const ZProductValidator = z.object({
  name: z.string().min(3, 'Название продукта слишком короткое'),
})

export const ZProductResponse = z.object({
  products: z.array(ZProduct),
  totalCount: z.number(),
})

export type ProductType = z.infer<typeof ZProduct>
export type ProductValidatorType = z.infer<typeof ZProductValidator>
export type ProductResponseType = z.infer<typeof ZProductResponse>
