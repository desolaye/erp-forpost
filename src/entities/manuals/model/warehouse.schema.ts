import { z } from 'zod'

export const ZWarehouse = z.object({
  id: z.string(),
  name: z.string(),
})

export const ZWarehouseValidator = z.object({
  name: z.string().min(3),
})

export const ZWarehouseResponse = z.object({
  storages: z.array(ZWarehouse),
  totalCount: z.number(),
})

export type WarehouseType = z.infer<typeof ZWarehouse>
export type WarehouseValidatorType = z.infer<typeof ZWarehouseValidator>
export type WarehouseResponseType = z.infer<typeof ZWarehouseResponse>
