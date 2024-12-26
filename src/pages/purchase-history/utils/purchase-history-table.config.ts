import { PurchaseHistoryType } from '@/entities/purchase-history'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const purchaseTableConfig = (purchased: boolean | number) => {
  const config: TableRowRecordType<PurchaseHistoryType> = {
    productName: {
      title: 'Название продукта',
      type: 'text',
    },
    quantity: {
      title: 'Кол-во',
      type: 'text',
    },
    storageName: {
      title: 'Название склада',
      type: 'text',
    },
    entryDate: {
      title: 'Дата поступления',
      type: 'text',
    },
    purchased:
      typeof purchased === 'number'
        ? {
            width: 150,
            title: 'Тип товара',
            type: 'text',
          }
        : undefined,
  }

  return Object.entries(config) as TableConfigType<PurchaseHistoryType>
}
