import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  productAttrId: string
  values: string[]
}

export const putEditProductAttributeValues = async (props: RequestProps) => {
  const { productAttrId, values } = props

  console.log(values)

  const response = await publicApi.put(`v1/product-attributes/${productAttrId}/values`, {
    values,
  })

  return response
}
