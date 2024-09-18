import { publicApi } from '@/shared/api/public-api.config'

export const putIssueClose = async (id: string) => {
  const response = await publicApi.put(`v1/issues/${id}/close`)
  return response
}
