import { z } from 'zod'

export const ZProductStructure = z.object({
  productDevelopmentId: z.string().uuid(),
  completedProductsId: z.array(z.string().uuid()),
})

const ZCompletedProduct = z.object({
  value: z.string().uuid(),
  label: z.string(),
})

export const ZProductStructureValidator = z.object({
  productDevelopmentId: z.string().uuid(),
  completedProductsId: z.array(ZCompletedProduct),
})

export type ProductStructureType = z.infer<typeof ZProductStructure>
export type ProductStructureValidatorType = z.infer<typeof ZProductStructureValidator>
