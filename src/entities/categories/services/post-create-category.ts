import { publicApi } from '@/shared/api/public-api.config'
import { CategoryToBackType } from '../model/category.schema'

export const postCreateCategory = async (category: CategoryToBackType) => {
  const response = await publicApi.post('/v1/categories', {
    ...category,
    parentCategoryId: category.parentCategoryId ? category.parentCategoryId : undefined,
  })

  if (response.status >= 400) throw new Error()

  return response.data
}
