import { publicApi } from '@/shared/api/public-api.config'
import { TechcardsAllResponseType } from '../model/techcards.schema'

type RequestProps = {
  skip: number
  limit: number
  number?: string
  productId?: string
}

export const getTechcardsAll = async (props: RequestProps) => {
  const { limit: Limit, number: Number, productId: ProductId, skip: Skip } = props

  const response = await publicApi.get<TechcardsAllResponseType>('v1/techcards', {
    params: {
      Limit,
      Skip,
      Number,
      ProductId,
    },
  })

  if (response.status >= 400) throw new Error()
  return response.data
}
