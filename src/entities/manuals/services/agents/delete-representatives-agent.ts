import { publicApi } from '@/shared/api/public-api.config'

export const deleteRepresentativesAgent = async (representId: string) => {
  const response = await publicApi.delete(
    `v1/contractors/contractor-representatives/${representId}`,
  )

  if (response.status > 400) throw new Error()
  return response
}
