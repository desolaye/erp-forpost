import { publicApi } from '@/shared/api/public-api.config'

export const deleteTechcardById = async (id: string) => {
  const response = await publicApi.delete(`v1/techcards/${id}`)
  return response
}
