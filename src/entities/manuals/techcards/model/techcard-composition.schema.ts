import { z } from 'zod'
import { ZTechcardItem } from './techcard-item.schema'

export const ZTechcardComposition = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),

  number: z.string(),
  description: z.string().nullable(),
  productName: z.string(),

  items: z.array(ZTechcardItem),
})

export type TechcardsCompositionType = z.infer<typeof ZTechcardComposition>
