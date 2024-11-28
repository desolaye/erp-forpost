import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  invoiceId: string
  productId: string
  quantity: number
}

export const postCreateInvoiceProduct = async (product: RequestProps) => {
  const response = await publicApi.post('v1/invoice-products', product)

  if (response.status >= 400) throw new Error()
  return response
}
