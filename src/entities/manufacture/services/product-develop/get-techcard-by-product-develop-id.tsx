import { z } from 'zod'
import { publicApi } from '@/shared/api/public-api.config'

import { ZTechcardByProductDevelop } from '../../model/techcard-by-product-develop-id.schema'

export const getTechcadByProductDevelopId = async (id: string) => {
  const response = await publicApi.get(`v1/product-development/${id}/techcard-items`)
  const parsed = z.array(ZTechcardByProductDevelop).parse(response.data)

  return parsed
}
