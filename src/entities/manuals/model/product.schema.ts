import { z } from 'zod'

export const ZProduct = z.object({
  id: z.string(),
  name: z.string(),
  purchased: z.boolean(),
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

export const ZProductByWarehouseValidator = z.object({
  productId: z.object({
    label: z.string(),
    value: z.string().uuid(),
  }),
  quantity: z.string().regex(/[0-9]+/gi),
})

export const ZProductByWarehouseToBack = ZProductByWarehouseValidator.transform(
  (data) => ({
    ...data,
    productId: data.productId.value,
  }),
)

export const ZProductValidator = z.object({
  name: z.string().min(3, 'Название продукта слишком короткое'),
  purchased: z.boolean(),
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
export type ProductByWarehouseValidatorType = z.infer<typeof ZProductByWarehouseValidator>
export type ProductByWarehouseToBackType = z.infer<typeof ZProductByWarehouseToBack>
export type ProductResponseType = z.infer<typeof ZProductResponse>
