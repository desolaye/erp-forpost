import { publicApi } from '@/shared/api/public-api.config'

import { CategoryToBackType } from '../model/category.schema'

export const putEditCategory = async (category: CategoryToBackType) => {
  const response = await publicApi.put(`/v1/categories/${category.id}`, {
    ...category,
  })

  if (response.status >= 400) throw new Error()

  return response.data
}
