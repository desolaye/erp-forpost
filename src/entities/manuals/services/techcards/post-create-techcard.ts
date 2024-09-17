import { publicApi } from '@/shared/api/public-api.config'
import { TechcardValidatorType } from '../../model/techcard.schema'

type TechcardPost = TechcardValidatorType & { createdById: string }

export const postCreateTechcard = async (techcard: TechcardPost) => {
  const response = await publicApi.post<string>('v1/techcard', techcard)
  return response
}
