import { publicApi } from '@/shared/api/public-api.config'
import { TechcardType } from '../../model/techcard.schema'

export const getTechcardsManual = async () => {
  const response = await publicApi.get<TechcardType[]>('v1/techcard')
  return response
}
