import { ProductDevelopType } from '@/entities/manufacture'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const productDevelopTableConfig = () => {
  const config: TableRowRecordType<ProductDevelopType> = {
    productName: {
      width: 250,
      title: 'Продукт',
      type: 'text',
    },
    batchNumber: {
      width: 150,
      title: 'Номер партии',
      type: 'text',
    },
    operationName: {
      width: 150,
      title: 'Операция',
      type: 'text',
    },
    serialNumber: {
      width: 200,
      title: 'Серийный номер',
      type: 'text',
    },
    settingOption: {
      width: 200,
      title: 'Вариант настройки',
      type: 'text',
    },
    status: {
      width: 150,
      title: 'Статус',
      type: 'text',
    },
    manufacturingProcessId: {
      width: 0,
      title: '',
      type: 'text',
    },
    issueId: {
      width: 0,
      title: '',
      type: 'text',
    },
    productId: {
      width: 0,
      title: '',
      type: 'text',
    },
    id: {
      width: 0,
      title: '',
      type: 'text',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<ProductDevelopType>
}
