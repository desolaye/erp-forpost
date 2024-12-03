import { publicApi } from '@/shared/api/public-api.config'

export const postSendToManufacturingOrders = async (invoiceId: string) => {
  const response = await publicApi.post('v1/manufacturing-order', { invoiceId })

  if (response.status >= 400) throw new Error()
  return response
}
