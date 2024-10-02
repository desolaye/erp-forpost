import { z } from 'zod'

export const ZProduct = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  cost: z.number(),
})

const ZProductByWarehouse = z.object({
  productId: z.string().uuid(),
  storageId: z.string().uuid(),
  storageName: z.string(),
  productName: z.string(),
  quantity: z.number(),
})

export const ZProductValidator = z.object({
  name: z.string().min(3, 'Название продукта слишком короткое'),
})

export const ZProductByWarehouseResponse = z.object({
  products: z.array(ZProductByWarehouse),
  totalCount: z.number(),
})

export const ZProductResponse = z.object({
  products: z.array(ZProduct),
  totalCount: z.number(),
})

export type ProductType = z.infer<typeof ZProduct>
export type ProductByWarehouseType = z.infer<typeof ZProductByWarehouse>
export type ProductByWarehouseResponseType = z.infer<typeof ZProductByWarehouseResponse>
export type ProductValidatorType = z.infer<typeof ZProductValidator>
export type ProductResponseType = z.infer<typeof ZProductResponse>
