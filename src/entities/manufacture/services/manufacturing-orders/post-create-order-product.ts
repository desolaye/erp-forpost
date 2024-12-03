import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  orderId: string
  productId: string
  quantity: number
}

export const postCreateOrderProduct = async (product: RequestProps) => {
  const response = await publicApi.post('v1/manufacturing-order-composition', {
    manufacturingOrderId: product.orderId,
    productId: product.productId,
    quantity: product.quantity,
  })

  if (response.status >= 400) throw new Error()
  return response
}
