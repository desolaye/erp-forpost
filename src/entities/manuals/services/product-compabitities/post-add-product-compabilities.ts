import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  productId: string
  parentProductId: string
}

export const postAddProductCompabilities = async (props: RequestProps) => {
  const { parentProductId, productId } = props

  const response = await publicApi.post(`v1/product-compatibilities`, {
    productId,
    parentProductId,
  })

  return response
}
