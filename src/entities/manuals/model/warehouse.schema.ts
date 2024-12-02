import { z } from 'zod'

export const ZWarehouse = z.object({
  storageId: z.string(),
  storageName: z.string(),
  responsibleId: z.string(),
  responsibleName: z.string(),
})

export const ZWarehouseValidator = z.object({
  id: z.string(),
  name: z.string().min(3, 'Название склада слишком короткое'),

  responsibleId: z.object({
    value: z.string().uuid(),
    label: z.string(),
  }),
})

export const ZWarehouseToBack = ZWarehouseValidator.transform((data) => ({
  ...data,
  responsibleId: data.responsibleId.value,
}))

export type WarehouseType = z.infer<typeof ZWarehouse>
export type WarehouseValidatorType = z.infer<typeof ZWarehouseValidator>
