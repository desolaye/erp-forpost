import { publicApi } from '@/shared/api/public-api.config'

export const putCompleteIssueByProductDevelop = async (ids: string[]) => {
  const response = await publicApi.put('v1/product-development/issues/complete', {
    productDevelopmentIds: ids,
  })
  return response
}
