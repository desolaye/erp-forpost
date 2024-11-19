import { z } from 'zod'

export const ZProduct = z.object({
  id: z.string().uuid(),
  name: z.string(),
  purchased: z.boolean(),
  categoryId: z.string().uuid(),
  categoryName: z.string(),

  // updatedAt: z.string(),
})

export const ZProductValidator = z.object({
  name: z.string().min(3, 'Название продукта слишком короткое'),
  purchased: z.boolean(),
  categoryId: z.object({
    label: z.string(),
    value: z.string().uuid(),
  }),
})

export const ZProductToBack = ZProductValidator.transform((data) => ({
  ...data,
  categoryId: data.categoryId.value,
}))

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

export const ZProductByWarehouseResponse = z.object({
  products: z.array(ZProductByWarehouse),
  totalCount: z.number(),
})

export const ZProductResponse = z.object({
  items: z.array(ZProduct),
  totalCount: z.number(),
})

export type ProductType = z.infer<typeof ZProduct>
export type ProductValidatorType = z.infer<typeof ZProductValidator>
export type ProductToBackType = z.infer<typeof ZProductToBack>

export type ProductByWarehouseType = z.infer<typeof ZProductByWarehouse>
export type ProductByWarehouseResponseType = z.infer<typeof ZProductByWarehouseResponse>
export type ProductByWarehouseValidatorType = z.infer<typeof ZProductByWarehouseValidator>
export type ProductByWarehouseToBackType = z.infer<typeof ZProductByWarehouseToBack>

export type ProductResponseType = z.infer<typeof ZProductResponse>
