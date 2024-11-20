import { publicApi } from '@/shared/api/public-api.config'

import { CategoryToBackType } from '../model/category.schema'
import { guidEmpty } from '../utils/guid-empty'

export const putEditCategory = async (category: CategoryToBackType) => {
  const response = await publicApi.put(`/v1/categories/${category.id}`, {
    ...category,
    parentCategoryId:
      category.parentCategoryId !== guidEmpty ? category.parentCategoryId : undefined,
  })

  if (response.status >= 400) throw new Error()
  return response.data
}
