import { ProductDevelopType } from '@/entities/manufacture'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const productDevelopTableConfig = () => {
  const config: TableRowRecordType<ProductDevelopType> = {
    productName: {
      title: 'Продукт',
      type: 'text',
    },
    batchNumber: {
      title: 'Номер партии',
      type: 'text',
    },
    operationName: {
      title: 'Операция',
      type: 'text',
    },
    serialNumber: {
      title: 'Серийный номер',
      type: 'text',
    },
    settingOption: {
      title: 'Вариант настройки',
      type: 'text',
    },
    status: {
      title: 'Статус',
      type: 'text',
    },
  }

  return Object.entries(config) as TableConfigType<ProductDevelopType>
}
