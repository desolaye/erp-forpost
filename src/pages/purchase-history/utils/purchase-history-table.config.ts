import { PurchaseHistoryType } from '@/entities/purchase-history'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const purchaseTableConfig = (purchased: boolean | number) => {
  const purchasedSize = typeof purchased === 'number' ? 150 : 0

  const config: TableRowRecordType<PurchaseHistoryType> = {
    productName: {
      width: 200,
      title: 'Название продукта',
      type: 'text',
    },
    quantity: {
      width: 150,
      title: 'Кол-во',
      type: 'text',
    },
    storageName: {
      width: 200,
      title: 'Название склада',
      type: 'text',
    },
    entryDate: {
      width: 200,
      title: 'Дата поступления',
      type: 'text',
    },
    purchased: {
      width: purchasedSize,
      title: 'Тип товара',
      type: 'text',
    },
    id: {
      width: 0,
      title: '',
      type: 'text',
    },
    productId: {
      width: 0,
      title: '',
      type: 'text',
    },
    storageId: {
      width: 0,
      title: '',
      type: 'text',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<PurchaseHistoryType>
}
