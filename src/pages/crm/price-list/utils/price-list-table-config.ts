import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { PriceListType } from '@/entities/crm/price-list'

export const priceListTableConfig = () => {
  const config: TableRowRecordType<PriceListType> = {
    productName: {
      width: 225,
      title: 'Продукт',
      type: 'text',
    },
    operationName: {
      width: 175,
      title: 'Операция',
      type: 'text',
    },
    price: {
      width: 150,
      title: 'Стоимость',
      type: 'text',
    },
    id: {
      width: 0,
      title: '',
      type: 'text',
    },
    operationId: {
      width: 0,
      title: '',
      type: 'text',
    },
    productId: {
      width: 0,
      title: '',
      type: 'text',
    },
    updatedAt: {
      width: 0,
      title: '',
      type: 'text',
    },
    updatedById: {
      width: 0,
      title: '',
      type: 'text',
    },
    updatedByName: {
      width: 0,
      title: '',
      type: 'text',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<PriceListType>
}
