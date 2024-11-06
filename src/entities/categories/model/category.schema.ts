import { z } from 'zod'

const ZBaseCategory = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  parentCategoryId: z.string().uuid(),
})

export type CategoryType = z.infer<typeof ZBaseCategory> & {
  children: CategoryType[]
}

export const ZCategory: z.ZodType<CategoryType> = ZBaseCategory.extend({
  children: z.lazy(() => ZCategory.array()),
})

export const ZCategoryForm = z.object({
  name: z.string().min(1, 'Пустое название'),
  description: z.string(),
  parentCategoryId: z.object({
    label: z.string(),
    value: z.string().uuid(),
  }),
})

export const ZCategoryToBack = ZCategoryForm.transform((data) => ({
  ...data,
  parentCategoryId: data.parentCategoryId.value,
}))

export type CategoryFormType = z.infer<typeof ZCategoryForm>
export type CategoryToBackType = z.infer<typeof ZCategoryToBack>
