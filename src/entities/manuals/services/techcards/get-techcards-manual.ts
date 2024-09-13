import { publicApi } from '@/shared/api/public-api.config'
import { TechcardResponseType } from '../../model/techcard.schema'

interface IGetTechcardsManual {
  params: {
    skip: number
    limit: number
  }
}

export const getTechcardsManual = async (props: IGetTechcardsManual) => {
  const { params } = props

  const response = await publicApi.get<TechcardResponseType>('v1/techcard', { params })
  return response
}
