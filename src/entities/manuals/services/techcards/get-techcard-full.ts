import { publicApi } from '@/shared/api/public-api.config'
import { TechcardFullType } from '../../model/techcard.schema'

export const getTechcardFull = async (id: string) => {
  const response = await publicApi.get<TechcardFullType>(`v1/techcard/composition/${id}`)
  return response
}
