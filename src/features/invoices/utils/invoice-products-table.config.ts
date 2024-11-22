import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { InvoiceProductResponseType } from '@/entities/invoices'

export const invoiceProductsTableConfig = () => {
  const config: TableRowRecordType<InvoiceProductResponseType> = {
    name: {
      width: 250,
      type: 'text',
      title: 'Название продукта',
    },
    quantity: {
      width: 125,
      type: 'text',
      title: 'Кол-во',
    },
    productId: {
      width: 0,
      type: 'text',
      title: '',
    },
    invoiceId: {
      width: 0,
      type: 'text',
      title: '',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<InvoiceProductResponseType>
}
