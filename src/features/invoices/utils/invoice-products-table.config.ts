import { InvoiceProductResponseType } from '@/entities/invoices'

export const invoiceProductsTableConfig = () => {
  type DisplayValues = [
    keyof InvoiceProductResponseType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<
    keyof InvoiceProductResponseType,
    { size: string; title: string }
  > = {
    name: {
      size: '250px',
      title: 'Название продукта',
    },
    quantity: {
      size: '125px',
      title: 'Кол-во',
    },
    productId: {
      size: '0',
      title: '',
    },
    invoiceId: {
      size: '0',
      title: '',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.size !== '0',
  ) as DisplayValues
}
