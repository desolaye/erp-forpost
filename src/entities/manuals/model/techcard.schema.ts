import { z } from 'zod'

const ZTechcardStep = z.object({
  id: z.string().uuid(),
  operationName: z.string(),
  techCardId: z.string(),
  description: z.string().nullable(),
  duration: z.string(),
  cost: z.number(),
  unitOfMeasure: z.number(),
  productCompositionSettingFlag: z.boolean(),
})

const ZTechcardItem = z.object({
  id: z.string(),
  productName: z.string(),
  techCardId: z.string(),
  productId: z.string(),
  quantity: z.number(),
})

export const ZTechcard = z.object({
  id: z.string(),
  number: z.string(),
  description: z.string().nullable(),
  productId: z.string(),
  productName: z.string(),
})

export const ZTechcardFull = ZTechcard.extend({
  steps: z.array(ZTechcardStep),
  items: z.array(ZTechcardItem),
})

export const ZTechcardResponse = z.object({
  techCards: z.array(ZTechcard),
  totalCount: z.number(),
})

export const ZTechcardValidator = z.object({
  number: z.string(),
  description: z.string().nullable(),

  productId: z.object({
    value: z.string().uuid(),
    label: z.string(),
  }),
})

export type TechcardType = z.infer<typeof ZTechcard>
export type TechcardFullType = z.infer<typeof ZTechcardFull>
export type TechcardResponseType = z.infer<typeof ZTechcardResponse>
export type TechcardStepType = z.infer<typeof ZTechcardStep>
export type TechcardItemType = z.infer<typeof ZTechcardItem>
export type TechcardValidatorType = z.infer<typeof ZTechcardValidator>
