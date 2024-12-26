import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { PriceListType } from '@/entities/crm/price-list'

export const priceListTableConfig = () => {
  const config: TableRowRecordType<PriceListType> = {
    productName: {
      title: 'Продукт',
      type: 'text',
    },
    operationName: {
      title: 'Операция',
      type: 'text',
    },
    price: {
      title: 'Стоимость',
      type: 'text',
    },
  }

  return Object.entries(config) as TableConfigType<PriceListType>
}
