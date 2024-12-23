import { publicApi } from '@/shared/api/public-api.config'
import { TechcardsCompositionType } from '../model/techcard-composition.schema'

export const getTechcardCompositionById = async (cardId: string) => {
  const response = await publicApi.get<TechcardsCompositionType>(
    `v1/techcards/composition/${cardId}`,
  )

  if (response.status >= 400) throw new Error()

  return response.data
}
