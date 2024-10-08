import { CompletedProductType } from '@/entities/manufacture'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const productCompletedTableConfig = () => {
  const config: TableRowRecordType<CompletedProductType> = {
    name: {
      type: 'text',
      title: 'Название продукта',
      width: 200,
    },
    serialNumber: {
      type: 'text',
      title: 'Серийный номер',
      width: 200,
    },
    productDevelopmentId: {
      type: 'text',
      title: 'id',
      width: 0,
    },
    id: {
      type: 'text',
      title: 'id',
      width: 0,
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<CompletedProductType>
}
