import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  productId: string
  attributeId: string
}

export const postAddProductAttribute = async (props: RequestProps) => {
  const { attributeId, productId } = props

  const response = await publicApi.post('v1/product-attributes', {
    productId,
    attributeId,
  })

  return response
}
