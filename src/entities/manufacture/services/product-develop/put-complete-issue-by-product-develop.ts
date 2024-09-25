import { publicApi } from '@/shared/api/public-api.config'

export const putCompleteIssueByProductDevelop = async (id: string) => {
  const response = await publicApi.put(`v1/product-development/${id}/complete-issue`)
  return response
}
