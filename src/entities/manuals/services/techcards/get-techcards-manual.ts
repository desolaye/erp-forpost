import { publicApi } from '@/shared/api/public-api.config'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

import { TechcardResponseType } from '../../model/techcard.schema'

export const getTechcardsManual = async (props: GetWithParamsType) => {
  const { params } = props

  const response = await publicApi.get<TechcardResponseType>('v1/techcard', { params })
  return response
}
