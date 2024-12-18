import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  productAttrId: string
  values: string[]
}

export const putEditProductAttributeValues = async (props: RequestProps) => {
  const { productAttrId, values } = props

  const response = await publicApi.put(`v1/product-attributes/${productAttrId}/values`, {
    values,
  })

  return response
}
