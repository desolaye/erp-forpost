import { z } from 'zod'

export const ZProductAttribute = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  attributeId: z.string().uuid(),

  productName: z.string(),
  attributeName: z.string(),
  values: z.array(z.string()),
})

export type ProductAttributeType = z.infer<typeof ZProductAttribute>
