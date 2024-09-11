import { z } from 'zod'

const ZTechcardStep = z.object({
  operationName: z.string(),
  techCardId: z.string(),
  description: z.string().nullable(),
  duration: z.string(),
  cost: z.number(),
  unitOfMeasure: z.number(),
})

const ZTechcardItem = z.object({
  productName: z.string(),
  techCardId: z.string(),
  productId: z.string(),
  quantity: z.number(),
})

export const ZTechcard = z.object({
  id: z.string(),
  number: z.string(),
  description: z.string().nullable(),
})

export const ZTechcardFull = ZTechcard.extend({
  steps: z.array(ZTechcardStep),
  items: z.array(ZTechcardItem),
})

export type TechcardType = z.infer<typeof ZTechcard>
export type TechcardFullType = z.infer<typeof ZTechcardFull>
