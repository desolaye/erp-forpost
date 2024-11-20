import { publicApi } from '@/shared/api/public-api.config'

export const deleteCategoryById = async (categoryId: string) => {
  const response = await publicApi.delete(`/v1/categories/${categoryId}`)

  if (response.status >= 400) throw new Error()
  return response.data
}
